"""Setup script for ai-config-tool."""

from setuptools import setup, find_packages
import os

# Read the contents of README file
def read_readme():
    with open("README.md", "r", encoding="utf-8") as fh:
        return fh.read()

# Read the contents of requirements file if it exists
def read_requirements():
    requirements = []
    if os.path.exists("requirements.txt"):
        with open("requirements.txt", "r", encoding="utf-8") as fh:
            requirements = [line.strip() for line in fh if line.strip() and not line.startswith("#")]
    return requirements

setup(
    name="ai-config-tool",
    version="0.1.0",
    author="ai-coder-extends maintainers",
    author_email="maintainers@example.com",
    description="Sync and push AI IDE configs for Claude / Code Cursor",
    long_description=read_readme(),
    long_description_content_type="text/markdown",
    url="https://github.com/xkcyy/ai-coder-extends",
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: Utilities",
    ],
    python_requires=">=3.9",
    install_requires=read_requirements(),
    entry_points={
        "console_scripts": [
            "ai-config=ai_config_tool.cli:main",
        ],
    },
    project_urls={
        "Bug Reports": "https://github.com/xkcyy/ai-coder-extends/issues",
        "Source": "https://github.com/xkcyy/ai-coder-extends",
        "Homepage": "https://github.com/xkcyy/ai-coder-extends",
    },
    include_package_data=True,
    keywords=["ai", "ide", "config", "claude", "code-cursor"],
)