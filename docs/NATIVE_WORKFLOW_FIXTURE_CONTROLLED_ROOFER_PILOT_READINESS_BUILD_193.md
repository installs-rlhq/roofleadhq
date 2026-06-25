# Native Workflow Fixture — Controlled Roofer Pilot Readiness (Build 193)

**Type:** LOCAL-ONLY readiness packet. Converts the successful one-message SMS proof into a
safe next-stage controlled real-roofer pilot plan — **without activating anything**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Pilot gate decision:** **NO-GO** (readiness is documented; no pilot is approved or activated).

## Why this build exists

Build 192 closed out the successful, human-operated controlled live SMS attempt: gate
`CONTROLLED_LIVE_SMS_PERMITTED` → exactly **1 send attempt** → **1 SMS sent** to Jason's own
consenting test identity → **no retry**, and the one-time approval is now **consumed**. Build 193
takes that one-message proof and writes the **controlled real-roofer pilot readiness packet**: the
scope, the setup-completeness checklist, the no-go blockers, and a **fresh UNSIGNED pilot approval
template** that together gate any future controlled pilot interaction.

This is a **readiness** build, not an execution build. It performs **no live action** and activates
nothing.

## What Build 193 does (and does not do)

Build 193 **does**:

- Write a names/booleans/codes-only **pilot readiness evidence** packet that references the prior
  one-message proof and records the scope, checklist, and no-go blockers.
- Define the **pilot scope**: one consenting test roofer only; Jason-controlled approval required
  before any contact; **SMS-only** first; one controlled pilot interaction at a time; **no homeowner
  contact** until separately approved; no production data; all broader automation disabled.
- Define the **setup-completeness checklist**: roofer consent marker required; roofer test identity
  marker required; approved destination marker required (**no number stored**); STOP/rollback owner
  **Jason Lohse**; maximum pilot message count default **1** (increase needs separate approval);
  **no-retry** default.
- Define the **no-go blockers**: missing consent marker; missing approved test identity marker;
  missing fresh signed pilot approval; any request for secrets/phone numbers in repo/chat; any
  production data or real homeowner scope; any non-SMS channel.
- Write a **fresh UNSIGNED pilot approval template** that authorizes nothing
  (`approval_granted=false`, `approval_signed=false`, `authorizes_live_pilot_now=false`).
- Update the launch-readiness summary, keeping launch **pilot-gated** (not unrestricted).
- Verify all of the above **read-only**.

Build 193 **does not**:

- Send an SMS, construct a Twilio client, call `messages.create`, or run **any retry**.
- Make any Twilio / network / external call.
- Contact any real roofer or homeowner.
- Read or record any secret value, SID, token, recipient phone number, or production data.
- Activate live automation, or add any public route, cron, scheduler, webhook, dispatcher, billing,
  quote, invoice, deposit, email, call, calendar, or CRM automation.
- Touch schema / auth / RLS / security.

All broader live automation remains **disabled**.

## Pilot scope (fixture)

- one consenting test roofer only
- Jason-controlled approval required before any contact
- SMS-only first
- one controlled pilot interaction at a time
- no homeowner contact until separately approved
- no production data
- all broader automation disabled

## Setup-completeness checklist (fixture)

| Item | Requirement |
| --- | --- |
| roofer consent marker | required |
| roofer test identity marker | required |
| approved destination marker | required, **no number stored** |
| STOP/rollback owner | Jason Lohse |
| maximum pilot message count | default **1** (increase requires separate approval) |
| retry | **none** by default |

## No-go blockers (fixture)

- missing consent marker
- missing approved test identity marker
- missing fresh signed pilot approval
- any request for secrets/phone numbers in repo/chat
- any production data or real homeowner scope
- any non-SMS channel

**All blockers must clear before GO.** Pilot gate decision is **NO-GO** until then.

## Fresh pilot approval template (UNSIGNED)

The template is a blank gate, not an approval:

- `approval_granted=false`
- `approval_signed=false`
- `authorizes_live_pilot_now=false`

A future controlled pilot interaction requires Jason to clear all Build 193 no-go blockers and then
fill, **sign**, and date this template with a one-message, SMS-only scope to one consenting test
roofer. No secret values, SIDs, tokens, or phone numbers belong in it.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS | one message succeeded (1 attempt, no retry) |
| Controlled roofer pilot readiness | documented; gate **NO-GO**; nothing activated |
| Broader live automation | all remains disabled |

**Next step:** Jason clears all pilot no-go blockers and signs the fresh pilot approval **before any
controlled roofer contact** — **not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Pilot readiness evidence | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-readiness-build-193-evidence.json` |
| Fresh unsigned pilot approval template | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-approval-build-193-template.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-193.json` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-readiness-build-193-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-controlled-roofer-pilot-readiness-build-193-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_READINESS_BUILD_193.md` |

## How to run (local-only, read-only)

```bash
# Full local-only readiness verification + dry-run wrapper
bash scripts/run-native-workflow-fixture-controlled-roofer-pilot-readiness-build-193-dry-run.sh

# Verifier on its own
node backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-readiness-build-193-readonly.js
```

## What still gates a controlled roofer pilot

Build 193 documents readiness; it grants nothing. A controlled pilot still requires, at minimum: all
six no-go blockers cleared, a **fresh signed** pilot approval (the template above, signed by Jason),
the existing fail-closed one-message runner re-gating at send time, and live credentials plus an
approved recipient — **none of which exist in this repo**. Build 193 changes none of that. Launch
remains **pilot-gated, not unrestricted**, and the safety posture stays
`demo_ready_with_live_automation_disabled`.
