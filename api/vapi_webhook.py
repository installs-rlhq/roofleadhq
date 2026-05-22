from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
import json
import os
from datetime import datetime

app = FastAPI(title="RoofLeadHQ Vapi Webhook")

class VapiWebhookPayload(BaseModel):
    message: dict
    call: dict = None

@app.post("/webhook/vapi")
async def vapi_webhook(payload: dict):
    """
    Main Vapi webhook endpoint.
    Receives call completion data and processes lead notifications.
    """
    try:
        # Extract call data
        call_data = payload.get("message", {})
        call = payload.get("call", {})

        # Build lead data
        lead_data = {
            "name": call_data.get("customer", {}).get("name"),
            "phone": call_data.get("customer", {}).get("number"),
            "address": call_data.get("analysis", {}).get("address"),
            "issue": call_data.get("analysis", {}).get("summary"),
            "urgency": call_data.get("analysis", {}).get("urgency", "Standard"),
            "insurance": call_data.get("analysis", {}).get("insurance", "Unknown"),
            "appointment": call_data.get("analysis", {}).get("appointment_booked", "Not booked"),
            "source": "Vapi AI Voice Call",
            "duration": f"{call.get('duration', 0)} seconds"
        }

        # Format notification
        notification = format_lead_notification(lead_data)

        # Log / Send notification (in production: send via Twilio)
        print("\n=== New Lead Notification ===")
        print(notification)
        print("=============================\n")

        # TODO: Send SMS using Twilio
        # TODO: Save lead to Supabase

        return {"status": "success", "message": "Lead notification processed"}

    except Exception as e:
        print(f"Error processing Vapi webhook: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)