#!/usr/bin/env node

/**
 * Local Installation Script for AI Config Tool
 * Installs tool locally without global path modification
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const REPO_URL = 'https://github.com/xkcyy/ai-coder-extends.git';
const CURRENT_DIR = process.cwd();
const INSTALL_DIR = path.join(CURRENT_DIR, 'ai-config-installation');

console.log('🚀 Installing AI Config Tool locally...\n');

try {
  // Check Node.js version
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

  console.log('\n📥 Installing from GitHub...');
  console.log(`📍 Repository: ${REPO_URL}`);
  console.log(`📁 Installation directory: ${INSTALL_DIR}`);

  // Remove existing installation if it exists
  if (fs.existsSync(INSTALL_DIR)) {
    console.log('🗑️  Removing existing installation...');
    try {
      fs.rmSync(INSTALL_DIR, { recursive: true, force: true });
    } catch (rmError) {
      console.warn('⚠️  Could not remove directory, continuing...');
    }
  }

  // Clone the repository
  console.log('📥 Cloning repository...');
  execSync(`git clone "${REPO_URL}" "${INSTALL_DIR}"`, { stdio: 'inherit' });

  // Change to installation directory
  process.chdir(INSTALL_DIR);

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the project
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Create a start script
  const startScriptPath = path.join(INSTALL_DIR, 'ai-config');
  const startScriptContent = `#!/usr/bin/env node
/**
 * AI Config Tool Local Runner
 */

const { spawn } = require('child_process');

const args = process.argv.slice(2);
const cliPath = require('path').join(__dirname, 'dist', 'cli.js');

const child = spawn('node', [cliPath, ...args], {
  stdio: 'inherit',
  cwd: require('path').join(__dirname, '..')
});

child.on('exit', (code) => {
  process.exit(code);
});
`;

  fs.writeFileSync(startScriptPath, startScriptContent);

  // Make script executable on Unix systems
  if (process.platform !== 'win32') {
    fs.chmodSync(startScriptPath, '755');
  }

  // Create Windows batch file
  const batchScriptPath = path.join(INSTALL_DIR, 'ai-config.bat');
  const batchScriptContent = `@echo off
node "%~dp0\\dist\\cli.js" %*`;

  fs.writeFileSync(batchScriptPath, batchScriptContent);

  console.log('\n🎉 Installation completed successfully!');
  console.log('\n📚 Tool Usage:');

  if (process.platform !== 'win32') {
    console.log(`  cd "${INSTALL_DIR}"`);
    console.log('  ./ai-config --help');
    console.log('  ./ai-config sync --dry-run');
    console.log('  ./ai-config push --message "update config"');
    console.log('  ./ai-config rollback <timestamp>');
  } else {
    console.log(`  cd "${INSTALL_DIR}"`);
    console.log('  ai-config --help');
    console.log('  ai-config sync --dry-run');
    console.log('  ai-config push --message "update config"');
    console.log('  ai-config rollback <timestamp>');
  }

  console.log('\n🔧 Test installation:');
  if (process.platform !== 'win32') {
    console.log(`  cd "${INSTALL_DIR}"`);
    console.log('  ./ai-config --version');
  } else {
    console.log(`  cd "${INSTALL_DIR}"`);
    console.log('  ai-config --version');
  }

  console.log('\n💡 To make available from anywhere:');
  console.log('  1. Add to PATH:', INSTALL_DIR);
  console.log('  2. Or use absolute path:');
  if (process.platform !== 'win32') {
    console.log(`     ${path.join(INSTALL_DIR, 'ai-config')} --help`);
  } else {
    console.log(`     ${path.join(INSTALL_DIR, 'ai-config.bat')} --help`);
  }

  // Test the installation
  try {
    console.log('\n🧪 Testing installation...');
    process.chdir(INSTALL_DIR);
    const testResult = execSync('node dist/cli.js --version', { encoding: 'utf8' }).trim();
    console.log(`✅ Installation verified: ${testResult}`);
  } catch (testError) {
    console.warn('⚠️  Installation test failed:', testError.message);
  }

} catch (error) {
  console.error('\n❌ Installation failed:', error.message);

  if (error.code === 'EACCES') {
    console.error('\n🔑 Permission denied. Try running with elevated privileges:');
    if (process.platform === 'win32') {
      console.error('   Run PowerShell/CMD as Administrator');
    } else {
      console.error('   sudo node install-local.js');
    }
  } else if (error.code === 'ENOENT') {
    console.error('\n📦 Git or npm not found. Please install Node.js and npm first.');
  } else if (error.stderr && error.stderr.includes('404')) {
    console.error('\n🔍 Repository not found. Check URL:', REPO_URL);
  } else if (error.stderr && error.stderr.includes('ETIMEDOUT')) {
    console.error('\n🌐 Network timeout. Check your internet connection.');
  }

  // Clean up on failure
  if (fs.existsSync(INSTALL_DIR)) {
    try {
      console.log('\n🧹 Cleaning up...');
      fs.rmSync(INSTALL_DIR, { recursive: true, force: true });
    } catch (cleanupError) {
      console.warn('⚠️  Could not clean up:', cleanupError.message);
    }
  }

  process.exit(1);
}