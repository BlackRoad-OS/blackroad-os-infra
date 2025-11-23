# blackroad-os-infra

`blackroad-os-infra` is the infrastructure and environment coordination repo for BlackRoad OS. It defines the service registry, environment maps, Railway mappings, DNS plans, and operational runbooks so humans and agents can see what runs where and how services connect.

## Purpose

- Capture a single source of truth for BlackRoad OS environments (local, development, staging, production).
- Map services to Railway projects and Cloudflare DNS without storing secrets.
- Provide runbooks for deployments, incidents, and Season progress.
- Keep naming, domains, and health endpoints consistent across all `blackroad-os-*` repos.

## Key artifacts

- `infra/services.yml` — Service registry with repos, base URLs, and health endpoints.
- `infra/env/*.json` — Environment maps (domain roots, Railway project IDs, per-service base URLs).
- `infra/railway/services.md` — Railway service mappings by environment.
- `cloudflare/DNS_BLUEPRINT.md` — DNS plan for production, staging, and development.
- `docs/DEPLOYMENT_RUNBOOK.md` — How to deploy safely via Railway and DNS.
- `docs/INCIDENT_RUNBOOK.md` — Checklists for common outage scenarios.
- `docs/SEASONS_INFRA_NOTES.md` — How infra aligns to the Season roadmap.
- `docs/ENVIRONMENT_VARIABLES.md` — Canonical environment variable/secret names (no values).

Legacy Terraform scaffolding remains under `modules/` and `envs/`; prefer the `infra/` directory for the current single-source-of-truth documents until automation is reintroduced.

## Relationship to other repos

This repo documents how the sibling services are wired:

- `blackroad-os-core` — domain types and primitives (library only)
- `blackroad-os-operator` — agent runtime and jobs
- `blackroad-os-api` — typed API gateway
- `blackroad-os-prism-console` — operator console UI
- `blackroad-os-web` — public-facing landing shell
- `blackroad-os-docs` — canonical documentation site
- `blackroad-os-home`, `blackroad-os-brand`, `blackroad-os-ideas`, `blackroad-os-demo`, `blackroad-os-research` — satellite experiences

All work participates in the "BlackRoad OS - Master Orchestration" project; keep service registry and runbooks in sync with changes across repos.

## Guardrails

- Do **not** store secrets or live tokens here.
- Keep environment names consistent (`local`, `development`, `staging`, `production`).
- Use the service registry and environment maps as the source for future Terraform/Pulumi generation and Cloudflare/Railway updates.
