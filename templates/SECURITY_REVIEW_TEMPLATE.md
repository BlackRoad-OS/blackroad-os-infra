# 🧩 EXAMPLES PACK v18 (security review) — 7 controls × 7 checks

**Legend:** 🟢 pass  🟡 watch  🔴 fail  ⚪️ empty

---

## 🔐 SECURITY REVIEW: ____________________   📅 DATE: ____________   🚦 STATUS: 🟡

### 🧭 Control Navigation: 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

---

## Control Overview

### 1️⃣ 🔑 Secrets handling     🟢🟢🟢🟢⚪️⚪️⚪️

**Checks:**
1. ✅ No hardcoded secrets in code
2. ✅ Environment variables used for sensitive data
3. ✅ Secret scanning tools configured
4. ✅ Secrets rotation procedures documented
5. ⚪️ Secrets encrypted at rest
6. ⚪️ Secrets access logging enabled
7. ⚪️ Emergency secret revocation tested

**Notes:**
- 

---

### 2️⃣ 🔒 Access / perms       🟡🟡🟡⚪️⚪️⚪️⚪️

**Checks:**
1. 🟡 Principle of least privilege applied
2. 🟡 Role-based access control (RBAC) configured
3. 🟡 Authentication mechanisms reviewed
4. ⚪️ Authorization checks implemented
5. ⚪️ Service account permissions minimal
6. ⚪️ API key rotation schedules defined
7. ⚪️ Access audit logs enabled

**Notes:**
- 

---

### 3️⃣ 🧾 Logging / audit      🟢🟢🟢⚪️⚪️⚪️⚪️

**Checks:**
1. ✅ Security events logged
2. ✅ Audit trail for critical operations
3. ✅ Log retention policy defined
4. ⚪️ Log tampering protection enabled
5. ⚪️ Centralized logging configured
6. ⚪️ Real-time alerting on security events
7. ⚪️ Compliance logging requirements met

**Notes:**
- 

---

### 4️⃣ 🧪 Scans / deps         🟢🟢🟢🟢⚪️⚪️⚪️

**Checks:**
1. ✅ Dependency vulnerability scanning enabled
2. ✅ SAST (static analysis) configured
3. ✅ DAST (dynamic analysis) planned
4. ✅ Container image scanning active
5. ⚪️ License compliance checks automated
6. ⚪️ Supply chain security verified
7. ⚪️ Third-party code review completed

**Notes:**
- 

---

### 5️⃣ 🧱 Threat model         🟡🟡⚪️⚪️⚪️⚪️⚪️

**Checks:**
1. 🟡 Threat model documented
2. 🟡 Attack surface identified
3. ⚪️ Security controls mapped to threats
4. ⚪️ Business impact analysis completed
5. ⚪️ Incident response plan defined
6. ⚪️ Security test scenarios created
7. ⚪️ Threat model review scheduled

**Notes:**
- 

---

### 6️⃣ 🚪 Data handling        🟢🟢⚪️⚪️⚪️⚪️⚪️

**Checks:**
1. ✅ Data classification defined
2. ✅ PII handling procedures documented
3. ⚪️ Data encryption in transit (TLS)
4. ⚪️ Data encryption at rest
5. ⚪️ Data retention policies enforced
6. ⚪️ Data deletion procedures tested
7. ⚪️ Privacy compliance verified (GDPR, etc.)

**Notes:**
- 

---

### 7️⃣ ✅ Approval             ⭕⭕⚪️⚪️⚪️⚪️⚪️

**Checks:**
1. ⭕ Security team review pending
2. ⭕ Architecture review pending
3. ⚪️ Compliance review pending
4. ⚪️ Legal review pending
5. ⚪️ DevOps approval pending
6. ⚪️ Product owner sign-off pending
7. ⚪️ Final deployment approval pending

**Notes:**
- 

---

## 🧱 FINDINGS (7)

### F1 ____________________  🔴🔴⚪️⚪️⚪️⚪️⚪️   😭

**Severity:** Critical  
**Category:**  
**Description:**  
**Impact:**  
**Remediation:**  
**Status:** Open  
**Owner:**  
**Due Date:**  

---

### F2 ____________________  🟡🟡🟡⚪️⚪️⚪️⚪️

**Severity:** High  
**Category:**  
**Description:**  
**Impact:**  
**Remediation:**  
**Status:** Open  
**Owner:**  
**Due Date:**  

---

### F3 ____________________  🟡🟡⚪️⚪️⚪️⚪️⚪️

**Severity:** Medium  
**Category:**  
**Description:**  
**Impact:**  
**Remediation:**  
**Status:** Open  
**Owner:**  
**Due Date:**  

---

### F4 ____________________  🟢🟢⚪️⚪️⚪️⚪️⚪️

**Severity:** Low  
**Category:**  
**Description:**  
**Impact:**  
**Remediation:**  
**Status:** Resolved  
**Owner:**  
**Due Date:**  

---

### F5 ____________________  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

**Severity:**  
**Category:**  
**Description:**  
**Impact:**  
**Remediation:**  
**Status:**  
**Owner:**  
**Due Date:**  

---

### F6 ____________________  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

**Severity:**  
**Category:**  
**Description:**  
**Impact:**  
**Remediation:**  
**Status:**  
**Owner:**  
**Due Date:**  

---

### F7 ____________________  ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

**Severity:**  
**Category:**  
**Description:**  
**Impact:**  
**Remediation:**  
**Status:**  
**Owner:**  
**Due Date:**  

---

## 📊 Summary

**Total Checks:** 49 (7 controls × 7 checks)  
**Completed:** __ / 49  
**Pass (🟢):** __  
**Watch (🟡):** __  
**Fail (🔴):** __  
**Empty (⚪️):** __  

**Total Findings:** 7  
**Critical:** __  
**High:** __  
**Medium:** __  
**Low:** __  
**Resolved:** __  

---

## Usage Instructions

### How to Complete This Security Review

1. **Fill in Header Information:**
   - Add review name/identifier in the SECURITY REVIEW field
   - Enter the review date
   - Update STATUS emoji (🟢/🟡/🔴) based on overall assessment

2. **Complete Each Control:**
   - Review each of the 7 checks per control
   - Update emoji status for each check:
     - 🟢 = Check passed/implemented
     - 🟡 = Needs attention/in progress
     - 🔴 = Critical issue/not implemented
     - ⚪️ = Not applicable/not started
   - Add notes specific to this review

3. **Document Findings:**
   - Use F1-F7 sections to document security findings
   - Fill in all fields (severity, category, description, etc.)
   - Prioritize by severity (Critical → High → Medium → Low)
   - Track remediation status

4. **Update Summary:**
   - Calculate totals for checks and findings
   - Review completion percentage
   - Ensure all critical findings have owners and due dates

5. **Obtain Approvals:**
   - Complete Control 7 (Approval) checks
   - Get sign-offs from relevant teams
   - Document any conditional approvals

### Status Indicators

- **🟢 Pass:** Requirement fully met, no issues
- **🟡 Watch:** Partially implemented or needs monitoring
- **🔴 Fail:** Not implemented or critical issue found
- **⚪️ Empty:** Not started or not applicable
- **⭕ Pending:** Awaiting review or approval

### Severity Levels

- **Critical (🔴🔴):** Immediate risk, blocks deployment
- **High (🟡🟡🟡):** Significant risk, urgent attention needed
- **Medium (🟡🟡):** Moderate risk, should be addressed
- **Low (🟢🟢):** Minor issue, can be addressed post-deployment

---

## Checklist for Review Completion

- [ ] All 49 checks reviewed and status updated
- [ ] All findings documented with complete information
- [ ] Critical findings have immediate remediation plans
- [ ] High/Medium findings have assigned owners and due dates
- [ ] Summary section calculations completed
- [ ] All approval checks signed off
- [ ] Review document archived in appropriate location
- [ ] Stakeholders notified of review completion

---

**Review Version:** v18  
**Template Version:** 1.0  
**Last Updated:** 2025-12-25  
**Maintained By:** BlackRoad OS Security Team
