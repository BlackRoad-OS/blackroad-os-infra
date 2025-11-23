# Incident Runbook

Fast-path checklists for BlackRoad OS when something breaks. Start with the relevant scenario, verify health endpoints, then check Railway and Cloudflare before escalating.

## API down (blackroad-os-api)

1. Hit health: `GET https://api.<env>.blackroad.systems/api/v1/health`.
2. If failing, check Railway logs for the `api` service; confirm latest deploy status.
3. Validate dependencies:
   - Operator health: `GET https://operator.<env>.blackroad.systems/internal/health`.
   - Database/external services: check Railway variables for configuration drift.
4. Mitigation: redeploy last good build from Railway; if domain changed, confirm Cloudflare CNAME matches `infra/env/<env>.json`.
5. Update incident notes and notify dependents (Prism, external consumers).

## Prism dashboard failing (blackroad-os-prism-console)

1. Hit health: `GET https://prism.<env>.blackroad.systems/health`.
2. If UI loads but API calls fail, test `GET https://api.<env>.blackroad.systems/api/v1/health`.
3. Check `NEXT_PUBLIC_API_BASE_URL` in Railway variables and ensure it matches the environment base URL.
4. Rollback Prism to last good deploy if regression is UI-only; if API is failing, resolve API first.

## Operator/Atlas not processing jobs (blackroad-os-operator)

1. Health: `GET https://operator.<env>.blackroad.systems/internal/health`.
2. Inspect Railway logs for errors or paused deployments.
3. Confirm event sources or queues are configured (per service docs) and that API can reach Operator endpoints.
4. If stuck after deploy, rollback to previous deployment; if DNS recently changed, ensure Cloudflare points to the correct Railway target.

## DNS misrouting or domain issues

1. Compare current Cloudflare DNS records with `cloudflare/DNS_BLUEPRINT.md` for the environment.
2. Confirm Railway custom domains still show “verified” for each service.
3. If traffic is bypassing Cloudflare, ensure proxying is enabled for public services and locked down for internal ones (Operator).
4. After adjustments, re-run service health checks and basic UI/API smoke tests.

## Communication and logging

- Record timeline, actions, and outcomes in the incident log under `runbooks/incidents/`.
- Update Season infra notes if the incident reveals missing automation or observability hooks.
- Notify stakeholders via the Master Orchestration project and relevant channels.
