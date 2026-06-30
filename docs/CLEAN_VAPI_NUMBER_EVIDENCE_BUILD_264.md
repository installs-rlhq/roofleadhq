# Clean Vapi-Managed Test-Number — Provisioning/Assignment Evidence Captured & Next PSTN Validation Prep (Build 264)

Decision token: `CLEAN_VAPI_NUMBER_PROVISIONING_EVIDENCE_CAPTURED_ASSIGNED_TEST_ROOFING_ASSISTANT_ASSISTANT_LEVEL_WEBHOOK_EOCR_PREVIOUSLY_CONFIRMED_PHONE_NUMBER_CUSTOM_SERVER_URL_NOT_VISIBLE_EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED_PSTN_VALIDATION_NOT_APPROVED_NEXT_STEP_SEPARATE_SINGLE_PSTN_APPROVAL_NO_CALL_NO_SMS_NO_TWILIO_NO_RETELL_NO_DEPLOY`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `846eb98` (Build 263 closeout), HEAD == origin/main.

## What this build is

Build 264 is a **repo-only evidence packet**. It captures the **sanitized evidence**, reported by Jason from
the Vapi dashboard, that the **clean Vapi-managed test number** approved in Build 263 has now been
**created/saved/visible** and **assigned to the Test Roofing Assistant**, while the existing
**Twilio → Retell** number remains **untouched** as rollback. It records the **nuance** that the
**assistant-level** backend webhook + end-of-call-report configuration was **previously confirmed** on the
Test Roofing Assistant, but the **phone-number-level custom Server URL** field on the clean number screen
appears **empty / placeholder / not visibly configured** — so we do **not** overclaim a phone-number-level
custom server URL. It then **prepares, but does not execute,** the next narrow single-call PSTN validation
approval path.

Build 264 places **no** call, sends **no** SMS, makes **no** Twilio or Retell config change, triggers **no**
backend/Railway deploy, uses **no** Vapi Test / Vapi Talk / browser/webCall, runs **no** `curl`/live
webhook, reads/prints **no** secret, does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`, and
does **not** touch the existing Twilio/Retell-routed number. It **creates no PSTN validation approval** and
**executes no call approval** — it only documents the narrow path for the *next* separate approval.

- `build_mode = clean_vapi_number_evidence_capture_repo_only`
- `runtime_action_performed_by_build_264 = false`
- `fix_or_config_change_performed_by_build_264 = false`
- `clean_vapi_number_provisioning_status = completed_sanitized_evidence_captured`
- `clean_vapi_number_assistant_assignment = Test Roofing Assistant`
- `assistant_level_webhook_eocr_status = previously_confirmed`
- `phone_number_level_custom_server_url_status = not_visible_or_empty`
- `existing_twilio_retell_route_status = preserved_untouched`
- `pstn_validation_status = not_approved`
- `next_step = separate_single_pstn_validation_approval`
- `no_call_placed = true`
- `no_sms_sent = true`
- `no_twilio_config_changed = true`
- `no_retell_config_changed = true`
- `no_backend_deploy = true`

## Prerequisite state (carried forward, preserved)

- **Build 263** (commit `846eb98`) — captured Jason's narrow approval for the clean Vapi-managed
  test-number path, documented the manual Vapi dashboard checklist + sanitized evidence template, preserved
  the existing Twilio → Retell route untouched, and marked provisioning `awaiting_human_ui_action`. No call,
  SMS, Twilio/Retell change, or deploy.
  - `build_263_prerequisite_commit = 846eb98`
  - `build_263_prerequisite_status = validated`
- **Build 262** (commit `176be0f`) — selected the clean Vapi-managed test-number path as the preferred next
  path; Vapi API metadata lookup remained `blocked_by_401`.
- **Build 258** (commit `c8a8adb`) — confirmed the existing number's inbound Voice is a Twilio Sip Trunk
  "Retell Trunk" (`TK`-prefixed SID, redacted); true PSTN routes to Retell, not Vapi.
  - `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`

The Build 263 provisioning checklist has now been **completed by Jason in the Vapi UI**; this build records
the resulting sanitized evidence. The Build 256 single-true-PSTN-dial approval remains **consumed**. This
build approves **no** new call.

---

## 1. Human Vapi UI evidence (reported by Jason, sanitized)

Jason performed the Build 263 §5 manual Vapi dashboard checklist and reported the following from the Vapi
dashboard. Values are recorded sanitized — no raw phone numbers, full IDs, URLs, SIP URIs, tokens, or PII.

- Vapi → Phone Numbers now shows **2 phone numbers**:
  1. The **existing Twilio · Test Roofing** number (the Twilio/Retell-routed rollback number).
  2. The **new clean Vapi · Test Number**.
- The new clean number is labeled **Test Number**; provider is **Vapi**; it is **created/saved/visible**.
- Authorization credential = **RoofLeadHQ Production Webhook Secret (Bearer Token)**;
  **Authentication Enabled** is visible.
- HTTP Headers: **no headers configured**.
- Static IP Addresses toggle: **off**.
- **Inbound Settings → Assistant = Test Roofing Assistant.**
- **No Squad** available; **No Workflow** available.
- **Fallback Destination** field shows a placeholder/example-style value (no concrete destination set).
- The existing **Twilio/Retell-routed number remains present and was not modified**.
- **No call** placed; **no SMS** sent; **no Twilio config** changed; **no Retell config** changed; **no
  backend deploy** occurred.

- `human_vapi_ui_evidence_captured = true`
- `clean_vapi_number_label = Test Number`
- `vapi_phone_numbers_count = 2`

## 2. Important nuance — phone-number-level custom Server URL not visibly configured

On the clean Vapi number screen, the **phone-number-level custom Server URL** field appears
**empty / placeholder / not visibly configured**. Prior evidence already confirmed that the **Test Roofing
Assistant** carries the RoofLeadHQ backend webhook/server URL and has end-of-call-report / server messages
enabled. Therefore:

- We record the webhook/server-message + EOCR configuration as **assistant-level, previously confirmed**.
- We do **not** overclaim that the clean number itself has a **phone-number-level** custom Server URL
  configured.

- `assistant_level_webhook_eocr_status = previously_confirmed`
- `phone_number_level_custom_server_url_status = not_visible_or_empty`
- `do_not_overclaim_phone_number_level_server_url = true`

## 3. Sanitized evidence (captured this build)

```
CLEAN_VAPI_NUMBER_RECORD_FOUND=true
CLEAN_VAPI_NUMBER_PROVIDER=Vapi
CLEAN_VAPI_NUMBER_STATUS=created_saved_visible
CLEAN_VAPI_NUMBER_ASSIGNED_ASSISTANT=Test Roofing Assistant
WEBHOOK_SERVER_URL_CONFIGURED=assistant_level_previously_confirmed_phone_number_custom_server_url_not_visible_or_empty
WEBHOOK_AUTH_CONFIGURED=true
END_OF_CALL_REPORT_ENABLED=previously_confirmed_on_Test_Roofing_Assistant_not_visible_on_phone_number_screen
EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true
NO_CALL_PLACED=true
NO_SMS_SENT=true
NO_TWILIO_CONFIG_CHANGED=true
NO_RETELL_CONFIG_CHANGED=true
NO_BACKEND_DEPLOY=true
```

- `sanitized_evidence_captured = true`
- `clean_vapi_number_provisioning_status = completed_sanitized_evidence_captured`

## 4. Existing Twilio → Retell number (preserved, untouched rollback)

The existing Twilio number whose inbound Voice routes to the Twilio Sip Trunk "Retell Trunk" (Build 258)
remains the rollback and is **not used and not changed** by this build or the completed clean-number
provisioning step. The clean Vapi test number is **additive and separate**; both numbers are now present in
Vapi → Phone Numbers.

- `existing_twilio_retell_route_status = preserved_untouched`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`
- `EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true`

## 5. Next strategic decision — request a separate single controlled true PSTN validation call

Prepared **but NOT executed** in this build. The next step is to request a **separate, narrow approval** for
**one** controlled true PSTN validation call from a **Jason-owned physical phone** to the **clean
Vapi-managed Test Number**, to prove: inbound true PSTN → Vapi Test Roofing Assistant → end-of-call report →
backend webhook processing.

**Narrow scope of the future PSTN validation approval:**
- **One call only.**
- **Jason-owned phone only** (originating).
- **Clean Vapi-managed Test Number only** (destination).
- **No** existing Twilio/Retell number used.
- **No** SMS.
- **No** Twilio/Retell changes.

**Stop conditions for that future run:**
- **Stop** if the call does **not** appear in Vapi as a Phone/PSTN call.
- **Stop** if there is **no** end-of-call-report.
- **Stop** if the backend returns a **non-2xx** or a validation error.

- `pstn_validation_status = not_approved`
- `pstn_validation_approval_created_in_this_build = false`
- `pstn_validation_call_executed_in_this_build = false`
- `next_step = separate_single_pstn_validation_approval`

## 6. Expected validation evidence fields for the next build/run (NOT executed)

These are the fields the *next, separately approved* build/run will fill in. They are **templated empty
here** and **no call is executed**:

```
PSTN_VALIDATION_APPROVAL_STATUS=
CALL_PLACED=
CALL_TARGET=clean_vapi_managed_test_number
VAPI_CALL_RECORD_FOUND=
VAPI_CALL_TYPE=
END_OF_CALL_REPORT_OBSERVED=
BACKEND_WEBHOOK_RECEIVED=
BACKEND_WEBHOOK_RESPONSE_STATUS=
LEAD_OR_FINAL_REPORT_PROCESSING_STATUS=
EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true
NO_SMS_SENT=true
NO_TWILIO_CONFIG_CHANGED=true
NO_RETELL_CONFIG_CHANGED=true
```

- `pstn_validation_evidence_template_documented = true`

## 7. Stop conditions (this build)

Halt immediately and capture sanitized evidence (no retry without a new, separate approval) if any hold:

- Any step would **use or modify the existing Twilio/Retell number** → **stop**.
- Any prompt to **place a call**, use Vapi Test / Talk / browser webCall, or send SMS → **stop**.
- Any prompt to change **Twilio or Retell config**, or to **deploy** the backend → **stop**.
- Any request to expose or print a **secret**, or to use an **unapproved API** → **stop**.
- Any unexpected SMS or any real homeowner/roofer traffic → **stop**.

- `stop_conditions_documented = true`
- `no_retry_without_new_approval = true`

## 8. Decision logic / next step

- The clean Vapi-managed Test Number is **provisioned, saved, visible, and assigned to the Test Roofing
  Assistant**; evidence is captured. The existing Twilio/Retell number is **untouched**.
- The webhook/EOCR path is **assistant-level, previously confirmed**; the phone-number-level custom Server
  URL is **not visibly configured** (do not overclaim).
- Next: request a **separate** narrow approval for the **single controlled true PSTN validation call** (from
  a Jason-owned phone) to the clean Vapi Test Number, with the stop conditions in §5.
- The existing Twilio/Retell number stays untouched throughout.
- **No** PSTN validation approval is created in Build 264.

- `decision_logic_documented = true`
- `pstn_validation_status = not_approved`
- `next_step = separate_single_pstn_validation_approval`

---

## Status fields (machine-checkable)

- `build_mode = clean_vapi_number_evidence_capture_repo_only`
- `runtime_action_performed_by_build_264 = false`
- `fix_or_config_change_performed_by_build_264 = false`
- `build_263_prerequisite_commit = 846eb98`
- `build_263_prerequisite_status = validated`
- `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- `human_vapi_ui_evidence_captured = true`
- `sanitized_evidence_captured = true`
- `clean_vapi_number_provisioning_status = completed_sanitized_evidence_captured`
- `clean_vapi_number_assistant_assignment = Test Roofing Assistant`
- `assistant_level_webhook_eocr_status = previously_confirmed`
- `phone_number_level_custom_server_url_status = not_visible_or_empty`
- `do_not_overclaim_phone_number_level_server_url = true`
- `existing_twilio_retell_route_status = preserved_untouched`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`
- `EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true`
- `pstn_validation_status = not_approved`
- `pstn_validation_approval_created_in_this_build = false`
- `pstn_validation_call_executed_in_this_build = false`
- `pstn_validation_evidence_template_documented = true`
- `stop_conditions_documented = true`
- `decision_logic_documented = true`
- `next_step = separate_single_pstn_validation_approval`
- `no_call_placed = true`
- `no_sms_sent = true`
- `no_twilio_config_changed = true`
- `no_retell_config_changed = true`
- `no_backend_deploy = true`
- `NO_CALL_PLACED = true`
- `NO_SMS_SENT = true`
- `NO_TWILIO_CONFIG_CHANGED = true`
- `NO_RETELL_CONFIG_CHANGED = true`
- `NO_BACKEND_DEPLOY = true`
- `no_retry_without_new_approval = true`
- `stop_rule_in_force = no_call_no_sms_no_twilio_no_retell_no_deploy_no_pstn_validation_without_new_separate_approval`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was NOT done in this build

- **No provisioning executed by Build 264.** The provisioning/assignment was a human Vapi UI action,
  completed by Jason; this build only records the resulting sanitized evidence.
- **No use or change of the existing Twilio/Retell number.**
- **No PSTN validation approval created.** **No call/PSTN validation approved.** **No call approval
  executed.**
- **No runtime/external action of any kind by Build 264.**
- **No call placed.** **No phone number dialed.** **No new call requested.**
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
- **No secret value** read, typed, printed, or committed; the local secret file
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, URLs, SIP URIs, or PII** appear in this packet.

## Safety invariants (held by Build 264)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
- No new call requested or placed.
- No use or change of the existing Twilio/Retell number.
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
- No call/PSTN validation approval created.
- No PSTN validation call executed.
- No provider connected by this build.
- No credential entered by this build.
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
- No backend / Railway deploy / redeploy / restart.
- No secrets printed.
- No secret committed.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 846eb98`
- `git status --short` → clean

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `846eb98` before edits.

## Next recommended step

Request a **separate** narrow approval for the **single controlled true PSTN validation call** (§5): one
call only, from a Jason-owned physical phone, to the clean Vapi-managed Test Number, no existing
Twilio/Retell number, no SMS, no Twilio/Retell changes, with the stop conditions in §5. The next build
records the §6 expected validation evidence fields. **No** call, SMS, Twilio/Retell change, or deploy until
that separate approval exists as its own build artifact.

## Files added in Build 264

- `docs/CLEAN_VAPI_NUMBER_EVIDENCE_BUILD_264.md` (this doc)
- `backend/scripts/verify-clean-vapi-number-evidence-build-264-readonly.js`
- `scripts/run-clean-vapi-number-evidence-build-264-dry-run.sh`
