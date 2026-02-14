#!/usr/bin/env node
/**
 * Validates all markdown documentation
 * Checks: file existence, internal links, basic structure
 */

const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const ROOT_DIR = path.resolve(__dirname, '..');
const errors = [];

console.log('📝 Validating documentation...\n');

// Find all markdown files
const markdownFiles = globSync('**/*.md', {
  cwd: ROOT_DIR,
  ignore: ['node_modules/**', '.git/**']
});

console.log(`Found ${markdownFiles.length} markdown files\n`);

// Validate each markdown file
markdownFiles.forEach(file => {
  const fullPath = path.join(ROOT_DIR, file);
  const content = fs.readFileSync(fullPath, 'utf-8');

  // Check for basic structure
  if (!content.includes('#')) {
    errors.push(`${file}: Missing headers`);
  }

  // Check internal links (basic validation)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const linkText = match[1];
    const linkTarget = match[2];

    // Skip external links and anchors
    if (linkTarget.startsWith('http') || linkTarget.startsWith('#')) {
      continue;
    }

    // Validate internal file links
    const linkedFilePath = path.resolve(path.dirname(fullPath), linkTarget.split('#')[0]);
    if (!fs.existsSync(linkedFilePath)) {
      errors.push(`${file}: Broken link to ${linkTarget}`);
    }
  }
});

// Report results
if (errors.length === 0) {
  console.log('✅ All documentation valid');
  process.exit(0);
} else {
  console.error('❌ Documentation validation failed:\n');
  errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}
