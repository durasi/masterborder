"""In-memory usage stats tracker.

Counts analyses and unique users (by hashed IP). Not persisted —
resets on Railway redeploy. Sufficient for hackathon demo and the
counter on the landing page; for production we'd switch to SQLite
or Redis.
"""

import hashlib
import threading
from collections import defaultdict, deque
from datetime import datetime, timedelta, timezone


class UsageStats:
    """Thread-safe in-memory counter for analyses and deep-dive calls."""

    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._total_analyses = 0
        self._total_recommends = 0
        # IP hash -> first-seen datetime. Size bounded by unique users.
        self._unique_users: dict[str, datetime] = {}
        # Deque of timestamps for last-24h / last-7d rolling windows.
        self._recent_events: deque[datetime] = deque()
        # Rough breakdown of which target markets get analyzed.
        self._country_counts: dict[str, int] = defaultdict(int)

    @staticmethod
    def _hash_ip(ip: str) -> str:
        """Privacy-preserving IP hash. We never store the raw IP."""
        return hashlib.sha256(ip.encode("utf-8")).hexdigest()[:16]

    def record_analysis(self, ip: str, countries: list[str]) -> None:
        now = datetime.now(timezone.utc)
        ip_hash = self._hash_ip(ip)
        with self._lock:
            self._total_analyses += 1
            if ip_hash not in self._unique_users:
                self._unique_users[ip_hash] = now
            self._recent_events.append(now)
            for c in countries:
                self._country_counts[c] += 1
            self._prune(now)

    def record_recommend(self, ip: str) -> None:
        now = datetime.now(timezone.utc)
        with self._lock:
            self._total_recommends += 1
            self._recent_events.append(now)
            self._prune(now)

    def _prune(self, now: datetime) -> None:
        """Drop events older than 7 days from the rolling deque."""
        cutoff = now - timedelta(days=7)
        while self._recent_events and self._recent_events[0] < cutoff:
            self._recent_events.popleft()

    def snapshot(self) -> dict:
        now = datetime.now(timezone.utc)
        day_cutoff = now - timedelta(hours=24)
        week_cutoff = now - timedelta(days=7)
        with self._lock:
            last_24h = sum(1 for t in self._recent_events if t >= day_cutoff)
            last_7d = sum(1 for t in self._recent_events if t >= week_cutoff)
            # Sort top target countries
            top_countries = sorted(
                self._country_counts.items(), key=lambda kv: kv[1], reverse=True
            )[:10]
            return {
                "total_analyses": self._total_analyses,
                "total_recommends": self._total_recommends,
                "unique_users": len(self._unique_users),
                "last_24h": last_24h,
                "last_7d": last_7d,
                "top_countries": [
                    {"country": c, "count": n} for c, n in top_countries
                ],
                "server_time": now.isoformat(),
            }


# Module-level singleton. Shared across all request handlers.
stats = UsageStats()
