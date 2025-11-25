output "zone_id" {
  description = "Zone ID backing the domain root."
  value       = data.cloudflare_zone.this.id
}

output "cname_records" {
  description = "CNAME records created for service entrypoints with their targets."
  value = {
    for name, target in local.cname_records :
    "${name}.${var.domain_root}" => target
  }
}

output "legacy_subdomains" {
  description = "Legacy CNAME records using shared origin."
  value       = [for name in local.legacy_subdomains : "${name}.${var.domain_root}"]
}

# Backwards compatibility
output "subdomains" {
  description = "All CNAME records created (combined)."
  value = concat(
    [for name, _ in local.cname_records : "${name}.${var.domain_root}"],
    [for name in local.legacy_subdomains : "${name}.${var.domain_root}"]
  )
}
