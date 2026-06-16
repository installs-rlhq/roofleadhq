# Native Workflow Fixture Missed Lead Recovery Expansion

## 1. Purpose and Scope

This packet expands the **native workflow fixture state model dry-run** with explicit, deterministic fake-data coverage for how RoofLeadHQ identifies, tracks, limits, blocks, reviews, and manually routes missed lead recovery opportunities.

It deepens the local fixture missed lead recovery layer without adding production behavior, persistence, schema, or live automation.

### What this packet is

- local fixture-only missed lead recovery expansion
- fake data only
- deterministic missed lead recovery summaries and items
- explicit recovery-eligible vs recovery-blocked tracking
- new lead not responded to in time
- homeowner non-response after configured safe follow-up attempts
- missed call / missed form / missed inquiry fixture cases
- missed lead recovery eligible, active, blocked, and stopped-after-max-attempts states
- roofer review vs RoofLeadHQ/Jason system-quality review boundaries
- contact permission and do-not-contact boundaries
- manual outreach handoff when recovery requires human follow-up
- appointment readiness and post-inspection recovery tracking where relevant
- reporting and CSV compatibility
- activation-flag boundary
- read-only verifier
- dry-run wrapper

### What this packet is not

- This is **not** a production missed lead recovery workflow engine.
- This is **not** schema work.
- This is **not** a live automation system.
- This does **not** implement persistence.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** send live SMS, email, calls, or notifications.
- This does **not** call Twilio, Vapi, Resend, Lindy, or Google Calendar.
- This does **not** perform CRM sync.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has deterministic fake-data evidence that missed lead recovery decision rules, eligibility boundaries, blocker boundaries, review ownership boundaries, attempt tracking, manual outreach handoff, and safety assertions are explicit and verified before any schema, persistence, auth/RLS, or live integration work.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_APPOINTMENT_READINESS_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_POST_INSPECTION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_FEEDBACK_PERMISSION_EXPANSION.md`
- `docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_OUTREACH_EXPANSION.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

This packet relates to the Local E2E Fixture Runner dry-run layer and preserves the same fake-data-only boundary.

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_MISSED_LEAD_RECOVERY_EXPANSION.md`
- `scripts/run-native-workflow-fixture-missed-lead-recovery-expansion-dry-run.sh`
- `backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`
- `backend/scripts/verify-native-workflow-fixture-missed-lead-recovery-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-post-inspection-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-feedback-permission-expansion-readonly.js`
- `backend/scripts/verify-native-workflow-fixture-manual-outreach-expansion-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `955ea36 test(workflow): expand native workflow fixture manual outreach`

## 2. Relationship to Fixture State Model Dry-Run

This expansion deepens the existing fixture state model dry-run without replacing it. The same runner (`backend/scripts/run-native-workflow-fixture-state-model-dry-run.js`) now emits:

- top-level `missed_lead_recovery_expansion_summary`, `missed_lead_recovery_items`
- `missed_lead_recovery_status_summary`, `missed_lead_recovery_eligibility_summary`
- `missed_lead_recovery_blocker_summary`, `missed_lead_recovery_attempt_summary`
- `missed_lead_recovery_owner_summary`, `missed_lead_recovery_manual_outreach_summary`
- `missed_lead_recovery_review_boundary_summary`, `missed_lead_recovery_reporting_summary`
- `missed_lead_recovery_safety_assertions`
- per-scenario `missed_lead_recovery_items` with full required fields

All 25 scenarios, transition logs, guard assertions, reporting snapshots, review queue fields, appointment readiness fields, post-inspection fields, feedback permission fields, manual outreach fields, and existing output fields remain intact.

## 3. Fake-Data / Local-Only Boundary

- local fixture-only dry-run implementation
- local fake-data dry-run only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- **no Supabase** reads or writes
- **no schema** changes
- **no migrations**
- **no auth/RLS** changes
- **no production data**
- **no live automation**
- **no integrations**
- **no external calls**
- **no live SMS/email/call sends**
- **no notifications**
- **no Google Calendar event creation**
- **no bidirectional CRM integration**

## 4. Missed Lead Recovery Decision Model

Missed lead recovery may be marked eligible when:

- the lead has enough usable contact data
- the homeowner contacted the business or gave permission to be contacted
- do_not_contact is false
- the lead is within service area or service area is reviewable
- the lead source is captured or explicitly marked unknown
- the lead has not received a timely first response in the fake-data model
- safe configured follow-up attempts remain
- no unresolved roofer business-judgment review blocks outreach
- no unresolved RoofLeadHQ system-quality review blocks outreach
- no unsupported request requires hold/later-only routing
- no live action is attempted

Missed lead recovery must be blocked or routed to review when:

- do_not_contact is true
- contact permission is unknown and not reviewed
- homeowner contact data is missing or unusable
- max follow-up attempts have been reached
- the lead is bad fit or excluded
- service area is excluded
- the homeowner asks for pricing, estimate, quote, insurance, payment, invoice, contract, repair-vs-replacement, or legal/carrier-specific guidance
- there is an upset homeowner or disputed issue requiring roofer review
- there is broken routing, missed data capture, bad/unclear AI response, source attribution issue, dashboard/report discrepancy, workflow state confusion, setup issue, failed handoff, or quality-control concern requiring RoofLeadHQ/Jason review
- activation flags are false
- recovery would require live SMS/email/call/notification
- recovery would require unsupported automation

Missed lead recovery tracking must not:

- send live SMS
- send live email
- make live calls
- send notifications
- call Twilio/Vapi/Resend/Lindy/Calendar
- call external services
- touch production data
- create calendar events
- perform CRM sync
- generate estimates, quotes, invoices, payments, or deposits
- publish feedback or testimonials

## 5. Contact Permission and Do-Not-Contact Boundaries

- `homeowner_contact_ready` must be true before recovery_eligible can be true
- `contact_permission_status: unknown` blocks recovery or routes to review
- `do_not_contact_status: true` blocks all missed lead recovery
- unclear contact permission fails closed or routes to review before recovery

## 6. Follow-Up Attempt and Max-Attempt Boundaries

Each missed lead recovery item tracks:

- `first_response_sent` and `first_response_time_minutes`
- `prior_follow_up_count`
- `max_follow_up_attempts`
- `max_follow_up_attempts_reached`
- `homeowner_replied`
- `last_contact_channel` and `last_follow_up_date`

When `max_follow_up_attempts_reached` is true, recovery stops and routes to manual outreach handoff only (scenario 25).

## 7. Manual Outreach Handoff

When recovery requires human follow-up, items set:

- `manual_outreach_needed: true`
- `manual_outreach_owner` — roofer or roofleadhq_jason
- `required_manual_next_step`
- `next_step_owner`
- `next_step_due_date`

Manual outreach handoff is tracking only — no live sends occur.

## 8. Roofer Review vs RoofLeadHQ/Jason System Review

Roofer/contractor review owns business judgment and is required before recovery when the lead involves:

- pricing question
- estimate question
- quote request
- insurance complexity
- repair vs replacement question
- scheduling issue requiring business judgment
- homeowner asks for roofer directly
- upset homeowner
- disputed inspection or service issue
- payment or invoice question
- contract question
- legal/insurance/carrier-specific question

RoofLeadHQ/Jason system review is limited to:

- bad/unclear AI response
- missed data capture
- broken routing
- source attribution issue
- dashboard/report discrepancy
- workflow state confusion
- setup issue
- failed handoff
- quality-control concern
- feedback permission capture mismatch
- recovery-state mismatch

Do not route business judgment to Jason/RoofLeadHQ as if RoofLeadHQ is the roofer.

## 9. Reporting and CSV Compatibility

Reporting summaries include missed lead recovery counts in weekly/monthly snapshots and lead source summaries. CSV export preserves the `missed_lead_recovery_used` field with fixture sample rows including an active recovery example (`yes` value). Growth plan includes missed lead recovery tracking; Starter plan excludes it by default.

## 10. Activation-Flag Boundary

All activation flags default to `false`. Missed lead recovery items set:

- `live_sms_allowed: "no"`
- `live_email_allowed: "no"`
- `live_call_allowed: "no"`
- `notification_sent: "no"`

Live sends remain blocked when activation flags are false. Recovery tracking and manual handoff are allowed.

## 11. No Production Data / No External Calls / No Live Sends / No Notifications

- Missed lead recovery items use fixture fake data only.
- No production data is touched.
- No external services are called.
- No live notifications are sent.
- No live automation is activated.
- No Twilio, Vapi, Resend, Lindy, or Google Calendar calls occur.

## 12. Future Native Workflow Engine Support

This packet models missed lead recovery behavior in fixture output shape only. It prepares the future native workflow engine by defining:

- missed lead recovery item field contracts
- recovery-eligible vs recovery-blocked decision rules
- contact permission and do-not-contact boundaries
- follow-up attempt and max-attempt boundaries
- review ownership and audit linkage expectations
- manual outreach handoff expectations
- reporting and CSV field compatibility
- safety assertions

It does **not** implement schema, persistence, or production workflow behavior.

## 13. First Paid Roofer Manual / Founder-Operated Bridge

This packet does **not** block first paid roofer manual/founder-operated bridge work. It is a local fixture-only dry-run layer that documents missed lead recovery boundaries and safety rules. Founder-operated manual communication command packets and bridge packets remain independent operational layers.

## 14. demo_ready_with_live_automation_disabled

This expansion preserves `demo_ready_with_live_automation_disabled`. All missed lead recovery output is fake-data fixture only. Live automation remains disabled unless Jason explicitly approves activation.

## Required Missed Lead Recovery Item Fields

Each missed lead recovery item includes all fields listed in the build specification: `missed_lead_recovery_item_id`, `scenario_id`, `lead_id`, `plan_profile`, `current_state`, `target_state`, `missed_lead_recovery_used`, `missed_lead_recovery_status`, `missed_lead_recovery_reason`, `recovery_eligible`, `recovery_blocked`, `recovery_block_reason`, contact and permission fields, follow-up attempt fields, review ownership fields, manual outreach handoff fields, audit linkage, and safety fields (`live_sms_allowed`, `live_email_allowed`, `live_call_allowed`, `notification_sent`, `production_data_touched`, `external_services_called` — all `"no"`).

## Scenario Coverage

All 25 existing scenarios are preserved with missed lead recovery items:

1. normal_lead_to_appointment_readiness
2. missing_information_path
3. duplicate_review_path
4. bad_fit_excluded_path
5. stopped_do_not_contact_path
6. missed_lead_recovery_path
7. roofer_review_needed_path
8. roofleadhq_system_review_needed_path
9. appointment_booked_path
10. inspection_completed_path
11. inspection_missed_reschedule_path
12. post_inspection_still_open_path
13. estimate_needed_estimate_sent_tracking_path
14. homeowner_follow_up_needed_path
15. roofer_follow_up_needed_path
16. feedback_permission_yes_path
17. feedback_permission_no_path
18. feedback_permission_not_asked_path
19. csv_report_snapshot_fake_data_path
20. starter_plan_profile_path
21. growth_plan_profile_path
22. elite_plan_profile_path
23. custom_review_500_plus_leads_path
24. custom_review_two_plus_locations_path
25. activation_flag_false_blocks_live_action_path

## Safety Assertions

The verifier enforces deterministic read-only assertions including eligibility rules, blocker rules, review boundaries, contact permission boundaries, do-not-contact blockers, live-send blockers, reporting compatibility, and safety assertions. The verifier fails closed if required fields, recovery eligibility, recovery blockers, review boundaries, or safety assertions are missing.

## Dry-Run Command

```bash
bash scripts/run-native-workflow-fixture-missed-lead-recovery-expansion-dry-run.sh
```

## Read-Only Verifier Command

```bash
node backend/scripts/verify-native-workflow-fixture-missed-lead-recovery-expansion-readonly.js
```