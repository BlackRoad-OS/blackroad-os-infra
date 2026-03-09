# 🧩 EXAMPLES PACK v104 — 🧑‍🤝‍🧑 ORG LADDER (7 LEVELS × 7 PODS) + ⭕ APPROVAL FLOW

**Legend:** 🟢 staffed 🟡 hiring 🔴 missing ⚪️ empty  ⭕ approver  👀 reviewer  🧾 owner

---

## v104-A — 7 Levels × 7 Pods (blank board)

```
🧭        P1  P2  P3  P4  P5  P6  P7
L7 👑     ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️
L6 🧠     ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️
L5 🧾     ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️
L4 👀     ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️
L3 🛠     ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️
L2 🧩     ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️
L1 🐣     ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️  ⚪️
```

### Level Descriptions

- **L7 👑 (Executive)**: C-level executives, strategic leadership
- **L6 🧠 (Senior Leadership)**: Directors, senior management, strategic planning
- **L5 🧾 (Owner)**: Technical leads, product owners, project ownership
- **L4 👀 (Reviewer)**: Senior engineers, code reviewers, technical reviewers
- **L3 🛠 (Builder)**: Mid-level engineers, builders, implementers
- **L2 🧩 (Contributor)**: Junior engineers, contributors, learning & growing
- **L1 🐣 (Intern/Entry)**: Interns, entry-level, onboarding

### Pod Descriptions

Pods (P1-P7) represent functional teams, domains, or service areas. Examples:
- **P1**: Platform/Infrastructure
- **P2**: Product/Engineering
- **P3**: Design/UX
- **P4**: Data/Analytics
- **P5**: Security/Compliance
- **P6**: DevOps/SRE
- **P7**: Research/Innovation

### Usage

Copy the blank board and fill in names, initials, or status indicators:
- 🟢 Position filled and staffed
- 🟡 Currently hiring for this role
- 🔴 Critical gap, needs immediate attention
- ⚪️ Position not needed or planned

---

## v104-B — Approval chain (emoji-only)

```
🐣 → 🧩 → 🛠 → 👀 → 🧾 → 🧠 → 👑
```

### Approval Flow Interpretation

This represents the typical escalation and approval hierarchy:

1. **🐣 (L1)**: Creates initial work, submits for review
2. **🧩 (L2)**: Reviews and provides feedback
3. **🛠 (L3)**: Implements changes, builds solution
4. **👀 (L4)**: Reviews for quality and standards
5. **🧾 (L5)**: Owns the decision, approves direction
6. **🧠 (L6)**: Strategic approval, resource allocation
7. **👑 (L7)**: Final executive sign-off (if needed)

### Common Approval Paths

**Simple Change (Fast Path)**:
```
🛠 → 👀 → 🧾
```

**Standard Change**:
```
🧩 → 🛠 → 👀 → 🧾
```

**Major Initiative**:
```
🧾 → 🧠 → 👑
```

**Full Chain (Strategic Project)**:
```
🐣 → 🧩 → 🛠 → 👀 → 🧾 → 🧠 → 👑
```

---

## v104-C — "Who signs what" stamp row (drop into PRs/issues)

```
🧾 OWNER: __   👀 REVIEW: __   ⭕ APPROVE: __   🔐 SEC: __   🗂 DOCS: __   ✅ QA: __   🏁 MERGE: __
```

### Usage in Pull Requests

Add this template to your PR description or as a comment to track sign-offs:

```markdown
## Approvals

🧾 OWNER: @alice   👀 REVIEW: @bob   ⭕ APPROVE: @carol   🔐 SEC: @dave   🗂 DOCS: @eve   ✅ QA: @frank   🏁 MERGE: @grace
```

### Field Descriptions

- **🧾 OWNER**: Person responsible for this work (L5+)
- **👀 REVIEW**: Technical reviewer (L4+)
- **⭕ APPROVE**: Final approver (L5+)
- **🔐 SEC**: Security review (if needed)
- **🗂 DOCS**: Documentation review (if docs changed)
- **✅ QA**: Quality assurance sign-off (if testing needed)
- **🏁 MERGE**: Person authorized to merge (typically owner or reviewer)

### Example Usage

**Feature PR**:
```
🧾 OWNER: @alice   👀 REVIEW: @bob,@charlie   ⭕ APPROVE: @alice   🔐 SEC: N/A   🗂 DOCS: @david   ✅ QA: @eve   🏁 MERGE: @alice
```

**Hotfix PR**:
```
🧾 OWNER: @bob   👀 REVIEW: @alice   ⭕ APPROVE: @alice   🔐 SEC: N/A   🗂 DOCS: N/A   ✅ QA: N/A   🏁 MERGE: @bob
```

**Security PR**:
```
🧾 OWNER: @security-team   👀 REVIEW: @alice,@bob   ⭕ APPROVE: @security-lead   🔐 SEC: @security-team   🗂 DOCS: @alice   ✅ QA: @bob   🏁 MERGE: @security-lead
```

---

## Integration with BlackRoad OS

This examples pack can be used for:

1. **Team Structure Planning**: Map your organization using the 7×7 grid
2. **PR Review Process**: Add the stamp row to PR templates
3. **Escalation Paths**: Document approval chains for different change types
4. **Hiring Planning**: Use status indicators (🟢🟡🔴) to track hiring needs
5. **Responsibility Assignment**: Clear ownership and approval tracking

### Adding to PR Templates

Edit `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## Approvals

🧾 OWNER: __   👀 REVIEW: __   ⭕ APPROVE: __   🔐 SEC: __   🗂 DOCS: __   ✅ QA: __   🏁 MERGE: __
```

### Adding to Issue Templates

Edit `.github/ISSUE_TEMPLATE/feature_request.md`:

```markdown
## Required Approvals

🧾 OWNER: __   ⭕ APPROVE: __   🧠 STRATEGIC: __
```

---

## Next: v105 Preview

**Coming in v105**: A "500-template index" emoji chart for browsing templates like a menu:
- 1️⃣–7️⃣ categories
- 1️⃣–7️⃣ subtypes per category
- Quick template lookup system

---

**Version**: v104  
**Created**: 2025-12-25  
**Part of**: BlackRoad OS Infrastructure Examples Pack
