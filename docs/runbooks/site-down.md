# 🚨 Incident Playbook: Site Down

**Severity**: Critical 🔴  
**Response Time**: Immediate (< 5 min to acknowledge)

---

## 🎯 Scope

This playbook covers scenarios where a BlackRoad OS service is completely unreachable:
- HTTP 502/503/504 errors
- Connection timeouts
- DNS resolution failures
- Complete service outages

---

## 📋 Quick Checklist

- [ ] Acknowledge incident in Slack/Discord
- [ ] Check external status pages (Railway, Cloudflare)
- [ ] Verify DNS resolution
- [ ] Check Railway service status
- [ ] Check Cloudflare dashboard
- [ ] Identify root cause
- [ ] Apply fix
- [ ] Verify recovery
- [ ] Post-incident review

---

## 🔍 Step 1: Initial Triage (2 min)

### 1.1 Check External Status Pages

| Service | Status URL |
|---------|------------|
| Railway | https://status.railway.app/ |
| Cloudflare | https://www.cloudflarestatus.com/ |
| GitHub | https://www.githubstatus.com/ |

If any provider shows degradation, the issue may be upstream. Monitor and wait.

### 1.2 Quick Health Check

```bash
# Check if service is reachable
curl -I https://api.blackroad.io/health
curl -I https://blackroad.io/health
curl -I https://prism.blackroad.io/health

# Check DNS resolution
dig api.blackroad.io
dig blackroad.io

# Check response time
time curl -o /dev/null -s -w "%{http_code}" https://api.blackroad.io/health
```

---

## 🔍 Step 2: Identify Failure Point (5 min)

### 2.1 DNS Layer

```bash
# Verify DNS is resolving correctly
dig +short api.blackroad.io
# Expected: CNAME to Railway or Cloudflare

# Check from multiple locations (use online tools)
# - whatsmydns.net
# - dnschecker.org
```

**If DNS fails:**
- Go to [DNS Misroute Playbook](./dns-misroute.md)

### 2.2 Cloudflare Layer

1. Log into Cloudflare dashboard
2. Check Analytics → Traffic for error spikes
3. Check Security → Firewall for blocked requests
4. Check DNS → Records for correct configuration
5. Check SSL/TLS → Overview for certificate status

**Common Cloudflare issues:**
- 📛 SSL certificate expired → Enable Universal SSL
- 📛 Origin unreachable → Check Railway service
- 📛 Rate limiting triggered → Review rules

### 2.3 Railway Layer

1. Log into Railway dashboard
2. Check project status
3. Click on failing service
4. View Deployments → Build logs
5. View Metrics → Resource usage

**Common Railway issues:**
- 📛 Deployment failed → Check build logs
- 📛 Out of memory → Increase resources
- 📛 Crash loop → Check application logs
- 📛 Environment variables missing → Check vars

---

## 🛠️ Step 3: Apply Fix

### Option A: Rollback Deployment

```bash
# In Railway dashboard:
# 1. Go to failing service
# 2. Deployments → Find last successful
# 3. Click "..." → Redeploy

# Or via CLI (if configured):
railway rollback
```

### Option B: Restart Service

```bash
# In Railway dashboard:
# 1. Go to failing service
# 2. Settings → General
# 3. Click "Restart Service"
```

### Option C: Emergency Maintenance Page

If the service cannot be recovered quickly:

1. Enable Cloudflare Workers maintenance page
2. Or point DNS to static maintenance site
3. Communicate ETA to stakeholders

```javascript
// Example Cloudflare Worker maintenance page
addEventListener('fetch', event => {
  event.respondWith(new Response(`
    <html>
      <body>
        <h1>BlackRoad OS - Scheduled Maintenance</h1>
        <p>We'll be back shortly. Thank you for your patience.</p>
      </body>
    </html>
  `, {
    headers: { 'content-type': 'text/html' }
  }))
})
```

### Option D: DNS Failover

Point traffic to a different origin temporarily:

1. Cloudflare → DNS → Edit record
2. Change target to backup service/static page
3. Wait for TTL (usually 5 min)
4. Verify traffic routing

---

## ✅ Step 4: Verify Recovery

```bash
# Health checks
curl -I https://api.blackroad.io/health
curl -I https://blackroad.io/health

# Functional tests
curl https://api.blackroad.io/version
curl https://blackroad.io/

# Monitor for 10 minutes
watch -n 30 'curl -s -o /dev/null -w "%{http_code}" https://api.blackroad.io/health'
```

---

## 📝 Step 5: Post-Incident Review

After the incident is resolved:

1. **Document timeline** - When did it start? When detected? When fixed?
2. **Root cause analysis** - What failed? Why?
3. **Impact assessment** - How many users affected? Duration?
4. **Action items** - What prevents this from happening again?

### Post-Incident Template

```markdown
## Incident Report: [Service Name] Outage

**Date**: YYYY-MM-DD
**Duration**: X hours Y minutes
**Severity**: Critical/High/Medium
**Services Affected**: [list]

### Timeline
- HH:MM - Issue detected
- HH:MM - On-call paged
- HH:MM - Root cause identified
- HH:MM - Fix deployed
- HH:MM - Service restored

### Root Cause
[Description of what failed]

### Impact
- Users affected: X
- Requests failed: Y
- Revenue impact: $Z (if applicable)

### Action Items
- [ ] [Preventive measure 1]
- [ ] [Preventive measure 2]
- [ ] [Monitoring improvement]
```

---

## 🔗 Related Playbooks

- [DNS Misroute](./dns-misroute.md)
- [Bad Deploy](./bad-deploy.md)
- [Railway Troubleshooting](../railway-troubleshooting.md)

---

## 📞 Escalation Contacts

| Role | Contact |
|------|---------|
| Infrastructure Lead | infrastructure@blackroad.io |
| On-Call Engineer | [Check rotation schedule] |
| Railway Support | https://discord.gg/railway |
| Cloudflare Support | https://support.cloudflare.com |

---

**Last Updated**: 2025-11-25  
**Owner**: BlackRoad OS Infrastructure Team
