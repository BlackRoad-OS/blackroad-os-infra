output "domain_root" {
  description = "Root domain managed by Cloudflare."
  value       = var.domain_root
}

output "github_org" {
  description = "GitHub organization bound to automation."
  value       = var.gh_org
}

output "dns_records" {
  description = "Subdomains created for the environment."
  value       = module.dns.subdomains
}
