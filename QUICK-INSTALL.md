# AI Config Tool - Node.js版本快速安装指南

## 🚀 直接从当前安装包

您已经有了完整的Node.js版本，可以直接使用：

### 方法1: 直接使用编译后的文件 (推荐)

```bash
# 在您的项目目录中运行
cd C:\Users\xkcyy\Desktop\222\ai-coder-extends

# 查看帮助
node dist/cli.js --help

# 预览同步
node dist/cli.js sync --dry-run --force

# 实际同步 (需要实际需要时)
node dist/cli.js sync --force

# 推送配置
node dist/cli.js push --message "更新配置"

# 查看版本
node dist/cli.js --version
```

### 方法2: 创建全局命令 (Windows)

```cmd
# 创建全局命令脚本
echo @echo off > C:\Users\xkcyy\AppData\Roaming\npm\ai-config.cmd
echo node "C:\Users\xkcyy\Desktop\222\ai-coder-extends\dist\cli.js" %%* >> C:\Users\xkcyy\AppData\Roaming\npm\ai-config.cmd

# 现在可以在任意位置使用
ai-config --help
ai-config sync --dry-run --force
ai-config push --message "更新配置"
```

### 方法3: 设置环境变量

```cmd
# 添加到PATH (临时)
set PATH=C:\Users\xkcyy\Desktop\222\ai-coder-extends;%PATH%

# 添加到PATH (永久 - 需要重启)
setx PATH "C:\Users\xkcyy\Desktop\222\ai-coder-extends;%PATH%"

# 创建批处理文件
echo node "%~dp0\dist\cli.js" %%* > C:\Users\xkcyy\Desktop\222\ai-coder-extends\ai-config.bat
```

## 📦 如果要发布到GitHub

如果您想将Node.js版本发布到GitHub以便其他人安装：

### 1. 创建新的GitHub仓库
```bash
# 创建新的仓库 (nodejs-ai-config-tool)
git init nodejs-ai-config-tool
git add .
git commit -m "feat: Node.js version of AI config tool"
git remote add origin https://github.com/xkcyy/nodejs-ai-config-tool.git
git push -u origin main
```

### 2. 发布到npm
```bash
# 如果要发布到npm registry
npm publish
```

### 3. 用户安装方式
```bash
# 从新的GitHub仓库安装
npm install -g git+https://github.com/xkcyy/nodejs-ai-config-tool.git

# 或直接使用
npx nodejs-ai-config-tool --help
```

## 🛠️ 当前可用的文件

### 编译后的JavaScript文件
- `dist/cli.js` - CLI入口 (3.9 kB)
- `dist/sync.js` - 同步功能 (8.8 kB)
- `dist/push.js` - 推送功能 (7.1 kB)
- `dist/backup.js` - 备份功能 (3.1 kB)
- `dist/git-utils.js` - Git工具 (3.9 kB)
- `dist/utils.js` - 通用工具 (2.3 kB)
- `dist/constants.js` - 常量定义 (676 B)
- `dist/types.js` - 类型定义 (110 B)
- `dist/index.js` - 库导出 (1.7 kB)

### TypeScript源文件
- `src/cli.ts` - CLI源码
- `src/sync.ts` - 同步功能源码
- `src/push.ts` - 推送功能源码
- `src/backup.ts` - 备份功能源码
- `src/git-utils.ts` - Git工具源码
- `src/utils.ts` - 通用工具源码
- `src/constants.ts` - 常量定义源码
- `src/types.ts` - 类型定义源码
- `src/index.ts` - 库导出源码

### 配置文件
- `package.json` - npm包配置
- `tsconfig.json` - TypeScript配置
- `.npmignore` - npm打包忽略文件
- `LICENSE` - MIT许可证

## 📝 使用示例

### 在您的项目目录中使用
```bash
# 在您的Claude/Cursor项目中
cd /path/to/your/project

# 预览将要同步的配置
node C:\Users\xkcyy\Desktop\222\ai-coder-extends\dist\cli.js sync --dry-run --force

# 如果一切正常，执行实际同步
node C:\Users\xkcyy\Desktop\222\ai-coder-extends\dist\cli.js sync --force

# 当您更新了本地配置后推送到远程仓库
node C:\Users\xkcyy\Desktop\222\ai-coder-extends\dist\cli.js push --message "更新了配置"

# 如果需要回滚到之前的版本
node C:\Users\xkcyy\Desktop\222\ai-coder-extends\dist\cli.js rollback 20241129-143000
```

### 日常使用建议
1. **定期备份**: 每次修改配置前先备份
2. **预览变更**: 使用 `--dry-run` 预览变更
3. **版本控制**: 确保远程仓库的权限配置正确
4. **网络检查**: 确保可以访问GitHub仓库

## ✅ 安装验证

运行以下命令验证安装：

```bash
node C:\Users\xkcyy\Desktop\222\ai-coder-extends\dist\cli.js --version
# 应该输出: 1.0.0

node C:\Users\xkcyy\Desktop\222\ai-coder-extends\dist\cli.js --help
# 应该显示完整的帮助信息
```

## 📞 技术支持

如果遇到问题：
1. 检查Node.js版本 >= 16.0.0
2. 确保有Git和npm安装
3. 检查网络连接
4. 查看错误日志获取详细信息

当前版本完全兼容原Python版本的命令和功能！