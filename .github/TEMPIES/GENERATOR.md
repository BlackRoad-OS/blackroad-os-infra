# 🧩 TEMPIES GENERATOR

## Overview

The TEMPIES (Template Examples) Generator provides a structured approach to creating standardized templates for issues, pull requests, and workflow documentation across BlackRoad OS infrastructure.

## Purpose

This generator enables:
- **Consistency**: Standardized formats across all documentation
- **Compliance**: Built-in regulatory tracking with emoji markers
- **Traceability**: Clear audit trails from template to records
- **Efficiency**: Reusable blocks and packs for common patterns

## Structure

### Blocks (`blocks/`)
Reusable components that can be composed into larger templates:
- Approval workflows
- Review checklists
- Evidence collection forms
- Verification steps

### Packs (`packs/`)
Complete template packages for specific scenarios:
- Security incident response
- Compliance reviews
- Deployment procedures
- Audit documentation

## Emoji Legend

| Emoji | Meaning | Usage |
|-------|---------|-------|
| 🗂 | Records | Formal record keeping |
| 🔐 | Protected | Secure/immutable storage |
| 📎 | Evidence | Supporting documentation |
| 🧾 | Policy | Governance documents |
| 👀 | Review | Review processes |
| ⭕ | Approval | Sign-off required |
| ✅ | Verify | Verification step |
| 🏁 | Close | Closeout/completion |

## Usage

1. Select appropriate blocks or packs
2. Customize for specific use case
3. Apply to issues/PRs
4. Move evidence to `🗂_RECORDS` when complete

## Template-to-Records Pipeline

```
📥 Intake → 👀 Review → ⭕ Approval → 📎 Evidence → 🗂 Records → 🔐 Storage → ✅ Verification → 🏁 Closeout
```

See [MEGA_BOARD.md](MEGA_BOARD.md) for comprehensive tracking workflows.
