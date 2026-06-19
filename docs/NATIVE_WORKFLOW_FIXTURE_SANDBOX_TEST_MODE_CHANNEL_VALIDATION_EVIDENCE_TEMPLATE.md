# Native Workflow Fixture Sandbox/Test-Mode Channel Validation Evidence Template

## Purpose

This template defines the per-scenario evidence capture fields required when sandbox/test-mode channel validation is later separately approved and executed. All fields default to blank in this packet. This template does **not** equal approval.

| Field | Value |
| --- | --- |
| source_of_truth_commit | aa3f818 |
| evidence_capture_status | not_captured |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| evidence_template_does_not_equal_approval | true |
| recommended_scenario_counts_are_not_approval | true |

**Explicit note:** Evidence template does **not** equal approval.

**Explicit note:** Recommended scenario counts are **not** approval.

---

## Required Evidence Fields (per scenario)

| # | Field | Capture Guidance |
| --- | --- | --- |
| 1 | scenario_id | Unique scenario identifier from channel validation plan |
| 2 | test_account_used | Sandbox/test account identifier used for this run |
| 3 | approved_scope_reference | Reference to separately granted Jason approval scope |
| 4 | command_run_reference | Exact command or dry-run wrapper executed |
| 5 | expected_behavior | Expected behavior per channel validation plan default |
| 6 | observed_behavior | Actual observed behavior during validation |
| 7 | external_calls_observed | List external calls observed (within approved scope only) |
| 8 | messages_calls_calendar_reporting_logs_captured | Artifacts: messages, calls, calendar events, reports, logs |
| 9 | pass_fail_result | PASS or FAIL |
| 10 | stop_rollback_triggered_yes_no | YES or NO |
| 11 | evidence_owner | Person responsible for evidence record |
| 12 | timestamp | ISO-8601 timestamp of evidence capture |
| 13 | artifact_log_path | File path to artifact or log |
| 14 | reviewer_signoff | Jason or designated reviewer signoff |

---

## Sandbox/Test-Mode SMS Validation Evidence (5 scenarios)

| Scenario ID | Description | Expected Behavior (default) | Evidence Status |
| --- | --- | --- | --- |
| STMS-01 | Inbound homeowner SMS reply received in sandbox | Message logged; lead thread updated | not_captured |
| STMS-02 | Outbound template SMS sent to sandbox test number | Delivery status captured; no live send | not_captured |
| STMS-03 | STOP/opt-out keyword received | Contact permission updated; sends blocked | not_captured |
| STMS-04 | Wrong-number / undeliverable bounce | Delivery failure logged; escalation flagged | not_captured |
| STMS-05 | Compliance hold before send | Send blocked; manual review queue entry | not_captured |

### STMS-01 Evidence Capture Worksheet (blank)

| Field | Value |
| --- | --- |
| scenario_id | |
| test_account_used | |
| approved_scope_reference | |
| command_run_reference | |
| expected_behavior | |
| observed_behavior | |
| external_calls_observed | |
| messages_calls_calendar_reporting_logs_captured | |
| pass_fail_result | |
| stop_rollback_triggered_yes_no | |
| evidence_owner | |
| timestamp | |
| artifact_log_path | |
| reviewer_signoff | |

*(Repeat blank worksheet structure for STMS-02 through STMS-05, STVC-01 through STVC-03, LI-01 through LI-05, MRE-01 through MRE-04, CA-01 through CA-04, RAV-01 through RAV-03, ALE-01 through ALE-03, SR-01 through SR-03 — all fields blank, evidence_capture_status not_captured.)*

---

## Sandbox/Test-Mode Call/Vapi Validation Evidence (3 scenarios)

| Scenario ID | Description | Expected Behavior (default) | Evidence Status |
| --- | --- | --- | --- |
| STVC-01 | Answered call with lead qualification script | Call log; transcript stub; lead status update | not_captured |
| STVC-02 | Voicemail left for homeowner | Voicemail event logged; follow-up scheduled | not_captured |
| STVC-03 | Missed/no-answer call | Missed-call event; SMS follow-up trigger stub | not_captured |

---

## Lead Intake Validation Evidence (5 scenarios)

| Scenario ID | Description | Expected Behavior (default) | Evidence Status |
| --- | --- | --- | --- |
| LI-01 | Web form lead captured | Lead record created; source tagged | not_captured |
| LI-02 | Phone lead captured via Vapi stub | Lead record; call reference linked | not_captured |
| LI-03 | Referral lead with partial data | Lead created; missing-field flags set | not_captured |
| LI-04 | Duplicate lead detected | Duplicate flag; merge/review queue | not_captured |
| LI-05 | Incomplete lead (missing phone) | Lead held; manual review required | not_captured |

---

## Manual Review/Escalation Validation Evidence (4 scenarios)

| Scenario ID | Description | Expected Behavior (default) | Evidence Status |
| --- | --- | --- | --- |
| MRE-01 | Auto-route passes without escalation | Lead proceeds; no review queue entry | not_captured |
| MRE-02 | Escalation trigger (compliance flag) | Review queue entry; HOLD status | not_captured |
| MRE-03 | Founder review queue item resolved PASS | Lead unblocked; audit event logged | not_captured |
| MRE-04 | BLOCKED compliance stop | Lead stopped; no further automation | not_captured |

---

## Calendar/Appointment Validation Evidence (4 scenarios)

| Scenario ID | Description | Expected Behavior (default) | Evidence Status |
| --- | --- | --- | --- |
| CA-01 | Inspection appointment booked | Calendar stub event; confirmation logged | not_captured |
| CA-02 | Appointment rescheduled | Old slot cancelled; new slot created | not_captured |
| CA-03 | No-show / unable to access | Outcome flagged; follow-up trigger | not_captured |
| CA-04 | Scheduling conflict detected | Conflict flagged; manual resolution required | not_captured |

---

## Reporting/Admin Visibility Validation Evidence (3 scenarios)

| Scenario ID | Description | Expected Behavior (default) | Evidence Status |
| --- | --- | --- | --- |
| RAV-01 | Dashboard snapshot reflects lead pipeline | Counts match fixture expectations | not_captured |
| RAV-02 | Weekly report stub generated | Report artifact; no live email send | not_captured |
| RAV-03 | Admin audit view shows event chain | Events visible; timestamps consistent | not_captured |

---

## Audit/Log Evidence Validation (3 scenarios)

| Scenario ID | Description | Expected Behavior (default) | Evidence Status |
| --- | --- | --- | --- |
| ALE-01 | Full event chain present for lead lifecycle | All expected audit events logged | not_captured |
| ALE-02 | Missing log detection (gap in chain) | Gap flagged; review required | not_captured |
| ALE-03 | Rollback audit trail after manual stop | Stop event; prior state preserved | not_captured |

---

## Stop/Rollback Validation Evidence (3 scenarios)

| Scenario ID | Description | Expected Behavior (default) | Evidence Status |
| --- | --- | --- | --- |
| SR-01 | Manual stop on single lead | Lead automation halted; audit logged | not_captured |
| SR-02 | Channel rollback (SMS disabled mid-pilot) | SMS sends blocked; other channels unaffected | not_captured |
| SR-03 | Full pilot halt command | All channels stopped; rollback evidence captured | not_captured |

---

## Packet Safety Posture (unchanged by this template)

| Field | Value |
| --- | --- |
| evidence_capture_status | not_captured |
| evidence_template_does_not_equal_approval | true |
| approved_for_activation_now | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| safety_status | demo_ready_with_live_automation_disabled |
| public_website_go_live_copy_changed | false |

This evidence template does **not** approve sandbox/test-mode activation. It defines capture structure only.