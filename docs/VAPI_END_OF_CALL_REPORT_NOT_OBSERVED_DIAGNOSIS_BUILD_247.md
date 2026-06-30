# Why the End-Of-Call-Report Was Not Observed — Repo-Only Diagnosis (Build 247)

Decision token: `VAPI_END_OF_CALL_REPORT_NOT_OBSERVED_DIAGNOSIS_REPO_ONLY_BACKEND_READY_LIKELY_VAPI_SERVERMESSAGE_CONFIG`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `563044c` (Build 246 closeout), HEAD == origin/main.

## What this build is

Build 247 is a **repo-only diagnosis**. It explains, using **repo/source/config evidence only**, why
`end_of_call_report_observed = false` in the uploaded post-fix Vapi browser/webCall CSV recorded by
Build 246 (commit `563044c`). It **does not fix** anything and performs **no** runtime/external action.

Build 247 places **no** call, dials **no** phone number, clicks **no** Vapi Talk, runs **no** Vapi
rerun, runs **no** `curl`, sends **no** SMS, uses **no** Twilio, contacts **no** homeowner or roofer,
changes **no** Railway/Vapi/Twilio config, sets **no** Railway variable, reads/prints **no** secret,
does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`, and runs **no** Supabase write. It
only inspects repo source/docs/fixtures and writes this diagnosis document plus a read-only verifier.

- `diagnosis_mode = repo_only`
- `fix_applied = false`
- `runtime_action_performed_by_build_247 = false`

## Prerequisite validated states (already proven)

- **Build 244** (commit `7342539`) — Vapi webhook **payload-shape fix** (repo-only, test-first):
  non-terminal events → HTTP 200 no-op; browser/webCall end-of-call-report with null PSTN phone
  fields → HTTP 200 no-op (no longer `400 missing_required_field`); unauth → HTTP 401.
  - `build_244_prerequisite_status = validated`
  - `build_244_prerequisite_commit = 7342539`
- **Build 245** (commit `cc3007c`) — captured the **explicit approval** (exactly one) and the
  fail-closed fresh pre-run guard for the post-fix Vapi browser/webCall validation.
  - `build_245_prerequisite_status = validated`
  - `build_245_prerequisite_commit = cc3007c`
- **Build 246** (commit `563044c`) — captured the sanitized post-fix browser/webCall CSV evidence.
  - `build_246_prerequisite_status = validated`
  - `build_246_prerequisite_commit = 563044c`
  - `build_246_evidence_doc = docs/VAPI_POST_FIX_BROWSER_WEBHOOK_VALIDATION_EVIDENCE_BUILD_246.md`

## Build 246 evidence carried forward (unchanged, preserved)

Build 247 preserves — does not alter — the Build 246 observed outcomes:

- `csv_webhook_rows_observed = true`
- `request_path = /webhooks/vapi/call-completed`
- `request_method = POST`
- `all_observed_responses_http_200 = true`
- `http_400_observed = false`
- `response_assistant_started_count = 1` (HTTP 200)
- `response_status_update_count = 2` (HTTP 200)
- `response_speech_update_count = 11` (HTTP 200)
- `response_conversation_update_count = 4` (HTTP 200)
- `end_of_call_report_observed = false`  ← the gap under diagnosis
- `full_final_report_processing_status = not_validated`
- `real_call_test_status = not_started`

The observed message types in the CSV were **assistant.started + interim updates only**
(`assistant.started`, `status-update`, `speech-update`, `conversation-update`). The session produced
**no terminal `end-of-call-report` row**.

## Repo evidence inspected

- `backend/src/routes/vapi-webhooks.ts` — the single webhook route `POST /call-completed`.
- `backend/src/services/vapi-webhook.service.ts` — payload normalization, event classification,
  transport detection, and the full processing path.
- `backend/src/middleware/vapi-webhook-auth.ts` — fail-closed shared-secret guard (runs first).
- `docs/samples/vapi-event-webcall-end-of-call-report.fake.json` — browser/webCall End Of Call Report
  fixture (null PSTN caller/destination).
- `docs/samples/vapi-event-end-of-call-report.fake.json` — PSTN End Of Call Report fixture.
- `docs/samples/vapi-event-status-update.fake.json`, `…-speech-update.fake.json`,
  `…-conversation-update.fake.json` — interim event fixtures.
- `docs/VAPI_WEBHOOK_PAYLOAD_SHAPE_FIX_BUILD_244.md`, `docs/VAPI_WEBHOOK_PAYLOAD_SHAPE_DIAGNOSIS_BUILD_243.md`,
  `docs/VAPI_POST_FIX_BROWSER_WEBHOOK_VALIDATION_EVIDENCE_BUILD_246.md` — prior diagnosis/fix/evidence.
- `docs/VAPI_REAL_PAYLOAD_COLLECTION_RUNBOOK.md`, `docs/VAPI_POST_CALL_PAYLOAD_DISCOVERY.md` —
  collection/discovery runbooks.

## Questions answered (repo-only)

### Q1 — Does the backend expect end-of-call-report as the final Vapi event type?

**Yes.** `backend/src/services/vapi-webhook.service.ts` defines
`TERMINAL_EVENT_TYPES = { 'end-of-call-report', 'call.completed', 'call-completed' }`.
`classifyVapiWebhookEvent` treats `end-of-call-report` (and a null/typeless legacy payload) as
**terminal-eligible**; only a terminal event reaches `decision = 'process_call_completed'` and the
full lead/booking/calls write path. Interim types (`status-update`, `conversation-update`,
`speech-update`) are `KNOWN_NON_TERMINAL_EVENT_TYPES` → `acknowledge_non_terminal` no-op.

- `backend_expects_end_of_call_report_as_terminal = true`

### Q2 — Does backend code now handle browser/webCall end-of-call-report correctly if it arrives?

**Yes — it would be a clean HTTP 200 no-op, not a 400.** For a browser/webCall
`end-of-call-report` (`message.call.type = "webCall"`, `transport = "web"`, no PSTN
`roofer_destination_number`), `classifyVapiWebhookEvent` returns
`decision = 'acknowledge_web_call'` (reason `web_call_no_destination`) and
`processVapiCallCompleted` returns `{ ok: true, acknowledged: true, processed: false, web_call: true }`,
which the route maps to **HTTP 200**. This is proven by the
`docs/samples/vapi-event-webcall-end-of-call-report.fake.json` fixture and the Build 244 test
verifier.

- `backend_handles_browser_webcall_eocr_as_200_noop = true`
- `backend_would_return_400_for_browser_webcall_eocr = false`

**Important nuance:** a *browser/webCall* end-of-call-report is, by design, a **no-op** — it does
**not** exercise the full Supabase lead/booking/calls write path, because that path requires a PSTN
`roofer_destination_number` (`decision = 'process_call_completed'`). So even if a browser EOCR had
appeared in the CSV, it would **not** have moved `full_final_report_processing_status` to validated.
Full-report processing is validated only by a **PSTN** end-of-call-report carrying a roofer
destination — which remains a separate, future, approval-gated step.

- `browser_webcall_eocr_exercises_full_write_path = false`
- `full_report_processing_requires_pstn_destination = true`

### Q3 — Do repo docs/config samples indicate which Vapi server messages/events should be enabled?

**Partially.** The repo enumerates the event **types the backend recognizes** (terminal
`end-of-call-report`; interim `status-update` / `conversation-update` / `speech-update`) and provides
fixtures for each. **However, the repo contains no Vapi `serverMessages` enablement configuration** —
which server messages the Test Roofing Assistant actually emits is configured in the **Vapi
assistant/dashboard (off-repo)**, not in this repository. The repo therefore **cannot confirm** that
`end-of-call-report` is enabled in the Test Roofing Assistant's `serverMessages` list.

- `repo_documents_recognized_event_types = true`
- `repo_contains_vapi_servermessages_enablement_config = false`
- `servermessages_enablement_is_off_repo_dashboard_config = true`

### Q4 — Is there repo-visible evidence that browser webCall may omit end-of-call-report?

**Indirect only.** The repo proves the backend *can* handle a browser webCall EOCR **if emitted**
(fixture + Build 244 tests), but contains **no** evidence guaranteeing a browser webCall actually
**emits** one. The Build 246 evidence doc itself flags the plausible mechanisms (the browser/webCall
session terminating before an end-of-call-report was emitted, or the EOCR being delivered on a
different path/after export). The CSV pattern (assistant.started + interim updates, then no terminal
row) is **consistent with** an EOCR that was never enabled, never emitted before the browser session
closed, or not yet delivered at CSV-export time. None of these can be confirmed from the repo alone.

- `repo_proves_backend_can_handle_browser_eocr = true`
- `repo_guarantees_browser_webcall_emits_eocr = false`

### Q5 — Likely cause classification

- `cause_backend_code = ruled_out` — the backend is ready; a browser EOCR would return HTTP 200
  (not 400) and an interim-only stream is handled exactly as observed. No code defect explains the
  missing EOCR.
- `cause_vapi_servermessage_config = most_likely` — `end-of-call-report` may not be enabled in the
  Test Roofing Assistant's `serverMessages`, so it was never sent to the webhook. This is off-repo
  Vapi dashboard config and cannot be confirmed from the repo.
- `cause_browser_webcall_behavior_or_timing = contributing` — a browser/webCall session that is
  closed by the tester (rather than ended/analyzed by Vapi) may not generate/deliver an EOCR, or may
  deliver it after the call ends.
- `cause_csv_export_snapshot_timing = possible` — the CSV may have been exported before an EOCR row
  was written.
- `likely_cause_classification = not_backend_code__most_likely_vapi_servermessages_config_plus_browser_webcall_or_export_timing__unknown_without_vapi_dashboard_inspection`

### Q6 — Safest Build 248 next step

**Repo-only / config-inspection-only readiness check — no new call, no new approval needed for
inspection.** Build 248 should (a) confirm, by **read-only inspection of the Test Roofing Assistant's
Vapi `serverMessages` configuration in the dashboard**, whether `end-of-call-report` is enabled to be
delivered to `/webhooks/vapi/call-completed`, and (b) document the expected EOCR delivery timing for a
browser/webCall vs a PSTN call. This is configuration inspection, **not** a runtime/external action:
**no** call placed, **no** Vapi Talk, **no** `curl`, **no** config change.

Only **after** config inspection confirms EOCR is enabled would a **PSTN** end-of-call-report
validation (the step that actually exercises the full write path) be considered — and that step
requires a **new, separate approval** because the Build 245 approval is consumed. That PSTN step is
**not** Build 248.

- `safest_build_248_next_step = repo_and_vapi_servermessages_config_inspection_only__no_new_call__no_new_approval_for_inspection`
- `pstn_full_report_validation_requires_new_separate_approval = true`

## Backend handling readiness assessment (summary)

| Event delivered | Classifier decision | HTTP | Full write path | Notes |
|---|---|---|---|---|
| `end-of-call-report` (webCall, no PSTN dest) | `acknowledge_web_call` | 200 | no (no-op) | ready; would not 400 |
| `end-of-call-report` (PSTN, roofer dest present) | `process_call_completed` | 200 (or 4xx/5xx on data error) | yes | validates full report |
| `status-update` / `conversation-update` / `speech-update` | `acknowledge_non_terminal` | 200 | no | matches CSV |
| `assistant.started` (unrecognized non-terminal) | `acknowledge_non_terminal` (`unrecognized_event`) | 200 | no | matches CSV |
| null/typeless legacy `call.completed` | terminal-eligible | 200/4xx/5xx | yes if PSTN dest | legacy compatibility |

- `backend_readiness_for_end_of_call_report = ready` (handles both browser no-op and PSTN full path)

## Status fields (machine-checkable)

- `diagnosis_mode = repo_only`
- `fix_applied = false`
- `runtime_action_performed_by_build_247 = false`
- `backend_expects_end_of_call_report_as_terminal = true`
- `backend_handles_browser_webcall_eocr_as_200_noop = true`
- `backend_readiness_for_end_of_call_report = ready`
- `repo_contains_vapi_servermessages_enablement_config = false`
- `end_of_call_report_observed = false`
- `full_final_report_processing_status = not_validated`
- `real_call_test_status = not_started`
- `likely_cause_classification = not_backend_code__most_likely_vapi_servermessages_config_plus_browser_webcall_or_export_timing__unknown_without_vapi_dashboard_inspection`
- `safest_build_248_next_step = repo_and_vapi_servermessages_config_inspection_only__no_new_call__no_new_approval_for_inspection`
- `approval_consumed = true`
- `rerun_permitted_without_new_approval = false`
- `secret_value_recorded = false` / `value_redacted = true`

## What was NOT done in this build

- **No fix.** Diagnosis only.
- **No runtime/external action of any kind by Build 247.**
- **No call** placed or received; **no phone number dialed**.
- **No Vapi Talk** clicked; **no Vapi rerun**; **no Vapi config change**.
- **No `curl`** run; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio** used; **no Twilio config change**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No Railway / Vapi config change**; no deploy/redeploy/restart; no Railway variable set.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 247)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
- No SMS sent.
- No Twilio call placed or routed.
- No Twilio configuration change.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No unrelated Vapi configuration change (no Vapi change by this build at all).
- No Vapi-originated webhook action executed by this build.
- No full Vapi payload processing pass executed.
- No real call test executed.
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
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 563044c`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `563044c` before edits.

## Next recommended step

**Build 248 — repo + Vapi `serverMessages` configuration inspection only.** Confirm (read-only)
whether `end-of-call-report` is enabled in the Test Roofing Assistant's `serverMessages` list and
document expected EOCR delivery timing. Make **no** further Vapi-originated or real-call action and
**no** PSTN end-of-call-report validation **without a new, separate approval** — the Build 245
approval is consumed.

## Files added in Build 247

- `docs/VAPI_END_OF_CALL_REPORT_NOT_OBSERVED_DIAGNOSIS_BUILD_247.md` (this doc)
- `backend/scripts/verify-vapi-end-of-call-report-not-observed-diagnosis-build-247-readonly.js`
- `scripts/run-vapi-end-of-call-report-not-observed-diagnosis-build-247-dry-run.sh`
