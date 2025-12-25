# 📚 Examples Directory

> Sample files, templates, and reference examples for BlackRoad OS Infrastructure

---

## 📋 Available Examples

### 🧩 Quality Gates Framework

**Quality Gates v9** — A comprehensive 7-gate × 7-check quality tracking system

- 📄 [**quality-gates-v9.md**](./quality-gates-v9.md) — Full documentation with detailed gate definitions, usage examples, metrics, and best practices
- 📄 [**quality-gates-template.md**](./quality-gates-template.md) — Quick copy-paste templates in various formats (standard, compact, minimal, extended)

**Quick Start:**
```markdown
🧾 PROJECT: ____________________________   🚦 STATUS: 🟡   🗓️ WINDOW: ____________

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

G1 📚 Spec ready        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G2 💻 Build green       ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G3 🧪 Tests pass        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G4 🔍 Review complete   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G5 🔐 Security ok       ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G6 🚀 Deploy ready      ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G7 ✅ Done              ⚪️⚪️⚪️⚪️⚪️⚪️⚪️   🏁🎉
```

Legend: 🟢 pass  🟡 watch  🔴 fail  ⚪️ empty

---

### 🔔 Signal Beacon Examples

**SIG Beacon** — Health check and signal beacon format examples

- 📄 [**sig.beacon.sample.json**](./sig.beacon.sample.json) — Example beacon file for service health
- 📄 [**sig.deploy-log.sample.json**](./sig.deploy-log.sample.json) — Example deployment log format

**Related:** [SIG Beacon Guide](../SIG_BEACON_GUIDE.md)

---

## 🎯 Purpose

This directory contains:

✅ **Templates** — Ready-to-use templates for common infrastructure tasks  
✅ **Examples** — Reference implementations and sample files  
✅ **Formats** — Standard formats for configuration and documentation  
✅ **Patterns** — Reusable patterns and frameworks

---

## 📦 How to Use

1. **Browse** examples above
2. **Copy** the template or format you need
3. **Customize** for your specific use case
4. **Integrate** into your workflow (PRs, issues, docs)

---

## 🔗 Related Resources

### Templates
- [Service Infrastructure Template](../../templates/SERVICE_INFRA_TEMPLATE.md) — New service setup checklist
- [Environment Variables Template](../../templates/.env.example) — Standard env vars

### Documentation
- [Architecture](../ARCHITECTURE.md) — System architecture overview
- [CI/CD Patterns](../MASTER_TEST_CICD_PATTERN.md) — Testing and deployment patterns
- [Deployment Status](../DEPLOYMENT_STATUS.md) — Current deployment state

### Guides
- [Developer Onboarding](../DEVELOPER_ONBOARDING.md) — Get started guide
- [Railway Playbook](../railway-playbook.md) — Deployment procedures
- [Cloudflare Complete Guide](../CLOUDFLARE_COMPLETE_GUIDE.md) — DNS and CDN setup

---

## 💡 Contributing

Have a useful example or template? Add it here!

1. Create the example file in this directory
2. Add documentation/comments explaining the example
3. Update this README with a description and link
4. Submit a PR with your addition

**Guidelines:**
- Examples should be clear and well-commented
- Include usage instructions
- Remove any sensitive data or secrets
- Follow existing naming conventions
- Keep examples focused and simple

---

## 📅 Recent Additions

- **2025-12-25** — Quality Gates v9 framework added
- **2025-11-24** — SIG beacon examples added

---

**Maintained By:** BlackRoad OS Infrastructure Team  
**Last Updated:** 2025-12-25

💡 **Examples make great starting points — use them, adapt them, share them!**
