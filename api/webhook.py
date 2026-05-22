#!/usr/bin/env python3
"""
RoofLeadHQ - Webhook Handler

Receives webhooks from Facebook, Retell, Vapi, etc.
Routes to appropriate Lobster pipeline.
"""

from http.server import BaseHTTPRequestHandler
import json
import sys
import os
from datetime import datetime

# Add parent to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scripts.webhook_verifier import verify_webhook

from scripts.structured_logger import get_logger
logger = get_logger()

# Inbound handler
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.inbound_handler import InboundHandler

# Stripe imports (graceful fallback if not installed)
try:
    import stripe
    STRIPE_AVAILABLE = True
except ImportError:
    STRIPE_AVAILABLE = False
    stripe = None


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)

        # Determine source from path
        source = "unknown"
        if "facebook" in self.path:
            source = "facebook"
        elif "retell" in self.path:
            source = "retell"
        elif "vapi" in self.path:
            source = "vapi"
        elif "fillout" in self.path:
            source = "fillout"
        elif "stripe" in self.path:
            source = "stripe"
        elif "twilio" in self.path or "inbound" in self.path:
            source = "twilio"

        # Verify signature for security
        signature = self.headers.get(
            "X-Hub-Signature" if source == "facebook" else
            "X-Retell-Signature" if source == "retell" else
            "X-Vapi-Signature" if source == "vapi" else
            "X-Fillout-Signature" if source == "fillout" else
            "Stripe-Signature" if source == "stripe" else None
        )

        # Get secret from config (in production, load from env/master-config)
        secret = "CHANGE_ME"  # TODO: Load from master-config.json

        is_valid = verify_webhook(source, body, signature, secret)

        if not is_valid:
            logger.warning(f"Invalid webhook signature for {source}", source=source)
            self.send_response(401)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Invalid signature"}).encode())
            return

        try:
            payload = json.loads(body) if body else {}
        except json.JSONDecodeError:
            payload = {"raw": body.decode('utf-8', errors='ignore')}
        
        logger.info(f"Webhook received from {source}", source=source, payload_size=len(body))
        
        # Handle Stripe events
        if source == "stripe":
            result = self._handle_stripe_event(payload, body, signature)
        # Handle inbound Twilio/Vapi calls and SMS
        elif source in ("vapi", "twilio") or "inbound" in self.path:
            result = self._handle_inbound_event(source, payload, body, signature)
        else:
            result = {
                "received": True,
                "verified": True,
                "source": source,
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "payload_size": len(body),
                "message": "Webhook verified and queued for processing."
            }
        
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(result, indent=2).encode())
        return

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({
            "endpoint": "webhook",
            "methods": ["POST"],
            "sources": ["facebook", "retell", "vapi", "stripe", "twilio", "website"]
        }).encode())
        return

    def _handle_stripe_event(self, payload: dict, raw_body: bytes, signature: str):
        """Handle Stripe webhook events."""
        if not STRIPE_AVAILABLE:
            logger.error("Stripe library not installed")
            return {"error": "Stripe not configured"}

        stripe_secret = os.getenv("STRIPE_WEBHOOK_SECRET", "whsec_CHANGE_ME")

        try:
            # Verify signature
            event = stripe.Webhook.construct_event(
                raw_body, signature, stripe_secret
            )
        except ValueError:
            logger.error("Invalid Stripe payload")
            return {"error": "Invalid payload"}
        except stripe.error.SignatureVerificationError:
            logger.error("Invalid Stripe signature")
            return {"error": "Invalid signature"}

        event_type = event.get("type")
        data = event.get("data", {}).get("object", {})

        logger.info(f"Stripe event: {event_type}", event_type=event_type, stripe_id=data.get("id"))

        # Process important events
        if event_type == "checkout.session.completed":
            self._handle_checkout_completed(data)
        elif event_type == "invoice.payment_succeeded":
            self._handle_payment_succeeded(data)
        elif event_type == "customer.subscription.updated":
            self._handle_subscription_updated(data)
        else:
            logger.info(f"Unhandled Stripe event: {event_type}")

        return {
            "received": True,
            "source": "stripe",
            "event_type": event_type,
            "processed": True
        }

    def _handle_checkout_completed(self, session):
        client_email = session.get("customer_email")
        client_id = session.get("metadata", {}).get("client_id")
        logger.info(f"Checkout completed for {client_email} (client: {client_id})")
        # TODO: Trigger onboarding workflow

    def _handle_payment_succeeded(self, invoice):
        customer_id = invoice.get("customer")
        amount = invoice.get("amount_paid")
        logger.info(f"Payment succeeded: ${amount/100:.2f} for customer {customer_id}")
        # TODO: Update billing status in Supabase

    def _handle_subscription_updated(self, subscription):
        status = subscription.get("status")
        customer_id = subscription.get("customer")
        logger.info(f"Subscription updated: {status} for customer {customer_id}")
        # TODO: Update client subscription status

    def _handle_inbound_event(self, source: str, payload: dict, raw_body: bytes, signature: str):
        """Handle inbound calls/SMS from Twilio or Vapi."""
        # Support both JSON and Twilio form-encoded payloads
        if isinstance(payload, dict) and not payload:
            # Try to parse as form data if JSON failed
            try:
                from urllib.parse import parse_qs
                form_data = parse_qs(raw_body.decode('utf-8', errors='ignore'))
                payload = {k: v[0] if v else '' for k, v in form_data.items()}
            except Exception:
                pass

        client_id = payload.get("client_id") or payload.get("metadata", {}).get("client_id", "test-roofing")
        from_number = payload.get("from") or payload.get("From") or payload.get("caller", "unknown")
        to_number = payload.get("to") or payload.get("To")

        handler = InboundHandler()

        if "sms" in self.path.lower() or payload.get("SmsSid") or payload.get("Body"):
            message = payload.get("body") or payload.get("Body") or payload.get("message", "")
            result = handler.handle_inbound_sms(
                client_id=client_id,
                from_number=from_number,
                message=message,
                to_number=to_number,
                raw_body=raw_body,
                signature=signature
            )
        else:
            call_id = payload.get("call_id") or payload.get("CallSid") or payload.get("id")
            result = handler.handle_inbound_call(
                client_id=client_id,
                from_number=from_number,
                to_number=to_number,
                call_id=call_id,
                raw_body=raw_body,
                signature=signature
            )

        return result


if __name__ == "__main__":
    print("Webhook handler - deploy as Vercel function")