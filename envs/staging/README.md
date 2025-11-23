# Staging Environment

Staging is the pre-production proving ground. Use it to rehearse production changes, validate migrations, and mirror prod topology as closely as possible without impacting customers.

## Running Terraform

```bash
terraform init
terraform plan -var-file=staging.tfvars
terraform apply -var-file=staging.tfvars
```

### Required Variables and Secrets

- `cloudflare_email` and `cloudflare_api_token` (prefer environment variables when available)
- `base_domain`, `zone_name`, and the `records` list for staging hostnames
- Monitored services list (`services`) and any `secrets` entries required by downstream modules

## Safety Checklist Before `apply`

- [ ] Confirm you are in the `staging` directory
- [ ] Ensure tfvars reference staging resources only
- [ ] Review Terraform plan with a second person for riskier changes
- [ ] Verify staging CI/CD pipelines are green before promoting builds

## What Runs Here

- Pre-production builds for `blackroad-os-web`, `blackroad-os-api`, `blackroad-os-core`, and console
- Integration testing against production-like data and DNS patterns (e.g., `*.stg.blackroad.systems`)
- Dress rehearsals for production incidents and rollbacks
