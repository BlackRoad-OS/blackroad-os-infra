#!/usr/bin/env node
/**
 * Governance Approvals Board Renderer
 * 
 * Reads and displays the governance-approvals-v32 data in a formatted way.
 * Can be used for CLI displays, reports, or integration testing.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GOVERNANCE_FILE = path.join(__dirname, '..', 'docs', 'examples', 'governance-approvals-v32.json');

/**
 * Load the governance data
 */
function loadGovernanceData() {
  const data = fs.readFileSync(GOVERNANCE_FILE, 'utf-8');
  return JSON.parse(data);
}

/**
 * Render the complete board
 */
function renderBoard(data) {
  console.log('\n' + data.visualization.header);
  console.log(data.visualization.legend);
  console.log('');
  
  data.visualization.board.forEach(line => {
    console.log(line);
  });
  
  console.log('');
}

/**
 * Get summary statistics
 */
function getSummary(data) {
  const stats = {
    totalPolicies: data.policies.length,
    totalGates: data.gates.length,
    byStatus: {
      'in-progress': 0,
      'pending': 0,
      'rejected': 0,
      'not-started': 0,
      'completed': 0
    },
    gateProgress: {}
  };
  
  // Count policies by status
  data.policies.forEach(policy => {
    const status = policy.overallStatus;
    if (stats.byStatus[status] !== undefined) {
      stats.byStatus[status]++;
    }
  });
  
  // Count approved gates per gate ID
  data.gates.forEach(gate => {
    const gateId = gate.id;
    const approved = data.policies.filter(p => 
      p.gateStatuses[gateId - 1]?.status === 'approved'
    ).length;
    stats.gateProgress[gate.name] = `${approved}/${data.policies.length}`;
  });
  
  return stats;
}

/**
 * Display summary statistics
 */
function displaySummary(data) {
  const summary = getSummary(data);
  
  console.log('📊 SUMMARY');
  console.log('─'.repeat(50));
  console.log(`Total Policies: ${summary.totalPolicies}`);
  console.log(`Total Gates: ${summary.totalGates}`);
  console.log('');
  console.log('Policy Status:');
  console.log(`  In Progress: ${summary.byStatus['in-progress']}`);
  console.log(`  Pending: ${summary.byStatus['pending']}`);
  console.log(`  Rejected: ${summary.byStatus['rejected']}`);
  console.log(`  Not Started: ${summary.byStatus['not-started']}`);
  console.log('');
  console.log('Gate Progress (Approved/Total):');
  Object.entries(summary.gateProgress).forEach(([gate, progress]) => {
    console.log(`  ${gate}: ${progress}`);
  });
  console.log('');
}

/**
 * Display policy details
 */
function displayPolicyDetails(data, policyId) {
  const policy = data.policies.find(p => p.id === policyId);
  
  if (!policy) {
    console.error(`❌ Policy ${policyId} not found`);
    return;
  }
  
  console.log(`\n${policy.icon} ${policy.name}`);
  console.log('─'.repeat(50));
  console.log(`Description: ${policy.description}`);
  console.log(`Overall Status: ${policy.overallStatus}`);
  if (policy.failureNote) {
    console.log(`Note: ${policy.failureNote}`);
  }
  console.log('');
  console.log('Gate Progress:');
  
  policy.gateStatuses.forEach((status, idx) => {
    const gate = data.gates[idx];
    const statusLabel = data.statusIndicators[status.status]?.label || status.status;
    console.log(`  ${gate.icon} ${gate.name.padEnd(10)} ${status.emoji} ${statusLabel}`);
  });
  console.log('');
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  try {
    const data = loadGovernanceData();
    
    if (command === 'summary') {
      displaySummary(data);
    } else if (command === 'policy') {
      const policyId = args[1] || 'Policy-01';
      displayPolicyDetails(data, policyId);
    } else if (command === 'json') {
      console.log(JSON.stringify(data, null, 2));
    } else {
      // Default: display board
      renderBoard(data);
      
      if (args.includes('--summary')) {
        displaySummary(data);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// Export for use as module
export { loadGovernanceData, renderBoard, getSummary, displaySummary, displayPolicyDetails };
