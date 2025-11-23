variable "env" {
  description = "Environment name (dev|staging|prod)"
  type        = string
  default     = "dev"
}

variable "base_domain" {
  description = "Base domain for this environment (e.g. dev.blackroad.systems)"
  type        = string
  default     = "dev.blackroad.systems"
}

variable "zone_name" {
  description = "Cloudflare zone name"
  type        = string
  default     = "blackroad.systems"
}

variable "records" {
  description = "DNS records specific to this environment"
  type = list(object({
    name    = string
    type    = string
    value   = string
    proxied = bool
    ttl     = number
  }))
  default = [
    {
      name    = "api"
      type    = "CNAME"
      value   = "railway.dev.blackroad.systems"
      proxied = true
      ttl     = 1
    },
    {
      name    = "web"
      type    = "CNAME"
      value   = "railway.dev.blackroad.systems"
      proxied = true
      ttl     = 1
    }
  ]
}

variable "secrets" {
  description = "Map of logical secret names to descriptions for this environment"
  type        = map(string)
  default = {
    "railway_api_token"    = "API token used by agents to interact with Railway services"
    "cloudflare_api_token" = "Token used for Cloudflare provider authentication"
  }
}

variable "cloudflare_email" {
  description = "Cloudflare account email"
  type        = string
  default     = "devnull@example.com"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token (use env vars in practice)"
  type        = string
  default     = "changeme"
}
