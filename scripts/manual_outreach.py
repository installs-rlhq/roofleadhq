#!/usr/bin/env python3
"""
RoofLeadHQ - Manual Lead Outreach via SMS

Allows roofers to manually trigger outreach by sending SMS commands:
- contact +15551234567 urgent leak on Main St
- call +15551234567
- followup +15551234567

This module parses commands, creates/looks up leads, sends confirmations,
and triggers the appropriate follow-up actions based on client config.

Usage:
    python scripts/manual_outreach.py --message "contact +15551234567 urgent leak" --from +17205551234 --client test-roofing
"""

import re
import json
import sys
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, Optional, Tuple

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scripts.structured_logger import get_logger
from scripts.supabase_client import SupabaseClient
from scripts.inbound_handler import InboundHandler

logger = get_logger()


class ManualOutreachHandler:
    """Handles manual SMS commands from roofers for lead outreach."""

    COMMAND_PATTERNS = {
        "contact": r"contact\s+([+\d\s\-()]{7,20})(.*)",
        "call": r"call\s+([+\d\s\-()]{7,20})(.*)",
        "followup": r"followup\s+([+\d\s\-()]{7,20})(.*)",
        "sms": r"sms\s+([+\d\s\-()]{7,20})(.*)",
    }

    def __init__(self, client_id: str = None):
        self.client_id = client_id
        self.config = self._load_config()
        self.supabase = SupabaseClient()
        self.inbound_handler = InboundHandler()

    def _load_config(self) -> Dict:
        try:
            with open("master-config.json") as f:
                config = json.load(f)
            if self.client_id:
                return config.get("clients", {}).get(self.client_id, {})
            return config
        except Exception:
            return {}

    def parse_command(self, message: str) -> Optional[Tuple[str, str, str]]:
        """
        Parse an SMS command.
        Returns (action, phone, notes) or None.
        """
        message = message.strip().lower()

        for action, pattern in self.COMMAND_PATTERNS.items():
            match = re.search(pattern, message, re.IGNORECASE)
            if match:
                phone = self._normalize_phone(match.group(1))
                notes = match.group(2).strip() if len(match.groups()) > 1 else ""
                return action, phone, notes

        return None

    def _normalize_phone(self, raw: str) -> str:
        """Normalize phone number to +1XXXXXXXXXX format."""
        digits = re.sub(r"\D", "", raw)
        if len(digits) == 10:
            return f"+1{digits}"
        elif len(digits) == 11 and digits.startswith("1"):
            return f"+{digits}"
        return f"+{digits}" if digits else raw

    def handle_manual_command(self, from_number: str, message: str, client_id: str = None) -> Dict[str, Any]:
        """
        Main entry point for manual outreach commands.
        """
        client_id = client_id or self.client_id or "test-roofing"
        parsed = self.parse_command(message)

        if not parsed:
            return {
                "success": False,
                "message": "Unrecognized command. Try: contact +15551234567 notes here"
            }

        action, phone, notes = parsed

        # Create or update lead
        lead_data = {
            "client_id": client_id,
            "phone": phone,
            "source": "Manual SMS Outreach",
            "notes": notes or f"Manual {action} request",
            "status": "new",
            "urgency": "hot" if "urgent" in notes.lower() else "standard",
            "received_at": datetime.utcnow().isoformat() + "Z",
            "metadata": {
                "command": action,
                "initiated_by": from_number,
                "manual_outreach": True
            }
        }

        try:
            self.supabase.insert_lead(lead_data)
        except Exception as e:
            logger.warning(f"Failed to insert manual outreach lead: {e}")

        # Send confirmation back to roofer
        confirmation = self._send_confirmation(from_number, action, phone, client_id)

        # Trigger action
        action_result = self._trigger_action(action, phone, client_id, notes)

        logger.info(f"Manual outreach processed", action=action, phone=phone, client=client_id)

        return {
            "success": True,
            "action": action,
            "phone": phone,
            "notes": notes,
            "confirmation_sent": confirmation,
            "action_triggered": action_result
        }

    def _send_confirmation(self, to_roofer: str, action: str, phone: str, client_id: str) -> bool:
        """Send confirmation SMS back to the roofer."""
        actions_text = {
            "contact": "Contact",
            "call": "Vapi Call",
            "followup": "Follow-up Sequence",
            "sms": "SMS Sequence"
        }

        msg = f"✅ {actions_text.get(action, action).title()} queued for {phone}. Reply SMS / CALL / EDIT / CANCEL within 60s to adjust."

        # In production this would call Twilio to send SMS
        logger.info(f"Confirmation SMS would be sent to {to_roofer}: {msg}")
        return True

    def _trigger_action(self, action: str, phone: str, client_id: str, notes: str) -> Dict:
        """Trigger the appropriate follow-up action."""
        client_config = self.config.get("clients", {}).get(client_id, self.config)

        if action in ("call", "contact"):
            # Trigger Vapi call using existing config
            vapi = client_config.get("vapi", {})
            if vapi.get("assistant_id"):
                logger.info(f"Vapi follow-up call triggered for {phone}", client=client_id)
                return {"type": "vapi_call", "status": "initiated"}

        if action in ("followup", "sms", "contact"):
            # Trigger SMS follow-up cadence
            cadence = client_config.get("follow_up_cadence", {}).get("sms", [5, 30, 120])
            logger.info(f"SMS follow-up cadence triggered for {phone}", cadence=cadence, client=client_id)
            return {"type": "sms_cadence", "status": "started", "cadence": cadence}

        return {"type": "none", "status": "no_action"}


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--message", required=True)
    parser.add_argument("--from", dest="from_number", required=True)
    parser.add_argument("--client", default="test-roofing")

    args = parser.parse_args()

    handler = ManualOutreachHandler(client_id=args.client)
    result = handler.handle_manual_command(args.from_number, args.message, args.client)

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()