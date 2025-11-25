# blackroad-os-infra

Control tower for BlackRoad OS infrastructure blueprints. DNS, Railway templates, and SIG schemas live here as the source of truth for every service and pack.

- Cloudflare DNS blueprints: `cloudflare/`
- Railway service templates: `railway/`
- SIG schemas and examples: `sig/` and `docs/examples/`
- Validation + generation scripts: `scripts/`
- Docs: `docs/`
## Quick Links

- 🚨 **[Railway Troubleshooting Guide](docs/railway-troubleshooting.md)** - Fix deployment failures
- 📘 [Railway Playbook](docs/railway-playbook.md) - Standard deployment procedures
- 🌐 [DNS Playbook](docs/dns-playbook.md) - DNS configuration

## Layout

Run validations locally before opening a PR:
```
/terraform              # providers + shared modules
  main.tf
  variables.tf
  outputs.tf
  versions.tf
  /environments
    dev/
      main.tf
      services.tf       # Service definitions (9 services)
      backend.tfvars
      terraform.tfvars
    prod/
      main.tf
      services.tf       # Service definitions (9 services)
      backend.tfvars
      terraform.tfvars
/modules
  dns-cloudflare/
  railway-service/
/infra
  /cloudflare
    DNS_RECONCILIATION.md      # Current DNS state analysis
    DNS_CORRECTIONS_PLAN.md    # Action items for DNS cleanup
    DNS_BLUEPRINT_FINAL.yaml   # Authoritative DNS configuration
/registry
  services.yaml               # Service-to-DNS mapping
/infra                  # Cloud infrastructure blueprints
  /cloudflare
    DNS_BLUEPRINT.md    # DNS mapping for all 16 domains
  /railway
    SERVICES_MATRIX.md  # Railway deployment topology
  /github
    REPO_AUTOWIRE.yml   # GitHub repo auto-wiring config
/registry
  services.yaml         # Unified services registry
/infra                  # Workers & Pages orchestration
  /cloudflare
    WORKERS_PAGES_MAP.md     # Workers ↔ Pages ↔ DNS connection map
    MISSING_BINDINGS.md      # Missing bindings tracker
  /github
    AUTOWIRE_WORKFLOWS.yml   # Auto-wire deployment workflow
/registry
  services-map.yaml          # Source of truth for all deployments
/scripts
  fmt.sh                # terraform fmt + lint wrapper
  gen_sig_beacon.ts     # writes public/sig.beacon.json
/docs
  dns-playbook.md
  railway-playbook.md
  railway-troubleshooting.md
  runners.md
/.github/workflows
  plan.yml
  apply.yml
/public
  sig.beacon.json
infra.env.example
```

Docs are plain Markdown and ready to render with [`docsify`](https://docsify.js.org/): run `npx docsify serve docs` to preview locally.

## DNS Reconciliation

The `/infra/cloudflare/` directory contains the authoritative DNS documentation:

- **DNS_RECONCILIATION.md** - Analysis of current Cloudflare DNS state
- **DNS_CORRECTIONS_PLAN.md** - Detailed plan for corrections and migrations
- **DNS_BLUEPRINT_FINAL.yaml** - Target DNS configuration (source of truth)

The `/registry/services.yaml` maps all BlackRoad OS services to their DNS entries and deployment targets.
## Managed Services

The following Railway services are managed by this infrastructure:

| Service | Port | Description |
|---------|------|-------------|
| blackroad-os-api-gateway | 8080 | API routing and rate limiting |
| blackroad-os-api | 8081 | Core backend API |
| blackroad-os-web | 3000 | Marketing website |
| blackroad-os-prism-console | 3000 | Admin dashboard |
| blackroad-os-research | 8082 | AI/ML research platform |
| blackroad-os-ideas | 8083 | Idea management |
| blackroad-os-operator | 8084 | System operations |
| directus | 8055 | Headless CMS |
| librechat | 3080 | Chat interface |

## Quickstart

```bash
npm ci
npm run build:types
npm run validate:dns
npm run validate:railway
```

- Export `TF_STATE_BUCKET`, `CLOUDFLARE_API_TOKEN`, `RAILWAY_TOKEN`, and `GITHUB_TOKEN` before running Terraform.
- Terraform workspaces mirror environment names (`dev`, `prod`).
- CI posts plan output to PRs touching `terraform/**`; applies run on merge or manual dispatch.

## Prerequisites

1. **Railway Project ID** - Update `railway_project_id` in `terraform.tfvars` (replace placeholder)
2. **RAILWAY_TOKEN** - Generate at https://railway.app/account/tokens
3. **Container Images** - Each service needs a Dockerfile and built image in GHCR
4. **Environment Variables** - Set secrets directly in Railway dashboard

## Providers

- Cloudflare: manages DNS CNAMEs for all BlackRoad OS services (see [dns-playbook.md](docs/dns-playbook.md) for full list).
- Cloudflare: manages DNS CNAMEs for `web`, `research`, `chat`, `brand`, `prism`, `archive`, `api`, `operator`, `core`, `infra`, `docs`, `console`.
- Railway: provisions container services and sets baseline environment variables (`PORT`, `RAILWAY_ENVIRONMENT`).
- GitHub: reserved for org runners and automation integrations.
- TLS + Null: utility providers for future modules.

## Troubleshooting Deployment Failures

If you see multiple Railway services failing simultaneously, the most common causes are:

1. **Missing environment variables** (90% of cases)
2. **Incomplete Dockerfiles** in service repositories
3. **Placeholder project IDs** not replaced with real values

See the **[Railway Troubleshooting Guide](docs/railway-troubleshooting.md)** for detailed diagnosis and fixes.
## Workers & Pages Orchestration

The `/infra` directory contains the Workers & Pages orchestration system that maps live Cloudflare Pages deployments to custom domains:

| Service          | Pages URL                             | Custom Domain                  |
|------------------|---------------------------------------|--------------------------------|
| api              | blackroad-os-api.pages.dev            | api.blackroad.systems          |
| web              | blackroad-os-web.pages.dev            | blackroad.systems              |
| operator         | blackroad-os-operator.pages.dev       | operator.blackroad.systems     |
| prism            | blackroad-os-prism.pages.dev          | prism.blackroad.systems        |
| prism-console    | blackroad-os-prism-console.pages.dev  | console.blackroad.systems      |
| docs             | blackroad-os-docs.pages.dev           | docs.blackroad.systems         |
| brand            | blackroad-os-brand.pages.dev          | brand.blackroad.systems        |
| research         | blackroad-os-research.pages.dev       | research.blackroad.systems     |
| infra            | blackroad-os-infra.pages.dev          | infra.blackroad.systems        |
| core             | blackroad-os-core.pages.dev           | core.blackroad.systems         |

See `/registry/services-map.yaml` for the full services registry.

## Signals

`gen_sig_beacon.ts` writes `public/sig.beacon.json` with the current timestamp and agent metadata; `apply.yml` refreshes it before persisting to the archive repo (TODO).

## Cloud Infrastructure Bootstrap

The `/infra` and `/registry` directories contain the unified cloud infrastructure blueprints:

### Domain Management (16 Domains)

See [`/infra/cloudflare/DNS_BLUEPRINT.md`](infra/cloudflare/DNS_BLUEPRINT.md) for the complete DNS mapping across all BlackRoad domains:

- **Primary Hub:** `blackroad.systems` (api, operator, prism, docs, static, web)
- **Quantum Brand:** `blackroadquantum.com`, `.net`, `.info`, `.shop`, `.store`
- **Core Domains:** `blackroad.io`, `.me`, `.network`, `blackroadai.com`, `blackroadqi.com`, `blackroadinc.us`
- **Partner Brands:** `aliceqi.com`, `lucidia.earth`, `lucidiaqi.com`, `lucidia.studio`

### Railway Services

See [`/infra/railway/SERVICES_MATRIX.md`](infra/railway/SERVICES_MATRIX.md) for the deployment topology:

| Service | Repo | Domain | Environments |
|---------|------|--------|--------------|
| api | blackroad-os-api | api.blackroad.systems | prod, staging, dev |
| operator | blackroad-os-operator | operator.blackroad.systems | prod, staging |
| web | blackroad-os-web | blackroad.systems | prod, staging, dev |
| prism | blackroad-os-prism-console | prism.blackroad.systems | prod, staging |
| docs | blackroad-os-docs | docs.blackroad.systems | prod |
| archive | blackroad-os-archive | archive.blackroad.systems | prod |

### GitHub Repository Auto-Wiring

See [`/infra/github/REPO_AUTOWIRE.yml`](infra/github/REPO_AUTOWIRE.yml) for standardized repository configuration including:

- Default branch settings
- CODEOWNERS templates
- Workflow skeletons (lint, build, deploy)
- Project auto-add integration
- Health and version endpoint templates
- Environment variable templates

### Unified Services Registry

See [`/registry/services.yaml`](registry/services.yaml) for the single source of truth consolidating all domains, services, and repository mappings.
