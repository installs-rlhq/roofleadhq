# Native Workflow Fixture Controlled Real Roofer Pilot Setup Evidence Template

## Purpose

This template defines the per-setup-step evidence capture fields required when controlled real roofer pilot setup is later separately approved and executed. All fields default to blank in this packet. This template does **not** equal approval.

| Field | Value |
| --- | --- |
| source_of_truth_commit | cc67563 |
| setup_evidence_capture_status | not_captured |
| controlled_real_roofer_setup_status | incomplete |
| controlled_real_roofer_setup_gate_decision | NO_GO |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| setup_evidence_template_does_not_equal_approval | true |
| recommended_setup_step_counts_are_not_approval | true |

**Explicit note:** Setup evidence template does **not** equal approval.

**Explicit note:** Recommended setup step counts are **not** approval.

---

## Required Evidence Fields (per setup step)

| # | Field | Capture Guidance |
| --- | --- | --- |
| 1 | setup_step_id | Unique setup step identifier from setup checklist |
| 2 | roofer_test_account_reference | Roofer or test account identifier used for this setup step |
| 3 | approved_scope_reference | Reference to separately granted Jason approval scope |
| 4 | expected_setup_artifact | Expected setup artifact per setup checklist default |
| 5 | observed_setup_artifact | Actual observed setup artifact during setup run |
| 6 | owner | Person responsible for evidence record |
| 7 | timestamp | ISO-8601 timestamp of evidence capture |
| 8 | artifact_path | File path to artifact or supporting document |
| 9 | pass_fail_result | PASS or FAIL |
| 10 | reviewer_signoff | Jason or designated reviewer signoff |

---

## Controlled Real Roofer Pilot Setup Evidence (12 steps)

| Setup Step ID | Description | Expected Setup Artifact (default) | Evidence Status |
| --- | --- | --- | --- |
| CRPS-01 | Signed agreement / terms accepted | Signed agreement or terms acceptance record on file | not_captured |
| CRPS-02 | Guided setup completed | Guided setup completion checklist or session notes | not_captured |
| CRPS-03 | Business profile captured | Roofer business profile record draft | not_captured |
| CRPS-04 | Lead sources defined | Lead source definitions document | not_captured |
| CRPS-05 | Test phone setup confirmed | Test phone configuration checklist (no credential values logged) | not_captured |
| CRPS-06 | Calendar setup confirmed | Calendar integration or stub configuration record | not_captured |
| CRPS-07 | Contact permission/compliance reviewed | Contact permission and compliance review checklist | not_captured |
| CRPS-08 | Human escalation contact confirmed | Human escalation contact card or assignment record | not_captured |
| CRPS-09 | Calendar booking rules confirmed | Calendar booking rules document | not_captured |
| CRPS-10 | Do-not-contact / excluded leads rules confirmed | Do-not-contact and excluded leads rules document | not_captured |
| CRPS-11 | Report recipients confirmed | Report recipients list or confirmation record | not_captured |
| CRPS-12 | Trial/billing expectations confirmed | Trial and billing expectations acknowledgment record | not_captured |

### CRPS-01 Evidence Capture Worksheet (blank)

| Field | Value |
| --- | --- |
| setup_step_id | |
| roofer_test_account_reference | |
| approved_scope_reference | |
| expected_setup_artifact | |
| observed_setup_artifact | |
| owner | |
| timestamp | |
| artifact_path | |
| pass_fail_result | |
| reviewer_signoff | |

*(Repeat blank worksheet structure for CRPS-02 through CRPS-12 — all fields blank, evidence_capture_status not_captured.)*

---

## Setup Step Count Summary

| Field | Value |
| --- | --- |
| controlled_real_roofer_setup_steps_count | 12 |
| captured_setup_steps_count | 0 |
| passed_setup_steps_count | 0 |
| failed_setup_steps_count | 0 |
| missing_setup_evidence_steps_count | 12 |

**Explicit note:** Recommended setup step counts are **not** approval. All 12 setup steps remain `not_captured`.

---

## Prerequisite Gate (must be met before future evidence capture)

| Prerequisite | Current Status |
| --- | --- |
| sandbox/test-mode channel validation evidence complete | not met (30 scenarios not_captured upstream) |
| sandbox/test-mode approval separately granted | not_granted |
| controlled real roofer setup gate decision | NO_GO (HOLD) |

Controlled real roofer setup is blocked until sandbox/test-mode evidence is complete and separately approved.