# 🚨 Incident Playbook: DNS Misroute

**Severity**: High 🟠  
**Response Time**: < 15 min to acknowledge

---

## 🎯 Scope

This playbook covers DNS-related issues:
- Traffic routing to wrong destination
- DNS propagation delays
- CNAME/A record misconfigurations
- SSL certificate mismatches
- Subdomain pointing to defunct service

---

## 📋 Quick Checklist

- [ ] Verify current DNS configuration
- [ ] Compare with expected blueprint
- [ ] Identify misconfigured record
- [ ] Apply correction
- [ ] Wait for propagation
- [ ] Verify resolution

---

## 🔍 Step 1: Diagnose the Issue (5 min)

### 1.1 Check Current DNS State

```bash
# Query authoritative nameservers
dig +short api.blackroad.io @ns1.cloudflare.com
dig +short blackroad.io @ns1.cloudflare.com

# Full DNS trace
dig +trace api.blackroad.io

# Check from multiple resolvers
dig api.blackroad.io @8.8.8.8        # Google
dig api.blackroad.io @1.1.1.1        # Cloudflare
dig api.blackroad.io @9.9.9.9        # Quad9

# Check for CNAME chain
dig +short CNAME api.blackroad.io
```

### 1.2 Compare with Blueprint

Reference: [CLOUDFLARE_DNS_BLUEPRINT.md](/cloudflare/CLOUDFLARE_DNS_BLUEPRINT.md)

**Expected DNS records** (from blueprint):

| Subdomain | Type | Target |
|-----------|------|--------|
| @ (apex) | CNAME | blackroad-os-web-prod.railway.app |
| api | CNAME | blackroad-os-api-prod.railway.app |
| operator | CNAME | blackroad-os-operator-prod.railway.app |
| prism | CNAME | blackroad-os-prism-console-prod.railway.app |
| console | CNAME | blackroad-os-prism-console-prod.railway.app |

### 1.3 Identify Mismatch

Check for common issues:

| Symptom | Likely Cause |
|---------|--------------|
| Resolves to old IP | Stale A record, not updated after migration |
| Certificate error | CNAME pointing to wrong host, SSL mismatch |
| 404 errors | Service renamed, old hostname in DNS |
| Resolves to nothing | Record deleted accidentally |
| Wrong content | Traffic going to wrong service |

---

## 🛠️ Step 2: Fix the Record

### Option A: Cloudflare Dashboard (Quick Fix)

1. Log into Cloudflare dashboard
2. Select zone (e.g., `blackroad.io`)
3. Go to DNS → Records
4. Find the misconfigured record
5. Click Edit
6. Update target to correct value
7. Save

**Important settings:**
- ✅ Proxy status: Proxied (orange cloud) for most services
- ✅ TTL: Auto (proxied) or 5 min (DNS only)

### Option B: Terraform (Recommended)

```bash
# Navigate to environment
cd terraform/environments/prod

# Check current state
terraform plan -var-file=terraform.tfvars

# If record needs update, modify the configuration
# Then apply
terraform apply -var-file=terraform.tfvars
```

### Option C: API (Emergency)

```bash
# Only use if dashboard/Terraform unavailable
# Requires CLOUDFLARE_API_TOKEN

# Get zone ID (verify the zone name matches your domain)
ZONE_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=blackroad.io" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json")

# Verify we got exactly one zone before proceeding
ZONE_COUNT=$(echo "$ZONE_RESPONSE" | jq '.result | length')
if [ "$ZONE_COUNT" -ne 1 ]; then
  echo "Warning: Expected 1 zone, found $ZONE_COUNT. Please verify manually."
  echo "$ZONE_RESPONSE" | jq '.result[] | {id, name}'
  exit 1
fi

ZONE_ID=$(echo "$ZONE_RESPONSE" | jq -r '.result[0].id')
echo "Using zone ID: $ZONE_ID"

# List records
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" | jq '.result[] | {name, type, content}'

# Update record (example)
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"content":"correct-target.railway.app"}'
```

---

## ⏳ Step 3: Wait for Propagation

DNS changes propagate based on TTL:

| TTL Setting | Propagation Time |
|-------------|------------------|
| Proxied (Cloudflare) | Instant (< 1 min) |
| 5 minutes | 5-10 minutes |
| 1 hour | Up to 1 hour |
| Auto (unproxied) | Varies |

### Monitor Propagation

```bash
# Use online tools
# - https://www.whatsmydns.net/
# - https://dnschecker.org/

# Or check from CLI
watch -n 30 'dig +short api.blackroad.io @8.8.8.8'
```

---

## ✅ Step 4: Verify Resolution

```bash
# Check DNS resolves correctly
dig +short api.blackroad.io
# Expected: blackroad-os-api-prod.railway.app (or CNAME chain)

# Check HTTPS works
curl -I https://api.blackroad.io/health
# Expected: 200 OK

# Check SSL certificate
openssl s_client -connect api.blackroad.io:443 -servername api.blackroad.io < /dev/null 2>/dev/null | openssl x509 -noout -dates -subject
# Verify certificate is valid and for correct domain

# Full connectivity test
curl -v https://api.blackroad.io/version
```

---

## 🔍 Common Scenarios

### Scenario 1: Service Renamed

**Problem**: DNS still points to old service name  
**Fix**:
1. Update DNS record target to new hostname
2. Verify new service is healthy first
3. Apply DNS change

### Scenario 2: Railway Hostname Changed

**Problem**: Railway regenerated hostname after redeploy  
**Fix**:
1. Get new hostname from Railway dashboard
2. Update DNS CNAME target
3. Update blueprint documentation

### Scenario 3: Wildcard Misconfigured

**Problem**: Wildcard `*.blackroad.io` catching unwanted subdomains  
**Fix**:
1. Add explicit records for intended subdomains
2. Review wildcard scope
3. Consider removing wildcard if not needed

### Scenario 4: SSL Certificate Mismatch

**Problem**: DNS points to host without valid SSL  
**Fix**:
1. Verify target host has SSL configured
2. Ensure Cloudflare SSL mode is "Full (strict)"
3. Check origin has valid certificate

---

## 📝 Prevention

1. **Always update blueprint first** before making DNS changes
2. **Use Terraform** for all DNS changes (not dashboard)
3. **Test in staging** before production changes
4. **Keep TTLs low** (5 min) during migrations
5. **Monitor DNS** with external checks

---

## 🔗 Related Documentation

- [DNS Playbook](../dns-playbook.md)
- [Cloudflare DNS Blueprint](/cloudflare/CLOUDFLARE_DNS_BLUEPRINT.md)
- [Site Down Playbook](./site-down.md)

---

**Last Updated**: 2025-11-25  
**Owner**: BlackRoad OS Infrastructure Team
