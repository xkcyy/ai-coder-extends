#!/bin/bash

# AI Config Tool - Node.js 本地安装脚本
# 将Node.js版本安装到本地环境

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 AI Config Tool - Node.js 本地安装${NC}"
echo -e "${BLUE}======================================${NC}"

# 检查Node.js版本
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 错误: 未找到Node.js${NC}"
    echo -e "${YELLOW}请先安装Node.js (https://nodejs.org/)${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
if [ -z "$NODE_VERSION" ]; then
    echo -e "${RED}❌ 错误: 未找到Node.js${NC}"
    echo -e "${YELLOW}请先安装Node.js (https://nodejs.org/)${NC}"
    exit 1
fi

# 检查Node.js版本要求
NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 16 ]; then
    echo -e "${RED}❌ 错误: 需要Node.js >= 16.0.0，当前版本: $NODE_VERSION${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js版本: $NODE_VERSION (符合要求)${NC}"

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
INSTALL_DIR="$CURRENT_DIR/ai-config-installation"

echo -e "${BLUE}📥 将安装到目录: $INSTALL_DIR${NC}"

# 清理旧安装
if [ -d "$INSTALL_DIR" ]; then
    echo -e "${YELLOW}🗑️ 清理旧安装...${NC}"
    rm -rf "$INSTALL_DIR"
fi

# 创建安装目录
mkdir -p "$INSTALL_DIR"

# 复制所有必要文件到安装目录
echo -e "${BLUE}📋 复制文件到安装目录...${NC}"

# 1. 复制编译后的JavaScript文件
cp -r dist/ "$INSTALL_DIR/"
echo -e "${GREEN}  ✅ 复制 dist/ 目录${NC}"

# 2. 复制配置文件
cp package.json "$INSTALL_DIR/"
echo -e "${GREEN}  ✅ 复制 package.json${NC}"

cp tsconfig.json "$INSTALL_DIR/"
echo -e "${GREEN}  ✅ 复制 tsconfig.json${NC}"

# 3. 创建使用脚本
echo -e "${BLUE}🔧 创建使用脚本...${NC}"

# 创建主启动脚本
cat > "$INSTALL_DIR/ai-config" << 'EOF'
#!/usr/bin/env node

/**
 * AI Config Tool - Node.js版本
 * 直接运行本地安装的版本
 */

const path = require('path');
const { spawnSync } = require('child_process');

// 获取安装目录
const installDir = path.dirname(__filename);
const cliPath = path.join(installDir, 'dist', 'cli.js');

// 运行CLI，传递所有参数
const args = process.argv.slice(2);
const child = spawnSync('node', [cliPath, ...args], {
    stdio: 'inherit',
    cwd: installDir
});

// 传递退出码
process.exit(child.status);
EOF

chmod +x "$INSTALL_DIR/ai-config"

# 创建Windows批处理文件
cat > "$INSTALL_DIR/ai-config.bat" << 'EOFF'
@echo off
node "%~dp0\\ai-config\\dist\\cli.js" %*
'

# 创建使用说明
cat > "$INSTALL_DIR/README-INSTALLATION.md" << 'EOF'
# AI Config Tool - Node.js版本使用指南

## 🎯 快速开始

安装完成后，您可以在以下位置使用AI配置工具：

### 方法1: 直接使用 (推荐)

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
echo @echo off > %APPDATA%\npm\ai-config.cmd
echo node "$INSTALL_DIR\dist\cli.js" %%* >> %APPDATA%\npm\ai-config.cmd
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

# 指定仓库和分支
ai-config sync --repo https://your-repo.git --branch develop
\`\`\`

#### 推送配置
\`\`\`bash
ai-config push --message "更新了Claude配置"

# 指定远程目录
ai-config push --remote-dir custom/config --message "自定义目录同步"
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
- 🔄 **现代开发**: async/await，ES6+模块

### 功能兼容性
- ✅ **相同命令**: 与Python版本命令行接口完全一致
- ✅ **相同参数**: 所有选项和默认值保持一致
- ✅ **相同功能**: sync、push、rollback三个核心功能
- ✅ **相同配置**: 支持.cursor和.claude配置目录
- ✅ **相同仓库**: 默认使用同一个GitHub仓库

## 🚀 使用示例

### 在您的项目中使用
\`\`\`bash
cd /path/to/your/project

# 首次使用预览模式
ai-config sync --dry-run --force

# 确认无误后执行同步
ai-config sync --force

# 推送您的配置更新
ai-config push --message "添加了新的Claude命令"
\`\`\`

### 日常使用建议
1. **定期备份**: 每次修改配置前先备份
2. **预览变更**: 使用--dry-run选项预览变更
3. **网络检查**: 确保可以访问远程仓库
4. **Git配置**: 确保Git用户配置正确

## 🛠️ 故障排除

### 常见问题
1. **权限问题**:
   - Linux/macOS: 使用 \`sudo\` 运行
   - Windows: 以管理员身份运行PowerShell/CMD

2. **命令未找到**:
   - 检查PATH环境变量
   - 检查是否正确安装

3. **网络问题**:
   - 设置代理: \`npm config set proxy http://proxy.company.com:8080\`
   - 使用镜像: \`npm config set registry https://registry.npmmirror.com\`

4. **版本冲突**:
   - 检查已安装版本: \`npm list -g ai-config\`
   - 卸载旧版本: \`npm uninstall -g ai-config\`

## 📞 技术支持

如遇到问题：
1. **GitHub Issues**: https://github.com/xkcyy/ai-coder-extends/issues
2. **文档**: README-nodejs.md
3. **许可证**: MIT License

现在您可以快速使用Node.js版本的AI配置工具了！🎉
EOF

echo -e "${GREEN}✅ Node.js版本的AI配置工具已成功安装到: $INSTALL_DIR${NC}"
echo ""
echo -e "${BLUE}📚 使用指南已保存到: $INSTALL_DIR/README-INSTALLATION.md${NC}"
echo ""
echo -e "${YELLOW}💡 快速开始命令:${NC}"
echo -e "${YELLOW}ai-config --version${NC}"
echo ""
echo -e "${YELLOW}ai-config --help${NC}"
echo ""
echo -e "${YELLOW}ai-config sync --dry-run --force${NC}"
echo ""
echo -e "${YELLOW}ai-config push --message \"更新配置\"${NC}"
echo ""
echo -e "${BLUE}🎯 安装完成！现在可以在任意目录使用ai-config命令${NC}"