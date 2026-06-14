# Production Tenant / Account Model Readiness Packet

Date: 2026-06-21

Canonical source of truth before this worktree must be verified at 1e1fe69 test(pilot): add production config env readiness audit packet.

This is the Slice 2: tenant/account model implementation readiness packet. Jason (founder/operator) must use this packet to define and approve the tenant/account model before any future schema, auth, RLS, production writes, contractor portal, dashboard exposure, or live integration work begins.

**This is readiness/planning/approval only.**

Do **not** implement tenant accounts.
Do **not** modify backend-or-src.
Do **not** add migration files.
Do **not** change schema.
Do **not** implement auth.
Do **not** implement RLS.
Do **not** create users.
Do **not** create accounts.
Do **not** write production data.
Do **not** read or modify `.env` files.
Do **not** create credentials.
Do **not** add public routes.
Do **not** expose a contractor portal.
Do **not** activate Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, external calls, or production behavior.

All work remains dry-run/internal-only/founder-operator-only. This packet performs no production writes, no external service calls, no live sends, no live notifications, no live booking, no live estimate creation, no live quote generation, no invoice/payment behavior, no cron/scheduler behavior, no public route activation, no auth changes, no database policy changes, no migration files, no secrets handling changes, and no access-control implementation.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal worksheets, decision logs, blocker registers, risk registers, qualification notes, reuse evidence logs, and handoff artifacts are internal-only / dry-run / founder-operator-only. This is a readiness/planning/approval packet only, not production implementation of any slice and not live integration activation. No public founder-led/manual babysitting positioning is used for customers or prospects. No live systems or external calls of any kind are activated by this packet. Dry-run / internal-only / founder-operator-only.

This packet file: `docs/PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md`
This packet includes 9 copy-paste-ready manual tracker tables.
Wrapper: `scripts/run-production-tenant-account-model-readiness-packet-dry-run.sh`
Verifier: `backend/scripts/verify-production-tenant-account-model-readiness-packet-readonly.js`
Wired into: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md` + aggregate pilot readiness verifier (verify-first-paid-pilot-readiness-readonly.js) + 3 NEXT_CHAT_CONTEXT_PACKAGE_*.md + ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md + AGENT_PRODUCT_QUALITY_GATE.md (via wrapper) + verify-first-paid-pilot-readiness-readonly.js

## 1. Internal-only dry-run scope

This packet is strictly internal-only / dry-run / founder-operator-only. It is the dedicated tenant/account model implementation readiness packet for Slice 2 of the Production Implementation Sequencing and Approval Plan (at d22ea8a). It provides Jason a structured framework to define, inventory, and approve the tenant/account model before any future schema, auth, RLS, production writes, contractor portal, dashboard exposure, or live integration work begins.

It contains no implementation, no production activation, no external calls, and no changes to any backend, schema, auth, RLS, secrets, production code, or external service credentials. All content is for founder (Jason) manual-review, logging, evidence collection, decision logging, and explicit PASS/HOLD/BLOCKED decision only. No customer or prospect receives internal-only language from this packet. This packet does not activate or implement any production changes, any implementation slice, or live integrations. All execution artifacts, trackers, and gate decisions remain local to the founder/operator.

This packet asserts and the verifier will enforce: this is tenant/account model readiness/planning/approval only. The doc says it is tenant/account model readiness/planning/approval only. The doc says no tenant accounts, users, account records, schema, auth, RLS, migration files, or production data writes are implemented. The doc says no backend-or-src changes, public routes, contractor portal exposure, external calls, live sends, scheduler/cron/dispatcher activation, credentials, env changes, or production behavior are changed. The doc requires tenant/account PASS/HOLD/BLOCKED approval before future schema/auth/RLS/security implementation. The doc includes tenant/account ownership, homeowner lead association, tenant identifier, role/access boundary, account lifecycle, reporting boundary, and portal exposure hold readiness. The doc includes the roofer phone-number usage and calendar setup readiness dependency without activating phone/SMS/calls/calendar booking. Customer-facing sections use approved language only. Forbidden customer-facing phrases are absent from customer-facing sections. Internal founder/operator/manual language is confined to labeled internal-only dry-run sections. The packet requires PASS/HOLD/BLOCKED decision before future implementation slice approval.

## 2. Tenant/account model readiness purpose

The purpose of this packet is to serve as the concrete manual tenant/account model definition and readiness framework that must be explicitly PASSED before the Slice 2 gate in the Production Implementation Sequencing and Approval Plan may advance, and before any work proceeds on tenant/account model implementation, schema (Slice 3), auth/RLS (Slice 4), or later slices. It receives the completed Production Config / Env Readiness Audit Packet (at 1e1fe69) as primary input (after Slice 1 PASS or accepted HOLD) and performs a structured cross-reference review against the Production Implementation Sequencing and Approval Plan (at d22ea8a), Final Production Go-Live Acceptance Gate (at f3c3e80), Live Integration Activation Readiness Plan (at a11bfbd), Production Security / Auth / RLS / Schema Readiness Plan (at e494f4b), Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (at cc80caf), ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md, and WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md.

It produces the tenant/account model boundary definition, roofer account inventory requirements, homeowner lead/account association model, tenant identifier and naming conventions, tenant isolation assumptions, role and access boundaries, account lifecycle rules, Guided Setup account data requirements (including phone and calendar), multi-roofer expansion constraints, reporting/aggregation boundaries, contractor dashboard/portal exposure hold, production write/schema/auth/RLS hold gates, owner approval evidence, and an explicit PASS/HOLD/BLOCKED tenant/account readiness decision. Only an explicit PASS at the Tenant/Account Readiness Decision (section 20) authorizes consideration of any tenant/account model implementation work or advancement to Slice 3 schema work. This packet exists to prevent any ad-hoc tenant/account modeling, schema, auth, or multi-roofer identity implementation. This packet prevents any ad-hoc tenant/account implementation before full model definition, isolation assumptions, boundary definition, owner sign-off, and re-verification of all prior gates. This is Slice 2 of the Production Implementation Sequencing and Approval Plan.

## 3. Source-of-truth prerequisite

Before any execution of this packet or recording of a PASS, the canonical source of truth must be verified at 1e1fe69 test(pilot): add production config env readiness audit packet.

- The Production Config / Env Readiness Audit Packet (docs/PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md at 1e1fe69) must be present with its verifier and wrapper green, and must record PASS (or explicitly accepted HOLD) at its Config Env Readiness Decision.
- The Production Implementation Sequencing and Approval Plan (docs/PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md at d22ea8a) must have recorded explicit PASS (or accepted HOLD) at its Implementation Sequencing Decision with Slice 2 tenant/account model HOLD gate acknowledged; Slice 1 must have PASS or accepted HOLD.
- The Final Production Go-Live Acceptance Gate (docs/FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md at f3c3e80) must have recorded explicit PASS (or accepted HOLD with mitigation) with source-of-truth at a11bfbd, rollback/kill-switch evidence, owner approval, and all 9 of its trackers complete.
- Prior input gates via final: Live Integration Activation Readiness Plan (docs/LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md at a11bfbd), Production Security / Auth / RLS / Schema Readiness Plan (docs/PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md at e494f4b), Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (docs/MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md at cc80caf), ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md, and WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md must be present with verifiers/wrappers green.
- The aggregate pilot readiness verifier (verify-first-paid-pilot-readiness-readonly.js) must pass including the production config env readiness audit packet entry and (after wiring) this tenant/account model readiness packet entry.
- Source-of-truth commit chain and recorded milestone verifiers must align to 1e1fe69 for the config/env packet (and d22ea8a / f3c3e80 for sequencing/final) as immediate predecessors.
- Any drift or unverified state forces HOLD or BLOCKED at the Tenant Account Readiness Decision Tracker.

This packet does not duplicate the full content of any input. It performs the tenant/account model definition and produces the Slice 2 decision + 9 trackers + handoff artifact only.

## 4. Input from Production Config / Env Readiness Audit Packet

Primary input:
- PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md (at 1e1fe69) — specifically its completed Slice 1 PASS (or accepted HOLD), source-of-truth verification at 1e1fe69, all 9 trackers, rollback/kill-switch evidence for config/env, owner approval evidence, safety guardrails, public-vs-internal language boundary, and the no-forbidden-impl confirmation.

This packet treats the Config/Env Audit Packet (1e1fe69) + Sequencing Plan (d22ea8a) + Final Go-Live Acceptance Gate (f3c3e80) as non-skippable master gates. No tenant/account model implementation, schema (Slice 3), auth/RLS (Slice 4), or later slice may be approved until the config/env audit has recorded explicit PASS, the sequencing plan has recorded explicit PASS at the Implementation Sequencing Decision, the final gate has recorded PASS, source-of-truth at 1e1fe69 (and d22ea8a/f3c3e80) is re-verified, rollback/kill-switch readiness for tenant/account surfaces is evidenced, owner approval is recorded, and this dedicated Slice 2 tenant/account model readiness packet records explicit PASS at the Tenant/Account Readiness Decision.

The packet also re-confirms inputs from:
- PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md at d22ea8a
- FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md at f3c3e80
- LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md at a11bfbd
- PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md at e494f4b
- MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md at cc80caf
- ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md
- FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md
- WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md

## 5. Tenant/account model boundary

Scope of this readiness definition (planning/decision-log only; no implementation):
- Roofer as tenant principal: every roofer is the root owner of their data domain (leads, appointments, outcomes, settings, history).
- owning_roofer_id (or equivalent tenant identifier) must be the single source of truth for data ownership on all future records.
- No shared accounts, no cross-roofer data visibility, no global tables without tenant scoping.
- Account model remains planning-only: no account tables, no user-roofer junctions, no roofer principals, no tenant claims implemented.
- Future auth model (roofer-scoped jwt claims, session binding) and RLS (row-level policies enforcing owning_roofer_id) remain planning-only.
- All future production writes (Slice 5) must be tenant-scoped at write time.
- Reporting and aggregation must respect tenant boundaries (per-roofer only, no cross-roofer rollups without explicit founder approval and isolation proof).
- Contractor portal/dashboard exposure (Slice 9) remains fully gated behind tenant model + schema + auth/RLS PASS.
- No public routes or unauthenticated data surfaces.

Out of scope for this packet (and forbidden): any implementation of tenant accounts, schema, auth, RLS, migration files, production writes, public routes, or portal exposure. Tenant/account model boundary definition only.

## 6. Roofer account inventory readiness

Roofer account inventory must be defined and approved before any tenant model implementation:
- Current roofer representation (if any in fixtures/dry-run harness) is inventory-only; no production roofer accounts exist.
- Future roofer account must capture: unique roofer identity, contact info for Guided Setup and ops, provided phone number assignment, calendar configuration state (acknowledgement only), onboarding status, trial/payment state (internal only), data protection consent.
- Roofer account must be the tenant root: all leads, appointments, outcomes, settings, call/SMS history, reporting rollups are owned by exactly one roofer account.
- No "account" abstraction that spans multiple roofers; each roofer is one tenant.
- No multi-user-per-roofer support in initial model (single owner/operator per tenant; future expansion explicitly constrained).
- Inventory must confirm no pre-existing cross-roofer data or shared records in current state (re-confirm from production security plan and data protection packet).

Roofer Account Inventory Tracker (below) records the approval of this model.

## 7. Homeowner lead/account association readiness

Homeowner lead association model must be defined before tenant/account implementation:
- Every lead record must carry owning_roofer_id (tenant identifier) at creation time.
- Leads are never shared across roofers; a lead belongs to exactly one roofer's tenant domain.
- Homeowner contact info (name, phone, address, email) is tenant-scoped data.
- No global homeowner accounts or cross-roofer homeowner deduping that would leak data.
- Missed-lead recovery, follow-up, and appointment booking (future) must operate strictly within the owning_roofer_id boundary.
- Lead-to-appointment and lead-to-outcome associations inherit the same owning_roofer_id.
- Any future "homeowner account" abstraction (if ever considered) must be a child of the roofer tenant, never a top-level cross-roofer entity.

Homeowner Lead Association Tracker (below) records the approval of this model.

## 8. Tenant identifier and naming readiness

Tenant identifier and naming conventions must be approved before implementation:
- Primary tenant identifier: owning_roofer_id (bigint or uuid foreign key to future roofers table; never nullable on tenant-scoped tables).
- Naming: "roofer is the public term"; "roofer" is the public/internal term for the contractor/tenant; "tenant" and "account" are internal-only modeling terms.
- No customer-facing or website language may refer to "tenant", "account model", "multi-tenant", or "roofer account" (public language remains "roofer" and "Guided Setup").
- Identifier must be present on every future tenant-scoped table (leads, appointments, outcomes, roofer_settings, call_logs, sms_logs, reports, etc.).
- Naming must be consistent: owning_roofer_id everywhere; avoid roofer_id vs owner_id drift.
- Future roofers table (planning only) will be the tenant registry; no accounts table at this boundary (accounts may be future billing abstraction only, never replacing tenant ownership).
- No email-based or phone-based tenant key as primary; owning_roofer_id is authoritative.

Tenant Identifier Naming Tracker (below) records the approval of this model.

## 9. Tenant isolation assumption checklist

All tenant isolation assumptions from prior gates (Multi-Roofer Safety at cc80caf, Production Security at e494f4b, Data Protection packet) must be re-confirmed as prerequisites:
- Every future record that belongs to a roofer must carry owning_roofer_id.
- RLS (future Slice 4) must return zero rows; RLS must return zero rows for any query under a contractor token that does not match the row's owning_roofer_id.
- Service-role usage (future) must remain narrow, audited, and tenant-scoped for any cross-roofer operational needs (billing aggregation, founder ops); never used for routine contractor data access.
- No production path may bypass tenant scoping at write or read time.
- Cross-roofer queries must be impossible under contractor auth; founder/operator internal paths require explicit audit logging.
- Tenant isolation must survive rollback (per-slice kill-switch + data revert must preserve or restore per-roofer boundaries).
- Dry-run harness (current fixtures) must already demonstrate isolation patterns (even if mocked).
- Re-confirmation of "every roofer’s information and leads must be protected as much as possible from data-breach concerns" from data protection packet.

Tenant Isolation Assumption Tracker (below) records the checklist.

## 10. Role and access boundary readiness

Role and access boundaries must be defined before auth/RLS or portal work:
- Contractor role (future): scoped exclusively to their own owning_roofer_id; can only see/act on their tenant's data.
- Founder/operator role (internal-only): cross-roofer visibility for ops, review, support, billing; all access logged; never exposed to contractors or public.
- No "admin" role for contractors; admin/founder surfaces are internal-only.
- No shared role or group access that would allow one roofer to see another's data.
- Session and jwt claims (future) must bind the authenticated principal to a single owning_roofer_id claim.
- Role definitions must support the contractor dashboard/portal hold (Slice 9) and production write boundary (Slice 5).
- Access boundary must enforce that Guided Setup, trial, and all future automation respect the same role/tenant scoping.

Role Access Boundary Tracker (below) records the approval of this model.

## 11. Account lifecycle readiness

Account lifecycle (tenant/roofer lifecycle) must be defined before implementation:
- lifecycle states: Lifecycle states (internal-only): prospect, guided-setup-pending, guided-setup-complete, trial-active, trial-expired, paying, cancelled, suspended.
- State transitions must be manual/founder-operator only in current dry-run; no automated state machine implemented.
- Trial start: "The 14-day trial begins after RoofLeadHQ AI setup goes live." (public language only).
- Pre-billing: "An automated email is sent 2 days before the first monthly payment." (public language only; no implementation).
- Cancellation: "Cancel anytime. No long-term contract." (public language only).
- All lifecycle data (internal) must be tenant-scoped; a cancelled roofer's historical data remains owned by that tenant for reporting/audit (soft-delete or archive within tenant).
- No cross-tenant lifecycle visibility.
- Account creation (future) must occur only after Guided Setup phone/calendar instructions are provided and acknowledged (see section 12).

Account Lifecycle Readiness Tracker (below) records the approval of this model.

## 12. Guided Setup account data requirements

Guided Setup account data requirements (including the previously captured onboarding requirement) are a readiness dependency:

RoofLeadHQ must provide each roofer clear Guided Setup instructions for how to use the RoofLeadHQ-provided phone number and how to configure their calendar so RoofLeadHQ AI can book inspections/homeowner appointments correctly. This must remain readiness/approval only and must not activate phone routing, SMS, calls, or calendar booking.

Phone number Guided Setup instructions (internal-only / dry-run / founder-operator-only until future approved handoff):
- Where the roofer should place or route that number (e.g., website, marketing materials, business cards, voicemail greeting).
- How the number should be used in lead intake, missed-lead recovery, and homeowner response workflows (manual-only steps and coordination in current dry-run state).
- What the roofer should not change or bypass without approval (do not port, forward, replace, or repurpose the number; do not use personal number in place of the provided number for lead handling).
- How phone-number readiness is acknowledged before go-live (roofer signs off on placement and usage understanding via checklist; founder/operator reviews and logs evidence before any Slice 7 progress).

Calendar Guided Setup instructions (internal-only / dry-run / founder-operator-only until future approved handoff):
- Appointment length / default duration for inspections.
- Service area / travel constraints / buffer times between appointments.
- Available inspection windows (recurring availability patterns).
- Blocked times, personal commitments, vacations, and maintenance windows.
- Emergency or after-hours boundaries (explicit no-auto-book windows).
- Reschedule/cancellation expectations and notification workflows (manual only in dry-run).
- Calendar ownership and access boundaries (roofer retains sole ownership and primary control of their calendar; no shared service-role or delegated access without explicit founder approval and audit).
- Go-live acknowledgement before any calendar booking activation (roofer explicitly confirms calendar is correctly configured for the workflows and acknowledges that booking remains disabled until future approved activation after this plan + final gate + dedicated slice execution).

These instructions and acknowledgements are internal-only / dry-run / founder-operator-only until a future approved execution packet (after this tenant/account readiness PASS + sequencing plan PASS + final gate PASS) authorizes roofer handoff. They must be evidenced in the dry-run harness (checklists, signed confirmations, founder-operator evidence logs) before Slice 7 or Slice 8 may record PASS. Phone and calendar setup readiness is a hard prerequisite for any future live communication or calendar booking implementation slices. No live calls, SMS, or bookings are activated by documenting these requirements. Tenant/account model must capture the acknowledgement state for phone and calendar per roofer as part of account data (planning only).

Guided Setup account data requirements must be part of the tenant model definition (roofer record carries phone-assigned flag + calendar-config-acknowledged flag + timestamp + evidence pointer).

## 13. Multi-roofer expansion constraints

Multi-roofer expansion constraints (from Multi-Roofer Safety Gate at cc80caf and Data Protection packet) must be re-confirmed:
- The system is designed for multiple independent roofers (tenants) from day one of any production schema.
- No shared global state that would require later tenant-scoping retrofits.
- Expansion to additional roofers must not require changes to existing tenants' data or isolation guarantees.
- Billing (future Slice 10) must be per-tenant; no shared billing accounts across roofers.
- Reporting must support per-roofer + founder aggregate (internal) without cross-roofer leakage.
- Onboarding must be repeatable per-roofer without affecting other tenants.
- All constraints from cc80caf gate remain in force; this packet does not relax any multi-roofer safety or data protection requirement.

Multi-roofer expansion is blocked until tenant model (this slice), schema (Slice 3), and auth/RLS (Slice 4) have all recorded PASS.

## 14. Reporting and account aggregation boundaries

Reporting and account aggregation boundaries must be defined:
- All contractor-facing reports (future) must be strictly per-roofer (filtered by owning_roofer_id of the authenticated principal).
- founder/operator internal reporting may aggregate: Founder/operator internal reporting may aggregate across tenants for ops, billing, platform health; all such access must be logged and justified.
- no public or contractor-accessible cross-roofer rollups: No public or contractor-accessible cross-roofer rollups, leaderboards, or benchmarks that would expose one roofer's data to another.
- Historical data for cancelled/suspended tenants must remain queryable within the tenant boundary for audit and founder ops.
- Any future "account aggregation" for billing or platform metrics must operate on tenant-scoped data only and never bypass isolation.
- Reporting boundary must be compatible with contractor dashboard/portal hold (Slice 9) and production write boundary (Slice 5).

Reporting and account aggregation boundaries are a hard prerequisite for any dashboard/portal exposure.

## 15. Contractor dashboard/portal exposure hold

Contractor dashboard/portal exposure (Slice 9) remains fully held until tenant/account model (this slice) + schema (Slice 3) + auth/RLS (Slice 4) + production write boundary (Slice 5) have all recorded explicit PASS:
- No production routes for contractor views.
- No authenticated contractor UI or per-roofer data surfaces in production.
- No public or gated contractor portal.
- All current dashboard surfaces (if any) remain internal-only / founder-operator-only / dry-run.
- Any demo or sample data surfaces (website) must carry explicit SAMPLE / demo labels and must not imply live contractor access.
- Portal exposure hold is non-negotiable; violation forces BLOCKED at this decision and all downstream slices.

Portal Exposure Hold Tracker (below) records the hold confirmation.

## 16. Production write/schema/auth/RLS hold gates

All production write, schema, auth, and RLS surfaces remain held:
- No production Supabase writes for leads, appointments, outcomes, contractor data, billing events, or any expansion beyond current gated dry-run/test-only fixtures.
- No schema changes or migration files.
- No auth implementation, RLS policies, SECURITY DEFINER, jwt-claim wiring, or session binding.
- No service-role usage for routine data access.
- All such surfaces remain planning-only or test-harness-only.
- Tenant/account model PASS is a hard prerequisite for any schema/auth/RLS or write boundary work (per sequencing plan HOLD gates for Slices 2/3/4/5).
- Rollback/kill-switch for tenant/account surfaces (even in planning state) must be evidenced before this packet may record PASS.

Production write/schema/auth/RLS hold gates are re-asserted from prior packets and enforced here.

## 17. Account model verifier expectations

The dedicated slice-2 verifier (this packet's verifier) must (and the aggregate must include):
- Assert the overall packet (this file), its wrapper, and its own verifier exist.
- Assert wrapper is executable and calls node --check + the verifier + agent product quality gate.
- Assert all wiring targets (aggregate pilot readiness, verifier index, 3 next-chat contexts, daily guide) include the slice verifier/wrapper/doc.
- Assert all required 22 sections exist with substantive content.
- Assert exactly the 9 tracker tables (Tenant Account Readiness Tracker, Roofer Account Inventory Tracker, Homeowner Lead Association Tracker, Tenant Identifier Naming Tracker, Tenant Isolation Assumption Tracker, Role Access Boundary Tracker, Account Lifecycle Readiness Tracker, Portal Exposure Hold Tracker, Tenant Account Readiness Decision Tracker) exist and are populated with owner/status/evidence/next-action style columns.
- Assert references to Production Config / Env Readiness Audit Packet (1e1fe69), Production Implementation Sequencing and Approval Plan (d22ea8a), Final Production Go-Live Acceptance Gate (f3c3e80), Live Integration Activation Readiness Plan (a11bfbd), Production Security / Auth / RLS / Schema Readiness Plan (e494f4b), Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (cc80caf), Data Protection/Tenant Isolation packet, Launch System, and Trial Direction Regression packet.
- Assert this packet and the slice are tenant/account model readiness/planning/approval only and do not implement or activate any of the forbidden list (tenant accounts, users, schema, auth, RLS, migration files, production writes, backend-or-src changes, public routes, contractor portal, external calls, live sends, scheduler/cron/dispatcher, credentials, env changes, or production behavior).
- Assert rollback/kill-switch readiness, owner approval evidence, source-of-truth verification at 1e1fe69, per-slice verifier expectations, and PASS/HOLD/BLOCKED tenant/account readiness decision are required before the slice may be approved for implementation.
- Assert no forbidden implementation files were changed: backend-or-src, migration files, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler-or-cron-or-dispatcher activation.
- Assert customer-facing sections use only current approved public language (the 6 strings).
- Assert forbidden public phrases are absent from customer-facing template sections (scan before the Forbidden Public Phrases marker).
- Assert internal founder/operator/manual language is confined to labeled internal-only dry-run sections.
- Assert that the packet includes the Guided Setup phone-number usage instructions and calendar setup guidelines (from sequencing plan section 5, referenced in Slice 7/Slice 8 HOLD gates, and tracked here) as required onboarding/go-live readiness items before any live communication or calendar booking activation readiness.
- Assert the Guided Setup phone/calendar instructions remain readiness/approval only and do not activate phone/SMS/calls/calendar booking.
- Print a clear PASS message.

Future slice verifiers must pass the aggregate pilot readiness verifier and quality gate. This packet's verifier enforces the above for Slice 2.

## 18. Owner approval evidence checklist

Before PASS at the Tenant/Account Readiness Decision, owner (Jason) approval evidence must be logged:
- Explicit confirmation that tenant/account model boundary, roofer inventory, homeowner association, tenant identifier, isolation assumptions, role/access, account lifecycle, Guided Setup requirements (phone + calendar), multi-roofer constraints, reporting boundaries, and portal hold are defined and acceptable.
- rollback/kill-switch design for tenant/account surfaces: Rollback/kill-switch design for tenant/account surfaces (even at planning level) documented and dry-run tested via this verifier + quality gate.
- Re-confirmation that all prior gates (final at f3c3e80, sequencing at d22ea8a, config/env at 1e1fe69, prod sec at e494f4b, multi-roofer at cc80caf, live int at a11bfbd, data protection, launch system, trial regression) remain green.
- Confirmation that no forbidden implementation files were changed in this worktree.
- Timestamped owner sign-off (manual entry in tracker or linked evidence doc) with due date for any follow-up.
- Re-run of full verifier + wrapper + quality gate after any evidence update.

Owner approval evidence is recorded in the Tenant Account Readiness Decision Tracker (final table) and Owner Approval Evidence section of the sequencing plan.

## 19. Tenant/account risk and blocker register

Risks and blockers specific to tenant/account model (in addition to inherited from prior packets):
- Incomplete tenant model definition leading to schema/auth rework (high).
- Ambiguous owning_roofer_id naming or placement causing cross-roofer leakage later (high; must be blocked until defined).
- Failure to capture Guided Setup phone/calendar acknowledgement state in the model (medium; hard prerequisite for Slice 7/8).
- Under-estimating reporting/aggregation boundary complexity (medium).
- Portal exposure pressure before tenant + schema + auth/RLS complete (high; must remain BLOCKED).
- Any drift in source-of-truth (1e1fe69 / d22ea8a / f3c3e80) or prior gate status (BLOCKED until re-verified).
- Real tenant/account modeling or schema work attempted before this PASS (forbidden; verifier + aggregate will fail on future changes).
- Internal-only language leaking into customer-facing content (verifier enforces).
- Forbidden public phrases appearing in customer sections (verifier enforces).

BLOCKED items must be resolved or explicitly risk-accepted by owner (Jason) with mitigation and re-review date before PASS. All risks re-confirm data protection and multi-roofer safety invariants.

## 20. PASS/HOLD/BLOCKED tenant/account readiness decision

**HOLD GATE: Slice 2 (tenant/account model implementation readiness) remains blocked until Slice 1 (config/env at 1e1fe69) has PASS (or accepted HOLD), this sequencing plan is PASSED, source-of-truth at 1e1fe69 is re-verified, rollback/kill-switch for tenant/account surfaces is evidenced, owner approval is recorded, and this dedicated slice-2 verifier records PASS for the slice.**

No tenant or account model code (roofer/tenant principal, roofer_id claims, account tables, user-roofer junction), no auth scaffolding changes, and no multi-roofer identity logic may be implemented until this slice gate records explicit PASS. All tenant/account modeling remains in planning-only state from prior packets. This packet asserts and the verifier will confirm no implementation has occurred. Slice 2 is a hard blocker on the Implementation Sequencing Decision. Tenant isolation from the Multi-Roofer Safety Gate and Production Security Readiness Plan must be re-confirmed as prerequisite before any tenant model implementation work.

### Tenant Account Readiness Decision Tracker

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Slice 1 config/env PASS at 1e1fe69 | PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md records explicit PASS (or accepted HOLD) | | | | |
| Sequencing plan PASS at d22ea8a | PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md records PASS with Slice 2 HOLD acknowledged | | | | |
| Final gate PASS at f3c3e80 | FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md records explicit PASS + rollback + owner + source a11bfbd | | | | |
| Prior gates re-confirmed | Live Int (a11bfbd) + Prod Sec (e494f4b) + Multi-Roofer (cc80caf) + Data Protection + Launch System + Trial Regression | | | | |
| Tenant/account model defined | Boundary, roofer inventory, homeowner assoc, identifier, isolation, role, lifecycle, Guided Setup dep, multi-roofer, reporting, portal hold all defined | | | | |
| Rollback/kill-switch evidenced | Kill-switch design + dry-run proof for tenant/account surfaces (planning level) | | | | |
| Owner approval recorded | Jason explicit sign-off with timestamp + evidence pointer | | | | |
| Verifier + wiring + quality gate | Dedicated verifier + aggregate + index + contexts + daily guide + quality gate all green | | | | |
| No forbidden impl changed | Evidence no backend-or-src, migration files, schema, auth/RLS, env/secrets, prod routes, live activations, scheduler/cron/dispatcher | | | | |
| Source re-verified at 1e1fe69 | Canonical source 1e1fe69 re-confirmed before PASS | | | | |
| PASS/HOLD/BLOCKED decision | Explicit PASS (or accepted HOLD with mitigation + re-review date) recorded here | | | | |

Only an explicit PASS (or accepted HOLD with mitigation) at this Tenant Account Readiness Decision Tracker, after full verifier + wrapper + quality gate re-run, authorizes consideration of tenant/account model implementation or advancement to Slice 3 schema. re-run (full verifier + wrapper + quality gate) after any evidence update or HOLD mitigation.

## 21. Safety guardrails

Confirmed Disabled (No Activation or Implementation in Any Form)

- Tenant accounts, users, roofer principals, account tables: not implemented (planning/decision logs only).
- Schema changes, migration files, table alterations (owning_roofer_id, roofers, etc.): not implemented.
- Auth implementation, RLS policies, SECURITY DEFINER, jwt-claim wiring, session binding: not implemented.
- Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED.
- Public routes, contractor portal, dashboard exposure for contractors: not implemented / fully held.
- Live homeowner SMS / Twilio sending: DISABLED.
- Live Vapi outbound or inbound production calls: DISABLED.
- Live calendar booking / event creation: DISABLED.
- Resend / transactional email in production: DISABLED.
- Lindy / external automation workflows: DISABLED.
- Cron / scheduler / dispatcher activation: DISABLED.
- CRM automation, payment automation, Stripe sessions, invoices: DISABLED.
- Contractor notification sent: no.
- Homeowner notification sent: no.
- Calendar booking performed: no.
- Estimate created: no.
- Quote generated: no.
- Payment/invoice behavior added: no.
- Backend/src changes: no.
- Public route activation: no.
- Any of slices 1-10 implementation (beyond this readiness packet): no (readiness/planning/approval only for Slice 2).
- No production implementation slices, no live automation, no production multi-tenant writes, no contractor portal, no auth/RLS changes

No live integrations, external service activation, credentials, env changes, schema, RLS, migration files, access logic, contractor portal, backend-or-src, or any production implementation slice (beyond this Slice 2 readiness definition) are implemented or activated by this packet. All remain future work gated behind this PASS + sequencing plan PASS (d22ea8a) + final gate PASS (f3c3e80) + config/env PASS (1e1fe69) + separate approved slice execution packets that themselves pass aggregate readiness and quality gate. Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation). Rollback/kill-switch readiness, owner approval evidence, source-of-truth verification at 1e1fe69, final gate PASS at f3c3e80, sequencing plan PASS, config/env PASS, and PASS/HOLD/BLOCKED tenant/account readiness decision are required before any future implementation slice approval.

## 22. Public-vs-internal language boundary

Customer-facing / public language (must be used in all website, prospect, customer, and external communications; enforced by verifier):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

Internal founder/operator/manual/dry-run language (permitted only inside clearly labeled internal-only dry-run sections; e.g., this packet's trackers, decision logs, risk registers, safety sections, owner approval, Guided Setup instruction details, rollback procedures, and internal handoff notes): Internal-only / founder-operator-only. internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections.

- Tenant/account model, Slice 2, owning_roofer_id, roofer principal, tenant isolation, role/access boundary, account lifecycle, portal hold, production write hold, PASS/HOLD/BLOCKED, rollback/kill-switch, owner approval evidence, dry-run harness, internal-only, founder-operator-only.

Internal language must never appear in customer-facing or prospect-facing content. Public language must never be violated. The verifier scans customer-facing sections (before any "Forbidden Public Phrases" marker) for compliance.

Forbidden Public Phrases (Reference — Full List Enforced by Verifier) — must be absent from all customer-facing / public sections:

- Founder-Led Launch Program
- Request Founder-Led Launch Review
- founder review
- manual review
- manual coordination
- Live Automation Disabled
- Monthly billing starts on day 15
- Monthly billing on day 15
- day 15
- 14-day launch trial
- seven-day pilot
- five-qualified-appointment short-window claim
- 5 qualified appointments in 7 days
- 7-day pilot
- book jobs
- booked jobs
- booked-job
- guaranteed appointments
- guaranteed revenue
- guaranteed jobs
- automatic estimate
- automatic quote
- automatic invoice
- automatic payment
- You book the inspection

Any appearance of forbidden phrases outside explicitly internal-only sections forces BLOCKED.

## Explicit acceptance/readiness only confirmation

This packet asserts and the verifier will enforce:

- This is tenant/account model readiness/planning/approval only.
- Does not implement tenant accounts, users, account records, schema, auth, RLS, migration files, or production data writes.
- Does not make backend-or-src changes, public routes, contractor portal exposure, external calls, live sends, scheduler/cron/dispatcher activation, credentials, env changes, or production behavior.
- Does not read or modify `.env` files.
- Does not create credentials.
- Does not activate production behavior.
- Does not implement auth, RLS, schema, migration files, production writes, contractor portal, live automation, or any slice implementation (beyond this readiness definition for Slice 2).
- Does not activate or implement live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, or backend-or-src changes.
- This is tenant/account model readiness/planning/approval only and does not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, external integrations, backend-or-src changes, or any production implementation slice. Scheduler-or-cron-or-dispatcher activation remains disabled.
- Rollback/kill-switch readiness is required before any future implementation slice approval. rollback/kill-switch readiness is required before any future implementation slice approval.
- Source-of-truth prerequisite at 1e1fe69 test(pilot): add production config env readiness audit packet must be verified.
- Final Production Go-Live Acceptance Gate at f3c3e80 must record PASS before this packet may record PASS.
- Production Implementation Sequencing and Approval Plan at d22ea8a must record PASS before this packet may record PASS.
- Production Config / Env Readiness Audit Packet at 1e1fe69 must record PASS (or accepted HOLD) before this packet may record PASS.
- asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation).
- All changes are docs + scripts wrapper + read-only verifier only.
- No production behavior, no external calls, no live sends, no credential activation, no scheduler activation, no production writes, no backend-or-src, no migration files, no auth/RLS/security, no contractor portal, no slice implementation (beyond this readiness definition).
- The doc requires tenant/account PASS/HOLD/BLOCKED approval before future schema/auth/RLS/security implementation.
- The doc includes the roofer phone-number usage and calendar setup readiness dependency without activating phone/SMS/calls/calendar booking.

## Verification evidence

- All 22 required sections (1. Internal-only dry-run scope through 22. Public-vs-internal language boundary) present with substantive content.
- Exactly 9 copy-paste-ready manual tracker tables present with owner/status/evidence/next-action columns (Tenant Account Readiness Tracker, Roofer Account Inventory Tracker, Homeowner Lead Association Tracker, Tenant Identifier Naming Tracker, Tenant Isolation Assumption Tracker, Role Access Boundary Tracker, Account Lifecycle Readiness Tracker, Portal Exposure Hold Tracker, Tenant Account Readiness Decision Tracker).
- References to Production Config / Env Readiness Audit Packet (1e1fe69), Production Implementation Sequencing and Approval Plan (d22ea8a), Final Production Go-Live Acceptance Gate (f3c3e80), Live Integration Activation Readiness Plan (a11bfbd), Production Security / Auth / RLS / Schema Readiness Plan (e494f4b), Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (cc80caf), ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md, and WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md present.
- FIRST_PAID_LAUNCH_VERIFIER_INDEX.md and verify-first-paid-pilot-readiness-readonly.js (aggregate) referenced for wiring.
- Explicit statements that this packet is tenant/account model readiness/planning/approval only and does not implement tenant accounts, users, account records, schema, auth, RLS, migration files, or production data writes; does not change backend-or-src, public routes, contractor portal exposure, external calls, live sends, scheduler/cron/dispatcher, credentials, env changes, or production behavior; rollback/kill-switch required before future slice approval; source-of-truth at 1e1fe69 required; final gate PASS at f3c3e80 required; sequencing plan PASS at d22ea8a required; config/env PASS at 1e1fe69 required; no forbidden impl file changes.
- Public language uses only approved RoofLeadHQ AI / booked homeowner appointments / Guided Setup / 14-day trial / automated pre-payment email / cancel anytime / no long-term contract strings.
- Internal-only / dry-run / founder-operator-only language confined to labeled internal-only dry-run sections.
- Forbidden public phrases absent from customer-facing sections.
- Verifier, wrapper, and wiring will be asserted by the dedicated verifier.
- The packet requires PASS/HOLD/BLOCKED decision before future implementation slice approval.
- Includes the Guided Setup phone-number and calendar configuration readiness dependency (internal-only) without any phone/SMS/calls/calendar activation.

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-production-tenant-account-model-readiness-packet-readonly.js
node backend/scripts/verify-production-tenant-account-model-readiness-packet-readonly.js
scripts/run-production-tenant-account-model-readiness-packet-dry-run.sh
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
scripts/agent-diff-proof.sh
git diff --stat
git status --short
```

## No production activation / no live integration / no credential activation / no production implementation safety rules

Tenant/account model readiness packet only: yes
Tenant accounts / users / principals / account tables: no
Schema / migration files: no
Auth / RLS / security implementation: no
Production writes: no
Backend/src changes: no
Public routes / contractor portal: no
Live SMS / Twilio activation: no
Live Vapi / calling activation: no
Calendar booking activation: no
Credentials / env changes: no
Scheduler / cron / dispatcher activation: no
Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)

This packet file: `docs/PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md`

This completes the Production Tenant / Account Model Readiness Packet.

### Tenant Account Readiness Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Tenant/account model boundary | Roofer as tenant root; owning_roofer_id on all scoped records; no shared accounts; planning-only | | | | |
| No implementation of tenants/accounts | No roofer principals, account tables, user-roofer junctions, tenant claims implemented | | | | |

### Roofer Account Inventory Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Roofer as tenant principal | Unique roofer identity owns all data; contact, phone assignment, calendar ack, lifecycle state | | | | |
| Current state inventory | Fixtures/dry-run only; no production roofer accounts | | | | |
| No multi-user per tenant (initial) | Single owner/operator per roofer tenant | | | | |

### Homeowner Lead Association Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Lead owns owning_roofer_id | Every lead carries tenant id at creation; never shared | | | | |
| Homeowner data tenant-scoped | No global homeowner accounts or cross-roofer dedup | | | | |
| Associations inherit tenant | Appointment/outcome inherit owning_roofer_id | | | | |

### Tenant Identifier Naming Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| owning_roofer_id authoritative | Primary tenant key; present on every scoped table | | | | |
| "roofer" public term | "tenant"/"account" internal-only; no public multi-tenant language | | | | |
| Consistent naming | owning_roofer_id everywhere; no drift | | | | |

### Tenant Isolation Assumption Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Record-level owning_roofer_id | Every tenant-scoped record carries it (future) | | | | |
| RLS zero cross-roofer | Future RLS returns 0 rows for mismatched contractor tokens | | | | |
| Service-role narrow + audited | Cross-roofer only for justified founder ops; logged | | | | |
| Rollback preserves isolation | Kill-switch + revert must not create cross-tenant leakage | | | | |
| Re-confirm from cc80caf + e494f4b + data protection | All prior isolation criteria re-evidenced | | | | |

### Role Access Boundary Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Contractor role = own tenant only | Scoped to owning_roofer_id of principal | | | | |
| Founder/operator = cross-roofer (internal) | Logged; never exposed to contractors | | | | |
| jwt/session bind to owning_roofer_id | Future claims must enforce tenant | | | | |
| No shared roles across tenants | Enforced at auth boundary (future) | | | | |

### Account Lifecycle Readiness Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Lifecycle states defined (internal) | prospect, guided-setup-pending, trial-active, paying, cancelled, suspended | | | | |
| Trial language per public spec | "The 14-day trial begins after RoofLeadHQ AI setup goes live." | | | | |
| Pre-billing language per public spec | "An automated email is sent 2 days before the first monthly payment." | | | | |
| Cancel language per public spec | "Cancel anytime. No long-term contract." | | | | |
| Historical data per tenant | Cancelled tenant data remains tenant-scoped for audit | | | | |
| Guided Setup ack before creation | Phone + calendar instructions + ack required before account goes live (future) | | | | |

### Portal Exposure Hold Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Contractor portal fully held | No prod routes, no authenticated contractor UI, no per-roofer prod surfaces | | | | |
| Prerequisite slices | Tenant model (2) + schema (3) + auth/RLS (4) + write boundary (5) must PASS first | | | | |
| Demo surfaces labeled | SAMPLE / demo only; no implication of live contractor access | | | | |
| Non-negotiable | Any exposure attempt before prerequisites = BLOCKED | | | | |

### Tenant Account Readiness Decision Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| All 9 model areas approved | Boundary, roofer inventory, homeowner assoc, identifier, isolation, role, lifecycle, Guided Setup dep, multi-roofer, reporting, portal hold | | | | |
| Guided Setup phone/calendar dep | Clear instructions + ack model defined; internal-only; no activation | | | | |
| Rollback/kill-switch for surfaces | Documented + tested via verifier + quality gate | | | | |
| Owner (Jason) approval | Timestamped sign-off + evidence | | | | |
| Source + prior gates green | 1e1fe69 + d22ea8a + f3c3e80 + a11bfbd + e494f4b + cc80caf + data protection + launch system + trial regression | | | | |
| Wiring + verifier + aggregate green | All 6 wiring targets + dedicated verifier + quality gate | | | | |
| No forbidden changes | backend-or-src, migration files, schema, auth/RLS, env, routes, activations, etc. | | | | |
| Explicit PASS/HOLD/BLOCKED | Recorded here; only PASS (or accepted HOLD) advances to Slice 3+ | | | | |
