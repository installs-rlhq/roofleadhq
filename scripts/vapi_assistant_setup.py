#!/usr/bin/env python3
"""
Vapi Assistant Setup Helper

Helps create or update Vapi assistants with proper configuration
for RoofLeadHQ clients.

Usage:
    python scripts/vapi_assistant_setup.py --client test-roofing
"""

import json
import os
import sys
import requests
from pathlib import Path

VAPI_BASE_URL = "https://api.vapi.ai"
VAPI_PRIVATE_KEY = os.getenv("VAPI_PRIVATE_KEY")


def create_or_update_assistant(client_id: str, client_config: dict):
    vapi_config = client_config.get("vapi", {})
    twilio_number = client_config.get("twilio_number")

    headers = {
        "Authorization": f"Bearer {VAPI_PRIVATE_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "name": f"{client_config.get('business_name', client_id)} Assistant",
        "firstMessage": vapi_config.get("first_message"),
        "model": {
            "provider": "openai",
            "model": "gpt-4o",
            "systemPrompt": vapi_config.get("prompt")
        },
        "voice": {
            "provider": "11labs",
            "voiceId": "21m00Tcm4TlvDq8ikWAM"  # Default professional voice
        },
        "phoneNumberId": vapi_config.get("phone_number_id")
    }

    # Check if assistant already exists
    assistant_id = vapi_config.get("assistant_id")

    if assistant_id:
        url = f"{VAPI_BASE_URL}/assistant/{assistant_id}"
        response = requests.patch(url, headers=headers, json=payload)
    else:
        url = f"{VAPI_BASE_URL}/assistant"
        response = requests.post(url, headers=headers, json=payload)

    if response.status_code in (200, 201):
        data = response.json()
        print(f"✅ Assistant configured: {data.get('id')}")
        print(f"   Name: {data.get('name')}")
        return data.get("id")
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return None


def main():
    if len(sys.argv) < 3 or sys.argv[1] != "--client":
        print("Usage: python scripts/vapi_assistant_setup.py --client <client_id>")
        sys.exit(1)

    client_id = sys.argv[2]
    config = json.loads(Path("master-config.json").read_text())
    client_config = config.get("clients", {}).get(client_id)

    if not client_config:
        print(f"❌ Client not found: {client_id}")
        sys.exit(1)

    create_or_update_assistant(client_id, client_config)


if __name__ == "__main__":
    main()