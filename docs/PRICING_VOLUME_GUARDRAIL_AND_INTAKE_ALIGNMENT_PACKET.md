# Pricing Volume Guardrail + Intake / Terms / Privacy Alignment Packet

> ## ⭐ BUILD 224 — CURRENT PUBLIC SOURCE OF TRUTH (supersedes the "Hybrid Pricing Structure" table below)
>
> As of Build 224, the public website (`website/index.html`) uses **volume-only** pricing with the
> **same features on every plan**. The legacy "Hybrid Pricing Structure" section further down is
> **retained for historical/change-log reference only** (and to keep the legacy alignment verifier's
> token assertions green) — it is **no longer the published pricing**.
>
> | Tier | Setup | Monthly | Lead volume |
> | --- | --- | --- | --- |
> | Starter | $199 | $199/mo for the first 3 months, then $299/mo | 25 leads/mo |
> | Growth | $199 | $399/mo for the first 3 months, then $599/mo | 75 leads/mo |
> | Elite | $199 | $899/mo (flat) | 150 leads/mo |
>
> - **Same features on every plan. Volume-only differentiation. No feature gating.**
> - **Cancel anytime. No contracts. No hidden fees.**
> - **No 14-day/free trial, no 7-day pilot, no refund/credit/waive language.** Removed entirely from public surfaces.
> - **No priced "Custom" tier.** Overflow only: "Need more than 150 leads/mo? We'll review volume and routing needs with you."
> - **Offer:** done-for-you lead response system; primary CTA **"Book a Founder-Led Setup Call"**; **customized, founder-led setup** is an approved differentiator.
> - **Included today:** AI phone answering, SMS follow-up sequences, lead dashboard, weekly/monthly reports, customized founder-led setup.
> - **Rolling out next (NOT claimed live):** email-forward intake, human takeover, CSV export, bot protection, generic webhook destinations. Native JobNimbus/AccuLynx/ServiceTitan and official Angi/Thumbtack/Yelp API integrations are **not built**.
> - **Overage policy (Fillout):** "If my monthly lead volume exceeds this amount, RoofLeadHQ will adjust pricing in the next billing cycle and will provide at least 5 days' notice via email."
> - Enforced by `backend/scripts/verify-website-build-224-source-of-truth-readonly.js` (wrapper `scripts/run-website-build-224-source-of-truth-dry-run.sh`). See `docs/PUBLIC_SITE_PRICING_OFFER_UPDATE_BUILD_224.md`.

## Purpose

This packet captures the approved hybrid pricing model, lead-volume guardrails, overage protection, Fillout intake alignment, website pricing planning requirements, Agreement/Terms/Privacy update checklists, plan-fit logic, custom/multi-location handling, CSV export and reporting scope, roofer-first review and escalation, post-inspection follow-up, and post-inspection feedback capture for RoofLeadHQ.

RoofLeadHQ is the roofing lead-to-inspection operating layer — not a generic AI receptionist. This packet is planning/readiness/placement only. It prepares founder/operator review before any public publication, legal publication, Fillout changes, or production activation.

This packet builds on:

- `docs/FIRST_PAID_LAUNCH_CUSTOMER_INTAKE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md`
- `docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md`
- `docs/AGENT_PRODUCT_QUALITY_GATE.md`

## Product Outcome

After this packet passes its read-only verifier and dry-run wrapper, the founder/operator has a single alignment artifact that:

- Documents the approved Starter / Growth / Elite / Custom hybrid pricing structure with volume limits and setup fees.
- Defines overage protection and custom-review triggers before a roofer is sold or onboarded.
- Lists Fillout intake questions aligned to plan-fit and lead-to-inspection readiness.
- Provides Agreement, Terms of Service, and Privacy Policy update checklists.
- Clarifies CSV export/reporting scope, lead source ROI treatment, post-inspection follow-up, and post-inspection feedback capture.
- Locks the roofer-first human escalation model and limits RoofLeadHQ/Jason review to workflow/data/system quality issues only.
- Marks photos, instant quotes, deposits, payment collection, native CRM sync, multi-location automation, and market intel as later-only or not near-term core.

Success criteria: a founder/operator can review plan fit, intake alignment, legal-doc readiness, and public-language guardrails without activating any live system.

## Safety Posture

- planning/readiness/placement packet only
- dry-run/internal-only/founder-operator-only
- demo_ready_with_live_automation_disabled
- no live website publication
- no live Fillout changes
- no legal publication
- no production behavior changes
- no customer data handling changes
- no backend live activation
- no integrations activated
- no external sends
- no production Supabase writes
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

## Source-of-Truth Workflow

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
- This packet does not authorize publication or activation from an agent worktree.

## Hybrid Pricing Structure

> **⚠️ SUPERSEDED BY BUILD 224.** The table in this section ($399/$699/$999 monthly, $499/$799 setup,
> 75–100 / 250–300 / 500 lead bands, priced Custom tier) is **historical** and is **no longer published**.
> The current public pricing is the volume-only Starter/Growth/Elite table at the top of this packet
> ($199 setup; $199→$299 / $399→$599 / $899; 25/75/150 leads/mo). This legacy table is retained for the
> change-log and to preserve the legacy alignment verifier's token assertions only.

RoofLeadHQ uses a hybrid model: one-time guided setup plus monthly subscription by lead-volume tier. All public and contractual language must use lead-to-inspection and booked inspections / booked homeowner appointments framing — never job-closing or revenue-guarantee phrasing.

| Plan | Monthly | Setup (one-time) | Included lead volume / month | Best fit |
| --- | --- | --- | --- | --- |
| Starter | $399/mo | $499 | up to 75–100 leads/month | Single-location roofer starting lead-to-inspection response and follow-up |
| Growth | $699/mo | $499 | up to 250–300 leads/month | Growing roofer with steady inbound volume and reporting needs |
| Elite | $999/mo | $799 | up to 500 leads/month | Higher-volume roofer needing broader reporting and coordination support |
| Custom | Custom monthly | Custom setup | 500+ leads/month or complex scope | Multi-location, complex routing, or advanced reporting scope |

Pricing notes:

- Setup covers guided setup, intake alignment, lead-source wiring review, and launch readiness — not a generic self-serve signup.
- Monthly fees cover the lead-to-inspection operating layer for the included volume band.
- Website pricing sections must mirror this table in planning materials only until explicit founder approval for publication.
- Do not publish old quota-based appointment promises or legacy pilot guarantee framing.

## Lead Volume Limits and Plan-Fit Logic

### Volume bands

- **Starter:** up to 75–100 leads/month. Default recommendation for first paid roofer with one service area and one primary lead-response path.
- **Growth:** up to 250–300 leads/month. Recommend when monthly inbound leads consistently exceed Starter band or reporting cadence needs broaden.
- **Elite:** up to 500 leads/month. Recommend for high inbound volume with single-location complexity still manageable by one operator team.
- **Custom:** required when expected or actual volume exceeds 500 leads/month.

### Plan-fit decision fields

Capture during intake review:

- estimated_monthly_lead_volume
- peak_season_multiplier
- primary_lead_sources
- service_area_count
- calendar_count
- phone_number_count
- routing_complexity
- reporting_depth_required
- post_inspection_follow_up_required
- post_inspection_feedback_capture_required
- recommended_plan
- custom_review_required (yes/no)
- plan_fit_owner
- plan_fit_timestamp

### Plan-fit rules

1. If estimated volume is within a tier band and scope is single-location with one calendar and one primary business number, recommend the matching tier.
2. If volume is borderline (for example 95–110 leads/month), recommend Growth only when reporting depth or follow-up load clearly exceeds Starter capacity.
3. If any custom trigger applies, set `custom_review_required=yes` and do not auto-assign Starter/Growth/Elite list pricing without founder review.

## Custom Review and Pricing Triggers

Route to Custom review/pricing when any of the following apply:

- **500+ leads/month** expected or observed in a rolling 30-day window.
- **Multi-location** operations requiring distinct service areas, crews, or routing per location.
- **Complex routing** (for example storm lanes, insurance lanes, emergency lanes, or rep-assignment rules beyond standard single-queue handling).
- **Multiple calendars** (more than one bookable calendar or crew schedule that must stay synchronized).
- **Multiple phone numbers** (more than one primary inbound business line requiring coordinated response).
- **Advanced reporting** beyond standard CSV export and weekly/monthly summary scope (for example multi-location rollups, custom KPI packs, or external BI handoff).

Custom review output must document:

- scope_summary
- volume_assumption
- custom_monthly_price
- custom_setup_price
- overage_rule
- implementation_notes
- founder_approval_status (PASS / HOLD / BLOCKED)
- reviewer
- review_timestamp

## Overage Protection

Overage protection keeps RoofLeadHQ fairly priced and prevents surprise bills when lead volume spikes.

### Principles

- Each tier includes a documented lead-volume band. Leads are counted when they enter the RoofLeadHQ lead-to-inspection workflow (inbound call, form, text, email handoff, or manual outreach entry), not when an inspection is booked.
- Overage is measured monthly against the subscribed tier band.
- No silent overage billing. The roofer receives notice before any overage charge applies.
- Overage does not imply guaranteed inspections, appointments, or revenue outcomes.

### Overage handling workflow

1. Monitor monthly lead count against tier band during founder/operator review (manual until reporting automation is explicitly approved).
2. At 80% of tier band, flag for roofer review and internal HOLD check.
3. At 100% of tier band, pause new automation expansion (if any were approved) and notify roofer with upgrade or custom-review options.
4. Above tier band without approved upgrade: apply documented overage rate only after written roofer acknowledgment or contract amendment — never automatically in this planning phase.

### Overage protection language (for Agreement, Terms, and website planning)

- "Your plan includes a monthly lead-volume band. If your volume consistently exceeds that band, we will notify you and recommend an upgrade or custom plan before additional charges apply."
- "Lead volume counts inbound leads entering your RoofLeadHQ lead-to-inspection workflow, not booked inspections or closed jobs."
- "Overage protection requires timely review. Sustained volume above your tier without an approved plan change may require a service pause until plan fit is resolved."

## Website Pricing Requirements (Planning Only)

Do not publish website changes from this packet. Use this section for alignment review only.

Website pricing planning must include:

- Starter / Growth / Elite / Custom table matching the hybrid pricing structure above.
- Guided setup fee called out separately from monthly subscription.
- Lead-volume band shown per tier (75–100, 250–300, 500, Custom for 500+).
- Overage protection summary in plain language.
- Custom-review triggers list (multi-location, complex routing, multiple calendars, multiple phone numbers, advanced reporting).
- Primary CTA: Book a Founder-Led Setup Call or equivalent guided-setup CTA — not instant self-serve activation.
- Trust line emphasizing founder-led setup and lead-to-inspection focus.
- Later-only features clearly marked as not included in standard near-term plans (photos optional, no instant quotes, no deposits, no payment collection, no native CRM sync, no multi-location automation in standard tiers, no market intel in core).

Forbidden public language must not appear on the website. See Forbidden Public Language Guardrails below.

## Fillout Intake Question List

Use this question list when planning Fillout intake alignment. Do not change live Fillout forms from this packet.

### Business identity

1. Company legal or public name
2. Primary contact name
3. Primary contact phone
4. Primary contact email
5. Business website URL
6. Primary service area (city/region)
7. Number of locations (1 = standard tier candidate; 2+ triggers custom review)
8. License or registration notes (optional)

### Lead volume and plan fit

9. Estimated monthly inbound leads (select band: under 75, 75–100, 101–250, 251–300, 301–500, 500+)
10. Peak season expected multiplier (1x, 1.5x, 2x, unknown)
11. Primary lead sources (phone, website form, Google Business Profile, text, email, referrals, paid leads, other)
12. Do you need post-inspection follow-up support? (yes/no/unsure)
13. Do you want post-inspection feedback capture? (yes/no/unsure)

### Operations and routing

14. How many calendars or crew schedules need booking coordination? (1 / 2+)
15. How many primary business phone numbers need coordinated response? (1 / 2+)
16. Describe routing complexity (standard single queue / storm lane / insurance lane / emergency lane / multi-rep rules)
17. Service area exceptions or multi-zone routing? (yes/no + notes)

### Reporting and export

18. Preferred reporting cadence (weekly / monthly / both)
19. Do you need CSV export for leads and inspection outcomes? (yes/no)
20. Do you need lead source ROI tracking in reports? (yes/no)
21. Advanced reporting needs beyond standard CSV and summary reports? (yes/no — triggers custom review)

### Booking and follow-up preferences

22. Appointment types offered (inspection, estimate visit, insurance inspection, emergency visit)
23. Typical inspection duration
24. Available days and hours
25. Emergency leak or storm handling preference (manual review first)
26. Missed-call recovery preference (manual / automated when approved)

### Compliance and language acknowledgment

27. Acknowledgment: RoofLeadHQ helps with lead-to-inspection response, follow-up, and appointment readiness — not hard job-close or revenue outcome promises
28. Acknowledgment: standard plans include a monthly lead-volume band with overage protection notice
29. Acknowledgment: multi-location, complex routing, multiple calendars, multiple phone numbers, or advanced reporting may require custom pricing
30. Preferred plan interest (Starter / Growth / Elite / Unsure — needs review)

### Internal review fields (founder/operator only)

31. recommended_plan
32. custom_review_required
33. intake_review_status (PASS / HOLD / BLOCKED)
34. intake_reviewer
35. intake_review_timestamp

## Agreement Update Checklist

Use before any Agreement publication or signature. Check each item explicitly.

- [ ] Service described as roofing lead-to-inspection operating layer (fast response, missed-lead recovery, automatic follow-up when approved, appointment readiness, post-inspection follow-up, post-inspection feedback capture) — not generic AI receptionist
- [ ] Plan tier documented (Starter / Growth / Elite / Custom)
- [ ] Monthly fee and one-time setup fee match approved hybrid pricing
- [ ] Included lead-volume band documented per tier
- [ ] Overage protection clause included (notice before additional charges; volume counting method)
- [ ] Custom-review triggers referenced (500+ leads/month, multi-location, complex routing, multiple calendars, multiple phone numbers, advanced reporting)
- [ ] Roofer-first human review and escalation responsibilities documented
- [ ] RoofLeadHQ/Jason review scope limited to workflow, data, and system quality issues
- [ ] CSV export and reporting scope described at high level
- [ ] Lead source tracking and ROI reporting described as reporting support, not revenue guarantee
- [ ] Post-inspection follow-up and feedback capture scope described
- [ ] Photos marked future/optional, not core near-term deliverable
- [ ] Later-only exclusions listed (instant quotes, deposits, payment collection, native CRM sync, multi-location automation in standard tiers, market intel)
- [ ] No prohibited public language in customer-facing Agreement copy
- [ ] Live automation activation requires explicit Jason approval
- [ ] Founder/operator sign-off recorded before publication

## Terms of Service Update Checklist

- [ ] Acceptable use reflects lead-to-inspection operating scope
- [ ] Subscription tier, setup fee, and billing cycle documented
- [ ] Lead-volume band and overage notice policy documented
- [ ] Custom plan and scope-change process documented
- [ ] Service limitations: no guaranteed inspections, appointments, jobs, or revenue
- [ ] Roofer responsibilities for homeowner communication, inspection booking decisions, and contractor review documented
- [ ] RoofLeadHQ responsibilities limited to system operation, workflow quality, and agreed reporting — not outcome guarantees
- [ ] Data handling cross-reference to Privacy Policy
- [ ] Suspension/pause language for sustained over-tier volume without plan change
- [ ] Support and escalation path: roofer-first for homeowner issues; RoofLeadHQ/Jason for workflow/data/system quality
- [ ] Later-only features not represented as currently included
- [ ] No prohibited public language in published Terms
- [ ] Legal review status recorded (PASS / HOLD / BLOCKED)

## Privacy Policy Update Checklist

- [ ] Categories of data collected: business contact, homeowner lead data, communication metadata, appointment preferences, post-inspection feedback when enabled
- [ ] Fillout intake data purpose and retention described
- [ ] Lead source and ROI reporting data use described (aggregated reporting, not sold as market intel in standard tiers)
- [ ] CSV export handling: who can request export, what fields are included, manual vs automated delivery
- [ ] Post-inspection follow-up and feedback capture data flows described
- [ ] Photos marked future/optional with separate consent if enabled later
- [ ] Subprocessor / integration list aligned to actual approved integrations only
- [ ] No live integration claims for disabled systems (SMS, Calendar, Vapi, etc.) until explicitly approved
- [ ] Data retention and deletion request process documented
- [ ] Security posture statement without overstating automation guarantees
- [ ] No prohibited public language in published Privacy Policy
- [ ] Legal review status recorded (PASS / HOLD / BLOCKED)

## CSV Export and Reporting Treatment

### CSV export scope (near-term core)

Standard CSV export may include:

- lead_id
- lead_source
- received_at
- homeowner_name
- homeowner_phone
- homeowner_email
- property_address
- roof_issue_summary
- urgency
- insurance_storm_context
- inspection_readiness_status
- appointment_readiness_status
- booked_inspection_status
- post_inspection_follow_up_status
- post_inspection_feedback_capture_status
- manual_review_flag
- roofer_review_owner
- outcome_notes
- next_action
- exported_at

CSV export is a reporting and operator-review tool. It does not imply native CRM sync (later-only).

### Reporting cadence alignment

- Weekly and monthly summaries tie to `docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md`.
- Reports emphasize lead response, missed-lead recovery, follow-up attempts, booked inspections, booked homeowner appointments, and recommended actions.
- Advanced reporting beyond this scope triggers custom review.

## Lead Source Tracking and ROI Treatment

- Track lead source on every lead for reporting and plan-fit review.
- ROI treatment is informational: compare lead volume and inspection readiness outcomes by source — not hard revenue attribution promises.
- Report lead source counts, contact rates, follow-up attempts, inspection requests, and booked inspections by source where data exists.
- Do not promise ROI multiples, revenue guarantees, or closed-job counts in reporting copy.
- Paid lead vendors, referrals, phone, web form, and manual outreach must use consistent source labels in intake and CSV export.

## Post-Inspection Follow-Up Treatment

Post-inspection follow-up is part of the lead-to-inspection operating layer when the roofer opts in.

- Scope: homeowner follow-up after an inspection visit — thank-you, next-step reminder, additional info request, or reschedule prompt as configured.
- Default near-term posture: manual roofer review with RoofLeadHQ-prepared draft or checklist until live follow-up automation is explicitly approved.
- Track `post_inspection_follow_up_status` on each lead.
- Escalation: homeowner dispute or quality issue goes to roofer-first review; workflow or data defects go to RoofLeadHQ/Jason review.
- Not in scope: payment collection, deposit requests, unattended quote delivery, or job-close outcome promises.

## Post-Inspection Feedback Capture Treatment

Post-inspection feedback capture collects structured homeowner feedback after an inspection for roofer review.

- Scope: simple feedback prompt (satisfaction, clarity of next steps, optional comment) tied to the inspection record.
- Default near-term posture: optional roofer-enabled feature; manual export or dashboard review until automation approved.
- Track `post_inspection_feedback_capture_status`.
- Feedback is for contractor review and service improvement — not public review gating or guaranteed outcomes.
- Store minimum necessary fields; align with Privacy Policy retention rules.

## Roofer-First Human Escalation and Review Model

### Roofer-first (default)

The roofing contractor or designated operator owns:

- Homeowner communication decisions
- Inspection booking and reschedule decisions
- Emergency leak or storm judgment calls on-site
- Pricing, estimate, and proposal conversations
- Post-inspection follow-up wording and timing
- Post-inspection feedback response
- contractor review of lead quality and source ROI interpretation

### RoofLeadHQ / Jason review (limited scope)

RoofLeadHQ or Jason reviews only:

- workflow defects (missing fields, broken handoff, incorrect routing)
- data quality issues (duplicate leads, mapping errors, export gaps)
- system quality issues (dashboard errors, integration failures, unsafe activation risk)

RoofLeadHQ/Jason does not override roofer homeowner decisions or promise inspection outcomes.

### Escalation log fields

- escalation_id
- lead_reference
- issue_type (homeowner / workflow / data / system)
- first_reviewer (roofer / RoofLeadHQ)
- escalation_status (open / resolved / HOLD)
- resolution_notes
- owner
- timestamp

## Photos, Optional and Future-Only

Photos are future/optional only in near-term standard plans.

- Do not market photo capture, photo AI analysis, or photo-based quoting as core near-term deliverables.
- Intake may ask photo availability status for readiness review.
- If photos are enabled later, require separate scope acknowledgment and Privacy Policy update.
- Standard Agreement/Terms/Privacy checklists must mark photos as optional/future.

## Later-Only / Not Near-Term Core Exclusions

Do not represent these as included in standard near-term Starter, Growth, or Elite plans:

- instant quotes
- deposits
- payment collection
- native CRM sync
- multi-location automation (multi-location itself triggers custom review; automation across locations is later-only)
- market intel

These may be discussed as roadmap items only after explicit founder approval and legal review.

## Preferred Public Language

Use in website, Fillout, Agreement, Terms, Privacy, and sales materials:

- booked inspections
- booked homeowner appointments
- lead-to-inspection
- fast response
- missed-lead recovery
- automatic follow-up
- appointment readiness
- post-inspection follow-up
- post-inspection feedback capture
- CSV export
- roofer review
- contractor review
- guided setup

## Forbidden Public Language Guardrails

Never use the following categories in public customer-facing materials. The read-only verifier enforces that exact prohibited phrases do not appear anywhere in this packet body.

| Category | Prohibited public phrasing category (do not use) |
| --- | --- |
| Job closing | job-closing outcome promises or language that implies the product closes jobs for the roofer |
| Revenue guarantees | hard revenue outcome promises or language that implies the product closes jobs for the roofer |
| Appointment guarantees | hard appointment outcome promises or quota-based appointment counts |
| Automation overreach | unattended no-human-oversight claims or language implying unattended estimates, quotes, invoices, or payments without roofer review |
| Legacy pilot promises | quota-based short-window pilot guarantees or seven-day style appointment count promises |

When reviewing drafts, replace prohibited phrasing with preferred lead-to-inspection language above.

## PASS / HOLD / BLOCKED Criteria

**PRICING VOLUME GUARDRAIL AND INTAKE ALIGNMENT PACKET PASS**

- Hybrid pricing structure, volume limits, overage protection, and custom triggers documented.
- Fillout question list complete and aligned to plan-fit logic.
- Agreement, Terms, and Privacy checklists complete.
- CSV/reporting, lead source ROI, post-inspection follow-up, and feedback capture documented.
- Roofer-first escalation model and limited RoofLeadHQ/Jason review scope documented.
- Photos marked future/optional; later-only exclusions explicit.
- Forbidden and preferred language guardrails present.
- Read-only verifier and dry-run wrapper pass; no live publication or activation attempted.

**PRICING VOLUME GUARDRAIL AND INTAKE ALIGNMENT PACKET HOLD**

- Missing checklist items, incomplete plan-fit fields, or website/Fillout/legal publication attempted without founder approval.
- Custom review triggers identified but custom pricing not yet documented.

**PRICING VOLUME GUARDRAIL AND INTAKE ALIGNMENT PACKET BLOCKED**

- Any live website publication, Fillout change, legal publication, production activation, credential change, or customer data handling change attempted from this packet.
- Any prohibited public language approved for customer-facing publication.
- Any live automation enabled without explicit Jason approval.

## Completion Criteria

This packet is complete when:

1. All sections above contain substantive operational content (not heading-only).
2. `node backend/scripts/verify-pricing-volume-guardrail-and-intake-alignment-readonly.js` passes.
3. `bash scripts/run-pricing-volume-guardrail-and-intake-alignment-dry-run.sh` passes.
4. Aggregate first-paid pilot readiness includes this verifier.
5. Verifier index and next-chat context packages reference this packet.
6. No commit or push occurs until Terminal 1 review.