output "zone_id" {
  description = "Cloudflare zone ID"
  value       = cloudflare_zone.this.id
}

output "record_ids" {
  description = "Map of DNS record IDs keyed by name-type"
  value       = { for key, record in cloudflare_record.managed : key => record.id }
}
