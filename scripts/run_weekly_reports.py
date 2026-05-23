#!/usr/bin/env python3
"""
Stand-alone script to run weekly reports.
Schedule this via Lobster pipeline / cron.
"""
import os
import sys
from pathlib import Path

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.reports.sender import ReportSender

def load_client_config(client_id: str) -> dict:
    """Helper to load from config/clients/*.json"""
    config_path = Path("config/clients") / f"{client_id}.json"
    if config_path.exists():
        import json
        with open(config_path) as f:
            return json.load(f)
    return {"roofer_id": client_id}  # fallback

def main():
    # supabase = get_supabase_client()   # ← uncomment and import when ready
    sender = ReportSender()  # (supabase_client=supabase) when ready

    # Load config for one (or many) clients
    client_config = load_client_config("summit-roofing-pros")
    # Optional: override email for testing
    # client_config["email"] = "yourtest@email.com"

    print("🚀 Starting weekly report run...")
    try:
        sender.send_weekly_report(
            roofer_id="summit-roofing-pros",
            client_config=client_config
        )
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("✅ Weekly reports completed!")

if __name__ == "__main__":
    main()
