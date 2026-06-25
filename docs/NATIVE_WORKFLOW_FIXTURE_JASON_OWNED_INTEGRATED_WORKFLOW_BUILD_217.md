# Native Workflow — Jason-Owned Integrated Local Workflow (Build 217)

**Type:** LOCAL-ONLY build that delivers an **integrated local execution path** for all five Build 216
scenarios and **exercises the existing native RoofLeadHQ workflow modules** (not fixture-string
comparison) with deterministic **synthetic** data, producing **sanitized sales-demo proof**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`JASON_OWNED_INTEGRATED_WORKFLOW_LOCALLY_VALIDATED_LIVE_M1_M2_APPROVALS_AVAILABLE`**

This build performs **no send**: no SMS, no email, no Twilio/provider call, no network/external call,
no credential load, no raw phone/email value, no production record, no retry, no confirm-token arming,
no homeowner contact, no real roofer contact, no live automation, no unrestricted launch.

## Why this build exists

Build 216 captured the Jason-owned validation plan and the five scenarios but only as fixture data.
Build 217 makes it real: one consolidated runner maps each scenario to **actual native workflow code**,
executes that code against synthetic owned-test data, and records expected-versus-actual results plus a
sanitized demo artifact. M1 and M2 future **live** validation remain **separately approval-gated**.

## Scenario → native module map

| Concern | Native module (function) |
| --- | --- |
| Synthetic lead intake | `lead-intake-recognition.service` (`recognizeLeadIntake`) |
| Roofing/inspection-request recognition | `lead-intake-recognition.service` (`recognizeRoofInspectionRequest`) |
| Lead source & routing | `lead-intake-recognition.service` (`normalizeSourceLabel`, `routedFor`) |
| Roofer notification preparation | `roofer-alert-binding.service` (`bindRooferAlert`) |
| Exact outbound message binding | `roofer-alert-binding.service` (`assertExactRooferAlertBinding`) |
| Lead status & follow-up state | `sms-dispatcher-planner.service` (`planSmsDispatch`) + `sms-safety.service` (`evaluateSmsSafety`) |
| Open-lead recap generation | `roofer-alert-binding.service` (`buildDailyOpenLeadRecap`) |
| Homeowner-consent blocking | `roofer-alert-binding.service` (`prepareHomeownerOutreach`, `HOMEOWNER_CONTACT_AUTHORIZED=false`) |
| Outbound send-intent (no send) | `sms-send-intent-planner.service` (`planSmsSendIntent`, `noSmsSent=true`) |

Two **new** pure, production-aligned native modules were added as the smallest reusable connections
required: `backend/src/services/lead-intake-recognition.service.ts` and
`backend/src/services/roofer-alert-binding.service.ts`. Three existing native modules are reused
(`sms-safety`, `sms-dispatcher-planner`, `sms-send-intent-planner`). The runner **compiles and calls**
these modules — it does not duplicate their logic.

## The five scenarios (all executed as `native_module_execution`)

1. **`new_roof_inspection_lead_alert`** (required, M1) — a synthetic owned lead enters, is recognized as a
   roof-inspection request, its source/routing is captured, M1 is selected, the prepared outbound body
   equals the approved M1 text **exactly**, no message is sent, and the local lead record/status is
   visible.
2. **`missed_or_slow_lead_follow_up_nudge`** (required, M2) — a synthetic owned lead has no first reply, the
   follow-up condition is recognized natively, M2 is selected, the prepared body equals the approved M2
   text **exactly**, no message is sent, and follow-up state is visible locally.
3. **`daily_open_lead_recap`** (required, M3) — a deterministic open-lead count is computed from synthetic
   state, the internal M3 recap is prepared with the actual count, and no external notification is sent.
4. **`lead_source_routing_flag`** (optional) — the synthetic source label is retained, the lead is routed
   for roof-inspection follow-up, and the routing result is visible locally.
5. **`homeowner_consent_boundary_reminder`** (optional) — homeowner-facing copy stays draft-only, no
   homeowner send is prepared or authorized, the workflow emits an internal blocked/approval-required
   result, and `homeowner_contact_authorized=false` remains enforced.

Exact M1: `RoofLeadHQ: New roof inspection lead just came in. A quick first reply now helps you reach them while they're still looking. Reply STOP to opt out.`

Exact M2: `RoofLeadHQ: A roof inspection lead is still waiting on a first reply. A quick follow-up now keeps it warm. Reply STOP to opt out.`

## Guarded FUTURE live M1/M2 support (permission-only; no send)

The binding module provides `prepareGuardedFutureSend`, which computes **permission only** and never
sends. A live-capable path **fails closed** unless a fresh, signed, **scenario-specific** approval AND an
explicit confirmation token are present. **M1 and M2 are separate attempts**: an M1 approval never
authorizes M2 and an M2 approval never authorizes M1. Empty/generic/substituted/wrong-scenario copy fails
closed. Exactly one attempt per approval, no retry, approval expires after the attempt. The unsigned,
approval-ready decision artifact with the two distinct templates lives at
`backend/fixtures/native-workflow-demo-roofer/m1-m2-guarded-live-validation-approval-ready-build-217.json`
— **neither template is approved or signed.**

## Lindy status (audit complete)

- Lindy audit is **complete**; both autonomous Fillout triggers are **removed** (no trigger ran, no
  email/SMS/payment-link/calendar/external action during removal).
- Lindy has **no remaining automatic customer/roofer/homeowner contact path** (0/0/0).
- Daily Brief remains **enabled, Jason-only**.
- Lindy pilot mode: **safe internal assistance and Jason-only daily brief**. Lindy **does not own** the
  product workflow; it remains a **temporary internal-assistance tool**, not the RoofLeadHQ engine.

## What Build 217 does (and does not do)

Build 217 **does**: add two pure native modules; build one integrated local runner that exercises native
logic across all five scenarios with synthetic data; produce a truthful execution-evidence artifact and a
sanitized demo proof; prepare permission-only guarded future M1/M2 support and an unsigned approval-ready
artifact; update the Lindy/readiness status.

Build 217 **does not**: send any SMS or email, construct a provider client, call `messages.create`, make
any network/external call, load or inspect any credential value, record any raw phone/email/SID/secret,
create any production record, authorize a send now, authorize homeowner or real-roofer contact, activate
any live automation, or add any public route/cron/scheduler/webhook/dispatcher/CRM/billing automation, or
touch schema/auth/RLS/security. All broader live automation remains **disabled**.

## Artifacts

| Artifact | Path |
| --- | --- |
| Build 217 packet | `backend/fixtures/native-workflow-demo-roofer/jason-owned-integrated-workflow-build-217.json` |
| Execution evidence (runner output) | `backend/fixtures/native-workflow-demo-roofer/integrated-workflow-execution-evidence-build-217.json` |
| Unsigned M1/M2 approval-ready templates | `backend/fixtures/native-workflow-demo-roofer/m1-m2-guarded-live-validation-approval-ready-build-217.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-217.json` |
| Native recognition module | `backend/src/services/lead-intake-recognition.service.ts` |
| Native alert-binding module | `backend/src/services/roofer-alert-binding.service.ts` |
| Integrated runner | `backend/scripts/run-jason-owned-integrated-workflow-build-217.js` |
| Read-only verifier | `backend/scripts/verify-jason-owned-integrated-workflow-build-217-readonly.js` |
| Dry-run wrapper | `scripts/run-jason-owned-integrated-workflow-build-217-dry-run.sh` |
| Sales-demo proof (runner output) | `docs/NATIVE_WORKFLOW_DEMO_PROOF_JASON_OWNED_INTEGRATED_WORKFLOW_BUILD_217.md` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_JASON_OWNED_INTEGRATED_WORKFLOW_BUILD_217.md` |

## How to run (local-only)

```bash
# Full local-only integrated runner + read-only verifier + secret scan
bash scripts/run-jason-owned-integrated-workflow-build-217-dry-run.sh

# Integrated runner on its own (exercises native modules; no send, no network)
node backend/scripts/run-jason-owned-integrated-workflow-build-217.js

# Read-only verifier on its own
node backend/scripts/verify-jason-owned-integrated-workflow-build-217-readonly.js
```

## What still gates any further live send

No send, no retry, no Twilio/network/email call occurs here. Before any live step, Jason must **select and
sign one** of the distinct M1/M2 approval templates as a **fresh, single-use, scenario-specific** approval,
provide the **send-time confirmation token**, and run the guarded one-message attempt **exactly once with
no retry** in his own controlled environment, entering the Jason-owned destination **silently outside
repo/chat/logs**. An M1 approval authorizes M1 only; an M2 approval authorizes M2 only. Launch remains
**pilot-gated, not unrestricted**, and the safety posture stays `demo_ready_with_live_automation_disabled`.
The remaining demo gap is a genuine UI view (or recorded walkthrough) — see the sales-demo proof for the
truthful UI/demo-view gap statement.
