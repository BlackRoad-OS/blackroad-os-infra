/**
 * Swimlane Kanban Chart Generator
 * Generates 5 different chart visualizations for pods/teams
 */

import {
  PodData,
  PodGanttData,
  PodCountBarData,
  Task,
  GanttTask,
  TaskStatus,
  Mood,
} from './types';

/**
 * Convert task status to emoji representation
 */
function statusToEmoji(status: TaskStatus): string {
  switch (status) {
    case 'green': return '🟢';
    case 'red': return '🟥';
    case 'white': return '⚪️';
    case 'empty': return '⬜️';
  }
}

/**
 * Convert count to bar emoji (blue squares for exec view)
 */
function countToBar(count: number, maxBars: number = 7): string {
  const filled = Math.min(count, maxBars);
  const empty = maxBars - filled;
  return '🟦'.repeat(filled) + '⬜️'.repeat(empty);
}

/**
 * Column header emojis
 */
const COLUMN_HEADERS = {
  backlog: '🧺 Backlog',
  doing: '⚙️ Doing',
  review: '👀 Review',
  blocked: '🧱 Blocked',
  done: '✅ Done',
};

const COLUMN_SHORT = {
  backlog: '🧺',
  doing: '⚙️',
  review: '👀',
  blocked: '🧱',
  done: '✅',
};

/**
 * 1) Standard Swimlane Board
 * Shows pods with tasks and status indicators
 */
export function generateStandardSwimlane(pods: PodData[]): string {
  const lines: string[] = [];
  
  // Header
  const headers = ['', ...Object.keys(COLUMN_HEADERS).map(k => COLUMN_HEADERS[k as keyof typeof COLUMN_HEADERS])];
  const columnWidth = 24;
  lines.push(headers.join('   |   '));
  
  // Each pod
  for (const pod of pods) {
    const cells: string[] = [`${pod.emoji} ${pod.name}`];
    
    for (const col of ['backlog', 'doing', 'review', 'blocked', 'done'] as const) {
      const tasks = pod.columns[col].tasks;
      if (tasks.length === 0) {
        cells.push('—'.padEnd(columnWidth));
      } else {
        const taskStr = tasks.map(t => `${t.type}${statusToEmoji(t.status)}`).join('');
        cells.push(taskStr.padEnd(columnWidth));
      }
    }
    
    lines.push(cells.join('   |   '));
  }
  
  return lines.join('\n');
}

/**
 * 2) Count Bars Visualization (Exec View)
 * Shows count of items per column as bar charts
 */
export function generateCountBars(pods: PodCountBarData[]): string {
  const lines: string[] = [];
  
  for (const pod of pods) {
    // Column bars
    const bars = [
      `🧺 ${countToBar(pod.counts.backlog)}`,
      `⚙️ ${countToBar(pod.counts.doing)}`,
      `👀 ${countToBar(pod.counts.review)}`,
      `🧱 ${countToBar(pod.counts.blocked)}`,
      `✅ ${countToBar(pod.counts.done)}`,
    ];
    
    lines.push(bars.join('   '));
    lines.push(`${pod.emoji} ${pod.name}`);
    lines.push('');
  }
  
  return lines.join('\n');
}

/**
 * 3) Mood Heat Swimlane
 * Shows emotional state of teams across columns
 */
export function generateMoodHeat(pods: PodData[]): string {
  const lines: string[] = [];
  
  for (const pod of pods) {
    if (!pod.mood) continue;
    
    const cells: string[] = [`${pod.emoji} ${pod.name}`];
    
    for (const col of ['backlog', 'doing', 'review', 'blocked', 'done'] as const) {
      const mood = pod.mood[col];
      cells.push(`${COLUMN_SHORT[col]}${mood.repeat(5)}`);
    }
    
    lines.push(cells.join('   '));
  }
  
  return lines.join('\n');
}

/**
 * 4) Pod Gantt Inside Kanban
 * Each cell shows a timeline with offset bars
 */
export function generatePodGantt(pods: PodGanttData[]): string {
  const lines: string[] = [];
  
  for (const pod of pods) {
    const cells: string[] = [`${pod.emoji} ${pod.name}`];
    
    for (const col of ['backlog', 'doing', 'review', 'blocked', 'done'] as const) {
      const tasks = pod.columns[col].tasks;
      if (tasks.length === 0) {
        cells.push(`${COLUMN_SHORT[col]} ${'⬜️'.repeat(8)}`);
      } else {
        // Take first task for visualization
        const task = tasks[0];
        const timeline = Array(8).fill('⬜️');
        
        // Fill the timeline based on offset and duration
        for (let i = task.offset; i < Math.min(task.offset + task.duration, 8); i++) {
          timeline[i] = statusToEmoji(task.status);
        }
        
        const timelineStr = timeline.join('');
        cells.push(`${COLUMN_SHORT[col]} ${task.type}${timelineStr}`);
      }
    }
    
    lines.push(cells.join('  |  '));
  }
  
  return lines.join('\n');
}

/**
 * 5) Super Compact Swimlane (Slack-friendly)
 * Minimal format for chat/messaging platforms
 */
export function generateCompactSwimlane(pods: PodData[]): string {
  const lines: string[] = [];
  
  for (const pod of pods) {
    const cells: string[] = [pod.emoji];
    
    for (const col of ['backlog', 'doing', 'review', 'blocked', 'done'] as const) {
      const tasks = pod.columns[col].tasks.slice(0, 3); // Max 3 tasks for compact view
      if (tasks.length === 0) {
        cells.push(`${COLUMN_SHORT[col]}⬜️⬜️⬜️⬜️`);
      } else {
        const taskStr = tasks.map(t => statusToEmoji(t.status)).join('');
        const padding = '⬜️'.repeat(Math.max(0, 3 - tasks.length));
        cells.push(`${COLUMN_SHORT[col]}${tasks[0]?.type || ''}${taskStr}${padding}`);
      }
    }
    
    lines.push(cells.join('  '));
  }
  
  return lines.join('\n');
}

/**
 * Generate "Sad Swimlane" - special drop-in visualization for struggling teams
 */
export function generateSadSwimlane(): string {
  return `😭 "SAD SWIMLANE" (drop-in)
🧺😭😭😭😭😭  ⚙️😮‍💨😮‍💨😮‍💨😮‍💨😮‍💨  👀🫥🫥🫥🫥🫥  🧱⛓️‍💥⛓️‍💥⛓️‍💥⛓️‍💥⛓️‍💥  ✅🙂🙂🙂🙂🙂`;
}

/**
 * Generate all 5 chart types
 */
export function generateAllCharts(
  pods: PodData[],
  podsBars: PodCountBarData[],
  podsGantt: PodGanttData[]
): string {
  const output: string[] = [];
  
  output.push('🏊‍♀️ SWIMLANE KANBAN (charts-only)');
  output.push('Columns: 🧺 Backlog | ⚙️ Doing | 👀 Review | 🧱 Blocked | ✅ Done');
  output.push('Rows: pods/teams (repeat forever for 30,000 humans)');
  output.push('');
  output.push('⸻');
  output.push('');
  
  // 1) Standard Swimlane
  output.push('1) Swimlane board (5 pods)');
  output.push('');
  output.push(generateStandardSwimlane(pods));
  output.push('');
  output.push('⸻');
  output.push('');
  
  // 2) Count Bars
  output.push('2) Same board but "count bars" (good for exec view)');
  output.push('');
  output.push(generateCountBars(podsBars));
  output.push('⸻');
  output.push('');
  
  // 3) Mood Heat
  output.push('3) "Mood heat" swimlane (sadness included)');
  output.push('');
  output.push(generateMoodHeat(pods));
  output.push('');
  output.push('⸻');
  output.push('');
  
  // 4) Pod Gantt
  output.push('4) "Pod Gantt inside Kanban" (each cell is a tiny shifted bar)');
  output.push('');
  output.push(generatePodGantt(podsGantt));
  output.push('');
  output.push('⸻');
  output.push('');
  
  // 5) Compact
  output.push('5) "Super compact" swimlane rows (good for Slack)');
  output.push('');
  output.push(generateCompactSwimlane(pods));
  output.push('');
  output.push(generateSadSwimlane());
  
  return output.join('\n');
}
