# Native Workflow Fixture — Sandbox-Execution Readiness Gate + Supervised Controlled-Test Runbook (Build 183)

Local-only, readiness-only. This is the final gate before any sandbox/test-mode execution or
controlled live roofer test. It makes the required Jason inputs explicit and machine-checkable
**without reading or exposing any secret value**. Nothing here executes a sandbox or live call.

| field | value |
| --- | --- |
| build_number | 183 |
| source_of_truth_commit | d8ba62d |
| prior_build_181_local_executor_commit | 1ee4ec2 |
| prior_build_182_engine_commit | d8ba62d |
| packet_status | local_readiness_gate_and_runbook |
| data_classification | local_readiness_marker_names_only |
| gate_decision (current) | SANDBOX_EXECUTION_BLOCKED |
| sandbox_execution_ready (current) | false |
| controlled_live_ready (current) | false |
| safety_status | demo_ready_with_live_automation_disabled |

## Files

- `backend/scripts/run-native-workflow-fixture-sandbox-execution-readiness-gate.js` — fail-closed
  readiness gate. Reads the provisioning marker (config NAMES + presence booleans only) and prior
  evidence, then reports whether sandbox execution is permitted. No env access, no secret values,
  no external/sandbox calls.
- `backend/fixtures/native-workflow-demo-roofer/sandbox-execution-provisioning-marker.json` —
  machine-checkable marker. NAMES ONLY; no values, ever.
- `backend/fixtures/native-workflow-demo-roofer/sandbox-execution-readiness-gate-result.json` —
  generated gate result.
- `backend/scripts/verify-native-workflow-fixture-sandbox-execution-readiness-gate-readonly.js` —
  read-only verifier.
- `scripts/run-native-workflow-fixture-sandbox-execution-readiness-gate-dry-run.sh` — dry-run wrapper.

## How the gate decides (fail-closed)

`sandbox_execution_ready` is **true only when all** of the following hold:

1. Build 181 local evidence present (30/30, `local_fake_data_only`).
2. Build 182 mock-backed channel-adapter evidence present (30/30 through adapters).
3. `explicit_sandbox_execution_approval_signed` is true (Jason-signed, scoped).
4. The approved channel's required sandbox config NAMES are all marked `provisioned: true`.
5. Every supervised-test readiness item is true.

`controlled_live_ready` additionally requires `explicit_controlled_live_approval_signed`. In
Build 183 everything is unprovisioned/unsigned, so the gate is **BLOCKED** and exits nonzero.

The gate inspects only config **names** and boolean **presence** markers. It never reads,
prints, or logs any secret value. Provisioned credentials live exclusively in Jason's own
secret store / environment.

## Supervised controlled-test runbook (one roofer, one channel, SMS first)

1. **Scope to one channel** — recommended **SMS** for the first test (lowest blast radius, easiest STOP).
2. **One named pilot roofer** who has given written consent.
3. **One test contact** — recommended the roofer's own phone number — with consent on file; no
   uninvolved homeowner is contacted.
4. **Provision sandbox/test credentials** in Jason's own secret store/env (Twilio test creds, and
   the test/sandbox Supabase project only). Flip the matching `provisioned` booleans in a local
   copy of the marker. Never paste values into Claude.
5. **Sign the scoped sandbox-execution approval** (one channel, sandbox/test-mode, reversible).
6. **Set a channel cap/limit** for the first test (e.g. a small max message count).
7. **Confirm staging/sandbox Supabase only** — no production data, no production project.
8. **Name a STOP/rollback owner** and document the STOP procedure before running.
9. **Book a 30–60 minute supervised window** with the roofer present to observe.
10. Re-run the gate. Only when it returns `SANDBOX_EXECUTION_PERMITTED` does a future build run the
    approved channel in sandbox/test-mode — still under separate approval, still reversible.
11. Controlled **live** roofer test is a further step gated by `explicit_controlled_live_approval_signed`.

## Jason-facing checklist (today)

- [ ] One pilot roofer named.
- [ ] Written roofer consent on file.
- [ ] One approved channel chosen (recommended: **SMS**).
- [ ] Test homeowner/contact identity named and consent on file (recommended: roofer's own number).
- [ ] 30–60 minute supervised test window scheduled.
- [ ] STOP/rollback owner named and procedure documented.
- [ ] Channel cap/limit set for the first test.
- [ ] Staging/sandbox Supabase only confirmed; no production data.
- [ ] Sandbox/test credentials provisioned in Jason-controlled secret store/env — **never pasted into Claude**.
- [ ] Scoped sandbox-execution approval signed.

## Hard stops (unchanged)

No sandbox/test execution in Build 183; no live automation; no real SMS/email/calls/calendar
bookings; no real homeowner/roofer contact; no production Supabase or production data; no
reading/printing/logging of secrets, env values, API keys, credentials, or webhook tokens; no
schema/auth/RLS/security changes; no public/live routes, webhooks, cron, schedulers, dispatchers;
no billing/payment/deposit/quote/estimate/invoice automation; never ask Jason to paste secrets.

## Verify

```
bash scripts/run-native-workflow-fixture-sandbox-execution-readiness-gate-dry-run.sh
```
