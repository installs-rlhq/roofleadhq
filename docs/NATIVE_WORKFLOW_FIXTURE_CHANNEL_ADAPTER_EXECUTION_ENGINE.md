# Native Workflow Fixture — Channel-Adapter Execution Engine (Build 182)

Local-only, mock-backed scenario-execution engine. Replaces the old stub-loop path with an
executable channel-adapter architecture that runs all 30 manifest scenarios deterministically
and is ready to support sandbox/test-mode transport later — only after separate approval and
correct credential provisioning.

| field | value |
| --- | --- |
| build_number | 182 |
| source_of_truth_commit | 1ee4ec2 |
| prior_build_181_local_executor_commit | 1ee4ec2 |
| packet_status | local_mock_backed_execution_engine |
| data_classification | local_fake_data_only |
| transport_mode | mock_now |
| sandbox_later | true |
| sandbox_transport_status | fail_closed_not_provisioned_not_approved_in_build_182 |
| total_scenarios | 30 |
| executed_through_adapter_count | 30 |
| passed_count | 30 |
| safety_status | demo_ready_with_live_automation_disabled |

## Architecture

- `backend/scripts/native-workflow-channel-adapter-engine.js` — pure engine module. Defines
  the channel registry, group→channel mapping, deterministic **mock adapters** (default
  transport), and the **fail-closed sandbox transport**. No `process.env`, no network clients,
  no secret handling, no external calls.
- `backend/scripts/run-native-workflow-fixture-channel-adapter-execution-engine.js` — runner.
  Reads the manifest + Build 181 local fake inputs/expected outputs, routes each scenario to
  its channel adapter, scores via mock transport, and writes mock evidence.
- `backend/fixtures/native-workflow-demo-roofer/channel-adapter-execution-engine-mock-result.json`
  — generated mock evidence (Build 181 schema + `transport_mode` / `sandbox_later`).
- `backend/scripts/verify-native-workflow-fixture-channel-adapter-execution-engine-readonly.js`
  — read-only verifier.
- `scripts/run-native-workflow-fixture-channel-adapter-execution-engine-dry-run.sh` — dry-run
  wrapper (syntax checks, fail-closed sandbox demonstration, mock run, verifier).

## Channels

Nine adapters are registered: `sms`, `voice`, `email`, `lead`, `review`, `calendar`,
`report`, `audit`, `stop`. Eight are exercised by the 30-scenario manifest; `email` is
registered for future use (no manifest scenarios route to it yet).

| manifest group | channel | integration label (evidence only) | scenarios |
| --- | --- | --- | --- |
| SMS sandbox validation | sms | twilio_test_mode | 5 |
| Vapi test assistant validation | voice | vapi_test_assistant | 3 |
| Lead intake validation | lead | local_lead_intake | 5 |
| Manual review/escalation validation | review | local_manual_review | 4 |
| Calendar/appointment sandbox validation | calendar | google_calendar_test_mode | 4 |
| Reporting/admin visibility validation | report | local_reporting | 3 |
| Audit log evidence validation | audit | local_audit_log | 3 |
| STOP/rollback validation | stop | local_stop_optout | 3 |

Integration labels are strings used in evidence only — they are NOT client imports.

## Mock transport (default)

Deterministic. Each mock adapter "executes" a scenario by echoing the local fake input's
simulated observed result, with `external_call_made: false`. Scoring compares observed vs the
expected-output fixture and the safety boundary fields. Result: 30/30 passed, 0 external calls.

## Fail-closed sandbox transport

`node run-...-channel-adapter-execution-engine.js --transport=sandbox` does NOT make any call.
It prints the **missing sandbox config NAMES only** (never values) and exits nonzero. Build 182
never provisions or reads sandbox credentials. Required config names (identifiers only):

- sms: `TWILIO_TEST_ACCOUNT_SID`, `TWILIO_TEST_AUTH_TOKEN`, `TWILIO_TEST_FROM_NUMBER`
- voice: `VAPI_TEST_API_KEY`, `VAPI_TEST_ASSISTANT_ID`
- email: `RESEND_TEST_API_KEY`, `RESEND_TEST_FROM_EMAIL`
- calendar: `GOOGLE_CALENDAR_TEST_CLIENT_ID`, `GOOGLE_CALENDAR_TEST_CLIENT_SECRET`
- lead / review / report / audit / stop: `SANDBOX_SUPABASE_TEST_URL`, `SANDBOX_SUPABASE_TEST_ANON_KEY`

These names are for future provisioning by Jason into his own secret store / environment — never
pasted into Claude, never read or logged by this engine.

## Safety

- No external calls, no sandbox/live calls, no real SMS/email/calls/calendar bookings.
- No `process.env` access, no credentials, no secrets read/printed/logged.
- No production Supabase or production data.
- The actual external/sandbox runner stub is NOT invoked.
- No schema/auth/RLS/security changes; no public/live routes, webhooks, cron, schedulers,
  dispatchers; no billing/payment/quote/estimate/invoice automation.
- `demo_ready_with_live_automation_disabled` preserved.

## Verify

```
bash scripts/run-native-workflow-fixture-channel-adapter-execution-engine-dry-run.sh
```
