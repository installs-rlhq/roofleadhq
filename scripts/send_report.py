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

sys.path.append("backend")

from src.services.reports.sender import ReportSender


def get_test_config() -> dict:
    """Realistic fake client config for testing and screenshots."""
    return {
        "company_name": "Summit Roofing Pros",
        "first_name": "Jason",
        "email": "installs@roofleadhq.com",
        "logo_url": "https://yourdomain.com/website/roofleadhq-logo-small-icon.png"
    }


def main():
    parser = argparse.ArgumentParser(description="Send RoofLeadHQ reports")
    parser.add_argument("--type", required=True,
                        choices=["weekly", "monthly", "dashboard"],
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
