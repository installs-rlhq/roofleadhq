# Vapi Lead Creation Plan

Status: Planning only  
Do not implement yet.

## Goal

When a Vapi call has no matching existing lead, create a new lead safely.

## Current Verified Behavior

- Vapi inserts calls row.
- Vapi matches existing lead by:
  - calls.roofer_id = leads.roofer_id
  - calls.caller_phone = leads.phone
- If exactly one match exists, calls.lead_id is set.
- If no match exists, calls.lead_id remains null.
- No lead creation yet.

## Proposed No-Match Lead Creation

Only create a lead when:
- roofer is known
- caller_phone is valid
- provider_call_id is valid
- no existing lead matches roofer_id + phone

Create lead with:
- roofer_id
- phone = caller_phone
- source_path = phone
- source_detail = vapi
- status = booked if appointment_booked true, otherwise needs_attention
- issue_description from summary if available
- notes from transcript/summary if available
- owner_notified = false

Then:
- insert call with lead_id set to new lead id

## Not Included Yet

- booking creation
- follow_up creation
- homeowner SMS
- roofer SMS
- Calendar
- Resend
- Lindy
- workflow_events

## Risks

- Vapi may not capture homeowner name/address.
- Duplicate phone formats must stay normalized.
- We should avoid creating duplicate leads.
- Booked calls should not imply Calendar booking yet.
