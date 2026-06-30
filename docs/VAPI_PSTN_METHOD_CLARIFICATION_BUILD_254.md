# Vapi PSTN Validation Method Clarification (Build 254)

Decision token: `VAPI_PSTN_VALIDATION_METHOD_CLARIFICATION_LAST_ATTEMPT_VAPI_TEST_NOT_TRUE_PSTN_DIAL_TRUE_PSTN_NOT_EXECUTED_FRESH_APPROVAL_AND_FRESH_GUARD_REQUIRED`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `617108e` (Build 253 closeout), HEAD == origin/main.

## What this build is

Build 254 is a **repo-only, read-only clarification capture**. After Build 253 diagnosed that the most
likely cause of the ambiguous PSTN evidence was a **user-side call path (web/browser, not a true PSTN
dial)**, **Jason clarified the method actually used for the last attempt**:

> `LAST_ATTEMPT_METHOD = B`, where **B = clicked Vapi Test**.

Build 254 records this clarification. It **confirms** that the last attempted action was **not** a true
PSTN dial from a physical phone / iPhone Phone app — it was the Vapi **Test** control in the dashboard.
This **explains** why Vapi Calls showed `Type = Web` only and why **no** PSTN/phone call record and **no**
end-of-call report were observed. **No true PSTN validation was performed.** Build 254 writes only this
document, a read-only verifier, and a dry-run wrapper.

Build 254 performs **no** runtime/external action of any kind. It places **no** call, uses **no** Vapi
**Test**, uses **no** Vapi **Talk**, performs **no** browser/webCall, dials **no** phone number, runs
**no** `curl`, calls **no** live webhook, sends **no** SMS, uses **no** Twilio, changes **no** Vapi/Railway
config, publishes **no** Vapi assistant, triggers **no** deploy, requests **no** new call, contacts **no**
homeowner or roofer, and does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = vapi_pstn_validation_method_clarification_readonly`
- `runtime_action_performed_by_build_254 = false`
- `clarification_inputs = jason_clarification_plus_repo_docs_and_prior_sanitized_vapi_ui_evidence_only`
- `another_call_requested = false`

## Prerequisite validated state (already proven)

- **Build 250** (commit `a487f13`) — approval + guard for exactly **one** controlled PSTN
  end-of-call-report validation attempt using **Test Roofing Assistant only** and a **Jason-owned / test
  number only**.
- **Build 251** (commit `828ea19`) — corrected the Vapi phone-number assistant assignment to
  **Test Roofing Assistant** (Inbound Settings).
- **Build 252** (commit `424c081`) — captured the attempt as **ambiguous / not_confirmed**: Vapi Calls UI
  showed `Type = Web` only; no PSTN/Twilio indicators; no end-of-call report; user reported "No PSTN
  results that I can find."
- **Build 253** (commit `617108e`) — repo-only read-only diagnosis; classified the **most likely cause**
  as **user-side call action/path (web/browser, not a true PSTN dial)**
  (`likely_cause_primary = user_side_call_path_web_not_pstn`); recommended a read-only dashboard/API
  inspection and a new, separate approval before any new call.
  - `build_253_prerequisite_commit = 617108e`
  - `build_253_prerequisite_status = validated`
  - `build_253_likely_cause_primary = user_side_call_path_web_not_pstn`
  - `build_253_likely_cause_classification_preserved = true`

These prior states are **preserved unchanged** by Build 254.

---

## The clarification (what Jason confirmed)

### Q1. What method did the last attempt actually use?

Jason clarified: `LAST_ATTEMPT_METHOD = B`, and **B = clicked Vapi Test**. The last attempted action was
the Vapi **Test** control in the Vapi dashboard, **not** a true PSTN dial placed from a physical phone or
the iPhone Phone app to the Vapi number.

- `jason_clarified_last_attempt_method = B`
- `last_attempt_method_b_means = clicked_vapi_test`
- `last_attempt_was_true_pstn_dial = false`

### Q2. Is "clicked Vapi Test" a true PSTN phone dial?

**No.** The Vapi **Test** control places a **web/browser-transport** call from inside the dashboard. It is
**not** a PSTN dial: it does not originate from the physical phone network, it does not go through the
roofer's connected Twilio/Vapi phone path, and Vapi records it as `Type = Web`. A true PSTN dial would be
placed by **dialing the Vapi phone number from a physical phone / iPhone Phone app** and would appear in
Vapi Calls as `Type = Phone`.

- `vapi_test_is_true_pstn_dial = false`
- `vapi_test_transport = web`
- `true_pstn_dial_definition = dial_vapi_number_from_physical_phone_or_iphone_phone_app`

### Q3. Does this explain the prior `Type = Web` evidence?

**Yes.** This directly explains Build 252's evidence. Because the last attempt was the Vapi **Test** (web
path), Vapi Calls necessarily showed `Type = Web` only, with no PSTN/Twilio indicators and no end-of-call
report. The Build 253 primary classification (user-side web call path, not a true PSTN dial) is now
**confirmed by Jason's own account of the method used**, not merely inferred.

- `prior_type_web_evidence_explained_by_vapi_test_web_path = true`
- `build_253_primary_cause_confirmed_by_clarification = true`

### Q4. Was any true PSTN validation performed?

**No.** No true PSTN dial was placed, so no PSTN call record was produced, no end-of-call report was
observed, and the full final-report processing path was never exercised over a real phone lead.

- `true_pstn_call_performed = false`
- `pstn_call_record_confirmed = false`
- `end_of_call_report_observed = false`
- `full_final_report_processing_status = not_validated`
- `true_pstn_validation_status = not_executed`

### Q5. What is required before any true PSTN phone dial?

A **fresh, separate, explicit approval** from Jason **and** a **fresh guard** (Build 249/250-style scope:
Test Roofing Assistant only, Jason-owned physical phone / test number only, exactly one attempt). The
prior Build 250 approval is **consumed** by the Build 252 attempt and does **not** authorize a new call.
The new instruction must be to **dial the Vapi phone number from a Jason-owned physical phone / iPhone
Phone app** — explicitly **not** Vapi **Test** and **not** Vapi **Talk**.

- `fresh_approval_required_before_true_pstn_dial = true`
- `fresh_guard_required_before_true_pstn_dial = true`
- `prior_approval_consumed = true`
- `no_new_call_without_fresh_approval_and_fresh_guard = true`

---

## Status fields (machine-checkable)

- `build_mode = vapi_pstn_validation_method_clarification_readonly`
- `runtime_action_performed_by_build_254 = false`
- `another_call_requested = false`
- `build_250_prerequisite_commit = a487f13`
- `build_251_prerequisite_commit = 828ea19`
- `build_252_prerequisite_commit = 424c081`
- `build_253_prerequisite_commit = 617108e`
- `build_253_prerequisite_status = validated`
- `build_253_likely_cause_primary = user_side_call_path_web_not_pstn`
- `build_253_likely_cause_classification_preserved = true`
- `jason_clarified_last_attempt_method = B`
- `last_attempt_method_b_means = clicked_vapi_test`
- `last_attempt_was_true_pstn_dial = false`
- `vapi_test_is_true_pstn_dial = false`
- `vapi_test_transport = web`
- `prior_type_web_evidence_explained_by_vapi_test_web_path = true`
- `build_253_primary_cause_confirmed_by_clarification = true`
- `true_pstn_call_performed = false`
- `pstn_call_record_confirmed = false`
- `end_of_call_report_observed = false`
- `full_final_report_processing_status = not_validated`
- `true_pstn_validation_status = not_executed`
- `prior_approval_consumed = true`
- `fresh_approval_required_before_true_pstn_dial = true`
- `fresh_guard_required_before_true_pstn_dial = true`
- `no_new_call_without_fresh_approval_and_fresh_guard = true`
- `value_redacted = true`
- `secret_value_recorded = false`

## Files inspected (read-only)

- `docs/VAPI_PSTN_CALL_PATH_SETUP_DIAGNOSIS_BUILD_253.md` (likely-cause classification: web path most
  likely)
- `docs/VAPI_PSTN_VALIDATION_AMBIGUOUS_EVIDENCE_BUILD_252.md` (ambiguous evidence: `Type = Web` only)
- `docs/VAPI_PHONE_ASSIGNMENT_CORRECTION_BUILD_251.md` (assignment correction)
- `docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_GUARD_BUILD_250.md` (approval scope / guard)
- `docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_PLAN_BUILD_249.md` (validation decision tree)

## What was NOT done in this build

- **No runtime/external action of any kind by Build 254.** Read-only clarification capture only.
- **No call placed.** **No phone number dialed.** **No new call requested.**
- **No Vapi Test** clicked; **no Vapi Talk** clicked; **no browser/webCall**; **no call** placed or received.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio** action; **no Twilio config change**.
- **No Vapi config change**; **no Vapi publish**; **no Railway config change**; **no deploy / redeploy /
  restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the credential **value** was not viewed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 254)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
- No Vapi Test used.
- No Vapi Talk used.
- No browser/webCall performed.
- No SMS sent.
- No Twilio call placed or routed.
- No Twilio configuration change.
- No `curl` executed.
- No live webhook called.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No Vapi configuration change by this build.
- No Vapi publish.
- No Vapi-originated webhook action executed by this build.
- No full Vapi payload processing pass executed.
- No real call test executed by this build.
- No new call requested or placed.
- No retry of the consumed approved attempt.
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
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 617108e`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `617108e` before edits.

## Next recommended step

**Obtain a fresh, separate, explicit approval from Jason for exactly one true PSTN dial**, placed from a
**Jason-owned physical phone / iPhone Phone app to the Vapi number** — with **no Vapi Test** and **no Vapi
Talk** — and re-arm a **fresh guard** (Build 249/250-style scope: Test Roofing Assistant only, Jason-owned
/ test number only, one attempt). Only then place the single approved true PSTN dial and capture the
resulting `Type = Phone` call record and end-of-call report. The prior Build 250 approval is **consumed**;
no new call without a fresh approval **and** a fresh guard.

## Files added in Build 254

- `docs/VAPI_PSTN_METHOD_CLARIFICATION_BUILD_254.md` (this doc)
- `backend/scripts/verify-vapi-pstn-method-clarification-build-254-readonly.js`
- `scripts/run-vapi-pstn-method-clarification-build-254-dry-run.sh`
