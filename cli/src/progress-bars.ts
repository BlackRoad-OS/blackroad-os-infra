/**
 * Progress Bar Visualization Utilities
 * =====================================
 * Generate visual progress indicators using emojis
 */

export interface ProgressBarOptions {
  total?: number;
  width?: number;
}

/**
 * Generate checklist progress bar
 * Shows progression from empty checkboxes to checked
 * 
 * @param progress - Value from 0 to 1 (or 0 to options.total)
 * @param options - Configuration options
 * @returns String representation of the progress bar
 */
export function checklistBar(progress: number, options: ProgressBarOptions = {}): string {
  const { total = 1, width = 7 } = options;
  const ratio = total > 1 ? progress / total : progress;
  const filled = Math.round(ratio * width);
  const empty = width - filled;
  
  const unchecked = '☐';
  const checked = '☑️';
  
  return checked.repeat(filled) + unchecked.repeat(empty);
}

/**
 * Generate complete checklist bars showing all stages
 * 
 * @param width - Width of each bar
 * @returns Array of strings showing progression from 0 to 100%
 */
export function generateChecklistBars(width: number = 7): string[] {
  const bars: string[] = [];
  
  for (let i = 0; i <= width; i++) {
    bars.push(checklistBar(i, { total: width, width }));
  }
  
  // Add final celebration versions
  bars.push('✅'.repeat(width));
  bars.push('🎉'.repeat(width));
  
  return bars;
}

/**
 * Generate status progress bar
 * Shows progression using colored circle emojis
 * 
 * @param progress - Value from 0 to 1 (or 0 to options.total)
 * @param options - Configuration options
 * @returns String representation of the status bar
 */
export function statusBar(progress: number, options: ProgressBarOptions = {}): string {
  const { total = 1, width = 7 } = options;
  const ratio = total > 1 ? progress / total : progress;
  const filled = Math.round(ratio * width);
  const empty = width - filled;
  
  const emptyCircle = '⚪️';
  const greenCircle = '🟢';
  
  return greenCircle.repeat(filled) + emptyCircle.repeat(empty);
}

/**
 * Generate complete status bars showing all stages
 * 
 * @param width - Width of each bar
 * @returns Array of strings showing progression from 0 to 100%
 */
export function generateStatusBars(width: number = 7): string[] {
  const bars: string[] = [];
  
  for (let i = 0; i <= width; i++) {
    bars.push(statusBar(i, { total: width, width }));
  }
  
  // Add final celebration versions
  bars.push('⭕'.repeat(width));
  bars.push('✅'.repeat(width));
  
  return bars;
}

/**
 * Generate a triangle shape with progress
 * 
 * @param progress - Value from 0 to 1
 * @param height - Height of the triangle
 * @returns Array of strings representing each row of the triangle
 */
export function triangleShape(progress: number, height: number = 4): string[] {
  const ratio = Math.max(0, Math.min(1, progress));
  const filledHeight = Math.round(ratio * height);
  
  const emptyCircle = '⚪️';
  const greenCircle = '🟢';
  
  const lines: string[] = [];
  
  for (let row = 0; row < height; row++) {
    const circleCount = (row * 2) + 1;
    const spaces = height - row - 1;
    
    let line = ' '.repeat(spaces * 2);
    
    if (row < filledHeight) {
      line += greenCircle.repeat(circleCount);
    } else if (row === filledHeight && ratio > 0) {
      // Partially fill this row based on remaining progress
      const rowProgress = (ratio * height) - filledHeight;
      const filledCircles = Math.round(rowProgress * circleCount);
      line += greenCircle.repeat(filledCircles) + emptyCircle.repeat(circleCount - filledCircles);
    } else {
      line += emptyCircle.repeat(circleCount);
    }
    
    lines.push(line);
  }
  
  return lines;
}

/**
 * Generate a diamond shape with progress
 * 
 * @param progress - Value from 0 to 1
 * @param size - Size of the diamond (rows from center)
 * @returns Array of strings representing each row of the diamond
 */
export function diamondShape(progress: number, size: number = 3): string[] {
  const ratio = Math.max(0, Math.min(1, progress));
  const totalRows = (size * 2) - 1;
  const filledRows = Math.round(ratio * totalRows);
  
  const emptyCircle = '⚪️';
  const greenCircle = '🟢';
  
  const lines: string[] = [];
  
  // Top half (including middle)
  for (let row = 0; row < size; row++) {
    const circleCount = (row * 2) + 1;
    const spaces = size - row - 1;
    
    let line = ' '.repeat(spaces);
    
    if (row < filledRows) {
      line += greenCircle.repeat(circleCount);
    } else if (row === filledRows && ratio > 0) {
      const rowProgress = (ratio * totalRows) - filledRows;
      const filledCircles = Math.round(rowProgress * circleCount);
      line += greenCircle.repeat(filledCircles) + emptyCircle.repeat(circleCount - filledCircles);
    } else {
      line += emptyCircle.repeat(circleCount);
    }
    
    lines.push(line);
  }
  
  // Bottom half
  for (let row = size - 2; row >= 0; row--) {
    const circleCount = (row * 2) + 1;
    const spaces = size - row - 1;
    const rowIndex = (size - 1) + (size - 1 - row);
    
    let line = ' '.repeat(spaces);
    
    if (rowIndex < filledRows) {
      line += greenCircle.repeat(circleCount);
    } else if (rowIndex === filledRows && ratio > 0) {
      const rowProgress = (ratio * totalRows) - filledRows;
      const filledCircles = Math.round(rowProgress * circleCount);
      line += greenCircle.repeat(filledCircles) + emptyCircle.repeat(circleCount - filledCircles);
    } else {
      line += emptyCircle.repeat(circleCount);
    }
    
    lines.push(line);
  }
  
  return lines;
}

/**
 * Format progress bars with a title
 * 
 * @param title - Title for the section
 * @param bars - Array of progress bar strings
 * @returns Formatted string with title and bars
 */
export function formatSection(title: string, bars: string[]): string {
  return `${title}\n\n${bars.join('\n')}\n`;
}
