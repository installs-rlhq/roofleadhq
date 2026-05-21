#!/usr/bin/env python3
"""
RoofLeadHQ Client Onboarding CLI

Quickly onboard a new roofing contractor with:
- Client record in Supabase
- Twilio number provisioning (placeholder)
- Retell/Vapi assistant setup (placeholder)
- Pipeline configuration
- Welcome email/SMS template generation

Usage:
  python3 scripts/onboard_client.py --name "Summit Roofing" --email "owner@summit.com" --area-code 720
"""

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path


class ClientOnboarder:
    def __init__(self, config_path: str = "master-config.json"):
        self.config_path = config_path
        self.config = self._load_config()

    def _load_config(self) -> dict:
        try:
            with open(self.config_path) as f:
                return json.load(f)
        except Exception as e:
            print(f"ERROR: Could not load config: {e}")
            sys.exit(1)

    def _save_config(self):
        with open(self.config_path, "w") as f:
            json.dump(self.config, f, indent=2)
        print(f"✓ Updated {self.config_path}")

    def onboard(self, client_id: str, business_name: str, email: str, 
                area_code: str, services: list = None, tone: str = "professional_friendly"):
        """Onboard a new client."""
        print(f"\n{'='*60}")
        print(f"ONBOARDING: {business_name}")
        print(f"{'='*60}")
        
        # 1. Add to master-config.json
        if "clients" not in self.config:
            self.config["clients"] = {}
        
        self.config["clients"][client_id] = {
            "business_name": business_name,
            "email": email,
            "area_code": area_code,
            "services": services or ["shingle", "metal", "flat"],
            "tone": tone,
            "onboarded_at": datetime.utcnow().isoformat() + "Z",
            "status": "pilot"
        }
        
        self._save_config()
        
        # 2. Generate onboarding checklist
        checklist = self._generate_checklist(client_id, business_name, email, area_code)
        
        # 3. Generate welcome message template
        welcome = self._generate_welcome_template(business_name, area_code)
        
        print(f"\n✅ Client '{client_id}' onboarded successfully!")
        print(f"\nNext steps:")
        for item in checklist:
            print(f"  [ ] {item}")
        
        print(f"\n{welcome}")
        
        return {
            "client_id": client_id,
            "status": "onboarded",
            "checklist": checklist
        }

    def _generate_checklist(self, client_id: str, business_name: str, 
                            email: str, area_code: str) -> list:
        return [
            f"Provision Twilio number with area code {area_code}",
            f"Create Retell AI assistant for {business_name}",
            f"Configure Vapi assistant (optional)",
            f"Add Supabase RLS policy for client_id='{client_id}'",
            f"Test lead intake: python3 scripts/e2e_test_harness.py --scenario facebook_lead",
            f"Send welcome email to {email}",
            f"Schedule kickoff call with owner",
            f"Monitor first 10 leads for quality"
        ]

    def _generate_welcome_template(self, business_name: str, area_code: str) -> str:
        return f"""
{'='*60}
WELCOME MESSAGE TEMPLATE (for {business_name})
{'='*60}

Subject: Welcome to RoofLeadHQ — Your Lead Engine is Live

Hi there,

Your RoofLeadHQ pilot is now active! Here's what we've set up:

✓ Lead intake from Facebook, website, Retell, and Vapi
✓ AI qualification + routing to your team
✓ Automated SMS + voice follow-ups (5min, 30min, 2hr, 24hr)
✓ Calendar booking integration
✓ 48-hour stale lead detection

Your dedicated number: +1 ({area_code}) XXX-XXXX (provisioning in progress)

Next: Reply to this email with your preferred business hours and we'll finalize the setup.

Questions? Just reply — we're here to help.

— The RoofLeadHQ Team
"""


def main():
    parser = argparse.ArgumentParser(description="RoofLeadHQ Client Onboarding")
    parser.add_argument("--id", required=True, help="Client ID (e.g., summit-roofing)")
    parser.add_argument("--name", required=True, help="Business name")
    parser.add_argument("--email", required=True, help="Owner email")
    parser.add_argument("--area-code", required=True, help="Area code (e.g., 720)")
    parser.add_argument("--services", default="shingle,metal,flat", help="Comma-separated services")
    parser.add_argument("--tone", default="professional_friendly", help="Communication tone")
    args = parser.parse_args()
    
    onboarder = ClientOnboarder()
    
    services = [s.strip() for s in args.services.split(",")]
    
    result = onboarder.onboard(
        client_id=args.id,
        business_name=args.name,
        email=args.email,
        area_code=args.area_code,
        services=services,
        tone=args.tone
    )
    
    print(f"\n✅ Onboarding complete for {result['client_id']}")


if __name__ == "__main__":
    main()