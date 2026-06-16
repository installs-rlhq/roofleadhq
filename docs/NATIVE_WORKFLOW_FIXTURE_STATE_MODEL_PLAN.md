# Native Workflow Fixture State Model Plan

## 1. Purpose and Scope

This packet defines the **fixture-only fake-data state model plan** for future native workflow implementation. It specifies fixture paths, fake records, expected states, transition guards, reporting snapshots, and validation expectations — without implementing any state model, persistence, or live behavior.

RoofLeadHQ is the roofing lead-to-inspection operating layer. It responds fast, follows up, recovers missed leads, supports appointment readiness, books homeowner inspections on the roofer's calendar, tracks what happened, supports post-inspection follow-up, captures optional homeowner feedback, and provides reporting/export.

### What this packet is

- planning/readiness/fixture-plan packet only
- read-only verifier only
- dry-run wrapper only
- fixture-only fake-data state model plan for future native workflow implementation
- fixture data model definitions (conceptual, not implemented)
- required fixture scenarios with expected state paths
- state transition expectation table
- guard failure matrix
- plan profile fixture expectations
- review queue fixture expectations
- appointment readiness fixture expectations
- post-inspection and feedback fixture expectations
- reporting/CSV fixture snapshot expectations
- activation flag fixture expectations
- fixture output shape expectations
- local E2E runner relationship
- first paid roofer relationship
- future implementation sequencing

### What this packet is not

- This does **not** implement the state model.
- This does **not** implement the workflow engine.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** replace attorney/security review.
- This defines fixture paths, fake records, expected states, transition guards, reporting snapshots, and validation expectations before implementation.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a single artifact that:

- Defines the first fixture-only state model plan for native workflow behavior.
- Specifies deterministic fake-data paths before schema, persistence, auth/RLS, or live integrations.
- Documents expected states, guard failures, plan-profile differences, and review queues.
- Preserves `demo_ready_with_live_automation_disabled`.

Success criteria: a founder/operator can review fixture state model expectations, scenario coverage, guard failures, and safety boundaries without activating any live system or touching production data.

### Connected launch packets

This packet builds on:

- `docs/NATIVE_WORKFLOW_ENTITY_STATE_IMPLEMENTATION_PLAN.md`
- `docs/NATIVE_WORKFLOW_ENGINE_FOUNDATION_READINESS_PACKET.md`
- `docs/LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md`
- `docs/CSV_EXPORT_READINESS_PACKET.md`
- `docs/FILLOUT_IMPLEMENTATION_CHECKLIST_PACKET.md`
- `docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md`
- `docs/PRICING_VOLUME_GUARDRAIL_AND_INTAKE_ALIGNMENT_PACKET.md`
- `docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`
- `docs/AGREEMENT_TERMS_PRIVACY_UPDATE_REVIEW_PACKET.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_PLAN.md`
- `scripts/run-native-workflow-fixture-state-model-plan-dry-run.sh`
- `backend/scripts/verify-native-workflow-fixture-state-model-plan-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `8bb01c1 test(workflow): add native workflow entity state implementation plan`

Before using or editing this packet, verify Terminal 1 source of truth:

- `cd /root/roofleadhq`
- `pwd`
- `git rev-parse --show-toplevel`
- `git fetch origin main`
- `git status --short`
- `git log --oneline -12`

## Safety Posture

- planning/readiness/fixture-plan packet only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- no database schema changes
- no migrations
- no auth/RLS/security implementation
- no production Supabase reads or writes
- no production data handling changes
- no live automation activation
- no live SMS/Twilio/Vapi/Resend/Calendar/Lindy activation
- no scheduler/cron/dispatcher activation
- no public route activation
- no customer-facing workflow behavior changes
- no external service calls
- no CRM connection
- no bidirectional CRM integration
- no payment/deposit/invoice/estimate automation
- no env/credential changes
- read-only verifier only
- dry-run wrapper only
- Live automation remains disabled unless Jason explicitly approves activation.

Required dry-run flags (confirm before use):

- WORKSPACE_MODE=dry-run
- SMS_ACTIVATION=false
- CALENDAR_ACTIVATION=false
- VAPI_ACTIVATION=false
- SUPABASE_WRITES=false
- CONTRACTOR_NOTIFICATION=false
- HOMEOWNER_NOTIFICATION=false
- CRON_ACTIVATION=false
- SCHEDULER_ACTIVATION=false
- DISPATCHER_ACTIVATION=false
- PUBLIC_ROUTE_ACTIVATION=false

## 2. Fixture-Only Principles

The following principles govern all fixture state model work defined by this packet:

1. **Fake data only** — All fixture objects use fictional homeowner names, addresses, and contact details. No homeowner/customer production data.
2. **No Supabase reads/writes** — Fixture paths operate in memory or local fixture files only. No production Supabase reads or writes.
3. **No live sends** — No SMS, email, voice, or calendar actions are performed during fixture execution.
4. **No external service calls** — No Twilio, Vapi, Resend, Google Calendar, Lindy, or other external API calls.
5. **No scheduler/cron/dispatcher** — No background job execution or timed dispatch.
6. **No live Lindy workflow execution** — Lindy may be referenced as temporary bridge context only; fixture paths do not execute Lindy workflows.
7. **No bidirectional CRM integration** — CSV/reporting remains one-directional manual CRM/reference use only.
8. **No estimates/quotes/invoices/payments** — Fixture paths track estimate-needed and estimate-sent status only; no document generation or payment processing.
9. **Deterministic expected states** — Every fixture path must produce deterministic expected states for repeatable local testing.
10. **Unsafe actions fail closed** — Every unsafe action must fail closed with HOLD/BLOCKED or dry-run-only output.
11. **Activation flags must default false** — All activation flags must default false; live send/action blocked if false.
12. **Local E2E runner expansion** — State output should be usable for future local E2E runner expansion.

## 3. Fixture Data Model

The following are **conceptual fake fixture objects** for planning only. No objects are implemented by this packet.

### fixture_roofer_account

| Attribute | Detail |
| --- | --- |
| **Purpose** | Represents a fictional roofer/contractor account for fixture testing |
| **Fake fields** | `fixture_roofer_id`, `company_name`, `primary_contact_name`, `plan_tier`, `location_count`, `service_area_ids`, `calendar_owner`, `review_owner`, `timezone` |
| **Required sample values** | `fixture_roofer_id: "roof-fix-001"`, `company_name: "Fixture Roofing Co"`, `plan_tier: "growth"`, `location_count: 1` |
| **Expected state outputs** | Account context available for all fixture paths; plan profile resolved |
| **Privacy/safety notes** | Fictional company only; no real contractor production data |
| **Related test paths** | All 25 fixture scenarios |

### fixture_plan_profile

| Attribute | Detail |
| --- | --- |
| **Purpose** | Represents plan configuration profile (Starter/Growth/Elite/Custom) for fixture behavior |
| **Fake fields** | `profile_id`, `tier`, `monthly_lead_limit`, `location_limit`, `missed_lead_recovery_enabled`, `appointment_readiness_enabled`, `post_inspection_follow_up_enabled`, `feedback_capture_enabled`, `csv_export_enabled`, `reporting_depth`, `custom_review_required` |
| **Required sample values** | Starter: `monthly_lead_limit: 100`; Growth: `300`; Elite: `500`; Custom: `custom_review_required: true` |
| **Expected state outputs** | Feature gating resolved; volume guard applied; CSV field availability determined |
| **Privacy/safety notes** | Configuration profile only; not a separate workflow engine |
| **Related test paths** | Starter plan profile path; Growth plan profile path; Elite plan profile path; Custom Review triggers |

### fixture_lead_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Represents a fictional inbound lead for fixture state transitions |
| **Fake fields** | `fixture_lead_id`, `intake_timestamp`, `intake_channel`, `service_type`, `urgency`, `current_state`, `duplicate_suspected`, `service_area_fit` |
| **Required sample values** | `fixture_lead_id: "lead-fix-001"`, `intake_channel: "web_form"`, `current_state: "LEAD_RECEIVED"` |
| **Expected state outputs** | State transitions from LEAD_RECEIVED through appointment/post-inspection paths |
| **Privacy/safety notes** | Fictional lead only; no real homeowner production data |
| **Related test paths** | normal lead intake to appointment readiness; missing information path; duplicate review path |

### fixture_lead_source

| Attribute | Detail |
| --- | --- |
| **Purpose** | Represents fictional lead source attribution for fixture tracking |
| **Fake fields** | `source_id`, `source_name`, `source_type`, `known_source`, `spend_data_provided`, `roi_calculable` |
| **Required sample values** | `source_name: "Fixture Google Ads"`, `known_source: true`; alternate: `known_source: false` |
| **Expected state outputs** | Source captured or marked unknown; ROI fields conditional on spend data |
| **Privacy/safety notes** | Fictional source labels only |
| **Related test paths** | normal lead intake; lead source unknown but allowed to continue with review; lead source unknown and blocked by setup rules |

### fixture_homeowner_contact

| Attribute | Detail |
| --- | --- |
| **Purpose** | Represents fictional homeowner contact data for fixture paths |
| **Fake fields** | `fixture_contact_id`, `first_name`, `last_name`, `phone`, `email`, `service_address`, `contact_permission`, `do_not_contact` |
| **Required sample values** | `first_name: "Fixture"`, `last_name: "Homeowner"`, `phone: "+15555550101"`, `email: "fixture.homeowner@example.test"`, `contact_permission: "known"` |
| **Expected state outputs** | Contact validation pass/fail; permission guard results |
| **Privacy/safety notes** | Fictional contact data only; test-domain email; no real homeowner PII |
| **Related test paths** | normal lead intake; missing information path; stopped/do-not-contact path; contact permission unknown |

### fixture_message_thread

| Attribute | Detail |
| --- | --- |
| **Purpose** | Represents fictional message thread for response/follow-up fixture paths |
| **Fake fields** | `thread_id`, `channel`, `messages`, `last_outbound_at`, `last_inbound_at`, `response_count`, `follow_up_count` |
| **Required sample values** | `channel: "sms_simulated"`, `response_count: 1`, `follow_up_count: 0` |
| **Expected state outputs** | RESPONSE_SENT, FOLLOW_UP_DUE, HOMEOWNER_REPLIED states |
| **Privacy/safety notes** | Simulated messages only; no live sends |
| **Related test paths** | normal lead intake; missed-lead recovery path; activation flag false blocks live action |

### fixture_follow_up_state

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks fictional follow-up progression for fixture paths |
| **Fake fields** | `follow_up_id`, `attempt_count`, `max_attempts`, `next_follow_up_due`, `recovery_eligible`, `stopped_reason` |
| **Required sample values** | `attempt_count: 1`, `max_attempts: 3`, `recovery_eligible: true` |
| **Expected state outputs** | FOLLOW_UP_DUE, MISSED_LEAD_RECOVERY, STOPPED_AFTER_MAX_ATTEMPTS |
| **Privacy/safety notes** | Dry-run follow-up tracking only |
| **Related test paths** | missed-lead recovery path; stopped/do-not-contact path |

### fixture_review_queue_item

| Attribute | Detail |
| --- | --- |
| **Purpose** | Represents fictional review queue entry for roofer or RoofLeadHQ review |
| **Fake fields** | `review_id`, `review_type`, `review_owner`, `reason`, `priority`, `status`, `resolution_notes` |
| **Required sample values** | Roofer: `review_owner: "roofer"`, `reason: "pricing question"`; System: `review_owner: "roofleadhq_jason"`, `reason: "workflow state confusion"` |
| **Expected state outputs** | ROOFER_REVIEW_NEEDED, SYSTEM_REVIEW_NEEDED, REVIEW_COMPLETED |
| **Privacy/safety notes** | Roofer review owns business judgment; RoofLeadHQ/Jason review limited to system/workflow/data/routing/quality issues |
| **Related test paths** | roofer-review-needed path; RoofLeadHQ system-review-needed path; all review queue fixture expectations |

### fixture_appointment_readiness_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks fictional appointment readiness evaluation |
| **Fake fields** | `readiness_id`, `homeowner_contact_complete`, `service_address_present`, `appointment_preference_known`, `service_area_fit`, `calendar_owner_known`, `routing_reviewed`, `readiness_state` |
| **Required sample values** | `readiness_state: "APPOINTMENT_READY"` when all prerequisites met |
| **Expected state outputs** | APPOINTMENT_READINESS_PENDING, APPOINTMENT_READY, APPOINTMENT_NOT_READY, APPOINTMENT_ISSUE |
| **Privacy/safety notes** | No live Google Calendar event creation allowed |
| **Related test paths** | normal lead intake to appointment readiness; missing information path; appointment preferences missing |

### fixture_booked_inspection_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks fictional booked homeowner inspection |
| **Fake fields** | `booking_id`, `appointment_date`, `appointment_window`, `calendar_owner`, `booking_method`, `booking_state`, `reminder_status` |
| **Required sample values** | `booking_state: "APPOINTMENT_BOOKED"`, `booking_method: "manual_fixture"`, `appointment_date: "2026-07-15T14:00:00Z"` |
| **Expected state outputs** | APPOINTMENT_BOOKED, INSPECTION_COMPLETED, INSPECTION_MISSED, RESCHEDULE_NEEDED |
| **Privacy/safety notes** | Booked inspection tracking only; no calendar event creation |
| **Related test paths** | appointment booked path; inspection completed path; inspection missed/reschedule path |

### fixture_post_inspection_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks fictional post-inspection status and follow-up |
| **Fake fields** | `post_inspection_id`, `inspection_outcome`, `estimate_status`, `homeowner_follow_up_needed`, `roofer_follow_up_needed`, `outcome_state`, `still_open` |
| **Required sample values** | `estimate_status: "estimate_needed"`; alternate: `estimate_status: "estimate_sent"` |
| **Expected state outputs** | POST_INSPECTION_OPEN, ESTIMATE_NEEDED, ESTIMATE_SENT, HOMEOWNER_FOLLOW_UP_NEEDED, ROOFER_FOLLOW_UP_NEEDED, WON, LOST, NEEDS_REVIEW |
| **Privacy/safety notes** | Status tracking only; no estimate/quote/invoice/payment generation |
| **Related test paths** | post-inspection still-open path; estimate-needed / estimate-sent tracking path; homeowner/roofer follow-up needed paths |

### fixture_feedback_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks fictional homeowner feedback capture |
| **Fake fields** | `feedback_id`, `feedback_requested`, `feedback_captured`, `feedback_text`, `permission_to_use_publicly`, `feedback_issue_flagged` |
| **Required sample values** | `permission_to_use_publicly: "yes"` / `"no"` / `"not_asked"` |
| **Expected state outputs** | FEEDBACK_NOT_REQUESTED, FEEDBACK_REQUESTED, FEEDBACK_CAPTURED, FEEDBACK_ISSUE_FLAGGED |
| **Privacy/safety notes** | Feedback internal unless permission obtained; no fabricated endorsements; no pressured praise campaigns |
| **Related test paths** | feedback captured with permission_to_use_publicly yes/no/not_asked |

### fixture_report_snapshot

| Attribute | Detail |
| --- | --- |
| **Purpose** | Represents fictional weekly/monthly report snapshot |
| **Fake fields** | `snapshot_id`, `report_period`, `lead_count`, `appointment_count`, `inspection_count`, `feedback_count`, `review_queue_count`, `generated_at` |
| **Required sample values** | `report_period: "2026-06"`, `lead_count: 42`, `appointment_count: 12` |
| **Expected state outputs** | REPORT_SNAPSHOT_READY with plan-tier field availability |
| **Privacy/safety notes** | Fake aggregate data only; may contain fictional homeowner PII in detail rows |
| **Related test paths** | CSV/report snapshot with fake data |

### fixture_csv_export_snapshot

| Attribute | Detail |
| --- | --- |
| **Purpose** | Represents fictional CSV export snapshot for manual CRM/reference use |
| **Fake fields** | `export_id`, `headers`, `sample_rows`, `field_set`, `plan_tier_fields`, `source_roi_fields_included`, `export_state` |
| **Required sample values** | Headers: `lead_id,source,status,appointment_date,inspection_outcome`; fictional sample row with fixture data |
| **Expected state outputs** | CSV_SNAPSHOT_READY or EXPORT_HOLD |
| **Privacy/safety notes** | CSV is one-directional reporting/manual CRM/reference use; CSV does not sync bidirectionally with CRM; customer responsible for downloaded data |
| **Related test paths** | CSV/report snapshot with fake data; CSV/export requested from non-approved records |

### fixture_usage_volume_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks fictional monthly lead volume for plan guardrails |
| **Fake fields** | `volume_id`, `month`, `lead_count`, `plan_limit`, `over_limit`, `custom_review_triggered` |
| **Required sample values** | Starter at 95 leads (under limit); Custom trigger at 520 leads (over 500) |
| **Expected state outputs** | VOLUME_OK or VOLUME_EXCEEDS_LIMIT with Custom Review trigger |
| **Privacy/safety notes** | Fictional volume counts only |
| **Related test paths** | Starter/Growth/Elite plan profile paths; Custom Review trigger for 500+ leads; plan volume exceeds limit |

### fixture_activation_flags

| Attribute | Detail |
| --- | --- |
| **Purpose** | Represents fictional activation flags for fail-closed live-action blocking |
| **Fake fields** | `live_sms_enabled`, `live_vapi_calls_enabled`, `live_resend_email_enabled`, `live_calendar_booking_enabled`, `live_lindy_bridge_enabled`, `live_scheduler_enabled`, `live_csv_export_enabled`, `live_crm_handoff_enabled`, `live_payment_or_invoice_enabled` |
| **Required sample values** | All flags default `false` |
| **Expected state outputs** | Live action blocked with audit note when flag is false |
| **Privacy/safety notes** | Explicit Jason approval required before any future live activation |
| **Related test paths** | activation flag false blocks live action |

### fixture_audit_event

| Attribute | Detail |
| --- | --- |
| **Purpose** | Records fictional audit events for fixture state transitions |
| **Fake fields** | `audit_id`, `event_type`, `entity_type`, `entity_id`, `previous_state`, `new_state`, `guard_result`, `actor`, `timestamp`, `notes` |
| **Required sample values** | `event_type: "state_transition"`, `actor: "fixture_runner"`, `guard_result: "pass"` |
| **Expected state outputs** | Audit trail for every transition, guard failure, and activation flag check |
| **Privacy/safety notes** | Fixture audit only; no production audit writes |
| **Related test paths** | All 25 fixture scenarios |

## 4. Required Fixture Scenarios

### Scenario 1: normal lead intake to appointment readiness

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Complete fictional lead with known contact permission, in-service-area address, known lead source, Growth plan profile, appointment preference provided |
| **Expected state path** | LEAD_RECEIVED → RESPONSE_SENT → QUALIFIED → APPOINTMENT_READINESS_PENDING → APPOINTMENT_READY |
| **Expected final state** | APPOINTMENT_READY |
| **Required guard checks** | contact permission known; service area fit; required contact data present; plan profile known; appointment preferences known |
| **Expected audit notes** | intake_source, permission_status, service_area_result, readiness_blockers: none |
| **Expected reporting/CSV impact** | Lead appears in weekly report snapshot; CSV row with status APPOINTMENT_READY |
| **Safety assertion** | live_actions_performed: no; production_data_touched: no; external_services_called: no |

### Scenario 2: missing information path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional lead missing homeowner phone and appointment preference |
| **Expected state path** | LEAD_RECEIVED → MISSING_INFO → APPOINTMENT_NOT_READY |
| **Expected final state** | APPOINTMENT_NOT_READY |
| **Required guard checks** | required homeowner contact data present (fails); appointment preferences missing |
| **Expected audit notes** | missing_fields: phone, appointment_preference; hold_reason: incomplete_contact |
| **Expected reporting/CSV impact** | Lead in report with status MISSING_INFO; CSV includes blocker fields |
| **Safety assertion** | live_actions_performed: no; no live send until data complete |

### Scenario 3: duplicate review path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional lead matching existing fixture lead by phone and address |
| **Expected state path** | LEAD_RECEIVED → DUPLICATE_REVIEW → HOLD |
| **Expected final state** | DUPLICATE_REVIEW (HOLD) |
| **Required guard checks** | duplicate lead suspected |
| **Expected audit notes** | duplicate_match_fields: phone, address; review_owner: roofer |
| **Expected reporting/CSV impact** | Lead flagged in report; CSV status DUPLICATE_REVIEW |
| **Safety assertion** | live_actions_performed: no; no duplicate outreach |

### Scenario 4: bad-fit/excluded path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional lead outside service area |
| **Expected state path** | LEAD_RECEIVED → BAD_FIT_OR_EXCLUDED → BLOCKED |
| **Expected final state** | BAD_FIT_OR_EXCLUDED (BLOCKED) |
| **Required guard checks** | service area excluded |
| **Expected audit notes** | service_area_result: excluded; blocked_reason: out_of_area |
| **Expected reporting/CSV impact** | Lead in report with status BAD_FIT_OR_EXCLUDED |
| **Safety assertion** | live_actions_performed: no; no outreach to excluded lead |

### Scenario 5: stopped/do-not-contact path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional lead with do_not_contact: true |
| **Expected state path** | LEAD_RECEIVED → STOPPED_DO_NOT_CONTACT → BLOCKED |
| **Expected final state** | STOPPED_DO_NOT_CONTACT (BLOCKED) |
| **Required guard checks** | do-not-contact requested |
| **Expected audit notes** | dnc_requested: true; all_channels_stopped: true |
| **Expected reporting/CSV impact** | Lead in report with status STOPPED_DO_NOT_CONTACT |
| **Safety assertion** | live_actions_performed: no; all follow-up blocked |

### Scenario 6: missed-lead recovery path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional lead with no response after threshold; Growth plan with missed_lead_recovery_enabled |
| **Expected state path** | LEAD_RECEIVED → RESPONSE_SENT → NO_RESPONSE → MISSED_LEAD_RECOVERY → FOLLOW_UP_DUE |
| **Expected final state** | MISSED_LEAD_RECOVERY |
| **Required guard checks** | missed-lead recovery enabled per plan profile; do-not-contact respected |
| **Expected audit notes** | recovery_attempt: 1; recovery_channel: sms_simulated |
| **Expected reporting/CSV impact** | Recovery count in weekly report |
| **Safety assertion** | live_actions_performed: no; recovery simulated only |

### Scenario 7: roofer-review-needed path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional lead with pricing question from homeowner |
| **Expected state path** | LEAD_RECEIVED → RESPONSE_SENT → ROOFER_REVIEW_NEEDED → HOLD |
| **Expected final state** | ROOFER_REVIEW_NEEDED (HOLD) |
| **Required guard checks** | roofer review completed before business-judgment decisions (pending) |
| **Expected audit notes** | review_type: pricing_question; review_owner: roofer |
| **Expected reporting/CSV impact** | Review queue count incremented |
| **Safety assertion** | live_actions_performed: no; roofer review owns business judgment |

### Scenario 8: RoofLeadHQ system-review-needed path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional lead with workflow state confusion detected |
| **Expected state path** | LEAD_RECEIVED → SYSTEM_REVIEW_NEEDED → HOLD |
| **Expected final state** | SYSTEM_REVIEW_NEEDED (HOLD) |
| **Required guard checks** | RoofLeadHQ/Jason review limited to system/workflow/data/routing/quality issues |
| **Expected audit notes** | review_type: workflow_state_confusion; review_owner: roofleadhq_jason |
| **Expected reporting/CSV impact** | System review count in report |
| **Safety assertion** | live_actions_performed: no; system review only for workflow/data issues |

### Scenario 9: appointment booked path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional lead at APPOINTMENT_READY with calendar owner known |
| **Expected state path** | APPOINTMENT_READY → APPOINTMENT_BOOKED |
| **Expected final state** | APPOINTMENT_BOOKED |
| **Required guard checks** | APPOINTMENT_READY prerequisite; calendar owner known; live_calendar_booking_enabled false (manual fixture booking) |
| **Expected audit notes** | booking_method: manual_fixture; appointment_date recorded |
| **Expected reporting/CSV impact** | Appointment count incremented; CSV includes appointment_date |
| **Safety assertion** | live_actions_performed: no; no calendar event creation |

### Scenario 10: inspection completed path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional booked inspection marked completed |
| **Expected state path** | APPOINTMENT_BOOKED → INSPECTION_COMPLETED → POST_INSPECTION_OPEN |
| **Expected final state** | POST_INSPECTION_OPEN |
| **Required guard checks** | post-inspection follow-up enabled per plan profile |
| **Expected audit notes** | inspection_outcome: completed; post_inspection_state: open |
| **Expected reporting/CSV impact** | Inspection completed count in report |
| **Safety assertion** | live_actions_performed: no |

### Scenario 11: inspection missed/reschedule path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional booked inspection marked missed |
| **Expected state path** | APPOINTMENT_BOOKED → INSPECTION_MISSED → RESCHEDULE_NEEDED |
| **Expected final state** | RESCHEDULE_NEEDED |
| **Required guard checks** | appointment coordination reviewed |
| **Expected audit notes** | inspection_outcome: missed; reschedule_required: true |
| **Expected reporting/CSV impact** | Missed inspection count in report |
| **Safety assertion** | live_actions_performed: no |

### Scenario 12: post-inspection still-open path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional post-inspection with no outcome recorded yet |
| **Expected state path** | INSPECTION_COMPLETED → POST_INSPECTION_OPEN → STILL_OPEN |
| **Expected final state** | STILL_OPEN |
| **Required guard checks** | roofer follow-up owner known or assigned |
| **Expected audit notes** | still_open: true; days_since_inspection tracked |
| **Expected reporting/CSV impact** | Open post-inspection count in report |
| **Safety assertion** | live_actions_performed: no |

### Scenario 13: estimate-needed / estimate-sent tracking path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional post-inspection requiring estimate tracking |
| **Expected state path** | POST_INSPECTION_OPEN → ESTIMATE_NEEDED → ESTIMATE_SENT |
| **Expected final state** | ESTIMATE_SENT |
| **Required guard checks** | unsupported estimate/quote/invoice/payment request blocked (tracking only) |
| **Expected audit notes** | estimate_status: sent; no_document_generated: true |
| **Expected reporting/CSV impact** | Estimate status in CSV |
| **Safety assertion** | live_actions_performed: no; no estimate document generation |

### Scenario 14: homeowner follow-up needed path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional post-inspection requiring homeowner follow-up |
| **Expected state path** | POST_INSPECTION_OPEN → HOMEOWNER_FOLLOW_UP_NEEDED |
| **Expected final state** | HOMEOWNER_FOLLOW_UP_NEEDED |
| **Required guard checks** | do-not-contact respected; contact permission known |
| **Expected audit notes** | follow_up_owner: homeowner; follow_up_reason recorded |
| **Expected reporting/CSV impact** | Follow-up needed count in report |
| **Safety assertion** | live_actions_performed: no |

### Scenario 15: roofer follow-up needed path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional post-inspection requiring roofer follow-up |
| **Expected state path** | POST_INSPECTION_OPEN → ROOFER_FOLLOW_UP_NEEDED |
| **Expected final state** | ROOFER_FOLLOW_UP_NEEDED |
| **Required guard checks** | roofer review owner known |
| **Expected audit notes** | follow_up_owner: roofer; follow_up_reason recorded |
| **Expected reporting/CSV impact** | Roofer follow-up count in report |
| **Safety assertion** | live_actions_performed: no |

### Scenario 16: feedback captured with permission_to_use_publicly yes

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional feedback with permission_to_use_publicly: yes |
| **Expected state path** | POST_INSPECTION_OPEN → FEEDBACK_REQUESTED → FEEDBACK_CAPTURED |
| **Expected final state** | FEEDBACK_CAPTURED (permission: yes) |
| **Required guard checks** | feedback capture enabled; feedback public-use permission checked before public use |
| **Expected audit notes** | permission_to_use_publicly: yes; public_use_eligible: true |
| **Expected reporting/CSV impact** | Feedback count with permission flag in report |
| **Safety assertion** | live_actions_performed: no; no unattended public review publishing |

### Scenario 17: feedback captured with permission_to_use_publicly no

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional feedback with permission_to_use_publicly: no |
| **Expected state path** | POST_INSPECTION_OPEN → FEEDBACK_REQUESTED → FEEDBACK_CAPTURED |
| **Expected final state** | FEEDBACK_CAPTURED (permission: no) |
| **Required guard checks** | feedback internal unless permission obtained |
| **Expected audit notes** | permission_to_use_publicly: no; public_use_eligible: false |
| **Expected reporting/CSV impact** | Feedback count; internal only flag |
| **Safety assertion** | live_actions_performed: no; feedback remains internal |

### Scenario 18: feedback captured with permission_to_use_publicly not_asked

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional feedback with permission_to_use_publicly: not_asked |
| **Expected state path** | POST_INSPECTION_OPEN → FEEDBACK_REQUESTED → FEEDBACK_CAPTURED |
| **Expected final state** | FEEDBACK_CAPTURED (permission: not_asked) |
| **Required guard checks** | public feedback permission not captured blocks public use |
| **Expected audit notes** | permission_to_use_publicly: not_asked; public_use_eligible: false |
| **Expected reporting/CSV impact** | Feedback count; permission pending flag |
| **Safety assertion** | live_actions_performed: no; no public use without explicit permission |

### Scenario 19: CSV/report snapshot with fake data

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional reporting period with multiple fixture leads across states |
| **Expected state path** | REPORT_PERIOD_DUE → REPORT_SNAPSHOT_READY → CSV_SNAPSHOT_READY |
| **Expected final state** | CSV_SNAPSHOT_READY |
| **Required guard checks** | CSV/reporting generated only from approved fixture records; plan profile determines field availability |
| **Expected audit notes** | report_period, field_set, generation_source: fixture |
| **Expected reporting/CSV impact** | Full weekly/monthly report snapshot; CSV with headers and fictional sample row |
| **Safety assertion** | live_actions_performed: no; CSV is one-directional reporting/manual CRM/reference use |

### Scenario 20: Starter plan profile path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional roofer on Starter plan; 80 leads/month; single location |
| **Expected state path** | LEAD_RECEIVED → RESPONSE_SENT → basic appointment tracking |
| **Expected final state** | APPOINTMENT_BOOKED (basic tracking) |
| **Required guard checks** | plan profile known; volume under 100 limit; missed_lead_recovery disabled |
| **Expected audit notes** | plan_tier: starter; features_gated: missed_lead_recovery, advanced_reporting |
| **Expected reporting/CSV impact** | Basic reporting; limited/basic CSV summary if included |
| **Safety assertion** | live_actions_performed: no; Starter features only |

### Scenario 21: Growth plan profile path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional roofer on Growth plan; 250 leads/month; single location |
| **Expected state path** | Full lead-to-inspection path with missed-lead recovery, post-inspection, feedback |
| **Expected final state** | FEEDBACK_CAPTURED or POST_INSPECTION_OPEN |
| **Required guard checks** | plan profile known; volume under 300 limit; all Growth features enabled |
| **Expected audit notes** | plan_tier: growth; features_enabled: missed_lead_recovery, post_inspection, feedback, csv_export |
| **Expected reporting/CSV impact** | Weekly/monthly reporting; CSV export available |
| **Safety assertion** | live_actions_performed: no |

### Scenario 22: Elite plan profile path

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional roofer on Elite plan; 450 leads/month; single location |
| **Expected state path** | Full path with deeper source segmentation and advanced reporting |
| **Expected final state** | CSV_SNAPSHOT_READY with Elite field set |
| **Required guard checks** | plan profile known; volume under 500 limit |
| **Expected audit notes** | plan_tier: elite; reporting_depth: advanced; review_queue_capacity: larger |
| **Expected reporting/CSV impact** | Advanced reporting; detailed CSV/export |
| **Safety assertion** | live_actions_performed: no |

### Scenario 23: Custom Review trigger for 500+ leads

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional roofer with 520 leads/month on Elite plan |
| **Expected state path** | LEAD_RECEIVED → CUSTOM_REVIEW_NEEDED → HOLD |
| **Expected final state** | CUSTOM_REVIEW_NEEDED (HOLD) |
| **Required guard checks** | 500+ leads/month; custom-review triggers checked |
| **Expected audit notes** | trigger_reason: volume_exceeds_500; recommended_tier: custom |
| **Expected reporting/CSV impact** | Custom review flag in report |
| **Safety assertion** | live_actions_performed: no; HOLD until Custom Review completed |

### Scenario 24: Custom Review trigger for 2+ locations

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional roofer with 2 locations |
| **Expected state path** | LEAD_RECEIVED → CUSTOM_REVIEW_NEEDED → HOLD |
| **Expected final state** | CUSTOM_REVIEW_NEEDED (HOLD) |
| **Required guard checks** | 2+ locations; custom-review triggers checked |
| **Expected audit notes** | trigger_reason: multi_location; location_count: 2 |
| **Expected reporting/CSV impact** | Custom review flag in report |
| **Safety assertion** | live_actions_performed: no; HOLD until Custom Review completed |

### Scenario 25: activation flag false blocks live action

| Attribute | Detail |
| --- | --- |
| **Fake input summary** | Fictional lead ready for SMS response; all activation flags false |
| **Expected state path** | APPOINTMENT_READY → LIVE_ACTION_BLOCKED → HOLD |
| **Expected final state** | LIVE_ACTION_BLOCKED (HOLD) |
| **Required guard checks** | live activation flag false |
| **Expected audit notes** | blocked_action: sms_send; flag_checked: live_sms_enabled=false; dry_run_only: true |
| **Expected reporting/CSV impact** | No live action impact; audit event recorded |
| **Safety assertion** | live_actions_performed: no; explicit Jason approval required before future live activation |

## 5. State Transition Expectation Table

| Scenario | Starting state | Trigger | Guard checks | Expected next state | HOLD/BLOCKED outcome if guard fails | Audit event expected | Reporting impact | Live action allowed? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| normal lead intake | LEAD_RECEIVED | intake_complete | permission known, contact data present, service area fit | APPOINTMENT_READY | APPOINTMENT_NOT_READY | state_transition: intake_to_ready | lead count +1 | no |
| missing information | LEAD_RECEIVED | intake_partial | contact data present (fail) | MISSING_INFO | HOLD | state_transition: missing_info | lead with blocker status | no |
| duplicate review | LEAD_RECEIVED | duplicate_detected | duplicate check (fail) | DUPLICATE_REVIEW | HOLD | state_transition: duplicate_hold | duplicate flag | no |
| bad-fit/excluded | LEAD_RECEIVED | service_area_check | service area fit (fail) | BAD_FIT_OR_EXCLUDED | BLOCKED | state_transition: excluded | excluded count | no |
| do-not-contact | LEAD_RECEIVED | dnc_flag_set | do-not-contact (fail) | STOPPED_DO_NOT_CONTACT | BLOCKED | state_transition: dnc_stop | stopped count | no |
| missed-lead recovery | NO_RESPONSE | recovery_threshold | recovery enabled, DNC clear | MISSED_LEAD_RECOVERY | HOLD if recovery disabled | state_transition: recovery_start | recovery count | no |
| roofer review needed | RESPONSE_SENT | pricing_question | roofer review pending | ROOFER_REVIEW_NEEDED | HOLD | state_transition: roofer_review | review queue +1 | no |
| system review needed | LEAD_RECEIVED | state_confusion | system issue detected | SYSTEM_REVIEW_NEEDED | HOLD | state_transition: system_review | system review +1 | no |
| appointment booked | APPOINTMENT_READY | manual_booking | calendar owner known | APPOINTMENT_BOOKED | APPOINTMENT_ISSUE | state_transition: booked | appointment count +1 | no |
| inspection completed | APPOINTMENT_BOOKED | inspection_done | post-inspection enabled | POST_INSPECTION_OPEN | HOLD | state_transition: inspection_complete | inspection count +1 | no |
| inspection missed | APPOINTMENT_BOOKED | no_show | coordination reviewed | RESCHEDULE_NEEDED | HOLD | state_transition: missed | missed count +1 | no |
| post-inspection open | INSPECTION_COMPLETED | outcome_pending | roofer owner known | STILL_OPEN | NEEDS_REVIEW | state_transition: still_open | open count +1 | no |
| estimate tracking | POST_INSPECTION_OPEN | estimate_needed | no auto-generation | ESTIMATE_SENT | HOLD | state_transition: estimate_sent | estimate status | no |
| homeowner follow-up | POST_INSPECTION_OPEN | follow_up_due | DNC clear, permission known | HOMEOWNER_FOLLOW_UP_NEEDED | HOLD | state_transition: homeowner_fu | follow-up count | no |
| roofer follow-up | POST_INSPECTION_OPEN | roofer_action_needed | roofer owner known | ROOFER_FOLLOW_UP_NEEDED | HOLD | state_transition: roofer_fu | roofer fu count | no |
| feedback yes | POST_INSPECTION_OPEN | feedback_captured | permission yes | FEEDBACK_CAPTURED | FEEDBACK_ISSUE_FLAGGED | state_transition: feedback_yes | feedback + permission | no |
| feedback no | POST_INSPECTION_OPEN | feedback_captured | permission no | FEEDBACK_CAPTURED | internal only | state_transition: feedback_no | feedback internal | no |
| feedback not_asked | POST_INSPECTION_OPEN | feedback_captured | permission not_asked | FEEDBACK_CAPTURED | no public use | state_transition: feedback_na | permission pending | no |
| CSV snapshot | REPORT_PERIOD_DUE | period_close | approved records only | CSV_SNAPSHOT_READY | EXPORT_HOLD | state_transition: csv_ready | full snapshot | no |
| Starter plan | LEAD_RECEIVED | plan_resolved | volume under 100 | APPOINTMENT_BOOKED | CUSTOM_REVIEW if over limit | state_transition: starter_path | basic report | no |
| Growth plan | LEAD_RECEIVED | plan_resolved | volume under 300 | FEEDBACK_CAPTURED | CUSTOM_REVIEW if over limit | state_transition: growth_path | full report | no |
| Elite plan | LEAD_RECEIVED | plan_resolved | volume under 500 | CSV_SNAPSHOT_READY | CUSTOM_REVIEW if over limit | state_transition: elite_path | advanced report | no |
| 500+ leads | LEAD_RECEIVED | volume_check | 500+ leads (fail) | CUSTOM_REVIEW_NEEDED | HOLD | state_transition: custom_volume | custom review flag | no |
| 2+ locations | LEAD_RECEIVED | location_check | 2+ locations (fail) | CUSTOM_REVIEW_NEEDED | HOLD | state_transition: custom_location | custom review flag | no |
| activation false | APPOINTMENT_READY | send_attempted | live_sms_enabled false (fail) | LIVE_ACTION_BLOCKED | HOLD | state_transition: live_blocked | audit only | no |

## 6. Guard Failure Matrix

| Failure case | Expected HOLD/BLOCKED/review state | Owner | Manual next step | Safety note |
| --- | --- | --- | --- | --- |
| contact permission unknown | HOLD | roofer | Confirm contact permission with homeowner | No outreach until permission clarified |
| do-not-contact requested | BLOCKED | roofer | Respect DNC; no further contact | All channels stopped immediately |
| missing homeowner phone/email where required | HOLD | roofer/operator | Collect missing contact data | No live send until data complete |
| service area excluded | BLOCKED | system | Mark lead excluded; no outreach | Fail closed on out-of-area leads |
| lead source unknown but allowed to continue with review | HOLD (minor) | roofer | Review and confirm source attribution | Continue with review flag |
| lead source unknown and blocked by setup rules | HOLD | roofer | Complete setup; define lead sources | Block until setup rules satisfied |
| duplicate lead suspected | HOLD | roofer | Review duplicate; merge or dismiss | No duplicate outreach |
| unsupported estimate/quote/invoice/payment request | HOLD | roofer | Manual roofer handles estimate/quote/invoice | No automatic document generation |
| pricing question | HOLD | roofer | Roofer reviews and responds | Business judgment owned by roofer |
| insurance complexity | HOLD | roofer | Roofer reviews insurance question | Business judgment owned by roofer |
| homeowner upset | HOLD | roofer | Roofer handles upset homeowner | Priority review; no automated response |
| appointment preferences missing | HOLD | roofer/operator | Collect appointment availability | No APPOINTMENT_READY until preferences known |
| calendar owner unknown | HOLD | roofer | Assign calendar owner | No booking until owner assigned |
| roofer review owner unknown | HOLD | roofer | Assign review owner | No business-judgment advance until owner assigned |
| RoofLeadHQ review needed for system/data issue | HOLD | roofleadhq_jason | Jason reviews system/workflow issue | Limited to system/workflow/data/routing/quality |
| public feedback permission not captured | HOLD | roofer | Ask permission or mark not_asked | No public use without permission |
| CSV/export requested from non-approved records | HOLD | operator | Review records before export | EXPORT_HOLD until approved |
| plan volume exceeds limit | HOLD | roofer/operator | Upgrade plan or reduce volume | Volume guard enforced |
| 500+ leads/month | HOLD | roofer/operator | Custom Review required | HOLD until Custom Review completed |
| 2+ locations | HOLD | roofer/operator | Custom Review required | HOLD until Custom Review completed |
| multiple calendars | HOLD | roofer/operator | Custom Review for routing setup | Complex routing needs review |
| multiple phone numbers | HOLD | roofer/operator | Custom Review for routing setup | Complex routing needs review |
| multiple sales reps | HOLD | roofer/operator | Custom Review for routing setup | Complex routing needs review |
| live activation flag false | HOLD | system | Dry-run only; Jason approval required | Live send/action blocked; audit note created |

## 7. Plan Profile Fixture Expectations

Starter, Growth, Elite, and Custom Review are **configuration profiles, not separate workflow engines**. One core workflow engine supports all tiers through plan configuration profiles.

### Starter

| Attribute | Detail |
| --- | --- |
| **Volume** | up to 100 leads/month |
| **Locations** | single location |
| **Features** | basic lead response/follow-up; basic appointment booked status; basic reporting |
| **CSV** | limited/basic CSV summary if included |
| **Not included** | no advanced source ROI by default; no complex routing; no missed-lead recovery by default |
| **Fixture path** | Starter plan profile path |

### Growth

| Attribute | Detail |
| --- | --- |
| **Volume** | up to 300 leads/month |
| **Locations** | single location |
| **Features** | missed lead recovery; lead source tracking; appointment readiness; booked inspection tracking; post-inspection follow-up; feedback capture |
| **Reporting** | weekly/monthly reporting |
| **CSV** | CSV export |
| **Fixture path** | Growth plan profile path |

### Elite

| Attribute | Detail |
| --- | --- |
| **Volume** | up to 500 leads/month |
| **Locations** | single location unless custom approved |
| **Features** | deeper source segmentation; advanced reporting; larger review queue capacity; priority setup/support |
| **CSV** | detailed CSV/export |
| **Fixture path** | Elite plan profile path |

### Custom Review

| Attribute | Detail |
| --- | --- |
| **Triggers** | 500+ leads/month; 2+ locations; 3+ service areas; multiple calendars; multiple phone numbers; multiple sales reps |
| **Features** | complex routing; advanced reporting; unusual integration needs; multi-location operations |
| **Behavior** | HOLD until Custom Review completed; configuration profiles adjusted after review |
| **Fixture paths** | Custom Review trigger for 500+ leads; Custom Review trigger for 2+ locations |

## 8. Review Queue Fixture Expectations

### Roofer/contractor review

Roofer review owns business judgment. Fixture paths for:

| Review reason | Expected state | Owner |
| --- | --- | --- |
| pricing question | ROOFER_REVIEW_NEEDED | roofer |
| estimate question | ROOFER_REVIEW_NEEDED | roofer |
| quote request | ROOFER_REVIEW_NEEDED | roofer |
| insurance complexity | ROOFER_REVIEW_NEEDED | roofer |
| repair vs replacement question | ROOFER_REVIEW_NEEDED | roofer |
| scheduling issue | ROOFER_REVIEW_NEEDED | roofer |
| homeowner asks for roofer directly | ROOFER_REVIEW_NEEDED | roofer |
| upset homeowner | ROOFER_REVIEW_NEEDED | roofer |
| legal/insurance/carrier-specific question | ROOFER_REVIEW_NEEDED | roofer |
| payment or invoice question | ROOFER_REVIEW_NEEDED | roofer |
| contract question | ROOFER_REVIEW_NEEDED | roofer |

### RoofLeadHQ/Jason system review

RoofLeadHQ/Jason review is limited to system/workflow/data/routing/quality issues. Fixture paths for:

| Review reason | Expected state | Owner |
| --- | --- | --- |
| bad or unclear AI response | SYSTEM_REVIEW_NEEDED | roofleadhq_jason |
| missed data capture | SYSTEM_REVIEW_NEEDED | roofleadhq_jason |
| broken routing | SYSTEM_REVIEW_NEEDED | roofleadhq_jason |
| duplicate lead confusion | SYSTEM_REVIEW_NEEDED | roofleadhq_jason |
| source attribution issue | SYSTEM_REVIEW_NEEDED | roofleadhq_jason |
| dashboard/report discrepancy | SYSTEM_REVIEW_NEEDED | roofleadhq_jason |
| workflow state confusion | SYSTEM_REVIEW_NEEDED | roofleadhq_jason |
| setup issue | SYSTEM_REVIEW_NEEDED | roofleadhq_jason |
| failed handoff | SYSTEM_REVIEW_NEEDED | roofleadhq_jason |
| quality-control concern | SYSTEM_REVIEW_NEEDED | roofleadhq_jason |

## 9. Appointment Readiness Fixture Expectations

Fixture paths should require all of the following before APPOINTMENT_READY:

- homeowner contact data
- service address or enough service-area information
- appointment preference or availability window
- service-area fit
- roofer/calendar owner known
- routing complexity reviewed
- plan profile known
- no HOLD/BLOCKED safety issue

### Expected states

| State | Meaning |
| --- | --- |
| APPOINTMENT_READINESS_PENDING | Readiness evaluation in progress |
| APPOINTMENT_READY | All prerequisites met; ready for booking |
| APPOINTMENT_NOT_READY | Missing prerequisites; blockers documented |
| APPOINTMENT_BOOKED | Homeowner inspection booked (fixture tracking only) |
| APPOINTMENT_ISSUE | Coordination problem requiring review |
| RESCHEDULE_NEEDED | Inspection missed; reschedule required |

No live Google Calendar event creation is allowed in this packet.

## 10. Post-Inspection Fixture Expectations

Fixture paths for post-inspection tracking:

| Path | Expected state | Notes |
| --- | --- | --- |
| inspection completed | POST_INSPECTION_OPEN | Inspection marked done |
| inspection missed | RESCHEDULE_NEEDED | Reschedule required |
| reschedule needed | RESCHEDULE_NEEDED | Awaiting new date |
| estimate needed | ESTIMATE_NEEDED | Tracking only; no document generation |
| estimate sent | ESTIMATE_SENT | Tracking only; roofer sent manually |
| homeowner follow-up needed | HOMEOWNER_FOLLOW_UP_NEEDED | Follow-up owner: homeowner |
| roofer follow-up needed | ROOFER_FOLLOW_UP_NEEDED | Follow-up owner: roofer |
| still open | STILL_OPEN | Awaiting outcome |
| won | WON | Roofer recorded win |
| lost | LOST | Roofer recorded loss |
| needs review | NEEDS_REVIEW | Outcome unclear; review required |

No unattended estimate, quote, invoice, payment, or public review generation without roofer review.

## 11. Feedback Fixture Expectations

Fixture paths for feedback capture:

| Path | Expected state | Public use |
| --- | --- | --- |
| feedback not requested | FEEDBACK_NOT_REQUESTED | n/a |
| feedback requested | FEEDBACK_REQUESTED | n/a |
| feedback captured | FEEDBACK_CAPTURED | depends on permission |
| feedback issue flagged | FEEDBACK_ISSUE_FLAGGED | no |
| permission_to_use_publicly yes | FEEDBACK_CAPTURED | eligible after review |
| permission_to_use_publicly no | FEEDBACK_CAPTURED | internal only |
| permission_to_use_publicly not_asked | FEEDBACK_CAPTURED | no public use |

### Rules

- feedback is internal unless permission is obtained
- no fabricated endorsements
- no pressured praise campaigns
- no incentivized positive feedback
- no unattended public review publishing
- testimonial/case-study/public use requires permission

## 12. Reporting / CSV Fixture Snapshot Expectations

Fixture expectations for reporting and CSV:

| Artifact | Content |
| --- | --- |
| weekly/monthly report snapshot | lead count, appointment count, inspection count, feedback count, review queue count |
| lead source summary | source attribution with fictional spend data where provided |
| appointment/inspection status summary | status breakdown by state |
| post-inspection status summary | open, won, lost, needs review counts |
| feedback summary | captured count, permission breakdown |
| CSV header verification | plan-tier appropriate headers present |
| fictional CSV sample row | fixture data only; no real homeowner PII |
| plan-tier CSV field availability | Starter: basic; Growth: standard; Elite: detailed |
| source ROI fields | dependent on customer-provided spend/source data |

### Boundaries

- CSV is one-directional reporting/manual CRM/reference use.
- CSV export is not bidirectional CRM integration.
- CSV does not replace the roofer's CRM.
- CSV does not push data back to RoofLeadHQ.
- CSV exports may contain homeowner personal information.
- Customer is responsible for downloaded/exported data.

## 13. Activation Flag Fixture Expectations

Fixture tests should prove false flags block live actions.

### Flags

| Flag | Default | Expected behavior when false |
| --- | --- | --- |
| live_sms_enabled | false | SMS send blocked; dry-run only |
| live_vapi_calls_enabled | false | Vapi call blocked; dry-run only |
| live_resend_email_enabled | false | Email send blocked; dry-run only |
| live_calendar_booking_enabled | false | Calendar booking blocked; manual fixture only |
| live_lindy_bridge_enabled | false | Lindy execution blocked |
| live_scheduler_enabled | false | Scheduler/cron blocked |
| live_csv_export_enabled | false | Live CSV export blocked; fixture snapshot only |
| live_crm_handoff_enabled | false | CRM handoff blocked |
| live_payment_or_invoice_enabled | false | Payment/invoice blocked |

### Expected behavior

- all default false
- live send/action blocked if false
- audit note created
- HOLD/BLOCKED or dry-run-only output returned
- explicit Jason approval required before any future live activation

## 14. Fixture Output Expectations

Future fixture output shape (conceptual):

```json
{
  "scenario_id": "fixture-scenario-001",
  "scenario_name": "normal lead intake to appointment readiness",
  "input_fixture_summary": { },
  "starting_state": "LEAD_RECEIVED",
  "transition_log": [ ],
  "guard_results": [ ],
  "final_state": "APPOINTMENT_READY",
  "review_queue_items": [ ],
  "reporting_snapshot": { },
  "csv_snapshot_if_applicable": { },
  "activation_flag_results": { },
  "audit_events": [ ],
  "safety_assertions": [ ],
  "live_actions_performed": "no",
  "production_data_touched": "no",
  "external_services_called": "no"
}
```

## 15. Local E2E Runner Relationship

- This fixture plan should guide future expansion of the local E2E fixture runner.
- Fixture outputs should remain deterministic.
- Tests should be runnable locally.
- Tests should not require credentials.
- Tests should not call Supabase or external services.
- Fixture results should support later sandbox/test-mode implementation.

The local E2E fixture runner (`docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`) implements Stage 1 fixture dry-run. This packet defines the fuller state model that future runner expansion should implement.

## 16. First Paid Roofer Relationship

- first paid roofer manual operation can use these fixture paths as a reference.
- fixture learning should inform native implementation priorities.
- First-roofer operations should not wait for full native engine if manual bridge is safe.
- Live automation remains disabled unless explicitly approved.
- Lindy may assist temporarily where existing workflows are useful.
- Native records/states should become the long-term authority.

## 17. Future Implementation Sequencing

Suggested next sequence after this plan passes:

1. Create fake-data fixture state model implementation after this plan.
2. Add deterministic local fixture scenarios.
3. Add transition guard assertions.
4. Add plan profile fixture assertions.
5. Add review queue fixture assertions.
6. Add appointment readiness fixture assertions.
7. Add post-inspection/feedback fixture assertions.
8. Add reporting/CSV fake snapshot assertions.
9. Add activation-flag false blocking assertions.
10. Only after fixture model passes, consider schema/security/RLS readiness work.
11. Only after security review, consider native persistence.
12. Only after explicit approval, consider sandbox/test-mode integrations.

## Forbidden and Preferred Language

### Forbidden public language

Do not use in customer-facing materials, website copy, or sales materials. The read-only verifier enforces that exact prohibited phrases do not appear anywhere in this packet body.

| Category | Prohibited public phrasing category (do not use) |
| --- | --- |
| Job closing | language that implies booking or closing roofing jobs for the roofer |
| Revenue guarantees | hard revenue outcome promises or guaranteed job counts |
| Appointment guarantees | hard appointment outcome promises or quota-based appointment counts |
| Automation overreach | unattended no-human-oversight claims or language implying unattended estimates, quotes, invoices, or payments without roofer review |
| CRM overreach | two-way CRM integration claims or language implying RoofLeadHQ replaces or syncs bidirectionally with the roofer's CRM |
| Review manipulation | fabricated endorsements, pressured public praise campaigns, incentivized positive feedback, or unattended public review publishing |

### Preferred language

Use:

- booked inspections
- booked homeowner appointments
- lead-to-inspection
- missed-lead recovery
- automatic follow-up
- appointment readiness
- booked inspection tracking
- post-inspection follow-up
- post-inspection feedback capture
- weekly/monthly reporting
- CSV export
- roofer review
- contractor review
- guided setup
- fixture state model
- fake data
- native workflow engine
- Supabase source of truth
- plan configuration profiles
- staged E2E testing
- manual bridge
- readiness only