#!/usr/bin/env node

/**
 * Package creation script for ai-config
 * Creates distributable npm package
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Creating AI Config Tool package...\n');

try {
  // Ensure dist directory exists and is up to date
  console.log('1️⃣ Building TypeScript...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check required files exist
  const requiredFiles = [
    'dist/cli.js',
    'dist/index.js',
    'package.json',
    'LICENSE',
    'README.md'
  ];

  console.log('\n2️⃣ Checking package files...');
  for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}`);
    } else {
      throw new Error(`Missing required file: ${file}`);
    }
  }

  // Create npm pack
  console.log('\n3️⃣ Creating npm package...');
  execSync('npm pack', { stdio: 'inherit' });

  // List created files
  const files = fs.readdirSync('.').filter(file => file.endsWith('.tgz'));
  if (files.length > 0) {
    console.log(`\n📦 Package created: ${files[0]}`);
    console.log(`\n🚀 To install from this package:`);
    console.log(`   npm install -g ${files[0]}`);

    console.log(`\n📋 Package contents:`);
    execSync(`tar -tf ${files[0]}`, { stdio: 'inherit' });
  } else {
    throw new Error('Failed to create package file');
  }

  console.log('\n✅ Package creation completed!');

} catch (error) {
  console.error('\n❌ Package creation failed:', error.message);
  process.exit(1);
}