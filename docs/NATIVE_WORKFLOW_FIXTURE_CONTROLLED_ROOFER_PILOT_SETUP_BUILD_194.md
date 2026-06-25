# Native Workflow Fixture — Controlled Roofer Pilot Setup/Approval Capture (Build 194)

**Type:** LOCAL-ONLY capture of Jason's signed controlled real-roofer pilot **setup/approval
markers** (names/booleans only), plus no-go blocker closure and a preflight gate.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Preflight decision:** **READY_FOR_FINAL_SEND_APPROVAL** (not sent, not active).
**Live pilot send authorized now:** **NO.**

## Why this build exists

Build 193 documented controlled roofer pilot readiness but the gate was **NO-GO** with six
outstanding blockers and a fresh **unsigned** approval template. Jason has now independently cleared
the pilot setup blockers **outside the repo** and signed an approval **to capture the setup markers
only**. Build 194 records those markers and the signature as names/booleans, closes the
setup/preflight blockers, and evaluates a preflight gate to **READY_FOR_FINAL_SEND_APPROVAL** — while
keeping the live pilot **send** blocked behind a separate final approval.

This is a **setup/approval capture** build, not a send build. It performs **no live action**.

## Jason approval statement (recorded as names/booleans only)

Jason Lohse approved Build 194 to **capture the controlled roofer pilot setup/approval markers only**,
confirming he has independently cleared the pilot setup blockers outside the repo: one consenting test
roofer exists, the roofer test identity marker exists, the approved destination marker exists **without
storing any phone number in repo/chat**, the pilot is **SMS-only**, **max one message**, **no retry**,
and **no homeowner contact**. The approval explicitly does **not** authorize sending SMS, contacting
the roofer, contacting any homeowner, using production data, making external calls, activating live
automation, adding public routes/webhooks/cron/schedulers, or storing secrets/phone numbers.

## What Build 194 does (and does not do)

Build 194 **does**:

- Capture the **signed setup/approval evidence**: `approval_signed=true`,
  `approval_granted_for_setup_capture=true`, `authorizes_live_pilot_send_now=false`, all three setup
  markers present, `approved_destination_number_recorded=false`, `sms_only=true`,
  `max_message_count=1`, `retry_allowed=false`, `homeowner_contact_allowed=false`.
- Record **no-go blocker closure** for **setup/preflight only**, keeping the live pilot **send**
  blocked until a separate final preflight/send approval.
- Evaluate a **preflight gate** to **READY_FOR_FINAL_SEND_APPROVAL** — `sent=false`, `active=false`,
  `live_send_armed=false`, `authorizes_live_pilot_send_now=false`.
- Update the launch-readiness summary (setup markers captured; preflight ready; next step = final
  one-message pilot send approval/preflight), keeping launch **pilot-gated**.
- Verify all of the above **read-only**.

Build 194 **does not**:

- Send an SMS, construct a Twilio client, call `messages.create`, or run any retry.
- Make any Twilio / network / external call.
- Contact any real roofer or homeowner.
- Read, store, or record any secret value, SID, token, recipient phone number, or production data
  (the approved destination number is **not** recorded — only a marker boolean is set).
- Authorize a live pilot send.
- Activate live automation, or add any public route, cron, scheduler, webhook, dispatcher, billing,
  quote, invoice, deposit, email, call, calendar, or CRM automation.
- Touch schema / auth / RLS / security.

All broader live automation remains **disabled**.

## Captured setup/approval markers (fixture)

| Marker | Value |
| --- | --- |
| approval_signed | true |
| approval_granted_for_setup_capture | true |
| authorizes_live_pilot_send_now | **false** |
| consenting_test_roofer_marker_present | true |
| roofer_test_identity_marker_present | true |
| approved_destination_marker_present | true |
| approved_destination_number_recorded | **false** |
| sms_only | true |
| max_message_count | 1 |
| retry_allowed | **false** |
| homeowner_contact_allowed | **false** |

## No-go blocker closure (setup/preflight only)

All six Build 193 blockers are cleared **for setup/preflight only** (outstanding count = 0). The live
pilot **send** remains **blocked**: it requires a separate final one-message send approval, a fresh
send-time preflight via the existing fail-closed runner, live credentials, the approved destination,
and a confirm token — **none of which exist in this repo**.

## Preflight gate

`preflight_gate_decision = READY_FOR_FINAL_SEND_APPROVAL`, `sent=false`, `active=false`,
`authorizes_live_pilot_send_now=false`, `no_network_or_external_action=true`.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS | one message succeeded (1 attempt, no retry) |
| Controlled roofer pilot setup | markers captured; signed for setup only; send NOT authorized |
| Controlled roofer pilot preflight | READY_FOR_FINAL_SEND_APPROVAL (not sent, not active) |
| Broader live automation | all remains disabled |

**Next step:** final one-message pilot **send** approval and a send-time preflight before any send —
**not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Signed setup/approval evidence | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-setup-approval-build-194-signed.json` |
| No-go blocker closure | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-no-go-blocker-closure-build-194.json` |
| Preflight gate | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-preflight-gate-build-194.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-194.json` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-setup-build-194-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-controlled-roofer-pilot-setup-build-194-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_SETUP_BUILD_194.md` |

## How to run (local-only, read-only)

```bash
# Full local-only setup capture verification + dry-run wrapper
bash scripts/run-native-workflow-fixture-controlled-roofer-pilot-setup-build-194-dry-run.sh

# Verifier on its own
node backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-setup-build-194-readonly.js
```

## What still gates a controlled roofer pilot send

Build 194 captures setup markers and reaches preflight **READY_FOR_FINAL_SEND_APPROVAL**; it grants no
send. A controlled pilot send still requires a **separate, fresh signed** final one-message send
approval, the existing fail-closed runner re-gating at send time, and live credentials plus an
approved recipient — **none of which exist in this repo**. Launch remains **pilot-gated, not
unrestricted**, and the safety posture stays `demo_ready_with_live_automation_disabled`.
