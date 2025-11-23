# How to Add a New Domain to Cloudflare

Use this playbook to onboard a new domain or subdomain into Cloudflare while keeping Terraform the source of truth.

## Inputs
- Domain name and registrar access confirmed.
- Intended subdomains and services (api/core/operator/prism/www/wildcard).
- Origin targets (Railway hostnames, static hosting, or placeholders).
- DNSSEC and TLS requirements.

## Steps
1. **Model records in Terraform**
   - Under `modules/dns`, add records for the new zone (A/AAAA/CNAME/TXT as needed).
   - Prefer proxied CNAMEs pointing at Railway or upstream provider.
   - Define defaults for TTL (auto) and proxy mode; document exceptions inline.

2. **Register the zone in Cloudflare**
   - If not present, create the zone via the Cloudflare dashboard or API.
   - Point registrar nameservers to the Cloudflare pair.
   - Enable DNSSEC once propagation is stable.

3. **Subdomain patterns**
   - `api.<domain>` → public API service
   - `core.<domain>` → Truth Engine (internal/protected)
   - `operator.<domain>` → orchestration surface
   - `prism.<domain>` → console
   - `www.<domain>` → marketing/landing
   - `*.<domain>` → wildcard catch-all routed to a maintenance page or default host

4. **Apply via Terraform**
   - Run `terraform plan -var-file=<env>.tfvars` to review new records.
   - Execute `terraform apply -var-file=<env>.tfvars` once approved.
   - Capture the change in the PR description with before/after summaries.

5. **Validate**
   - Use `dig`/`nslookup` to confirm records and proxy flags.
   - Test HTTPS issuance through Cloudflare Universal SSL.
   - Verify health checks and routing rules where applicable.

## Notes
- Keep TXT records for ownership (e.g., `_acme-challenge`, GitHub verification) in Terraform.
- Avoid manual dashboard edits; if an emergency edit is required, replicate it in Terraform immediately afterward.
- The DNS horizon is part of the backbone—treat it with the same rigor as code.
