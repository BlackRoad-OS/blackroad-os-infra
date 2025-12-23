# Cloudflare Quick Reference

**For any Claude instance managing Cloudflare infrastructure**

## 📚 Complete Documentation

Full guides available at:
- **How-To Guide:** `~/projects/lucidia-earth/CLOUDFLARE.md`
- **Zone Reference:** `~/projects/lucidia-earth/CLOUDFLARE_ZONES.md`
- **GitHub:** `https://github.com/BlackRoad-OS/lucidia-earth-website`

## 🔑 Authentication

```bash
# Primary API Token
CF_TOKEN="yP5h0HvsXX0BpHLs01tLmgtTbQurIKPL4YnQfIwy"

# Verify wrangler auth
wrangler whoami

# Expected account
Account ID: 848cf0b18d51e0170e0d1537aec3505a
Email: amundsonalexa@gmail.com
```

## 🌐 Primary Zones

```bash
# lucidia.earth
ZONE_ID="a91af33930bb9b9ddfa0cf12c0232460"

# lucidiaqi.com
ZONE_ID="8a787536b6dd285bdf06dde65e96e8c0"

# lucidia.studio
ZONE_ID="43edda4c64475e5d81934ec7f64f6801"
```

## ⚡ Quick Commands

### DNS Operations

```bash
# List DNS records
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN"

# Add CNAME
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"type":"CNAME","name":"@","content":"target.pages.dev","ttl":1,"proxied":true}'
```

### Pages Deployment

```bash
# Deploy lucidia-earth
cd /Users/alexa/projects/lucidia-earth
pnpm build
wrangler pages deploy out --project-name=lucidia-earth

# Verify
curl -I https://lucidia.earth
```

### Pages Custom Domain

**⚠️ IMPORTANT:** Always use Cloudflare Dashboard for custom domains

1. Add DNS CNAME: `domain.com` → `project-name.pages.dev`
2. Dashboard: `https://dash.cloudflare.com/ACCOUNT_ID/pages/view/PROJECT_NAME/settings/domains`
3. Click "Add a custom domain"
4. Enter domain and confirm
5. Wait 1-2 minutes for SSL

### Workers

```bash
# Deploy worker
wrangler deploy

# List deployments
wrangler deployments list

# View logs
wrangler tail
```

### KV Operations

```bash
# List namespaces
wrangler kv:namespace list

# Write key
wrangler kv:key put --namespace-id=ID "key" "value"

# Read key
wrangler kv:key get --namespace-id=ID "key"
```

### D1 Operations

```bash
# List databases
wrangler d1 list

# Execute SQL
wrangler d1 execute DB_NAME --remote --command="SELECT * FROM table"

# Execute file
wrangler d1 execute DB_NAME --remote --file=./schema.sql
```

## 🚨 Common Issues

### Authentication Error (10000)

**Problem:** API token lacks permissions

**Solution:**
```bash
# Use wrangler for Pages operations
wrangler login
wrangler pages deploy out --project-name=PROJECT_NAME

# Or use dashboard for custom domains
# https://dash.cloudflare.com/ACCOUNT_ID/pages/view/PROJECT_NAME/settings/domains
```

### DNS Record Already Exists (81053)

**Solution:**
```bash
# List existing records
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?name=example.com" \
  -H "Authorization: Bearer $CF_TOKEN"

# Update instead of create (use record ID from above)
curl -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"type":"CNAME","name":"@","content":"new-target.pages.dev","ttl":1,"proxied":true}'
```

### Custom Domain Not Working

**Checklist:**
1. ✅ DNS CNAME record exists
2. ✅ Points to `project-name.pages.dev`
3. ✅ Custom domain added in Pages dashboard
4. ✅ SSL certificate provisioned (wait 1-2 minutes)
5. ✅ DNS proxied (orange cloud enabled)

**Verify:**
```bash
# Check DNS
curl -I https://domain.com

# Should return HTTP/2 200 with cf-ray header
```

## 📊 Current Infrastructure

### Pages Projects

- **lucidia-earth** → `https://lucidia.earth`
  - 16 routes (visualizations + games)
  - Deploy: `wrangler pages deploy out --project-name=lucidia-earth`

- **blackroad-os-web** → Multiple domains
  - GitHub integrated

- **blackroad-os-docs**
  - GitHub integrated

### DNS Records (lucidia.earth)

- `@` → `lucidia-earth.pages.dev` (CNAME, proxied)
- `www` → `174.138.44.45` (A, proxied)
- `api` → `blackroad-lucidia-enhanced.up.railway.app` (CNAME, proxied)
- `browser` → `lucidia-browser-os.vercel.app` (CNAME, proxied)
- `consciousness` → `blackroad-consciousness.up.railway.app` (CNAME, proxied)
- `console` → `174.138.44.45` (A, proxied)
- `desktop` → `174.138.44.45` (A, proxied)
- `os` → `174.138.44.45` (A, proxied)

## 🔗 Dashboard Links

### Main Dashboards
- Account: `https://dash.cloudflare.com/848cf0b18d51e0170e0d1537aec3505a`
- Pages: `https://dash.cloudflare.com/848cf0b18d51e0170e0d1537aec3505a/pages`
- Workers: `https://dash.cloudflare.com/848cf0b18d51e0170e0d1537aec3505a/workers`

### lucidia.earth
- DNS: `https://dash.cloudflare.com/848cf0b18d51e0170e0d1537aec3505a/lucidia.earth/dns`
- Analytics: `https://dash.cloudflare.com/848cf0b18d51e0170e0d1537aec3505a/lucidia.earth/analytics`

### lucidia-earth Pages
- Project: `https://dash.cloudflare.com/848cf0b18d51e0170e0d1537aec3505a/pages/view/lucidia-earth`
- Domains: `https://dash.cloudflare.com/848cf0b18d51e0170e0d1537aec3505a/pages/view/lucidia-earth/settings/domains`

### API Tokens
- Manage: `https://dash.cloudflare.com/profile/api-tokens`
- Create: `https://dash.cloudflare.com/profile/api-tokens/create`

## 📝 Best Practices

✅ **Always use dashboard for Pages custom domains** (most reliable)
✅ **Use wrangler CLI for deployments** (has proper auth)
✅ **Test with curl -I** after DNS changes
✅ **Wait 1-2 minutes** for SSL provisioning
✅ **Use proxied: true** for Cloudflare features
✅ **Document changes** in CLOUDFLARE_ZONES.md

## 🆘 When in Doubt

1. Read the full guides: `CLOUDFLARE.md` and `CLOUDFLARE_ZONES.md`
2. Check authentication: `wrangler whoami`
3. Use dashboard for Pages operations
4. Verify with `curl -I` commands
5. Check DNS with `dig` or `nslookup`

---

**Last Updated:** 2025-12-23
**Location:** `~/.claude/CLOUDFLARE_REFERENCE.md`
**Full Docs:** `~/projects/lucidia-earth/CLOUDFLARE.md`
