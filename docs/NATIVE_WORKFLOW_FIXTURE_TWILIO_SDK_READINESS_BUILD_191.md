# Native Workflow Fixture — Twilio SDK Readiness (Build 191)

**Type:** LOCAL-ONLY dependency / readiness correction.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Result:** Twilio SDK dependency present and importable by the live SMS runner. **No live action. No
network call. No SMS. `send_attempt_count=0`.**

## Why this build exists

The Build 190 corrected pre-flight gate was **PERMITTED**, but no SMS attempt occurred: the build
environment was *not armable*. One of the recorded not-armable reasons was
`twilio_sdk_not_installed_in_build_environment`. Jason then ran a read-only SDK check and got
**"Twilio SDK missing — STOP, do not run send"**. No send attempt was made.

Build 191 corrects exactly that one condition, **locally only**: it confirms the Twilio SDK is a
declared/locked/installed dependency that the existing fail-closed one-message live SMS runner can
**resolve and import** — without constructing a client, opening a socket, reading any secret value,
or sending anything.

## What Build 191 does (and does not do)

Build 191 **does**:

- Confirm the `twilio` dependency is declared in the correct manifest **`backend/package.json`**
  (`"twilio": "^6.0.2"`) and present in **`backend/package-lock.json`** (`node_modules/twilio`,
  locked `6.0.2`).
- Install/resolve it so `require('twilio')` succeeds from the runner's own directory
  (`backend/scripts/`), exactly as the runner resolves it at send time.
- Load the module (export is a constructible function) — **no client, no network**.
- Capture a names/booleans/version-only readiness artifact.

Build 191 **does not**:

- Send an SMS, construct a Twilio client, or call `messages.create`.
- Make any Twilio / network / external call.
- Read or record any secret value, SID, token, recipient number, or production data.
- Set the live confirm token or run the live execution runner.
- Touch schema / auth / RLS / security, or add any public route, cron, scheduler, webhook,
  dispatcher, billing, quote, invoice, deposit, email, call, or calendar automation.

Live automation remains **disabled**.

## Build 190 approval is NOT consumed

The single approved Build 190 one-message attempt is **still pending and unconsumed**. Build 191
performs **no send attempt** (`send_attempt_count=0`), and Build 190 evidence still records
`send_attempt_count=0` / `sms_was_sent=false`. An approval is only consumed by an actual send
attempt; **because no attempt occurred, Build 191 does not consume it.** The one approved attempt
remains pending Jason's human-operated execution in his controlled environment.

## Artifacts

| Artifact | Path |
| --- | --- |
| Readiness fixture | `backend/fixtures/native-workflow-demo-roofer/twilio-sdk-readiness-build-191.json` |
| SDK readiness check (live local proof) | `backend/scripts/check-twilio-sdk-readiness-build-191.js` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-twilio-sdk-readiness-build-191-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-twilio-sdk-readiness-build-191-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_TWILIO_SDK_READINESS_BUILD_191.md` |

## Readiness booleans (artifact)

- `twilio_sdk_dependency_present=true`
- `no_live_action=true`
- `no_network_call=true`
- `no_sms_sent=true`
- `send_attempt_count=0`

## How to run (local-only, read-only)

```bash
# Confirm the SDK is importable by the runner (no client, no network, no SMS)
node backend/scripts/check-twilio-sdk-readiness-build-191.js

# Full local-only verification + dry-run wrapper
bash scripts/run-native-workflow-fixture-twilio-sdk-readiness-build-191-dry-run.sh
```

If `require('twilio')` is ever reported as missing in a fresh checkout, install dependencies with
`npm install --prefix backend` (the dependency is already declared and locked — no manifest change
needed). This is the step that resolves Jason's "Twilio SDK missing" check.

## What still gates the actual live send (unchanged)

Firing the single approved attempt remains a **human-operated** step in Jason's controlled
environment, gated by the existing fail-closed runner
`backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js`, which
re-gates at send time and requires live credentials, the approved recipient number, and the
deliberate confirm token — none of which exist in this repo. Build 191 changes none of that.
