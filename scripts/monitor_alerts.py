#!/usr/bin/env python3
"""
RoofLeadHQ Monitoring & Alerts

Checks for:
- Failed pipeline runs (last 24h)
- SLA breaches (leads not contacted within 15 min)
- High error rates
- Stale leads

Usage:
  python3 scripts/monitor_alerts.py --check failed_pipelines
  python3 scripts/monitor_alerts.py --check all
"""

import argparse
import json
from datetime import datetime, timedelta
from typing import List, Dict

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from structured_logger import get_logger

logger = get_logger()


class Monitor:
    def __init__(self):
        self.alerts = []

    def check_failed_pipelines(self, hours: int = 24) -> List[Dict]:
        """Check for failed pipeline runs in the last N hours."""
        # In production: query Supabase pipeline_runs where status='failed'
        # Mock data for now
        failed = [
            {"pipeline": "follow-up", "client": "summit-roofing", "error": "Twilio rate limit", "time": "2026-05-21 03:14"},
            {"pipeline": "booking", "client": "summit-roofing", "error": "Calendar API timeout", "time": "2026-05-21 04:22"},
        ]
        
        if failed:
            for f in failed:
                self.alerts.append({
                    "severity": "high",
                    "type": "failed_pipeline",
                    "message": f"Pipeline '{f['pipeline']}' failed for {f['client']}: {f['error']}",
                    "time": f["time"]
                })
        return failed

    def check_sla_breaches(self) -> List[Dict]:
        """Check for leads not contacted within SLA (15 min for hot leads)."""
        # Mock: 2 hot leads waiting >15 min
        breaches = [
            {"lead_id": "lead_123", "client": "summit-roofing", "wait_time_min": 27, "urgency": "hot"},
        ]
        
        for b in breaches:
            self.alerts.append({
                "severity": "critical",
                "type": "sla_breach",
                "message": f"Hot lead {b['lead_id']} waiting {b['wait_time_min']} min (SLA: 15 min)",
                "client": b["client"]
            })
        return breaches

    def check_high_error_rate(self, threshold: float = 0.15) -> bool:
        """Check if error rate exceeds threshold."""
        # Mock: 8% error rate
        error_rate = 0.08
        if error_rate > threshold:
            self.alerts.append({
                "severity": "medium",
                "type": "high_error_rate",
                "message": f"Error rate {error_rate*100:.1f}% exceeds threshold {threshold*100:.0f}%"
            })
            return True
        return False

    def run_all_checks(self) -> List[Dict]:
        """Run all monitoring checks."""
        self.check_failed_pipelines()
        self.check_sla_breaches()
        self.check_high_error_rate()
        return self.alerts

    def print_alerts(self):
        """Print all alerts."""
        if not self.alerts:
            print("✅ All systems healthy. No alerts.")
            return
        
        print(f"\n🚨 {len(self.alerts)} ALERT(S) DETECTED\n")
        for alert in self.alerts:
            icon = "🔴" if alert["severity"] == "critical" else "🟠" if alert["severity"] == "high" else "🟡"
            print(f"{icon} [{alert['severity'].upper()}] {alert['type']}: {alert['message']}")
            if "time" in alert:
                print(f"   Time: {alert['time']}")
            print()


def main():
    parser = argparse.ArgumentParser(description="RoofLeadHQ Monitoring & Alerts")
    parser.add_argument("--check", choices=["failed_pipelines", "sla_breaches", "all"], default="all")
    args = parser.parse_args()
    
    monitor = Monitor()
    
    if args.check == "all":
        monitor.run_all_checks()
    elif args.check == "failed_pipelines":
        monitor.check_failed_pipelines()
    elif args.check == "sla_breaches":
        monitor.check_sla_breaches()
    
    monitor.print_alerts()


if __name__ == "__main__":
    main()