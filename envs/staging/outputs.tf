output "zone_id" {
  value       = module.dns.zone_id
  description = "Cloudflare zone ID for this environment"
}

output "dns_records" {
  value       = module.dns.record_ids
  description = "Map of DNS record IDs"
}

output "monitored_services" {
  value       = module.monitoring.services
  description = "Services declared for monitoring in this environment"
}
