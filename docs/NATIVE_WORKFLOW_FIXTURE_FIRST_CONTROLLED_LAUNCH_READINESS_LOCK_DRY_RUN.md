# Native Workflow Fixture First Controlled Launch Readiness Lock Dry Run

## 1. Purpose and Scope

This packet defines and verifies a **fake-data/local-only first controlled launch readiness lock** that consolidates upstream fixture evidence into a final readiness summary Jason would review before any future controlled launch approval step.

### What this packet is

- local fake-data first controlled launch readiness lock dry-run
- deterministic `first_controlled_launch_readiness_lock_items` and per-area lock summaries
- explicit launch-blocked modeling, required evidence, unresolved blockers, owner routing, approval placeholders, rollback readiness, post-approval test readiness, allowed/forbidden next actions, and final locked status
- channel-by-channel readiness lock sections with fake fixture data only
- read-only verifier
- dry-run wrapper using the additive fast-lane verification approach where appropriate

### What this packet is not

- This is **not** live channel activation.
- This is **not** sandbox/test-mode channel activation.
- This is **not** first controlled launch activation.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** read sandbox or production credentials.
- This does **not** log env values, API keys, tokens, webhook secrets, or service-role keys.
- This does **not** send live SMS, email, calls, notifications, or calendar events.
- This does **not** generate estimates, quotes, invoices, payments, or deposits.
- This does **not** sync to CRM or deliver live CSV exports.
- This does **not** enable public routes, schedulers, cron jobs, or dispatchers.
- This does **not** change public website/pricing/legal/privacy/terms or public go-live copy without approval.
- This does **not** grant first controlled launch, sandbox/test-mode, or live activation approval.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a deterministic fake-data readiness lock consolidating the full upstream evidence chain — without schema, persistence, auth/RLS, sandbox credential reads, or live integration work. First controlled launch remains blocked until separate explicit Jason approval.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_PAYLOAD_REPLAY_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_REPLAY_ACCEPTANCE_GATE_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_HUMAN_REVIEW_PACKET_DRY_RUN.md`
- `docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_READINESS_LOCK_DRY_RUN.md`
- `scripts/run-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- `scripts/verify-safe-readiness-fast.sh` (additive fast lane)

### Source-of-truth workflow

Canonical source of truth before this worktree: `19db7bd test(workflow): add sandbox test mode human review packet dry run`

## 2. Fake-Data / Local-Only First Controlled Launch Readiness Lock

This section defines the **fake-data/local-only first controlled launch readiness lock** model. The dry-run model (`backend/scripts/run-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run.js`) emits stdout JSON only. All readiness lock items use fixture identifiers, fake evidence statuses, and blocked activation flags. No external service calls occur.

Top-level output fields:

- `first_controlled_launch_readiness_lock_dry_run_summary`
- `first_controlled_launch_readiness_lock_items`
- `final_readiness_lock_toc_summary`
- `executive_readiness_status_summary`
- `explicit_non_approval_summary`
- `first_controlled_launch_blocked_summary`
- `evidence_chain_summary`
- `channel_readiness_lock_summary`
- `messaging_compliance_readiness_lock_summary`
- `calendar_readiness_lock_summary`
- `csv_reporting_readiness_lock_summary`
- `crm_handoff_export_readiness_lock_summary`
- `lindy_bridge_readiness_lock_summary`
- `scheduler_dispatcher_readiness_lock_summary`
- `public_route_webhook_readiness_lock_summary`
- `supabase_persistence_readiness_lock_summary`
- `billing_payment_quote_boundary_lock_summary`
- `credential_env_boundary_lock_summary`
- `data_boundary_pii_lock_summary`
- `audit_timeline_lock_summary`
- `owner_routing_lock_summary`
- `unresolved_blocker_register_summary`
- `rollback_readiness_lock_summary`
- `post_approval_test_readiness_lock_summary`
- `final_decision_checklist_summary`
- `allowed_next_actions_summary`
- `forbidden_next_actions_summary`
- `first_controlled_launch_readiness_lock_safety_assertions`

## 3. Relationship to Verifier Quiet Mode Fast Lane Cleanup

The verifier quiet mode fast lane cleanup (`docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md`) documents the **additive fast lane** verification approach for normal fixture/readiness builds. This readiness lock packet **uses** that fast lane:

1. **Fast lane for iteration** — targeted packet verifier + `scripts/verify-safe-readiness-fast.sh` + backend build
2. **Full lane preserved** — `scripts/verify-safe-readiness.sh` remains available for milestone/high-risk review
3. **No safety weakening** — fast lane does not replace full aggregate regression
4. **Readiness lock checks additive** — this packet adds a final consolidation lock without removing prior verifiers

## 4. Relationship to Channel Adapter Contract Dry Run

The channel adapter contract dry run (`docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md`) defines **pre-activation payload contract shapes** across 12 contract categories. This readiness lock **consolidates** that contract evidence:

1. **Contract evidence present** — `evidence_chain_summary` references 12 contract categories
2. **Blocked delivery modeled** — all contract payloads remain `dry_run_only` and `not_approved`
3. **Audit expectations met** — contract items include `fixture_audit_event_id`
4. **Activation blocked** — no first controlled launch, sandbox/test-mode, or live activation implied

## 5. Relationship to Channel Payload Replay Dry Run

The channel payload replay dry run (`docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_PAYLOAD_REPLAY_DRY_RUN.md`) **replays** contract shapes through validation, blocked delivery, audit expectations, and safe failure routing across 20 replay scenarios. This readiness lock **consolidates** that replay evidence:

1. **Replay evidence present** — `evidence_chain_summary` references 20 replay scenarios
2. **Blocked delivery confirmed** — replay items remain blocked with explicit reasons
3. **Failure routing documented** — malformed, activation violation, credential leakage, and unsupported channel scenarios route to safe owners
4. **No activation implied** — replay evidence does not grant launch, sandbox/test-mode, or live approval

## 6. Relationship to Channel Replay Acceptance Gate Dry Run

The channel replay acceptance gate dry run (`docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_REPLAY_ACCEPTANCE_GATE_DRY_RUN.md`) **summarizes** contract and replay evidence into 22 acceptance gate areas with go/no-go decisions. This readiness lock **consolidates** that acceptance gate evidence:

1. **Acceptance gate evidence present** — `evidence_chain_summary` references 22 gate areas
2. **Go/no-go decisions documented** — executive readiness status reflects gate decisions
3. **Unresolved blockers carried forward** — blocker register includes gate blocking reasons
4. **No activation implied** — acceptance gate evidence does not grant launch, sandbox/test-mode, or live approval

## 7. Relationship to Sandbox/Test-Mode Human Review Packet Dry Run

The sandbox/test-mode human review packet dry run (`docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_HUMAN_REVIEW_PACKET_DRY_RUN.md`) **assembles** upstream contract, replay, and acceptance gate evidence into 26 human review sections. This readiness lock **consolidates** that human review packet evidence:

1. **Human review packet evidence present** — `evidence_chain_summary` references 26 review sections
2. **Review posture carried forward** — executive readiness status reflects human review go/no-go posture
3. **Blockers and owner routing preserved** — unresolved blocker register and owner routing lock carry forward review blockers
4. **No activation implied** — human review packet evidence does not grant launch, sandbox/test-mode, or live approval

## 8. Final Readiness Lock Table of Contents

| Order | Area | TOC status |
| --- | --- | --- |
| 1 | Executive readiness status | ready_for_review |
| 2 | Evidence chain completeness | ready_for_review |
| 3 | Channel adapter contract evidence | ready_for_review |
| 4 | Channel payload replay evidence | ready_for_review |
| 5 | Channel replay acceptance gate evidence | ready_for_review |
| 6 | Sandbox/test-mode human review packet evidence | ready_for_review |
| 7 | SMS readiness lock | ready_for_review |
| 8 | Email readiness lock | ready_for_review |
| 9 | Call/Vapi readiness lock | ready_for_review |
| 10 | Google Calendar readiness lock | ready_for_review |
| 11 | CSV/reporting readiness lock | ready_for_review |
| 12 | CRM handoff/export readiness lock | ready_for_review |
| 13 | Lindy bridge readiness lock | ready_for_review |
| 14 | Scheduler/dispatcher readiness lock | ready_for_review |
| 15 | Public route/webhook readiness lock | ready_for_review |
| 16 | Supabase persistence readiness lock | ready_for_review |
| 17 | Billing/payment/quote/estimate/invoice blocked boundary | blocked_boundary |
| 18 | Messaging compliance readiness lock | ready_for_review |
| 19 | Credential/env boundary lock | ready_for_review |
| 20 | Data boundary / PII lock | ready_for_review |
| 21 | Audit/timeline lock | ready_for_review |
| 22 | Owner routing lock | ready_for_review |
| 23 | Rollback readiness lock | ready_for_review |
| 24 | Post-approval test readiness lock | ready_for_review |
| 25 | Unresolved blocker register | blockers_present |
| 26 | Final decision checklist | ready_for_review |
| 27 | Allowed next actions | ready_for_review |
| 28 | Forbidden next actions | activation_blocked |
| 29 | Explicit approval still required | approval_blocked |
| 30 | First controlled launch remains blocked | launch_blocked |

## 9. Executive Readiness Status

The `executive_readiness_status_summary` provides the top-level readiness posture:

| Field | Value |
| --- | --- |
| Overall status | `ready_for_controlled_launch_review_with_launch_blocked` |
| Controlled launch review ready | `true` |
| First controlled launch allowed | `false` |
| Sandbox/test-mode activation allowed | `false` |
| Live activation allowed | `false` |
| Explicit Jason approval required for first controlled launch | `true` |
| Explicit Jason approval required for sandbox/test-mode | `true` |
| Explicit Jason approval required for live activation | `true` |

`ready_for_controlled_launch_review` does **not** imply first controlled launch, sandbox/test-mode, or live activation approval.

## 10. Explicit Non-Approval Statement

The `explicit_non_approval_summary` states clearly:

> This readiness lock does not grant first controlled launch, sandbox/test-mode, or live activation approval.

- `fixture_approval_status` is `not_approved`
- `fixture_first_controlled_launch_approval_granted` is `false`
- `fixture_sandbox_test_mode_approval_granted` is `false`
- `fixture_live_activation_approval_granted` is `false`
- No approval has been granted by Jason or any operator

## 11. First Controlled Launch Remains Blocked

The `first_controlled_launch_blocked_summary` enforces:

- `first_controlled_launch_remains_blocked` is `true`
- `fixture_first_controlled_launch_approval_granted` is `false`
- `fixture_final_launch_blocked` is `true`
- Explicit Jason approval required before any first controlled launch activation
- Sandbox/test-mode and live activation also remain blocked

## 12. Required Approval Placeholder

The `explicit_non_approval_summary` includes an approval placeholder:

| Field | Value |
| --- | --- |
| `approval_placeholder_present` | `true` |
| `approval_placeholder_owner` | `founder_manual_review` |
| `approval_placeholder_action` | `explicit_jason_approval_required_before_any_first_controlled_launch_activation` |

This placeholder documents that explicit Jason approval is required before any future first controlled launch activation. The placeholder does **not** grant approval.

## 13. Final Evidence Chain Summary

The `evidence_chain_summary` consolidates upstream packet evidence:

| Upstream packet | Evidence modeled |
| --- | --- |
| `native_workflow_fixture_channel_adapter_contract_dry_run` | 12 contract categories |
| `native_workflow_fixture_channel_payload_replay_dry_run` | 20 replay scenarios |
| `native_workflow_fixture_channel_replay_acceptance_gate_dry_run` | 22 acceptance gate areas |
| `native_workflow_fixture_sandbox_test_mode_human_review_packet_dry_run` | 26 review sections |
| `verifier_quiet_mode_fast_lane_performance_cleanup` | fast lane documented |

All upstream evidence remains `dry_run_only` and `not_approved`.

## 14. Channel Readiness Lock

The `channel_readiness_lock_summary` consolidates channel evidence across contract, replay, acceptance gate, and human review packets:

- 12 contract categories modeled
- 20 replay scenarios modeled
- 22 acceptance gate areas modeled
- 26 human review sections modeled
- SMS, email, call/Vapi readiness locks present
- All channel evidence consolidated with activation blocked

## 15. Messaging Compliance Readiness Lock

The `messaging_compliance_readiness_lock_summary` verifies:

- Messaging compliance prerequisite documented
- SMS and email readiness locks present
- Live SMS/email send allowed: `false`
- Test-mode SMS/email send allowed: `false`
- Messaging compliance review incomplete (human review required)

## 16. Calendar Readiness Lock

The `calendar_readiness_lock_summary` verifies:

- Google Calendar readiness lock present
- Calendar appointment request evidence present
- Google Calendar activation allowed: `false`
- Live booking allowed: `false`
- Test-mode booking allowed: `false`
- Calendar preferences review incomplete (human review required)

## 17. CSV/Reporting Readiness Lock

The `csv_reporting_readiness_lock_summary` verifies:

- CSV/reporting readiness lock present
- CSV export handoff evidence present
- Live CSV delivery allowed: `false`
- Data boundary review incomplete (human review required)

## 18. CRM Handoff/Export Readiness Lock

The `crm_handoff_export_readiness_lock_summary` verifies:

- CRM handoff/export readiness lock present
- CRM handoff evidence present
- Bidirectional CRM sync allowed: `false`
- One-way export only: `true`
- CRM sync not approved

## 19. Lindy Bridge Readiness Lock

The `lindy_bridge_readiness_lock_summary` verifies:

- Lindy bridge readiness lock present
- Bridge handoff modeled
- Live Lindy bridge enabled: `false`
- Bridge mode: `temporary_reference_only`
- External call allowed: `false`

## 20. Scheduler/Dispatcher Readiness Lock

The `scheduler_dispatcher_readiness_lock_summary` verifies:

- Scheduler/dispatcher readiness lock present
- Scheduler enabled: `false`
- Dispatcher enabled: `false`
- Cron enabled: `false`
- External call allowed: `false`

## 21. Public Route/Webhook Readiness Lock

The `public_route_webhook_readiness_lock_summary` verifies:

- Public route/webhook readiness lock present
- Public route enabled: `false`
- Webhook verification live mode: `false`
- External call allowed: `false`

## 22. Supabase Persistence Readiness Lock

The `supabase_persistence_readiness_lock_summary` verifies:

- Supabase persistence readiness lock present
- Production read allowed: `false`
- Production write allowed: `false`
- Schema change allowed: `false`
- External call allowed: `false`

## 23. Billing/Payment/Quote/Estimate/Invoice Blocked Boundary Lock

The `billing_payment_quote_boundary_lock_summary` verifies:

- Billing boundary locked with `no_go_automation_forbidden` decision
- Estimate, quote, invoice, payment, and deposit generation allowed: `false`
- Automation forbidden: `true`

## 24. Credential/Env Boundary Lock

The `credential_env_boundary_lock_summary` verifies:

- Credential/env leakage detection enabled
- No credential values logged
- Sandbox credential reads allowed: `false`
- Production credential reads allowed: `false`
- External call allowed: `false`

## 25. Data Boundary / PII Lock

The `data_boundary_pii_lock_summary` verifies:

- Fake data only: `true`
- Real customer PII present: `false`
- Data boundary review incomplete (human review required)
- Blocked PII fields documented (no real customer names, phones, emails, or addresses)

## 26. Audit/Timeline Lock

The `audit_timeline_lock_summary` verifies:

- `fixture_audit_event_id` required on all readiness lock items
- Audit timeline expectations documented
- All items have audit event id

## 27. Owner Routing Lock

The `owner_routing_lock_summary` verifies:

- Owner routes documented for approval_missing, malformed_payload, activation_violation, credential_leakage, public_route_webhook, supabase_persistence, billing_boundary, and first_controlled_launch_blocked
- All failures routed to safe owner (`founder_manual_review` or `security_review_queue`)

## 28. Unresolved Blocker Register

The `unresolved_blocker_register_summary` documents 9 unresolved blockers:

| Blocker ID | Description | Owner | Status |
| --- | --- | --- | --- |
| blocker_001 | explicit_first_controlled_launch_approval_missing | founder_manual_review | unresolved |
| blocker_002 | calendar_preferences_review_incomplete | founder_manual_review | unresolved |
| blocker_003 | data_boundary_review_incomplete | founder_manual_review | unresolved |
| blocker_004 | crm_sync_not_approved | founder_manual_review | unresolved |
| blocker_005 | security_tenant_isolation_review_incomplete | security_review_queue | unresolved |
| blocker_006 | rollback_plan_review_incomplete | founder_manual_review | unresolved |
| blocker_007 | post_approval_test_plan_review_incomplete | founder_manual_review | unresolved |
| blocker_008 | billing_payment_quote_automation_remains_blocked | founder_manual_review | blocked_boundary_enforced |
| blocker_009 | explicit_sandbox_test_mode_approval_missing | founder_manual_review | unresolved |

## 29. Rollback Readiness Lock

The `rollback_readiness_lock_summary` verifies:

- Rollback plan documented in contract, sequence, gate, and human review packets
- Rollback execution allowed: `false`
- Rollback review incomplete (human review required)

## 30. Post-Approval Test Readiness Lock

The `post_approval_test_readiness_lock_summary` verifies:

- Post-approval test plan documented in contract, gate, and human review packets
- Post-approval test execution allowed: `false`
- Post-approval test review incomplete (human review required)

## 31. Final Decision Checklist

The `final_decision_checklist_summary` provides a 21-item checklist for Terminal 1 review:

1. Executive readiness status reviewed
2. Evidence chain completeness reviewed
3. Channel adapter contract evidence reviewed
4. Channel payload replay evidence reviewed
5. Channel replay acceptance gate evidence reviewed
6. Human review packet evidence reviewed
7. SMS/email/call/calendar readiness locks reviewed
8. CSV/CRM/Lindy/scheduler/webhook/Supabase readiness locks reviewed
9. Billing boundary blocked confirmed
10. Messaging compliance readiness lock reviewed
11. Credential/env boundary lock reviewed
12. Data boundary/PII lock reviewed
13. Audit timeline lock reviewed
14. Owner routing lock reviewed
15. Unresolved blockers reviewed
16. Rollback readiness lock reviewed
17. Post-approval test readiness lock reviewed
18. Allowed next actions reviewed
19. Forbidden next actions reviewed
20. Explicit approval still required confirmed
21. First controlled launch remains blocked confirmed

## 32. Allowed Next Actions

The `allowed_next_actions_summary` documents safe next actions:

1. Continue fixture readiness work with fake data only
2. Run targeted packet verifiers and fast lane checks
3. Review readiness lock evidence with founder manual review
4. Document additional blockers and owner routing
5. Prepare separate explicit approval request for Jason
6. Preserve full aggregate regression lane for milestone review

All allowed actions remain local, fake-data, dry-run only. No activation implied.

## 33. Forbidden Next Actions

The `forbidden_next_actions_summary` documents blocked next actions:

1. Activate live SMS/email/call/calendar channels
2. Activate sandbox/test-mode channel sends
3. Enable scheduler/cron or dispatcher
4. Enable public routes or live webhooks
5. Perform CRM sync or live CSV delivery
6. Process billing/payment/quote/invoice/estimate automation
7. Read or write production Supabase data
8. Modify schema/migrations/auth/RLS or security
9. Log or read credentials/env values/secrets
10. Change public website/pricing/legal/privacy/terms without approval
11. Grant first controlled launch approval without explicit Jason approval
12. Imply Jason has approved any activation step

## 34. Required Common Fields Across All Readiness Lock Items

Every `first_controlled_launch_readiness_lock_item` includes:

- `fixture_readiness_lock_id`
- `fixture_readiness_area`
- `fixture_readiness_status`
- `fixture_lock_decision`
- `fixture_required_evidence`
- `fixture_current_evidence_status`
- `fixture_blocking_reason`
- `fixture_owner_for_next_step`
- `fixture_approval_status` — must be `not_approved`
- `fixture_delivery_mode` — must be `dry_run_only`
- `fixture_external_call_allowed` — must be `false`
- `fixture_live_activation_allowed` — must be `false`
- `fixture_test_mode_activation_allowed` — must be `false`
- `fixture_audit_event_id`
- `fixture_created_at`

## 35. Fast-Lane Verification Usage

For normal fixture/readiness builds in agent worktrees:

1. `node backend/scripts/verify-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run-readonly.js`
2. `bash scripts/run-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run.sh` (includes fast-lane smoke via `scripts/verify-safe-readiness-fast.sh`)
3. `npm --prefix backend run build`

Full aggregate regression via `scripts/verify-safe-readiness.sh` remains available for milestone/high-risk builds. Fast lane is additive and does not replace full regression.

## 36. Safety Rules

### No Safety Weakening Rule

This packet must not remove or weaken existing safety checks or the full aggregate readiness path.

### No Live Activation Rule

No live SMS, email, call, calendar, CRM sync, CSV delivery, billing, public routes, scheduler/cron, dispatcher, or Lindy workflow execution.

### No Test-Mode Activation Rule

No sandbox/test-mode sends or sandbox/test-mode external calls.

### No Credential/Env Logging Rule

No secret, env, token, API key, or credential value logging.

### No Production Data Rule

No real customer/homeowner data; fake fixture identifiers only.

### No Schema/Auth/RLS/Security Implementation Rule

No schema, migrations, auth, RLS, or security implementation changes.

## 37. Verifier Assertions

The read-only verifier enforces:

- `first_controlled_launch_readiness_lock_doc_present`
- `fake_data_local_only_scope_present`
- `relationship_to_verifier_fast_lane_cleanup_present`
- `relationship_to_channel_adapter_contract_present`
- `relationship_to_channel_payload_replay_present`
- `relationship_to_channel_replay_acceptance_gate_present`
- `relationship_to_human_review_packet_present`
- `final_readiness_lock_toc_present`
- `executive_readiness_status_present`
- `explicit_non_approval_statement_present`
- `first_controlled_launch_remains_blocked`
- `approval_placeholder_present`
- `evidence_chain_summary_present`
- `channel_readiness_lock_present`
- `messaging_compliance_readiness_lock_present`
- `calendar_readiness_lock_present`
- `csv_reporting_readiness_lock_present`
- `crm_handoff_export_readiness_lock_present`
- `lindy_bridge_readiness_lock_present`
- `scheduler_dispatcher_readiness_lock_present`
- `public_route_webhook_readiness_lock_present`
- `supabase_persistence_readiness_lock_present`
- `billing_payment_quote_boundary_blocked`
- `credential_env_boundary_lock_present`
- `data_boundary_pii_lock_present`
- `audit_timeline_lock_present`
- `owner_routing_lock_present`
- `unresolved_blocker_register_present`
- `rollback_readiness_lock_present`
- `post_approval_test_readiness_lock_present`
- `final_decision_checklist_present`
- `allowed_next_actions_present`
- `forbidden_next_actions_present`
- `fast_lane_reference_present`
- `runner_outputs_valid_json`
- `readiness_items_have_common_fields`
- `readiness_items_remain_dry_run_only`
- `readiness_items_have_activation_flags_false`
- `no_live_sms_activation`
- `no_twilio_activation`
- `no_vapi_activation`
- `no_resend_activation`
- `no_google_calendar_activation`
- `no_lindy_live_activation`
- `no_scheduler_cron_dispatcher_activation`
- `no_public_route_webhook_activation`
- `no_crm_sync_activation`
- `no_live_csv_delivery_activation`
- `no_billing_payment_quote_invoice_estimate_activation`
- `no_supabase_production_reads_writes`
- `no_schema_migrations_auth_rls_security_changes`
- `no_secret_env_credential_logging`
- `demo_ready_with_live_automation_disabled_preserved`
- `full_safe_readiness_lane_preserved`
- `docs_and_context_wiring_present`
- `dry_run_wrapper_present_and_safe`
- `public_go_live_or_production_copy_not_changed_without_approval`

## 38. Dry-Run Commands

```bash
node backend/scripts/verify-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run-readonly.js
```

```bash
bash scripts/run-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run.sh
```

```bash
bash scripts/verify-safe-readiness-fast.sh
```

Full regression (milestones only — Terminal 1):

```bash
bash scripts/verify-safe-readiness.sh
```