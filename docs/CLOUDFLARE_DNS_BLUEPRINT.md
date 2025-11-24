# Cloudflare DNS Blueprint

Use these blueprints to implement, audit, and evolve DNS for BlackRoad OS. Keep records declarative in `cloudflare/zones/` and mirror changes through Cloudflare's UI or API.

## Checklist for changes

1. Confirm the zone blueprint exists and is valid (`node scripts/validate_dns.ts`).
2. Map each record to its hosting surface (Pages vs Railway vs other) and document proxy expectations.
3. Apply or update records in Cloudflare (UI or API) to match the blueprint.
4. Capture change context in PR description and, if applicable, deploy logs.

## Quarterly review plan

- **Inventory**: Enumerate all records from the blueprint and reconcile with Cloudflare's live state.
- **Routing**: Verify CNAME targets still point to the intended Pages sites or Railway hostnames.
- **TLS/SSL**: Ensure proxy is enabled where we expect Cloudflare-managed TLS; confirm certificates are fresh on any direct origins.
- **Proxy**: Reconfirm which records intentionally bypass proxy (e.g., bastions) and document rationale in `notes` fields.
- **Change Log**: Note any deltas and open follow-up issues for routing shifts or deprecated subdomains.

## Applying updates

- Modify the YAML blueprint under `cloudflare/zones/`.
- Run `node scripts/validate_dns.ts` to catch schema or coverage gaps.
- Merge changes via PR; then apply in Cloudflare using API scripts or the UI while keeping `notes` aligned with the repo blueprint.
