# Native Workflow Fixture Sandbox/Test-Mode Exact Values Worksheet

## 1. Purpose

This worksheet is the **fake-data/local-only/read-only/review-only** capture form for the 19 exact values Jason must name before any future sandbox/test-mode activation can be considered. All fields are **blank by default**. Blank fields are **not** approval.

| Field | Value |
| --- | --- |
| source_of_truth_commit | ae9154b |
| capture_status | blank_draft_only |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| exact_values_required_count | 19 |
| exact_values_filled_count | 0 |
| all_exact_values_filled | false |
| blank_placeholders_are_not_approval | true |
| all_approved_insufficient_without_exact_values | true |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| safety_status | demo_ready_with_live_automation_disabled |

**Explicit note:** Blank placeholders are **not** approval.

**Explicit note:** "All approved" is **insufficient** for execution without exact values.

## 2. Exact Values Worksheet (all blank)

| # | Exact value field | Filled | Value |
| --- | --- | --- | --- |
| 1 | exact_services | false |  |
| 2 | exact_test_accounts | false |  |
| 3 | exact_environment | false |  |
| 4 | exact_command | false |  |
| 5 | exact_working_directory | false |  |
| 6 | exact_credentials_env_api_webhook_boundary | false |  |
| 7 | exact_external_call_boundary | false |  |
| 8 | exact_production_data_boundary | false |  |
| 9 | exact_schema_auth_rls_security_boundary | false |  |
| 10 | exact_public_route_webhook_scheduler_cron_dispatcher_boundary | false |  |
| 11 | exact_messaging_contact_permission_boundary | false |  |
| 12 | exact_calendar_appointment_boundary | false |  |
| 13 | exact_reporting_csv_boundary | false |  |
| 14 | exact_stop_conditions | false |  |
| 15 | exact_rollback_owner | false |  |
| 16 | exact_evidence_owner | false |  |
| 17 | exact_log_path | false |  |
| 18 | exact_approval_expiration | false |  |
| 19 | exact_one_time_use_limitation | false |  |

## 3. Field Guidance (not filled — reference only)

| # | Field | Guidance |
| --- | --- | --- |
| 1 | exact_services | Named list of external services explicitly in scope (e.g., Twilio sandbox, Resend test mode) |
| 2 | exact_test_accounts | Named test accounts/numbers/emails explicitly in scope |
| 3 | exact_environment | Named environment (local dev, staging, sandbox project) |
| 4 | exact_command | Exact bash command to run (full path, no wildcards) |
| 5 | exact_working_directory | Absolute working directory for command execution |
| 6 | exact_credentials_env_api_webhook_boundary | Which env vars/API keys/webhooks may be read (named only, no values logged) |
| 7 | exact_external_call_boundary | Which external HTTP/API calls are permitted |
| 8 | exact_production_data_boundary | Which data stores/tables/records may be read or written |
| 9 | exact_schema_auth_rls_security_boundary | Schema/auth/RLS/security change boundary (expected: none) |
| 10 | exact_public_route_webhook_scheduler_cron_dispatcher_boundary | Public route/webhook/scheduler/cron/dispatcher boundary (expected: none) |
| 11 | exact_messaging_contact_permission_boundary | SMS/email/call consent and contact permission boundaries |
| 12 | exact_calendar_appointment_boundary | Calendar/appointment creation/update boundaries |
| 13 | exact_reporting_csv_boundary | Reporting/CSV export boundaries (fake-data vs live) |
| 14 | exact_stop_conditions | Named stop conditions that halt execution immediately |
| 15 | exact_rollback_owner | Named person responsible for rollback |
| 16 | exact_evidence_owner | Named person responsible for evidence capture |
| 17 | exact_log_path | Exact filesystem path for run log |
| 18 | exact_approval_expiration | Date/time or event after which approval expires |
| 19 | exact_one_time_use_limitation | Whether approval is single-use and what invalidates reuse |

## 4. Completion Rules

- All 19 fields must be filled with named exact values before sandbox/test-mode activation can be considered.
- Partial completion (any blank field) keeps `capture_status` at `blank_draft_only` or `incomplete`.
- Filling this worksheet does **not** grant approval — Jason must separately grant explicit sandbox/test-mode approval with all exact values recorded.
- `approved_for_activation_now` remains `false` until all exact values are filled **and** separate explicit approval is granted.

## 5. Connected Artifacts

- Capture draft: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_CAPTURE_DRAFT.md`
- Completeness review: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_COMPLETENESS_REVIEW.md`
- Structured fixture: `backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-exact-values-capture-draft.json`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.