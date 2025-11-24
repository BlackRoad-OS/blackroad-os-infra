variable "domain_root" {
  description = "Root domain managed by Cloudflare."
  type        = string
}

variable "origin" {
  description = "Hostname that CNAME records will target (load balancer or upstream)."
  type        = string
}

variable "proxied" {
  description = "Whether Cloudflare proxies the records."
  type        = bool
  default     = true
}
