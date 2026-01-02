# 🧩 EXAMPLES PACK v26 (ops runbook) — 7 routines × 7 steps

This example demonstrates a comprehensive operational runbook tracking template with 7 core routines mapped across 7 operational steps.

---

## 📊 Legend

| Symbol | Status | Description |
|--------|--------|-------------|
| 🟢 | Done | Step completed successfully |
| 🟡 | In Progress | Currently working on this step |
| 🔴 | Missed | Step was skipped or failed |
| ⚪️ | Empty | Step not yet started |

**Steps**: 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣

---

## 🛠 OPS RUNBOOK TEMPLATE

**OPS RUNBOOK**: [RUNBOOK_NAME]   
**📅 DATE**: [YYYY-MM-DD]   
**🚦 STATUS**: 🟡

### 🧭 Operational Progress Matrix

| Routine | 1️⃣ | 2️⃣ | 3️⃣ | 4️⃣ | 5️⃣ | 6️⃣ | 7️⃣ |
|---------|---|---|---|---|---|---|---|
| 📶 **Monitor** | 🟢 | 🟢 | 🟢 | 🟢 | ⚪️ | ⚪️ | ⚪️ |
| 🔔 **Alerts** | 🟢 | 🟢 | 🟢 | ⚪️ | ⚪️ | ⚪️ | ⚪️ |
| 🧯 **Triage** | 🟡 | 🟡 | 🟡 | ⚪️ | ⚪️ | ⚪️ | ⚪️ |
| 🧰 **Fix** | 🟢 | 🟢 | ⚪️ | ⚪️ | ⚪️ | ⚪️ | ⚪️ |
| 🚀 **Deploy** | ⚪️ | ⚪️ | ⚪️ | ⚪️ | 🟢 | 🟢 | ⚪️ |
| 🧾 **Notes** | 🟢 | 🟢 | ⚪️ | ⚪️ | ⚪️ | ⚪️ | ⚪️ |
| ✅ **Close** | ⚪️ | ⚪️ | ⚪️ | ⚪️ | ⚪️ | ⚪️ | ⚪️ |

---

## ✅ STEP LABELS

Customize these labels based on your operational workflow:

| Step | Default Label | Purpose |
|------|---------------|---------|
| 1️⃣ | **Check** | Initial verification and assessment |
| 2️⃣ | **Identify** | Identify issues, components, or requirements |
| 3️⃣ | **Triage** | Prioritize and categorize work items |
| 4️⃣ | **Fix** | Implement fixes or changes |
| 5️⃣ | **Validate** | Test and verify changes |
| 6️⃣ | **Report** | Document outcomes and notify stakeholders |
| 7️⃣ | **Hand-off** | Transfer to next team or close out |

---

## 📋 Routine Descriptions

### 📶 Monitor
Continuous observation of system health, metrics, and performance indicators.

**Example Steps:**
1. Check dashboards and metrics
2. Identify anomalies or trends
3. Triage alerts by severity
4. Fix threshold configurations
5. Validate monitoring coverage
6. Report monitoring gaps
7. Hand-off to on-call rotation

---

### 🔔 Alerts
Management of alert configurations, notifications, and response protocols.

**Example Steps:**
1. Check alert configurations
2. Identify noisy or missing alerts
3. Triage alert priorities
4. Fix alert rules and thresholds
5. Validate alert delivery
6. Report alert effectiveness
7. Hand-off alert ownership

---

### 🧯 Triage
Incident categorization, prioritization, and initial response.

**Example Steps:**
1. Check incoming incidents
2. Identify severity and impact
3. Triage by business priority
4. Fix categorization if needed
5. Validate triage accuracy
6. Report triage metrics
7. Hand-off to response team

---

### 🧰 Fix
Implementation of solutions, patches, and remediation activities.

**Example Steps:**
1. Check issue details and context
2. Identify root cause
3. Triage fix complexity
4. Fix the underlying issue
5. Validate the solution
6. Report fix details
7. Hand-off to deployment team

---

### 🚀 Deploy
Deployment activities, rollouts, and release management.

**Example Steps:**
1. Check deployment prerequisites
2. Identify deployment targets
3. Triage deployment risks
4. Fix deployment scripts
5. Validate deployment success
6. Report deployment status
7. Hand-off to operations team

---

### 🧾 Notes
Documentation, knowledge capture, and communication.

**Example Steps:**
1. Check existing documentation
2. Identify documentation gaps
3. Triage documentation priorities
4. Fix outdated information
5. Validate accuracy
6. Report documentation updates
7. Hand-off to knowledge base

---

### ✅ Close
Final verification, cleanup, and closure activities.

**Example Steps:**
1. Check completion criteria
2. Identify remaining tasks
3. Triage any blockers
4. Fix outstanding issues
5. Validate all requirements met
6. Report final status
7. Hand-off or archive

---

## 📝 Usage Instructions

### How to Use This Template

1. **Copy the template** for each operational cycle
2. **Fill in runbook name and date** in the header
3. **Update status** as you progress through routines
4. **Customize step labels** to match your workflow
5. **Track progress** using emoji indicators
6. **Review regularly** to ensure completion

### Example Workflow

```markdown
🛠 OPS RUNBOOK: Q4 Infrastructure Hardening
📅 DATE: 2025-12-25
🚦 STATUS: 🟡

📶 Monitor: Completed steps 1-4, working on step 5
🔔 Alerts: Completed steps 1-3, pending review
🧯 Triage: In progress, completed steps 1-3
```

---

## 🔗 Related Documentation

- [Site Down Runbook](./site-down.md)
- [DNS Misroute Runbook](./dns-misroute.md)
- [Bad Deploy Runbook](./bad-deploy.md)
- [Key Rotation Runbook](./key-rotation.md)

---

## 💡 Tips for Effective Runbook Usage

1. **Be Consistent**: Use the same emoji indicators across all runbooks
2. **Update Frequently**: Keep the status current to reflect real progress
3. **Document Blockers**: Use 🔴 to highlight missed or blocked steps
4. **Track Patterns**: Review completed runbooks to identify improvement areas
5. **Automate Where Possible**: Consider automating routine status updates

---

## 🎯 Success Criteria

A well-executed ops runbook should achieve:

- ✅ All routines progress through required steps
- ✅ No 🔴 missed steps without documented reasons
- ✅ Clear hand-offs between teams
- ✅ Complete documentation in Notes routine
- ✅ Proper closure with all validations

---

**Version**: v26  
**Last Updated**: 2025-12-25  
**Owner**: BlackRoad OS Infrastructure Team  
**Status**: 🟢 Template Ready
