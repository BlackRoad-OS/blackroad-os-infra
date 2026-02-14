# 📓 Runbooks Index

Operational runbooks for BlackRoad OS infrastructure. These documents provide step-by-step guidance for common operations and incident response.

---

## 🚨 Incident Playbooks

Emergency response procedures for critical issues:

| Playbook | Severity | Use When |
|----------|----------|----------|
| [Site Down](./site-down.md) | 🔴 Critical | Service completely unreachable |
| [DNS Misroute](./dns-misroute.md) | 🟠 High | Traffic routing incorrectly |
| [Bad Deploy](./bad-deploy.md) | 🟠 High | Deployment caused issues |

---

## 🔐 Security Runbooks

Security-related operational procedures:

| Runbook | Frequency | Purpose |
|---------|-----------|---------|
| [Key Rotation](./key-rotation.md) | Quarterly | Rotate secrets and API keys |

---

## 📖 Operational Guides

Standard operating procedures (in `docs/`):

| Guide | Purpose |
|-------|---------|
| [Railway Playbook](../railway-playbook.md) | Deploy services to Railway |
| [DNS Playbook](../dns-playbook.md) | Configure Cloudflare DNS |
| [Railway Troubleshooting](../railway-troubleshooting.md) | Fix Railway issues |

---

## 🧭 Quick Reference

### Incident Response Priority

| Severity | Response Time | Examples |
|----------|---------------|----------|
| 🔴 Critical | < 5 min | Complete outage, data breach |
| 🟠 High | < 15 min | Partial outage, degraded service |
| 🟡 Medium | < 1 hour | Non-critical bugs, slow performance |
| 🟢 Low | Next business day | Documentation, minor improvements |

### Key URLs

| Service | URL |
|---------|-----|
| Railway Dashboard | https://railway.app/dashboard |
| Cloudflare Dashboard | https://dash.cloudflare.com |
| Railway Status | https://status.railway.app |
| Cloudflare Status | https://www.cloudflarestatus.com |
| GitHub Actions | https://github.com/BlackRoad-OS/blackroad-os-infra/actions |

### Emergency Contacts

| Role | Contact |
|------|---------|
| Infrastructure | infrastructure@blackroad.io |
| Security | security@blackroad.io |

---

## 📝 Contributing

When adding a new runbook:

1. Use the emoji legend from [REPO_CHARTER.md](/REPO_CHARTER.md)
2. Include severity and response time
3. Provide step-by-step instructions with verification
4. Add to this index
5. Cross-link related runbooks

---

**Last Updated**: 2025-11-25
