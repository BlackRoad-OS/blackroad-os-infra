# CI/CD Workflows

This document describes the GitHub Actions workflows for `blackroad-os-infra`.

## Workflows Overview

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **Infra Tests** | PRs, push to `main` | Run full test suite |
| **Documentation Check** | PRs with `*.md` changes | Validate docs and runbooks |
| **Config Validation** | PRs with config changes | Validate YAML/JSON/TOML |
| **Label Sync** | Push to `main` (labels changed) | Sync labels to GitHub |
| **Auto Label PRs** | PR opened/updated | Auto-apply labels |

## Workflow Details

### 1. Infra Tests (`.github/workflows/infra-tests.yml`)

**Runs when:**
- Pull requests to `main` or `develop`
- Pushes to `main`

**What it does:**
1. Checks out code
2. Installs Node.js 20
3. Installs dependencies (`npm ci`)
4. Runs all tests (`npm test`)
5. Posts summary to PR

**How to fix failures:**
- See [Infrastructure Tests](./infra-tests.md)

---

### 2. Documentation Check (`.github/workflows/infra-docs-check.yml`)

**Runs when:**
- PR changes any `*.md` files
- PR changes `docs/` or `runbooks/` directories
- Push to `main`

**What it does:**
1. Validates documentation structure
2. Validates runbook completeness
3. Lints markdown (formatting)
4. Checks for broken links

**How to fix failures:**
- Broken links: Update paths in markdown
- Lint errors: Run `npm run lint:md` locally and fix
- Structure errors: Ensure headers and sections exist

---

### 3. Config Validation (`.github/workflows/infra-config-validate.yml`)

**Runs when:**
- PR changes `*.json`, `*.yaml`, `*.yml`, or `*.toml` files
- PR changes `dns/` or `environments/` directories

**What it does:**
1. Validates YAML/JSON syntax
2. Checks repository structure
3. Verifies config files parse correctly

**How to fix failures:**
- YAML errors: Check indentation and syntax
- JSON errors: Validate with `jsonlint` or online tool
- Structure errors: Ensure required dirs/files exist

---

### 4. Label Sync (`.github/workflows/infra-label-sync.yml`)

**Runs when:**
- Push to `main` changes `.github/labels.yml`
- Manual trigger (`workflow_dispatch`)

**What it does:**
1. Syncs labels from `.github/labels.yml` to GitHub
2. Creates missing labels
3. Updates existing label colors/descriptions

**Note:** Does NOT delete labels (prune: false)

---

### 5. Auto Label PRs (`.github/workflows/auto-labeler.yml`)

**Runs when:**
- PR is opened
- PR is updated (synchronize)
- PR is reopened

**What it does:**
1. Checks which files changed
2. Applies labels based on `.github/labeler.yml` rules
3. Helps route PRs to correct teams

**Examples:**
- Changes to `dns/**` → Adds `area:dns` label
- Changes to `*.md` → Adds `area:docs` and `type:docs` labels
- Changes to `runbooks/**` → Adds `area:runbooks` label

## GitHub Projects Integration

Labels enable automatic project board organization:

- **`team:infra`** → Routes to "Infrastructure/DevOps" lane
- **`risk:high`** → Prioritized in review queue
- **`status:needs-review`** → Moves to "Review Needed" column

## Workflow Permissions

All workflows use `GITHUB_TOKEN` with minimal permissions:
- **Read**: Code checkout
- **Write**: Labels (for label sync and auto-labeler)

No secrets or credentials required for infra tests.

## Debugging Workflow Failures

### View Logs
1. Go to PR page
2. Click "Checks" tab
3. Select failed workflow
4. Expand failed step

### Re-run Workflows
1. Click "Re-run jobs" button
2. Select "Re-run failed jobs" or "Re-run all jobs"

### Local Testing
Run the same commands locally:
```bash
npm ci
npm test
npm run lint:md
```

## Modifying Workflows

**Adding a new workflow:**
1. Create `.github/workflows/your-workflow.yml`
2. Follow existing pattern (checkout → setup → test)
3. Add documentation to this file

**Changing triggers:**
- Edit `on:` section in workflow YAML
- Test with a draft PR first

**Adding new tests:**
1. Add test script to `package.json`
2. Call script in appropriate workflow
3. Update docs
