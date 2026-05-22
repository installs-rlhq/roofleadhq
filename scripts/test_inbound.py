#!/usr/bin/env python3
"""
Quick test script for inbound Twilio/Vapi handling.

Usage:
    source scripts/activate_env.sh
    python scripts/test_inbound.py --type call --client test-roofing --from +15551234567
"""

import json
import sys
import os
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scripts.inbound_handler import InboundHandler


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--type", choices=["call", "sms"], default="call")
    parser.add_argument("--client", default="test-roofing")
    parser.add_argument("--from", dest="from_number", default="+15551234567")
    parser.add_argument("--message", default="Hi, I need a roof inspection")

    args = parser.parse_args()

    handler = InboundHandler()

    print(f"Testing inbound {args.type} for client: {args.client}")
    print(f"From: {args.from_number}")

    if args.type == "call":
        result = handler.handle_inbound_call(
            client_id=args.client,
            from_number=args.from_number,
            call_id="test-call-123"
        )
    else:
        result = handler.handle_inbound_sms(
            client_id=args.client,
            from_number=args.from_number,
            message=args.message
        )

    print("\nResult:")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()