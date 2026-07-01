# Clean Vapi-Managed Test-Number — Single Controlled True PSTN Revalidation Call PASS + Evidence Closeout (Build 270)

Decision token: `CLEAN_VAPI_PSTN_REVALIDATION_PASS_EXACTLY_ONE_TRUE_PSTN_CALL_FROM_JASON_OWNED_PHONE_TO_CLEAN_VAPI_MANAGED_TEST_NUMBER_ONLY_REVALIDATED_BUILD_268_FIX_EOCR_POST_TO_WEBHOOKS_VAPI_CALL_COMPLETED_RETURNED_200_TECHNICAL_VOICE_PATH_VALIDATED_END_TO_END_TO_BACKEND_200_UNMAPPED_CLEAN_TEST_NUMBER_CONTROLLED_200_NOOP_EXISTING_TWILIO_RETELL_UNTOUCHED_NO_RETRY_NO_SMS_NO_TWILIO_NO_RETELL_NO_DEPLOY_NO_AGENT_CALL`

Date: 2026-07-01
Branch: `main`
Source-of-truth commit at packet creation: `164449c` (Build 269 approval closeout), HEAD == origin/main.

## What this build is

Build 270 is a **repo-only evidence / closeout packet**. It **captures the successful outcome** of the
**single controlled true PSTN revalidation call** that Jason approved in Build 269 and then placed from his
**own physical phone / iPhone Phone app** to the **clean Vapi-managed Test Number**. The call reached the
clean Vapi number, the **Test Roofing Assistant** answered, an **End Of Call Report** was produced, and the
**EOCR POST to `/webhooks/vapi/call-completed` returned HTTP 200** against the **deployed Build 268 fix** —
so the **Build 268 production fix is validated** and the **technical voice path is validated end-to-end to
backend 200**.

The revalidation call was a **human physical-phone action already completed by Jason**; Build 270 places
**no** call, sends **no** SMS, makes **no** Twilio or Retell config change, triggers **no** backend/Railway
deploy, uses **no** Vapi Test / Vapi Talk / browser/webCall, runs **no** `curl`/live webhook, reads/prints
**no** secret, and does **not** touch the existing Twilio/Retell-routed number. It only records the
**sanitized evidence** Jason reported back. Evidence is **never invented**.

- `build_mode = clean_vapi_pstn_revalidation_pass_evidence_capture_repo_only`
- `runtime_action_performed_by_build_270 = false`
- `fix_or_config_change_performed_by_build_270 = false`
- `pstn_revalidation_execution_status = completed_sanitized_evidence_captured`
- `pstn_to_clean_vapi_status = passed`
- `vapi_inbound_call_record_status = passed`
- `vapi_eocr_delivery_status = passed`
- `backend_eocr_response_status = 200`
- `build_268_fix_validated = true`
- `final_report_processing_status = controlled_200_noop_unmapped_clean_test_number`
- `technical_voice_path_status = validated_end_to_end_to_backend_200`
- `existing_twilio_retell_route_status = preserved_untouched`
- `next_step = first_roofer_test_wiring`
- `no_call_placed_by_agent = true`
- `no_retry_performed = true`
- `no_sms_sent = true`
- `no_twilio_config_changed = true`
- `no_retell_config_changed = true`
- `no_backend_deploy = true`

## Prerequisite state (carried forward, preserved)

- **Build 269** (commit `164449c`) — captured Jason's approval for **exactly one** controlled true PSTN
  revalidation call from his own physical phone to the clean Vapi-managed Test Number, to validate the
  deployed Build 268 fix. Execution was left `awaiting_human_single_call`; **this** build records the
  completed result.
  - `build_269_prerequisite_commit = 164449c`
  - `build_269_approval_status = captured`
- **Build 268** (commit `4c08b5e`) — narrow, fail-controlled backend fix in
  `backend/src/services/vapi-webhook.service.ts`: a clean-Vapi PSTN End-Of-Call Report whose destination
  number is **not mapped to any roofer** is acknowledged as a **controlled 200 no-op**
  (`unknown_roofer_destination_unmapped`) instead of returning **404**. The route's populated
  `unknown_roofer → 404` branch is retained defensively (now unreached from the unmapped path).
  - `build_268_prerequisite_commit = 4c08b5e`
  - `build_268_prerequisite_status = validated`
  - `build_268_deploy_status = confirmed_active_before_revalidation`
  - `build_268_fix_validated = true`
- **Build 267** (commit `9c637ed`) — diagnosed production was serving a build without the Build 268 handling
  (`/health` 200 while webhook 404 on the same app ⇒ production was not current HEAD). Now resolved: the
  deployed fix returns 200 on the same webhook path.
- **Build 258** (commit `c8a8adb`) — confirmed the existing number's inbound Voice is a Twilio Sip Trunk
  "Retell Trunk"; true PSTN on the existing number routes to Retell, not Vapi. That number was left
  untouched by the revalidation.
  - `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`

The Build 269 single-call approval is now **consumed** by this successful revalidation and is **not** reused.
**No** second call and **no** retry were performed or are approved.

---

## 1. The major pass (what succeeded)

The single controlled true PSTN revalidation call succeeded end-to-end:

- **True PSTN reached the clean Vapi-managed number.** The call was placed over the real phone network from
  Jason's own physical phone / iPhone Phone app to the clean Vapi-managed Test Number (not Vapi Test/Talk,
  not browser/webCall).
- **A Vapi inbound call record existed.** Vapi Logs → Calls showed a new inbound Phone/PSTN call record for
  the revalidation call, with a call id present (sanitized, not recorded raw).
- **The Test Roofing Assistant was used.** The inbound call was answered by the Test Roofing Assistant on the
  clean Vapi-managed Test Number.
- **A Vapi webhook stream existed.** Vapi Logs → Webhooks showed webhook rows for the revalidation call,
  including non-terminal events and the terminal End Of Call Report.
- **An End Of Call Report was observed**, delivered via **POST**.
- **The EOCR POST to `/webhooks/vapi/call-completed` returned HTTP 200** against the deployed Build 268 fix
  (the prior failure mode was 404). Non-terminal webhook events also returned 200.

- `major_pass_recorded = true`
- `pstn_to_clean_vapi_status = passed`
- `vapi_inbound_call_record_status = passed`
- `test_roofing_assistant_used = true`
- `vapi_webhook_stream_observed = true`
- `end_of_call_report_observed = true`
- `vapi_eocr_delivery_status = passed`
- `backend_eocr_response_status = 200`

## 2. Sanitized evidence captured (as reported by Jason)

Values are **sanitized** — no raw phone numbers, full call IDs, full URLs, SIP URIs, tokens, secrets, or
PII. Evidence is recorded as reported; **not invented**.

```
PSTN_REVALIDATION_APPROVAL_STATUS=captured
CALL_ATTEMPT_COUNT=1
CALL_PLACED_FROM=jason_owned_physical_phone
CALL_TARGET=clean_vapi_managed_test_number
EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true
VAPI_CALL_RECORD_FOUND=true
VAPI_CALL_TYPE=inbound_phone_pstn
VAPI_CALL_ID_PRESENT=true
END_OF_CALL_REPORT_OBSERVED=true
VAPI_WEBHOOK_LOG_OBSERVED=true
EOCR_WEBHOOK_TARGET_PATH_SHAPE=/webhooks/vapi/call-completed
BACKEND_WEBHOOK_RECEIVED=true
BACKEND_WEBHOOK_RESPONSE_STATUS=200
LEAD_OR_FINAL_REPORT_PROCESSING_STATUS=controlled_200_noop_for_unmapped_clean_test_number
BUILD_268_FIX_VALIDATED=true
STOP_CONDITION_TRIGGERED=false
NO_RETRY_PERFORMED=true
NO_SMS_SENT=true
NO_TWILIO_CONFIG_CHANGED=true
NO_RETELL_CONFIG_CHANGED=true
NO_BACKEND_DEPLOY=true
```

- `sanitized_evidence_captured = true`
- `evidence_not_invented = true`

## 3. Additional Vapi webhook details for the successful EOCR (sanitized)

Reported from the Vapi Logs → Webhooks detail for the terminal End Of Call Report row. Sanitized: no
secrets, no raw phone numbers, no full call IDs, no sensitive payload values.

```
EOCR_WEBHOOK_STARTED_AT_UTC=2026-07-01T04:13:54.914Z
EOCR_WEBHOOK_FINISHED_AT_UTC=2026-07-01T04:13:56.030Z
EOCR_WEBHOOK_DURATION_SECONDS=1.12
EOCR_WEBHOOK_TARGET_HOST_SHAPE=railway_production_api_host
EOCR_WEBHOOK_TARGET_PATH_SHAPE=/webhooks/vapi/call-completed
EOCR_WEBHOOK_METHOD=POST
EOCR_WEBHOOK_HEADER_CONTENT_TYPE=application/json
EOCR_WEBHOOK_HEADER_ACCEPT_ENCODING=identity
EOCR_WEBHOOK_LIST_RESPONSE_HTTP_CODE=200
```

- The webhook target is the deployed RoofLeadHQ production API host serving `/webhooks/vapi/call-completed`
  (host recorded as a shape, raw URL not stored).
- Request/response completed in ~1.12s (started `04:13:54.914` → finished `04:13:56.030` UTC).
- The prior webhook-list view showed the End Of Call Report response HTTP code **200**, consistent with the
  Build 268 fix.

- `eocr_webhook_details_captured = true`
- `eocr_webhook_method = POST`
- `eocr_webhook_list_response_http_code = 200`

## 4. Build 268 fix validated

The Build 268 production fix is **validated**. Before Build 268, the clean-Vapi unmapped-test-number EOCR
returned **404** (`unknown_roofer`). After the Build 268 deploy, the same EOCR POST to
`/webhooks/vapi/call-completed` returns **HTTP 200** — a **controlled 200 no-op** for the unmapped clean test
number (`unknown_roofer_destination_unmapped`). The revalidation call confirms this behavior in production.

- `build_268_fix_validated = true`
- `backend_eocr_response_status = 200`
- `prior_failure_mode = eocr_404_unknown_roofer`
- `resolved_behavior = controlled_200_noop_unmapped_clean_test_number`

## 5. Final report processing — no overclaim

The successful 200 is a **controlled no-op for the unmapped clean test number**, **not** full lead
processing. The clean Vapi-managed Test Number is **still unmapped** to any roofer record, so no lead was
persisted and no final report was processed into a roofer's pipeline. This is the **expected** Build 268
behavior for an unmapped destination.

- `final_report_processing_status = controlled_200_noop_unmapped_clean_test_number`
- `full_lead_processing_claimed = false`
- `clean_test_number_still_unmapped = true`

## 6. Technical voice path validated end-to-end

The technical voice path is now **validated end-to-end to backend 200**:

```
true PSTN → clean Vapi number → Test Roofing Assistant → End Of Call Report → RoofLeadHQ backend HTTP 200
```

- `technical_voice_path_status = validated_end_to_end_to_backend_200`
- `voice_path_shape = true_pstn__clean_vapi_number__assistant__eocr__backend_200`

## 7. Existing Twilio → Retell number (preserved, untouched)

The existing Twilio number whose inbound Voice routes to the Twilio Sip Trunk "Retell Trunk" (Build 258) was
**not called, used, or changed** by the revalidation or by this build. It remains the untouched rollback.

- `existing_twilio_retell_route_status = preserved_untouched`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true`

## 8. Next strategic step (documented, NOT yet approved)

With the technical voice path validated, the next strategic step is moving from **technical validation** to
**first roofer test wiring**. This build **documents** that step and does **not** create or approve any live
roofer end-to-end test.

Planned sequence (each its own build; the live test needs a separate controlled approval):

1. **Map a clean Vapi number/assistant to a demo or pilot roofer record** — associate a clean Vapi-managed
   number + assistant with a demo/pilot roofer so the EOCR destination is a mapped roofer (not the current
   unmapped clean test number).
2. **Confirm the reporting / lead-persistence path** — verify that, for a mapped roofer, the EOCR flows past
   the controlled no-op into actual lead/final-report persistence and reporting (repo/readonly confirmation
   first).
3. **Then request a separate controlled first-roofer end-to-end test approval** — only after 1–2 are wired
   and confirmed, request a new, separate approval for the first true roofer end-to-end test.

- `next_step = first_roofer_test_wiring`
- `next_step_substeps_documented = true`
- `first_roofer_live_test_approval_created = false`
- `first_roofer_live_test_approved = false`

## 9. Decision

- The single controlled true PSTN revalidation call **passed**: true PSTN reached the clean Vapi-managed
  number, a Vapi inbound call record existed, the Test Roofing Assistant answered, a Vapi webhook stream
  existed, an End Of Call Report was observed, and the EOCR POST to `/webhooks/vapi/call-completed` returned
  **200** against the deployed Build 268 fix.
- **Build 268 fix is validated.** Technical voice path is **validated end-to-end to backend 200**.
- No overclaim: final processing is a **controlled 200 no-op for the unmapped clean test number**.
- Existing Twilio/Retell route **preserved untouched**. **No** retry, SMS, Twilio/Retell change, or deploy.
- **Next:** first roofer test wiring (map clean number/assistant → demo/pilot roofer, confirm
  reporting/lead-persistence path, then request a **separate** controlled first-roofer end-to-end test
  approval). No such approval is created here.

- `final_decision = revalidation_passed_build_268_validated_technical_voice_path_validated_end_to_end_to_backend_200_next_first_roofer_test_wiring`

---

## Status fields (machine-checkable)

- `build_mode = clean_vapi_pstn_revalidation_pass_evidence_capture_repo_only`
- `runtime_action_performed_by_build_270 = false`
- `fix_or_config_change_performed_by_build_270 = false`
- `build_269_prerequisite_commit = 164449c`
- `build_268_prerequisite_commit = 4c08b5e`
- `build_268_prerequisite_status = validated`
- `build_268_deploy_status = confirmed_active_before_revalidation`
- `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- `pstn_revalidation_execution_status = completed_sanitized_evidence_captured`
- `pstn_to_clean_vapi_status = passed`
- `vapi_inbound_call_record_status = passed`
- `test_roofing_assistant_used = true`
- `vapi_webhook_stream_observed = true`
- `end_of_call_report_observed = true`
- `vapi_eocr_delivery_status = passed`
- `backend_eocr_response_status = 200`
- `eocr_webhook_target_path_shape = /webhooks/vapi/call-completed`
- `eocr_webhook_method = POST`
- `eocr_webhook_duration_seconds = 1.12`
- `eocr_webhook_list_response_http_code = 200`
- `eocr_webhook_details_captured = true`
- `build_268_fix_validated = true`
- `final_report_processing_status = controlled_200_noop_unmapped_clean_test_number`
- `full_lead_processing_claimed = false`
- `clean_test_number_still_unmapped = true`
- `technical_voice_path_status = validated_end_to_end_to_backend_200`
- `existing_twilio_retell_route_status = preserved_untouched`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true`
- `sanitized_evidence_captured = true`
- `evidence_not_invented = true`
- `next_step = first_roofer_test_wiring`
- `next_step_substeps_documented = true`
- `first_roofer_live_test_approval_created = false`
- `first_roofer_live_test_approved = false`
- `no_call_placed_by_agent = true`
- `no_retry_performed = true`
- `no_sms_sent = true`
- `no_twilio_config_changed = true`
- `no_retell_config_changed = true`
- `no_backend_deploy = true`
- `stop_condition_triggered = false`
- `NO_RETRY_PERFORMED = true`
- `NO_SMS_SENT = true`
- `NO_TWILIO_CONFIG_CHANGED = true`
- `NO_RETELL_CONFIG_CHANGED = true`
- `NO_BACKEND_DEPLOY = true`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was NOT done in this build

- **No call placed by Build 270 / the agent.** The revalidation call was Jason's own completed physical-phone
  action; this build only records its sanitized evidence.
- **No retry** of the call. **No second call.**
- **No call to the existing Twilio/Retell number.** **No use or change of the existing Twilio/Retell number.**
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
- **No first-roofer live-test approval created.**
- **No invented evidence.**
- **No secret value** read, typed, printed, or committed; the local secret file
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, full URLs, SIP URIs, or PII** appear in this packet.

## Safety invariants (held by Build 270)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic from third parties.
- No agent-placed call.
- No call to the existing Twilio/Retell number.
- No second call.
- No retry of any call.
- No retry of any prior consumed approval.
- No new live-test approval created.
- No Vapi Test used.
- No Vapi Talk used.
- No browser/webCall performed.
- No SMS sent.
- No SMS/messaging route change.
- No Twilio call placed or routed by the agent.
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
- No unrelated Railway configuration change.
- No backend / Railway deploy / redeploy / restart by this build.
- No Vapi configuration change by this build.
- No Vapi publish.
- No Vapi-originated webhook action executed by this build.
- No full Vapi payload processing pass executed.
- No full lead processing claimed.
- No invented evidence.
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed.
- No secret committed.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 164449c`
- `git status --short` → clean

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `164449c` before edits.

## Next recommended step (exact human/repo action)

Begin **first roofer test wiring** (technical validation → first roofer test): (1) map a clean Vapi
number/assistant to a demo or pilot roofer record; (2) confirm the reporting / lead-persistence path for a
mapped roofer (repo/readonly first); (3) then request a **separate** controlled first-roofer end-to-end test
approval. Do **not** place any roofer/homeowner call or activate live automation until that separate approval
is captured.

## Files added in Build 270

- `docs/CLEAN_VAPI_PSTN_REVALIDATION_PASS_BUILD_270.md` (this doc)
- `backend/scripts/verify-clean-vapi-pstn-revalidation-pass-build-270-readonly.js`
- `scripts/run-clean-vapi-pstn-revalidation-pass-build-270-dry-run.sh`
