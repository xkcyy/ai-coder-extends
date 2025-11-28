"""Package-wide constants."""
from pathlib import Path

DEFAULT_REPO_URL = "http://gitee.com/xkcyy/ai-config.git"
SUPPORTED_DIRECTORIES = (".cursor", ".claude")
BACKUP_ROOT_NAME = ".ai-config-backup"
DEFAULT_TMP_PREFIX = "ai-config-sync-"
# Provide a default target path helper
DEFAULT_TARGET_PATH = Path.cwd()
