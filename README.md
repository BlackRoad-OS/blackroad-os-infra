# blackroad-os-infra

Infra-Gen-0 scaffold for a single-source Terraform repo that can recreate BlackRoad OS DNS, Railway services, and GitHub runners on demand.

## Quick Links

- 🚨 **[Railway Troubleshooting Guide](docs/railway-troubleshooting.md)** - Fix deployment failures
- 📘 [Railway Playbook](docs/railway-playbook.md) - Standard deployment procedures
- 🌐 [DNS Playbook](docs/dns-playbook.md) - DNS configuration

## Layout

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
# one-shot dev plan
cd terraform/environments/dev
terraform init -backend-config=backend.tfvars
terraform plan -var-file=terraform.tfvars
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

- Cloudflare: manages DNS CNAMEs for `web`, `research`, `chat`, `brand`, `prism`, `archive`.
- Railway: provisions container services and sets baseline environment variables (`PORT`, `RAILWAY_ENVIRONMENT`).
- GitHub: reserved for org runners and automation integrations.
- TLS + Null: utility providers for future modules.

## Troubleshooting Deployment Failures

If you see multiple Railway services failing simultaneously, the most common causes are:

1. **Missing environment variables** (90% of cases)
2. **Incomplete Dockerfiles** in service repositories
3. **Placeholder project IDs** not replaced with real values

See the **[Railway Troubleshooting Guide](docs/railway-troubleshooting.md)** for detailed diagnosis and fixes.

## Signals

`gen_sig_beacon.ts` writes `public/sig.beacon.json` with the current timestamp and agent metadata; `apply.yml` refreshes it before persisting to the archive repo (TODO).
