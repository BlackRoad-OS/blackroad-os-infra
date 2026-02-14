# SIG Beacon & Deploy Log Guide

SIG artifacts standardize how services publish health and deploy metadata. Schemas live in `sig/` and examples can be generated under `docs/examples/` using `npm run generate:sig`.

## Publishing beacons

- POST payloads matching `sig/sig.beacon.spec.json` to the beacon ingestion endpoint referenced by `BR_BEACON_ENDPOINT`.
- Include headers:
  - `X-Agent-ID`: publisher identity (human or automation), mirrors `meta.agent_id`.
  - `X-PS-SHA∞`: policy steward signature hash used to track approvals.
- Recommended cadence: emit on deploy, on health regressions, and at steady intervals for uptime tracking.

## Recording deploys

- Append deploy log entries that match `sig/sig.deploy-log.spec.json` for every deploy or rollback.
- Populate `links.pr`, `links.ci_run`, and optionally `links.incident` for traceability.
- Keep deploy logs append-only; never rewrite history.

## Operator and core responsibilities

- **API/operator/core** define and validate accepted headers and persist beacons/deploy logs.
- **Deploy Conductor** tools should refuse to proceed if required headers are absent or schema validation fails.
