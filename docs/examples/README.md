# 📚 Examples & Templates

This directory contains reusable templates and example configurations for BlackRoad OS infrastructure and operations.

---

## 🧩 Available Templates

### 📅 Launch Communications Calendar (v11)
**File:** [launch-comms-calendar-v11.md](launch-comms-calendar-v11.md)

Track launch communications across 7 channels over 7 days with visual status indicators.

**Use Cases:**
- Product launches
- Feature rollouts
- Major updates
- Beta releases

**Features:**
- 7x7 grid tracking (7 days × 7 channels)
- Status indicators (🟢 sent, 🟡 draft, 🔴 missed, ⚪️ empty)
- 7 message sets (Teaser → Follow-up)
- Communication channel guides
- Best practices and checklists

---

### 📡 Signal Beacon Sample
**File:** [sig.beacon.sample.json](sig.beacon.sample.json)

Example service health beacon format for monitoring and status reporting.

**Use Cases:**
- Service health checks
- Monitoring integrations
- Status dashboards

---

### 📋 Deploy Log Sample
**File:** [sig.deploy-log.sample.json](sig.deploy-log.sample.json)

Example deployment log entry format for tracking deployments.

**Use Cases:**
- Deployment tracking
- Audit logs
- Rollback references

---

## 📖 How to Use Templates

1. **Browse Available Templates:** Review the list above
2. **Copy Template:** Copy the template file to your working directory
3. **Customize:** Fill in your specific details
4. **Execute:** Follow the template's instructions
5. **Share:** Commit back to this directory if you create a new reusable template

---

## 🆕 Adding New Templates

When adding new examples or templates to this directory:

1. **Create the file** with a descriptive name
2. **Include version number** if applicable (e.g., v11)
3. **Add documentation** explaining:
   - Purpose and use cases
   - How to use the template
   - Required vs optional sections
   - Examples of filled-in templates
4. **Update this README** with a new entry
5. **Test the template** to ensure it's complete and clear

---

## 📂 Template Categories

### 🚀 Launch & Communications
- Launch Communications Calendar (v11)

### 🔧 Infrastructure & Operations
- Signal Beacon Sample
- Deploy Log Sample

### 📋 Coming Soon
- Incident Response Template
- Post-Mortem Template
- Architecture Decision Record (ADR) Template
- Service Onboarding Checklist

---

## 🔗 Related Resources

- [Service Infrastructure Template](../../templates/SERVICE_INFRA_TEMPLATE.md)
- [Runbooks & Playbooks](../runbooks/README.md)
- [Railway Deployment Guide](../../railway/README.md)
- [Cloudflare Documentation](../../cloudflare/CLOUDFLARE_QUICK_REFERENCE.md)

---

## 💡 Template Guidelines

Good templates should:
- ✅ Be reusable across multiple scenarios
- ✅ Include clear instructions and examples
- ✅ Follow consistent formatting
- ✅ Include version numbers when updated
- ✅ Document any prerequisites or dependencies
- ✅ Provide both blank and example versions
- ✅ Link to related documentation

Avoid:
- ❌ Hardcoded secrets or sensitive data
- ❌ Organization-specific details that won't apply elsewhere
- ❌ Overly complex templates (keep it simple)
- ❌ Undocumented sections or fields

---

## 📞 Support

For questions about these templates:
- **Issues:** Open an issue in this repository
- **Email:** infrastructure@blackroad.io
- **Slack:** #infra-ops

---

**Last Updated:** 2025-12-25  
**Maintained By:** BlackRoad OS Infrastructure Team
