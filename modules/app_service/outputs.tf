output "service_contract" {
  description = "Declarative service contract captured in Terraform state"
  value = {
    name              = var.service_name
    env               = var.env
    domain            = var.domain
    healthcheck_path  = var.healthcheck_path
    env_vars          = var.env_vars
    railway_project_id = var.railway_project_id
  }
}
