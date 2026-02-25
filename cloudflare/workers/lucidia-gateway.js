/**
 * Lucidia Gateway — Cloudflare Worker
 *
 * Acts as the universal SSH deployment gateway for the BlackRoad OS pipeline.
 * Receives signed GitHub webhook calls, parses @Lucidia triggers, and dispatches
 * deployment commands to Raspberry Pi nodes via Tailscale.
 *
 * Pipeline:
 *   Agent Session → PR → Dependabot → Copilot review → @Lucidia deploy
 *
 * Required secrets (set via `wrangler secret put`):
 *   GITHUB_WEBHOOK_SECRET   — shared secret used to sign GitHub webhook payloads
 *   TAILSCALE_AUTH_KEY      — Tailscale auth key for node access (if needed)
 *   DEPLOY_API_KEY          — internal API key callers must supply
 *
 * Environment variables (set in wrangler.toml [vars]):
 *   LUCIDIA_HOST            — Tailscale hostname for Lucidia Pi (default: lucidia)
 *   OCTAVIA_HOST            — Tailscale hostname for Octavia Pi   (default: octavia)
 *   ALICE_HOST              — Tailscale hostname for Alice Pi     (default: alice)
 *   DEPLOY_USER             — SSH user on the Pis                 (default: pi)
 */

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Verify the HMAC-SHA256 signature that GitHub attaches to every webhook.
 * Returns true when the payload matches the shared secret.
 */
async function verifyGitHubSignature(secret, body, signatureHeader) {
  if (!signatureHeader || !signatureHeader.startsWith('sha256=')) {
    return false;
  }
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );
  const sigBytes = hexToBytes(signatureHeader.slice('sha256='.length));
  return crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(body));
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Resolve which Pi hostname to target based on the comment body.
 * Defaults to Lucidia (192.168.4.38) when no explicit target is mentioned.
 */
function resolvePiTarget(commentBody, env) {
  const lower = commentBody.toLowerCase();
  if (lower.includes('octavia') || lower.includes('hailo')) {
    return { host: env.OCTAVIA_HOST || 'octavia', label: 'Octavia (Hailo)' };
  }
  if (lower.includes('alice')) {
    return { host: env.ALICE_HOST || 'alice', label: 'Alice' };
  }
  // Default: Lucidia
  return { host: env.LUCIDIA_HOST || 'lucidia', label: 'Lucidia (192.168.4.38)' };
}

/**
 * Parse deployment options embedded in the @Lucidia comment.
 * Syntax: @Lucidia deploy [service] [--target octavia|alice|lucidia]
 */
function parseDeployOptions(commentBody) {
  const serviceMatch = commentBody.match(/@[Ll]ucidia\s+deploy\s+(\S+)/);
  const service = serviceMatch ? serviceMatch[1] : 'all';
  const branchMatch = commentBody.match(/--branch\s+(\S+)/);
  const branch = branchMatch ? branchMatch[1] : null;
  return { service, branch };
}

// ──────────────────────────────────────────────────────────────────────────────
// Core handler
// ──────────────────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ── Health check ──────────────────────────────────────────────────────────
    if (url.pathname === '/_health') {
      return new Response(
        JSON.stringify({ status: 'ok', service: 'lucidia-gateway', timestamp: new Date().toISOString() }),
        { headers: { 'Content-Type': 'application/json' } },
      );
    }

    // ── GitHub webhook endpoint ───────────────────────────────────────────────
    if (url.pathname === '/webhook/github' && request.method === 'POST') {
      return handleGitHubWebhook(request, env);
    }

    // ── Manual deploy endpoint (authenticated) ────────────────────────────────
    if (url.pathname === '/deploy' && request.method === 'POST') {
      return handleManualDeploy(request, env);
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// GitHub webhook handler
// ──────────────────────────────────────────────────────────────────────────────

async function handleGitHubWebhook(request, env) {
  const body = await request.text();

  // Verify webhook signature
  const sig = request.headers.get('x-hub-signature-256') || '';
  const valid = await verifyGitHubSignature(env.GITHUB_WEBHOOK_SECRET || '', body, sig);
  if (!valid) {
    return new Response(JSON.stringify({ error: 'Invalid signature' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const event = request.headers.get('x-github-event');
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Only handle PR comment events that mention @Lucidia
  if (event !== 'issue_comment' || payload.action !== 'created') {
    return new Response(JSON.stringify({ status: 'ignored', event }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const comment = payload.comment?.body || '';
  if (!/@[Ll]ucidia/.test(comment)) {
    return new Response(JSON.stringify({ status: 'ignored', reason: 'no @Lucidia mention' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Must be on a pull request
  if (!payload.issue?.pull_request) {
    return new Response(JSON.stringify({ status: 'ignored', reason: 'not a pull request' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const prNumber = payload.issue.number;
  const repoFullName = payload.repository?.full_name || '';
  const target = resolvePiTarget(comment, env);
  const opts = parseDeployOptions(comment);

  // Build the deployment record
  const deployment = {
    trigger: 'github-comment',
    repo: repoFullName,
    pr: prNumber,
    commentId: payload.comment?.id,
    commenter: payload.comment?.user?.login,
    target,
    service: opts.service,
    branch: opts.branch,
    timestamp: new Date().toISOString(),
  };

  // Dispatch the SSH deployment via Tailscale (non-blocking)
  const deployResult = await dispatchTailscaleDeploy(deployment, env);

  return new Response(JSON.stringify({ status: 'dispatched', deployment, deployResult }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Manual deploy handler
// ──────────────────────────────────────────────────────────────────────────────

async function handleManualDeploy(request, env) {
  // Require API key
  const apiKey = request.headers.get('x-api-key') || '';
  if (!env.DEPLOY_API_KEY || apiKey !== env.DEPLOY_API_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const target = {
    host: body.target || env.LUCIDIA_HOST || 'lucidia',
    label: body.target || 'Lucidia',
  };
  const deployment = {
    trigger: 'manual',
    target,
    service: body.service || 'all',
    branch: body.branch || null,
    timestamp: new Date().toISOString(),
  };

  const deployResult = await dispatchTailscaleDeploy(deployment, env);

  return new Response(JSON.stringify({ status: 'dispatched', deployment, deployResult }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Tailscale SSH dispatch
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Calls the Tailscale SSH API to run the deployment script on the target Pi.
 *
 * Cloudflare Workers cannot open raw TCP connections, so we use the
 * Tailscale SSH REST API (available when the Worker is connected to a
 * Tailscale network via the tailscale-cloudflare-worker integration or
 * via a sidecar service at TAILSCALE_SSH_API_URL).
 *
 * When TAILSCALE_SSH_API_URL is not set the deployment is recorded but
 * not executed — useful for testing the webhook path without a live cluster.
 */
async function dispatchTailscaleDeploy(deployment, env) {
  const apiUrl = env.TAILSCALE_SSH_API_URL;
  if (!apiUrl) {
    // No SSH proxy configured — log and return for offline/test scenarios
    return { dispatched: false, reason: 'TAILSCALE_SSH_API_URL not configured' };
  }

  const user = env.DEPLOY_USER || 'pi';
  const host = deployment.target.host;
  const service = deployment.service || 'all';
  const branch = deployment.branch ? `--branch ${deployment.branch}` : '';

  // The deploy script lives on each Pi at /home/pi/blackroad/deploy.sh
  const command = `/home/pi/blackroad/deploy.sh ${service} ${branch}`.trim();

  try {
    const response = await fetch(`${apiUrl}/ssh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.TAILSCALE_AUTH_KEY || ''}`,
      },
      body: JSON.stringify({ host, user, command }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { dispatched: false, error: text, status: response.status };
    }

    const result = await response.json();
    return { dispatched: true, result };
  } catch (err) {
    return { dispatched: false, error: err.message };
  }
}
