#!/usr/bin/env node

/**
 * BlackRoad OS CLI
 * Command-line interface for managing BlackRoad OS infrastructure
 */

import('../dist/index.js').catch((err) => {
  console.error('Failed to start BlackRoad CLI:', err.message);
  process.exit(1);
});
