# DNS records derived from DNS_BLUEPRINT_FINAL.yaml
# See /infra/cloudflare/DNS_RECONCILIATION.md for details
locals {
  # Core services with their specific Cloudflare Pages targets
  cname_records = {
    # Core Platform
    web      = "blackroad-os-web.pages.dev"
    api      = "blackroad-os-api.pages.dev"
    core     = "blackroad-os-core.pages.dev"

    # Operations
    operator = "blackroad-os-operator.pages.dev"
    console  = "blackroad-os-prism-console.pages.dev"
    infra    = "blackroad-os-infra.pages.dev"

    # Documentation & Research
    docs     = "blackroad-os-docs.pages.dev"
    research = "blackroad-os-research.pages.dev"

    # Brand & Marketing
    brand    = "blackroad-os-brand.pages.dev"
    ideas    = "blackroad-os-ideas.pages.dev"
    demo     = "blackroad-os-demo.pages.dev"

    # Applications
    chat     = "nextjs-ai-chatbot.pages.dev"
    studio   = "lucidia.studio.pages.dev"
  }

  # Subdomains using the shared origin (for backwards compatibility)
  legacy_subdomains = [
    "archive",
    "api",
    "operator",
    "core",
    "infra",
    "docs",
    "console",
  ]
}

data "cloudflare_zone" "this" {
  name = var.domain_root
}

# CNAME records with specific Pages targets
resource "cloudflare_record" "cname" {
  for_each = local.cname_records

  zone_id = data.cloudflare_zone.this.id
  name    = each.key
  content = each.value
  type    = "CNAME"
  proxied = var.proxied
  comment = "Managed by blackroad-os-infra DNS reconciliation"
}

# Legacy CNAME records using shared origin
resource "cloudflare_record" "cname_legacy" {
  for_each = toset(local.legacy_subdomains)

  zone_id = data.cloudflare_zone.this.id
  name    = each.key
  content = var.origin
  type    = "CNAME"
  proxied = var.proxied
  comment = "Managed by blackroad-os-infra (legacy origin)"
}
