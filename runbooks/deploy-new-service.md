# How to Deploy a New Service

Use this runbook to stand up a brand-new service on Railway while keeping DNS, envs, and automation consistent.

## Prerequisites
- Repository lives under the BlackRoad org with CI configured.
- `modules/app_service` and `modules/networking` aligned for the target environment.
- Health endpoint and version endpoint implemented (even if stubbed).
- Secrets stored in the platform secret store; no ad-hoc console edits.

## High-Level Flow
1. Define the service blueprint (Railway manifest + Terraform wiring).
2. Wire environment variables and secrets.
3. Provision infrastructure via Terraform plan/apply.
4. Point DNS and validate health.

## Step-by-Step
1. **Create a Railway service manifest**
   - Use the following template as a starting point for your manifest:

     ```yaml
     name: my-service
     repository: git@github.com:BlackRoad/my-service.git
     build: npm run build
     start: npm start
     env:
       NODE_ENV: production
       API_KEY: ${API_KEY}
     healthcheck:
       path: /health
       interval: 30s
       timeout: 5s
     ports:
       - 8080
     ```
   - Set `name`, `repository`, `build`, `start`, `env`, `healthcheck`, and `ports` as appropriate for your service.
   - Commit the manifest under `docs/` or `railway/` (once the tree is expanded).

2. **Update Terraform for the environment**
   - In `envs/<env>/main.tf`, instantiate `module "app_service"` for the new service using the manifest values.
   - Expose outputs (service ID, URL) in `envs/<env>/outputs.tf` to feed DNS and monitoring.

3. **Declare environment variables**
   - Add required variables to `envs/<env>/variables.tf` and sample tfvars.
   - Keep parity across dev/staging/prod; document intentional drift in the env README.

4. **Secrets and tokens**
   - Inject secrets via Railway or secret manager—never hardcode.
   - Tag secrets with `service`, `environment`, and `expiry` metadata.

5. **CI/CD hooks**
   - In the service repo, add a GitHub Actions workflow to trigger Railway deployments on `main` and previews on PRs.
   - Ensure it publishes health and version check URLs as outputs for observability.

6. **DNS wiring**
   - Add a CNAME in the DNS module for `service.<domain>` pointing to the Railway hostname.
   - Use orange-cloud proxy for public endpoints; keep internal admin ports unproxied.

7. **Plan and apply**
   - Run `terraform plan -var-file=<env>.tfvars` and review.
   - Apply during a maintenance window if customer-facing.

8. **Validation**
   - Hit `/health` and `/version` on the service.
   - Confirm logs are flowing to monitoring targets and alerts are green.

## Rollback Plan
- Keep the previous service version tagged in Railway; redeploy if needed.
- Revert DNS to the prior target or pause the proxy.
- If Terraform changes caused issues, `terraform apply` with the last known good state file or revert the commit and re-apply.

> Operator and Core remain the twin hearts; every new service must respect their cadence.
