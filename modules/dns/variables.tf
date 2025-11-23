variable "env" {
  description = "Environment name"
  type        = string
}

variable "zone_name" {
  description = "Cloudflare zone name"
  type        = string
}

variable "base_domain" {
  description = "Base domain for this environment (e.g. dev.blackroad.systems)"
  type        = string
}

variable "records" {
  description = "DNS records to manage in this zone"
  type = list(object({
    name    = string
    type    = string
    value   = string
    proxied = bool
    ttl     = number
  }))
  default = []
}
