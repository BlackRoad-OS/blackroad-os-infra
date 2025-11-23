# Scheduled Maintenance Runbook

## Planning

- Define scope, systems affected, and expected downtime
- Select maintenance window with minimal user impact
- Prepare rollback plan and backups if data is involved
- Publish maintenance notice internally and externally

## Pre-Maintenance Checklist

- [ ] Confirm stakeholders and on-call contacts
- [ ] Verify backups and recovery steps
- [ ] Freeze non-essential deployments
- [ ] Validate scripts/migrations in lower environments

## Execution

1. Place status page in maintenance mode (if available)
2. Drain traffic if needed (e.g., disable ingress, pause jobs)
3. Apply changes (migrations, config updates, Terraform apply)
4. Monitor logs and metrics during the window

## Verification and Bring-up

- [ ] Re-enable traffic and scheduled jobs
- [ ] Run smoke tests and health checks
- [ ] Confirm alerts return to baseline
- [ ] Announce completion to stakeholders

## Post-Maintenance

- Summarize what changed and any deviations from the plan
- Capture follow-up tasks and owners
- Update runbooks with lessons learned

> TODO(agent): Automate maintenance notices and traffic draining once tooling is selected.
