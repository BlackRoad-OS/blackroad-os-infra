#!/usr/bin/env node
/**
 * Master test runner for blackroad-os-infra
 * Runs all validation tests in sequence
 */

const { execSync } = require('child_process');
const path = require('path');

const tests = [
  { name: 'Documentation Validation', script: 'test:docs' },
  { name: 'Config File Validation', script: 'test:configs' },
  { name: 'Repository Structure', script: 'test:structure' },
  { name: 'Runbook Completeness', script: 'test:runbooks' }
];

let failures = 0;

console.log('\n🧪 BlackRoad OS Infra - Test Suite\n');
console.log('='.repeat(50));

tests.forEach(test => {
  console.log(`\n▶️  Running: ${test.name}`);
  console.log('-'.repeat(50));

  try {
    execSync(`npm run ${test.script}`, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
    });
    console.log(`✅ PASSED: ${test.name}`);
  } catch (error) {
    console.error(`❌ FAILED: ${test.name}`);
    failures++;
  }
});

console.log('\n' + '='.repeat(50));
if (failures === 0) {
  console.log('✅ All tests passed!');
  process.exit(0);
} else {
  console.error(`❌ ${failures} test suite(s) failed`);
  process.exit(1);
}
