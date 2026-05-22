#!/usr/bin/env python3
"""
RoofLeadHQ Daily/Weekly Report Generator

Generates email reports from pipeline data (Supabase or local logs).

Usage:
  python3 scripts/report_generator.py --type daily --client summit-roofing
  python3 scripts/report_generator.py --type weekly --client all
"""

import argparse
import json
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, Any

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from prompt_manager import PromptManager
from structured_logger import get_logger
from supabase_client import get_supabase

logger = get_logger()


class ReportGenerator:
    def __init__(self):
        self.pm = PromptManager()

    def generate_daily_report(self, client_id: str, date: str = None) -> str:
        """Generate daily report for a client."""
        if date is None:
            date = datetime.utcnow().strftime("%Y-%m-%d")
        
        db = get_supabase()
        leads = db.get_leads(client_id, limit=100)
        
        # Compute real metrics from Supabase
        total_leads = len(leads)
        qualified = len([l for l in leads if l.get("urgency") in ["hot", "warm"]])
        booked = len([l for l in leads if l.get("status") == "booked"])
        conversion = round((booked / total_leads * 100) if total_leads > 0 else 0)
        
        # Build simple lists
        hot_list = "\n".join([f"• {l.get('name', 'Unknown')} ({l.get('address', '')})" for l in leads if l.get("urgency") == "hot"][:5]) or "None today"
        bookings_list = "No recent bookings"
        stale_list = "None"
        
        data = {
            "total_leads": total_leads,
            "qualified_leads": qualified,
            "booked": booked,
            "conversion_rate": str(conversion),
            "hot_leads_list": hot_list,
            "bookings_list": bookings_list,
            "stale_leads_list": stale_list,
            "follow_5min": total_leads,
            "follow_30min": max(0, total_leads - 1),
            "follow_2hr": max(0, total_leads - 2),
            "follow_24hr": max(0, total_leads - 3),
        }
        
        # Load client info
        try:
            with open("master-config.json") as f:
                config = json.load(f)
            client = config.get("clients", {}).get(client_id, {})
        except Exception:
            client = {}
        
        variables = {
            "business_name": client.get("business_name", client_id),
            "owner_name": client.get("owner_name", "Team"),
            "date": date,
            "total_leads": data.get("total_leads", 0),
            "qualified_leads": data.get("qualified_leads", 0),
            "booked": data.get("booked", 0),
            "conversion_rate": data.get("conversion_rate", "0"),
            "hot_leads_list": data.get("hot_leads_list", "None today"),
            "bookings_list": data.get("bookings_list", "No bookings"),
            "stale_leads_list": data.get("stale_leads_list", "None"),
            "follow_5min": data.get("follow_5min", 0),
            "follow_30min": data.get("follow_30min", 0),
            "follow_2hr": data.get("follow_2hr", 0),
            "follow_24hr": data.get("follow_24hr", 0),
            "unsubscribe_link": "https://roofleadhq.com/unsubscribe"
        }
        
        # Generate both HTML and Markdown versions
        html_report = self.pm.render("email", "daily_report", variables, format="html")
        md_report = self.pm.render("email", "daily_report", variables, format="md")
        
        logger.info(f"Generated daily report for {client_id}", client_id=client_id, date=date)
        return {"html": html_report, "markdown": md_report}

    def generate_weekly_report(self, client_id: str, week_start: str = None) -> str:
        """Generate weekly report."""
        if week_start is None:
            today = datetime.utcnow()
            week_start = (today - timedelta(days=today.weekday())).strftime("%Y-%m-%d")
        
        try:
            with open("master-config.json") as f:
                config = json.load(f)
            client = config.get("clients", {}).get(client_id, {})
        except Exception:
            client = {}
        
        data = self._get_mock_weekly_data(client_id, week_start)
        
        variables = {
            "business_name": client.get("business_name", client_id),
            "owner_name": client.get("owner_name", "Team"),
            "week_start": week_start,
            "weekly_leads": data.get("weekly_leads", 0),
            "weekly_booked": data.get("weekly_booked", 0),
            "show_up_rate": data.get("show_up_rate", "0"),
            "close_rate": data.get("close_rate", "0"),
            "top_channel_1": data.get("top_channel_1", "Facebook"),
            "top_channel_1_count": data.get("top_channel_1_count", 0),
            "top_channel_2": data.get("top_channel_2", "Retell"),
            "top_channel_2_count": data.get("top_channel_2_count", 0),
            "top_channel_3": data.get("top_channel_3", "Website"),
            "top_channel_3_count": data.get("top_channel_3_count", 0),
            "geo_breakdown": data.get("geo_breakdown", "Tampa: 12, Denver: 8"),
            "avg_first_response": data.get("avg_first_response", "4.2"),
            "avg_time_to_booking": data.get("avg_time_to_booking", "6.8"),
            "recommendations": data.get("recommendations", "Focus on same-day follow-ups for hot leads.")
        }
        
        report = self.pm.render("email", "weekly_report", variables)
        logger.info(f"Generated weekly report for {client_id}", client_id=client_id)
        return report

    def _get_mock_daily_data(self, client_id: str, date: str) -> Dict[str, Any]:
        """Mock data for testing."""
        return {
            "total_leads": 7,
            "qualified_leads": 5,
            "booked": 3,
            "conversion_rate": "43",
            "hot_leads_list": "• John D. (Tampa) - Active leak\n• Sarah M. (Denver) - Storm damage",
            "bookings_list": "• 9:00 AM - Mike R.\n• 2:30 PM - Lisa K.",
            "stale_leads_list": "• Tom B. (48h+ no contact)",
            "follow_5min": 7,
            "follow_30min": 6,
            "follow_2hr": 4,
            "follow_24hr": 2
        }

    def _get_mock_weekly_data(self, client_id: str, week_start: str) -> Dict[str, Any]:
        """Mock weekly data."""
        return {
            "weekly_leads": 34,
            "weekly_booked": 18,
            "show_up_rate": "89",
            "close_rate": "62",
            "top_channel_1": "Facebook",
            "top_channel_1_count": 14,
            "top_channel_2": "Retell AI",
            "top_channel_2_count": 11,
            "top_channel_3": "Website Form",
            "top_channel_3_count": 9,
            "geo_breakdown": "Tampa Bay: 19 leads\nDenver Metro: 15 leads",
            "avg_first_response": "3.8",
            "avg_time_to_booking": "5.2",
            "recommendations": "Increase SMS cadence on warm leads. Consider adding weekend slots."
        }


def main():
    parser = argparse.ArgumentParser(description="RoofLeadHQ Report Generator")
    parser.add_argument("--type", choices=["daily", "weekly"], required=True)
    parser.add_argument("--client", required=True, help="Client ID or 'all'")
    args = parser.parse_args()
    
    gen = ReportGenerator()
    
    if args.type == "daily":
        report = gen.generate_daily_report(args.client)
    else:
        report = gen.generate_weekly_report(args.client)
    
    print(report)
    print("\n--- Report generated successfully ---")


if __name__ == "__main__":
    main()