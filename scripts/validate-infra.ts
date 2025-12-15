#!/usr/bin/env ts-node

/**
 * Validation script for BlackRoad OS infrastructure configurations
 * 
 * This script validates:
 * - Environment definitions
 * - Service infrastructure files
 * - Railway configurations
 * 
 * Run: npm run validate
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';

interface Environment {
  id: string;
  label: string;
  description: string;
  priority?: number;
  notes?: string;
}

interface EnvironmentsConfig {
  environments: Environment[];
}

const REPO_ROOT = path.join(__dirname, '..');
const REQUIRED_ENVS = ['local', 'staging', 'prod'];
const CORE_SERVICES = ['core', 'api', 'operator', 'web', 'prism-console'];

let hasErrors = false;

function error(message: string): void {
  console.error(`❌ ERROR: ${message}`);
  hasErrors = true;
}

function warn(message: string): void {
  console.warn(`⚠️  WARNING: ${message}`);
}

function success(message: string): void {
  console.log(`✅ ${message}`);
}

function info(message: string): void {
  console.log(`ℹ️  ${message}`);
}

/**
 * Validate environments configuration
 */
function validateEnvironments(): void {
  info('Validating environments configuration...');
  
  const envFilePath = path.join(REPO_ROOT, 'environments', 'environments.yml');
  
  if (!fs.existsSync(envFilePath)) {
    error(`Environment configuration file not found: ${envFilePath}`);
    return;
  }
  
  try {
    const content = fs.readFileSync(envFilePath, 'utf-8');
    const config: EnvironmentsConfig = yaml.parse(content);
    
    if (!config.environments || !Array.isArray(config.environments)) {
      error('environments.yml must contain an "environments" array');
      return;
    }
    
    const envIds = config.environments.map(env => env.id);
    
    // Check for required environments
    for (const requiredEnv of REQUIRED_ENVS) {
      if (!envIds.includes(requiredEnv)) {
        error(`Missing required environment: ${requiredEnv}`);
      }
    }
    
    // Check for duplicates
    const duplicates = envIds.filter((id, index) => envIds.indexOf(id) !== index);
    if (duplicates.length > 0) {
      error(`Duplicate environment IDs: ${duplicates.join(', ')}`);
    }
    
    // Validate each environment
    for (const env of config.environments) {
      if (!env.id) {
        error('Environment missing "id" field');
      }
      if (!env.label) {
        warn(`Environment "${env.id}" missing "label" field`);
      }
      if (!env.description) {
        warn(`Environment "${env.id}" missing "description" field`);
      }
    }
    
    success(`Validated ${config.environments.length} environments`);
    
  } catch (err: any) {
    error(`Failed to parse environments.yml: ${err?.message || err}`);
  }
}

/**
 * Validate service infrastructure files
 */
function validateServices(): void {
  info('Validating service infrastructure files...');
  
  const servicesDir = path.join(REPO_ROOT, 'services');
  
  if (!fs.existsSync(servicesDir)) {
    error(`Services directory not found: ${servicesDir}`);
    return;
  }
  
  let serviceCount = 0;
  
  for (const serviceName of CORE_SERVICES) {
    const serviceInfraPath = path.join(servicesDir, serviceName, 'infra.yml');
    
    if (!fs.existsSync(serviceInfraPath)) {
      error(`Missing infrastructure file for service: ${serviceName}`);
      continue;
    }
    
    try {
      const content = fs.readFileSync(serviceInfraPath, 'utf-8');
      // Basic validation - just check it's valid YAML/text
      if (!content.trim()) {
        error(`Infrastructure file for ${serviceName} is empty`);
      }
      serviceCount++;
    } catch (err: any) {
      error(`Failed to read infrastructure file for ${serviceName}: ${err?.message || err}`);
    }
  }
  
  // Check for packs
  const packsInfraPath = path.join(servicesDir, 'packs', 'infra.yml');
  if (fs.existsSync(packsInfraPath)) {
    serviceCount++;
  } else {
    warn('Packs infrastructure file not found (optional)');
  }
  
  success(`Validated ${serviceCount} service infrastructure files`);
}

/**
 * Validate Railway configurations
 */
function validateRailway(): void {
  info('Validating Railway configurations...');
  
  const railwayDir = path.join(REPO_ROOT, 'railway');
  
  if (!fs.existsSync(railwayDir)) {
    error(`Railway directory not found: ${railwayDir}`);
    return;
  }
  
  let railwayCount = 0;
  
  for (const serviceName of CORE_SERVICES) {
    const railwayConfigPath = path.join(railwayDir, `railway.blackroad-os-${serviceName}.toml`);
    
    if (!fs.existsSync(railwayConfigPath)) {
      warn(`Missing Railway config for service: ${serviceName}`);
      continue;
    }
    
    try {
      const content = fs.readFileSync(railwayConfigPath, 'utf-8');
      
      // Check for common sections
      if (!content.includes('[service]')) {
        warn(`Railway config for ${serviceName} missing [service] section`);
      }
      if (!content.includes('[healthcheck]')) {
        warn(`Railway config for ${serviceName} missing [healthcheck] section`);
      }
      
      // Check for secrets in config (should not be there)
      // Look for actual secret values, not placeholder comments
      const secretPatterns = [
        /password\s*=\s*["'](?!\[)(.+?)["']/i,  // password = "actualvalue" (not "[SECRET...]")
        /secret\s*=\s*["'](?!\[)(.+?)["']/i,    // secret = "actualvalue" (not "[SECRET...]")
        /token\s*=\s*["'](?!\[)(.+?)["']/i,     // token = "actualvalue" (not "[SECRET...]")
        /api_key\s*=\s*["'](?!\[)(.+?)["']/i,   // api_key = "actualvalue" (not "[SECRET...]")
      ];
      
      // Filter out lines that are comments (including inline comments)
      const lines = content.split('\n').map(line => {
        // Remove inline comments (everything after # outside of quotes)
        const hashIndex = line.indexOf('#');
        if (hashIndex !== -1) {
          // Simple heuristic: if # is outside quotes, treat as comment
          const beforeHash = line.substring(0, hashIndex);
          const openQuotes = (beforeHash.match(/["']/g) || []).length;
          // If even number of quotes before #, it's a comment
          if (openQuotes % 2 === 0) {
            return beforeHash;
          }
        }
        return line;
      }).filter(line => {
        const trimmed = line.trim();
        return !trimmed.startsWith('#') && trimmed.length > 0;
      });
      
      const nonCommentContent = lines.join('\n');
      
      for (const pattern of secretPatterns) {
        const match = nonCommentContent.match(pattern);
        if (match) {
          // Check if the matched value looks like a placeholder
          const value = match[1] || '';
          const isPlaceholder = 
            value.includes('[') || 
            value.includes('{') || 
            value.includes('TODO') ||
            value.includes('CHANGE') ||
            value === '' ||
            value.startsWith('$');
          
          if (!isPlaceholder) {
            error(`Railway config for ${serviceName} may contain hardcoded secrets!`);
            break;
          }
        }
      }
      
      railwayCount++;
    } catch (err: any) {
      error(`Failed to read Railway config for ${serviceName}: ${err?.message || err}`);
    }
  }
  
  success(`Validated ${railwayCount} Railway configurations`);
}

/**
 * Validate Cloudflare DNS blueprint
 */
function validateCloudflare(): void {
  info('Validating Cloudflare DNS blueprint...');
  
  const dnsBlueprint = path.join(REPO_ROOT, 'cloudflare', 'CLOUDFLARE_DNS_BLUEPRINT.md');
  
  if (!fs.existsSync(dnsBlueprint)) {
    error('Cloudflare DNS blueprint not found');
    return;
  }
  
  try {
    const content = fs.readFileSync(dnsBlueprint, 'utf-8');
    
    // Check for core service mentions
    for (const service of CORE_SERVICES) {
      if (!content.toLowerCase().includes(service)) {
        warn(`DNS blueprint may be missing reference to service: ${service}`);
      }
    }
    
    // Check for secrets (API tokens, etc.)
    if (content.includes('CLOUDFLARE_API_TOKEN') && content.match(/CLOUDFLARE_API_TOKEN\s*=\s*[^\s]/)) {
      error('DNS blueprint may contain hardcoded API token!');
    }
    
    success('Validated Cloudflare DNS blueprint');
    
  } catch (err: any) {
    error(`Failed to read DNS blueprint: ${err?.message || err}`);
  }
}

/**
 * Main validation function
 */
function main(): void {
  console.log('\n🔍 BlackRoad OS Infrastructure Validation\n');
  
  validateEnvironments();
  validateServices();
  validateRailway();
  validateCloudflare();
  
  console.log('\n' + '='.repeat(50));
  
  if (hasErrors) {
    console.log('\n❌ Validation FAILED - please fix errors above\n');
    process.exit(1);
  } else {
    console.log('\n✅ All validations PASSED!\n');
    process.exit(0);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { validateEnvironments, validateServices, validateRailway, validateCloudflare };
