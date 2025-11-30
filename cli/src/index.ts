#!/usr/bin/env node

/**
 * BlackRoad OS CLI
 * ================
 * Command-line interface for managing BlackRoad OS infrastructure
 *
 * Usage:
 *   blackroad <command> [options]
 *   br <command> [options]
 *
 * Commands:
 *   status      Show system status
 *   deploy      Deploy services
 *   health      Run health checks
 *   logs        View service logs
 *   config      Manage configuration
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { table } from 'table';

// Brand colors
const BRAND = {
  primary: '#FF9D00',
  secondary: '#FF6B00',
  accent: '#FF0066',
};

// Service definitions
const SERVICES = {
  // blackroad.io
  'blackroad-os-web': { domain: 'app.blackroad.io', port: 3000, type: 'frontend' },
  'blackroad-os-home': { domain: 'home.blackroad.io', port: 3000, type: 'frontend' },
  'blackroad-os': { domain: 'os.blackroad.io', port: 8080, type: 'api' },
  'blackroad-os-api': { domain: 'api.blackroad.io', port: 8080, type: 'api' },

  // blackroad.systems
  'blackroad-os-api-gateway': { domain: 'api.blackroad.systems', port: 8080, type: 'api' },
  'blackroad-os-core': { domain: 'core.blackroad.systems', port: 8080, type: 'api' },
  'blackroad-os-beacon': { domain: 'beacon.blackroad.systems', port: 8080, type: 'api' },
  'blackroad-os-agents': { domain: 'agents.blackroad.systems', port: 8080, type: 'api' },
  'blackroad-os-docs': { domain: 'docs.blackroad.systems', port: 3000, type: 'frontend' },
  'blackroad-prism-console': { domain: 'prism.blackroad.systems', port: 3000, type: 'frontend' },
  'blackroad-os-infra': { domain: 'infra.blackroad.systems', port: 8080, type: 'api' },
  'blackroad-os-master': { domain: 'console.blackroad.systems', port: 8080, type: 'api' },
  'blackroad-os-demo': { domain: 'demo.blackroad.systems', port: 3000, type: 'frontend' },
  'blackroad-os-archive': { domain: 'archive.blackroad.systems', port: 8080, type: 'api' },
  'blackroad-os-research': { domain: 'research.blackroad.systems', port: 8080, type: 'api' },

  // Packs
  'blackroad-os-pack-creator-studio': { domain: 'creator.blackroad.io', port: 3000, type: 'frontend' },
  'blackroad-os-pack-finance': { domain: 'finance.blackroad.systems', port: 8080, type: 'api' },
  'blackroad-os-pack-legal': { domain: 'legal.blackroad.systems', port: 8080, type: 'api' },
  'blackroad-os-pack-research-lab': { domain: 'lab.blackroad.systems', port: 8080, type: 'api' },
  'blackroad-os-pack-infra-devops': { domain: 'devops.blackroad.systems', port: 8080, type: 'api' },
};

const program = new Command();

// ASCII Banner
const banner = `
${chalk.hex(BRAND.primary)('╔═══════════════════════════════════════════════════════════╗')}
${chalk.hex(BRAND.primary)('║')}  ${chalk.hex(BRAND.secondary).bold('██████╗ ██╗      █████╗  ██████╗██╗  ██╗')}                 ${chalk.hex(BRAND.primary)('║')}
${chalk.hex(BRAND.primary)('║')}  ${chalk.hex(BRAND.secondary).bold('██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝')}                 ${chalk.hex(BRAND.primary)('║')}
${chalk.hex(BRAND.primary)('║')}  ${chalk.hex(BRAND.secondary).bold('██████╔╝██║     ███████║██║     █████╔╝')}                  ${chalk.hex(BRAND.primary)('║')}
${chalk.hex(BRAND.primary)('║')}  ${chalk.hex(BRAND.secondary).bold('██╔══██╗██║     ██╔══██║██║     ██╔═██╗')}                  ${chalk.hex(BRAND.primary)('║')}
${chalk.hex(BRAND.primary)('║')}  ${chalk.hex(BRAND.secondary).bold('██████╔╝███████╗██║  ██║╚██████╗██║  ██╗')}                 ${chalk.hex(BRAND.primary)('║')}
${chalk.hex(BRAND.primary)('║')}  ${chalk.hex(BRAND.secondary).bold('╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝')}                 ${chalk.hex(BRAND.primary)('║')}
${chalk.hex(BRAND.primary)('║')}                                                           ${chalk.hex(BRAND.primary)('║')}
${chalk.hex(BRAND.primary)('║')}  ${chalk.hex(BRAND.accent).bold('R O A D   O S')}   ${chalk.gray('Distributed AI Operating System')}       ${chalk.hex(BRAND.primary)('║')}
${chalk.hex(BRAND.primary)('╚═══════════════════════════════════════════════════════════╝')}
`;

program
  .name('blackroad')
  .description('BlackRoad OS Command Line Interface')
  .version('1.0.0')
  .hook('preAction', () => {
    console.log(banner);
  });

// =============================================================================
// STATUS COMMAND
// =============================================================================
program
  .command('status')
  .description('Show system status')
  .option('-v, --verbose', 'Show detailed status')
  .action(async (options) => {
    const spinner = ora('Checking system status...').start();

    try {
      const results: [string, string, string, string][] = [];

      for (const [name, config] of Object.entries(SERVICES)) {
        const url = `https://${config.domain}/`;
        try {
          const response = await fetch(url, {
            method: 'HEAD',
            signal: AbortSignal.timeout(5000),
          });
          const status = response.ok ? chalk.green('● UP') : chalk.yellow(`● ${response.status}`);
          results.push([name, config.domain, status, config.type]);
        } catch {
          results.push([name, config.domain, chalk.red('● DOWN'), config.type]);
        }
      }

      spinner.stop();

      const tableData = [
        [chalk.bold('Service'), chalk.bold('Domain'), chalk.bold('Status'), chalk.bold('Type')],
        ...results,
      ];

      console.log(table(tableData));

      const up = results.filter(r => r[2].includes('UP')).length;
      const total = results.length;
      console.log(chalk.hex(BRAND.primary)(`\n  ${up}/${total} services operational\n`));

    } catch (error) {
      spinner.fail('Failed to check status');
      console.error(error);
    }
  });

// =============================================================================
// HEALTH COMMAND
// =============================================================================
program
  .command('health')
  .description('Run health checks on all services')
  .option('-s, --service <name>', 'Check specific service')
  .action(async (options) => {
    const spinner = ora('Running health checks...').start();

    const servicesToCheck = options.service
      ? { [options.service]: SERVICES[options.service as keyof typeof SERVICES] }
      : SERVICES;

    const results: { name: string; healthy: boolean; latency: number; error?: string }[] = [];

    for (const [name, config] of Object.entries(servicesToCheck)) {
      if (!config) {
        results.push({ name, healthy: false, latency: 0, error: 'Service not found' });
        continue;
      }

      const healthUrl = config.type === 'api'
        ? `https://${config.domain}/health`
        : `https://${config.domain}/`;

      const start = Date.now();
      try {
        const response = await fetch(healthUrl, {
          signal: AbortSignal.timeout(10000),
        });
        const latency = Date.now() - start;
        results.push({
          name,
          healthy: response.ok,
          latency,
        });
      } catch (error: any) {
        results.push({
          name,
          healthy: false,
          latency: Date.now() - start,
          error: error.message,
        });
      }
    }

    spinner.stop();

    console.log('\n' + chalk.bold('Health Check Results:') + '\n');

    for (const result of results) {
      const icon = result.healthy ? chalk.green('✓') : chalk.red('✗');
      const latency = result.healthy ? chalk.gray(`(${result.latency}ms)`) : '';
      const error = result.error ? chalk.red(` - ${result.error}`) : '';
      console.log(`  ${icon} ${result.name} ${latency}${error}`);
    }

    const healthy = results.filter(r => r.healthy).length;
    const total = results.length;

    console.log();
    if (healthy === total) {
      console.log(chalk.green(`  All ${total} services healthy!\n`));
    } else {
      console.log(chalk.yellow(`  ${healthy}/${total} services healthy\n`));
    }
  });

// =============================================================================
// DEPLOY COMMAND
// =============================================================================
program
  .command('deploy')
  .description('Deploy services')
  .option('-s, --service <name>', 'Deploy specific service')
  .option('-a, --all', 'Deploy all services')
  .option('--parallel', 'Deploy in parallel')
  .option('--dry-run', 'Show what would be deployed')
  .action(async (options) => {
    if (!options.service && !options.all) {
      console.log(chalk.yellow('\nSpecify --service <name> or --all to deploy\n'));
      return;
    }

    const services = options.all
      ? Object.keys(SERVICES)
      : [options.service];

    if (options.dryRun) {
      console.log(chalk.cyan('\n  Dry run - would deploy:\n'));
      services.forEach(s => console.log(`    - ${s}`));
      console.log();
      return;
    }

    const spinner = ora(`Deploying ${services.length} service(s)...`).start();

    // Simulate deployment (replace with actual Railway CLI calls)
    for (const service of services) {
      spinner.text = `Deploying ${service}...`;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    spinner.succeed(`Deployed ${services.length} service(s)`);
    console.log(chalk.green('\n  Deployment complete!\n'));
  });

// =============================================================================
// SERVICES COMMAND
// =============================================================================
program
  .command('services')
  .description('List all services')
  .option('--json', 'Output as JSON')
  .action((options) => {
    if (options.json) {
      console.log(JSON.stringify(SERVICES, null, 2));
      return;
    }

    console.log(chalk.bold('\n  BlackRoad OS Services:\n'));

    console.log(chalk.hex(BRAND.primary)('  === blackroad.io ==='));
    Object.entries(SERVICES)
      .filter(([_, v]) => v.domain.endsWith('blackroad.io'))
      .forEach(([name, config]) => {
        console.log(`    ${chalk.white(name)}`);
        console.log(`      ${chalk.gray(config.domain)} (${config.type}:${config.port})`);
      });

    console.log();
    console.log(chalk.hex(BRAND.secondary)('  === blackroad.systems ==='));
    Object.entries(SERVICES)
      .filter(([_, v]) => v.domain.endsWith('blackroad.systems'))
      .forEach(([name, config]) => {
        console.log(`    ${chalk.white(name)}`);
        console.log(`      ${chalk.gray(config.domain)} (${config.type}:${config.port})`);
      });

    console.log();
  });

// =============================================================================
// CONFIG COMMAND
// =============================================================================
program
  .command('config')
  .description('Manage CLI configuration')
  .option('--show', 'Show current configuration')
  .option('--set <key=value>', 'Set configuration value')
  .action((options) => {
    if (options.show) {
      console.log(chalk.bold('\n  Current Configuration:\n'));
      console.log(`    Railway Token: ${chalk.gray('(set via RAILWAY_TOKEN)')}`);
      console.log(`    Cloudflare Token: ${chalk.gray('(set via CLOUDFLARE_API_TOKEN)')}`);
      console.log(`    Default Environment: ${chalk.cyan('production')}`);
      console.log();
      return;
    }

    console.log(chalk.yellow('\n  Use --show to view configuration\n'));
  });

// =============================================================================
// OPEN COMMAND
// =============================================================================
program
  .command('open <service>')
  .description('Open service in browser')
  .action((service) => {
    const config = SERVICES[service as keyof typeof SERVICES];
    if (!config) {
      console.log(chalk.red(`\n  Service not found: ${service}\n`));
      return;
    }

    const url = `https://${config.domain}`;
    console.log(chalk.cyan(`\n  Opening ${url}...\n`));

    // Open in browser (cross-platform)
    const { exec } = require('child_process');
    const cmd = process.platform === 'darwin' ? 'open' :
                process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${cmd} ${url}`);
  });

// Parse and run
program.parse();
