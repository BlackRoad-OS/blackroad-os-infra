# Railway Playbook

This runbook documents how the `railway-service` module is used to deploy container workloads across environments.

## Default service contract

- Sets `PORT` and `RAILWAY_ENVIRONMENT` automatically.
- Deploys an image reference (default example: `ghcr.io/blackroad-os/blackroad-os-web:latest`).
- Creates the Railway-managed hostname `<service>.<environment>.railway.app`.

## Steps

1. Set `railway_project_id` and `gh_org` in `terraform.tfvars`.
2. Export `RAILWAY_TOKEN` for the provider.
3. Run `terraform plan` to review the upcoming deploy; plans are also posted to PRs via CI when touching `terraform/**`.
4. Apply to the desired workspace: `terraform workspace select dev` (or `new dev`), then `terraform apply`.
5. Wire DNS to the Railway hostname using the `dns-cloudflare` module once the service is healthy.

## Extending

- Add additional services by instantiating more `railway-service` module blocks in `terraform/main.tf`.
- Inject feature flags or secrets by expanding `environment_overrides` (never commit secret values).
- Use Railway environments for isolation; Terraform workspaces mirror those names.
