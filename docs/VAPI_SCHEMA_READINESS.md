# Vapi Schema Readiness

**Status:** Schema Ready / Documentation Only  
**Date:** 2026-05-31  
**Purpose:** Document Supabase schema readiness for the Vapi Phone Lead Path before implementation.

## Current Status

Core Vapi Phone Lead Path columns and allowed values are ready.

The production-grade duplicate protection index for Vapi/Retell call provider IDs has been applied and verified.

Verified index:

CREATE UNIQUE INDEX calls_provider_call_id_unique_idx
ON public.calls USING btree (provider, provider_call_id)
WHERE (provider_call_id IS NOT NULL);

Verified indexes on public.calls:

- calls_pkey
- calls_provider_call_id_unique_idx
- idx_calls_roofer_lead

## Readiness Result

PASS: leads supports source_path = phone.
PASS: leads supports source_detail = vapi.
PASS: calls supports provider = vapi.
PASS: calls.provider_call_id now has duplicate webhook protection.
PASS: bookings can store booked inspection records.
PASS: follow_ups can store record-first follow-up rows.
PASS: workflow_events can store audit logs.
PASS: roofers.twilio_number can support phone-number-to-roofer lookup.

No calls schema blocker remains before Vapi webhook planning.

## Booking Rule For Vapi MVP

Only create a booking when appointment_booked = true and a valid appointment time exists.

Do not create a booking merely because appointment_requested = true.

Google Calendar event creation remains future-phase only.

## Follow-Up Rule For Vapi MVP

For the first Vapi webhook MVP, follow-up rows may be created in Supabase.

No homeowner SMS should be sent yet.

## Explicit Non-Goals

Do not implement Vapi yet.
Do not trigger real Vapi calls.
Do not send homeowner SMS.
Do not send roofer SMS.
Do not create Google Calendar events.
Do not trigger Resend emails.
Do not trigger Lindy production workflows.
Do not create live external side effects beyond approved Supabase writes.

## Next Safe Step

The next safe step is Vapi webhook planning only.

Do not write implementation code until the webhook payload shape, required fields, idempotency behavior, lead matching rules, booking rules, follow-up rules, and audit logging plan are reviewed and approved.
