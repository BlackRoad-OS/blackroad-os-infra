# 🧩 EXAMPLES PACK v9 — Quality Gates Framework

> **7 gates × 7 checks** — A comprehensive quality tracking system for projects

Legend: 🟢 pass  🟡 watch  🔴 fail  ⚪️ empty

---

## 📋 Template (Copy & Use)

```
🧾 PROJECT: ____________________________   🚦 STATUS: 🟡   🗓️ WINDOW: ____________

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

G1 📚 Spec ready        🟢🟢🟢🟢⚪️⚪️⚪️
G2 💻 Build green       🟢🟢🟢🟢🟢⚪️⚪️
G3 🧪 Tests pass        🟢🟢🟢⚪️⚪️⚪️⚪️
G4 🔍 Review complete   🟡🟡🟡⚪️⚪️⚪️⚪️
G5 🔐 Security ok       🟢🟢🟢⚪️⚪️⚪️⚪️
G6 🚀 Deploy ready      🟡🟡⚪️⚪️⚪️⚪️⚪️
G7 ✅ Done              ⚪️⚪️⚪️⚪️⚪️⚪️⚪️   🏁🎉

✅ CHECKLIST (copy a line per gate)
G1 ☑️☑️☑️☐☐☐☐
G2 ☑️☑️☑️☑️☑️☐☐
G3 ☑️☑️☑️☐☐☐☐
G4 ☑️☑️☑️☐☐☐☐
G5 ☑️☑️☑️☐☐☐☐
G6 ☑️☑️☐☐☐☐☐
G7 ☐☐☐☐☐☐☐
```

---

## 🎯 Gate Definitions

### G1 📚 Spec Ready
Requirements, design docs, and acceptance criteria are complete.

**7 Checks:**
1. ✅ Requirements documented
2. ✅ Architecture design reviewed
3. ✅ API contracts defined
4. ✅ Acceptance criteria clear
5. ⚪️ Edge cases documented
6. ⚪️ Dependencies identified
7. ⚪️ Success metrics defined

**Pass Criteria:** First 4 checks complete, stakeholder approval

---

### G2 💻 Build Green
Code compiles, lints pass, no syntax errors.

**7 Checks:**
1. ✅ Code compiles successfully
2. ✅ Linter passes (no errors)
3. ✅ Type checking passes
4. ✅ Import resolution works
5. ✅ Build artifacts generated
6. ⚪️ Bundle size acceptable
7. ⚪️ Dependencies resolved

**Pass Criteria:** All build steps succeed without errors

---

### G3 🧪 Tests Pass
Unit tests, integration tests, and coverage meet thresholds.

**7 Checks:**
1. ✅ Unit tests pass (100%)
2. ✅ Integration tests pass
3. ✅ Coverage meets threshold (≥80%)
4. ⚪️ E2E tests pass
5. ⚪️ Performance tests pass
6. ⚪️ Regression tests pass
7. ⚪️ Smoke tests pass

**Pass Criteria:** Core tests (1-3) pass, coverage acceptable

---

### G4 🔍 Review Complete
Code review approved, feedback addressed, documentation updated.

**7 Checks:**
1. 🟡 PR created and described
2. 🟡 Code review requested
3. 🟡 Feedback addressed
4. ⚪️ Documentation updated
5. ⚪️ Changelog updated
6. ⚪️ Migration guide (if needed)
7. ⚪️ Breaking changes noted

**Pass Criteria:** At least 2 approvals, all blocking feedback resolved

---

### G5 🔐 Security OK
Security scans pass, vulnerabilities addressed, compliance verified.

**7 Checks:**
1. ✅ Dependency scan (no critical)
2. ✅ SAST scan passes
3. ✅ Secrets scan clean
4. ⚪️ DAST scan passes
5. ⚪️ Compliance checks pass
6. ⚪️ Security review approved
7. ⚪️ Incident response ready

**Pass Criteria:** No critical/high vulnerabilities, scan clean

---

### G6 🚀 Deploy Ready
Deployment validated in staging, rollback plan ready, monitoring configured.

**7 Checks:**
1. 🟡 Staging deployment successful
2. 🟡 Smoke tests in staging pass
3. ⚪️ Performance acceptable
4. ⚪️ Rollback plan documented
5. ⚪️ Monitoring configured
6. ⚪️ Alerts configured
7. ⚪️ Runbook updated

**Pass Criteria:** Staging stable, rollback ready, team notified

---

### G7 ✅ Done
Production deployment successful, monitored, and validated.

**7 Checks:**
1. ⚪️ Production deployment executed
2. ⚪️ Health checks passing
3. ⚪️ Metrics showing success
4. ⚪️ No errors in logs
5. ⚪️ User acceptance validated
6. ⚪️ Documentation published
7. ⚪️ Retrospective completed

**Pass Criteria:** All checks green, system stable for 24+ hours 🎉

---

## 📊 Status Indicators

| Emoji | Meaning | Description |
|-------|---------|-------------|
| 🟢 | Pass | Check complete and passing |
| 🟡 | Watch | In progress or needs attention |
| 🔴 | Fail | Blocking issue, needs immediate fix |
| ⚪️ | Empty | Not started or not applicable |

---

## 🚦 Overall Project Status

| Status | Emoji | Criteria |
|--------|-------|----------|
| **Green** | 🟢 | All gates passing, ready to proceed |
| **Yellow** | 🟡 | Some watches, progressing normally |
| **Red** | 🔴 | Critical blocks, attention needed |
| **Gray** | ⚪️ | Not started or in planning |

---

## 💡 Usage Examples

### Example 1: Early Stage Project
```
🧾 PROJECT: User Authentication API   🚦 STATUS: 🟡   🗓️ WINDOW: Week 1

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

G1 📚 Spec ready        🟢🟢🟢🟢🟢⚪️⚪️
G2 💻 Build green       🟡🟡⚪️⚪️⚪️⚪️⚪️
G3 🧪 Tests pass        ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G4 🔍 Review complete   ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G5 🔐 Security ok       ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G6 🚀 Deploy ready      ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G7 ✅ Done              ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
```

### Example 2: Mid-Development
```
🧾 PROJECT: Payment Integration   🚦 STATUS: 🟡   🗓️ WINDOW: Week 3

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

G1 📚 Spec ready        🟢🟢🟢🟢🟢🟢🟢
G2 💻 Build green       🟢🟢🟢🟢🟢🟢⚪️
G3 🧪 Tests pass        🟢🟢🟢🟢🟡⚪️⚪️
G4 🔍 Review complete   🟡🟡🟡🟡⚪️⚪️⚪️
G5 🔐 Security ok       🟢🟢🟢🟡⚪️⚪️⚪️
G6 🚀 Deploy ready      🟡⚪️⚪️⚪️⚪️⚪️⚪️
G7 ✅ Done              ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
```

### Example 3: Ready for Production
```
🧾 PROJECT: Dashboard Redesign   🚦 STATUS: 🟢   🗓️ WINDOW: Week 6

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

G1 📚 Spec ready        🟢🟢🟢🟢🟢🟢🟢
G2 💻 Build green       🟢🟢🟢🟢🟢🟢🟢
G3 🧪 Tests pass        🟢🟢🟢🟢🟢🟢⚪️
G4 🔍 Review complete   🟢🟢🟢🟢🟢⚪️⚪️
G5 🔐 Security ok       🟢🟢🟢🟢🟢⚪️⚪️
G6 🚀 Deploy ready      🟢🟢🟢🟢🟢🟢⚪️
G7 ✅ Done              🟡🟡🟡⚪️⚪️⚪️⚪️   🚀
```

### Example 4: Critical Issue
```
🧾 PROJECT: Database Migration   🚦 STATUS: 🔴   🗓️ WINDOW: URGENT

🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

G1 📚 Spec ready        🟢🟢🟢🟢🟢🟢🟢
G2 💻 Build green       🟢🟢🟢🔴⚪️⚪️⚪️   ⚠️ Build failing
G3 🧪 Tests pass        🟢🟢🔴⚪️⚪️⚪️⚪️   ⚠️ Integration tests failing
G4 🔍 Review complete   🟢🟢🟢🟢⚪️⚪️⚪️
G5 🔐 Security ok       🟡🟡🟡⚪️⚪️⚪️⚪️
G6 🚀 Deploy ready      ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
G7 ✅ Done              ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
```

---

## 🎨 Customization

### Adding Custom Gates
You can adapt the 7-gate framework to your project:

```
G1 📝 Planning complete
G2 🎨 Design approved
G3 💻 Development done
G4 🧪 QA passed
G5 🔐 Security cleared
G6 📚 Docs updated
G7 🚀 Released
```

### Adjusting Check Count
Not every gate needs 7 checks. Adjust to your needs:

```
G1 📚 Spec ready        🟢🟢🟢⚪️    (4 checks)
G2 💻 Build green       🟢🟢🟢🟢🟢   (5 checks)
G3 🧪 Tests pass        🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢   (10 checks)
```

---

## 📱 Integration Ideas

### GitHub Issues
Add quality gate template to issue descriptions:
```markdown
## Quality Gates Progress
🧾 PROJECT: Feature XYZ   🚦 STATUS: 🟡

[paste gates here]
```

### Pull Request Template
```markdown
## Pre-merge Quality Gates
- [ ] G1 📚 Spec ready
- [ ] G2 💻 Build green
- [ ] G3 🧪 Tests pass
- [ ] G4 🔍 Review complete
- [ ] G5 🔐 Security ok
```

### Project Boards
Create columns for each gate, move cards as they progress.

### Slack/Discord Updates
```
🚦 Daily Quality Gates Update
📊 Project: API v2.0
Status: 🟡 In Progress

G1 📚 Spec: 🟢🟢🟢🟢🟢 (Complete)
G2 💻 Build: 🟢🟢🟢🟡⚪️ (Progressing)
G3 🧪 Tests: 🟢🟡⚪️⚪️⚪️ (Started)
```

---

## 🔄 Workflow Integration

### Daily Standup
Review gate progress:
1. Which gates moved forward yesterday?
2. Which gates are blocked?
3. What's needed to advance the next gate?

### Sprint Planning
Use gates to estimate and plan:
- Assign story points per gate
- Track velocity through gates
- Identify bottlenecks

### Retrospectives
Analyze gate data:
- Which gates took longest?
- Where did we get blocked most?
- How can we improve each gate?

---

## 📈 Metrics & Analytics

Track these over time:
- **Time per gate**: How long to complete each gate?
- **Gate velocity**: How many checks completed per day?
- **Blocker frequency**: How often do red flags appear?
- **Success rate**: Percentage of gates passing first try

---

## 🎓 Best Practices

1. **Update frequently**: Daily or per commit
2. **Be honest**: Red/yellow flags help, not hurt
3. **Document blocks**: Note why something is red
4. **Celebrate progress**: Mark milestones as gates complete
5. **Review regularly**: Use in standups and reviews
6. **Adapt as needed**: Customize gates for your project
7. **Archive completed**: Keep history for retrospectives

---

## 🚀 Quick Start

1. **Copy the template** (top of this doc)
2. **Fill in project name** and time window
3. **Mark initial status** for each gate
4. **Update daily** as work progresses
5. **Add to your workflow** (issues, PRs, boards)
6. **Review in meetings** (standups, retrospectives)
7. **Adjust gates** to fit your project needs

---

## 📚 Related Resources

- [Service Infrastructure Template](../../templates/SERVICE_INFRA_TEMPLATE.md)
- [CI/CD Patterns](../MASTER_TEST_CICD_PATTERN.md)
- [Deployment Status Tracking](../DEPLOYMENT_STATUS.md)
- [Railway Troubleshooting](../railway-troubleshooting.md)

---

**Version:** 9.0  
**Last Updated:** 2025-12-25  
**Maintained By:** BlackRoad OS Infrastructure Team  

🎯 **Mission:** Make quality visible, trackable, and achievable.
