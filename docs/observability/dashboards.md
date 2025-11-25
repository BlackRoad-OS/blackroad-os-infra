# 🔗 Monitoring Dashboards

Links to external monitoring dashboards and tools for BlackRoad OS infrastructure.

---

## 📊 Primary Dashboards

### Railway

**URL**: https://railway.app/dashboard

| View | Purpose |
|------|---------|
| Project Overview | All services at a glance |
| Service Metrics | CPU, memory, network per service |
| Deployment Logs | Build and runtime logs |
| Environment Variables | Configuration (no secrets visible) |

**Quick Links**:
- [blackroad-os project](https://railway.app/project/blackroad-os)
- [Deployment history](https://railway.app/project/blackroad-os/deployments)

---

### Cloudflare

**URL**: https://dash.cloudflare.com

| View | Purpose |
|------|---------|
| Analytics → Traffic | Request volume, bandwidth |
| Analytics → Security | Blocked threats, WAF events |
| DNS → Records | Current DNS configuration |
| SSL/TLS → Overview | Certificate status |
| Speed → Overview | Performance metrics |

**Quick Links**:
- [blackroad.io zone](https://dash.cloudflare.com/?to=/:account/:zone)
- [Analytics overview](https://dash.cloudflare.com/analytics)
- [Firewall events](https://dash.cloudflare.com/security)

---

### GitHub Actions

**URL**: https://github.com/BlackRoad-OS

| View | Purpose |
|------|---------|
| Actions | CI/CD workflow runs |
| Security | Code scanning alerts |
| Insights | Contribution activity |

**Quick Links**:
- [blackroad-os-infra Actions](https://github.com/BlackRoad-OS/blackroad-os-infra/actions)
- [blackroad-os-api Actions](https://github.com/BlackRoad-OS/blackroad-os-api/actions)
- [Organization Activity](https://github.com/orgs/BlackRoad-OS/dashboard)

---

## 🚨 Status Pages

| Service | Status URL |
|---------|------------|
| Railway | https://status.railway.app |
| Cloudflare | https://www.cloudflarestatus.com |
| GitHub | https://www.githubstatus.com |
| OpenAI (if used) | https://status.openai.com |

**Subscribe to Updates**: Get notified when providers have issues.

---

## 📈 Service Health URLs

Quick check endpoints for each service:

| Service | Health URL |
|---------|------------|
| API | https://api.blackroad.io/health |
| Web | https://blackroad.io/api/health |
| Prism Console | https://prism.blackroad.io/health |
| Operator | https://operator.blackroad.io/health |
| Research | https://research.blackroad.io/health |

**Bulk Check Script**:
```bash
#!/bin/bash
# save as check-health.sh

SERVICES=(
  "https://api.blackroad.io/health"
  "https://blackroad.io/api/health"
  "https://prism.blackroad.io/health"
  "https://operator.blackroad.io/health"
)

for url in "${SERVICES[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$status" = "200" ]; then
    echo "✅ $url - OK"
  else
    echo "❌ $url - $status"
  fi
done
```

---

## 🔧 Useful CLI Commands

### Check All Services

```bash
# Check health endpoints
for domain in api.blackroad.io blackroad.io prism.blackroad.io operator.blackroad.io; do
  echo -n "$domain: "
  curl -s -o /dev/null -w "%{http_code}" "https://$domain/health"
  echo
done
```

### Check DNS Resolution

```bash
# Verify DNS for all subdomains
for sub in api prism operator research docs brand; do
  echo -n "$sub.blackroad.io: "
  dig +short "$sub.blackroad.io"
done
```

### Check SSL Certificates

```bash
# Verify SSL expiry
for domain in api.blackroad.io blackroad.io prism.blackroad.io; do
  echo "=== $domain ==="
  echo | openssl s_client -servername "$domain" -connect "$domain:443" 2>/dev/null | openssl x509 -noout -dates
done
```

---

## 📝 Setting Up Alerts

### Railway Alerts

1. Railway → Project → Settings → Notifications
2. Configure:
   - Deploy failures → Email/Webhook
   - Health check failures → Email/Webhook

### Cloudflare Alerts

1. Cloudflare → Notifications → Create
2. Recommended alerts:
   - Health check failures
   - DDoS attack detected
   - SSL certificate expiry (30 days)
   - High error rate (5xx > 1%)

### Uptime Monitoring

Consider external uptime monitors:

| Service | Free Tier | Features |
|---------|-----------|----------|
| UptimeRobot | 50 monitors | 5-min checks, status page |
| Better Uptime | 10 monitors | 3-min checks, on-call |
| Freshping | 50 monitors | 1-min checks, status page |

---

## 📊 Key Metrics to Monitor

### Availability

- Uptime percentage (target: 99.9%)
- Health check success rate
- Error rate (5xx responses)

### Performance

- Response time (P50, P95, P99)
- Time to first byte (TTFB)
- Request throughput

### Resources

- CPU utilization
- Memory usage
- Network bandwidth

### Business

- Active users
- API calls per day
- Error rate by endpoint

---

## 🔗 Related

- [Health Endpoints](./health-endpoints.md)
- [Logging Conventions](./logging.md)
- [Site Down Playbook](/docs/runbooks/site-down.md)

---

**Last Updated**: 2025-11-25
