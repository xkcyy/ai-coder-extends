#!/bin/bash

# AI Config Tool - Node.js 本地安装脚本 (简化版)

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
NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 16 ]; then
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

# 创建使用说明
cat > "$INSTALL_DIR/README.md" << 'EOF'
# AI Config Tool - Node.js版本已安装！

## 🚀 快速开始

安装完成后，您可以在以下位置使用AI配置工具：

### 方法1: 直接使用

在任意目录下运行：
\`\`\`bash
ai-config --help
ai-config sync --dry-run --force
ai-config push --message "更新配置"
\`\`\`

### 方法2: 添加到系统PATH (可选)

#### Windows
\`\`\`cmd
# 添加到PATH (临时)
set PATH=$INSTALL_DIR;%PATH%

# 添加到PATH (永久)
setx PATH "%PATH%"

# 创建全局命令
echo @echo off > "%APPDATA%\\npm\\ai-config.cmd"
echo node "$INSTALL_DIR\\dist\\cli.js" %%* >> "%APPDATA%\\npm\\ai-config.cmd"
\`\`\`

#### Linux/macOS
\`\`\`bash
# 添加到PATH (临时)
export PATH="$INSTALL_DIR:$PATH"

# 添加到PATH (永久)
echo 'export PATH="$PATH"' >> ~/.bashrc
echo 'export PATH="$PATH"' >> ~/.zshrc

# 创建全局命令
mkdir -p ~/.local/bin
ln -sf "$INSTALL_DIR/ai-config" ~/.local/bin/ai-config
\`\`\`

## 📋 功能说明

### 基本命令

#### 查看版本
\`\`\`bash
ai-config --version
# 输出: 1.0.0
\`\`\`

#### 查看帮助
\`\`\`bash
ai-config --help
# 显示所有可用命令和选项
\`\`\`

#### 同步配置
\`\`\`bash
# 预览变更
ai-config sync --dry-run --force

# 实际同步
ai-config sync --force

#### 推送配置
\`\`\`bash
ai-config push --message "更新配置"
\`\`\`

#### 回滚配置
\`\`\`bash
# 查看可用备份
ls .ai-config-backup/

# 回滚到特定备份
ai-config rollback 20241129-143000
\`\`\`

## 🎯 特性

### Node.js版本优势
- 🚀 **性能提升**: 原生JavaScript执行，比Python更快
- 🔧 **类型安全**: 完整的TypeScript类型检查
- 📦 **依赖管理**: npm生态系统的成熟依赖管理
- 🛡️ **错误处理**: 更好的错误消息和调试体验

## ✅ 安装验证

现在您可以快速使用Node.js版本的AI配置工具了！🎉

运行测试：
ai-config --version
\`\`\`

🔧 快速脚本已创建完成！
EOF

echo -e "${GREEN}✅ Node.js版本的AI配置工具已成功安装到: $INSTALL_DIR${NC}"
echo -e "${BLUE}📚 使用指南已保存到: $INSTALL_DIR/README.md${NC}"
echo ""
echo -e "${YELLOW}💡 快速开始命令:${NC}"
echo -e "${YELLOW}ai-config --version${NC}"
echo -e "${YELLOW}ai-config --help${NC}"
echo ""
echo -e "${GREEN}🎉 安装完成！现在可以在任意目录使用ai-config命令${NC}"