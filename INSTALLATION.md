# AI Config Tool - 完整安装指南

## 📦 安装包内容

### ✅ 已创建的安装文件

1. **`ai-config-1.0.0.tgz`** - npm安装包 (17.7 kB)
2. **`install-global.js`** - 全局安装脚本
3. **`package.json`** - 包配置文件
4. **`LICENSE`** - MIT许可证
5. **`README-installation.md`** - 详细安装文档

## 🚀 安装方法

### 方法1: 从npm包安装 (推荐)

```bash
# 全局安装
npm install -g ai-config-1.0.0.tgz

# 安装后测试
ai-config --version
```

### 方法2: 使用安装脚本

```bash
# 自动安装脚本
node install-global.js

# 手动运行
npm install -g .
```

### 方法3: 从源码安装

```bash
# 克隆源码
git clone https://github.com/xkcyy/ai-coder-extends.git
cd ai-coder-extends

# 安装依赖并构建
npm install
npm run build

# 全局安装
npm install -g .
```

### 方法4: 从远程仓库安装

```bash
# 直接从git安装
npm install -g git+https://github.com/xkcyy/ai-coder-extends.git
```

## 📍 安装位置

### Windows
安装后会在以下位置创建文件：

```
C:\Users\xkcyy\AppData\Roaming\npm\
├── ai-config              # 主程序符号链接
├── ai-config.cmd          # Windows批处理包装器
├── ai-config.ps1          # PowerShell包装器
└── node_modules\ai-config\ # 包文件
    ├── dist\             # 编译后的JS文件
    ├── package.json       # 包配置
    └── README.md         # 文档
```

### Linux/macOS
```
~/.npm-global/bin/ai-config  # 可执行文件
/usr/local/bin/ai-config     # 系统级安装
```

## ✅ 安装验证

安装完成后，在任意目录运行：

```bash
# 检查版本
ai-config --version
# 输出: 1.0.0

# 查看帮助
ai-config --help

# 测试同步命令
ai-config sync --help

# 查看推送帮助
ai-config push --help
```

## 🔧 基本使用

### 1. 首次使用 - 预览同步

```bash
# 在你的项目目录中
cd your-project

# 预览同步变更（不执行实际操作）
ai-config sync --dry-run --verbose

# 如果需要强制同步（忽略本地更改）
ai-config sync --dry-run --force --verbose
```

### 2. 实际同步配置

```bash
# 同步配置到本地
ai-config sync --force

# 或指定远程仓库
ai-config sync --repo https://your-repo.git --branch main
```

### 3. 推送本地配置

```bash
# 推送当前配置到远程仓库
ai-config push --message "更新Claude配置"

# 指定远程目录
ai-config push --remote-dir remote-config/ai --message "同步配置"
```

### 4. 备份和回滚

```bash
# 查看可用备份
ls .ai-config-backup/

# 回滚到特定备份
ai-config rollback 20241129-143000
```

## 📋 包信息

- **包名**: `ai-config`
- **版本**: `1.0.0`
- **大小**: 17.7 kB (压缩后)
- **解压后**: 72.1 kB
- **依赖**: 3个运行时依赖
- **Node.js要求**: >= 16.0.0

## 🛠️ 高级配置

### 环境变量

```bash
# 设置默认远程仓库
export AI_CONFIG_REPO="https://your-repo.git"

# 设置默认分支
export AI_CONFIG_BRANCH="main"

# 设置默认远程目录
export AI_CONFIG_REMOTE_DIR="remote-config/ai"
```

### 配置文件

创建 `~/.ai-config.json`:

```json
{
  "defaultRepo": "https://github.com/xkcyy/ai-coder-extends.git",
  "defaultBranch": "main",
  "defaultRemoteDir": "remote-config/ai",
  "verbose": true
}
```

## 🐛 故障排除

### 命令未找到

1. **检查安装**:
   ```bash
   npm list -g ai-config
   ```

2. **检查PATH**:
   ```bash
   echo $PATH  # Linux/macOS
   echo %PATH%  # Windows CMD
   ```

3. **重新安装**:
   ```bash
   npm uninstall -g ai-config
   npm install -g ai-config-1.0.0.tgz
   ```

### 权限问题

**Windows**:
```powershell
# 以管理员身份运行PowerShell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install -g ai-config-1.0.0.tgz
```

**Linux/macOS**:
```bash
sudo npm install -g ai-config-1.0.0.tgz
```

### Git问题

1. **检查Git配置**:
   ```bash
   git config --global user.name
   git config --global user.email
   ```

2. **设置Git配置**:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

### 网络问题

**使用代理**:
```bash
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
npm install -g ai-config-1.0.0.tgz
```

**国内镜像**:
```bash
npm config set registry https://registry.npmmirror.com
npm install -g ai-config-1.0.0.tgz
```

## 🔄 升级

```bash
# 卸载旧版本
npm uninstall -g ai-config

# 安装新版本
npm install -g ai-config-2.0.0.tgz
```

## 🗑️ 卸载

```bash
npm uninstall -g ai-config

# 清理配置文件 (可选)
rm -rf ~/.ai-config.json
rm -rf ~/.ai-config-backup/
```

## 📞 支持

- **GitHub**: https://github.com/xkcyy/ai-coder-extends
- **Issues**: https://github.com/xkcyy/ai-coder-extends/issues
- **文档**: README-installation.md

## 📄 许可证

MIT License - 详见 LICENSE 文件