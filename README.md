# ai-coder-extends

## AI 配置同步 & 推送工具

`ai-config` 命令行工具负责将本地 `.cursor`、`.claude` 目录与 **GitHub 仓库 `https://github.com/xkcyy/ai-coder-extends.git` 的 `remote-config/ai/` 目录** 保持一致：

- `sync`：从 `origin/main` 拉取最新 Claude / Code Cursor 配置到当前工程；
- `push`：将当前工程的配置直接提交并推送到远程主分支；
- `rollback`：从 `.ai-config-backup/<timestamp>` 恢复本地配置。

两条命令均通过 Git 完成，兼容 Windows、macOS、Linux（只需 Git ≥2.30 + Python ≥3.9）。

### 快速开始

Windows PowerShell / CMD：
```powershell
# 查看帮助
py -3 ai-config --help

# 在当前项目预览同步差异
py -3 ai-config sync --dry-run

# 将本地配置推送到 GitHub main 分支
py -3 ai-config push --message "chore: sync"
```

Linux / macOS：
```bash
# 查看帮助
./ai-config --help

# 默认从 main 分支同步 remote-config/ai/.cursor|.claude
./ai-config sync

# 推送本地配置
./ai-config push --message "chore: sync"
```

> **提示**：若希望任何目录都能运行，可把脚本加入 PATH，例如 `cp ai-config ~/.local/bin/` (Linux) 或在 Windows 使用 `setx PATH`。

### 常用命令

```bash
# 干运行，显示新增/修改/删除文件
ai-config sync --dry-run --verbose

# 指定远程仓库 / 分支 / 目录（默认 remote-config/ai）
ai-config sync --repo https://github.com/xkcyy/ai-coder-extends.git \
                --branch main \
                --remote-dir remote-config/ai

# 忽略本地未提交改动
ai-config sync --force

# 推送本地配置到主分支指定目录
ai-config push --remote-dir remote-config/ai --branch main

# 自定义提交信息
ai-config push --message "feat: update claude commands"

# 回滚到某次备份（同步命令前自动创建）
ai-config rollback 20251127-103000
```

### 工作流与说明
- **默认远程**：`https://github.com/xkcyy/ai-coder-extends.git` 的 `remote-config/ai/`（可用 `--remote-dir` 覆盖）。
- **同步（sync）**：
  - 克隆远程仓库指定分支（默认 `main`）→ 读取 `remote-config/ai/.cursor/.claude` → 计算差异 → 可选 `--dry-run` → 自动备份 → 镜像覆盖本地。
  - 若远程目录不存在，会提示先执行 `ai-config push` 初始化。
- **推送（push）**：
  - 克隆远程仓库 → 用本地 `.cursor`、`.claude` 全量覆盖 `remote-config/ai/` → 若检测到变化则自动 `git commit` + `git push origin <branch>`。
  - 需要本机 Git 已配置 `user.name`/`user.email` 且具备推送权限（HTTPS/SSH 任意）。
- **备份与回滚**：每次成功写入前会把本地配置保存到 `.ai-config-backup/<timestamp>/`，可使用 `rollback` 命令恢复。
- **Windows 注意**：
  - 建议使用 `py -3 ai-config <command>`（Python 启动器会自动定位版本）。
  - 若遇到权限提示，请在具有写入权限的项目目录运行命令。

### 参数速览
- `--repo`：远程仓库地址（默认指向 GitHub 主仓库）。
- `--branch`：同步或推送的远程分支，默认 `main`。
- `--remote-dir`：仓库内存放配置的目录，默认 `remote-config/ai`。
- `--target`：本地项目根目录（默认为当前目录）。
- `--message`：推送时的提交信息。
- `--dry-run` / `--force` / `--verbose`：控制同步行为、输出和安全策略。

### 认证与故障排查
- 确保本机 Git 凭据可以直接 `git clone`、`git push` 目标仓库；若使用 HTTPS 可配合凭据管理器。
- `sync` 若提示 “Remote directory not found”，说明远程尚未初始化配置，需先执行 `ai-config push`。
- `push` 若显示 `non-fast-forward`，请先执行 `ai-config sync` 获取最新配置，再次推送。
- 每次同步或推送都会输出日志，可搭配 `--verbose` 查看完整 Git 命令执行情况。
