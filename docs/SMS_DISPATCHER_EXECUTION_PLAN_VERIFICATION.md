# SMS Dispatcher Execution Plan Verification

Date: 2026-06-02

## Purpose

Record verification of the SMS dispatcher execution plan read-only verifier and dry-run executor scaffold.

This is planning and verification only.

No writes were performed.
No SMS was sent.
No Twilio calls were made.
No cron or live dispatcher execution was enabled.

## Verified Files

- `backend/scripts/verify-sms-dispatcher-execution-plan-readonly.js`
- `backend/scripts/verify-sms-dispatcher-write-plan.js`
- `backend/scripts/verify-sms-dispatcher-mock-write-executor.js`
- `backend/scripts/verify-sms-dispatcher-dry-run-executor.js`
- `backend/scripts/verify-sms-dispatcher-db-write-executor.js`
- `backend/scripts/verify-sms-dispatcher-manual-test-runner.js`
- `backend/scripts/run-sms-dispatcher-dry-run.js`
- `backend/scripts/run-sms-dispatcher-manual-test-only.js`
- `backend/src/services/sms-dispatcher-write-plan.service.ts`
- `backend/src/services/sms-dispatcher-mock-write-executor.service.ts`
- `backend/src/services/sms-dispatcher-dry-run-executor.service.ts`
- `backend/src/services/sms-dispatcher-db-write-executor.service.ts`
- `backend/src/services/sms-dispatcher-manual-test-runner.service.ts`
- `backend/src/services/sms-duplicate-send-detector.service.ts`
- `backend/src/services/sms-dispatcher-planner.service.ts`
- `backend/src/services/sms-safety.service.ts`

## Verified Result

The read-only verifier inspected due scheduled follow-ups, built dispatcher planner inputs, called `planSmsDispatch()`, and printed planned actions.

The dry-run executor scaffold returns plan results only. It uses the SMS safety service, dispatcher planner, and duplicate-send detector, but it does not write follow-ups, insert messages, insert workflow events, send SMS, or call Twilio.

The write-plan scaffold returns proposed `messages`, `follow_ups`, and `workflow_events` payloads only. Every write plan includes `requiresLiveWriteGate: true`.

The mock write executor validates proposed write sequencing in memory only. It accepts write-plan objects and does not accept Supabase clients.

The DB write executor can apply approved write plans to Supabase only when both the write plan live gate and executor live DB gate are present. It remains disabled/fail-closed by default.

The manual test-only runner wires dry-run planning to write-plan execution through the gated DB executor. It defaults to fake Supabase and requires explicit manual runner gates, DB executor gates, an approved roofer id, and a capped batch size.

Final result:

- Due scheduled follow-ups planned: 10
- send: 0
- skip: 10
- reschedule: 0

All inspected rows were skipped because roofer SMS is disabled.

## Safety Confirmation

- No writes were performed.
- No SMS was sent.
- No Twilio calls were made.
- No follow-ups were updated.
- No messages were inserted.
- No workflow events were inserted.
- Write plans are proposed payloads only.
- Mock write execution is in-memory/test-only.
- DB write execution remains disabled unless explicit live DB gates are present.
- Manual test-only runner remains disabled unless explicit manual and DB executor gates are present.
- The dry-run executor defaults to read-only dry-run mode.
- `dryRun=false` is blocked by verifier coverage.
- No cron or scheduler was enabled.

## Final Decision

PASS for planning/test-only dispatcher execution verification.

Production SMS activation still requires explicit approval and separate write-path, duplicate-send, Twilio-send, and cron verification.

## Gated workflow_events live test write verified

Date: 2026-06-04

Latest verified commit before live-write verification:

- `abe76bb fix(sms): include roofer id in live test verification`

Verified result:

- One gated, test-only Supabase insert was performed into `workflow_events`.
- Inserted row id: `bb869013-e606-4cb4-a743-082498e0465a`
- Test roofer id: `be7efc94-bd68-43af-81b2-dc7b869b42df`
- Event type: `sms_live_test_audit_insert`
- Event source: `sms_dispatcher_test_audit_writer`
- Event status: `test_only`
- Duplicate protection was verified by rerunning the same run id.
- Duplicate rerun failed closed with `duplicate_test_audit_row_found`.

Safety confirmation:

- No SMS was sent.
- No Twilio call was made.
- No `messages` row was written.
- No `follow_ups` row was updated.
- No route, cron, or production dispatcher was enabled.

## Gated messages/follow_ups DB write verifier added

Date: 2026-06-04

Latest verified commit before this batch:

- `f57e8a7 docs(sms): record workflow event live test write`

Added:

- `backend/scripts/verify-sms-dispatcher-db-write-live-test.js`

Default verifier behavior:

- Fails closed unless all explicit test-only live-write gates are present.
- Uses fake Supabase by default.
- Performs no live database writes in the default verification path.
- Verifies a guarded `messages` insert shape.
- Verifies a guarded `follow_ups` update shape.
- Verifies duplicate protection before writes.
- Verifies post-write row counts and field values after fake writes.
- Statically checks there is no Twilio import/call, no SMS send call, no route, no cron/scheduler, and no production dispatcher activation.

Live gated path, not run in this batch, requires all of:

- `SMS_DISPATCHER_DB_LIVE_TEST_WRITE=true`
- `SMS_LIVE_WRITE_TARGET=messages_follow_ups`
- `SMS_LIVE_TEST_RUN_ID`
- `SMS_LIVE_TEST_ROOFER_ID`
- `SMS_LIVE_TEST_LEAD_ID`
- `SMS_LIVE_TEST_FOLLOW_UP_ID`
- `--allow-live-supabase-write`
- `--messages-follow-ups-only`
- `--test-only`
- matching `--run-id`, `--roofer-id`, `--lead-id`, and `--follow-up-id`

Safety confirmation:

- No live writes were run in this batch.
- No SMS was sent.
- No Twilio call was made.
- No route, cron, scheduler, or production dispatcher was enabled.

## Gated messages/follow_ups live test Terminal 1 prep added

Date: 2026-06-04

Latest verified commit before this batch:

- `871efb5 test(sms): add gated db write verifier`

Added:

- `backend/scripts/prepare-sms-dispatcher-db-live-test-readonly.js`

Purpose:

Prepare the first real gated Supabase `messages`/`follow_ups` live test by selecting exactly one deterministic safe candidate for the existing gated verifier.

This prep script is read-only only. It does not run the live verifier.

Candidate requirements:

- Roofer id must be the current verified test roofer: `be7efc94-bd68-43af-81b2-dc7b869b42df`.
- Exactly one matching `roofers` row must exist.
- `follow_ups.roofer_id` must match the test roofer.
- `follow_ups.status` must be `scheduled`.
- `follow_ups.lead_id` must be present.
- `follow_ups.sent_at`, `skipped_reason`, and `stopped_reason` must be null.
- `follow_ups.followup_type` must map to an approved SMS dispatcher template type.
- Related `leads.id` and `leads.roofer_id` must match the follow-up and test roofer.
- Lead phone must be E.164-shaped.
- Lead status must not be `opted_out`, `booked`, `cancelled`, or `lost`.
- Safe candidates are ordered by `scheduled_for` ascending.
- Safe candidates are then ordered by `created_at` ascending when available.
- Safe candidates are finally ordered by `id` ascending as a deterministic tie-breaker.
- Suggested verifier run id must not already have a duplicate test-only `messages.provider_message_id`.
- The script fails closed unless it can select exactly one deterministic candidate follow-up.

Terminal 1 prep commands:

```bash
cd /root/roofleadhq

node backend/scripts/prepare-sms-dispatcher-db-live-test-readonly.js --static-only

node backend/scripts/prepare-sms-dispatcher-db-live-test-readonly.js \
  --roofer-id be7efc94-bd68-43af-81b2-dc7b869b42df
```

The second command prints the values to export for the existing gated verifier:

```bash
export SMS_LIVE_TEST_ROOFER_ID=...
export SMS_LIVE_TEST_LEAD_ID=...
export SMS_LIVE_TEST_FOLLOW_UP_ID=...
export SMS_LIVE_TEST_RUN_ID=...
```

Do not run the existing gated live verifier until the printed candidate values have been reviewed and an explicit live-write approval is given.

Safety confirmation:

- No inserts are performed.
- No updates are performed.
- No deletes are performed.
- No SMS is sent.
- No Twilio import or call is made.
- No route, cron, scheduler, or production dispatcher is enabled.

## First gated messages/follow_ups DB live test verified

Date: 2026-06-04

Latest verified commit before this live test:

- `b57e363 test(sms): add read-only db live test prep`

Script:

- `backend/scripts/verify-sms-dispatcher-db-write-live-test.js`

Verified gated run:

- Run ID: `db-live-prep-2026-06-04T19-36-05-696z`
- Roofer ID: `be7efc94-bd68-43af-81b2-dc7b869b42df`
- Lead ID: `2158d4d9-c533-4074-8019-471c686f4418`
- Follow-up ID: `f2e18e52-3dea-45a3-aa6b-1f578a5af85d`
- Message ID inserted: `0b2e106c-2876-4469-8a51-6188f232d537`
- Follow-up updated: `f2e18e52-3dea-45a3-aa6b-1f578a5af85d`

Verified result:

- One gated, test-only Supabase row was inserted into `messages`.
- One gated, test-only Supabase row was updated in `follow_ups`.
- Duplicate protection was verified by rerunning the same run id.
- Duplicate rerun failed closed with `duplicate_test_message_found`.

Safety confirmation:

- No SMS was sent.
- No Twilio calls were made.
- No route, cron, scheduler, or production dispatcher was enabled.
- This verified only the explicit gated test write path.
- Production SMS dispatcher activation still requires separate approval.

## Disabled/gated dispatcher DB write executor added

Date: 2026-06-04

Latest verified commit before this batch:

- `8d61ab3 docs(sms): record gated db live test`

Added:

- `backend/src/services/sms-dispatcher-db-write-executor.service.ts`
- `backend/scripts/verify-sms-dispatcher-db-write-executor.js`

Purpose:

Add the real Follow-Up Dispatcher DB executor that can apply an approved write plan to Supabase while remaining disabled unless explicit live DB gates are present.

Supported gated write operations:

- `messages` insert
- `follow_ups` update
- `workflow_events` insert

Gate requirements:

- The write plan must include `requiresLiveWriteGate: true`.
- The executor input gate must include `allowLiveDbWrite: true`.
- The executor input gate must include `liveWriteTarget: sms_dispatcher_db_executor`.
- The executor input gate must include `confirmWritePlan: true`.

Verifier result:

- Default mode fails closed and writes nothing.
- Missing write-plan gate fails closed and writes nothing.
- Duplicate message detection blocks `messages` insert and writes nothing.
- Valid fake Supabase path applies one `messages` insert, one `follow_ups` update, and one `workflow_events` insert.
- Post-write verification checks inserted/updated rows in the fake Supabase store.
- Static checks verify no Twilio import/client usage, no SMS provider send call, no route registration, no cron/scheduler activation, and no production dispatcher activation.

Safety confirmation:

- No live database writes were run in this batch.
- No SMS was sent.
- No Twilio calls were made.
- No route, cron, scheduler, or production dispatcher was enabled.
- The verifier uses fake Supabase only.
- Production SMS dispatcher activation still requires separate approval.

## Manual test-only dispatcher runner added

Date: 2026-06-04

Latest verified commit before this batch:

- `a42ec4c feat(sms): add gated db write executor`

Added:

- `backend/src/services/sms-dispatcher-manual-test-runner.service.ts`
- `backend/scripts/run-sms-dispatcher-manual-test-only.js`
- `backend/scripts/verify-sms-dispatcher-manual-test-runner.js`

Purpose:

Wire planner -> write plan -> gated DB executor behind a disabled manual test-only runner.

Runner behavior:

- Uses `executeSmsDispatcherDryRun()` to find due `follow_ups` and build write plans.
- Applies selected write plans through `executeSmsDispatcherDbWritePlan()`.
- Uses fake Supabase by default in the CLI runner.
- Requires an explicit manual runner gate.
- Requires the explicit DB executor gate.
- Requires an approved roofer id.
- Defaults to batch size `1`.
- Caps batch size at `3`.
- Remains test-only.

Manual runner gate requirements:

- `testOnly: true`
- `allowManualTestRunner: true`
- `runnerTarget: sms_dispatcher_manual_test_runner`
- `approvedRooferId`

DB executor gate requirements:

- `allowLiveDbWrite: true`
- `liveWriteTarget: sms_dispatcher_db_executor`
- `confirmWritePlan: true`

Verifier result:

- Default mode fails closed and writes nothing.
- Fake mode applies through the gated DB executor.
- Live-style mode without every gate fails closed and writes nothing.
- Batch size is capped.
- Static checks verify no Twilio import/client usage, no SMS provider send call, no route registration, no cron/scheduler activation, and no production dispatcher activation.

Safety confirmation:

- No live database writes were run in this batch.
- No SMS was sent.
- No Twilio calls were made.
- No route, cron, scheduler, or production dispatcher was enabled.
- The verifier uses fake Supabase only.
- The CLI runner uses fake Supabase unless explicit live Supabase flags and environment gates are provided.
- Production SMS dispatcher activation still requires separate approval.

## Manual runner live test read-only prep added

Date: 2026-06-04

Latest verified commit before this batch:

- `ae1dbb6 feat(sms): add manual test-only dispatcher runner`

Added:

- `backend/scripts/prepare-sms-dispatcher-manual-runner-live-test-readonly.js`

Purpose:

Prepare a future manual test-only dispatcher runner live DB test by selecting exactly one deterministic safe real Supabase candidate without writing anything.

Candidate requirements:

- Roofer id must be the current verified test roofer: `be7efc94-bd68-43af-81b2-dc7b869b42df`.
- `follow_ups.status` must be `scheduled`.
- `follow_ups.scheduled_for` must be due.
- `follow_ups.sent_at`, `skipped_reason`, and `stopped_reason` must be null.
- Related lead must match the follow-up and test roofer.
- Lead phone must be E.164-shaped.
- Lead status must not be `opted_out`, `booked`, `cancelled`, or `lost`.
- Related roofer must match the known test roofer.
- Follow-up type must map to an approved dispatcher template type.
- Message body must be present so duplicate scope can be checked.
- Safe candidates are ordered by `scheduled_for` ascending.
- Safe candidates are then ordered by `created_at` ascending when available.
- Safe candidates are finally ordered by `id` ascending as a deterministic tie-breaker.
- The script fails closed unless it can select exactly one deterministic candidate.

Duplicate checks:

- No existing outbound SMS `messages` row may match the same roofer, lead, and message body.
- No existing `messages.provider_message_id` may match the suggested provider test id.

Read-only prep result:

- Selected follow-up id: `8747ca7c-acc8-4675-bbdc-c932dfdc96cb`
- Selected lead id: `45532f48-0ac9-4dde-bb8e-b8cb2b2761f5`
- Suggested run id: `manual-runner-live-prep-2026-06-04T20-06-55-846z`
- Duplicate body count: `0`
- Duplicate provider test id count: `0`

Future command printed by prep script:

```bash
export SMS_MANUAL_TEST_USE_LIVE_SUPABASE=true
export SMS_MANUAL_TEST_ONLY=true
export SMS_MANUAL_TEST_RUNNER=true
export SMS_MANUAL_TEST_TARGET=sms_dispatcher_manual_test_runner
export SMS_MANUAL_TEST_ROOFER_ID=be7efc94-bd68-43af-81b2-dc7b869b42df
export SMS_MANUAL_TEST_RUN_ID=manual-runner-live-prep-2026-06-04T20-06-55-846z
export SMS_MANUAL_TEST_MAX_BATCH_SIZE=1
export SMS_DISPATCHER_DB_EXECUTOR_WRITE=true
export SMS_DB_EXECUTOR_TARGET=sms_dispatcher_db_executor
export SMS_DB_EXECUTOR_CONFIRM_WRITE_PLAN=true

node backend/scripts/run-sms-dispatcher-manual-test-only.js \
  --test-only \
  --allow-live-supabase-manual-test \
  --approved-roofer-id be7efc94-bd68-43af-81b2-dc7b869b42df \
  --max-batch-size 1
```

Do not run the future command until explicit live-write approval is given.

Safety confirmation:

- No inserts were performed.
- No updates were performed.
- No upserts were performed.
- No deletes were performed.
- No live DB writes were run.
- No SMS was sent.
- No Twilio import or call was made.
- No route, cron, scheduler, or production dispatcher was enabled.

## Test roofer SMS enable live-write verifier added

Date: 2026-06-04

Latest verified commit before this batch:

- `5e3d7ed test(sms): add manual runner live prep`

Added:

- `backend/scripts/verify-sms-test-roofer-enable-sms-live-test.js`

Purpose:

Prepare the known test roofer for a future manual runner send-path DB write test by adding a gated verifier that can set only `roofers.sms_confirmation_enabled=true` for the known test roofer.

Known test roofer:

- `be7efc94-bd68-43af-81b2-dc7b869b42df`

Live write gates required:

- `SMS_TEST_ROOFER_ENABLE_SMS_WRITE=true`
- `SMS_TEST_ROOFER_TARGET=known_test_roofer_sms_enable`
- `SMS_TEST_ROOFER_ID=be7efc94-bd68-43af-81b2-dc7b869b42df`
- `--allow-live-supabase-write`
- `--known-test-roofer-only`
- `--enable-sms-confirmation`

Only allowed live update:

- Table: `roofers`
- Row id: `be7efc94-bd68-43af-81b2-dc7b869b42df`
- Payload: `{ sms_confirmation_enabled: true }`

Verifier result:

- Default mode fails closed and writes nothing.
- Wrong target fails closed.
- Wrong roofer id fails closed.
- Missing CLI gate fails closed.
- Missing test roofer row fails closed before update.
- Valid fake Supabase path updates exactly one `roofers` row.
- Fake path verifies old/new `sms_confirmation_enabled` values.
- Static checks verify no inserts, no upserts, no deletes, exactly one update call site, only the `roofers` table target constant, no Twilio, no SMS send, no route, no cron/scheduler, and no production dispatcher activation.

Safety confirmation:

- No live write was run in this batch.
- No SMS was sent.
- No Twilio calls were made.
- No route, cron, scheduler, or production dispatcher was enabled.
- This verifier enables only the known test roofer when every explicit gate is present.
- Production SMS activation still requires separate approval.
