/**
 * BlackRoad OS Health Monitor Worker
 * Scheduled worker for health checking all services
 *
 * Runs every 5 minutes via cron trigger
 * Stores results in KV and sends alerts on failures
 */

// All endpoints to monitor
const ENDPOINTS = [
  // blackroad.io
  { name: 'app', url: 'https://app.blackroad.io/', critical: true },
  { name: 'home', url: 'https://home.blackroad.io/', critical: false },
  { name: 'os', url: 'https://os.blackroad.io/health', critical: true },
  { name: 'creator', url: 'https://creator.blackroad.io/', critical: false },
  { name: 'api-public', url: 'https://api.blackroad.io/health', critical: true },

  // blackroad.systems
  { name: 'api-gateway', url: 'https://api.blackroad.systems/health', critical: true },
  { name: 'core', url: 'https://core.blackroad.systems/health', critical: true },
  { name: 'infra', url: 'https://infra.blackroad.systems/health', critical: false },
  { name: 'console', url: 'https://console.blackroad.systems/health', critical: false },
  { name: 'docs', url: 'https://docs.blackroad.systems/', critical: false },
  { name: 'prism', url: 'https://prism.blackroad.systems/', critical: false },
  { name: 'beacon', url: 'https://beacon.blackroad.systems/health', critical: true },
  { name: 'research', url: 'https://research.blackroad.systems/health', critical: false },
  { name: 'demo', url: 'https://demo.blackroad.systems/', critical: false },
  { name: 'archive', url: 'https://archive.blackroad.systems/health', critical: false },
  { name: 'agents', url: 'https://agents.blackroad.systems/health', critical: true },
];

// Health check timeout (ms)
const TIMEOUT = 10000;

async function checkEndpoint(endpoint) {
  const start = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    const response = await fetch(endpoint.url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'BlackRoad-Health-Monitor/1.0',
      },
    });

    clearTimeout(timeoutId);

    const latency = Date.now() - start;

    return {
      name: endpoint.name,
      url: endpoint.url,
      status: response.status,
      healthy: response.status >= 200 && response.status < 400,
      latency: latency,
      critical: endpoint.critical,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      name: endpoint.name,
      url: endpoint.url,
      status: 0,
      healthy: false,
      latency: Date.now() - start,
      error: error.message,
      critical: endpoint.critical,
      timestamp: new Date().toISOString(),
    };
  }
}

export default {
  // Scheduled handler (cron)
  async scheduled(event, env, ctx) {
    console.log('Starting health check...');

    // Check all endpoints in parallel
    const results = await Promise.all(ENDPOINTS.map(checkEndpoint));

    // Aggregate results
    const summary = {
      timestamp: new Date().toISOString(),
      total: results.length,
      healthy: results.filter(r => r.healthy).length,
      unhealthy: results.filter(r => !r.healthy).length,
      criticalDown: results.filter(r => !r.healthy && r.critical).length,
      results: results,
    };

    // Store in KV (if available)
    if (env.HEALTH_KV) {
      await env.HEALTH_KV.put('latest', JSON.stringify(summary));
      await env.HEALTH_KV.put(`history:${Date.now()}`, JSON.stringify(summary), {
        expirationTtl: 86400 * 7, // 7 days
      });
    }

    // Log summary
    console.log(`Health check complete: ${summary.healthy}/${summary.total} healthy`);

    // Alert on critical failures
    if (summary.criticalDown > 0) {
      console.error(`🚨 CRITICAL: ${summary.criticalDown} critical services down!`);

      const criticalFailures = results.filter(r => !r.healthy && r.critical);
      for (const failure of criticalFailures) {
        console.error(`  - ${failure.name}: ${failure.error || `HTTP ${failure.status}`}`);
      }

      // Send webhook alert (if configured)
      if (env.ALERT_WEBHOOK) {
        await fetch(env.ALERT_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'critical_alert',
            message: `${summary.criticalDown} critical BlackRoad OS services are down`,
            failures: criticalFailures,
            timestamp: summary.timestamp,
          }),
        });
      }
    }

    return summary;
  },

  // HTTP handler for manual checks
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Run health check
    if (url.pathname === '/check' || url.pathname === '/') {
      const results = await Promise.all(ENDPOINTS.map(checkEndpoint));

      const summary = {
        timestamp: new Date().toISOString(),
        total: results.length,
        healthy: results.filter(r => r.healthy).length,
        unhealthy: results.filter(r => !r.healthy).length,
        results: results,
      };

      return new Response(JSON.stringify(summary, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      });
    }

    // Get latest cached results
    if (url.pathname === '/latest' && env.HEALTH_KV) {
      const latest = await env.HEALTH_KV.get('latest');
      if (latest) {
        return new Response(latest, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60',
          },
        });
      }
    }

    return new Response('BlackRoad OS Health Monitor\n\nEndpoints:\n  /check - Run health check\n  /latest - Get cached results', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};
