#!/usr/bin/env ts-node
/**
 * Progress Bar Demo
 * =================
 * Demonstrates all progress bar visualization capabilities
 */

import {
  generateChecklistBars,
  generateStatusBars,
  triangleShape,
  diamondShape,
  formatSection
} from '../cli/src/progress-bars';

function main() {
  console.log('\n✅ CHECKLIST BARS (10)\n');
  const checklistBars = generateChecklistBars(7);
  checklistBars.forEach(bar => console.log(bar));
  
  console.log('\n🚦 STATUS BARS (10)\n');
  const statusBars = generateStatusBars(7);
  statusBars.forEach(bar => console.log(bar));
  
  console.log('\n📊 SIMPLE SHAPES (10)\n');
  
  // Empty triangle
  console.log(triangleShape(0, 4).join('\n'));
  console.log();
  
  // Half-filled triangle
  console.log(triangleShape(0.5, 4).join('\n'));
  console.log();
  
  // Empty diamond
  console.log(diamondShape(0, 3).join('\n'));
  console.log();
  
  // Half-filled diamond
  console.log(diamondShape(0.5, 3).join('\n'));
  console.log();
  
  // Full diamond
  console.log(diamondShape(1, 3).join('\n'));
  
  console.log();
}

if (require.main === module) {
  main();
}
