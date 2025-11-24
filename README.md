# blackroad-os-infra

Control tower for BlackRoad OS infrastructure blueprints. DNS, Railway templates, and SIG schemas live here as the source of truth for every service and pack.

- Cloudflare DNS blueprints: `cloudflare/`
- Railway service templates: `railway/`
- SIG schemas and examples: `sig/` and `docs/examples/`
- Validation + generation scripts: `scripts/`
- Docs: `docs/`

Run validations locally before opening a PR:

```bash
npm ci
npm run build:types
npm run validate:dns
npm run validate:railway
```
