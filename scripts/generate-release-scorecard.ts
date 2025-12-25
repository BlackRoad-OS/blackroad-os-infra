#!/usr/bin/env ts-node
/**
 * Release Readiness Scorecard Generator
 * 
 * Generates a release readiness scorecard with 7 categories and 7 bars each.
 * Can be used to create new scorecards or update existing ones.
 */

import * as fs from 'fs';
import * as path from 'path';

// Status emoji types
type StatusEmoji = '🟢' | '🟡' | '🔴' | '⚪️';

interface CategoryScore {
  name: string;
  icon: string;
  bars: StatusEmoji[];
}

interface ScorecardConfig {
  version?: string;
  status?: '🟢' | '🟡' | '🔴';
  releaseReadiness?: string;
  categories: CategoryScore[];
  finalCall?: 'GO' | 'HOLD' | 'NO';
}

// Default categories
const DEFAULT_CATEGORIES: Omit<CategoryScore, 'bars'>[] = [
  { name: 'Docs', icon: '📚' },
  { name: 'Build', icon: '💻' },
  { name: 'Tests', icon: '🧪' },
  { name: 'Security', icon: '🔐' },
  { name: 'Comms', icon: '📣' },
  { name: 'Deploy', icon: '🚀' },
  { name: 'Sign-off', icon: '✅' },
];

/**
 * Generate a scorecard with specified configuration
 */
function generateScorecard(config: Partial<ScorecardConfig> = {}): string {
  const version = config.version || '________';
  const status = config.status || '🟡';
  const releaseReadiness = config.releaseReadiness || '____________________';
  const finalCall = config.finalCall || null;

  // Initialize categories with default bars if not provided
  const categories: CategoryScore[] = (config.categories || DEFAULT_CATEGORIES.map(cat => ({
    ...cat,
    bars: Array(7).fill('⚪️') as StatusEmoji[]
  })));

  // Build the scorecard text
  let output = '# 🧩 EXAMPLES PACK v40 (release readiness scorecard) — 7 categories × 7 bars\n\n';
  output += 'Legend: 🟢 ready  🟡 caution  🔴 not ready  ⚪️ empty\n\n';
  output += `✅ RELEASE READINESS: ${releaseReadiness}   📦 VERSION: ${version}   🚦 STATUS: ${status}\n`;
  output += '🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣\n\n';

  // Add each category
  categories.forEach(cat => {
    const barsStr = cat.bars.join('');
    output += `${cat.icon} ${cat.name.padEnd(10)} ${barsStr}\n`;
  });

  output += '\n🏁 FINAL CALL\n';
  
  // Mark the final call
  const goMarkers = finalCall === 'GO' ? '✅✅✅✅✅✅✅' : '⏸⏸⏸⏸⏸⏸⏸';
  const holdMarkers = finalCall === 'HOLD' ? '✅✅✅✅✅✅✅' : '⏸⏸⏸⏸⏸⏸⏸';
  const noMarkers = finalCall === 'NO' ? '✅✅✅✅✅✅✅' : '❌❌❌❌❌❌❌';
  
  output += `🟢 GO   ${goMarkers}\n`;
  output += `🟡 HOLD ${holdMarkers}\n`;
  output += `🔴 NO   ${noMarkers}\n`;

  return output;
}

/**
 * Parse command line arguments and generate scorecard
 */
function main() {
  const args = process.argv.slice(2);
  
  // Parse arguments
  const config: Partial<ScorecardConfig> = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--version' && i + 1 < args.length) {
      config.version = args[++i];
    } else if (arg === '--status' && i + 1 < args.length) {
      const statusArg = args[++i];
      if (statusArg === 'green' || statusArg === '🟢') config.status = '🟢';
      else if (statusArg === 'yellow' || statusArg === '🟡') config.status = '🟡';
      else if (statusArg === 'red' || statusArg === '🔴') config.status = '🔴';
    } else if (arg === '--readiness' && i + 1 < args.length) {
      config.releaseReadiness = args[++i];
    } else if (arg === '--call' && i + 1 < args.length) {
      const callArg = args[++i].toUpperCase();
      if (callArg === 'GO' || callArg === 'HOLD' || callArg === 'NO') {
        config.finalCall = callArg as 'GO' | 'HOLD' | 'NO';
      }
    } else if (arg === '--output' && i + 1 < args.length) {
      const outputPath = args[++i];
      const scorecard = generateScorecard(config);
      fs.writeFileSync(outputPath, scorecard, 'utf-8');
      console.log(`✅ Scorecard written to: ${outputPath}`);
      return;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      return;
    }
  }
  
  // Default: print to stdout
  const scorecard = generateScorecard(config);
  console.log(scorecard);
}

function printHelp() {
  console.log(`
Release Readiness Scorecard Generator

Usage: ts-node scripts/generate-release-scorecard.ts [options]

Options:
  --version <version>        Set the release version (e.g., v1.2.0)
  --status <status>          Set overall status: green/🟢, yellow/🟡, red/🔴
  --readiness <text>         Set readiness summary text
  --call <decision>          Set final call: GO, HOLD, or NO
  --output <path>            Write to file instead of stdout
  --help, -h                 Show this help message

Examples:
  # Generate a blank scorecard
  npm run scorecard:generate

  # Generate scorecard for v1.2.0 with green status
  npm run scorecard:generate -- --version v1.2.0 --status green

  # Generate scorecard with final GO decision
  npm run scorecard:generate -- --version v1.2.0 --call GO

  # Write scorecard to file
  npm run scorecard:generate -- --output release-v1.2.0-scorecard.md

For manual editing, use the template at: templates/RELEASE_READINESS_SCORECARD.md
  `);
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { generateScorecard, CategoryScore, ScorecardConfig, StatusEmoji };
