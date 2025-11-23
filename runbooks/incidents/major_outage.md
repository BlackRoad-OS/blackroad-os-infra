# Incident Runbook: Major Outage

## Symptoms

- Complete service outage or widespread 5xx errors
- DNS resolution failing for primary domains
- Database unreachable or data corruption suspected

## Immediate Actions

- Page on-call / incident commander (or placeholder contact list)
- Acknowledge alerts in monitoring system once available
- Check status dashboards and platform status pages (Railway, Cloudflare)

## Triaging Steps

1. Validate DNS resolution for critical domains
2. Check app health endpoints and logs
3. Inspect database connectivity or upstream dependencies
4. Verify recent deployments or Terraform applies

## Communication

- Internal update template:
  - **What:** Brief description of impact and suspected scope
  - **When:** Start time and current status
  - **Actions:** Mitigations underway
  - **Next update:** Timestamp for follow-up

- External update template (if customer-facing):
  - "We are investigating connectivity issues affecting <services>. Next update in <time>."

## Rollback / Mitigation

- Revert to previous Railway deployment for affected services
- Fallback to cached responses or maintenance page if available
- Disable problematic feature flags

## Postmortem Checklist

- [ ] Capture full timeline and actions taken
- [ ] Identify root cause and contributing factors
- [ ] List preventive follow-ups
- [ ] Update runbooks with new learnings

> TODO(agent): Automate paging hooks and status page updates once tooling is chosen.
