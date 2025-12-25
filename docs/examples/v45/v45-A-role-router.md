# v45-A — Role Router (7 roles × 7 duties)

**Purpose**: Role-based task routing matrix for large-scale automation (30,000-person organization)

## Role Router Matrix

🧭 **Progress Scale**: 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

**Status Legend**:
- 🟢 Complete
- 🟡 In Progress
- 🔴 Blocked
- ⚪️ Not Started

---

## Roles × Duties Matrix

| Role | 1️⃣ | 2️⃣ | 3️⃣ | 4️⃣ | 5️⃣ | 6️⃣ | 7️⃣ | Description |
|------|---|---|---|---|---|---|---|-------------|
| 👩‍⚖️ Principal | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | ⚪️ | ⚪️ | Executive approval authority |
| 🧑‍💻 IAR | 🟢 | 🟢 | 🟢 | ⚪️ | ⚪️ | ⚪️ | ⚪️ | Information Access Review |
| 🧑‍💼 Rep (S7) | 🟢 | 🟢 | 🟢 | ⚪️ | ⚪️ | ⚪️ | ⚪️ | Registered Representative (Series 7) |
| 🔐 Security | 🟢 | 🟢 | 🟢 | 🟢 | ⚪️ | ⚪️ | ⚪️ | Security & compliance oversight |
| 🧾 Compliance | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | ⚪️ | ⚪️ | Regulatory compliance |
| 🎓 Training | 🟢 | 🟢 | 🟢 | ⚪️ | ⚪️ | ⚪️ | ⚪️ | Training & certification |
| 🗂 Records | 🟢 | 🟢 | 🟢 | 🟢 | ⚪️ | ⚪️ | ⚪️ | Records management |

---

## Duty Definitions

### 1️⃣ Intake & Classification
- Initial request processing
- Role assignment
- Priority tagging

### 2️⃣ Initial Review
- Requirements validation
- Stakeholder identification
- Risk assessment

### 3️⃣ Document Preparation
- Policy documentation
- Procedure creation
- Template preparation

### 4️⃣ Approval Workflow
- Multi-level approvals
- Signature collection
- Authority verification

### 5️⃣ Implementation
- System configuration
- Access provisioning
- Change deployment

### 6️⃣ Verification & Testing
- Functionality validation
- Compliance verification
- User acceptance testing

### 7️⃣ Documentation & Archive
- Final documentation
- Archive preparation
- Audit trail completion

---

## Usage Instructions

1. **Identify the role** requiring task routing
2. **Map duties** to the 7-step process
3. **Track progress** using emoji status indicators
4. **Update status** as tasks complete
5. **Escalate blockers** (🔴) immediately

---

## Automation Hooks

```yaml
role_router:
  enabled: true
  roles:
    - id: principal
      emoji: "👩‍⚖️"
      duties: [1, 2, 3, 4, 5]
    - id: iar
      emoji: "🧑‍💻"
      duties: [1, 2, 3]
    - id: rep_s7
      emoji: "🧑‍💼"
      duties: [1, 2, 3]
    - id: security
      emoji: "🔐"
      duties: [1, 2, 3, 4]
    - id: compliance
      emoji: "🧾"
      duties: [1, 2, 3, 4, 5]
    - id: training
      emoji: "🎓"
      duties: [1, 2, 3]
    - id: records
      emoji: "🗂"
      duties: [1, 2, 3, 4]
```

---

**Version**: v45  
**Scale**: 30,000-person automation  
**Pattern**: role → approve → log → train → audit
