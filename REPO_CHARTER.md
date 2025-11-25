# ☁️ REPO: blackroad-os-infra

**ROLE**: Infra Brain ☁️🛠️ – infrastructure-as-code, DNS, Cloudflare, Railway envs, and deployment runbooks for BlackRoad OS.

---

## 🎯 MISSION

- Define **how BlackRoad OS exists in the real world** (domains, envs, services).
- Capture all infra patterns as code + runbooks, not vibes.
- Be the single place infra agents + humans consult before touching prod.

---

## 🏗️ YOU OWN (✅)

### ☁️ Infrastructure-as-code
- Cloudflare DNS records & routing patterns 🌐
- Railway service definitions & env mappings 🚆
- Env naming conventions (dev / stage / prod / preview / sandbox) 🧭
- Templates for new services (network, health, logging) 🧬

### 📓 Runbooks
- "How to" docs for:
  - Bringing a new domain online 🌍
  - Adding a new service to Railway 🧱
  - Wiring Cloudflare → Railway → app URLs 🪤
  - Rotating keys / secrets (conceptually, NOT storing them) 🔑
- Incident playbooks: "site down", "DNS misroute", "bad deploy" 🚨

### 🧩 Patterns & registries
- Service registry: which repo → which service → which hostname 📋
- Standard ports, paths, and health endpoints (`/health`, `/version`) ❤️‍🩹
- Shared infra modules / IaC components to reuse across services 🔁

### 📡 Observability hooks
- Logging/metrics/traces config templates 📊
- Conventions for correlation IDs + request IDs 🧬
- Links to external dashboards (Railway, Cloudflare, other monitoring) 🔗

---

## 🚫 YOU DO *NOT* OWN

| Area | Repository | Emoji |
|------|------------|-------|
| App-level business code | `blackroad-os-core`, `-web`, `-api`, etc. | 💻 |
| Operator workflows | `blackroad-os-operator` | ⚙️ |
| UI dashboards | `blackroad-os-prism-console` | 🕹️ |
| Brand assets | `blackroad-os-brand` | 🎨 |
| Research/math | `blackroad-os-research` | 🧪 |
| System-wide docs for users | `blackroad-os-docs` | 📚 |
| Long-term archive | `blackroad-os-archive` | 🧾 |

---

## 🧪 TESTING / VALIDATION

### For IaC modules
- ✅ Linting + validation (config syntax, schema checks)
- ✅ "Plan" or dry-run flow documented in runbooks
- ✅ At least one example usage per module

### For routing patterns
- 🧪 Document sample domain → service wiring (e.g., `api.blackroad.io` → `blackroad-os-api`)
- 🧪 Validate health endpoints are reachable post-deploy

---

## 🔐 SECURITY / COMPLIANCE

This repo is **infra-critical**:

- 🔑 Never store real secrets; reference secret managers / env vars only.
- 🧾 Changes should be traceable: who altered which env/domain and why.
- ⚠️ Flag high-risk changes (prod DNS, WAF rules, auth proxies) clearly in PRs.

### For anything touching:
- 💰 payment infra
- 🪪 identity routes
- ⚖️ regulated services

Add a comment label:
```
# COMPLIANCE-SENSITIVE INFRA BLOCK
```

---

## 📏 DESIGN PRINCIPLES

`blackroad-os-infra` = "WHERE + HOW IT RUNS":

- 🧭 Maps repos → services → hosts → envs.
- 🧬 Encodes patterns once so every new service can copy instead of invent.

### Every infra definition should answer:
1. 1️⃣ Which env(s) does this affect? (dev / stage / prod / other)
2. 2️⃣ Which repo/service is it for?
3. 3️⃣ How do I verify it's working after I apply it?

---

## 🧬 LOCAL EMOJI LEGEND

| Emoji | Meaning |
|-------|---------|
| ☁️ | infra / cloud |
| 🌐 | DNS / routing / Cloudflare |
| 🚆 | Railway / services |
| 🧭 | envs / mapping |
| 🧩 | modules / reusable blocks |
| 📓 | runbooks / operational docs |
| 📊 | observability hooks |
| ⚠️ | risky / high-impact changes |
| 🔑 | secrets / keys (never store!) |
| 🚨 | incident / emergency |
| ✅ | completed / validated |
| ❌ | error / failure |
| 💚 | Cadillac / system core |

---

## 🎯 SUCCESS CRITERIA

If an infra human/agent lands here, they should be able to:

1. 1️⃣ See **every** env + domain + service and how they connect.
2. 2️⃣ Spin up a new service/domain by following a **known pattern**.
3. 3️⃣ Safely change infra with clear runbooks and validation steps.

---

## 📁 Key Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Overview and quick links |
| [environments/environments.yml](environments/environments.yml) | Environment definitions |
| [registry/services.yaml](registry/services.yaml) | Service registry |
| [cloudflare/CLOUDFLARE_DNS_BLUEPRINT.md](cloudflare/CLOUDFLARE_DNS_BLUEPRINT.md) | DNS configuration |
| [templates/SERVICE_INFRA_TEMPLATE.md](templates/SERVICE_INFRA_TEMPLATE.md) | New service template |
| [docs/railway-playbook.md](docs/railway-playbook.md) | Railway deployment guide |
| [docs/dns-playbook.md](docs/dns-playbook.md) | DNS configuration guide |
| [docs/railway-troubleshooting.md](docs/railway-troubleshooting.md) | Railway troubleshooting |
| [docs/runbooks/](docs/runbooks/) | Operational runbooks |
| [docs/observability/](docs/observability/) | Observability patterns |

---

**Last Updated**: 2025-11-25  
**Maintained By**: BlackRoad OS Infrastructure Team  
**Version**: 1.0.0
