#!/usr/bin/env node
/**
 * Validates runbooks follow required template
 * Checks for required sections and metadata
 */

const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const ROOT_DIR = path.resolve(__dirname, '..');
const errors = [];

console.log('📖 Validating runbooks...\n');

// Find all runbooks
const runbooks = globSync('runbooks/**/*.md', {
  cwd: ROOT_DIR,
  ignore: ['**/README.md']
});

console.log(`Found ${runbooks.length} runbooks\n`);

// Required sections for runbooks
const requiredSections = [
  '# ',  // Must have a title
  '## '  // Must have at least one section
];

runbooks.forEach(file => {
  const fullPath = path.join(ROOT_DIR, file);
  const content = fs.readFileSync(fullPath, 'utf-8');

  requiredSections.forEach(section => {
    if (!content.includes(section)) {
      errors.push(`${file}: Missing required section pattern "${section}"`);
    }
  });

  // Check minimum length (avoid empty runbooks)
  if (content.length < 100) {
    errors.push(`${file}: Runbook too short (< 100 chars)`);
  } else {
    console.log(`✓ ${file}`);
  }
});

// Report results
if (errors.length === 0) {
  console.log('\n✅ All runbooks valid');
  process.exit(0);
} else {
  console.error('\n❌ Runbook validation failed:\n');
  errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}
