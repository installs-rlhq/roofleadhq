# Manual Outreach Operational QA Checklist

## Purpose

Use this checklist before enabling homeowner-facing Manual Outreach SMS.

## Current Safety Status

Manual Outreach currently creates/tracks records only.

It does not send:

- Homeowner SMS
- Roofer SMS
- Google Calendar events
- Vapi calls
- Resend emails
- Lindy production automation

The Twilio webhook returns empty TwiML only.

## Verified Hardening

Confirmed on 2026-06-02:

- Missing Twilio signature returns 403.
- Valid Twilio signature returns 200.
- Duplicate MessageSid returns 200.
- Duplicate retry creates exactly one manual_outreach_received event.
- Supabase metadata stores Twilio context.

Verification doc:

docs/TWILIO_MANUAL_OUTREACH_HARDENING_VERIFICATION.md

## Required Pre-Live Checks

Before homeowner-facing SMS is enabled, confirm:

- Twilio signature validation still exists.
- Duplicate MessageSid protection still exists.
- Webhook returns empty TwiML unless reply SMS is explicitly approved.
- Homeowner SMS templates are approved.
- Opt-out handling is approved.
- Quiet-hour rules are approved.
- Follow-up stop/pause behavior is approved.
- Internal error logging is approved.
- Test roofer can see Manual Outreach activity in dashboard.

## Manual Outreach Test Cases

### 1. Missing Signature

Expected:

- HTTP 403
- Empty TwiML
- No lead created
- No follow_up created
- No workflow_event created

### 2. Valid Signed Start Request

Input example:

+15557778888 Angi

Expected:

- HTTP 200
- Empty TwiML
- Roofer matched by Twilio To number
- Lead created or existing lead reused
- source_path = manual
- source_detail = angi
- follow_ups created:
  - initial
  - 2h
  - 12h
  - 24h
- workflow_events created:
  - manual_outreach_received
  - lead_created if new lead
  - followup_scheduled
- No SMS sent

### 3. Duplicate MessageSid Retry

Expected:

- HTTP 200
- Empty TwiML
- No duplicate lead
- No duplicate follow_up sequence
- Exactly one manual_outreach_received event for the MessageSid

### 4. Unknown Roofer Twilio Number

Expected:

- HTTP 404
- No lead created
- No follow_up created
- No homeowner SMS sent

### 5. Body Without E.164 Phone

Expected:

- HTTP 200
- Empty TwiML
- No lead created
- No follow_up created
- No homeowner SMS sent

### 6. Source Keyword Mapping

Test each source:

- angi
- thumbtack
- referral
- homeadvisor
- other
- unknown fallback

Expected:

- source_detail matches approved Supabase values.

### 7. Pause Command

Input example:

pause +15557778888

Expected:

- Existing lead found or created according to current service behavior.
- Scheduled/pending follow_ups for that lead are skipped.
- followup_paused workflow_event created.
- No SMS sent.

### 8. Stop Command

Input example:

stop +15557778888

Expected:

- Existing lead found or created according to current service behavior.
- Scheduled/pending follow_ups for that lead are skipped.
- stopped_reason = roofer_stopped where applicable.
- followup_stopped workflow_event created.
- No SMS sent.

## Dashboard QA

Confirm dashboard shows Manual Outreach data:

- Manual Outreach Leads count
- Recent activity
- Needs attention values
- Source breakdown
- No red Manual Outreach load error

## Go-Live Blockers

Do not enable homeowner-facing SMS until these are complete:

- Approved SMS templates
- Opt-out compliance
- Quiet-hour/no-contact window
- Follow-up dispatcher safety
- Internal failure alerts
- Final signed webhook test
- Final dashboard visibility test

## Current Recommendation

Manual Outreach is safe for backend tracking tests.

Manual Outreach is not yet approved for live homeowner-facing SMS.

## QA Results 2026-06-02

Manual Outreach backend QA was run against the current backend with homeowner-facing SMS still disabled.

### Passed

- Source mapping:
  - angi returned 200 and stored source_detail = angi
  - thumbtack returned 200 and stored source_detail = thumbtack
  - referral returned 200 and stored source_detail = referral
  - homeadvisor returned 200 and stored source_detail = homeadvisor
  - other returned 200 and stored source_detail = other
  - unknown fallback returned 200 and stored source_detail = unknown

- Bad input:
  - Body without E.164 phone returned 200 and did not send SMS.
  - Unknown roofer Twilio number returned 404.

- Commands:
  - pause returned 200.
  - stop returned 200.
  - pause skipped scheduled follow_ups and created followup_paused.
  - stop skipped scheduled follow_ups, set stopped_reason = roofer_stopped, and created followup_stopped.

### Verified Safety

No homeowner SMS, roofer SMS, Calendar, Vapi, Resend, or Lindy production triggers were enabled during QA.

## Dashboard Visibility QA 2026-06-02

Manual Outreach dashboard API was tested with the Test Roofing dashboard access token.

### Passed

- Token resolved to Test Roofing.
- Direct Supabase manual lead count returned 13 manual leads.
- Dashboard API returned 6 manual leads this month.
- Dashboard API returned 8 recent activity rows.
- Recent activity included:
  - start
  - pause
  - stop
- Source breakdown populated:
  - angi
  - thumbtack
  - homeadvisor
  - referral
  - other
  - unknown
- Pause and stop activity appeared in the API response.
- Dashboard token security stayed enforced:
  - Request without token returned Unauthorized.

### Verified Safety

Dashboard visibility QA did not enable homeowner SMS, roofer SMS, Calendar, Vapi, Resend, or Lindy production triggers.

