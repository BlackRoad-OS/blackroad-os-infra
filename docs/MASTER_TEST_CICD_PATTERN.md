# MASTER TESTING & CI/CD PATTERN GUIDE

## For All BlackRoad OS Repositories

This document captures the proven patterns implemented across all BlackRoad OS repos for tests, CI/CD workflows, labels, and documentation.

**Status:** ✅ Successfully implemented across 5 repos (infra, core, api, prism-console, operator-engine)

---

## 📊 IMPLEMENTATION SUMMARY

| Repo | Stack | Tests | Workflows | Labels | Docs | Status |
|------|-------|-------|-----------|--------|------|--------|
| **blackroad-os-infra** | Node.js (validation) | 4 test scripts | 5 workflows | 16 labels | 2 docs | ✅ COMPLETE |
| **blackroad-os-core** | TypeScript/Express | 12 tests (Jest) | 4 workflows | 24 labels | 2 docs | ✅ COMPLETE |
| **blackroad-os-api** | TypeScript/Express | 20 tests (Jest) | 4 workflows | 24 labels | 2 docs | ✅ COMPLETE |
| **blackroad-os-prism-console** | Next.js/React | 21 tests (Jest) | 4 workflows | 28 labels | 2 docs | ✅ COMPLETE |
| **operator-engine** | Python/FastAPI | 21 tests (pytest) | 3 workflows | 40+ labels | 2 docs | ✅ COMPLETE |
| **blackroad-os-web** | Minimal (README only) | N/A | N/A | N/A | N/A | 📝 DOCUMENTED |
| **blackroad-os-packs** | NOT FOUND | N/A | N/A | N/A | N/A | ❌ DOES NOT EXIST |

**Total Tests Created:** 74+ tests across 5 repos
**Total Workflows:** 20 GitHub Actions workflows
**Total Coverage:** 4.92% to 82.72% depending on repo maturity

---

## 🎯 PATTERN #1: REPOSITORY STRUCTURE

### For All Repos (Universal)

```
repo-name/
├── .github/
│   ├── workflows/
│   │   ├── test.yml                    # Test runner
│   │   ├── lint.yml                    # Code quality
│   │   ├── build.yml                   # Build verification
│   │   └── auto-labeler.yml            # PR auto-labeling
│   ├── labels.yml                      # Label definitions
│   └── labeler.yml                     # Auto-label rules
│
├── docs/
│   ├── testing.md                      # Testing guide
│   └── ci-workflows.md                 # CI/CD documentation
│
├── tests/ or __tests__/
│   └── (test files per stack)
│
├── README.md                           # (Updated with Testing & Contributing)
└── (test config: jest.config.js, pytest.ini, etc.)
```

---

## 🎯 PATTERN #2: TEST SETUP BY STACK

### TypeScript/Node.js (Core, API)

**package.json additions:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@types/jest": "^29.5.12",
    "@types/supertest": "^6.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.4",
    "ts-jest": "^29.1.2"
  }
}
```

**jest.config.js:**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  coverageThreshold: {
    global: { statements: 80, branches: 75, functions: 80, lines: 80 }
  }
};
```

**Test file example:**
```typescript
// tests/health.test.ts
import request from 'supertest';
import app from '../src/app';

describe('Health Endpoint', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
```

---

### Next.js/React (Prism Console)

**package.json additions:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "devDependencies": {
    "@testing-library/react": "^14.2.1",
    "@testing-library/jest-dom": "^6.2.0",
    "@types/jest": "^29.5.12",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  }
}
```

**jest.config.js:**
```javascript
const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

module.exports = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' }
});
```

**jest.setup.js:**
```javascript
import '@testing-library/jest-dom';
```

**Test file example:**
```typescript
// tests/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

### Python (Operator Engine)

**requirements.txt additions:**
```
pytest>=7.4.0
pytest-cov>=4.1.0
pytest-asyncio>=0.21.0
```

**pytest.ini:**
```ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts =
    --verbose
    --cov=.
    --cov-report=term-missing
    --cov-report=html
    --cov-fail-under=40
markers =
    unit: Unit tests
    integration: Integration tests
```

**Test file example:**
```python
# tests/test_health.py
import pytest
from httpx import AsyncClient, ASGITransport
from server import app

@pytest.mark.asyncio
async def test_health_check():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"
```

---

### Infra/Config Repos (Infra)

**package.json:**
```json
{
  "scripts": {
    "test": "node tests/run-all-tests.js",
    "test:docs": "node tests/validate-docs.js",
    "test:configs": "node tests/validate-configs.js",
    "test:structure": "node tests/validate-structure.js"
  },
  "devDependencies": {
    "glob": "^10.3.10",
    "js-yaml": "^4.1.0",
    "markdown-link-check": "^3.12.1",
    "markdownlint-cli": "^0.39.0"
  }
}
```

**Validation script example:**
```javascript
// tests/validate-docs.js
const fs = require('fs');
const { globSync } = require('glob');

const markdownFiles = globSync('**/*.md', {
  ignore: ['node_modules/**', '.git/**']
});

markdownFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  if (!content.includes('#')) {
    console.error(`${file}: Missing headers`);
    process.exit(1);
  }
});

console.log('✅ All documentation valid');
```

---

## 🎯 PATTERN #3: GITHUB ACTIONS WORKFLOWS

### Test Workflow (test.yml)

**For Node.js/TypeScript:**
```yaml
name: Tests

on:
  pull_request:
    branches: [main, develop, staging]
  push:
    branches: [main, develop]

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Test Summary
        if: always()
        run: |
          echo "### Test Results 🧪" >> $GITHUB_STEP_SUMMARY
```

**For Python:**
```yaml
name: Tests

on:
  pull_request:
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.9', '3.10', '3.11', '3.12']

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run tests
        run: pytest --cov --cov-report=xml

      - name: Upload coverage
        uses: codecov/codecov-action@v4
```

---

### Lint Workflow (lint.yml)

```yaml
name: Lint

on:
  pull_request:
  push:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run Type Check
        run: npm run type-check
```

---

### Build Workflow (build.yml)

```yaml
name: Build

on:
  pull_request:
  push:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Verify build output
        run: |
          if [ ! -d "dist" ]; then
            echo "Build failed: dist directory not found"
            exit 1
          fi
```

---

### Auto-Labeler Workflow (auto-labeler.yml)

```yaml
name: Auto Label PRs

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  label:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/labeler@v5
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          configuration-path: .github/labeler.yml
```

---

## 🎯 PATTERN #4: GITHUB LABELS

### Universal Label Taxonomy

**labels.yml structure:**
```yaml
# Team Labels
- name: 'team:infra'
  color: '0E8A16'
  description: 'Infrastructure and DevOps'

- name: 'team:backend'
  color: '0E8A16'
  description: 'Backend services'

- name: 'team:frontend'
  color: '0E8A16'
  description: 'Frontend/UI'

# Area Labels
- name: 'area:api'
  color: 'D4C5F9'
  description: 'API and routes'

- name: 'area:tests'
  color: 'D4C5F9'
  description: 'Testing infrastructure'

# Type Labels
- name: 'type:feature'
  color: 'FBCA04'
  description: 'New feature'

- name: 'type:bugfix'
  color: 'D93F0B'
  description: 'Bug fix'

- name: 'type:docs'
  color: 'FBCA04'
  description: 'Documentation'

# Priority Labels
- name: 'priority:critical'
  color: 'D93F0B'
  description: 'Critical priority'

- name: 'priority:high'
  color: 'FBCA04'
  description: 'High priority'

# Status Labels
- name: 'status:needs-review'
  color: 'F9D0C4'
  description: 'Needs code review'

- name: 'status:blocked'
  color: 'D93F0B'
  description: 'Blocked by dependency'
```

---

### Auto-Labeler Rules

**labeler.yml structure:**
```yaml
# Area-based labeling
'area:api':
  - 'src/routes/**/*'
  - 'src/api/**/*'

'area:database':
  - 'prisma/**/*'
  - '**/migrations/**/*'

'area:tests':
  - 'tests/**/*'
  - '**/*.test.ts'
  - '**/*.spec.ts'

# Type-based labeling
'type:docs':
  - '**/*.md'
  - 'docs/**/*'

'type:deps':
  - 'package.json'
  - 'package-lock.json'
  - 'requirements.txt'
```

---

## 🎯 PATTERN #5: DOCUMENTATION

### testing.md Template

```markdown
# Testing Guide

## Overview

[Brief description of test framework and philosophy]

## Running Tests Locally

### Install Dependencies
\`\`\`bash
npm install  # or pip install -r requirements.txt
\`\`\`

### Run All Tests
\`\`\`bash
npm test  # or pytest
\`\`\`

### Run Specific Tests
\`\`\`bash
npm test -- health.test.ts  # or pytest tests/test_health.py
\`\`\`

### Generate Coverage
\`\`\`bash
npm run test:coverage  # or pytest --cov --cov-report=html
\`\`\`

## Test Structure

[Describe test organization: unit, integration, e2e]

## Writing Tests

### Example Test
[Provide starter example]

### Best Practices
- Test one thing at a time
- Use descriptive test names
- Mock external dependencies
- Aim for 80%+ coverage

## CI/CD Integration

Tests run automatically on:
- Pull requests (all branches)
- Push to main/develop

## Debugging Test Failures

[Common issues and solutions]
```

---

### ci-workflows.md Template

```markdown
# CI/CD Workflows

## Overview

This repository uses GitHub Actions for continuous integration.

## Workflows

### 1. Tests (test.yml)
**Triggers:** PRs, push to main/develop
**Actions:** Install deps → Run tests → Report results
**Status:** ✅ Required

### 2. Lint (lint.yml)
**Triggers:** PRs, push to main/develop
**Actions:** ESLint → Type check → Report
**Status:** ✅ Required

### 3. Build (build.yml)
**Triggers:** PRs, push to main/develop
**Actions:** Build → Verify output → Archive
**Status:** ✅ Required

### 4. Auto-Label (auto-labeler.yml)
**Triggers:** PR opened/updated
**Actions:** Apply labels based on file changes
**Status:** ✅ Active

## Required Secrets

[List any secrets needed for workflows]

## Debugging Workflows

1. Click "Details" on failed check
2. Expand failed step
3. Review error messages
4. Fix locally and push

## Modifying Workflows

[Guidelines for changing workflows]
```

---

### README.md Additions

Add these sections to every repo README:

```markdown
## Testing

This repository includes automated tests.

### Run Tests

\`\`\`bash
npm install
npm test
\`\`\`

### CI/CD

Tests run automatically on pull requests. All checks must pass before merging.

See [Testing Guide](./docs/testing.md) and [CI/CD Workflows](./docs/ci-workflows.md).

---

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Make changes and add tests
4. Run tests locally (\`npm test\`)
5. Commit with descriptive message
6. Push and create pull request

### Code Standards

- **Linting:** Run \`npm run lint\` before committing
- **Type Safety:** Run \`npm run type-check\`
- **Tests:** Add tests for new features
- **Coverage:** Maintain 80%+ test coverage

### Pull Request Guidelines

- Clear description of changes
- Link related issues
- All CI checks must pass
- Request review from relevant team
```

---

## 🎯 PATTERN #6: QUICK START CHECKLIST

### For New Repos

**Phase 1: Test Setup (30 mins)**
- [ ] Add test framework dependencies to package.json/requirements.txt
- [ ] Create test config (jest.config.js, pytest.ini, etc.)
- [ ] Create tests/ directory
- [ ] Write 3-5 basic tests (health, routes, config)
- [ ] Run tests locally and verify passing

**Phase 2: CI/CD (30 mins)**
- [ ] Create .github/workflows/ directory
- [ ] Add test.yml workflow
- [ ] Add lint.yml workflow
- [ ] Add build.yml workflow
- [ ] Add auto-labeler.yml workflow

**Phase 3: Labels (15 mins)**
- [ ] Create .github/labels.yml with label taxonomy
- [ ] Create .github/labeler.yml with auto-label rules
- [ ] Sync labels to GitHub (manually or via workflow)

**Phase 4: Documentation (30 mins)**
- [ ] Create docs/ directory
- [ ] Write docs/testing.md
- [ ] Write docs/ci-workflows.md
- [ ] Update README.md with Testing and Contributing sections

**Phase 5: Verification (15 mins)**
- [ ] Push changes to GitHub
- [ ] Create test PR to verify workflows run
- [ ] Verify auto-labeling works
- [ ] Check all workflows pass

**Total Time: ~2 hours per repo**

---

## 🎯 PATTERN #7: STACK-SPECIFIC GOTCHAS

### TypeScript/Node.js
- ⚠️ Use `npm ci` in CI, not `npm install`
- ⚠️ Add `dist/` and `coverage/` to .gitignore
- ⚠️ Mock Prisma client for database tests
- ⚠️ Use `supertest` for API endpoint testing

### Next.js/React
- ⚠️ Use `--legacy-peer-deps` if React 19 causes issues
- ⚠️ Create `jest.setup.js` for `@testing-library/jest-dom`
- ⚠️ Add `jest.d.ts` for TypeScript types
- ⚠️ Mock Next.js router in tests

### Python
- ⚠️ Pin pytest version for consistency
- ⚠️ Use `pytest-asyncio` for async tests
- ⚠️ Use `ASGITransport` for httpx AsyncClient (not `app=` directly)
- ⚠️ Set coverage threshold in pytest.ini

### Infra/Config Repos
- ⚠️ Validate YAML/JSON syntax, not just file existence
- ⚠️ Check for broken internal markdown links
- ⚠️ Use `js-yaml` for YAML parsing (not Python)
- ⚠️ Test runbooks have required sections

---

## 🎯 SUCCESS METRICS

### Per Repo

✅ **Test Coverage:** 40-80% depending on repo maturity
✅ **Test Count:** Minimum 10 tests covering core functionality
✅ **Workflows:** 4+ GitHub Actions workflows
✅ **Labels:** 16-40 labels for organization
✅ **Docs:** 2+ documentation files (testing.md, ci-workflows.md)
✅ **README:** Updated with Testing and Contributing sections

### Organization-Wide

✅ **Consistency:** Same patterns across all repos
✅ **Automation:** Auto-labeling on all PRs
✅ **Quality Gates:** All PRs require passing tests
✅ **Documentation:** Every repo has clear testing guide
✅ **Maintainability:** Easy for new contributors to add tests

---

## 🎯 PATTERN EVOLUTION

### Current Version: v1.0 (2025-11-25)

**Implemented in:**
- blackroad-os-infra
- blackroad-os-core
- blackroad-os-api
- blackroad-os-prism-console
- operator-engine (Python variant)

**Future Enhancements:**
- Add E2E testing pattern (Playwright/Cypress)
- Add performance testing pattern (k6/Artillery)
- Add security scanning workflows (Snyk/Trivy)
- Add auto-dependency updates (Dependabot/Renovate)
- Add release automation (semantic-release)

---

## 🎯 QUICK COPY-PASTE SCRIPTS

### Create Basic Test Structure (Node.js)

```bash
# Run this in repo root
mkdir -p tests/unit docs .github/workflows

# Copy from another repo or use templates above
cp ../blackroad-os-core/jest.config.js .
cp ../blackroad-os-core/tests/unit/health.test.ts tests/unit/
cp -r ../blackroad-os-core/.github/workflows/* .github/workflows/
cp -r ../blackroad-os-core/.github/labels.yml .github/
cp -r ../blackroad-os-core/.github/labeler.yml .github/
cp ../blackroad-os-core/docs/* docs/

# Update package.json (manually or with jq)
npm install --save-dev @types/jest jest supertest ts-jest @types/supertest

# Run tests
npm test
```

### Create Basic Test Structure (Python)

```bash
# Run this in repo root
mkdir -p tests docs .github/workflows

# Copy from operator_engine
cp ../BlackRoad-Operating-System/operator_engine/pytest.ini .
cp ../BlackRoad-Operating-System/operator_engine/tests/test_health.py tests/
cp -r ../BlackRoad-Operating-System/.github/workflows/operator-engine-tests.yml .github/workflows/tests.yml

# Install deps
pip install pytest pytest-cov pytest-asyncio

# Run tests
pytest
```

---

## END OF MASTER PATTERN GUIDE

**Questions?** See individual repo docs/ directories for implementation-specific details.

**Need help?** Reference this guide when setting up new repos or updating existing ones.

**Updates?** Add lessons learned to this document as patterns evolve.
