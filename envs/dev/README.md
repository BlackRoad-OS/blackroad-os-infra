# Development Environment

The development environment hosts experimental and in-progress services. Expect frequent changes and occasional instability while feature work iterates quickly.

## Running Terraform

```bash
terraform init
terraform plan -var-file=dev.tfvars
terraform apply -var-file=dev.tfvars
```

### Required Variables and Secrets

- `cloudflare_email` and `cloudflare_api_token` (or `CLOUDFLARE_API_TOKEN` when wired to env vars)
- Any secrets declared in `var.secrets` once a secret manager is connected

## Safety Checklist Before `apply`

- [ ] Confirm you are in the `dev` directory
- [ ] Use dev-specific credentials only
- [ ] Review the Terraform plan output
- [ ] Ensure recent changes are validated in dev services

## What Runs Here

- All experimental code paths and feature flags
- Preview endpoints such as `*.dev.blackroad.systems`
- Shared services that support rapid iteration
