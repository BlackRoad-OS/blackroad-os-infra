# 🚂 TEMPIES Rails System

This directory contains the TEMPIES (Tracking, Emoji, Metadata, Progress, Issue, Execution, Signaling) system for managing issues and workflows in the BlackRoad OS infrastructure.

## 📁 Components

### Issue Templates

- **00_start_here.yml** - The main workflow chooser that helps users select the right issue type and provides initial metadata (status, priority, progress)
- **bug.yml** - Bug report template
- **task.yml** - Standard task template
- **agent-task.yml** - Agent-specific task template

### Workflows

- **render_rails.yml** - Automatically renders emoji progress bars and applies labels to issues when they are opened or edited

## 🚀 Setup Requirements

### Required Labels

Before the `render_rails.yml` workflow can function properly, you need to create the following labels in your repository:

#### Status Labels
- `status:green` - Everything is good
- `status:yellow` - Some issues or concerns
- `status:red` - Critical problems
- `status:unknown` - Status unclear

#### Priority Labels
- `priority:P0` - Critical, do it now (blocks everything)
- `priority:P1` - High priority, today
- `priority:P2` - Medium priority, this week
- `priority:P3` - Low priority, backlog
- `priority:P4` - Very low priority, nice-to-have

#### Progress Labels
- `progress:0/7` - Not started
- `progress:1/7` - Just started
- `progress:2/7` - Early progress
- `progress:3/7` - Almost halfway
- `progress:4/7` - Halfway
- `progress:5/7` - More than half
- `progress:6/7` - Nearly done
- `progress:7/7` - Complete

#### Type Label
- `type:triage` - Needs triage (automatically added by Start Here template)

### Creating Labels

You can create these labels manually through the GitHub UI at:
`https://github.com/YOUR_ORG/YOUR_REPO/labels`

Or use the GitHub CLI:

```bash
# Status labels
gh label create "status:green" --color "00ff00" --description "Status: Green"
gh label create "status:yellow" --color "ffff00" --description "Status: Yellow"
gh label create "status:red" --color "ff0000" --description "Status: Red"
gh label create "status:unknown" --color "808080" --description "Status: Unknown"

# Priority labels
gh label create "priority:P0" --color "b60205" --description "Priority: P0 (Critical)"
gh label create "priority:P1" --color "d93f0b" --description "Priority: P1 (High)"
gh label create "priority:P2" --color "fbca04" --description "Priority: P2 (Medium)"
gh label create "priority:P3" --color "0e8a16" --description "Priority: P3 (Low)"
gh label create "priority:P4" --color "1d76db" --description "Priority: P4 (Very Low)"

# Progress labels
for i in {0..7}; do
  gh label create "progress:$i/7" --color "bfd4f2" --description "Progress: $i out of 7"
done

# Type label
gh label create "type:triage" --color "d4c5f9" --description "Needs triage"
```

## 🎯 How It Works

1. **User Files Issue**: User selects "🧭 Start Here (Workflow Chooser)" from issue templates
2. **Fills Form**: User selects workflow type, status, priority, and progress
3. **Issue Created**: Issue is created with the `type:triage` label
4. **Workflow Triggers**: The `render_rails.yml` workflow is triggered automatically
5. **Parses Metadata**: Workflow extracts status, priority, and progress from the issue body
6. **Renders Rails**: Workflow generates emoji progress bars, status indicators, and sad bars
7. **Adds Comment**: Workflow posts a formatted comment with all the visual indicators
8. **Applies Labels**: Workflow adds appropriate status, priority, and progress labels

## 📊 Example Output

When an issue is created with status "🟢 green", priority "P2", and progress "3":

```
## 🚂 TEMPIES Rails

**🚦 Status:** 🟢 green  →  🟢🟢🟢🟢🟢🟢🟢
**🎯 Priority:** 🟨 P2
**📈 Progress:** 3/7

### 📈 Progress Bar
🟢🟢🟢⚪️⚪️⚪️⚪️

### 😭 Sad Bar
☹️🙁😐🙂🙂🙂🙂

### ✅ Ship Signal
⭕⭕⭕⭕⭕⭕⭕
```

## 📚 Related Documentation

- **docs/EMOJI_DICTIONARY.md** - Comprehensive emoji reference for phases, flows, dependencies, and more
- **docs/WORKFLOW_PLAYBOOK.md** - Standard workflow tracks (Project Planning, Sprint/Kanban, Incident, Security, Release, Design, Tooling)

## 🔧 Troubleshooting

### Workflow not triggering
- Verify the workflow file is in `.github/workflows/render_rails.yml`
- Check that issues have write permissions in the workflow
- Ensure the workflow is enabled in repository settings

### Labels not being applied
- Verify all required labels exist in the repository
- Check the Actions logs for any error messages
- Ensure the issue body matches the expected format from the template

### Comment not appearing
- The workflow only comments once per issue to avoid spam
- If you edit an issue, labels will update but no new comment is added
- Check that the bot has permission to comment on issues

## 🎨 Customization

You can customize the emoji rails in `render_rails.yml`:
- Modify the `rails` array for different progress indicators
- Change the `traffic` indicators for status
- Adjust the `sad` array for different emotional indicators
- Add new bar types (e.g., risk bar, energy bar, urgency bar)
