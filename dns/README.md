# DNS Configuration (Legacy Placeholder)

DNS infrastructure-as-code is now modeled in the Terraform [`modules/dns`](../modules/dns/) module and wired through environment definitions in `envs/<env>`. This directory is kept for historical reference.

## Where to Look

- Cloudflare zone and records: `modules/dns`
- Environment-specific records: `envs/<env>/variables.tf` or tfvars
- Operational steps: `docs/cloudflare-dns-blueprint.md`
