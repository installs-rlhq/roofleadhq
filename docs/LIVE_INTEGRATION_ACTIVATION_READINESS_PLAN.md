# Live Integration Activation Readiness Plan

Date: 2026-06-18

Canonical source of truth before this worktree must be verified at e494f4b test(pilot): add production security auth rls schema readiness plan.

This is the practical planning and acceptance packet Jason (founder/operator) must use before any live integration activation begins. The packet converts the production security / auth / RLS / schema readiness plan (at e494f4b) into a concrete live-activation readiness plan with hold gates, approval evidence, rollback requirements, dry-run proof, owner checklist, and PASS/HOLD/BLOCKED activation gate.

**This is planning/readiness/acceptance only.** Do not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, or backend-or-src changes. This packet performs no production writes, no external service calls, no live sends, no live notifications, no live booking, no live estimate creation, no live quote generation, no invoice/payment behavior, no cron/scheduler behavior, no public route activation, no auth changes, no database policy changes, no migration files, no secrets handling changes, and no access-control implementation.

All work remains dry-run/internal-only/founder-operator-only. This packet performs no production writes, no external service calls, no live sends, no live notifications, no live booking, no live estimate creation, no live quote generation, no invoice/payment behavior, no cron/scheduler behavior, no public route activation, no auth changes, no database policy changes, no migration files, no secrets handling changes, and no access-control implementation.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal worksheets, decision logs, blocker registers, risk registers, qualification notes, reuse evidence logs, and handoff artifacts are internal-only / dry-run / founder-operator-only. This is a planning/readiness/acceptance packet, not live integration activation and not production external service or automation activation. No public founder-led/manual babysitting positioning is used for customers or prospects. No live systems or external calls of any kind are activated by this packet. Dry-run / internal-only / founder-operator-only.

This packet file: `docs/LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md`
This packet includes 9 copy-paste-ready manual tracker tables.
Wrapper: `scripts/run-live-integration-activation-readiness-plan-dry-run.sh`
Verifier: `backend/scripts/verify-live-integration-activation-readiness-plan-readonly.js`

## 1. Internal-only dry-run scope

This packet is strictly internal-only / dry-run / founder-operator-only. It is the manual planning and readiness packet that converts the prior Production Security / Auth / RLS / Schema Readiness Plan (at e494f4b) into an enforceable pre-activation checkpoint for any live integration work (SMS, calling, calendar, email, automation, scheduling, CRM, payments, production writes). It contains no implementation, no production activation, no external calls, and no changes to any backend, schema, auth, RLS, secrets, production code, or external service credentials. All content is for founder (Jason) manual-review, logging, evidence collection, decision logging, and explicit PASS/HOLD/BLOCKED decision only. No customer or prospect receives internal-only language from this packet. This packet does not activate or implement any production changes or live integrations. All execution artifacts, trackers, and gate decisions remain local to the founder/operator.

## 2. Live integration readiness purpose

The purpose of this packet is to serve as the concrete manual readiness gate and decision framework that must be explicitly passed before any work proceeds on activating live integrations (Twilio/SMS, Vapi/calling, Calendar booking, Resend/email, Lindy/automation, cron/scheduler/dispatcher, CRM automation, payment automation, or production Supabase writes). It receives the completed Production Security / Auth / RLS / Schema Readiness Plan (at e494f4b) plus upstream multi-roofer safety, data protection, second paid roofer repeatable launch kit, launch system, and trial direction regression packet as primary inputs. It performs a structured readiness review across each integration domain, enforces hard HOLD/BLOCKED gates on any live activation, credentials/env changes, production writes, or external service activation, and requires explicit rollback/kill-switch readiness, dry-run proof, and owner approval evidence before any PASS. Only an explicit PASS at the final Live Integration Readiness Gate (section 19) authorizes consideration of future live integration activation work. This packet produces a concrete PASS/HOLD/BLOCKED gate. This packet exists to prevent accidental live activation and ad-hoc external service enablement before security, tenant isolation, rollback mechanisms, and operational readiness are explicitly planned, accepted, and gated. It prevents accidental or ad-hoc activation of live paths.

## 3. Inputs from Production Security / Auth / RLS / Schema Readiness Plan

Primary inputs:
- PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md (post production security readiness plan PASS/HOLD/BLOCKED + 9 trackers + hold gates on auth/RLS/schema + tenant isolation + data protection milestone + one-at-a-time boundary + live automation hold at e494f4b)
- MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md (multi-roofer safety gate + tenant isolation + production write hold + live automation hold at cc80caf)
- ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md (prior milestone placement, founder requirement "Every roofer’s information and leads must be protected as much as possible from data-breach concerns", and future-scope definitions)
- SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md (repeatable launch + multi-roofer safety boundary confirmation + blocker register + handoff artifact)
- FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (primary container receiving prior handoffs + ongoing multi-roofer planning section)
- WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md (public language enforcement)

Secondary reuse evidence:
- FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md, FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md, FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md (first paid operating sequence patterns)

This packet does not duplicate the full content of any input. It performs the cross-cutting live integration activation readiness review and produces the activation-readiness plan + decision logs + acceptance criteria + final PASS/HOLD/BLOCKED live integration readiness gate only.

## 4. Twilio/SMS activation hold gate

**HOLD GATE: Twilio/SMS activation remains blocked until this readiness plan is PASSED, rollback/kill-switch readiness is evidenced, and explicit founder approval for live SMS is recorded.**

No live homeowner SMS / Twilio sending, no production Twilio credentials activation, no SMS dispatcher production runner, no live message dispatch, no webhook exposure for inbound SMS, and no SMS automation may be activated until this gate records explicit PASS. All SMS paths remain DISABLED. This packet asserts and the verifier confirms the disabled state. The one-at-a-time dry-run operating rule is the only permitted mode. Twilio/SMS activation is a hard blocker on the Live Integration Readiness Gate until the full readiness + rollback proof + re-verification sequence is complete. Dry-run proof of SMS payloads and internal dispatch harness must be logged before any activation consideration.

## 5. Vapi/calling activation hold gate

**HOLD GATE: Vapi/calling activation remains blocked until this readiness plan is PASSED, rollback/kill-switch readiness is evidenced, and explicit founder approval for live calling is recorded.**

No live Vapi outbound or inbound production calls, no production Vapi credentials activation, no call scheduling in production, no webhook exposure for call status, no voice path activation for homeowners or contractors, and no calling automation may be activated until this gate records explicit PASS. All Vapi/calling paths remain DISABLED. This packet asserts and the verifier confirms the disabled state. The one-at-a-time dry-run operating rule is the only permitted mode. Vapi/calling activation is a hard blocker on the Live Integration Readiness Gate until the full readiness + rollback proof + re-verification sequence is complete. dry-run proof of Vapi payloads and call flow harness must be logged before any activation consideration.

## 6. Calendar booking activation hold gate

**HOLD GATE: Calendar booking activation remains blocked until this readiness plan is PASSED, rollback/kill-switch readiness is evidenced, and explicit founder approval for live calendar integration is recorded.**

No live Calendar booking / event creation for homeowners or contractors, no production Google Calendar or equivalent credentials activation, no booking sync, no availability exposure, no calendar webhook activation, and no booking automation may be activated until this gate records explicit PASS. All calendar booking paths remain DISABLED. This packet asserts and the verifier confirms the disabled state. The one-at-a-time dry-run operating rule is the only permitted mode. Calendar booking activation is a hard blocker on the Live Integration Readiness Gate until the full readiness + rollback proof + re-verification sequence is complete. dry-run proof of calendar payloads and booking harness must be logged before any activation consideration.

## 7. Resend/email activation hold gate

**HOLD GATE: Resend/email activation remains blocked until this readiness plan is PASSED, rollback/kill-switch readiness is evidenced, and explicit founder approval for live email sending is recorded.**

No live Resend emails or production transactional email, no production Resend credentials activation, no automated pre-billing or follow-up emails in production, no email webhook exposure, and no email automation may be activated until this gate records explicit PASS. All Resend/email paths remain DISABLED. This packet asserts and the verifier confirms the disabled state. The one-at-a-time dry-run operating rule is the only permitted mode. Resend/email activation is a hard blocker on the Live Integration Readiness Gate until the full readiness + rollback proof + re-verification sequence is complete. dry-run proof of Resend payloads and email harness must be logged before any activation consideration. (Note: the automated pre-billing email referenced in public language remains planning-only until this gate + separate activation approval.)

## 8. Lindy/automation activation hold gate

**HOLD GATE: Lindy/automation activation remains blocked until this readiness plan is PASSED, rollback/kill-switch readiness is evidenced, and explicit founder approval for live external automation is recorded.**

No Lindy workflows, no production Lindy credentials or integration activation, no third-party automation triggers, no external workflow calls, and no automation handoff may be activated until this gate records explicit PASS. All Lindy/automation paths remain DISABLED. This packet asserts and the verifier confirms the disabled state. The one-at-a-time dry-run operating rule is the only permitted mode. Lindy/automation activation is a hard blocker on the Live Integration Readiness Gate until the full readiness + rollback proof + re-verification sequence is complete. Dry-run proof of Lindy/automation payloads and harness must be logged before any activation consideration.

## 9. Cron/scheduler/dispatcher activation hold gate

**HOLD GATE: Cron/scheduler/dispatcher activation remains blocked until this readiness plan is PASSED, rollback/kill-switch readiness is evidenced, and explicit founder approval for live scheduled automation is recorded.**

No cron jobs, no scheduler activation, no dispatcher production runner, no timed or event-driven production triggers, no background job activation, and no scheduling automation may be activated until this gate records explicit PASS. All cron/scheduler/dispatcher paths remain DISABLED. This packet asserts and the verifier confirms the disabled state. The one-at-a-time dry-run operating rule is the only permitted mode. Cron/scheduler/dispatcher activation is a hard blocker on the Live Integration Readiness Gate until the full readiness + rollback proof + re-verification sequence is complete. Dry-run proof of scheduler/dispatcher payloads and harness must be logged before any activation consideration.

## 10. CRM automation activation hold gate

**HOLD GATE: CRM automation activation remains blocked until this readiness plan is PASSED, rollback/kill-switch readiness is evidenced, and explicit founder approval for live CRM integration is recorded.**

No CRM automation (HubSpot, Salesforce, or equivalent), no production CRM credentials activation, no lead/ appointment/ outcome sync to external CRM, no CRM webhook exposure, and no CRM automation may be activated until this gate records explicit PASS. All CRM automation paths remain DISABLED. This packet asserts and the verifier confirms the disabled state. The one-at-a-time dry-run operating rule is the only permitted mode. CRM automation activation is a hard blocker on the Live Integration Readiness Gate until the full readiness + rollback proof + re-verification sequence is complete. Dry-run proof of CRM payloads and integration harness must be logged before any activation consideration.

## 11. Payment automation activation hold gate

**HOLD GATE: Payment automation activation remains blocked until this readiness plan is PASSED, rollback/kill-switch readiness is evidenced, and explicit founder approval for live payment integration is recorded.**

No payment automation (Stripe or equivalent), no production payment credentials activation, no invoice generation, no checkout/session creation, no billing webhooks, no subscription automation, and no payment automation may be activated until this gate records explicit PASS. All payment automation paths remain DISABLED. This packet asserts and the verifier confirms the disabled state. The one-at-a-time dry-run operating rule is the only permitted mode. Payment automation activation is a hard blocker on the Live Integration Readiness Gate until the full readiness + rollback proof + re-verification sequence is complete. Dry-run proof of payment payloads and billing harness must be logged before any activation consideration.

## 12. Production Supabase write activation hold gate

**HOLD GATE: Production Supabase write activation remains blocked until this readiness plan is PASSED, rollback/kill-switch readiness is evidenced, and explicit founder approval for live production writes is recorded.**

No production Supabase writes for leads, appointments, outcomes, contractor data, billing events, or any expansion beyond current gated dry-run/test-only patterns may occur until this gate records explicit PASS. All production write paths remain DISABLED beyond current fixtures. This packet asserts and the verifier confirms the gated state. The one-at-a-time dry-run operating rule is the only permitted mode. Production Supabase write activation is a hard blocker on the Live Integration Readiness Gate until the full readiness + rollback proof + re-verification sequence is complete. Dry-run proof of write payloads and isolation harness must be logged before any activation consideration. (Re-confirms and extends the Production Write Hold from the Production Security Readiness Plan.)

## 13. Credentials and env-change hold gate

**HOLD GATE: Credentials and env-change activation remains blocked until this readiness plan is PASSED, rollback/kill-switch readiness is evidenced, and explicit founder approval for live credential use is recorded.**

No production credentials (Twilio, Vapi, Resend, Lindy, Calendar, Stripe, CRM, Supabase service role beyond current dry-run scope), no dot-env changes for live services, no secrets activation, no production environment variable exposure, and no credential handoff may occur until this gate records explicit PASS. All credential and env surfaces for live integrations remain DISABLED or test-only. This packet asserts and the verifier confirms the disabled state. The one-at-a-time dry-run operating rule is the only permitted mode. Credentials and env-change activation is a hard blocker on the Live Integration Readiness Gate until the full readiness + rollback proof + re-verification sequence is complete. Dry-run proof of credential scoping and env separation must be logged before any activation consideration. No production secrets may be introduced or activated by this packet.

## 14. Dry-run proof checklist

Before PASS at the Live Integration Readiness Gate, the following dry-run proof items must be logged with owner + evidence + timestamp (or explicitly accepted HOLD with mitigation and re-review date):

- SMS/Twilio dry-run harness executed (payloads, templates, internal dispatch simulation) with no live send.
- Vapi/calling dry-run payloads and call flow simulation executed with no live call.
- Calendar booking dry-run payloads and availability simulation executed with no live booking.
- Resend/email dry-run payloads and delivery simulation executed with no live email.
- Lindy/automation dry-run harness executed with no live workflow trigger.
- Cron/scheduler/dispatcher dry-run executed (manual or test harness) with no production schedule or dispatch.
- CRM automation dry-run payloads and sync simulation executed with no live CRM write.
- Payment automation dry-run payloads and session simulation executed with no live payment.
- Production write dry-run (test fixtures only) executed with tenant isolation confirmed.
- All dry-run artifacts captured in internal logs or this packet's evidence fields; no external service reached in production scope.
- Rollback simulation (kill-switch test in dry-run harness) executed successfully for each integration domain.
- All dry-run proof references cross-checked against Production Security Readiness Plan (e494f4b) and Multi-Roofer Safety Gate (cc80caf) hold boundaries.

## 15. Rollback and kill-switch readiness checklist

Rollback and kill-switch readiness is required before any future activation approval.
rollback/kill-switch readiness is required before any future activation approval Before PASS at the Live Integration Readiness Gate, the following must be logged with owner + evidence + timestamp (or explicitly accepted HOLD with mitigation and re-review date):

- Explicit kill-switch (feature flag, env toggle, or code path disable) design documented for each live integration (SMS, calling, calendar, email, automation, scheduler, CRM, payments, writes).
- Rollback procedure for each integration: how to immediately disable live path and revert to dry-run-only without data loss or partial state.
- Monitoring/alerting plan for live integration health (error rates, delivery failures, external service outages) with founder/operator paging path.
- Data rollback / compensation procedure for any live write that must be undone (e.g., erroneous SMS, calendar event, payment intent).
- Tenant isolation preserved under rollback (no cross-roofer leakage during failure or revert).
- Audit log of all activation/rollback events (who, when, what, reason) required for any future live path.
- Explicit founder confirmation that "every roofer’s information and leads must be protected as much as possible from data-breach concerns" remains honored under live integration + rollback scenarios.
- Kill-switch tested in dry-run harness; evidence logged.
- Rollback readiness re-confirmed against Production Security Readiness Plan (e494f4b) production write and live automation holds.

Any integration without documented, tested rollback/kill-switch is BLOCKED from activation consideration.

## 16. Owner approval evidence checklist

Before PASS at the Live Integration Readiness Gate, the following must be logged with owner + evidence + timestamp:

- All 7 domain-specific activation hold trackers (SMS, Calling, Calendar, Email, Automation Scheduler, CRM Payment, Production Write) have PASS or explicitly accepted HOLD with mitigation + owner + due date.
- Credentials and Env-Change Hold Tracker: boundaries re-confirmed with no active violations.
- Dry-Run Proof Checklist: all items evidenced or HOLD-accepted.
- Rollback and Kill-Switch Readiness Tracker: all items PASS or accepted HOLD with mitigation; rollback required before future activation.
- Risk and Blocker Register: all carried + new risks reviewed; BLOCKED resolved or accepted.
- Live Integration Readiness Gate Tracker: final row records explicit founder PASS with date, evidence summary, and cross-reference to Production Security Readiness Plan (e494f4b) + Multi-Roofer Safety Gate (cc80caf) + input gates + all prior trackers + dry-run proof + rollback evidence.
- Signed founder confirmation that production security / tenant isolation / data protection boundaries remain honored and that this readiness plan is the non-skippable gate before any live integration activation.
- Evidence that no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation).
- All wiring to aggregate pilot readiness, verifier index, next-chat contexts, and daily guide present and verified.

## 17. Risk and blocker register

All risks and blockers from the Production Security / Auth / RLS / Schema Readiness Plan (at e494f4b), Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (at cc80caf), and upstream Data Protection packet are carried forward. New risks specific to live integration activation readiness:

- Live SMS or calling activation before rollback/kill-switch is fully tested and evidenced.
- Calendar or payment integration creating cross-roofer data exposure or leakage under error paths.
- Env/credential drift allowing test credentials to reach production or vice-versa.
- Scheduler/dispatcher activation bypassing tenant isolation or audit boundaries.
- CRM or Lindy automation receiving or writing tenant data without explicit per-roofer consent and DPA.
- Pressure to activate any live path before Production Security Readiness Plan PASS + this gate PASS + rollback evidence + re-verification at safety gates.
- Incomplete dry-run proof leading to false confidence in live path readiness.
- Source-of-truth drift between agent worktree and canonical main during long activation planning phase.
- Partial activation (e.g., SMS live but no kill-switch) creating unrecoverable state.

BLOCKED items must be resolved or explicitly risk-accepted by founder with mitigation and re-review date before any future live integration activation packet or work may be started. This register feeds the implementation handoff artifact.

## 18. Implementation handoff artifact

On explicit PASS at the Live Integration Readiness Gate, this packet produces a handoff artifact (recorded in the Live Integration Readiness Gate Tracker final row and referenced in the gate decision) containing:

- Summary of all 9 tracker outcomes (PASS or accepted HOLD with mitigations and owner/due).
- Cross-reference to Production Security / Auth / RLS / Schema Readiness Plan (e494f4b) + Multi-Roofer Safety Gate (cc80caf) + Data Protection packet + Second Paid Roofer Repeatable Launch Kit + Launch System Packet + Trial Direction Regression packet PASS artifacts and verifier timestamps.
- Explicit statement that production security / tenant isolation / data protection milestone is satisfied for the reviewed scope and that live integration readiness criteria (including rollback/kill-switch) are accepted.
- Consolidated dry-run proof checklist outcomes and rollback/kill-switch evidence.
- Risk register with accepted items and mitigations.
- Recommended next owner and phase for a future "Live Integration Activation Execution Packet" (or equivalent) only after this gate PASS. The activation packet itself must pass the aggregate pilot readiness verifier and quality gate before any code changes or credential activation.
- Confirmation that one-at-a-time dry-run operating rule, all hold boundaries (SMS, calling, calendar, email, automation, scheduler, CRM, payment, production write, credentials), and rollback requirements remain in force until activation is complete, re-verified at the Multi-Roofer Safety Gate (or successor) and Production Security Readiness Gate (or successor), and re-approved.
- Founder sign-off date and evidence pointer.
- List of deferred future activation work (actual Twilio credential activation, Vapi webhook wiring, calendar sync, Resend live templates, Lindy workflows, cron/scheduler production schedules, CRM/payment integrations, production write paths, env changes, etc.).

This handoff feeds the Launch System Packet (ongoing multi-roofer planning + live integration section) and any future 90-day plan refresh. No live integration work or credential activation begins from this handoff without a separate, approved activation packet that itself passes the aggregate pilot readiness verifier and quality gate.

## 19. PASS/HOLD/BLOCKED live integration readiness gate

The gate decision is recorded in the Live Integration Readiness Gate Tracker (final table). Rules:

- Only PASS advances consideration of live integration activation work (Twilio/SMS, Vapi, Calendar, Resend, Lindy, cron/scheduler/dispatcher, CRM, payments, production writes, credentials).
- Any HOLD item in any of the 9 trackers with unresolved owner/due date blocks PASS.
- Any BLOCKED item (missing critical evidence, active live integration detected, violation of hold boundaries, forbidden phrase in public artifacts, dry-run proof incomplete, rollback/kill-switch un-evidenced, decision log incomplete, acceptance criteria un-evidenced, etc.) forces BLOCKED.
- Founder must manually confirm all safety guardrails (section 20) and public-vs-internal language boundary (section 21) before recording PASS.
- The gate decision must be re-run (full verifier + wrapper + quality gate) on every material change to input gates/kits or operating status.
- On PASS: produce handoff artifact (section 18) + update Launch System Packet + business buildout daily guide + contexts + verifier index.
- On HOLD or BLOCKED: document root cause, owner, due date, and re-review plan. No live integration activation, credential use, or external service production enablement proceeds.
- Rollback/kill-switch readiness is a mandatory prerequisite for any PASS; absence forces BLOCKED or HOLD.

## 20. Safety guardrails

Confirmed Disabled (No Activation in Any Form):

- Live homeowner SMS / Twilio sending: DISABLED
- Live Vapi outbound or inbound production calls: DISABLED
- Live Calendar booking / event creation for homeowners or contractors: DISABLED
- Live Resend / transactional email: DISABLED
- Lindy / external automation workflows: DISABLED
- Cron / scheduler / dispatcher production runner: DISABLED
- CRM automation (syncs, webhooks, writes): DISABLED
- Payment automation (Stripe sessions, invoices, webhooks, subscriptions): DISABLED
- Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events beyond current gated dry-run/test-only: DISABLED
- Credentials / env changes for any live integration: DISABLED (test-only or absent)
- Auth / RLS / security policy implementation or changes: NONE (planning only, re-confirmed)
- Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets for live: none, production routes: none
- External service calls in production scope: NONE
- Contractor portal or dashboard exposure: NONE
- Live automation, cron, scheduler, dispatcher production runner: DISABLED
- Payment/estimate/quote/invoice automation: NONE

This packet references PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md (at e494f4b), MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md (at cc80caf), ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md, SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md, and WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md for boundary enforcement. No live automation, no production multi-tenant writes, no contractor portal, no auth/RLS/schema/migration implementation, no production writes, no external integrations, no credentials/env for live are activated or implemented by this packet. No live automation, no production multi-tenant writes, no contractor portal, no auth/RLS changes No live SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, auth/RLS/security, contractor portal, external integrations, or backend-or-src changes.

## 21. Public-vs-internal language boundary

Customer-facing / public language (used only in artifacts shared with roofers, prospects, or value narratives):

- Must use exactly the approved strings: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract.
- Must not use: "founder-led-launch-program" or "founder-review" public positioning (enforced by WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and this packet), or any variant that implies founder babysitting, guarantees, or live automation.

Internal founder/operator/manual/dry-run language (PASS/HOLD/BLOCKED decisions, blocker registers, trackers, handoff artifacts, safety sections, risk notes, decision logs, rollback procedures) is permitted only inside clearly labeled "Internal-only / founder-operator-only" or "Internal only:" sections of this packet and must never leak into customer-facing artifacts, roofer handoff documents, or public copy. The verifier enforces the boundary by scanning content before the Forbidden Public Phrases restatement. internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections.

Forbidden Public Phrases (Reference — Full List Enforced by Verifier):
Founder-Led Launch Program, Request Founder-Led Launch Review, founder review, manual review, manual coordination, Live Automation Disabled, Monthly billing starts on day 15, Monthly billing on day 15, day 15, 14-day launch trial, seven-day pilot (or any 7-day pilot variant), five-qualified-appointment short-window claim (or 5 qualified appointments), book jobs, booked jobs, booked-job, guaranteed appointments, guaranteed revenue, guaranteed jobs, automatic estimate, automatic quote, automatic invoice, automatic payment, You book the inspection.

### SMS Activation Hold Tracker

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Twilio account / credential scoping | No production Twilio creds; test-only or absent until gate PASS + rollback proof | | | | |
| Live SMS send path | All SMS send paths (dispatcher, manual, webhook) remain disabled in prod | | | | |
| Inbound SMS webhook exposure | No production inbound SMS webhooks active or wired | | | | |
| SMS template / compliance readiness | Dry-run templates only; compliance review logged | | | | |
| SMS dry-run proof | Payloads + internal dispatch harness executed; no live send | | | | |
| SMS rollback / kill-switch | Feature flag or disable path documented + dry-run tested | | | | |

### Calling Activation Hold Tracker

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Vapi account / credential scoping | No production Vapi creds; test-only or absent until gate PASS + rollback proof | | | | |
| Live call initiation path | All Vapi call paths (outbound, inbound, scheduling) remain disabled in prod | | | | |
| Call status webhook exposure | No production call webhooks active or wired | | | | |
| Voice path / transcription readiness | Dry-run payloads only; no live audio handling | | | | |
| Calling dry-run proof | Vapi payloads + call flow harness executed; no live call | | | | |
| Calling rollback / kill-switch | Feature flag or disable path documented + dry-run tested | | | | |

### Calendar Activation Hold Tracker

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Calendar provider / credential scoping | No production Calendar creds; test-only or absent until gate PASS + rollback proof | | | | |
| Live booking / event creation path | All calendar create/update/delete paths remain disabled in prod | | | | |
| Availability / booking webhook exposure | No production calendar webhooks or availability endpoints active | | | | |
| Booking conflict / sync readiness | Dry-run simulation only; no live sync | | | | |
| Calendar dry-run proof | Booking payloads + availability harness executed; no live booking | | | | |
| Calendar rollback / kill-switch | Feature flag or disable path documented + dry-run tested | | | | |

### Email Activation Hold Tracker

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Resend account / credential scoping | No production Resend creds; test-only or absent until gate PASS + rollback proof | | | | |
| Live email send path | All Resend / transactional email paths remain disabled in prod | | | | |
| Email webhook / bounce handling | No production email webhooks active or wired | | | | |
| Pre-billing / follow-up template readiness | Dry-run templates only; automated email in public language remains planning-only | | | | |
| Email dry-run proof | Resend payloads + delivery harness executed; no live email | | | | |
| Email rollback / kill-switch | Feature flag or disable path documented + dry-run tested | | | | |

### Automation Scheduler Hold Tracker

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Lindy / external automation scoping | No production Lindy or automation creds; test-only or absent | | | | |
| Cron / scheduler / dispatcher activation | No cron jobs, scheduler entries, or production dispatcher runner active | | | | |
| Background job / trigger paths | All timed or event-driven automation paths remain disabled in prod | | | | |
| Automation payload / workflow readiness | Dry-run only; no live workflow trigger or external call | | | | |
| Scheduler dry-run proof | Scheduler/dispatcher harness executed (manual/test); no prod schedule | | | | |
| Scheduler rollback / kill-switch | Disable path for all scheduled/automated paths documented + tested | | | | |

### CRM Payment Hold Tracker

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| CRM integration scoping | No production CRM (HubSpot etc.) creds or syncs active | | | | |
| Payment integration scoping | No production Stripe / payment creds, sessions, or webhooks active | | | | |
| CRM / payment data flow | No lead/appointment/outcome/billing sync or write to external CRM/payment | | | | |
| CRM / payment webhook exposure | No production CRM or payment webhooks active or wired | | | | |
| CRM / payment dry-run proof | Payloads + sync/session harness executed; no live CRM or payment | | | | |
| CRM / payment rollback / kill-switch | Feature flag/disable for CRM + payment paths documented + tested | | | | |

### Production Write Hold Tracker

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Production Supabase writes disabled | No leads/appointments/outcomes/contractor/billing writes in prod until readiness + rollback proof complete | | | | |
| Write surface remains gated dry-run | Only current test/fixture patterns permitted | | | | |
| No mutation in this packet | Packet is planning/readiness + manual logging only | | | | |
| Broader write expansion blocked | Explicit blocker until production security + tenant isolation + this live integration gate PASS + rollback | | | | |
| Write paths in future activation must honor decisions | All planned write paths must use logged security decisions + pass isolation + rollback criteria | | | | |
| Verifier + wrapper clean | No supabase client access (from/rpc/service-role) in safety artifacts | | | | |

### Rollback Kill-Switch Tracker

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Kill-switch design per domain | Feature flag / env toggle / code disable path for SMS, calling, calendar, email, automation, scheduler, CRM, payment, writes | | | | |
| Rollback procedure documented | Step-by-step immediate disable + revert for each integration without data loss | | | | |
| Kill-switch dry-run test | Each kill-switch exercised in harness; evidence logged | | | | |
| Monitoring / alerting path | Founder/operator paging for integration health + failure | | | | |
| Compensation / data rollback | Procedure for undoing erroneous live actions (SMS, calendar event, payment, writes) | | | | |
| Tenant isolation under rollback | No cross-roofer leakage during failure or revert | | | | |
| Audit of activation/rollback | Who/when/what/reason log required for any future live path | | | | |
| Founder confirmation of data protection | "Every roofer’s information and leads must be protected as much as possible from data-breach concerns" honored under live + rollback | | | | |

### Live Integration Readiness Gate Tracker

| Gate | Decision Criteria Summary | Owner | Status | Evidence | Next Action |
|------|---------------------------|-------|--------|----------|-------------|
| SMS Activation Hold | Twilio/SMS paths disabled; dry-run proof + rollback evidenced | | | | |
| Calling Activation Hold | Vapi/calling paths disabled; dry-run proof + rollback evidenced | | | | |
| Calendar Activation Hold | Calendar booking paths disabled; dry-run proof + rollback evidenced | | | | |
| Email Activation Hold | Resend/email paths disabled; dry-run proof + rollback evidenced | | | | |
| Automation Scheduler Hold | Lindy/cron/scheduler/dispatcher disabled; dry-run proof + rollback evidenced | | | | |
| CRM Payment Hold | CRM/payment paths disabled; dry-run proof + rollback evidenced | | | | |
| Production Write Hold | Prod writes gated dry-run only; no violations | | | | |
| Credentials and Env-Change Hold | No live creds/env; boundaries honored | | | | |
| Dry-Run Proof Checklist | All 10+ items evidenced or HOLD-accepted | | | | |
| Rollback Kill-Switch Readiness | All rollback items PASS or accepted HOLD; rollback required before activation | | | | |
| Risk and Blocker Register | All carried + new risks reviewed; BLOCKED resolved or accepted | | | | |
| Safety guardrails re-confirm | Section 20 confirmed at gate execution | | | | |
| Public-vs-internal boundary | Section 21 + forbidden phrases absent | | | | |
| Input gate references + verifiers | Production Security (e494f4b) + Multi-Roofer (cc80caf) + Data Protection + Second Paid + Launch + Trial Regression + verifiers green | | | | |
| Founder sign-off | Explicit PASS only after full evidence + rollback proof | | | | |
| Live Integration Readiness Gate | FINAL: PASS / HOLD / BLOCKED (only PASS advances to live activation consideration; rollback/kill-switch mandatory) | | | | |

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-live-integration-activation-readiness-plan-readonly.js
node backend/scripts/verify-live-integration-activation-readiness-plan-readonly.js
scripts/run-live-integration-activation-readiness-plan-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Production Security / Auth / RLS / Schema Readiness Plan (primary recent input + hold gates + tenant isolation + live automation hold at e494f4b): `docs/PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md` + its wrapper and verifier
- Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (multi-roofer safety gate + tenant isolation + production write hold + live automation hold at cc80caf): `docs/MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md` + its wrapper and verifier
- Roofer Data Protection and Tenant Isolation Plan Placement Packet (founder requirement + milestone placement): `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md` + its wrapper and verifier
- Second Paid Roofer Repeatable Launch Kit (repeatable launch + multi-roofer safety boundary): `docs/SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md` + its wrapper and verifier
- First Paid Roofer Launch System Packet (primary container for ongoing planning): `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier
- Website Trial Direction Regression packet (public language enforcement): `docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md` + its wrapper and verifier

- Wired into: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`, `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md`, `docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md`, and AGENT_PRODUCT_QUALITY_GATE.md (via wrapper + aggregate).

Reference: See AGENT_PRODUCT_QUALITY_GATE.md for the product-depth rule this packet satisfies (operational usefulness, concrete fields, decision logs, templates, wiring, safety). This packet is the next safest product-moving RoofLeadHQ packet after the Production Security / Auth / RLS / Schema Readiness Plan. It exists solely to produce a gated, decision-logged, criteria-defined readiness plan that must be PASSED before any live integration activation (SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, credentials, env changes) may begin. Rollback/kill-switch readiness is required before any future activation approval. The 14-day trial begins after RoofLeadHQ AI setup goes live. Cancel anytime. No long-term contract. Internal-only / dry-run / founder-operator-only.

## No production activation / no live integration / no credential activation safety rules

This packet is explicitly:
- Planning / readiness / acceptance packet only: yes
- Live SMS / Twilio activation: no
- Live Vapi / calling activation: no
- Live Calendar booking activation: no
- Live Resend / email activation: no
- Live Lindy / automation activation: no
- Cron / scheduler / dispatcher activation: no
- CRM automation activation: no
- Payment automation activation: no
- Production Supabase write activation: no
- Credentials / env changes for live integrations: no
- Auth / RLS / security policy implementation or changes: no
- Database schema changed: no
- Migration added: no
- RLS policy changed: no
- Production access logic changed: no
- Contractor portal permission changed: no
- Secrets changed: no
- Production data touched: no
- External service called: no
- Live workflow activation activated: no
- Contractor notification sent: no
- Homeowner notification sent: no
- Calendar booking performed: no
- Estimate created: no
- Quote generated: no
- Payment/invoice behavior added: no

No live integrations, external service activation, credentials, env changes, schema, RLS, migration files, or access logic are implemented or activated by this packet. All remain future work gated behind this PASS + separate approved activation packets that themselves pass aggregate readiness and quality gate. Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation). Rollback/kill-switch readiness is required before any future activation approval.

## Explicit acceptance/readiness only confirmation

This packet asserts and the verifier will enforce:
- This is planning/readiness/acceptance only.
- Does not implement auth, RLS, schema, migration files, production writes, contractor portal, or live automation.
- Does not activate or implement live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, or backend-or-src changes.
- Does not activate or implement live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes
This is planning/readiness/acceptance only and does not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, or backend-or-src changes
- Rollback/kill-switch readiness is required before any future activation approval.
- asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation).
- All changes are docs + scripts wrapper + read-only verifier only.
- No production behavior, no external calls, no live sends, no credential activation, no scheduler activation, no production writes.

## Verification evidence

- All 21 required sections (1. Internal-only dry-run scope through 21. Public-vs-internal language boundary) present with substantive content.
- All 9 copy-paste-ready manual tracker tables present with owner/status/evidence/next-action columns.
- References to Production Security / Auth / RLS / Schema Readiness Plan (e494f4b), Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (cc80caf), Data Protection/Tenant Isolation packet, Second Paid Roofer Repeatable Launch Kit, Launch System, and Trial Direction Regression packet present.
- Explicit statements that this packet is planning/readiness/acceptance only and does not activate the forbidden list; rollback/kill-switch required before future activation; no forbidden impl file changes.
- Public language uses only approved RoofLeadHQ AI / booked homeowner appointments / Guided Setup / 14-day trial / automated email / cancel / no long-term contract strings.
- Internal-only / dry-run / founder-operator-only language confined to labeled sections.
- Forbidden public phrases absent from customer-facing sections.
- Verifier, wrapper, and wiring will be asserted by the dedicated verifier.

This completes the Live Integration Activation Readiness Plan packet.
