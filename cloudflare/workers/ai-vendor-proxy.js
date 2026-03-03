/**
 * BlackRoad OS — AI Vendor API Proxy
 * Cloudflare Worker that proxies AI vendor API calls through BlackRoad infrastructure.
 *
 * All requests must carry a valid BlackRoad API key (X-BlackRoad-Key header or
 * Authorization: Bearer <key>).  The Worker validates the caller, strips the
 * BlackRoad key, injects the per-vendor credential stored as a Worker secret,
 * and forwards the request to the vendor.
 *
 * Supported vendors
 *   POST /v1/openai/*        → api.openai.com
 *   POST /v1/anthropic/*     → api.anthropic.com
 *   POST /v1/mistral/*       → api.mistral.ai
 *   POST /v1/groq/*          → api.groq.com
 *   POST /v1/together/*      → api.together.xyz
 *
 * Environment secrets required (set via `wrangler secret put`):
 *   BLACKROAD_API_KEYS   – JSON array of allowed BlackRoad API keys
 *   OPENAI_API_KEY       – OpenAI secret key
 *   ANTHROPIC_API_KEY    – Anthropic secret key
 *   MISTRAL_API_KEY      – Mistral AI secret key
 *   GROQ_API_KEY         – Groq secret key
 *   TOGETHER_API_KEY     – Together AI secret key
 */

const VENDOR_MAP = {
  openai: {
    upstream: 'https://api.openai.com',
    authHeader: 'Authorization',
    authPrefix: 'Bearer ',
    secretEnv: 'OPENAI_API_KEY',
  },
  anthropic: {
    upstream: 'https://api.anthropic.com',
    authHeader: 'x-api-key',
    authPrefix: '',
    secretEnv: 'ANTHROPIC_API_KEY',
  },
  mistral: {
    upstream: 'https://api.mistral.ai',
    authHeader: 'Authorization',
    authPrefix: 'Bearer ',
    secretEnv: 'MISTRAL_API_KEY',
  },
  groq: {
    upstream: 'https://api.groq.com',
    authHeader: 'Authorization',
    authPrefix: 'Bearer ',
    secretEnv: 'GROQ_API_KEY',
  },
  together: {
    upstream: 'https://api.together.xyz',
    authHeader: 'Authorization',
    authPrefix: 'Bearer ',
    secretEnv: 'TOGETHER_API_KEY',
  },
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function extractBearerToken(request) {
  const br = request.headers.get('X-BlackRoad-Key');
  if (br) return br;
  const auth = request.headers.get('Authorization') || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

function isAuthorized(token, env) {
  if (!token) return false;
  try {
    const keys = JSON.parse(env.BLACKROAD_API_KEYS || '[]');
    return Array.isArray(keys) && keys.includes(token);
  } catch {
    return false;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/health' || url.pathname === '/_health') {
      return jsonResponse({ status: 'ok', service: 'ai-vendor-proxy', timestamp: new Date().toISOString() });
    }

    // Validate caller
    const token = extractBearerToken(request);
    if (!isAuthorized(token, env)) {
      return jsonResponse({ error: 'Unauthorized', message: 'Valid X-BlackRoad-Key required' }, 401);
    }

    // Route: /v1/<vendor>/<...rest>
    const match = url.pathname.match(/^\/v1\/([^/]+)(\/.*)?$/);
    if (!match) {
      return jsonResponse({
        error: 'Not Found',
        message: 'Path must be /v1/<vendor>/...',
        vendors: Object.keys(VENDOR_MAP),
      }, 404);
    }

    const vendorKey = match[1].toLowerCase();
    const restPath = match[2] || '/';
    const vendor = VENDOR_MAP[vendorKey];

    if (!vendor) {
      return jsonResponse({
        error: 'Unknown Vendor',
        message: `'${vendorKey}' is not a configured vendor`,
        vendors: Object.keys(VENDOR_MAP),
      }, 400);
    }

    const vendorSecret = env[vendor.secretEnv];
    if (!vendorSecret) {
      return jsonResponse({ error: 'Misconfigured', message: `Vendor secret ${vendor.secretEnv} not set` }, 503);
    }

    // Build upstream request
    const upstreamUrl = `${vendor.upstream}${restPath}${url.search}`;
    const upstreamHeaders = new Headers(request.headers);

    // Strip BlackRoad auth headers
    upstreamHeaders.delete('X-BlackRoad-Key');
    upstreamHeaders.delete('Authorization');

    // Inject vendor credential
    upstreamHeaders.set(vendor.authHeader, `${vendor.authPrefix}${vendorSecret}`);

    // Propagate content-type only when present in the original request
    const contentType = request.headers.get('Content-Type');
    if (contentType) {
      upstreamHeaders.set('Content-Type', contentType);
    }

    // Telemetry headers
    upstreamHeaders.set('X-BlackRoad-Proxy', 'true');
    upstreamHeaders.set('X-BlackRoad-Vendor', vendorKey);

    const upstreamRequest = new Request(upstreamUrl, {
      method: request.method,
      headers: upstreamHeaders,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'follow',
    });

    try {
      const response = await fetch(upstreamRequest);
      const proxied = new Response(response.body, response);
      proxied.headers.set('X-BlackRoad-Vendor', vendorKey);
      proxied.headers.set('X-BlackRoad-Proxy', 'true');
      return proxied;
    } catch (err) {
      return jsonResponse({
        error: 'Upstream Error',
        vendor: vendorKey,
        message: err.message,
      }, 502);
    }
  },
};
