# Org Bootstrap Scripts

Scripts for bootstrapping BlackRoad repos with consistent labels, templates, and CI.

## Prerequisites

- [GitHub CLI](https://cli.github.com/) installed and authenticated (`gh auth login`)
- Bash shell

## Quick Start

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Bootstrap a single active repo
./scripts/bootstrap-repo.sh BlackRoad-OS/blackroad-os-core

# Bootstrap a legacy repo (adds ARCHIVED.md)
./scripts/bootstrap-repo.sh blackboxprogramming/blackroad --legacy

# Bootstrap a research repo (adds research banner)
./scripts/bootstrap-repo.sh blackboxprogramming/lucidia --research

# Bootstrap ALL repos (interactive confirmation)
./scripts/bootstrap-all.sh

# Dry run - see what would be processed
./scripts/bootstrap-all.sh --dry-run
```

## What Each Script Does

### `bootstrap-repo.sh`

| Mode | What It Does |
|------|--------------|
| (default) | Labels, issue templates, PR template, CI workflow |
| `--legacy` | Adds `ARCHIVED.md` pointing to BlackRoad-OS |
| `--research` | Prepends research banner to README |

### `setup-labels.sh`

Creates/updates the standard label set:
- `team:*` (core, web, prism, infra, docs, pack, agents)
- `type:*` (feature, bug, infra, doc, agent, pack, config, refactor)
- `prio:*` (P0, P1, P2)
- `status:*` (backlog, active, review, blocked, done)

### `bootstrap-all.sh`

Runs bootstrap across all repos in the BlackRoad universe:
- 28 active repos (BlackRoad-OS + BlackRoad-AI)
- 18 legacy repos (blackboxprogramming - archive notice)
- 8 research repos (blackboxprogramming - research banner)

## Templates

Templates are stored in `scripts/templates/`:

```
templates/
├── ARCHIVED.md                      # Legacy repo notice
├── RESEARCH_BANNER.md               # Research repo banner
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── feature_request.md
    │   ├── bug_report.md
    │   ├── infra_task.md
    │   ├── doc_update.md
    │   └── config.yml
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/
        └── ci.yml
```

## Safety

- Scripts clone to temp directories; nothing touches your local repos directly
- Changes are committed locally but **not pushed** automatically
- Review diffs before pushing or creating PRs
- No secrets are ever added

## Label Colors

| Category | Labels | Color |
|----------|--------|-------|
| Team | team:core, team:web, team:prism, team:infra, team:docs, team:pack, team:agents | Blues/greens |
| Type | type:feature, type:bug, type:infra, type:doc, type:agent, type:pack, type:config, type:refactor | Various |
| Priority | prio:P0 (critical), prio:P1 (high), prio:P2 (normal) | Red → Yellow |
| Status | status:backlog, status:active, status:review, status:blocked, status:done | Gray → Green → Purple |
