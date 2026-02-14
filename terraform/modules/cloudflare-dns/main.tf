# =============================================================================
# BlackRoad OS - Cloudflare DNS Module
# =============================================================================
# Creates DNS records for BlackRoad services
#
# Usage:
#   module "dns" {
#     source    = "../modules/cloudflare-dns"
#     zone_id   = var.cloudflare_zone_id
#     subdomain = "api"
#     target    = "blackroad-os.cfargotunnel.com"
#   }
# =============================================================================

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

# -----------------------------------------------------------------------------
# Variables
# -----------------------------------------------------------------------------

variable "zone_id" {
  description = "Cloudflare zone ID"
  type        = string
}

variable "subdomain" {
  description = "Subdomain name (without domain)"
  type        = string
}

variable "target" {
  description = "CNAME target (tunnel or service domain)"
  type        = string
}

variable "proxied" {
  description = "Whether to proxy through Cloudflare"
  type        = bool
  default     = true
}

variable "ttl" {
  description = "TTL for the record (1 = auto)"
  type        = number
  default     = 1
}

# -----------------------------------------------------------------------------
# DNS Record
# -----------------------------------------------------------------------------

resource "cloudflare_record" "this" {
  zone_id = var.zone_id
  name    = var.subdomain
  value   = var.target
  type    = "CNAME"
  ttl     = var.ttl
  proxied = var.proxied
}

# -----------------------------------------------------------------------------
# Outputs
# -----------------------------------------------------------------------------

output "record_id" {
  description = "Cloudflare record ID"
  value       = cloudflare_record.this.id
}

output "hostname" {
  description = "Full hostname"
  value       = cloudflare_record.this.hostname
}
