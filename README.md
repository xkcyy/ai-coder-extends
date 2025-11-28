# ai-coder-extends

## AI 配置同步工具

该仓库内置 `ai-config` 命令行工具，可将固定远程仓库 `http://gitee.com/xkcyy/ai-config.git` 中的 `.cursor`、`.claude` 目录同步到任意本地工程，实现多 IDE（Claude、Code Cursor 等）配置统一。

### 使用方式

```bash
# 查看帮助
./ai-config --help

# 干运行，预览差异
./ai-config sync --dry-run

# 指定分支并强制覆盖
./ai-config sync --ref main --force

# 回滚到某次备份
./ai-config rollback 20251127-103000
```

- 同步前自动检测 `.cursor`、`.claude` 是否存在未提交改动；可通过 `--force` 跳过。
- 实际写入前会在 `.ai-config-backup/<timestamp>` 创建备份，可用 `rollback` 恢复。
- `--repo`、`--target`、`--ref` 等参数可覆盖默认行为，便于在不同项目中复用。
