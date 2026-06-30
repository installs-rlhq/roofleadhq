# Vapi True PSTN Dial — Unexpected Retell Path Stop-Condition Evidence (Build 256)

Decision token: `VAPI_TRUE_PSTN_DIAL_HIT_UNEXPECTED_RETELL_PATH_NO_VAPI_CALL_RECORD_STOP_CONDITION_TRIGGERED_NO_RETRY_WITHOUT_NEW_APPROVAL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `1838a7d` (Build 255 closeout), HEAD == origin/main.

## What this build is

Build 256 **captures the sanitized stop-condition evidence** from the single approved true PSTN
validation dial that was authorized and guarded by Build 255. Jason performed exactly **one** true PSTN
dial out-of-band from his own physical phone / iPhone Phone app to the Vapi number assigned to Test
Roofing Assistant. The Build 255 fail-closed guard was rerun immediately before the dial and **passed**.

The dial did **not** produce the intended Vapi call record. Instead the observed outcome indicates the
dial reached an **unexpected Retell / Twilio path**, not the intended Vapi Test Roofing Assistant path.
This is a **stop-condition event**: the approved path was Vapi, and unexpected Retell/SMS-style
notification behavior occurred. The single approval is now **consumed**. **No retry is permitted without a
new, separate approval.** No further config changes are made here.

Build 256 itself is a **repo-only, read-only evidence-capture build.** It writes only this doc, a
read-only verifier, and a dry-run wrapper. Build 256 places **no** call, dials **no** phone number, uses
**no** Vapi **Test**, uses **no** Vapi **Talk**, performs **no** browser/webCall, runs **no** `curl`,
calls **no** live webhook, sends **no** SMS, uses **no** Twilio, contacts **no** homeowner or roofer,
changes **no** Railway/Vapi/Twilio/Retell config, publishes **no** Vapi assistant, triggers **no** deploy,
reads/prints **no** secret, and does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = true_pstn_dial_retell_stop_condition_evidence_capture`
- `runtime_action_performed_by_build_256 = false`
- `pstn_dial_performed_by_jason_out_of_band = true`
- `stop_condition_triggered = true`

## Prerequisite validated state (already proven)

- **Build 255** (commit `1838a7d`) — captured Jason's verbatim approval for exactly **one** true PSTN
  validation dial from his own physical phone / iPhone Phone app to the Vapi number assigned to Test
  Roofing Assistant (no Vapi Test, no Vapi Talk, sanitized evidence only, no retry without new approval),
  and built a fresh fail-closed guard for that single future dial.
  - `build_255_prerequisite_commit = 1838a7d`
  - `build_255_prerequisite_status = validated`
  - `build_255_guard_passed_before_action = true`

The Build 255 guard was **rerun immediately before dialing and passed**, satisfying the fail-closed
precondition for the single approved dial.

---

## 1. The single approved dial (consumed)

- Jason performed **exactly one** true PSTN dial from his own physical phone / iPhone Phone app to the
  Vapi number assigned to Test Roofing Assistant.
- `true_pstn_dial_performed = true`
- `one_dial_limit = true`
- `true_pstn_dial_count = 1`
- The single approval granted in Build 255 is now **consumed**.
- `approved_attempt_consumed = true`
- `approval_consumed = true`
- **No retry without a new, separate approval.** `no_retry_without_new_approval = true`

## 2. Observed outcome (sanitized)

- The call **did not appear in Vapi logs**. `vapi_call_record_observed = false`
- A notification/message appeared reading **"NEW RETELL CALL — RoofLeadHQ"**.
  `retell_notification_observed = true`
- The notification summarized the call as a **synthetic validation test** and indicated **no real
  homeowner and no real roofer** was involved.
- This indicates the dial **likely hit a Retell / Twilio path, not the intended Vapi Test Roofing
  Assistant path**. `likely_path_was_retell_twilio_not_vapi = true`
- This is a **stop-condition event** because the approved path was Vapi and unexpected Retell/SMS-style
  notification behavior occurred. `stop_condition_triggered = true`
- No retry is permitted without new approval. No further config changes are made until the routing issue
  is diagnosed.

## 3. Credential clarification captured (open routing/config clue)

- The **phone-number-level** credential screen showed **"No authentication" / fallback active**.
  `phone_number_level_credential_authentication = no_authentication_fallback_active`
- The **phone-number-level** Server URL was **blank**.
  `phone_number_level_server_url = blank`
- The **assistant-level** Webhook Server credential remains the relevant **validated Bearer credential
  path** for `/webhooks/vapi/call-completed`.
  `assistant_level_bearer_webhook_credential_remains_validated_backend_path = true`
- The phone-number-level credential is **likely not the direct cause** while the phone-number-level Server
  URL is blank. `phone_number_level_credential_open_routing_clue = true`
- The likely issue is **carrier / Twilio / Retell routing or number ownership / routing mismatch**, not
  backend webhook auth. `likely_root_cause = carrier_twilio_retell_routing_or_number_ownership_mismatch`;
  `backend_webhook_auth_ruled_out_as_cause = true`

## 4. Interpretation (machine-checkable)

- `true_pstn_dial_performed = true`
- `approved_attempt_consumed = true`
- `vapi_call_record_observed = false`
- `retell_notification_observed = true`
- `vapi_pstn_validation_result = blocked_by_unexpected_retell_path`
- `full_final_report_processing_status = not_validated`
- `real_pstn_vapi_call_path_status = not_validated`
- `stop_condition_triggered = true`
- `no_retry_without_new_approval = true`

---

## Status fields (machine-checkable)

- `build_mode = true_pstn_dial_retell_stop_condition_evidence_capture`
- `runtime_action_performed_by_build_256 = false`
- `pstn_dial_performed_by_jason_out_of_band = true`
- `build_255_prerequisite_commit = 1838a7d`
- `build_255_prerequisite_status = validated`
- `build_255_guard_passed_before_action = true`
- `true_pstn_dial_performed = true`
- `one_dial_limit = true`
- `true_pstn_dial_count = 1`
- `approved_attempt_consumed = true`
- `approval_consumed = true`
- `no_retry_without_new_approval = true`
- `vapi_call_record_observed = false`
- `retell_notification_observed = true`
- `likely_path_was_retell_twilio_not_vapi = true`
- `vapi_pstn_validation_result = blocked_by_unexpected_retell_path`
- `full_final_report_processing_status = not_validated`
- `real_pstn_vapi_call_path_status = not_validated`
- `stop_condition_triggered = true`
- `phone_number_level_credential_authentication = no_authentication_fallback_active`
- `phone_number_level_server_url = blank`
- `phone_number_level_credential_open_routing_clue = true`
- `assistant_level_bearer_webhook_credential_remains_validated_backend_path = true`
- `assistant_level_webhook_credential_relevant = true`
- `likely_root_cause = carrier_twilio_retell_routing_or_number_ownership_mismatch`
- `backend_webhook_auth_ruled_out_as_cause = true`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was NOT done in this build

- **No new PSTN dial executed by Build 256.** The single approved dial was performed out-of-band by Jason
  before this build; Build 256 only records sanitized evidence.
- **No runtime/external action of any kind by Build 256.**
- **No call placed.** **No phone number dialed.** **No new call requested.**
- **No retry** of the consumed approval. **No new approval** assumed or fabricated.
- **No Vapi Test** used; **no Vapi Talk** used; **no browser/webCall**; **no call** placed or received.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio** used; **no Twilio config change**.
- **No Retell config change**; **no Vapi config change**; **no Vapi publish**; **no Railway config
  change**; **no deploy / redeploy / restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the credential **value** was not viewed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 256)

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
- No Twilio call placed or routed.
- No Twilio configuration change.
- No Retell configuration change.
- No `curl` executed.
- No live webhook called.
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
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 1838a7d`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `1838a7d` before edits.

## Next recommended step

**Repo-only / read-only diagnosis of the Twilio / Retell / Vapi number routing** before any new call or
any config change. Determine why a PSTN dial to the Vapi number assigned to Test Roofing Assistant
surfaced as a Retell call and never appeared in Vapi logs — i.e., reconcile carrier / Twilio / Retell
routing and number ownership / assignment (the phone-number-level Server URL is blank and the credential
shows "No authentication" / fallback active, which are the open routing/config clues). The assistant-level
Bearer webhook credential remains the relevant validated backend path for `/webhooks/vapi/call-completed`
and is **not** implicated. **No new dial, no new call, and no Railway/Vapi/Twilio/Retell config change**
until the routing issue is diagnosed; any new dial requires a **new, separate approval**.

## Files added in Build 256

- `docs/VAPI_TRUE_PSTN_DIAL_RETELL_STOP_CONDITION_BUILD_256.md` (this doc)
- `backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js`
- `scripts/run-vapi-true-pstn-dial-retell-stop-condition-build-256-dry-run.sh`
