"""SQLite-backed persistent storage for jobs and deep-dive conversations.

Replaces the previous in-memory dicts (``_job_cache`` and
``_conversation_cache``) in ``backend/api/main.py``. The in-memory approach
worked locally but broke on Railway whenever the container was restarted
between the SSE stream finishing and the frontend's follow-up
``GET /api/jobs/{job_id}`` call, or when the app ran with more than one
worker (each worker had its own copy of the dict).

This module keeps a single SQLite database on disk (default
``/tmp/masterborder.db``, which Railway's ephemeral /tmp is fine for within
a single container lifecycle) and exposes a small, focused API.

Two design notes for reviewers:

  1. We persist AnalysisResponse as its JSON dump, not normalised columns.
     The data is read-only after creation, small (well under 1 MB per job),
     and the schema evolves frequently during the hackathon. Opaque JSON
     keeps migrations trivial.

  2. A single module-level connection is reused across threads with
     ``check_same_thread=False`` plus ``journal_mode=WAL``. FastAPI
     occasionally calls these functions from different worker threads, so
     WAL + a process-wide lock around writes is the simplest
     correctness-preserving setup.
"""

from __future__ import annotations

import json
import os
import sqlite3
import threading
import time
from typing import Optional

from backend.schemas.models import AnalysisResponse


_DEFAULT_DB_PATH = os.getenv("MASTERBORDER_DB_PATH", "/tmp/masterborder.db")

# 24 hours. Matches the daily rate limit — jobs older than this wouldn't
# be reachable via a freshly-submitted link anyway, and keeping them around
# just inflates the DB file. Tunable via env for tests.
_DEFAULT_TTL_SECONDS = int(os.getenv("MASTERBORDER_JOB_TTL_SECONDS", "86400"))


def _connect(db_path: str) -> sqlite3.Connection:
    """Open the SQLite connection with the settings we want process-wide."""
    conn = sqlite3.connect(
        db_path,
        check_same_thread=False,
        isolation_level=None,
        timeout=5.0,
    )
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA synchronous=NORMAL;")
    conn.execute("PRAGMA foreign_keys=ON;")
    return conn


class _Store:
    """Thin wrapper that owns the connection and the write lock."""

    def __init__(self, db_path: str) -> None:
        self._db_path = db_path
        self._conn = _connect(db_path)
        self._write_lock = threading.Lock()
        self._init_schema()

    def _init_schema(self) -> None:
        with self._write_lock:
            self._conn.execute(
                """
                CREATE TABLE IF NOT EXISTS jobs (
                    job_id     TEXT PRIMARY KEY,
                    payload    TEXT NOT NULL,
                    created_at INTEGER NOT NULL
                )
                """
            )
            self._conn.execute(
                """
                CREATE TABLE IF NOT EXISTS conversations (
                    job_id     TEXT NOT NULL,
                    country    TEXT NOT NULL,
                    history    TEXT NOT NULL,
                    updated_at INTEGER NOT NULL,
                    PRIMARY KEY (job_id, country)
                )
                """
            )
            self._conn.execute(
                "CREATE INDEX IF NOT EXISTS idx_jobs_created_at "
                "ON jobs (created_at)"
            )

    # ------------------------------------------------------------------ jobs

    def save_job(self, job_id: str, response: AnalysisResponse) -> None:
        payload = response.model_dump_json()
        now = int(time.time())
        with self._write_lock:
            self._conn.execute(
                "INSERT OR REPLACE INTO jobs (job_id, payload, created_at) "
                "VALUES (?, ?, ?)",
                (job_id, payload, now),
            )

    def get_job(
        self,
        job_id: str,
        ttl_seconds: int = _DEFAULT_TTL_SECONDS,
    ) -> Optional[AnalysisResponse]:
        row = self._conn.execute(
            "SELECT payload, created_at FROM jobs WHERE job_id = ?",
            (job_id,),
        ).fetchone()
        if row is None:
            return None
        payload, created_at = row
        if ttl_seconds and (int(time.time()) - int(created_at)) > ttl_seconds:
            with self._write_lock:
                self._conn.execute(
                    "DELETE FROM jobs WHERE job_id = ?", (job_id,)
                )
            return None
        try:
            return AnalysisResponse.model_validate(json.loads(payload))
        except Exception:  # noqa: BLE001
            return None

    def count_jobs(self) -> int:
        row = self._conn.execute("SELECT COUNT(*) FROM jobs").fetchone()
        return int(row[0]) if row else 0

    def purge_expired(self, max_age_seconds: int = _DEFAULT_TTL_SECONDS) -> int:
        cutoff = int(time.time()) - max_age_seconds
        with self._write_lock:
            cur = self._conn.execute(
                "DELETE FROM jobs WHERE created_at < ?", (cutoff,)
            )
            return cur.rowcount or 0

    # ------------------------------------------------------------- conversations

    def save_conversation(
        self,
        job_id: str,
        country: str,
        history: list[dict],
    ) -> None:
        blob = json.dumps(history, ensure_ascii=False)
        now = int(time.time())
        with self._write_lock:
            self._conn.execute(
                "INSERT OR REPLACE INTO conversations "
                "(job_id, country, history, updated_at) VALUES (?, ?, ?, ?)",
                (job_id, country, blob, now),
            )

    def get_conversation(self, job_id: str, country: str) -> list[dict]:
        row = self._conn.execute(
            "SELECT history FROM conversations WHERE job_id = ? AND country = ?",
            (job_id, country),
        ).fetchone()
        if row is None:
            return []
        try:
            data = json.loads(row[0])
            return data if isinstance(data, list) else []
        except Exception:  # noqa: BLE001
            return []


_store = _Store(_DEFAULT_DB_PATH)


def save_job(job_id: str, response: AnalysisResponse) -> None:
    _store.save_job(job_id, response)


def get_job(job_id: str) -> Optional[AnalysisResponse]:
    return _store.get_job(job_id)


def count_jobs() -> int:
    return _store.count_jobs()


def purge_expired() -> int:
    return _store.purge_expired()


def save_conversation(job_id: str, country: str, history: list[dict]) -> None:
    _store.save_conversation(job_id, country, history)


def get_conversation(job_id: str, country: str) -> list[dict]:
    return _store.get_conversation(job_id, country)
