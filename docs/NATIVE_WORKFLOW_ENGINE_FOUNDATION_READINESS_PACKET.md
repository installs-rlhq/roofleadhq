# Native Workflow Engine Foundation Readiness Packet

## 1. Purpose and Scope

This packet defines the **foundation for a future native RoofLeadHQ workflow engine** — the conceptual entities, states, plan configuration profiles, safety gates, test expectations, and migration boundaries that must be agreed before any implementation work begins.

RoofLeadHQ is the roofing lead-to-inspection operating layer. It responds fast, follows up, recovers missed leads, supports appointment readiness, books homeowner inspections on the roofer's calendar, tracks what happened, supports post-inspection follow-up, captures optional homeowner feedback, and provides reporting/export.

### What this packet is

- planning/readiness/foundation packet only
- read-only verifier only
- dry-run wrapper only
- conceptual entity and state definitions for future native workflow engine implementation
- plan-tier configuration profile definitions (Starter/Growth/Elite/Custom)
- safety gate and integration activation flag definitions
- migration boundary documentation aligned to Lindy bridge strategy
- staged E2E testing relationship and fixture path expectations

### What this packet is not

- This does **not** implement the workflow engine.
- This does **not** change database schema.
- This does **not** activate live automation.
- This does **not** replace attorney/security review.
- This does **not** create production records or change production behavior.
- This defines entities, states, plan configuration, safety gates, test expectations, and migration boundaries before implementation.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a single artifact that:

- Documents the intended native RoofLeadHQ/Supabase workflow architecture direction.
- Maps conceptual native entities to workflow stages without creating schema.
- Defines the future native lead-to-inspection state machine foundation.
- Locks plan-tier configuration profiles as one core engine with tier-based feature flags.
- Documents integration activation flags, safety defaults, and migration boundaries.
- Connects staged E2E testing fixture paths to native workflow readiness validation.
- Preserves `demo_ready_with_live_automation_disabled`.

Success criteria: a founder/operator can review native workflow engine foundation assumptions, entity/state readiness, plan profiles, safety gates, and first-roofer manual bridge path without activating any live system.

### Connected launch packets

This packet connects:

- `docs/LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md`
- `docs/CSV_EXPORT_READINESS_PACKET.md`
- `docs/FILLOUT_IMPLEMENTATION_CHECKLIST_PACKET.md`
- `docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md`
- `docs/PRICING_VOLUME_GUARDRAIL_AND_INTAKE_ALIGNMENT_PACKET.md`
- `docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`
- `docs/AGREEMENT_TERMS_PRIVACY_UPDATE_REVIEW_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

Verifier and wrapper references:

- `docs/NATIVE_WORKFLOW_ENGINE_FOUNDATION_READINESS_PACKET.md`
- `scripts/run-native-workflow-engine-foundation-readiness-dry-run.sh`
- `backend/scripts/verify-native-workflow-engine-foundation-readiness-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `b135945 test(policy): add agreement terms privacy update review packet`

Before using or editing this packet, verify Terminal 1 source of truth:

- `cd /root/roofleadhq`
- `pwd`
- `git rev-parse --show-toplevel`
- `git fetch origin main`
- `git status --short`
- `git log --oneline -12`

## Safety Posture

- planning/readiness/foundation packet only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- no database schema changes
- no migrations
- no auth/RLS/security implementation
- no production Supabase writes
- no production data reads
- no live automation activation
- no live SMS/Twilio/Vapi/Resend/Calendar/Lindy activation
- no scheduler/cron/dispatcher activation
- no public route activation
- no customer data handling changes
- no backend live behavior changes
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

## 2. Native Architecture Direction

The intended future architecture for RoofLeadHQ workflow operations:

- Supabase as source of truth for records and workflow state
- RoofLeadHQ backend as workflow decision layer
- native workflow state machine for lead-to-inspection operations
- plan-tier configuration profiles for Starter/Growth/Elite/Custom
- direct integrations only after explicit approval
- Lindy as temporary bridge only where useful

| Layer | Role |
| --- | --- |
| **Supabase** | Source of truth for records and workflow state |
| **RoofLeadHQ backend** | Workflow decision layer — evaluates state transitions, enforces safety gates, routes review queues |
| **Native workflow state machine** | Lead-to-inspection operations state machine owned by RoofLeadHQ |
| **Plan-tier configuration profiles** | Starter/Growth/Elite/Custom as configuration profiles on one core engine, not separate workflow engines |
| **Direct integrations** | Activated only after explicit approval — Twilio (SMS), Vapi (calls), Resend (email), Google Calendar (booking), Fillout (intake/setup data), CSV/reporting output, future CRM handoff/export |
| **Lindy** | Temporary bridge only where existing low-volume flows remain useful |

### Integration direction (future, after approval)

Direct integrations may eventually include:

- Twilio for SMS
- Vapi for calls
- Resend for email
- Google Calendar for booking
- Fillout intake/manual setup data
- CSV/reporting output
- future CRM handoff/export only after approval

**n8n/Make are not required unless a narrow temporary bridge is needed.** Do not rebuild Lindy inside n8n or Make as the permanent system.

### Authority boundaries

- Supabase holds source-of-truth records and workflow state.
- RoofLeadHQ backend owns workflow decision logic and state transition evaluation.
- Lindy may assist temporarily but must not become long-term workflow brain, reporting authority, source of truth, dashboard authority, live-send authority, or customer-facing automation owner.
- Fillout is intake/setup data, not the workflow brain.

## 3. Core Entities / Records Readiness Map

These are **conceptual native entities** for readiness planning only. No schema is created by this packet. No production records are created or changed.

### roofer_account

| Attribute | Detail |
| --- | --- |
| **Purpose** | Represents a paying roofer customer tenant and operating context |
| **Likely owner/source** | RoofLeadHQ backend + Supabase; seeded from Guided Setup / Fillout intake |
| **Key conceptual fields** | account_id, company_name, primary_contact, plan_profile_id, locations, service_areas, activation_status, safety_posture |
| **Workflow stage** | All stages — tenant boundary |
| **Safety/privacy notes** | Tenant/customer data boundary; least-privilege access |
| **Launch priority** | first-roofer/manual |

### plan_profile

| Attribute | Detail |
| --- | --- |
| **Purpose** | Configuration profile for Starter/Growth/Elite/Custom tier feature flags and thresholds |
| **Likely owner/source** | RoofLeadHQ backend; derived from intake/plan-fit summary |
| **Key conceptual fields** | plan_tier, monthly_lead_limit, feature_flags, review_queue_depth, csv_field_availability, upgrade_triggers |
| **Workflow stage** | All stages — gates feature availability |
| **Safety/privacy notes** | Controls volume thresholds and Custom Review triggers |
| **Launch priority** | first-roofer/manual |

### lead_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Core lead entity for lead-to-inspection workflow |
| **Likely owner/source** | Supabase source of truth; intake from lead sources |
| **Key conceptual fields** | lead_id, created_at, lead_type, urgency, roofing_issue_summary, current_workflow_state, plan_profile_id |
| **Workflow stage** | Lead intake through closure |
| **Safety/privacy notes** | Contains homeowner personal information references |
| **Launch priority** | first-roofer/manual |

### lead_source

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks where a lead originated for routing and reporting |
| **Likely owner/source** | Intake capture + Guided Setup configuration |
| **Key conceptual fields** | source_type, source_detail, campaign_or_ad_source, attribution_confidence |
| **Workflow stage** | Lead intake, reporting/export |
| **Safety/privacy notes** | ROI fields depend on customer-provided spend/source data |
| **Launch priority** | staged dry-run |

### homeowner_contact

| Attribute | Detail |
| --- | --- |
| **Purpose** | Homeowner contact and permission context for outreach |
| **Likely owner/source** | Lead intake; manual enrichment |
| **Key conceptual fields** | name, phone, email, service_address, contact_permission_status, do_not_contact_flag |
| **Workflow stage** | Lead intake, response/follow-up, appointment |
| **Safety/privacy notes** | Homeowner personal information; messaging compliance required |
| **Launch priority** | first-roofer/manual |

### message_thread

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks communication thread context for a lead |
| **Likely owner/source** | RoofLeadHQ backend workflow layer |
| **Key conceptual fields** | thread_id, lead_id, channel, last_message_at, draft_status, sent_status |
| **Workflow stage** | Response/follow-up |
| **Safety/privacy notes** | Live send blocked unless activation flags approved |
| **Launch priority** | later implementation |

### follow_up_state

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks follow-up cadence and attempt history |
| **Likely owner/source** | Native workflow state machine |
| **Key conceptual fields** | follow_up_count, last_follow_up_date, next_follow_up_due, max_attempts_reached |
| **Workflow stage** | Response/follow-up |
| **Safety/privacy notes** | Respects do-not-contact and permission status |
| **Launch priority** | staged dry-run |

### manual_outreach_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Records founder/operator manual outreach actions |
| **Likely owner/source** | Manual bridge path; Jason/founder operation |
| **Key conceptual fields** | outreach_id, lead_id, channel, prepared_by, approved_by, sent_manually, notes |
| **Workflow stage** | Response/follow-up, first-roofer manual bridge |
| **Safety/privacy notes** | Draft-only until explicit approval; no uncontrolled live sends |
| **Launch priority** | first-roofer/manual |

### missed_lead_recovery_state

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks missed-lead recovery workflow branch |
| **Likely owner/source** | Native workflow state machine |
| **Key conceptual fields** | recovery_started_at, recovery_attempts, recovery_channel, recovery_outcome |
| **Workflow stage** | Response/follow-up — missed-lead recovery |
| **Safety/privacy notes** | Growth+ plan profile feature; permission check required |
| **Launch priority** | staged dry-run |

### appointment_readiness_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks appointment readiness determination before booking |
| **Likely owner/source** | Native workflow + manual coordination |
| **Key conceptual fields** | readiness_status, calendar_preferences_known, homeowner_confirmed, contractor_confirmed, readiness_blockers |
| **Workflow stage** | Appointment/inspection |
| **Safety/privacy notes** | Calendar preferences must be known before APPOINTMENT_READY |
| **Launch priority** | first-roofer/manual |

### booked_inspection_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks booked homeowner inspection on roofer calendar |
| **Likely owner/source** | Native workflow; manual coordination for first roofer |
| **Key conceptual fields** | appointment_date, appointment_time, calendar_owner, appointment_status, inspection_completed |
| **Workflow stage** | Appointment/inspection |
| **Safety/privacy notes** | Booked inspections only — not job closing |
| **Launch priority** | first-roofer/manual |

### post_inspection_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks post-inspection follow-up and outcome state |
| **Likely owner/source** | Native workflow state machine |
| **Key conceptual fields** | inspection_outcome, estimate_needed, estimate_sent, still_open, won, lost, needs_review |
| **Workflow stage** | Post-inspection |
| **Safety/privacy notes** | Roofer review owns business judgment |
| **Launch priority** | staged dry-run |

### feedback_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Captures optional homeowner feedback after inspection |
| **Likely owner/source** | Native workflow; post-inspection follow-up layer |
| **Key conceptual fields** | feedback_responses, permission_to_use_publicly, feedback_issue_flagged |
| **Workflow stage** | Feedback |
| **Safety/privacy notes** | Feedback internal unless permission obtained; permission_to_use_publicly yes/no/not_asked |
| **Launch priority** | staged dry-run |

### review_queue_item

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks items requiring roofer or RoofLeadHQ review |
| **Likely owner/source** | Native workflow review queue |
| **Key conceptual fields** | review_type, review_owner, review_reason, review_status, escalation_level |
| **Workflow stage** | Review states |
| **Safety/privacy notes** | Roofer review owns business judgment; RoofLeadHQ review limited to system/workflow/data/routing/quality |
| **Launch priority** | first-roofer/manual |

### report_snapshot

| Attribute | Detail |
| --- | --- |
| **Purpose** | Point-in-time reporting snapshot for weekly/monthly summaries |
| **Likely owner/source** | Native RoofLeadHQ backend from Supabase records |
| **Key conceptual fields** | report_period, snapshot_generated_at, lead_counts, inspection_counts, outcome_summary |
| **Workflow stage** | Reporting/export |
| **Safety/privacy notes** | Generated from approved native records after implementation |
| **Launch priority** | later implementation |

### csv_export_snapshot

| Attribute | Detail |
| --- | --- |
| **Purpose** | One-directional CSV export artifact for reporting/manual CRM/reference use |
| **Likely owner/source** | Native RoofLeadHQ backend from Supabase source-of-truth records |
| **Key conceptual fields** | export_id, report_period, field_set, generated_at, delivery_status |
| **Workflow stage** | Reporting/export |
| **Safety/privacy notes** | CSV is one-directional only — not bidirectional CRM integration; may contain homeowner personal information |
| **Launch priority** | later implementation |

### usage_volume_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Tracks monthly lead volume against plan profile limits |
| **Likely owner/source** | Native workflow + plan profile |
| **Key conceptual fields** | period, lead_count, plan_limit, overage_status, custom_review_triggered |
| **Workflow stage** | All stages — volume guardrail |
| **Safety/privacy notes** | 500+ lead volume without Custom Review triggers HOLD |
| **Launch priority** | staged dry-run |

### integration_activation_flag

| Attribute | Detail |
| --- | --- |
| **Purpose** | Controls whether live integrations are enabled |
| **Likely owner/source** | RoofLeadHQ backend safety layer |
| **Key conceptual fields** | flag_name, enabled, approved_by, approved_at, activation_scope |
| **Workflow stage** | All stages — safety gate |
| **Safety/privacy notes** | All live flags remain disabled unless Jason explicitly approves activation |
| **Launch priority** | later implementation |

### safety_gate_record

| Attribute | Detail |
| --- | --- |
| **Purpose** | Records safety gate evaluations and HOLD/BLOCKED decisions |
| **Likely owner/source** | RoofLeadHQ backend workflow decision layer |
| **Key conceptual fields** | gate_type, evaluation_result, hold_reason, blocked_reason, evaluated_at |
| **Workflow stage** | All stages |
| **Safety/privacy notes** | Fail-closed on unclear permission, missing data, or unapproved integration |
| **Launch priority** | first-roofer/manual |

### audit_event

| Attribute | Detail |
| --- | --- |
| **Purpose** | Audit trail for state transitions, review decisions, and activation changes |
| **Likely owner/source** | Supabase + RoofLeadHQ backend |
| **Key conceptual fields** | event_type, entity_id, actor, previous_state, new_state, timestamp, notes |
| **Workflow stage** | All stages |
| **Safety/privacy notes** | Retention/deletion/export process to be defined; no implementation in this packet |
| **Launch priority** | later implementation |

## 4. Workflow State Machine Foundation

These are **conceptual states** for readiness planning only. No live state machine is implemented by this packet. No production records are created or changed.

### Lead Intake States

| State | Description |
| --- | --- |
| `NEW_LEAD` | Lead first captured; initial intake |
| `SOURCE_CAPTURED` | Lead source identified or marked unknown |
| `MISSING_INFO` | Required homeowner contact or service detail missing |
| `DUPLICATE_REVIEW` | Possible duplicate lead requires review |
| `BAD_FIT_OR_EXCLUDED` | Outside service area, wrong service type, or excluded |
| `STOPPED_DO_NOT_CONTACT` | Homeowner requested do-not-contact |
| `READY_FOR_RESPONSE` | Minimum intake complete; ready for response/follow-up |

### Response / Follow-Up States

| State | Description |
| --- | --- |
| `RESPONSE_DRAFT_READY` | Response draft prepared; awaiting review/approval |
| `RESPONSE_SENT_OR_MANUAL_SENT` | Response sent (manual or approved channel) |
| `FOLLOW_UP_PENDING` | Follow-up scheduled but not yet due |
| `FOLLOW_UP_DUE` | Follow-up attempt is due |
| `HOMEOWNER_REPLIED` | Homeowner responded; thread active |
| `NO_RESPONSE` | No homeowner response after attempt |
| `MISSED_LEAD_RECOVERY_NEEDED` | Lead qualifies for missed-lead recovery |
| `MISSED_LEAD_RECOVERY_ACTIVE` | Missed-lead recovery in progress |
| `STOPPED_AFTER_MAX_ATTEMPTS` | Max follow-up attempts reached; stopped |

### Review States

| State | Description |
| --- | --- |
| `ROOFER_REVIEW_NEEDED` | Roofer business judgment review required |
| `ROOFER_REVIEW_PENDING` | Awaiting roofer review completion |
| `ROOFER_REVIEW_COMPLETE` | Roofer review completed |
| `ROOFLEADHQ_REVIEW_NEEDED` | System/workflow/data/routing/quality review required |
| `ROOFLEADHQ_REVIEW_PENDING` | Awaiting RoofLeadHQ/Jason review |
| `ROOFLEADHQ_REVIEW_COMPLETE` | RoofLeadHQ review completed |
| `HOLD` | Workflow paused pending resolution |
| `BLOCKED` | Workflow blocked; cannot proceed without intervention |

### Appointment / Inspection States

| State | Description |
| --- | --- |
| `APPOINTMENT_READINESS_PENDING` | Appointment readiness evaluation in progress |
| `APPOINTMENT_READY` | Ready for booked homeowner appointment |
| `APPOINTMENT_NOT_READY` | Not ready; blockers documented |
| `APPOINTMENT_BOOKED` | Booked inspection on roofer calendar |
| `INSPECTION_REMINDER_READY` | Reminder draft ready (not live-sent by this packet) |
| `INSPECTION_COMPLETED` | Inspection completed |
| `INSPECTION_MISSED` | Inspection missed or no-show |
| `RESCHEDULE_NEEDED` | Reschedule required |
| `APPOINTMENT_ISSUE` | Issue during appointment coordination |

### Post-Inspection States

| State | Description |
| --- | --- |
| `POST_INSPECTION_FOLLOW_UP_NEEDED` | Post-inspection follow-up required |
| `ESTIMATE_NEEDED` | Estimate or next step needed (roofer-owned) |
| `ESTIMATE_SENT` | Estimate sent by roofer (manual tracking) |
| `HOMEOWNER_FOLLOW_UP_NEEDED` | Homeowner follow-up still open |
| `ROOFER_FOLLOW_UP_NEEDED` | Roofer follow-up still open |
| `STILL_OPEN` | Outcome still open |
| `WON` | Lead converted (roofer-reported) |
| `LOST` | Lead lost (roofer-reported) |
| `NEEDS_REVIEW` | Outcome unclear; review required |
| `CLOSED` | Workflow explicitly closed |

### Feedback States

| State | Description |
| --- | --- |
| `FEEDBACK_NOT_REQUESTED` | Feedback not yet requested |
| `FEEDBACK_REQUESTED` | Feedback request prepared or sent |
| `FEEDBACK_CAPTURED` | Feedback responses captured |
| `FEEDBACK_ISSUE_FLAGGED` | Feedback flagged for review |
| `PERMISSION_TO_USE_PUBLICLY_YES` | Homeowner granted public-use permission |
| `PERMISSION_TO_USE_PUBLICLY_NO` | Homeowner declined public-use permission |
| `PERMISSION_TO_USE_PUBLICLY_NOT_ASKED` | Public-use permission not yet asked |

### Reporting / Export States

| State | Description |
| --- | --- |
| `REPORTING_PENDING` | Reporting period not yet generated |
| `REPORT_SNAPSHOT_READY` | Report snapshot generated |
| `CSV_EXPORT_READY` | CSV export generated from approved native records |
| `CSV_EXPORT_DELIVERED_OR_MANUAL_SENT` | CSV delivered or manually sent to roofer |
| `EXPORT_HOLD` | Export held pending review or safety gate |

## 5. State Transition Guardrails

State transitions should require safe inputs before advancing. These are conceptual guardrails for future implementation — not live enforcement by this packet.

### Required safe inputs

- lead source known or marked unknown
- contact permission status checked
- required homeowner contact data captured
- service area fit reviewed
- plan profile known
- appointment/calendar preferences known before appointment-ready status
- roofer review completed before business-judgment decisions
- RoofLeadHQ review limited to system/workflow/data/routing/quality issues
- feedback public-use permission captured before any testimonial/case-study/public use
- CSV/export generated only from approved native records after implementation
- live send actions blocked unless activation flags are explicitly approved

### Transition examples

| From | To | Guardrail |
| --- | --- | --- |
| `NEW_LEAD` | `READY_FOR_RESPONSE` | Contact permission checked; minimum contact data present |
| `READY_FOR_RESPONSE` | `RESPONSE_DRAFT_READY` | Plan profile known; messaging compliance confirmed |
| `FOLLOW_UP_DUE` | `MISSED_LEAD_RECOVERY_NEEDED` | Growth+ plan profile; recovery feature enabled |
| `APPOINTMENT_READINESS_PENDING` | `APPOINTMENT_READY` | Calendar preferences known; homeowner and contractor confirmed |
| `APPOINTMENT_READY` | `APPOINTMENT_BOOKED` | Manual coordination or approved calendar integration only |
| `INSPECTION_COMPLETED` | `POST_INSPECTION_FOLLOW_UP_NEEDED` | Growth+ plan profile; post-inspection feature enabled |
| `FEEDBACK_CAPTURED` | `PERMISSION_TO_USE_PUBLICLY_YES` | Explicit homeowner permission recorded |
| `REPORTING_PENDING` | `CSV_EXPORT_READY` | Generated from approved native records; live_csv_export_enabled only if approved |

### HOLD/BLOCKED examples

Transitions to `HOLD` or `BLOCKED` should occur when:

- unclear contact permission
- do-not-contact request
- missing phone/email where required
- unsupported request for estimate/quote/invoice/payment
- multi-location complexity without Custom Review
- 500+ lead volume without Custom Review
- multiple calendars/phones/sales reps without Custom Review
- production safety risk
- integration not approved
- unclear owner for follow-up or review

## 6. Plan-Tier Configuration Profiles

Starter/Growth/Elite/Custom are **configuration profiles on one core native workflow engine**, not separate workflow engines per tier.

Plan profiles should eventually control:

- feature flags
- usage thresholds
- reporting depth
- CSV field availability
- review queue depth
- post-inspection/feedback availability
- upgrade/custom-review triggers

### Starter profile

- up to 100 leads/month
- single location
- simple routing
- core lead response/follow-up
- basic appointment booked status
- basic weekly/monthly summary
- limited/basic CSV summary if included
- lower review queue depth

### Growth profile

- up to 300 leads/month
- single location
- missed lead recovery
- lead source tracking
- appointment readiness
- booked inspection tracking
- post-inspection follow-up
- post-inspection feedback capture
- weekly/monthly reporting
- CSV export

### Elite profile

- up to 500 leads/month
- single location unless custom approved
- deeper source segmentation
- advanced reporting
- larger review queue capacity
- priority setup/support
- detailed CSV/export
- more operational configuration capacity

### Custom Review profile/triggers

Custom Review is required when:

- 500+ leads/month
- 2+ locations
- 3+ service areas
- multiple calendars
- multiple phone numbers
- multiple sales reps
- complex service-area routing
- advanced reporting
- unusual integration needs
- multi-location operations

## 7. Native Workflow Configuration Inputs

Future configuration inputs map from Fillout / Guided Setup intake. Fillout is intake/setup data, not the workflow brain.

| Input area | Maps to |
| --- | --- |
| company/contact basics | roofer_account, homeowner_contact context |
| monthly lead volume | plan_profile, usage_volume_record |
| lead sources | lead_source configuration |
| CRM/reporting needs | csv_export_snapshot scope, report recipients |
| locations/service areas | roofer_account routing rules |
| phone/calendar setup | appointment_readiness_record, integration flags |
| review/escalation owner | review_queue_item routing |
| post-inspection follow-up preference | post_inspection_record configuration |
| feedback capture preference | feedback_record configuration |
| photo handling preference | lead_record status fields (future/optional) |
| unsupported/later-only request flags | safety_gate_record |
| messaging compliance status | homeowner_contact permission |
| exclusions/routing rules | lead intake routing |
| report recipients | report_snapshot delivery |
| final plan-fit summary | plan_profile selection |

## 8. Lindy Bridge Migration Boundaries

Aligned to `docs/LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md`:

- Lindy may temporarily assist low-volume early flows.
- Existing Lindy workflows may be preserved temporarily.
- Major new business logic should not be built in Lindy.
- Lindy should not own source-of-truth records.
- Lindy should not own final reports/CSV exports.
- Lindy should not own live send authority long term.
- Lindy should not own multi-roofer routing.
- Native RoofLeadHQ/Supabase should become workflow authority over time.
- n8n/Make are not required unless a narrow temporary bridge is needed.

## 9. Integration Activation Flags

Conceptual activation flags for future implementation. All live flags remain disabled unless Jason explicitly approves activation.

| Flag | Purpose |
| --- | --- |
| `live_sms_enabled` | Twilio SMS live sends |
| `live_vapi_calls_enabled` | Vapi live calls |
| `live_resend_email_enabled` | Resend live email |
| `live_calendar_booking_enabled` | Google Calendar live booking |
| `live_lindy_bridge_enabled` | Lindy bridge live assistance |
| `live_scheduler_enabled` | Scheduler/cron live activation |
| `live_csv_export_enabled` | Live CSV export generation and delivery |
| `live_crm_handoff_enabled` | CRM handoff/export live activation |
| `live_payment_or_invoice_enabled` | Payment/invoice live activation (unsupported/later-only) |

### Safety default

Current posture: `demo_ready_with_live_automation_disabled`

Live automation remains disabled unless Jason explicitly approves activation.

## 10. First Paid Roofer Manual Bridge Path

The first paid roofer approach uses manual bridge operation while native workflow engine implementation proceeds:

- native records/states may be modeled in dry-run/manual artifacts first
- Jason/founder may manually operate first-roofer review and coordination
- roofer review owns business judgment
- RoofLeadHQ/Jason review handles system/workflow/data/routing/quality issues only
- Lindy may assist temporarily only where existing flows are useful
- no uncontrolled live sends
- no production automation until explicit approval
- first-roofer operation should generate learning for native state machine implementation

## 11. Staged E2E Testing Relationship

This foundation supports staged E2E testing aligned to `docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md` and `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`.

### Stage 1 — Local fixture-only

- local fixture-only
- fake data only
- no live sends
- no production reads/writes
- validate state transitions and reporting expectations

### Stage 2 — Sandbox/test-mode

- sandbox/test-mode integration paths where available
- integration activation flags still default off
- verify dry-run behavior before live actions

### Stage 3 — Limited live activation

- limited live activation only after explicit approval
- activate one channel or workflow at a time
- verify rollback/hold/block states

### Required test fixture paths

Test fixture paths should cover:

- normal lead to appointment-ready path
- missed-lead recovery path
- roofer-review-needed path
- RoofLeadHQ system-review-needed path
- bad-fit/excluded path
- do-not-contact path
- appointment booked / inspection completed path
- post-inspection still-open path
- feedback captured with permission_to_use_publicly yes/no/not_asked
- CSV/report snapshot with fake data
- plan-tier configuration differences
- Custom Review trigger path

## 12. Reporting / CSV Relationship

Aligned to `docs/CSV_EXPORT_READINESS_PACKET.md`:

- CSV/reporting should ultimately be generated from native source-of-truth records.
- CSV export remains one-directional reporting/manual CRM/reference use.
- CSV export is not bidirectional CRM integration.
- CSV does not replace the roofer's CRM.
- CSV does not push data back to RoofLeadHQ.
- CSV does not auto-update based on downloaded file changes.
- CSV exports may contain homeowner personal information.
- customer is responsible for downloaded/exported data handling.
- ROI fields depend on customer-provided spend/source data.

## 13. Data Protection / Privacy / Audit Readiness

Conceptual requirements for future implementation. No implementation in this packet.

- tenant/customer data boundary
- least-privilege access
- data minimization
- homeowner personal information handling
- feedback public-use permission
- no sale of homeowner data
- audit trail for state transitions
- audit trail for human review decisions
- audit trail for live activation flag changes
- retention/deletion/export process to be defined
- security/tenant isolation review before multi-roofer production scale

This packet does not replace attorney/security review.

## 14. Future Implementation Sequencing

Suggested future sequence after this foundation packet passes:

1. Native workflow entity/state implementation plan
2. Supabase schema/RLS/security readiness review before schema work
3. Fixture-based state machine dry-run implementation
4. Plan profile configuration fixture tests
5. Review queue native model
6. Reporting/CSV fixture generator using fake data
7. Integration activation flag implementation
8. Sandbox/test-mode channel connector tests
9. First paid roofer manual-to-native handoff rehearsal
10. Limited live activation approval gate

## 15. Safety and Forbidden Language

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
- native workflow engine
- Supabase source of truth
- plan configuration profiles
- staged E2E testing
- manual bridge
- readiness only

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