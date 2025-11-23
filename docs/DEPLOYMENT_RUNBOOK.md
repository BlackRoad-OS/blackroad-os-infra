# Deployment Runbook

This runbook captures the minimal, repeatable process for shipping changes across BlackRoad OS services via Railway while keeping DNS and environments aligned. It assumes Season 2 conventions (consistent env names, service registry, and Railway + Cloudflare mappings).

## Prerequisites

- Confirm the target service exists in `infra/services.yml` with health endpoints and base URLs.
- Ensure environment variables are defined by name in `docs/ENVIRONMENT_VARIABLES.md` and synced to Railway.
- Branch is merged to the environment’s deployment branch (typically `main` for production and `develop` for staging/dev).

## Deploying a single service (Railway)

1. Push to the tracked branch for the target environment; Railway should auto-deploy.
2. Monitor build/deploy logs in Railway for the service (e.g., `api`, `prism-console`, `web`).
3. Once active, run a health check:
   - API: `GET https://api.<env>.blackroad.systems/api/v1/health`
   - Operator: `GET https://operator.<env>.blackroad.systems/internal/health`
   - Prism Console: `GET https://prism.<env>.blackroad.systems/health`
   - Web: `GET https://<env>.blackroad.systems/health` (root for production)
4. Verify dependent services:
   - Prism requires API; validate a simple API call (e.g., `GET /api/v1/system/overview` in production).
   - API may call Operator; ensure Operator health is green when API deploys.
5. Update status in the Master Orchestration project if required.

## DNS alignment

- Custom domains are declared in `cloudflare/DNS_BLUEPRINT.md`.
- If Railway generated a new custom domain target, update Cloudflare to point the subdomain to the new CNAME/A value.
- For new services, add both the DNS record and Railway custom domain binding at the same time to avoid downtime.

## Rollback

1. In Railway, select the prior successful deployment for the service and redeploy/rollback.
2. Re-run the health checks above.
3. If DNS was changed for the failed release, revert the Cloudflare record to the prior target.
4. Document the incident in `runbooks/incidents/` and update Season notes if the rollback indicates an infra gap.

## Multi-service releases

When a change spans API + Prism (or other combos):

1. Deploy backend (API/Operator) first; verify health.
2. Deploy frontend (Prism/Web) second; verify frontend health and a user-facing smoke (e.g., login or dashboard load).
3. Confirm environment variables (e.g., `NEXT_PUBLIC_API_BASE_URL`) match the target environment base URL.

## Local to cloud parity

- Mirror ports and base URLs from `infra/env/local.json` to `.env.local` files so local testing matches DNS expectations.
- Keep Railway environment variables aligned with the names listed in `docs/ENVIRONMENT_VARIABLES.md` to avoid drift.
