#!/usr/bin/env python3
"""Global installation script for ai-config-tool."""

import sys
import os
import shutil
import stat
from pathlib import Path

def find_python_scripts_dir():
    """Find the Python scripts directory where executables should be placed."""
    try:
        import site
        user_scripts = os.path.join(site.getuserbase(), 'Scripts')
        if os.path.exists(user_scripts):
            return user_scripts
    except:
        pass

    # Fallback: check standard locations
    python_dir = Path(sys.executable).parent
    scripts_dir = python_dir / "Scripts"
    if scripts_dir.exists():
        return str(scripts_dir)

    # Another fallback
    scripts_dir = python_dir / "bin"
    if scripts_dir.exists():
        return str(scripts_dir)

    return None

def find_site_packages():
    """Find the site-packages directory where packages should be placed."""
    try:
        import site
        user_site = site.getusersitepackages()
        if user_site and os.path.exists(user_site):
            return user_site
    except:
        pass

    # Fallback
    python_dir = Path(sys.executable).parent
    site_packages = python_dir / "site-packages"
    if site_packages.exists():
        return str(site_packages)

    # Another fallback
    python_dir = python_dir.parent
    site_packages = python_dir / "Lib" / "site-packages"
    if site_packages.exists():
        return str(site_packages)

    return None

def create_launcher_script(scripts_dir, site_packages):
    """Create the ai-config launcher script."""

    if os.name == 'nt':  # Windows
        # Create Python launcher
        launcher_py = os.path.join(scripts_dir, "ai-config.py")
        launcher_content = f'''#!/usr/bin/env python3
"""Launcher script for ai-config."""
import sys
import os

# Add the site-packages directory to Python path
sys.path.insert(0, r"{site_packages}")

try:
    from ai_config_tool.cli import main
    main()
except ImportError as e:
    print(f"Error importing ai_config_tool: {{e}}")
    print("Please ensure ai-config-tool is properly installed.")
    sys.exit(1)
except Exception as e:
    print(f"Error running ai-config: {{e}}")
    sys.exit(1)

if __name__ == "__main__":
    main()
'''
        with open(launcher_py, 'w', encoding='utf-8') as f:
            f.write(launcher_content)
        print(f"Created Python launcher: {launcher_py}")

        # Create batch file for Windows
        launcher_bat = os.path.join(scripts_dir, "ai-config.bat")
        bat_content = f'''@echo off
"{sys.executable}" "{launcher_py}" %*
'''
        with open(launcher_bat, 'w', encoding='utf-8') as f:
            f.write(bat_content)
        print(f"Created batch launcher: {launcher_bat}")

        # Try to create a .exe-like wrapper without using pyinstaller
        launcher_exe = os.path.join(scripts_dir, "ai-config.exe")
        wrapper_content = f'''@echo off
echo Using Python to run ai-config...
"{sys.executable}" "{launcher_py}" %*
'''
        with open(launcher_exe, 'w', encoding='utf-8') as f:
            f.write(wrapper_content)
        print(f"Created wrapper: {launcher_exe}")

        return [launcher_py, launcher_bat, launcher_exe]

    else:  # Unix-like systems
        launcher = os.path.join(scripts_dir, "ai-config")
        launcher_content = f'''#!/usr/bin/env python3
"""Launcher script for ai-config."""
import sys
import os

# Add the site-packages directory to Python path
sys.path.insert(0, "{site_packages}")

try:
    from ai_config_tool.cli import main
    main()
except ImportError as e:
    print(f"Error importing ai_config_tool: {{e}}")
    print("Please ensure ai-config-tool is properly installed.")
    sys.exit(1)
except Exception as e:
    print(f"Error running ai-config: {{e}}")
    sys.exit(1)

if __name__ == "__main__":
    main()
'''
        with open(launcher, 'w', encoding='utf-8') as f:
            f.write(launcher_content)

        # Make it executable
        st = os.stat(launcher)
        os.chmod(launcher, st.st_mode | stat.S_IEXEC)
        print(f"Created launcher: {launcher}")
        return [launcher]

def install_package(site_packages):
    """Install the package to site-packages."""
    source_dir = "ai_config_tool"
    target_dir = os.path.join(site_packages, "ai_config_tool")

    if not os.path.exists(source_dir):
        print(f"Error: Source directory '{source_dir}' not found!")
        return False

    # Remove existing installation
    if os.path.exists(target_dir):
        shutil.rmtree(target_dir)
        print(f"Removed existing installation: {target_dir}")

    # Copy the package
    shutil.copytree(source_dir, target_dir)
    print(f"Installed package to: {target_dir}")

    # Create __init__.py if it doesn't exist in site-packages
    init_file = os.path.join(site_packages, "ai_config_tool", "__init__.py")
    if not os.path.exists(init_file):
        with open(init_file, 'w', encoding='utf-8') as f:
            f.write('"""AI Config sync tooling package."""\n\n__all__ = ["__version__"]\n__version__ = "0.1.0"\n')

    return True

def check_path(scripts_dir):
    """Check if scripts directory is in PATH."""
    path_env = os.environ.get('PATH', '').split(os.pathsep)
    normalized_scripts = os.path.normpath(os.path.normcase(scripts_dir))

    for path_dir in path_env:
        if os.path.normpath(os.path.normcase(path_dir)) == normalized_scripts:
            return True
    return False

def main():
    """Main installation function."""
    print("=== ai-config-tool Global Installer ===")

    # Find directories
    scripts_dir = find_python_scripts_dir()
    site_packages = find_site_packages()

    if not scripts_dir:
        print("Error: Could not find Python scripts directory!")
        print("Please ensure Python is properly installed.")
        sys.exit(1)

    if not site_packages:
        print("Error: Could not find Python site-packages directory!")
        print("Please ensure Python is properly installed.")
        sys.exit(1)

    print(f"Scripts directory: {scripts_dir}")
    print(f"Site-packages directory: {site_packages}")

    # Create directories if they don't exist
    os.makedirs(scripts_dir, exist_ok=True)
    os.makedirs(site_packages, exist_ok=True)

    # Install the package
    print("\n--- Installing Package ---")
    if not install_package(site_packages):
        sys.exit(1)

    # Create launcher scripts
    print("\n--- Creating Launcher Scripts ---")
    launchers = create_launcher_script(scripts_dir, site_packages)

    # Check PATH
    print("\n--- PATH Configuration ---")
    if check_path(scripts_dir):
        print("✅ Scripts directory is already in PATH!")
        print("You should be able to run 'ai-config --help' from anywhere.")
    else:
        print("⚠️  Scripts directory is not in PATH!")
        print(f"Add '{scripts_dir}' to your PATH environment variable.")
        print("Or use the full path to the launcher:")
        for launcher in launchers:
            print(f"  {launcher}")

    print("\n--- Testing Installation ---")
    # Test the installation
    test_launcher = launchers[0]
    if os.name == 'nt':
        test_cmd = f'"{test_launcher}" --version'
        print(f"Testing: {test_cmd}")
        result = os.system(test_cmd)
        if result == 0:
            print("✅ Installation successful!")
        else:
            print("❌ Installation test failed!")
    else:
        test_cmd = f'"{test_launcher}" --version'
        print(f"Testing: {test_cmd}")
        result = os.system(test_cmd)
        if result == 0:
            print("✅ Installation successful!")
        else:
            print("❌ Installation test failed!")

    print("\n=== Installation Complete ===")
    print("Usage examples:")
    print(f"  ai-config --version")
    print(f"  ai-config sync --dry-run")
    print(f"  ai-config push --help")
    print(f"  ai-config rollback <timestamp>")

if __name__ == "__main__":
    main()