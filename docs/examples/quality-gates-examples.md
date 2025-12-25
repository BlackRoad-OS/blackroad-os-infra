# 🧩 Quality Gates — Real-World Examples

> Practical examples of the quality gates framework in action

---

## Example 1: New Feature Development (API Endpoint)

**Feature:** Add user profile search endpoint

```
🧾 PROJECT: User Profile Search API   🚦 STATUS: 🟡   🗓️ WINDOW: Sprint 23 (Week 3)

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

G1 📚 Spec ready        🟢🟢🟢🟢🟢⚪️⚪️
G2 💻 Build green       🟢🟢🟢🟢🟡⚪️⚪️
G3 🧪 Tests pass        🟢🟢🟢🟡⚪️⚪️⚪️
G4 🔍 Review complete   🟡🟡⚪️⚪️⚪️⚪️⚪️
G5 🔐 Security ok       🟢🟢🟢⚪️⚪️⚪️⚪️
G6 🚀 Deploy ready      ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G7 ✅ Done              ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

✅ CHECKLIST
G1 ☑️☑️☑️☑️☑️☐☐  — Requirements complete, edge cases pending
G2 ☑️☑️☑️☑️☐☐☐  — Compiles, linting clean, bundle size check pending
G3 ☑️☑️☑️☐☐☐☐  — Unit tests pass, integration tests in progress
G4 ☑️☑️☐☐☐☐☐  — PR created, awaiting 2nd review
G5 ☑️☑️☑️☐☐☐☐  — Dependency & SAST scans clean
G6 ☐☐☐☐☐☐☐    — Not started yet
G7 ☐☐☐☐☐☐☐    — Not started yet
```

**Current Blockers:**
- 🟡 G2 Check 5: Bundle size increased by 12KB, investigating
- 🟡 G3 Check 4: Integration test flaky on CI
- 🟡 G4: Waiting on architect review

**Next Actions:**
1. Optimize bundle (tree-shaking investigation)
2. Fix CI integration test timing issue
3. Address review feedback from first reviewer

---

## Example 2: Critical Bug Fix (Production Issue)

**Issue:** Payment webhook timeout causing failed transactions

```
🧾 PROJECT: Fix Payment Webhook Timeout   🚦 STATUS: 🔴   🗓️ WINDOW: URGENT (Today)

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

G1 📚 Spec ready        🟢🟢🟢🟢⚪️⚪️⚪️
G2 💻 Build green       🟢🟢🟢🟢🟢⚪️⚪️
G3 🧪 Tests pass        🟢🟢🔴⚪️⚪️⚪️⚪️
G4 🔍 Review complete   🟢🟢🟢⚪️⚪️⚪️⚪️
G5 🔐 Security ok       🟢🟢🟢⚪️⚪️⚪️⚪️
G6 🚀 Deploy ready      🟡🟡⚪️⚪️⚪️⚪️⚪️
G7 ✅ Done              ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

✅ CHECKLIST
G1 ☑️☑️☑️☑️☐☐☐  — Root cause identified, fix planned
G2 ☑️☑️☑️☑️☑️☐☐  — Build passing, tests compiling
G3 ☑️☑️☐☐☐☐☐  — ⚠️ BLOCKER: Integration test failing
G4 ☑️☑️☑️☐☐☐☐  — Fast-tracked review (2 approvals)
G5 ☑️☑️☑️☐☐☐☐  — Security scan clean (hotfix exception)
G6 ☑️☑️☐☐☐☐☐  — Staging tested, rollback ready
G7 ☐☐☐☐☐☐☐    — Deploy scheduled in 2 hours
```

**Critical Path:**
- 🔴 BLOCKING: Integration test failing due to webhook mock timeout
- Fast-tracked review completed
- Staging deployment successful
- Rollback plan documented
- On-call team alerted

---

## Example 3: Infrastructure Change (Database Migration)

**Change:** Migrate from PostgreSQL 13 to 15

```
🧾 PROJECT: PostgreSQL 13 → 15 Migration   🚦 STATUS: 🟡   🗓️ WINDOW: Maintenance Window (Sat 2AM)

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟

G1 📚 Spec ready        🟢🟢🟢🟢🟢🟢🟢⚪️⚪️⚪️
G2 💻 Build green       🟢🟢🟢🟢🟢🟢⚪️⚪️⚪️⚪️
G3 🧪 Tests pass        🟢🟢🟢🟢🟢🟢🟢🟢⚪️⚪️
G4 🔍 Review complete   🟢🟢🟢🟢🟢⚪️⚪️⚪️⚪️⚪️
G5 🔐 Security ok       🟢🟢🟢🟢🟢⚪️⚪️⚪️⚪️⚪️
G6 🚀 Deploy ready      🟡🟡🟡🟡🟡🟡🟡⚪️⚪️⚪️
G7 ✅ Done              ⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️

✅ CHECKLIST (Extended: 10 checks for infrastructure)
G1 ☑️☑️☑️☑️☑️☑️☑️☐☐☐  — Migration plan complete, DR plan documented
G2 ☑️☑️☑️☑️☑️☑️☐☐☐☐  — Compatibility tested, schema validated
G3 ☑️☑️☑️☑️☑️☑️☑️☑️☐☐  — All tests pass on PG15, perf tests green
G4 ☑️☑️☑️☑️☑️☐☐☐☐☐  — Infra review approved, stakeholders notified
G5 ☑️☑️☑️☑️☑️☐☐☐☐☐  — Security scan clean, compliance verified
G6 ☑️☑️☑️☑️☑️☑️☑️☐☐☐  — Staging migrated successfully, monitoring ready
G7 ☐☐☐☐☐☐☐☐☐☐       — Production migration scheduled
```

**Pre-Migration Checklist:**
- ✅ Backup verified (full + transaction log)
- ✅ Rollback tested in staging
- ✅ Downtime window approved (2 hours max)
- ✅ On-call rotation assigned
- ✅ Status page update drafted
- 🟡 Customer communication scheduled
- 🟡 Monitoring dashboards updated

---

## Example 4: Documentation Update

**Task:** Update API documentation for v2.0

```
🧾 PROJECT: API Docs v2.0 Update   🚦 STATUS: 🟢   🗓️ WINDOW: Week 12

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣

G1 📚 Spec ready        🟢🟢🟢🟢🟢
G2 💻 Build green       🟢🟢🟢🟢🟢
G3 🧪 Tests pass        🟢🟢🟢⚪️⚪️
G4 🔍 Review complete   🟢🟢🟢🟢⚪️
G5 🔐 Security ok       🟢🟢⚪️⚪️⚪️
G6 🚀 Deploy ready      🟢🟢🟢🟢⚪️
G7 ✅ Done              🟢🟢🟢🟢🟢   🎉

✅ CHECKLIST (Simplified: 5 checks for docs)
G1 ☑️☑️☑️☑️☑️  — Content outline approved
G2 ☑️☑️☑️☑️☑️  — Markdown compiles, links valid
G3 ☑️☑️☑️☐☐  — Code examples tested (automated)
G4 ☑️☑️☑️☑️☐  — Technical review complete
G5 ☑️☑️☐☐☐  — No sensitive data exposed
G6 ☑️☑️☑️☑️☐  — Preview site deployed
G7 ☑️☑️☑️☑️☑️  — Published and announced
```

**Result:** Successfully published! 🎉

---

## Example 5: Open Source Library Update

**Task:** Update React 17 → 18 in web application

```
🧾 PROJECT: React 17 → 18 Upgrade   🚦 STATUS: 🟡   🗓️ WINDOW: Sprint 24-25 (2 weeks)

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

G1 📚 Spec ready        🟢🟢🟢🟢🟢🟢⚪️
G2 💻 Build green       🟢🟢🟢🔴⚪️⚪️⚪️
G3 🧪 Tests pass        🟢🟡⚪️⚪️⚪️⚪️⚪️
G4 🔍 Review complete   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G5 🔐 Security ok       🟢🟢🟢⚪️⚪️⚪️⚪️
G6 🚀 Deploy ready      ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G7 ✅ Done              ⚪️⚪️⚪️⚪️⚪️⚪️⚪️

✅ CHECKLIST
G1 ☑️☑️☑️☑️☑️☑️☐  — Migration guide reviewed, breaking changes identified
G2 ☑️☑️☑️☐☐☐☐  — ⚠️ Type errors in 3 components
G3 ☑️☑️☐☐☐☐☐  — Unit tests pass, E2E tests need update
G4 ☐☐☐☐☐☐☐    — Not started
G5 ☑️☑️☑️☐☐☐☐  — Vulnerability scan clean
G6 ☐☐☐☐☐☐☐    — Not started
G7 ☐☐☐☐☐☐☐    — Not started
```

**Current Issues:**
- 🔴 G2 Check 4: TypeScript errors in `UserProfile.tsx`, `Dashboard.tsx`, `Settings.tsx`
- 🟡 G3 Check 2: E2E tests using deprecated APIs

**Dependencies:**
- Update React Testing Library to v14
- Update Storybook to React 18 compatible version
- Update jest configuration for concurrent features

---

## Example 6: Mobile App Release (Multi-Platform)

**Release:** iOS & Android v3.1.0

```
🧾 PROJECT: Mobile App v3.1.0 Release   🚦 STATUS: 🟢   🗓️ WINDOW: Q1 2025

🧭 iOS 📱  Android 🤖

G1 📚 Spec ready        🟢🟢🟢🟢🟢🟢🟢  |  🟢🟢🟢🟢🟢🟢🟢
G2 💻 Build green       🟢🟢🟢🟢🟢🟢🟢  |  🟢🟢🟢🟢🟢🟢🟢
G3 🧪 Tests pass        🟢🟢🟢🟢🟢🟢⚪️  |  🟢🟢🟢🟢🟢🟢🟢
G4 🔍 Review complete   🟢🟢🟢🟢🟢⚪️⚪️  |  🟢🟢🟢🟢🟢⚪️⚪️
G5 🔐 Security ok       🟢🟢🟢🟢🟢⚪️⚪️  |  🟢🟢🟢🟢🟢⚪️⚪️
G6 🚀 Deploy ready      🟢🟢🟢🟢🟢🟡⚪️  |  🟢🟢🟢🟢🟢🟢⚪️
G7 ✅ Done              🟡🟡🟡⚪️⚪️⚪️⚪️  |  🟢🟢🟢🟢⚪️⚪️⚪️

✅ PLATFORM STATUS
iOS:  ☑️☑️☑️☑️☑️☑️☐  — In App Store review (pending approval)
Android: ☑️☑️☑️☑️☑️☑️☑️  — Released to production (100% rollout)
```

**Platform-Specific Notes:**
- **iOS:** App Store review in progress (day 2 of 3)
- **Android:** Staged rollout complete, metrics normal
- Both platforms pass all critical QA gates

---

## Example 7: Design System Component

**Component:** New Button component with accessibility

```
🧾 PROJECT: Button Component v2   🚦 STATUS: 🟢   🗓️ WINDOW: Sprint 22 (Complete)

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

G1 📚 Spec ready        🟢🟢🟢🟢🟢🟢🟢
G2 💻 Build green       🟢🟢🟢🟢🟢🟢🟢
G3 🧪 Tests pass        🟢🟢🟢🟢🟢🟢🟢
G4 🔍 Review complete   🟢🟢🟢🟢🟢🟢⚪️
G5 🔐 Security ok       🟢🟢🟢🟢⚪️⚪️⚪️
G6 🚀 Deploy ready      🟢🟢🟢🟢🟢🟢⚪️
G7 ✅ Done              🟢🟢🟢🟢🟢🟢🟢   ✨

✅ CHECKLIST (Design-focused)
G1 ☑️☑️☑️☑️☑️☑️☑️  — Figma specs, variants documented
G2 ☑️☑️☑️☑️☑️☑️☑️  — TypeScript, Storybook stories
G3 ☑️☑️☑️☑️☑️☑️☑️  — Unit tests, visual regression, a11y tests
G4 ☑️☑️☑️☑️☑️☑️☐  — Design + dev review approved
G5 ☑️☑️☑️☑️☐☐☐  — No XSS vectors, CSP compliant
G6 ☑️☑️☑️☑️☑️☑️☐  — Published to npm, Storybook updated
G7 ☑️☑️☑️☑️☑️☑️☑️  — Docs published, migration guide ready
```

**Accessibility Highlights:**
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader tested (NVDA, VoiceOver)
- ✅ Focus indicators
- ✅ Color contrast ratio > 4.5:1

---

## Usage Tips by Scenario

### For Feature Development
- Focus on G1-G4 in early stages
- G5 should run continuously in CI
- G6-G7 come near the end

### For Bug Fixes
- G1 often quick (root cause analysis)
- G3 critical (must verify fix works)
- G4 can be fast-tracked for critical issues
- Consider G6 rollback planning

### For Infrastructure Changes
- G1 needs extensive planning
- G3 requires thorough testing (can't fix in prod)
- G6 needs extra checks (monitoring, rollback)
- G7 includes post-deployment validation

### For Documentation
- G1-G2-G4 are most relevant
- G3 can be automated (link checking, code examples)
- G5 ensure no sensitive data leaked
- G6-G7 about publishing and announcing

---

**Version:** 1.0  
**Last Updated:** 2025-12-25  
**Related:** [Quality Gates v9](./quality-gates-v9.md) | [Quick Templates](./quality-gates-template.md)
