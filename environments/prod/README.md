# Production Environment

Customer-facing production environment. Must be boring and stable.

## Purpose
- Live customer traffic
- Production workloads
- Mission-critical operations

## Deployment
- Railway (primary)
- High availability configuration
- Auto-scaling enabled where appropriate

## Database
- Managed PostgreSQL with automated backups
- Point-in-time recovery enabled
- Regular backup verification

## Secrets
- Railway environment variables
- Managed through Railway dashboard with restricted access
- Rotation schedule for sensitive credentials
- Never stored in this repository

## Service Access
Production domains (via Cloudflare):
- API: https://api.blackroad.io
- Operator: https://operator.blackroad.io
- Web: https://blackroad.io
- Prism Console: https://prism.blackroad.io or https://console.blackroad.io

## Notes
- Changes require review and approval
- Deploy during low-traffic windows when possible
- Monitor metrics closely after deployments
- Have rollback plan ready
- Zero-downtime deployments preferred
- Rate limiting and security hardening enabled
