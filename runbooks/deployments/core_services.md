# Deployment Runbook: Core Services

## Scope

Services: `blackroad-os-web`, `blackroad-os-api`, `blackroad-os-core`, `blackroad-os-prism-console`, and supporting agents.
Environments: `dev`, `staging`, `prod`.

## Pre-Deployment Checklist

- [ ] Tests passing in relevant repos
- [ ] CI pipeline green
- [ ] Terraform plan for the target environment reviewed (if infra changes)
- [ ] Change ticket / PR approved
- [ ] Rollback steps prepared

## Deployment Steps (high-level)

For each service:

1. Trigger deployment (Railway, CI workflow, or pipeline trigger)
2. Tail logs for the deployment
3. Verify `/health` and `/version` endpoints

For infrastructure changes:

1. `terraform init`
2. `terraform plan -var-file=<env>.tfvars`
3. `terraform apply -var-file=<env>.tfvars`

## Post-Deployment Verification

- [ ] Hit primary endpoints and health checks
- [ ] Run smoke tests for critical user flows
- [ ] Confirm monitoring dashboards show healthy signals and alerts are quiet

## Rollback Plan

- [ ] Revert to previous Railway deployment or release artifact
- [ ] Re-run Terraform with last known-good tfstate/tfvars if infra changes were applied
- [ ] Announce rollback and continue to monitor

> TODO(agent): Fill in service-specific deployment commands and CI job links once pipelines are standardized.
