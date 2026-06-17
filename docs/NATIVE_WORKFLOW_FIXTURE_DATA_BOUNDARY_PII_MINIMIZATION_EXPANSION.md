# Native Workflow Fixture Data Boundary / PII Minimization Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data data-boundary and homeowner personal information (PII) minimization coverage so RoofLeadHQ can prove that fixture reporting, CSV snapshots, review queues, audit timelines, feedback records, and workflow states avoid production data, avoid secrets, minimize homeowner personal information, and preserve customer data-handling warnings before any future schema or persistence work.

It deepens the local fixture data-handling boundary layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only data-boundary / PII minimization expansion
- fake data only
- deterministic `pii_minimization_items` and boundary summaries
- reporting, CSV, review queue, audit, and feedback PII boundary summaries
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production data-handling or privacy implementation.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** log secrets, credentials, env values, or real homeowner data.
- This does **not** trigger live notifications, sends, production writes, external calls, or CRM sync.
- This does **not** change public website/pricing/legal/privacy/terms copy without approval.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that fixture reporting, CSV snapshots, review queues, audit timelines, feedback records, and workflow states preserve data boundaries and homeowner PII minimization before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_APPOINTMENT_READINESS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_POST_INSPECTION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FEEDBACK_PERMISSION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_OUTREACH_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MISSED_LEAD_RECOVERY_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_USAGE_VOLUME_PLAN_LIMIT_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_LEAD_SOURCE_ROI_BOUNDARY_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MESSAGING_COMPLIANCE_CONTACT_PERMISSION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_AUDIT_EVENT_TIMELINE_EXPANSION.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

This packet relates to the Local E2E Fixture Runner dry-run layer and the first paid roofer onboarding path. It preserves the same fake-data-only boundary.

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_DATA_BOUNDARY_PII_MINIMIZATION_EXPANSION.md`
- `scripts/run-native-workflow-fixture-data-boundary-pii-minimization-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-data-boundary-pii-minimization-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `e4d3268 test(workflow): expand native workflow fixture audit timeline`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `data_boundary_pii_expansion_summary`, `pii_minimization_items`, `data_category_summary`
- `fake_homeowner_data_summary`, `production_data_boundary_summary`, `secret_logging_boundary_summary`
- `csv_pii_warning_summary`, `reporting_pii_boundary_summary`, `audit_pii_boundary_summary`
- `review_queue_pii_boundary_summary`, `feedback_pii_boundary_summary`, `data_boundary_safety_assertions`
- per-scenario `pii_minimization_items`

All 25 scenarios, transition logs, guard assertions, and prior expansion output fields remain intact.

## 3. Safety Boundaries

- local fixture-only dry-run implementation
- local fake-data dry-run only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- **no Supabase** reads or writes
- **no schema** changes
- **no migrations**
- **no auth/RLS/security** changes
- **no production data** reads or writes
- **no live automation** activation
- **no integrations**
- **no external calls**
- **no bidirectional CRM integration**
- **no payment/deposit/invoice/estimate automation**
- no env/credential changes
- read-only verifier only
- dry-run wrapper only
- Live automation remains disabled unless Jason explicitly approves activation.

## 4. Data Category Coverage

| Data category | Boundary purpose |
| --- | --- |
| contractor/customer account data | Fixture account identifiers only |
| roofer company/contact details | Fixture company/contact fields only |
| homeowner name | Fake names only in summaries |
| homeowner phone | Fake or masked in summaries |
| homeowner email | Fake or masked in summaries |
| service address | Fake or generalized in summaries |
| city/state/service area | Generalized service area only |
| roofing issue details | Minimized issue summary |
| urgency | Minimized urgency marker |
| insurance claim status if provided | Minimized or not_provided |
| preferred appointment windows | Minimized scheduling preference |
| lead source and source detail | Fixture attribution only |
| campaign/ad source if known | Optional; marked unknown when absent |
| message/call/transcript summaries | Future optional; minimized when referenced |
| appointment/booking data | Fixture booking markers only |
| follow-up data | Minimized follow-up summary |
| review/escalation notes | Minimized review notes |
| post-inspection status | Minimized status summary |
| post-inspection feedback | Internal boundary unless public permission |
| report data | Fake reporting with data boundary |
| CSV export data | Fake CSV with PII warnings |
| photo status fields only | Status fields only in fixture |
| photos only as future optional/not active | Not active in fixture |

## 5. PII Minimization Item Fields

Each `pii_minimization_item` includes:

- `pii_minimization_item_id`, `scenario_id`, `lead_id`, `roofer_account_id`, `plan_profile`
- `workflow_area`, `data_category`, `fake_homeowner_identifier_used`
- `homeowner_name_fake`, `homeowner_phone_fake_or_masked`, `homeowner_email_fake_or_masked`
- `service_address_fake_or_generalized`, `roofing_issue_summary_minimized`
- `insurance_claim_status_minimized`, `message_content_minimized`
- `review_notes_minimized`, `feedback_summary_minimized`
- `csv_personal_information_warning_present`, `customer_export_responsibility_warning_present`
- `production_data_boundary_checked`, `secret_or_credential_boundary_checked`, `audit_event_id`
- `secret_or_credential_logged: no`
- `production_data_touched: no`
- `external_services_called: no`
- `live_action_performed: no`

## 6. Data Boundary Rules

- All fixture data must be fictional/fake.
- No production Supabase reads or writes.
- No schema, migrations, auth, RLS, or security implementation.
- No secrets, credentials, env values, tokens, API keys, webhook URLs, service-role keys, or private config should be logged.
- Homeowner personal information should be minimized in audit/review/reporting summaries.
- CSV/reporting snapshots may include fake homeowner personal information but must carry warnings.
- Customer/contractor remains responsible for downloaded/exported data handling.
- CSV remains one-directional and fake-data/local only.
- No CSV export should push data back to RoofLeadHQ.
- No CSV export should auto-update after download.
- No bidirectional CRM integration.
- No external service calls.
- No live sends or notifications.

## 7. Review / Audit Rules

- Review queue items should include only the minimum fake homeowner information needed to understand the workflow issue.
- Audit events should not contain full message text unless fake/minimized and necessary.
- Feedback summaries must remain internal unless `permission_to_use_publicly` is yes, and even then no automatic publication occurs.
- Negative/disputed feedback must remain internal and route to review.
- RoofLeadHQ/Jason review remains limited to system/workflow/data/routing/quality issues.
- Roofer/contractor review owns business judgment.

## 8. Verifier Assertions

The read-only verifier enforces:

- `data_boundary_pii_expansion_summary_present`
- `pii_minimization_items_present`
- `pii_minimization_item_required_fields_present`
- `required_data_categories_present`
- `fixture_data_is_fake_only`
- `no_production_supabase_reads_or_writes`
- `no_schema_migrations_auth_rls_security_changes`
- `no_secret_or_credential_logged`
- `no_env_values_logged`
- `homeowner_name_is_fake_or_minimized`
- `homeowner_phone_is_fake_or_masked`
- `homeowner_email_is_fake_or_masked`
- `service_address_is_fake_or_generalized`
- `roofing_issue_summary_is_minimized`
- `insurance_claim_status_is_minimized`
- `message_content_is_minimized`
- `review_notes_are_minimized`
- `feedback_summary_is_internal_boundary_checked`
- `csv_personal_information_warning_present`
- `customer_export_responsibility_warning_present`
- `csv_export_is_one_directional`
- `csv_does_not_push_data_back`
- `csv_does_not_auto_update_after_download`
- `no_native_crm_sync`
- `no_live_csv_delivery`
- `no_external_service_calls`
- `no_live_sms_email_or_calls`
- `no_customer_notifications`
- `production_data_touched_is_no_for_all_items`
- `external_services_called_is_no_for_all_items`
- `live_action_performed_is_no_for_all_items`
- `audit_events_have_pii_minimization_boundary`
- `review_queue_has_pii_minimization_boundary`
- `reporting_summary_includes_data_boundary`
- `public_legal_or_privacy_copy_not_changed_without_approval`

## 9. Commands

```bash
# Dry-run wrapper (local fixture-only)
scripts/run-native-workflow-fixture-data-boundary-pii-minimization-expansion-dry-run.sh

# Read-only verifier
node backend/scripts/verify-native-workflow-fixture-data-boundary-pii-minimization-expansion-readonly.js

# Fixture runner (stdout JSON only)
node backend/scripts/run-native-workflow-fixture-state-model-dry-run.js
```

## 10. First Paid Roofer Relationship

This packet supports the first paid roofer dry-run onboarding path by providing deterministic fake-data evidence that fixture reporting, CSV snapshots, review queues, audit timelines, and feedback records preserve data boundaries and homeowner PII minimization before any production persistence. It is internal-only and must not be copied into public sales copy.