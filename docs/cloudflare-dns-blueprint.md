# Cloudflare DNS Blueprint

## Base Zone

- Primary zone: `blackroad.systems`
- Subdomains per environment follow the pattern `<service>.<env>.blackroad.systems` or `<env>-<service>.blackroad.systems` as needed.

## Naming Conventions

- `env-service.blackroad.systems` (e.g., `dev-api.blackroad.systems`, `stg-web.blackroad.systems`)
- `service.env.blackroad.systems` when Cloudflare-specific rules make it cleaner (e.g., `api.dev.blackroad.systems`)

## Managing DNS via Terraform

1. Add or update records in the environment `records` variable (`envs/<env>/variables.tf` or tfvars)
2. Run `terraform plan -var-file=<env>.tfvars` to review changes
3. Run `terraform apply -var-file=<env>.tfvars`
4. Verify in Cloudflare dashboard or with `dig`

## Module Behavior

- The [`dns` module](../modules/dns) creates/associates the Cloudflare zone and provisions records declared in `records`.
- Outputs expose `zone_id` and per-record IDs to feed downstream automation.

> TODO(agent): Add MX/TXT/SRV support and automatic TLS/HTTP routing policies as services mature.
