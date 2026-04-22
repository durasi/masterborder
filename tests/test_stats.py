"""Tests for the in-memory usage stats tracker."""
from backend.api.stats import UsageStats


def test_fresh_stats_are_all_zero():
    stats = UsageStats()
    snap = stats.snapshot()
    assert snap["total_analyses"] == 0
    assert snap["total_recommends"] == 0
    assert snap["unique_users"] == 0
    assert snap["last_24h"] == 0
    assert snap["top_countries"] == []


def test_record_analysis_increments_counter():
    stats = UsageStats()
    stats.record_analysis("1.2.3.4", ["US", "DE"])
    snap = stats.snapshot()
    assert snap["total_analyses"] == 1
    assert snap["unique_users"] == 1
    assert snap["last_24h"] == 1


def test_unique_users_counts_distinct_ips():
    stats = UsageStats()
    stats.record_analysis("1.1.1.1", ["US"])
    stats.record_analysis("1.1.1.1", ["DE"])  # same IP
    stats.record_analysis("2.2.2.2", ["US"])  # new IP
    snap = stats.snapshot()
    assert snap["total_analyses"] == 3
    assert snap["unique_users"] == 2


def test_top_countries_ranks_correctly():
    stats = UsageStats()
    stats.record_analysis("1.1.1.1", ["US", "DE", "US"])
    stats.record_analysis("2.2.2.2", ["US", "GB"])
    snap = stats.snapshot()
    top = {row["country"]: row["count"] for row in snap["top_countries"]}
    assert top["US"] == 3
    assert top["DE"] == 1
    assert top["GB"] == 1


def test_ip_hash_is_privacy_preserving():
    """Raw IPs must never leak into any public-facing output."""
    stats = UsageStats()
    stats.record_analysis("192.168.1.100", ["US"])
    # Re-snapshot and make sure no raw IP string appears anywhere
    import json as json_mod
    snap_text = json_mod.dumps(stats.snapshot())
    assert "192.168.1.100" not in snap_text


def test_record_recommend_increments_separate_counter():
    stats = UsageStats()
    stats.record_recommend("1.1.1.1")
    stats.record_recommend("1.1.1.1")
    snap = stats.snapshot()
    assert snap["total_recommends"] == 2
    assert snap["total_analyses"] == 0
