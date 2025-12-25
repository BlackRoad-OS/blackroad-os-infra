# 🧩 EXAMPLES PACK v2 (more "real" scenarios)

**Real-world examples using the GreenLight emoji template system**

Legend: 🟢 done  🟡 watch  🔴 stuck  ⚪️ empty

---

## Example 6) Dependency chain (filled)

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

1️⃣ 📚 Write templates doc      🟢🟢🟢🟢⚪️⚪️⚪️   ➡️ unlocks: 2️⃣ 3️⃣
2️⃣ 💻 Add markdown snippets    🟢🟢🟢⚪️⚪️⚪️⚪️   ⬅️ needs: 1️⃣    ➡️ unlocks: 4️⃣
3️⃣ 🛠 Add JSON/YAML versions    🟢🟢⚪️⚪️⚪️⚪️⚪️   ⬅️ needs: 1️⃣    ➡️ unlocks: 5️⃣
4️⃣ 🧪 Test copy/paste format   🟢🟢⚪️⚪️⚪️⚪️⚪️   ⬅️ needs: 2️⃣    ➡️ unlocks: 6️⃣
5️⃣ 🔐 Add "safe defaults"      🟡🟡⚪️⚪️⚪️⚪️⚪️   ⬅️ needs: 3️⃣    ➡️ unlocks: 7️⃣
6️⃣ 📣 Post examples in README  🟢🟢🟢⚪️⚪️⚪️⚪️   ⬅️ needs: 4️⃣
7️⃣ 🚀 PR merge + tag release   ⚪️⚪️⚪️⚪️🟢🟢⚪️   ⬅️ needs: 5️⃣ 6️⃣   🏁

---

## Example 7) Release checklist snapshot (filled)

🚀 RELEASE: TEMPIES v1   📦 VERSION: 0.1.0   🚦 STATUS: 🟡

📚 Docs      ☑️☑️☑️☑️☐☐☐
💻 Build     ☑️☑️☑️☑️☑️☐☐
🧪 Test      ☑️☑️☑️☐☐☐☐
🔐 Security  ☑️☑️☐☐☐☐☐
📣 Comms     ☑️☑️☐☐☐☐☐
🚀 Deploy    ☑️☐☐☐☐☐☐
✅ Close     ☐☐☐☐☐☐☐

---

## Example 8) Weekly plan (filled)

📅 WEEK: Jan W1   🧾 PROJECT: Emoji Templates   🚦 STATUS: 🟡

🎯 GOALS
G1 Publish 50 templates        🟢🟢🟢🟢⚪️⚪️⚪️
G2 Add 20 examples             🟢🟢🟢⚪️⚪️⚪️⚪️
G3 Make "giant" master format  🟡🟡🟡⚪️⚪️⚪️⚪️
G4 Setup PR checklist          🟢🟢⚪️⚪️⚪️⚪️⚪️
G5 Add emoji legend page       🟢⚪️⚪️⚪️⚪️⚪️⚪️
G6 Clean formatting            🟢🟢🟢⚪️⚪️⚪️⚪️
G7 Ship v0.1.0                 ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

📌 TASKS
T1 Add README sections         🟢🟢🟢🟢⚪️⚪️⚪️
T2 Paste "Gantt pack"          🟢🟢🟢⚪️⚪️⚪️⚪️
T3 Paste "Kanban pack"         🟢🟢⚪️⚪️⚪️⚪️⚪️
T4 Fix alignment               🟡🟡⚪️⚪️⚪️⚪️⚪️
T5 Blocker: emoji rendering    🔴🔴⚪️⚪️⚪️⚪️⚪️   😭
T6 Add more examples           🟢🟢⚪️⚪️⚪️⚪️⚪️
T7 Tag release                 ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

---

## Example 9) Customer rollout grid (filled)

🚀 ROLLOUT: TEMPIES   🚦 STATUS: 🟡
🧭 Steps →  1️⃣  2️⃣  3️⃣  4️⃣  5️⃣  6️⃣  7️⃣

👤 CUST-01 Pilot-A   🟢🟢🟢🟢⚪️⚪️⚪️
👤 CUST-02 Pilot-B   🟢🟢🟢⚪️⚪️⚪️⚪️
👤 CUST-03 Pilot-C   🟡🟡🟡⚪️⚪️⚪️⚪️
👤 CUST-04 Pilot-D   🔴🔴⚪️⚪️⚪️⚪️⚪️   😭
👤 CUST-05 Cohort-1  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
👤 CUST-06 Cohort-2  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
👤 CUST-07 Cohort-3  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

---

## Usage Notes

These examples demonstrate real-world scenarios using the GreenLight emoji template system:

- **Example 6**: Shows how to visualize task dependencies and progress in a chain
- **Example 7**: Demonstrates a release checklist with multiple categories and progress tracking
- **Example 8**: Illustrates weekly planning with goals and tasks, including blockers
- **Example 9**: Shows customer rollout tracking across multiple cohorts

### Emoji Legend

- 🟢 = Completed / Green / Done
- 🟡 = In Progress / Yellow / Watch
- 🔴 = Blocked / Red / Stuck
- ⚪️ = Not Started / Empty
- ☑️ = Checked / Complete
- ☐ = Unchecked / Incomplete
- 😭 = Critical Issue / Needs Help

### Progress Indicators

Each circle represents a unit of work (could be hours, days, or percentage):
- 7 circles = 7 units of capacity
- Filled circles = completed units
- Empty circles = remaining units

---

**Template Version**: 2.0
**Last Updated**: 2025-12-25
**Related**: See `trinity/docs/GREENLIGHT_EMOJI_DICTIONARY.md` for complete emoji reference
