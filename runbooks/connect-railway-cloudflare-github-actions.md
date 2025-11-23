# How to Connect Railway → Cloudflare → GitHub Actions

Use this integration guide to align deployments (GitHub Actions), hosting (Railway), and edge routing (Cloudflare) without manual drift.

## Diagram
```
GitHub Actions (build + deploy) ──deploys──► Railway services ──origin──► Cloudflare DNS/proxy ──► Users
                              └─secrets──► CI/CD runners ──► Terraform state/backbone
```

## Prerequisites
- Cloudflare API token with DNS edit + zone read.
- Railway tokens for deploy + environment variable management.
- GitHub Actions secrets stored at repo/org level.
- Terraform state backend configured for `envs/<env>`.

## Steps
1. **Secrets in GitHub Actions**
   - Add `CLOUDFLARE_API_TOKEN`, `RAILWAY_TOKEN`, and `RAILWAY_ENV_ID` as GitHub secrets.
   - Store environment-specific values under environment-protected secrets when possible.

2. **Workflow wiring**
   - In each service repo, configure a deploy workflow that:
     - Builds and tests on push/PR.
     - Deploys to Railway with the pinned version/tag on `main`.
     - Outputs the deployed hostname or URL for downstream DNS steps.

3. **DNS automation**
   - Use Terraform in this repo to manage Cloudflare records. Do not mutate DNS from GitHub Actions directly.
   - Publish the Railway hostname as an output artifact, then update Terraform variables (or data sources) accordingly in PRs.

4. **Propagation checks**
   - After deployment, run a CI step to hit `/health` at the Cloudflare-routed hostname.
   - Fail the pipeline if DNS or TLS is not reachable.

5. **Observability hooks**
   - Push health and version endpoints to monitoring after each deploy.
   - Keep alerts in sync with the proxied hostname to avoid bypassing the edge.

## Troubleshooting
- If DNS is slow to update, confirm the record exists in Terraform state and Cloudflare UI; re-run `terraform apply` if state drift is detected.
- For failed deploys, retry with the previous pinned version; keep GitHub Actions artifacts for inspection.
- If Cloudflare proxy interferes with WebSockets/SSE, disable proxy for that record and document the exception.

> Railway blueprints remain the living schematics; Cloudflare keeps the horizon clear; GitHub Actions orchestrates the cadence.
