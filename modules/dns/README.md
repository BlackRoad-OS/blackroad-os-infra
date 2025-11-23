# DNS Module

Manages Cloudflare zones and DNS records for each environment. Zones can be created or referenced, and records are driven by the `records` variable so that services stay declarative.

## Usage

```hcl
module "dns" {
  source      = "../../modules/dns"
  env         = var.env
  zone_name   = var.zone_name
  base_domain = var.base_domain
  records     = var.records
}
```

## Variables

- `env` (string): Environment name.
- `zone_name` (string): Cloudflare zone name.
- `base_domain` (string): Base domain for fully-qualified record names.
- `records` (list(object)): DNS records to manage (`name`, `type`, `value`, `proxied`, `ttl`).

## Outputs

- `zone_id`: Cloudflare zone ID.
- `record_ids`: Map of record IDs keyed by `<name>-<type>`.

## Notes

- TODO(agent): If the zone is pre-existing, switch `cloudflare_zone` to a data source to avoid recreation.
- TODO(agent): Extend record schema to support MX/TXT/SRV-specific fields when needed.
