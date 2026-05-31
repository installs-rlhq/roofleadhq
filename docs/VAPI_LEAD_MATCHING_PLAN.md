# Vapi Lead Matching Plan

Status: Planning only  
Do not implement yet.

## Goal

When a Vapi call completes, RoofLeadHQ should eventually connect the call to a lead.

Current behavior:
- Vapi webhook inserts one calls row.
- lead_id is currently null.
- No lead is created.
- No booking is created.
- No follow-ups are created.
- No SMS, Calendar, Resend, or Lindy actions are triggered.

## Proposed Matching Order

1. Identify roofer by destination number.
2. Normalize caller phone.
3. Search existing leads for same roofer_id and matching phone.
4. If exact lead match exists:
   - attach calls.lead_id to that lead.
5. If multiple matches exist:
   - do not guess.
   - leave lead_id null.
   - mark for manual review later.
6. If no match exists:
   - future phase may create a new lead.
   - do not create lead yet.

## Read-Only Verification Needed Before Implementation

Confirm leads table columns:
- id
- roofer_id
- homeowner_phone or phone equivalent
- source_path
- source_detail
- status
- created_at
- updated_at

Confirm whether phone numbers are stored normalized as E.164.

## First Implementation Scope Later

Allowed later:
- match existing lead by roofer_id + caller_phone
- update calls.lead_id only when one exact match exists

Not allowed yet:
- creating leads
- creating bookings
- creating follow_ups
- sending SMS
- creating Calendar events
- triggering Resend
- triggering Lindy

## Risk Notes

- Duplicate homeowner phone records may exist.
- Phone formats may not be normalized.
- Matching must be scoped by roofer_id.
- Do not attach calls across different roofers.
