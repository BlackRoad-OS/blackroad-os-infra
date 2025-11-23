# Observability and Alerts

## Key Metrics

- Request latency (p50/p95/p99)
- Error rate (4xx vs 5xx)
- Saturation (CPU, memory, connection pools)
- Uptime/availability per service

## Minimum Alerts

- Service down / healthcheck failing
- Error rate above threshold
- Latency above target SLOs
- DNS resolution failures or elevated 4xx/5xx at the edge

## SLO Targets (initial placeholders)

- Web/API availability: 99.5%+ in dev/staging, 99.9%+ in prod
- p95 latency: < 500ms for public endpoints

## How an Incident Agent Should Use These

- Read declared services from the monitoring module output
- Compare live metrics to thresholds and trigger incident runbooks automatically
- Post updates to communication channels and status pages

> TODO(agent): Select vendor (e.g., Grafana Cloud, New Relic, Datadog) and implement alert routing.
