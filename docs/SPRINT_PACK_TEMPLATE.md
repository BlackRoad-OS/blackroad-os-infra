# 🧩 EXAMPLES PACK v24 - Sprint Template Guide

## Overview

The EXAMPLES PACK v24 template is a GitHub Issue template designed for tracking engineering sprints with a visual grid format showing 7 stories across 7 stages.

## Purpose

- Track multiple related stories in a single sprint
- Visualize progress across different stages
- Identify blockers and at-risk work items
- Maintain consistent sprint planning and reporting

## How to Use

### Creating a Sprint Issue

1. Go to the repository's **Issues** tab
2. Click **New Issue**
3. Select **🧩 EXAMPLES PACK v24 (Engineering Sprint)**
4. Fill in the sprint details:
   - Sprint name (e.g., "Q1 Platform Launch")
   - Sprint dates (e.g., "Dec 25 - Jan 8")
   - Overall sprint status (🟢 On track, 🟡 At risk, 🔴 Blocked)

### Defining Stories

For each of the 7 stories:
1. Enter a descriptive story name
2. Set the progress using emoji indicators:
   - 🟢 Done (stage completed)
   - 🟡 In progress (actively working)
   - 🔴 Blocked (cannot proceed)
   - ⚪️ Empty (not started)
3. Use exactly 7 emojis (one per stage)
4. Optional: Add 😭 at the end for severely blocked stories

### Customizing Stage Labels

The default stages are:
1. 1️⃣ Backlog
2. 2️⃣ Ready
3. 3️⃣ Build
4. 4️⃣ Review
5. 5️⃣ Test
6. 6️⃣ Ship
7. 7️⃣ Done

You can customize these to match your workflow (e.g., Design, Dev, QA, Deploy, etc.)

## Example Output

When rendered, the issue will display:

```
🧩 EXAMPLES PACK v24 (engineering sprint) — 7 stories × 7 stages
Legend: 🟢 done  🟡 in progress  🔴 blocked  ⚪️ empty
Stages: 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣

🧑‍💻 SPRINT: Q1 Platform Launch   📅 DATES: Dec 25 - Jan 8   🚦 STATUS: 🟡
🧭 Stages →      1️⃣  2️⃣  3️⃣  4️⃣  5️⃣  6️⃣  7️⃣

🧩 Story-01 API Gateway Setup       🟢🟢🟢🟢⚪️⚪️⚪️
🧩 Story-02 User Authentication     🟢🟢🟢⚪️⚪️⚪️⚪️
🧩 Story-03 Database Migration      🟡🟡🟡⚪️⚪️⚪️⚪️
🧩 Story-04 Payment Integration     🔴🔴⚪️⚪️⚪️⚪️⚪️   😭
🧩 Story-05 Email Service           ⚪️⚪️⚪️⚪️⚪️⚪️⚪️
🧩 Story-06 Dashboard UI            🟢🟢⚪️⚪️⚪️⚪️⚪️
🧩 Story-07 Testing Suite           🟢🟢🟢⚪️⚪️⚪️⚪️

✅ STAGE LABELS (edit)
1️⃣ Backlog
2️⃣ Ready
3️⃣ Build
4️⃣ Review
5️⃣ Test
6️⃣ Ship
7️⃣ Done
```

## Progress Indicators

| Emoji | Meaning | When to Use |
|-------|---------|-------------|
| 🟢 | Done | Stage is complete, validated, and working |
| 🟡 | In Progress | Actively working on this stage |
| 🔴 | Blocked | Cannot proceed due to dependency or issue |
| ⚪️ | Empty | Not started yet |
| 😭 | Severely Blocked | Critical blocker (append to blocked stories) |

## Best Practices

### Story Scope
- Keep stories focused and independently deliverable
- Each story should be achievable within the sprint
- Break down large stories into multiple sprints

### Progress Updates
- Update progress at least daily or after significant milestones
- Move status indicators forward as work completes
- Add notes about blockers immediately when identified

### Stage Customization
- Align stages with your team's actual workflow
- Keep stage names short (1-2 words)
- Ensure stages are sequential and clear

### Sprint Status
- 🟢 On track: All critical stories progressing as planned
- 🟡 At risk: Some stories delayed or facing issues
- 🔴 Blocked: Sprint goals in jeopardy, intervention needed

## Related Documentation

- [Issue Templates Overview](../.github/ISSUE_TEMPLATE/)
- [GreenLight Emoji Dictionary](../.trinity/greenlight/docs/GREENLIGHT_EMOJI_DICTIONARY.md)
- [Task Template](../.github/ISSUE_TEMPLATE/task.yml)
- [Agent Task Template](../.github/ISSUE_TEMPLATE/agent-task.yml)

## Integration with Other Tools

This template is designed to work alongside:
- GitHub Projects for kanban-style tracking
- GitHub Milestones for release planning
- CI/CD workflows for automated deployment stages
- Team standups and sprint reviews

## FAQ

**Q: Can I have more or fewer than 7 stories?**
A: The template is designed for exactly 7 stories. For different numbers, create multiple sprint issues or modify the template.

**Q: Can I change the number of stages?**
A: The template uses 7 stages by default. Modifying this would require editing the template file.

**Q: How do I track sub-tasks within a story?**
A: Use the Sprint Notes section or create linked issues for detailed task breakdowns.

**Q: Should I create a new issue for each sprint?**
A: Yes, create a fresh sprint issue for each sprint period to maintain clear history.

---

**Last Updated**: 2025-12-25  
**Template Version**: v24  
**Maintained By**: BlackRoad OS Infrastructure Team
