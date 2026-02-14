variable "domain_root" {
  description = "Base domain managed by Cloudflare for BlackRoad OS (e.g., blackroad.so)."
  type        = string
}

variable "railway_project_id" {
  description = "Railway project identifier that holds the environment services."
  type        = string
}

variable "gh_org" {
  description = "GitHub organization that owns the repositories and runners."
  type        = string
}

variable "auto_deploy_enabled" {
  description = "Whether Railway services should auto-deploy on git push. Disable for manual deployments."
  type        = bool
  default     = false
}
