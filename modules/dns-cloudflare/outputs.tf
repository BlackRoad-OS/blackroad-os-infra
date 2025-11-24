output "zone_id" {
  description = "Zone ID backing the domain root."
  value       = data.cloudflare_zone.this.id
}

output "subdomains" {
  description = "CNAME records created for service entrypoints."
  value       = [for name in local.subdomains : "${name}.${var.domain_root}"]
}
