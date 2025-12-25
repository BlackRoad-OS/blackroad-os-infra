# 📊 Priority, Urgency, and Risk Bars

> **Copy/paste visual indicators for issues, tasks, and documentation**

This template provides visual indicator bars for communicating priority, urgency, risk levels, and combined metrics in issues, tasks, pull requests, and documentation.

---

## 📌 How to Use

1. **Copy** the appropriate bar from below
2. **Paste** into your issue, PR, or documentation
3. **Delete** unused levels to show your current rating

---

## 🔥 Priority (7 Levels)

Indicates **importance** — how critical is this to business goals?

```markdown
🔥 Priority (7)
🔥 ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🔥 🟢⚪️⚪️⚪️⚪️⚪️⚪️
🔥 🟢🟢⚪️⚪️⚪️⚪️⚪️
🔥 🟢🟢🟢⚪️⚪️⚪️⚪️
🔥 🟢🟢🟢🟢⚪️⚪️⚪️
🔥 🟢🟢🟢🟢🟢⚪️⚪️
🔥 🟢🟢🟢🟢🟢🟢⚪️
🔥 🟢🟢🟢🟢🟢🟢🟢
```

**Example Usage:**
```markdown
🔥 Priority: 🟢🟢🟢🟢🟢⚪️⚪️ (6/7 - High)
```

---

## ⏰ Urgency (7 Levels)

Indicates **time sensitivity** — how soon does this need to be done?

```markdown
⏰ Urgency (7)
⏰ ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
⏰ 🟡⚪️⚪️⚪️⚪️⚪️⚪️
⏰ 🟡🟡⚪️⚪️⚪️⚪️⚪️
⏰ 🟡🟡🟡⚪️⚪️⚪️⚪️
⏰ 🟡🟡🟡🟡⚪️⚪️⚪️
⏰ 🟡🟡🟡🟡🟡⚪️⚪️
⏰ 🟡🟡🟡🟡🟡🟡⚪️
⏰ 🟡🟡🟡🟡🟡🟡🟡
```

**Example Usage:**
```markdown
⏰ Urgency: 🟡🟡🟡🟡⚪️⚪️⚪️ (4/7 - Medium)
```

---

## ⚠️ Risk (7 Levels)

Indicates **potential impact** — what's at stake if this goes wrong?

```markdown
⚠️ Risk (7)
⚠️ ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
⚠️ 🟠⚪️⚪️⚪️⚪️⚪️⚪️
⚠️ 🟠🟠⚪️⚪️⚪️⚪️⚪️
⚠️ 🟠🟠🟠⚪️⚪️⚪️⚪️
⚠️ 🟠🟠🟠🟠⚪️⚪️⚪️
⚠️ 🟠🟠🟠🟠🟠⚪️⚪️
⚠️ 🟠🟠🟠🟠🟠🟠⚪️
⚠️ 🟠🟠🟠🟠🟠🟠🟠
```

**Example Usage:**
```markdown
⚠️ Risk: 🟠🟠🟠⚪️⚪️⚪️⚪️ (3/7 - Low-Medium)
```

---

## 🚦 Combined Score (7 Levels)

Combines priority, urgency, and risk into a single visual indicator.

```markdown
🚦 Combined (7)
🚦 🟢⚪️⚪️⚪️⚪️⚪️⚪️
🚦 🟢🟡⚪️⚪️⚪️⚪️⚪️
🚦 🟢🟡🟠⚪️⚪️⚪️⚪️
🚦 🟢🟡🟠🔴⚪️⚪️⚪️
🚦 🟢🟡🟠🔴🔴⚪️⚪️
🚦 🟢🟡🟠🔴🔴🔴⚪️
🚦 🟢🟡🟠🔴🔴🔴🔴
```

**Example Usage:**
```markdown
🚦 Combined: 🟢🟡🟠🔴⚪️⚪️⚪️ (4/7 - Action Needed)
```

---

## 📋 Quick Reference Guide

### Priority Levels
- **7/7** 🟢🟢🟢🟢🟢🟢🟢 — Critical business priority
- **6/7** 🟢🟢🟢🟢🟢🟢⚪️ — Very high priority
- **5/7** 🟢🟢🟢🟢🟢⚪️⚪️ — High priority
- **4/7** 🟢🟢🟢🟢⚪️⚪️⚪️ — Medium-high priority
- **3/7** 🟢🟢🟢⚪️⚪️⚪️⚪️ — Medium priority
- **2/7** 🟢🟢⚪️⚪️⚪️⚪️⚪️ — Low-medium priority
- **1/7** 🟢⚪️⚪️⚪️⚪️⚪️⚪️ — Low priority
- **0/7** ⚪️⚪️⚪️⚪️⚪️⚪️⚪️ — Minimal/no priority

### Urgency Levels
- **7/7** 🟡🟡🟡🟡🟡🟡🟡 — Immediate action required
- **6/7** 🟡🟡🟡🟡🟡🟡⚪️ — Very urgent (today)
- **5/7** 🟡🟡🟡🟡🟡⚪️⚪️ — Urgent (this week)
- **4/7** 🟡🟡🟡🟡⚪️⚪️⚪️ — Moderately urgent (2 weeks)
- **3/7** 🟡🟡🟡⚪️⚪️⚪️⚪️ — Some urgency (this month)
- **2/7** 🟡🟡⚪️⚪️⚪️⚪️⚪️ — Not urgent (this quarter)
- **1/7** 🟡⚪️⚪️⚪️⚪️⚪️⚪️ — Low urgency (someday)
- **0/7** ⚪️⚪️⚪️⚪️⚪️⚪️⚪️ — No time constraint

### Risk Levels
- **7/7** 🟠🟠🟠🟠🟠🟠🟠 — Catastrophic risk (data loss, security breach)
- **6/7** 🟠🟠🟠🟠🟠🟠⚪️ — Severe risk (major outage)
- **5/7** 🟠🟠🟠🟠🟠⚪️⚪️ — High risk (service degradation)
- **4/7** 🟠🟠🟠🟠⚪️⚪️⚪️ — Medium-high risk (feature impact)
- **3/7** 🟠🟠🟠⚪️⚪️⚪️⚪️ — Medium risk (minor issues)
- **2/7** 🟠🟠⚪️⚪️⚪️⚪️⚪️ — Low-medium risk (cosmetic)
- **1/7** 🟠⚪️⚪️⚪️⚪️⚪️⚪️ — Low risk (documentation)
- **0/7** ⚪️⚪️⚪️⚪️⚪️⚪️⚪️ — No risk

### Combined Score Interpretation
- **7/7** 🟢🟡🟠🔴🔴🔴🔴 — All hands on deck
- **6/7** 🟢🟡🟠🔴🔴🔴⚪️ — Escalate immediately
- **5/7** 🟢🟡🟠🔴🔴⚪️⚪️ — Take action now
- **4/7** 🟢🟡🟠🔴⚪️⚪️⚪️ — Plan and execute soon
- **3/7** 🟢🟡🟠⚪️⚪️⚪️⚪️ — Schedule appropriately
- **2/7** 🟢🟡⚪️⚪️⚪️⚪️⚪️ — Backlog priority
- **1/7** 🟢⚪️⚪️⚪️⚪️⚪️⚪️ — Nice to have

---

## 💡 Usage Examples

### Example 1: Critical Security Issue
```markdown
## 🔒 Security Vulnerability Found

🔥 Priority: 🟢🟢🟢🟢🟢🟢🟢 (7/7)
⏰ Urgency: 🟡🟡🟡🟡🟡🟡🟡 (7/7)
⚠️ Risk: 🟠🟠🟠🟠🟠🟠🟠 (7/7)
🚦 Combined: 🟢🟡🟠🔴🔴🔴🔴 (7/7)

**Status:** 🚨 IMMEDIATE ACTION REQUIRED
```

### Example 2: Feature Request
```markdown
## ✨ Add Dark Mode Toggle

🔥 Priority: 🟢🟢🟢🟢⚪️⚪️⚪️ (4/7)
⏰ Urgency: 🟡🟡🟡⚪️⚪️⚪️⚪️ (3/7)
⚠️ Risk: 🟠🟠⚪️⚪️⚪️⚪️⚪️ (2/7)
🚦 Combined: 🟢🟡🟠⚪️⚪️⚪️⚪️ (3/7)

**Status:** 📋 Backlog - Plan for next sprint
```

### Example 3: Documentation Update
```markdown
## 📚 Update API Documentation

🔥 Priority: 🟢🟢🟢⚪️⚪️⚪️⚪️ (3/7)
⏰ Urgency: 🟡🟡⚪️⚪️⚪️⚪️⚪️ (2/7)
⚠️ Risk: 🟠⚪️⚪️⚪️⚪️⚪️⚪️ (1/7)
🚦 Combined: 🟢🟡⚪️⚪️⚪️⚪️⚪️ (2/7)

**Status:** 📝 Low priority - Schedule when available
```

---

## 🔗 Integration with GitHub Issues

You can copy these bars directly into GitHub issue templates:

```yaml
- type: textarea
  id: priority_indicators
  attributes:
    label: Priority Indicators
    description: Copy/paste from PRIORITY_URGENCY_BARS.md
    placeholder: |
      🔥 Priority: 🟢🟢🟢🟢⚪️⚪️⚪️ (4/7)
      ⏰ Urgency: 🟡🟡🟡🟡⚪️⚪️⚪️ (4/7)
      ⚠️ Risk: 🟠🟠🟠⚪️⚪️⚪️⚪️ (3/7)
  validations:
    required: false
```

---

## 📖 Related Documentation

- [Issue Templates](.github/ISSUE_TEMPLATE/) — GitHub issue templates
- [Trinity System](trinity/README.md) — GreenLight priority system
- [Service Template](SERVICE_INFRA_TEMPLATE.md) — Infrastructure service template

---

**Maintained By**: BlackRoad OS Infrastructure Team  
**Last Updated**: 2025-12-25  
**Version**: 1.0.0
