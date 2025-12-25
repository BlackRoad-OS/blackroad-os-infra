# 🚂 BlackRoad Workflow Playbook (TEMPIES)

## Universal Rules (applies to ALL work)
1) Pick: 🧭 Work Type + 🚦 Status + 📈 Progress + 🎯 Priority + 🧱 Effort + 🧨 Risk
2) Always include: ✅ Acceptance Criteria
3) For 🔴 / ☢️ / 🪦: must include rollout + rollback + monitoring

---

## Workflow: ✨ Feature
1) 🧠 RFC/Codex (optional but recommended)
2) 📐 Spec + API/UX notes
3) 🧑‍💻 Build
4) 🧪 Test plan + evidence
5) 🚀 Release notes + rollout

## Workflow: 🐛 Bug
1) 🧪 Repro steps + expected vs actual
2) 🧷 Logs/screenshot
3) Fix + regression test
4) Verify in target env

## Workflow: 🧪 Spike/Experiment
1) Hypothesis + success criteria
2) Timebox (hours/days)
3) Results + decision: ✅ proceed / 🛑 stop / 🔁 iterate
4) Convert to Feature/Task

## Workflow: 🔥 Incident / SEV
1) Declare SEV + 🚦 status + blast radius
2) Mitigate first, diagnose second
3) Timeline + comms cadence
4) Postmortem with actions + owners

## Workflow: 🔐 Security
1) Threat model (what could go wrong)
2) Fix + tests
3) Review + verification
4) Backport/hotfix if needed

## Workflow: 🚀 Release
1) Cut release notes
2) Tag/version
3) Rollout plan + monitoring
4) Validate + celebrate 🎉

## Workflow: 🧹 Chore / Maintenance
1) State what becomes easier/safer
2) Keep PR small, label clearly
3) Add/adjust automation if it prevents repeats

## Workflow: 🧾 Docs
1) What changed + why now
2) Minimal but complete
3) Include examples/snippets

---

## Handoff Emoji (fast)
- 🧩 Need input from: @team
- 🧪 Ready for QA
- 🔐 Ready for security
- 🛰️ Ready for deploy
- ✅ Done done (validated + documented)
