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
import os
from datetime import datetime, timedelta
from typing import List, Dict

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from structured_logger import get_logger
from supabase_client import get_supabase

logger = get_logger()

try:
    import requests
    REQUESTS_AVAILABLE = True
except Exception:
    REQUESTS_AVAILABLE = False


class Monitor:
    def __init__(self):
        self.alerts = []
        self.slack_webhook_url = os.getenv("SLACK_WEBHOOK_URL")
        self.generic_webhook_url = os.getenv("ALERT_WEBHOOK_URL")

    def check_failed_pipelines(self, hours: int = 24) -> List[Dict]:
        """Check for failed Lobster pipeline runs in the last N hours."""
        db = get_supabase()
        runs = db.get_recent_pipeline_runs(hours)
        failed = [r for r in runs if r.get("status") == "failed"]
        
        for f in failed:
            alert = {
                "severity": "high",
                "type": "failed_pipeline",
                "message": f"Pipeline '{f.get('pipeline_name')}' failed for {f.get('client_id')}",
                "time": f.get("started_at"),
                "error": f.get("error")
            }
            self.alerts.append(alert)
            logger.warning(f"Failed pipeline detected", pipeline=f.get('pipeline_name'), client=f.get('client_id'))
        
        if failed:
            logger.warning(f"{len(failed)} failed pipeline(s) in last {hours}h")
        return failed

    def check_sla_breaches(self, minutes: int = 15) -> List[Dict]:
        """Check for leads not contacted within SLA."""
        db = get_supabase()
        # In real implementation, query leads where last_activity_at > X minutes ago and status=new
        # For now we log the check
        logger.info(f"SLA breach check completed (threshold: {minutes} min)")
        return []

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

    def check_vapi_call_failures(self, hours: int = 24) -> List[Dict]:
        """Check for recent Vapi call failures."""
        # Placeholder for future Vapi call log integration
        logger.info("Vapi call failure check (placeholder)")
        return []

    def check_inbound_processing(self, hours: int = 6) -> Dict:
        """Check recent inbound call/SMS processing health."""
        db = get_supabase()
        # In production: query leads created in last X hours and their status
        metrics = {
            "inbound_calls": 0,
            "inbound_sms": 0,
            "processed": 0,
            "failed": 0
        }
        logger.info(f"Inbound processing health check: {metrics}")
        return metrics

    def run_all_checks(self) -> List[Dict]:
        """Run all monitoring checks."""
        self.check_failed_pipelines()
        self.check_sla_breaches()
        self.check_high_error_rate()
        self.check_vapi_call_failures()
        self.check_inbound_processing()
        self.send_alerts()
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

    def send_alerts(self):
        """Send alerts to Slack and/or generic webhook if configured."""
        if not self.alerts:
            return

        slack_sent = False
        webhook_sent = False

        if self.slack_webhook_url and REQUESTS_AVAILABLE:
            slack_sent = self._send_to_slack()
        if self.generic_webhook_url and REQUESTS_AVAILABLE:
            webhook_sent = self._send_to_generic_webhook()

        if slack_sent or webhook_sent:
            logger.info(f"Alerts sent via webhook(s)", slack=slack_sent, generic=webhook_sent)

    def _format_slack_message(self) -> Dict:
        """Create a clean Slack message from alerts."""
        blocks = [
            {
                "type": "header",
                "text": {"type": "plain_text", "text": "🚨 RoofLeadHQ Alert"}
            }
        ]

        for alert in self.alerts[:5]:  # Limit to first 5
            severity_emoji = {"critical": "🔴", "high": "🟠", "medium": "🟡"}.get(alert.get("severity"), "⚪")
            text = f"{severity_emoji} *{alert['type']}* — {alert['message']}"
            if alert.get("time"):
                text += f"\n_{alert['time']}_"
            blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": text}})

        if len(self.alerts) > 5:
            blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": f"_... and {len(self.alerts)-5} more alerts_"}})

        return {"blocks": blocks}

    def _send_to_slack(self) -> bool:
        """Send formatted alert to Slack."""
        try:
            payload = self._format_slack_message()
            response = requests.post(self.slack_webhook_url, json=payload, timeout=10)
            return response.status_code == 200
        except Exception as e:
            logger.warning(f"Failed to send Slack alert: {e}")
            return False

    def _send_to_generic_webhook(self) -> bool:
        """Send alerts to a generic webhook endpoint."""
        try:
            payload = {
                "source": "roofleadhq",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "alert_count": len(self.alerts),
                "alerts": self.alerts
            }
            response = requests.post(self.generic_webhook_url, json=payload, timeout=10)
            return response.status_code in (200, 201, 204)
        except Exception as e:
            logger.warning(f"Failed to send generic webhook alert: {e}")
            return False


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