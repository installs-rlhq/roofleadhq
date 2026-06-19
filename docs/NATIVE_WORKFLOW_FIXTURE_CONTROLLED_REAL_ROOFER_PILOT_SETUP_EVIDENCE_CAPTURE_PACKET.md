# Native Workflow Fixture Controlled Real Roofer Pilot Setup Evidence Capture Packet

## 1. Purpose and Scope

This packet is a **fake-data/local-only/read-only/dry-run-only/review-only/planning-only/not-approved/non-executing** evidence capture structure for the recommended 12 controlled real roofer setup steps needed before any limited real roofer validation. It defines exactly what evidence must be captured when controlled real roofer setup is later separately approved — but this packet itself must not approve, activate, onboard, contact, execute, connect, or accept anything.

### What this packet is

- controlled real roofer pilot setup evidence capture structure only
- pre-activation evidence planning before any future controlled real roofer setup run
- setup_evidence_capture_status: `not_captured`
- channel_validation_completeness_gate_status: `completed` (upstream reference)
- channel_validation_gate_decision: `NO_GO` (equivalent to `HOLD` for activation purposes)
- 12 recommended default setup steps (blank evidence fields)
- structured evidence capture templates for future Jason/operator review
- setup no-go review checklist for controlled real roofer setup evidence runs
- source-of-truth and evidence chain references from commit `cc67563`
- read-only verifier input
- packet_status is `review_only`
- review_status is `controlled_real_roofer_pilot_setup_evidence_capture_review_only`
- purpose is `controlled real roofer pilot setup evidence capture structure — default HOLD until sandbox/test-mode channel validation evidence is complete and separately approved`

### What this packet is not

- This is **not** approval to activate anything.
- This packet does **not** approve sandbox/test-mode activation.
- Live activation remains **not granted**.
- Recommended setup step counts are **not** approval.
- Setup evidence capture packet does **not** equal approval.
- Setup evidence template does **not** equal approval.
- Setup no-go review does **not** equal approval.
- Recommended defaults are **not** approval.
- Recommended defaults are **not** accepted exact values.
- This is **not** approval to make external calls.
- This is **not** approval to access credentials, env, API, or webhooks.
- This is **not** approval to touch production Supabase data.
- This does **not** add public routes, webhooks, schedulers, cron, dispatchers, live sends, CRM sync, or billing/payment/deposit/invoice/quote/estimate automation.
- This does **not** run any controlled real roofer setup command.
- This does **not** execute any setup step.
- This does **not** contact a roofer.
- This does **not** send email, SMS, or calls.
- This does **not** capture or record any setup evidence yet.

**Explicit note:** Recommended setup step counts are **not** approval.

**Explicit note:** Setup evidence capture packet does **not** equal approval.

**Explicit note:** Setup evidence template does **not** equal approval.

**Explicit note:** Setup no-go review does **not** equal approval.

**Explicit note:** Recommended defaults are **not** approval.

**Explicit note:** Recommended defaults are **not** accepted exact values.

**Explicit note:** Default sandbox/test-mode decision remains **HOLD**. This packet does not change the upstream HOLD posture.

**Explicit note:** Channel validation gate decision remains **NO_GO**. Controlled real roofer setup is blocked until sandbox/test-mode channel validation evidence is complete and separately approved.

**Explicit note:** Controlled real roofer setup evidence capture requires separate sandbox/test-mode approval and completed channel validation evidence before any setup evidence can be captured.

**Explicit note:** Live activation still requires separate later approval after sandbox/test-mode evidence, controlled real roofer setup evidence, and explicit approvals.

### Standing local build approval (recorded, limited)

Jason has given standing approval for bigger/faster Grok Build batches that remain local-only, fake-data-only, read-only, dry-run-only, review-only. Standing local build approval allows this evidence capture packet. It does **not** by itself grant sandbox/test-mode activation approval, controlled real roofer setup execution, or roofer contact.

## 2. Nine-Layer Boundary (Setup Evidence Capture vs Approval)

| Layer | Status | Count | Equals approval? |
| --- | --- | --- | --- |
| Recommended defaults (proposed) | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED | 19 proposed | **No** |
| Accepted exact values (Jason accept/edit/replace) | not_started | 0 accepted | **No** |
| Approved exact values (explicit approval record) | blank | 0 approved | **No** |
| Signed approval capture (Jason paste/record) | not_captured | 0 captured | **No** |
| Approval capture completeness gate | completed (upstream) | — | **No** |
| Channel validation evidence capture | not_captured (upstream) | 0 of 30 captured | **No** |
| Channel validation completeness gate | completed (upstream) | — | **No** |
| Controlled real roofer setup evidence capture (this packet) | not_captured | 0 of 12 captured | **No** |
| Activation approval (sandbox/test-mode) | not_granted | — | **No** |
| Activation approval (live) | not_granted | — | **No** |

**Boundary rule:** Each layer is separate. This packet prepares setup evidence capture structure only. Capturing evidence in a future run requires explicit sandbox/test-mode approval and completed channel validation evidence in separate packets — not this packet.

## 3. Source-of-Truth and Evidence Chain

| Field | Value |
| --- | --- |
| source_of_truth_commit | cc67563 |
| source_of_truth_label | test(workflow): add sandbox test mode channel validation completeness gate |

### Upstream completions (referenced, not re-approved)

| Field | Value |
| --- | --- |
| channel_validation_completeness_gate_status | completed |
| channel_validation_gate_decision | NO_GO |
| approval_capture_completeness_gate_status | completed |
| local_demo_e2e_evidence_chain_status | passed |
| local_demo_evidence_freeze_release_candidate_review_status | completed |
| local_demo_release_candidate_management_summary_jason_review_status | completed |
| roofer_pilot_essentials_planning_batch_status | completed |
| recommended_defaults_proposal_status | recommended_defaults_proposed_only |
| recommended_defaults_acceptance_boundary_status | completed |
| approval_request_ready_status | completed |
| channel_validation_evidence_capture_packet_status | completed |
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

| Field | Value |
| --- | --- |
| approval_capture_status | not_captured |
| jason_signed_approval_status | not_signed |
| approval_capture_gate_decision | NO_GO |
| setup_evidence_capture_status | not_captured |
| controlled_real_roofer_setup_status | incomplete |
| controlled_real_roofer_setup_gate_decision | NO_GO |
| completeness_status | incomplete |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| default_sandbox_test_mode_decision | HOLD |
| current_recommended_next_step | JASON_COMPLETE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_EVIDENCE_THEN_CAPTURE_CONTROLLED_REAL_ROOFER_SETUP_EVIDENCE |

## 4. Recommended Default Controlled Real Roofer Setup Steps (12)

All steps below are **RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED** — conservative planning defaults for the fastest safe controlled real roofer pilot setup evidence path.

| # | Setup Step ID | Description | Expected Setup Artifact (default) | Status |
| --- | --- | --- | --- | --- |
| 1 | CRPS-01 | Signed agreement / terms accepted | Signed agreement or terms acceptance record on file | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| 2 | CRPS-02 | Guided setup completed | Guided setup completion checklist or session notes | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| 3 | CRPS-03 | Business profile captured | Roofer business profile record draft | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| 4 | CRPS-04 | Lead sources defined | Lead source definitions document | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| 5 | CRPS-05 | Test phone setup confirmed | Test phone configuration checklist (no credential values logged) | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| 6 | CRPS-06 | Calendar setup confirmed | Calendar integration or stub configuration record | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| 7 | CRPS-07 | Contact permission/compliance reviewed | Contact permission and compliance review checklist | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| 8 | CRPS-08 | Human escalation contact confirmed | Human escalation contact card or assignment record | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| 9 | CRPS-09 | Calendar booking rules confirmed | Calendar booking rules document | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| 10 | CRPS-10 | Do-not-contact / excluded leads rules confirmed | Do-not-contact and excluded leads rules document | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| 11 | CRPS-11 | Report recipients confirmed | Report recipients list or confirmation record | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| 12 | CRPS-12 | Trial/billing expectations confirmed | Trial and billing expectations acknowledgment record | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |

| Field | Value |
| --- | --- |
| controlled_real_roofer_setup_steps_count | 12 |
| captured_setup_steps_count | 0 |
| passed_setup_steps_count | 0 |
| failed_setup_steps_count | 0 |
| missing_setup_evidence_steps_count | 12 |

**Explicit note:** Recommended setup step counts are **not** approval.

## 5. Required Evidence Fields Per Setup Step

Each of the 12 setup steps requires the following evidence fields when captured in a future separately approved run:

| Field | Description |
| --- | --- |
| setup_step_id | Unique setup step identifier (e.g. CRPS-01) |
| roofer_test_account_reference | Roofer or test account reference used for this setup step |
| approved_scope_reference | Reference to the separately granted approval scope |
| expected_setup_artifact | Expected setup artifact per setup checklist |
| observed_setup_artifact | Observed setup artifact during setup run |
| owner | Owner responsible for this evidence record |
| timestamp | Timestamp of evidence capture |
| artifact_path | Path to artifact or supporting file |
| pass_fail_result | Pass or fail result for this setup step |
| reviewer_signoff | Reviewer signoff (Jason or designated reviewer) |

All fields default to blank in this packet. Evidence capture status is `not_captured` for all 12 setup steps.

## 6. Exact Values and Approval Status

| Field | Value |
| --- | --- |
| exact_values_required_count | 19 |
| recommended_exact_values_proposed_count | 19 |
| accepted_exact_values_count | 0 |
| accepted_exact_values_filled_count | 0 |
| approved_exact_values_filled_count | 0 |
| exact_values_filled_count | 0 |
| all_exact_values_filled | false |
| recommended_defaults_are_not_approval | true |
| recommended_defaults_are_not_accepted_exact_values | true |
| setup_evidence_capture_packet_does_not_equal_approval | true |
| setup_evidence_template_does_not_equal_approval | true |
| setup_no_go_review_does_not_equal_approval | true |
| recommended_setup_step_counts_are_not_approval | true |
| approved_for_activation_now | false |
| command_execution_status | not_run_by_this_packet |
| approved_channels | [] |
| approved_external_services | [] |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| real_roofer_onboarding_contact_allowed | false |
| real_roofer_contact_allowed | false |

## 7. Current Activation Posture

| Field | Value |
| --- | --- |
| activation_approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |
| live_activation_approval_status | not_granted |
| command_execution_status | not_run_by_this_packet |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |
| live_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| real_roofer_onboarding_contact_allowed | false |
| real_roofer_contact_allowed | false |
| external_calls_allowed | false |
| credentials_access_allowed | false |
| production_data_access_allowed | false |
| schema_auth_rls_security_changes_allowed | false |
| public_route_webhook_scheduler_cron_dispatcher_allowed | false |
| billing_payment_automation_allowed | false |
| public_go_live_or_production_copy_changes_allowed | false |
| real_demo_sandbox_live_testing_allowed | false |
| public_website_go_live_copy_changed | false |
| safety_status | demo_ready_with_live_automation_disabled |
| old_90_day_plan_boundary | old 90-day plan cannot override current source-of-truth direction |

This packet does **not** run any controlled real roofer setup command. This packet does **not** contact a roofer. This packet does **not** run the final activation command:

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh
```

## 8. Connected Prior Packets

This evidence capture packet builds on the sandbox/test-mode channel validation completeness gate (`cc67563`):

- Channel validation completeness gate: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_COMPLETENESS_GATE.md`
- Channel validation completeness gate fixture: `backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-channel-validation-completeness-gate.json`
- Real roofer pilot setup checklist: `docs/NATIVE_WORKFLOW_FIXTURE_REAL_ROOFER_PILOT_SETUP_CHECKLIST.md`
- Controlled real roofer validation plan: `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_VALIDATION_PLAN.md`
- No-go/stop conditions: `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_NO_GO_STOP_CONDITION_CHECKLIST.md`

## 9. Connected Evidence Capture Artifacts

- Evidence template: `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_PILOT_SETUP_EVIDENCE_TEMPLATE.md`
- No-go review: `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_PILOT_SETUP_NO_GO_REVIEW.md`
- Structured fixture: `backend/fixtures/native-workflow-demo-roofer/controlled-real-roofer-pilot-setup-evidence-capture-packet.json`
- Read-only verifier: `backend/scripts/verify-native-workflow-fixture-controlled-real-roofer-pilot-setup-evidence-capture-packet-readonly.js`
- Dry-run wrapper: `scripts/run-native-workflow-fixture-controlled-real-roofer-pilot-setup-evidence-capture-packet-dry-run.sh`

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only, planning-only, not-approved, non-executing.