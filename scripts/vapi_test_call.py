#!/usr/bin/env python3
"""
Vapi Test Call Script

Makes a test outbound call using Vapi for a specific client.

Usage:
    python scripts/vapi_test_call.py --client test-roofing --phone +15551234567
"""

import json
import os
import sys
import requests
from pathlib import Path

VAPI_BASE_URL = "https://api.vapi.ai"
VAPI_PRIVATE_KEY = os.getenv("VAPI_PRIVATE_KEY")


def make_test_call(client_id: str, phone_number: str):
    config = json.loads(Path("master-config.json").read_text())
    client = config.get("clients", {}).get(client_id, {})
    vapi = client.get("vapi", {})

    assistant_id = vapi.get("assistant_id")
    if not assistant_id:
        print(f"❌ No assistant_id configured for {client_id}")
        return False

    headers = {
        "Authorization": f"Bearer {VAPI_PRIVATE_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "assistantId": assistant_id,
        "customer": {
            "number": phone_number
        }
    }

    response = requests.post(f"{VAPI_BASE_URL}/call", headers=headers, json=payload)

    if response.status_code == 201:
        data = response.json()
        print(f"✅ Test call initiated successfully")
        print(f"   Call ID: {data.get('id')}")
        print(f"   Status: {data.get('status')}")
        return True
    else:
        print(f"❌ Failed to initiate call: {response.status_code}")
        print(response.text)
        return False


if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Usage: python scripts/vapi_test_call.py --client <id> --phone <number>")
        sys.exit(1)

    client_id = sys.argv[2]
    phone = sys.argv[4]

    make_test_call(client_id, phone)