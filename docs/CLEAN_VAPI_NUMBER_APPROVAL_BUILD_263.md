# Clean Vapi-Managed Test-Number Path — Approval Captured & Provisioning Readiness (Build 263)

Decision token: `CLEAN_VAPI_NUMBER_PATH_APPROVAL_CAPTURED_NARROW_PROVISION_AND_ASSIGN_ONLY_EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED_PROVISIONING_AWAITING_HUMAN_UI_ACTION_NO_CALL_NO_SMS_NO_TWILIO_NO_RETELL_NO_DEPLOY_NO_PSTN_VALIDATION_WITHOUT_NEW_SEPARATE_APPROVAL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `176be0f` (Build 262 closeout), HEAD == origin/main.

## What this build is

Build 263 is a **repo-only approval / provisioning-readiness packet**. It **captures Jason's narrow
approval** for the clean Vapi-managed test-number path (Build 262's selected preferred path), records the
**exact allowed / not-allowed scope**, preserves the existing **Twilio → Retell** number as untouched
rollback, and provides the **exact manual Vapi dashboard checklist + sanitized evidence template** Jason
must use to provision/select and assign the clean test number.

Provisioning/selection **cannot** be performed from this environment: the only programmatic route is the
Vapi API, and the read-only Vapi API key returned **HTTP 401 twice** (Build 262, `blocked_by_401`). No
unapproved API, no Twilio/Retell API, and no faking is permitted. Therefore the provisioning/assignment is a
**human Vapi dashboard (UI) action**, and this packet marks it **`awaiting_human_ui_action`**.

Build 263 places **no** call, sends **no** SMS, makes **no** Twilio or Retell config change, triggers **no**
backend/Railway deploy, uses **no** Vapi Test / Vapi Talk / browser/webCall, runs **no** `curl`/live
webhook, reads/prints **no** secret, does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`, and
does **not** touch the existing Twilio/Retell-routed number. It approves **no** PSTN validation.

- `build_mode = clean_vapi_number_path_approval_capture_repo_only`
- `runtime_action_performed_by_build_263 = false`
- `fix_or_config_change_performed_by_build_263 = false`
- `clean_vapi_number_path_approval_status = captured`
- `clean_vapi_number_provisioning_status = awaiting_human_ui_action`
- `existing_twilio_retell_route_status = preserved_untouched`
- `pstn_validation_status = not_approved`
- `no_call_placed = true`
- `no_sms_sent = true`
- `no_twilio_config_changed = true`
- `no_retell_config_changed = true`
- `no_backend_deploy = true`

## Prerequisite state (carried forward, preserved)

- **Build 262** (commit `176be0f`) — selected the clean Vapi-managed/cleanly-provisioned test-number path
  as the preferred next path (route around the blocked existing-number cutover), with the existing
  Twilio → Retell route preserved untouched. The Vapi API metadata lookup remained `blocked_by_401`.
  - `build_262_prerequisite_commit = 176be0f`
  - `build_262_prerequisite_status = validated`
- **Build 261** (commit `575668a`) — Vapi exposes no exact target/import binding for the existing
  Twilio-provider number; cutover NOT ready.
- **Build 258** (commit `c8a8adb`) — confirmed the existing number's inbound Voice is a Twilio Sip Trunk
  "Retell Trunk" (`TK`-prefixed SID, redacted); true PSTN routes to Retell, not Vapi.
  - `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`

The Build 256 single-true-PSTN-dial approval is **consumed**. This build approves **no** call.

---

## 1. Jason's approval (verbatim)

> I approve the narrow clean Vapi-managed test-number path.
>
> Allowed:
> - Provision or select one clean Vapi-managed or cleanly provisioned test phone number for RoofLeadHQ
>   testing.
> - Assign it to the existing Test Roofing Assistant.
> - Confirm the Vapi webhook/server-message configuration remains pointed to the existing RoofLeadHQ
>   backend path.
> - Capture sanitized evidence of number/provider/assistant assignment.
> - Do not use or change the existing Twilio number that currently routes to Retell.
>
> Not allowed:
> - No call yet.
> - No SMS.
> - No Twilio config changes.
> - No Retell config/API changes.
> - No Railway/backend deploy.
> - No schema/auth/RLS changes.
> - No production data export.
> - No homeowner or roofer contact.
> - No public/live automation activation.
>
> Goal:
> Prepare a clean test number so the next separately approved step can validate true PSTN → Vapi assistant
> → end-of-call report → backend webhook.

- `approval_captured_verbatim = true`
- `approval_scope = narrow_provision_or_select_one_clean_vapi_number_and_assign_to_test_roofing_assistant_only`

## 2. Exact allowed / not-allowed scope

**Allowed (this build's path):**
- Provision **or** select **one** clean Vapi-managed (or cleanly provisioned) test phone number for
  RoofLeadHQ testing.
- Assign it to the existing **Test Roofing Assistant**.
- Confirm the Vapi **webhook / server-message** configuration remains pointed at the existing RoofLeadHQ
  backend path.
- Capture **sanitized evidence** of number / provider / assistant assignment.
- Leave the existing Twilio number (routing to Retell) **unused and unchanged**.

**Not allowed:**
- No call yet. No SMS. No Twilio config changes. No Retell config/API changes. No Railway/backend deploy.
- No schema/auth/RLS changes. No production data export. No homeowner or roofer contact.
- No public/live automation activation.

- `allowed_not_allowed_scope_documented = true`

## 3. Existing Twilio → Retell number (preserved, untouched rollback)

The existing Twilio number whose inbound Voice routes to the Twilio Sip Trunk "Retell Trunk" (Build 258)
remains the rollback and is **not used and not changed** by this build or the clean-number provisioning
step. The clean Vapi test number is **additive and separate**.

- `existing_twilio_retell_route_status = preserved_untouched`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`
- `EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true`

## 4. Why provisioning is a human Vapi UI action (not automated here)

- The only programmatic route to provision/select a Vapi number is the Vapi API, which requires
  `VAPI_API_KEY`. That key returned **HTTP 401 twice** (Build 262), so the API path is `blocked_by_401`.
- The approval explicitly forbids Twilio API/CLI and Retell API, and this build forbids exposing secrets.
- Therefore provisioning/selection + assignment must be performed by **Jason in the Vapi dashboard**, and
  this packet captures the **exact checklist + evidence template** for that UI step.

- `provisioning_requires_human_ui_action = true`
- `provisioning_automation_blocked_reason = vapi_api_blocked_by_401_and_no_other_approved_route`

## 5. Manual Vapi dashboard checklist (Jason performs this UI step)

Perform **only** these steps in the Vapi dashboard. Touch **only** the new clean test number — do **not**
open, edit, or save the existing Twilio/Retell-routed number.

1. **Vapi → Phone Numbers.**
2. **Create or select** one clean **Vapi-managed** (or cleanly provisioned) test number for RoofLeadHQ
   testing. (Do **not** reuse the existing Twilio/Retell number.)
3. **Assign** the number to the existing **Test Roofing Assistant** (inbound assistant).
4. **Confirm provider / status** of the clean number (e.g. provider = Vapi/managed; status = active).
5. **Confirm the webhook / server URL** (server messages) still points at the existing **RoofLeadHQ backend
   path** — read-only confirmation; do **not** change it.
6. **Confirm end-of-call-report / server messages remain enabled** if visible — read-only; do **not**
   change.
7. **Save only** the clean test-number assignment. Do **not** save, edit, or modify the existing
   Twilio/Retell number in any way.

Do **not**: place a call, use Vapi Test / Talk / browser webCall, send SMS, change Twilio or Retell config,
or deploy the backend. This step is provisioning + assignment + read-only confirmation **only**.

- `manual_vapi_dashboard_checklist_documented = true`
- `checklist_touches_only_clean_number = true`

## 6. Sanitized evidence template (Jason reports these back, redacted)

Report values **sanitized** — no raw phone numbers, full IDs, URLs, SIP URIs, tokens, or PII. Use shapes
like `present`/`absent`, `vapi`/`managed`, `active`, or a masked last-2-digits form if needed.

```
CLEAN_VAPI_NUMBER_RECORD_FOUND=
CLEAN_VAPI_NUMBER_PROVIDER=
CLEAN_VAPI_NUMBER_STATUS=
CLEAN_VAPI_NUMBER_ASSIGNED_ASSISTANT=Test Roofing Assistant
WEBHOOK_SERVER_URL_CONFIGURED=
WEBHOOK_AUTH_CONFIGURED=
END_OF_CALL_REPORT_ENABLED=
EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true
NO_CALL_PLACED=true
NO_SMS_SENT=true
NO_TWILIO_CONFIG_CHANGED=true
NO_RETELL_CONFIG_CHANGED=true
NO_BACKEND_DEPLOY=true
```

- `sanitized_evidence_template_documented = true`

## 7. Provisioning status (this build)

Jason has **not** completed the Vapi UI provisioning step within this build, so provisioning is marked
**awaiting human UI action**. When Jason completes the checklist and returns the sanitized evidence, a
follow-up build will record `clean_vapi_number_provisioning_status = completed_sanitized_evidence_captured`
with the evidence fields filled in. **No** PSTN call/validation is approved by either step.

- `clean_vapi_number_provisioning_status = awaiting_human_ui_action`
- `provisioning_evidence_captured_in_this_build = false`

## 8. Stop conditions

Halt immediately and capture sanitized evidence (no retry without a new, separate approval) if any hold:

- Any step would **use or modify the existing Twilio/Retell number** → **stop**.
- Any prompt to **place a call**, use Vapi Test / Talk / browser webCall, or send SMS → **stop**.
- Any prompt to change **Twilio or Retell config**, or to **deploy** the backend → **stop**.
- Any request to expose or print a **secret**, or to use an **unapproved API** → **stop**.
- Any unexpected SMS or any real homeowner/roofer traffic → **stop**.

- `stop_conditions_documented = true`
- `no_retry_without_new_approval = true`

## 9. Decision logic / next step

- If Jason completes the UI provisioning + assignment and returns sanitized evidence → record
  `clean_vapi_number_provisioning_status = completed_sanitized_evidence_captured` and proceed to request a
  **separate** narrow approval for the **single controlled true PSTN validation call** (from a Jason-owned
  phone) to prove inbound PSTN → Vapi assistant → end-of-call report → backend
  `/webhooks/vapi/call-completed`.
- If the clean number cannot be provisioned/assigned cleanly → **stop** and reassess (Vapi support, or the
  Retell-pivot path from Build 262).
- The existing Twilio/Retell number stays untouched throughout.
- **No** PSTN validation approval is created in Build 263.

- `decision_logic_documented = true`
- `pstn_validation_status = not_approved`
- `next_step = jason_completes_vapi_ui_provisioning_then_request_separate_pstn_validation_approval`

---

## Status fields (machine-checkable)

- `build_mode = clean_vapi_number_path_approval_capture_repo_only`
- `runtime_action_performed_by_build_263 = false`
- `fix_or_config_change_performed_by_build_263 = false`
- `build_262_prerequisite_commit = 176be0f`
- `build_262_prerequisite_status = validated`
- `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- `approval_captured_verbatim = true`
- `approval_scope = narrow_provision_or_select_one_clean_vapi_number_and_assign_to_test_roofing_assistant_only`
- `allowed_not_allowed_scope_documented = true`
- `provisioning_requires_human_ui_action = true`
- `provisioning_automation_blocked_reason = vapi_api_blocked_by_401_and_no_other_approved_route`
- `manual_vapi_dashboard_checklist_documented = true`
- `sanitized_evidence_template_documented = true`
- `provisioning_evidence_captured_in_this_build = false`
- `stop_conditions_documented = true`
- `decision_logic_documented = true`
- `next_step = jason_completes_vapi_ui_provisioning_then_request_separate_pstn_validation_approval`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`
- `clean_vapi_number_path_approval_status = captured`
- `clean_vapi_number_provisioning_status = awaiting_human_ui_action`
- `existing_twilio_retell_route_status = preserved_untouched`
- `EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true`
- `pstn_validation_status = not_approved`
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

- **No provisioning executed by Build 263.** The provisioning/assignment is a human Vapi UI action,
  documented as a checklist; this build did not perform it.
- **No use or change of the existing Twilio/Retell number.**
- **No PSTN validation approval created.** **No call/PSTN validation approved.**
- **No runtime/external action of any kind by Build 263.**
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

## Safety invariants (held by Build 263)

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
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 176be0f`
- `git status --short` → clean

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `176be0f` before edits.

## Next recommended step

Jason completes the **§5 manual Vapi dashboard checklist** (provision/select one clean Vapi-managed test
number → assign to Test Roofing Assistant → confirm provider/status, webhook/server URL, end-of-call-report
enabled; existing Twilio/Retell number untouched) and returns the **§6 sanitized evidence**. The next build
records `clean_vapi_number_provisioning_status = completed_sanitized_evidence_captured` and then requests a
**separate** narrow approval for the single controlled true PSTN validation call. **No** call, SMS, Twilio/
Retell change, or deploy until that separate approval exists as its own build artifact.

## Files added in Build 263

- `docs/CLEAN_VAPI_NUMBER_APPROVAL_BUILD_263.md` (this doc)
- `backend/scripts/verify-clean-vapi-number-approval-build-263-readonly.js`
- `scripts/run-clean-vapi-number-approval-build-263-dry-run.sh`
