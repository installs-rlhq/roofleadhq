# Lindy Bridge + Native Workflow Migration Plan

## Purpose and Scope

This packet defines a practical bridge strategy for Lindy while RoofLeadHQ builds native workflow logic in the backend and Supabase. It is a planning/readiness/placement artifact only — not live automation, not sends, not CRM connection, and not production behavior.

RoofLeadHQ is the roofing lead-to-inspection operating layer. It responds fast, follows up, recovers missed leads, supports appointment readiness, books homeowner inspections on the roofer's calendar, tracks what happened, supports post-inspection follow-up, captures optional homeowner feedback, and provides reporting/export.

### Strategic bridge direction

Jason agreed to a practical bridge strategy for Lindy. Because Lindy's monthly plan change removed most of the value from already-purchased tokens, RoofLeadHQ should not abruptly throw away existing Lindy workflows.

**This packet states clearly:**

- Lindy is not being removed immediately.
- Existing Lindy workflows may be preserved temporarily.
- Lindy usage should be limited/downgraded where possible to reduce cost — downgrade or limit Lindy usage to the lowest workable/free plan where possible.
- Major new business logic should not be built in Lindy.
- RoofLeadHQ/Supabase should become the source of truth.
- Native backend workflow logic should replace Lindy over time.
- n8n/Make are not required unless a narrow temporary bridge is needed.
- Do not rebuild Lindy inside n8n or Make as the permanent system.

### Product outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a single artifact that:

- Documents Lindy's temporary bridge role and cost-control posture.
- Maps every Lindy responsibility into migration buckets with a tracker table.
- Defines native RoofLeadHQ/Supabase workflow engine ownership.
- Describes the first paid roofer bridge approach without making Lindy the permanent source of truth.
- Locks subscription tiers as configuration profiles on one core workflow engine.
- Connects staged E2E testing to safe migration validation.
- Preserves `demo_ready_with_live_automation_disabled`.

Success criteria: a founder/operator can review Lindy bridge assumptions, native migration priorities, and first-roofer operating boundaries without activating any live system.

### Connected launch packets

This packet connects:

- `docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md`
- `docs/LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md`
- `docs/PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md`
- `docs/PRICING_VOLUME_GUARDRAIL_AND_INTAKE_ALIGNMENT_PACKET.md`
- `docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md`
- `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

Verifier and wrapper references:

- `docs/LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md`
- `scripts/run-lindy-bridge-native-workflow-migration-dry-run.sh`
- `backend/scripts/verify-lindy-bridge-native-workflow-migration-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

## Safety Posture

- planning/readiness/placement packet only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- no live Lindy workflows
- no live automations
- no live SMS
- no Twilio live sends
- no Vapi live calls
- no Resend live emails
- no Google Calendar event creation
- no scheduler/cron/dispatcher activation
- no public route activation
- no production Supabase writes
- no production customer data handling changes
- no auth/RLS/schema/security changes
- no env/credential changes
- no external service calls
- no homeowner/customer notifications
- no CRM sync
- no native CRM sync
- no payment/deposit/invoice/estimate automation
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
- LINDY_ACTIVATION=false

This packet does not perform production Supabase writes. Does not change env/credentials. Does not change auth/RLS/schema/security. Does not activate external sends, public routes, cron, scheduler, or dispatcher.

## Source-of-Truth Workflow

Canonical source of truth before this worktree: `ac9525e test(pilot): add post-inspection follow-up feedback packet`

Before using or editing this packet, verify Terminal 1 source of truth:

- `cd /root/roofleadhq`
- `pwd`
- `git rev-parse --show-toplevel`
- `git fetch origin main`
- `git status --short`
- `git log --oneline -12`

Required state:

- Work only in `/root/roofleadhq` or an approved agent worktree created from it.
- Do not use `/root/.openclaw/workspace`.
- OpenClaw summaries alone are not trusted.
- This packet does not authorize activation from an agent worktree.

## 1. Purpose and Scope (Detailed)

This packet defines a practical temporary bridge strategy for Lindy while RoofLeadHQ builds native workflow logic. The goal is to preserve useful existing Lindy work at low cost, stop expanding Lindy as the permanent workflow engine, and move authoritative workflow state into RoofLeadHQ/Supabase over time.

Lindy is a temporary bridge — not the long-term workflow authority. Existing Lindy workflows may continue only where they help early testing or the first paid roofer at low volume. All new durable business logic should land in RoofLeadHQ backend services and Supabase state, not in Lindy, n8n, or Make.

## 2. Updated Lindy Role

### Lindy may temporarily be used for

- existing workflows already built
- light edits to current flows
- low-volume first-roofer bridge workflows
- internal/back-office support
- draft-only planning artifacts
- temporary manual/founder-assisted flows
- non-critical helper automations

### Lindy should not own long term

- homeowner SMS experience
- customer-facing booking flow
- lead status source of truth
- dashboard data
- production reports from live data
- Supabase source-of-truth logic
- production workflow timers
- live sends
- multi-roofer routing logic
- CRM sync
- payment, quote, estimate, invoice, or deposit workflows
- customer-facing workflow authority

Lindy remains a low-volume bridge only. It must not become the permanent source of truth for lead status, dashboard data, or customer-facing workflow authority.

## 3. Native Architecture Direction

Long-term architecture:

- RoofLeadHQ backend
- Supabase source of truth
- native workflow state machine
- direct integrations only after explicit approval

Eventually direct integrations may include:

- Twilio for SMS
- Vapi for calls
- Resend for email
- Google Calendar for booking
- Supabase for records, state, reporting, tenant/customer data, and workflow state

Native workflow logic in RoofLeadHQ backend should own transitions, timers (when approved), review queues, and reporting state. Supabase should hold authoritative records, tenant boundaries, workflow state, and export/reporting inputs. Direct channel integrations remain blocked until explicit Jason approval through the live integration readiness gates.

n8n/Make are not required unless a narrow temporary bridge is needed. Do not rebuild Lindy inside n8n or Make as the permanent system.

## 4. Migration Buckets

Every Lindy responsibility should be mapped into one of these buckets:

- **Preserve temporarily in Lindy** — keep existing low-volume flows running at minimal cost while native logic is built.
- **Move into RoofLeadHQ backend workflow logic** — state transitions, review queues, timers (when approved), routing rules, and workflow orchestration.
- **Move into Supabase data/state logic** — authoritative records, lead status, workflow state, reporting inputs, tenant/customer data.
- **Keep manual/founder-operated for first paid roofer** — sensitive review, approval, and coordination until native paths are proven.
- **Remove or defer** — capabilities that should not be rebuilt in Lindy or carried forward without explicit approval.

### Migration tracker table

| Workflow area | Current/proposed Lindy role | Migration bucket | Future owner | First paid roofer approach | Safety boundary | Migration trigger | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Lead intake capture | May mirror intake events temporarily | Move into Supabase data/state logic | Supabase + RoofLeadHQ backend | Native/fixture intake is authoritative; Lindy may assist only if already built | No production writes from this packet | Native intake record model approved | Lindy must not remain intake source of truth |
| Lead source tracking | Optional helper tagging | Move into Supabase data/state logic | Supabase | Growth+ config; manual tagging acceptable for first roofer | Fixture/fake data in testing only | Lead source fields in native model | Align with pricing volume guardrail packet |
| Lead status | May hold interim status today | Move into Supabase data/state logic | Supabase + native workflow engine | RoofLeadHQ/Supabase status is authoritative | No live Lindy status sync without approval | Native status machine passes staged E2E | Critical source-of-truth migration |
| Fast response / follow-up drafts | Existing Lindy flows may draft responses | Move into RoofLeadHQ backend workflow logic | Native workflow engine | Draft-only or manual review; no live sends | No live SMS/Twilio sends | Native response state proven in sandbox | Preserve useful drafts only |
| Missed-lead recovery state | May exist in Lindy helper flows | Move into RoofLeadHQ backend workflow logic | Native workflow engine | Growth+; manual recovery acceptable for first roofer | No live sends | Recovery branch passes fixture E2E | Do not expand Lindy recovery logic |
| Manual outreach state | Founder-assisted follow-up | Keep manual/founder-operated for first paid roofer | Founder-operator + roofer | Manual command packets remain primary | No homeowner/customer notifications | Native manual-outreach state modeled | Roofer review default |
| Roofer review queue | Light Lindy notifications possible | Move into RoofLeadHQ backend workflow logic | Native workflow engine | Roofer review remains default for business judgment | No uncontrolled automation | Native review queue UI/state ready | Business judgment stays with roofer |
| RoofLeadHQ/Jason system review queue | Internal alerts only | Move into RoofLeadHQ backend workflow logic | Native workflow engine | Limited to system/workflow/data/routing/quality issues | No customer-facing authority | System-quality review path documented | Not a substitute for roofer review |
| Appointment readiness state | May exist in Lindy coordination helpers | Move into RoofLeadHQ backend workflow logic | Native workflow engine | Manual appointment readiness command packets for first roofer | No Google Calendar event creation | Readiness state passes staged E2E | Booked inspections language only |
| Booked inspection tracking | May log bookings temporarily | Move into Supabase data/state logic | Supabase + native workflow engine | Supabase record is authoritative when native path exists | No live calendar writes | Native booking record model approved | Use booked inspections / booked homeowner appointments |
| Post-inspection follow-up state | Existing helper flows only | Move into RoofLeadHQ backend workflow logic | Native workflow engine | Align with post-inspection follow-up packet | Sandbox-only timing until approved | Post-inspection native states pass E2E | No live reminder sends from packet |
| Post-inspection feedback capture state | Optional helper prompts | Move into Supabase data/state logic | Supabase + native workflow engine | `permission_to_use_publicly` required in native model | No public testimonial without permission | Feedback fields in native schema plan | Internal-only by default |
| Report / CSV export state | Lindy must not own production reports | Move into Supabase data/state logic | Supabase + RoofLeadHQ backend | Fake/fixture data only in testing | No production reports from live Lindy data | CSV export fields verified with fake data | Align with reporting preferences packet |
| Usage / lead-volume tracking | Not a Lindy long-term owner | Move into Supabase data/state logic | Supabase | Plan-tier limits enforced in native config | No billing automation | Volume counters in native model | Align with pricing tiers |
| Plan-tier feature flags | Not separate Lindy engines | Move into RoofLeadHQ backend workflow logic | Native workflow engine | One core engine with configuration profiles | No live activation | Tier config passes staged E2E | Starter/Growth/Elite/Custom are config only |
| Upgrade / custom-review triggers | Manual review today | Move into RoofLeadHQ backend workflow logic | Native workflow engine | Custom Review for 500+ leads, multi-location, etc. | No auto-upgrade without review | Trigger rules in native config | See section 7 |
| Safety / live-activation controls | Must not live in Lindy | Move into RoofLeadHQ backend workflow logic | Native workflow engine + ops gates | demo_ready_with_live_automation_disabled preserved | No live activation from this packet | Live integration readiness gate PASS | Jason explicit approval required |
| Homeowner SMS experience | May exist historically in Lindy | Remove or defer from Lindy long term | Twilio via native integration (when approved) | No live SMS for first roofer unless separately approved | No Twilio live sends | Native SMS path approved | Lindy must not own SMS long term |
| Customer-facing booking flow | May exist historically in Lindy | Remove or defer from Lindy long term | Google Calendar via native integration (when approved) | Manual/founder booking coordination for first roofer | No Google Calendar event creation | Native booking path approved | Booked homeowner appointments language |
| Multi-roofer routing logic | Not for Lindy long term | Move into RoofLeadHQ backend workflow logic | Native workflow engine | Single-location first roofer only | No multi-roofer live routing | Tenant model + safety gate approved | Defer complex routing |
| CRM sync | Helper experiments only | Remove or defer | Manual export later if needed | No CRM sync for first paid roofer | No CRM sync | Explicit future approval only | No native CRM sync positioning |
| Payment / quote / estimate / invoice workflows | Must not be rebuilt in Lindy | Remove or defer | Manual roofer process | Roofer-owned estimate/next-step only | No payment/deposit/invoice/estimate automation | Not in scope for bridge | Forbidden public language applies |
| Internal/back-office helper automations | Preserve temporarily in Lindy | Preserve temporarily in Lindy | Lindy (temporary) | Low-volume internal use only | No live customer impact | Native replacement available | Lowest workable/free plan |
| Draft-only planning artifacts | Preserve temporarily in Lindy | Preserve temporarily in Lindy | Founder-operator | Draft-only, not activated | No external sends | N/A | Planning support only |

## 5. Native Workflow Engine Ownership

Native RoofLeadHQ workflow logic should eventually own:

- lead intake records
- lead source tracking
- lead status
- response/follow-up state
- missed-lead recovery state
- manual outreach state
- roofer review queue
- RoofLeadHQ/Jason system review queue
- appointment readiness state
- booked inspection tracking
- post-inspection follow-up state
- post-inspection feedback capture state
- report/CSV export state
- usage/lead-volume tracking
- plan-tier feature flags
- upgrade/custom-review triggers
- safety/live-activation controls

Supabase remains the authoritative store for records, workflow state, tenant/customer data, and reporting/export inputs. The native workflow engine reads and writes through approved backend paths only — never through Lindy as the permanent authority.

## 6. First Paid Roofer Bridge Plan

Practical first-roofer bridge approach:

- Lindy can assist only where existing low-volume workflows are already useful.
- Supabase/RoofLeadHQ should increasingly hold authoritative records and statuses.
- Jason/founder operation may manually review sensitive states.
- Roofer review remains the default for business judgment.
- RoofLeadHQ/Jason review is limited to system/workflow/data/routing/quality issues.
- No uncontrolled live automation.
- No homeowner/customer sends unless separately approved.
- Existing Lindy flows must not become the permanent source of truth.

### Roofer-first escalation

Default escalation to roofer/contractor for:

- pricing questions
- estimate questions
- quote requests
- insurance complexity
- repair vs replacement questions
- upset homeowner
- scheduling issue
- homeowner asks for roofer directly
- legal/insurance/carrier-specific questions
- payment or invoice question
- contract question

### RoofLeadHQ/Jason system-quality review limitation

Escalate to RoofLeadHQ/Jason only for system-quality issues:

- bad or unclear AI response
- missed data capture
- broken routing
- duplicate lead confusion
- source attribution issue
- dashboard/report discrepancy
- workflow state confusion
- setup issue
- failed handoff
- quality-control concern

Roofer review remains the default for business judgment. RoofLeadHQ/Jason does not override roofer pricing, estimates, quotes, contracts, or sales decisions.

## 7. Subscription Tiers as Configuration Profiles

Starter, Growth, Elite, and Custom should not be separate workflow engines. Use one core workflow engine with plan-based configuration.

### Starter configuration may include

- up to 100 leads/month
- single location
- core lead response
- basic follow-up
- basic appointment booked status
- basic weekly/monthly summary
- limited/basic CSV summary if included

### Growth configuration may include

- up to 300 leads/month
- missed lead recovery
- lead source tracking
- appointment readiness workflow
- booked inspection tracking
- post-inspection follow-up
- post-inspection feedback capture
- detailed weekly/monthly reporting
- CSV export

### Elite configuration may include

- up to 500 leads/month
- deeper source segmentation
- advanced reporting
- larger review queue capacity
- priority setup/support
- more detailed CSV export
- more complex routing only if still single-location and approved

### Custom Review triggers must include

- 500+ leads/month
- 2+ locations
- multiple calendars
- multiple phone numbers
- multiple sales reps
- complex service-area routing
- advanced reporting needs
- unusual integration needs
- multi-location operations

Custom Review means manual founder/operator review before onboarding — not a separate Lindy workflow engine.

## 8. Staged E2E Testing Relationship

Staged E2E testing should prove the migration safely:

- fixture-only first
- sandbox/test-mode next
- live activation only after explicit approval
- test Lindy-bridge assumptions without live sends
- test native workflow states before channel activation
- test plan-tier configuration before onboarding multiple roofers
- test CSV/reporting outputs with fake data only

Relationship to `docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md`:

- **Stage 1 (fixture dry-run):** validate native workflow states and Lindy-bridge assumptions with sample leads only; no external sends; no production Supabase writes.
- **Stage 2 (local/test-mode full-flow):** prove native state transitions for intake, follow-up, missed-lead recovery, appointment readiness, and booked inspection tracking without live sends.
- **Stage 3 (sandbox integration testing):** test channel adapters in sandbox only after native states are proven; Lindy may remain as temporary bridge but must not be treated as source of truth.
- **Stage 4 (founder-approved limited live test):** not approved by this packet; requires explicit Jason approval after Stages 1–3 evidence review and live integration readiness gate PASS.

Migration-specific E2E checks:

- Confirm Supabase/RoofLeadHQ status is authoritative over any Lindy mirror state.
- Confirm plan-tier configuration gates features without separate workflow engines.
- Confirm CSV/reporting outputs match fake/fixture data expectations.
- Confirm no live Lindy workflows, live SMS, Twilio live sends, Vapi live calls, Resend live emails, or Google Calendar event creation occur during staged testing unless separately approved.

## 9. Safety / No-Live-Activation Boundaries

Explicitly preserve: **demo_ready_with_live_automation_disabled**

This packet does not activate:

- live Lindy workflows
- live SMS
- Twilio live sends
- Vapi live calls
- Resend live emails
- Google Calendar event creation
- scheduler/cron/dispatcher
- public routes
- production Supabase writes
- production customer data handling changes
- auth/RLS/schema/security changes
- env/credential changes
- external service calls
- homeowner/customer notifications
- CRM sync
- payment/deposit/invoice/estimate automation

Decision language for this packet:

- LINDY BRIDGE NATIVE WORKFLOW MIGRATION PLAN PASS
- LINDY BRIDGE NATIVE WORKFLOW MIGRATION PLAN HOLD
- LINDY BRIDGE NATIVE WORKFLOW MIGRATION PLAN BLOCKED

PASS means the bridge strategy, migration buckets, native ownership list, tier configuration model, staged E2E relationship, and safety boundaries are documented and verifier-clean. PASS does not authorize live Lindy activation or any live channel integration.

## 10. Forbidden Positioning / Language

### Forbidden public language

Do not use in customer-facing copy, drafts intended for publication, or marketing. The read-only verifier enforces that exact prohibited phrases do not appear anywhere in this packet body.

| Category | Prohibited public phrasing category (do not use) |
| --- | --- |
| Job closing | language that implies booking or closing roofing jobs for the roofer |
| Revenue guarantees | hard revenue outcome promises or guaranteed job counts |
| Appointment guarantees | hard appointment outcome promises or quota-based appointment counts |
| Automation overreach | unattended no-human-oversight claims or language implying unattended estimates, quotes, invoices, or payments without roofer review |
| CRM overreach | unattended CRM automation claims or positioning that implies built-in CRM synchronization |
| Review manipulation | fabricated endorsements, pressured public praise campaigns, incentivized positive feedback, or unattended public review publishing |

### Preferred language

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
- temporary bridge
- native workflow engine
- Supabase source of truth

This packet is internal/planning language. Customer-facing materials must continue using approved lead-to-inspection positioning from the brand and website packets.