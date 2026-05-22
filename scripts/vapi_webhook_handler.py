#!/usr/bin/env python3
"""
Vapi Webhook Handler for RoofLeadHQ

Handles incoming webhooks from Vapi when a call ends.
Extracts lead information and triggers a clean, compliant notification.

Usage:
    This script is intended to be used as a webhook endpoint.
"""

import json
import os
from datetime import datetime
from pathlib import Path

# In a real setup, this would be integrated with FastAPI/Flask or similar
# For now, this serves as the core logic handler.

def format_lead_notification(lead_data: dict) -> str:
    """Format lead data into a clean, readable notification with compliance text."""

    name = lead_data.get("name", "Not provided")
    phone = lead_data.get("phone", "Not provided")
    address = lead_data.get("address", "Not provided")
    issue = lead_data.get("issue", "Not provided")
    urgency = lead_data.get("urgency", "Standard")
    insurance = lead_data.get("insurance", "Unknown")
    appointment = lead_data.get("appointment", "Not booked")
    source = lead_data.get("source", "Vapi AI Voice Call")
    duration = lead_data.get("duration", "N/A")

    message = f"""🏠 New Lead — {{ business_name }}

Name: {name}
Phone: {phone}
Address: {address}
Issue: {issue}
Urgency: {urgency}
Insurance: {insurance}
Appointment: {appointment}

Lead Source: {source} ({duration})
Status: Qualified — ready for follow-up.

Msg & data rates may apply. Reply STOP to unsubscribe."""

    return message


def process_vapi_call_end(payload: dict):
    """
    Main handler for Vapi call completion webhook.
    """
    # Extract relevant data from Vapi payload
    # This structure depends on how Vapi sends the webhook
    lead_data = {
        "name": payload.get("customer", {}).get("name"),
        "phone": payload.get("customer", {}).get("number"),
        "address": payload.get("analysis", {}).get("address"),
        "issue": payload.get("analysis", {}).get("summary"),
        "urgency": payload.get("analysis", {}).get("urgency", "Standard"),
        "insurance": payload.get("analysis", {}).get("insurance", "Unknown"),
        "appointment": payload.get("analysis", {}).get("appointment_booked", "Not booked"),
        "source": "Vapi AI Voice Call",
        "duration": f"{payload.get('duration', 0)} seconds"
    }

    # Format the notification
    notification = format_lead_notification(lead_data)

    # In production, this would trigger SMS via Twilio
    print("=== New Lead Notification ===")
    print(notification)
    print("=============================")

    # TODO: Integrate with Twilio SMS sending logic here
    # TODO: Save lead to Supabase

    return notification


if __name__ == "__main__":
    # Example test payload
    test_payload = {
        "customer": {"name": "Sarah Thompson", "number": "(720) 555-0192"},
        "analysis": {
            "summary": "Storm damage on back side of roof",
            "address": "1424 Colonial Way, Denver",
            "urgency": "Standard",
            "insurance": "Unknown"
        },
        "duration": 107
    }

    process_vapi_call_end(test_payload)