# Native Workflow Fixture Sandbox/Test-Mode Channel Validation Stop/Rollback Checklist

## Purpose

This checklist defines fail-closed stop and rollback conditions for any future sandbox/test-mode channel validation evidence capture run. Each item maps to exactly one decision: `NO_GO_KEEP_BLOCKED`, `STOP_AND_ROLL_BACK`, or `CONTINUE_WITH_EVIDENCE_CAPTURE`. This checklist does **not** equal approval.

| Field | Value |
| --- | --- |
| source_of_truth_commit | aa3f818 |
| evidence_capture_status | not_captured |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| stop_rollback_checklist_does_not_equal_approval | true |
| default_sandbox_test_mode_decision | HOLD |

**Explicit note:** Stop/rollback checklist does **not** equal approval.

---

## Pre-Run Blockers (NO_GO_KEEP_BLOCKED)

| # | Condition | Decision |
| --- | --- | --- |
| 1 | sandbox_test_mode_approval_status is not_granted | NO_GO_KEEP_BLOCKED |
| 2 | approval_capture_gate_decision is NO_GO or HOLD | NO_GO_KEEP_BLOCKED |
| 3 | missing exact command for validation run | NO_GO_KEEP_BLOCKED |
| 4 | missing exact environment | NO_GO_KEEP_BLOCKED |
| 5 | missing test account | NO_GO_KEEP_BLOCKED |
| 6 | missing credential boundary | NO_GO_KEEP_BLOCKED |
| 7 | missing external service boundary | NO_GO_KEEP_BLOCKED |
| 8 | missing production data boundary | NO_GO_KEEP_BLOCKED |
| 9 | missing rollback owner | NO_GO_KEEP_BLOCKED |
| 10 | missing evidence owner | NO_GO_KEEP_BLOCKED |
| 11 | source-of-truth mismatch | NO_GO_KEEP_BLOCKED |
| 12 | dirty git status | NO_GO_KEEP_BLOCKED |
| 13 | pilot readiness not demo_ready_with_live_automation_disabled | NO_GO_KEEP_BLOCKED |
| 14 | safe readiness failure | NO_GO_KEEP_BLOCKED |
| 15 | backend build failure | NO_GO_KEEP_BLOCKED |
| 16 | any of 19 accepted exact values not filled | NO_GO_KEEP_BLOCKED |
| 17 | any of 19 approved exact values not filled | NO_GO_KEEP_BLOCKED |
| 18 | jason_signed_approval_status is not_signed | NO_GO_KEEP_BLOCKED |

---

## During-Run Stop Conditions (STOP_AND_ROLL_BACK)

| # | Condition | Decision |
| --- | --- | --- |
| 19 | unexpected live service indicator | STOP_AND_ROLL_BACK |
| 20 | unexpected production data access | STOP_AND_ROLL_BACK |
| 21 | unexpected external call outside approved scope | STOP_AND_ROLL_BACK |
| 22 | unexpected schema/auth/RLS/security change | STOP_AND_ROLL_BACK |
| 23 | unexpected public route/webhook/scheduler/cron/dispatcher change | STOP_AND_ROLL_BACK |
| 24 | unexpected billing/payment/quote/estimate/invoice behavior | STOP_AND_ROLL_BACK |
| 25 | any homeowner/roofer real-data ambiguity | STOP_AND_ROLL_BACK |
| 26 | any approval ambiguity | STOP_AND_ROLL_BACK |
| 27 | scenario pass_fail_result is FAIL with safety impact | STOP_AND_ROLL_BACK |
| 28 | stop_rollback_triggered_yes_no is YES for safety scenario | STOP_AND_ROLL_BACK |

---

## Per-Scenario Evidence Capture Requirements

For each of the 30 validation scenarios, evidence capture must record:

| Field | Required |
| --- | --- |
| scenario_id | yes |
| test_account_used | yes |
| approved_scope_reference | yes |
| command_run_reference | yes |
| expected_behavior | yes |
| observed_behavior | yes |
| external_calls_observed | yes |
| messages_calls_calendar_reporting_logs_captured | yes |
| pass_fail_result | yes |
| stop_rollback_triggered_yes_no | yes |
| evidence_owner | yes |
| timestamp | yes |
| artifact_log_path | yes |
| reviewer_signoff | yes |

---

## Stop/Rollback Validation Scenarios (3 recommended defaults)

| Scenario ID | Description | Expected Evidence | Evidence Status |
| --- | --- | --- | --- |
| SR-01 | Manual stop on single lead | Lead automation halted; audit logged | not_captured |
| SR-02 | Channel rollback (SMS disabled mid-pilot) | SMS sends blocked; other channels unaffected | not_captured |
| SR-03 | Full pilot halt command | All channels stopped; rollback evidence captured | not_captured |

---

## Decision Reference

| Decision | Meaning |
| --- | --- |
| NO_GO_KEEP_BLOCKED | Do not start. Keep sandbox/test-mode activation blocked. Resolve blocker before retry. |
| STOP_AND_ROLL_BACK | Halt immediately. Execute rollback plan. Do not continue until evidence reviewed and scope re-approved. |
| CONTINUE_WITH_EVIDENCE_CAPTURE | Proceed only when all pre-run blockers cleared and scenario is within separately granted approval scope. |

---

## Blocked Paths Reference (remain blocked without explicit approval)

The following paths remain blocked unless explicitly named in a future scoped approval:

- Twilio/SMS live sends
- Vapi outbound and webhook intake
- Resend live email
- public route / webhook exposure
- scheduler / cron / dispatcher activation
- billing / payment / quote / estimate / invoice automation
- CRM sync
- production Supabase reads/writes

## Packet Safety Posture (unchanged by this checklist)

| Field | Value |
| --- | --- |
| stop_rollback_checklist_does_not_equal_approval | true |
| approved_for_activation_now | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| safety_status | demo_ready_with_live_automation_disabled |
| public_website_go_live_copy_changed | false |

This stop/rollback checklist does **not** approve sandbox/test-mode activation. It defines guardrails only.