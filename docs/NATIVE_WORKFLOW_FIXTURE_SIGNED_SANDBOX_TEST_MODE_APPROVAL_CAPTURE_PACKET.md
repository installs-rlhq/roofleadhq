# Native Workflow Fixture Signed Sandbox/Test-Mode Approval Capture Packet

## 1. Purpose and Scope

This packet is a **fake-data/local-only/read-only/dry-run-only/review-only/approval-capture-only/non-executing** signed approval evidence capture packet. It records Jason Lohse’s exact signed sandbox/test-mode approval statement into local review-only repo artifacts. It updates approval-capture evidence state from blank/not_captured to captured/signed for the exact scoped sandbox/test-mode approval. It does **not** execute the approved command, activate sandbox/test-mode, activate live automation, make external calls, access credentials, access production data, or contact any real roofer or homeowner.

### What this packet is

- signed sandbox/test-mode approval evidence capture packet only
- approval_capture_status: `captured`
- jason_signed_approval_status: `signed`
- sandbox_test_mode_approval_status: `granted_scoped_one_time_pending_pre_run_guard`
- source-of-truth baseline commit `06529ab`
- read-only verifier input
- packet_status is `review_only`
- review_status is `signed_sandbox_test_mode_approval_capture_review_only`

### What this packet is not

- This packet captures signed approval evidence **only**.
- This packet does **not** execute the approved command.
- This packet does **not** pass the pre-run guard by itself.
- This packet does **not** activate sandbox/test-mode by itself.
- This packet does **not** approve live activation.
- This packet does **not** approve real homeowner contact.
- This packet does **not** approve real roofer contact.
- This packet does **not** approve production data access.
- This packet does **not** make external calls.
- This packet does **not** access credentials.
- This packet does **not** contact any real roofer or homeowner.
- This is **not** approval to activate anything now.
- Approval capture does **not** equal activation.

### Next required step

The next required step is a **separate pre-run guard pass** before any command execution. The approved command may only be considered after this packet closes in canonical main and the pre-run guard passes.

**Explicit note:** future_command_status is `blocked_until_pre_run_guard_passes`.

**Explicit note:** approved_for_activation_now is `false`.

**Explicit note:** command_execution_status is `not_run_by_this_packet`.

### Standing local build approval (recorded, limited)

Jason has given standing approval for bigger/faster Grok Build batches that remain local-only, fake-data-only, read-only, dry-run-only, review-only. Standing local build approval allows this approval-capture packet. It does **not** by itself pass the pre-run guard or execute the approved command.

## 2. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | 06529ab |
| source_of_truth_label | test(workflow): add final jason exact sandbox test mode approval copy paste packet |

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
- `b6d852c` — sandbox/test-mode exact values recommended defaults proposal
- `7f375a4` — sandbox/test-mode recommended defaults acceptance boundary
- `878fc77` — sandbox/test-mode approval request ready packet
- `f56340f` — sandbox/test-mode Jason approval capture packet
- `aa3f818` — sandbox/test-mode approval capture completeness gate
- `15644fa` — sandbox/test-mode channel validation evidence capture packet
- `cc67563` — sandbox/test-mode channel validation completeness gate
- `0159faf` — controlled real roofer pilot setup evidence capture packet
- `dbb30a7` — controlled real roofer pilot setup completeness gate
- `436813f` — controlled real roofer limited validation evidence capture
- `32c2c8b` — controlled real roofer limited validation completeness gate
- `f36a247` — pilot readiness master no-go approval dependency summary
- `7f57e7d` — post-approval sandbox/test-mode operator runbook draft
- `e96ff0e` — post-approval sandbox/test-mode pre-run guard draft
- `1c04c0c` — final sandbox/test-mode approval decision board
- `06529ab` — final Jason exact sandbox/test-mode approval copy/paste packet (source-of-truth baseline for this packet)

## 3. Approval Capture Status Summary

| Field | Value |
| --- | --- |
| pilot_readiness_summary | demo_ready_with_live_automation_disabled |
| pilot_readiness_master_gate_decision | NO_GO |
| approval_capture_status | captured |
| jason_signed_approval_status | signed |
| approval_signature_name | Jason Lohse |
| approval_timestamp | 06/18/2026 10:00PM MST |
| approval_expiration | 7 calendar days from timestamp OR upon completion of 30-scenario validation run, whichever comes first |
| sandbox_test_mode_approval_status | granted_scoped_one_time_pending_pre_run_guard |
| live_activation_approval_status | not_granted |
| controlled_real_roofer_validation_approval_status | not_granted |
| real_homeowner_contact_approval_status | not_granted |
| real_roofer_contact_approval_status | not_granted |
| production_supabase_write_approval_status | not_granted |
| schema_auth_rls_security_change_approval_status | not_granted |
| billing_payment_automation_approval_status | not_granted |
| exact_values_required_count | 19 |
| accepted_exact_values_count | 19 |
| accepted_exact_values_filled_count | 19 |
| approved_exact_values_filled_count | 19 |
| all_19_exact_values_status | accepted_and_approved_for_exact_scoped_sandbox_test_mode_only |
| approved_exact_command | bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh |
| approved_exact_working_directory | /root/roofleadhq |
| approved_for_activation_now | false |
| command_execution_status | not_run_by_this_packet |
| future_command_status | blocked_until_pre_run_guard_passes |
| current_recommended_next_step | RUN_POST_APPROVAL_SANDBOX_TEST_MODE_PRE_RUN_GUARD_BEFORE_ANY_COMMAND_EXECUTION |

## 4. Captured Jason Signed Approval Statement (User-Provided Evidence)

**CAPTURED / SIGNED / SCOPED SANDBOX-TEST-MODE ONLY — NOT ACTIVATION — DO NOT EXECUTE FROM THIS PACKET**

```text
I, Jason Lohse, explicitly approve the exact scoped sandbox/test-mode run described below.

This approval is sandbox/test-mode only.
This approval does not approve live activation.
This approval does not approve real homeowner contact.
This approval does not approve real roofer contact unless separately approved.
This approval does not approve production Supabase writes.
This approval does not approve schema/auth/RLS/security changes.
This approval does not approve billing/payment/deposit/invoice/quote/estimate automation.
This approval is one-time-use only.

1. exact_services: Twilio Sandbox SMS API (inbound/outbound stubs to sandbox numbers only); Vapi test assistant API (call stub, no live outbound); Resend test mode API (test inbox only, no live sends); RoofLeadHQ sandbox/staging Supabase project (scoped tables only)

2. exact_test_accounts: Twilio sandbox test number (Jason-designated); Vapi test assistant ID (Jason-designated); Resend test inbox address (Jason-designated); Summit Peak Roofing Demo LLC operator sandbox login (fake demo roofer scope only)

3. exact_environment: Local dev workstation at RoofLeadHQ repository root; RoofLeadHQ sandbox/staging Supabase project (explicitly not production)

4. exact_command: bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh

5. exact_working_directory: /root/roofleadhq

6. exact_credentials_env_api_webhook_boundary: Named vars only (no values logged): TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_TEST_NUMBER, VAPI_API_KEY, VAPI_ASSISTANT_ID, RESEND_API_KEY, SUPABASE_SANDBOX_URL, SUPABASE_SANDBOX_ANON_KEY, SUPABASE_SANDBOX_SERVICE_ROLE_KEY — sandbox/staging only; production vars forbidden

7. exact_external_call_boundary: Twilio Sandbox SMS API (send/receive to sandbox numbers only); Vapi test API (assistant stub calls only); Resend test API (test inbox only); Supabase sandbox project REST/RPC only — no production endpoints, no CRM, no billing

8. exact_production_data_boundary: No production Supabase reads/writes; no production homeowner/roofer PII; sandbox/staging tables scoped to Summit Peak Roofing Demo LLC test data only; local fake demo fixtures allowed

9. exact_schema_auth_rls_security_boundary: No schema migrations; no auth changes; no RLS policy changes; no security config changes — read/write sandbox data only within existing schema

10. exact_public_route_webhook_scheduler_cron_dispatcher_boundary: No new public routes; no webhook exposure; no scheduler/cron/dispatcher activation; no inbound webhook handlers — local dry-run and sandbox API stubs only

11. exact_messaging_contact_permission_boundary: Sandbox test numbers only; explicit opt-in for Jason-designated test contacts; STOP/opt-out honored immediately; no live homeowner SMS/email/calls; compliance hold before any send

12. exact_calendar_appointment_boundary: Calendar stub events in sandbox only; no live Google/Outlook integration; manual coordination fallback required; inspection/appointment records in sandbox DB only

13. exact_reporting_csv_boundary: Local fake-data CSV exports and sandbox admin dashboard views only; no live CSV delivery to external systems; no production reporting emails; audit logs in sandbox scope only

14. exact_stop_conditions: unexpected live service indicator; unexpected production data access; unexpected external call outside boundary; unexpected schema/auth/RLS change; unexpected public route/webhook/scheduler; unexpected billing/payment behavior; real-data ambiguity; approval ambiguity; safe readiness failure; backend build failure (per NO_GO_STOP_CONDITION_CHECKLIST)

15. exact_rollback_owner: Jason Lohse (founder/operator)

16. exact_evidence_owner: Jason Lohse (founder/operator)

17. exact_log_path: logs/sandbox-test-mode-channel-validation/{YYYY-MM-DD-HHMMSS}.log under repo root

18. exact_approval_expiration: 7 calendar days from explicit Jason sandbox/test-mode approval timestamp OR upon completion of 30-scenario validation run, whichever comes first

19. exact_one_time_use_limitation: Single-use approval per sandbox/test-mode validation batch; invalidated after 30 scenarios complete, any STOP_AND_ROLL_BACK, or approval expiration; reuse requires new explicit Jason approval with refreshed exact values

Signature: Jason Lohse
Timestamp: 06/18/2026 10:00PM MST
Expiration: 7 calendar days from timestamp OR upon completion of 30-scenario validation run, whichever comes first
```

| Field | Value |
| --- | --- |
| captured_jason_signed_approval_statement_status | CAPTURED_SIGNED_SCOPED_SANDBOX_TEST_MODE_ONLY_NOT_ACTIVATION |
| captured_jason_signed_approval_statement_captured | true |
| captured_jason_signed_approval_statement_signed | true |
| captured_jason_signed_approval_statement_activation_granted | false |

## 5. Exact Sandbox/Test-Mode Values (19 — All Accepted and Approved)

All 19 exact values are accepted and approved for exact scoped sandbox/test-mode only.

| Field | accepted_by_jason | approved_by_jason | status |
| --- | --- | --- | --- |
| exact_services | true | true | accepted_and_approved |
| exact_test_accounts | true | true | accepted_and_approved |
| exact_environment | true | true | accepted_and_approved |
| exact_command | true | true | accepted_and_approved |
| exact_working_directory | true | true | accepted_and_approved |
| exact_credentials_env_api_webhook_boundary | true | true | accepted_and_approved |
| exact_external_call_boundary | true | true | accepted_and_approved |
| exact_production_data_boundary | true | true | accepted_and_approved |
| exact_schema_auth_rls_security_boundary | true | true | accepted_and_approved |
| exact_public_route_webhook_scheduler_cron_dispatcher_boundary | true | true | accepted_and_approved |
| exact_messaging_contact_permission_boundary | true | true | accepted_and_approved |
| exact_calendar_appointment_boundary | true | true | accepted_and_approved |
| exact_reporting_csv_boundary | true | true | accepted_and_approved |
| exact_stop_conditions | true | true | accepted_and_approved |
| exact_rollback_owner | true | true | accepted_and_approved |
| exact_evidence_owner | true | true | accepted_and_approved |
| exact_log_path | true | true | accepted_and_approved |
| exact_approval_expiration | true | true | accepted_and_approved |
| exact_one_time_use_limitation | true | true | accepted_and_approved |

## 6. Approved Services/Channels (Sandbox/Test-Mode Scoped Only)

| Approved (sandbox/test-mode only) | Forbidden |
| --- | --- |
| Twilio Sandbox SMS API only | no live Twilio |
| Vapi test assistant API only | no live Vapi outbound |
| Resend test mode API only | no live Resend sends |
| RoofLeadHQ sandbox/staging Supabase project only | no live Calendar integration |
| | no production Supabase |
| | no CRM |
| | no billing |

## 7. Why This Packet Does Not Execute or Activate

| Reason | Current state |
| --- | --- |
| Pre-run guard not passed | future_command_status blocked_until_pre_run_guard_passes |
| No command execution in this packet | command_execution_status not_run_by_this_packet |
| No activation now | approved_for_activation_now false |
| Live activation not approved | live_activation_approval_status not_granted |
| Real homeowner contact not approved | real_homeowner_contact_approval_status not_granted |
| Real roofer contact not approved | real_roofer_contact_approval_status not_granted |
| Production Supabase writes not approved | production_supabase_write_approval_status not_granted |
| Schema/auth/RLS/security changes not approved | schema_auth_rls_security_change_approval_status not_granted |
| Billing/payment automation not approved | billing_payment_automation_approval_status not_granted |
| Sandbox/test-mode activation not enabled by capture alone | sandbox_test_mode_activation_allowed false |
| Channel validation evidence not yet captured | 0 of 30 captured |
| Pilot readiness preserved | demo_ready_with_live_automation_disabled |

## 8. Packet Artifacts and Verification

| Artifact | Path |
| --- | --- |
| Approval capture packet (this doc) | `docs/NATIVE_WORKFLOW_FIXTURE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_PACKET.md` |
| NO-GO review companion | `docs/NATIVE_WORKFLOW_FIXTURE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_PACKET_NO_GO_REVIEW.md` |
| Upstream copy/paste template packet | `docs/NATIVE_WORKFLOW_FIXTURE_FINAL_JASON_EXACT_SANDBOX_TEST_MODE_APPROVAL_COPY_PASTE_PACKET.md` |
| Upstream pre-run guard draft | `docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_PRE_RUN_GUARD_DRAFT.md` |
| Structured fixture | `backend/fixtures/native-workflow-demo-roofer/signed-sandbox-test-mode-approval-capture-packet.json` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-signed-sandbox-test-mode-approval-capture-packet-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-signed-sandbox-test-mode-approval-capture-packet-dry-run.sh` |

Dry-run command:

```bash
bash scripts/run-native-workflow-fixture-signed-sandbox-test-mode-approval-capture-packet-dry-run.sh
```

Read-only verifier:

```bash
node backend/scripts/verify-native-workflow-fixture-signed-sandbox-test-mode-approval-capture-packet-readonly.js
```

## 9. Packet Safety Posture (unchanged by this packet)

| Field | Value |
| --- | --- |
| safety_status | demo_ready_with_live_automation_disabled |
| live_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| real_roofer_onboarding_contact_allowed | false |
| real_roofer_contact_allowed | false |
| real_homeowner_contact_allowed | false |
| controlled_real_roofer_validation_allowed | false |
| external_calls_allowed | false |
| credentials_access_allowed | false |
| production_data_access_allowed | false |
| schema_auth_rls_security_changes_allowed | false |
| public_route_webhook_scheduler_cron_dispatcher_allowed | false |
| billing_payment_automation_allowed | false |
| public_go_live_or_production_copy_changes_allowed | false |
| real_demo_sandbox_live_testing_allowed | false |
| public_website_go_live_copy_changed | false |
| old_90_day_plan_boundary | old 90-day plan cannot override current source-of-truth direction |

Full aggregate regression lane remains preserved via `scripts/verify-safe-readiness.sh`.