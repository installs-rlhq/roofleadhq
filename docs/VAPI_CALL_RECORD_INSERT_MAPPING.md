# RoofLeadHQ Vapi Call Record Insert Mapping

Version: May 31, 2026  
Status: Planning only  
Owner: Jason Lohse  
Scope: Vapi post-call webhook mapping before any Supabase writes are enabled

---

## 1. Purpose

This document defines how the RoofLeadHQ Vapi post-call webhook should eventually map a completed phone call into Supabase.

This is planning only.

No implementation is approved by this document.

---

## 2. Current Verified State

The current Vapi webhook route is live and verified on the VPS.

Endpoint:

    POST /webhooks/vapi/call-completed

Current behavior:

1. Receives a Vapi-style call-completed payload.
2. Normalizes provider call ID.
3. Normalizes caller phone.
4. Normalizes roofer destination number.
5. Looks up the roofer by roofers.twilio_number.
6. Returns dry-run JSON.
7. Does not write to Supabase.
8. Does not trigger any external systems.

Verified payload shapes:

1. Simple dry-run payload.
2. Realistic nested message.call Vapi payload.
3. Alternate nested message fields.
4. Unknown roofer destination returns 404 unknown_roofer.
5. Missing provider call ID returns 400 missing_required_field.

---

## 3. Safety Boundary

Until explicitly approved, the Vapi webhook must not:

- Create leads.
- Insert calls.
- Create bookings.
- Create follow-ups.
- Send homeowner SMS.
- Send roofer SMS.
- Create Google Calendar events.
- Send Resend emails.
- Trigger Lindy.
- Trigger any production workflow side effects.

The next implementation milestone should be limited to calls insert only, and only after this mapping is reviewed.

---

## 4. Source of Truth Principle

Supabase is the source of truth.

For Vapi phone calls:

- roofers identifies the client account.
- leads represents the homeowner opportunity.
- calls stores the completed phone call.
- bookings stores appointments only after booking behavior is explicitly approved.
- follow_ups stores scheduled follow-up actions only after follow-up behavior is explicitly approved.
- workflow_events stores audit events.

Important rule:

If an important Vapi action is not logged in Supabase, treat it as if it did not happen.

---

## 5. Roofer Lookup

Current lookup is already verified.

Input:

    normalized.roofer_destination_number

Lookup:

    select id, business_name, twilio_number
    from roofers
    where twilio_number = normalized.roofer_destination_number
    limit 1;

Expected success for current test roofer:

    roofer_id: be7efc94-bd68-43af-81b2-dc7b869b42df
    business_name: ABC Roofing Test
    twilio_number: +15127123200

Failure behavior:

    HTTP 404 unknown_roofer

No writes should happen when roofer lookup fails.

---

## 6. Required Fields Before Any Calls Insert

The webhook should not insert a calls record unless these fields are present:

| Required Field | Source | Normalized Field |
|---|---|---|
| Provider call ID | Vapi payload | provider_call_id |
| Caller phone | Vapi payload | caller_phone |
| Roofer destination number | Vapi payload | roofer_destination_number |
| Roofer ID | Supabase lookup | roofer_id |

If any required field is missing:

    HTTP 400 missing_required_field

No writes should happen.

---

## 7. Calls Table Mapping

The first write-enabled milestone should insert one row into `calls`.

The live `calls` table was verified before implementation planning. The first calls-only insert can proceed without creating or matching a lead because `calls.lead_id` is nullable.

### Live Calls Table Columns Verified

The following columns exist and are usable for the first calls-only insert:

| calls column | Status | Notes |
|---|---|---|
| `id` | exists | UUID primary key, defaults to `gen_random_uuid()` |
| `roofer_id` | exists | Required, foreign key to `roofers(id)` |
| `lead_id` | exists | Nullable, foreign key to `leads(id)` with `ON DELETE SET NULL` |
| `provider` | exists | Required, check constraint allows `vapi` and `retell` |
| `provider_call_id` | exists | Nullable, protected by unique partial index when present |
| `caller_phone` | exists | Nullable text |
| `call_started_at` | exists | Nullable timestamp with time zone |
| `call_ended_at` | exists | Nullable timestamp with time zone |
| `duration_seconds` | exists | Nullable integer |
| `transcript` | exists | Nullable text |
| `summary` | exists | Nullable text |
| `outcome` | exists | Nullable text |
| `appointment_requested` | exists | Nullable boolean |
| `appointment_booked` | exists | Nullable boolean |
| `recording_url` | exists | Nullable text |
| `raw_payload` | exists | Nullable jsonb |
| `created_at` | exists | Defaults to `now()` |
| `updated_at` | exists | Defaults to `now()` |

### Columns Not Present

The following columns do not currently exist and must not be referenced in the first implementation:

| Proposed column | Live schema status | Implementation decision |
|---|---|---|
| `started_at` | missing | Use `call_started_at` instead |
| `ended_at` | missing | Use `call_ended_at` instead |
| `direction` | missing | Do not insert |
| `status` | missing | Do not insert |
| `appointment_time` | missing | Do not insert |

### First Calls-Only Insert Mapping

Use only live columns that already exist:

| calls column | Source | Notes |
|---|---|---|
| `roofer_id` | Supabase roofer lookup | Required |
| `lead_id` | none for first milestone | Set to `null` or omit |
| `provider` | constant | Use `vapi` |
| `provider_call_id` | normalized provider call ID | Required for idempotency |
| `caller_phone` | normalized caller phone | Use normalized E.164 value |
| `call_started_at` | Vapi payload if available | Optional |
| `call_ended_at` | Vapi payload if available | Optional |
| `duration_seconds` | Vapi payload if available | Optional |
| `transcript` | Vapi payload if available | Optional |
| `summary` | Vapi payload if available | Optional |
| `outcome` | structured data or analysis if available | Optional |
| `appointment_requested` | normalized boolean | Optional |
| `appointment_booked` | normalized boolean | Optional |
| `recording_url` | Vapi payload if available | Optional |
| `raw_payload` | full request body | Store full webhook payload for debugging |
| `created_at` | database default | Do not manually set |
| `updated_at` | database default | Do not manually set |

### First Calls-Only Insert Should Not Use

Do not reference these fields in SQL or Supabase insert code until schema changes are approved:

- `appointment_time`
- `direction`
- `status`
- `started_at`
- `ended_at`

### Live Schema Readiness Conclusion

The live `calls` table is ready for a narrow Vapi calls-only insert because:

1. `roofer_id` exists and is required.
2. `lead_id` is nullable.
3. `provider = 'vapi'` is allowed by the provider check constraint.
4. `provider_call_id` exists.
5. `caller_phone` exists.
6. `raw_payload` exists as `jsonb`.
7. Transcript, summary, outcome, and appointment booleans already exist.
8. The unique partial idempotency index exists on `(provider, provider_call_id)` where `provider_call_id is not null`.

The first write milestone should still avoid lead creation, booking creation, follow-up creation, SMS, Calendar, Resend, and Lindy.

---

## 8. Idempotency Protection

Current schema status:

    calls_provider_call_id_unique_idx
    on public.calls(provider, provider_call_id)
    where provider_call_id is not null

Required insert behavior:

- Use provider = vapi.
- Use normalized provider_call_id.
- Do not create duplicate call rows for the same Vapi call.
- On duplicate provider call ID, return a safe idempotent response instead of failing dangerously.

Recommended duplicate behavior:

    HTTP 200
    ok: true
    dry_run: false
    duplicate: true
    provider_call_id: same provider call ID

This should be approved before implementation.

---

## 9. Lead Matching Plan

Lead matching should not be enabled in the first calls-only insert unless explicitly approved.

When enabled later, proposed matching rule:

1. Match by roofer_id.
2. Match by normalized homeowner phone.
3. Search recent leads first.
4. Prefer non-lost, non-cancelled leads.
5. If one clear match exists, attach lead_id.
6. If no match exists, create a new phone lead only after lead creation is approved.

Possible source mapping for new phone leads:

    source_path = phone
    source_detail = vapi
    status = new or needs_attention depending on call outcome

Do not create leads in the first calls-only write milestone unless explicitly approved.

---

## 10. Booking Mapping Plan

Booking creation should remain disabled until explicitly approved.

When approved later, create a booking only if:

    appointment_booked = true
    appointment_time is present
    roofer_id is known
    lead_id is known or created

Do not create a Google Calendar event until that separate integration is approved.

Possible booking status:

    scheduled

Possible workflow event:

    booking_created

---

## 11. Follow-Up Mapping Plan

Follow-up creation should remain disabled until explicitly approved.

When approved later, create follow-ups only if:

    appointment_booked = false
    caller_phone is valid
    lead_id exists
    lead is not opted_out
    lead is not lost
    lead is not cancelled

Possible follow-up schedule:

- initial
- 2h
- 12h
- 24h

Respect quiet hours before any live homeowner SMS is enabled.

---

## 12. Workflow Events Mapping

The first calls-only write milestone should create no workflow events unless explicitly approved.

When approved, recommended events:

| Event Type | When |
|---|---|
| call_completed | Vapi call inserted successfully |
| workflow_error | Required field missing, lookup failed, or insert failed |
| booking_created | Booking record created |
| followup_scheduled | Follow-up records created |
| lead_created | New phone lead created |
| lead_matched | Existing lead matched by phone |

For the first write milestone, the safest approach is:

1. Insert calls only.
2. Return JSON.
3. Do not create workflow events yet unless audit logging is necessary at the same time.

---

## 13. First Write Milestone Recommendation

Recommended next implementation milestone after this planning doc:

    Vapi calls insert only — no lead creation, no booking, no follow-ups, no SMS

Scope:

1. Validate payload.
2. Normalize phones.
3. Lookup roofer.
4. Insert one calls record.
5. Use provider = vapi.
6. Use provider_call_id for idempotency.
7. Store raw_payload.
8. Return JSON with call_id.
9. Return duplicate-safe response if the same provider_call_id is received again.

Still disabled:

- Lead creation.
- Lead matching unless lead_id column requires it.
- Booking creation.
- Follow-up creation.
- Homeowner SMS.
- Roofer SMS.
- Google Calendar.
- Resend.
- Lindy.

---

## 14. Required Verification Before First Write Implementation

Before writing implementation code, run schema verification from the VPS or Supabase SQL editor.

Confirm:

1. Exact calls table columns.
2. Which columns are nullable.
3. Current check constraints on calls.
4. Foreign keys on calls.
5. Existing indexes on calls.
6. Whether lead_id is nullable.
7. Whether raw_payload exists and accepts JSON.
8. Whether provider = vapi is allowed.
9. Whether status values include completed.
10. Whether appointment fields already exist.

Do not assume table shape from memory.

---

## 15. Open Questions Before Implementation

1. Is calls.lead_id nullable?
2. Does calls already have caller_phone, or is the phone stored under another column?
3. Does calls have raw_payload?
4. Does calls have appointment_booked, appointment_requested, and appointment_time columns?
5. What exact status values are allowed on calls?
6. Should the first write milestone insert only calls, or also create a workflow_events.call_completed audit row?
7. Should duplicate Vapi webhook retries return the existing call_id?
8. Should unknown roofer payloads be logged anywhere, or continue returning 404 with no writes?

---

## 16. Current Decision

Approved now:

    Planning only.

Not approved yet:

- Supabase writes.
- Lead creation.
- Calls insert.
- Booking creation.
- Follow-up creation.
- SMS.
- Calendar.
- Resend.
- Lindy.
