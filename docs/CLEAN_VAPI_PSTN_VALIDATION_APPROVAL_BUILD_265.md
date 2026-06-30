# Clean Vapi-Managed Test-Number — Single Controlled True PSTN Validation Call Approval + One-Call Evidence Flow (Build 265)

Decision token: `CLEAN_VAPI_PSTN_VALIDATION_APPROVAL_CAPTURED_EXACTLY_ONE_TRUE_PSTN_CALL_FROM_JASON_OWNED_PHONE_TO_CLEAN_VAPI_MANAGED_TEST_NUMBER_ONLY_NO_EXISTING_TWILIO_RETELL_NUMBER_NO_RETRY_NO_VAPI_TEST_NO_VAPI_TALK_NO_BROWSER_WEBCALL_NO_SMS_NO_TWILIO_NO_RETELL_NO_DEPLOY_EXECUTION_AWAITING_HUMAN_SINGLE_CALL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `8e36101` (Build 264 closeout), HEAD == origin/main.

## What this build is

Build 265 is a **repo-only approval / one-call evidence-flow packet**. It **captures Jason's approval** for
**exactly one** controlled true PSTN validation call from a **Jason-owned physical phone / iPhone Phone
app** to the **clean Vapi-managed Test Number** (provisioned + assigned to the Test Roofing Assistant in
Build 264), records the **exact allowed / not-allowed scope** and **stop conditions**, preserves the
existing **Twilio → Retell** number as untouched rollback, and provides the **exact manual single-call
execution checklist + sanitized evidence template** Jason uses to run the one call.

The actual call is a **human physical-phone action** — the agent places **no** call. If Jason performs the
single call and returns sanitized evidence within this build, it is captured; otherwise execution is marked
**`awaiting_human_single_call`**. Evidence is **never invented**.

Build 265 places **no** call itself, sends **no** SMS, makes **no** Twilio or Retell config change, triggers
**no** backend/Railway deploy, uses **no** Vapi Test / Vapi Talk / browser/webCall, runs **no** `curl`/live
webhook, reads/prints **no** secret, does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`, and
does **not** touch the existing Twilio/Retell-routed number. Exactly **one** call is approved, with **no
retry**.

- `build_mode = clean_vapi_pstn_validation_approval_capture_repo_only`
- `runtime_action_performed_by_build_265 = false`
- `fix_or_config_change_performed_by_build_265 = false`
- `pstn_validation_approval_status = captured`
- `pstn_validation_execution_status = awaiting_human_single_call`
- `clean_vapi_number_target_status = selected_for_one_call_validation`
- `existing_twilio_retell_route_status = preserved_untouched`
- `no_call_placed_by_agent = true`
- `no_sms_sent = true`
- `no_twilio_config_changed = true`
- `no_retell_config_changed = true`
- `no_backend_deploy = true`

## Prerequisite state (carried forward, preserved)

- **Build 264** (commit `8e36101`) — captured sanitized evidence that the clean Vapi-managed Test Number is
  created/saved/visible (provider = Vapi) and assigned to the Test Roofing Assistant, with the existing
  Twilio → Retell number untouched; recorded that the assistant-level backend webhook + end-of-call-report
  setup was previously confirmed while the phone-number-level custom Server URL was not visibly configured;
  prepared (not executed) this PSTN validation path.
  - `build_264_prerequisite_commit = 8e36101`
  - `build_264_prerequisite_status = validated`
- **Build 263** (commit `846eb98`) — captured the narrow approval + manual provisioning checklist for the
  clean Vapi number.
- **Build 258** (commit `c8a8adb`) — confirmed the existing number's inbound Voice is a Twilio Sip Trunk
  "Retell Trunk" (`TK`-prefixed SID, redacted); true PSTN routes to Retell, not Vapi.
  - `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`

This build captures the **single-call** approval. The prior Build 256 single-true-PSTN-dial approval remains
**consumed** and is **not** reused; this is a **new, separate** approval scoped to the clean Vapi number.

---

## 1. Jason's approval (verbatim)

> I approve one controlled true PSTN validation call to the clean Vapi-managed Test Number only.
>
> Allowed:
> - Place exactly one true PSTN call from my Jason-owned physical phone/iPhone Phone app to the clean
>   Vapi-managed Test Number.
> - Do not use Vapi Test.
> - Do not use Vapi Talk.
> - Do not use browser/webCall.
> - Confirm whether the call appears in Vapi as a Phone/PSTN call record.
> - Confirm whether end-of-call-report is observed.
> - Confirm whether the RoofLeadHQ backend webhook receives/processes the final report.
> - Capture sanitized evidence only.
>
> Not allowed:
> - No call to the existing Twilio/Retell-routed number.
> - No retry without separate approval.
> - No SMS.
> - No Twilio config changes.
> - No Retell config/API changes.
> - No Railway/backend deploy.
> - No schema/auth/RLS changes.
> - No production data export.
> - No homeowner or roofer contact.
> - No public/live automation activation.
>
> Stop conditions:
> - Stop if the call does not appear in Vapi as Phone/PSTN.
> - Stop if no end-of-call-report is observed.
> - Stop if backend webhook returns non-2xx or validation error.
> - Stop after the single call attempt regardless of outcome.
>
> Goal:
> Validate true PSTN → clean Vapi Test Number → Test Roofing Assistant → end-of-call report → RoofLeadHQ
> backend webhook.

- `approval_captured_verbatim = true`
- `approval_scope = exactly_one_true_pstn_call_from_jason_owned_phone_to_clean_vapi_managed_test_number_only`

## 2. Exact allowed / not-allowed scope

**Allowed (this build's path):**
- Place **exactly one** true PSTN call from Jason's **own physical phone / iPhone Phone app** to the **clean
  Vapi-managed Test Number**.
- Confirm whether the call appears in Vapi as a **Phone/PSTN** call record.
- Confirm whether an **end-of-call-report** is observed.
- Confirm whether the **RoofLeadHQ backend webhook** receives/processes the final report.
- Capture **sanitized evidence only**.

**Not allowed:**
- No call to the existing Twilio/Retell-routed number. No retry without separate approval. No SMS.
- No Twilio config changes. No Retell config/API changes. No Railway/backend deploy. No schema/auth/RLS
  changes. No production data export. No homeowner or roofer contact. No public/live automation activation.
- No Vapi Test. No Vapi Talk. No browser/webCall.

- `allowed_not_allowed_scope_documented = true`

## 3. Stop conditions

Halt immediately (and capture whatever sanitized evidence exists; **no retry** without a new, separate
approval) if any hold:

- **Stop** if the call does **not** appear in Vapi as a **Phone/PSTN** call.
- **Stop** if **no end-of-call-report** is observed.
- **Stop** if the backend webhook returns **non-2xx** or a validation error.
- **Stop after the single call attempt regardless of outcome.**

- `stop_conditions_documented = true`
- `no_retry_without_new_approval = true`

## 4. Existing Twilio → Retell number (preserved, untouched rollback)

The existing Twilio number whose inbound Voice routes to the Twilio Sip Trunk "Retell Trunk" (Build 258)
remains the rollback and is **not called, used, or changed** by this build or the single-call validation.
The validation call targets **only** the clean Vapi-managed Test Number.

- `existing_twilio_retell_route_status = preserved_untouched`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`
- `EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true`

## 5. Manual single-call execution checklist (Jason performs this)

Perform **only** these steps. This is a **human physical-phone** action — not Vapi Test/Talk/webCall.

1. **Confirm the target** is the **clean Vapi-managed Test Number** (the Build 264 "Test Number", provider =
   Vapi) — **not** the existing Twilio/Retell-routed number. Double-check the digits before dialing.
2. Use **Jason's own physical phone / iPhone Phone app** only.
3. **Place exactly one** true PSTN call to the clean Vapi-managed Test Number.
4. Do **not** use Vapi Test, Vapi Talk, or browser/webCall.
5. **End the call normally** after a short assistant interaction sufficient to produce a final report (let
   the Test Roofing Assistant answer, speak briefly, then hang up normally).
6. **Do not retry** regardless of outcome — one attempt only.
7. In the Vapi dashboard, **read-only confirm** (sanitized): whether a **Phone/PSTN** call record appeared,
   whether a **call id** is present, whether an **end-of-call-report** is observed, and whether the Vapi
   webhook/server-message log shows the report being sent.
8. Confirm (sanitized) whether the **RoofLeadHQ backend webhook** received/processed the final report and
   the response status class (e.g. `2xx` / `non-2xx`), without exposing raw URLs/IDs/secrets.

Do **not**: call the existing Twilio/Retell number, place more than one call, retry, send SMS, change
Twilio/Retell config, or deploy. Report values **sanitized** only.

- `manual_single_call_checklist_documented = true`
- `checklist_targets_only_clean_number = true`

## 6. Sanitized evidence template (Jason reports these back, redacted)

Report values **sanitized** — no raw phone numbers, full call IDs, full URLs, SIP URIs, tokens, secrets, or
PII. Use shapes like `present`/`absent`, `phone`/`pstn`, `2xx`/`non-2xx`, `true`/`false`, or a masked
last-2-digits form if absolutely needed. **Do not invent evidence** — leave a field blank if not observed.

```
PSTN_VALIDATION_APPROVAL_STATUS=captured
CALL_ATTEMPT_COUNT=
CALL_PLACED_FROM=jason_owned_physical_phone
CALL_TARGET=clean_vapi_managed_test_number
EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true
VAPI_CALL_RECORD_FOUND=
VAPI_CALL_TYPE=
VAPI_CALL_ID_PRESENT=
END_OF_CALL_REPORT_OBSERVED=
VAPI_WEBHOOK_LOG_OBSERVED=
BACKEND_WEBHOOK_RECEIVED=
BACKEND_WEBHOOK_RESPONSE_STATUS=
LEAD_OR_FINAL_REPORT_PROCESSING_STATUS=
STOP_CONDITION_TRIGGERED=
NO_RETRY_PERFORMED=true
NO_SMS_SENT=true
NO_TWILIO_CONFIG_CHANGED=true
NO_RETELL_CONFIG_CHANGED=true
NO_BACKEND_DEPLOY=true
```

- `sanitized_evidence_template_documented = true`
- `evidence_not_invented = true`

## 7. Execution status (this build)

Jason has **not** performed the single PSTN call within this build, so execution is marked **awaiting human
single call**. When Jason completes the §5 checklist and returns the §6 sanitized evidence, a follow-up
build records `pstn_validation_execution_status = completed_sanitized_evidence_captured` with the evidence
fields filled in (or the triggered stop condition). **No retry** is approved.

- `pstn_validation_execution_status = awaiting_human_single_call`
- `call_executed_in_this_build = false`
- `evidence_captured_in_this_build = false`

## 8. Decision logic / next step

- If Jason places the **single** call and returns sanitized evidence → record
  `pstn_validation_execution_status = completed_sanitized_evidence_captured` and assess: did the call appear
  as Phone/PSTN, was an end-of-call-report observed, did the backend webhook return 2xx? If all green →
  proceed toward first roofer test wiring. If any stop condition triggers → **stop**, capture evidence, and
  reassess (no retry without a new, separate approval).
- If Jason does not place the call in this build → execution stays `awaiting_human_single_call`; the next
  build captures the evidence after he runs the one call.
- The existing Twilio/Retell number stays untouched throughout.
- **Exactly one** call is approved; **no retry** is approved by Build 265.

- `decision_logic_documented = true`
- `next_step = jason_places_single_pstn_call_to_clean_vapi_test_number_then_capture_sanitized_evidence`

---

## Status fields (machine-checkable)

- `build_mode = clean_vapi_pstn_validation_approval_capture_repo_only`
- `runtime_action_performed_by_build_265 = false`
- `fix_or_config_change_performed_by_build_265 = false`
- `build_264_prerequisite_commit = 8e36101`
- `build_264_prerequisite_status = validated`
- `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- `approval_captured_verbatim = true`
- `approval_scope = exactly_one_true_pstn_call_from_jason_owned_phone_to_clean_vapi_managed_test_number_only`
- `allowed_not_allowed_scope_documented = true`
- `stop_conditions_documented = true`
- `manual_single_call_checklist_documented = true`
- `checklist_targets_only_clean_number = true`
- `sanitized_evidence_template_documented = true`
- `evidence_not_invented = true`
- `pstn_validation_approval_status = captured`
- `pstn_validation_execution_status = awaiting_human_single_call`
- `call_executed_in_this_build = false`
- `evidence_captured_in_this_build = false`
- `clean_vapi_number_target_status = selected_for_one_call_validation`
- `existing_twilio_retell_route_status = preserved_untouched`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`
- `EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true`
- `decision_logic_documented = true`
- `next_step = jason_places_single_pstn_call_to_clean_vapi_test_number_then_capture_sanitized_evidence`
- `no_call_placed_by_agent = true`
- `no_sms_sent = true`
- `no_twilio_config_changed = true`
- `no_retell_config_changed = true`
- `no_backend_deploy = true`
- `NO_RETRY_PERFORMED = true`
- `NO_SMS_SENT = true`
- `NO_TWILIO_CONFIG_CHANGED = true`
- `NO_RETELL_CONFIG_CHANGED = true`
- `NO_BACKEND_DEPLOY = true`
- `no_retry_without_new_approval = true`
- `stop_rule_in_force = exactly_one_call_no_retry_no_existing_number_no_sms_no_twilio_no_retell_no_deploy_no_vapi_test_talk_webcall_without_new_separate_approval`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was NOT done in this build

- **No call placed by Build 265 / the agent.** The single call is a human physical-phone action.
- **No call to the existing Twilio/Retell number.** **No use or change of the existing Twilio/Retell
  number.**
- **No more than one call approved.** **No retry approved.**
- **No runtime/external action of any kind by Build 265.**
- **No SMS sent.**
- **No Twilio config change.** **No Twilio CLI/API used.**
- **No Retell config change.** **No Retell API used.** **No Retell deletion.**
- **No backend/Railway deploy / redeploy / restart.** **No Railway variable set.**
- **No Vapi config change by this build.** **No Vapi publish.**
- **No Vapi Test** used; **no Vapi Talk** used; **no browser/webCall**.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No schema / auth / RLS / security-policy change.**
- **No production data export.** **No billing / CRM / public / live automation.**
- **No homeowner or roofer contact.**
- **No invented evidence.**
- **No secret value** read, typed, printed, or committed; the local secret file
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, URLs, SIP URIs, or PII** appear in this packet.

## Safety invariants (held by Build 265)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic from third parties.
- No agent-placed call.
- No call to the existing Twilio/Retell number.
- No more than one call approved.
- No retry of any call.
- No retry of any prior consumed approval.
- No Vapi Test used.
- No Vapi Talk used.
- No browser/webCall performed.
- No SMS sent.
- No SMS/messaging route change.
- No Twilio call placed or routed by the agent.
- No Twilio CLI/API used.
- No Twilio configuration change.
- No Twilio Voice cutover executed.
- No Twilio cutover approval created.
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
- No invented evidence.
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No backend / Railway deploy / redeploy / restart.
- No secrets printed.
- No secret committed.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 8e36101`
- `git status --short` → clean

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `8e36101` before edits.

## Next recommended step (exact human action)

Jason performs the **§5 manual single-call execution checklist**: confirm the target is the clean
Vapi-managed Test Number (not the existing Twilio/Retell number), use his own physical phone / iPhone Phone
app, place **exactly one** true PSTN call, let the Test Roofing Assistant answer briefly, end the call
normally, **do not retry**, then return the **§6 sanitized evidence**. The next build records
`pstn_validation_execution_status = completed_sanitized_evidence_captured` (or the triggered stop
condition). **No** second call, retry, SMS, Twilio/Retell change, or deploy without a new, separate
approval.

## Files added in Build 265

- `docs/CLEAN_VAPI_PSTN_VALIDATION_APPROVAL_BUILD_265.md` (this doc)
- `backend/scripts/verify-clean-vapi-pstn-validation-approval-build-265-readonly.js`
- `scripts/run-clean-vapi-pstn-validation-approval-build-265-dry-run.sh`
