/**
 * BlackRoad OS Chart Pack
 * Emoji-based visual charts for capacity, load, throughput, and queue monitoring
 */

export interface ChartConfig {
  barCount?: number; // Number of bars to display (default: 7)
  filled?: number;   // Number of filled positions (0-7)
  state?: number;    // State level (0-9)
}

/**
 * Capacity Chart - Shows team/system capacity growth
 * States: 0=empty, 1-6=progressive fill, 7=full, 8=completed, 9=celebration
 */
export function capacityChart(state: number = 0, barCount: number = 7): string {
  const icon = '👥';
  const states = [
    '⚪️',  // Empty
    '🟢',  // Filling...
    '🟢',
    '🟢',
    '🟢',
    '🟢',
    '🟢',
    '🟢',  // Full
    '✅',  // Completed
    '🎉',  // Celebration
  ];

  if (state < 0 || state > 9) {
    throw new Error('Capacity state must be between 0-9');
  }

  let bar = icon + '  ';
  
  if (state === 0) {
    bar += '⚪️'.repeat(barCount);
  } else if (state >= 1 && state <= 7) {
    bar += states[1].repeat(state) + '⚪️'.repeat(barCount - state);
  } else if (state === 8) {
    bar += states[8].repeat(barCount);
  } else {
    bar += states[9].repeat(barCount);
  }
  
  return bar;
}

/**
 * Load/Stress Chart - Shows system load levels
 * States: 0=empty, 1-7=progressive load, 8=warning, 9=critical
 */
export function loadChart(state: number = 0, barCount: number = 7): string {
  const icon = '⚙️';
  const states = [
    '⚪️',  // Empty
    '🟦',  // Normal load
    '🟦',
    '🟦',
    '🟦',
    '🟦',
    '🟦',
    '🟦',  // Full load
    '🟧',  // Warning
    '🟥',  // Critical
  ];

  if (state < 0 || state > 9) {
    throw new Error('Load state must be between 0-9');
  }

  let bar = icon + '  ';
  
  if (state === 0) {
    bar += '⚪️'.repeat(barCount);
  } else if (state >= 1 && state <= 7) {
    bar += states[1].repeat(state) + '⚪️'.repeat(barCount - state);
  } else if (state === 8) {
    bar += states[8].repeat(barCount);
  } else {
    bar += states[9].repeat(barCount);
  }
  
  return bar;
}

/**
 * Overload Warning Chart - Shows overload recovery or escalation
 * States: 0=normal, 1=full, 2=warning, 3-9=progressive recovery/break
 */
export function overloadChart(state: number = 0, barCount: number = 7): string {
  const icon = '🧯';
  
  if (state < 0 || state > 9) {
    throw new Error('Overload state must be between 0-9');
  }

  let bar = icon + '  ';
  
  if (state === 0) {
    bar += '🟦'.repeat(barCount);
  } else if (state === 1) {
    bar += '🟧'.repeat(barCount);
  } else if (state === 2) {
    bar += '🟥'.repeat(barCount);
  } else if (state >= 3 && state <= 8) {
    // Progressive recovery: red decreases, white increases
    const redCount = 9 - state;
    const whiteCount = barCount - redCount;
    bar += '🟥'.repeat(redCount) + '⬜️'.repeat(whiteCount);
  } else {
    // State 9: Complete break
    bar += '⛓️‍💥'.repeat(barCount);
  }
  
  return bar;
}

/**
 * Throughput "Ship Rate" Chart - Shows delivery/shipping throughput
 * States: 0=empty, 1-7=progressive, 8=shipping, 9=finished
 */
export function throughputChart(state: number = 0, barCount: number = 7): string {
  const icon = '📦';
  const states = [
    '⚪️',  // Empty
    '📦',  // Shipping...
    '📦',
    '📦',
    '📦',
    '📦',
    '📦',
    '📦',  // Full
    '🚀',  // Rocket speed
    '🏁',  // Finished
  ];

  if (state < 0 || state > 9) {
    throw new Error('Throughput state must be between 0-9');
  }

  let bar = icon + '  ';
  
  if (state === 0) {
    bar += '⚪️'.repeat(barCount);
  } else if (state >= 1 && state <= 7) {
    bar += states[1].repeat(state) + '⚪️'.repeat(barCount - state);
  } else if (state === 8) {
    bar += states[8].repeat(barCount);
  } else {
    bar += states[9].repeat(barCount);
  }
  
  return bar;
}

/**
 * Queue Size Chart - Shows queue depth
 * States: 0=empty, 1-7=progressive fill, 8=full inbox, 9=cleared
 */
export function queueChart(state: number = 0, barCount: number = 7): string {
  const icon = '🧺';
  const states = [
    '⚪️',  // Empty
    '🧺',  // Queued items
    '🧺',
    '🧺',
    '🧺',
    '🧺',
    '🧺',
    '🧺',  // Full
    '📬',  // Full inbox
    '📪',  // Empty/cleared
  ];

  if (state < 0 || state > 9) {
    throw new Error('Queue state must be between 0-9');
  }

  let bar = icon + '  ';
  
  if (state === 0) {
    bar += '⚪️'.repeat(barCount);
  } else if (state >= 1 && state <= 7) {
    bar += states[1].repeat(state) + '⚪️'.repeat(barCount - state);
  } else if (state === 8) {
    bar += states[8].repeat(barCount);
  } else {
    bar += states[9].repeat(barCount);
  }
  
  return bar;
}

/**
 * Generate all states for a specific chart type (for visualization)
 */
export function generateAllStates(chartType: 'capacity' | 'load' | 'overload' | 'throughput' | 'queue', barCount: number = 7): string[] {
  const charts = {
    capacity: capacityChart,
    load: loadChart,
    overload: overloadChart,
    throughput: throughputChart,
    queue: queueChart,
  };
  
  const chartFn = charts[chartType];
  const states: string[] = [];
  
  for (let i = 0; i <= 9; i++) {
    states.push(chartFn(i, barCount));
  }
  
  return states;
}

/**
 * Generate complete chart pack showing all types
 */
export function generateChartPack(barCount: number = 7): Record<string, string[]> {
  return {
    capacity: generateAllStates('capacity', barCount),
    load: generateAllStates('load', barCount),
    overload: generateAllStates('overload', barCount),
    throughput: generateAllStates('throughput', barCount),
    queue: generateAllStates('queue', barCount),
  };
}
