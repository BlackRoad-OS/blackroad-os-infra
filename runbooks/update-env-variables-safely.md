# How to Update Environment Variables Safely

Follow this runbook to change environment variables without breaking deployments or leaking secrets.

## Principles
- Terraform and Railway manifests are the source of truth; avoid drifting edits.
- Document intent, blast radius, and rollback before applying.
- Keep dev/staging/prod aligned unless a divergence is explicitly recorded.

## Checklist
- [ ] Change rationale captured in the PR description.
- [ ] Secrets stored in the designated secret manager or Railway variables (not plaintext).
- [ ] Validation steps defined (health, smoke tests, logs).
- [ ] Rollback plan documented.

## Steps
1. **Locate the variable definition**
   - For Terraform-managed services: update `envs/<env>/variables.tf` and corresponding tfvars.
   - For Railway-only variables: update the service manifest and GitHub Actions secrets reference.

2. **Introduce the change safely**
   - Add new variables alongside existing ones; avoid in-place mutations when unsure.
   - If rotating a secret, use a dual key period (old + new) until traffic has drained.

3. **Plan and validate**
   - Run `terraform plan -var-file=<env>.tfvars` to confirm the diff.
   - Apply to `dev` first; validate `/health` and `/version` responses.
   - Promote to `staging` then `prod` after validation.

4. **Update automation**
   - Ensure GitHub Actions workflows reference the new variable names.
   - Adjust monitoring/alerting thresholds if the change impacts performance.

5. **Clean up**
   - Remove deprecated variables after confirming no references remain (code search + runtime logs).
   - Update documentation in the env README to explain the current set.

## Rollback
- Revert the tfvars commit and re-apply.
- If a secret rotation failed, restore the previous secret, then reattempt rotation with a clearer plan.

> ENV discipline keeps the backbone steady—even small variables can ripple through the Road.
