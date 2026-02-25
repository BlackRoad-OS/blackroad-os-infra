/**
 * BlackRoad OS Edge Router
 * Cloudflare Worker for intelligent request routing
 *
 * Features:
 * - Subdomain-based routing to Railway services
 * - Health check endpoints
 * - Request logging
 * - Rate limiting headers
 * - CORS handling
 * - Cache optimization
 */

// Service routing configuration
const ROUTES = {
  // blackroad.io subdomains
  'app.blackroad.io': { service: 'blackroad-os-web', port: 3000 },
  'home.blackroad.io': { service: 'blackroad-os-home', port: 3000 },
  'os.blackroad.io': { service: 'blackroad-os', port: 8080 },
  'creator.blackroad.io': { service: 'blackroad-os-pack-creator-studio', port: 3000 },
  'api.blackroad.io': { service: 'blackroad-os-api', port: 8080 },

  // blackroad.systems subdomains
  'api.blackroad.systems': { service: 'blackroad-os-api-gateway', port: 8080 },
  'core.blackroad.systems': { service: 'blackroad-os-core', port: 8080 },
  'infra.blackroad.systems': { service: 'blackroad-os-infra', port: 8080 },
  'console.blackroad.systems': { service: 'blackroad-os-master', port: 8080 },
  'docs.blackroad.systems': { service: 'blackroad-os-docs', port: 3000 },
  'prism.blackroad.systems': { service: 'blackroad-prism-console', port: 3000 },
  'beacon.blackroad.systems': { service: 'blackroad-os-beacon', port: 8080 },
  'research.blackroad.systems': { service: 'blackroad-os-research', port: 8080 },
  'lab.blackroad.systems': { service: 'blackroad-os-pack-research-lab', port: 8080 },
  'devops.blackroad.systems': { service: 'blackroad-os-pack-infra-devops', port: 8080 },
  'legal.blackroad.systems': { service: 'blackroad-os-pack-legal', port: 8080 },
  'finance.blackroad.systems': { service: 'blackroad-os-pack-finance', port: 8080 },
  'demo.blackroad.systems': { service: 'blackroad-os-demo', port: 3000 },
  'archive.blackroad.systems': { service: 'blackroad-os-archive', port: 8080 },
  'agents.blackroad.systems': { service: 'blackroad-os-agents', port: 8080 },
  // Lucidia Gateway is served by its own dedicated Worker (lucidia-gateway.js)
  // and does NOT proxy to a Railway service — requests are handled at the edge.
};

// Railway internal domain pattern
const RAILWAY_DOMAIN = 'railway.internal';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // Handle health check at edge
    if (url.pathname === '/_health' || url.pathname === '/_edge/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        edge: 'cloudflare',
        timestamp: new Date().toISOString(),
        hostname: hostname,
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      });
    }

    // Handle routing info endpoint
    if (url.pathname === '/_edge/routes') {
      return new Response(JSON.stringify({
        routes: ROUTES,
        timestamp: new Date().toISOString(),
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      });
    }

    // Get route configuration
    const route = ROUTES[hostname];

    if (!route) {
      // Unknown hostname - return 404
      return new Response(JSON.stringify({
        error: 'Not Found',
        message: `No route configured for ${hostname}`,
        availableRoutes: Object.keys(ROUTES),
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Build upstream URL
    const upstreamUrl = new URL(request.url);
    upstreamUrl.hostname = `${route.service}.${RAILWAY_DOMAIN}`;
    upstreamUrl.port = route.port;

    // Clone request with new URL
    const upstreamRequest = new Request(upstreamUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow',
    });

    // Add routing headers
    upstreamRequest.headers.set('X-Forwarded-Host', hostname);
    upstreamRequest.headers.set('X-Forwarded-Proto', 'https');
    upstreamRequest.headers.set('X-BlackRoad-Service', route.service);
    upstreamRequest.headers.set('X-BlackRoad-Edge', 'cloudflare');

    try {
      // Fetch from upstream
      const response = await fetch(upstreamRequest);

      // Clone response to add headers
      const newResponse = new Response(response.body, response);

      // Add edge headers
      newResponse.headers.set('X-BlackRoad-Edge', 'cloudflare');
      newResponse.headers.set('X-BlackRoad-Service', route.service);

      // Add CORS headers for API endpoints
      if (hostname.includes('api.')) {
        newResponse.headers.set('Access-Control-Allow-Origin', '*');
        newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      }

      return newResponse;

    } catch (error) {
      // Upstream error
      return new Response(JSON.stringify({
        error: 'Service Unavailable',
        message: `Failed to reach ${route.service}`,
        details: error.message,
      }), {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '30',
        },
      });
    }
  },
};
