#!/usr/bin/env python3
"""
RoofLeadHQ - Inbound Call & SMS Handler

Handles inbound calls and SMS from Twilio/Vapi.
Routes events to appropriate workflows based on master-config.json.

Usage:
    python scripts/inbound_handler.py --event call --client test-roofing --from +15551234567
"""

import json
import sys
import os
from datetime import datetime
from pathlib import Path

# Add parent to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scripts.structured_logger import get_logger
from scripts.supabase_client import SupabaseClient
from scripts.webhook_verifier import verify_webhook

logger = get_logger()


class InboundHandler:
    def __init__(self, twilio_auth_token: str = None):
        self.config = self._load_config()
        self.supabase = SupabaseClient()
        self.twilio_auth_token = twilio_auth_token or os.getenv("TWILIO_AUTH_TOKEN", "CHANGE_ME")

    def _load_config(self):
        config_path = Path("master-config.json")
        if config_path.exists():
            return json.loads(config_path.read_text())
        return {}

    def handle_inbound_call(self, client_id: str, from_number: str, to_number: str = None, call_id: str = None, raw_body: bytes = None, signature: str = None):
        """Handle inbound call event with optional Twilio verification."""
        client_config = self.config.get("clients", {}).get(client_id, {})
        if not client_config:
            logger.error(f"Client not found: {client_id}")
            return {"error": "Client not configured"}

        # Twilio signature verification if raw_body and signature provided
        if raw_body and signature:
            is_valid = verify_webhook("twilio", raw_body, signature, self.twilio_auth_token)
            if not is_valid:
                logger.warning(f"Invalid Twilio signature for inbound call", client=client_id)
                return {"error": "Invalid signature"}

        logger.info(f"Inbound call received", client=client_id, from_number=from_number, call_id=call_id)

        # Record lead in Supabase (or mock)
        lead_data = {
            "client_id": client_id,
            "phone": from_number,
            "source": "inbound_call",
            "status": "new",
            "received_at": datetime.utcnow().isoformat() + "Z",
            "metadata": {"call_id": call_id, "to_number": to_number}
        }

        try:
            self.supabase.insert_lead(lead_data)
        except Exception as e:
            logger.warning(f"Failed to insert lead: {e}")

        # Trigger follow-up workflow if configured
        self._trigger_follow_up_workflow(client_id, from_number, "inbound_call", client_config)

        return {
            "handled": True,
            "client": client_id,
            "type": "inbound_call",
            "from": from_number,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }

    def handle_inbound_sms(self, client_id: str, from_number: str, message: str, to_number: str = None, raw_body: bytes = None, signature: str = None):
        """Handle inbound SMS event with optional Twilio verification."""
        client_config = self.config.get("clients", {}).get(client_id, {})
        if not client_config:
            logger.error(f"Client not found: {client_id}")
            return {"error": "Client not configured"}

        # Twilio signature verification if raw_body and signature provided
        if raw_body and signature:
            is_valid = verify_webhook("twilio", raw_body, signature, self.twilio_auth_token)
            if not is_valid:
                logger.warning(f"Invalid Twilio signature for inbound SMS", client=client_id)
                return {"error": "Invalid signature"}

        logger.info(f"Inbound SMS received", client=client_id, from_number=from_number, message_preview=message[:50])

        # Record SMS lead
        lead_data = {
            "client_id": client_id,
            "phone": from_number,
            "source": "inbound_sms",
            "status": "new",
            "message": message,
            "received_at": datetime.utcnow().isoformat() + "Z",
            "metadata": {"to_number": to_number}
        }

        try:
            self.supabase.insert_lead(lead_data)
        except Exception as e:
            logger.warning(f"Failed to insert lead: {e}")

        # Trigger follow-up workflow if configured
        self._trigger_follow_up_workflow(client_id, from_number, "inbound_sms", client_config)

        return {
            "handled": True,
            "client": client_id,
            "type": "inbound_sms",
            "from": from_number,
            "message": message[:100],
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }

    def _trigger_follow_up_workflow(self, client_id: str, from_number: str, source: str, client_config: dict):
        """Trigger appropriate follow-up workflow based on client config."""
        follow_up_cadence = client_config.get("follow_up_cadence", {})
        if not follow_up_cadence:
            logger.info(f"No follow-up cadence configured for {client_id}")
            return

        sms_cadence = follow_up_cadence.get("sms", [])
        if sms_cadence:
            logger.info(f"Follow-up SMS workflow triggered for {client_id} (cadence: {sms_cadence})")

        email_cadence = follow_up_cadence.get("email", [])
        if email_cadence:
            logger.info(f"Follow-up Email workflow triggered for {client_id}")

        logger.info(f"Follow-up workflow initiated", client=client_id, source=source, from_number=from_number)


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--event", choices=["call", "sms"], required=True)
    parser.add_argument("--client", required=True)
    parser.add_argument("--from", dest="from_number", required=True)
    parser.add_argument("--to", dest="to_number")
    parser.add_argument("--message")
    parser.add_argument("--call-id")

    args = parser.parse_args()

    handler = InboundHandler()

    if args.event == "call":
        result = handler.handle_inbound_call(
            client_id=args.client,
            from_number=args.from_number,
            to_number=args.to_number,
            call_id=args.call_id
        )
    else:
        result = handler.handle_inbound_sms(
            client_id=args.client,
            from_number=args.from_number,
            message=args.message or "",
            to_number=args.to_number
        )

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()