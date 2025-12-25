# 🧩 EXAMPLES PACK v43 (BD + IAR "regulatory standard" MASTER BOARD)

> From the book intros / early chapters

This pack provides visual templates and org charts for understanding the regulatory structure of broker-dealers (BD) and investment advisers (IA/RIA) in the context of BlackRoad OS's Amundson Finance structure.

---

## v43-A — BlackRoad OS ↔ Amundson Finance org chart (fill-in)

```
🖤🛣️ BlackRoad OS, Inc. (HOLDCO)
├─ 💼 Amundson Finance (FINCO)
│  ├─ 🏦 BD (Broker-Dealer)  → registers SEC + FINRA + states
│  │  ├─ 👩‍⚖️ Principals (Series 24) → supervise + approve public comms
│  │  └─ 🧑‍💼 Reps (Series 7) → solicit/buy/sell (after FINRA registration)
│  └─ 🧠 IA / RIA (Investment Adviser) → no FINRA / no SRO; uses Form ADV
│     └─ 🧑‍💻 IARs (natural persons) → defined activities + may supervise
└─ 🧾 Ops / Records / Control Plane
```

### Key Points
- **BD (Broker-Dealer)**: Registers with SEC + FINRA + states
- **Principals (Series 24)**: Supervise BD activities and approve public communications
- **Reps (Series 7)**: Solicit/buy/sell after FINRA registration
- **IA/RIA (Investment Adviser)**: No FINRA oversight, no SRO; uses Form ADV
- **IARs (Investment Adviser Representatives)**: Natural persons with defined activities, may supervise

---

## v43-B — "who regulates what" rails (7 bars)

**Key Insight**: SEC = primary regulator; SROs operate under SEC authority

**FINRA**: Under SEC oversight; not a government agency; runs exams + CRD + investigations

```
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
🏛️ SEC          🟢🟢🟢🟢🟢🟢🟢
🛡️ FINRA (BD)    🟢🟢🟢🟢🟢⚪️⚪️
🗺️ States        🟢🟢🟢🟢⚪️⚪️⚪️
🧠 IA/RIA        🟢🟢🟢🟢⚪️⚪️⚪️  (no FINRA / no SRO)
```

### Regulatory Scope Legend
- 🟢 = Active regulatory authority
- ⚪️ = No authority/not applicable
- **SEC**: Full regulatory authority across all 7 areas
- **FINRA (BD)**: Authority over 5 areas (broker-dealer specific)
- **States**: Authority over 4 areas
- **IA/RIA**: Authority over 4 areas, but no FINRA/SRO oversight

---

## v43-C — License gates (emoji gantt)

### 🧑‍💼 Series 7 → Rep can solicit/buy/sell after FINRA registration
```
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
🟢🟢🟢🟢🟢🟢⚪️
```

### 👩‍⚖️ Series 24 → Supervise most BD activities + approve public comms
```
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
🟢🟢🟢🟢🟢⚪️⚪️
```

### 🧑‍💻 IAR = Does any of: advice, manage accounts, solicit advisory, supervise IAR work
```
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
🟢🟢🟢🟢⚪️⚪️⚪️
```

### 🧑‍💻 IAR registration = State basis; IAR is individual only
```
🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
🟢🟢🟢🟢🟢⚪️⚪️
```

### License Gate Summary
- **Series 7**: 6/7 gates (representative license)
- **Series 24**: 5/7 gates (principal license)
- **IAR Activities**: 4/7 gates (advisory scope)
- **IAR Registration**: 5/7 gates (state-level)

---

## v43-D — BD "7 workflows" board (each has 7 steps)

### 🏦 BD WORKFLOWS (template)

**Legend**: 🟢 done | 🟡 waiting | 🔴 blocked | ⚪️ empty

**Steps**: 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

### 1) 🧾 Register BD (SEC/FINRA/states)
```
🧾🟢🟢🟡⚪️⚪️⚪️⚪️
```

### 2) 👤 Onboard Rep → exam + register (FINRA qualification process)
```
👤🟢🟢🟢🟡⚪️⚪️⚪️
```

### 3) 👩‍⚖️ Supervision (principals supervise BD activities)
```
👩‍⚖️🟢🟡⚪️⚪️⚪️⚪️⚪️
```

### 4) 📣 Public Comms approval (principal approves comms)
```
📣🟢🟢🟡⚪️⚪️⚪️⚪️
```

### 5) 🔎 Exams/Investigations readiness (FINRA examines/investigates)
```
🔎🟡🟡⚪️⚪️⚪️⚪️⚪️
```

### 6) 🗂️ CRD hygiene (FINRA operates CRD)
```
🗂️🟢🟢🟢⚪️⚪️⚪️⚪️
```

### 7) 🧭 Culture of compliance (build + review + improve)
```
🧭🟢🟡⚪️⚪️⚪️⚪️⚪️
```

### BD Workflow Progress Summary
| Workflow | Progress | Status |
|----------|----------|--------|
| Register BD | 2/7 | In progress |
| Onboard Rep | 3/7 | In progress |
| Supervision | 1/7 | Early stage |
| Public Comms | 2/7 | In progress |
| Exams/Investigations | 0/7 | Planning |
| CRD Hygiene | 3/7 | In progress |
| Compliance Culture | 1/7 | Early stage |

---

## v43-E — IA/RIA "7 workflows" board (each has 7 steps)

### 🧠 IA/RIA WORKFLOWS (template)

**Note**: IA uses Form ADV; no FINRA / no SRO

**Legend**: 🟢 done | 🟡 waiting | 🔴 blocked | ⚪️ empty

**Steps**: 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

### 1) 🧾 ADV register/update
```
🧾🟢🟡⚪️⚪️⚪️⚪️⚪️
```

### 2) 🧑‍💻 IAR role check (if they do the listed activities, they're IAR)
```
🧑‍💻🟢🟢🟡⚪️⚪️⚪️⚪️
```

### 3) 🗺️ IAR state registration (IARs don't register with SEC)
```
🗺️🟢🟡⚪️⚪️⚪️⚪️⚪️
```

### 4) 👀 Supervision (IA supervises IARs incl contractors)
```
👀🟢🟢🟡⚪️⚪️⚪️⚪️
```

### 5) 💚 Fiduciary duty (client-first)
```
💚🟢🟢🟡⚪️⚪️⚪️⚪️
```

### 6) 🔐 Custody checks (surprise exam concept if custody)
```
🔐🟡🟡⚪️⚪️⚪️⚪️⚪️
```

### 7) 📣 Disclosures (disciplinary + conflicts + execution disclosure)
```
📣🟢🟡⚪️⚪️⚪️⚪️⚪️
```

### IA/RIA Workflow Progress Summary
| Workflow | Progress | Status |
|----------|----------|--------|
| ADV Register/Update | 1/7 | Early stage |
| IAR Role Check | 2/7 | In progress |
| IAR State Registration | 1/7 | Early stage |
| Supervision | 2/7 | In progress |
| Fiduciary Duty | 2/7 | In progress |
| Custody Checks | 0/7 | Planning |
| Disclosures | 1/7 | Early stage |

---

## Key Differences: BD vs IA/RIA

| Aspect | BD (Broker-Dealer) | IA/RIA (Investment Adviser) |
|--------|-------------------|----------------------------|
| **Primary Regulator** | SEC + FINRA + States | SEC + States (no FINRA) |
| **SRO Oversight** | Yes (FINRA) | No |
| **Registration Form** | BD registration | Form ADV |
| **Representatives** | Series 7 (Reps), Series 24 (Principals) | IARs (state-registered) |
| **Key Activities** | Buy/sell securities, solicit trades | Provide investment advice, manage accounts |
| **Supervision Model** | Principal oversight required | IA supervises IARs including contractors |
| **Public Communications** | Must be approved by principal | Disclosure-based approach |
| **Standard** | Suitability | Fiduciary duty (client-first) |

---

## Next Steps

Ready for **v44**: An emoji-only "Books & Records + Advertising/Comms" mega-board (BD + IA side-by-side) with 7×7 checkrails.

---

## References

This examples pack is derived from:
- Series 7 LEM (Licensed Education Materials)
- Series 24 LEM (General Securities Principal)
- Series 66 LEM (Uniform Combined State Law)

**Document Version**: v43
**Last Updated**: 2025-12-25
**Status**: ✅ Complete
