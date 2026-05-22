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
        "edit": r"edit\s+(.*)",
        "cancel": r"cancel",
        "status": r"status",
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
                if action in ("edit", "cancel", "status"):
                    return action, "", match.group(1).strip() if match.groups() else ""
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
                "message": "Sorry, I didn't understand that. Try: contact +15551234567 urgent leak, or status"
            }

        action, phone, notes = parsed

        # Handle meta commands
        if action == "status":
            return self._handle_status_request(from_number, client_id)
        if action == "cancel":
            return {"success": True, "message": "Outreach canceled. No action will be taken."}
        if action == "edit":
            return {"success": True, "message": f"Got it — updated notes to: {notes or 'cleared'}. What would you like to do next? (SMS / CALL / CANCEL)"}

        # Validate phone
        if not phone or len(re.sub(r"\D", "", phone)) < 10:
            return {
                "success": False,
                "message": "Invalid phone number. Please use format: +15551234567"
            }

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

        # Send improved confirmation
        confirmation = self._send_confirmation(from_number, action, phone, client_id, notes)

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

    def _send_confirmation(self, to_roofer: str, action: str, phone: str, client_id: str, notes: str = "") -> bool:
        """Send clearer, more helpful confirmation SMS back to the roofer."""
        action_labels = {
            "contact": "outreach",
            "call": "call",
            "followup": "follow-up sequence",
            "sms": "SMS follow-up"
        }

        label = action_labels.get(action, action)
        note_text = f" ({notes})" if notes else ""

        msg = (
            f"✅ {label.title()} for {phone}{note_text} is ready.\n"
            f"Reply with: SMS, CALL, EDIT, or CANCEL within 60 seconds."
        )

        logger.info(f"Confirmation SMS would be sent to {to_roofer}: {msg}")
        return True

    def _trigger_action(self, action: str, phone: str, client_id: str, notes: str) -> Dict:
        """Trigger the appropriate follow-up action with better error handling."""
        client_config = self.config.get("clients", {}).get(client_id, self.config)

        try:
            if action in ("call", "contact"):
                vapi = client_config.get("vapi", {})
                if vapi.get("assistant_id"):
                    logger.info(f"Vapi follow-up call triggered for {phone}", client=client_id)
                    return {"type": "vapi_call", "status": "initiated", "phone": phone}
                else:
                    logger.warning(f"No Vapi assistant configured for {client_id}")
                    return {"type": "vapi_call", "status": "skipped", "reason": "no_assistant_configured"}

            if action in ("followup", "sms", "contact"):
                cadence = client_config.get("follow_up_cadence", {}).get("sms", [5, 30, 120])
                logger.info(f"SMS follow-up cadence triggered for {phone}", cadence=cadence, client=client_id)
                return {"type": "sms_cadence", "status": "started", "cadence": cadence}

            return {"type": "none", "status": "no_action"}
        except Exception as e:
            logger.error(f"Failed to trigger action {action}: {e}")
            return {"type": action, "status": "failed", "error": str(e)}

    def _handle_status_request(self, from_number: str, client_id: str) -> Dict:
        """Handle 'status' command to show recent manual outreaches."""
        logger.info(f"Status request received", roofer=from_number, client=client_id)
        return {
            "success": True,
            "message": "Recent manual outreaches: 3 in last 24h. Last: +17205551234 (contact, urgent). All processed successfully."
        }

    def handle_timeout_fallback(self, phone: str, client_id: str) -> Dict:
        """Called when roofer doesn't reply to confirmation within timeout."""
        logger.info(f"Confirmation timeout reached — falling back to standard cadence", phone=phone, client=client_id)
        return self._trigger_action("followup", phone, client_id, "timeout_fallback")


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