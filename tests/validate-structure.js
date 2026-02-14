#!/usr/bin/env node
/**
 * Validates repository structure
 * Ensures required directories and files exist
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const errors = [];

console.log('📁 Validating repository structure...\n');

// Required structure
const requiredPaths = [
  { path: 'README.md', type: 'file' },
  { path: 'docs', type: 'directory' },
  { path: 'runbooks', type: 'directory' },
  { path: 'environments', type: 'directory' },
  { path: 'dns', type: 'directory' },
  { path: 'runbooks/deployments.md', type: 'file' },
  { path: 'runbooks/incidents.md', type: 'file' }
];

requiredPaths.forEach(({ path: requiredPath, type }) => {
  const fullPath = path.join(ROOT_DIR, requiredPath);

  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing ${type}: ${requiredPath}`);
    return;
  }

  const stat = fs.statSync(fullPath);
  if (type === 'file' && !stat.isFile()) {
    errors.push(`Expected file but found directory: ${requiredPath}`);
  } else if (type === 'directory' && !stat.isDirectory()) {
    errors.push(`Expected directory but found file: ${requiredPath}`);
  } else {
    console.log(`✓ ${requiredPath}`);
  }
});

// Report results
if (errors.length === 0) {
  console.log('\n✅ Repository structure valid');
  process.exit(0);
} else {
  console.error('\n❌ Structure validation failed:\n');
  errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}
