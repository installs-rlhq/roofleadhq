#!/usr/bin/env python3
"""
Stand-alone script to run weekly reports.
Schedule this via Lobster pipeline / cron.
"""
import os
import sys
from pathlib import Path

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.src.services.reports.sender import ReportSender

def load_client_config(client_id: str) -> dict:
    """Helper to load from config/clients/*.json"""
    config_path = Path("config/clients") / f"{client_id}.json"
    if config_path.exists():
        import json
        with open(config_path) as f:
            return json.load(f)
    return {"roofer_id": client_id}  # fallback

def main():
    sender = ReportSender()

    client_config = {
        "company_name": "Test Roofing",
        "first_name": "Jason",
        "email": "your-real-test@email.com",   # ← change to your test email
        "logo_url": "https://yourdomain.com/logo.png"
    }

    print("🚀 Starting weekly report run...")
    try:
        sender.send_weekly_report(
            roofer_id="test",
            client_config=client_config
        )
        print("✅ Weekly report sent successfully!")
    except Exception as e:
        print(f"❌ Error: {e}")
        
if __name__ == "__main__":
    main()
