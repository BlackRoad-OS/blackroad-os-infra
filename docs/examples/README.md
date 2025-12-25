# 📋 Examples Directory

This directory contains sample files, templates, and examples for various BlackRoad OS infrastructure patterns.

## 📦 Available Examples

### 🧩 EXAMPLES PACK v55 - Change Management Mega Template
**File**: `change-management-v55.md`

Comprehensive change management tracking template for policy, technical, and communication changes.

**Features**:
- 7-phase change lifecycle (Propose → Review → Risk Check → Approvals → Implement → Verify → Close)
- Visual progress tracking with emoji indicators
- Required approvals checklist (Principal, Compliance, Security, Records)
- 7-component audit trail tracking
- Timeline tracking with planned vs actual dates
- Team roster and contact information
- Rollback planning and risk assessment

**Use Cases**:
- 📜 Policy changes
- 💻 Technical infrastructure changes
- 📣 Communication process changes
- 🏗️ Architecture decisions
- 🔐 Security updates

**Quick Start**:
```bash
# Copy template for your change
cp docs/examples/change-management-v55.md /tmp/my-change.md

# Fill in the template sections
# Track progress with emoji indicators
# Update as you move through phases
```

---

### 🔔 SIG Beacon Sample
**File**: `sig.beacon.sample.json`

Service health beacon example for infrastructure monitoring.

**Purpose**: Shows the expected format for service health check responses.

**Usage**: Reference when implementing health endpoints in services.

---

### 📋 SIG Deploy Log Sample
**File**: `sig.deploy-log.sample.json`

Deployment logging format example.

**Purpose**: Shows the expected format for deployment event logging.

**Usage**: Reference when implementing deployment tracking.

---

## 🔮 Coming Soon

### EXAMPLES PACK v56 - Policy Library + Revision Control
- 7 policies × 7 versions matrix
- Sign-off tracking per version
- Version history visualization
- Compliance audit trail per policy

---

## 📖 How to Use Examples

1. **Browse** available examples to find what you need
2. **Copy** the example to your working directory
3. **Customize** the template for your specific use case
4. **Track** progress using the built-in indicators
5. **Archive** completed work for future reference

## 🤝 Contributing

To add a new example:

1. Create your example file in this directory
2. Use a clear, descriptive filename
3. Add comprehensive documentation within the file
4. Update this README with a description
5. Follow existing patterns for consistency

## 📚 Related Documentation

- [Service Registry](../../registry/services.yaml)
- [Service Template](../../templates/SERVICE_INFRA_TEMPLATE.md)
- [Runbooks](../runbooks/)
- [Playbooks](../playbooks/)
- [Observability](../observability/)

---

**Last Updated**: 2025-12-25  
**Maintained By**: Infrastructure Team
