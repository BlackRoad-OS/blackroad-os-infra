# Production Environment

Production is the customer-facing environment. Changes here must be intentional, reviewed, and executed via infrastructure-as-code—never ad hoc console edits.

## Running Terraform

```bash
terraform init
terraform plan -var-file=prod.tfvars
terraform apply -var-file=prod.tfvars
```

### Required Variables and Secrets

- `cloudflare_email` and `cloudflare_api_token` (use environment variables where possible)
- `base_domain`, `zone_name`, and production `records` definitions
- Production monitoring catalogue (`services`) and required `secrets`

## Safety Checklist Before `apply`

- [ ] Confirm you are in the `prod` directory
- [ ] Validate tfvars reference production-only resources
- [ ] Plan reviewed and approved by a second operator
- [ ] Maintenance window and rollback steps are documented
- [ ] Backups and observability are verified

## What Runs Here

- Customer-facing endpoints on `*.blackroad.systems`
- Stable builds of `blackroad-os` services promoted from staging
- Monitoring, alerting, and secret stores tied to production accounts
