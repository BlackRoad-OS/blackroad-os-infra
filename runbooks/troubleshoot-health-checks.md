# How to Troubleshoot Failing Health Checks

Use this runbook when `/health` or `/version` endpoints fail or alarms fire. The goal is to quickly isolate whether the issue is app, platform, or network.

## Quick Triage
- Identify the failing service, environment, and URL.
- Capture error responses, status codes, and recent deploys.
- Check monitoring dashboards for correlated spikes (CPU, memory, latency).

## Checklist
- [ ] Recent deploy noted and linked.
- [ ] Upstream/downstream dependencies identified (Core ↔ Operator ↔ API ↔ Prism).
- [ ] DNS/SSL status verified.
- [ ] Logs collected (application + platform).

## Diagnostic Steps
1. **Endpoint reachability**
   - `curl -v https://<service>/health` and note status + body.
   - From inside the cluster/platform, hit the internal host if available to rule out edge issues.

2. **Application logs**
   - Pull the last 50 lines from Railway logs for the service.
   - Look for startup errors, dependency timeouts, or migrations.

3. **Dependency checks**
   - Confirm Core is healthy if API or Operator are failing.
   - Verify database/Redis connections; ensure credentials match env variables.

4. **DNS and TLS**
   - `dig <service>` to ensure records point to the expected host.
   - Check Cloudflare proxy status; disable temporarily if TLS termination is misaligned.

5. **Configuration drift**
   - Compare deployed env variables with `envs/<env>/variables.tf` and tfvars.
   - Ensure the service version matches the pinned version in the PR.

6. **Rollback or hotfix**
   - Redeploy the last known good version tag.
   - If misconfiguration, correct env vars and redeploy.
   - Keep proxy disabled only as long as needed to restore health.

## Postmortem Tasks
- Document the root cause, detection gap, and fix time.
- Add alerts or readiness probes if missing.
- Consider adding synthetic checks for the same failure pattern.

> Health checks trace the pulse of the backbone—treat anomalies as signals to refine the Road.
