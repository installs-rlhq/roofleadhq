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

## Read-Only Leads Column Verification — 2026-05-31

Verified available fields for safe Vapi lead creation:

- roofer_id
- phone
- source_path
- source_detail
- status
- issue_description
- notes
- owner_notified
- created_at
- updated_at

Safe first insert payload should use only:

- roofer_id
- phone
- source_path = phone
- source_detail = vapi
- status
- issue_description
- notes
- owner_notified = false

## Implementation Verification — 2026-05-31

Implemented in commit:
- 93583a1 feat(vapi): create lead for unmatched calls

Verified behavior:
- unmatched Vapi calls create a new lead
- new lead uses source_path = phone
- new lead uses source_detail = vapi
- booked calls create lead status = booked
- calls.lead_id is set to the new lead id
- existing lead matching still works
- duplicate provider_call_id still works
- unknown roofer still returns 404
- missing provider_call_id still returns 400

Test result:
- backend/scripts/test-vapi-calls-insert.sh passed 5/5.

Still not enabled:
- no booking creation
- no follow_up creation
- no SMS
- no Calendar
- no Resend
- no Lindy

## Read-Only Linked Row Verification — 2026-05-31

Verified created Vapi lead and linked call:

- provider_call_id: vapi_insert_test_1780248758
- call_id: 47e2bf17-39e4-480b-93c8-c00a7049fb87
- lead_id: 6cacffa5-cf94-470c-a73a-658623cff745
- roofer_id matched
- caller_phone matched lead phone
- lead source_path = phone
- lead source_detail = vapi
- lead status = booked
- owner_notified = false

Result:
- read-only linked row verification passed
