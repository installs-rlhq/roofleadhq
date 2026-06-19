# Native Workflow Fixture Controlled Real Roofer Limited Validation Evidence Template

## Purpose

This template defines the per-scenario evidence capture fields required when controlled real roofer limited validation is later separately approved and executed. All fields default to blank in this packet. This template does **not** equal approval.

| Field | Value |
| --- | --- |
| source_of_truth_commit | dbb30a7 |
| limited_validation_evidence_capture_status | not_captured |
| controlled_real_roofer_limited_validation_status | incomplete |
| controlled_real_roofer_limited_validation_gate_decision | NO_GO |
| controlled_real_roofer_validation_approval_status | not_granted |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| limited_validation_evidence_template_does_not_equal_approval | true |
| recommended_scenario_counts_are_not_approval | true |

**Explicit note:** Limited validation evidence template does **not** equal approval.

**Explicit note:** Recommended scenario counts are **not** approval.

---

## Required Evidence Fields (per limited validation scenario)

| # | Field | Capture Guidance |
| --- | --- | --- |
| 1 | scenario_id | Unique scenario identifier from validation plan |
| 2 | roofer_test_account_reference | Roofer or test account identifier used for this scenario |
| 3 | approved_scope_reference | Reference to separately granted Jason approval scope |
| 4 | approved_channel_reference | Reference to separately approved channel for this scenario |
| 5 | expected_behavior | Expected behavior per validation plan default |
| 6 | observed_behavior | Actual observed behavior during limited validation run |
| 7 | homeowner_contact_permission_status | Homeowner/contact permission status at time of scenario |
| 8 | roofer_handoff_escalation_result | Roofer handoff or escalation result |
| 9 | appointment_outcome_result | Appointment or outcome result |
| 10 | messages_calls_calendar_reporting_log_artifacts | Messages, calls, calendar, reporting, or log artifacts |
| 11 | stop_rollback_result | Stop or rollback result if triggered |
| 12 | pass_fail_result | PASS or FAIL |
| 13 | evidence_owner | Person responsible for evidence record |
| 14 | timestamp | ISO-8601 timestamp of evidence capture |
| 15 | reviewer_signoff | Jason or designated reviewer signoff |

---

## Controlled Real Roofer Limited Validation Evidence (5 scenarios)

| Scenario ID | Description | Expected Behavior (default) | Evidence Status |
| --- | --- | --- | --- |
| CRLV-01 | Controlled lead arrives | One controlled lead arrives via approved channel; lead record created; source tagged; audit logged | not_captured |
| CRLV-02 | RoofLeadHQ response path reviewed | RoofLeadHQ response path reviewed; expected automated/manual response sequence documented; no unexpected sends | not_captured |
| CRLV-03 | Text/call routing reviewed | Text/call routing reviewed; sandbox/test-mode routing path documented; permission and STOP handling verified | not_captured |
| CRLV-04 | Handoff/escalation reviewed | Handoff/escalation reviewed; human escalation contact path documented; unexpected outcome triggers halt | not_captured |
| CRLV-05 | Appointment/outcome/reporting reviewed | Appointment/outcome/reporting reviewed; calendar coordination stub; outcome classification; dashboard/reporting visibility verified | not_captured |

### CRLV-01 Evidence Capture Worksheet (blank)

| Field | Value |
| --- | --- |
| scenario_id | |
| roofer_test_account_reference | |
| approved_scope_reference | |
| approved_channel_reference | |
| expected_behavior | |
| observed_behavior | |
| homeowner_contact_permission_status | |
| roofer_handoff_escalation_result | |
| appointment_outcome_result | |
| messages_calls_calendar_reporting_log_artifacts | |
| stop_rollback_result | |
| pass_fail_result | |
| evidence_owner | |
| timestamp | |
| reviewer_signoff | |

*(Repeat blank worksheet structure for CRLV-02 through CRLV-05 — all fields blank, evidence_capture_status not_captured.)*

---

## Limited Validation Scenario Count Summary

| Field | Value |
| --- | --- |
| controlled_real_roofer_limited_validation_scenarios_count | 5 |
| captured_limited_validation_scenarios_count | 0 |
| passed_limited_validation_scenarios_count | 0 |
| failed_limited_validation_scenarios_count | 0 |
| missing_limited_validation_evidence_scenarios_count | 5 |

**Explicit note:** Recommended scenario counts are **not** approval. All 5 scenarios remain `not_captured`.

---

## Prerequisite Gate (must be met before future evidence capture)

| Prerequisite | Current Status |
| --- | --- |
| sandbox/test-mode channel validation evidence complete | not met (30 scenarios not_captured upstream) |
| sandbox/test-mode approval separately granted | not_granted |
| controlled real roofer setup evidence complete | not met (12 setup steps not_captured upstream) |
| controlled real roofer setup gate decision | NO_GO (HOLD) |
| controlled real roofer validation approval separately granted | not_granted |
| controlled real roofer limited validation gate decision | NO_GO (HOLD) |

Controlled real roofer validation is blocked until sandbox/test-mode evidence and setup evidence are complete and separately approved.