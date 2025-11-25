# DNS Playbook (Cloudflare)

This runbook tracks the CNAME layout for the BlackRoad OS edge. Use the `dns-cloudflare` module to materialize the records and avoid manual drift.

## Records

- `web`, `research`, `chat`, `brand`, `prism`, `archive`, `api`, `operator`, `core`, `infra`, `docs`, `console` → CNAME to the shared origin (default `infra.blackroad-os.net`).
- Records are proxied by default to enable Cloudflare security and caching.

## Steps

1. Set `domain_root` in your environment `terraform.tfvars`.
2. Export `CLOUDFLARE_API_TOKEN` and `TF_STATE_BUCKET`.
3. Run `terraform init -backend-config=backend.tfvars` from the environment folder.
4. Execute `terraform apply -var-file=terraform.tfvars` to create/update the CNAMEs.
5. Verify via Cloudflare dashboard or `dig <record>.<domain_root>`.

## Notes

- Keep `backend.tfvars` empty for the bucket; supply it with `-backend-config="bucket=$TF_STATE_BUCKET"` when initializing.
- Align DNS changes with Railway deployments so the upstream origin is ready before cutting traffic.
