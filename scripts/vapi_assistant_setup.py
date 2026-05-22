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


def create_or_update_assistant(client_id: str, client_config: dict, full_config: dict = None):
    vapi_config = client_config.get("vapi", {})
    twilio_number = client_config.get("twilio_number")

    headers = {
        "Authorization": f"Bearer {VAPI_PRIVATE_KEY}",
        "Content-Type": "application/json"
    }

    # Get the default template assistant ID
    template_assistant_id = vapi_config.get("template_assistant_id")
    if not template_assistant_id and full_config:
        template_assistant_id = full_config.get("defaults", {}).get("vapi", {}).get("template_assistant_id")

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
            "voiceId": "21m00Tcm4TlvDq8ikWAM"
        }
    }

    # If no assistant_id exists for this client, try to clone from template
    assistant_id = vapi_config.get("assistant_id")

    if not assistant_id and template_assistant_id:
        # Clone from Appointment Receptionist template
        print(f"Cloning from template assistant: {template_assistant_id}")
        template_url = f"{VAPI_BASE_URL}/assistant/{template_assistant_id}"
        template_resp = requests.get(template_url, headers=headers)
        
        if template_resp.status_code == 200:
            template_data = template_resp.json()
            # Start with template settings and override with client-specific values
            payload = {
                "name": f"{client_config.get('business_name', client_id)} Assistant",
                "firstMessage": vapi_config.get("first_message") or template_data.get("firstMessage"),
                "model": {
                    "provider": template_data.get("model", {}).get("provider", "openai"),
                    "model": template_data.get("model", {}).get("model", "gpt-4o"),
                    "systemPrompt": vapi_config.get("prompt") or template_data.get("model", {}).get("systemPrompt")
                },
                "voice": template_data.get("voice", {
                    "provider": "11labs",
                    "voiceId": "21m00Tcm4TlvDq8ikWAM"
                })
            }
        else:
            print(f"Warning: Could not fetch template assistant ({template_resp.status_code})")

    if assistant_id:
        url = f"{VAPI_BASE_URL}/assistant/{assistant_id}"
        response = requests.patch(url, headers=headers, json=payload)
    else:
        # When creating new assistant, do not include phoneNumberId
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

    create_or_update_assistant(client_id, client_config, config)


if __name__ == "__main__":
    main()