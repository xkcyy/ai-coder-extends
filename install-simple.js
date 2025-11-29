#!/usr/bin/env node

/**
 * Simple GitHub Installation Script for AI Config Tool
 * Clones and builds from GitHub repository
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const REPO_URL = 'https://github.com/xkcyy/ai-coder-extends.git';
const INSTALL_DIR = path.join(os.homedir(), 'ai-config-tool');

console.log('🚀 Installing AI Config Tool from GitHub...\n');

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
    fs.rmSync(INSTALL_DIR, { recursive: true, force: true });
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

  // Create global symlink (Unix/Linux/macOS)
  if (process.platform !== 'win32') {
    try {
      const globalBin = path.join(os.homedir(), '.local', 'bin');
      fs.mkdirSync(globalBin, { recursive: true });

      const symlinkPath = path.join(globalBin, 'ai-config');
      const targetPath = path.join(INSTALL_DIR, 'dist', 'cli.js');

      if (fs.existsSync(symlinkPath)) {
        fs.unlinkSync(symlinkPath);
      }

      fs.symlinkSync(targetPath, symlinkPath);
      console.log(`🔗 Created symlink: ${symlinkPath}`);

      // Add to PATH if not already there
      const shellRC = process.env.SHELL?.includes('zsh')
        ? path.join(os.homedir(), '.zshrc')
        : path.join(os.homedir(), '.bashrc');

      if (fs.existsSync(shellRC)) {
        const rcContent = fs.readFileSync(shellRC, 'utf8');
        const pathLine = 'export PATH="$HOME/.local/bin:$PATH"';

        if (!rcContent.includes('$HOME/.local/bin')) {
          fs.writeFileSync(shellRC, `\n${pathLine}\n`, { flag: 'a' });
          console.log(`📝 Added to PATH in ${shellRC}`);
          console.log(`   Please run: source ${shellRC}`);
        }
      }
    } catch (symlinkError) {
      console.warn('⚠️  Could not create symlink. You may need to add to PATH manually.');
    }
  }

  // Create Windows batch file
  if (process.platform === 'win32') {
    const globalNpmBin = execSync('npm config get prefix', { encoding: 'utf8' }).trim();
    fs.mkdirSync(globalNpmBin, { recursive: true });

    const batchFile = path.join(globalNpmBin, 'ai-config.cmd');
    const batchContent = `@echo off
node "${path.join(INSTALL_DIR, 'dist', 'cli.js')}" %*`;

    fs.writeFileSync(batchFile, batchContent);
    console.log(`📝 Created batch file: ${batchFile}`);
    console.log('✅ Now available as: ai-config');
  }

  console.log('\n🎉 Installation completed successfully!');
  console.log('\n📚 Usage:');

  if (process.platform !== 'win32') {
    console.log('  ai-config --help');
    console.log('  ai-config sync --dry-run');
    console.log('  ai-config push --message "update config"');
    console.log('\n💡 If ai-config command not found, run:');
    console.log(`   export PATH="${path.join(os.homedir(), '.local', 'bin')}:$PATH"`);
    console.log('   Or add this to your shell profile (.bashrc, .zshrc, etc.)');
  } else {
    console.log('  ai-config --help');
    console.log('  ai-config sync --dry-run');
    console.log('  ai-config push --message "update config"');
    console.log('  ai-config rollback <timestamp>');
  }

  console.log('\n🔧 Test installation:');
  console.log(`  node "${path.join(INSTALL_DIR, 'dist', 'cli.js')}" --version`);

} catch (error) {
  console.error('\n❌ Installation failed:', error.message);

  if (error.code === 'EACCES') {
    console.error('\n🔑 Permission denied. Try running with elevated privileges:');
    if (process.platform === 'win32') {
      console.error('   Run PowerShell/CMD as Administrator');
    } else {
      console.error('   sudo node install-simple.js');
    }
  } else if (error.code === 'ENOENT') {
    console.error('\n📦 Git or npm not found. Please install Node.js and npm first.');
  } else if (error.stderr && error.stderr.includes('404')) {
    console.error('\n🔍 Repository not found. Check the URL:', REPO_URL);
  } else if (error.stderr && error.stderr.includes('ETIMEDOUT')) {
    console.error('\n🌐 Network timeout. Check your internet connection.');
  }

  // Clean up on failure
  if (fs.existsSync(INSTALL_DIR)) {
    console.log('\n🧹 Cleaning up...');
    fs.rmSync(INSTALL_DIR, { recursive: true, force: true });
  }

  process.exit(1);
}