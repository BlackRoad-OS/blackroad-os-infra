// DNS module for managing Cloudflare zones and records across environments.
// Creates or references a Cloudflare zone and provisions records defined per environment.

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = ">= 4.0"
    }
  }
}

resource "cloudflare_zone" "this" {
  zone = var.zone_name
  plan = "free"

  // TODO(agent): Switch to data source if zone is pre-existing to avoid recreation.
}

resource "cloudflare_record" "managed" {
  for_each = { for record in var.records : "${record.name}-${record.type}" => record }

  zone_id = cloudflare_zone.this.id
  name    = "${each.value.name}.${var.base_domain}"
  type    = each.value.type
  content = each.value.value
  ttl     = each.value.ttl
  proxied = each.value.proxied
}
