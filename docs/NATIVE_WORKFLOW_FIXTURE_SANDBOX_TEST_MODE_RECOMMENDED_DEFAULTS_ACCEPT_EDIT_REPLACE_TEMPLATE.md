# Native Workflow Fixture Sandbox/Test-Mode Recommended Defaults Accept/Edit/Replace Template

## 1. Purpose

This template is the **fake-data/local-only/read-only/review-only** accept/edit/replace form for moving from the 19 recommended default exact values (proposed upstream) toward accepted exact values. Jason may accept, edit, or replace each recommended default into an accepted exact value. **Accept/edit/replace template does not equal approval.** This template does **not** grant sandbox/test-mode activation, live activation, or command execution.

| Field | Value |
| --- | --- |
| source_of_truth_commit | b6d852c |
| acceptance_boundary_status | acceptance_boundary_review_only |
| completeness_status | incomplete |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| exact_values_required_count | 19 |
| recommended_exact_values_proposed_count | 19 |
| accepted_exact_values_count | 0 |
| accepted_exact_values_filled_count | 0 |
| approved_exact_values_filled_count | 0 |
| exact_values_filled_count | 0 |
| all_exact_values_filled | false |
| recommended_defaults_are_not_approval | true |
| recommended_defaults_are_not_accepted_exact_values | true |
| jason_review_worksheet_does_not_equal_approval | true |
| accept_edit_replace_template_does_not_equal_approval | true |
| acceptance_boundary_does_not_equal_approval | true |
| default_sandbox_test_mode_decision | HOLD |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| safety_status | demo_ready_with_live_automation_disabled |

**Explicit note:** Recommended defaults are **not** approval.

**Explicit note:** Recommended defaults are **not** accepted exact values.

**Explicit note:** Jason review worksheet does **not** equal approval.

**Explicit note:** Accept/edit/replace template does **not** equal approval.

**Explicit note:** Acceptance boundary does **not** equal approval.

**Explicit note:** Completeness status remains **incomplete** until Jason separately accepts/edits exact values into accepted and then approved exact values.

## 2. Accept/Edit/Replace Template (recommended defaults proposed; accepted and approved values blank)

| # | Exact value field | Recommended Default (reference — not approval) | Jason Accept/Edit/Replace | Accepted exact value | Accepted |
| --- | --- | --- | --- | --- | --- |
| 1 | exact_services | Twilio Sandbox SMS API (inbound/outbound stubs to sandbox numbers only); Vapi test assistant API (call stub, no live outbound); Resend test mode API (test inbox only, no live sends); RoofLeadHQ sandbox/staging Supabase project (scoped tables only) |  |  | false |
| 2 | exact_test_accounts | Twilio sandbox test number (Jason-designated); Vapi test assistant ID (Jason-designated); Resend test inbox address (Jason-designated); Summit Peak Roofing Demo LLC operator sandbox login (fake demo roofer scope only) |  |  | false |
| 3 | exact_environment | Local dev workstation at RoofLeadHQ repository root; RoofLeadHQ sandbox/staging Supabase project (explicitly not production) |  |  | false |
| 4 | exact_command | bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh |  |  | false |
| 5 | exact_working_directory | RoofLeadHQ git repository root absolute path on operator workstation (e.g. /home/operator/roofleadhq) |  |  | false |
| 6 | exact_credentials_env_api_webhook_boundary | Named vars only (no values logged): TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_TEST_NUMBER, VAPI_API_KEY, VAPI_ASSISTANT_ID, RESEND_API_KEY, SUPABASE_SANDBOX_URL, SUPABASE_SANDBOX_ANON_KEY, SUPABASE_SANDBOX_SERVICE_ROLE_KEY — sandbox/staging only; production vars forbidden |  |  | false |
| 7 | exact_external_call_boundary | Twilio Sandbox SMS API (send/receive to sandbox numbers only); Vapi test API (assistant stub calls only); Resend test API (test inbox only); Supabase sandbox project REST/RPC only — no production endpoints, no CRM, no billing |  |  | false |
| 8 | exact_production_data_boundary | No production Supabase reads/writes; no production homeowner/roofer PII; sandbox/staging tables scoped to Summit Peak Roofing Demo LLC test data only; local fake demo fixtures allowed |  |  | false |
| 9 | exact_schema_auth_rls_security_boundary | No schema migrations; no auth changes; no RLS policy changes; no security config changes — read/write sandbox data only within existing schema |  |  | false |
| 10 | exact_public_route_webhook_scheduler_cron_dispatcher_boundary | No new public routes; no webhook exposure; no scheduler/cron/dispatcher activation; no inbound webhook handlers — local dry-run and sandbox API stubs only |  |  | false |
| 11 | exact_messaging_contact_permission_boundary | Sandbox test numbers only; explicit opt-in for Jason-designated test contacts; STOP/opt-out honored immediately; no live homeowner SMS/email/calls; compliance hold before any send |  |  | false |
| 12 | exact_calendar_appointment_boundary | Calendar stub events in sandbox only; no live Google/Outlook integration; manual coordination fallback required; inspection/appointment records in sandbox DB only |  |  | false |
| 13 | exact_reporting_csv_boundary | Local fake-data CSV exports and sandbox admin dashboard views only; no live CSV delivery to external systems; no production reporting emails; audit logs in sandbox scope only |  |  | false |
| 14 | exact_stop_conditions | unexpected live service indicator; unexpected production data access; unexpected external call outside boundary; unexpected schema/auth/RLS change; unexpected public route/webhook/scheduler; unexpected billing/payment behavior; real-data ambiguity; approval ambiguity; safe readiness failure; backend build failure (per NO_GO_STOP_CONDITION_CHECKLIST) |  |  | false |
| 15 | exact_rollback_owner | Jason Lohse (founder/operator) |  |  | false |
| 16 | exact_evidence_owner | Jason Lohse (founder/operator) |  |  | false |
| 17 | exact_log_path | logs/sandbox-test-mode-channel-validation/{YYYY-MM-DD-HHMMSS}.log under repo root |  |  | false |
| 18 | exact_approval_expiration | 7 calendar days from explicit Jason sandbox/test-mode approval timestamp OR upon completion of 30-scenario validation run (whichever first) |  |  | false |
| 19 | exact_one_time_use_limitation | Single-use approval per sandbox/test-mode validation batch; invalidated after 30 scenarios complete, any STOP_AND_ROLL_BACK, or approval expiration; reuse requires new explicit Jason approval with refreshed exact values |  |  | false |

## 3. Three-Layer Workflow Instructions

1. **Recommended defaults** — review column 2 (reference from upstream proposal; RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED).
2. **Accepted exact values** — accept as-is, edit, or replace in column 4 via column 3 notes. Mark Accepted column only after explicit Jason acceptance (not by using this template alone).
3. **Approved exact values** — separate future step after all 19 accepted values are complete; requires explicit Jason approval record.
4. **Activation approval** — separate future step after approved exact values and evidence review; requires explicit Jason sandbox/test-mode approval (future acceptance statement template in boundary packet).

## 4. Completion Rules

- Partial completion (any blank accepted value) keeps `completeness_status` at `incomplete`.
- `accepted_exact_values_count` remains `0` until Jason explicitly accepts/edits all 19 values.
- `approved_exact_values_filled_count` remains `0` until Jason explicitly approves all 19 values in a separate approval record.
- `exact_values_filled_count` tracks approved values only (not recommended defaults or accepted values alone).
- Default sandbox/test-mode decision remains **HOLD** until separate Jason approval with all exact values.

## 5. Connected Artifacts

- Acceptance boundary packet: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_RECOMMENDED_DEFAULTS_ACCEPTANCE_BOUNDARY_PACKET.md`
- Recommended defaults proposal: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_RECOMMENDED_DEFAULTS_PROPOSAL.md`
- Jason review worksheet: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_JASON_REVIEW_WORKSHEET.md`
- Structured fixture: `backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-recommended-defaults-acceptance-boundary-packet.json`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only, planning-only, not-approved, non-executing.