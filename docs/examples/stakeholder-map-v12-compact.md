# 🧩 EXAMPLES PACK v12 (stakeholder map) — 7 stakeholders × 7 signals

Legend: 🟢 aligned  🟡 needs touch  🔴 unhappy  ⚪️ empty
Scale:  1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

## Compact Format

```
👥 STAKEHOLDERS: ____________________   📅 WEEK: ____________   🚦 STATUS: 🟡
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

👑 Exec Sponsor __________   🟢🟢🟢🟢⚪️⚪️⚪️   📣 touch: 🟡
🧑‍⚖️ Legal       __________   🟡🟡🟡⚪️⚪️⚪️⚪️   🔐 risk: 🟡
🔐 Security    __________   🟢🟢🟢⚪️⚪️⚪️⚪️   ✅ gate: 🟡
💻 Eng Lead    __________   🟢🟢🟢🟢🟢⚪️⚪️   ⚙️ WIP: 🟡
📣 Comms Lead  __________   🟢🟢🟢⚪️⚪️⚪️⚪️   ✉️ draft: 🟡
🧪 QA Lead     __________   🟡🟡⚪️⚪️⚪️⚪️⚪️   🧪 load: 🟡
🎧 Support     __________   🔴🔴⚪️⚪️⚪️⚪️⚪️   🚨 issue: 😭
```

## Usage

This compact format is ideal for:
- Quick status updates in Slack/Discord
- Embedding in issue descriptions
- Adding to PR comments
- Sprint planning documents
- Weekly standup notes

Simply copy the template above and fill in:
1. Replace `____________________` in the header with project/initiative name
2. Replace `____________` in WEEK with the current week (e.g., "2025-W52")
3. Update STATUS emoji (🟢🟡🔴)
4. Replace `__________` after each stakeholder emoji with the person's name
5. Update signal indicators (🟢🟡🔴⚪️) based on recent engagement
6. Update the status indicators on the right

## Example

```
👥 STAKEHOLDERS: Q4 Cloud Migration   📅 WEEK: 2025-W52   🚦 STATUS: 🟡
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

👑 Exec Sponsor Jane Smith     🟢🟢🟢🟢🟡⚪️⚪️   📣 touch: 🟢
🧑‍⚖️ Legal       John Doe       🟢🟢🟡⚪️⚪️⚪️⚪️   🔐 risk: 🟡
🔐 Security    Alice Johnson  🟢🟢🟢🟢⚪️⚪️⚪️   ✅ gate: 🟢
💻 Eng Lead    Bob Wilson     🟢🟢🟢🟢🟢🟢🟢   ⚙️ WIP: 🟢
📣 Comms Lead  Carol Martinez 🟢🟢🟢🟡⚪️⚪️⚪️   ✉️ draft: 🟡
🧪 QA Lead     David Lee      🟡🟡🟡⚪️⚪️⚪️⚪️   🧪 load: 🟡
🎧 Support     Emma Davis     🔴🔴🟡⚪️⚪️⚪️⚪️   🚨 issue: 😭
```

## Legend Reference

### Signal Colors
- **🟢 aligned** - Stakeholder is engaged, informed, and supportive
- **🟡 needs touch** - Stakeholder needs an update or check-in soon
- **🔴 unhappy** - Stakeholder has concerns, blockers, or is at risk
- **⚪️ empty** - No signal/data available for this time period

### Status Indicators
- **📣 touch** - Last communication/touchpoint status
- **🔐 risk** - Risk level assessment
- **✅ gate** - Approval gate status
- **⚙️ WIP** - Work in progress status
- **✉️ draft** - Communication draft readiness
- **🧪 load** - Testing/QA workload status
- **🚨 issue** - Critical concern indicator

### Scale (1️⃣-7️⃣)
- Each position represents a recent touchpoint (typically days or weeks)
- Read left to right: most recent → oldest
- Pattern indicates engagement trend over time

## Tips

1. **Update consistently** - Same day each week maintains accuracy
2. **Be honest** - Red signals aren't failures, they're calls to action
3. **Take action on reds** - 🔴 indicators require immediate follow-up
4. **Track trends** - Look for patterns across multiple weeks
5. **Archive snapshots** - Keep historical records for retrospectives
6. **Share widely** - Make the map visible to all project members
7. **Customize roles** - Adapt stakeholder types to your organization

---

**Related Files:**
- [Full stakeholder map template](./stakeholder-map-v12.md) - Detailed version with instructions
