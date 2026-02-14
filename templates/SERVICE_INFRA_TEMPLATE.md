# Service Infrastructure Template

Use this template when adding a new service to the BlackRoad OS ecosystem.

---

# Infrastructure Blueprint: {SERVICE_NAME}

{Brief description of what this service does}

## Service Overview
- **Service Name**: {service-name}
- **Type**: {API/Worker/Website/Console/Pack}
- **Language**: {Node.js/Python/Go/etc.}
- **Repository**: https://github.com/BlackRoad-OS/{repo-name}

## Deployment Configuration

### Local Environment
```yaml
platform: local
entrypoint: "{command to run locally}"
port: {port-number}
dependencies:
  - {list any service dependencies}
```

### Staging Environment
```yaml
platform: railway  # or vercel, fly.io, etc.
railway_project: "{service-name}-staging"
port: {port-number}
domain: "{subdomain}.staging.blackroad.io"
healthcheck: "/health"
auto_deploy: true
branch: "main"
```

### Production Environment
```yaml
platform: railway  # or vercel, fly.io, etc.
railway_project: "{service-name}-prod"
port: {port-number}
domain: "{subdomain}.blackroad.io"
healthcheck: "/health"
auto_deploy: false  # Manual approval recommended
branch: "main"
```

## Environment Variables

### Required (All Environments)
- `BR_OS_ENV` - Environment name: local/staging/prod
- `BR_OS_{SERVICE}_VERSION` - Deployed version string
- `BR_OS_{SERVICE}_COMMIT` - Git commit SHA
- `PORT` - HTTP port
- {Add service-specific required variables}

### Service Dependencies
- {List any dependency URLs or API keys}
- {Note: Mark which should be stored in provider secrets manager}

### Optional
- `LOG_LEVEL` - Logging verbosity: debug/info/warn/error
- {Add service-specific optional variables}

## Resource Requirements

### Local
- CPU: Best effort
- Memory: {minimum MB}
- Disk: Minimal

### Staging
- CPU: {vCPU count}
- Memory: {MB/GB}
- Disk: {GB}
- Instances: 1

### Production
- CPU: {vCPU count}
- Memory: {MB/GB}
- Disk: {GB}
- Instances: {count} (with auto-scaling if needed)

## Health Checks
- Endpoint: `GET /health`
- Expected Response: 200 OK with JSON body
- Interval: 30s
- Timeout: 5s
- Unhealthy Threshold: 3

## Build Configuration (if applicable)
```yaml
build_command: "{build command}"
start_command: "{start command}"
install_command: "{install command}"
{runtime}_version: "{version}"
```

## Security Notes (if applicable)
- {Authentication requirements}
- {Access control notes}
- {Special security considerations}

## Notes
- {Any special notes about this service}
- {Integration points}
- {Quirks or gotchas}
- {Future plans}

---

## Checklist for New Service

When creating a new service, complete these steps:

### Infrastructure Repository Updates
- [ ] Copy this template to `services/{service-name}/infra.yml`
- [ ] Fill in all sections with service-specific information
- [ ] Create Railway config at `railway/railway.{service-name}.toml`
- [ ] Update Cloudflare DNS blueprint with new subdomain(s)
- [ ] Add service to environments manifest if needed

### Service Repository Setup
- [ ] Create GitHub repository: `BlackRoad-OS/{service-name}`
- [ ] Copy `.env.example` template to service repo
- [ ] Customize `.env.example` with service-specific variables
- [ ] Add `.env.local` to `.gitignore`
- [ ] Implement `/health` endpoint
- [ ] Add README with service documentation

### CI/CD Setup
- [ ] Copy `github/workflows/service-ci.yml` to service repo
- [ ] Copy `github/workflows/service-cd.yml` to service repo
- [ ] Customize workflows for service build/test/deploy
- [ ] Configure GitHub Secrets (RAILWAY_TOKEN, etc.)
- [ ] Test CI workflow on a branch
- [ ] Test CD workflow to staging

### Railway Setup
- [ ] Create Railway project: `{service-name}-staging`
- [ ] Connect GitHub repository
- [ ] Configure environment variables (from infra.yml)
- [ ] Set resource limits
- [ ] Configure health check
- [ ] Deploy and verify staging

- [ ] Create Railway project: `{service-name}-prod`
- [ ] Connect GitHub repository
- [ ] Configure environment variables (production values)
- [ ] Set resource limits (production tier)
- [ ] Configure health check
- [ ] Set up manual deployment approval

### DNS Setup
- [ ] Add CNAME record in Cloudflare for staging
- [ ] Verify staging DNS resolution
- [ ] Add CNAME record in Cloudflare for production
- [ ] Verify production DNS resolution
- [ ] Configure SSL/TLS settings
- [ ] Test HTTPS access

### Monitoring & Documentation
- [ ] Verify health check is working
- [ ] Set up Cloudflare health monitoring
- [ ] Configure alerts (Railway, Sentry, etc.)
- [ ] Update main infrastructure README
- [ ] Document service in ecosystem overview
- [ ] Add service to status page

### Validation
- [ ] Service runs locally
- [ ] Service deploys to staging successfully
- [ ] Health check passes in staging
- [ ] Integration tests pass
- [ ] Service deploys to production successfully
- [ ] Health check passes in production
- [ ] DNS resolves correctly
- [ ] HTTPS works correctly
- [ ] Monitoring and alerts configured

---

**Template Version**: 1.0
**Last Updated**: 2025-11-24
