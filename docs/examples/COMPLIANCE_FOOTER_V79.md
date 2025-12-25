# 🧩 COMPLIANCE FOOTER EXAMPLES PACK v79

> **PR "COMPLIANCE FOOTER"** — One-line and mini-line templates for regulatory compliance documentation in Pull Requests.

Legend: 🏷 classify | ⭕ gate | 📎 evidence | 🗂 retain | 🔐 storage | 🏁 close

---

## v79-A — One-line Footer (Full)

**Usage:** Paste into every PR description for full compliance tracking.

```
🏷 Retail(>25/30d) / Corr(≤25/30d) / Inst-only   |  ⭕ Retail principal pre-use   |  🎓 if not pre-review → training+evidence   |  📎 IA ad copy+memo reasons (10+ persons)   |  🗂 BD 6Y acct / 3Y comms / 4Y complaints / 2Y easy    |  🔐 WORM + FINRA 90d notice 
```

**Copy-paste version:**
```markdown
---
**Compliance:** 🏷 Retail(>25/30d) / Corr(≤25/30d) / Inst-only   |  ⭕ Retail principal pre-use   |  🎓 if not pre-review → training+evidence   |  📎 IA ad copy+memo reasons (10+ persons)   |  🗂 BD 6Y acct / 3Y comms / 4Y complaints / 2Y easy    |  🔐 WORM + FINRA 90d notice 
```

### What it means:
- **🏷 Classification:** Retail (>25/30d), Correspondence (≤25/30d), or Institutional-only communications
- **⭕ Gate:** Retail communications require principal pre-use approval
- **🎓 Training:** If not pre-reviewed → training + evidence required
- **📎 Evidence:** Investment Adviser ad copy + memo with reasons (10+ persons threshold)
- **🗂 Retention:** Broker-Dealer records: 6Y accounts / 3Y communications / 4Y complaints / 2Y ease of access
- **🔐 Storage:** Write-Once-Read-Many (WORM) media + FINRA 90-day notice requirement

---

## v79-B — Mini Footer (Condensed)

**Usage:** Tiny footer for space-constrained PRs, still legal-aware.

```
🏷(Retail/Corr/Inst)  | ⭕(Retail pre-use)  | 🗂(6Y/3Y/4Y/2Y)   | 🔐(WORM+90d) 
```

**Copy-paste version:**
```markdown
---
**Compliance:** 🏷(Retail/Corr/Inst)  | ⭕(Retail pre-use)  | 🗂(6Y/3Y/4Y/2Y)   | 🔐(WORM+90d) 
```

---

## v79-C — Approval Stamps

**Usage:** Append at the end of PR description after compliance review.

```
⭕👩‍⚖️ ⭕🧾 ⭕🔐 ⭕🗂 ✅🏁
```

**Copy-paste version:**
```markdown
**Approvals:** ⭕👩‍⚖️ ⭕🧾 ⭕🔐 ⭕🗂 ✅🏁
```

### What each stamp means:
- **⭕👩‍⚖️** — Legal review complete
- **⭕🧾** — Records management verified
- **⭕🔐** — Storage/security approved
- **⭕🗂** — Retention policy confirmed
- **✅🏁** — Final sign-off, cleared to close

---

## 📋 Quick Reference Card

| Template | Use Case | Format |
|----------|----------|--------|
| **v79-A** | Full compliance tracking | One-line footer with all details |
| **v79-B** | Space-constrained PRs | Mini footer (abbreviated) |
| **v79-C** | Post-review sign-off | Approval stamps |

---

## 🔮 Preview: v80 — Reg Exam Response Pack

**Coming next:** A "regulatory examination response pack" emoji template for handling regulatory requests.

**Workflow stages:**
```
📬 request → 🔍 collect → 📎 pack → 👩‍⚖️ approve → 📤 deliver → 🗂 retain
```

**Template structure:**
- **📬 Request:** Document the regulatory request
- **🔍 Collect:** Gather relevant documents and evidence
- **📎 Pack:** Assemble response package
- **👩‍⚖️ Approve:** Legal/compliance approval
- **📤 Deliver:** Submit to regulator
- **🗂 Retain:** Archive with same retention/storage stamps as v79

**Retention/Storage stamps (same as v79):**
```
🗂(6Y/3Y/4Y/2Y) | 🔐(WORM+90d)
```

---

## 📝 Example Usage in PR

### Full Example:
```markdown
# Feature: Update customer communications template

## Description
Updated email template for retail customer notifications.

## Type of Change
- [x] Documentation update
- [x] Compliance-related change

## Checklist
- [x] Code follows project style
- [x] Self-reviewed code
- [x] Updated documentation
- [x] Legal review completed

---
**Compliance:** 🏷 Retail(>25/30d) / Corr(≤25/30d) / Inst-only   |  ⭕ Retail principal pre-use   |  🎓 if not pre-review → training+evidence   |  📎 IA ad copy+memo reasons (10+ persons)   |  🗂 BD 6Y acct / 3Y comms / 4Y complaints / 2Y easy    |  🔐 WORM + FINRA 90d notice 

**Approvals:** ⭕👩‍⚖️ ⭕🧾 ⭕🔐 ⭕🗂 ✅🏁
```

### Mini Example:
```markdown
# Fix: Typo in customer FAQ

## Description
Fixed typo in customer-facing FAQ document.

---
**Compliance:** 🏷(Retail/Corr/Inst)  | ⭕(Retail pre-use)  | 🗂(6Y/3Y/4Y/2Y)   | 🔐(WORM+90d) 
```

---

## 🎯 When to Use

### Use v79-A (Full) when:
- Changes affect customer-facing content
- Regulatory compliance is critical
- Full audit trail is required
- Multiple stakeholders need clarity

### Use v79-B (Mini) when:
- Internal-only changes
- Space is limited
- Quick reference needed
- Team already familiar with compliance requirements

### Use v79-C (Stamps) when:
- All reviews are complete
- PR is ready to merge
- Sign-off trail is needed
- Audit documentation required

---

## 🔗 Related Documentation

- [PR Template](/.github/pull_request_template.md)
- [Compliance Workflows](/.github/workflows/trinity-compliance.yml)
- [Repository Charter](/REPO_CHARTER.md)

---

**Maintained By:** BlackRoad OS Infrastructure Team  
**Version:** v79  
**Last Updated:** 2025-12-25  
**Next Version:** v80 (Reg Exam Response Pack)
