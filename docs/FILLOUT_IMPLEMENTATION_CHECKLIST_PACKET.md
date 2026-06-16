# Fillout Implementation Checklist Packet

Date: 2026-06-16

Canonical source of truth before this worktree: `4750ca2 test(reporting): add csv export readiness packet`

This packet is a **manual implementation checklist** for Jason to enter the revised 16-section RoofLeadHQ roofer intake/setup form into Fillout. It makes the form implementation-ready while preserving safety. Fillout responses inform Guided Setup, plan-fit routing, custom-review routing, and future native workflow configuration.

**This is planning/readiness/placement only.**

This is **not** a live form publication.
This does **not** call the Fillout API.
This does **not** collect production customer data.
This does **not** activate live automation.

This form supports Guided Setup, plan-fit routing, custom-review routing, and future native workflow configuration.

Do **not** publish the live Fillout form from this packet.
Do **not** call the Fillout API.
Do **not** read production data.
Do **not** change customer data handling.
Do **not** activate backend live behavior.
Do **not** activate integrations.
Do **not** send externally.
Do **not** write production Supabase data.
Do **not** change auth/RLS/schema/security.
Do **not** change env/credentials.
Do **not** activate public routes.
Do **not** activate live SMS/Twilio/Vapi/Resend/Calendar/Lindy behavior.

All work remains dry-run/internal-only/founder-operator-only. Read-only verifier only. Dry-run wrapper only.

This packet file: `docs/FILLOUT_IMPLEMENTATION_CHECKLIST_PACKET.md`
Wrapper: `scripts/run-fillout-implementation-checklist-dry-run.sh`
Verifier: `backend/scripts/verify-fillout-implementation-checklist-readonly.js`
Wired into: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md` + aggregate pilot readiness verifier (`verify-first-paid-pilot-readiness-readonly.js`) + 3 `NEXT_CHAT_CONTEXT_PACKAGE_*.md` + `ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md`

## Safety Posture

- planning/readiness/placement packet only
- manual Fillout implementation checklist only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- no live Fillout form publication
- no Fillout API calls
- no production customer data collection
- no production data reads
- no customer data handling changes
- no backend live activation
- no integrations activated
- no external sends
- no production Supabase writes
- no auth/RLS/schema/security changes
- no env/credential changes
- no public route activation
- no live SMS/Twilio/Vapi/Resend/Calendar/Lindy activation
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

## Connected Launch Packets

This packet connects:

- `docs/LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md`
- `docs/CSV_EXPORT_READINESS_PACKET.md`
- `docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md`
- `docs/PRICING_VOLUME_GUARDRAIL_AND_INTAKE_ALIGNMENT_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_CUSTOMER_INTAKE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

## 1. Purpose and Scope

### What this packet is

- A manual implementation checklist for Jason to build the revised 16-section RoofLeadHQ Fillout intake/setup form by hand in the Fillout UI
- A plan-fit and routing reference for Guided Setup, custom-review routing, and future native workflow configuration
- An intake alignment artifact that preserves `demo_ready_with_live_automation_disabled` safety posture

### What this packet is not

- **Not** a live form publication step
- **Not** a Fillout API integration
- **Not** a production customer data collection activation
- **Not** a live automation activation path
- **Not** a workflow brain — Fillout is intake/setup data only

### Implementation outcome

After this packet passes its read-only verifier and dry-run wrapper, Jason can manually enter the form into Fillout and use responses for:

- Guided Setup session planning
- Starter / Growth / Elite / Custom Review plan-fit routing
- custom-review routing for complex scope
- future native RoofLeadHQ/Supabase configuration profile mapping

## 2. Jason Manual Fillout Implementation Checklist

Use this ordered checklist when entering the form in Fillout. Check each item before considering the form ready for internal review.

- [ ] Confirm this packet and dry-run verifier pass before opening Fillout
- [ ] Create or update the form in Fillout UI only — no API calls
- [ ] Add all 16 sections in order (Sections 1–16 below)
- [ ] Use recommended question sets and answer types from each section
- [ ] Add internal-only routing fields in Section 16 (founder/operator visibility)
- [ ] Do not publish the form publicly until explicit founder approval
- [ ] Do not connect webhooks or automations from this packet
- [ ] Record first internal test submission as fictional/sample data only
- [ ] Route submissions through Guided Setup review before any native configuration
- [ ] Mark HOLD/BLOCKED items before scheduling go-live conversations

## 3. Plan-Fit Routing Logic

Use Fillout responses to recommend a plan tier. **Do not route 2+ locations to Growth by default. 2+ locations must trigger Custom Review.**

### Starter candidate

- 0–100 leads/month
- single location
- basic reporting
- simple routing
- no complex calendar/phone/sales-rep routing

### Growth candidate

- 101–300 leads/month
- single location
- missed lead recovery need
- lead source tracking need
- appointment readiness
- post-inspection follow-up
- post-inspection feedback capture
- CSV export/reporting need

### Elite candidate

- 301–500 leads/month
- single location
- higher-volume lead handling
- deeper reporting/source segmentation
- larger review queue capacity
- priority setup/support
- detailed CSV/reporting need

### Custom Review

Route to Custom Review when any of the following apply:

- **500+ leads/month**
- **2+ locations** (must trigger Custom Review — never default to Growth)
- **3+ service areas**
- **multiple calendars**
- **multiple phone numbers**
- **multiple sales reps**
- complex service-area routing
- multi-location operations
- unusually complex reporting
- unusual integration needs
- advanced custom routing

### Monthly lead volume routing

| Volume band | Routing guidance |
| --- | --- |
| 0–50 | May fit Starter if simple and single-location |
| 51–100 | May fit Starter if simple and single-location |
| 101–300 | May fit Growth if single-location |
| 301–500 | May fit Elite if single-location |
| 500+ | Triggers Custom Review |
| Not sure | Triggers Guided Setup clarification |

## Form Section 1: Company / Contact Basics

### Implementation purpose

Capture roofer identity and primary contact details for Guided Setup, contract alignment, and internal routing.

### Recommended question set

1. Company legal or public name (short text, required)
2. Primary contact first and last name (short text, required)
3. Primary contact role/title (short text)
4. Primary contact phone (phone, required)
5. Primary contact email (email, required)
6. Business website URL (URL)
7. Primary business address or HQ city/state (short text)
8. Number of locations (single select: 1 / 2+ / Not sure)
9. License or registration notes (long text, optional)

### Required answer types

- Text, phone, email, URL, single select for location count

### Internal routing notes

- 2+ locations → Custom Review (do not assign Growth/Elite without founder review)
- Not sure on locations → Guided Setup clarification item

### Plan-fit impact

- Location count is a primary custom-review trigger
- Contact fields do not alone determine tier

### Safety notes

- Business contact data only — not homeowner production data
- No live CRM write from this section

## Form Section 2: Monthly Lead Volume

### Implementation purpose

Establish lead-volume band for plan-fit routing and volume guardrail alignment.

### Recommended question set

1. Estimated monthly inbound leads (single select, required):
   - 0–50
   - 51–100
   - 101–300
   - 301–500
   - 500+
   - Not sure
2. Peak season expected multiplier (single select: 1x / 1.5x / 2x / Not sure)
3. Is current volume steady year-round or seasonal? (single select + optional notes)

### Required answer types

- Single select for volume band; optional long text for seasonality notes

### Internal routing notes

- 0–100 may fit Starter if simple/single-location
- 101–300 may fit Growth if single-location
- 301–500 may fit Elite if single-location
- 500+ triggers Custom Review
- Not sure triggers Guided Setup clarification

### Plan-fit impact

- Primary tier recommendation input
- Combined with location/routing complexity for final fit

### Safety notes

- Volume estimates are planning assumptions — not billing activation
- Overage protection handled in Guided Setup and Agreement review

## Form Section 3: Lead Sources

### Implementation purpose

Document all lead sources, priorities, and quality notes for setup sequencing and reporting depth.

### Recommended question set

1. All lead sources you receive today (multi-select, required):
   - Website form
   - Phone calls
   - Google Ads
   - Google Business Profile
   - Google Local Services Ads
   - Facebook Lead Ads
   - Facebook messages
   - Angi / HomeAdvisor
   - Thumbtack
   - Referrals
   - Email
   - Manual outreach list
   - Other
   - Not sure
2. highest-priority lead sources for setup (multi-select, ranked or ordered if Fillout supports)
3. top priority source for first launch (single select, required)
4. Paid vs organic source notes (long text)
5. Source quality notes (long text — which sources are strongest/weakest)
6. Approximate monthly volume by source if known (long text or repeater table)

### Required answer types

- Multi-select, single select, long text

### Internal routing notes

- Multiple high-volume paid sources may increase reporting depth need
- Not sure → Guided Setup clarification

### Plan-fit impact

- Lead source tracking and ROI reporting depth affects Growth/Elite fit
- Unusual source mix may contribute to Custom Review

### Safety notes

- Source labels align to future CSV export fields — no live tracking activation from Fillout

## Form Section 4: Current Lead Handling

### Implementation purpose

Understand current response workflow, gaps, and missed-lead recovery needs.

### Recommended question set

1. How do you respond to new leads today? (long text, required)
2. Average first-response time today (single select: under 1 hour / same day / next day / 2+ days / Not sure)
3. Do you miss leads after hours or on weekends? (yes / no / sometimes / Not sure)
4. Do you want missed-lead recovery support? (yes / no / Not sure)
5. Who handles first contact today? (short text)
6. Biggest lead-handling pain point (long text)

### Required answer types

- Long text, single select, yes/no/not sure

### Internal routing notes

- Missed-lead recovery need supports Growth tier recommendation
- Complex multi-rep handoff may trigger Custom Review

### Plan-fit impact

- Missed-lead recovery and follow-up load support Growth/Elite over Starter

### Safety notes

- Describes current state only — does not activate automation

## Form Section 5: CRM & Reporting

### Implementation purpose

Align CRM context, CSV export need, and reporting depth for plan-fit and Guided Setup.

### Recommended question set

1. What CRM or job management system do you use? (single select, required):
   - No CRM
   - JobNimbus
   - AccuLynx
   - Jobber
   - ServiceTitan
   - HubSpot
   - Other
   - Not sure
2. Do you need weekly/monthly CSV exports? (yes / no / Not sure)
3. Who should receive reports? (short text — cross-reference Section 15)
4. What source/outcome information matters most? (long text)
5. Do you need lead source ROI tracking in reports? (yes / no / Not sure)
6. Advanced reporting beyond standard CSV and summary? (yes / no — yes may trigger Custom Review)

### Required answer types

- Single select for CRM; yes/no/not sure for export needs; long text for priorities

### Internal routing notes

- CSV need supports Growth/Elite
- Advanced reporting beyond standard scope → Custom Review
- Native CRM sync is later only — do not promise from intake

### Plan-fit impact

- Detailed CSV/reporting need affects Growth vs Elite
- CRM choice informs Guided Setup notes only — not integration activation

### CSV boundary (required)

- CSV is **one-directional reporting/manual CRM/reference use**
- CSV is **not** bidirectional CRM integration
- Bidirectional CRM integration is **later only**
- Detailed CSV/reporting may affect plan fit

### Safety notes

- No CRM connection or two-way sync from this packet
- Reporting preferences inform future native export readiness only

## Form Section 6: Locations, Service Areas & Routing Complexity

### Implementation purpose

Detect multi-location and routing complexity that triggers Custom Review.

### Recommended question set

1. How many physical business locations? (number or single select: 1 / 2+ / Not sure)
2. How many distinct service areas do you actively serve? (number or single select: 1 / 2 / 3+ / Not sure)
3. Describe service area boundaries (long text)
4. Multiple calendars needed for booking? (yes / no / Not sure)
5. Multiple phone numbers for inbound leads? (yes / no / Not sure)
6. Multiple sales reps or estimators receiving leads? (yes / no / Not sure)
7. Describe routing complexity (single select + notes: standard single queue / storm lane / insurance lane / emergency lane / multi-rep rules / complex service-area routing)
8. Service areas not served or exceptions (long text)

### Required answer types

- Number or single select, yes/no/not sure, long text

### Internal routing notes

- **1 location** can fit normal tiers depending on volume and complexity
- **2+ locations** triggers Custom Review
- **3+ service areas** triggers Custom Review
- **Multiple calendars** triggers Custom Review
- **Multiple phone numbers** triggers Custom Review
- **Multiple sales reps** triggers Custom Review
- **Complex routing** triggers Custom Review
- **Not sure** triggers Guided Setup clarification

### Plan-fit impact

- Any custom-review trigger overrides volume-based Starter/Growth/Elite recommendation

### Safety notes

- Multi-location public self-select setup is later only / unsupported near-term

## Form Section 7: Phone & Calendar Setup

### Implementation purpose

Capture appointment booking preferences and RoofLeadHQ-provided phone number readiness.

### Recommended question set

1. Who receives booked inspection appointments? (short text, required)
2. Calendar owner name/role (short text, required)
3. Do you already have a calendar for inspections? (yes / no / Not sure)
4. Calendar platform if known (Google Calendar / Outlook / other / Not sure)
5. Preferred appointment windows (long text — days, hours, duration)
6. Same-day / next-day booking rules (long text)
7. Travel or service-area constraints for scheduling (long text)
8. Who confirms availability before booking? (short text)
9. Will you use a RoofLeadHQ-provided phone number? (yes / no / Not sure / need guidance)

### Required answer types

- Short text, long text, yes/no/not sure

### Setup guidance (required)

- During Guided Setup, the roofer should receive clear instructions on using the RoofLeadHQ-provided phone number where applicable
- Calendar booking workflow must be clarified before go-live
- RoofLeadHQ AI can book inspections/appointments only after booking/calendar preferences are known and approved
- No live Google Calendar creation is activated by this packet

### Internal routing notes

- Unclear calendar ownership → Guided Setup clarification
- Multiple calendars from Section 6 → Custom Review

### Plan-fit impact

- Complex phone/calendar setup contributes to Custom Review

### Safety notes

- No live Calendar/Twilio/Vapi activation from Fillout entry
- Booking language: booked inspections / booked homeowner appointments only

## Form Section 8: Human Review / Escalation

### Implementation purpose

Document roofer-first escalation model and limit RoofLeadHQ/Jason review to system-quality issues.

### Recommended question set

1. Who is the primary escalation owner for homeowner issues? (short text, required)
2. Who handles pricing/estimate conversations? (short text)
3. Who handles insurance-complexity conversations? (short text)
4. After-hours escalation preference (long text)
5. Acknowledgment: roofer/contractor owns homeowner business decisions (checkbox, required)

### Roofer/contractor review for

- pricing question
- estimate question
- quote request
- insurance complexity
- repair vs replacement question
- scheduling issue
- homeowner asks for roofer directly
- upset homeowner
- legal/insurance/carrier-specific question
- payment or invoice question
- contract question

### RoofLeadHQ/Jason review only for

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

### Internal routing notes

- Roofer-first escalation is default for all business judgment
- RoofLeadHQ/Jason does not override roofer homeowner decisions

### Plan-fit impact

- Larger review queue need may support Elite tier

### Safety notes

- Escalation model is operational policy — not live queue activation from Fillout

## Form Section 9: Post-Inspection Follow-Up

### Implementation purpose

Capture whether roofer wants post-inspection follow-up support and who owns next steps.

### Recommended question set

1. Do you want post-inspection follow-up? (yes / no / Not sure, required)
2. Who should own next steps after inspection? (short text)
3. Who should receive post-inspection issues? (short text)
4. Preferred follow-up timing notes (long text, optional)

### Internal routing notes

- Post-inspection follow-up need supports Growth/Elite recommendation
- Not sure → Guided Setup clarification

### Plan-fit impact

- Growth tier includes post-inspection follow-up as a common fit signal

### Safety notes

- Post-inspection follow-up is internal workflow support — not job-closing automation

## Form Section 10: Post-Inspection Homeowner Feedback

### Implementation purpose

Capture optional simple post-inspection feedback preferences and internal handling rules.

### Recommended question set

1. Do you want simple post-inspection homeowner feedback? (yes / no / Not sure, required)
2. Who reviews feedback internally? (short text)
3. Acknowledgment: feedback is internal unless permission is obtained (checkbox)

### Clarifications (required)

- This is **internal feedback capture**, not unattended public review publishing
- Feedback is **internal unless permission is obtained**
- `permission_to_use_publicly` values are **yes** / **no** / **not_asked**
- No fabricated endorsements
- No pressured public praise campaigns
- No unattended public review publishing

### Internal routing notes

- Feedback capture need supports Growth/Elite
- Any expectation of public review automation → HOLD / Guided Setup correction

### Plan-fit impact

- Growth/Elite candidates often request feedback capture

### Safety notes

- Feedback fields in native workflow use `permission_to_use_publicly` only — never auto-publish

## Form Section 11: Photo Handling

### Implementation purpose

Track photo interest without activating photo collection at launch.

### Recommended question set

1. Do you need photo handling in the near term? (single select, required):
   - Not needed now
   - Maybe later
   - Yes

### Clarifications (required)

- Photos are **future/optional only**
- Photos are **not required for launch**
- Near-term fields should only track `photos_available` and `photos_received`
- No aggressive upfront photo collection
- No photo upload feature is activated by this packet

### Internal routing notes

- Yes near-term → HOLD / separate review — photos are not core launch scope
- Maybe later → note for future configuration

### Plan-fit impact

- Photo need does not change tier; may affect implementation timeline

### Safety notes

- Status fields only in reporting — no live photo upload from Fillout

## Form Section 12: Unsupported or Later-Only Requests

### Implementation purpose

Surface scope expectations that require HOLD or separate review before setup continues.

### Recommended question set

1. Are you expecting RoofLeadHQ to generate quotes, estimates, invoices, or collect payments? (single select, required):
   - No
   - Maybe later
   - Yes

### If Yes

- **HOLD / Review**
- These are not part of current setup and require separate review

### Unsupported / later-only list

- unattended estimate generation
- unattended quote generation
- unattended invoice generation
- payment/deposit collection
- bidirectional CRM integration
- multi-location public self-select setup
- market intel
- aggressive photo collection

### Internal routing notes

- Yes on quotes/estimates/invoices/payments → HOLD / BLOCKED for standard Guided Setup until reviewed
- Maybe later → document as later-only exclusion

### Plan-fit impact

- Unsupported requests do not map to standard Starter/Growth/Elite without custom scope review

### Safety notes

- Intake must not imply these features are included in standard near-term plans

## Form Section 13: Messaging Compliance

### Implementation purpose

Confirm TCPA/permission posture before any messaging setup.

### Recommended question set

1. Will RoofLeadHQ only be following up with homeowners or leads who contacted your business or gave permission to be contacted? (single select, required):
   - Yes
   - No
   - Not sure

### Routing

- If **No** or **Not sure** → Messaging compliance review needed before setup

### Prospect-facing wording

We can only follow up with leads who contacted your business or gave permission to be contacted.

### Internal routing notes

- TCPA/10DLC/A2P compliance notes stay internal unless needed in Guided Setup
- No or Not sure → HOLD until compliance clarified

### Plan-fit impact

- Compliance readiness required before any tier go-live

### Safety notes

- No live SMS/Twilio activation from Fillout — compliance gate only

## Form Section 14: Exclusions & Routing Rules

### Implementation purpose

Capture service boundaries, bad-fit rules, and escalation ownership for uncertain leads.

### Recommended question set

1. Service areas not served (long text)
2. Services not offered (long text)
3. Bad-fit lead examples (long text)
4. Emergency or storm response rules (long text)
5. Insurance-only limitations if any (long text)
6. Roof type exclusions if any (long text)
7. Do-not-contact rules (long text)
8. After-hours handling preferences (long text)
9. Escalation owner for uncertain fit (short text, required)

### Internal routing notes

- Complex exclusion matrices may contribute to Custom Review
- Rules feed native workflow routing configuration after approval

### Plan-fit impact

- Standard exclusions fit all tiers; complex multi-lane rules may trigger Custom Review

### Safety notes

- Exclusion rules are configuration intake — not live routing activation

## Form Section 15: Report Recipients

### Implementation purpose

Identify who receives operational reports, CSV exports, and escalation summaries.

### Recommended question set

1. Report recipient names and emails (long text or repeater, required)
2. Weekly / monthly report preference (single select: weekly / monthly / both / Not sure)
3. CSV export preference (yes / no / Not sure)
4. Preferred metrics (long text — response time, sources, booked inspections, outcomes)
5. Source ROI data availability (yes / no / partial / Not sure)
6. Ad spend data availability if provided (yes / no / partial / Not sure)
7. Who should receive blocker/escalation summaries? (short text)

### Internal routing notes

- Multiple recipient lists with complex rollups may support Elite or Custom Review
- Aligns to `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`

### Plan-fit impact

- Detailed reporting recipients and metrics depth affect Growth vs Elite

### Safety notes

- Report delivery is planning only — no live email/Resend activation from Fillout

## Form Section 16: Final Plan-Fit Summary / Internal Routing

### Implementation purpose

Internal founder/operator summary section for routing decisions after submission. **Not shown to prospect** or marked internal-only in Fillout.

### Recommended internal fields

1. Likely plan fit (single select): Starter / Growth / Elite / Custom Review
2. Plan-fit reason (long text)
3. Lead volume band (auto or manual from Section 2)
4. Location/routing complexity summary (long text)
5. Reporting/CSV need summary (long text)
6. Post-inspection need (yes / no)
7. Feedback capture need (yes / no)
8. Phone/calendar readiness (ready / needs clarification / blocked)
9. Compliance readiness (ready / needs review / blocked)
10. Unsupported/later-only requests flagged (long text)
11. Guided Setup clarification items (long text)
12. HOLD/BLOCKED items (long text)
13. Recommended next action (single select: Guided Setup / Custom Review call / HOLD / BLOCKED)

### Internal summary outputs

- likely plan fit: Starter / Growth / Elite / Custom Review
- plan-fit reason
- lead volume band
- location/routing complexity
- reporting/CSV need
- post-inspection need
- feedback capture need
- phone/calendar readiness
- compliance readiness
- unsupported/later-only requests
- Guided Setup clarification items
- HOLD/BLOCKED items
- recommended next action

### Internal routing notes

- Custom Review overrides any auto-tier suggestion
- 2+ locations must never auto-route to Growth

### Plan-fit impact

- This section is the authoritative internal routing output from intake

### Safety notes

- Internal-only — no customer-facing plan pricing commitment without founder review

## 4. Native Workflow Configuration Relationship

Fillout responses should eventually map into native RoofLeadHQ/Supabase configuration profiles:

- plan tier
- lead volume limit
- lead source settings
- review queue ownership
- appointment readiness settings
- post-inspection follow-up setting
- feedback capture setting
- reporting/CSV depth
- custom-review triggers
- phone/calendar setup requirements

**Fillout should not become the workflow brain.** It is intake/setup data that informs native configuration.

Native RoofLeadHQ/Supabase owns long-term workflow state. Fillout submissions are translated during Guided Setup into approved configuration records — not live-synced as runtime authority.

## 5. Lindy Bridge Relationship

- Existing Lindy workflows may temporarily assist low-volume early flows
- Fillout responses should **not** make Lindy the long-term source of truth
- Lindy may use intake notes temporarily if needed
- Native RoofLeadHQ/Supabase should own the long-term workflow state/configuration
- This packet aligns with `docs/LINDY_BRIDGE_NATIVE_WORKFLOW_MIGRATION_PLAN.md`

Lindy is a temporary bridge only. Intake data informs native configuration; Lindy must not become the intake authority or workflow brain.

## 6. Safety and Forbidden Language

### Forbidden public language

Do not use in customer-facing copy, Fillout prospect-facing text, or sales materials. The read-only verifier enforces that exact prohibited phrases do not appear anywhere in this packet body.

| Category | Prohibited public phrasing category (do not use) |
| --- | --- |
| Job closing | language that implies booking or closing roofing jobs for the roofer |
| Revenue guarantees | hard revenue outcome promises or guaranteed job counts |
| Appointment guarantees | hard appointment outcome promises or quota-based appointment counts |
| Automation overreach | unattended no-human-oversight claims or language implying unattended estimates, quotes, invoices, or payments without roofer review |
| CRM overreach | two-way CRM integration claims or language implying RoofLeadHQ replaces or syncs bidirectionally with the roofer's CRM |
| Review manipulation | fabricated endorsements, pressured public praise campaigns, incentivized positive feedback, or unattended public review publishing |

### Preferred language

Use in Fillout prospect-facing text and Guided Setup materials:

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
- plan-fit routing
- custom review
- native workflow configuration

## 7. PASS / HOLD / BLOCKED Criteria

**FILLOUT IMPLEMENTATION CHECKLIST PACKET PASS**

- All 16 form sections documented with question sets, routing notes, and safety boundaries
- Plan-fit routing logic documented including 2+ locations → Custom Review and 500+ → Custom Review
- Native workflow and Lindy bridge relationships documented
- Forbidden/preferred language guardrails present
- Read-only verifier and dry-run wrapper pass
- No live Fillout publication, API calls, or automation activation attempted

**FILLOUT IMPLEMENTATION CHECKLIST PACKET HOLD**

- Missing section content or incomplete internal routing fields
- Messaging compliance No/Not sure without review plan
- Unsupported Yes responses without separate review
- Custom-review triggers identified but routing not documented

**FILLOUT IMPLEMENTATION CHECKLIST PACKET BLOCKED**

- Any live Fillout publication, Fillout API call, webhook activation, production data read, production Supabase write, integration activation, or customer data handling change attempted from this packet
- Any prohibited public language approved for prospect-facing Fillout text
- Any live SMS/Twilio/Vapi/Resend/Calendar/Lindy activation without explicit Jason approval

## Completion Criteria

This packet is complete when:

1. All sections above contain substantive operational content (not heading-only).
2. `node backend/scripts/verify-fillout-implementation-checklist-readonly.js` passes.
3. `bash scripts/run-fillout-implementation-checklist-dry-run.sh` passes.
4. Aggregate first-paid pilot readiness includes this verifier.
5. Verifier index and next-chat context packages reference this packet.
6. No commit or push occurs until Terminal 1 review.