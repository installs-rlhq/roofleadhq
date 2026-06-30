# Vapi / Twilio / Retell Number-Routing Diagnosis — Repo-Only Read-Only (Build 257)

Decision token: `TWILIO_RETELL_VAPI_NUMBER_ROUTING_DIAGNOSED_REPO_ONLY_LIKELY_INBOUND_VOICE_STILL_RETELL_TRUNK_READONLY_DASHBOARD_INSPECTION_NEXT_NO_RETRY_WITHOUT_NEW_APPROVAL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `1f9dd92` (Build 256 closeout), HEAD == origin/main.

## What this build is

Build 257 is a **repo-only, read-only diagnosis.** Using only repo files and previously captured
read-only UI evidence, it explains why the single approved true PSTN dial in Build 256 surfaced as a
**Retell** call and never appeared in **Vapi** logs. It **fixes nothing, changes nothing, and performs no
runtime/external action.** It writes only this doc, a read-only verifier, and a dry-run wrapper.

Build 257 places **no** call, dials **no** phone number, uses **no** Vapi **Test**, uses **no** Vapi
**Talk**, performs **no** browser/webCall, runs **no** `curl`, calls **no** live webhook, sends **no**
SMS, uses **no** Twilio CLI/API, uses **no** Retell API, contacts **no** homeowner or roofer, changes
**no** Railway/Vapi/Twilio/Retell config, publishes **no** Vapi assistant, triggers **no** deploy,
reads/prints **no** secret, and does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = twilio_retell_vapi_number_routing_diagnosis_repo_only_readonly`
- `runtime_action_performed_by_build_257 = false`
- `fix_or_config_change_performed_by_build_257 = false`

## Prerequisite state (carried forward, preserved)

- **Build 256** (commit `1f9dd92`) — captured the stop-condition evidence from the single approved true
  PSTN dial. Its state is **preserved unchanged** here:
  - `build_256_prerequisite_commit = 1f9dd92`
  - `build_256_prerequisite_status = validated`
  - `true_pstn_dial_performed = true`
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

The Build 255 guard was rerun immediately before the dial and passed; the dial was performed once from
Jason's own physical phone / iPhone Phone app to the number assigned (in the Vapi UI) to Test Roofing
Assistant. No further calls or config changes are authorized.

---

## Diagnosis (answers to the eight diagnostic questions)

### Q1. What exact routing chain was EXPECTED for the true PSTN validation dial?

Expected (intended) inbound chain:

1. Jason's physical phone / iPhone Phone app places a real PSTN call.
2. The carrier delivers the call to the phone number that the **Vapi UI** shows assigned to **Test
   Roofing Assistant**.
3. **Vapi** answers the inbound call with the **Test Roofing Assistant** agent.
4. The call completes; **Vapi** emits an **end-of-call-report**.
5. Vapi POSTs that report to the backend webhook `POST /webhooks/vapi/call-completed`, authenticated by
   the validated **assistant-level Bearer** credential (proven in Builds 237/238).

- `expected_vapi_path_documented = true`
- `expected_inbound_answer_owner = vapi_test_roofing_assistant`
- `expected_webhook_leg = assistant_level_bearer_to_webhooks_vapi_call_completed`

### Q2. What ACTUAL observed chain occurred (Build 256 evidence)?

1. Jason placed exactly one real PSTN dial.
2. The call was **answered/handled by Retell**, not Vapi — a **"NEW RETELL CALL — RoofLeadHQ"**
   notification appeared, summarizing the call as a synthetic validation test (no real homeowner/roofer).
3. The call **never appeared in Vapi logs** (`vapi_call_record_observed = false`).
4. Because Vapi never received the call, **no Vapi end-of-call-report was produced**, so the validated
   assistant-level Bearer webhook leg **received nothing** for this dial.

- `actual_path_documented = true`
- `actual_inbound_answer_owner = retell`
- `likely_path_was_retell_twilio_not_vapi = true`

The actual chain diverges from the expected chain at **step 2/3 (who answers the inbound PSTN call)** —
i.e., at the **carrier/Twilio voice-routing leg**, *before* Vapi or the backend webhook is ever involved.

### Q3. What PRIOR repo evidence already suggested Twilio voice might still be Retell/external?

Strong prior evidence exists in the repo:

- **Build 231 call-path inspection** (`docs/CALL_PATH_INSPECTION_AND_JASON_OWNED_CALL_TEST_READINESS_BUILD_231.md`,
  §1) found: *"The current production Twilio number's **voice** configuration points at a **Retell
  Trunk** (configured at the Twilio-number level, outside this repo)."* It also found **there is no
  Twilio voice webhook in this repository** (no TwiML `<Voice>`/`<Dial>` handler, no `/voice` route);
  the only Twilio route in code is the SMS inbound `POST /webhooks/twilio/manual-outreach`. Conclusion
  recorded then: *"Inbound voice to the production Twilio number is handled entirely by the external
  Retell Trunk today; RoofLeadHQ code does not receive or shape that call."*
- **`docs/FIRST_PAID_LAUNCH_VOICE_PATH_CLEANUP_PACKET.md`** treats Retell as deprecated/disabled and
  Vapi as the intended path, but lists *"possible lingering Retell references"* and *"Repo documentation
  areas to check later"* — i.e., the cleanup was a **stated intent**, not a verified carrier-level
  cutover. Deprecating Retell **in the repo** does not change the **Twilio-number voice configuration**,
  which lives outside the repo.

The Build 256 "NEW RETELL CALL" outcome is **exactly what Build 231 §1 predicted** if the number's
Twilio-level voice routing was never actually moved off the Retell Trunk onto Vapi.

- `prior_evidence_twilio_voice_retell_trunk_documented = true`
- `prior_evidence_source = build_231_call_path_inspection`
- `retell_deprecation_was_repo_intent_not_verified_carrier_cutover = true`

### Q4. Does the Vapi phone-number UI assignment ALONE prove the carrier/Twilio voice webhook points to Vapi?

**No.** The Vapi phone-number record + "assigned to Test Roofing Assistant" is the **Vapi-side intent**
for how Vapi *would* answer a call it receives. It does **not**, by itself, prove that the **underlying
carrier (Twilio) voice configuration** for that number actually delivers inbound PSTN calls to Vapi. If
the number is a BYO/imported Twilio number whose Twilio voice config still points at a **Retell SIP
trunk**, the inbound call is answered by **Retell** regardless of what the Vapi UI displays. The Vapi UI
label ("Test Roofing") and assistant assignment ("Test Roofing Assistant") are consistent with the
*intended* setup but are **not proof** of the actual carrier routing.

- `vapi_ui_assignment_alone_proves_carrier_routing = false`
- `vapi_ui_label_and_assignment_consistent_but_not_proof = true`

### Q5. Is phone-number-level Server URL being blank relevant to inbound CALL routing, webhook delivery, both, or neither?

**Webhook delivery leg only — and there it is a non-blocker; it is NOT relevant to inbound call
routing.** Per Build 253 (`docs/VAPI_PSTN_CALL_PATH_SETUP_DIAGNOSIS_BUILD_253.md`, Q4), in Vapi the
**assistant-level** Server URL is used when the phone-number-level Server URL is blank, so a blank
phone-level Server URL does **not** block end-of-call-report delivery (Builds 246/252 saw webhook rows
return HTTP 200, no HTTP 400). That setting governs the **Vapi → backend webhook** leg, which only
matters **after** Vapi has answered the call. It has **no bearing on which platform (Vapi vs Retell)
answers the inbound PSTN call** — the divergence in Q1/Q2 happens before that leg. So for *this* failure
(call answered by Retell, never reached Vapi), the blank Server URL is best classified as **neither the
cause nor relevant to inbound routing** — an open webhook-leg clue already cleared as a non-blocker.

- `phone_level_blank_server_url_scope = webhook_delivery_leg_only`
- `phone_level_blank_server_url_relevant_to_inbound_call_routing = false`
- `phone_level_blank_server_url_blocks_delivery = false`
- `phone_level_blank_server_url_open_question_clue = true`

### Q6. Is phone-number-level credential fallback/no-auth relevant while Server URL is blank?

**Same scope — webhook-auth leg only, and a non-blocker; not the inbound-routing cause.** Per Build 253
(Q5), the **assistant-level Bearer** credential is the validated webhook-auth path; the phone-level "No
authentication / fallback active" did not block auth because, with the phone-level Server URL blank, the
assistant-level Server URL + Bearer credential is the path actually used. This too governs the **Vapi →
backend webhook** leg, not which platform answers the inbound call. While the phone-level Server URL is
blank, the phone-level credential is effectively unused for delivery — so it is **likely not the direct
cause** of the Retell outcome. It is recorded as an open routing/config clue.

- `phone_level_no_auth_fallback_scope = webhook_auth_leg_only`
- `phone_level_no_auth_fallback_relevant_to_inbound_call_routing = false`
- `phone_level_no_auth_fallback_blocks_auth = false`
- `phone_level_no_auth_fallback_open_question_clue = true`
- `phone_level_credential_likely_not_direct_cause_while_server_url_blank = true`

### Q7. What read-only dashboard checks should be performed NEXT (before any new approval)?

All checks below are **read-only inspections** — view configuration only, change nothing, dial nothing,
call no API that mutates:

1. **Twilio Console → Phone Numbers → (the dialed number) → Voice Configuration** — read what handles
   inbound voice: a **Retell SIP/Elastic trunk**, a TwiML app, or a Vapi/SIP target. This is the single
   most decisive check.
2. **Twilio Console → Elastic SIP Trunking** — read whether an **active Retell trunk** is still bound to
   that number / origination is still pointed at Retell.
3. **Retell dashboard → Phone Numbers / Agents** — read whether Retell still **owns/lists/routes** that
   number to a Retell agent (the "NEW RETELL CALL — RoofLeadHQ" notification strongly implies it does).
4. **Vapi dashboard → Phone Numbers → (the Test Roofing number)** — read whether it is a **Vapi-native**
   number or an **imported/BYO Twilio** number, confirm the assistant assignment = Test Roofing
   Assistant, and read the underlying provider/credential it claims.
5. **Identity match (read-only):** confirm the exact E.164 number Jason dialed is the **same** number as
   the Vapi phone-number record and the same number Retell answered — i.e., rule out a
   **number-ownership/identity mismatch** (no raw number recorded in repo).
6. **Vapi Calls logs** — re-confirm (read-only) there is no `Type = Phone` record for the dial window
   (consistent with Build 256), confirming Vapi never received the call.

- `recommended_readonly_dashboard_checks_documented = true`
- `safest_next_step = readonly_dashboard_inspection_of_twilio_retell_vapi_ownership_and_routing_before_any_new_approval`

### Q8. What exact stop/approval rule should remain in force?

- The Build 256 approval is **consumed**. **No retry, no new dial, no new call** without a **new,
  separate, explicit approval** captured as its own build artifact.
- **No config change of any kind** — including repointing the number's Twilio voice routing off Retell
  onto Vapi — without its own separate approval; that cutover is itself a Twilio (+ possibly Vapi)
  config change and a future gated step, not part of any diagnosis.
- No Vapi Test, no Vapi Talk, no `curl`, no live webhook, no Twilio CLI/API, no Retell API, no SMS, no
  deploy until the routing is diagnosed by read-only inspection and a new approval is captured.

- `stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval`

---

## Likely cause classification

- **PRIMARY (most likely):** the dialed number's **inbound VOICE routing is still owned/handled by
  Retell** (Twilio-number voice config → Retell SIP/Elastic trunk), so the inbound PSTN call was
  answered by Retell and **never reached Vapi**. Strongly supported by Build 231 §1 (Twilio voice =
  Retell Trunk) + the Build 256 "NEW RETELL CALL" notification + absence of any Vapi call record.
  `likely_cause_primary = inbound_voice_routing_still_retell_twilio_trunk_not_vapi`
- **SECONDARY:** **number ownership / routing mismatch** — the Vapi UI shows a phone-number record +
  assistant assignment, but the underlying carrier (Twilio) voice config for that number points
  elsewhere (Retell), or the number imported/displayed in Vapi is not the route that actually answers
  PSTN. `likely_cause_secondary = number_ownership_or_routing_mismatch`
- **TERTIARY (less likely):** a **Vapi phone-number-level settings issue** (blank Server URL / no-auth
  fallback). These are **webhook-leg** settings already cleared by Build 253 as non-blockers for
  delivery and do **not** explain a call being answered by Retell.
  `likely_cause_tertiary_less_likely = vapi_phone_number_level_settings_webhook_leg_only`
- **RULED OUT as cause:** **backend webhook auth / backend code.** The assistant-level Bearer webhook
  path is validated (Builds 237/238) and simply received nothing for this dial because the call never
  reached Vapi to produce an end-of-call-report.
  `backend_webhook_auth_ruled_out_as_cause = true`
- **UNKNOWN without read-only dashboard inspection:** the exact current Twilio voice config for the
  number, whether the number is Vapi-native vs imported BYO-Twilio, and whether Retell still has an
  active trunk/agent on it. `likely_cause_unknown_without_readonly_inspection = true`

---

## Status fields (machine-checkable)

- `build_mode = twilio_retell_vapi_number_routing_diagnosis_repo_only_readonly`
- `runtime_action_performed_by_build_257 = false`
- `fix_or_config_change_performed_by_build_257 = false`
- `build_256_prerequisite_commit = 1f9dd92`
- `build_256_prerequisite_status = validated`
- `true_pstn_dial_performed = true`
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
- `expected_vapi_path_documented = true`
- `actual_path_documented = true`
- `prior_evidence_twilio_voice_retell_trunk_documented = true`
- `prior_evidence_source = build_231_call_path_inspection`
- `vapi_ui_assignment_alone_proves_carrier_routing = false`
- `phone_level_blank_server_url_scope = webhook_delivery_leg_only`
- `phone_level_blank_server_url_relevant_to_inbound_call_routing = false`
- `phone_level_blank_server_url_open_question_clue = true`
- `phone_level_no_auth_fallback_scope = webhook_auth_leg_only`
- `phone_level_no_auth_fallback_relevant_to_inbound_call_routing = false`
- `phone_level_no_auth_fallback_open_question_clue = true`
- `phone_level_credential_likely_not_direct_cause_while_server_url_blank = true`
- `assistant_level_bearer_webhook_path_validated = true`
- `assistant_level_bearer_webhook_received_this_pstn_dial = false`
- `likely_cause_primary = inbound_voice_routing_still_retell_twilio_trunk_not_vapi`
- `likely_cause_secondary = number_ownership_or_routing_mismatch`
- `likely_cause_tertiary_less_likely = vapi_phone_number_level_settings_webhook_leg_only`
- `backend_webhook_auth_ruled_out_as_cause = true`
- `likely_cause_unknown_without_readonly_inspection = true`
- `recommended_readonly_dashboard_checks_documented = true`
- `safest_next_step = readonly_dashboard_inspection_of_twilio_retell_vapi_ownership_and_routing_before_any_new_approval`
- `stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was NOT done in this build

- **No fix and no config change of any kind.** Diagnosis only.
- **No runtime/external action of any kind by Build 257.**
- **No call placed.** **No phone number dialed.** **No new call requested.**
- **No retry** of the consumed Build 256 approval. **No new approval** assumed or fabricated.
- **No Vapi Test** used; **no Vapi Talk** used; **no browser/webCall**; **no call** placed or received.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio CLI/API** used; **no Twilio config change**.
- **No Retell API** used; **no Retell config change**.
- **No Vapi config change**; **no Vapi publish**; **no Railway config change**; **no deploy / redeploy /
  restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the credential **value** was not viewed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 257)

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
- No Twilio CLI/API used.
- No Twilio configuration change.
- No Retell API used.
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
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 1f9dd92`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `1f9dd92` before edits.

## Next recommended step

Perform the **read-only dashboard inspection of Twilio / Retell / Vapi number ownership and routing**
documented in Q7 — starting with the dialed number's **Twilio Voice Configuration** (is it still a Retell
trunk?) and the **Retell** and **Vapi** phone-number records for that number — **before any new approval,
any new call, or any config change.** The most likely finding to confirm is that the number's inbound
voice routing is still owned by Retell/Twilio-trunk rather than Vapi. Only after that read-only
inspection identifies the exact mismatch should a **separately-approved** remediation build be defined
(e.g., repointing the number's voice routing onto Vapi) — that cutover is itself a config change and a
future gated step. The Build 256 approval is consumed; **no retry, no new call, and no config change
without a new, separate approval.**

## Files added in Build 257

- `docs/VAPI_TWILIO_RETELL_ROUTING_DIAGNOSIS_BUILD_257.md` (this doc)
- `backend/scripts/verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js`
- `scripts/run-vapi-twilio-retell-routing-diagnosis-build-257-dry-run.sh`
