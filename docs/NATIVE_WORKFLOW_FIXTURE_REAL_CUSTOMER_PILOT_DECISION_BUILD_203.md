# Native Workflow Fixture — Real-Customer Pilot Decision + Consent/Onboarding Packet (Build 203)

**Type:** LOCAL-ONLY real-customer pilot **decision** + consent/onboarding packet. Prepares the
decision to review a first real-customer pilot **without approving, authorizing, or activating
anything**. Reports from recorded markers only. Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`REAL_CUSTOMER_PILOT_REVIEW_REQUIRED`**
**Real-customer pilot authorized now:** **false.** **Homeowner contact authorized now:** **false.**

## Why this build exists

Three controlled one-message SMS sends have now succeeded, Jason-operated, one message each, no retry:
the controlled live SMS to **Jason's own** number, the **first controlled roofer pilot** one-message
SMS, and the controlled **Option B expansion retry** (closed out in Build 202 after the first expansion
attempt failed with Twilio **21211/400** and the destination was corrected outside the repo). Per the
Build 201 fastest-path assessment, the next step is a **real-customer pilot decision/consent review** —
**not** unrestricted launch and **not** another send-scaffolding micro-build.

Build 203 captures that decision packet: the decision marker, a recommended **narrow** pilot scope, a
consent/onboarding checklist, a go/no-go checklist, and an **UNSIGNED** approval template. **It approves
and activates nothing.**

## The decision (recorded markers only)

| Marker | Value |
| --- | --- |
| decision | **REAL_CUSTOMER_PILOT_REVIEW_REQUIRED** |
| unrestricted_launch | **false** |
| live_automation_remains_disabled | **true** |
| real_customer_pilot_authorized_now | **false** |
| homeowner_contact_authorized_now | **false** |
| launch_status | **pilot_gated_not_unrestricted** |

## Recommended pilot scope (narrow)

- **One** consenting roofer.
- **One** manually selected lead.
- **Jason-coordinated** workflow.
- **SMS-only**, and only **after a fresh per-attempt signed approval**.
- **No retry** by default.
- **No** production automation.
- **No** billing / quote / invoice / deposit automation.

## Consent / onboarding checklist

- Roofer consent captured **outside the repo**.
- Permitted SMS recipient identified **outside the repo** (number never stored in repo).
- Homeowner consent rules **reviewed before any homeowner message**.
- STOP / opt-out language **finalized before any homeowner-facing SMS**.
- Rollback / stop owner: **Jason Lohse**.

## Go / no-go checklist

- Consent marker present.
- Approved destination marker present, **no number stored**.
- **Fresh signed approval required before any live send**.
- **No homeowner message without separate approval**.
- **No production data until separately approved**.

## Unsigned approval template

The packet includes an **UNSIGNED** approval template
(`real-customer-pilot-unsigned-approval-template-build-203.json`) that authorizes **nothing**:

- `approval_signed=false`
- `approval_granted=false`
- `authorizes_real_customer_pilot_now=false`

It documents the shape of the per-attempt approval Jason would complete **outside this build** (one
message, no retry, SMS-only, Jason-operated, homeowner message requires separate approval). Filling it
in does not happen here.

## What Build 203 does (and does not do)

Build 203 **does**: record the real-customer pilot decision marker; capture a narrow pilot scope, a
consent/onboarding checklist, and a go/no-go checklist; provide an unsigned approval template; update the
launch-readiness summary; verify all of the above read-only.

Build 203 **does not**: approve or authorize a real-customer pilot; authorize any homeowner contact; sign
or grant any approval; send an SMS; construct a Twilio client; call `messages.create`; arm any confirm
token; run any retry; make any Twilio/network/external call; contact any roofer or homeowner;
read/store/record any secret value/SID/token/recipient phone number/production data; activate live
automation; add any public route/cron/scheduler/webhook/dispatcher/CRM/billing/quote/invoice/deposit/
email/call/calendar automation; or touch schema/auth/RLS/security. All broader live automation remains
**disabled**.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| First controlled roofer pilot one-message SMS | **succeeded** (1 attempt, no retry), Jason-operated |
| Controlled pilot expansion **retry** send | **succeeded** (1 attempt, no retry), Jason-operated |
| Real-customer pilot decision | **REAL_CUSTOMER_PILOT_REVIEW_REQUIRED** — not authorized now |
| Broader live automation | all remains disabled |

**Narrative:** the controlled live SMS to Jason **succeeded**; the first controlled roofer pilot
**succeeded**; the controlled expansion retry **succeeded**; broader live automation **remains
disabled**; the next step is a **real-customer pilot decision/consent**, not unrestricted launch.

**Next step:** Jason **reviews the real-customer pilot decision and captures consent outside the repo**,
then requests a **fresh per-attempt signed approval** before any live send — **not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Decision packet | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-decision-build-203.json` |
| Unsigned approval template | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-unsigned-approval-template-build-203.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-203.json` |
| Read-only verifier | `backend/scripts/verify-real-customer-pilot-decision-build-203-readonly.js` |
| Dry-run wrapper | `scripts/run-real-customer-pilot-decision-build-203-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_DECISION_BUILD_203.md` |

## How to run (local-only, read-only)

```bash
# Full local-only real-customer pilot decision verification + dry-run wrapper
bash scripts/run-real-customer-pilot-decision-build-203-dry-run.sh

# Verifier on its own
node backend/scripts/verify-real-customer-pilot-decision-build-203-readonly.js
```

## What still gates any further live action

Any first **real-customer** live send requires a new, explicit, **per-attempt** signed approval (a fresh
decision + final send approval + send-time preflight) with roofer consent and the approved destination
captured **outside the repo**, Jason running the existing fail-closed one-message runner **exactly once
with no retry** in his own controlled environment, and — for any **homeowner-facing** message — a
**separate** approval after STOP/opt-out language is finalized. This repo performs none of that. Launch
remains **pilot-gated, not unrestricted**, and the safety posture stays
`demo_ready_with_live_automation_disabled`.
