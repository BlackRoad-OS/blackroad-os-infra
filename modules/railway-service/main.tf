resource "railway_environment" "this" {
  project_id = var.project_id
  name       = var.environment
}

resource "railway_service" "this" {
  project_id  = var.project_id
  name        = var.service_name
  environment = railway_environment.this.id

  service_variables = merge({
    PORT                = tostring(var.port)
    RAILWAY_ENVIRONMENT = var.environment
  }, { for k, v in var.environment_overrides : k => tostring(v) })

  deploy_on_git_push = var.auto_deploy

  templates = [{
    source_image = var.image
    name         = "${var.service_name}-${var.environment}"
  }]
}

resource "railway_service_domain" "edge" {
  project_id  = var.project_id
  service_id  = railway_service.this.id
  environment = railway_environment.this.id
  hostname    = "${var.service_name}.${var.environment}.railway.app"
}
