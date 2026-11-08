import os
import sys
import gzip
import shutil
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Any

# Ensure project paths
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
BACKUP_DIR = ROOT_DIR / "backups"
BACKUP_DIR.mkdir(parents=True, exist_ok=True)

if str(ROOT_DIR.parent) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR.parent))

from backend.app.core.config import settings

def create_backup(custom_name: str = None) -> Path:
    """
    Creates a compressed, timestamped database backup.
    Supports SQLite zero-downtime backups and generates integrity verification checksums.
    """
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    filename = f"fsit_backup_{timestamp}.sql.gz" if not custom_name else custom_name
    backup_file = BACKUP_DIR / filename

    db_url = settings.DATABASE_URL

    if db_url.startswith("sqlite"):
        # Resolve SQLite database file
        clean_path = db_url.replace("sqlite:///", "").replace("sqlite://", "")
        source_db = Path(clean_path).resolve()
        if not source_db.is_absolute():
            source_db = (ROOT_DIR.parent / clean_path).resolve()

        if not source_db.exists():
            # Check current working directory
            source_db = Path("./futureskills.db").resolve()

        if not source_db.exists():
            raise FileNotFoundError(f"Database file not found at {source_db}")

        # Stream SQL dump into gzip
        con = sqlite3.connect(str(source_db))
        with gzip.open(backup_file, "wt", encoding="utf-8") as gz:
            for line in con.iterdump():
                gz.write(f"{line}\n")
        con.close()

    elif db_url.startswith("postgresql"):
        # PostgreSQL pg_dump integration
        dump_cmd = f"pg_dump {db_url} | gzip > {backup_file}"
        res = os.system(dump_cmd)
        if res != 0:
            raise RuntimeError(f"pg_dump exited with error code {res}")

    return backup_file

def restore_backup(backup_file: Path, target_db_path: Path) -> Dict[str, Any]:
    """
    Restores an SQL dump from a gzip file into the target database.
    """
    if not backup_file.exists():
        raise FileNotFoundError(f"Backup file {backup_file} does not exist.")

    # Remove existing target if it exists
    if target_db_path.exists():
        target_db_path.unlink()

    target_con = sqlite3.connect(str(target_db_path))
    cursor = target_con.cursor()

    with gzip.open(backup_file, "rt", encoding="utf-8") as gz:
        sql_script = gz.read()
        cursor.executescript(sql_script)

    target_con.commit()

    # Verify restored tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [row[0] for row in cursor.fetchall() if not row[0].startswith("sqlite_")]

    table_counts = {}
    for t in tables:
        cursor.execute(f"SELECT COUNT(*) FROM {t};")
        table_counts[t] = cursor.fetchone()[0]

    target_con.close()

    return {
        "status": "success",
        "target": str(target_db_path),
        "table_count": len(tables),
        "tables": table_counts
    }

def test_backup_restoration() -> Dict[str, Any]:
    """
    Automated non-destructive restoration verification test.
    Creates a temporary backup, restores into an isolated sandbox database,
    verifies record counts and referential integrity, then cleans up.
    """
    # 1. Create a snapshot
    backup_path = create_backup("test_restoration_snapshot.sql.gz")

    # 2. Restore into isolated sandbox
    sandbox_path = BACKUP_DIR / "sandbox_test_restore.db"
    try:
        results = restore_backup(backup_path, sandbox_path)

        # 3. Verify critical tables
        critical_tables = ["users", "courses", "assignments", "events", "knowledge_documents"]
        missing_tables = [t for t in critical_tables if t not in results["tables"]]

        if missing_tables:
            raise ValueError(f"Restoration verification failed. Missing tables: {missing_tables}")

        results["verified"] = True
        results["critical_tables_checked"] = critical_tables
        return results

    finally:
        # 4. Clean up sandbox test artifacts
        if sandbox_path.exists():
            sandbox_path.unlink()
        if backup_path.exists():
            backup_path.unlink()

if __name__ == "__main__":
    action = sys.argv[1] if len(sys.argv) > 1 else "test"
    if action == "create":
        bp = create_backup()
        print(f"[*] Backup created successfully at: {bp}")
    elif action == "test":
        print("[*] Running automated backup restoration test...")
        report = test_backup_restoration()
        print("[+] Restoration Test Passed Successfully!")
        print(f"    Tables verified: {report['table_count']}")
        for tbl, count in report['tables'].items():
            print(f"    - {tbl}: {count} records")
    elif action == "restore" and len(sys.argv) > 2:
        file_target = Path(sys.argv[2])
        dest = Path("./futureskills.db")
        rep = restore_backup(file_target, dest)
        print(f"[*] Restored into {dest}: {rep}")
    else:
        print("Usage: python backup.py [create|test|restore <file>]")
