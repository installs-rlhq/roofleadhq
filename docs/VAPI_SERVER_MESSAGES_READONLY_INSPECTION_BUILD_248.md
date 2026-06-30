# Vapi `serverMessages` Read-Only Dashboard Inspection — Evidence (Build 248)

Decision token: `VAPI_SERVER_MESSAGES_READONLY_INSPECTION_EOCR_VISIBLE_ENABLED_MISSING_EOCR_NOT_DUE_TO_DISABLED_SERVERMESSAGES`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `a7adaf5` (Build 247 closeout), HEAD == origin/main.

## What this build is

Build 248 is a **repo-only evidence-capture packet**. It transcribes, in sanitized form, the outcome
of the **read-only Vapi dashboard inspection** Jason performed after Build 247 (commit `a7adaf5`) — the
exact "config-inspection-only" next step Build 247 recommended. The inspection looked **only** at the
Test Roofing Assistant's Webhook Server and Messaging (`serverMessages` / `clientMessages`)
configuration. **No Talk, no call, no publish, no config change** occurred.

This build only **transcribes the sanitized inspection findings** into a repo document and adds a
read-only verifier; it performs **no** runtime/external action of any kind.

Build 248 itself places **no** call, dials **no** phone number, clicks **no** Vapi Talk, performs
**no** browser/webCall, runs **no** `curl`, calls **no** live webhook, sends **no** SMS, uses **no**
Twilio, contacts **no** homeowner or roofer, changes **no** Railway/Vapi config, publishes **no**
Vapi assistant, triggers **no** deploy, reads/prints **no** secret, and does **not** read
`/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `inspection_mode = readonly_dashboard`
- `dashboard_inspection_performed = true`
- `fix_applied = false`
- `runtime_action_performed_by_build_248 = false`

## Prerequisite validated states (already proven)

- **Build 246** (commit `563044c`) — captured the sanitized post-fix browser/webCall CSV evidence:
  observed webhook rows returned HTTP 200, no HTTP 400, `end_of_call_report_observed = false`,
  `full_final_report_processing_status = not_validated`.
  - `build_246_prerequisite_status = validated`
  - `build_246_prerequisite_commit = 563044c`
  - `build_246_evidence_doc = docs/VAPI_POST_FIX_BROWSER_WEBHOOK_VALIDATION_EVIDENCE_BUILD_246.md`
- **Build 247** (commit `a7adaf5`) — repo-only diagnosis of the missing end-of-call-report: ruled out
  backend code, named Vapi `serverMessages` config / browser-webCall behavior / export timing as the
  likely causes, and recommended Build 248 = read-only `serverMessages` config inspection only.
  - `build_247_prerequisite_status = validated`
  - `build_247_prerequisite_commit = a7adaf5`
  - `build_247_diagnosis_doc = docs/VAPI_END_OF_CALL_REPORT_NOT_OBSERVED_DIAGNOSIS_BUILD_247.md`

## Build 246 evidence carried forward (unchanged, preserved)

Build 248 preserves — does not alter — the Build 246 observed outcomes:

- `all_observed_responses_http_200 = true`
- `http_400_observed = false`
- `end_of_call_report_observed = false`  ← the gap under continued investigation
- `full_final_report_processing_status = not_validated`
- `real_call_test_status = not_started`

## Read-only dashboard inspection findings (sanitized)

### 1. Test Roofing Assistant → Advanced → Webhook Server

- **Server URL** (documented; public production webhook path, not a secret):
  `https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed`
- **Credential explicitly assigned:** `RoofLeadHQ Production Webhook Secret (Bearer Token)`
- **Authentication Enabled** was visible.
- **No custom HTTP Headers** were configured.

- `webhook_server_url_documented = true`
- `webhook_server_url = https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed`
- `webhook_bearer_credential_assigned = true`
- `webhook_bearer_credential_name = RoofLeadHQ Production Webhook Secret (Bearer Token)`
- `webhook_authentication_enabled_visible = true`
- `webhook_custom_http_headers_configured = false`

(The credential **name/label** only is recorded. The credential **value** was not viewed, read, or
recorded — `value_redacted = true` / `secret_value_recorded = false`.)

### 2. Test Roofing Assistant → Advanced → Messaging

The **Server Messages** section was found. Visible **Server Messages** chips included:

- `conversation-update`
- `end-of-call-report`
- `function-call`
- `+8 more` (additional chips collapsed under a "+8 more" indicator)

Visible **Client Messages** chips included:

- `conversation-update`
- `function-call`
- `hang`
- `+10 more` (additional chips collapsed under a "+10 more" indicator)

- `server_messages_section_found = true`
- `server_messages_end_of_call_report_visible = true`
- `server_messages_conversation_update_visible = true`
- `server_messages_function_call_visible = true`
- `server_messages_additional_collapsed_chip_count = 8`
- `client_messages_conversation_update_visible = true`
- `client_messages_function_call_visible = true`
- `client_messages_hang_visible = true`
- `client_messages_additional_collapsed_chip_count = 10`

## Interpretation

- **`end-of-call-report` appears enabled** in the Test Roofing Assistant's `serverMessages`
  configuration (it is a visible chip in the Server Messages list).
- The missing `end-of-call-report` in the Build 246 CSV is therefore **unlikely** to be caused by
  `end-of-call-report` being **visibly disabled** in `serverMessages`. Build 247's leading hypothesis
  ("serverMessages config / EOCR not enabled") is **weakened** by this read-only evidence.
- `end_of_call_report_appears_enabled = true`
- `missing_eocr_due_to_visibly_disabled_servermessages = unlikely`

### Remaining likely causes (after this inspection)

With a visibly-disabled `serverMessages` config largely ruled out by read-only evidence, the remaining
plausible causes for the missing EOCR in Build 246 are:

- **browser/webCall behavior** — a browser/webCall session closed by the tester (rather than
  ended/analyzed by Vapi) may not generate or deliver an end-of-call-report;
- **CSV/export timing or observability limitation** — the EOCR row may not have been present in the
  CSV at export time, or the CSV view does not surface it;
- **delayed final report** — the end-of-call-report may be emitted after the call/session ends, on a
  delay;
- **Vapi delivery nuance** — a delivery detail not resolvable from repo or read-only dashboard
  inspection alone.

- `remaining_likely_causes = browser_webcall_behavior__csv_export_timing_or_observability__delayed_final_report__vapi_delivery_nuance__not_resolvable_from_repo_or_readonly_dashboard_alone`

### Status (unchanged by this inspection)

- `full_final_report_processing_status = not_validated`
- `real_call_test_status = not_started`
- `further_vapi_originated_action_authorized = false`

No further Vapi-originated action is authorized. A PSTN end-of-call-report validation (the step that
exercises the full Supabase lead/booking/calls write path) remains a separate, future,
**approval-gated** step — the Build 245 approval is consumed.

## Status fields (machine-checkable)

- `inspection_mode = readonly_dashboard`
- `dashboard_inspection_performed = true`
- `fix_applied = false`
- `runtime_action_performed_by_build_248 = false`
- `build_247_prerequisite_commit = a7adaf5`
- `build_246_prerequisite_commit = 563044c`
- `webhook_server_url_documented = true`
- `webhook_bearer_credential_assigned = true`
- `webhook_authentication_enabled_visible = true`
- `webhook_custom_http_headers_configured = false`
- `server_messages_section_found = true`
- `server_messages_end_of_call_report_visible = true`
- `server_messages_conversation_update_visible = true`
- `server_messages_function_call_visible = true`
- `client_messages_hang_visible = true`
- `end_of_call_report_appears_enabled = true`
- `missing_eocr_due_to_visibly_disabled_servermessages = unlikely`
- `end_of_call_report_observed = false`
- `full_final_report_processing_status = not_validated`
- `real_call_test_status = not_started`
- `further_vapi_originated_action_authorized = false`
- `approval_consumed = true`
- `rerun_permitted_without_new_approval = false`
- `secret_value_recorded = false` / `value_redacted = true`

## What was NOT done in this build

- **No fix.** Read-only inspection evidence capture only.
- **No runtime/external action of any kind by Build 248.**
- **No Vapi Talk** clicked; **no browser/webCall**; **no call** placed or received; **no phone number
  dialed**.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio** used; **no Twilio config change**.
- **No Vapi config change**; **no Vapi publish**; **no Railway config change**; **no deploy / redeploy
  / restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the credential **value** was not viewed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 248)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
- No Vapi Talk used.
- No browser/webCall performed.
- No SMS sent.
- No Twilio call placed or routed.
- No Twilio configuration change.
- No `curl` executed.
- No live webhook called.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No unrelated Vapi configuration change (no Vapi change by this build at all).
- No Vapi publish.
- No Vapi-originated webhook action executed by this build.
- No full Vapi payload processing pass executed.
- No real call test executed.
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (no secret value exists in this packet; only `value_redacted=true` /
  `secret_value_recorded=false` markers and the credential **name/label** are recorded;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read).
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at a7adaf5`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `a7adaf5` before edits.

## Next recommended step

**Build 249 — repo-only definition of the PSTN end-of-call-report validation plan (no execution).**
Because read-only evidence shows `end-of-call-report` is visibly enabled in `serverMessages`, the
fastest path to actually validating the full final-report write path is a **PSTN** call carrying a
roofer destination (the only path that reaches `process_call_completed`). Build 249 should, **repo-only
and without any runtime/external action**, draft the approval request and the exact validation plan
(what to call, what to capture, how to sanitize) for that PSTN end-of-call-report test, and record
that it **requires a new, separate approval** — the Build 245 approval is consumed. Make **no** call,
**no** Vapi Talk, **no** publish, and **no** config change without that new approval.

## Files added in Build 248

- `docs/VAPI_SERVER_MESSAGES_READONLY_INSPECTION_BUILD_248.md` (this doc)
- `backend/scripts/verify-vapi-server-messages-readonly-inspection-build-248-readonly.js`
- `scripts/run-vapi-server-messages-readonly-inspection-build-248-dry-run.sh`
