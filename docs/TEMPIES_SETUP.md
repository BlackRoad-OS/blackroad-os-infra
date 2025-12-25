# 🚂 TEMPIES Rails Setup Guide

Quick setup guide for the TEMPIES emoji rail system.

## 📋 Required Labels

To enable the `render_rails.yml` workflow, create these labels in your GitHub repository:

### Status Labels (4)
- `status:green` - Everything is good ✅
- `status:yellow` - Warning, needs attention ⚠️
- `status:red` - Critical issue 🚨
- `status:unknown` - Status unclear ❓

### Priority Labels (5)
- `priority:P0` - Critical, do immediately
- `priority:P1` - High priority
- `priority:P2` - Medium priority (default)
- `priority:P3` - Low priority
- `priority:P4` - Backlog

### Progress Labels (8)
- `progress:0/7` - Not started
- `progress:1/7` - Just begun
- `progress:2/7` - Early progress
- `progress:3/7` - Making progress
- `progress:4/7` - Halfway there
- `progress:5/7` - Getting close
- `progress:6/7` - Almost done
- `progress:7/7` - Complete! 🎉

## 🚀 Quick Setup Script

You can create all labels using the GitHub CLI (`gh`):

```bash
# Status labels
gh label create "status:green" --color "0E8A16" --description "All systems go"
gh label create "status:yellow" --color "FBCA04" --description "Needs attention"
gh label create "status:red" --color "D93F0B" --description "Critical issue"
gh label create "status:unknown" --color "808080" --description "Status unclear"

# Priority labels
gh label create "priority:P0" --color "B60205" --description "Critical priority"
gh label create "priority:P1" --color "D93F0B" --description "High priority"
gh label create "priority:P2" --color "FBCA04" --description "Medium priority"
gh label create "priority:P3" --color "0E8A16" --description "Low priority"
gh label create "priority:P4" --color "C5DEF5" --description "Backlog"

# Progress labels
gh label create "progress:0/7" --color "E4E4E4" --description "Not started"
gh label create "progress:1/7" --color "BFD4F2" --description "Started"
gh label create "progress:2/7" --color "9AC5F4" --description "Early progress"
gh label create "progress:3/7" --color "74B6F6" --description "Making progress"
gh label create "progress:4/7" --color "4FA7F8" --description "Halfway"
gh label create "progress:5/7" --color "2998FA" --description "Getting close"
gh label create "progress:6/7" --color "1787E8" --description "Almost done"
gh label create "progress:7/7" --color "0E8A16" --description "Complete"
```

## 📚 Documentation References

- **Emoji Dictionary**: See `docs/EMOJI_DICTIONARY.md` for all emoji meanings
- **Workflow Playbook**: See `docs/WORKFLOW_PLAYBOOK.md` for standard workflows
- **Issue Template**: Use `.github/ISSUE_TEMPLATE/00_start_here.yml` to create tracked issues

## 🎯 How It Works

1. Create an issue using the "🧭 Start Here" template
2. Select Status, Priority, and Progress from dropdowns
3. The `render_rails.yml` workflow automatically:
   - Parses your selections
   - Generates emoji progress rails
   - Applies appropriate labels
   - Comments with visualization

## 🔄 Updates

When you edit an issue and change Status/Priority/Progress:
- Labels are updated automatically
- The rails comment is updated (not duplicated)
- Visual feedback is instant

## 🎨 Example Output

```
## 🚂 TEMPIES Rails

**🚦 Status:** 🟢 green  →  🟢🟢🟢🟢🟢🟢🟢
**🎯 Priority:** 🟨 P2
**📈 Progress:** 4/7

### 📈 Progress Bar
🟢🟢🟢🟢⚪️⚪️⚪️

### 😭 Sad Bar
😢☹️🙁😐🙂🙂🙂

### ✅ Ship Signal
⭕⭕⭕⭕⭕⭕⭕
```

---

🚂💥 **ALL ABOARD THE TEMPIES TRAIN!**
