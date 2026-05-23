cat > scripts/send_report.py << 'EOF'
#!/usr/bin/env python3
"""
Unified report sender for RoofLeadHQ.
Usage:
    python scripts/send_report.py --type weekly
    python scripts/send_report.py --type monthly
    python scripts/send_report.py --type dashboard
"""

import sys
import argparse
from pathlib import Path

sys.path.append("backend")

from src.services.reports.sender import ReportSender


def load_client_config(client_id: str) -> dict:
    config_path = Path("config/clients") / f"{client_id}.json"
    if not config_path.exists():
        raise FileNotFoundError(f"Client config not found: {client_id}")

    import json
    with open(config_path) as f:
        config = json.load(f)

    email = config.get("email") or config.get("roofer_email")
    if not email:
        raise ValueError(f"No valid email for {client_id}")
    config["email"] = email
    return config


def get_test_config() -> dict:
    """Fake client config for testing."""
    return {
        "company_name": "Summit Roofing Pros",
        "first_name": "Jason",
        "email": "installs@roofleadhq.com",
        "logo_url": "https://yourdomain.com/website/roofleadhq-logo-small-icon.png"
    }


def main():
    parser = argparse.ArgumentParser(description="Send RoofLeadHQ reports")
    parser.add_argument("--type", required=True, choices=["weekly", "monthly", "dashboard"],
                        help="Type of report to send")
    args = parser.parse_args()

    sender = ReportSender()
    client_config = get_test_config()

    print(f"🚀 Sending {args.type} report to {client_config['email']}...")

    try:
        if args.type == "weekly":
            sender.send_weekly_report(roofer_id="test", client_config=client_config)
        elif args.type == "monthly":
            sender.send_monthly_report(roofer_id="test", client_config=client_config)
        elif args.type == "dashboard":
            sender.send_dashboard_email(roofer_id="test", client_config=client_config)

        print(f"✅ {args.type.capitalize()} report sent successfully!")
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    main()
EOF
