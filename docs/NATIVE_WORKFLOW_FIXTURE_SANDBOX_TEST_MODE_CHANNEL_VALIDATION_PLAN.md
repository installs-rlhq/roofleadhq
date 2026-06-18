# Native Workflow Fixture Sandbox/Test-Mode Channel Validation Plan

## 1. Purpose and Scope

This document defines the **sandbox/test-mode channel validation plan** for the Roofer Pilot Essentials Planning Batch. It specifies recommended default validation scenarios for the fastest safe path to sandbox/test-mode evidence — **without** granting activation, executing channels, or connecting to external services.

### What this plan is

- sandbox/test-mode channel validation planning only
- recommended default scenario counts per validation category
- explicit scenario definitions for Jason review
- child document of `docs/NATIVE_WORKFLOW_FIXTURE_ROOFER_PILOT_ESSENTIALS_PLANNING_BATCH.md`
- all counts marked **RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED**

### What this plan is not

- This is **not** sandbox/test-mode activation.
- This is **not** approval to send SMS, place calls, or use Twilio/Vapi/Resend.
- This does **not** access credentials, env, API, or webhooks.
- This does **not** touch production data.
- Recommended scenario counts are **not** approval and are **not** approved live values.

**Explicit note:** Recommended scenario counts are **not** approval. Default sandbox/test-mode decision remains **HOLD**.

## 2. Preconditions (must be met before any future sandbox/test-mode validation)

| Gate | Required Status |
| --- | --- |
| local_demo_e2e_evidence_chain_status | passed |
| local_demo_evidence_freeze_release_candidate_review_status | completed |
| exact_values_filled_count | 19 (currently 0 — blocked) |
| sandbox_test_mode_approval_status | not_granted (requires separate Jason approval) |
| default_sandbox_test_mode_decision | HOLD |

## 3. Recommended Default Scenario Counts

All counts below are **RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED** — conservative planning defaults for the fastest safe sandbox/test-mode validation path.

| Category | Recommended Default Count | Status |
| --- | --- | --- |
| sandbox_test_mode_sms_validation | 5 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| sandbox_test_mode_call_vapi_validation | 3 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| lead_intake_validation | 5 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| manual_review_escalation_validation | 4 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| calendar_appointment_validation | 4 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| reporting_admin_visibility_validation | 3 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| audit_log_evidence_validation | 3 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| stop_rollback_validation | 3 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| **total_sandbox_test_mode_validation_scenarios** | **30** | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |

## 4. Sandbox/Test-Mode SMS Validation Scenarios (5 recommended defaults)

| # | Scenario ID | Description | Expected Evidence |
| --- | --- | --- | --- |
| 1 | STMS-01 | Inbound homeowner SMS reply received in sandbox | Message logged; lead thread updated |
| 2 | STMS-02 | Outbound template SMS sent to sandbox test number | Delivery status captured; no live send |
| 3 | STMS-03 | STOP/opt-out keyword received | Contact permission updated; sends blocked |
| 4 | STMS-04 | Wrong-number / undeliverable bounce | Delivery failure logged; escalation flagged |
| 5 | STMS-05 | Compliance hold before send | Send blocked; manual review queue entry |

## 5. Sandbox/Test-Mode Call/Vapi Validation Scenarios (3 recommended defaults)

| # | Scenario ID | Description | Expected Evidence |
| --- | --- | --- | --- |
| 1 | STVC-01 | Answered call with lead qualification script | Call log; transcript stub; lead status update |
| 2 | STVC-02 | Voicemail left for homeowner | Voicemail event logged; follow-up scheduled |
| 3 | STVC-03 | Missed/no-answer call | Missed-call event; SMS follow-up trigger stub |

## 6. Lead Intake Validation Scenarios (5 recommended defaults)

| # | Scenario ID | Description | Expected Evidence |
| --- | --- | --- | --- |
| 1 | LI-01 | Web form lead captured | Lead record created; source tagged |
| 2 | LI-02 | Phone lead captured via Vapi stub | Lead record; call reference linked |
| 3 | LI-03 | Referral lead with partial data | Lead created; missing-field flags set |
| 4 | LI-04 | Duplicate lead detected | Duplicate flag; merge/review queue |
| 5 | LI-05 | Incomplete lead (missing phone) | Lead held; manual review required |

## 7. Manual Review/Escalation Validation Scenarios (4 recommended defaults)

| # | Scenario ID | Description | Expected Evidence |
| --- | --- | --- | --- |
| 1 | MRE-01 | Auto-route passes without escalation | Lead proceeds; no review queue entry |
| 2 | MRE-02 | Escalation trigger (compliance flag) | Review queue entry; HOLD status |
| 3 | MRE-03 | Founder review queue item resolved PASS | Lead unblocked; audit event logged |
| 4 | MRE-04 | BLOCKED compliance stop | Lead stopped; no further automation |

## 8. Calendar/Appointment Validation Scenarios (4 recommended defaults)

| # | Scenario ID | Description | Expected Evidence |
| --- | --- | --- | --- |
| 1 | CA-01 | Inspection appointment booked | Calendar stub event; confirmation logged |
| 2 | CA-02 | Appointment rescheduled | Old slot cancelled; new slot created |
| 3 | CA-03 | No-show / unable to access | Outcome flagged; follow-up trigger |
| 4 | CA-04 | Scheduling conflict detected | Conflict flagged; manual resolution required |

## 9. Reporting/Admin Visibility Validation Scenarios (3 recommended defaults)

| # | Scenario ID | Description | Expected Evidence |
| --- | --- | --- | --- |
| 1 | RAV-01 | Dashboard snapshot reflects lead pipeline | Counts match fixture expectations |
| 2 | RAV-02 | Weekly report stub generated | Report artifact; no live email send |
| 3 | RAV-03 | Admin audit view shows event chain | Events visible; timestamps consistent |

## 10. Audit/Log Evidence Validation Scenarios (3 recommended defaults)

| # | Scenario ID | Description | Expected Evidence |
| --- | --- | --- | --- |
| 1 | ALE-01 | Full event chain present for lead lifecycle | All expected audit events logged |
| 2 | ALE-02 | Missing log detection (gap in chain) | Gap flagged; review required |
| 3 | ALE-03 | Rollback audit trail after manual stop | Stop event; prior state preserved |

## 11. Stop/Rollback Validation Scenarios (3 recommended defaults)

| # | Scenario ID | Description | Expected Evidence |
| --- | --- | --- | --- |
| 1 | SR-01 | Manual stop on single lead | Lead automation halted; audit logged |
| 2 | SR-02 | Channel rollback (SMS disabled mid-pilot) | SMS sends blocked; other channels unaffected |
| 3 | SR-03 | Full pilot halt command | All channels stopped; rollback evidence captured |

## 12. Validation Sequence Order (recommended default)

1. Lead intake validation (establish lead records)
2. Sandbox/test-mode SMS validation (messaging channel)
3. Sandbox/test-mode call/Vapi validation (voice channel)
4. Manual review/escalation validation (human gates)
5. Calendar/appointment validation (scheduling)
6. Reporting/admin visibility validation (operator view)
7. Audit/log evidence validation (evidence chain)
8. Stop/rollback validation (safety exits)

## 13. Safety Boundaries

| Field | Value |
| --- | --- |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| external_calls_allowed | false |
| credentials_access_allowed | false |
| production_data_access_allowed | false |
| recommended_scenario_counts_are_not_approval | true |
| default_sandbox_test_mode_decision | HOLD |

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only, planning-only.