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
node backend/scripts/verify-sms-send-intent-planner.js
node backend/scripts/verify-sms-production-send-intent-bridge.js
node backend/scripts/verify-sms-dispatcher-data-shape-readonly.js
node backend/scripts/verify-sms-dispatcher-execution-plan-readonly.js
node backend/scripts/verify-sms-dispatcher-write-plan.js
node backend/scripts/verify-sms-dispatcher-mock-write-executor.js
node backend/scripts/verify-sms-dispatcher-dry-run-executor.js
node backend/scripts/verify-sms-dispatcher-db-write-executor.js
node backend/scripts/verify-sms-dispatcher-manual-test-runner.js
node backend/scripts/verify-sms-dispatcher-production-runner.js
node backend/scripts/verify-sms-twilio-send-adapter.js
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
- Twilio send adapter verifier uses fake verification only and confirms the adapter is disabled by default, sends no live SMS, constructs no live Twilio client, and is not imported by app, routes, cron, scheduler, or production runner paths.
- Twilio send adapter verifier now confirms an approved fake send intent maps into the disabled adapter contract in fake mode while preserving roofer, lead, phone, and body fields with no live SMS and no live Twilio client.
- Send-intent planner verifier uses fake verification only and confirms the planner fail-closes, requires exact approved follow-up matching, and makes no SMS or Twilio calls.
- Production send-intent bridge verifier uses fake verification only and confirms the bridge only calls the send-intent planner, fails closed on non-send or non-eligible application results, and makes no SMS or Twilio calls.
- Manual runner live prep static check confirms the prep script contains no writes, Twilio, SMS send, route, cron, or production dispatcher activation.
- Production runner live prep static check confirms the prep script contains no writes, Twilio, SMS send, route, cron, scheduler, or production dispatcher auto-start.
- Test roofer SMS enable verifier fails closed by default and confirms the only allowed gated update is `roofers.sms_confirmation_enabled=true` for the known test roofer.
- No route, cron, or production dispatcher activation is present.

Current SMS source-of-truth commit:

- `624b932 test(sms): add workflow event completed verifier`

Gated live-write verifier status:

- `backend/scripts/verify-sms-dispatcher-db-write-live-test.js` is not part of routine daily read-only checks.
- Before any future gated test-only `messages`/`follow_ups` DB write, run the read-only candidate verifier:
  `node backend/scripts/prepare-sms-dispatcher-db-write-candidate-readonly.js --static-only`
  `node backend/scripts/prepare-sms-dispatcher-db-write-candidate-readonly.js --roofer-id <reviewed-roofer-id> --lead-id <reviewed-lead-id> --follow-up-id <reviewed-follow-up-id>`
- Static-only verifier command is safe for Terminal 1 review and performs no live Supabase writes:
  `node backend/scripts/verify-sms-dispatcher-db-write-live-test.js --static-only`
- The gated verifier now fails closed unless the target `follow_ups` row is exactly the reviewed roofer/lead/follow-up id, has `status='scheduled'`, has `sent_at IS NULL`, and has not already been marked with the same test-only skipped reason.
- The gated verifier post-write check confirms the test-only `messages` row is outbound SMS, planned, unsent, and tied to the exact provider message id, roofer id, and lead id; it also confirms the exact `follow_ups` row is skipped with the test-only reason and remains unsent.
- First gated test-only `messages`/`follow_ups` DB write was verified on 2026-06-04 with run id `db-live-prep-2026-06-04T19-36-05-696z`.
- Duplicate rerun failed closed with `duplicate_test_message_found`.
- Exact approval was received for gated test-only Supabase `messages`/`follow_ups` DB write on 2026-06-05 with run id `db-write-candidate-2026-06-05T20-50-10-103z`: roofer `be7efc94-bd68-43af-81b2-dc7b869b42df`, lead `6b0b07a6-cab4-4207-9160-197180006812`, message insert `1882cdb3-5aa6-4906-807d-58d43216a103`, follow-up update `997ce1f8-3145-439f-a0c3-d042f803059f`. Message row was verified as `direction=outbound`, `channel=sms`, `provider=test_only_dispatcher_verifier`, `status=planned`, `sent_at=null`. Follow-up row was verified as `status=skipped`, `skipped_reason=test_only_sms_dispatcher_db-write-candidate-2026-06-05T20-50-10-103z`, `sent_at=null`. Duplicate/safety check verified the same candidate now fails safely with `status_not_scheduled` and `already_test_only_skipped`. No SMS was sent, no Twilio calls/imports happened, and no route, cron, scheduler, or dispatcher activation was added.
- Completed gated DB write read-only verifier command:
  `node backend/scripts/verify-sms-dispatcher-db-write-completed-readonly.js --static-only`
  `node backend/scripts/verify-sms-dispatcher-db-write-completed-readonly.js`
- Do not rerun the gated live-write verifier without explicit approval and fresh reviewed candidate IDs.

Workflow_events-only audit verifier status:

- The next safe SMS milestone is workflow_events-only audit verification. It does not send SMS, import or call Twilio, write `messages`, update `follow_ups`, add routes, add cron/scheduler, or activate any dispatcher.
- `backend/scripts/verify-sms-dispatcher-workflow-event-live-test-write.js --static-only` is safe for Terminal 1 static review and performs no Supabase reads or writes.
- A default run of `backend/scripts/verify-sms-dispatcher-workflow-event-live-test-write.js` fails closed unless all workflow_events-only live-write gates are present.
- `backend/scripts/verify-sms-dispatcher-workflow-event-completed-readonly.js --static-only` is safe for Terminal 1 static review and performs no Supabase reads or writes.
- After a separately approved workflow_events-only audit write, verify the completed row read-only with:
  `node backend/scripts/verify-sms-dispatcher-workflow-event-completed-readonly.js --run-id <approved-run-id> --roofer-id <approved-roofer-id>`
- The workflow_events-only audit path must target only `workflow_events`, must include `metadata.test_only=true`, `metadata.messages_written=false`, `metadata.follow_ups_updated=false`, `metadata.sms_sent=false`, and `metadata.twilio_called=false`.
- The prior live SMS approval package is stale because follow_up `997ce1f8-3145-439f-a0c3-d042f803059f` is now `skipped` after the completed gated DB write verification. Do not use that package to approve or run a live SMS send.
- Demo-useful internal SMS readiness status is available as a local read-only script:
  `node backend/scripts/show-sms-internal-readiness-status.js`
  `node backend/scripts/show-sms-internal-readiness-status.js --json`
- The internal SMS readiness status script performs no Supabase reads or writes, imports no Twilio client, sends no SMS, exposes no secrets, and adds no route, cron, scheduler, or dispatcher activation.

- Do not run `backend/scripts/run-sms-dispatcher-manual-test-only.js` against live Supabase without explicit approval, reviewed candidate scope, approved roofer id, and all manual runner plus DB executor gates.
- `backend/scripts/prepare-sms-dispatcher-manual-runner-live-test-readonly.js` is read-only prep only; its printed live runner command is not approved by default.
- The known test roofer SMS flag was enabled on 2026-06-04 for manual runner send-path DB testing: `sms_confirmation_enabled=false` -> `true`.
- Do not rerun `backend/scripts/verify-sms-test-roofer-enable-sms-live-test.js` with live-write gates unless explicitly re-approving this test-only flag state.
- Gated live manual test-only runner DB write was verified on 2026-06-04 with run id `manual-runner-live-prep-2026-06-04T20-19-31-541z`: action `send`, reason `eligible`, message insert `d4dce011-12fc-47d4-ba22-e0163384e2ac`, follow-up update `8747ca7c-acc8-4675-bbdc-c932dfdc96cb`, workflow event insert `84f71217-bf9b-4ebe-ae3f-1a847af476c6`, `applied=true`, `failedClosed=false`.
- The gated manual runner DB test sent no SMS, made no Twilio calls, and did not enable any route, cron, scheduler, or production dispatcher.
- `backend/src/services/sms-dispatcher-production-runner.service.ts` is a disabled production runner scaffold only. It has no SMS/Twilio send path, no route, no cron/scheduler, and no auto-start.
- Do not invoke the production runner with DB write gates unless production runner env gates, DB executor env gates, allowed roofer UUIDs, and batch scope have been explicitly approved.
- `backend/scripts/run-sms-dispatcher-production-runner.js` is an explicit CLI wrapper only. Default mode uses fake Supabase and fails closed unless gated.
- Do not run the production runner CLI against live Supabase unless `SMS_DISPATCHER_PRODUCTION_USE_LIVE_SUPABASE=true`, both live CLI flags, production runner gates, DB executor gates, allowed roofer UUIDs, exact approved follow-up id, and batch scope have all been explicitly approved.
- `backend/scripts/prepare-sms-dispatcher-production-runner-live-test-readonly.js` selected future production runner live test candidate `167bd260-5e06-45dd-b5b0-336915d5f5ac` for lead `2fbcae6f-1a0d-4709-9c17-e1c5158b8d0e` on 2026-06-04 without writes, SMS, Twilio, route, cron, or production runner execution.
- Do not run the printed production runner live command without explicit approval and a fresh review of the selected candidate, allowed roofer allowlist, duplicate scope, and batch size.
- Approved production runner live test attempt `production-runner-live-prep-2026-06-04T20-44-57-941z` failed closed safely after selecting different follow-up `3c83aef7-3838-4173-9ee6-b76453bec1e9` with `duplicate_message_found`; no writes, SMS, or Twilio calls happened.
- Production runner live mode now requires `SMS_DISPATCHER_PRODUCTION_APPROVED_FOLLOW_UP_ID` and `--approved-follow-up-id <uuid>` so DB execution can only target the reviewed follow-up candidate.
- Gated production runner live DB test was verified on 2026-06-04 with run id `production-runner-live-prep-2026-06-04T20-44-57-941z`: approved follow-up `167bd260-5e06-45dd-b5b0-336915d5f5ac`, `applied=true`, `failedClosed=false`, message insert `7f49aee1-cb06-465e-9e57-2baa43c717d9`, follow-up update `167bd260-5e06-45dd-b5b0-336915d5f5ac`, workflow event insert `5975e5da-15e7-419e-9212-ff85876c1d51`.
- The gated production runner live DB test sent no SMS, made no Twilio calls, added no route, added no cron/scheduler, enabled no auto-start, and confirmed the exact approved follow-up guard worked.
- `backend/src/services/sms-twilio-send-adapter.service.ts` is a disabled Twilio send adapter scaffold only. It is not wired into the production runner, app startup, routes, cron, scheduler, or auto-start paths.
- `backend/src/services/sms-send-intent-planner.service.ts` is a read-only future Twilio send-intent planner only. It does not send SMS, call Twilio, or write the database.
- `backend/src/services/sms-production-send-intent-bridge.service.ts` is a fake-only bridge from production runner output to the send-intent planner. It does not send SMS, call Twilio, write the database, or enable automation.
- Production runner fake verification now checks the production send-intent bridge can turn an exact approved eligible fake application into a future Twilio send intent while mismatches, non-send actions, and non-eligible send actions fail closed with no SMS and no Twilio calls.
- Do not run or wire the Twilio send adapter for live SMS unless `SMS_TWILIO_SEND_ADAPTER=true`, `SMS_TWILIO_SEND_TARGET=sms_twilio_send_adapter`, `SMS_TWILIO_CONFIRM_SEND=true`, Twilio credentials, message scope, and explicit live-send approval have all been reviewed.

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
