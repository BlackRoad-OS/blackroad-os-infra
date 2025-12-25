#!/usr/bin/env ts-node
/**
 * Render org capacity data as ASCII dashboard
 * Usage: npm run render:capacity [input.json]
 */

import fs from 'fs';
import path from 'path';

interface OrgCapacitySignal {
  signal: 'headcount' | 'focus_time' | 'wip_load' | 'blocked' | 'priority' | 'comms_health' | 'momentum';
  status: 'good' | 'watch' | 'bad' | 'empty';
  value?: number;
  notes?: string;
  trend?: 'up' | 'stable' | 'down';
}

interface TeamCapacity {
  team: string;
  overallStatus: 'good' | 'watch' | 'bad' | 'empty';
  signals: OrgCapacitySignal[];
}

interface OrgCapacityDashboard {
  org: string;
  week: string;
  status: 'good' | 'watch' | 'bad';
  updated_at: string;
  metadata?: {
    collector?: string;
    notes?: string;
    trend?: 'improving' | 'stable' | 'declining';
  };
  teams: TeamCapacity[];
}

const statusEmoji = {
  good: '🟢',
  watch: '🟡',
  bad: '🔴',
  empty: '⚪️'
};

const overallStatusEmoji = {
  good: '🟢',
  watch: '🟡',
  bad: '🔴'
};

const signalLabels = {
  headcount: '👥 Headcount    ',
  focus_time: '🧠 Focus time   ',
  wip_load: '⚙️ WIP load     ',
  blocked: '🧱 Blocked      ',
  priority: '🔥 Priority     ',
  comms_health: '📣 Comms health ',
  momentum: '✨ Momentum     '
};

const signalOrder: Array<keyof typeof signalLabels> = [
  'headcount',
  'focus_time',
  'wip_load',
  'blocked',
  'priority',
  'comms_health',
  'momentum'
];

// Constants for rendering
const TEAM_NAME_WIDTH = 16;
const SIGNAL_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;

function renderDashboard(data: OrgCapacityDashboard): string {
  const lines: string[] = [];
  
  // Header
  lines.push(`🏢 ORG CAPACITY DASHBOARD: ${data.org}   📅 WEEK: ${data.week}   🚦 STATUS: ${overallStatusEmoji[data.status]}`);
  lines.push('');
  lines.push('🧭 1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣');
  lines.push('');
  
  // Aggregate signals across teams
  const signalAggregates: Record<string, string[]> = {};
  signalOrder.forEach(signal => {
    signalAggregates[signal] = data.teams.map(team => {
      const sig = team.signals.find(s => s.signal === signal);
      return statusEmoji[sig?.status || 'empty'];
    });
  });
  
  // Display signals with labels
  signalOrder.forEach((signal, idx) => {
    const label = SIGNAL_LABELS[idx];
    const line = `${label}) ${signalLabels[signal]} ${signalAggregates[signal].join('')}`;
    
    // Add special notes for bad signals
    const badCount = signalAggregates[signal].filter(s => s === '🔴').length;
    if (badCount > 0) {
      lines.push(line + '   😭');
    } else {
      lines.push(line);
    }
  });
  
  lines.push('');
  lines.push(`👥 TEAM GRID (${data.teams.length})`);
  
  // Team rows
  data.teams.forEach(team => {
    const teamSignals = signalOrder.map(signal => {
      const sig = team.signals.find(s => s.signal === signal);
      return statusEmoji[sig?.status || 'empty'];
    });
    
    // Pad team name to fixed width
    const paddedName = (team.team + ' ').padEnd(TEAM_NAME_WIDTH, '_');
    lines.push(`${paddedName}   ${teamSignals.join('')}`);
  });
  
  return lines.join('\n');
}

function main() {
  const args = process.argv.slice(2);
  const inputFile = args[0] || path.join(__dirname, '..', 'docs', 'examples', 'org.capacity.sample.json');
  
  if (!fs.existsSync(inputFile)) {
    console.error(`Error: File not found: ${inputFile}`);
    process.exit(1);
  }
  
  const content = fs.readFileSync(inputFile, 'utf-8');
  const data: OrgCapacityDashboard = JSON.parse(content);
  
  const rendered = renderDashboard(data);
  console.log(rendered);
}

main();
