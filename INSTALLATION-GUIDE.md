# AI Config Tool - Node.js版本安装指南

## 🎉 成功推送到GitHub！

Node.js版本的AI配置工具已经成功推送到GitHub仓库：
**https://github.com/xkcyy/ai-coder-extends.git**

## 📦 安装方法

### 方法1: 从GitHub直接安装 (推荐)

```bash
# 方法1: 直接从git仓库安装
npm install -g https://github.com/xkcyy/ai-coder-extends.git

# 方法2: 克隆后本地安装
git clone https://github.com/xkcyy/ai-coder-extends.git
cd ai-coder-extends
npm install
npm run build
npm install -g .
```

### 方法2: 使用npx临时运行 (无需安装)

```bash
# 直接运行，无需全局安装
npx ai-config@latest --help
npx ai-config@latest sync --dry-run --force
npx ai-config@latest push --message "更新配置"
```

### 方法3: 从源码构建安装

```bash
# 1. 克隆源码
git clone https://github.com/xkcyy/ai-coder-extends.git
cd ai-coder-extends

# 2. 安装依赖
npm install

# 3. 构建项目
npm run build

# 4. 全局安装
npm install -g .
```

## 🖥️ 系统要求

- **Node.js**: >= 16.0.0
- **npm**: >= 7.0.0
- **Git**: >= 2.30
- **系统**: Windows, Linux, macOS

## 📍 安装位置

### Windows
```
C:\Users\{username}\AppData\Roaming\npm\
├── ai-config.cmd          # Windows批处理启动器
├── ai-config.ps1          # PowerShell启动器
└── node_modules\ai-config\ # 包文件
    ├── dist\             # 编译后的JavaScript
    ├── package.json       # 包配置
    └── node_modules\      # 依赖包
```

### Linux/macOS
```
~/.npm-global/bin/ai-config     # 可执行文件
/usr/local/bin/ai-config         # 系统级安装
~/.npm-global/lib/node_modules/ai-config/  # 包文件
```

## ✅ 安装验证

安装完成后，运行以下命令验证：

```bash
# 检查版本
ai-config --version
# 应该输出: 1.0.0

# 查看帮助
ai-config --help

# 测试基本功能
ai-config sync --dry-run --force
```

## 📚 功能说明

### 主要命令

1. **ai-config sync** - 同步配置
   ```bash
   ai-config sync [选项]

   # 预览变更（不实际执行）
   ai-config sync --dry-run --force

   # 指定远程仓库
   ai-config sync --repo https://your-repo.git --branch main
   ```

2. **ai-config push** - 推送配置
   ```bash
   ai-config push [选项]

   # 推送本地配置
   ai-config push --message "更新了Claude配置"

   # 指定远程目录
   ai-config push --remote-dir remote-config/ai --message "同步配置"
   ```

3. **ai-config rollback** - 回滚配置
   ```bash
   ai-config rollback <时间戳>

   # 查看可用备份
   ls .ai-config-backup/

   # 回滚到特定备份
   ai-config rollback 20241129-143000
   ```

### 命令选项

| 选项 | 描述 | 默认值 |
|------|------|---------|
| `--repo` | 远程仓库URL | `https://github.com/xkcyy/ai-coder-extends.git` |
| `--branch` | 远程分支 | `main` |
| `--remote-dir` | 远程配置目录 | `remote-config/ai` |
| `--target` | 目标项目路径 | 当前目录 |
| `--dry-run` | 预览模式，不执行实际操作 | `false` |
| `--force` | 强制执行，忽略本地更改 | `false` |
| `--message` | 推送时的提交信息 | `chore: sync ai IDE config` |
| `--verbose` | 详细日志输出 | `false` |

## 🔄 与Python版本的兼容性

Node.js版本完全兼容原Python版本：

- ✅ **相同的功能**: sync, push, rollback
- ✅ **相同的参数**: 所有命令行选项完全一致
- ✅ **相同的配置**: 支持`.cursor`和`.claude`目录
- ✅ **相同的备份**: 自动创建时间戳备份
- ✅ **相同的仓库**: 默认使用同一个GitHub仓库
- ✅ **相同的安全**: 检查Git状态，阻止意外覆盖

## 🚀 Node.js版本的优势

1. **更好的性能**
   - 原生JavaScript执行，无需Python解释器开销
   - 更快的文件操作和Git克隆

2. **类型安全**
   - 完整的TypeScript类型检查
   - 编译时错误检测
   - IDE自动完成和类型提示

3. **现代依赖管理**
   - npm生态系统的成熟依赖
   - 更好的版本冲突解决
   - 安全的依赖审计

4. **更好的错误处理**
   - 用户友好的错误消息
   - 更详细的调试信息
   - 异步错误处理

## 🐛 故障排除

### 常见问题

1. **命令未找到**
   ```bash
   # 检查npm全局bin目录
   npm config get prefix

   # 手动添加到PATH
   export PATH="$PATH:/usr/local/bin"  # Linux/macOS
   set PATH="%PATH%;C:\Program Files\nodejs"  # Windows
   ```

2. **权限问题**
   ```bash
   # Linux/macOS
   sudo npm install -g https://github.com/xkcyy/ai-coder-extends.git

   # Windows
   # 以管理员身份运行PowerShell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   npm install -g https://github.com/xkcyy/ai-coder-extends.git
   ```

3. **网络问题**
   ```bash
   # 使用代理
   npm config set proxy http://proxy.company.com:8080
   npm config set https-proxy http://proxy.company.com:8080

   # 使用国内镜像
   npm config set registry https://registry.npmmirror.com
   ```

4. **Node.js版本问题**
   ```bash
   # 检查版本
   node --version

   # 升级Node.js (需要>=16.0.0)
   # 推荐使用nvm: nvm install 18
   ```

## 📞 技术支持

- **GitHub Issues**: https://github.com/xkcyy/ai-coder-extends/issues
- **文档**: README-nodejs.md
- **许可证**: MIT

## 🏷️ 开发

如果您想参与开发：

```bash
# 克隆仓库
git clone https://github.com/xkcyy/ai-coder-extends.git
cd ai-coder-extends

# 安装依赖
npm install

# 开发模式运行
npm run dev sync --dry-run

# 构建项目
npm run build

# 链接开发版本
npm link
```

## 🎯 总结

Node.js版本的AI配置工具现在可以通过以下方式安装：

1. **npm全局安装** (推荐):
   ```bash
   npm install -g https://github.com/xkcyy/ai-coder-extends.git
   ```

2. **npx临时使用**:
   ```bash
   npx ai-config@latest --help
   ```

3. **源码构建**:
   ```bash
   git clone https://github.com/xkcyy/ai-coder-extends.git
   cd ai-coder-extends
   npm install && npm run build && npm install -g .
   ```

所有安装方法都将提供完整的AI配置同步功能，与原Python版本完全兼容！