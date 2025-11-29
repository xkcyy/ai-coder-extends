# AI Config Tool - 全局安装指南

## 快速安装

### 方法1: 使用安装脚本 (推荐)

```bash
# Windows (PowerShell/CMD)
node install-global.js

# Linux/macOS
node install-global.js
```

### 方法2: 手动npm安装

```bash
# 全局安装
npm install -g .

# 或者从git仓库直接安装
npm install -g git+https://github.com/xkcyy/ai-coder-extends.git
```

## 安装后验证

安装完成后，在任何目录下运行：

```bash
ai-config --version
ai-config --help
```

应该显示版本信息和帮助文档。

## 安装位置

- **Windows**: `C:\Users\{username}\AppData\Roaming\npm\`
- **Linux**: `~/.npm-global/bin/` 或 `/usr/local/bin/`
- **macOS**: `/usr/local/bin/`

## 启动文件

npm会自动创建以下启动文件：

### Windows
- `ai-config.cmd` - CMD批处理文件
- `ai-config.ps1` - PowerShell脚本

### Linux/macOS
- `ai-config` - 可执行shell脚本

## 包含的文件

安装包只包含必要的运行文件：

```
node_modules/ai-config/
├── dist/              # 编译后的JavaScript文件
│   ├── cli.js        # CLI入口文件
│   ├── sync.js       # 同步功能
│   ├── push.js       # 推送功能
│   ├── backup.js     # 备份功能
│   ├── git-utils.js  # Git工具
│   ├── utils.js      # 通用工具
│   ├── constants.js  # 常量定义
│   ├── types.js      # 类型定义
│   └── index.js      # 库导出
├── package.json       # 包配置
└── README.md         # 文档
```

## 卸载

如需卸载，运行：

```bash
npm uninstall -g ai-config
```

## 故障排除

### 权限问题 (Windows)
```powershell
# 以管理员身份运行PowerShell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install -g .
```

### 权限问题 (Linux/macOS)
```bash
sudo npm install -g .
```

### 命令未找到
1. 确认npm全局bin目录在PATH中：
```bash
npm config get prefix
```

2. 检查PATH是否包含该目录

### 版本冲突
```bash
# 查看已安装版本
npm list -g ai-config

# 卸载后重新安装
npm uninstall -g ai-config
npm install -g .
```

## 系统要求

- Node.js >= 16.0.0
- npm >= 7.0.0
- Git >= 2.30
- 对目标仓库的读写权限

## 网络环境

如需在内网环境使用，可以：

1. 下载tarball包：
```bash
npm pack
```

2. 在内网环境安装：
```bash
npm install -g ai-config-1.0.0.tgz
```

## 企业安装

企业环境可以使用nexus等私有npm仓库：

```bash
# 发布到私有仓库
npm publish --registry=https://your-registry.com

# 从私有仓库安装
npm install -g ai-config --registry=https://your-registry.com
```

## Docker安装

```dockerfile
FROM node:18-alpine
RUN npm install -g ai-config
ENTRYPOINT ["ai-config"]
```

## 开发版本

如需安装开发版本：

```bash
# 克隆源码
git clone https://github.com/xkcyy/ai-coder-extends.git
cd ai-coder-extends

# 安装依赖并构建
npm install
npm run build

# 全局链接开发版本
npm link
```