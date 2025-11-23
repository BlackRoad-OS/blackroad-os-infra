# Incident Runbook: Partial Outage

## Symptoms

- One or more services degraded but core platform still responsive
- Elevated error rates on specific endpoints
- Regional connectivity issues or CDN-related failures

## Immediate Actions

- Notify on-call and relevant service owners
- Acknowledge alerts; start incident log
- Review recent deployments or config changes affecting impacted services

## Triaging Steps

1. Check Cloudflare DNS/traffic analytics for anomalies
2. Inspect service logs for spikes in errors
3. Validate database and upstream dependencies for the affected path
4. Compare metrics against baselines to scope blast radius

## Communication

- Internal template:
  - **Impact:** Which services/endpoints are affected
  - **Scope:** % of traffic/users impacted
  - **Mitigation:** Steps underway
  - **ETA:** Next update time

- External template (if needed):
  - "We are investigating degraded performance for <service>. Users may see errors. Next update in <time>."

## Mitigation Options

- Roll back the last deployment for affected service(s)
- Toggle feature flags or rate limiting
- Increase resources or replicas if capacity-related

## Postmortem Checklist

- [ ] Timeline captured with owners/actions
- [ ] Root cause identified
- [ ] Action items created and assigned
- [ ] Runbooks updated with specific fixes

> TODO(agent): Add automated dashboards and alert routing once monitoring is in place.
