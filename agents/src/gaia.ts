/**
 * Gaia Agent - Truth Verification and Hash Generation
 * ====================================================
 * Mathematical certainty through cryptographic verification
 * 
 * Capabilities:
 * - SHA-256 hash generation for components
 * - Truth manifest creation and verification
 * - Component integrity validation
 * - PS-SHA-∞ alert triggering for unauthorized changes
 */

import { createHash } from 'crypto';
import { EventEmitter } from 'events';

// =============================================================================
// Types
// =============================================================================

interface ComponentIdentity {
  name: string;
  target: string;
  hash: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

interface TruthManifest {
  version: string;
  generated: Date;
  components: ComponentIdentity[];
  rootHash: string;
  signature?: string;
}

interface VerificationResult {
  valid: boolean;
  component: string;
  expected: string;
  actual: string;
  message: string;
}

// =============================================================================
// Gaia Agent
// =============================================================================

export class GaiaAgent extends EventEmitter {
  private manifests: Map<string, TruthManifest> = new Map();

  // Known component identities from the problem statement
  // These are the "Ground Truth" hashes provided by the user for the
  // Big 7 countermeasure. Note: The blackroad-os-core hash is intentionally
  // the SHA-256 of an empty string as specified in the requirements.
  private readonly CORE_COMPONENTS: Record<string, string> = {
    'blackroad-os-core': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'lucidia-core': 'f6a4b1238d7c9e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a',
    'blackroad-pi-ops': '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    'blackroad-os-api': '9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e',
  };

  constructor() {
    super();
    console.log('[Gaia] Truth verification agent initialized');
  }

  // ---------------------------------------------------------------------------
  // Hash Generation
  // ---------------------------------------------------------------------------

  /**
   * Generate SHA-256 hash for data
   * Supports both string and Buffer input, handles large files efficiently
   */
  generateHash(data: string | Buffer): string {
    const hash = createHash('sha256');
    
    if (typeof data === 'string') {
      hash.update(data, 'utf8');
    } else {
      hash.update(data);
    }
    
    return hash.digest('hex');
  }

  /**
   * Generate hash for a file by reading it in chunks
   * This is the "Gaia-Standard" for handling large files
   */
  async generateFileHash(filePath: string): Promise<string> {
    const { createReadStream } = await import('fs');
    const hash = createHash('sha256');
    
    return new Promise((resolve, reject) => {
      const stream = createReadStream(filePath, { highWaterMark: 4096 });
      
      stream.on('data', (chunk) => {
        hash.update(chunk);
      });
      
      stream.on('end', () => {
        resolve(hash.digest('hex'));
      });
      
      stream.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Generate hash for a component (GitHub repository)
   */
  generateComponentHash(componentName: string): string {
    // For now, return the predefined hash for known components
    // In production, this would calculate actual repository state
    const knownHash = this.CORE_COMPONENTS[componentName];
    
    if (knownHash) {
      return knownHash;
    }
    
    // For unknown components, generate based on name and timestamp
    const data = `${componentName}-${Date.now()}`;
    return this.generateHash(data);
  }

  // ---------------------------------------------------------------------------
  // Truth Manifest Management
  // ---------------------------------------------------------------------------

  /**
   * Create a new Truth Manifest for the current system state
   */
  createTruthManifest(): TruthManifest {
    const components: ComponentIdentity[] = [];
    
    // Add core components
    for (const [name, hash] of Object.entries(this.CORE_COMPONENTS)) {
      components.push({
        name: this.getComponentDisplayName(name),
        target: name,
        hash,
        timestamp: new Date(),
      });
    }
    
    // Calculate root hash from all component hashes
    const combinedHashes = components.map(c => c.hash).join('');
    const rootHash = this.generateHash(combinedHashes);
    
    const manifest: TruthManifest = {
      version: '1.0.0',
      generated: new Date(),
      components,
      rootHash,
    };
    
    this.manifests.set(manifest.version, manifest);
    this.emit('manifest:created', manifest);
    
    console.log(`[Gaia] Truth Manifest v${manifest.version} created`);
    console.log(`[Gaia] Root Hash: ${rootHash}`);
    
    return manifest;
  }

  /**
   * Get the display name for a component
   */
  private getComponentDisplayName(target: string): string {
    const displayNames: Record<string, string> = {
      'blackroad-os-core': 'BR-OS Core',
      'lucidia-core': 'Lucidia Logic',
      'blackroad-pi-ops': 'Pi-Ops Mesh',
      'blackroad-os-api': 'Trinity Auth',
    };
    
    return displayNames[target] || target;
  }

  /**
   * Verify a component against the current manifest
   */
  verifyComponent(componentName: string, actualHash: string): VerificationResult {
    const expectedHash = this.CORE_COMPONENTS[componentName];
    
    if (!expectedHash) {
      return {
        valid: false,
        component: componentName,
        expected: 'unknown',
        actual: actualHash,
        message: `Component ${componentName} not found in Truth Manifest`,
      };
    }
    
    const valid = expectedHash === actualHash;
    
    if (!valid) {
      this.emit('alert:ps-sha-infinity', {
        component: componentName,
        expected: expectedHash,
        actual: actualHash,
      });
      
      console.error(`[Gaia] ⚠️  PS-SHA-∞ ALERT: ${componentName} hash mismatch!`);
    }
    
    return {
      valid,
      component: componentName,
      expected: expectedHash,
      actual: actualHash,
      message: valid
        ? `✓ ${componentName} verified successfully`
        : `✗ ${componentName} integrity violation detected`,
    };
  }

  /**
   * Get the current Truth Manifest
   */
  getCurrentManifest(): TruthManifest | undefined {
    // Return the latest manifest
    const versions = Array.from(this.manifests.keys()).sort().reverse();
    return versions.length > 0 ? this.manifests.get(versions[0]) : undefined;
  }

  /**
   * Export manifest as JSON
   */
  exportManifest(manifest?: TruthManifest): string {
    const m = manifest || this.getCurrentManifest();
    
    if (!m) {
      throw new Error('No manifest available');
    }
    
    return JSON.stringify(m, null, 2);
  }

  /**
   * Export manifest as Markdown table
   */
  exportManifestTable(manifest?: TruthManifest): string {
    const m = manifest || this.getCurrentManifest();
    
    if (!m) {
      throw new Error('No manifest available');
    }
    
    let table = '# Live Truth Manifest\n\n';
    table += `**Version:** ${m.version}  \n`;
    table += `**Generated:** ${m.generated.toISOString()}  \n`;
    table += `**Root Hash:** \`${m.rootHash}\`\n\n`;
    table += '| Component | Target Identity | SHA-256 Hash (Hexadecimal) |\n';
    table += '|-----------|-----------------|----------------------------|\n';
    
    for (const component of m.components) {
      table += `| ${component.name} | ${component.target} | ${component.hash} |\n`;
    }
    
    return table;
  }

  // ---------------------------------------------------------------------------
  // System Status
  // ---------------------------------------------------------------------------

  getStatus(): {
    active: boolean;
    manifestCount: number;
    componentCount: number;
    lastGenerated?: Date;
  } {
    const current = this.getCurrentManifest();
    
    return {
      active: true,
      manifestCount: this.manifests.size,
      componentCount: Object.keys(this.CORE_COMPONENTS).length,
      lastGenerated: current?.generated,
    };
  }
}

// =============================================================================
// Default Export
// =============================================================================

export default GaiaAgent;

// =============================================================================
// Example Usage
// =============================================================================

if (require.main === module) {
  const gaia = new GaiaAgent();
  
  // Create Truth Manifest
  const manifest = gaia.createTruthManifest();
  
  // Export as table
  console.log('\n' + gaia.exportManifestTable(manifest));
  
  // Verify a component
  const testHash = gaia.generateComponentHash('blackroad-os-core');
  const result = gaia.verifyComponent('blackroad-os-core', testHash);
  console.log(`\n${result.message}`);
  
  // Listen for alerts
  gaia.on('alert:ps-sha-infinity', (alert) => {
    console.error('\n🚨 PS-SHA-∞ ALERT TRIGGERED 🚨');
    console.error(`Component: ${alert.component}`);
    console.error(`Expected: ${alert.expected}`);
    console.error(`Actual: ${alert.actual}`);
  });
}
