# DNS Playbook (Cloudflare)

This runbook tracks the CNAME layout for the BlackRoad OS edge. Use the `dns-cloudflare` module to materialize the records and avoid manual drift.

## DNS Reconciliation

For the authoritative DNS configuration, see:

- [DNS Reconciliation Report](/infra/cloudflare/DNS_RECONCILIATION.md) - Current state analysis
- [DNS Corrections Plan](/infra/cloudflare/DNS_CORRECTIONS_PLAN.md) - Action items
- [DNS Blueprint Final](/infra/cloudflare/DNS_BLUEPRINT_FINAL.yaml) - Desired state
- [Services Registry](/registry/services.yaml) - Service-to-DNS mapping

## Records

Active CNAME records managed by Terraform:

| Subdomain | Target | Category |
|-----------|--------|----------|
| `web` | blackroad-os-web.pages.dev | Core |
| `api` | blackroad-os-api.pages.dev | Core |
| `core` | blackroad-os-core.pages.dev | Core |
| `operator` | blackroad-os-operator.pages.dev | Operations |
| `console` | blackroad-os-prism-console.pages.dev | Operations |
| `infra` | blackroad-os-infra.pages.dev | Operations |
| `docs` | blackroad-os-docs.pages.dev | Documentation |
| `research` | blackroad-os-research.pages.dev | Research |
| `brand` | blackroad-os-brand.pages.dev | Marketing |
| `ideas` | blackroad-os-ideas.pages.dev | Product |
| `demo` | blackroad-os-demo.pages.dev | Marketing |
| `chat` | nextjs-ai-chatbot.pages.dev | Application |
| `studio` | lucidia.studio.pages.dev | Application |
| `archive` | (shared origin) | Legacy |

## Steps

1. Set `domain_root` in your environment `terraform.tfvars`.
2. Export `CLOUDFLARE_API_TOKEN` and `TF_STATE_BUCKET`.
3. Run `terraform init -backend-config=backend.tfvars` from the environment folder.
4. Execute `terraform apply -var-file=terraform.tfvars` to create/update the CNAMEs.
5. Verify via Cloudflare dashboard or `dig <record>.<domain_root>`.

## Notes

- Keep `backend.tfvars` empty for the bucket; supply it with `-backend-config="bucket=$TF_STATE_BUCKET"` when initializing.
- Align DNS changes with Railway deployments so the upstream origin is ready before cutting traffic.
- Each CNAME now has a specific Pages target defined in the module (see `/modules/dns-cloudflare/main.tf`).
