# Native Workflow Fixture Sandbox/Test-Mode Exact Values Recommended Defaults Proposal

## 1. Purpose and Scope

This packet proposes **recommended default values** for the 19 exact sandbox/test-mode values needed to move toward controlled roofer pilot readiness — as a **fake-data/local-only/read-only/dry-run-only/review-only/planning-only/not-approved/non-executing** proposal only. Jason may later accept, edit, or replace each value. This packet does **not** approve sandbox/test-mode activation, live activation, or command execution.

### What this packet is

- sandbox/test-mode exact values recommended defaults proposal only
- fastest-safe recommended defaults for all 19 exact values (clearly marked **RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED**)
- Jason review worksheet companion for accept/edit/replace workflow
- structured planning fixture for verification
- source-of-truth and evidence chain references from commit `0cceb00`
- read-only verifier input
- packet_status is `planning_only`
- review_status is `recommended_defaults_review_only`
- proposal_status is `recommended_defaults_proposed_only`
- purpose is `sandbox/test-mode exact values recommended defaults proposal`

### What this packet is not

- This is **not** approval to activate anything.
- This packet does **not** approve sandbox/test-mode activation.
- Live activation remains **not granted**.
- Recommended defaults are **not** approved exact values.
- Jason review worksheet does **not** equal approval.
- This is **not** approval to make external calls.
- This is **not** approval to access credentials, env, API, or webhooks.
- This is **not** approval to touch production Supabase data.
- This does **not** add public routes, webhooks, schedulers, cron, dispatchers, live sends, CRM sync, or billing/payment/deposit/invoice/quote/estimate automation.
- This does **not** run any activation command.
- This does **not** execute any activation step or proposed command.

**Explicit note:** Recommended defaults are **not** approval. Proposed values in this packet do not grant sandbox/test-mode activation, live activation, or command execution.

**Explicit note:** Jason review worksheet does **not** equal approval. Reviewing or editing the worksheet does not grant any sandbox/test-mode activation, live activation, or command execution approval.

**Explicit note:** Completeness status remains **incomplete** until Jason separately accepts/edits exact values into approved exact values.

**Explicit note:** Default sandbox/test-mode decision remains **HOLD**. This proposal does not change the upstream HOLD posture.

**Explicit note:** Sandbox/test-mode approval still requires separate exact Jason approval after all 19 exact values are explicitly accepted/edited.

**Explicit note:** Live activation still requires separate later approval after sandbox/test-mode evidence and explicit sandbox/test-mode approval.

### Standing local build approval (recorded, limited)

Jason has given standing approval for bigger/faster Grok Build batches that remain local-only, fake-data-only, read-only, dry-run-only, review-only. Standing local build approval allows this recommended defaults proposal. It does **not** by itself grant sandbox/test-mode activation approval.

## 2. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | 0cceb00 |
| source_of_truth_label | test(workflow): add roofer pilot essentials planning batch |

### Upstream completions (referenced, not re-approved)

| Field | Value |
| --- | --- |
| local_demo_e2e_evidence_chain_status | passed |
| local_demo_evidence_freeze_release_candidate_review_status | completed |
| local_demo_release_candidate_management_summary_jason_review_status | completed |
| roofer_pilot_essentials_planning_batch_status | completed |
| p0_blockers_count | 0 |
| p1_polish_status | completed |
| p2_refinement_status | completed |
| p3_planning_status | completed |

### Evidence chain commits (all must remain referenced)

- `17abae0` — demo roofer local E2E test bundle
- `cf566ae` — post-run evidence and demo E2E readiness
- `728ad03` — demo roofer scenario review runner
- `401bfc7` — demo roofer E2E evidence report
- `edceb29` — demo roofer local E2E operator gate
- `df388f4` — local demo E2E run evidence capture
- `3800512` — final local demo E2E readiness decision
- `c6df554` — demo roofer E2E walkthrough triage
- `f752452` — demo roofer walkthrough observation evidence capture
- `0d7ae0d` — local demo E2E master review backlog boundary
- `5ef9ef5` — local demo E2E P1 polish batch
- `db9ece3` — local demo E2E P2 refinement batch
- `04e0de6` — P3 future approval planning packet
- `ae9154b` — separate sandbox/test-mode approval request packet
- `6b2fe60` — sandbox/test-mode exact values capture draft
- `816dfc2` — exact values completeness review evidence packet
- `ef79784` — sandbox/test-mode approval decision draft packet
- `2dd1016` — local demo evidence freeze release candidate review
- `11e74d4` — release candidate management summary Jason review
- `0cceb00` — roofer pilot essentials planning batch

| Field | Value |
| --- | --- |
| proposal_status | recommended_defaults_proposed_only |
| completeness_status | incomplete |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| default_sandbox_test_mode_decision | HOLD |
| current_recommended_next_step | JASON_REVIEW_SANDBOX_TEST_MODE_EXACT_VALUES_RECOMMENDED_DEFAULTS_PROPOSAL |

## 3. Exact Values Proposal Status

| Field | Value |
| --- | --- |
| exact_values_required_count | 19 |
| recommended_exact_values_proposed_count | 19 |
| approved_exact_values_filled_count | 0 |
| exact_values_filled_count | 0 |
| all_exact_values_filled | false |
| recommended_defaults_are_not_approval | true |
| recommended_defaults_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| jason_review_worksheet_does_not_equal_approval | true |
| approved_for_activation_now | false |
| command_execution_status | not_run_by_this_packet |
| approved_channels | [] |
| approved_external_services | [] |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |

**Explicit note:** Recommended defaults are **not** approval.

**Explicit note:** Jason review worksheet does **not** equal approval.

**Explicit note:** Completeness status remains **incomplete** until Jason separately accepts/edits exact values.

## 4. Recommended Scenario Counts (from Roofer Pilot Essentials — not approval)

| Field | Recommended Default | Status |
| --- | --- | --- |
| total_sandbox_test_mode_validation_scenarios | 30 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| controlled_real_roofer_setup_steps | 12 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| controlled_real_roofer_limited_validation | 5 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |

## 5. Recommended Default Exact Values (all 19 — RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED)

Before Jason can grant separate sandbox/test-mode approval, he must **accept, edit, or replace** each recommended default into approved exact values. Recommended defaults below are planning proposals only.

| # | Requirement | Recommended Default Status |
| --- | --- | --- |
| 1 | exact_services_required | true |
| 2 | exact_test_accounts_required | true |
| 3 | exact_environment_required | true |
| 4 | exact_command_required | true |
| 5 | exact_working_directory_required | true |
| 6 | exact_credentials_env_api_webhook_boundary_required | true |
| 7 | exact_external_call_boundary_required | true |
| 8 | exact_production_data_boundary_required | true |
| 9 | exact_schema_auth_rls_security_boundary_required | true |
| 10 | exact_public_route_webhook_scheduler_cron_dispatcher_boundary_required | true |
| 11 | exact_messaging_contact_permission_boundary_required | true |
| 12 | exact_calendar_appointment_boundary_required | true |
| 13 | exact_reporting_csv_boundary_required | true |
| 14 | exact_stop_conditions_required | true |
| 15 | exact_rollback_owner_required | true |
| 16 | exact_evidence_owner_required | true |
| 17 | exact_log_path_required | true |
| 18 | exact_approval_expiration_required | true |
| 19 | exact_one_time_use_limitation_required | true |

### 5.1 Exact services (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_services | Twilio Sandbox SMS API (inbound/outbound stubs to sandbox numbers only); Vapi test assistant API (call stub, no live outbound); Resend test mode API (test inbox only, no live sends); RoofLeadHQ sandbox/staging Supabase project (scoped tables only) |

### 5.2 Exact test accounts (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_test_accounts | Twilio sandbox test number (Jason-designated); Vapi test assistant ID (Jason-designated); Resend test inbox address (Jason-designated); Summit Peak Roofing Demo LLC operator sandbox login (fake demo roofer scope only) |

### 5.3 Exact environment (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_environment | Local dev workstation at RoofLeadHQ repository root; RoofLeadHQ sandbox/staging Supabase project (explicitly not production) |

### 5.4 Exact command (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_command | bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh |

This packet does **not** run the final activation command:

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh
```

### 5.5 Exact working directory (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_working_directory | RoofLeadHQ git repository root absolute path on operator workstation (e.g. /home/operator/roofleadhq) |

### 5.6 Exact credentials/env/API/webhook boundary (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_credentials_env_api_webhook_boundary | Named vars only (no values logged): TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_TEST_NUMBER, VAPI_API_KEY, VAPI_ASSISTANT_ID, RESEND_API_KEY, SUPABASE_SANDBOX_URL, SUPABASE_SANDBOX_ANON_KEY, SUPABASE_SANDBOX_SERVICE_ROLE_KEY — sandbox/staging only; production vars forbidden |

### 5.7 Exact external call boundary (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_external_call_boundary | Twilio Sandbox SMS API (send/receive to sandbox numbers only); Vapi test API (assistant stub calls only); Resend test API (test inbox only); Supabase sandbox project REST/RPC only — no production endpoints, no CRM, no billing |

### 5.8 Exact production data boundary (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_production_data_boundary | No production Supabase reads/writes; no production homeowner/roofer PII; sandbox/staging tables scoped to Summit Peak Roofing Demo LLC test data only; local fake demo fixtures allowed |

### 5.9 Exact schema/auth/RLS/security boundary (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_schema_auth_rls_security_boundary | No schema migrations; no auth changes; no RLS policy changes; no security config changes — read/write sandbox data only within existing schema |

### 5.10 Exact public route/webhook/scheduler/cron/dispatcher boundary (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_public_route_webhook_scheduler_cron_dispatcher_boundary | No new public routes; no webhook exposure; no scheduler/cron/dispatcher activation; no inbound webhook handlers — local dry-run and sandbox API stubs only |

### 5.11 Exact messaging/contact permission boundary (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_messaging_contact_permission_boundary | Sandbox test numbers only; explicit opt-in for Jason-designated test contacts; STOP/opt-out honored immediately; no live homeowner SMS/email/calls; compliance hold before any send |

### 5.12 Exact calendar/appointment boundary (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_calendar_appointment_boundary | Calendar stub events in sandbox only; no live Google/Outlook integration; manual coordination fallback required; inspection/appointment records in sandbox DB only |

### 5.13 Exact reporting/CSV boundary (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_reporting_csv_boundary | Local fake-data CSV exports and sandbox admin dashboard views only; no live CSV delivery to external systems; no production reporting emails; audit logs in sandbox scope only |

### 5.14 Exact stop conditions (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_stop_conditions | unexpected live service indicator; unexpected production data access; unexpected external call outside boundary; unexpected schema/auth/RLS change; unexpected public route/webhook/scheduler; unexpected billing/payment behavior; real-data ambiguity; approval ambiguity; safe readiness failure; backend build failure (per NO_GO_STOP_CONDITION_CHECKLIST) |

### 5.15 Exact rollback owner (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_rollback_owner | Jason Lohse (founder/operator) |

### 5.16 Exact evidence owner (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_evidence_owner | Jason Lohse (founder/operator) |

### 5.17 Exact log path (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_log_path | logs/sandbox-test-mode-channel-validation/{YYYY-MM-DD-HHMMSS}.log under repo root |

### 5.18 Exact approval expiration (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_approval_expiration | 7 calendar days from explicit Jason sandbox/test-mode approval timestamp OR upon completion of 30-scenario validation run (whichever first) |

### 5.19 Exact one-time-use limitation (recommended default — not approved)

| Field | Value |
| --- | --- |
| recommended_default_filled | true |
| approved_filled | false |
| recommended_default_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| exact_one_time_use_limitation | Single-use approval per sandbox/test-mode validation batch; invalidated after 30 scenarios complete, any STOP_AND_ROLL_BACK, or approval expiration; reuse requires new explicit Jason approval with refreshed exact values |

## 6. Current Activation Posture

| Field | Value |
| --- | --- |
| activation_approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| command_execution_status | not_run_by_this_packet |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| live_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| external_calls_allowed | false |
| credentials_access_allowed | false |
| production_data_access_allowed | false |
| schema_auth_rls_security_changes_allowed | false |
| public_route_webhook_scheduler_cron_dispatcher_allowed | false |
| billing_payment_automation_allowed | false |
| public_go_live_or_production_copy_changes_allowed | false |
| real_demo_sandbox_live_testing_allowed | false |
| public_website_go_live_copy_changed | false |
| safety_status | demo_ready_with_live_automation_disabled |
| old_90_day_plan_boundary | old 90-day plan cannot override current source-of-truth direction |

## 7. Connected Prior Packets

This recommended defaults proposal builds on the roofer pilot essentials planning batch (`0cceb00`) and upstream exact values capture draft:

- Roofer pilot essentials: `docs/NATIVE_WORKFLOW_FIXTURE_ROOFER_PILOT_ESSENTIALS_PLANNING_BATCH.md`
- Exact values capture draft: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_CAPTURE_DRAFT.md`
- Channel validation plan: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_PLAN.md`
- No-go/stop conditions: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_NO_GO_STOP_CONDITION_CHECKLIST.md`

## 8. Connected Proposal Artifacts

- Jason review worksheet: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_JASON_REVIEW_WORKSHEET.md`
- Structured fixture: `backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-exact-values-recommended-defaults-proposal.json`
- Read-only verifier: `backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-exact-values-recommended-defaults-proposal-readonly.js`
- Dry-run wrapper: `scripts/run-native-workflow-fixture-sandbox-test-mode-exact-values-recommended-defaults-proposal-dry-run.sh`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only, planning-only, not-approved, non-executing.