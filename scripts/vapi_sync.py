#!/usr/bin/env python3
"""
Vapi Dynamic Prompt Sync for RoofLeadHQ

Syncs client-specific Vapi prompts and first messages from master-config.json
to the Vapi platform using the VAPI_PRIVATE_KEY.

Usage:
    python scripts/vapi_sync.py --client test-roofing
    python scripts/vapi_sync.py --all
"""

import json
import os
import sys
import argparse
import requests
from pathlib import Path

VAPI_BASE_URL = "https://api.vapi.ai"
VAPI_PRIVATE_KEY = os.getenv("VAPI_PRIVATE_KEY")


def load_config():
    config_path = Path("master-config.json")
    if not config_path.exists():
        print("❌ master-config.json not found")
        sys.exit(1)
    return json.loads(config_path.read_text())


def sync_client_to_vapi(client_id: str, client_config: dict):
    vapi_config = client_config.get("vapi", {})
    if not vapi_config:
        print(f"⚠️  No Vapi config for client: {client_id}")
        return False

    assistant_id = vapi_config.get("assistant_id")
    prompt = vapi_config.get("prompt")
    first_message = vapi_config.get("first_message")
    phone_number = vapi_config.get("phone_number") or client_config.get("twilio_number")

    if not assistant_id:
        print(f"⚠️  No assistant_id for client: {client_id}")
        return False

    headers = {
        "Authorization": f"Bearer {VAPI_PRIVATE_KEY}",
        "Content-Type": "application/json"
    }

    payload = {}
    if prompt:
        payload["model"] = {
            "provider": "openai",
            "model": "gpt-4o",
            "systemPrompt": prompt
        }
    if first_message:
        payload["firstMessage"] = first_message

    if not payload:
        print(f"⚠️  Nothing to sync for client: {client_id}")
        return False

    url = f"{VAPI_BASE_URL}/assistant/{assistant_id}"
    response = requests.patch(url, headers=headers, json=payload)

    if response.status_code == 200:
        print(f"✅ Successfully synced Vapi prompt for {client_id}")
        return True
    else:
        print(f"❌ Failed to sync {client_id}: {response.status_code} - {response.text}")
        return False


def main():
    if not VAPI_PRIVATE_KEY:
        print("❌ VAPI_PRIVATE_KEY not found in environment")
        sys.exit(1)

    parser = argparse.ArgumentParser()
    parser.add_argument("--client", help="Sync specific client ID")
    parser.add_argument("--all", action="store_true", help="Sync all clients with Vapi config")
    args = parser.parse_args()

    config = load_config()
    clients = config.get("clients", {})

    success_count = 0

    if args.client:
        client_config = clients.get(args.client)
        if client_config:
            if sync_client_to_vapi(args.client, client_config):
                success_count += 1
        else:
            print(f"❌ Client not found: {args.client}")
    elif args.all:
        for client_id, client_config in clients.items():
            if sync_client_to_vapi(client_id, client_config):
                success_count += 1
    else:
        print("Please specify --client <id> or --all")
        sys.exit(1)

    print(f"\n✅ Sync complete. {success_count} client(s) updated.")


if __name__ == "__main__":
    main()