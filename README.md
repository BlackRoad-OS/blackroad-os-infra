# blackroad-os-infra ☁️🛠️

> **Infra Brain** – infrastructure-as-code, DNS, Cloudflare, Railway envs, and deployment runbooks for BlackRoad OS.

📋 **[View the Full Repo Charter →](REPO_CHARTER.md)**

---

## 🚀 Quick Links

### 📓 Runbooks & Playbooks
- 🚨 **[Incident Playbooks](docs/runbooks/)** - Site down, DNS misroute, bad deploy
- 🔑 [Key Rotation](docs/runbooks/key-rotation.md) - Secret rotation procedures
- 🚂 [Railway Playbook](docs/railway-playbook.md) - Deployment procedures
- 🌐 [DNS Playbook](docs/dns-playbook.md) - DNS configuration
- 🔧 [Railway Troubleshooting](docs/railway-troubleshooting.md) - Fix deployment failures

### ☁️ Cloudflare Documentation
- 📖 **[Cloudflare Complete Guide](docs/CLOUDFLARE_COMPLETE_GUIDE.md)** - Complete how-to for all operations
- 🌐 [Cloudflare Zones Reference](docs/CLOUDFLARE_ZONES_REFERENCE.md) - Zone IDs, DNS records, Pages projects
- 📚 [Cloudflare Index](docs/CLOUDFLARE_INDEX.md) - Master documentation index
- ⚡ [Quick Reference](cloudflare/CLOUDFLARE_QUICK_REFERENCE.md) - Common commands cheat sheet

### 📊 Observability
- 📝 [Logging Conventions](docs/observability/logging.md) - Structured logging patterns
- 🧬 [Correlation IDs](docs/observability/correlation-ids.md) - Request tracing
- ❤️‍🩹 [Health Endpoints](docs/observability/health-endpoints.md) - Health check standards
- 🔗 [Dashboards](docs/observability/dashboards.md) - Monitoring links

### 🧩 Registries & Blueprints
- 📋 [Service Registry](registry/services.yaml) - All services mapping
- 🌐 [DNS Blueprint](cloudflare/CLOUDFLARE_DNS_BLUEPRINT.md) - DNS configuration
- 🧭 [Environments](environments/environments.yml) - Environment definitions
- 🧬 [Service Template](templates/SERVICE_INFRA_TEMPLATE.md) - New service template
- 📝 [Operational Templates](docs/operational-templates/README.md) - Business process templates (v83)

### 🤖 Agents & Automation
- 🔐 **[Gaia Agent](agents/GAIA.md)** - Truth verification and hash generation
- 🎯 [Agent Orchestrator](agents/src/orchestrator.ts) - Agent coordination system
- ⚡ [Truth Manifest Workflow](.github/workflows/gaia-truth-manifest.yml) - Automated manifest generation

### 🎨 Visual Resources
- 🧩 **[Forge Shapes Chart Pack](docs/FORGE_SHAPES_CHART_PACK.md)** - Visual pattern library (triangles, diamonds, waves, spirals, gates)
- 🚦 [Trinity System](trinity/README.md) - Complete visual language framework

---

**Infrastructure-as-Code repository for BlackRoad OS**

Single source of truth for infrastructure definitions, environment configurations, deployment settings, and DNS mappings across the BlackRoad OS ecosystem.

## 🎯 Purpose

This repository defines and maintains:

- 🏗️ Infrastructure definitions (Terraform IaC)
- 🛰️ Environment configurations: `local`, `staging`, `prod`
- 🚂 Deployment configurations for Railway (and other providers)
- 🌐 DNS blueprints for Cloudflare
- 🤖 CI/CD pipeline templates
- 🧩 Service infrastructure blueprints

**What this repo is NOT:**
- ❌ Application source code (belongs in service repos)
- ❌ Secret storage (secrets live in Railway/GitHub Secrets)
- ❌ Binary/media storage

## 📁 Repository Structure

Run validations locally before opening a PR:
```
/environments           # Environment definitions
  environments.yml      # Central manifest (local, staging, prod)
  /local               # Local development environment docs
  /staging             # Staging environment docs
  /prod                # Production environment docs

/services              # Service infrastructure blueprints
  /api                 # blackroad-os-api configuration
  /operator            # blackroad-os-operator configuration
  /web                 # blackroad-os-web configuration
  /prism-console       # blackroad-os-prism-console configuration
  /packs               # Pack system configurations

/cloudflare            # Cloudflare DNS configuration
  CLOUDFLARE_DNS_BLUEPRINT.md  # DNS mappings and settings
  /zones               # Zone export references (no secrets)

/railway               # Railway deployment configurations
  railway.blackroad-os-api.toml
  railway.blackroad-os-operator.toml
  railway.blackroad-os-web.toml
  railway.blackroad-os-prism-console.toml
  README.md            # Railway deployment guide

/github                # GitHub Actions templates
  /workflows
    service-ci.yml     # CI template
    service-cd.yml     # CD template
    README.md          # Workflow documentation

/templates             # Reusable templates
  .env.example         # Environment variables template
  SERVICE_INFRA_TEMPLATE.md  # New service template

/terraform             # Terraform IaC (existing)
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
    /dev
    /prod
  /modules
    /dns-cloudflare
    /railway-service

/scripts               # Automation scripts
  validate-infra.ts    # Validate infrastructure configs
  gen_sig_beacon.ts    # Generate signal beacon
  fmt.sh               # Terraform format/lint

/docs                  # Documentation (existing)
  dns-playbook.md
  railway-playbook.md
  railway-troubleshooting.md
  runners.md

/public                # Public artifacts
  sig.beacon.json

.gitignore             # Prevents secrets/binaries
infra.env.example      # Example environment file
```

## 🚀 Quickstart

### Validate Infrastructure Configurations

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
```bash
# Install dependencies
npm install

# Validate all configurations
npm run validate
```

### Terraform Operations

```bash
# One-shot dev plan
cd terraform/environments/dev
terraform init -backend-config=backend.tfvars
terraform plan -var-file=terraform.tfvars
```

**Required Environment Variables:**
- `TF_STATE_BUCKET` - Terraform state storage
- `CLOUDFLARE_API_TOKEN` - Cloudflare API access
- `RAILWAY_TOKEN` - Railway API access
- `GITHUB_TOKEN` - GitHub API access

### Local Development

```bash
# Generate signal beacon
npm run gen:sig

# Format Terraform files
npm run lint:infra

# Preview documentation
npx docsify serve docs
```

### Gaia Truth Verification

BlackRoad OS includes the Gaia agent for cryptographic verification:

```bash
# Generate Truth Manifest
cd cli && npm run build
node dist/index.js gaia --manifest

# Verify a component
node dist/index.js gaia --verify blackroad-os-core

# Generate SHA-256 hash
node dist/index.js gaia --hash "component-data"

# Output as JSON for automation
node dist/index.js gaia --manifest --json
```

**Learn more:** [Gaia Agent Documentation](agents/GAIA.md)

## 🌍 Environments

Three environments are defined:

1. **Local** - Developer machines and local Docker
2. **Staging** - Pre-production testing environment
3. **Production** - Customer-facing, stable environment

See `environments/environments.yml` for the central manifest.

## 🔧 Core Services

BlackRoad OS consists of these core services:

| Service | Description | Port | Domain (Prod) |
|---------|-------------|------|---------------|
| **api** | Public API Gateway | 8080 | api.blackroad.io |
| **operator** | Background Worker | 8082 | operator.blackroad.io |
| **web** | Marketing Website | 3000 | blackroad.io |
| **prism-console** | Admin Console | 3001 | prism.blackroad.io |
| **core** | Database & Logic | 8081 | (internal) |

Each service has an infrastructure blueprint in `services/{service-name}/infra.yml`.

## 📋 Adding a New Service

1. **Copy the template:**
   ```bash
   cp templates/SERVICE_INFRA_TEMPLATE.md services/{service-name}/infra.yml
   ```

2. **Fill in service details** (name, ports, dependencies, env vars)

3. **Create Railway configuration:**
   ```bash
   cp railway/railway.blackroad-os-api.toml railway/railway.{service-name}.toml
   ```

4. **Update DNS blueprint** in `cloudflare/CLOUDFLARE_DNS_BLUEPRINT.md`

5. **Validate configuration:**
   ```bash
   npm run validate
   ```

6. **Deploy to staging, then production**

See `templates/SERVICE_INFRA_TEMPLATE.md` for detailed checklist.

## 🌐 DNS Configuration

DNS is managed through Cloudflare. All mappings are documented in:

**`cloudflare/CLOUDFLARE_DNS_BLUEPRINT.md`**

This blueprint defines:
- Apex domains
- Service subdomains
- Pack subdomains
- TLS/SSL settings
- Security configurations
- Health check endpoints

**Important:** The blueprint documents the *desired state* - actual DNS is configured via Terraform or Cloudflare dashboard.

## 🚂 Railway Deployments

Railway configurations are in `railway/` directory:

- `railway.blackroad-os-api.toml`
- `railway.blackroad-os-operator.toml`
- `railway.blackroad-os-web.toml`
- `railway.blackroad-os-prism-console.toml`

These files document build commands, environment variables (names only), and deployment settings.

**Secrets are NEVER stored here** - they're managed in Railway dashboard.

## 🤖 CI/CD Templates

GitHub Actions workflow templates are in `github/workflows/`:

- `service-ci.yml` - Continuous Integration (lint, test, build)
- `service-cd.yml` - Continuous Deployment (deploy to Railway)

Copy these to individual service repositories and customize.

## 🔒 Security Policy

### No Secrets, No Binaries

This repository follows strict rules:

✅ **DO commit:**
- YAML/TOML configuration files
- Markdown documentation
- TypeScript/JavaScript scripts
- Terraform definitions
- Template files

❌ **NEVER commit:**
- API keys, tokens, passwords
- Database connection strings
- TLS certificates or private keys
- Binary files (images, PDFs, zips)
- Environment files with real values (`.env`)

The `.gitignore` enforces this policy.

### Secret Management

Secrets are stored in:
- **Railway**: Environment variables per service
- **GitHub**: Repository/organization secrets for CI/CD
- **Local**: `.env.local` files (git-ignored)

## ✅ Validation

The validation script checks:
- Environment definitions are complete
- All core services have infrastructure files
- Railway configs exist and are valid
- No hardcoded secrets in configs

Run: `npm run validate`

## 🏗️ Terraform Providers

- **Cloudflare**: DNS CNAME management
- **Railway**: Container service provisioning  
- **GitHub**: Org runners and automation (planned)
- **TLS + Null**: Utility providers

See `terraform/` directory for IaC definitions.

## 📚 Documentation

- **Environment Configs**: `environments/`
- **Service Blueprints**: `services/`
- **DNS Blueprint**: `cloudflare/CLOUDFLARE_DNS_BLUEPRINT.md`
- **Railway Guide**: `railway/README.md`
- **Workflow Templates**: `github/workflows/README.md`
- **Service Template**: `templates/SERVICE_INFRA_TEMPLATE.md`

### Existing Terraform Docs
- DNS Playbook: `docs/dns-playbook.md`
- Railway Playbook: `docs/railway-playbook.md`
- Runners: `docs/runners.md`

## 🧠 Philosophy

This repository embodies the principle of **"boring infrastructure"**:

- ✅ Predictable and reproducible
- ✅ Declarative over imperative
- ✅ Documentation as code
- ✅ Single source of truth
- ✅ No surprises, no magic

Infrastructure should be boring so that applications can be exciting.

## 🤝 Contributing

When adding or modifying infrastructure:

1. **Update configurations** (environments, services, DNS)
2. **Run validation**: `npm run validate`
3. **Test in staging first**
4. **Document changes** in relevant files
5. **Update this README** if structure changes
6. **Never commit secrets**

## 🔗 Related Repositories

BlackRoad OS ecosystem:
- [blackroad-os-core](https://github.com/BlackRoad-OS/blackroad-os-core) - Core service
- [blackroad-os-api](https://github.com/BlackRoad-OS/blackroad-os-api) - API gateway
- [blackroad-os-operator](https://github.com/BlackRoad-OS/blackroad-os-operator) - Background worker
- [blackroad-os-web](https://github.com/BlackRoad-OS/blackroad-os-web) - Marketing site
- [blackroad-os-prism-console](https://github.com/BlackRoad-OS/blackroad-os-prism-console) - Admin console

## 📞 Support

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
- **Issues**: Open an issue in this repository
- **Discussions**: Use GitHub Discussions
- **Emergency**: infrastructure@blackroad.io

---

**Maintained By**: BlackRoad OS Infrastructure Team  
**Last Updated**: 2025-11-24  
**License**: Private

🌍 Building the future of autonomous systems, one config at a time. 🤖✨
