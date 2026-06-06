# Vapi Post-Call Payload Discovery Package

Date: 2026-06-06

## Purpose

This package defines the discovery and verification strategy for Vapi post-call webhooks before any live Vapi automation is enabled. It is strictly a documentation and local-read-only verification artifact.

**Safety Posture:** No Vapi webhook route exists. No Vapi calls are made. No production automation is activated.

## Required Vapi Post-Call Fields (Discovery Checklist)

The following fields must be confirmed from real Vapi post-call payloads before any production mapping:

| Field Category       | Field Name                  | Required | Notes |
|----------------------|-----------------------------|----------|-------|
| Event                | event / type                | Yes      | Primary discriminator (e.g. `call.completed`, `call.ended`) |
| Phone                | caller_phone / from         | Yes      | Homeowner / lead phone number |
| Phone                | called_number / to          | Yes      | Roofer / business number |
| Transcript           | transcript                  | Yes      | Full conversation transcript |
| Summary              | summary                     | Yes      | AI-generated call summary |
| Outcome              | outcome / status            | Yes      | Appointment booked, callback requested, no answer, etc. |
| Homeowner            | homeowner_name / name       | Yes      | Homeowner full name |
| Contact              | email                       | Yes      | Homeowner email address |
| Property             | property_address / address  | Yes      | Full service address |
| Roof Issue           | roof_issue / issue          | Yes      | Description of roof problem |
| Urgency              | urgency                     | Yes      | High / Medium / Low or similar |
| Insurance            | insurance_claim / claim     | Yes      | Boolean or claim number |
| Appointment          | appointment_date / time     | Yes      | Proposed or booked appointment |
| Raw Payload          | raw_payload                 | Yes      | Full original Vapi JSON for audit |

## Raw Payload Capture Strategy

1. Create a temporary, gated, test-only Vapi webhook endpoint (never committed to production).
2. Log the complete incoming JSON body to a local file or Supabase `raw_vapi_payloads` table (test-only flag).
3. Run the payload through a local discovery script that extracts the fields above.
4. Compare extracted fields against the required checklist.
5. Store a sanitized sample payload (with PII redacted) in this doc or a dedicated `samples/` folder.
6. Once 3–5 real payloads have been captured and validated, mark this package complete and move to Vapi mapping implementation.

## Safety Rules

- No live Vapi webhook route in this repo.
- No Vapi API calls from any script.
- No Supabase writes from discovery scripts.
- No SMS, Twilio, Calendar, Resend, or Lindy activation.
- No route, cron, scheduler, or dispatcher activation.
- Retell remains deprecated and disabled.

## Related Verifiers

- `backend/scripts/verify-vapi-post-call-payload-discovery-readonly.js` (this package)
- Aggregate readiness verifier must reference this package once created.

## Status

**Current:** Discovery package created. No Vapi integration active. Retell deprecated. Ready for controlled payload capture phase when explicitly approved.