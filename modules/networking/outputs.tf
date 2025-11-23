output "env" {
  description = "Passthrough of the environment using this networking module"
  value       = var.env
}

output "vpc_cidr" {
  description = "Placeholder for VPC CIDR once networking is defined"
  value       = var.vpc_cidr
}
