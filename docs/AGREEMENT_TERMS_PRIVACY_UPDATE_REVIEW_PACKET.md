# Agreement / Terms / Privacy Update Review Packet

Date: 2026-06-16

Canonical source of truth before this worktree: `d2dd118 test(onboarding): add fillout implementation checklist packet`

This packet identifies Agreement, Terms of Service, and Privacy Policy update areas created by RoofLeadHQ's current product direction. It prepares internal legal/policy review before stronger sales, onboarding, customer setup, paid trial operation, or live workflow activation.

**This is an internal review/readiness packet.**

This is **not** legal advice.
This is **not** attorney-reviewed language.
This is **not** a substitute for attorney review.
This does **not** publish or modify public legal terms.
This does **not** activate live workflows.
Final language should be reviewed by qualified counsel before customer use.

This is **planning/readiness/review only.**

This is **not** a legal publication step.
This is **not** a website publication step.
This does **not** activate customer-facing legal terms.
Do **not** publish Agreement, Terms of Service, or Privacy Policy from this packet.
Do **not** read production data.
Do **not** change customer data handling.
Do **not** activate backend live behavior.
Do **not** activate integrations.
Do **not** send externally.
Do **not** write production Supabase data.
Do **not** change auth/RLS/schema/security.
Do **not** change env/credentials.
Do **not** activate public routes.
Do **not** publish Fillout forms.
Do **not** connect CRM systems.
Do **not** activate payment/deposit/invoice/estimate automation.

All work remains dry-run/internal-only/founder-operator-only. Read-only verifier only. Dry-run wrapper only.

This packet file: `docs/AGREEMENT_TERMS_PRIVACY_UPDATE_REVIEW_PACKET.md`
Wrapper: `scripts/run-agreement-terms-privacy-update-review-dry-run.sh`
Verifier: `backend/scripts/verify-agreement-terms-privacy-update-review-readonly.js`
Wired into: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md` + aggregate pilot readiness verifier (`verify-first-paid-pilot-readiness-readonly.js`) + 3 `NEXT_CHAT_CONTEXT_PACKAGE_*.md` + `ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md`

## Safety Posture

- planning/readiness/review packet only
- internal legal/policy review readiness only
- draft-review only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- no legal publication
- no website publication
- no agreement/terms/privacy page changes
- no customer-facing legal terms activated
- no live automation activation
- no production data reads
- no production Supabase writes
- no customer data handling changes
- no backend live activation
- no integrations activated
- no external sends
- no Fillout publication
- no CRM connection
- no bidirectional CRM integration
- no payment/deposit/invoice/estimate automation
- no auth/RLS/schema/security changes
- no env/credential changes
- no public route activation
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
- `docs/FILLOUT_IMPLEMENTATION_CHECKLIST_PACKET.md`
- `docs/POST_INSPECTION_FOLLOW_UP_AND_FEEDBACK_CAPTURE_PACKET.md`
- `docs/PRICING_VOLUME_GUARDRAIL_AND_INTAKE_ALIGNMENT_PACKET.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

## 1. Purpose and Scope

### What this packet is

- An internal review/readiness packet that identifies Agreement, Terms of Service, and Privacy Policy update areas created by RoofLeadHQ's current product direction
- A legal review readiness artifact for founder/operator and counsel review before stronger sales, onboarding, customer setup, paid trial operation, or live workflow activation
- A policy review checklist aligned to lead-to-inspection operating scope, pricing/volume guardrails, CSV export, post-inspection follow-up, feedback capture, messaging compliance, and native workflow direction

### What this packet is not

- **Not** legal advice
- **Not** attorney-reviewed language
- **Not** final legal drafting
- **Not** publication-ready terms
- **Not** a substitute for attorney review
- **Not** a live automation activation path
- **Not** a website or legal publication step

### Implementation outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator can:

- Review required Agreement, Terms of Service, and Privacy Policy update areas with counsel
- Align customer agreements to approved plan tiers, volume limits, and scope boundaries
- Confirm messaging compliance, feedback/public-use, and CSV/export responsibilities before customer use
- Hold live workflow activation until explicit Jason approval and legal review completion

## 2. Product / Legal Context Summary

RoofLeadHQ is the roofing lead-to-inspection operating layer. It helps roofing contractors:

- respond to leads quickly
- follow up with leads
- recover missed leads
- support appointment readiness
- book homeowner inspections / booked homeowner appointments on the roofer's calendar
- track what happened
- support post-inspection follow-up
- capture optional homeowner feedback
- provide reporting and CSV export

RoofLeadHQ should **not** be positioned as:

- a generic AI receptionist
- a CRM replacement
- a quote engine
- a payment platform
- a hard revenue-outcome or job-outcome guarantee product

Workflow direction:

- Lindy may temporarily bridge low-volume workflows but should **not** be described as the long-term source of truth
- Native RoofLeadHQ/Supabase workflow configuration is the long-term direction
- Live automation remains disabled unless Jason explicitly approves activation

## 3. Agreement Update Checklist

Use before any Agreement publication or signature. Check each item explicitly. This is draft-review only — not publication-ready language.

- [ ] Plan tiers and monthly pricing documented (Starter / Growth / Elite / Custom)
- [ ] Setup fee / guided setup fee documented per tier
- [ ] Monthly lead volume included by plan documented
- [ ] Overage handling documented (notice, upgrade recommendation, optional overage blocks)
- [ ] Required upgrade/custom plan if volume consistently exceeds plan
- [ ] Multi-location/custom routing pricing addressed
- [ ] **500+ leads/month** triggers Custom Review
- [ ] **2+ locations** triggers Custom Review
- [ ] Multiple calendars/phone numbers/sales reps triggers Custom Review
- [ ] Feature availability by plan documented
- [ ] CSV export/reporting scope described at high level
- [ ] Lead source tracking and reporting scope described
- [ ] Post-inspection follow-up scope described
- [ ] Post-inspection feedback capture scope described
- [ ] Permission required before using feedback publicly
- [ ] Human review / roofer responsibility language included
- [ ] Roofer-first escalation for business judgment documented
- [ ] RoofLeadHQ/Jason review limited to system/workflow/data/routing/quality issues
- [ ] No hard outcome guarantees for jobs, revenue, contracts, or appointments
- [ ] No binding estimates/quotes/invoices/payments unless separately approved
- [ ] Optional/future photo handling marked as not core near-term
- [ ] Customer responsibility for accurate lead source, lead volume, service area, calendar, phone, and routing information
- [ ] Customer responsibility for CRM import/use if they download CSVs
- [ ] Customer responsibility for downloaded/exported data handling
- [ ] Supported and unsupported use cases documented
- [ ] Messaging permission/compliance responsibility assigned to customer
- [ ] Trial and cancellation language reviewed
- [ ] No long-term contract / cancel-anytime positioning if currently approved
- [ ] Service limits and acceptable use documented
- [ ] Suspension/upgrade/custom-review rights for abusive, excessive, or unsupported use
- [ ] No bidirectional CRM integration unless separately approved
- [ ] Live automation activation requires explicit Jason approval
- [ ] Legal review status recorded (PASS / HOLD / BLOCKED)

## 4. Terms of Service Update Checklist

- [ ] Define lead volume (inbound leads entering the lead-to-inspection workflow)
- [ ] Define included plan usage per tier
- [ ] Define overages and upgrade/custom plan process
- [ ] Define customer responsibilities for lead source access and accurate intake data
- [ ] Define customer responsibility for lawful contact permissions
- [ ] Define supported use cases (lead-to-inspection operating scope)
- [ ] Define unsupported use cases (quotes, payments, CRM sync, etc.)
- [ ] Define service limitations
- [ ] Define AI-assisted communications and customer responsibility
- [ ] Define human review boundaries (roofer-first for business judgment)
- [ ] Define roofer/contractor responsibility for pricing, estimates, quotes, insurance, payment, contract, and legal questions
- [ ] Define CSV export/data download responsibility
- [ ] Define no bidirectional CRM integration unless separately approved
- [ ] Define post-inspection feedback handling
- [ ] Define permission requirements for public feedback/testimonial use
- [ ] Define prohibition on fabricated endorsements, pressured public praise campaigns, and unattended public review publishing
- [ ] Define no unlawful/spam/unauthorized messaging use
- [ ] Define right to suspend, hold, refuse, or require review for unsupported use
- [ ] Define right to require custom pricing for high-volume/multi-location/complex routing
- [ ] Define no hard outcome guarantees for jobs, revenue, contracts, appointments, response rates, or homeowner outcomes
- [ ] Define no unattended estimates, quotes, invoices, payment, or deposit collection unless separately agreed
- [ ] Legal review status recorded (PASS / HOLD / BLOCKED)

## 5. Privacy Policy Update Checklist

### Data collected may include

- contractor/customer account data
- roofer company/contact details
- homeowner names
- homeowner phone numbers
- homeowner emails
- service addresses
- city/state/service area
- roofing issue details
- urgency
- insurance claim status if provided
- preferred appointment windows
- lead source
- lead source details
- campaign/ad source if known
- messages/calls/transcripts/summaries if enabled
- appointment/booking data
- follow-up data
- review/escalation notes
- post-inspection status
- post-inspection feedback
- report data
- CSV export data
- photo status fields
- photos only if future photo handling is enabled and disclosed

### Data sources may include

- roofer-provided intake/setup data
- homeowner-provided data
- calls/texts/forms/emails if enabled
- website forms
- Google/Facebook/lead source integrations if enabled
- manual outreach submissions
- manually entered founder/operator notes
- temporary Lindy bridge notes if used
- future native RoofLeadHQ/Supabase records

### Data uses may include

- respond to roofing leads
- follow up with leads
- qualify/contact route leads
- support appointment readiness
- book or coordinate homeowner inspections
- route items to roofer review
- route system/workflow/data/routing/quality issues to RoofLeadHQ review
- track lead source performance
- track inspection outcomes
- support post-inspection follow-up
- capture internal homeowner feedback
- generate weekly/monthly reports
- generate CSV exports after approved implementation
- improve workflow quality and safety
- support customer onboarding and plan-fit configuration

### Third-party processors/vendors to review may include

- Supabase
- Twilio
- Vapi
- Resend
- Google Calendar
- Vercel/custom hosting
- Fillout
- Lindy as temporary/internal bridge if used
- OpenAI or other AI providers if used
- any future processors

### Privacy notes

- [ ] No sale of homeowner data
- [ ] Homeowner feedback is not used publicly without permission
- [ ] CSV exports may contain homeowner personal information
- [ ] Contractor/customer is responsible for downloaded/exported data after export
- [ ] Photos are not core now and require updated disclosure before broad use
- [ ] Retention/deletion/export request process should be defined
- [ ] Security/tenant isolation direction should be referenced
- [ ] Data accuracy depends on lead source and customer-provided information
- [ ] Legal review status recorded (PASS / HOLD / BLOCKED)

## 6. Pricing / Volume / Overage Review Section

Current plan direction for Agreement and Terms alignment. Draft-review only — not publication-ready.

### Starter

- $399/mo + $499 setup
- up to 100 leads/month
- single location
- basic reporting / basic CSV summary if included

### Growth

- $699/mo + $499 setup
- up to 300 leads/month
- single location
- missed lead recovery
- lead source tracking
- appointment readiness
- booked inspection tracking
- post-inspection follow-up
- feedback capture
- weekly/monthly reporting
- CSV export

### Elite

- $999/mo + $799 setup
- up to 500 leads/month
- single location unless custom approved
- advanced reporting
- deeper source segmentation
- larger review queue capacity
- priority setup/support
- detailed CSV/export

### Custom

- 500+ leads/month
- 2+ locations
- multiple calendars/phone numbers
- multiple sales reps
- complex routing
- advanced reporting
- unusual integration needs

### Custom Review triggers

- **500+ leads/month** triggers Custom Review
- **2+ locations** triggers Custom Review
- Multiple calendars/phone numbers/sales reps triggers Custom Review
- Complex routing triggers Custom Review
- Advanced reporting beyond standard CSV scope triggers Custom Review

### Overage concept

- If customer consistently exceeds included lead volume, RoofLeadHQ may recommend or require a plan upgrade before the next billing cycle.
- Temporary or occasional overages may be billed in additional lead-volume blocks or handled by written agreement.
- Possible working number: $100 per additional 50 leads.
- **This working number must be finalized before publication or legal/billing use.** Not final for publication.

## 7. Messaging Compliance Review Section

- RoofLeadHQ should only follow up with leads who contacted the business or gave permission to be contacted.
- If a customer says No or Not sure, setup should require messaging compliance review.
- Customer should be responsible for confirming lawful contact permission and lead source legitimacy.
- TCPA/10DLC/A2P references can remain internal unless needed for final legal language.
- No spam/unauthorized messaging use.

### Prospect-facing wording

We can only follow up with leads who contacted your business or gave permission to be contacted.

## 8. Post-Inspection Feedback / Public Use Review Section

- Feedback is internal unless permission is obtained
- `permission_to_use_publicly` values are **yes** / **no** / **not_asked**
- No fabricated endorsements or pressured public praise campaigns
- No incentivized positive feedback
- No unattended public review publishing
- No testimonial/case-study/public use without explicit permission
- Roofer may receive feedback for operational follow-up
- Feedback issue flags should be handled carefully and internally

## 9. CSV / Export / Data Handling Review Section

- CSV export is one-directional reporting/manual CRM/reference use
- CSV export is **not** bidirectional CRM integration
- CSV export does not replace roofer's CRM
- CSV export does not push data back to RoofLeadHQ
- CSV export does not auto-update if the downloaded file is changed
- CSV exports may contain homeowner personal information
- Contractor/customer is responsible for downloaded/exported data handling
- ROI fields depend on customer-provided spend/source data
- No exact ROI promises unless customer provides accurate spend/source data
- Sample rows must use fictional data only

## 10. Native Workflow / Lindy Bridge Legal Review Section

- Lindy may be a temporary low-volume bridge
- Lindy should **not** be described as long-term source of truth
- Native RoofLeadHQ/Supabase source-of-truth direction should be considered in data handling language
- Customer-facing terms should not promise a specific third-party workflow provider
- Future direct integrations should be described functionally, not as guaranteed active features unless actually enabled
- No live activation until explicit approval

## 11. Unsupported / Later-Only Features Section

The following are unsupported/later-only unless separately approved:

- unattended estimate generation
- unattended quote generation
- unattended invoice generation
- payment/deposit collection
- bidirectional CRM integration
- multi-location self-serve setup
- complex routing without custom review
- aggressive upfront photo collection
- market intel
- homeowner public review generation
- unattended workflow with no roofer oversight

## 12. Final Review Tracker

| Document area | Required update/review item | Triggering product feature | Current status | Owner | Review needed from | Risk if omitted | Suggested next action | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Agreement | Agreement pricing/plan terms | Starter/Growth/Elite/Custom tiers | HOLD | Jason | Counsel | Misaligned billing expectations | Draft plan-tier pricing clauses for counsel review | $399/$699/$999 monthly; setup fees documented |
| Agreement | Agreement overage/custom review | Volume guardrails | HOLD | Jason | Counsel + Ops | Surprise billing or scope disputes | Add overage notice and Custom Review trigger language | 500+ and 2+ locations triggers |
| Agreement | Agreement post-inspection scope | Post-inspection follow-up + feedback | HOLD | Jason | Counsel | Unclear service scope | Define post-inspection follow-up and feedback boundaries | Internal feedback default |
| Agreement | Agreement CSV/reporting scope | CSV export readiness | HOLD | Jason | Counsel | Overpromised reporting/CRM integration | Clarify CSV as reporting artifact, not CRM sync | One-directional export only |
| Agreement | Agreement no-guarantee language | Lead-to-inspection positioning | HOLD | Jason | Counsel | Outcome liability exposure | Add no-guarantee jobs/revenue/appointments clauses | Use booked inspections framing |
| Agreement | Agreement unsupported features | Later-only feature list | HOLD | Jason | Counsel | Feature overpromise | List unsupported/later-only items explicitly | Quotes/payments/CRM sync excluded |
| Terms | Terms lead volume definition | Plan volume bands | HOLD | Jason | Counsel | Billing disputes | Define lead volume counting method | Inbound leads entering workflow |
| Terms | Terms messaging permission | Messaging compliance intake | HOLD | Jason | Counsel | TCPA/compliance exposure | Add customer lawful-contact responsibility | Prospect-facing wording documented |
| Terms | Terms AI-assisted communication responsibility | AI follow-up workflows | HOLD | Jason | Counsel | Unclear AI liability split | Define roofer vs RoofLeadHQ communication responsibilities | Roofer-first escalation |
| Terms | Terms human review boundaries | Roofer-first escalation model | HOLD | Jason | Counsel | Overreach on business decisions | Limit RoofLeadHQ review to system/workflow/data quality | No override of roofer judgment |
| Terms | Terms CSV export responsibility | CSV export readiness | HOLD | Jason | Counsel | Data handling liability gap | Assign post-export data responsibility to customer | PII warning required |
| Terms | Terms post-inspection feedback/public use | Feedback capture packet | HOLD | Jason | Counsel | Unauthorized public use of feedback | Define permission_to_use_publicly requirements | yes/no/not_asked only |
| Privacy | Privacy homeowner data collection | Lead intake + workflow records | HOLD | Jason | Counsel | Incomplete disclosure | Inventory all homeowner PII categories | Names, phones, emails, addresses |
| Privacy | Privacy feedback data | Post-inspection feedback capture | HOLD | Jason | Counsel | Feedback misuse risk | Describe internal feedback use and public permission gate | No public use without permission |
| Privacy | Privacy CSV/exported data | CSV export readiness | HOLD | Jason | Counsel | Post-export PII handling gap | Document export contents and customer responsibility | Contractor owns downloaded data |
| Privacy | Privacy processors/vendors | Integration stack | HOLD | Jason | Counsel | Subprocessor disclosure gaps | Review Supabase/Twilio/Vapi/Resend/Calendar/Fillout/Lindy/AI vendors | Only list actually enabled processors |
| Privacy | Privacy retention/deletion | Data lifecycle | HOLD | Jason | Counsel | Compliance gaps | Define retention/deletion/export request process | Align to tenant isolation direction |
| Privacy | Privacy photos future/optional | Photo handling planning | HOLD | Jason | Counsel | Undisclosed sensitive data collection | Mark photos as future/optional with separate disclosure | Not core near-term |
| Agreement/Terms/Privacy | Lindy bridge / native workflow data handling | Lindy bridge migration plan | HOLD | Jason | Counsel | Third-party dependency overpromise | Describe Lindy as temporary bridge; native Supabase as long-term | No provider lock-in language |
| Privacy/Terms | Security/tenant isolation references | Tenant isolation planning | HOLD | Jason | Counsel + Engineering | Security posture misstatement | Reference tenant isolation direction without overclaiming | Align to data protection packets |

## 13. Safety and Forbidden Language

### Forbidden public language

Do not use in customer-facing Agreement, Terms, Privacy Policy, website copy, or sales materials. The read-only verifier enforces that exact prohibited phrases do not appear anywhere in this packet body.

| Category | Prohibited public phrasing category (do not use) |
| --- | --- |
| Job closing | language that implies booking or closing roofing jobs for the roofer |
| Revenue guarantees | hard revenue outcome promises or guaranteed job counts |
| Appointment guarantees | hard appointment outcome promises or quota-based appointment counts |
| Automation overreach | unattended no-human-oversight claims or language implying unattended estimates, quotes, invoices, or payments without roofer review |
| CRM overreach | two-way CRM integration claims or language implying RoofLeadHQ replaces or syncs bidirectionally with the roofer's CRM |
| Review manipulation | fabricated endorsements, pressured public praise campaigns, incentivized positive feedback, or unattended public review publishing |

### Preferred language

Use in Agreement, Terms, Privacy Policy planning, and customer-facing materials:

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
- custom review
- legal review
- policy review
- draft-review only

### No guarantees language (required in final customer-facing docs)

- No hard outcome guarantees for jobs, revenue, contracts, appointments, response rates, or homeowner outcomes
- Lead volume and reporting support do not imply revenue or inspection outcome guarantees
- CSV export and ROI fields are informational when customer provides accurate spend/source data

## Completion Criteria

This packet is complete when:

1. All sections above contain substantive review content (not heading-only).
2. `node backend/scripts/verify-agreement-terms-privacy-update-review-readonly.js` passes.
3. `bash scripts/run-agreement-terms-privacy-update-review-dry-run.sh` passes.
4. Aggregate first-paid pilot readiness includes this verifier.
5. Verifier index and next-chat context packages reference this packet.
6. No commit or push occurs until Terminal 1 review.

**AGREEMENT TERMS PRIVACY UPDATE REVIEW PACKET PASS**

- All checklists and review sections documented
- Final review tracker populated
- Forbidden/preferred language guardrails present
- Read-only verifier and dry-run wrapper pass
- No legal publication, website publication, or live activation attempted

**AGREEMENT TERMS PRIVACY UPDATE REVIEW PACKET HOLD**

- Missing checklist items or incomplete tracker rows
- Messaging compliance concerns without review plan
- Custom-review triggers identified but not reflected in draft review notes

**AGREEMENT TERMS PRIVACY UPDATE REVIEW PACKET BLOCKED**

- Any Agreement/Terms/Privacy publication, website legal page change, production data read, production Supabase write, integration activation, or customer data handling change attempted from this packet
- Any prohibited public language approved for customer-facing legal copy
- Any live SMS/Twilio/Vapi/Resend/Calendar/Lindy activation without explicit Jason approval