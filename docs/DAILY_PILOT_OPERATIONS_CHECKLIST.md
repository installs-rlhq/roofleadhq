# Daily Pilot Operations Checklist

Date: 2026-06-02

## Purpose

Daily checklist for monitoring the first paid RoofLeadHQ pilot safely.

Assumption:
Production SMS, Calendar, Vapi, Resend, and Lindy triggers remain disabled unless explicitly approved.

## Daily Review Cadence

- Morning check
- Midday check
- End-of-day check

## 1. Backend Health

Run:

curl -sS "http://127.0.0.1:3000/health" | python3 -m json.tool

Pass condition:

- Backend returns healthy response.

## 2. Dashboard Access

Run with dashboard token locally only.

Do not paste dashboard tokens into chat.

Pass condition:

- Token resolves correct roofer.
- Dashboard API returns metrics.
- No-token request remains blocked.

## 3. Manual Outreach Activity

Review:

- New manual leads
- Pause commands
- Stop commands
- Unknown sources
- Duplicate-looking homeowner numbers
- Workflow errors

Pass condition:

- Manual Outreach appears in dashboard.
- No homeowner SMS is sent unless separately approved.

## 4. Leads Needing Attention

Prioritize:

1. Homeowner replied but no inspection booked
2. Urgent roofing issue
3. Missing address
4. Failed or skipped follow-up
5. Manual Outreach lead needing human review

## 5. Workflow Errors

Review:

- workflow_error
- booking_failed
- message_failed
- followup_failed
- unmatched inbound message
- missing required fields

Action:

- Handle manually.
- Document issue.
- Do not enable automation as a shortcut.

## 6. Follow-Up Safety

Confirm:

- No unexpected homeowner SMS
- No unexpected roofer SMS
- No automatic Calendar events
- No live Vapi production actions
- No Resend/Lindy production triggers

Run SMS read-only safety checks:

```bash
node backend/scripts/verify-sms-schema-readiness-readonly.js
node backend/scripts/verify-sms-safety-service.js
node backend/scripts/verify-sms-optout-workflow.js
node backend/scripts/verify-sms-dispatcher-planner.js
node backend/scripts/verify-sms-dispatcher-data-shape-readonly.js
node backend/scripts/verify-sms-dispatcher-execution-plan-readonly.js
node backend/scripts/verify-sms-dispatcher-write-plan.js
node backend/scripts/verify-sms-dispatcher-mock-write-executor.js
node backend/scripts/verify-sms-dispatcher-dry-run-executor.js
node backend/scripts/verify-sms-dispatcher-db-write-executor.js
node backend/scripts/verify-sms-dispatcher-manual-test-runner.js
node backend/scripts/verify-sms-dispatcher-production-runner.js
node backend/scripts/prepare-sms-dispatcher-manual-runner-live-test-readonly.js --static-only
node backend/scripts/prepare-sms-dispatcher-production-runner-live-test-readonly.js --static-only
node backend/scripts/verify-sms-test-roofer-enable-sms-live-test.js
node backend/scripts/run-sms-dispatcher-dry-run.js
```

Pass condition:

- All SMS checks pass.
- `send: 0` unless production SMS has been explicitly approved.
- No writes are performed.
- No SMS is sent.
- No Twilio calls are made.
- The dry-run executor returns plan results only.
- Proposed write plans require a live write gate.
- Mock write execution is in-memory/test-only.
- DB write executor verifier uses fake Supabase only and confirms live DB writes are gated off by default.
- Manual test-only runner verifier uses fake Supabase only and confirms manual and DB executor gates are required.
- Production runner verifier uses fake Supabase only and confirms production runner gates, DB executor gates, batch cap, and allowed roofer allowlist are required.
- Manual runner live prep static check confirms the prep script contains no writes, Twilio, SMS send, route, cron, or production dispatcher activation.
- Production runner live prep static check confirms the prep script contains no writes, Twilio, SMS send, route, cron, scheduler, or production dispatcher auto-start.
- Test roofer SMS enable verifier fails closed by default and confirms the only allowed gated update is `roofers.sms_confirmation_enabled=true` for the known test roofer.
- No route, cron, or production dispatcher activation is present.

Gated live-write verifier status:

- `backend/scripts/verify-sms-dispatcher-db-write-live-test.js` is not part of routine daily read-only checks.
- First gated test-only `messages`/`follow_ups` DB write was verified on 2026-06-04 with run id `db-live-prep-2026-06-04T19-36-05-696z`.
- Duplicate rerun failed closed with `duplicate_test_message_found`.
- Do not rerun the gated live-write verifier without explicit approval and fresh reviewed candidate IDs.
- Do not run `backend/scripts/run-sms-dispatcher-manual-test-only.js` against live Supabase without explicit approval, reviewed candidate scope, approved roofer id, and all manual runner plus DB executor gates.
- `backend/scripts/prepare-sms-dispatcher-manual-runner-live-test-readonly.js` is read-only prep only; its printed live runner command is not approved by default.
- The known test roofer SMS flag was enabled on 2026-06-04 for manual runner send-path DB testing: `sms_confirmation_enabled=false` -> `true`.
- Do not rerun `backend/scripts/verify-sms-test-roofer-enable-sms-live-test.js` with live-write gates unless explicitly re-approving this test-only flag state.
- Gated live manual test-only runner DB write was verified on 2026-06-04 with run id `manual-runner-live-prep-2026-06-04T20-19-31-541z`: action `send`, reason `eligible`, message insert `d4dce011-12fc-47d4-ba22-e0163384e2ac`, follow-up update `8747ca7c-acc8-4675-bbdc-c932dfdc96cb`, workflow event insert `84f71217-bf9b-4ebe-ae3f-1a847af476c6`, `applied=true`, `failedClosed=false`.
- The gated manual runner DB test sent no SMS, made no Twilio calls, and did not enable any route, cron, scheduler, or production dispatcher.
- `backend/src/services/sms-dispatcher-production-runner.service.ts` is a disabled production runner scaffold only. It has no SMS/Twilio send path, no route, no cron/scheduler, and no auto-start.
- Do not invoke the production runner with DB write gates unless production runner env gates, DB executor env gates, allowed roofer UUIDs, and batch scope have been explicitly approved.
- `backend/scripts/run-sms-dispatcher-production-runner.js` is an explicit CLI wrapper only. Default mode uses fake Supabase and fails closed unless gated.
- Do not run the production runner CLI against live Supabase unless `SMS_DISPATCHER_PRODUCTION_USE_LIVE_SUPABASE=true`, both live CLI flags, production runner gates, DB executor gates, allowed roofer UUIDs, and batch scope have all been explicitly approved.
- `backend/scripts/prepare-sms-dispatcher-production-runner-live-test-readonly.js` selected future production runner live test candidate `167bd260-5e06-45dd-b5b0-336915d5f5ac` for lead `2fbcae6f-1a0d-4709-9c17-e1c5158b8d0e` on 2026-06-04 without writes, SMS, Twilio, route, cron, or production runner execution.
- Do not run the printed production runner live command without explicit approval and a fresh review of the selected candidate, allowed roofer allowlist, duplicate scope, and batch size.

## 7. Booked Inspections

Confirm:

- Homeowner name
- Phone
- Address
- Date/time
- Source
- Roofer awareness

If automation is disabled, update manually.

## 8. Client Update

Optional daily roofer update:

Quick RoofLeadHQ update:

New leads today:
Manual Outreach activity:
Leads needing attention:
Booked inspections:
Recommended next step:

## 9. End-of-Day Notes

Record:

- What worked
- What failed
- Leads needing tomorrow follow-up
- Client feedback
- Product blockers

## Hard Safety Rules

Do not enable without explicit approval:

- homeowner SMS
- roofer SMS
- Google Calendar creation
- live Vapi calls
- Resend production emails
- Lindy production automations

## Pilot Success Signals

- Leads are captured reliably
- Manual Outreach is visible
- Dashboard data is understandable
- Jason can monitor issues daily
- Roofer sees value before full automation is enabled
- No unsafe production actions happen unexpectedly
