locals {
  subdomains = [
    "web",
    "research",
    "chat",
    "brand",
    "prism",
    "archive",
  ]
}

data "cloudflare_zone" "this" {
  name = var.domain_root
}

resource "cloudflare_record" "cname" {
  for_each = toset(local.subdomains)

  zone_id = data.cloudflare_zone.this.id
  name    = each.key
  value   = var.origin
  type    = "CNAME"
  proxied = var.proxied
  comment = "Managed by Infra-Gen-0 scaffold"
}
