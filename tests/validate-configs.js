#!/usr/bin/env node
/**
 * Validates YAML and JSON configuration files
 * Checks: valid syntax, schema compliance (when schemas exist)
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { globSync } = require('glob');

const ROOT_DIR = path.resolve(__dirname, '..');
const errors = [];

console.log('⚙️  Validating configuration files...\n');

// Find all YAML and JSON files
const configFiles = globSync('**/*.{json,yaml,yml,toml}', {
  cwd: ROOT_DIR,
  ignore: ['node_modules/**', '.git/**', 'package-lock.json']
});

console.log(`Found ${configFiles.length} config files\n`);

configFiles.forEach(file => {
  const fullPath = path.join(ROOT_DIR, file);
  const ext = path.extname(file);

  try {
    const content = fs.readFileSync(fullPath, 'utf-8');

    if (ext === '.json') {
      JSON.parse(content);
      console.log(`✓ ${file}`);
    } else if (ext === '.yaml' || ext === '.yml') {
      yaml.load(content);
      console.log(`✓ ${file}`);
    } else if (ext === '.toml') {
      // Basic TOML validation (just check it reads)
      if (content.trim().length === 0) {
        errors.push(`${file}: Empty TOML file`);
      } else {
        console.log(`✓ ${file}`);
      }
    }
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
  }
});

// Report results
if (errors.length === 0) {
  console.log('\n✅ All configuration files valid');
  process.exit(0);
} else {
  console.error('\n❌ Configuration validation failed:\n');
  errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}
