# Native Workflow Fixture P3 Credential/Service/Environment/Stop-Condition Matrix

## 1. Purpose and Scope

This packet defines a **fake-data/local-only/read-only/dry-run-only/review-only credential/service/environment/stop-condition matrix** for all external services and production-adjacent boundaries — **without** granting activation, accessing credentials, or connecting to any service.

### What this packet is

- service-by-service approval boundary matrix
- credential/env, environment, stop-condition, rollback, and evidence requirements per service
- read-only verifier input for P3 planning packet
- packet_status is `review_only`
- all approval statuses remain `not_granted` or `blocked`

### What this packet is not

- This is **not** approval to activate anything.
- This does **not** approve live activation.
- This does **not** approve sandbox/test-mode activation.
- This does **not** run the final activation command.
- This does **not** access credentials, env, API, or webhooks.

## 2. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | db9ece3 |
| p1_polish_status | completed |
| p2_refinement_status | completed |
| evidence_chain_status | passed |
| p0_blockers_count | 0 |

### Evidence chain commits

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

## 3. Service Matrix

All rows below have approval status `not_granted` or `blocked`. No service is approved for activation by this matrix.

### Row 1: Twilio/SMS

| Field | Value |
| --- | --- |
| service | Twilio/SMS |
| current status | disabled_local_fake_data_only |
| approval status | not_granted |
| credential/env needed | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` (not accessed) |
| allowed environment | none_without_separate_approval |
| blocked environment | production, live, sandbox_without_approval |
| test account requirement | named Twilio test/sandbox account required before approval |
| stop condition | any live SMS send halts immediately |
| rollback owner | named rollback owner required before approval |
| evidence requirement | test-mode send log, no production recipient evidence |
| current decision | blocked |

### Row 2: Vapi outbound

| Field | Value |
| --- | --- |
| service | Vapi outbound |
| current status | disabled_local_fake_data_only |
| approval status | not_granted |
| credential/env needed | `VAPI_API_KEY`, `VAPI_ASSISTANT_ID` (not accessed) |
| allowed environment | none_without_separate_approval |
| blocked environment | production, live, sandbox_without_approval |
| test account requirement | named Vapi test account required before approval |
| stop condition | any live outbound call halts immediately |
| rollback owner | named rollback owner required before approval |
| evidence requirement | test-mode call log, no production callee evidence |
| current decision | blocked |

### Row 3: Vapi webhook intake

| Field | Value |
| --- | --- |
| service | Vapi webhook intake |
| current status | disabled_local_fake_data_only |
| approval status | not_granted |
| credential/env needed | `VAPI_WEBHOOK_SECRET`, public webhook URL (not accessed) |
| allowed environment | none_without_separate_approval |
| blocked environment | production, live, public_route_without_approval |
| test account requirement | named Vapi test webhook endpoint required before approval |
| stop condition | any public webhook route activation halts immediately |
| rollback owner | named rollback owner required before approval |
| evidence requirement | webhook intake log, no production caller evidence |
| current decision | blocked |

### Row 4: Resend

| Field | Value |
| --- | --- |
| service | Resend |
| current status | disabled_local_fake_data_only |
| approval status | not_granted |
| credential/env needed | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (not accessed) |
| allowed environment | none_without_separate_approval |
| blocked environment | production, live, sandbox_without_approval |
| test account requirement | named Resend test account required before approval |
| stop condition | any live email send halts immediately |
| rollback owner | named rollback owner required before approval |
| evidence requirement | test-mode send log, no production recipient evidence |
| current decision | blocked |

### Row 5: Google Calendar

| Field | Value |
| --- | --- |
| service | Google Calendar |
| current status | disabled_local_fake_data_only |
| approval status | not_granted |
| credential/env needed | `GOOGLE_CALENDAR_CLIENT_ID`, `GOOGLE_CALENDAR_CLIENT_SECRET`, `GOOGLE_CALENDAR_REFRESH_TOKEN` (not accessed) |
| allowed environment | none_without_separate_approval |
| blocked environment | production, live, sandbox_without_approval |
| test account requirement | named Google Calendar test account required before approval |
| stop condition | any live calendar event creation halts immediately |
| rollback owner | named rollback owner required before approval |
| evidence requirement | test-mode event log, no production calendar evidence |
| current decision | blocked |

### Row 6: Lindy

| Field | Value |
| --- | --- |
| service | Lindy |
| current status | disabled_local_fake_data_only |
| approval status | not_granted |
| credential/env needed | `LINDY_API_KEY`, `LINDY_WORKFLOW_ID` (not accessed) |
| allowed environment | none_without_separate_approval |
| blocked environment | production, live, sandbox_without_approval |
| test account requirement | named Lindy test account required before approval |
| stop condition | any live Lindy workflow dispatch halts immediately |
| rollback owner | named rollback owner required before approval |
| evidence requirement | test-mode dispatch log, no production workflow evidence |
| current decision | blocked |

### Row 7: Supabase test-mode

| Field | Value |
| --- | --- |
| service | Supabase test-mode |
| current status | disabled_local_fake_data_only |
| approval status | not_granted |
| credential/env needed | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (test project only, not accessed) |
| allowed environment | none_without_separate_approval |
| blocked environment | production |
| test account requirement | named Supabase test project required before approval |
| stop condition | any production Supabase project access halts immediately |
| rollback owner | named rollback owner required before approval |
| evidence requirement | test-mode read/write log, no production table evidence |
| current decision | blocked |

### Row 8: Supabase production

| Field | Value |
| --- | --- |
| service | Supabase production |
| current status | disabled_blocked |
| approval status | blocked |
| credential/env needed | production `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (not accessed) |
| allowed environment | none |
| blocked environment | production, all |
| test account requirement | not_applicable_production_blocked |
| stop condition | any production Supabase read/write halts immediately |
| rollback owner | named rollback owner required before approval |
| evidence requirement | production access audit log (not captured — blocked) |
| current decision | blocked |

### Row 9: CSV/reporting delivery

| Field | Value |
| --- | --- |
| service | CSV/reporting delivery |
| current status | disabled_local_fake_data_only |
| approval status | not_granted |
| credential/env needed | delivery channel credentials if any (not accessed) |
| allowed environment | none_without_separate_approval |
| blocked environment | production, live_delivery, external_crm |
| test account requirement | named test delivery target required before approval |
| stop condition | any live CSV delivery or production export halts immediately |
| rollback owner | named rollback owner required before approval |
| evidence requirement | one-directional reporting log, not CRM sync evidence |
| current decision | blocked |

### Row 10: CRM sync

| Field | Value |
| --- | --- |
| service | CRM sync |
| current status | disabled_blocked |
| approval status | blocked |
| credential/env needed | CRM API credentials (not accessed) |
| allowed environment | none |
| blocked environment | production, live, all |
| test account requirement | not_applicable_crm_sync_blocked_near_term |
| stop condition | any CRM sync attempt halts immediately |
| rollback owner | named rollback owner required before approval |
| evidence requirement | no CRM sync evidence (blocked) |
| current decision | blocked |

### Row 11: billing/payment/quote/estimate/invoice automation

| Field | Value |
| --- | --- |
| service | billing/payment/quote/estimate/invoice automation |
| current status | disabled_blocked |
| approval status | blocked |
| credential/env needed | payment processor credentials (not accessed) |
| allowed environment | none |
| blocked environment | production, live, all |
| test account requirement | not_applicable_billing_automation_blocked |
| stop condition | any billing/payment/quote/estimate/invoice action halts immediately |
| rollback owner | named rollback owner required before approval |
| evidence requirement | no billing automation evidence (blocked) |
| current decision | blocked |

## 4. Matrix Summary

| Field | Value |
| --- | --- |
| service_rows_count | 11 |
| all_approval_statuses | not_granted or blocked |
| activation_approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
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
| safety_status | demo_ready_with_live_automation_disabled |
| old_90_day_plan_boundary | old 90-day plan cannot override current source-of-truth direction |
| public_website_go_live_copy_changed | false |

## 5. Connected P3 Planning Packet Artifacts

- Sandbox/test-mode approval request draft: `docs/NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_DRAFT.md`
- Live activation approval request draft: `docs/NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_LIVE_ACTIVATION_APPROVAL_REQUEST_DRAFT.md`
- Exact command execution approval template: `docs/NATIVE_WORKFLOW_FIXTURE_P3_EXACT_COMMAND_EXECUTION_APPROVAL_TEMPLATE.md`
- Rollback and evidence capture checklist: `docs/NATIVE_WORKFLOW_FIXTURE_P3_ROLLBACK_AND_EVIDENCE_CAPTURE_CHECKLIST.md`
- Structured P3 planning fixture: `backend/fixtures/native-workflow-demo-roofer/p3-future-approval-planning-packet.json`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only.