# 🎓✅ v93-C — Training Wave Card (Copy/Paste Template)

**Individual Training Wave Tracking Card**  
**Purpose:** Track a single training wave from launch to archive  
**Copy this template** for each training wave in your program

---

## Training Wave Template

```
🎓✅ TRAINING WAVE   📌 ID: TRN___   🚦 🟡
TOPIC: ____________   POPULATION: ________   OWNER: ________
🗓 OPEN: __/__   🗓 CLOSE: __/__   👀 QA %: __%

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
📣 Announce     ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🎓 Train        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
✅ Attest       ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
👀 Audit        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🧾 Exceptions   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🛠 Remediate    ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🏁 Archive      ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

📎 Evidence: 📸 completion report | ✅ attestation export | 🧾 exception list | 🗂 archive link
```

---

## Example: Completed Training Wave

```
🎓✅ TRAINING WAVE   📌 ID: TRN001   🚦 🟢
TOPIC: Security Compliance 2025   POPULATION: 5,000 Engineers   OWNER: Jane Doe (CTO)
🗓 OPEN: 01/15   🗓 CLOSE: 02/28   👀 QA %: 10%

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
📣 Announce     🟢🟢⚪️⚪️⚪️⚪️⚪️
🎓 Train        ⚪️🟢🟢🟢⚪️⚪️⚪️
✅ Attest       ⚪️⚪️🟢🟢🟢⚪️⚪️
👀 Audit        ⚪️⚪️⚪️🟢🟢⚪️⚪️
🧾 Exceptions   ⚪️⚪️⚪️⚪️🟢🟢⚪️
🛠 Remediate    ⚪️⚪️⚪️⚪️⚪️🟢⚪️
🏁 Archive      ⚪️⚪️⚪️⚪️⚪️⚪️🟢

📎 Evidence: 📸 report_TRN001.pdf | ✅ attest_TRN001.csv | 🧾 except_TRN001.json | 🗂 s3://archive/TRN001
```

---

## Field Definitions

### Header Information

- **📌 ID:** Unique training wave identifier (e.g., TRN001, TRN002)
- **🚦 Status:** 
  - 🟡 In Progress
  - 🟢 Complete
  - 🔴 Blocked
  - ⚪️ Not Started
- **TOPIC:** Training subject/module name
- **POPULATION:** Target audience size and description
- **OWNER:** Program owner name and role
- **🗓 OPEN:** Training window open date (MM/DD)
- **🗓 CLOSE:** Training window close date (MM/DD)
- **👀 QA %:** Audit sampling percentage

### Progress Grid

Track progress across 7 phases using the emoji grid:

- **📣 Announce:** Communication sent to target population
- **🎓 Train:** Training materials accessed and completed
- **✅ Attest:** Attestation forms submitted
- **👀 Audit:** Random sampling and QA checks performed
- **🧾 Exceptions:** Non-compliant cases identified and tracked
- **🛠 Remediate:** Remediation training for exceptions
- **🏁 Archive:** Final evidence package created and stored

### Evidence Links

Document all evidence artifacts:

- **📸 Completion Report:** PDF export of completion statistics
- **✅ Attestation Export:** CSV of all attestation submissions
- **🧾 Exception List:** JSON file of tracked exceptions
- **🗂 Archive Link:** URL to permanent storage location

---

## Usage Instructions

### 1. Create New Training Wave

Copy the blank template and fill in:

```bash
# Copy template
cp v93-C-training-wave-card.md training-waves/TRN-XXX-[name].md

# Fill in header fields
# Update ID, Topic, Population, Owner, Dates, QA %
```

### 2. Track Progress Daily/Weekly

Update the grid as the wave progresses:
- Change ⚪️ → 🟡 when starting a phase
- Change 🟡 → 🟢 when completing a phase
- Use 🔴 if a phase is blocked

### 3. Document Evidence

As evidence is generated:
- Upload completion reports
- Export attestation data
- Track exceptions in structured format
- Archive to permanent storage

### 4. Close Out Wave

When all phases complete:
- Update status to 🟢
- Ensure all evidence links work
- Move card to "Completed" folder
- Update summary metrics

---

## Copy/Paste Templates

### Blank Template (Quick Start)

```
🎓✅ TRAINING WAVE   📌 ID: TRN___   🚦 ⚪️
TOPIC: ____________   POPULATION: ________   OWNER: ________
🗓 OPEN: __/__   🗓 CLOSE: __/__   👀 QA %: __%

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
📣 Announce     ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🎓 Train        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
✅ Attest       ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
👀 Audit        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🧾 Exceptions   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🛠 Remediate    ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🏁 Archive      ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

📎 Evidence: 📸 _____ | ✅ _____ | 🧾 _____ | 🗂 _____
```

### Pre-filled Example (Engineering)

```
🎓✅ TRAINING WAVE   📌 ID: TRN001   🚦 🟡
TOPIC: Security Compliance 2025   POPULATION: 5,000 Engineers   OWNER: Jane Doe (CTO)
🗓 OPEN: 01/15   🗓 CLOSE: 02/28   👀 QA %: 10%

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
📣 Announce     ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🎓 Train        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
✅ Attest       ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
👀 Audit        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🧾 Exceptions   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🛠 Remediate    ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🏁 Archive      ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

📎 Evidence: 📸 completion_TRN001.pdf | ✅ attestations_TRN001.csv | 🧾 exceptions_TRN001.json | 🗂 s3://training-archives/2025/TRN001
```

---

## Integration with Other Templates

This training wave card integrates with:

- **v93-A (Rollout Gantt):** Overall campaign timeline
- **v93-B (Program Board):** Multi-track progress view
- **Project Management:** Export to Jira, Asana, Monday
- **LMS Systems:** Link to learning management platforms
- **Compliance Tools:** Connect to attestation tracking systems

---

## Metrics & KPIs

Track these metrics for each training wave:

| Metric | Formula | Target |
|--------|---------|--------|
| **Completion Rate** | Completed / Population × 100 | 95%+ |
| **Attestation Rate** | Attested / Population × 100 | 95%+ |
| **Audit Pass Rate** | Passed / Sampled × 100 | 100% |
| **Exception Rate** | Exceptions / Population × 100 | <5% |
| **Remediation Rate** | Remediated / Exceptions × 100 | 100% |
| **On-Time Closure** | Closed by Close Date | Yes |

---

## Related Templates

- [v93-A: Rollout Gantt (7×7)](./v93-A-rollout-gantt.md)
- [v93-B: Training Program Board (7×7)](./v93-B-training-program-board.md)
- [v94: Supervision Control Test](./v94-supervision-control-test.md) (Coming soon)

---

## Tips for Success

1. **Create waves early** - Set up cards before training starts
2. **Update regularly** - Review and update at least weekly
3. **Link evidence** - Always include direct links to artifacts
4. **Track exceptions** - Document all non-compliance cases
5. **Archive properly** - Store evidence in permanent, accessible location
6. **Share widely** - Make cards visible to stakeholders
7. **Automate updates** - Connect to LMS APIs where possible
