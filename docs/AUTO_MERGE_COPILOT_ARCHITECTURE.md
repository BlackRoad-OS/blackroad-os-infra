# AUTO-MERGE + AI COPILOT AUTOMATION ARCHITECTURE

## For BlackRoad OS - Full Self-Healing PR System

**Goal:** Enable PRs to merge themselves when ready, auto-fix issues, and integrate with GitHub Copilot for autonomous code changes.

---

## 🎯 ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                    PULL REQUEST LIFECYCLE                        │
└─────────────────────────────────────────────────────────────────┘

1. PR OPENED (Human or Copilot)
   ├─> Auto-label (area, type, size)
   ├─> Auto-assign reviewers
   ├─> Add to GitHub Project
   └─> Trigger CI checks

2. CI CHECKS RUN
   ├─> Tests
   ├─> Lint
   ├─> Build
   └─> Security scans

3. IF CHECKS FAIL
   ├─> Auto-fix lint errors → commit → re-run
   ├─> Auto-format code → commit → re-run
   ├─> Retry flaky tests (3x)
   ├─> Update lockfiles if outdated
   └─> Comment with fix suggestions

4. IF CHECKS PASS
   ├─> Auto-approve (if bot PR or dependency update)
   ├─> Wait for required approvals
   └─> Auto-merge when ready

5. POST-MERGE
   ├─> Update GitHub Project status
   ├─> Close related issues
   ├─> Trigger deployment (if main branch)
   └─> Send notifications
```

---

## 🤖 COMPONENT #1: AUTO-MERGE

### How It Works

**Trigger:** All required checks pass + approvals received
**Action:** Automatically merge PR using GitHub's merge queue
**Safety:** Requires branch protection rules

### Implementation

**Workflow: `auto-merge.yml`**
```yaml
name: Auto Merge

on:
  pull_request:
    types: [opened, synchronize, reopened]
  pull_request_review:
    types: [submitted]
  check_suite:
    types: [completed]

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    if: |
      github.event.pull_request.user.login == 'dependabot[bot]' ||
      contains(github.event.pull_request.labels.*.name, 'automerge')

    steps:
      - name: Enable auto-merge
        run: gh pr merge --auto --squash "$PR_URL"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Branch Protection Rules Required

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["Tests", "Lint", "Build"]
  },
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true
  },
  "enforce_admins": false,
  "allow_auto_merge": true
}
```

---

## 🔧 COMPONENT #2: AUTO-FIX

### Supported Auto-Fixes

1. **Lint Errors** - Run `lint:fix`, commit changes
2. **Format Issues** - Run prettier/black, commit changes
3. **Outdated Lockfiles** - Run `npm install`, commit
4. **Simple Merge Conflicts** - Auto-rebase (when safe)
5. **Missing Types** - Auto-install `@types/*` packages

### Implementation

**Workflow: `auto-fix.yml`**
```yaml
name: Auto Fix Issues

on:
  pull_request:
    types: [opened, synchronize]
  workflow_run:
    workflows: ["Lint"]
    types: [completed]
    branches-ignore:
      - main

jobs:
  auto-fix-lint:
    runs-on: ubuntu-latest
    if: github.event.workflow_run.conclusion == 'failure'

    steps:
      - name: Checkout PR
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event.pull_request.head.ref }}
          token: ${{ secrets.BOT_PAT }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run lint fix
        run: npm run lint:fix || true

      - name: Run prettier
        run: npx prettier --write . || true

      - name: Commit fixes
        run: |
          git config user.name "blackroad-bot[bot]"
          git config user.email "bot@blackroad.systems"
          git add .
          git diff --staged --quiet || git commit -m "🤖 Auto-fix: lint and format"
          git push
```

**Workflow: `auto-fix-dependencies.yml`**
```yaml
name: Auto Fix Dependencies

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  fix-lockfile:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event.pull_request.head.ref }}
          token: ${{ secrets.BOT_PAT }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Update lockfile
        run: |
          npm install --package-lock-only

      - name: Commit lockfile
        run: |
          git config user.name "blackroad-bot[bot]"
          git config user.email "bot@blackroad.systems"
          git add package-lock.json
          git diff --staged --quiet || git commit -m "🤖 Auto-fix: update lockfile"
          git push
```

---

## 📦 COMPONENT #3: DEPENDABOT AUTO-MERGE

### Configuration

**File: `.github/dependabot.yml`**
```yaml
version: 2
updates:
  # npm dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    reviewers:
      - "blackroad-os/backend-team"
    labels:
      - "dependencies"
      - "automerge"
    commit-message:
      prefix: "chore(deps)"

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    labels:
      - "dependencies"
      - "ci/cd"
      - "automerge"
```

**Workflow: `dependabot-auto-merge.yml`**
```yaml
name: Dependabot Auto Merge

on:
  pull_request:
    types: [opened, synchronize]

permissions:
  contents: write
  pull-requests: write

jobs:
  auto-approve-and-merge:
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'

    steps:
      - name: Dependabot metadata
        id: metadata
        uses: dependabot/fetch-metadata@v1
        with:
          github-token: "${{ secrets.GITHUB_TOKEN }}"

      - name: Auto-approve patch and minor updates
        if: |
          steps.metadata.outputs.update-type == 'version-update:semver-patch' ||
          steps.metadata.outputs.update-type == 'version-update:semver-minor'
        run: gh pr review --approve "$PR_URL"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Enable auto-merge
        if: |
          steps.metadata.outputs.update-type == 'version-update:semver-patch' ||
          steps.metadata.outputs.update-type == 'version-update:semver-minor'
        run: gh pr merge --auto --squash "$PR_URL"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🎯 COMPONENT #4: GITHUB PROJECTS AUTOMATION

### Auto-Add to Project

**Workflow: `project-automation.yml`**
```yaml
name: GitHub Projects Automation

on:
  issues:
    types: [opened, labeled]
  pull_request:
    types: [opened, labeled, ready_for_review]

jobs:
  add-to-project:
    runs-on: ubuntu-latest

    steps:
      - name: Add to BlackRoad OS Master Project
        uses: actions/add-to-project@v0.5.0
        with:
          project-url: https://github.com/orgs/blackroad-os/projects/1
          github-token: ${{ secrets.ORG_PROJECT_TOKEN }}

      - name: Set project fields
        run: |
          # Set status based on labels
          if [[ "${{ contains(github.event.*.labels.*.name, 'priority:critical') }}" == "true" ]]; then
            echo "Setting priority to Critical"
            # Use GitHub GraphQL API to update project field
          fi
```

### Auto-Move Cards

**Workflow: `project-status-update.yml`**
```yaml
name: Update Project Status

on:
  pull_request:
    types: [opened, ready_for_review, review_requested, closed]
  pull_request_review:
    types: [submitted]

jobs:
  update-status:
    runs-on: ubuntu-latest

    steps:
      - name: Move to In Review
        if: github.event.action == 'review_requested'
        uses: actions/add-to-project@v0.5.0
        with:
          project-url: https://github.com/orgs/blackroad-os/projects/1
          github-token: ${{ secrets.ORG_PROJECT_TOKEN }}
          status-field: "Status"
          status-value: "In Review"

      - name: Move to Done
        if: github.event.action == 'closed' && github.event.pull_request.merged
        uses: actions/add-to-project@v0.5.0
        with:
          project-url: https://github.com/orgs/blackroad-os/projects/1
          github-token: ${{ secrets.ORG_PROJECT_TOKEN }}
          status-field: "Status"
          status-value: "Done"
```

---

## 🔄 COMPONENT #5: SELF-HEALING TESTS

### Retry Flaky Tests

**Workflow: `test-with-retry.yml`**
```yaml
name: Tests (with retry)

on:
  pull_request:
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run tests with retry
        uses: nick-invision/retry@v2
        with:
          timeout_minutes: 10
          max_attempts: 3
          retry_on: error
          command: npm test

      - name: Report flaky tests
        if: failure()
        run: |
          echo "Tests failed after 3 attempts - likely not flaky"
          echo "Creating issue for investigation"
          gh issue create \
            --title "Flaky test detected in PR #${{ github.event.pull_request.number }}" \
            --body "Tests failed after 3 retry attempts" \
            --label "bug,tests,flaky"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Auto-Rebase When main Updates

**Workflow: `auto-rebase.yml`**
```yaml
name: Auto Rebase

on:
  push:
    branches: [main]

jobs:
  rebase-open-prs:
    runs-on: ubuntu-latest

    steps:
      - name: Get open PRs
        id: prs
        run: |
          prs=$(gh pr list --json number,headRefName --jq '.[].number')
          echo "prs=$prs" >> $GITHUB_OUTPUT
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Rebase PRs with automerge label
        run: |
          for pr in ${{ steps.prs.outputs.prs }}; do
            labels=$(gh pr view $pr --json labels --jq '.labels[].name')
            if echo "$labels" | grep -q "automerge"; then
              echo "Updating PR #$pr"
              gh pr comment $pr --body "🤖 Auto-updating branch with latest main"
              # Trigger update branch via GitHub API
            fi
          done
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🤖 COMPONENT #6: COPILOT INTEGRATION

### GitHub Copilot Workspace

**How to use:**
1. Open GitHub Copilot Workspace from a repo
2. Ask Copilot to make changes (e.g., "Add error handling to API routes")
3. Copilot generates changes, creates PR
4. PR goes through auto-merge pipeline
5. If tests pass, auto-merges

**Enable for PRs:**
- Add `copilot` label to PRs opened by Copilot
- Auto-approve if tests pass
- Auto-merge with automerge label

### Copilot CLI Integration

**Local workflow:**
```bash
# Developer uses Copilot to fix an issue
copilot suggest "fix lint errors in src/routes/agents.ts"

# Copilot generates fix
# Developer reviews and applies
git add .
git commit -m "Fix: apply Copilot lint suggestions"
git push

# Auto-merge workflow takes over
```

### Bot PR Template

**Workflow: `copilot-pr-helper.yml`**
```yaml
name: Copilot PR Helper

on:
  pull_request:
    types: [opened]

jobs:
  enhance-copilot-pr:
    runs-on: ubuntu-latest
    if: contains(github.event.pull_request.body, 'Copilot') ||
        github.event.pull_request.user.login == 'github-actions[bot]'

    steps:
      - name: Add automerge label
        run: gh pr edit "$PR_URL" --add-label "automerge,copilot-generated"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Request AI review
        run: |
          gh pr comment "$PR_URL" --body "@copilot review this PR"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🔐 COMPONENT #7: SECURITY & PERMISSIONS

### Required Secrets

1. **`BOT_PAT`** - Personal Access Token for bot commits
   - Scope: `repo`, `workflow`
   - Owner: Service account (blackroad-bot)

2. **`ORG_PROJECT_TOKEN`** - For GitHub Projects access
   - Scope: `project`, `repo`
   - Owner: Org admin

3. **`CODECOV_TOKEN`** - For coverage reports
   - From codecov.io

### Bot Account Setup

```bash
# Create service account
# Username: blackroad-bot
# Email: bot@blackroad.systems

# Generate PAT
# Settings → Developer settings → Personal access tokens → Fine-grained tokens
# Name: blackroad-bot-automation
# Expiration: 1 year
# Permissions: Read/Write repo, workflow, projects

# Add to repo secrets
gh secret set BOT_PAT --body "ghp_xxxx..."
```

### Permissions Required

**Workflow permissions:**
```yaml
# .github/workflows/settings
permissions:
  contents: write        # For auto-commits
  pull-requests: write   # For auto-merge
  issues: write          # For creating issues
  checks: write          # For re-running checks
```

---

## 📊 COMPONENT #8: MONITORING & ALERTS

### Success Metrics Dashboard

**Track:**
- % of PRs auto-merged
- Average time to merge
- % of auto-fixes successful
- Flaky test detection rate

**Workflow: `metrics-report.yml`**
```yaml
name: Weekly Metrics Report

on:
  schedule:
    - cron: '0 9 * * MON'  # Every Monday at 9 AM

jobs:
  generate-metrics:
    runs-on: ubuntu-latest

    steps:
      - name: Calculate metrics
        run: |
          # Query GitHub API for metrics
          auto_merged=$(gh pr list --state merged --label automerge --json number | jq length)
          total_merged=$(gh pr list --state merged --json number | jq length)

          echo "Auto-merged PRs: $auto_merged / $total_merged"

      - name: Post to Slack
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "📊 Weekly Automation Report",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Auto-merge Success Rate:* 85%\n*Average merge time:* 2.3 hours"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 🚀 DEPLOYMENT CHECKLIST

### Phase 1: Foundation (Week 1)
- [ ] Create bot account (blackroad-bot)
- [ ] Generate PAT and add to repo secrets
- [ ] Enable auto-merge in repo settings
- [ ] Configure branch protection rules

### Phase 2: Basic Automation (Week 2)
- [ ] Deploy auto-merge workflow to all repos
- [ ] Deploy auto-fix workflows (lint, format)
- [ ] Configure Dependabot with auto-merge
- [ ] Test with dummy PRs

### Phase 3: Advanced Features (Week 3)
- [ ] Deploy GitHub Projects automation
- [ ] Deploy self-healing test retry
- [ ] Deploy auto-rebase workflow
- [ ] Set up metrics reporting

### Phase 4: Copilot Integration (Week 4)
- [ ] Test Copilot Workspace integration
- [ ] Deploy Copilot PR helper workflow
- [ ] Create Copilot usage guidelines
- [ ] Train team on Copilot + auto-merge

### Phase 5: Monitoring & Tuning (Ongoing)
- [ ] Monitor auto-merge success rate
- [ ] Tune retry logic for flaky tests
- [ ] Optimize auto-fix patterns
- [ ] Collect feedback and iterate

---

## 🎯 USAGE EXAMPLES

### Example 1: Dependabot Update (Fully Automated)

```
1. Monday 9 AM: Dependabot opens PR to update express@4.19.2 → 4.19.3
2. Auto-labeler adds: dependencies, automerge
3. CI runs: Tests ✅ Lint ✅ Build ✅
4. Auto-approve workflow approves (patch update)
5. Auto-merge workflow enables auto-merge
6. PR merges automatically
7. Deployment triggered to staging
```

**Time to merge: ~5 minutes (zero human interaction)**

### Example 2: Lint Failure (Auto-Fixed)

```
1. Developer opens PR with lint errors
2. Lint workflow fails ❌
3. Auto-fix workflow triggers
4. Runs `npm run lint:fix`, commits changes
5. CI re-runs: Tests ✅ Lint ✅ Build ✅
6. PR marked ready for review
7. Human approves
8. Auto-merges
```

**Time to fix: ~2 minutes (automated fix)**

### Example 3: Copilot-Generated PR

```
1. Copilot Workspace generates PR: "Add input validation"
2. Copilot PR helper adds automerge + copilot-generated labels
3. CI runs: Tests ✅ Lint ✅ Build ✅
4. Auto-approve (Copilot PRs trusted for passing tests)
5. Auto-merges
6. Deployed to production
```

**Time to merge: ~10 minutes (fully autonomous)**

---

## ⚠️ SAFETY GUARDRAILS

### What Auto-Merge WON'T Do

❌ Merge PRs that fail tests
❌ Merge without required approvals (unless Dependabot/bot PR)
❌ Merge PRs with unresolved conversations
❌ Merge major version updates without review
❌ Merge security-related PRs without review
❌ Merge PRs to `main` without passing staging

### Override Mechanisms

**Disable auto-merge:**
```bash
# Remove automerge label
gh pr edit <number> --remove-label "automerge"

# Or add skip-automerge label
gh pr edit <number> --add-label "skip-automerge"
```

**Emergency stop:**
```bash
# Disable auto-merge globally (in repo settings)
# OR suspend Dependabot
# OR disable specific workflows
```

---

## 📚 ADDITIONAL RESOURCES

- **GitHub Auto-Merge Docs:** https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request
- **Dependabot Configuration:** https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file
- **GitHub Projects Automation:** https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project
- **Copilot Workspace:** https://githubnext.com/projects/copilot-workspace

---

**END OF ARCHITECTURE DOCUMENT**

Use this as the foundation for implementing full auto-merge + Copilot integration across BlackRoad OS.
