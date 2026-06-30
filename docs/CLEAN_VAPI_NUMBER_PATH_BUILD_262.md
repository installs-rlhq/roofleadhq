# Clean Vapi-Managed Test-Number Path — Strategic Decision & Readiness Packet (Build 262)

Decision token: `CLEAN_VAPI_NUMBER_PATH_PREFERRED_NEXT_STEP_PLANNED_NOT_EXECUTED_EXISTING_TWILIO_RETELL_ROUTE_PRESERVED_UNTOUCHED_TWILIO_CUTOVER_BLOCKED_PENDING_VAPI_SUPPORT_OR_TARGET_API_LOOKUP_BLOCKED_BY_401_REPO_ONLY_NO_PROVISION_NO_CALL_NO_CONFIG_CHANGE_WITHOUT_NEW_SEPARATE_APPROVAL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `575668a` (Build 261 closeout), HEAD == origin/main.

## What this build is

Build 262 is a **repo-only strategic decision / readiness packet**. In strategic build mode (fewer builds,
bigger useful steps, no ceremony) it captures the decision to **route around** the stuck Twilio/Retell
number-import problem by preparing a **clean Vapi-managed (or cleanly provisioned) test number** assigned to
the **Test Roofing Assistant**, while leaving the existing **Twilio → Retell** route **untouched** as
rollback. It **documents and plans only**. It **provisions no number, places no call, and changes no
config**. It writes only this doc, a read-only verifier, and a dry-run wrapper.

Build 262 buys/provisions **no** phone number, places **no** call, dials **no** phone number, uses **no**
Vapi **Test**, uses **no** Vapi **Talk**, performs **no** browser/webCall, runs **no** `curl`, calls **no**
live webhook, sends **no** SMS, uses **no** Twilio CLI/API, uses **no** Retell API, contacts **no**
homeowner or roofer, changes **no** Railway/Vapi/Twilio/Retell config, publishes **no** Vapi assistant,
triggers **no** deploy, reads/prints **no** secret, and does **not** read
`/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = clean_vapi_number_path_strategic_decision_repo_only`
- `runtime_action_performed_by_build_262 = false`
- `fix_or_config_change_performed_by_build_262 = false`
- `current_twilio_retell_route_status = preserved_untouched`
- `twilio_voice_cutover_status = blocked_pending_vapi_support_or_target`
- `vapi_api_metadata_lookup_status = blocked_by_401`
- `clean_vapi_number_path_status = preferred_next_path_planned_not_executed`
- `clean_vapi_number_approval_status = not_requested`
- `pstn_validation_status = not_approved`
- `no_call_placed = true`
- `no_sms_sent = true`
- `no_config_changed = true`
- `no_number_provisioned = true`

## Prerequisite state (carried forward, preserved)

- **Build 261** (commit `575668a`) — repo-only capture of the read-only Vapi Integrations/connection
  inspection and the Twilio routing fork: Integrations shows only the connected Server Configuration; the
  visible Phone Number Providers are SIP Trunk, Telnyx, Vonage; **no** Twilio provider card, Twilio
  credential binding, import/connection panel, or exact Twilio voice target is visible. Cutover **NOT
  ready**; recommended a read-only Vapi API metadata lookup (option A) with support/docs (B) and explicit
  SIP-trunk (C) fallbacks.
  - `build_261_prerequisite_commit = 575668a`
  - `build_261_prerequisite_status = validated`
- **Build 262 (API-lookup-401 sibling packet)** — the read-only Vapi API phone-number metadata lookup
  (option A) was **executed** under its own approval and returned **HTTP 401 Invalid Key** — twice,
  including with a fresh Private API key. **No metadata was obtained.** API lookups are therefore
  **blocked_by_401** until a verified-good key from the correct workspace is available. Captured in the
  sibling packet `docs/VAPI_API_METADATA_LOOKUP_401_BUILD_262.md`.
  - `vapi_api_metadata_lookup_status = blocked_by_401`
- **Build 260** (commit `caef83c`) — Vapi Phone-Numbers record present, provider **Twilio**, assigned to
  **Test Roofing Assistant**, exact Twilio voice target not visible.
- **Build 259** (commit `2dc484b`) — repo-only Retell→Vapi voice-cutover remediation **plan**; executed
  nothing.
- **Build 258** (commit `c8a8adb`) — confirmed via read-only Twilio Console inspection that the number's
  inbound voice handling is a **Sip Trunk named "Retell Trunk"** (`TK`-prefixed SID, redacted), so inbound
  PSTN voice routes to **Retell**, not Vapi.
  - `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`

The Build 256 single-true-PSTN-dial approval is **consumed**. No new call, retry, or config change is
authorized by this build.

---

## 1. Where we are stuck (problem statement)

The existing Test Roofing number is a Twilio number whose **inbound Voice** routes to a Twilio **Sip Trunk
"Retell Trunk"** (Build 258), so true PSTN calls reach **Retell, not Vapi**. Vapi shows the number as a
Twilio-provider record assigned to the Test Roofing Assistant, but exposes **no** exact voice target /
import binding (Builds 260–261), and the read-only Vapi **API** lookup that could have resolved the binding
returned **HTTP 401** twice (the API-lookup-401 sibling packet). Vapi support first replied with generic SIP
Trunking guidance and asked for a **Call ID** — but **no Vapi Call ID exists**, because the true PSTN call
never reaches Vapi. Jason has replied to Vapi clarifying that the call routes to Retell, that no Vapi call
record exists, and asking which path to use (Vapi-managed number, re-import the Twilio number, Twilio SIP
URI, TwiML App/webhook, or other).

**Net:** resolving the *existing* number's Twilio→Vapi cutover is **blocked** on an external answer (Vapi
support) or a confirmed target/API key. Continuing to spend repo/build cycles on it does not move us toward
live roofer testing.

- `problem_is_external_blocked = true`
- `existing_number_cutover_blocked_on_vapi_support_or_target = true`

## 2. Strategic decision (captured)

**Route around the blocker.** Do not keep spending repo/build cycles on the current Twilio/Retell-routed
number until Vapi support gives a concrete answer. Instead, prepare to **prove Vapi on a clean
Vapi-managed (or cleanly provisioned) test number** assigned to the Test Roofing Assistant, leaving the
existing Twilio → Retell route fully intact as rollback.

- Do **not** continue burning build cycles on the current Twilio/Retell number until Vapi support answers
  concretely.
- Do **not** approve a Twilio cutover yet.
- Do **not** approve a PSTN call yet.
- **Preferred next product path:** prove Vapi using a **clean Vapi-managed or cleanly provisioned test
  number** assigned to the **Test Roofing Assistant**, with the existing Twilio → Retell route left
  **untouched** as rollback.

**Why:** we need to prove the actual business path end to end —
**inbound PSTN → Vapi assistant → end-of-call report → backend `/webhooks/vapi/call-completed`** — and the
clean-number path is the smallest concrete step that exercises that path without depending on the stuck,
externally-blocked cutover of the existing number.

- `strategic_decision = route_around_blocker_via_clean_vapi_number`
- `decision_rationale = prove_inbound_pstn_to_vapi_assistant_to_eocr_to_backend_webhook`
- `business_path_to_prove = inbound_pstn__vapi_assistant__end_of_call_report__backend_webhooks_vapi_call_completed`

## 3. What stays untouched (rollback preserved)

The existing **Twilio → Retell** Voice route remains the rollback and is **not modified** by this build or by
the clean-number path. The clean Vapi number is **additive**: a separate, cleanly provisioned/managed test
number assigned to the Test Roofing Assistant. The existing number, its Twilio Voice setting (the Retell
Trunk), and Retell itself all remain intact.

- `current_twilio_retell_route_status = preserved_untouched`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`
- `clean_number_is_additive_not_a_cutover = true`

## 4. Cutover & API-lookup status (both still blocked)

- **Twilio Voice cutover of the existing number** remains **blocked** pending a concrete Vapi support
  answer or a confirmed exact target/import binding. Not approved, not started.
  - `twilio_voice_cutover_status = blocked_pending_vapi_support_or_target`
- **Vapi API metadata lookup** remains **blocked by HTTP 401** (twice, including a fresh Private API key);
  no further API-lookup attempts until a verified-good key from the correct workspace is available.
  - `vapi_api_metadata_lookup_status = blocked_by_401`

## 5. Next useful approval (named, NOT granted here)

The next useful approval should be a **narrow** approval to **provision/select and use a clean Vapi-managed
test number only** — explicitly **not** to touch the existing Twilio/Retell number. This build does **not**
grant it; it only names it so the next build can request it as its own artifact.

- `next_useful_approval = narrow_clean_vapi_managed_test_number_provision_and_use_only`
- `next_useful_approval_excludes = any_change_to_existing_twilio_retell_number`
- `clean_vapi_number_approval_status = not_requested`

## 6. Future validation sequence (planned; DO NOT EXECUTE in this build)

To be executed **only** under the separate narrow approval named in §5, on a Jason-owned phone, never with
real homeowner/roofer traffic:

1. Provision **or** select a clean **Vapi-managed** test number (or cleanly provisioned equivalent).
2. Assign the **Test Roofing Assistant** to that number.
3. Confirm the **webhook / server messages** are still configured (end-of-call-report delivery to the
   backend), read-only.
4. Perform **one controlled true PSTN call** from a **Jason-owned phone** to the clean number.
5. Verify a Vapi **Type = Phone / PSTN** call record appears (proving the call reached Vapi).
6. Verify the **end-of-call-report** is produced.
7. Verify the **backend receives and processes** the final report at `/webhooks/vapi/call-completed`
   (2xx, validation passes).
8. Capture **sanitized evidence** (no raw numbers, IDs, URLs, SIP URIs, tokens, or PII) as the next build.

- `future_validation_sequence_documented = true`
- `future_validation_sequence_executed = false`
- `future_validation_call_is_single_controlled_jason_owned_phone = true`

## 7. Stop / rollback conditions (explicit)

Halt immediately and capture sanitized evidence (no retry without a new, separate approval) if any hold:

- The clean Vapi number **cannot be provisioned or assigned cleanly** → **stop**.
- The controlled PSTN call **does not reach Vapi** (no Phone/PSTN call record) → **stop**.
- **No end-of-call-report** is produced → **stop**.
- The **backend returns non-2xx / a validation error** on the final report → **stop**.
- The **existing Twilio/Retell number remains untouched throughout** — if any step would modify it, **stop**.
- Any unexpected SMS, any real homeowner/roofer traffic, or any prompt to change a Twilio/Vapi/Retell field
  → **stop**.

- `stop_conditions_documented = true`
- `existing_twilio_retell_number_untouched_invariant = true`
- `no_retry_without_new_approval = true`

## 8. Decision tree (forward paths)

- If the **clean Vapi number path works** → continue with **Vapi** for live roofer testing; later decide
  separately whether to migrate the existing Twilio/Retell number.
- If the **clean Vapi number path fails** → pivot to **Retell** and adapt the backend/webhook mapping.
- If **Vapi support replies with a clean Twilio cutover target first** → that target can still be used, but
  it should **no longer block** live testing (the clean-number path proceeds in parallel).
- No path proceeds to provisioning, a call, or a config change without the §5 narrow approval captured as
  its own build artifact.

- `decision_tree_documented = true`
- `path_success_action = continue_vapi_for_live_roofer_testing_then_decide_existing_number_migration`
- `path_failure_action = pivot_to_retell_and_adapt_backend_webhook_mapping`
- `vapi_support_target_action = usable_but_no_longer_blocks_live_testing`

## 9. Safety guardrails (held)

- No buying/provisioning a phone number; no number released/ported/deleted.
- No placing calls; no dialing; no Vapi Test; no Vapi Talk; no browser/webCall.
- No production webhook calls; no `curl`/live webhook tests.
- No Twilio CLI/API; no Retell API; no SMS.
- No reading secrets; no Railway/Vapi/Twilio/Retell config change; no Vapi publish; no deploy.
- No schema/auth/RLS change; no production data export; no CRM/billing/public/live automation.
- No homeowner contact; no roofer contact.
- No irreversible action; no config change until the §5 narrow approval exists as its own build artifact.
- `safety_guardrails_documented = true`

## 10. Explicit recommendation (next strategic step)

The **next build** should request the **§5 narrow approval** — provision/select and use a **clean
Vapi-managed test number only**, assigned to the Test Roofing Assistant — then execute the **§6 future
validation sequence** to prove **inbound PSTN → Vapi assistant → end-of-call report → backend
`/webhooks/vapi/call-completed`**. The existing Twilio/Retell number stays untouched as rollback. The Twilio
cutover and the Vapi API lookup both remain blocked and out of the critical path for live testing.

- `explicit_recommendation_documented = true`
- `next_step = request_narrow_clean_vapi_managed_test_number_approval_then_execute_pstn_to_backend_validation`

---

## Status fields (machine-checkable)

- `build_mode = clean_vapi_number_path_strategic_decision_repo_only`
- `runtime_action_performed_by_build_262 = false`
- `fix_or_config_change_performed_by_build_262 = false`
- `build_261_prerequisite_commit = 575668a`
- `build_261_prerequisite_status = validated`
- `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- `problem_is_external_blocked = true`
- `strategic_decision = route_around_blocker_via_clean_vapi_number`
- `business_path_to_prove = inbound_pstn__vapi_assistant__end_of_call_report__backend_webhooks_vapi_call_completed`
- `clean_number_is_additive_not_a_cutover = true`
- `next_useful_approval = narrow_clean_vapi_managed_test_number_provision_and_use_only`
- `future_validation_sequence_documented = true`
- `future_validation_sequence_executed = false`
- `stop_conditions_documented = true`
- `existing_twilio_retell_number_untouched_invariant = true`
- `decision_tree_documented = true`
- `safety_guardrails_documented = true`
- `explicit_recommendation_documented = true`
- `next_step = request_narrow_clean_vapi_managed_test_number_approval_then_execute_pstn_to_backend_validation`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`
- `current_twilio_retell_route_status = preserved_untouched`
- `twilio_voice_cutover_status = blocked_pending_vapi_support_or_target`
- `vapi_api_metadata_lookup_status = blocked_by_401`
- `clean_vapi_number_path_status = preferred_next_path_planned_not_executed`
- `clean_vapi_number_approval_status = not_requested`
- `pstn_validation_status = not_approved`
- `no_call_placed = true`
- `no_sms_sent = true`
- `no_config_changed = true`
- `no_number_provisioned = true`
- `NO_CALL_PLACED = true`
- `NO_SMS_SENT = true`
- `NO_CONFIG_CHANGED = true`
- `NO_NUMBER_PROVISIONED = true`
- `no_retry_without_new_approval = true`
- `stop_rule_in_force = no_retry_no_new_call_no_config_change_no_provision_without_new_separate_approval`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was NOT done in this build

- **No provisioning, buying, or selecting of any phone number.** Planning only.
- **No cutover and no config change of any kind.** Decision capture only.
- **No runtime/external action of any kind by Build 262.**
- **No Twilio, Vapi, Retell, Railway, DNS, webhook, or environment change.**
- **No provider connected, no number imported, no credential entered.**
- **No call placed.** **No phone number dialed.** **No new call requested.**
- **No clean-Vapi-number provisioning approval created.** **No call/PSTN validation approval created.**
- **No retry** of the consumed Build 256 approval. **No new approval** assumed or fabricated.
- **No Vapi Test** used; **no Vapi Talk** used; **no browser/webCall**; **no call** placed or received.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio CLI/API** used; **no Twilio config change**.
- **No Retell API** used; **no Retell config change**; **no Retell deletion**.
- **No number released, ported, or deleted.**
- **No Vapi config change**; **no Vapi publish**; **no Railway config change**; **no deploy / redeploy /
  restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the existing number, any Bearer credential value,
  and any IDs/URLs/SIP URIs were **not recorded**; the local secret file
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, URLs, SIP URIs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 262)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
- No phone number bought, provisioned, or selected.
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
- No Twilio cutover approval created.
- No clean-Vapi-number provisioning approval created.
- No call/PSTN validation approval created.
- No number imported into Vapi.
- No provider connected in Vapi.
- No credential entered in Vapi.
- No Retell API used.
- No Retell configuration change.
- No Retell deletion.
- No number released, ported, or deleted.
- No `curl` executed.
- No live webhook called.
- No DNS change.
- No unrelated Railway configuration change.
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
- No secrets printed.
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 575668a`
- `git status --short` → only untracked Build 262 packet files (no modified/staged tracked files)

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, no modified/staged
tracked files, and HEAD == origin/main at `575668a` before edits.

## Next recommended step

Create the **next build** to request the **narrow clean-Vapi-managed test-number approval** (provision/select
and use a clean number assigned to the Test Roofing Assistant only — not touching the existing
Twilio/Retell number), then execute the §6 validation sequence to prove **inbound PSTN → Vapi assistant →
end-of-call report → backend `/webhooks/vapi/call-completed`**. Keep the existing Twilio → Retell route
untouched as rollback. The Twilio cutover (`blocked_pending_vapi_support_or_target`) and the Vapi API lookup
(`blocked_by_401`) remain off the critical path for live roofer testing.

## Files added in Build 262 (this clean-Vapi-number-path trio)

- `docs/CLEAN_VAPI_NUMBER_PATH_BUILD_262.md` (this doc)
- `backend/scripts/verify-clean-vapi-number-path-build-262-readonly.js`
- `scripts/run-clean-vapi-number-path-build-262-dry-run.sh`

Committed alongside the sibling Build 262 API-lookup-401 evidence trio
(`docs/VAPI_API_METADATA_LOOKUP_401_BUILD_262.md` + its verifier + dry-run).
