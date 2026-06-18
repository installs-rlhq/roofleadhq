# Native Workflow Fixture Controlled Real Roofer Validation Plan

## 1. Purpose and Scope

This document defines the **controlled real roofer limited validation plan** for the Roofer Pilot Essentials Planning Batch. It specifies recommended default validation scenarios for one controlled real roofer pilot — **without** granting live activation, executing validation, or connecting to external services.

### What this plan is

- controlled real roofer limited validation planning only
- recommended default validation scenarios for one real roofer
- explicit scenario definitions for Jason review
- child document of `docs/NATIVE_WORKFLOW_FIXTURE_ROOFER_PILOT_ESSENTIALS_PLANNING_BATCH.md`
- all counts marked **RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED**

### What this plan is not

- This is **not** live roofer pilot execution.
- This is **not** approval to send live SMS, place live calls, or sync to CRM.
- This does **not** access credentials, env, API, or webhooks.
- This does **not** touch production data.
- Recommended validation scenarios are **not** approval and are **not** approved live values.

**Explicit note:** Recommended scenario counts are **not** approval. Live activation remains **not granted**.

## 2. Preconditions (must be met before any future limited validation)

| Gate | Required Status |
| --- | --- |
| local_demo_e2e_evidence_chain_status | passed |
| sandbox_test_mode_validation_evidence | captured and reviewed (future — not yet) |
| controlled_real_roofer_setup_checklist | all 12 steps complete (future — not yet) |
| live_activation_approval_status | not_granted (requires separate Jason approval) |
| default_sandbox_test_mode_decision | HOLD |

## 3. Recommended Default Validation Scenario Count

| Category | Recommended Default Count | Status |
| --- | --- | --- |
| controlled_real_roofer_limited_validation | 5 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |

## 4. Controlled Real Roofer Limited Validation Scenarios (5 recommended defaults)

| # | Scenario ID | Description | Expected Evidence | Stop Condition |
| --- | --- | --- | --- | --- |
| 1 | CRV-01 | One real lead intake (web or phone) | Lead record; source tagged; audit logged | Compliance flag → STOP |
| 2 | CRV-02 | One real SMS thread (sandbox/test-mode) | Message log; homeowner reply captured | STOP keyword → halt |
| 3 | CRV-03 | One real call attempt (sandbox/test-mode Vapi) | Call log; outcome classified | No consent → BLOCKED |
| 4 | CRV-04 | One real appointment coordination | Calendar event stub; confirmation logged | Conflict → manual review |
| 5 | CRV-05 | One reporting/admin review cycle | Dashboard snapshot; weekly report stub | Data mismatch → HOLD |

## 5. Validation Boundaries (recommended defaults — not approved)

| Boundary | Recommended Default | Status |
| --- | --- | --- |
| max_real_leads_in_validation | 1 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| max_sms_messages_in_validation | 3 per lead | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| max_call_attempts_in_validation | 1 per lead | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| max_appointments_in_validation | 1 per lead | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| manual_review_required_before_send | true | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| pilot_halt_on_first_unexpected_outcome | true | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |

## 6. Stop/Rollback Rules for Controlled Real Pilot

| Trigger | Action |
| --- | --- |
| Unexpected outcome in any scenario | Halt pilot; capture evidence; Jason review |
| Compliance violation detected | BLOCKED; stop all channels for lead |
| Homeowner STOP/opt-out | Halt SMS; preserve audit trail |
| Credential or env error | STOP; no retry without Jason approval |
| Data mismatch in reporting | HOLD; manual reconciliation required |
| Any schema/auth/RLS anomaly | STOP_AND_ROLL_BACK immediately |

## 7. Evidence Requirements per Scenario

| Scenario | Required Evidence Artifacts |
| --- | --- |
| CRV-01 | Lead intake log, source tag, audit event chain |
| CRV-02 | SMS thread log, delivery status, permission state |
| CRV-03 | Call log, outcome classification, transcript stub |
| CRV-04 | Calendar event, confirmation record, homeowner acknowledgment |
| CRV-05 | Dashboard snapshot, report stub, admin visibility check |

## 8. Post-Validation Decision Matrix (planning only)

| Outcome | Recommended Next Step | Approval Required |
| --- | --- | --- |
| All 5 scenarios pass | Review for limited pilot extension | Separate Jason approval |
| Any scenario HOLD | Resolve hold; re-validate affected scenario | Jason review |
| Any scenario BLOCKED | Halt pilot; root-cause analysis | Jason review + possible rollback |
| Unexpected outcome | Full pilot halt | Jason review + rollback |

## 9. Safety Boundaries

| Field | Value |
| --- | --- |
| live_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| external_calls_allowed | false |
| credentials_access_allowed | false |
| production_data_access_allowed | false |
| billing_payment_automation_allowed | false |
| recommended_scenario_counts_are_not_approval | true |
| pilot_planning_does_not_equal_approval | true |
| default_sandbox_test_mode_decision | HOLD |

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only, planning-only.