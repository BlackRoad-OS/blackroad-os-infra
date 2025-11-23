# How to Rotate Secrets

Rotate secrets proactively to reduce blast radius and satisfy compliance requirements.

## Scope
- API keys, database credentials, OAuth tokens, Cloudflare tokens, Railway variables.
- GitHub Actions secrets that deploy to Railway or touch DNS.

## Preparation
- Inventory all consumers of the secret (apps, workflows, monitors).
- Decide rotation window and communication plan.
- Prepare dual-credential strategy when supported (old + new active during cutover).

## Rotation Steps
1. **Create new secret material**
   - Generate with least privilege and explicit expiry where possible.
   - Store in the secret manager or Railway variables; never commit.

2. **Update infrastructure definitions**
   - For Terraform-managed secrets, update tfvars or secret references in `envs/<env>/main.tf`.
   - In GitHub Actions, add the new secret and update workflow references.

3. **Deploy in stages**
   - Deploy to `dev` and validate health checks and integration paths.
   - Promote to `staging`, then `prod` once validation passes.
   - Keep the old secret available until production is stable.

4. **Revoke old credentials**
   - Disable or delete the previous secret after confirmation.
   - Verify logs show only the new credential in use.

5. **Document**
   - Record rotation date, reason, and next planned rotation.
   - Capture any application changes required.

## Emergency Rotation
- Immediately revoke the compromised secret.
- Issue a new secret and redeploy prioritized services.
- Audit access logs and update incident records.

> Secrets guard the backbone; rotate them before entropy reaches the horizon.
