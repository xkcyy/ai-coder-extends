# ai-config 使用说明

安装已经完成！以下是几种使用 ai-config 命令的方法：

## 推荐的使用方法

### 方法1：使用 Python 直接调用（推荐）
```bash
py -3 "C:\Users\xkcyy\AppData\Local\Programs\Python\Python39\Scripts\ai-config.py" [命令] [参数]
```

示例：
```bash
# 查看帮助
py -3 "C:\Users\xkcyy\AppData\Local\Programs\Python\Python39\Scripts\ai-config.py" --help

# 同步配置
py -3 "C:\Users\xkcyy\AppData\Local\Programs\Python\Python39\Scripts\ai-config.py" sync

# 推送配置
py -3 "C:\Users\xkcyy\AppData\Local\Programs\Python\Python39\Scripts\ai-config.py" push
```

### 方法2：在项目目录中使用
```bash
cd "C:\Users\xkcyy\Desktop\222\ai-coder-extends"
./ai-config.bat [命令] [参数]
```

### 方法3：使用完整的 .bat 路径
```bash
"C:\Users\xkcyy\AppData\Local\Programs\Python\Python39\Scripts\ai-config.bat" [命令] [参数]
```

## 主要命令

### sync - 同步远程配置到本地
从远程仓库同步 .cursor/.claude 配置到本地

```bash
py -3 "C:\Users\xkcyy\AppData\Local\Programs\Python\Python39\Scripts\ai-config.py" sync [选项]
```

常用选项：
- `--dry-run`: 预览将要同步的更改，不实际执行
- `--force`: 强制执行，忽略本地 git 状态检查
- `--verbose`: 显示详细日志

### push - 推送本地配置到远程
将本地的 .cursor/.claude 配置推送到远程仓库

```bash
py -3 "C:\Users\xkcyy\AppData\Local\Programs\Python\Python39\Scripts\ai-config.py" push [选项]
```

### rollback - 回滚到之前的备份
从指定的时间戳备份恢复配置

```bash
py -3 "C:\Users\xkcyy\AppData\Local\Programs\Python\Python39\Scripts\ai-config.py" rollback [时间戳]
```

## 配置文件位置
- 远程配置仓库: https://github.com/xkcyy/ai-coder-extends.git
- 远程分支: main
- 配置目录: remote-config/ai

## 故障排除
如果遇到 "command not found" 错误，请使用方法1的完整路径调用方式。

更多帮助请运行：
```bash
py -3 "C:\Users\xkcyy\AppData\Local\Programs\Python\Python39\Scripts\ai-config.py" --help
```