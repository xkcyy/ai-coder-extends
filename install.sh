#!/bin/bash

# AI Config Tool - Installation Script
# One-click installation for Node.js version

set -e

# Configuration
REPO_URL="https://github.com/xkcyy/ai-coder-extends.git"
INSTALL_DIR="$HOME/ai-config-tool"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 AI Config Tool - Node.js Installation${NC}"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js >= 16.0.0${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js version: $NODE_VERSION${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm version: $NPM_VERSION${NC}"

echo ""
echo -e "${BLUE}📥 Installing from GitHub...${NC}"
echo -e "${BLUE}📍 Repository: $REPO_URL${NC}"
echo -e "${BLUE}📁 Installation directory: $INSTALL_DIR${NC}"

# Remove existing installation
if [ -d "$INSTALL_DIR" ]; then
    echo -e "${YELLOW}🗑️  Removing existing installation...${NC}"
    rm -rf "$INSTALL_DIR"
fi

# Clone the repository
echo -e "${BLUE}📥 Cloning repository...${NC}"
if ! git clone "$REPO_URL" "$INSTALL_DIR"; then
    echo -e "${RED}❌ Failed to clone repository${NC}"
    exit 1
fi

# Change to installation directory
cd "$INSTALL_DIR"

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
if ! npm install; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Build the project
echo -e "${BLUE}🔨 Building project...${NC}"
if ! npm run build; then
    echo -e "${RED}❌ Failed to build project${NC}"
    exit 1
fi

# Test the installation
echo -e "${BLUE}🧪 Testing installation...${NC}"
if ! node dist/cli.js --version; then
    echo -e "${RED}❌ Installation test failed${NC}"
    exit 1
fi

VERSION_OUTPUT=$(node dist/cli.js --version)
echo -e "${GREEN}✅ Installation verified: $VERSION_OUTPUT${NC}"

# Create symlink for global usage
GLOBAL_BIN_DIR="$HOME/.local/bin"
mkdir -p "$GLOBAL_BIN_DIR"

SYMLINK_PATH="$GLOBAL_BIN_DIR/ai-config"
if [ -L "$SYMLINK_PATH" ]; then
    echo -e "${YELLOW}🔗 Removing existing symlink...${NC}"
    rm "$SYMLINK_PATH"
fi

echo -e "${BLUE}🔗 Creating symlink: $SYMLINK_PATH${NC}"
ln -s "$INSTALL_DIR/dist/cli.js" "$SYMLINK_PATH"
chmod +x "$SYMLINK_PATH"

echo ""
echo -e "${GREEN}🎉 Installation completed successfully!${NC}"
echo ""
echo -e "${BLUE}📚 Usage:${NC}"
echo -e "  ${YELLOW}ai-config --help${NC}"
echo -e "  ${YELLOW}ai-config sync --dry-run --force${NC}"
echo -e "  ${YELLOW}ai-config push --message \"update config\"${NC}"
echo -e "  ${YELLOW}ai-config rollback <timestamp>${NC}"
echo ""
echo -e "${BLUE}💡 To make available from anywhere:${NC}"
echo -e "  ${YELLOW}export PATH=\"\$HOME/.local/bin:\$PATH\"${NC}"
echo -e "  ${YELLOW}source ~/.bashrc  # or ~/.zshrc${NC}"
echo ""
echo -e "${BLUE}🔧 Test installation:${NC}"
echo -e "  ${YELLOW}ai-config --version${NC}"
echo ""
echo -e "${GREEN}✅ Tool is ready to use!${NC}"