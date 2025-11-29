# Node.js 版本 - AI 配置同步工具

这是原 Python 版本的 Node.js 重写版本，提供相同的功能但使用 Node.js 生态系统。

## 功能特性

- **sync**: 从远程仓库同步 `.cursor` 和 `.claude` 配置到本地
- **push**: 将本地配置推送到远程仓库
- **rollback**: 从备份恢复配置

## 安装和使用

### 1. 安装依赖

```bash
npm install
```

### 2. 构建项目

```bash
npm run build
```

### 3. 使用命令行工具

```bash
# 查看帮助
node dist/cli.js --help

# 同步配置（预览模式）
node dist/cli.js sync --dry-run

# 强制同步并忽略本地更改
node dist/cli.js sync --force

# 推送本地配置
node dist/cli.js push --message "更新配置"

# 回滚到特定备份
node dist/cli.js rollback 20241129-143000
```

### 4. 开发模式

```bash
# 直接运行 TypeScript 源码
npm run dev sync --dry-run
```

## 项目结构

```
src/
├── cli.ts          # CLI 入口点
├── sync.ts         # 同步功能
├── push.ts         # 推送功能
├── backup.ts       # 备份和回滚功能
├── git-utils.ts    # Git 操作工具
├── utils.ts        # 通用工具函数
├── constants.ts    # 常量定义
├── types.ts        # TypeScript 类型定义
└── index.ts        # 库导出

dist/               # 编译后的 JavaScript 文件
package.json        # 项目配置
tsconfig.json       # TypeScript 配置
```

## 主要改进

1. **类型安全**: 使用 TypeScript 提供完整的类型检查
2. **异步处理**: 使用 async/await 替代回调
3. **现代依赖**: 使用 simple-git, commander 等现代 Node.js 库
4. **错误处理**: 改进的错误处理和用户友好的错误消息
5. **性能优化**: 更好的文件操作和内存管理

## 开发依赖

- **commander**: CLI 框架
- **simple-git**: Git 操作包装器
- **date-fns**: 日期格式化
- **typescript**: TypeScript 编译器

## 与 Python 版本的兼容性

Node.js 版本完全兼容原 Python 版本的命令行接口和功能：

- 相同的命令名称和参数
- 相同的配置文件格式
- 相同的远程仓库结构
- 相同的备份和回滚机制

## 测试

```bash
# 基本功能测试
node test.js

# 手动测试同步功能（需要有效的 Git 配置）
mkdir test-project
cd test-project
node ../dist/cli.js sync --dry-run --force
```

## 部署

### 作为全局工具安装

```bash
npm install -g .
ai-config --help
```

### 作为 npm 包发布

```bash
npm publish
```

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
RUN npm install -g .
ENTRYPOINT ["ai-config"]
```

## 故障排除

1. **Git 权限问题**: 确保对目标仓库有读取和写入权限
2. **Node.js 版本**: 需要 Node.js >= 16.0.0
3. **依赖安装**: 使用 `npm ci` 确保依赖一致性
4. **权限问题**: 确保对目标目录有读写权限

## 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 运行测试
5. 创建 Pull Request

## 许可证

MIT License - 与原 Python 版本相同