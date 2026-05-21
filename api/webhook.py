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


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)
        
        try:
            payload = json.loads(body) if body else {}
        except json.JSONDecodeError:
            payload = {"raw": body.decode('utf-8', errors='ignore')}
        
        # Determine source from path or headers
        source = "unknown"
        if "facebook" in self.path:
            source = "facebook"
        elif "retell" in self.path:
            source = "retell"
        elif "vapi" in self.path:
            source = "vapi"
        
        result = {
            "received": True,
            "source": source,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "payload_size": len(body),
            "message": "Webhook received. Lobster pipeline execution queued."
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