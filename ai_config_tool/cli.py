"""Command line interface for ai-config sync."""
from __future__ import annotations

import argparse
import logging
from pathlib import Path

from . import __version__
from .constants import DEFAULT_REPO_URL, DEFAULT_TARGET_PATH, SUPPORTED_DIRECTORIES
from .backup import rollback_snapshot
from .sync import run_sync


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="ai-config",
        description="Synchronize AI IDE configuration directories from remote repo.",
    )
    parser.add_argument("--version", action="version", version=f"ai-config {__version__}")
    subparsers = parser.add_subparsers(dest="command", required=True)

    sync_parser = subparsers.add_parser(
        "sync", help="Synchronize .cursor/.claude from remote repository"
    )
    sync_parser.add_argument(
        "--repo",
        default=DEFAULT_REPO_URL,
        help="Remote repository URL (default: %(default)s)",
    )
    sync_parser.add_argument(
        "--ref",
        help="Optional git ref (branch, tag, or commit) to sync",
    )
    sync_parser.add_argument(
        "--target",
        type=Path,
        default=DEFAULT_TARGET_PATH,
        help="Target project path (default: current directory)",
    )
    sync_parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show planned changes without writing files",
    )
    sync_parser.add_argument(
        "--force",
        action="store_true",
        help="Bypass dirty git tree check for target directories",
    )
    sync_parser.add_argument(
        "--verbose",
        action="store_true",
        help="Enable verbose logging",
    )

    rollback_parser = subparsers.add_parser(
        "rollback", help="Restore .cursor/.claude from a previous backup"
    )
    rollback_parser.add_argument("timestamp", help="Backup timestamp to restore")
    rollback_parser.add_argument(
        "--target",
        type=Path,
        default=DEFAULT_TARGET_PATH,
        help="Target project path (default: current directory)",
    )
    rollback_parser.add_argument(
        "--verbose",
        action="store_true",
        help="Enable verbose logging",
    )

    return parser


def configure_logging(verbose: bool) -> None:
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    )


def main(argv: list[str] | None = None) -> None:
    parser = build_parser()
    args = parser.parse_args(argv)
    configure_logging(bool(getattr(args, "verbose", False)))

    if args.command == "sync":
        run_sync(
            target=args.target,
            repo_url=args.repo,
            ref=args.ref,
            dry_run=args.dry_run,
            force=args.force,
        )
        return

    if args.command == "rollback":
        backup_path = rollback_snapshot(
            target=args.target.expanduser().resolve(),
            snapshot=args.timestamp,
            directories=SUPPORTED_DIRECTORIES,
        )
        logging.getLogger(__name__).info("Restored backup from %s", backup_path)
        return

    parser.error("Unknown command")


if __name__ == "__main__":
    main()
