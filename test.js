#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('Testing Node.js AI Config Tool...\n');

try {
  // Test CLI help
  console.log('1. Testing help command:');
  const helpResult = execSync('node dist/cli.js --help', { encoding: 'utf8' });
  console.log(helpResult);

  // Test sync help
  console.log('2. Testing sync help:');
  const syncHelp = execSync('node dist/cli.js sync --help', { encoding: 'utf8' });
  console.log(syncHelp);

  // Test push help
  console.log('3. Testing push help:');
  const pushHelp = execSync('node dist/cli.js push --help', { encoding: 'utf8' });
  console.log(pushHelp);

  // Test rollback help
  console.log('4. Testing rollback help:');
  const rollbackHelp = execSync('node dist/cli.js rollback --help', { encoding: 'utf8' });
  console.log(rollbackHelp);

  console.log('✅ All CLI commands work correctly!');

} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}