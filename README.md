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

- Cloudflare: manages DNS CNAMEs for `web`, `research`, `chat`, `brand`, `prism`, `archive`, `api`, `operator`, `core`, `infra`, `docs`, `console`.
- Railway: provisions container services and sets baseline environment variables (`PORT`, `RAILWAY_ENVIRONMENT`).
- GitHub: reserved for org runners and automation integrations.
- TLS + Null: utility providers for future modules.

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
