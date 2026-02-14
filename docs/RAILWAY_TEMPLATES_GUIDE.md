# Railway Templates Guide

Railway service templates in `railway/services/` define the baseline contract for BlackRoad OS services. Use them to bootstrap new services and keep environment variables consistent across teams.

## Consuming templates

1. Copy the matching `<service>.railway.json` when creating or updating a Railway service.
2. Apply the `build` stanza (Dockerfile or Nixpacks) to your repo and confirm the `healthcheck.path` exists.
3. Populate the environment variables in Railway; keep values secret in Railway or a secrets manager (this repo only documents names and intent).

## Naming conventions

- Services should follow `blackroad-os-<service>` to align with DNS and SIG.
- Add new templates using the same naming scheme so validations catch required env vars.

## Registering with the Beacon

- Ensure `BR_SERVICE_NAME`, `BR_ENV`, and `BR_BEACON_ENDPOINT` are present; validations will fail if they are omitted.
- Point `BR_BEACON_ENDPOINT` to the operator/core ingestion endpoint appropriate for the environment.
- Update SIG deploy logs when new services onboard to capture their first successful deployment.
