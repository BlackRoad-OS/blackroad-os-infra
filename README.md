# blackroad-os-infra 🌐🛠️

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
  runners.md

/public                # Public artifacts
  sig.beacon.json

.gitignore             # Prevents secrets/binaries
infra.env.example      # Example environment file
```

## 🚀 Quickstart

### Validate Infrastructure Configurations

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

- **Issues**: Open an issue in this repository
- **Discussions**: Use GitHub Discussions
- **Emergency**: infrastructure@blackroad.io

---

**Maintained By**: BlackRoad OS Infrastructure Team  
**Last Updated**: 2025-11-24  
**License**: Private

🌍 Building the future of autonomous systems, one config at a time. 🤖✨
