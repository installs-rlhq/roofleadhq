# Production Security / Auth / RLS / Schema Readiness Plan

Date: 2026-06-17

Canonical source of truth before this worktree must be verified at cc80caf test(pilot): add multi roofer safety tenant isolation acceptance gate.

This is the practical planning and acceptance packet Jason (founder/operator) must use before any production security/auth/RLS/schema implementation begins. The packet converts the multi-roofer safety gate (and its tenant-isolation hold boundaries) into a concrete implementation-readiness plan, with clear hold gates, required decisions, risks, acceptance criteria, and handoff artifacts.

**This is planning/readiness/acceptance only.** Do not implement auth, RLS, schema, migration files, production writes, contractor portal, live automation, credentials, env changes, or backend-or-src changes. This packet performs no production writes, no external service calls, no live sends, no live notifications, no live booking, no live estimate creation, no live quote generation, no invoice/payment behavior, no cron/scheduler behavior, no public route activation, no auth changes, no database policy changes, no migration files, no secrets handling changes, and no access-control implementation.

All work remains dry-run/internal-only/founder-operator-only. This packet performs no production writes, no external service calls, no live sends, no live notifications, no live booking, no live estimate creation, no live quote generation, no invoice/payment behavior, no cron/scheduler behavior, no public route activation, no auth changes, no database policy changes, no migration files, no secrets handling changes, and no access-control implementation.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal worksheets, decision logs, blocker registers, risk registers, qualification notes, reuse evidence logs, and handoff artifacts are internal-only / dry-run / founder-operator-only. This is a planning/readiness/acceptance packet, not implementation and not production security activation. No public founder-led/manual babysitting positioning is used for customers or prospects. No live systems or external calls of any kind are activated by this packet. Dry-run / internal-only / founder-operator-only.

This packet file: `docs/PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md`
This packet includes 9 copy-paste-ready manual tracker tables.
Wrapper: `scripts/run-production-security-auth-rls-schema-readiness-plan-dry-run.sh`
Verifier: `backend/scripts/verify-production-security-auth-rls-schema-readiness-plan-readonly.js`

## 1. Internal-only dry-run scope

This packet is strictly internal-only / dry-run / founder-operator-only. It is the manual planning and readiness packet that converts the prior Multi-Roofer Safety / Tenant-Isolation Acceptance Gate into an enforceable pre-implementation checkpoint for any auth, RLS, schema, or security work. It contains no implementation, no production activation, no external calls, and no changes to any backend, schema, auth, RLS, secrets, or production code. All content is for founder (Jason) manual-review, logging, evidence collection, decision logging, and explicit PASS/HOLD/BLOCKED decision only. No customer or prospect receives internal-only language from this packet. This packet does not activate or implement any production changes. All execution artifacts, trackers, and gate decisions remain local to the founder/operator.

## 2. Production security readiness purpose

The purpose of this packet is to serve as the concrete manual readiness gate and decision framework that must be explicitly passed before any work proceeds on production auth, RLS policies, schema changes, migration files, or security implementation. It receives the completed Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (at cc80caf) plus upstream data protection placement, second paid roofer repeatable launch kit, launch system, and trial direction regression packet as primary inputs. It performs a structured readiness review across auth decisions, RLS design, schema impact, migration sequencing, tenant isolation acceptance criteria, and data access boundaries, and enforces hard HOLD/BLOCKED gates on any production auth/RLS/security implementation, schema/migration, data-write expansion, contractor portal, live automation, or external integration activity. Only an explicit PASS at the final Production Security Readiness Gate (section 17) authorizes consideration of future production security implementation work. This packet produces a concrete PASS/HOLD/BLOCKED gate. This packet exists to prevent accidental production scale and ad-hoc security implementation before tenant isolation and access boundaries are explicitly planned, accepted, and gated. It prevents accidental or ad-hoc implementation.

## 3. Inputs from Multi-Roofer Safety / Tenant-Isolation Acceptance Gate

Primary inputs:
- MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md (post multi-roofer safety gate PASS/HOLD/BLOCKED + 9 trackers + hold gates on auth/RLS/schema + tenant isolation + data protection milestone + one-at-a-time boundary at cc80caf)
- ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md (prior milestone placement, founder requirement "Every roofer’s information and leads must be protected as much as possible from data-breach concerns", and future-scope definitions)
- SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md (repeatable launch + multi-roofer safety boundary confirmation + blocker register + handoff artifact)
- FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (primary container receiving prior handoffs + ongoing multi-roofer planning section)
- WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md (public language enforcement)

Secondary reuse evidence:
- FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md, FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md, FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md (first paid operating sequence patterns)

This packet does not duplicate the full content of any input. It performs the cross-cutting production security / auth / RLS / schema readiness review and produces the implementation-readiness plan + decision logs + acceptance criteria + final PASS/HOLD/BLOCKED production security readiness gate only.

## 4. Auth readiness decision log

This section requires explicit founder decision logging of all material auth decisions that must be resolved (with chosen option, rationale, and evidence pointer) before any auth implementation code may be written. Decisions cover identity model, token strategy, role scoping, service accounts, session boundaries, audit, and integration posture. Each decision is tracked in the Auth Readiness Decision Tracker. Any decision left unmade or without evidence blocks the gate. Future implementation must honor the logged decisions or re-enter HOLD with new review.

## 5. RLS readiness decision log

This section requires explicit founder decision logging of all material RLS design decisions: policy granularity, ownership column strategy, bypass patterns for founder/operator, performance/index implications, testing harness, exception/audit paths, and contractor-visible surfaces. RLS decisions must map directly to tenant isolation acceptance criteria (section 8) and data access boundaries (section 9). Each item is recorded in the RLS Readiness Decision Tracker. No RLS policy may be authored in prod until this log is complete and the final gate is PASSED.

## 6. Schema readiness decision log

This section requires explicit founder decision logging of schema impact decisions: new or altered tables/columns for roofer ownership and tenant boundaries, indexes for isolation queries, constraint and FK strategy, audit/ledger tables, views or functions for safe access, data type choices for keys, and any public vs private schema separation. All schema decisions must be compatible with zero-downtime migration and the one-at-a-time dry-run operating rule until full implementation. Tracked in the Schema Readiness Decision Tracker.

## 7. Migration readiness decision log

This section requires explicit founder decision logging of migration strategy and sequencing decisions: migration tool and numbering, dry-run test database strategy, fixture data for isolation tests, rollback/forward verification steps, post-migration data validation queries, production cutover plan (future), audit of migration execution, and coordination with auth/RLS rollout. Migrations remain planning only; no migration files are created by this packet. Tracked in the Migration Readiness Decision Tracker.

## 8. Tenant isolation acceptance criteria

Before any production security implementation may begin, the following tenant isolation acceptance criteria must be reviewed, accepted (or explicitly HOLD with mitigation), and evidenced in the Tenant Isolation Acceptance Tracker:

- Every lead, appointment, outcome, note, contact, and contractor-linked record must have a strongly enforced owning_roofer (or equivalent tenant) association with no cross-roofer visibility possible under normal queries.
- RLS (or equivalent row filters) must be the primary enforcement mechanism for contractor and automated paths; founder/operator elevated access must be explicit, time-bounded where practical, and append-only audited.
- No service-role or admin path may return data for a roofer without an explicit, logged reason and caller identity.
- Cross-roofer test cases (simulated via direct queries or policy bypass attempts) must demonstrably fail in the planned test harness before implementation is considered complete. cross-roofer test cases must demonstrably fail.
- Tenant boundaries must survive common error paths (RLS disabled in dev, service role usage, raw SQL, exports, backups, reporting queries).
- Contractor portal/dashboard surfaces (future) must receive only self-owned data; no "all roofers" or list-all views without explicit super-admin gating.
- Right-to-be-forgotten / roofer offboard must delete or fully isolate that roofer's data without leakage to other tenants.
- Audit logs themselves must not create cross-tenant visibility (logs may be founder-only or per-roofer partitioned).

All criteria are recorded with owner/status/evidence/next-action in the Tenant Isolation Acceptance Tracker. Missing or un-evidenced criteria block the Production Security Readiness Gate.

## 9. Data access boundary acceptance criteria

Complementary to tenant isolation, the following data access boundary acceptance criteria must be satisfied (or HOLD-accepted) before implementation:

- Least-privilege matrix: founder/operator (full read for ops + manual ops coordination with audit), contractor (own tenant only + limited write to own records), homeowner (self-service read-only on own appointments where exposed, future).
- All production queries that touch lead/appointment/outcome data must include an effective tenant filter (via RLS, explicit WHERE, or safe view) except for explicitly scoped founder admin paths.
- Reporting, exports, and analytics must be tenant-aware or founder-only; no cross-roofer aggregates visible to contractors.
- Secrets and credential access must be scoped per environment; no shared production credentials usable for cross-tenant reads.
- Backup/restore and tenant-aware recovery must respect boundaries (restore of one roofer must not expose another).
- Breach detection and response runbooks must include tenant-specific notification and containment steps.
- Access review process must cover who can elevate (founder only initially), how elevation is requested/logged/revoked, and periodic audit.
- Any future external integration that receives lead or roofer data must have DPA + data-sharing boundary review and explicit per-roofer consent flow.

Tracked in the Data Access Boundary Tracker. These criteria feed the security implementation prerequisite checklist.

## 10. Contractor portal hold boundary

**HOLD GATE: Contractor portal or dashboard exposure remains blocked until this readiness plan is PASSED and a subsequent tenant-isolation + auth/RLS implementation packet is complete and re-verified.**

No contractor dashboard, portal, self-service surface, per-roofer view, or roofer-visible UI beyond founder/operator internal use may be activated or implemented until this gate records explicit PASS. The Multi-Roofer Safety Gate and prior Data Protection packet explicitly placed this as "BLOCKER BEFORE CONTRACTOR PORTAL OR DASHBOARD EXPOSURE". This readiness plan re-enforces that the auth/RLS/schema work required to safely expose any contractor surface must first pass this production security readiness gate + full implementation + re-gate. Any exposure or preparation of contractor-facing surfaces without PASS here (and subsequent gates) is forbidden.

## 11. Production write hold boundary

**HOLD GATE: Production data writes and broader Supabase write surface expansion remain blocked until this readiness plan is PASSED and tenant-isolation implementation is complete.**

No production Supabase writes for leads, appointments, outcomes, contractor data, billing events, or any expansion beyond current gated dry-run/test-only patterns may occur until this gate records explicit PASS. no production Supabase writes. All production write paths must be designed under the auth/RLS decisions logged here and must pass the tenant isolation and data access acceptance criteria. This packet performs no data writes and asserts that production data-write expansion is blocked pending security and tenant-isolation readiness. Any indication of production write activation or intent outside explicit dry-run test fixtures is a blocking condition.

## 12. Live automation hold boundary

**HOLD GATE: Live automation (SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation) remains blocked.**

No live homeowner SMS / Twilio sending, live Calendar booking / event creation for homeowners or contractors, live Vapi calls, Resend emails, Lindy workflows, cron jobs, scheduler activation, dispatcher production runner, or any automated production-triggered workflow may be activated until this gate records explicit PASS (and subsequent security impl + re-verification). All such capabilities remain DISABLED. This packet asserts and the verifier confirms the disabled state. The one-at-a-time dry-run operating rule is the only permitted mode. Live automation activation is a hard blocker on the Production Security Readiness Gate until the full readiness + implementation sequence is complete.

## 13. Security implementation prerequisite checklist

Before PASS at the Production Security Readiness Gate, the following prerequisite checklist items must be logged with owner + evidence + timestamp (or explicitly accepted HOLD with mitigation and re-review date):

- All four decision logs (Auth, RLS, Schema, Migration) complete with chosen options, rationale, and evidence pointers.
- Tenant Isolation Acceptance Tracker: all criteria PASS or accepted HOLD with mitigation.
- Data Access Boundary Tracker: all criteria PASS or accepted HOLD with mitigation.
- Contractor Portal Hold Tracker, Production Write Hold Tracker: no violations; boundaries honored in planning.
- Security implementation test plan (isolation test cases, cross-tenant failure tests, RLS policy unit tests, migration dry-run harness) reviewed and accepted.
- Founder/operator elevated access model + audit logging plan reviewed and accepted.
- Rollback, recovery, and breach-response implications of proposed schema/RLS/auth reviewed.
- Performance and index impact of RLS + tenant filters reviewed (or HOLD-accepted for later measurement).
- External integration data-sharing boundaries (future) scoped and gated.
- All items from the prior Roofer Data Protection Tenant Isolation Readiness Milestone and Multi-Roofer Safety Gate trackers confirmed carried forward or resolved.
- No production auth/RLS/schema/migration implementation has begun (verified by absence in changed files + this packet).
- Signed founder confirmation that the Roofer Data Protection and Tenant Isolation Readiness Milestone remains honored and that this readiness plan is the non-skippable gate before any security implementation work.

## 14. Risk and blocker register

All risks and blockers from the Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (at cc80caf) and upstream Data Protection packet are carried forward. New risks specific to production security / auth / RLS / schema readiness:

- Under-scoping of RLS performance impact on reporting and list queries after tenant filters added.
- Service role or founder bypass paths accidentally left open or insufficiently audited.
- Schema migration sequencing conflicts with existing dry-run data shapes.
- Auth identity model chosen for contractors creates future friction with homeowner self-service or external calendar sync.
- Test harness for "cross-roofer must fail" is incomplete, leading to false PASS on isolation.
- Source-of-truth drift between agent worktree and canonical main during long implementation phase.
- Pressure to activate contractor portal or live automation before full tenant isolation impl + re-gate.
- Incomplete decision log leading to implementation that violates one or more acceptance criteria.

BLOCKED items must be resolved or explicitly risk-accepted by founder with mitigation and re-review date before any future security implementation packet may be started. This register feeds the implementation handoff artifact.

## 15. Approval evidence checklist

Before PASS at the Production Security Readiness Gate, the following must be logged with owner + evidence + timestamp:

- Auth Readiness Decision Tracker: all rows have chosen decision + owner + evidence or accepted HOLD.
- RLS Readiness Decision Tracker: all rows complete.
- Schema Readiness Decision Tracker: all rows complete.
- Migration Readiness Decision Tracker: all rows complete.
- Tenant Isolation Acceptance Tracker: all rows PASS or explicitly accepted HOLD with mitigation.
- Data Access Boundary Tracker: all rows PASS or explicitly accepted HOLD with mitigation.
- Production Write Hold Tracker, Contractor Portal Hold Tracker, Live Automation Hold Tracker: boundaries re-confirmed with no active violations.
- Security Readiness Gate Tracker: final row records explicit founder PASS with date, evidence summary, and cross-reference to all prior trackers + input gate PASS artifacts.
- Signed founder confirmation that "every roofer’s information and leads must be protected as much as possible from data-breach concerns" remains honored and that the Roofer Data Protection and Tenant Isolation Readiness Milestone + Multi-Roofer Safety Gate are satisfied as preconditions for this readiness plan.
- Evidence that no forbidden implementation files were changed (no backend-or-src, no migration files, no schema/auth/RLS code, no env/secrets, no production routes, no external/live activation).

## 16. Implementation handoff artifact

On explicit PASS at the Production Security Readiness Gate, this packet produces a handoff artifact (recorded in the Security Readiness Gate Tracker final row and referenced in the gate decision) containing:

- Summary of all 9 tracker outcomes (PASS or accepted HOLD with mitigations and owner/due).
- Cross-reference to Multi-Roofer Safety Gate (cc80caf) + Data Protection packet + Second Paid Roofer Repeatable Launch Kit + Launch System Packet + Trial Direction Regression packet PASS artifacts and verifier timestamps.
- Explicit statement that data protection / tenant isolation milestone is satisfied for the reviewed scope and that production security readiness criteria are accepted.
- Consolidated decision log (auth + RLS + schema + migration choices).
- Tenant isolation and data access acceptance criteria (accepted or HOLD-mitigated).
- Risk register with accepted items and mitigations.
- Recommended next owner and phase for a future "Production Security / Auth / RLS / Schema Implementation Packet" (or equivalent) only after this gate PASS. The implementation packet itself must pass the aggregate pilot readiness verifier and quality gate before any code changes.
- Confirmation that one-at-a-time dry-run operating rule, contractor portal hold, production write hold, and live automation hold remain in force until implementation is complete, re-verified at the Multi-Roofer Safety Gate (or successor), and re-approved.
- Founder sign-off date and evidence pointer.
- List of deferred future implementation work (actual RLS policy files, migration files, auth wiring, schema alters, contractor portal security review, etc.).

This handoff feeds the Launch System Packet (ongoing multi-roofer planning + security section) and any future 90-day plan refresh. No implementation work begins from this handoff without a separate, approved implementation packet that itself passes the aggregate pilot readiness verifier and quality gate.

## 17. PASS/HOLD/BLOCKED production security readiness gate

The gate decision is recorded in the Security Readiness Gate Tracker (final table). Rules:

- Only PASS advances consideration of production auth/RLS/schema/security implementation work.
- Any HOLD item in any of the 9 trackers with unresolved owner/due date blocks PASS.
- Any BLOCKED item (missing critical evidence, active production auth/RLS/schema work detected, violation of hold boundaries, forbidden phrase in public artifacts, decision log incomplete, acceptance criteria un-evidenced, etc.) forces BLOCKED.
- Founder must manually confirm all safety guardrails (section 18) and public-vs-internal language boundary (section 19) before recording PASS.
- The gate decision must be re-run (full verifier + wrapper + quality gate) on every material change to input gates/kits or operating status.
- On PASS: produce handoff artifact (section 16) + update Launch System Packet + business buildout daily guide + contexts + verifier index.
- On HOLD or BLOCKED: document root cause, owner, due date, and re-review plan. No security implementation or scaling work proceeds.

## 18. Safety guardrails

Confirmed Disabled (No Activation in Any Form):

- Live homeowner SMS / Twilio sending: DISABLED
- Live Calendar booking / event creation for homeowners or contractors: DISABLED
- Live Vapi outbound or inbound production calls: DISABLED
- Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED
- Auth / RLS / security policy implementation or changes: NONE (planning and decision logging only)
- Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none
- Live automation, cron, scheduler, dispatcher production runner: DISABLED
- Resend / Lindy / CRM automation production paths: DISABLED
- Contractor portal or dashboard exposure: NONE
- External service calls in production scope: NONE
- Payment/estimate/quote/invoice automation: NONE
- No customer proof publication without roofer approval/consent (re-confirmed from proof/referral/expansion kit)
- No guarantee language, no revenue promises, no pressure-based referral language, no "founder-led-launch-program" or "founder-review" public positioning (enforced by WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and this packet)
- One-at-a-time dry-run only until explicit PASS at Multi-Roofer Safety Gate + this production security readiness gate + future security implementation approved and re-verified

This packet references MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md (at cc80caf), ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md, SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md, and WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md for boundary enforcement. No live automation, no production multi-tenant, no contractor portal, no auth/RLS/schema/migration implementation, no production writes, no external integrations are activated or implemented by this packet. No live automation, no production multi-tenant, no contractor portal, no auth/RLS changes.

## 19. Public-vs-internal language boundary

Customer-facing / public language (used only in artifacts shared with roofers, prospects, or value narratives):

- Must use exactly the approved strings: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract.
- Must not use: "founder-led-launch-program" or "founder-review" public positioning (enforced by WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and this packet), or any variant that implies founder babysitting, guarantees, or live automation.

Internal founder/operator/manual/dry-run language (PASS/HOLD/BLOCKED decisions, blocker registers, trackers, handoff artifacts, safety sections, risk notes, decision logs) is permitted only inside clearly labeled "Internal-only / founder-operator-only" or "Internal only:" sections of this packet and must never leak into customer-facing artifacts, roofer handoff documents, or public copy. The verifier enforces the boundary by scanning content before the Forbidden Public Phrases restatement. internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections.

Forbidden Public Phrases (Reference — Full List Enforced by Verifier):
Founder-Led Launch Program, Request Founder-Led Launch Review, founder review, manual review, manual coordination, Live Automation Disabled, Monthly billing starts on day 15, Monthly billing on day 15, day 15, 14-day launch trial, seven-day pilot (or any 7-day pilot variant), five-qualified-appointment short-window claim (or 5 qualified appointments), book jobs, booked jobs, booked-job, guaranteed appointments, guaranteed revenue, guaranteed jobs, automatic estimate, automatic quote, automatic invoice, automatic payment, You book the inspection.

### Auth Readiness Decision Tracker

| Item | Decision Point / Options | Owner | Status | Evidence | Next Action |
|------|--------------------------|-------|--------|----------|-------------|
| Auth provider model | Supabase built-in Auth (magic link + jwt-token) for contractors/homeowners vs custom jwt-token service | | | | |
| Service role usage | Service role restricted to founder/operator admin paths only; never used for contractor queries | | | | |
| Roofer / tenant principal | roofer_id claim in jwt-token or separate roofer_sessions table with FK | | | | |
| Founder/operator elevated access | Dedicated founder super-role or service key with mandatory append-only audit log | | | | |
| Contractor session lifetime | Short-lived tokens (minutes) + refresh; explicit logout/revoke on roofer offboard | | | | |
| Homeowner vs contractor identity | Separate homeowner magic-link flow; contractor requires explicit invite/approval | | | | |
| Password / secret storage | No app-level password hashing; delegate to Supabase or external IdP | | | | |
| Audit of auth events | All sign-in, role change, token issuance, elevation events logged with caller + timestamp | | | | |
| Future external IdP / SSO | Deferred until after tenant isolation impl; boundary defined now | | | | |
| Token signing / validation | Supabase jwt-token validation in backend; no custom signing keys in prod initially | | | | |

### RLS Readiness Decision Tracker

| Item | Decision Point / Options | Owner | Status | Evidence | Next Action |
|------|--------------------------|-------|--------|----------|-------------|
| Ownership column strategy | Add owning_roofer_id (UUID FK to roofers) on leads, appointments, outcomes, notes, contacts | | | | |
| Policy granularity | Per-table policies for SELECT/INSERT/UPDATE/DELETE; one policy per operation or combined USING | | | | |
| Contractor-visible policies | RLS must return zero rows for other roofers' data even under authenticated contractor jwt-token | | | | |
| Founder/operator bypass | Explicit SECURITY DEFINER function or separate admin path with audit wrapper (no blanket disable RLS) | | | | |
| Reporting / analytics paths | Tenant-aware views or RLS-safe materialized paths; no cross-roofer raw queries | | | | |
| Index requirements | Composite indexes on (owning_roofer_id, created_at) and similar for common filters | | | | |
| Test harness for isolation | Automated queries that attempt cross-roofer access must fail under RLS (in dry-run + planned prod tests) | | | | |
| Export / backup boundaries | Exports must be explicitly scoped per roofer or founder-only | | | | |
| RLS + service role interaction | Service role bypasses RLS by design; all service role usage must be narrow + audited | | | | |
| Policy change process | All future RLS alters must pass re-review at security readiness gate + migration review | | | | |

### Schema Readiness Decision Tracker

| Item | Decision Point / Options | Owner | Status | Evidence | Next Action |
|------|--------------------------|-------|--------|----------|-------------|
| Tenant / roofer ownership column | owning_roofer_id (uuid, not null, FK to roofers.id) added to all tenant-scoped tables | | | | |
| New supporting tables | roofers (id, name, contact_email, status, created_at, ...), roofer_users (junction for authz), audit_logs (tenant-aware) | | | | |
| Constraint and FK policy | ON DELETE RESTRICT or SET NULL per table; no cascade delete of leads on roofer delete (archive first) | | | | |
| Audit / ledger tables | append-only audit_events with roofer_id or null for founder actions | | | | |
| Public vs private schema | Keep all tenant data in private schema; public schema limited to safe read-only views if needed | | | | |
| Reporting table impacts | Add roofer_id to any fact tables used by weekly/monthly reports; update queries | | | | |
| Data type for keys | UUID for all PKs and FKs (Supabase default); avoid serial for tenant keys | | | | |
| Soft delete vs hard | Soft delete (deleted_at) for leads/outcomes to support recovery and audit; hard delete for PII on offboard | | | | |
| Index and perf planning | Identify hot paths that will need (roofer_id, timestamp) indexes post-schema | | | | |
| Schema drift prevention | Single source of truth in migration files + schema snapshot in repo; no ad-hoc prod alters | | | | |

### Migration Readiness Decision Tracker

| Item | Decision Point / Options | Owner | Status | Evidence | Next Action |
|------|--------------------------|-------|--------|----------|-------------|
| Migration tool and format | Supabase CLI migration steps (or equivalent); numbered sequential files only | | | | |
| Dry-run test DB strategy | Spin fresh Supabase local / test project per migration test run; seed with multi-roofer fixture data | | | | |
| Isolation test data | Fixture data must include >=2 roofers with overlapping-looking records (same names, phones) to verify filters | | | | |
| Rollback plan | Every migration has corresponding down migration or explicit restore-from-snapshot procedure | | | | |
| Post-migration validation | Automated queries (owned by verifier scripts) that assert tenant isolation + row counts per roofer | | | | |
| Production cutover sequencing | Auth changes first (if any), then schema + RLS policies in single transaction where possible, then app code | | | | |
| Zero-downtime constraints | Migrations must be compatible with current app version (expand/contract or view compatibility) | | | | |
| Audit of migration execution | Manual founder run of migration steps in staging + prod; log + snapshot before/after | | | | |
| Revert trigger | Any post-mig test failure immediately triggers founder decision review + potential rollback before further rollout | | | | |
| Coordination with auth/RLS | Migrations that add columns or tables required by RLS must be in same release boundary as policy activation | | | | |

### Tenant Isolation Acceptance Tracker

| Item | Acceptance Criterion | Owner | Status | Evidence | Next Action |
|------|----------------------|-------|--------|----------|-------------|
| Lead / appointment / outcome tenant association | Every record has non-null owning_roofer_id with FK; no orphan records | | | | |
| RLS (or filter) enforcement on contractor paths | Contractor jwt-token + RLS returns only own-roofer rows; cross-roofer query returns 0 | | | | |
| Service role / founder bypass audit | All service-role reads/writes for tenant data are wrapped with explicit caller + reason log | | | | |
| Cross-roofer failure tests | Test suite contains queries attempting access to other roofer's data and asserts failure under RLS | | | | |
| Export / report / backup isolation | All exports, reports, backups are explicitly scoped or founder-only; no cross-roofer leakage | | | | |
| Offboard / right-to-be-forgotten | Decommission script removes or fully isolates one roofer's data without affecting others | | | | |
| Error path resilience | RLS still enforced when app errors, raw SQL used in admin tools, or in reporting jobs | | | | |
| Contractor portal readiness (future) | Any contractor-facing query or view is provably scoped to the authenticated roofer only | | | | |
| Founder/operator visibility | Founder can see across roofers only via explicit elevated path with audit (not blanket) | | | | |
| Vendor / integration sharing | Any external service receiving tenant data has per-roofer scope + DPA + consent log | | | | |

### Data Access Boundary Tracker

| Item | Acceptance Criterion | Owner | Status | Evidence | Next Action |
|------|----------------------|-------|--------|----------|-------------|
| Least-privilege role matrix | Founder (elevated + audit), contractor (self only), homeowner (self only on exposed surfaces) | | | | |
| Query boundary enforcement | All prod paths that touch tenant data carry effective tenant filter | | | | |
| Reporting / analytics boundary | Reports either per-roofer or founder-only aggregate; no contractor sees other roofers' data | | | | |
| Secrets / credential boundary | Prod credentials never usable to cross tenant boundaries; env separation enforced | | | | |
| Backup / restore boundary | Tenant-aware restore; restore of one does not grant visibility to another | | | | |
| Breach response boundary | Runbook includes tenant-specific notification + containment (notify affected roofer) | | | | |
| Access review process | Periodic review of who holds founder elevation; revocation path documented | | | | |
| Audit log boundary | Audit logs do not leak tenant data to unauthorized viewers; founder-only or partitioned | | | | |
| External integration boundary | Future integrations receive only explicitly consented, scoped tenant data + DPA | | | | |

### Production Write Hold Tracker

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Production Supabase writes disabled | No leads/appointments/outcomes/contractor/billing writes in prod until readiness + impl complete | | | | |
| Write surface remains gated dry-run | Only current test/fixture patterns permitted | | | | |
| No mutation in this packet | Packet is planning/readiness + manual logging only | | | | |
| Broader write expansion blocked | Explicit blocker until security + tenant isolation implementation complete and re-gated | | | | |
| Write paths in future impl must honor decisions | All planned write paths must use logged auth/RLS decisions + pass isolation criteria | | | | |
| Verifier + wrapper clean | No supabase client access (from/rpc/service-role) in safety artifacts | | | | |

### Contractor Portal Hold Tracker

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| No contractor dashboard/portal | No self-service, per-roofer views, or roofer-visible UI until after this readiness PASS + full impl | | | | |
| No exposure beyond founder/operator internal | All current surfaces remain internal-only | | | | |
| Data boundary preserved | No cross-roofer data visible to any future contractor surface | | | | |
| BLOCKER language honored | "BLOCKER BEFORE CONTRACTOR PORTAL OR DASHBOARD EXPOSURE" from data protection + multi-roofer gate | | | | |
| Future portal work gated | Requires this production security readiness PASS + tenant isolation impl + re-verification at safety gate | | | | |

### Security Readiness Gate Tracker

| Gate | Decision Criteria Summary | Owner | Status | Evidence | Next Action |
|------|---------------------------|-------|--------|----------|-------------|
| Auth Readiness Decision Log | All rows have chosen decision + evidence | | | | |
| RLS Readiness Decision Log | All rows have chosen decision + evidence | | | | |
| Schema Readiness Decision Log | All rows have chosen decision + evidence | | | | |
| Migration Readiness Decision Log | All rows have chosen decision + evidence | | | | |
| Tenant Isolation Acceptance | All criteria PASS or accepted HOLD | | | | |
| Data Access Boundary Acceptance | All criteria PASS or accepted HOLD | | | | |
| Production Write Hold | Write surface at gated dry-run only; no violations | | | | |
| Contractor Portal Hold | No portal/dashboard exposure or prep | | | | |
| Live Automation Hold | All live automation DISABLED | | | | |
| Security Implementation Prerequisite Checklist | All items logged or HOLD-accepted | | | | |
| Risk and Blocker Register | All carried + new risks reviewed; BLOCKED resolved or accepted | | | | |
| Safety guardrails re-confirm | Section 18 confirmed at gate execution | | | | |
| Public-vs-internal boundary | Section 19 + forbidden phrases absent | | | | |
| Input gate references + verifiers | Multi-Roofer Safety Gate (cc80caf) + Data Protection + Second Paid + Launch + Trial Regression + verifiers green | | | | |
| Founder sign-off | Explicit PASS only after full evidence | | | | |
| Production Security Readiness Gate | FINAL: PASS / HOLD / BLOCKED (only PASS advances to implementation consideration) | | | | |

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-production-security-auth-rls-schema-readiness-plan-readonly.js
node backend/scripts/verify-production-security-auth-rls-schema-readiness-plan-readonly.js
scripts/run-production-security-auth-rls-schema-readiness-plan-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (primary recent input + hold gates + tenant isolation + data protection milestone at cc80caf): `docs/MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md` + its wrapper and verifier
- Roofer Data Protection and Tenant Isolation Plan Placement Packet (founder requirement + milestone placement): `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md` + its wrapper and verifier
- Second Paid Roofer Repeatable Launch Kit (repeatable launch + multi-roofer safety boundary): `docs/SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md` + its wrapper and verifier
- First Paid Roofer Launch System Packet (primary container for ongoing planning): `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier
- Website Trial Direction Regression packet (public language enforcement): `docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md` + its wrapper and verifier

- Wired into: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`, `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md`, `docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md`, and AGENT_PRODUCT_QUALITY_GATE.md (via wrapper + aggregate).

Reference: See AGENT_PRODUCT_QUALITY_GATE.md for the product-depth rule this packet satisfies (operational usefulness, concrete fields, decision logs, templates, wiring, safety). This packet is the next safest product-moving RoofLeadHQ packet after the Multi-Roofer Safety / Tenant-Isolation Acceptance Gate. It exists solely to produce a gated, decision-logged, criteria-defined readiness plan that must be PASSED before any production security/auth/RLS/schema implementation work may begin. The 14-day trial begins after RoofLeadHQ AI setup goes live. Cancel anytime. No long-term contract. Internal-only / dry-run / founder-operator-only.

## No production activation / no schema / no auth-change safety rules

This packet is explicitly:
- Planning / readiness / acceptance packet only: yes
- Auth implementation: no
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

No security controls, auth implementation, schema, RLS, migration files, or access logic are implemented by this packet. All remain future work gated behind this PASS + separate approved implementation packets that themselves pass aggregate readiness and quality gate. Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation).

## Explicit acceptance/readiness only confirmation

This packet asserts and the verifier will enforce:
- This is planning/readiness/acceptance only.
- Does not implement auth, RLS, schema, migration files, production writes, contractor portal, or live automation.
- Does not activate or implement live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, external service calls, credentials, secrets, env changes, migration files, or backend-or-src-directory changes.
- does not implement auth, RLS, schema, migration files, production writes, contractor portal, or live automation (explicit for verifier).
- asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation).
- All changes are docs + scripts wrapper + read-only verifier only.

## Founder/operator decision log

- Packet created: internal review of multi-roofer safety gate (cc80caf) hold gates + tenant isolation acceptance turned into concrete production security / auth / RLS / schema readiness decision framework and pre-implementation gate.
- Decision: HOLD until founder executes full decision logs, acceptance criteria review, prerequisite checklist, risk register, and records explicit PASS.
- Next manual action: Run the verification commands in order; complete all 9 trackers with evidence; confirm all acceptance criteria or HOLD with mitigations; confirm safety guardrails and language boundary; record gate decision.
- Owner: Founder (Jason Lohse)
- Re-review cadence: Before any production auth/RLS/schema/migration work, before any contractor portal or broader write expansion, before any future implementation packet, and on any material change to operating status or input gates.

## Next-operator handoff

Safety reminder: This readiness plan + gate is the last manual checkpoint before any consideration of production security/auth/RLS/schema implementation work. If in doubt, default to HOLD/BLOCKED. Re-run the full wrapper + aggregate + quality gate on every handoff. One-at-a-time dry-run, contractor portal hold, production write hold, and live automation hold remain in force until explicit PASS here + full implementation + re-verification at the Multi-Roofer Safety Gate (or successor). The 14-day trial begins after RoofLeadHQ AI setup goes live. Cancel anytime. No long-term contract. Internal-only / dry-run / founder-operator-only.

PASS message from verifier must be visible and clean before any further consideration. Do not push. Do not touch production behavior.
