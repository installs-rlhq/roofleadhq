# Native Workflow Fixture — Controlled Roofer Pilot Post-Pilot Observation + Expansion Decision Prep (Build 197)

**Type:** LOCAL-ONLY post-pilot observation capture for the already-completed Jason-operated controlled
roofer pilot one-message SMS, plus a controlled pilot **expansion decision** packet. Performs **no live
action**, **does not approve expansion**, and **activates nothing**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Expansion decision:** **EXPANSION_NOT_APPROVED_REVIEW_REQUIRED.**
**Live action during this build:** **NONE.**

## Why this build exists

Build 196 closed out the successful Jason-operated controlled roofer pilot one-message SMS (sent=true,
1 attempt, no retry). Build 197 captures the **post-pilot observation** status as names/booleans only
and prepares an **unsigned controlled pilot expansion decision packet** so Jason can later decide
whether (and how) to expand — without this build approving or activating anything.

## Post-pilot observation (names/booleans only)

| Marker | Value |
| --- | --- |
| pilot_send_captured | true |
| pilot_sms_sent | **true** |
| send_attempt_count | 1 |
| retry_performed | **false** |
| delivery_observation_status | `send_accepted_queued_in_repo_evidence_no_final_delivery_confirmation_recorded_by_build` |
| roofer_feedback_status | **not_recorded_by_build** |
| no_live_action_during_observation_capture | true |
| no_secret_values_recorded | true |
| no_phone_number_recorded | true |

The preserved manual execution evidence shows a Twilio send status of `queued` (send accepted) with a
SID present but **no recipient number recorded**. Final delivery confirmation and roofer feedback are
**external signals the build does not collect** — they are explicitly recorded as not build-recorded.

## Controlled pilot expansion decision

`decision = EXPANSION_NOT_APPROVED_REVIEW_REQUIRED`, `unrestricted_launch=false`,
`live_automation_remains_disabled=true`, `expansion_requires_fresh_signed_approval=true`.

### Expansion options template (UNSIGNED)

`approval_granted=false`, `approval_signed=false`, `authorizes_expansion_now=false`,
`selected_option=none`.

| Option | Summary |
| --- | --- |
| A | one more consenting roofer, one SMS, no retry (requires a new consent marker) |
| B | same roofer, second controlled message, one SMS, no retry |
| C | hold / no expansion |

### Expansion no-go blockers

| Blocker | Status |
| --- | --- |
| missing fresh signed expansion approval | **outstanding** |
| missing explicit option selection | **outstanding** |
| missing consent marker for any additional roofer | **outstanding** |
| any homeowner contact | not present (forbidden) |
| any production data | not present (forbidden) |
| any non-SMS channel | not present (forbidden) |
| any retry/automation beyond one message | not present (forbidden) |

Outstanding blocker count = **3**; `all_expansion_blockers_cleared=false`.

## What Build 197 does (and does not do)

Build 197 **does**: capture post-pilot observation status; prepare an unsigned expansion decision
packet (decision + options template + no-go blockers); update the launch-readiness summary; verify all
of the above read-only.

Build 197 **does not**: send an SMS, construct a Twilio client, call `messages.create`, run any retry,
make any Twilio/network/external call, contact any roofer or homeowner, read/store/record any secret
value/SID/token/phone number/production data, **approve expansion**, **select an option**, activate
live automation, add any public route/cron/scheduler/webhook/dispatcher/billing/quote/invoice/deposit/
email/call/calendar/CRM automation, or touch schema/auth/RLS/security. All broader live automation
remains **disabled**.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| Controlled roofer pilot one-message SMS | one message sent (1 attempt, no retry), Jason-operated |
| Post-pilot observation | captured (delivery/feedback not build-recorded) |
| Controlled pilot expansion decision | EXPANSION_NOT_APPROVED_REVIEW_REQUIRED |
| Broader live automation | all remains disabled |

**Next step:** Jason's controlled pilot **expansion decision** (review options, clear blockers, and
sign a fresh expansion approval if he chooses to expand) — **not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Post-pilot observation evidence | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-post-pilot-observation-build-197.json` |
| Expansion decision packet | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-decision-build-197.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-197.json` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-observation-build-197-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-controlled-roofer-pilot-observation-build-197-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_OBSERVATION_BUILD_197.md` |

## How to run (local-only, read-only)

```bash
# Full local-only observation + expansion-decision verification + wrapper
bash scripts/run-native-workflow-fixture-controlled-roofer-pilot-observation-build-197-dry-run.sh

# Verifier on its own
node backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-observation-build-197-readonly.js
```

## What still gates any expansion

Build 197 prepares the expansion decision but **grants nothing**. Any expansion requires Jason to clear
the three outstanding no-go blockers (fresh signed expansion approval, explicit option selection, and a
consent marker for any additional roofer) and to keep the scope SMS-only, one message, no retry, no
homeowner contact, and no production data — none of which this build performs. Launch remains
**pilot-gated, not unrestricted**, and the safety posture stays `demo_ready_with_live_automation_disabled`.
