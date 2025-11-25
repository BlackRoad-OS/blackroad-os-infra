# blackroad-os-infra

Infra-Gen-0 scaffold for a single-source Terraform repo that can recreate BlackRoad OS DNS, Railway services, and GitHub runners on demand.

## Layout

```
/terraform              # providers + shared modules
  main.tf
  variables.tf
  outputs.tf
  versions.tf
  /environments
    dev/
      backend.tfvars
      terraform.tfvars
    prod/
      backend.tfvars
      terraform.tfvars
/modules
  dns-cloudflare/
  railway-service/
/infra                  # Cloud infrastructure blueprints
  /cloudflare
    DNS_BLUEPRINT.md    # DNS mapping for all 16 domains
  /railway
    SERVICES_MATRIX.md  # Railway deployment topology
  /github
    REPO_AUTOWIRE.yml   # GitHub repo auto-wiring config
/registry
  services.yaml         # Unified services registry
/scripts
  fmt.sh                # terraform fmt + lint wrapper
  gen_sig_beacon.ts     # writes public/sig.beacon.json
/docs
  dns-playbook.md
  railway-playbook.md
  runners.md
/.github/workflows
  plan.yml
  apply.yml
/public
  sig.beacon.json
infra.env.example
```

Docs are plain Markdown and ready to render with [`docsify`](https://docsify.js.org/): run `npx docsify serve docs` to preview locally.

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

## Providers

- Cloudflare: manages DNS CNAMEs for `web`, `research`, `chat`, `brand`, `prism`, `archive`.
- Railway: provisions container services and sets baseline environment variables (`PORT`, `RAILWAY_ENVIRONMENT`).
- GitHub: reserved for org runners and automation integrations.
- TLS + Null: utility providers for future modules.

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
