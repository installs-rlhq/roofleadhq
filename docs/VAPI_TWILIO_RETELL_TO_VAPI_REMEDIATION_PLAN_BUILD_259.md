# Remediation Plan — Move Twilio Inbound Voice Routing from Retell to Vapi — Repo-Only, Planned-Not-Executed (Build 259)

Decision token: `TWILIO_VOICE_ROUTE_RETELL_TO_VAPI_REMEDIATION_PLANNED_NOT_EXECUTED_REPO_ONLY_NO_CUTOVER_NO_CONFIG_CHANGE_NO_CALL_WITHOUT_NEW_SEPARATE_APPROVAL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `c8a8adb` (Build 258 closeout), HEAD == origin/main.

## What this build is

Build 259 is a **repo-only remediation PLAN** for safely moving the dialed test number's Twilio inbound
**voice** routing off the **Retell Trunk** and onto **Vapi / Test Roofing Assistant**. It **documents
only**. It **performs no cutover** and makes **no** Twilio, Vapi, Retell, Railway, DNS, webhook, or
environment change. It writes only this doc, a read-only verifier, and a dry-run wrapper.

Build 259 places **no** call, dials **no** phone number, uses **no** Vapi **Test**, uses **no** Vapi
**Talk**, performs **no** browser/webCall, runs **no** `curl`, calls **no** live webhook, sends **no**
SMS, uses **no** Twilio CLI/API, uses **no** Retell API, contacts **no** homeowner or roofer, changes
**no** Railway/Vapi/Twilio/Retell config, publishes **no** Vapi assistant, triggers **no** deploy,
reads/prints **no** secret, and does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = twilio_retell_to_vapi_voice_route_remediation_plan_repo_only`
- `runtime_action_performed_by_build_259 = false`
- `fix_or_config_change_performed_by_build_259 = false`
- `remediation_status = planned_not_executed`
- `twilio_voice_cutover_status = not_started`
- `vapi_pstn_validation_status = blocked_until_cutover`
- `full_final_report_processing_status = not_validated`
- `real_pstn_vapi_call_path_status = not_validated`

## Prerequisite state (carried forward, preserved)

- **Build 258** (commit `c8a8adb`) — confirmed via read-only Twilio Console inspection that the number's
  inbound voice handling is a **Sip Trunk named "Retell Trunk"** (a `TK`-prefixed trunk SID, value
  redacted), so inbound PSTN voice routes to **Retell**, not Vapi.
  - `build_258_prerequisite_commit = c8a8adb`
  - `build_258_prerequisite_status = validated`
  - `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- **Build 257** (commit `915855a`) — repo-only diagnosis that classified the most likely cause as Twilio
  inbound voice still routing to Retell.
- **Build 256** (commit `1f9dd92`) — captured the stop-condition evidence from the single approved true
  PSTN dial:
  - `true_pstn_dial_performed = true`
  - `true_pstn_dial_count = 1`
  - `approved_attempt_consumed = true`
  - `approval_consumed = true`
  - `no_retry_without_new_approval = true`
  - `vapi_call_record_observed = false`
  - `retell_notification_observed = true`
  - `stop_condition_triggered = true`

The Build 256 approval is **consumed**. No new call, retry, or config change is authorized.

---

## 1. Current confirmed routing

- The dialed test number's Twilio inbound **voice** handling is a **Sip Trunk = `Retell Trunk`** (the
  trunk SID is a `TK`-prefixed identifier, redacted; value not recorded here).
- Because the carrier hands inbound PSTN calls to the **Retell** SIP trunk, **Retell answers** and **Vapi
  never receives the call**. This is the confirmed reason the single Build 256 true PSTN dial surfaced as
  a **"NEW RETELL CALL — RoofLeadHQ"** notification (`retell_notification_observed = true`) with **no Vapi
  call record** (`vapi_call_record_observed = false`).
- `current_routing_confirmed = true`
- `current_voice_route = twilio_sip_trunk_retell_trunk`
- `vapi_pstn_validation_result = blocked_by_twilio_voice_routing_to_retell`

## 2. Target routing

- **Controlled future state:** inbound PSTN voice for the **test number only** routes to **Vapi**, which
  answers with the **Test Roofing Assistant**, emits an **end-of-call-report**, and POSTs it to the
  backend webhook `POST /webhooks/vapi/call-completed` (assistant-level Bearer credential, validated in
  Builds 237/238). Retell no longer answers this number.
- This is the **only** routing change in scope. Messaging/SMS routing is **out of scope** and unchanged.
- `target_routing_documented = true`
- `target_voice_route = inbound_pstn_to_vapi_test_roofing_assistant`
- `target_scope = test_number_only_voice_only`

## 3. Required read-only confirmations before any change

All of these are **read-only** dashboard/doc inspections — view configuration only, change nothing, dial
nothing, call no mutating API. They must be completed and recorded **before** any cutover is even
proposed for approval:

1. **Twilio current Voice configuration** — re-confirm (read-only) the dialed number's Voice handling is
   still the `Retell Trunk` Sip Trunk (`TK`-prefixed SID), and capture the exact current setting so the
   rollback target is known. `readonly_confirm_twilio_voice_config = required`
2. **Retell trunk/agent ownership + rollback identifier** — read which Retell trunk/agent currently owns
   the number and record the **rollback identifier** (the Retell Trunk reference, redacted) needed to
   restore the current state. Do **not** delete or modify anything.
   `readonly_confirm_retell_ownership_and_rollback_id = required`
3. **Vapi number / import / native-provider setup + assistant assignment** — read whether the number is
   Vapi-native or an imported/BYO Twilio number, and confirm the assistant assignment = **Test Roofing
   Assistant**. `readonly_confirm_vapi_number_and_assignment = required`
4. **Vapi inbound connection method for Twilio numbers** — read whether Vapi provides a **TwiML App**, a
   **webhook URL**, a **SIP endpoint/URI**, or an **imported-number connection** as the mechanism to
   receive inbound calls from a Twilio number. `readonly_confirm_vapi_inbound_connection_method = required`
5. **Mechanism class for the move** — determine which mechanism the cutover actually requires: a **Twilio
   Console Voice setting change**, a **Vapi number import**, a **SIP trunk change**, and/or a **TwiML App
   change**. `readonly_confirm_required_mechanism_class = required`

- `readonly_confirmations_documented = true`

## 4. Proposed change plan (NOT executed)

> This is a **plan only**. Nothing below is performed in Build 259. The exact fields depend on the
> read-only confirmations in §3 and must be finalized before any approval.

- **Exact Twilio Voice fields likely to change:** on the number's **Voice and emergency calling →
  Configure with / A call comes in** handling — change the inbound handler **away from** the `Sip Trunk`
  (`Retell Trunk`) to the **Vapi-required target** (e.g., a Vapi webhook URL / TwiML App / SIP URI, as
  determined in §3.4). Likely-changed fields: *"A call comes in"* type and value (and the associated
  Voice URL / TwiML App / SIP target). `change_plan_twilio_voice_fields_documented = true`
- **Exact Vapi target to route to:** the Vapi inbound endpoint for the **Test Roofing Assistant** number
  (the specific TwiML App / webhook URL / SIP URI confirmed in §3.4). The exact value is **not invented
  here** — it is filled in only after the read-only confirmation. `change_plan_vapi_target_documented = true`
- **Rollback path:** restore the number's Voice handling to the **`Retell Trunk` Sip Trunk** using the
  rollback identifier captured in §3.2. The cutover must be a **single reversible Twilio Voice setting**
  so rollback is a one-step revert to the recorded prior value. `rollback_path_documented = true`,
  `rollback_target = twilio_sip_trunk_retell_trunk`
- **Who/what must approve before change:** **Jason's new, separate, explicit approval**, captured as its
  own build artifact (an approval/guard packet), after §3 is fully known. No cutover, and no call, until
  that approval exists. `approval_required_before_change = jason_new_separate_explicit_approval_as_build_artifact`

## 5. Safety guardrails

- No production homeowner/roofer traffic.
- No SMS change (messaging routing untouched and out of scope).
- No Retell deletion (no trunk/agent deletion; rollback depends on Retell remaining intact).
- No releasing/porting/deleting the phone number.
- No irreversible action (cutover must be a single reversible Twilio Voice setting with a recorded prior
  value).
- No call until **after** a fresh cutover guard **and** a new separate approval.
- `safety_guardrails_documented = true`

## 6. Validation plan (after a FUTURE approved cutover only)

Performed **only** after the cutover is executed under its own separate approval and a fresh guard passes:

1. **One** true PSTN dial from **Jason's own physical phone / iPhone Phone app** (no Vapi Test, no Vapi
   Talk, no browser/webCall).
2. Confirm **Vapi → Calls** shows the call as **Type = Phone / PSTN**, **not Web**.
3. Confirm **Vapi → Webhooks** shows an **end-of-call-report** event for the call.
4. Confirm the backend webhook **HTTP status** for that report (expect **200**).
5. Confirm **no SMS** was sent unless separately approved.
6. Capture **sanitized evidence only** (no raw phone numbers, raw call IDs, secrets, or PII).

- `validation_plan_documented = true`
- `validation_requires_post_cutover_and_fresh_approval = true`

## 7. Stop conditions

Halt immediately and capture sanitized evidence (no retry without a new, separate approval) on any of:

- Unexpected SMS.
- Any real homeowner/roofer traffic.
- No Vapi call record after the dial.
- Retell still answers the call.
- HTTP **401 / 400 / 500** on the webhook.
- Missing end-of-call-report.
- Any unsafe or unexpected behavior.

- `stop_conditions_documented = true`
- `no_retry_without_new_approval = true`

## 8. Decision tree

- If the **cutover target is unclear** → **stop** and perform read-only inspection of Vapi/Twilio
  docs/dashboard (do not guess the target).
- If **Twilio still routes to Retell** → **do not** attempt Vapi validation (the call will hit Retell).
- If **Vapi receives the PSTN call but no end-of-call-report** appears → diagnose **Vapi event delivery**
  (assistant/phone-level Server URL, server messages).
- If **Vapi receives the end-of-call-report and the backend returns 200** → capture **pass evidence**.
- If the **backend returns non-200** → diagnose **backend payload handling** (the webhook auth path is
  already validated; investigate payload/processing).
- `decision_tree_documented = true`

## 9. Explicit recommendation

The **next build** should be **either**:

- a **read-only dashboard inspection of the Vapi/Twilio cutover target** (resolve §3.4/§3.5 — the exact
  Vapi inbound connection method and the precise Twilio Voice target), **or**
- an **approval/guard packet for a narrow Twilio Voice routing cutover** — but **only after** the cutover
  target is **fully known** from that read-only inspection.

No cutover, no call, and no config change without a new, separate, explicit approval captured as its own
build artifact. `explicit_recommendation_documented = true`

---

## Status fields (machine-checkable)

- `build_mode = twilio_retell_to_vapi_voice_route_remediation_plan_repo_only`
- `runtime_action_performed_by_build_259 = false`
- `fix_or_config_change_performed_by_build_259 = false`
- `build_258_prerequisite_commit = c8a8adb`
- `build_258_prerequisite_status = validated`
- `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- `current_routing_confirmed = true`
- `current_voice_route = twilio_sip_trunk_retell_trunk`
- `target_routing_documented = true`
- `target_voice_route = inbound_pstn_to_vapi_test_roofing_assistant`
- `readonly_confirmations_documented = true`
- `change_plan_twilio_voice_fields_documented = true`
- `change_plan_vapi_target_documented = true`
- `rollback_path_documented = true`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `approval_required_before_change = jason_new_separate_explicit_approval_as_build_artifact`
- `safety_guardrails_documented = true`
- `validation_plan_documented = true`
- `stop_conditions_documented = true`
- `decision_tree_documented = true`
- `explicit_recommendation_documented = true`
- `remediation_status = planned_not_executed`
- `twilio_voice_cutover_status = not_started`
- `vapi_pstn_validation_status = blocked_until_cutover`
- `vapi_pstn_validation_result = blocked_by_twilio_voice_routing_to_retell`
- `full_final_report_processing_status = not_validated`
- `real_pstn_vapi_call_path_status = not_validated`
- `true_pstn_dial_performed = true`
- `true_pstn_dial_count = 1`
- `approved_attempt_consumed = true`
- `approval_consumed = true`
- `no_retry_without_new_approval = true`
- `stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was NOT done in this build

- **No cutover and no config change of any kind.** Plan only.
- **No runtime/external action of any kind by Build 259.**
- **No Twilio, Vapi, Retell, Railway, DNS, webhook, or environment change.**
- **No call placed.** **No phone number dialed.** **No new call requested.**
- **No retry** of the consumed Build 256 approval. **No new approval** assumed or fabricated.
- **No Vapi Test** used; **no Vapi Talk** used; **no browser/webCall**; **no call** placed or received.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio CLI/API** used; **no Twilio config change**.
- **No Retell API** used; **no Retell config change**; **no Retell deletion**.
- **No number released, ported, or deleted.**
- **No Vapi config change**; **no Vapi publish**; **no Railway config change**; **no deploy / redeploy /
  restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the Sip Trunk SID **value** was not recorded;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 259)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
- No new call requested or placed.
- No retry of any prior consumed approval.
- No Vapi Test used.
- No Vapi Talk used.
- No browser/webCall performed.
- No SMS sent.
- No SMS/messaging route change.
- No Twilio call placed or routed.
- No Twilio CLI/API used.
- No Twilio configuration change.
- No Twilio Voice cutover executed.
- No Retell API used.
- No Retell configuration change.
- No Retell deletion.
- No number released, ported, or deleted.
- No `curl` executed.
- No live webhook called.
- No DNS change.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No Vapi configuration change by this build.
- No Vapi publish.
- No Vapi-originated webhook action executed by this build.
- No full Vapi payload processing pass executed.
- No real call test executed by this build.
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (no secret value exists in this packet; only `value_redacted=true` /
  `secret_value_recorded=false` markers are recorded;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read).
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at c8a8adb`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `c8a8adb` before edits.

## Next recommended step

Create the **next build** as **either** a **read-only dashboard inspection of the Vapi/Twilio cutover
target** (to resolve the exact Vapi inbound connection method and the precise Twilio Voice target before
anything is changed), **or** — only once that target is fully known — an **approval/guard packet for a
narrow, reversible Twilio Voice routing cutover** (test number, voice only). The Build 256 approval is
consumed; **no cutover, no new call, and no config change without a new, separate, explicit approval**
captured as its own build artifact.

## Files added in Build 259

- `docs/VAPI_TWILIO_RETELL_TO_VAPI_REMEDIATION_PLAN_BUILD_259.md` (this doc)
- `backend/scripts/verify-vapi-twilio-retell-to-vapi-remediation-plan-build-259-readonly.js`
- `scripts/run-vapi-twilio-retell-to-vapi-remediation-plan-build-259-dry-run.sh`
