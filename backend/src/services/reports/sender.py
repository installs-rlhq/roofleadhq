cat > scripts/run_weekly_reports.py << 'EOF'
#!/usr/bin/env python3
"""
Production-ready weekly report runner.
Loads client data from config/clients/*.json with robust email handling.
"""

import sys
from pathlib import Path

sys.path.append("backend")

from src.services.reports.sender import ReportSender


def load_client_config(client_id: str) -> dict:
    """Load client configuration from JSON file with email safety."""
    config_path = Path("config/clients") / f"{client_id}.json"
    
    if config_path.exists():
        import json
        with open(config_path) as f:
            config = json.load(f)
    else:
        config = {"roofer_id": client_id}

    # Robust email handling
    email = config.get("email") or config.get("roofer_email")
    if not email:
        raise ValueError(f"No valid email found for client: {client_id}")
    
    config["email"] = email
    return config


def main():
    sender = ReportSender()

    # List of client IDs to process
    client_ids = ["summit-roofing-pros"]

    print("🚀 Starting weekly report run...")

    for client_id in client_ids:
        try:
            client_config = load_client_config(client_id)
            sender.send_weekly_report(
                roofer_id=client_id,
                client_config=client_config
            )
            print(f"✅ Sent report for {client_id}")
        except Exception as e:
            print(f"❌ Failed for {client_id}: {e}")

    print("✅ Weekly reports completed!")


if __name__ == "__main__":
    main()
EOF
