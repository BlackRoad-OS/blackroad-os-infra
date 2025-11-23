variable "env" {
  description = "Environment name (dev|staging|prod)"
  type        = string
}

variable "base_domain" {
  description = "Base domain for this environment (e.g. blackroad.systems)"
  type        = string
}

variable "zone_name" {
  description = "Cloudflare zone name"
  type        = string
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
  default = []
}

variable "services" {
  description = "List of monitored services for production"
  type = list(object({
    name             = string
    type             = string
    url              = string
    availability_slo = string
  }))
  default = []
}

variable "secret_store_type" {
  description = "Secret store backing this environment (vault|aws_ssm|gcp_sm|1password)"
  type        = string
  default     = "vault"
}

variable "secrets" {
  description = "Map of logical secret names to descriptions for this environment"
  type        = map(string)
  default     = {}
}

variable "cloudflare_email" {
  description = "Cloudflare account email"
  type        = string
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token (use env vars in practice)"
  type        = string
}
