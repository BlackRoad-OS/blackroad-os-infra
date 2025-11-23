# Railway Services Mapping

Railway hosts the runtime services for BlackRoad OS. This mapping keeps service names, repos, and domains aligned so future Terraform/Pulumi automation can attach custom domains and environment variables consistently.

## Project: BlackRoad OS (Production)

- Service: `web`
  - Repo: `BlackRoad-OS/blackroad-os-web`
  - Domain: `blackroad.systems`
  - Health: `GET /health`

- Service: `api`
  - Repo: `BlackRoad-OS/blackroad-os-api`
  - Domain: `api.blackroad.systems`
  - Health: `GET /api/v1/health`

- Service: `prism-console`
  - Repo: `BlackRoad-OS/blackroad-os-prism-console`
  - Domain: `prism.blackroad.systems`
  - Health: `GET /health`
  - Depends on: `api`

- Service: `operator`
  - Repo: `BlackRoad-OS/blackroad-os-operator`
  - Domain: `operator.blackroad.systems` (internal)
  - Health: `GET /internal/health`

- Service: `docs`
  - Repo: `BlackRoad-OS/blackroad-os-docs`
  - Domain: `docs.blackroad.systems`
  - Health: `GET /health`

- Service: `home`
  - Repo: `BlackRoad-OS/blackroad-os-home`
  - Domain: `home.blackroad.systems`
  - Health: `GET /health`

- Service: `brand`
  - Repo: `BlackRoad-OS/blackroad-os-brand`
  - Domain: `brand.blackroad.systems`
  - Health: `GET /health`

- Service: `ideas`
  - Repo: `BlackRoad-OS/blackroad-os-ideas`
  - Domain: `ideas.blackroad.systems`
  - Health: `GET /health`

- Service: `demo`
  - Repo: `BlackRoad-OS/blackroad-os-demo`
  - Domain: `demo.blackroad.systems`
  - Health: `GET /health`

- Service: `research`
  - Repo: `BlackRoad-OS/blackroad-os-research`
  - Domain: `research.blackroad.systems`
  - Health: `GET /health`

## Project: BlackRoad OS (Staging)

Mirror production with staging domains and lighter resource plans. Attach the same services with `*.staging.blackroad.systems` domains. Health endpoints remain the same.

## Project: BlackRoad OS (Development)

Use `*.dev.blackroad.systems` domains and enable preview deployments as needed. Wildcard records can map to short-lived Railway deployments while canonical subdomains point to the shared dev environment.

## Local workflows

Local development is outside Railway but mirrors naming: services run on `localhost` with the ports documented in `infra/services.yml` and `infra/env/local.json`. Keep Railway environment variables in sync with local `.env` defaults via `ENVIRONMENT_VARIABLES.md`.
