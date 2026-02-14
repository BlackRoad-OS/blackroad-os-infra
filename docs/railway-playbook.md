# Railway Playbook

This runbook documents how the `railway-service` module is used to deploy container workloads across environments.

## Overview

BlackRoad OS uses Railway for container deployments. All services are defined in `terraform/environments/{env}/services.tf` and managed via Terraform.

## Service Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Railway Project                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐    ┌──────────────────┐               │
│  │ API Gateway      │───▶│ API              │               │
│  │ :8080            │    │ :8081            │               │
│  └──────────────────┘    └────────┬─────────┘               │
│                                   │                          │
│  ┌──────────────────┐    ┌────────▼─────────┐               │
│  │ Prism Console    │    │ PostgreSQL       │               │
│  │ :3000            │    │ (Managed)        │               │
│  └──────────────────┘    └──────────────────┘               │
│                                                              │
│  ┌──────────────────┐    ┌──────────────────┐               │
│  │ Web              │    │ Directus         │               │
│  │ :3000            │    │ :8055            │               │
│  └──────────────────┘    └──────────────────┘               │
│                                                              │
│  ┌──────────────────┐    ┌──────────────────┐               │
│  │ Research         │    │ LibreChat        │               │
│  │ :8082            │    │ :3080            │               │
│  └──────────────────┘    └──────────────────┘               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Services Managed

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

## Default Service Contract

- Sets `PORT` and `RAILWAY_ENVIRONMENT` automatically.
- Deploys an image reference (default example: `ghcr.io/blackroad-os/blackroad-os-web:latest`).
- Creates the Railway-managed hostname `<service>.<environment>.railway.app`.

## Prerequisites

Before deploying:

1. **Valid Railway Project ID** - Get from Railway dashboard → Project → Settings → General
2. **RAILWAY_TOKEN** - Generate at https://railway.app/account/tokens
3. **Container images** - Must exist in GHCR before deployment
4. **Environment variables** - Set in Railway for each service

## Steps

1. Set `railway_project_id` and `gh_org` in `terraform.tfvars`.
2. Export `RAILWAY_TOKEN` for the provider.
3. Run `terraform plan` to review the upcoming deploy; plans are also posted to PRs via CI when touching `terraform/**`.
4. Apply to the desired workspace: `terraform workspace select dev` (or `new dev`), then `terraform apply`.
5. Wire DNS to the Railway hostname using the `dns-cloudflare` module once the service is healthy.

## Terraform Commands

```bash
# Initialize (with backend)
cd terraform/environments/dev
terraform init -backend-config=backend.tfvars

# Plan changes
terraform plan -var-file=terraform.tfvars

# Apply changes
terraform apply -var-file=terraform.tfvars

# View outputs (service hostnames)
terraform output railway_services
```

## Extending

- Add additional services by adding entries to `local.services` in `services.tf`.
- Inject feature flags or secrets by expanding `environment_overrides` (never commit secret values).
- Use Railway environments for isolation; Terraform workspaces mirror those names.

## Environment Variables

Secret values use the placeholder `[SECRET - stored in Railway]` in Terraform files. These indicate values that must be set directly in Railway's dashboard.

Common patterns:

```hcl
# In services.tf
env = {
  DATABASE_URL = "[SECRET - stored in Railway]"  # Set in Railway UI
  JWT_SECRET   = "[SECRET - stored in Railway]"  # Set in Railway UI
}
```

## Troubleshooting

If deployments fail, see **[Railway Troubleshooting Guide](./railway-troubleshooting.md)** for:

- Common error patterns and fixes
- Environment variable requirements per service
- Dockerfile requirements
- Pre-deployment checklist

## Related Documentation

- [Railway Troubleshooting](./railway-troubleshooting.md) - Fix deployment failures
- [DNS Playbook](./dns-playbook.md) - Configure DNS for services
- [Runners Guide](./runners.md) - GitHub Actions runners
