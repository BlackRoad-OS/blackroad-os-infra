# blackroad-os-infra

Infrastructure-as-code and operational runbooks for the BlackRoad OS ecosystem. This repo defines Terraform scaffolding, shared modules, and checklists so humans and agents can manage environments consistently—no direct cloud console edits.

## How Things Connect

```
Code Repos (api, core, web, prism-console, agents)
           ↓
   Terraform Modules (dns, networking, app_service, monitoring, secrets)
           ↓
     Environments (dev → staging → prod)
           ↓
   Platforms (Railway, Cloudflare)
```

## Key Folders

- `envs/` — Environment definitions (`dev`, `staging`, `prod`) that compose shared modules
- `modules/` — Reusable Terraform modules (`networking`, `dns`, `app_service`, `monitoring`, `secrets`)
- `runbooks/` — Deployment, incident, and maintenance checklists for humans/agents
- `docs/` — Environment/DNS/Railway/observability guides plus legacy lane docs

## Operating Rules

- All infrastructure changes flow through this repo and pull requests.
- Prefer environment variables for credentials (e.g., `CLOUDFLARE_API_TOKEN`) once secret storage is wired.
- Keep dev/staging/prod configurations aligned; document intentional drift.

## Getting Started

1. Pick an environment under `envs/<env>` and review its README.
2. Configure required variables (tfvars or environment variables).
3. Run Terraform:

```bash
terraform init
terraform plan -var-file=<env>.tfvars
terraform apply -var-file=<env>.tfvars
```

## Runbooks and Docs

- Deployment playbook: `runbooks/deployments/core_services.md`
- Incident response: `runbooks/incidents/`
- Maintenance: `runbooks/maintenance/`
- Guides: `docs/env-overview.md`, `docs/cloudflare-dns-blueprint.md`, `docs/railway-guide.md`, `docs/observability-and-alerts.md`

> TODO(agent/human): Fill in real provider credentials, Railway automation, and monitoring integrations as the platform matures.
