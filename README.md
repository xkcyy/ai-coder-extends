# AI 配置同步工具

强大的 Node.js 命令行工具，用于在本地项目和远程仓库之间同步 AI IDE 配置目录（Cursor、Claude）。让您的 AI 编程助手在所有项目中保持一致的配置。

## ✨ 主要功能

- **同步**：从远程仓库拉取 `.cursor` 和 `.claude` 配置
- **推送**：将本地配置上传到远程仓库
- **备份与回滚**：自动创建带时间戳的备份，支持回滚
- **预览模式**：在应用更改前预览所有操作
- **多 IDE 支持**：支持 Cursor、Claude 等 AI IDE
- **TypeScript**：完整的类型安全和现代异步编程模式
- **跨平台**：支持 Windows、macOS 和 Linux

## 📦 安装

### 全局安装（推荐）

```bash
npm install -g https://github.com/xkcyy/ai-coder-extends.git
```

## 🛠️ 使用方法

### 基本命令

```bash
# 显示帮助信息
ai-config --help

# 预览模式同步配置（不会实际修改文件）
ai-config sync --dry-run

# 同步配置到本地
ai-config sync

# 强制同步（忽略工作区检查）
ai-config sync --force

# 推送本地配置到远程仓库
ai-config push --message "更新 AI 配置"

# 回滚到指定时间戳的备份
ai-config rollback 20241130-143000
```

### 高级选项

```bash
# 从自定义仓库和分支同步
ai-config sync \
  --repo https://github.com/user/my-ai-configs.git \
  --branch main \
  --remote-dir configs/ai

# 同步指定的 Git 版本（标签、提交等）
ai-config sync --ref v1.0.0

# 指定项目目录
ai-config sync --target /path/to/my/project

# 启用详细日志输出
ai-config sync --verbose
```

## 📁 支持的目录

- `.cursor/` - Cursor IDE 配置目录
- `.claude/` - Claude AI 配置目录

## ⚙️ 配置选项

### 默认设置
- **仓库地址**: `https://github.com/xkcyy/ai-coder-extends.git`
- **分支**: `main`
- **远程目录**: `remote-config/ai`
- **目标路径**: 当前工作目录

### 环境变量
- `DEBUG=true` - 启用详细日志输出

## 🏗️ 项目结构

```
src/
├── cli.ts          # CLI 入口点和命令定义
├── sync.ts         # 同步功能实现
├── push.ts         # 推送功能实现
├── backup.ts       # 备份和回滚操作
├── git-utils.ts    # Git 操作封装
├── utils.ts        # 工具函数
├── constants.ts    # 应用常量
├── types.ts        # TypeScript 类型定义
└── index.ts        # 库导出

dist/               # 编译后的 JavaScript 文件
package.json        # 项目配置
tsconfig.json       # TypeScript 配置
LICENSE             # MIT 许可证
```

## 🚦 命令参考

### `sync`
从远程仓库同步配置到本地项目。

```bash
ai-config sync [选项]
```

**选项:**
- `--repo <url>` - 远程仓库地址
- `--branch <branch>` - 远程分支名称（默认：main）
- `--ref <ref>` - Git 版本引用（分支、标签或提交）
- `--remote-dir <dir>` - 远程仓库中包含配置的目录
- `--target <path>` - 目标项目路径（默认：当前目录）
- `--dry-run` - 显示更改但不实际应用
- `--force` - 跳过工作区检查
- `--verbose` - 启用详细日志

### `push`
将本地配置推送到远程仓库。

```bash
ai-config push [选项]
```

**选项:**
- `--repo <url>` - 远程仓库地址
- `--branch <branch>` - 目标分支（默认：main）
- `--remote-dir <dir>` - 远程仓库中存放配置的目录
- `--target <path>` - 要推送的项目路径（默认：当前目录）
- `--message <msg>` - 提交信息（默认："chore: sync ai IDE config"）
- `--verbose` - 启用详细日志

### `rollback`
从之前的备份恢复配置。

```bash
ai-config rollback <时间戳> [选项]
```

**参数:**
- `时间戳` - 备份时间戳（格式：YYYYMMDD-HHMMSS）

**选项:**
- `--target <path>` - 目标项目路径（默认：当前目录）
- `--verbose` - 启用详细日志

## 🔒 安全特性

### 备份系统
- 在任何更改前自动创建带时间戳的备份
- 支持回滚到任何之前的备份状态
- 备份存储在 `.ai-config-backup/` 目录中

### Git 安全检查
- 操作前检查工作区状态
- 需要明确的 `--force` 标志来跳过安全检查
- 保护现有的 Git 历史和配置

### 预览模式
- 在应用更改前预览所有计划的操作
- 精确显示将要创建、修改或删除的文件
- 安全地测试配置变更

## 🐳 Docker 支持

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
RUN npm install -g .
ENTRYPOINT ["ai-config"]
```

## 🧪 开发

### 脚本命令
```bash
# 构建项目
npm run build

# 开发模式运行
npm run dev sync --dry-run

# 启动 CLI
npm start

# 运行测试
npm test
```

### 贡献指南
1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交您的更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 创建 Pull Request

## 🔧 依赖项

### 运行时依赖
- **commander** (`^11.1.0`) - CLI 框架
- **simple-git** (`^3.20.0`) - Git 操作封装
- **date-fns** (`^2.30.0`) - 日期处理工具

### 开发依赖
- **typescript** (`^5.3.0`) - TypeScript 编译器
- **ts-node** (`^10.9.1`) - TypeScript 执行器
- **@types/node** (`^20.10.0`) - Node.js 类型定义

## 📋 系统要求

- **Node.js** >= 16.0.0
- **Git** 已配置并具有必要权限
- 对目标目录的**写入权限**
- 对远程仓库的**网络访问权限**

## 🚨 故障排除

### 常见问题

1. **Git 权限错误**
   ```bash
   # 检查 Git 配置
   git config --list

   # 确保身份验证正确
   git config --global credential.helper
   ```

2. **工作区未清理**
   ```bash
   # 检查 Git 状态
   git status

   # 暂存或提交更改
   git stash
   # 或使用 --force 标志（不推荐）
   ```

3. **Node.js 版本**
   ```bash
   # 检查 Node.js 版本
   node --version  # 应该 >= 16.0.0
   ```

4. **网络问题**
   ```bash
   # 测试仓库访问
   git ls-remote https://github.com/xkcyy/ai-coder-extends.git
   ```

### 调试模式
启用详细日志进行故障排除：
```bash
ai-config sync --verbose
# 或
DEBUG=true ai-config sync
```

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 🤝 致谢

- 使用现代 TypeScript 和 Node.js 最佳实践构建
- 源于跨项目保持 AI IDE 配置一致性的需求
- 感谢开源社区提供让这一切成为可能的优秀工具

## 📞 技术支持

- **问题反馈**: [GitHub Issues](https://github.com/xkcyy/ai-coder-extends/issues)
- **项目仓库**: [https://github.com/xkcyy/ai-coder-extends](https://github.com/xkcyy/ai-coder-extends)
- **文档**: [项目 Wiki](https://github.com/xkcyy/ai-coder-extends/wiki)

---

**让您的 AI 编程助手在所有项目中保持同步！🚀**