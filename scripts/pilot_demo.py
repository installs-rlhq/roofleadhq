#!/usr/bin/env python3
"""
RoofLeadHQ Pilot Demo — End-to-End Flow

Simulates a complete pilot client lifecycle:
1. Onboard client
2. Ingest sample leads (Facebook + Retell)
3. Run qualification
4. Simulate follow-ups
5. Generate daily report
6. Check monitoring alerts

This is the closest thing to a real pilot client run without live APIs.

Usage:
  python3 scripts/pilot_demo.py --client summit-roofing
"""

import argparse
import sys
from pathlib import Path
from datetime import datetime

sys.path.insert(0, str(Path(__file__).parent))

from supabase_client import get_supabase
from prompt_manager import PromptManager
from report_generator import ReportGenerator
from monitor_alerts import Monitor
from structured_logger import get_logger

logger = get_logger()


def run_pilot_demo(client_id: str):
    print(f"\n{'='*60}")
    print(f"ROOFLEADHQ PILOT DEMO — {client_id.upper()}")
    print(f"{'='*60}\n")
    
    db = get_supabase()
    pm = PromptManager()
    report_gen = ReportGenerator()
    
    # 1. Verify client exists
    client = db.get_client(client_id)
    if not client:
        print(f"❌ Client '{client_id}' not found. Run onboarding first.")
        return
    
    print(f"✅ Client loaded: {client.get('business_name', client_id)}")
    
    # 2. Simulate lead intake (2 leads)
    print("\n📥 Ingesting sample leads...")
    
    leads = [
        {
            "client_id": client_id,
            "source": "facebook",
            "name": "John Martinez",
            "phone": "+18135551234",
            "address": "123 Oak St, Tampa, FL",
            "project_type": "shingle_replacement",
            "urgency": "hot",
            "notes": "Storm damage, active leak",
            "status": "new"
        },
        {
            "client_id": client_id,
            "source": "retell",
            "name": "Sarah Chen",
            "phone": "+17205559876",
            "address": "456 Pine Ave, Denver, CO",
            "project_type": "metal_roof",
            "urgency": "warm",
            "notes": "Looking for upgrade quote",
            "status": "new"
        }
    ]
    
    for lead in leads:
        lead_id = db.insert_lead(lead)
        print(f"   → Inserted lead: {lead.get('name')} ({lead.get('urgency')})")
    
    # 3. Generate rendered prompt for first lead (demo)
    print("\n🤖 Generating Retell prompt for hot lead...")
    prompt = pm.get_client_prompt(client_id, "retell")
    print(f"   Prompt preview: {prompt[:120]}...")
    
    # 4. Generate daily report
    print("\n📊 Generating daily report...")
    report = report_gen.generate_daily_report(client_id)
    print(report[:400] + "...\n")
    
    # 5. Run monitoring
    print("🔍 Running system health check...")
    monitor = Monitor()
    monitor.run_all_checks()
    monitor.print_alerts()
    
    print(f"\n{'='*60}")
    print("✅ PILOT DEMO COMPLETE")
    print("Ready for real leads once Supabase + Twilio/Retell are configured.")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="RoofLeadHQ Pilot Demo")
    parser.add_argument("--client", default="summit-roofing")
    args = parser.parse_args()
    
    run_pilot_demo(args.client)