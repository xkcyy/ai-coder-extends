#!/usr/bin/env python3
"""Manual installation script for ai-config-tool."""

import sys
import os
import shutil
from pathlib import Path

def main():
    if len(sys.argv) > 1 and sys.argv[1] in ["-h", "--help"]:
        print("Usage: python install.py")
        print("Installs ai-config-tool to Python user scripts directory")
        return

    # Get user scripts directory
    user_scripts = Path(sys.executable).parent / "Scripts" if sys.platform == "win32" else Path.home() / ".local" / "bin"
    if not user_scripts.exists():
        print(f"User scripts directory not found: {user_scripts}")
        # Try alternative location
        user_scripts = Path(sys.prefix) / "Scripts" if sys.platform == "win32" else Path(sys.prefix) / "bin"
        if not user_scripts.exists():
            print(f"Alternative scripts directory not found: {user_scripts}")
            sys.exit(1)

    # Get site-packages directory
    import site
    user_site = site.getusersitepackages()
    if not os.path.exists(user_site):
        print(f"User site-packages directory not found: {user_site}")
        sys.exit(1)

    print(f"Installing to: {user_site}")
    print(f"Installing scripts to: {user_scripts}")

    # Create ai_config_tool directory in user site-packages
    target_dir = Path(user_site) / "ai_config_tool"
    if target_dir.exists():
        shutil.rmtree(target_dir)
    shutil.copytree("ai_config_tool", target_dir)

    # Create launcher script
    launcher_content = '''"""Launcher script for ai-config."""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from ai_config_tool.cli import main

if __name__ == "__main__":
    main()
'''

    if sys.platform == "win32":
        launcher_file = user_scripts / "ai-config.py"
        with open(launcher_file, "w") as f:
            f.write(launcher_content)

        # Create .exe launcher if possible
        exe_content = f'''@echo off
"{sys.executable}" "{launcher_file}" %*
'''
        exe_file = user_scripts / "ai-config.bat"
        with open(exe_file, "w") as f:
            f.write(exe_content)

        print(f"Created launcher: {launcher_file}")
        print(f"Created batch file: {exe_file}")
    else:
        launcher_file = user_scripts / "ai-config"
        with open(launcher_file, "w") as f:
            f.write(launcher_content)
        os.chmod(launcher_file, 0o755)
        print(f"Created launcher: {launcher_file}")

    print("Installation completed successfully!")
    print(f"Run 'ai-config --help' to verify installation")

if __name__ == "__main__":
    main()