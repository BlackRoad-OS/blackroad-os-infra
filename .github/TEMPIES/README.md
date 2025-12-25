# 🧩 TEMPIES v99 - Template Generator System

## 📚 Overview

TEMPIES is a comprehensive template system for managing PRs and issues across multiple domains with standardized tracking blocks.

## 📁 Structure

```
.github/
├── PULL_REQUEST_TEMPLATE/
│   ├── 00_TEMPIES.md               # Base template
│   ├── 01_TEMPIES_compliance.md   # Compliance workflows
│   ├── 02_TEMPIES_infra.md        # Infrastructure changes
│   ├── 03_TEMPIES_marketing.md    # Marketing campaigns
│   └── 04_TEMPIES_osj.md          # OSJ entries
├── ISSUE_TEMPLATE/
│   ├── tempiES_issue.yml          # General issue
│   ├── tempiES_bug.yml            # Bug reports
│   ├── tempiES_risk.yml           # Risk assessments
│   └── tempiES_compliance.yml     # Compliance issues
└── TEMPIES/
    ├── blocks/                    # Reusable template blocks
    │   ├── block_status.md       # Status indicators
    │   ├── block_progress7.md    # 7-step progress
    │   ├── block_gantt7.md       # 7-week timeline
    │   ├── block_deps7.md        # Dependencies
    │   ├── block_risk7.md        # Risk matrix
    │   ├── block_retention.md    # Retention policies
    │   └── block_worm.md         # WORM records
    └── packs/                     # Domain-specific packs
        ├── pack_core.md          # Core operations
        ├── pack_compliance.md    # Compliance/audit
        ├── pack_infra.md         # Infrastructure
        ├── pack_bd_osj.md        # Business dev/OSJ
        └── pack_ia_ads.md        # AI/Ads workflows
```

## 🏷️ v99-A: Naming Convention

Template names follow the pattern:

```
TEMPIES_<domain>_<usecase>_<size>
```

### Domains
- `core` - Core repository operations
- `compliance` - Compliance and regulatory
- `infra` - Infrastructure and DevOps
- `marketing` - Marketing campaigns
- `bd_osj` - Business development & OSJ
- `ia_ads` - Intelligence & Advertising

### Use Cases
- `pr` - Pull request
- `issue` - General issue
- `bug` - Bug report
- `risk` - Risk assessment
- `inspection` - Audit/inspection
- `review` - Review process

### Sizes
- `small` - Quick changes, < 1 day
- `medium` - Standard work, 1-3 days
- `big` - Large initiatives, > 3 days

### Examples

```
TEMPIES_core_pr_small
TEMPIES_infra_pr_big
TEMPIES_compliance_issue_small
TEMPIES_bd_osj_inspection_big
TEMPIES_ia_ads_review_small
TEMPIES_marketing_pr_medium
```

## 📦 v99-B: Clone Block

Standard clone block for creating new templates in 10 seconds:

```markdown
## 🚦 Status
🟢⚪️⚪️⚪️⚪️⚪️⚪️ | 🟡⚪️⚪️⚪️⚪️⚪️⚪️ | 🔴⚪️⚪️⚪️⚪️⚪️⚪️

## 🧭 Progress
1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣
⚪️⚪️⚪️⚪️⚪️⚪️⚪️

## 🔗 Dependencies
T1 🔗 ________
T2 🔗 ________
T3 🔗 ________

## ⚠️ Risk
L: 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣  I: 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣  🔥: 🟢/🟡/🟠/🔴

## 📎 Attachments
- 
- 
```

## 🎯 Usage Guide

### Creating a New Template

1. **Choose your domain** (core, compliance, infra, etc.)
2. **Select use case** (pr, issue, bug, etc.)
3. **Pick size** (small, medium, big)
4. **Name it**: `TEMPIES_<domain>_<usecase>_<size>`
5. **Copy clone block** and customize

### Using Blocks

Reference blocks in your templates:

```markdown
<!-- Include status tracking -->
{{< block_status.md >}}

<!-- Include progress tracker -->
{{< block_progress7.md >}}

<!-- Include risk matrix -->
{{< block_risk7.md >}}
```

### Using Packs

Packs are pre-configured sets of blocks for specific domains:

- **Core Pack**: status + progress + dependencies + risk
- **Compliance Pack**: WORM + retention + risk + status
- **Infra Pack**: progress + dependencies + gantt + risk
- **BD/OSJ Pack**: status + progress + dependencies + retention
- **IA/Ads Pack**: progress + status + dependencies + risk

## 📊 Block Reference

### Status Block (block_status.md)
3-level status indicator: Green (good), Yellow (warning), Red (critical)

### Progress Block (block_progress7.md)
7-step progress tracker with emoji indicators

### Gantt Block (block_gantt7.md)
7-week timeline visualization

### Dependencies Block (block_deps7.md)
Track up to 3 task dependencies

### Risk Block (block_risk7.md)
Risk matrix: Likelihood (L) × Impact (I) = Risk Level (🔥)

### Retention Block (block_retention.md)
Document retention policies and attachments

### WORM Block (block_worm.md)
Write Once Read Many - for immutable compliance records

## 🚀 Scaling to 500 Templates

With this system, you can generate 500+ templates by:

1. **6 domains** × **6 use cases** × **3 sizes** = **108 base templates**
2. Add custom variations for specific needs
3. Mix and match blocks for unique workflows
4. Use packs as starting points

## 🔮 Next: v100

v100 will include a "mega mega" template with:
- 7 hierarchies × 3 each
- Placeholder emoji structure
- No words, pure structure
- Ready for rapid customization

---

**Version**: v99
**Last Updated**: 2025-12-25
**Maintained by**: BlackRoad OS Infrastructure Team
