#!/bin/bash

# AI Config Tool - Node.js 本地安装脚本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 AI Config Tool - Node.js 本地安装${NC}"
echo -e "${BLUE}======================================${NC}"

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 错误: 未找到Node.js${NC}"
    echo -e "${YELLOW}请先安装Node.js (https://nodejs.org/)${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js版本: $NODE_VERSION${NC}"

# 检查Node.js版本要求
if [[ "$NODE_VERSION" < "16.0.0" ]]; then
    echo -e "${RED}❌ 错误: 需要Node.js >= 16.0.0，当前版本: $NODE_VERSION${NC}"
    exit 1
fi

# 检查npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ 错误: 未找到npm${NC}"
    echo -e "${YELLOW}请先安装npm (https://www.npmjs.com/)${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm版本: $NPM_VERSION${NC}"

# 设置安装目录
CURRENT_DIR=$(pwd)
INSTALL_DIR="$CURRENT_DIR/ai-config-installed"

echo -e "${BLUE}📥 将安装到目录: $INSTALL_DIR${NC}"

# 清理旧安装
if [ -d "$INSTALL_DIR" ]; then
    echo -e "${YELLOW}🗑️ 清理旧安装...${NC}"
    rm -rf "$INSTALL_DIR"
fi

# 创建安装目录
mkdir -p "$INSTALL_DIR"

echo -e "${BLUE}📋 复制文件到安装目录...${NC}"

# 复制所有必要文件到安装目录
cp -r dist/ "$INSTALL_DIR/"
cp package.json "$INSTALL_DIR/"
cp tsconfig.json "$INSTALL_DIR/"

echo -e "${GREEN}  ✅ 复制编译后的文件${NC}"

# 创建主启动脚本
cat > "$INSTALL_DIR/ai-config" << 'EOF'
#!/usr/bin/env node

const path = require('path');
const { spawnSync } = require('child_process');

const installDir = path.dirname(__filename);
const cliPath = path.join(installDir, 'dist', 'cli.js');

const args = process.argv.slice(2);
const child = spawnSync('node', [cliPath, ...args], {
    stdio: 'inherit',
    cwd: installDir
});

process.exit(child.status || 0);
EOF

chmod +x "$INSTALL_DIR/ai-config"

# 创建Windows批处理文件
cat > "$INSTALL_DIR/ai-config.bat" << 'EOF'
@echo off
node "%~dp0\\ai-config-installed\\dist\\cli.js" %*
EOF

echo -e "${GREEN}✅ Node.js版本的AI配置工具已成功安装到: $INSTALL_DIR${NC}"
echo ""
echo -e "${BLUE}📚 使用指南已保存到: $INSTALL_DIR/README.md${NC}"
echo ""
echo -e "${YELLOW}💡 快速开始命令:${NC}"
echo -e "${YELLOW}ai-config --version${NC}"
echo -e "${YELLOW}ai-config --help${NC}"
echo ""
echo -e "${GREEN}🎉 安装完成！现在可以在任意目录使用ai-config命令${NC}"