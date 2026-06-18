# Native Workflow Fixture Demo Roofer Local E2E Walkthrough Script

## 1. Purpose and Scope

This packet is a **fake-data/local-only/read-only/dry-run-only/review-only demo walkthrough script** that guides Jason through a narrative review of the Summit Peak Roofing Demo LLC fake-data local E2E flow across all 25 scenarios.

### What this packet is

- operator-facing narrative demo walkthrough for Jason
- structured scenario-by-scenario observation guide
- companion to the observation/triage packet
- read-only verifier input
- dry-run wrapper using verifier + backend build only
- **demo roofer local E2E walkthrough review-only** — guides narrative fake-data review without granting activation or external service approval
- packet type is `demo_roofer_local_e2e_walkthrough_review_only`

### What this packet is not

- This is **not** public copy.
- This is **not** a customer promise.
- This is **not** live activation.
- This is **not** approval to activate anything.
- This is **not** approval to approve live activation.
- This does **not** approve live activation.
- This is **not** approval to approve sandbox/test-mode activation.
- This does **not** approve sandbox/test-mode activation.
- This is **not** approval to make external calls.
- This is **not** approval to access credentials, env, API, or webhooks.
- This is **not** approval to touch production Supabase data.
- This is **not** schema, auth, RLS, or security work.
- This does **not** add public routes, schedulers, cron, dispatchers, live sends, CRM sync, or billing/payment/deposit/invoice/quote/estimate automation.
- This does **not** implement external service integration behavior.
- This does **not** run the final activation command.
- This does **not** execute any activation step or proposed command.

### Connected evidence chain

This walkthrough builds on the complete demo roofer local E2E evidence chain:

- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_TEST_BUNDLE.md` (`17abae0`)
- `docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_LOCAL_DRY_RUN_POST_RUN_EVIDENCE.md` (`cf566ae`)
- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_SCENARIO_REVIEW_RUNNER.md` (`728ad03`)
- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_E2E_EVIDENCE_REPORT.md` (`401bfc7`)
- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_OPERATOR_RUNBOOK.md` (`edceb29`)
- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_GO_NO_GO_EVIDENCE_GATE.md` (`edceb29`)
- `docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_RUN_EVIDENCE_CAPTURE.md` (`df388f4`)
- `docs/NATIVE_WORKFLOW_FIXTURE_FINAL_LOCAL_DEMO_E2E_READINESS_SUMMARY.md` (`df388f4`)
- `docs/NATIVE_WORKFLOW_FIXTURE_FINAL_LOCAL_DEMO_E2E_NEXT_DECISION_PACKET.md` (`df388f4`)

Structured walkthrough/triage fixture:

- `backend/fixtures/native-workflow-demo-roofer/demo-local-e2e-walkthrough-observation-triage.json`

Companion observation/triage packet:

- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_OBSERVATION_TRIAGE_PACKET.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_WALKTHROUGH_SCRIPT.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_OBSERVATION_TRIAGE_PACKET.md`
- `backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-walkthrough-observation-triage-readonly.js`
- `scripts/run-native-workflow-fixture-demo-roofer-local-e2e-walkthrough-observation-triage-dry-run.sh`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth for this packet: `3800512 test(workflow): add final local demo e2e readiness decision`

## 2. Demo Roofer Context

| Field | Value |
| --- | --- |
| source_of_truth_commit | 3800512 |
| demo_roofer_name | Summit Peak Roofing Demo LLC |
| demo_roofer_is_fake | true |
| scenario_count | 25 |
| expected_outcome_count | 25 |
| matched_outcome_count | 25 |
| walkthrough_sections_count | 25 |
| safety_status | demo_ready_with_live_automation_disabled |
| activation_approval_status | not_granted |
| command_execution_status | not_run_by_this_packet |
| approved_for_activation_now | false |
| approved_channels | [] |
| approved_external_services | [] |

Summit Peak Roofing Demo LLC is obviously fake. All homeowner names, addresses, phone numbers, and lead sources in this walkthrough are fixture data only.

## 3. Required Pre-Demo Checks

Before starting the narrative walkthrough, confirm:

| Check | Requirement |
| --- | --- |
| HEAD == origin/main | Repository HEAD matches origin/main |
| git status blank | Working tree is clean (no uncommitted changes) |
| pilot readiness summary | `demo_ready_with_live_automation_disabled` |
| safe readiness fast lane | `bash scripts/verify-safe-readiness-fast.sh` passes with 17 checks |
| backend build | `npm --prefix backend run build` passes |

## 4. Exact Local Review Commands

Run these commands in order before or during the walkthrough. They are read-only or dry-run only.

```bash
node backend/scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner.js
node backend/scripts/generate-native-workflow-fixture-demo-roofer-e2e-evidence-report.js
bash scripts/run-native-workflow-fixture-demo-roofer-e2e-evidence-report-dry-run.sh
bash scripts/run-native-workflow-fixture-demo-roofer-local-e2e-operator-runbook-go-no-go-gate-dry-run.sh
node backend/scripts/show-pilot-readiness-status.js
bash scripts/verify-safe-readiness-fast.sh
npm --prefix backend run build
```

## 5. Narrative Walkthrough Sections

Use the companion observation/triage packet to record status, severity, owner, and notes for each section.

---

## Walkthrough Section 1: New qualified lead to appointment-ready path

**Scenario ID:** `scenario-001-new-paid-lead-qualified-appointment-ready`

**What Jason should observe:** A new paid fake lead arrives with complete contact info and confirmed permission. The lead qualifies and routes to appointment readiness review. No outbound messaging fires. No live booking occurs.

**Expected local-only result:** Final state `appointment_readiness_review`. Result `pass_local_fake_data_review`. Roofer review required. `live_action_allowed` false. `notification_sent` false. `appointment_booked` false.

**What would count as a concern:** Any automatic outbound message, live calendar booking, production data touch, or wording that implies promised confirmed appointments or live job bookings.

---

## Walkthrough Section 2: Missing contact info review queue

**Scenario ID:** `scenario-002-new-lead-missing-contact-review-queue`

**What Jason should observe:** A new fake lead is missing phone or email. The system routes to review queue instead of attempting outreach. Operator must complete missing contact review.

**Expected local-only result:** Final state `review_queue_required`. Result `pass_local_fake_data_review`. `review_queue_required` true. `outbound_messaging_allowed` false. Next step owner is roofer.

**What would count as a concern:** System attempts outbound contact without complete info, skips review queue, or auto-fills fake contact data without operator awareness.

---

## Walkthrough Section 3: No contact permission compliance block

**Scenario ID:** `scenario-003-new-lead-no-contact-permission`

**What Jason should observe:** A new fake lead has denied contact permission. Outbound messaging is held. Compliance block is explicit.

**Expected local-only result:** Final state `messaging_hold_no_outbound`. Result `pass_local_fake_data_review`. `contact_permission_status` permission_denied. `outbound_messaging_allowed` false.

**What would count as a concern:** Any draft-send, scheduled message, or implied permission override without explicit roofer review.

---

## Walkthrough Section 4: Missed lead recovery

**Scenario ID:** `scenario-004-missed-lead-recovery`

**What Jason should observe:** A prior unanswered fake lead surfaces for recovery review. Manual roofer follow-up is required. No automated recovery send occurs.

**Expected local-only result:** Final state `missed_lead_recovery_review`. Result `pass_local_fake_data_review`. `manual_outreach_required` true. `notification_sent` false.

**What would count as a concern:** Automatic recovery SMS/email/call, CRM sync, or language implying the system re-engaged the homeowner live.

---

## Walkthrough Section 5: Manual outreach

**Scenario ID:** `scenario-005-manual-outreach`

**What Jason should observe:** Lead requires roofer-controlled manual outreach. System prepares review path only. Roofer drafts outreach manually.

**Expected local-only result:** Final state `manual_outreach_roofer_controlled`. Result `pass_local_fake_data_review`. `manual_outreach_required` true. `live_action_allowed` false.

**What would count as a concern:** System sends outreach automatically, or UI implies live send approval without explicit roofer action.

---

## Walkthrough Section 6: Appointment readiness

**Scenario ID:** `scenario-006-appointment-readiness`

**What Jason should observe:** Qualified fake lead with homeowner preference captured reaches appointment readiness. Roofer confirms readiness manually.

**Expected local-only result:** Final state `appointment_readiness_ready`. Result `pass_local_fake_data_review`. `appointment_readiness_expected` true. `appointment_booked` false.

**What would count as a concern:** Automatic booking, calendar integration call, or copy promising confirmed appointments.

---

## Walkthrough Section 7: Fake calendar placeholder only

**Scenario ID:** `scenario-007-appointment-scheduled-placeholder`

**What Jason should observe:** Appointment appears on fake calendar placeholder only. No Google Calendar or live booking integration.

**Expected local-only result:** Final state `appointment_scheduled_placeholder_only`. Result `pass_local_fake_data_review`. `calendar_booking_performed` false. `fake_calendar_placeholder_only` true.

**What would count as a concern:** Real calendar API call, external notification, or UI that looks like a live booked slot without placeholder labeling.

---

## Walkthrough Section 8: Reschedule request

**Scenario ID:** `scenario-008-appointment-reschedule-request`

**What Jason should observe:** Homeowner reschedule request routes to roofer manual coordination. No automatic reschedule notification.

**Expected local-only result:** Final state `appointment_reschedule_review`. Result `pass_local_fake_data_review`. `manual_outreach_required` true. `notification_sent` false.

**What would count as a concern:** Auto-reschedule to calendar, live homeowner notification, or missing roofer review step.

---

## Walkthrough Section 9: No-show path

**Scenario ID:** `scenario-009-missed-appointment-no-show`

**What Jason should observe:** Missed appointment/no-show routes to roofer manual follow-up. No automated chase sequence.

**Expected local-only result:** Final state `appointment_no_show_follow_up`. Result `pass_local_fake_data_review`. `manual_outreach_required` true. `appointment_readiness_expected` false.

**What would count as a concern:** Automated no-show SMS/call sequence, penalty billing, or production appointment mutation.

---

## Walkthrough Section 10: Post-inspection estimate pending

**Scenario ID:** `scenario-010-post-inspection-estimate-pending`

**What Jason should observe:** Inspection completed on fake lead. Estimate is pending. Roofer prepares estimate manually.

**Expected local-only result:** Final state `post_inspection_estimate_pending`. Result `pass_local_fake_data_review`. `estimate_created` false. `manual_outreach_required` true.

**What would count as a concern:** Auto-generated quote/estimate, invoice creation, or payment link generation.

---

## Walkthrough Section 11: Post-inspection estimate sent

**Scenario ID:** `scenario-011-post-inspection-estimate-sent`

**What Jason should observe:** Estimate marked sent for tracking only. No live quote delivery automation.

**Expected local-only result:** Final state `post_inspection_estimate_sent_tracking_only`. Result `pass_local_fake_data_review`. `quote_sent` false. `estimate_created` false.

**What would count as a concern:** Live email/SMS quote delivery, e-signature automation, or deposit collection trigger.

---

## Walkthrough Section 12: Feedback permission not asked

**Scenario ID:** `scenario-012-feedback-permission-not-asked`

**What Jason should observe:** Job completed on fake lead. Public feedback permission was not asked. No publication occurs.

**Expected local-only result:** Final state `feedback_permission_not_asked`. Result `pass_local_fake_data_review`. `permission_to_use_publicly` not_asked. `feedback_published` false.

**What would count as a concern:** Auto-publishing reviews, testimonial scraping, or assuming permission.

---

## Walkthrough Section 13: Feedback permission yes

**Scenario ID:** `scenario-013-feedback-permission-yes`

**What Jason should observe:** Homeowner granted feedback permission. Feedback stored internal only. No auto-publication.

**Expected local-only result:** Final state `feedback_permission_yes_internal_only`. Result `pass_local_fake_data_review`. `permission_to_use_publicly` yes. `feedback_published` false.

**What would count as a concern:** Automatic public posting, marketing blast, or missing internal-only guard.

---

## Walkthrough Section 14: Feedback permission no

**Scenario ID:** `scenario-014-feedback-permission-no`

**What Jason should observe:** Homeowner denied public feedback use. Public use is blocked.

**Expected local-only result:** Final state `feedback_permission_no_public_use_blocked`. Result `pass_local_fake_data_review`. `permission_to_use_publicly` no. `feedback_published` false.

**What would count as a concern:** Any public display path, republishing, or override without explicit legal/compliance review.

---

## Walkthrough Section 15: Lead source ROI

**Scenario ID:** `scenario-015-lead-source-roi-attribution`

**What Jason should observe:** Fake lead source attribution captured for ROI review. Reporting is review-only. No live CSV delivery.

**Expected local-only result:** Final state `source_roi_attribution_review`. Result `pass_local_fake_data_review`. `external_services_called` false.

**What would count as a concern:** Live ad platform sync, guaranteed ROI claims, or production analytics write.

---

## Walkthrough Section 16: Usage/plan boundary

**Scenario ID:** `scenario-016-usage-volume-plan-limit-boundary`

**What Jason should observe:** Usage volume approaches plan limit boundary. Review path is explicit. No billing automation fires.

**Expected local-only result:** Final state `usage_volume_plan_limit_boundary_review`. Result `pass_local_fake_data_review`. `billing_payment_automation_allowed` false at packet level.

**What would count as a concern:** Auto-upgrade charge, invoice generation, or service cutoff without operator review.

---

## Walkthrough Section 17: Messaging compliance

**Scenario ID:** `scenario-017-messaging-compliance-contact-permission`

**What Jason should observe:** Contact permission needs review before any messaging. Compliance hold is clear.

**Expected local-only result:** Final state `messaging_compliance_hold`. Result `pass_local_fake_data_review`. `review_queue_required` true. `outbound_messaging_allowed` false.

**What would count as a concern:** Ambiguous permission state, silent outbound queue, or missing compliance hold labeling.

---

## Walkthrough Section 18: Data minimization

**Scenario ID:** `scenario-018-data-minimization-pii-boundary`

**What Jason should observe:** PII fields are minimized to what the scenario requires. Extra sensitive data is not collected or displayed.

**Expected local-only result:** Final state `data_minimization_pii_boundary_review`. Result `pass_local_fake_data_review`. `production_data_touched` false.

**What would count as a concern:** Over-collection of PII, credential logging, or real homeowner data references.

---

## Walkthrough Section 19: Audit timeline

**Scenario ID:** `scenario-019-audit-timeline-event-expectation`

**What Jason should observe:** Expected audit events appear in timeline for fake lead progression. Events are fixture/review only.

**Expected local-only result:** Final state `audit_timeline_event_expectation_review`. Result `pass_local_fake_data_review`. Timeline is review artifact only.

**What would count as a concern:** Missing critical events, production audit writes, or timeline implying live system mutation.

---

## Walkthrough Section 20: Review aging/SLA

**Scenario ID:** `scenario-020-review-queue-aging-sla-boundary`

**What Jason should observe:** Review queue item ages toward SLA boundary. Escalation path is visible. No auto-resolution.

**Expected local-only result:** Final state `review_queue_aging_sla_boundary`. Result `pass_local_fake_data_review`. `review_queue_required` true.

**What would count as a concern:** Silent auto-close, missing SLA labeling, or automatic outbound triggered by aging alone.

---

## Walkthrough Section 21: Roofer judgment escalation

**Scenario ID:** `scenario-021-human-escalation-roofer-judgment`

**What Jason should observe:** Business judgment needed. Escalation routes to roofer, not RoofLeadHQ system review.

**Expected local-only result:** Final state `roofer_human_escalation_review`. Result `pass_local_fake_data_review`. `review_owner` roofer. `roofleadhq_review_required` false.

**What would count as a concern:** Escalation ambiguity, auto-routing to engineering, or missing roofer ownership.

---

## Walkthrough Section 22: RoofLeadHQ system-review escalation

**Scenario ID:** `scenario-022-roofleadhq-escalation-system-review`

**What Jason should observe:** System quality issue routes to RoofLeadHQ/Jason for ambiguity, bad data, QC issue, broken routing, or system review only.

**Expected local-only result:** Final state `roofleadhq_system_escalation_review`. Result `pass_local_fake_data_review`. `review_owner` roofleadhq. `roofleadhq_review_required` true.

**What would count as a concern:** Roofer judgment cases routed to RoofLeadHQ, or system review used for normal business decisions.

---

## Walkthrough Section 23: Unsupported estimate/quote/invoice/payment block

**Scenario ID:** `scenario-023-unsupported-automation-blocked`

**What Jason should observe:** Instant quote/estimate/invoice/payment request is blocked. Manual roofer step required.

**Expected local-only result:** Final state `unsupported_automation_blocked`. Result `pass_local_fake_data_review`. `estimate_created` false. `invoice_sent` false. `payment_collected` false.

**What would count as a concern:** Any automated quote, invoice, deposit, or payment flow; or wording implying supported automation.

---

## Walkthrough Section 24: External service boundary block

**Scenario ID:** `scenario-024-external-service-boundary-blocked`

**What Jason should observe:** Twilio/Vapi/Resend/Google Calendar/Lindy/CRM/live CSV paths remain blocked.

**Expected local-only result:** Final state `external_service_calls_blocked`. Result `pass_local_fake_data_review`. `external_services_called` false. `approved_external_services` [].

**What would count as a concern:** Any external API reference in scenario path, credential access, or sandbox/test-mode activation hint.

---

## Walkthrough Section 25: Stop-condition boundary

**Scenario ID:** `scenario-025-stop-condition-boundary`

**What Jason should observe:** Unsafe run attempt triggers stop condition. Run halts for fixture review. No silent continuation.

**Expected local-only result:** Final state `stop_condition_triggered_fixture_review`. Result `pass_local_fake_data_review`. `live_action_allowed` false.

**What would count as a concern:** Stop condition bypassed, partial execution after unsafe signal, or missing operator-visible halt.

---

## 6. Walkthrough Completion Reminder

This walkthrough script is not public copy, not a customer promise, and not live activation.

- Record observations in `docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_OBSERVATION_TRIAGE_PACKET.md`
- No triage decision approves activation, external services, sandbox/test-mode, live services, credentials, production data, schema/auth/RLS/security changes, scheduler/cron/dispatcher, public route/webhook, billing/payment/quote/estimate/invoice automation, or final activation command execution
- `activation_approval_status` remains `not_granted`
- `command_execution_status` remains `not_run_by_this_packet`
- `approved_for_activation_now` remains `false`
- old 90-day plan cannot override current source-of-truth direction

## 7. Safety Boundary Confirmation

| Boundary | Status |
| --- | --- |
| activation | blocked |
| final_activation_command_executed | blocked |
| external_calls | blocked |
| credentials_env_api_webhook_access | blocked |
| production_data_access | blocked |
| schema_auth_rls_security_changes | blocked |
| public_route_webhook_scheduler_cron_dispatcher | blocked |
| billing_payment_automation | blocked |
| live_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| public_website_go_live_copy_changed | false |