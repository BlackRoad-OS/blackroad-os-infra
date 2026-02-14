# Infrastructure Tests

This document explains the test suite for `blackroad-os-infra`.

## Test Overview

The infra repo includes automated tests to ensure:
- Documentation is valid and free of broken links
- Configuration files (YAML/JSON/TOML) have valid syntax
- Repository structure follows expected layout
- Runbooks meet minimum quality standards

## Running Tests Locally

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Individual Test Suites
```bash
npm run test:docs        # Validate documentation
npm run test:configs     # Validate config files
npm run test:structure   # Check repo structure
npm run test:runbooks    # Validate runbooks
```

### Lint Markdown
```bash
npm run lint:md
```

## Test Suites

### 1. Documentation Validation (`test:docs`)
**What it checks:**
- All markdown files exist
- Internal links point to valid files
- Documents have proper header structure

**Common failures:**
- Broken relative links (fix the path in the markdown)
- Missing header (add `#` title to the file)

### 2. Configuration Validation (`test:configs`)
**What it checks:**
- All YAML files parse correctly
- All JSON files are valid JSON
- TOML files are non-empty

**Common failures:**
- YAML syntax errors (check indentation, colons, dashes)
- JSON syntax errors (missing commas, trailing commas, unquoted keys)

### 3. Structure Validation (`test:structure`)
**What it checks:**
- Required directories exist (`docs/`, `runbooks/`, `environments/`, `dns/`)
- Required files exist (`README.md`, `runbooks/deployments.md`, etc.)

**Common failures:**
- Renamed or moved directories (restore or update test expectations)
- Deleted required files (restore or update structure)

### 4. Runbook Validation (`test:runbooks`)
**What it checks:**
- Runbooks have title headers (`#`)
- Runbooks have section headers (`##`)
- Runbooks meet minimum length (> 100 chars)

**Common failures:**
- Empty or stub runbooks (flesh out content)
- Missing headers (add proper markdown structure)

## CI/CD Integration

Tests run automatically on:
- **Pull Requests**: All tests must pass before merge
- **Push to `main`**: Validates main branch integrity

See [CI/CD Workflows](./ci-workflows.md) for details.

## Debugging Test Failures

### Local Testing
```bash
# Run tests with verbose output
npm test 2>&1 | tee test-output.log
```

### CI Failures
1. Click "Details" next to the failing check in your PR
2. Expand the failed step in GitHub Actions
3. Look for error messages (file paths, line numbers)
4. Fix the issue locally and push

### Common Issues

**"Broken link to..."**
- Fix: Update the markdown link to point to the correct file

**"Missing required section"**
- Fix: Add proper headers (`#`, `##`) to your runbook

**"Invalid YAML"**
- Fix: Check indentation (use spaces, not tabs) and syntax

**"Missing directory: environments"**
- Fix: Ensure required directories exist (don't delete them)
