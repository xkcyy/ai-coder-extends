#!/usr/bin/env node

/**
 * Global installation script for ai-config
 * Installs the tool globally using npm
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Installing AI Config Tool globally...\n');

try {
  // Check if Node.js version meets requirements
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

  if (majorVersion < 16) {
    console.error(`❌ Node.js ${nodeVersion} is not supported. Please upgrade to Node.js >= 16.0.0`);
    process.exit(1);
  }

  console.log(`✅ Node.js version: ${nodeVersion}`);

  // Check if npm is available
  try {
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`✅ npm version: ${npmVersion}`);
  } catch (error) {
    console.error('❌ npm not found. Please install npm first.');
    process.exit(1);
  }

  console.log('\n📦 Installing globally...');

  // Install globally
  execSync('npm install -g .', { stdio: 'inherit', cwd: __dirname });

  console.log('\n🎉 Installation completed successfully!');
  console.log('\n📚 Usage:');
  console.log('  ai-config --help');
  console.log('  ai-config sync --dry-run');
  console.log('  ai-config push --message "update config"');
  console.log('  ai-config rollback <timestamp>');

  console.log('\n🔍 Verify installation:');
  console.log('  ai-config --version');

  // Show installation location
  try {
    const globalPath = execSync('npm config get prefix', { encoding: 'utf8' }).trim();
    const binPath = path.join(globalPath, 'ai-config');
    console.log(`\n📍 Installation location: ${binPath}`);

    // Check if the file exists
    try {
      const fs = require('fs');
      if (fs.existsSync(binPath)) {
        console.log('✅ Global binary found');
      }

      // Check Windows cmd wrapper
      const cmdPath = path.join(globalPath, 'ai-config.cmd');
      if (process.platform === 'win32' && fs.existsSync(cmdPath)) {
        console.log('✅ Windows CMD wrapper found');
      }

      // Check PowerShell wrapper
      const ps1Path = path.join(globalPath, 'ai-config.ps1');
      if (process.platform === 'win32' && fs.existsSync(ps1Path)) {
        console.log('✅ PowerShell wrapper found');
      }

    } catch (err) {
      console.warn('⚠️  Could not verify binary location');
    }
  } catch (err) {
    console.warn('⚠️  Could not determine npm global path');
  }

} catch (error) {
  console.error('\n❌ Installation failed:', error.message);

  if (error.code === 'EACCES') {
    console.error('\n🔑 Permission denied. Try running as administrator:');
    console.error('   sudo npm install -g .');
    console.error('   Or run with elevated privileges on Windows.');
  } else if (error.code === 'ENOENT') {
    console.error('\n📦 npm not found. Please install Node.js and npm first.');
  } else {
    console.error('\n📋 Full error details:');
    console.error(error);
  }

  process.exit(1);
}