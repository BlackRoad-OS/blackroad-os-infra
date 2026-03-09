/**
 * BlackRoad OS — Stripe Webhook Handler
 * Cloudflare Worker that receives, verifies, and dispatches Stripe webhook events.
 *
 * Environment secrets required (set via `wrangler secret put`):
 *   STRIPE_WEBHOOK_SECRET  – Webhook signing secret from Stripe Dashboard
 *                            (Developers → Webhooks → endpoint → Signing secret)
 *   BLACKROAD_API_URL      – Internal URL of the BlackRoad core service that
 *                            processes billing events (e.g. https://core.blackroad.io)
 *   BLACKROAD_INTERNAL_KEY – Service-to-service key for the internal API
 *
 * Supported events (see stripe-config.json):
 *   checkout.session.completed
 *   customer.subscription.created
 *   customer.subscription.updated
 *   invoice.paid
 *
 * Endpoint:
 *   POST /webhook/stripe
 */

const SUPPORTED_EVENTS = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.paid',
  'invoice.payment_failed',
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
]);

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Verify Stripe webhook signature using the HMAC-SHA256 scheme.
 * https://stripe.com/docs/webhooks/signatures
 */
async function verifyStripeSignature(payload, sigHeader, secret) {
  if (!sigHeader) return false;

  const parts = Object.fromEntries(
    sigHeader.split(',').map((p) => p.split('='))
  );
  const timestamp = parts['t'];
  const signature = parts['v1'];

  if (!timestamp || !signature) return false;

  // Reject payloads older than 5 minutes
  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
  if (age > 300) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
  const expected = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return expected === signature;
}

async function forwardToCore(event, env) {
  if (!env.BLACKROAD_API_URL) return;

  await fetch(`${env.BLACKROAD_API_URL}/internal/billing/webhook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.BLACKROAD_INTERNAL_KEY || ''}`,
      'X-Stripe-Event-Type': event.type,
      'X-Stripe-Event-Id': event.id,
    },
    body: JSON.stringify(event),
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/health' || url.pathname === '/_health') {
      return jsonResponse({ status: 'ok', service: 'stripe-webhook', timestamp: new Date().toISOString() });
    }

    if (url.pathname !== '/webhook/stripe') {
      return jsonResponse({ error: 'Not Found' }, 404);
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method Not Allowed' }, 405);
    }

    const rawBody = await request.text();
    const sigHeader = request.headers.get('stripe-signature');

    if (!env.STRIPE_WEBHOOK_SECRET) {
      console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET not configured');
      return jsonResponse({ error: 'Misconfigured' }, 503);
    }

    const valid = await verifyStripeSignature(rawBody, sigHeader, env.STRIPE_WEBHOOK_SECRET);
    if (!valid) {
      return jsonResponse({ error: 'Invalid signature' }, 400);
    }

    let event;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return jsonResponse({ error: 'Invalid JSON payload' }, 400);
    }

    if (!SUPPORTED_EVENTS.has(event.type)) {
      // Acknowledge unsupported events gracefully
      return jsonResponse({ received: true, handled: false, type: event.type });
    }

    // Forward to internal core service (non-blocking — don't fail the webhook)
    try {
      await forwardToCore(event, env);
    } catch (err) {
      console.error('[stripe-webhook] Failed to forward to core:', err.message);
    }

    return jsonResponse({ received: true, handled: true, type: event.type });
  },
};
