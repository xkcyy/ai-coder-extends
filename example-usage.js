#!/usr/bin/env node

/**
 * Example usage of the Node.js AI Config Tool
 * This demonstrates how to use the library programmatically
 */

const { runSync, runPush, createBackup } = require('./dist/index.js');
const path = require('path');

async function demonstrateUsage() {
  const testDir = path.resolve('./test-config');

  console.log('🚀 AI Config Tool - Node.js Version Demo');
  console.log('==========================================\n');

  try {
    // 1. Create a backup before making changes
    console.log('1️⃣ Creating backup...');
    const backupPath = await createBackup(testDir, ['.cursor', '.claude']);
    if (backupPath) {
      console.log(`✅ Backup created at: ${backupPath}`);
    } else {
      console.log('ℹ️  No existing configuration to backup');
    }

    // 2. Preview sync changes (dry run)
    console.log('\n2️⃣ Previewing sync changes...');
    await runSync({
      target: testDir,
      dryRun: true,
      force: true,
      verbose: true
    });

    // 3. Actually sync the configuration
    console.log('\n3️⃣ Syncing configuration...');
    console.log('⚠️  This would normally push/pull real changes!');
    console.log('ℹ️  Skipping actual sync to avoid modifying your setup');

    // 4. Example of how to push changes
    console.log('\n4️⃣ Example push command (not executed):');
    console.log('await runPush({');
    console.log('  target: testDir,');
    console.log('  commitMessage: "feat: update AI configuration"');
    console.log('});');

    console.log('\n✅ Demo completed successfully!');
    console.log('\n📚 To use the CLI:');
    console.log('   node dist/cli.js --help');
    console.log('   node dist/cli.js sync --dry-run');
    console.log('   node dist/cli.js push --message "your commit message"');

  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    process.exit(1);
  }
}

// Run the demonstration
demonstrateUsage();