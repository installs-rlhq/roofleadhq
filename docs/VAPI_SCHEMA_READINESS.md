# Vapi Schema Readiness

**Status:** Planning / Documentation Only  
**Date:** 2026-05-31  
**Purpose:** Document Supabase schema readiness for the Vapi Phone Lead Path before implementation.

## Current Status

The core Supabase schema is ready for the first Vapi Phone Lead Path implementation.

Confirmed ready:

- Required Vapi lead, call, booking, follow-up, workflow event, and roofer lookup tables exist.
- Required columns exist.
- Required allowed values exist.
- Phone-number-to-roofer lookup is available through `roofers.twilio_number`.
- One production-grade idempotency improvement is still required before enabling the production Vapi webhook.

This is documentation only.

Do not implement Vapi yet.  
Do not trigger real Vapi calls.  
Do not send homeowner SMS.  
Do not send roofer SMS.  
Do not create Google Calendar events.  
Do not trigger Resend emails.  
Do not trigger Lindy production workflows.

## Confirmed Tables

The following Supabase tables were checked for Vapi implementation readiness:

- `leads`
- `calls`
- `bookings`
- `follow_ups`
- `workflow_events`
- `roofers`

## Leads Readiness

The `leads` table is ready for Vapi phone leads.

Use:

```text
source_path = phone
source_detail = vapi
