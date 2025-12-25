#!/usr/bin/env ts-node

/**
 * CLI tool for generating swimlane Kanban charts
 * Usage: ts-node charts/cli.ts [--example] [--output <file>]
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateAllCharts } from './generator';
import { examplePods, exampleCountBars, exampleGanttPods } from './example-data';
import { PodData, PodCountBarData, PodGanttData } from './types';

interface CLIOptions {
  example: boolean;
  output?: string;
  input?: string;
  help: boolean;
}

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {
    example: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--example':
        options.example = true;
        break;
      case '--output':
      case '-o':
        options.output = args[++i];
        break;
      case '--input':
      case '-i':
        options.input = args[++i];
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
    }
  }

  return options;
}

function printHelp(): void {
  console.log(`
Swimlane Kanban Chart Generator

Usage:
  ts-node charts/cli.ts [options]

Options:
  --example           Generate charts with example data
  --input, -i <file>  Load data from JSON file
  --output, -o <file> Write output to file (default: stdout)
  --help, -h          Show this help message

Data Format:
  The input JSON file should contain three arrays:
  {
    "pods": [...],       // Standard pod data
    "countBars": [...],  // Count bar data
    "ganttPods": [...]   // Gantt chart data
  }

Examples:
  # Generate with example data to console
  ts-node charts/cli.ts --example

  # Generate with custom data and save to file
  ts-node charts/cli.ts --input data.json --output charts.txt

  # Generate example data and save to file
  ts-node charts/cli.ts --example --output example-charts.txt
`);
}

function loadDataFromFile(filepath: string): {
  pods: PodData[];
  countBars: PodCountBarData[];
  ganttPods: PodGanttData[];
} {
  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    const data = JSON.parse(content);
    
    if (!data.pods || !data.countBars || !data.ganttPods) {
      throw new Error('Invalid data format. Expected: { pods, countBars, ganttPods }');
    }
    
    return data;
  } catch (error) {
    console.error(`Error loading data from ${filepath}:`, error);
    process.exit(1);
  }
}

function main(): void {
  const options = parseArgs();

  if (options.help) {
    printHelp();
    return;
  }

  let pods: PodData[];
  let countBars: PodCountBarData[];
  let ganttPods: PodGanttData[];

  // Load data
  if (options.input) {
    const data = loadDataFromFile(options.input);
    pods = data.pods;
    countBars = data.countBars;
    ganttPods = data.ganttPods;
  } else if (options.example) {
    pods = examplePods;
    countBars = exampleCountBars;
    ganttPods = exampleGanttPods;
  } else {
    console.error('Error: Must specify either --example or --input <file>');
    console.error('Use --help for more information');
    process.exit(1);
  }

  // Generate charts
  const output = generateAllCharts(pods, countBars, ganttPods);

  // Write output
  if (options.output) {
    const outputPath = path.resolve(options.output);
    fs.writeFileSync(outputPath, output, 'utf-8');
    console.log(`Charts written to: ${outputPath}`);
  } else {
    console.log(output);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { main };
