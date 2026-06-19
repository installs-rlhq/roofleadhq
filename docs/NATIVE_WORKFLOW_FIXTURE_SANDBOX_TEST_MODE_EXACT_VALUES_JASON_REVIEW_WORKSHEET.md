# Native Workflow Fixture Sandbox/Test-Mode Exact Values Jason Review Worksheet

## 1. Purpose

This worksheet is the **fake-data/local-only/read-only/review-only** accept/edit/replace form for the 19 recommended default exact values proposed in the sandbox/test-mode exact values recommended defaults proposal. Jason may accept, edit, or replace each recommended default. **Recommended defaults are not approval.** This worksheet does **not** equal approval.

| Field | Value |
| --- | --- |
| source_of_truth_commit | 0cceb00 |
| proposal_status | recommended_defaults_proposed_only |
| completeness_status | incomplete |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| exact_values_required_count | 19 |
| recommended_exact_values_proposed_count | 19 |
| approved_exact_values_filled_count | 0 |
| exact_values_filled_count | 0 |
| all_exact_values_filled | false |
| recommended_defaults_are_not_approval | true |
| jason_review_worksheet_does_not_equal_approval | true |
| default_sandbox_test_mode_decision | HOLD |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| safety_status | demo_ready_with_live_automation_disabled |

**Explicit note:** Recommended defaults are **not** approval.

**Explicit note:** Jason review worksheet does **not** equal approval.

**Explicit note:** Completeness status remains **incomplete** until Jason separately accepts/edits exact values into approved exact values.

## 2. Jason Review Worksheet (recommended defaults proposed; approved values blank)

| # | Exact value field | Recommended Default | Jason Accept/Edit/Replace | Approved |
| --- | --- | --- | --- | --- |
| 1 | exact_services | Twilio Sandbox SMS API (inbound/outbound stubs to sandbox numbers only); Vapi test assistant API (call stub, no live outbound); Resend test mode API (test inbox only, no live sends); RoofLeadHQ sandbox/staging Supabase project (scoped tables only) |  | false |
| 2 | exact_test_accounts | Twilio sandbox test number (Jason-designated); Vapi test assistant ID (Jason-designated); Resend test inbox address (Jason-designated); Summit Peak Roofing Demo LLC operator sandbox login (fake demo roofer scope only) |  | false |
| 3 | exact_environment | Local dev workstation at RoofLeadHQ repository root; RoofLeadHQ sandbox/staging Supabase project (explicitly not production) |  | false |
| 4 | exact_command | bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh |  | false |
| 5 | exact_working_directory | RoofLeadHQ git repository root absolute path on operator workstation (e.g. /home/operator/roofleadhq) |  | false |
| 6 | exact_credentials_env_api_webhook_boundary | Named vars only (no values logged): TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_TEST_NUMBER, VAPI_API_KEY, VAPI_ASSISTANT_ID, RESEND_API_KEY, SUPABASE_SANDBOX_URL, SUPABASE_SANDBOX_ANON_KEY, SUPABASE_SANDBOX_SERVICE_ROLE_KEY — sandbox/staging only; production vars forbidden |  | false |
| 7 | exact_external_call_boundary | Twilio Sandbox SMS API (send/receive to sandbox numbers only); Vapi test API (assistant stub calls only); Resend test API (test inbox only); Supabase sandbox project REST/RPC only — no production endpoints, no CRM, no billing |  | false |
| 8 | exact_production_data_boundary | No production Supabase reads/writes; no production homeowner/roofer PII; sandbox/staging tables scoped to Summit Peak Roofing Demo LLC test data only; local fake demo fixtures allowed |  | false |
| 9 | exact_schema_auth_rls_security_boundary | No schema migrations; no auth changes; no RLS policy changes; no security config changes — read/write sandbox data only within existing schema |  | false |
| 10 | exact_public_route_webhook_scheduler_cron_dispatcher_boundary | No new public routes; no webhook exposure; no scheduler/cron/dispatcher activation; no inbound webhook handlers — local dry-run and sandbox API stubs only |  | false |
| 11 | exact_messaging_contact_permission_boundary | Sandbox test numbers only; explicit opt-in for Jason-designated test contacts; STOP/opt-out honored immediately; no live homeowner SMS/email/calls; compliance hold before any send |  | false |
| 12 | exact_calendar_appointment_boundary | Calendar stub events in sandbox only; no live Google/Outlook integration; manual coordination fallback required; inspection/appointment records in sandbox DB only |  | false |
| 13 | exact_reporting_csv_boundary | Local fake-data CSV exports and sandbox admin dashboard views only; no live CSV delivery to external systems; no production reporting emails; audit logs in sandbox scope only |  | false |
| 14 | exact_stop_conditions | unexpected live service indicator; unexpected production data access; unexpected external call outside boundary; unexpected schema/auth/RLS change; unexpected public route/webhook/scheduler; unexpected billing/payment behavior; real-data ambiguity; approval ambiguity; safe readiness failure; backend build failure (per NO_GO_STOP_CONDITION_CHECKLIST) |  | false |
| 15 | exact_rollback_owner | Jason Lohse (founder/operator) |  | false |
| 16 | exact_evidence_owner | Jason Lohse (founder/operator) |  | false |
| 17 | exact_log_path | logs/sandbox-test-mode-channel-validation/{YYYY-MM-DD-HHMMSS}.log under repo root |  | false |
| 18 | exact_approval_expiration | 7 calendar days from explicit Jason sandbox/test-mode approval timestamp OR upon completion of 30-scenario validation run (whichever first) |  | false |
| 19 | exact_one_time_use_limitation | Single-use approval per sandbox/test-mode validation batch; invalidated after 30 scenarios complete, any STOP_AND_ROLL_BACK, or approval expiration; reuse requires new explicit Jason approval with refreshed exact values |  | false |

## 3. Recommended Scenario Counts (reference — not approval)

| Field | Recommended Default | Status |
| --- | --- | --- |
| total_sandbox_test_mode_validation_scenarios | 30 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| controlled_real_roofer_setup_steps | 12 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| controlled_real_roofer_limited_validation | 5 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |

## 4. Jason Review Instructions

1. Review each recommended default in column 2.
2. Accept as-is, edit, or replace in the Jason Accept/Edit/Replace column.
3. Mark Approved column only after explicit Jason acceptance (not by reviewing this worksheet alone).
4. All 19 approved values must be filled before sandbox/test-mode activation can be considered.
5. Filling this worksheet does **not** grant approval — Jason must separately grant explicit sandbox/test-mode approval.
6. `approved_for_activation_now` remains `false` until all approved exact values are filled **and** separate explicit approval is granted.

## 5. Completion Rules

- Partial completion (any blank approved value) keeps `completeness_status` at `incomplete`.
- `approved_exact_values_filled_count` remains `0` until Jason explicitly accepts/edits all 19 values.
- `exact_values_filled_count` tracks approved values only (not recommended defaults).
- Default sandbox/test-mode decision remains **HOLD** until separate Jason approval with all exact values.

## 6. Connected Artifacts

- Recommended defaults proposal: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_RECOMMENDED_DEFAULTS_PROPOSAL.md`
- Exact values capture draft: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_CAPTURE_DRAFT.md`
- Structured fixture: `backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-exact-values-recommended-defaults-proposal.json`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only, planning-only, not-approved, non-executing.