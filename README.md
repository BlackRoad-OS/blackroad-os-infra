# blackroad-os-infra

Control tower for BlackRoad OS infrastructure blueprints. DNS, Railway templates, and SIG schemas live here as the source of truth for every service and pack.

- Cloudflare DNS blueprints: `cloudflare/`
- Railway service templates: `railway/`
- SIG schemas and examples: `sig/` and `docs/examples/`
- Validation + generation scripts: `scripts/`
- Docs: `docs/`

Run validations locally before opening a PR:
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
/infra
  /cloudflare
    DNS_RECONCILIATION.md      # Current DNS state analysis
    DNS_CORRECTIONS_PLAN.md    # Action items for DNS cleanup
    DNS_BLUEPRINT_FINAL.yaml   # Authoritative DNS configuration
/registry
  services.yaml               # Service-to-DNS mapping
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

## DNS Reconciliation

The `/infra/cloudflare/` directory contains the authoritative DNS documentation:

- **DNS_RECONCILIATION.md** - Analysis of current Cloudflare DNS state
- **DNS_CORRECTIONS_PLAN.md** - Detailed plan for corrections and migrations
- **DNS_BLUEPRINT_FINAL.yaml** - Target DNS configuration (source of truth)

The `/registry/services.yaml` maps all BlackRoad OS services to their DNS entries and deployment targets.

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

## Providers

- Cloudflare: manages DNS CNAMEs for all BlackRoad OS services (see [dns-playbook.md](docs/dns-playbook.md) for full list).
- Railway: provisions container services and sets baseline environment variables (`PORT`, `RAILWAY_ENVIRONMENT`).
- GitHub: reserved for org runners and automation integrations.
- TLS + Null: utility providers for future modules.

## Signals

`gen_sig_beacon.ts` writes `public/sig.beacon.json` with the current timestamp and agent metadata; `apply.yml` refreshes it before persisting to the archive repo (TODO).
