# Seasons Infra Notes

BlackRoad OS tracks architectural progress in Seasons. This file links infra milestones to each Season so the service registry, DNS plans, and Railway mapping stay aligned with the broader roadmap.

## Season 1 — Baseline

- Single-service deployments validated (web/API as pioneers).
- Manual DNS and Railway configuration, but documented in `cloudflare/DNS_BLUEPRINT.md` and `infra/railway/services.md`.
- Minimal observability with manual checks.

## Season 2 — Multi-repo cohesion (current focus)

- All `blackroad-os-*` repos registered in `infra/services.yml` with base URLs and health endpoints.
- Environment maps defined for `local`, `development`, `staging`, `production` in `infra/env/`.
- Cloudflare DNS blueprint captured in `cloudflare/DNS_BLUEPRINT.md`.
- Railway mapping aligned in `infra/railway/services.md`.
- Runbooks (`docs/DEPLOYMENT_RUNBOOK.md`, `docs/INCIDENT_RUNBOOK.md`) kept in sync with service registry.

## Season 3 — Automation + Observability

- Terraform/Pulumi generates Railway services, custom domains, and Cloudflare records from the service registry.
- Centralized logging/metrics with alerts tied to health endpoints.
- Automated smoke tests and synthetic checks for every environment.

## Season 4 — Resilience and Scale

- Blue/green or canary deploys for API and Prism.
- Multi-region or edge-aware routing for public surfaces.
- Disaster recovery drills documented and automated rollback scripts.

## How to keep this file accurate

- Update Season 2 items as they complete (e.g., when Railway project IDs are known).
- Add Season 3/4 milestones as automation lands or new platforms are adopted.
- Reference this doc when opening infra tasks in the Master Orchestration project to ensure work ties to a Season milestone.
