# Native Workflow Fixture Post-Approval Sandbox/Test-Mode Operator Runbook Draft

## 1. Purpose and Scope

This packet is a **fake-data/local-only/read-only/dry-run-only/review-only/planning-only/not-approved/non-executing** blocked operator runbook draft for what would happen only after Jason separately captures exact signed sandbox/test-mode approval, all 19 exact values are accepted and approved, and the approval capture completeness gate passes. This packet makes the future approved sandbox/test-mode validation sequence easier to execute safely — but this packet itself must not approve, activate, execute, connect, text, call, email, onboard, or accept anything.

### What this packet is

- post-approval sandbox/test-mode operator runbook draft only
- blocked 12-step operator sequence for future approved sandbox/test-mode validation
- operator-facing planning guide for Jason review
- structured no-go checklist companion
- source-of-truth and evidence chain references from commit `f36a247`
- read-only verifier input
- packet_status is `review_only`
- review_status is `post_approval_sandbox_test_mode_operator_runbook_draft_review_only`
- post_approval_runbook_draft_gate_decision: `NO_GO` (equivalent to `HOLD` for activation purposes)
- purpose is `post-approval sandbox/test-mode operator runbook draft — default NO_GO/HOLD until exact signed approval and all gates pass`

### What this packet is not

- This is **not** approval to activate anything.
- This packet does **not** approve sandbox/test-mode activation.
- This packet does **not** approve live activation.
- This packet does **not** approve controlled real roofer validation.
- Post-approval runbook draft does **not** equal approval.
- Operator runbook does **not** equal approval.
- No-go checklist does **not** equal approval.
- Recommended defaults are **not** approval.
- Recommended defaults are **not** accepted exact values.
- This is **not** approval to make external calls.
- This is **not** approval to access credentials, env, API, or webhooks.
- This is **not** approval to touch production Supabase data.
- This does **not** add public routes, webhooks, schedulers, cron, dispatchers, live sends, CRM sync, or billing/payment/deposit/invoice/quote/estimate automation.
- This does **not** run any sandbox/test-mode validation command.
- This does **not** execute any validation scenario.
- This does **not** contact a roofer.
- This does **not** send email, SMS, or calls.
- This does **not** capture or record any approval or evidence.

**Explicit note:** Post-approval runbook draft does **not** equal approval.

**Explicit note:** Operator runbook does **not** equal approval.

**Explicit note:** No-go checklist does **not** equal approval.

**Explicit note:** Recommended defaults are **not** approval.

**Explicit note:** Recommended defaults are **not** accepted exact values.

**Explicit note:** Default sandbox/test-mode decision remains **HOLD**. This packet does not change the upstream HOLD posture.

**Explicit note:** Sandbox/test-mode activation remains blocked.

**Explicit note:** Live activation remains blocked.

**Explicit note:** Real roofer onboarding/contact remains blocked.

**Explicit note:** Controlled real roofer validation remains blocked.

**Explicit note:** future_command_status is `blocked_until_exact_signed_approval_and_gate_pass`. No future command may run from this packet.

**Explicit note:** No external calls, credentials, production data, schema/auth/RLS/security changes, public routes/webhooks/schedulers/cron/dispatchers, billing/payment automation, public go-live copy, real demo/sandbox/live testing, real roofer contact, email, SMS, or calls are enabled.

### Standing local build approval (recorded, limited)

Jason has given standing approval for bigger/faster Grok Build batches that remain local-only, fake-data-only, read-only, dry-run-only, review-only. Standing local build approval allows this post-approval operator runbook draft. It does **not** by itself grant sandbox/test-mode activation approval, channel validation execution, roofer contact, or validation execution.

## 2. Upstream Completion Prerequisites (All Remain Blocking)

| Field | Value |
| --- | --- |
| pilot_readiness_master_no_go_approval_dependency_summary_status | completed |
| pilot_readiness_master_gate_decision | NO_GO |
| approval_capture_completeness_gate_status | completed |
| channel_validation_completeness_gate_status | completed |
| channel_validation_evidence_capture_packet_status | completed |
| approval_capture_status | not_captured |
| jason_signed_approval_status | not_signed |
| approval_capture_gate_decision | NO_GO |
| channel_validation_gate_decision | NO_GO |
| controlled_real_roofer_setup_gate_decision | NO_GO |
| controlled_real_roofer_limited_validation_gate_decision | NO_GO |

**Prerequisite rule:** This runbook draft is planning-only. Every prerequisite above must be satisfied in separate future packets before any step in Section 4 may proceed.

## 3. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | f36a247 |
| source_of_truth_label | test(workflow): add pilot readiness master no-go approval dependency summary |

### Upstream completions (referenced, not re-approved)

| Field | Value |
| --- | --- |
| pilot_readiness_master_no_go_approval_dependency_summary_status | completed |
| local_demo_e2e_evidence_chain_status | passed |
| local_demo_evidence_freeze_release_candidate_review_status | completed |
| local_demo_release_candidate_management_summary_jason_review_status | completed |
| roofer_pilot_essentials_planning_batch_status | completed |
| p0_blockers_count | 0 |
| p1_polish_status | completed |
| p2_refinement_status | completed |
| p3_planning_status | completed |

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
- `f36a247` — pilot readiness master no-go approval dependency summary (source-of-truth for this draft)

| Field | Value |
| --- | --- |
| exact_values_required_count | 19 |
| accepted_exact_values_count | 0 |
| approved_exact_values_filled_count | 0 |
| completeness_status | incomplete |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| controlled_real_roofer_validation_approval_status | not_granted |
| default_sandbox_test_mode_decision | HOLD |
| current_recommended_next_step | JASON_COMPLETE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_AND_ALL_19_EXACT_VALUES_BEFORE_POST_APPROVAL_OPERATOR_RUNBOOK_EXECUTION |

## 4. Blocked Operator Sequence (Future Approved Sandbox/Test-Mode Validation)

**Sequence rule:** All 12 steps remain `blocked_until_prerequisites` until Jason separately captures exact signed sandbox/test-mode approval, all 19 exact values are accepted and approved, and the approval capture completeness gate passes. This draft documents the sequence only — it does not advance any step.

| Step | Action | Current Status | Equals approval? |
| --- | --- | --- | --- |
| 1 | confirm source-of-truth HEAD | blocked_until_prerequisites | **No** |
| 2 | confirm exact signed Jason approval captured | blocked_until_prerequisites | **No** |
| 3 | confirm all 19 exact values accepted and approved | blocked_until_prerequisites | **No** |
| 4 | confirm approval capture completeness gate passes | blocked_until_prerequisites | **No** |
| 5 | confirm allowed services/channels match approval scope | blocked_until_prerequisites | **No** |
| 6 | confirm environment and working directory | blocked_until_prerequisites | **No** |
| 7 | confirm command matches exact approved command | blocked_until_prerequisites | **No** |
| 8 | confirm stop conditions and rollback owner | blocked_until_prerequisites | **No** |
| 9 | run only the approved sandbox/test-mode command | blocked_until_prerequisites | **No** |
| 10 | capture evidence for all 30 channel validation scenarios | blocked_until_prerequisites | **No** |
| 11 | run post-run safety/readiness checks | blocked_until_prerequisites | **No** |
| 12 | record pass/fail, artifacts, reviewer signoff, and final safety state | blocked_until_prerequisites | **No** |

### Step 1: Confirm source-of-truth HEAD

- Confirm `HEAD == origin/main` at the approved source-of-truth commit.
- Confirm git status is blank (no uncommitted changes).
- Confirm pilot readiness summary is `demo_ready_with_live_automation_disabled`.
- **Blocked now:** approval not captured; this packet does not verify HEAD.

### Step 2: Confirm exact signed Jason approval captured

- Confirm `jason_signed_approval_status` is `signed` (not `not_signed`).
- Confirm `approval_capture_status` is `captured` (not `not_captured`).
- Confirm signed approval statement references exact sandbox/test-mode scope.
- **Blocked now:** `jason_signed_approval_status | not_signed`, `approval_capture_status | not_captured`.

### Step 3: Confirm all 19 exact values accepted and approved

- Confirm `accepted_exact_values_count | 19` (currently 0).
- Confirm `approved_exact_values_filled_count | 19` (currently 0).
- Confirm no recommended default remains unaccepted.
- **Blocked now:** `accepted_exact_values_count | 0`, `approved_exact_values_filled_count | 0`.

### Step 4: Confirm approval capture completeness gate passes

- Confirm `approval_capture_gate_decision` is `GO` (currently NO_GO).
- Confirm approval capture completeness gate all required fields filled.
- **Blocked now:** `approval_capture_gate_decision | NO_GO`.

### Step 5: Confirm allowed services/channels match approval scope

- Confirm `approved_channels` lists only explicitly approved channels (currently `[]`).
- Confirm `approved_external_services` lists only explicitly approved services (currently `[]`).
- Confirm no channel or service outside approved scope is enabled.
- **Blocked now:** `approved_channels | []`, `approved_external_services | []`.

### Step 6: Confirm environment and working directory

- Confirm working directory is repository root.
- Confirm approved environment name matches signed approval record.
- Confirm no credential/env/API/webhook access outside approved scope.
- **Blocked now:** no signed approval; no approved environment.

### Step 7: Confirm command matches exact approved command

- Recommended default exact command (not approved): `bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh`
- Confirm operator command byte-for-byte matches Jason-approved `exact_command` value.
- **Blocked now:** `future_command_status | blocked_until_exact_signed_approval_and_gate_pass`.

### Step 8: Confirm stop conditions and rollback owner

- Review `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_STOP_ROLLBACK_CHECKLIST.md`.
- Confirm rollback owner named in signed approval.
- Confirm evidence owner named in signed approval.
- Confirm all pre-run blockers in no-go checklist cleared.
- **Blocked now:** all pre-run blockers remain active.

### Step 9: Run only the approved sandbox/test-mode command

- Run **only** the Jason-approved exact command — no substitutions.
- Do not run final activation command draft.
- Do not run any command from this draft packet.
- **Blocked now:** `command_execution_status | not_run_by_this_packet`; `sandbox_test_mode_activation_allowed | false`.

### Step 10: Capture evidence for all 30 channel validation scenarios

| Field | Value |
| --- | --- |
| sandbox_test_mode_channel_validation_scenarios_count | 30 |
| captured_sandbox_test_mode_channel_validation_scenarios_count | 0 |
| missing_sandbox_test_mode_channel_validation_scenarios_count | 30 |

- Use evidence template from channel validation evidence capture packet.
- Record per-scenario pass/fail, artifacts, timestamps, and reviewer signoff.
- **Blocked now:** all 30 scenarios remain `not_captured`.

### Step 11: Run post-run safety/readiness checks

- Run post-run safe readiness checks within approved scope only.
- Confirm `demo_ready_with_live_automation_disabled` preserved unless explicitly approved otherwise.
- Confirm no unexpected live service indicators.
- **Blocked now:** no command has run; no post-run checks apply.

### Step 12: Record pass/fail, artifacts, reviewer signoff, and final safety state

- Record overall channel validation pass/fail.
- Attach artifact paths for all 30 scenarios.
- Obtain reviewer signoff before advancing to controlled real roofer setup consideration.
- Record final safety state.
- **Blocked now:** no evidence captured; no signoff possible.

## 5. Future Approved Command Reference (Not Approved — Blocked)

| Field | Value |
| --- | --- |
| future_approved_command | bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh |
| future_command_status | blocked_until_exact_signed_approval_and_gate_pass |
| command_execution_status | not_run_by_this_packet |

**Explicit note:** The recommended default exact command above is **RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED**. It is not approved for execution. This packet does **not** run it.

## 6. Sandbox/Test-Mode Channel Validation Counts (All Remain Not Captured)

| Field | Value |
| --- | --- |
| sandbox_test_mode_channel_validation_scenarios_count | 30 |
| captured_sandbox_test_mode_channel_validation_scenarios_count | 0 |
| missing_sandbox_test_mode_channel_validation_scenarios_count | 30 |
| channel_validation_gate_decision | NO_GO |

## 7. Activation and Approval Boundary

| Field | Value |
| --- | --- |
| post_approval_runbook_draft_gate_decision | NO_GO |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| controlled_real_roofer_validation_approval_status | not_granted |
| approval_status | not_granted |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| real_roofer_onboarding_contact_allowed | false |
| real_roofer_contact_allowed | false |
| controlled_real_roofer_validation_allowed | false |

## 8. Safety and Activation Block Posture

| Field | Value |
| --- | --- |
| safety_status | demo_ready_with_live_automation_disabled |
| external_calls_allowed | false |
| credentials_access_allowed | false |
| production_data_access_allowed | false |
| schema_auth_rls_security_changes_allowed | false |
| public_route_webhook_scheduler_cron_dispatcher_allowed | false |
| billing_payment_automation_allowed | false |
| public_go_live_or_production_copy_changes_allowed | false |
| real_demo_sandbox_live_testing_allowed | false |
| public_website_go_live_copy_changed | false |

**Explicit note:** demo_ready_with_live_automation_disabled remains preserved.

**Explicit note:** old 90-day plan cannot override current source-of-truth direction.

## 9. Upstream Packet References (Review Only)

| Upstream packet | Doc | Fixture |
| --- | --- | --- |
| Pilot readiness master NO-GO / approval dependency summary | `docs/NATIVE_WORKFLOW_FIXTURE_PILOT_READINESS_MASTER_NO_GO_APPROVAL_DEPENDENCY_SUMMARY.md` | `backend/fixtures/native-workflow-demo-roofer/pilot-readiness-master-no-go-approval-dependency-summary.json` |
| Channel validation evidence capture packet | `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_EVIDENCE_CAPTURE_PACKET.md` | `backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-channel-validation-evidence-capture-packet.json` |
| Channel validation completeness gate | `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_COMPLETENESS_GATE.md` | `backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-channel-validation-completeness-gate.json` |
| Stop/rollback checklist | `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_STOP_ROLLBACK_CHECKLIST.md` | — |
| No-go checklist (this packet) | `docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_OPERATOR_NO_GO_CHECKLIST.md` | — |

## 10. Packet Artifacts

| Artifact | Path |
| --- | --- |
| Operator runbook draft | `docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_OPERATOR_RUNBOOK_DRAFT.md` |
| No-go checklist | `docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_OPERATOR_NO_GO_CHECKLIST.md` |
| Structured fixture | `backend/fixtures/native-workflow-demo-roofer/post-approval-sandbox-test-mode-operator-runbook-draft.json` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-post-approval-sandbox-test-mode-operator-runbook-draft-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-post-approval-sandbox-test-mode-operator-runbook-draft-dry-run.sh` |

## 11. Dry-Run Command (Review Only — Does Not Execute Activation)

```bash
bash scripts/run-native-workflow-fixture-post-approval-sandbox-test-mode-operator-runbook-draft-dry-run.sh
```

Read-only verifier:

```bash
node backend/scripts/verify-native-workflow-fixture-post-approval-sandbox-test-mode-operator-runbook-draft-readonly.js
```

Full aggregate regression (preserved, not run by default):

```bash
bash scripts/verify-safe-readiness.sh
```

**Explicit note:** This wrapper does **not** run the future approved sandbox/test-mode command.

**Explicit note:** This wrapper does **not** run the final activation command.

**Explicit note:** command_execution_status | not_run_by_this_packet