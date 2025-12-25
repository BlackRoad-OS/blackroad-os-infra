# 🧩 EXAMPLES PACK v4 (SLA + on-call + incident) — copy/paste

> **Visual templates for tracking incidents, on-call handoffs, and SLA metrics**
>
> Use these templates in your incident reports, handoff documents, or status dashboards to provide clear visual status indicators.

---

## 📖 Legend

| Symbol | Meaning |
|--------|---------|
| 🟢 | OK - everything working as expected |
| 🟡 | Watch - monitoring closely, minor issues |
| 🔴 | Bad - critical issues, action required |
| ⚪️ | Empty - no data/not applicable |

## 📏 Scale

Use the scale to show progress or severity across a timeline:

```
1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
```

---

## Example 14) Incident timeline (filled)

```
🚨 INCIDENT: API latency spike   🚦 STATUS: 🔴
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

📣 Detect     🟢🟢🟢⚪️⚪️⚪️⚪️
🧯 Triage     🟢🟢🟢🟢⚪️⚪️⚪️
🧱 Blockers   🔴🔴🔴⚪️⚪️⚪️⚪️   😭
🛠 Fix        🟢🟢⚪️⚪️⚪️⚪️⚪️
🧪 Verify     🟡🟡⚪️⚪️⚪️⚪️⚪️
🚀 Deploy     ⚪️⚪️⚪️⚪️🟢🟢⚪️
✅ Close      ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
```

### Usage

Copy this template and update the status indicators to track your incident:

```
🚨 INCIDENT: [Your incident title]   🚦 STATUS: [🟢/🟡/🔴]
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

📣 Detect     ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🧯 Triage     ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🧱 Blockers   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🛠 Fix        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🧪 Verify     ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🚀 Deploy     ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
✅ Close      ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
```

**Legend for phases:**
- **📣 Detect**: When the issue was first detected
- **🧯 Triage**: Initial assessment and prioritization
- **🧱 Blockers**: Issues preventing resolution
- **🛠 Fix**: Implementation of the fix
- **🧪 Verify**: Testing and validation
- **🚀 Deploy**: Deployment to production
- **✅ Close**: Incident closed and documented

---

## Example 15) On-call handoff (filled)

```
📟 ON-CALL HANDOFF   🚦 🟡
Open alerts   🔴🔴⚪️⚪️⚪️⚪️⚪️
Known issues  🟡🟡🟡⚪️⚪️⚪️⚪️
Next actions  🟢🟢🟢⚪️⚪️⚪️⚪️
Owners ready  🟢🟢🟢🟢⚪️⚪️⚪️
Sleep status  😭😭⚪️⚪️⚪️⚪️⚪️
```

### Usage

Copy this template for on-call handoffs:

```
📟 ON-CALL HANDOFF   🚦 [🟢/🟡/🔴]
Open alerts   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
Known issues  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
Next actions  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
Owners ready  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
Sleep status  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
```

**Legend for handoff metrics:**
- **Open alerts**: Number/severity of active alerts
- **Known issues**: Ongoing issues requiring attention
- **Next actions**: Clearly defined next steps
- **Owners ready**: Team members available and briefed
- **Sleep status**: Rest/fatigue levels (😭 = exhausted, 🟢 = well-rested)

**Overall Status Indicators:**
- 🟢 = Healthy handoff, no critical issues
- 🟡 = Some concerns, extra attention needed
- 🔴 = Critical situation, escalation required

---

## Example 16) SLA dashboard (filled)

```
📊 SLA (this week)   🚦 🟡
Uptime        🟢🟢🟢🟢🟢🟢⚪️
Latency       🟡🟡🟡⚪️⚪️⚪️⚪️
Errors        🔴🔴⚪️⚪️⚪️⚪️⚪️
Tickets       🟡🟡⚪️⚪️⚪️⚪️⚪️
Customer mood 🥹🥹🥹⚪️⚪️⚪️⚪️
```

### Usage

Copy this template for SLA tracking:

```
📊 SLA (this week)   🚦 [🟢/🟡/🔴]
Uptime        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
Latency       ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
Errors        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
Tickets       ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
Customer mood ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
```

**Legend for SLA metrics:**
- **Uptime**: Service availability (target: 🟢🟢🟢🟢🟢🟢🟢 = 99.9%)
- **Latency**: Response times (🟢 < 200ms, 🟡 200-500ms, 🔴 > 500ms)
- **Errors**: Error rate (🟢 < 0.1%, 🟡 0.1-1%, 🔴 > 1%)
- **Tickets**: Support ticket volume (🟢 low, 🟡 moderate, 🔴 high)
- **Customer mood**: Customer satisfaction (🟢 happy, 🟡 concerned, 🔴 frustrated, 🥹 affected)

**Overall Status:**
- 🟢 = Meeting all SLA targets
- 🟡 = Some metrics at risk
- 🔴 = SLA breach

---

## 💡 Tips for Using These Templates

1. **Copy the template directly** from the "Usage" sections
2. **Update indicators progressively** as the situation evolves
3. **Use in Slack/Teams** - these render well in most chat platforms
4. **Add to incident reports** - provides visual status at a glance
5. **Track over time** - copy weekly for trending
6. **Customize the scale** - adjust 1️⃣-7️⃣ to match your timeline needs

## 🔗 Related Documentation

- [Incident Playbooks](./README.md#-incident-playbooks)
- [Site Down Runbook](./site-down.md)
- [Bad Deploy Runbook](./bad-deploy.md)
- [Observability Dashboards](../observability/dashboards.md)

---

**Last Updated**: 2025-12-25  
**Version**: 4.0
