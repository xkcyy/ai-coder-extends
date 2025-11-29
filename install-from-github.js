#!/usr/bin/env node

/**
 * GitHub Installation Script for AI Config Tool
 * Installs directly from GitHub repository
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_URL = 'https://github.com/xkcyy/ai-coder-extends.git';
const TEMP_DIR = 'ai-config-temp-install';
const GLOBAL_INSTALL_PATH = path.resolve(__dirname, '..');

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

  console.log('\n📥 Installing from GitHub repository...');

  // Install directly from GitHub
  console.log(`📍 Repository: ${REPO_URL}`);

  try {
    // Try multiple installation methods
    let installSuccess = false;
    let lastError = null;

    // Method 1: Direct npm install from git
    try {
      console.log('🔄 Trying direct npm install from git...');
      execSync(`npm install -g "${REPO_URL}"`, { stdio: 'inherit' });
      installSuccess = true;
    } catch (error) {
      lastError = error;
      console.log('⚠️  Direct npm install failed, trying alternative method...');
    }

    // Method 2: Clone and install locally
    if (!installSuccess) {
      try {
        console.log('🔄 Cloning repository and installing locally...');

        // Remove temp directory if exists
        if (fs.existsSync(TEMP_DIR)) {
          fs.rmSync(TEMP_DIR, { recursive: true, force: true });
        }

        // Clone the repository
        execSync(`git clone "${REPO_URL}" "${TEMP_DIR}"`, { stdio: 'inherit' });

        // Install from cloned directory
        process.chdir(TEMP_DIR);
        execSync('npm install', { stdio: 'inherit' });
        execSync('npm run build', { stdio: 'inherit' });
        execSync('npm install -g .', { stdio: 'inherit' });

        // Clean up
        process.chdir(GLOBAL_INSTALL_PATH);
        fs.rmSync(TEMP_DIR, { recursive: true, force: true });

        installSuccess = true;
      } catch (cloneError) {
        lastError = cloneError;
        console.log('⚠️  Clone and install method failed...');
      }
    }

    // Method 3: Use npx if available
    if (!installSuccess) {
      try {
        console.log('🔄 Trying npx installation...');
        execSync(`npx -y ai-config@latest --help`, { stdio: 'inherit' });
        console.log('\n📦 Note: npx will download and run the tool temporarily');
        console.log('   For permanent installation, please resolve the installation errors above.');
        installSuccess = true;
      } catch (npxError) {
        lastError = npxError;
      }
    }

    if (!installSuccess && lastError) {
      throw lastError;
    }

    console.log('\n🎉 Installation completed successfully!');
    console.log('\n📚 Usage:');
    console.log('  ai-config --help');
    console.log('  ai-config sync --dry-run');
    console.log('  ai-config push --message "update config"');
    console.log('  ai-config rollback <timestamp>');

    // Verify installation
    console.log('\n🔍 Verifying installation...');
    try {
      execSync('ai-config --version', { stdio: 'pipe' });
      console.log('✅ Global installation verified');

      // Show npm global prefix
      const globalPrefix = execSync('npm config get prefix', { encoding: 'utf8' }).trim();
      console.log(`📍 Installation location: ${globalPrefix}`);

      // Check for Windows files
      if (process.platform === 'win32') {
        const cmdFile = path.join(globalPrefix, 'ai-config.cmd');
        const ps1File = path.join(globalPrefix, 'ai-config.ps1');

        if (fs.existsSync(cmdFile)) {
          console.log('✅ Windows CMD wrapper found');
        }
        if (fs.existsSync(ps1File)) {
          console.log('✅ PowerShell wrapper found');
        }
      }

    } catch (verifyError) {
      console.warn('⚠️  Could not verify installation:', verifyError.message);
      console.log('\n💡 Try manually adding npm global directory to PATH');
      console.log(`   npm global prefix: ${execSync('npm config get prefix', { encoding: 'utf8' }).trim()}`);
    }

  } catch (installError) {
    throw installError;
  }

} catch (error) {
  console.error('\n❌ Installation failed:', error.message);

  if (error.code === 'EACCES') {
    console.error('\n🔑 Permission denied. Try running as administrator:');
    console.error('   sudo npm install -g git+https://github.com/xkcyy/ai-coder-extends.git');
    console.error('   Or run with elevated privileges on Windows.');
  } else if (error.code === 'ENOENT') {
    console.error('\n📦 npm not found. Please install Node.js and npm first.');
  } else if (error.stderr && error.stderr.includes('ETIMEDOUT')) {
    console.error('\n🌐 Network timeout. Check your internet connection or try again.');
  } else if (error.stderr && error.stderr.includes('404')) {
    console.error('\n🔍 Repository not found. Check the URL:', REPO_URL);
  } else {
    console.error('\n📋 Full error details:');
    console.error(error);
  }

  process.exit(1);
}