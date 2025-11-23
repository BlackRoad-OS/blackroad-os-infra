# How to Perform Version Pinning

Lock service, dependency, and infrastructure versions to keep deployments deterministic across the Road.

## What to Pin
- **Application versions:** container tags or Railway build artifacts.
- **Infrastructure modules:** Terraform provider and module versions in `required_version`/`required_providers` blocks.
- **Dependencies:** package manager lockfiles stored in source repos.
- **Workflows:** GitHub Actions refs (use tags/SHAs, not floating `@main`).

## Steps
1. **Identify the component to pin**
   - For app services, choose a semantic version tag or immutable commit SHA.
   - For Terraform, set provider versions in `envs/<env>/main.tf` and module versions in `source` references.

2. **Update manifests and workflows**
   - Set the image tag or build version in the Railway service manifest.
   - In CI/CD, reference the pinned tag for deployments and cache keys.

3. **Record the version**
   - Add the chosen version to the environment README and PR description.
   - Note compatibility constraints (e.g., Core/API contract) so Operator and Core stay in lockstep.

4. **Validate**
   - Run smoke tests against the pinned build in dev/staging.
   - Confirm `/version` endpoint returns the expected identifier.

5. **Promote**
   - Roll the pinned version through environments sequentially.
   - Monitor metrics for regressions before promoting to prod.

## Rollback
- Re-deploy the previous pinned version tag.
- If Terraform provider pinning causes errors, revert the version block and re-run `terraform init -upgrade=false`.

> Version pinning anchors the backbone so new features don’t drift beyond the horizon.
