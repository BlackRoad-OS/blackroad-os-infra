# Runbook Index

BlackRoad OS infra runbooks keep the operational backbone disciplined. Use these guides to execute changes consistently across Railway, Cloudflare, GitHub Actions, and Terraform.

## Deployment & Service Operations
- [Deployments overview](./deployments.md)
- [Deploy core services](./deployments/core_services.md)
- [Deploy a new service](./deploy-new-service.md)

## Environment Safety
- [Update environment variables safely](./update-env-variables-safely.md)
- [Version pinning](./version-pinning.md)
- [Rotate secrets](./rotate-secrets.md)

## Platform Integration
- [Connect Railway ↔ Cloudflare ↔ GitHub Actions](./connect-railway-cloudflare-github-actions.md)

## DNS
- [Add a new domain to Cloudflare](./add-cloudflare-domain.md)

## Reliability & Incidents
- [Incident response](./incidents.md)
- [Partial outage playbook](./incidents/partial_outage.md)
- [Major outage playbook](./incidents/major_outage.md)
- [Troubleshoot failing health checks](./troubleshoot-health-checks.md)

## Maintenance & Lanes
- [Scheduled maintenance](./maintenance/scheduled_maintenance.md)
- [How to build a lane](./how-to-build-a-lane.md)

> DNS remains the horizon line of the OS; these runbooks keep the Road aligned with it.
