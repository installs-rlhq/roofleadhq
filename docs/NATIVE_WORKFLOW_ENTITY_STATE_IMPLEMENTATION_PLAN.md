# Native Workflow Entity / State Implementation Plan

## 1. Purpose and Scope

This packet converts the **Native Workflow Engine Foundation Readiness Packet** into a concrete **implementation plan** for future native workflow engine development. It defines future implementation modules, entity groups, state-transition phases, fixture-test expectations, security blockers, and launch sequencing — without implementing any workflow engine behavior.

RoofLeadHQ is the roofing lead-to-inspection operating layer. It responds fast, follows up, recovers missed leads, supports appointment readiness, books homeowner inspections on the roofer's calendar, tracks what happened, supports post-inspection follow-up, captures optional homeowner feedback, and provides reporting/export.

### What this packet is

- planning/readiness/implementation-plan packet only
- read-only verifier only
- dry-run wrapper only
- future module map for native workflow engine implementation
- entity implementation readiness table
- state implementation phases (Phase 0 through Phase 5)
- transition guard implementation plan
- plan profile implementation plan
- Fillout/Guided Setup to native config mapping
- Lindy bridge implementation boundary
- activation flag implementation plan
- fixture test implementation plan
- security/schema/RLS blockers before implementation
- future implementation sequencing

### What this packet is not

- This does **not** implement the workflow engine.
- This does **not** create or modify database schema.
- This does **not** change auth, RLS, tenant isolation, or security controls.
- This does **not** activate live automation.
- This does **not** read/write production data.
- This does **not** replace attorney/security review.
- This defines implementation modules, entity groups, state-transition phases, fixture tests, security blockers, and launch sequencing for approved future development.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a single artifact that:

- Converts native workflow foundation concepts into phased implementation guidance.
- Maps future backend modules to entity and state responsibilities.
- Defines fixture-test expectations before any schema or live activation work.
- Documents security blockers that must be resolved before persistence.
- Preserves `demo_ready_with_live_automation_disabled`.

Success criteria: a founder/operator can review native workflow entity/state implementation sequencing, module boundaries, fixture expectations, and launch phases without activating any live system.

### Connected launch packets

This packet builds on:

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

- `docs/NATIVE_WORKFLOW_ENTITY_STATE_IMPLEMENTATION_PLAN.md`
- `scripts/run-native-workflow-entity-state-implementation-plan-dry-run.sh`
- `backend/scripts/verify-native-workflow-entity-state-implementation-plan-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

### Source-of-truth workflow

Canonical source of truth before this worktree: `249a8d2 test(workflow): add native workflow engine foundation readiness packet`

Before using or editing this packet, verify Terminal 1 source of truth:

- `cd /root/roofleadhq`
- `pwd`
- `git rev-parse --show-toplevel`
- `git fetch origin main`
- `git status --short`
- `git log --oneline -12`

## Safety Posture

- planning/readiness/implementation-plan packet only
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
- no customer-facing workflow behavior changes
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

## 2. Implementation Principles

The following principles govern all future native workflow engine implementation work:

1. **Supabase source of truth** — Supabase will become the source of truth for native records and workflow state after approved implementation.
2. **RoofLeadHQ backend workflow decision layer** — RoofLeadHQ backend will become the workflow decision layer that evaluates transitions, enforces guards, and routes review queues.
3. **Lindy temporary bridge only** — Lindy remains temporary bridge only, not long-term source of truth.
4. **One core workflow engine** — One core workflow engine should support Starter/Growth/Elite/Custom through plan configuration profiles; no separate workflow engines per tier.
5. **Live channel execution behind activation flags** — Live channel execution must be behind explicit activation flags; live sends must fail closed if flag is false.
6. **Fixture/dry-run before live** — Fixture/dry-run behavior must precede sandbox/test-mode and live activation.
7. **Security before persistence** — Security/tenant isolation review must precede schema/RLS implementation and multi-roofer scale.
8. **No bidirectional CRM integration** — CSV/reporting remains one-directional unless separately approved later.
9. **Roofer review owns business judgment** — Roofer review owns business judgment; RoofLeadHQ/Jason review is limited to system/workflow/data/routing/quality issues.
10. **Fillout is intake only** — Fillout should not become the workflow brain; it supplies intake/setup data for native configuration.

## 3. Future Module Map

These are **conceptual future backend/module areas** for implementation planning only. No modules are created by this packet.

### workflow/entities

| Attribute | Detail |
| --- | --- |
| **Purpose** | Define and manage conceptual native entity models and entity lifecycle boundaries |
| **Future responsibilities** | Entity type definitions, field validation rules, entity relationships, tenant scoping hooks |
| **First implementation priority** | Phase 1 — fixture state model |
| **Dependencies** | Foundation readiness packet entity map; security/tenant isolation design |
| **Safety blockers** | No schema until security review; no production data |
| **Fixture-test expectations** | Fake roofer_account, lead_record, homeowner_contact entities in memory |
| **Not implemented by this packet** | No entity persistence, no schema, no production records |

### workflow/states

| Attribute | Detail |
| --- | --- |
| **Purpose** | Define workflow state names, state groups, and state ownership per entity |
| **Future responsibilities** | State registry, state group taxonomy (intake, response, review, appointment, post-inspection, feedback, reporting), current-state resolution |
| **First implementation priority** | Phase 1 — fixture state model |
| **Dependencies** | workflow/entities; foundation state machine definitions |
| **Safety blockers** | No production state writes; fake data only in Phase 1 |
| **Fixture-test expectations** | Verify state names match foundation; state group coverage for all fixture paths |
| **Not implemented by this packet** | No live state machine; no production state persistence |

### workflow/transitions

| Attribute | Detail |
| --- | --- |
| **Purpose** | Define allowed state transitions and transition evaluation logic |
| **Future responsibilities** | Transition registry, from/to state pairs, transition trigger handling, transition audit notes |
| **First implementation priority** | Phase 1 — fixture state model |
| **Dependencies** | workflow/states; workflow/guards |
| **Safety blockers** | Transitions blocked without guard pass; no unguarded live transitions |
| **Fixture-test expectations** | All fixture paths exercise valid transitions; invalid transitions fail with clear reason |
| **Not implemented by this packet** | No live transition execution; no production writes |

### workflow/guards

| Attribute | Detail |
| --- | --- |
| **Purpose** | Enforce transition guard checks before state advancement |
| **Future responsibilities** | Guard evaluation, HOLD/BLOCKED routing, fail-closed on missing prerequisites |
| **First implementation priority** | Phase 1 — fixture state model |
| **Dependencies** | workflow/transitions; workflow/planProfiles; workflow/activationFlags |
| **Safety blockers** | Live sends blocked unless activation flags explicitly approved |
| **Fixture-test expectations** | Guard failure paths for each category; activation flag false blocks live action |
| **Not implemented by this packet** | No live guard enforcement against production data |

### workflow/planProfiles

| Attribute | Detail |
| --- | --- |
| **Purpose** | Implement Starter/Growth/Elite/Custom as configuration profiles on one core engine |
| **Future responsibilities** | Plan tier resolution, feature flag gating, volume limits, upgrade/custom-review triggers |
| **First implementation priority** | Phase 1 — fixture plan profile config |
| **Dependencies** | workflow/entities (plan_profile, usage_volume_record); Fillout intake mapping |
| **Safety blockers** | 500+ leads or 2+ locations without Custom Review triggers HOLD |
| **Fixture-test expectations** | Starter, Growth, Elite, and Custom Review trigger fixture paths |
| **Not implemented by this packet** | No live plan enforcement against production accounts |

### workflow/reviewQueues

| Attribute | Detail |
| --- | --- |
| **Purpose** | Route items requiring roofer or RoofLeadHQ review |
| **Future responsibilities** | Review queue item creation, owner assignment, escalation, completion tracking |
| **First implementation priority** | Phase 1 — fixture review queue model |
| **Dependencies** | workflow/states; workflow/guards |
| **Safety blockers** | Review queue access boundaries must be designed before implementation |
| **Fixture-test expectations** | roofer-review-needed path; RoofLeadHQ system-review-needed path |
| **Not implemented by this packet** | No live review queue persistence |

### workflow/appointmentReadiness

| Attribute | Detail |
| --- | --- |
| **Purpose** | Evaluate appointment readiness before booked homeowner appointments |
| **Future responsibilities** | Readiness status, calendar preference checks, blocker documentation, APPOINTMENT_READY gating |
| **First implementation priority** | Phase 1 — fixture appointment readiness model |
| **Dependencies** | workflow/states; workflow/guards; homeowner_contact data |
| **Safety blockers** | Calendar preferences must be known before APPOINTMENT_READY |
| **Fixture-test expectations** | normal lead intake to appointment readiness; appointment booked path |
| **Not implemented by this packet** | No live calendar integration |

### workflow/postInspection

| Attribute | Detail |
| --- | --- |
| **Purpose** | Track post-inspection follow-up and outcome states |
| **Future responsibilities** | Post-inspection state transitions, estimate-needed/sent tracking, still-open/won/lost routing |
| **First implementation priority** | Phase 1 — fixture post-inspection model |
| **Dependencies** | workflow/states; workflow/planProfiles (Growth+ feature flag) |
| **Safety blockers** | Roofer review owns business judgment on outcomes |
| **Fixture-test expectations** | post-inspection still-open path; estimate-needed / estimate-sent tracking path |
| **Not implemented by this packet** | No live post-inspection automation |

### workflow/feedback

| Attribute | Detail |
| --- | --- |
| **Purpose** | Capture optional homeowner feedback and public-use permission |
| **Future responsibilities** | Feedback request/capture, permission_to_use_publicly yes/no/not_asked handling |
| **First implementation priority** | Phase 1 — fixture feedback model |
| **Dependencies** | workflow/postInspection; workflow/guards |
| **Safety blockers** | feedback public-use permission checked before public use |
| **Fixture-test expectations** | feedback captured with permission_to_use_publicly yes/no/not_asked paths |
| **Not implemented by this packet** | No live feedback requests or public testimonial generation |

### workflow/reporting

| Attribute | Detail |
| --- | --- |
| **Purpose** | Generate weekly/monthly reporting snapshots from native records |
| **Future responsibilities** | Report snapshot generation, period aggregation, outcome summaries |
| **First implementation priority** | Phase 1 — fixture reporting snapshot |
| **Dependencies** | workflow/entities; approved native records after Phase 3 |
| **Safety blockers** | Report/CSV access boundaries must be designed before implementation |
| **Fixture-test expectations** | CSV/report snapshot with fake data |
| **Not implemented by this packet** | No production report generation |

### workflow/csvExport

| Attribute | Detail |
| --- | --- |
| **Purpose** | Generate one-directional CSV export snapshots for manual CRM/reference use |
| **Future responsibilities** | Field set selection by plan profile, export generation, delivery status tracking |
| **First implementation priority** | Phase 1 — fixture CSV snapshot |
| **Dependencies** | workflow/reporting; CSV Export Readiness Packet field definitions |
| **Safety blockers** | CSV/reporting generated only from approved native records after implementation |
| **Fixture-test expectations** | CSV/report snapshot with fake data; plan-tier field availability differences |
| **Not implemented by this packet** | No production CSV generation; no CRM sync capability |

### workflow/usageVolume

| Attribute | Detail |
| --- | --- |
| **Purpose** | Track monthly lead volume against plan profile limits |
| **Future responsibilities** | Volume counting, overage detection, Custom Review trigger evaluation |
| **First implementation priority** | Phase 1 — fixture volume guardrail |
| **Dependencies** | workflow/planProfiles; lead_record intake |
| **Safety blockers** | 500+ lead volume without Custom Review triggers HOLD |
| **Fixture-test expectations** | Custom Review trigger for 500+ leads |
| **Not implemented by this packet** | No live volume enforcement against production data |

### workflow/activationFlags

| Attribute | Detail |
| --- | --- |
| **Purpose** | Control live integration and channel activation |
| **Future responsibilities** | Flag storage, approval tracking, fail-closed enforcement, audit on change |
| **First implementation priority** | Phase 2 — schema/security readiness planning |
| **Dependencies** | workflow/audit; explicit Jason approval gate |
| **Safety blockers** | All flags default false; live sends must fail closed if flag is false |
| **Fixture-test expectations** | activation flag false blocks live action |
| **Not implemented by this packet** | No live flag activation |

### workflow/audit

| Attribute | Detail |
| --- | --- |
| **Purpose** | Record audit trail for state transitions, reviews, and activation changes |
| **Future responsibilities** | Audit event creation, actor tracking, retention planning hooks |
| **First implementation priority** | Phase 2 — schema/security readiness planning |
| **Dependencies** | Security/audit trail design review |
| **Safety blockers** | Audit trail design must precede persistence implementation |
| **Fixture-test expectations** | Fixture transitions produce audit note expectations |
| **Not implemented by this packet** | No production audit persistence |

### workflow/fixtures

| Attribute | Detail |
| --- | --- |
| **Purpose** | Provide fake-data fixture paths for state transition validation |
| **Future responsibilities** | Fixture data sets, transition rehearsal, snapshot comparison, dry-run CLI |
| **First implementation priority** | Phase 0 — planning/dry-run; Phase 1 — fixture state model |
| **Dependencies** | Local E2E Fixture Runner; Staged E2E Testing Readiness Plan |
| **Safety blockers** | Fake data only; no production reads/writes |
| **Fixture-test expectations** | All required fixture paths documented in Section 11 |
| **Not implemented by this packet** | No fixture runner code in this packet |

### workflow/lindyBridgeAdapter

| Attribute | Detail |
| --- | --- |
| **Purpose** | Accept Lindy bridge outputs as reviewable inputs to native records |
| **Future responsibilities** | Lindy output ingestion as notes/inputs, review queue routing, no authoritative ownership |
| **First implementation priority** | Phase 4 — manual first-roofer native bridge |
| **Dependencies** | Lindy Bridge Migration Plan; workflow/reviewQueues |
| **Safety blockers** | Lindy should not own source-of-truth records or live-send authority long term |
| **Fixture-test expectations** | Lindy bridge output treated as input requiring native review |
| **Not implemented by this packet** | No live Lindy bridge activation |

### workflow/integrationAdapters

| Attribute | Detail |
| --- | --- |
| **Purpose** | Future adapters for Twilio, Vapi, Resend, Calendar, and other approved channels |
| **Future responsibilities** | Channel-specific send/booking adapters behind activation flags |
| **First implementation priority** | Phase 5 — selective live activation (one channel at a time) |
| **Dependencies** | workflow/activationFlags; sandbox/test-mode readiness |
| **Safety blockers** | No adapter activation without explicit Jason approval and fixture/sandbox tests |
| **Fixture-test expectations** | Sandbox/test-mode paths before live; activation flag false blocks live action |
| **Not implemented by this packet** | No live integration adapters |

## 4. Entity Implementation Readiness Table

These are **conceptual entities** for implementation planning only. No schema is created by this packet.

| Entity | Purpose | First priority | Future conceptual fields | Source of truth owner | Depends on | Security/privacy blocker | Fixture coverage needed | Launch phase | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| roofer_account | Paying roofer customer tenant and operating context | first-roofer/manual | account_id, company_name, primary_contact, plan_profile_id, locations, service_areas | Supabase + RoofLeadHQ backend | plan_profile, safety_gate_record | tenant isolation design | Starter/Growth/Elite plan profile paths | Phase 4 | Seeded from Guided Setup / Fillout intake |
| plan_profile | Starter/Growth/Elite/Custom configuration profile | first-roofer/manual | plan_tier, monthly_lead_limit, feature_flags, csv_field_availability | RoofLeadHQ backend | usage_volume_record | volume guardrail review | All plan profile fixture paths | Phase 1 | One core engine; profiles govern behavior |
| lead_record | Core lead entity for lead-to-inspection workflow | first-roofer/manual | lead_id, created_at, lead_type, current_workflow_state | Supabase source of truth | roofer_account, homeowner_contact, lead_source | homeowner PII classification | normal lead intake to appointment readiness | Phase 1 | Central workflow entity |
| lead_source | Lead origin for routing and reporting | staged dry-run | source_type, source_detail, attribution_confidence | Intake + Guided Setup | lead_record | ROI depends on customer-provided data | bad-fit/excluded path | Phase 1 | lead source captured or marked unknown |
| homeowner_contact | Homeowner contact and permission context | first-roofer/manual | name, phone, email, contact_permission_status, do_not_contact_flag | Lead intake + manual enrichment | lead_record | messaging compliance; do-not-contact | stopped/do-not-contact path; missing info path | Phase 1 | contact permission known or reviewed |
| message_thread | Communication thread context for a lead | later implementation | thread_id, channel, draft_status, sent_status | RoofLeadHQ backend | lead_record, activation flags | live sends blocked unless approved | activation flag false blocks live action | Phase 5 | No live sends in early phases |
| follow_up_state | Follow-up cadence and attempt history | staged dry-run | follow_up_count, next_follow_up_due, max_attempts_reached | Native workflow state machine | lead_record, plan_profile | do-not-contact respected | missed-lead recovery path | Phase 1 | Respects permission status |
| manual_outreach_record | Founder/operator manual outreach actions | first-roofer/manual | outreach_id, channel, prepared_by, sent_manually | Manual bridge path | lead_record | draft-only until approval | roofer-review-needed path | Phase 4 | First-roofer manual bridge |
| missed_lead_recovery_state | Missed-lead recovery workflow branch | staged dry-run | recovery_started_at, recovery_attempts, recovery_outcome | Native workflow state machine | follow_up_state, plan_profile | Growth+ feature; permission check | missed-lead recovery path | Phase 1 | Plan profile gates feature |
| appointment_readiness_record | Appointment readiness before booking | first-roofer/manual | readiness_status, calendar_preferences_known, readiness_blockers | Native workflow + manual coordination | homeowner_contact, plan_profile | calendar preferences before APPOINTMENT_READY | normal lead intake to appointment readiness | Phase 1 | Manual coordination for first roofer |
| booked_inspection_record | Booked homeowner inspection on roofer calendar | first-roofer/manual | appointment_date, calendar_owner, appointment_status | Native workflow; manual coordination | appointment_readiness_record | booked inspections only — not job closing | appointment booked path | Phase 4 | Booked homeowner appointments |
| post_inspection_record | Post-inspection follow-up and outcome | staged dry-run | inspection_outcome, estimate_needed, still_open, won, lost | Native workflow state machine | booked_inspection_record | roofer review owns business judgment | post-inspection still-open path; estimate paths | Phase 1 | Roofer-owned estimate steps only |
| feedback_record | Optional homeowner feedback capture | staged dry-run | feedback_responses, permission_to_use_publicly | Native workflow | post_inspection_record | public-use permission before public use | permission_to_use_publicly yes/no/not_asked | Phase 1 | Internal unless permission obtained |
| review_queue_item | Items requiring roofer or RoofLeadHQ review | first-roofer/manual | review_type, review_owner, review_status | Native workflow review queue | lead_record, safety_gate_record | review queue access boundaries | roofer-review-needed; RoofLeadHQ system-review-needed | Phase 1 | Roofer owns business judgment |
| report_snapshot | Point-in-time reporting for weekly/monthly summaries | later implementation | report_period, lead_counts, outcome_summary | Native RoofLeadHQ backend | approved native records | report access boundaries | CSV/report snapshot with fake data | Phase 1 fixture | Generated from approved records only |
| csv_export_snapshot | One-directional CSV export artifact | later implementation | export_id, field_set, delivery_status | Native RoofLeadHQ backend | report_snapshot, plan_profile | CSV access boundaries; homeowner PII | CSV/report snapshot with fake data | Phase 1 fixture | One-directional export only |
| usage_volume_record | Monthly lead volume against plan limits | staged dry-run | period, lead_count, overage_status | Native workflow + plan_profile | plan_profile, lead_record | 500+ without Custom Review triggers HOLD | Custom Review trigger for 500+ leads | Phase 1 | Volume guardrail |
| integration_activation_flag | Controls live integration enablement | later implementation | flag_name, enabled, approved_by | RoofLeadHQ backend safety layer | audit_event | explicit Jason approval required | activation flag false blocks live action | Phase 5 | All flags default false |
| safety_gate_record | Safety gate evaluations and HOLD/BLOCKED | first-roofer/manual | gate_type, hold_reason, blocked_reason | RoofLeadHQ backend | all entities | fail-closed on unclear permission | HOLD/BLOCKED fixture paths | Phase 1 | messaging compliance guard |
| audit_event | Audit trail for transitions and activation | later implementation | event_type, actor, previous_state, new_state | Supabase + RoofLeadHQ backend | all state changes | audit trail design required | all transition fixture paths | Phase 2 planning | retention/deletion TBD |

## 5. State Implementation Phases

### Phase 0 — planning/dry-run only

- no schema
- no production writes
- document states and fixture expectations
- use fake data only
- this packet operates at Phase 0

### Phase 1 — fixture state model

- local fake data
- pure in-memory or fixture-only state transitions
- no external calls
- no production data
- verifies state names, transitions, guard failures, and reporting snapshots

### Phase 2 — schema/security readiness

- prepare schema/RLS/security review
- tenant isolation review
- audit and retention planning
- no production launch until reviewed
- No schema, migrations, auth, RLS, or security implementation should happen until blockers in Section 12 are reviewed

### Phase 3 — native state persistence

- persist approved state records only after schema/RLS/security approval
- keep live sends disabled
- use test/sandbox data first

### Phase 4 — manual first-roofer native bridge

- founder/operator uses native records for visibility
- manual send/booking/review remains controlled
- Lindy may assist only as temporary bridge where useful
- no uncontrolled automation

### Phase 5 — selective live activation

- activate one channel or workflow at a time
- explicit Jason approval required
- activation flags checked
- rollback/HOLD/BLOCKED path defined

## 6. Transition Guard Implementation Plan

Transition guards enforce safe advancement across state categories. These are conceptual plans for future implementation — not live enforcement by this packet.

### Required guard checks (all categories)

All transition categories must evaluate:

- contact permission known or reviewed
- do-not-contact respected
- service area checked
- lead source captured or marked unknown
- required homeowner contact data present
- plan profile known
- custom-review triggers checked
- appointment/calendar preferences known before appointment-ready status
- roofer review completed before business-judgment decisions
- RoofLeadHQ/Jason review limited to system/workflow/data/routing/quality issues
- feedback public-use permission checked before public use
- CSV/reporting generated only from approved native records after implementation
- live sends blocked unless activation flags explicitly approved

### intake transitions

| Attribute | Detail |
| --- | --- |
| **Future trigger examples** | New lead captured; source identified; missing info resolved; duplicate detected |
| **Required guard checks** | contact permission known or reviewed; lead source captured or marked unknown; required homeowner contact data present; service area checked; plan profile known |
| **Required audit notes** | intake_source, permission_status, service_area_result |
| **Failure/HOLD/BLOCKED handling** | MISSING_INFO if data incomplete; DUPLICATE_REVIEW on duplicate; BAD_FIT_OR_EXCLUDED on service area fail; STOPPED_DO_NOT_CONTACT on DNC |
| **Fixture examples needed** | normal lead intake to appointment readiness; missing info path; duplicate review path; bad-fit/excluded path; stopped/do-not-contact path |

### response/follow-up transitions

| Attribute | Detail |
| --- | --- |
| **Future trigger examples** | Response draft ready; follow-up due; homeowner replied; no response |
| **Required guard checks** | do-not-contact respected; plan profile known; live sends blocked unless activation flags explicitly approved |
| **Required audit notes** | channel, attempt_count, permission_status |
| **Failure/HOLD/BLOCKED handling** | HOLD on unclear permission; STOPPED_AFTER_MAX_ATTEMPTS on max attempts |
| **Fixture examples needed** | normal lead intake to appointment readiness; activation flag false blocks live action |

### missed-lead recovery transitions

| Attribute | Detail |
| --- | --- |
| **Future trigger examples** | No response after threshold; recovery attempt started; recovery completed |
| **Required guard checks** | missed-lead recovery enabled per plan profile; do-not-contact respected; contact permission known or reviewed |
| **Required audit notes** | recovery_attempt, recovery_channel, plan_tier |
| **Failure/HOLD/BLOCKED handling** | Block recovery if Starter plan or DNC; HOLD on permission unclear |
| **Fixture examples needed** | missed-lead recovery path |

### review queue transitions

| Attribute | Detail |
| --- | --- |
| **Future trigger examples** | Roofer review needed; RoofLeadHQ review needed; review completed |
| **Required guard checks** | roofer review completed before business-judgment decisions; RoofLeadHQ/Jason review limited to system/workflow/data/routing/quality issues |
| **Required audit notes** | review_type, review_owner, review_outcome |
| **Failure/HOLD/BLOCKED handling** | HOLD until review owner assigned; BLOCKED on unresolved safety issue |
| **Fixture examples needed** | roofer-review-needed path; RoofLeadHQ system-review-needed path |

### appointment readiness transitions

| Attribute | Detail |
| --- | --- |
| **Future trigger examples** | Readiness evaluation started; readiness confirmed; readiness blocked |
| **Required guard checks** | appointment/calendar preferences known before appointment-ready status; required homeowner contact data present; service area checked |
| **Required audit notes** | readiness_blockers, calendar_preferences_known |
| **Failure/HOLD/BLOCKED handling** | APPOINTMENT_NOT_READY with documented blockers; HOLD on missing calendar preferences |
| **Fixture examples needed** | normal lead intake to appointment readiness |

### booked inspection transitions

| Attribute | Detail |
| --- | --- |
| **Future trigger examples** | Appointment booked; reminder ready; inspection completed; inspection missed |
| **Required guard checks** | APPOINTMENT_READY prerequisite; live calendar booking blocked unless live_calendar_booking_enabled approved |
| **Required audit notes** | appointment_date, calendar_owner, booking_method |
| **Failure/HOLD/BLOCKED handling** | RESCHEDULE_NEEDED on miss; APPOINTMENT_ISSUE on coordination failure |
| **Fixture examples needed** | appointment booked path; inspection completed path; inspection missed/reschedule path |

### post-inspection transitions

| Attribute | Detail |
| --- | --- |
| **Future trigger examples** | Follow-up needed; estimate needed; estimate sent; outcome recorded |
| **Required guard checks** | post-inspection follow-up enabled per plan profile; roofer review completed before business-judgment decisions |
| **Required audit notes** | inspection_outcome, estimate_status, follow_up_owner |
| **Failure/HOLD/BLOCKED handling** | NEEDS_REVIEW on unclear outcome; HOLD on missing roofer input |
| **Fixture examples needed** | post-inspection still-open path; estimate-needed / estimate-sent tracking path; homeowner follow-up needed path; roofer follow-up needed path |

### feedback transitions

| Attribute | Detail |
| --- | --- |
| **Future trigger examples** | Feedback requested; feedback captured; permission recorded |
| **Required guard checks** | feedback capture enabled per plan profile; feedback public-use permission checked before public use |
| **Required audit notes** | permission_to_use_publicly, feedback_issue_flagged |
| **Failure/HOLD/BLOCKED handling** | FEEDBACK_ISSUE_FLAGGED on quality concern; no public use without permission |
| **Fixture examples needed** | feedback captured with permission_to_use_publicly yes; feedback captured with permission_to_use_publicly no; feedback captured with permission_to_use_publicly not_asked |

### reporting/CSV transitions

| Attribute | Detail |
| --- | --- |
| **Future trigger examples** | Reporting period due; snapshot generated; CSV export ready |
| **Required guard checks** | CSV/reporting generated only from approved native records after implementation; plan profile determines field availability |
| **Required audit notes** | report_period, field_set, generation_source |
| **Failure/HOLD/BLOCKED handling** | EXPORT_HOLD on safety review; block if records not approved |
| **Fixture examples needed** | CSV/report snapshot with fake data |

### custom-review/plan upgrade transitions

| Attribute | Detail |
| --- | --- |
| **Future trigger examples** | Volume exceeds tier; 2+ locations detected; upgrade requested |
| **Required guard checks** | custom-review triggers checked; plan profile known |
| **Required audit notes** | trigger_reason, current_tier, recommended_tier |
| **Failure/HOLD/BLOCKED handling** | HOLD until Custom Review completed for 500+ leads or 2+ locations |
| **Fixture examples needed** | Custom Review trigger for 500+ leads; Custom Review trigger for 2+ locations; Starter/Growth/Elite plan profile paths |

### HOLD/BLOCKED transitions

| Attribute | Detail |
| --- | --- |
| **Future trigger examples** | Guard failure; safety risk; unapproved integration; missing review owner |
| **Required guard checks** | All guard checks; fail-closed default |
| **Required audit notes** | hold_reason, blocked_reason, resolution_path |
| **Failure/HOLD/BLOCKED handling** | HOLD for resolvable issues; BLOCKED for safety/integration blockers; rollback path defined in Phase 5 |
| **Fixture examples needed** | bad-fit/excluded path; stopped/do-not-contact path; activation flag false blocks live action |

## 7. Plan Profile Implementation Plan

Starter/Growth/Elite/Custom should eventually be implemented as **configuration profiles on one core workflow engine**. No separate workflow engines per tier.

### Future configurable properties

Plan profiles should govern:

- monthly lead volume limit
- allowed locations count
- lead source tracking depth
- missed-lead recovery enabled
- appointment readiness enabled
- post-inspection follow-up enabled
- feedback capture enabled
- reporting depth
- CSV field availability
- review queue capacity/depth
- manual outreach availability
- priority setup/support flag
- custom-review triggers
- live integration eligibility

### Profile summary

| Profile | Volume | Locations | Key features |
| --- | --- | --- | --- |
| **Starter** | up to 100 leads/month | single location | core response/follow-up, basic appointment tracking, limited CSV |
| **Growth** | up to 300 leads/month | single location | missed-lead recovery, post-inspection follow-up, expanded reporting |
| **Elite** | up to 500 leads/month | single location | full feature set, feedback capture, deeper CSV/reporting |
| **Custom Review** | 500+ leads/month or 2+ locations | multi-location | custom configuration after review; HOLD until reviewed |

One core workflow engine. Plan profiles govern behavior, reporting depth, feature flags, and upgrade/custom-review triggers.

## 8. Fillout / Guided Setup to Native Config Mapping

Fillout should not become the workflow brain. It supplies intake/setup data for native configuration.

| Fillout / Guided Setup input | Native configuration target |
| --- | --- |
| monthly lead volume | plan_profile and usage_volume_record |
| company/contact basics | roofer_account |
| lead sources | lead_source settings |
| CRM/reporting needs | report_snapshot/csv_export configuration |
| locations/service areas | routing/custom review rules |
| phone/calendar setup | appointment readiness configuration |
| human review/escalation owner | review_queue configuration |
| post-inspection preference | post_inspection feature flag |
| feedback preference | feedback feature flag |
| photo handling preference | status fields only |
| unsupported/later-only requests | HOLD/BLOCKED/custom review |
| messaging compliance | safety_gate/contact permission guard |
| report recipients | reporting configuration |
| final plan-fit summary | plan_profile/custom review outcome |

## 9. Lindy Bridge Implementation Boundary

Future Lindy handling during native engine build:

- Lindy may temporarily help with low-volume early workflows.
- Existing Lindy workflows may remain while native engine is built.
- Major new workflow logic should not be built in Lindy.
- Lindy should never be the authoritative record store.
- Lindy should not own final CSV/reporting.
- Lindy should not own multi-roofer routing.
- Lindy should not own live-send authority long term.
- If used, Lindy bridge outputs should be treated as inputs/notes to be reviewed and recorded in native source-of-truth records after implementation.
- **n8n/Make are not required unless a narrow temporary bridge is needed.**

Lindy remains temporary bridge only, not long-term source of truth.

## 10. Activation Flag Implementation Plan

Future activation flags control live channel and integration behavior. All flags remain disabled unless Jason explicitly approves activation.

### Flags

| Flag | Purpose | Default |
| --- | --- | --- |
| `live_sms_enabled` | Twilio SMS sends | false |
| `live_vapi_calls_enabled` | Vapi outbound calls | false |
| `live_resend_email_enabled` | Resend email sends | false |
| `live_calendar_booking_enabled` | Google Calendar booking | false |
| `live_lindy_bridge_enabled` | Lindy bridge live execution | false |
| `live_scheduler_enabled` | Scheduler/cron activation | false |
| `live_csv_export_enabled` | Production CSV generation | false |
| `live_crm_handoff_enabled` | CRM handoff (unsupported/later-only) | false |
| `live_payment_or_invoice_enabled` | Payment/invoice (unsupported/later-only) | false |

### Rules

- default false
- explicit Jason approval required
- environment-specific
- audit event required for any change
- rollback plan required
- fixture/sandbox tests required before live use
- live sends must fail closed if flag is false
- payment/invoice/estimate flags remain unsupported/later-only

## 11. Fixture Test Implementation Plan

Initial fake-data fixture tests needed before schema or live activation work:

| Fixture path | Validates |
| --- | --- |
| normal lead intake to appointment readiness | Intake → response → readiness transitions |
| missing info path | MISSING_INFO state and guard failure |
| duplicate review path | DUPLICATE_REVIEW routing |
| bad-fit/excluded path | BAD_FIT_OR_EXCLUDED and service area guard |
| stopped/do-not-contact path | STOPPED_DO_NOT_CONTACT and DNC guard |
| missed-lead recovery path | Recovery branch with plan profile gate |
| roofer-review-needed path | Review queue roofer ownership |
| RoofLeadHQ system-review-needed path | System-quality review limitation |
| appointment booked path | Booked inspection tracking |
| inspection completed path | Post-inspection transition |
| inspection missed/reschedule path | INSPECTION_MISSED / RESCHEDULE_NEEDED |
| post-inspection still-open path | STILL_OPEN outcome tracking |
| estimate-needed / estimate-sent tracking path | Manual estimate tracking (roofer-owned estimate steps) |
| homeowner follow-up needed path | HOMEOWNER_FOLLOW_UP_NEEDED state |
| roofer follow-up needed path | ROOFER_FOLLOW_UP_NEEDED state |
| feedback captured with permission_to_use_publicly yes | Public-use permission granted |
| feedback captured with permission_to_use_publicly no | Public-use permission declined |
| feedback captured with permission_to_use_publicly not_asked | Permission not yet asked |
| CSV/report snapshot with fake data | Reporting from fixture records |
| Starter plan profile path | Starter feature flags and limits |
| Growth plan profile path | Growth feature flags including recovery |
| Elite plan profile path | Elite full feature set |
| Custom Review trigger for 500+ leads | Volume HOLD until Custom Review |
| Custom Review trigger for 2+ locations | Location HOLD until Custom Review |
| activation flag false blocks live action | Fail-closed live send guard |

All fixture tests use fake data only. No production reads/writes. No external calls.

## 12. Security / Schema / RLS Blockers Before Implementation

The following blockers must be reviewed before any schema, migrations, auth, RLS, or security implementation:

| Blocker | Description |
| --- | --- |
| tenant isolation design | Multi-roofer data separation model |
| row-level security policy design | Supabase RLS policies per entity |
| contractor/customer account boundary | Roofer tenant vs homeowner data boundary |
| homeowner personal information classification | PII handling and minimization |
| audit trail design | State transition and review audit requirements |
| review queue access boundaries | Who can see/act on review items |
| report/CSV access boundaries | Export authorization and field visibility |
| retention/deletion/export process | Data lifecycle and deletion rights |
| secrets/env review | Credential and environment separation |
| vendor/processor review | Third-party data processor alignment |
| auth/session model | Authentication and session boundaries |
| least-privilege access model | Role-based access for operators and roofers |
| multi-roofer scale blocker | Scale readiness before multi-tenant production |
| production lead data write approval gate | Explicit approval before production writes |

**No schema, migrations, auth, RLS, or security implementation should happen until these are reviewed.**

## 13. First Paid Roofer Launch Relationship

- First paid roofer can still use manual/founder-operated bridge path.
- Native implementation should not block first paid roofer outreach/onboarding unless safety requires it.
- First-roofer operations should inform fixture cases and state-transition priorities.
- Roofer review remains the default for business judgment.
- RoofLeadHQ/Jason review remains system/workflow/data/routing/quality only.
- Live automation remains disabled unless explicitly approved.
- Lindy may assist only as temporary bridge where useful.

## 14. Reporting / CSV Implementation Dependency

- CSV export readiness already defines field groups and boundaries in `docs/CSV_EXPORT_READINESS_PACKET.md`.
- Reporting/CSV should eventually generate from native source-of-truth records.
- CSV remains one-directional manual CRM/reference/reporting use.
- No bidirectional CRM integration.
- No production CSV generation by this packet.
- Customer is responsible for downloaded/exported data.
- ROI depends on customer-provided spend/source data.

CSV export is not bidirectional CRM integration. CSV does not replace the roofer's CRM. CSV does not push data back to RoofLeadHQ. CSV does not auto-update based on downloaded file changes. CSV remains one-directional reporting/manual CRM/reference use.

## 15. Future Implementation Sequencing

Recommended implementation sequence:

1. Resolve security/tenant isolation prerequisites before persistent native schema.
2. Create fixture-only state model using fake data.
3. Add plan profile fixture config.
4. Add transition guard fixture tests.
5. Add review queue fixture model.
6. Add appointment readiness fixture model.
7. Add post-inspection/feedback fixture model.
8. Add reporting/CSV fake-data snapshot fixture.
9. Prepare schema/RLS/security implementation review.
10. Implement approved native persistence only after review.
11. Rehearse first paid roofer manual-to-native handoff.
12. Consider sandbox/test-mode integrations one channel at a time.
13. Require explicit approval for any live activation.
14. Activate one channel or workflow at a time with rollback/HOLD/BLOCKED path.

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
- native workflow engine
- Supabase source of truth
- plan configuration profiles
- staged E2E testing
- manual bridge
- implementation plan
- readiness only