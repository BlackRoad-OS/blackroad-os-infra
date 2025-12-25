# 🧩 EXAMPLES PACK v86 — 🗂 "RECORD TYPE → AUTO BUCKET" EMOJI MATRIX (BD + IA)

**Legend:** 🗂 bucket | ⚡ 2Y easy-access | 🔐 storage | 🏢 location | 📎 evidence

**Buckets:** 🏛️ LIFETIME | 6️⃣Y | 4️⃣Y | 3️⃣Y | 🧠 IA 5Y | 🏢 IA 2Y office

---

## v86-A — Master Matrix (copy/paste)

| 🧭 RECORD TYPE                          | 🗂 BUCKET         | ⚡   | 🔐   | 🏢          |
|-----------------------------------------|-------------------|-----|-----|-------------|
| 🧾 Customer account records             | 6️⃣Y (after close) | ⚡  | 🔐   | —           |
| 📣 Comms with the public                | 3️⃣Y              | ⚡  | 🔐   | —           |
| 🎫 Order tickets                        | 3️⃣Y              | ⚡  | 🔐   | —           |
| 🧾 Confirmations                        | 3️⃣Y              | ⚡  | 🔐   | —           |
| 📘 Compliance/procedures manual         | 3️⃣Y              | ⚡  | 🔐   | —           |
| 😡📝 Written customer complaints         | 4️⃣Y              | ⚡  | 🔐   | 🏢 OSJ      |
| 🏛️ Org/registration core docs           | 🏛️ LIFETIME       | ⚡  | 🔐   | —           |
| 🧠 IA books & records                   | 🧠 5Y access      | ⚡  | —   | 🏢 first 2Y |

### Rule anchors (BD + IA)

**BD (Broker-Dealer) Requirements:**
- 6Y after account close for customer account records.
- 3Y for communications with the public, confirmations, order tickets, compliance/procedures manual.
- 4Y for written customer complaints.
- Most recent 2Y readily accessible.
- Electronic storage non-rewriteable + non-erasable, and FINRA notice ≥90 days prior.

**IA (Investment Advisor) Requirements:**
- Records 5 years readily accessible; first 2 years in principal office.

---

## v86-B — "Auto-stamp row" for any template

### 🗂 AUTO-STAMP:

```
🏛️/6️⃣Y/4️⃣Y/3️⃣Y  +  ⚡2Y  +  🔐WORM+90d(BD)  +  🏢2Y office(IA)
```

**Quick Reference:**
- **Retention Period:** 🏛️ Lifetime / 6️⃣Y / 4️⃣Y / 3️⃣Y
- **Easy Access:** ⚡ 2 years readily accessible
- **Storage:** 🔐 WORM (Write Once Read Many) + 90-day FINRA notice for BD
- **Location:** 🏢 First 2 years in principal office for IA

---

## v86-C — Emoji checkboxes (super fast tagging)

### Quick Tagging Template

```
🗂 BUCKET:  🏛️ ☐  6️⃣Y ☐  4️⃣Y ☐  3️⃣Y ☐   🧠5Y ☐  🏢2Y ☐
⚡ 2Y EASY: ⚡ ☐
🔐 STORAGE: 🔐 ☐   (BD: WORM + 90d notice)
📎 EVIDENCE: 📎 ☐ 📎☐ 📎☐
```

### Usage Instructions

1. **Select Bucket:** Check one bucket option (🏛️, 6️⃣Y, 4️⃣Y, 3️⃣Y, 🧠5Y, or 🏢2Y)
2. **Easy Access:** Check ⚡ if 2-year easy access is required
3. **Storage:** Check 🔐 if WORM storage + 90-day notice applies (BD requirement)
4. **Evidence:** Check 📎 boxes for each piece of supporting evidence/documentation

---

## Implementation Notes

### For Infrastructure PRs

When implementing record retention in infrastructure:

1. **Tag each record type** using the emoji checkboxes from v86-C
2. **Reference the master matrix** (v86-A) for retention requirements
3. **Use the auto-stamp** (v86-B) in templates and documentation
4. **Ensure compliance** with both BD and IA requirements where applicable

### Storage Requirements

**BD Electronic Storage (FINRA):**
- Must be non-rewriteable and non-erasable (WORM)
- Requires ≥90 days notice to FINRA before implementation
- Most recent 2 years must be readily accessible

**IA Record Keeping (SEC):**
- Records must be maintained for 5 years
- First 2 years must be kept in principal office
- Must be readily accessible for inspection

### Compliance References

- **BD Rules:** FINRA Rule 4511 (General Requirements) and SEA Rule 17a-4
- **IA Rules:** Investment Advisers Act Rule 204-2
- **WORM Storage:** SEC Release No. 34-47806 (Electronic Storage Requirements)

---

## Next: v87 Preview

**Coming Next:** v87 will provide a "WORM Storage + Indexing + Retrieval" emoji template covering BD + IA e-storage requirements that can be integrated into infrastructure PRs.

---

**Version:** 1.0  
**Created:** 2025-12-25  
**Maintained By:** BlackRoad OS Infrastructure Team  
**Compliance Focus:** BD (Broker-Dealer) + IA (Investment Advisor) Record Retention
