output "service_id" {
  description = "Railway service ID."
  value       = railway_service.this.id
}

output "environment_id" {
  description = "Railway environment ID."
  value       = railway_environment.this.id
}

output "hostname" {
  description = "Default Railway hostname for the service."
  value       = railway_service_domain.edge.hostname
}
