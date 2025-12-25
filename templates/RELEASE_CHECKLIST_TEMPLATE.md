# 🧩 PROJECT PLANNING TEMPLATE v12 (release checklist)

**7 sections × 7 checks**

Legend: ☑️ done  ☐ not yet   🚦 🟢🟡🔴

---

## 🚀 RELEASE: ____________________________   📦 VERSION: ________   🚦 STATUS: 🟡   🗓️ DATE: ________

---

## 1️⃣ 📚 Docs
☑️☐☐☐☐☐☐   (spec)
☑️☑️☐☐☐☐☐   (readme)
☑️☑️☑️☐☐☐☐   (changelog)
☐☐☐☐☐☐☐   (runbook)
☐☐☐☐☐☐☐   (faq)
☐☐☐☐☐☐☐   (release notes)
🚦 🟡

## 2️⃣ 💻 Build
☑️☑️☑️☐☐☐☐   (compile)
☑️☑️☐☐☐☐☐   (lint)
☑️☑️☑️☑️☐☐☐   (unit)
☑️☐☐☐☐☐☐   (integration)
☐☐☐☐☐☐☐   (bundle)
☐☐☐☐☐☐☐   (artifacts)
🚦 🟡

## 3️⃣ 🧪 Test
☑️☑️☑️☐☐☐☐   (smoke)
☑️☑️☐☐☐☐☐   (regression)
☑️☐☐☐☐☐☐   (perf)
☐☐☐☐☐☐☐   (load)
☐☐☐☐☐☐☐   (edge cases)
☐☐☐☐☐☐☐   (devices)
🚦 🟡

## 4️⃣ 🔐 Security
☑️☑️☐☐☐☐☐   (secrets)
☑️☑️☑️☐☐☐☐   (deps)
☑️☐☐☐☐☐☐   (permissions)
☐☐☐☐☐☐☐   (policy)
☐☐☐☐☐☐☐   (scans)
☐☐☐☐☐☐☐   (review)
🚦 🟡

## 5️⃣ 📣 Comms
☑️☑️☑️☐☐☐☐   (announce draft)
☑️☑️☐☐☐☐☐   (stakeholders)
☑️☐☐☐☐☐☐   (support brief)
☐☐☐☐☐☐☐   (status page)
☐☐☐☐☐☐☐   (social)
☐☐☐☐☐☐☐   (internal)
🚦 🟡

## 6️⃣ 🚀 Deploy
☑️☑️☐☐☐☐☐   (staging)
☑️☐☐☐☐☐☐   (canary)
☐☐☐☐☐☐☐   (prod)
☐☐☐☐☐☐☐   (rollback ready)
☐☐☐☐☐☐☐   (monitoring)
☐☐☐☐☐☐☐   (verify)
🚦 🔴/🟡/🟢

## 7️⃣ ✅ Close
☐☐☐☐☐☐☐   (post checks)
☐☐☐☐☐☐☐   (incident review)
☐☐☐☐☐☐☐   (metrics)
☐☐☐☐☐☐☐   (docs update)
☐☐☐☐☐☐☐   (thank yous)
☐☐☐☐☐☐☐   (done)
🚦 ⚪️

---

## Usage Instructions

This template provides a structured approach to release planning and tracking. Each section contains 7 checkboxes to track progress:

- **☑️** = Task completed
- **☐** = Task not yet completed
- **🚦** = Overall section status (🔴 Red / 🟡 Yellow / 🟢 Green / ⚪️ White for not started)

### How to Use This Template

1. **Copy this template** for each new release
2. **Fill in the header** with:
   - Release name/identifier
   - Version number
   - Target date
   - Overall status
3. **Track progress** by replacing ☐ with ☑️ as tasks complete
4. **Update section status** (🚦) to reflect overall completion:
   - ⚪️ Not started (0% complete)
   - 🔴 Just started (1-30% complete)
   - 🟡 In progress (31-80% complete)
   - 🟢 Complete (81-100% complete)
5. **Review regularly** during release planning and execution

### Section Details

#### 1️⃣ Documentation
- spec: Technical specification
- readme: README updates
- changelog: CHANGELOG entries
- runbook: Operational procedures
- faq: FAQ updates
- release notes: User-facing release notes

#### 2️⃣ Build
- compile: Code compilation
- lint: Code quality checks
- unit: Unit tests
- integration: Integration tests
- bundle: Asset bundling
- artifacts: Build artifacts

#### 3️⃣ Test
- smoke: Basic functionality tests
- regression: Regression test suite
- perf: Performance testing
- load: Load/stress testing
- edge cases: Edge case scenarios
- devices: Cross-device/browser testing

#### 4️⃣ Security
- secrets: Secrets management
- deps: Dependency security audit
- permissions: Access control review
- policy: Security policy compliance
- scans: Security scanning
- review: Security code review

#### 5️⃣ Communications
- announce draft: Announcement draft prepared
- stakeholders: Stakeholder notifications
- support brief: Support team briefing
- status page: Status page updates
- social: Social media posts
- internal: Internal communications

#### 6️⃣ Deploy
- staging: Staging deployment
- canary: Canary deployment
- prod: Production deployment
- rollback ready: Rollback plan verified
- monitoring: Monitoring in place
- verify: Post-deploy verification

#### 7️⃣ Close
- post checks: Post-release verification
- incident review: Incident retrospective (if any)
- metrics: Release metrics collected
- docs update: Documentation finalized
- thank yous: Team acknowledgments
- done: Release officially closed

---

**Template Version**: 12.0
**Last Updated**: 2025-12-25
