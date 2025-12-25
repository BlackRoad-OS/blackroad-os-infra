# 🧩 EXAMPLES PACK v108 — 📟 SINGLE-SCREEN SUPER TEMPLATE Guide

## Overview

The **Examples Pack v108** is an emoji-only, single-screen issue template designed for visual tracking of complex tasks and projects. It provides a comprehensive dashboard-style view using emoji indicators for status, progress, dependencies, warnings, and completion tracking.

## Template Location

`.github/ISSUE_TEMPLATE/examples-pack-v108.yml`

## When to Use This Template

Use this template when you need:
- **Visual status tracking** across multiple dimensions
- **Complex project oversight** with many moving parts
- **Quick visual scanning** of project health
- **Emoji-based communication** for cross-language teams
- **Single-screen dashboard** view of all critical information

## Template Sections

### 🚦 Status Lights

Track status across different categories using traffic light indicators:

```
🟢⚪️⚪️⚪️⚪️⚪️⚪️ | 🟡⚪️⚪️⚪️⚪️⚪️⚪️ | 🔴⚪️⚪️⚪️⚪️⚪️⚪️ | ⭕⚪️⚪️⚪️⚪️⚪️⚪️
```

**Legend:**
- 🟢 = Green/Good status
- 🟡 = Yellow/Warning status
- 🔴 = Red/Critical status
- ⭕ = On hold/Paused status

Fill in circles (⚪️) with the appropriate emoji to indicate status in each category.

### 🧭 Navigation / Steps

Track progress through 7 numbered steps:

```
1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
⚪️⚪️⚪️⚪️⚪️⚪️⚪️
```

Replace ⚪️ with:
- ✅ = Completed
- 🟢 = In progress
- 🔴 = Blocked
- ⚪️ = Not started

### 📊 Progress Chart

Visual progress tracking for up to 7 rows with status indicators:

```
R1 ⬜🟩🟩⭕⬜⬜🏁
R2 ⬜⬜🟩🟩⭕⬜🏁
R3 ⬜⬜⬜🟩🟩⭕🏁
R4 ⬜⬜⬜⬜🟩🟩🏁
R5 ⬜🟨🟨⭕⬜⬜🏁
R6 ⬜🟥🟥⭕⬜⬜🏁
R7 ⬜⬜⬜🟩🟩🟩🏁
```

**Legend:**
- ⬜ = Empty/Not started
- 🟩 = Complete (green)
- 🟨 = In progress (yellow)
- 🟥 = Blocked/Issue (red)
- ⭕ = Current position marker
- 🏁 = Finish line

Each row (R1-R7) can represent:
- A phase of work
- A team or workstream
- A component or module
- A milestone or sprint

### 🔗 Links & Dependencies

Track related tasks, dependencies, and blockers:

```
T1 🔗 ________   T2 🔗 ________   T3 🔗 ________
🧱 ________  🧱 ________  🧱 ________
```

**Usage:**
- `T1 🔗 https://...` = Link to related task/issue
- `🧱 Blocked by #123` = Dependency or blocker

### ⚠️ Warnings & Alerts

Track warnings, issues, and critical alerts:

```
🔥🟢🟡🟠🔴  😭⚪️⚪️⚪️⚪️⚪️⚪️  ‼️⚪️⚪️⚪️⚪️⚪️⚪️
```

**Legend:**
- 🔥 = Fire/Critical severity scale (🟢→🔴)
- 😭 = Sadness/Impact level
- ‼️ = Urgency level

### 📎 Attachments

Reference files, documents, and resources:

```
📎 ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
📎 ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
📎 ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
```

Replace placeholders with actual links:
```
📎 Design doc: https://...
📎 Spec: https://...
📎 Reference: https://...
```

### 🗂🔐✅🏁 Final Checklist

Track final items before completion:

```
🗂⚪️  🔐⚪️  ✅⚪️  🏁⚪️
```

**Legend:**
- 🗂 = Documentation updated
- 🔐 = Security review passed
- ✅ = Testing complete
- 🏁 = Ready to deploy

Replace ⚪️ with ✅ when complete.

## Example Use Cases

### 1. Multi-Phase Project Tracking
Track a project across 7 phases with the Progress Chart, using each row for a different phase.

### 2. Multi-Team Coordination
Use each row in the Progress Chart for a different team, showing their progress toward a common goal.

### 3. Release Management
Track the release process through stages: design → dev → test → staging → prod → monitoring → done.

### 4. Incident Response
Use status lights for system health, warnings for active issues, and the progress chart to track remediation steps.

### 5. Sprint Planning
Navigation steps for sprint days, progress chart for epic tracking, and final checklist for sprint completion criteria.

## Tips

1. **Be Consistent**: Use the same emoji meanings across all your issues for easy scanning
2. **Update Regularly**: Keep the visual status updated so it's always current
3. **Link Everything**: Use the Links section to connect to related issues, PRs, and docs
4. **Customize Rows**: The R1-R7 rows can represent whatever makes sense for your project
5. **Add Context**: Use the "Additional Context" section for anything that doesn't fit the emoji format

## Coming Soon

**Examples Pack v109** will add dropdown lists with emoji options for status, priority, severity, and channel selection - making it even easier to use these templates like "emoji-Asana pickers."

## Related Templates

- [🤖 Agent Task](.github/ISSUE_TEMPLATE/agent-task.yml) - For AI agent execution
- [🐛 Bug](.github/ISSUE_TEMPLATE/bug.yml) - For bug reports
- [🎯 Task](.github/ISSUE_TEMPLATE/task.yml) - For standard tasks

---

**Legend Reference Card:**

| Emoji | Meaning |
|-------|---------|
| 🟢 | Good/Complete |
| 🟡 | Warning/In Progress |
| 🔴 | Critical/Blocked |
| ⚪️ | Placeholder/Empty |
| ⭕ | Current position |
| ✅ | Checked/Done |
| 🏁 | Finish line |
| 🔗 | Link |
| 🧱 | Blocker/Dependency |
| 📎 | Attachment |
| 🔥 | Fire/Critical |
| 😭 | Sad/High impact |
| ‼️ | Urgent |
| 🗂 | Documentation |
| 🔐 | Security |
