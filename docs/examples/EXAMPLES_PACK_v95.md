# 🧩 EXAMPLES PACK v95 — ⚠️ RISK REGISTER + 🔥 HEATMAP (7×7) + 😭 SAD BARS

> **Risk Management Templates for Infrastructure Projects**  
> Legend: 🟢 low 🟡 med 🟠 high 🔴 critical  ⚪️ empty  🧱 blocker  ✅ mitigated

---

## v95-A — 7×7 Risk Heatmap (Likelihood × Impact)

Use this heatmap to visualize risks based on their likelihood and impact scores.

```
Impact →   1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
Likely 7️⃣  🟡🟠🟠🔴🔴🔴🔴
      6️⃣  🟡🟡🟠🟠🔴🔴🔴
      5️⃣  🟢🟡🟡🟠🟠🔴🔴
      4️⃣  🟢🟢🟡🟡🟠🟠🔴
      3️⃣  🟢🟢🟢🟡🟡🟠🟠
      2️⃣  🟢🟢🟢🟢🟡🟡🟠
      1️⃣  🟢🟢🟢🟢🟢🟡🟡
```

**How to use:**
1. Plot each risk by its Likelihood (1-7) and Impact (1-7)
2. Color indicates risk severity:
   - 🟢 Low risk (score 1-7)
   - 🟡 Medium risk (score 8-14)
   - 🟠 High risk (score 15-28)
   - 🔴 Critical risk (score 29-49)
3. Prioritize mitigation for 🔴 critical and 🟠 high risks

---

## v95-B — Risk Register (7 risks × 7 fields)

Track and manage risks with this structured register template.

```
🧭   1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
R1 ⚠️ ____________   L:__  I:__  🔥: 🟡/🟠/🔴  👤____  🛠____  ✅/🧱
R2 ⚠️ ____________   L:__  I:__  🔥: 🟡/🟠/🔴  👤____  🛠____  ✅/🧱
R3 ⚠️ ____________   L:__  I:__  🔥: 🟡/🟠/🔴  👤____  🛠____  ✅/🧱
R4 ⚠️ ____________   L:__  I:__  🔥: 🟡/🟠/🔴  👤____  🛠____  ✅/🧱
R5 ⚠️ ____________   L:__  I:__  🔥: 🟡/🟠/🔴  👤____  🛠____  ✅/🧱
R6 ⚠️ ____________   L:__  I:__  🔥: 🟡/🟠/🔴  👤____  🛠____  ✅/🧱
R7 ⚠️ ____________   L:__  I:__  🔥: 🟡/🟠/🔴  👤____  🛠____  ✅/🧱
```

**Field definitions:**
- **R#**: Risk identifier (R1-R7)
- **⚠️ ____**: Risk description (brief title)
- **L:__**: Likelihood score (1-7)
- **I:__**: Impact score (1-7)
- **🔥**: Risk severity (🟡 medium / 🟠 high / 🔴 critical)
- **👤____**: Owner/responsible person
- **🛠____**: Mitigation strategy (brief)
- **✅/🧱**: Status (✅ mitigated / 🧱 blocker)

**Example filled:**
```
R1 ⚠️ DNS_Outage     L:3   I:7   🔥: 🔴  👤Alice  🛠Multi-zone  ✅
R2 ⚠️ Deploy_Fail    L:5   I:4   🔥: 🟠  👤Bob    🛠Rollback    🧱
```

---

## v95-C — Sad Progress Bars (for when a mitigation is stuck 😭)

Visual representation of mitigation progress when things aren't moving forward.

```
😭⚪️⚪️⚪️⚪️⚪️⚪️
😭😭⚪️⚪️⚪️⚪️⚪️
😭😭😭⚪️⚪️⚪️⚪️
😭😭😭😭⚪️⚪️⚪️
😭😭😭😭😭⚪️⚪️
😭😭😭😭😭😭⚪️
😭😭😭😭😭😭😭
```

**Progress levels:**
- 1/7 😭⚪️⚪️⚪️⚪️⚪️⚪️ — Just started, mostly stuck
- 2/7 😭😭⚪️⚪️⚪️⚪️⚪️ — Making some progress
- 3/7 😭😭😭⚪️⚪️⚪️⚪️ — Less than halfway
- 4/7 😭😭😭😭⚪️⚪️⚪️ — Halfway (but still sad)
- 5/7 😭😭😭😭😭⚪️⚪️ — More than halfway
- 6/7 😭😭😭😭😭😭⚪️ — Almost there
- 7/7 😭😭😭😭😭😭😭 — Complete (but painful)

**When to use:**
- Mitigation is taking longer than expected
- Resources are blocked or unavailable
- Progress is slow despite effort
- Team morale needs acknowledgment

---

## 📋 Usage Examples

### Complete Risk Assessment Example

**Project:** DNS Migration to Multi-Zone Setup

**Heatmap with risks plotted:**
```
Impact →   1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
Likely 7️⃣  🟡🟠🟠🔴🔴🔴🔴
      6️⃣  🟡🟡🟠🟠🔴🔴🔴
      5️⃣  🟢🟡🟡🟠[R2]🔴
      4️⃣  🟢🟢🟡🟡🟠🟠🔴
      3️⃣  🟢🟢🟢🟡🟡🟠[R1]
      2️⃣  🟢🟢🟢🟢🟡🟡🟠
      1️⃣  🟢🟢[R3]🟢🟢🟡🟡
```

**Risk Register:**
```
R1 ⚠️ DNS_Downtime   L:3   I:7   🔥: 🔴  👤Alice  🛠Backup-NS   ✅
R2 ⚠️ Config_Error   L:5   I:5   🔥: 🟠  👤Bob    🛠Validation  🧱
R3 ⚠️ Doc_Outdated   L:1   I:3   🔥: 🟢  👤Carol  🛠Update-PR   ✅
```

**Mitigation Progress for R2 (blocked):**
```
Config validation script development: 😭😭😭⚪️⚪️⚪️⚪️
```

---

## 🔗 Related Templates

Coming in v96: **Dependency Map** emoji template  
(🔗 chains + 🧱 blockers + rescue plan) in 7×7 form

---

## 📝 Notes

- These templates are designed for quick visual communication
- Use in markdown documents, issue trackers, or status updates
- Emoji-based format works across platforms (GitHub, Slack, etc.)
- Keep descriptions brief to maintain visual clarity
- Update regularly to reflect current project state

---

**Version:** v95  
**Created:** 2025-12-25  
**License:** Internal use for BlackRoad OS infrastructure projects
