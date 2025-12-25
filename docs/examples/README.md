# 📚 Examples Directory

This directory contains example files and templates for BlackRoad OS infrastructure patterns.

## 📋 Available Examples

### Signal Examples

#### sig.beacon.sample.json
**Type:** Service Health Beacon  
**Purpose:** Example format for service health status reporting  
**Usage:** Monitor service health across environments

```json
{
  "service": "blackroad-os-web",
  "version": "2025.11.23+githash",
  "env": "prod",
  "status": "healthy",
  "url": "https://web.blackroad.io/health",
  "last_checked_at": "2025-11-23T22:05:42Z"
}
```

**Related:** [SIG Beacon Guide](../SIG_BEACON_GUIDE.md)

---

#### sig.deploy-log.sample.json
**Type:** Deployment Log Entry  
**Purpose:** Example format for deployment event logging  
**Usage:** Track deployments and link to PRs/incidents

```json
{
  "service": "blackroad-os-api",
  "env": "prod",
  "git_sha": "9ac5e5f7",
  "actor": "deploy-conductor-02",
  "started_at": "2025-11-23T21:58:10Z",
  "completed_at": "2025-11-23T22:02:44Z",
  "outcome": "success"
}
```

---

### Risk Management Examples

#### emoji-risk-register-v149.md & emoji-risk-register-v149.json
**Type:** Risk Register Matrix  
**Version:** v149  
**Purpose:** Emoji-based risk tracking system with 7 risks × 7 fields  
**Usage:** Sprint planning, incident post-mortems, quarterly reviews

**Legend:**
- **Severity:** 🟢 low | 🟡 medium | 🟠 high | 🔴 critical | ⚪️ empty
- **Actions:** 📎 proof | 🗂 file | ⭕ approve | ✅ verify | 🏁 close
- **Alerts:** ‼️ urgent action required

**Risk Categories:**
- 🔥 **R1** — Critical Infrastructure Risk
- 🎯 **R2** — Target Achievement Risk
- 🧱 **R3** — Foundation/Architecture Risk
- 🛠 **R4** — Operational/Tooling Risk
- 😭 **R5** — User Experience Risk
- 📎🗂 **R6** — Documentation/Compliance Risk
- ✅🏁 **R7** — Verification/Closure Risk

**Available Formats:**
- **Markdown:** [emoji-risk-register-v149.md](emoji-risk-register-v149.md) — Full documentation with examples
- **JSON:** [emoji-risk-register-v149.json](emoji-risk-register-v149.json) — Structured data for programmatic use

**Example Matrix:**
```
⚠️
🧭        1️⃣      2️⃣      3️⃣      4️⃣      5️⃣      6️⃣      7️⃣
R1 🔥      🔴      🟡      🟢      🟠      🟢      📎      ⭕
R2 🎯      🟡      🟢      🟢      🟢      🟡      📎      ✅
R3 🧱      🟠      🟡      🟢      🟡      🟠      🗂      ⭕
R4 🛠      🟢      🟢      🟢      🟢      🟢      📎      🏁
R5 😭      🟡      🟡      🟢      🟢      🟢      📎      ⭕
R6 📎🗂     🟠      🔴      🟢      🔴      🟢      🔴      ⚪️
R7 ✅🏁     🟢      🟢      🟢      🟢      🟢      📎      ✅
```

**Next Version:** v150 — Emoji Compliance Matrix (7 rules × 7 controls)

---

## 🚀 How to Use Examples

### 1. Signal Examples (Beacons & Deploy Logs)

**Copy and customize for your service:**
```bash
cp docs/examples/sig.beacon.sample.json public/sig.beacon.json
# Edit with your service details
```

**Generate programmatically:**
```bash
npm run gen:sig
```

**Related Documentation:**
- [SIG Beacon Guide](../SIG_BEACON_GUIDE.md)
- [Generate SIG Examples Script](../../scripts/generate_sig_examples.ts)

---

### 2. Risk Register Examples

**Use in documentation:**
```markdown
# Sprint 42 Risk Assessment

See [Emoji Risk Register v149](docs/examples/emoji-risk-register-v149.md) for format.

## Current Risks
[Your populated matrix here]
```

**Parse JSON programmatically:**
```typescript
import riskRegister from './docs/examples/emoji-risk-register-v149.json';

// Access risk definitions
console.log(riskRegister.risks[0].name); // "Critical Infrastructure Risk"

// Use legend for UI rendering
const severityColors = riskRegister.legend.severity;
```

**Integration Examples:**
- Sprint retrospectives
- Incident post-mortems
- Architecture decision records
- Compliance audits
- Quarterly business reviews

---

## 📦 Example Versioning

Examples follow semantic versioning with a "v" prefix:

- **v149** — Emoji Risk Register (current)
- **v150** — Emoji Compliance Matrix (coming soon)

When a new version is released, previous versions remain available for reference.

---

## 🔗 Related Resources

### Documentation
- [SIG Beacon Guide](../SIG_BEACON_GUIDE.md)
- [Observability Patterns](../observability/)
- [Runbooks](../runbooks/)

### Scripts
- [generate_sig_examples.ts](../../scripts/generate_sig_examples.ts)

### Templates
- [Service Infrastructure Template](../../templates/SERVICE_INFRA_TEMPLATE.md)
- [Environment Template](../../templates/.env.example)

---

## 🤝 Contributing New Examples

To add a new example:

1. **Create the example file(s)** in this directory
2. **Use consistent naming:** `{category}-{name}-v{version}.{ext}`
3. **Add both formats if applicable:** `.md` (documentation) + `.json` (data)
4. **Update this README** with description and usage
5. **Add to the examples pack sequence** if part of a series
6. **Test the example** works as documented

**Example Naming:**
- ✅ `emoji-risk-register-v149.md`
- ✅ `sig.beacon.sample.json`
- ✅ `compliance-matrix-v150.json`
- ❌ `example.json` (too generic)
- ❌ `risk-register.md` (missing version)

---

## 📝 Changelog

### 2025-12-25
- Added emoji risk register v149 (markdown + JSON formats)
- Created examples directory README
- Documented existing signal examples

### 2025-11-23
- Initial signal examples (beacon, deploy-log)

---

**Maintained By:** BlackRoad OS Infrastructure Team  
**Last Updated:** 2025-12-25  
**Directory Purpose:** Reference examples and templates for infrastructure patterns
