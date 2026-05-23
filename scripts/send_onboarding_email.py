cat > scripts/send_onboarding_email.py << 'EOF'
#!/usr/bin/env python3
"""
Send onboarding emails to roofer clients.
Usage:
    python scripts/send_onboarding_email.py --type welcome --client summit-roofing-pros
    python scripts/send_onboarding_email.py --type welcome
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

    if "logo_url" not in config:
        config["logo_url"] = "https://yourdomain.com/website/roofleadhq-logo-small-icon.png"

    return config


def get_test_config() -> dict:
    return {
        "company_name": "Test Roofing",
        "first_name": "Jason",
        "email": "installs@roofleadhq.com",
        "logo_url": "https://yourdomain.com/website/roofleadhq-logo-small-icon.png"
    }


def main():
    parser = argparse.ArgumentParser(description="Send RoofLeadHQ onboarding emails")
    parser.add_argument("--type", required=True, choices=["welcome"],
                        help="Type of onboarding email")
    parser.add_argument("--client", help="Client ID from config/clients/")
    args = parser.parse_args()

    sender = ReportSender()

    if args.client:
        client_config = load_client_config(args.client)
    else:
        client_config = get_test_config()

    print(f"🚀 Sending {args.type} email to {client_config['email']}...")

    try:
        if args.type == "welcome":
            sender.send_welcome_email(roofer_id=args.client or "test", client_config=client_config)
        print(f"✅ {args.type.capitalize()} email sent successfully!")
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    main()
EOF
