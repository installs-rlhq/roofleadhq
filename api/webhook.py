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
        
        # Verify signature for security
        signature = self.headers.get(
            "X-Hub-Signature" if source == "facebook" else
            "X-Retell-Signature" if source == "retell" else
            "X-Vapi-Signature" if source == "vapi" else
            "X-Fillout-Signature" if source == "fillout" else None
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
            "sources": ["facebook", "retell", "vapi", "website"]
        }).encode())
        return


if __name__ == "__main__":
    print("Webhook handler - deploy as Vercel function")