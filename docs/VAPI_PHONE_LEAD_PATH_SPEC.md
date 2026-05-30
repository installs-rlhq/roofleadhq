# Vapi Phone Lead Path Specification

**Status:** Planning / Specification Only  
**Phase:** Phase 4 Prep  
**Last Updated:** 2026-05-30  
**Owner:** RoofLeadHQ  

## 1. Status and Scope

This document defines the Vapi Phone Lead Path specification and Supabase payload mapping for a future implementation phase.

This is a planning document only. No code implementation is approved by this document.

In scope:

- Define the intended Vapi inbound phone lead flow.
- Define the normalized internal payload shape RoofLeadHQ expects to persist.
- Define future Supabase record creation/update rules.
- Define idempotency, security, and validation requirements.
- Define what should not happen during the first Vapi webhook MVP.

Out of scope:

- No code implementation.
- No live Vapi calls.
- No homeowner SMS.
- No roofer confirmation SMS.
- No Google Calendar event creation.
- No Resend emails.
- No Lindy production trigger.
- No production side effects beyond future approved Supabase writes.
- No assumption that the current database already has every needed column.

## 2. Overview and Goals

The Vapi Phone Lead Path will allow RoofLeadHQ to capture inbound phone calls as structured phone-source leads.

A homeowner calls a roofer's connected phone number. Vapi handles or assists with the call, captures call details, and sends a post-call webhook to RoofLeadHQ. RoofLeadHQ then normalizes the payload and stores the result in Supabase.

Core principle:

Every Vapi call should produce a durable, auditable Supabase record before any external action is considered.

## 3. High-Level Flow

1. Inbound call arrives through the roofer's connected Twilio/Vapi phone path.
2. Vapi handles or assists the call.
3. Vapi captures call details, transcript, summary, and structured fields.
4. Vapi sends a post-call webhook to RoofLeadHQ.
5. RoofLeadHQ validates webhook authenticity.
6. RoofLeadHQ normalizes the raw Vapi payload into the internal target shape.
7. RoofLeadHQ performs idempotency check using provider_call_id / Vapi call ID.
8. RoofLeadHQ creates or updates a lead with source_path = phone and source_detail = vapi.
9. RoofLeadHQ creates a calls record with the full raw payload for audit.
10. If appointment is confirmed/booked, RoofLeadHQ creates a booking record.
11. If appointment is not booked, RoofLeadHQ schedules follow-ups according to approved rules.
12. RoofLeadHQ logs workflow_events.
13. RoofLeadHQ returns 200 OK to Vapi.

## 4. Normalized Vapi Payload Target Shape

This is the internal normalized target shape RoofLeadHQ should use after receiving and parsing the Vapi webhook.

This is not confirmed to be the raw Vapi webhook payload shape.

The real raw Vapi payload must be verified against Vapi documentation and a safe test webhook before implementation.

```json
{
  "provider_call_id": "string",
  "roofer_phone": "string",
  "caller_phone": "string",
  "started_at": "ISO8601 string",
  "ended_at": "ISO8601 string",
  "duration_seconds": 0,
  "transcript": "string",
  "summary": "string",
  "outcome": "booked | not_booked | voicemail | no_answer | hung_up | unknown",
  "customer_name": "string or null",
  "customer_address": "string or null",
  "issue_description": "string or null",
  "urgency": "string or null",
  "preferred_time": "string or null",
  "appointment_requested": false,
  "appointment_booked": false,
  "appointment_time": "ISO8601 string or null",
  "raw_payload": {}
}

## Terminal 1 — Chunk 3 of 4

```bash
cat >> docs/VAPI_PHONE_LEAD_PATH_SPEC.md <<'EOF'
### bookings

Expected behavior:

- Create a booking only when the appointment is confirmed/booked.
- Do not create a booking merely because an appointment was requested.
- Calendar event creation is not part of the first Vapi webhook MVP.

Intended mapping:

| Normalized Field | Supabase Target | Notes |
|---|---|---|
| roofer_id | bookings.roofer_id | From lead |
| lead_id | bookings.lead_id | From lead |
| appointment_time | bookings.booked_time | Only if confirmed/booked |
| appointment_type | bookings.appointment_type | Default may be inspection |
| status | bookings.status | Default scheduled |

### follow_ups

Expected behavior:

- Schedule follow-ups only when no appointment is booked and the lead is eligible.
- Follow-up creation must respect future quiet-hours, opt-out, and compliance rules before any live SMS is enabled.

Initial planning sequence:

- initial
- 2h
- 12h
- 24h

No homeowner SMS should be sent in this phase.

### workflow_events

Recommended events:

- call_completed
- lead_created
- lead_updated
- booking_created
- followup_scheduled
- vapi_webhook_duplicate_skipped
- vapi_webhook_invalid

Workflow events should create a clear audit trail for dashboard and debugging.

## 6. Lead Matching Rules

Preferred matching rule:

1. Identify roofer by called number or configured Vapi/Twilio number.
2. Normalize caller phone number.
3. Search for existing lead by roofer_id + phone.
4. If a match exists, update the lead.
5. If no match exists, create a new lead.

Open decision:

- Whether to limit matching to recent leads only or all leads for that roofer.

## 7. Lead Status Rules

Planning defaults:

- New valid Vapi phone lead: new.
- Completed call with meaningful homeowner interaction: contacted.
- Confirmed booking: status should align with existing booking/dashboard conventions.
- Unqualified or service-area mismatch: status should align with existing eligibility rules after schema verification.

Do not invent new lead statuses until the real status constraints are verified.

## 8. Booking Rules

A booking record is created only when:

- appointment_booked = true
- appointment_time is present
- appointment_time is valid and normalized
- roofer/lead lookup succeeds

A booking record is not created when:

- Appointment was merely requested.
- Appointment time is missing.
- The call was voicemail/no-answer/hung-up.
- The webhook is a duplicate.
- Required roofer/lead matching fails.

Google Calendar event creation is future-phase only.

## 9. Follow-Up Routing Rules

If appointment is booked:

- Do not create follow-ups.

If appointment is not booked:

- Create approved follow-up records only.
- Do not send SMS yet.
- Do not trigger Vapi outbound calls yet.
- Do not trigger Resend, Lindy, or Google Calendar.

Follow-ups should remain record-first until live messaging is separately reviewed and approved.

## 10. Idempotency Rules

The webhook must be safe to receive more than once.

Primary idempotency key:

- provider_call_id / Vapi call ID

Rules:

- If a call record already exists with the same provider and provider_call_id, skip duplicate creation.
- Duplicate webhook delivery must not create duplicate leads.
- Duplicate webhook delivery must not create duplicate bookings.
- Duplicate webhook delivery must not create duplicate follow-ups.
- Duplicate attempts should be logged as workflow events when appropriate.

## 11. Security and Validation Requirements

Before production implementation:

- Verify Vapi webhook signature validation requirements.
- Validate request body shape before database writes.
- Use server-side service role key only.
- Never expose service role key to frontend.
- Do not log full transcripts, raw payloads, homeowner phone numbers, or addresses in plain server logs.
- Return safe error responses.
- Keep raw payload in Supabase only where appropriate for audit/debugging.

## 12. Dashboard and Reporting Impact

Expected future dashboard/reporting impact:

- Phone leads should appear with source_path = phone.
- Vapi-specific phone leads should use source_detail = vapi.
- Calls table should support future phone lead activity reporting.
- Manual Outreach dashboard must remain filtered to manual source activity only.
- Vapi phone activity should not pollute Manual Outreach recent activity.
- Weekly/monthly reports may eventually include phone lead conversion, booking rate, and missed-call outcomes.

## 13. Explicit Non-Goals for This Phase

This phase does not include:

- Code implementation.
- Real Vapi calls.
- Homeowner SMS.
- Roofer confirmation SMS.
- Google Calendar event creation.
- Resend emails.
- Lindy production triggers.
- Vapi outbound calls.
- Live customer-facing side effects.
- Schema changes before real schema verification.
- Claims that current schema already supports every mapped field.

## 14. Open Questions Before Implementation

1. What is the exact raw Vapi post-call webhook payload shape?
2. What signature validation method does Vapi provide for webhooks?
3. Which existing table maps roofer phone numbers to roofer IDs?
4. Which calls table columns already exist in the real Supabase schema?
5. Which leads table columns already exist in the real Supabase schema?
6. Which bookings table columns already exist in the real Supabase schema?
7. Should failed, missed, no-answer, or voicemail calls create leads or only calls records?
8. Should lead matching search all historical leads or only recent/open leads?
9. What statuses are currently allowed by database constraints?
10. Should Retell and Vapi share the same calls.provider model?
11. What is the minimum safe Vapi test payload for local/non-production testing?
12. What dashboard section should eventually show phone lead activity?

## Implementation Gate

Before implementation begins, the following must be verified:

- Real Vapi webhook sample payload.
- Real Supabase schema columns and constraints.
- Existing phone-number-to-roofer lookup path.
- Idempotency storage strategy.
- Signature validation approach.
- No live SMS/calendar/external trigger behavior.
- Reviewed diff and successful backend build.

End of specification.
