# RoofLeadHQ Brand Positioning and Public Messaging System Packet

Date: 2026-06-21

Canonical source of truth before this worktree is: `d561b56 test(pilot): add production tenant account model readiness packet`.

This is the Brand Positioning and Public Messaging System readiness packet. Jason (founder/operator) must use this packet to lock in the definitive brand positioning hierarchy, approved public phrase library, usage rules, clarification guardrails, and internal-only vs public language boundary before any website, ad, email, sales, onboarding, or proposal copy is changed.

**This is messaging/source-of-truth/readiness only.**

Do **not** update website production copy yet.
Do **not** update backend-or-src.
Do **not** add routes.
Do **not** modify app behavior.
Do **not** add migration files.
Do **not** change schema.
Do **not** implement auth/RLS.
Do **not** read or modify `.env` files.
Do **not** create credentials.
Do **not** activate Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, external calls, or production behavior.

All work remains dry-run/internal-only/founder-operator-only. This packet performs no production writes, no external service calls, no live sends, no live notifications, no website edits, no copy deployment, no ad copy changes, no email template changes, and no production behavior activation.

Public/business language (used in all customer-facing and prospect communications) is governed by the approved public phrase library and clarification rules in this packet. The preserved already-approved public-facing lines remain in force and must not be overwritten.

This packet file: `docs/BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md`
This packet includes 9 copy-paste-ready manual tracker tables.
Wrapper: `scripts/run-brand-positioning-public-messaging-system-packet-dry-run.sh`
Verifier: `backend/scripts/verify-brand-positioning-public-messaging-system-packet-readonly.js`
Wired into: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js` + `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md` + `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md` + `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md` + `docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md` + `docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md`

## 1. Internal-only dry-run scope

This packet is strictly internal-only / dry-run / founder-operator-only. It is the dedicated brand positioning and public messaging source-of-truth packet that defines and locks the new positioning hierarchy before any future website copy, ad copy, email copy, sales scripts, onboarding language, proposal language, or marketing materials are updated.

It contains no implementation, no production activation, no external calls, no website file modifications, no backend-or-src changes, and no changes to any customer-facing production assets. All content is for founder (Jason) manual-review, logging, evidence collection, decision logging, and explicit PASS/HOLD/BLOCKED decision only. No customer or prospect receives internal-only language from this packet. This packet does not activate or implement any production changes, any copy deployment, or live marketing. All execution artifacts, trackers, and gate decisions remain local to the founder/operator.

This packet asserts and the verifier will enforce: this is brand positioning and public messaging source-of-truth/readiness only. The doc says it is messaging/source-of-truth/readiness only. The doc says no website production copy, no backend-or-src, no routes, no migration files, no schema, no auth/RLS, no .env, no credentials, no Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher/CRM/payment automation/production Supabase writes/external calls/production behavior are changed. The doc requires PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes. The doc includes the full positioning hierarchy, core positioning line, primary conversion phrase, pain hook, core explainer, trademark/campaign phrase hold for "The Roof Lead Closer™", usage rules, approved public phrase library (without primary Closer badge), clarification/hold rules, public-vs-internal boundary, recommended (but not applied) website messaging examples, sales/demo/email/ads/content/onboarding/proposal/pitch language guidance, brand consistency checklist, and 9 trackers. The doc references the required prior production readiness packets at their canonical commits. Customer-facing sections use approved language only. Forbidden customer-facing phrases and interpretations are absent from customer-facing template sections. Internal founder/operator/manual language is confined to labeled internal-only dry-run sections. The packet requires a PASS/HOLD/BLOCKED Website Update Readiness Decision before any future website copy changes. "RoofLeadHQ – The Roof Lead Closer™" is documented only as a hold, not primary.

## 2. Brand positioning purpose

The purpose of this packet is to serve as the concrete manual brand positioning and public messaging source-of-truth framework that must be explicitly PASSED (or accepted HOLD) before any website, ad, email, sales, onboarding, or proposal copy updates may be considered or executed. It converts the prior positioning work and the Production Implementation Sequencing and Approval Plan (at d22ea8a) language boundaries into a locked, auditable, founder-approved hierarchy, phrase library, usage rules, and decision gate.

It receives the completed Production Tenant Account Model Readiness Packet (at d561b56), Production Config / Env Readiness Audit Packet (at 1e1fe69), Production Implementation Sequencing and Approval Plan (at d22ea8a), Final Production Go-Live Acceptance Gate (at f3c3e80), Live Integration Activation Readiness Plan (at a11bfbd), Production Security / Auth / RLS / Schema Readiness Plan (at e494f4b), Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (at cc80caf), ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md, and WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md as primary inputs.

It produces the locked positioning hierarchy (brand badge/moat phrase, official definition, primary conversion phrase, primary pain hook, core explainer), clarification rules for "The Roof Lead Closer™", usage rules for "Never Miss Another Roofing Lead" and "Instant Lead-to-Inspection", approved public phrase library (new + preserved), forbidden interpretation and guarantee-risk rules, recommended website messaging placement examples (not applied), channel-specific language guidance, brand consistency checklist, and an explicit PASS/HOLD/BLOCKED Website Update Readiness Decision. Only an explicit PASS (or accepted HOLD with mitigation) at the Website Update Readiness Decision (section 26 and final tracker) authorizes any future consideration of website or public copy changes. This packet exists to prevent any ad-hoc positioning drift, risky guarantee language, misinterpretation of "Closer", or inconsistent messaging across channels. This packet prevents any ad-hoc positioning drift before full hierarchy lock, phrase library approval, clarification guardrails, owner sign-off, and re-verification of all prior gates. This packet prevents any public copy changes before full hierarchy lock, phrase library approval, clarification guardrails, owner sign-off, and re-verification of all prior gates.

## 3. Source-of-truth prerequisite

Before any execution of this packet or recording of a PASS, the canonical source of truth must be verified at d561b56 test(pilot): add production tenant account model readiness packet.

- The Production Tenant Account Model Readiness Packet (docs/PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md at d561b56) must be present with its verifier and wrapper green, and must record PASS (or explicitly accepted HOLD) at its Tenant Account Readiness Decision.
- The Production Config / Env Readiness Audit Packet (docs/PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md at 1e1fe69) must have recorded explicit PASS (or accepted HOLD) at its Config Env Readiness Decision.
- The Production Implementation Sequencing and Approval Plan (docs/PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md at d22ea8a) must have recorded explicit PASS (or accepted HOLD) at its Implementation Sequencing Decision.
- The Final Production Go-Live Acceptance Gate (docs/FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md at f3c3e80) must have recorded explicit PASS (or accepted HOLD with mitigation) with source-of-truth at a11bfbd, rollback/kill-switch evidence, owner approval, and all 9 of its trackers complete.
- Prior input gates via final: Live Integration Activation Readiness Plan (docs/LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md at a11bfbd), Production Security / Auth / RLS / Schema Readiness Plan (docs/PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md at e494f4b), Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (docs/MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md at cc80caf), ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md, and WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md must be present with verifiers/wrappers green.
- The aggregate pilot readiness verifier (verify-first-paid-pilot-readiness-readonly.js) must pass including the production tenant account model readiness packet entry and (after wiring) this brand positioning public messaging system packet entry.
- Source-of-truth commit chain and recorded milestone verifiers must align to d561b56 for the tenant packet (and 1e1fe69 / d22ea8a / f3c3e80 for prior) as immediate predecessors.
- Any drift or unverified state forces HOLD or BLOCKED at the Website Update Readiness Decision Tracker.

This packet does not duplicate the full content of any input. It performs the brand positioning definition/lock and produces the positioning decision + 9 trackers + handoff artifact only.

## 4. Input from latest production readiness packets

Primary input:
- PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md (at d561b56) — specifically its completed Slice 2 PASS (or accepted HOLD), source-of-truth verification at d561b56, all 9 trackers, rollback/kill-switch evidence for tenant surfaces, owner approval evidence, safety guardrails, public-vs-internal language boundary, and the no-forbidden-impl confirmation. This packet builds directly on the tenant/account model boundary by ensuring all future public messaging respects tenant-isolated, per-roofer value delivery without cross-roofer claims or guarantees.

This packet treats the Tenant/Account Model Readiness Packet (d561b56) + Config/Env Audit Packet (1e1fe69) + Sequencing Plan (d22ea8a) + Final Go-Live Acceptance Gate (f3c3e80) as non-skippable master gates. No public copy changes, website updates, ad language, sales scripts, onboarding language, or proposal language may be approved or deployed until the tenant/account model has recorded explicit PASS, the config/env audit has recorded explicit PASS, the sequencing plan has recorded explicit PASS, the final gate has recorded PASS, source-of-truth at d561b56 (and 1e1fe69/d22ea8a/f3c3e80) is re-verified, rollback/kill-switch readiness for messaging surfaces is evidenced, owner approval is recorded, and this dedicated Brand Positioning and Public Messaging System Packet records explicit PASS at the Website Update Readiness Decision.

The packet also re-confirms inputs from:
- PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md at 1e1fe69
- PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md at d22ea8a
- FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md at f3c3e80
- LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md at a11bfbd
- PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md at e494f4b
- MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md at cc80caf
- ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md
- FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md
- WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md

All referenced packets remain the authoritative source for their domains; this packet adds the brand positioning overlay and public messaging source-of-truth layer on top.

## 5. Positioning hierarchy

This packet locks the definitive brand positioning hierarchy. All future public-facing language, website copy, marketing, sales, onboarding, and proposals must derive from this hierarchy. No deviations without re-running this packet's decision gate and obtaining explicit founder approval.

1. Primary brand:
   `RoofLeadHQ`

2. Core positioning line:
   `Closing the gap between roofing lead and booked inspection.`

3. Primary conversion phrase:
   `Instant Lead-to-Inspection for Roofing Contractors`

4. Primary pain hook:
   `Never Miss Another Roofing Lead`

5. Core explainer:
   `RoofLeadHQ AI responds fast, follows up automatically, recovers missed leads, and books homeowner inspections on the roofer’s calendar.`

6. Trademark / campaign hold:
   `RoofLeadHQ – The Roof Lead Closer™` is **not approved for primary public website use yet**. It may only be documented as a future optional campaign/ad-test phrase pending legal/market review and clear lead-to-inspection clarification. It must not be treated as the primary tagline, main hero line, or required public phrase library item.

These elements form the non-negotiable spine. All approved public phrases (section 22) and recommended placements (sections 11-21) must align to this hierarchy. The "Closer" phrase is held and its potential future use (if any) is governed by the hold rules in section 6 and 7.

## 6. Core positioning line and Trademark / Campaign Phrase Hold

The core positioning line is locked as:

`Closing the gap between roofing lead and booked inspection.`

This is the primary public framing line (e.g., in subheadlines, value props, and clarifications). Variants such as "Close the gap between roofing lead and booked inspection." are approved when contextually appropriate.

"RoofLeadHQ – The Roof Lead Closer™" (and "The Roof Lead Closer™") is placed on **trademark / campaign phrase hold**:

- It is **not approved for primary public website use yet**.
- It may only be documented as a future optional campaign/ad-test phrase.
- Any future public use requires explicit legal/market review + clear nearby lead-to-inspection clarification language.
- It must **not** be treated as the primary tagline, main hero line, badge in primary position, or required item in the public phrase library.
- The hold exists specifically because of the risk that "Closer" will be misunderstood as RoofLeadHQ closing roofing jobs, roofing sales, contracts, projects, or revenue for the roofer.

The four gaps (response, follow-up, missed-lead, scheduling) between paid lead and booked homeowner inspection remain the accurate description of what RoofLeadHQ delivers. The hold on the "Closer" phrase is a risk-mitigation measure, not a rejection of the underlying "gap closing" concept. The core positioning line "Closing the gap..." is the approved, low-risk way to express the value publicly at this time.

## 7. Lead-to-inspection clarification rule and No primary public use rule for the held phrase

"RoofLeadHQ – The Roof Lead Closer™" (the held phrase) may **only** be considered for future optional campaign/ad-test use when paired nearby with clarifying lead-to-inspection language such as "closing the gap between lead and inspection," "lead-to-inspection," "booked homeowner inspection," "booked homeowner appointment," or "from roofing lead to booked inspection."

**No primary public use until approved rule**: The held phrase must not be used as the primary tagline, hero badge, main H1/H2, or default public identity on the website, in ads, emails, sales materials, onboarding, or proposals. Primary public language must lead with "RoofLeadHQ", the core positioning line "Closing the gap between roofing lead and booked inspection.", the conversion phrase, and the pain hook.

The core positioning line itself ("Closing the gap...") already provides the lead-to-inspection clarity and is the approved primary expression. The hold on the "Closer" badge is precisely because using "Closer" as primary creates high risk of misinterpretation that RoofLeadHQ closes the actual roofing sale/job/revenue.

Any future public use of the held phrase requires:
- Explicit founder + legal/market review sign-off (PASS at a future decision gate).
- Mandatory nearby clarification using the approved core positioning line or equivalent.
- Not appearing in primary hero/website navigation positions until cleared.

The verifier will enforce that the held phrase is not required or presented as primary in the approved library or website examples. This packet's trackers and Website Update Readiness Decision will record the hold status.

## 8. Never Miss Another Roofing Lead usage rule

"Never Miss Another Roofing Lead" is approved as the primary pain hook.

Approved full phrases:
- "RoofLeadHQ: Never Miss Another Roofing Lead"
- "Never miss another roofing lead because nobody responded fast enough."

Usage constraints:
- Must be paired with the mechanism (fast response, automated follow-up, missed-lead recovery, calendar booking) or the outcome (booked homeowner inspection / lead-to-inspection).
- Must not imply that RoofLeadHQ prevents all lead loss or guarantees no missed leads in an absolute sense; the phrase is a pain hook and aspiration supported by the core explainer.
- In headlines and ads it may stand as a short hook when the subheadline or body immediately supplies the lead-to-inspection clarification and mechanism.

## 9. Instant Lead-to-Inspection usage rule

"Instant Lead-to-Inspection for Roofing Contractors" is approved as the primary conversion phrase.

Approved variants (see approved library):
- "Instant Lead-to-Inspection for Roofing Contractors"
- "RoofLeadHQ: Instant Lead-to-Inspection"

Usage constraints:
- "Instant" refers to the speed of response + automated follow-up that moves a lead toward a booked inspection without manual delay by the roofer.
- Must not be used to imply instant booking without homeowner qualification, availability, or the roofer's calendar confirmation.
- Must always tie back to "booked homeowner inspection" or "booked homeowner appointment" rather than "instant job" or "instant close."

## 10. Core explainer language

The locked core explainer is:

`RoofLeadHQ AI responds fast, follows up automatically, recovers missed leads, and books homeowner inspections on the roofer’s calendar.`

This sentence (or very close approved variants from the phrase library) must be the primary supporting language for any headline, badge, or hook that uses the new positioning.

Expanded approved form (also locked):
`RoofLeadHQ AI closes the gap between roofing lead and booked homeowner inspection with fast response, automated follow-up, missed-lead recovery, and calendar booking.`

All core explainer language must emphasize the four actions (responds fast, follows up automatically, recovers missed leads, books homeowner inspections) and the outcome (booked homeowner inspection / appointment on the roofer’s calendar). It must not drift into job-closing, revenue guarantees, or automatic-estimate/quote/invoice/payment claims (see forbidden list in section 23).

## 11. Website messaging placement guidance

Recommended website messaging placement (for future consideration only; no website files are modified by this packet):

All public website pages must derive headlines, subheadlines, CTAs, feature descriptions, and FAQ from the positioning hierarchy (section 5), core positioning line, and approved public phrase library (section 22). The held "Closer" phrase must not be used in primary positions.

- Homepage hero: H1 + subheadline + support hook + clarifying line using the core positioning line (see section 12). Do not lead with the held Closer badge as primary.
- Features page: each feature must map to one of the four gap-closing actions or the calendar booking outcome; no feature may claim automatic-estimate/quote/invoice/payment language (see section 23 forbidden list).
- How It Works: steps must show lead intake → fast AI response → automated follow-up → missed-lead recovery → inspection booked on calendar. "Guided Setup" is configuration/onboarding only.
- About page / story: founder story and product story must reinforce "Closing the gap between roofing lead and booked inspection" without founder-led babysitting language in public view.
- Pricing / trial: must use preserved language ("The 14-day trial begins after RoofLeadHQ AI setup goes live.", "An automated email is sent 2 days before the first monthly payment.", "Cancel anytime.", "No long-term contract.").
- All pages: no forbidden phrases or interpretations from section 23 (founder-led-terms / manual-review / day-15 / guaranteed / automatic-estimate/quote/invoice/payment / book-jobs / You-book-the-inspection language) (roofer books; AI books the inspection slot). The held "Closer" badge must not appear as primary hero/identity element.

This packet supplies the source-of-truth; actual website updates require a future PASS at the Website Update Readiness Decision Tracker plus a separate website-copy packet that runs the dedicated website verifiers.

## 12. Homepage hero messaging system

Recommended (not yet applied) homepage hero structure using locked hierarchy (no primary use of the held Closer phrase):

Homepage H1:
`Instant Lead-to-Inspection for Roofing Contractors`

Homepage subheadline:
`RoofLeadHQ AI closes the gap between roofing lead and booked homeowner inspection with fast response, automated follow-up, missed-lead recovery, and calendar booking.`

Support hook (below subheadline or in value prop):
`Never miss another roofing lead because nobody responded fast enough.`

Clarifying line (prominent near hero or value props):
`Closing the gap between roofing lead and booked inspection.`

Primary CTA (example):
`Start Guided Setup`

All hero language must use the approved core positioning line for clarity. The held "Closer" badge is not used in primary hero position.

## 13. Features page messaging system

Recommended (not yet applied) features page language:

- Feature category headers and bullets must reference the four actions: fast response, automated follow-up, missed-lead recovery, calendar booking.
- Example feature title: "Fast Lead Response" — description ties to "never miss a lead because nobody responded in time" + outcome "moves the homeowner toward a booked inspection."
- Example feature title: "Automated Follow-Up" — "RoofLeadHQ AI continues the conversation on your behalf so qualified homeowners reach your calendar."
- Example feature title: "Missed-Lead Recovery" — "Leads that slip through get automatic recovery outreach; nothing falls through the cracks."
- Example feature title: "Calendar Booking" — "Qualified inspections are placed directly on your calendar. You focus on the inspection and the sale."

No feature may claim:
- Closes-roofing-jobs / closes-roofing-sales (see section 23)
- automatic-estimate/quote/invoice/payment claims (see section 23)
- guaranteed-appointments/jobs/revenue claims (see section 23)
- "You book the inspection" language (the AI books the inspection slot on the roofer's calendar; the roofer still sells/closes the job; see section 23)

## 14. How It Works messaging system

Recommended (not yet applied) How It Works steps (must map to core explainer):

1. Lead arrives (paid roofing lead from any source).
2. RoofLeadHQ AI responds fast (the response gap is closed).
3. Automated follow-up keeps the conversation alive (the follow-up gap is closed).
4. Missed-lead recovery brings stalled leads back (the missed-lead gap is closed).
5. Qualified homeowners are booked on the roofer’s calendar (the scheduling gap is closed; outcome is booked homeowner inspection).

Emphasize: "Guided Setup happens first." (preserved). After Guided Setup the AI operates. The roofer receives booked inspections, not automatic jobs or revenue.

## 15. About page messaging system

Recommended (not yet applied) About / story language:

- Product story must center the core positioning line: "Closing the gap between roofing lead and booked inspection." (The held "Closer" phrase is not used as primary public identity.)
- Founder story may be told internally but public version must not position ongoing founder/operator manual-review or babysitting as the delivered service (see section 23 forbidden list for exact terms).
- Must preserve: "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery." (preserved line)
- Must not introduce forbidden founder-led-terms or manual-review language from section 23 in public About copy.

## 16. Sales/demo conversation language

Approved sales/demo conversation language (internal founder/operator use during dry-run only until public copy is updated via future approved packet):

- Lead with primary brand + core positioning: "RoofLeadHQ. Closing the gap between roofing lead and booked inspection." (The held Closer phrase is not used as primary public identity in demos.)
- Conversion framing: "We deliver Instant Lead-to-Inspection for Roofing Contractors."
- Pain hook: "Never Miss Another Roofing Lead. Never miss another roofing lead because nobody responded fast enough."
- Mechanism: "RoofLeadHQ AI responds fast, follows up automatically, recovers missed leads, and books homeowner inspections on the roofer’s calendar."
- Clarification (must be spoken or shown): "Closer does not mean we close roofing jobs or roofing sales for you. We close the response, follow-up, missed-lead, and scheduling gaps so you get more booked inspections to sell." (see section 23 for exact "does not mean" locked wording)
- Trial language (preserved): "Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract."
- Objection handling: If prospect hears "closer" as "you close jobs for me," immediately correct with the official definition and four gaps.

Internal demo scripts, worksheets, and founder notes may contain internal-only rehearsal language but must be clearly labeled internal-only / dry-run / founder-operator-only and must never be copied into customer-facing materials without passing this packet's decision gate.

## 17. Email/outreach messaging language

Approved email/outreach language (source-of-truth; do not deploy until future website update packet after PASS):

Subject line examples:
- "Never Miss Another Roofing Lead"
- "Instant Lead-to-Inspection for your roofing business"

Body opening:
"RoofLeadHQ
Closing the gap between roofing lead and booked inspection."

Core paragraph (use approved library):
"RoofLeadHQ AI responds fast, follows up automatically, recovers missed leads, and books homeowner inspections on the roofer’s calendar."

Preserved lines (must remain):
- "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery."
- "Guided Setup happens first."
- "The 14-day trial begins after RoofLeadHQ AI setup goes live."
- "An automated email is sent 2 days before the first monthly payment."
- "Cancel anytime. No long-term contract."

No email may use forbidden phrases (section 23).

## 18. Google Ads and LinkedIn messaging language

Approved ad language (source-of-truth only):

Headline options:
- "Instant Lead-to-Inspection for Roofing Contractors"
- "RoofLeadHQ: Never Miss Another Roofing Lead"
- (The held "RoofLeadHQ – The Roof Lead Closer™" is not approved for primary ad use at this time.)

Description / body must immediately include clarification:
"Closing the gap between roofing lead and booked inspection. RoofLeadHQ AI responds fast, follows up automatically, recovers missed leads, and books homeowner inspections on the roofer’s calendar."

Pain + mechanism:
"Never miss another roofing lead because nobody responded fast enough. From roofing lead to booked homeowner inspection."

CTAs: "Start Guided Setup", "See How It Works"

No ad may claim guaranteed-jobs/revenue, automatic closing of sales, book-jobs, or automatic-estimates/quotes/invoices/payments (see section 23 for full forbidden list).

"Closer" in ad headlines must be supported by lead-to-inspection language in the same ad unit (description or headline 2).

## 19. Content/video messaging language

Approved content and video language (for future scripts, not yet produced):

- Video hook (first 5 seconds): "Never Miss Another Roofing Lead."
- Title/positioning: "RoofLeadHQ | Instant Lead-to-Inspection for Roofing Contractors" (The held "Closer" phrase is not used as primary title at this time.)
- Core narrative must walk through the four gaps using the core explainer sentence.
- Case / proof language: "From roofing lead to booked homeowner inspection."
- "Closing the gap between roofing lead and booked inspection."
- End card / CTA: must restate "Closing the gap between roofing lead and booked inspection." + preserved trial language. (No primary use of held Closer badge.)
- No video may use book-jobs / guaranteed-appointments / close-more-jobs-automatically / closes-deals / automatic-estimate / founder-led-babysitting framing as the product (see section 23 forbidden list).

Transcripts and descriptions must be reviewed against the approved library and forbidden list before publishing.

## 20. Onboarding and Guided Setup messaging language

Approved onboarding / Guided Setup language (public-facing materials only; internal ops notes are separate):

- "Guided Setup happens first." (preserved, non-negotiable)
- "The 14-day trial begins after RoofLeadHQ AI setup goes live." (preserved)
- During Guided Setup the roofer receives clear instructions for phone placement (if applicable in future) and calendar configuration so that RoofLeadHQ AI can book inspections correctly.
- Public onboarding materials must use: "RoofLeadHQ AI closes the gap between roofing lead and booked homeowner inspection with fast response, automated follow-up, missed-lead recovery, and calendar booking."
- Must not promise 5-qualified-appointments-in-7-days / book-jobs / guaranteed-lead-closer, or any outcome beyond booked inspections on the calendar (see section 23).
- Post-setup confirmation language must reinforce that after Guided Setup the AI operates; the roofer receives booked homeowner inspections to run their sales process on.

Internal dry-run onboarding worksheets may contain additional founder/operator coordination notes but must be labeled internal-only and must not leak into customer-facing onboarding assets.

## 21. Proposal and pitch messaging language

Approved proposal / pitch language (for future use after this packet PASS):

- Opening brand + core positioning: "RoofLeadHQ. Closing the gap between roofing lead and booked inspection." (The held Closer phrase is not used as primary public identity in proposals.)
- Value prop: "Instant Lead-to-Inspection for Roofing Contractors."
- Mechanism: Use the full core explainer.
- "From roofing lead to booked homeowner inspection."
- "Built to close the gap between roofing lead and booked homeowner inspection."
- "RoofLeadHQ AI closes the gap between roofing lead and booked homeowner inspection with fast response, automated follow-up, missed-lead recovery, and calendar booking."
- Pricing / terms must use preserved lines exactly: 14-day trial after setup goes live, automated email 2 days before first monthly payment, cancel anytime, no long-term contract.
- Scope of service: explicitly "RoofLeadHQ closes the response gap, follow-up gap, missed-lead gap, and scheduling gap between paid roofing leads and booked homeowner inspections."
- Must include the clarification sentence: "Closing the gap between roofing lead and booked inspection — not the roofing sale." (full "Closer does not mean..." locked wording and hold rationale is in section 23.)

No proposal or pitch may contain any forbidden phrase or interpretation from section 23.

## 22. Approved public phrase library

All new approved public language (locked by this packet; "RoofLeadHQ – The Roof Lead Closer™" is excluded from primary public library per the hold):

- "Closing the gap between roofing lead and booked inspection."
- "Close the gap between roofing lead and booked inspection."
- "Instant Lead-to-Inspection for Roofing Contractors"
- "RoofLeadHQ: Instant Lead-to-Inspection"
- "RoofLeadHQ: Never Miss Another Roofing Lead"
- "Never Miss Another Roofing Lead"
- "RoofLeadHQ AI closes the gap between roofing lead and booked homeowner inspection with fast response, automated follow-up, missed-lead recovery, and calendar booking."
- "RoofLeadHQ AI responds fast, follows up automatically, recovers missed leads, and books homeowner inspections on the roofer’s calendar."
- "Never miss another roofing lead because nobody responded fast enough."
- "From roofing lead to booked homeowner inspection."

Preserved already-approved public-facing lines (must remain present and must not be removed or contradicted):

- "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery."
- "Guided Setup happens first."
- "The 14-day trial begins after RoofLeadHQ AI setup goes live."
- "An automated email is sent 2 days before the first monthly payment."
- "Cancel anytime."
- "No long-term contract."

Any public copy, website, ad, email, sales script, onboarding material, or proposal must use only language from this approved library (new + preserved) or close approved paraphrases that do not introduce forbidden interpretations. Deviations require re-running this packet's decision gate. The held Closer phrase is not part of the required primary library.

## 23. Forbidden interpretation and guarantee-risk rules

The hold on "The Roof Lead Closer™" exists in part because of the high risk of the forbidden interpretations below. Even if the phrase is ever approved for limited campaign use, these misinterpretations must never be allowed in public language.

Explicit statements (locked; required to be present for the hold rationale and boundary definition):

Closer does not mean RoofLeadHQ closes roofing jobs.
"Closer" does not mean RoofLeadHQ closes roofing jobs.
Closer does not mean RoofLeadHQ closes roofing sales.
"Closer" does not mean RoofLeadHQ closes roofing sales.
Closer does not mean RoofLeadHQ guarantees signed contracts, projects, revenue, or completed roofing work.
"Closer" does not mean RoofLeadHQ guarantees signed contracts, projects, revenue, or completed roofing work.
RoofLeadHQ closes the response gap, follow-up gap, missed-lead gap, and scheduling gap between paid roofing leads and booked homeowner inspections.
The packet says "closer" does not mean closing roofing jobs, roofing sales, signed contracts, projects, revenue, or completed roofing work.
The packet says RoofLeadHQ closes the response gap, follow-up gap, missed-lead gap, and scheduling gap between paid roofing leads and booked homeowner inspections.

Forbidden customer-facing/public phrases and interpretations (must be absent from all customer-facing sections, website, ads, emails, sales scripts, onboarding, proposals, and any public materials):

- Founder-Led Launch Program
- Request Founder-Led Launch Review
- founder review
- manual review
- manual coordination
- Live Automation Disabled
- Monthly billing starts on day 15
- day 15
- 14-day launch trial
- 7-day pilot
- seven-day pilot
- 5 qualified appointments in 7 days
- book jobs
- booked jobs
- booked-job
- guaranteed appointments
- guaranteed revenue
- guaranteed jobs
- guaranteed lead closer
- close roofing sales
- closes roofing sales
- close roofing jobs
- closes roofing jobs
- close more jobs automatically
- closes deals for roofers
- automatic estimate
- automatic quote
- automatic invoice
- automatic payment
- You book the inspection

Any appearance of the above in public/customer-facing template sections or deployed copy forces BLOCKED at the Website Update Readiness Decision.

Internal founder/operator/manual language (including rehearsal of "founder review", "manual coordination", "Live Automation Disabled" for dry-run safety) may appear only in clearly labeled internal-only dry-run sections. Such language must never be copied into public or customer materials.
Internal founder/operator/manual language may appear only in clearly labeled internal-only dry-run sections.

## 24. Public-vs-internal language boundary

Customer-facing / public language (website, ads, LinkedIn, Google, email to prospects, sales calls, proposals, onboarding materials sent to roofers, content/videos):

Must use ONLY the approved public phrase library (section 22), obey the lead-to-inspection clarification rule (section 7), the "closer" interpretation rules (section 23), and the preserved lines. Must never contain any forbidden phrase or interpretation.

internal-only / dry-run / founder-operator-only language (safety notes, rehearsal scripts, operator worksheets, founder review queues, manual coordination notes, Live Automation Disabled markers inside dry-run harnesses, internal trackers, command packets, session archives, approval evidence):
Internal-only / dry-run / founder-operator-only language (safety notes, rehearsal scripts, operator worksheets, founder review queues, manual coordination notes, Live Automation Disabled markers inside dry-run harnesses, internal trackers, command packets, session archives, approval evidence):

May contain the above internal terms but EVERY such artifact must explicitly state it is internal-only / dry-run / founder-operator-only and NOT public positioning, NOT for sales copy, NOT for customer materials, and NOT to be copied into public website files or outward-facing scripts, ads, emails, or proposals.

Context docs, this packet, the verifier index, and the daily guide restate the boundary so agents and future work do not regress the public direction or leak internal safety language into customer view.

## 25. Brand consistency checklist

Before any future copy deployment or website update after this packet:

- Primary brand "RoofLeadHQ" is used; the held "RoofLeadHQ – The Roof Lead Closer™" is not used as primary badge/hero (per hold rules).
- H1 or primary headline uses "Instant Lead-to-Inspection for Roofing Contractors" or approved variant.
- Subheadline or body uses the core positioning line "Closing the gap between roofing lead and booked inspection." or core explainer from the approved library.
- Pain hook "Never Miss Another Roofing Lead" is supported by mechanism or outcome language.
- All four gaps (response, follow-up, missed-lead, scheduling) are referenced or implied by the core explainer.
- Outcome language is always "booked homeowner inspection" or "booked homeowner appointment" (never "booked job", "closed job", "guaranteed revenue").
- "Guided Setup happens first." is present where trial/onboarding is mentioned.
- Preserved trial, pre-billing email, cancel, and no-contract lines are present and verbatim.
- No forbidden phrases appear in any customer-facing section.
- The held "Closer" phrase (if used in future optional campaigns) is explicitly limited by the hold rules and must include nearby "Closing the gap..." clarification; it is not primary.
- Internal-only language is absent from public sections.

This checklist must be re-run (with evidence) at the Website Update Readiness Decision Tracker.

## 26. Future website update readiness decision

This packet does not modify the website. It supplies the locked source-of-truth.

Future website copy updates, ad copy updates, sales script updates, onboarding language updates, or proposal language updates may only proceed after:

1. This packet has recorded explicit PASS (or accepted HOLD with documented mitigation) at the Website Update Readiness Decision Tracker (final table).
2. Full verifier + wrapper + quality gate re-run after any evidence update or HOLD mitigation.
3. Re-confirmation that all prior gates (tenant at d561b56, config at 1e1fe69, sequencing at d22ea8a, final at f3c3e80, etc.) remain green.
4. A subsequent website-specific update packet (following the pattern of prior website positioning and copy packets) has been created, verified, and passed its own dedicated verifiers.
5. Owner (Jason) explicit sign-off on the Website Update Readiness Decision Tracker with timestamp and evidence links.

Only after the above may any production website file, ad account copy, email template, or public sales material be edited to incorporate the hierarchy from this packet.

The packet requires a PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes. HOLD or BLOCKED at this gate blocks all downstream public copy work.

## 27. Safety guardrails

Confirmed Disabled (No Activation or Implementation in Any Form):

- Website production copy changes: not performed by this packet (recommended examples only; actual edits require future PASS + separate packet).
No website production copy changes: not performed by this packet (recommended examples only; actual edits require future PASS + separate packet).
- Backend/src changes: none.
- Routes, controllers, services, public endpoints: none added or modified.
- Migrations, schema changes, table alterations: none.
- Auth, RLS, security implementation, jwt claims, session changes: none.
- .env files: not read or modified.
- Credentials, secrets, Supabase service role keys: not created or used.
- Twilio, Vapi, Calendar, Resend, Lindy: not activated
- Twilio, Vapi, Calendar (Google/Outlook), Resend, Lindy: not activated, not configured for production, no live calls/SMS/emails/booking.
- Cron, scheduler, dispatcher: not activated
- Cron, scheduler, dispatcher, automation runners: not activated or scheduled.
- CRM automation, payment automation, Stripe, billing events: not activated.
- Production Supabase writes: none
- Production Supabase writes, leads, appointments, outcomes, contractor data, or billing events: none.
- External calls, fetch, curl to production services: none.
- Live sends: none
- Live sends (email, SMS, calls, notifications): none.
- Contractor portal, dashboard exposure: none
- Contractor portal, dashboard exposure, per-roofer authenticated surfaces: none.
- Any production behavior, live automation, or customer-impacting change: disabled.

This packet is messaging/source-of-truth/readiness only. All changes are docs + read-only verifier + executable wrapper only. No production behavior, no external calls, no live sends, no credential activation, no scheduler activation, no production writes, no backend-or-src, no migration files, no auth/RLS/security, no contractor portal, no slice implementation (beyond this readiness definition for brand positioning source-of-truth).

Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation).

This packet file: `docs/BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md`

### Brand Positioning Approval Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Positioning hierarchy locked | Primary brand "RoofLeadHQ", core positioning line "Closing the gap...", primary conversion phrase, pain hook, core explainer all approved and non-negotiable | | | | |
| Trademark / campaign hold for "The Roof Lead Closer™" | Held phrase not primary; documented only as future optional pending review; no primary website or ad or sales use yet | | | | |
| Lead-to-inspection clarification + hold rule | Core positioning line used for clarity; held "Closer" only with nearby clarification if ever used in limited campaigns | | | | |

### Approved Public Phrase Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| New approved phrases | All 10 new phrases (core positioning "Closing the gap...", Never Miss, Instant Lead-to-Inspection variants, core explainer, From lead to booked, etc.) recorded and locked; held Closer badge excluded from primary library | | | | |
| Preserved public lines | All 6 preserved lines (AI turns leads..., Guided Setup first, 14-day trial after setup, automated email 2 days before payment, Cancel anytime, No long-term contract) present and required | | | | |
| Phrase library boundary | Only approved library + close paraphrases allowed in public copy; held Closer not required/primary; deviations require re-gate | | | | |

### Lead-to-Inspection Clarification Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Core positioning line use | "Closing the gap between roofing lead and booked inspection." is primary public clarity line | | | | |
| "Closer" / held phrase risk | Explicit statements and hold: does not close roofing jobs/sales; does not guarantee contracts/revenue/work; held precisely to avoid misinterpretation | | | | |
| Four gaps only | RoofLeadHQ closes response/follow-up/missed-lead/scheduling gaps between lead and booked inspection | | | | |

### Website Messaging Placement Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Homepage hero guidance | H1 (Instant Lead-to-Inspection) + subheadline (core explainer) + support hook + clarifying "Closing the gap..." line (examples only; not applied; no primary held Closer badge) | | | | |
| Features / How It Works / About | Mapping to four actions + calendar outcome; use core positioning line for clarity; no auto-estimate/quote/invoice/payment/guarantee language | | | | |
| No website modification | This packet supplies source-of-truth only; no public website files (homepage or other) changed | | | | |

### Sales Demo Language Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Demo script alignment | Primary brand + core positioning line + conversion + pain hook + core explainer + explicit "not closing jobs" clarification (no primary held Closer) | | | | |
| Preserved trial language | Guided Setup first + 14-day trial after live + automated email + cancel anytime + no contract used verbatim | | | | |
| Objection handling | Immediate correction if held "Closer" heard as job closer; emphasize gap closing only | | | | |

### Marketing Channel Copy Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Email/outreach | Approved subjects + bodies using library (core positioning line, not primary held Closer); preserved lines required; no forbidden | | | | |
| Google/LinkedIn ads | Headlines from library (Instant/ Never Miss) + immediate core positioning clarification; held Closer not primary; no guarantees or auto-claims | | | | |
| Content/video | Hook + narrative + end card using core explainer + "Closing the gap..." clarification; transcripts reviewed; no primary held Closer | | | | |

### Onboarding Proposal Language Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Onboarding / Guided Setup | "Guided Setup happens first." + 14-day trial language + mechanism; no outcome guarantees | | | | |
| Proposal / pitch | Primary brand + core positioning line + four gaps + preserved terms + "not the roofing sale" clarification (held Closer not primary) | | | | |
| Scope statement | "RoofLeadHQ closes the response gap, follow-up gap, missed-lead gap, and scheduling gap..." | | | | |

### Forbidden Interpretation Risk Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| Forbidden list absent from public | All 25+ forbidden phrases (Founder-Led, manual-review, day 15, 7-day pilot, guaranteed jobs, close roofing jobs, automatic estimate, You book the inspection, etc.) absent from customer-facing sections | | | | |
| Internal language confined | Founder review / manual coordination / Live Automation Disabled etc. only in explicitly labeled internal-only dry-run sections | | | | |
| Held phrase + "Closer" risk mitigation | Explicit hold + "does not mean" statements in packet; any future limited use must not imply job/sale/revenue close and requires review + clarification | | | | |

### Website Update Readiness Decision Tracker (copy-paste-ready)

| Item | Hold Description | Owner | Status | Evidence | Next Action |
|------|------------------|-------|--------|----------|-------------|
| All 9 model areas approved | Hierarchy (with hold for Closer phrase), core positioning line, rules, phrase library (no primary Closer), clarification/hold, website guidance (new examples without primary badge), channel language, brand checklist, forbidden boundary | | | | |
| Prior gates green | d561b56 (tenant) + 1e1fe69 (config) + d22ea8a (sequencing) + f3c3e80 (final) + a11bfbd + e494f4b + cc80caf + data protection + launch system + trial regression | | | | |
| Wiring + verifier + aggregate green | All 6 wiring targets + dedicated verifier + quality gate | | | | |
| No forbidden changes | No website edits, no backend-or-src, no routes, no migration files, no schema, no auth/RLS, no .env, no credentials, no external activations, no production behavior | | | | |
| Rollback/kill-switch for surfaces | Messaging source-of-truth can be superseded by later approved packet; prior gates remain authoritative | | | | |
| Owner (Jason) approval | Timestamped sign-off + evidence | | | | |
| Explicit PASS/HOLD/BLOCKED | Recorded here; only PASS (or accepted HOLD) authorizes future website copy change consideration + separate update packet | | | | |

## Explicit acceptance/readiness only confirmation

This packet asserts and the verifier will enforce:

- This is brand positioning and public messaging source-of-truth/readiness only.
- Does not update website production copy.
- Does not update backend-or-src.
- Does not add routes.
- Does not modify app behavior.
- Does not add migration files.
- Does not change schema.
- Does not implement auth/RLS.
- Does not read or modify `.env` files.
- Does not create credentials.
- Does not activate Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, external calls, or production behavior.
- This is messaging/source-of-truth/readiness only and does not activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migration files, auth/RLS/security implementation, contractor portal, external integrations, backend-or-src changes, or any production implementation slice. Scheduler-or-cron-or-dispatcher activation remains disabled.
- The doc requires a PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes.
- Rollback/kill-switch readiness for messaging source-of-truth is evidenced by the requirement for re-verification of all prior gates and re-running of this packet's decision before any copy work.
- Source-of-truth prerequisite at d561b56 test(pilot): add production tenant account model readiness packet must be verified.
- Final Production Go-Live Acceptance Gate at f3c3e80 must record PASS before this packet may record PASS.
- Production Implementation Sequencing and Approval Plan at d22ea8a must record PASS before this packet may record PASS.
- Production Config / Env Readiness Audit Packet at 1e1fe69 must record PASS (or accepted HOLD) before this packet may record PASS.
- Production Tenant Account Model Readiness Packet at d561b56 must record PASS (or accepted HOLD) before this packet may record PASS.
- asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation).
- All changes are docs + scripts wrapper + read-only verifier only.
- No production behavior, no external calls, no live sends, no credential activation, no scheduler activation, no production writes, no backend-or-src, no migration files, no auth/RLS/security, no contractor portal, no slice implementation (beyond this readiness definition for brand positioning source-of-truth).
- The packet requires PASS/HOLD/BLOCKED decision before future website copy changes.
The packet says "closer" does not mean closing roofing jobs, roofing sales, signed contracts, projects, revenue, or completed roofing work.
The packet says RoofLeadHQ closes the response gap, follow-up gap, missed-lead gap, and scheduling gap between paid roofing leads and booked homeowner inspections.
- The doc includes the full positioning hierarchy (primary brand, core positioning line, primary conversion, pain hook, core explainer + trademark/campaign hold for "The Roof Lead Closer™"), lead-to-inspection clarification/hold rule, Never Miss / Instant usage rules, core explainer language, website messaging placement guidance with examples (new hero without primary held Closer badge; not applied), sales/demo, email/outreach, Google/LinkedIn, content/video, onboarding/Guided Setup, proposal/pitch language guidance, approved public phrase library (new 10 without primary Closer badge + preserved), forbidden interpretation rules with explicit "Closer does not mean..." + hold rationale, public-vs-internal boundary, brand consistency checklist, future website update readiness decision, and safety guardrails.
The packet includes sales/demo, email/outreach, ads/LinkedIn, content/video, onboarding, Guided Setup, proposal, and pitch language guidance
- Customer-facing sections use only approved public phrase library language and preserved lines.
- Forbidden customer-facing/public phrases and interpretations are absent from customer-facing template sections.
- Internal founder/operator/manual language is confined to labeled internal-only dry-run sections.
- The packet includes recommended website messaging examples (homepage badge/H1/subheadline, clarifying line, features, how it works, etc.) but does not modify the website.
The doc includes recommended website messaging examples but does not modify the website
The packet includes recommended website messaging examples but does not modify the website.

## Verification evidence

- All 27 required sections (1. Internal-only dry-run scope through 27. Safety guardrails) present with substantive content.
- Exactly 9 copy-paste-ready manual tracker tables present with owner/status/evidence/next-action columns (Brand Positioning Approval Tracker, Approved Public Phrase Tracker, Lead-to-Inspection Clarification Tracker, Website Messaging Placement Tracker, Sales Demo Language Tracker, Marketing Channel Copy Tracker, Onboarding Proposal Language Tracker, Forbidden Interpretation Risk Tracker, Website Update Readiness Decision Tracker).
- References to PRODUCTION_TENANT_ACCOUNT_MODEL_READINESS_PACKET.md at d561b56, PRODUCTION_CONFIG_ENV_READINESS_AUDIT_PACKET.md at 1e1fe69, PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md at d22ea8a, FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md at f3c3e80, LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md at a11bfbd, PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md at e494f4b, MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md at cc80caf, ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md, and WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md present.
- FIRST_PAID_LAUNCH_VERIFIER_INDEX.md and verify-first-paid-pilot-readiness-readonly.js (aggregate) referenced for wiring.
- Explicit statements that this packet is messaging/source-of-truth/readiness only and does not update website production copy, does not update backend-or-src, does not add routes, does not modify app behavior, does not add migration files, does not change schema, does not implement auth/RLS, does not read or modify .env files, does not create credentials, does not activate Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher/CRM/payment/production Supabase/external; requires PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes; includes full hierarchy (with hold for Closer phrase) + core positioning line + rules + library (new 10 without primary Closer badge + preserved) + clarification/hold rules + "Closer does not mean..." + four gaps + website examples (new without primary held Closer; no mod) + channel guidance + forbidden list absent from public sections + internal language confined.
- Public language uses only the 10 new approved phrases (core positioning line etc.) plus the 6 preserved lines; no forbidden phrases in customer-facing sections; held Closer not required/primary.
- Verifier, wrapper, and wiring will be asserted by the dedicated verifier.
- The packet requires a PASS/HOLD/BLOCKED Website Update Readiness Decision before future website copy changes.

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-brand-positioning-public-messaging-system-packet-readonly.js
node backend/scripts/verify-brand-positioning-public-messaging-system-packet-readonly.js
scripts/run-brand-positioning-public-messaging-system-packet-dry-run.sh
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
scripts/agent-diff-proof.sh
git diff --stat
git status --short
```

## No production activation / no live integration / no credential activation / no production implementation safety rules

Brand positioning and public messaging system packet only: yes
Website production copy changes: no (recommended examples only)
Backend/src changes: no
Routes / public endpoints: no
Schema / migration files: no
Auth / RLS / security implementation: no
Production writes: no
.env / credentials: no
Live SMS / Twilio / Vapi / Calendar / Resend / Lindy activation: no
Cron / scheduler / dispatcher activation: no
CRM / payment automation: no
External calls / live sends: no
Contractor portal / dashboard exposure: no
Asserts no forbidden implementation files were changed (no backend-or-src, no migration files, no schema, no auth/RLS/security implementation, no env/secrets, no production routes, no external call activation, no live send activation, no scheduler-or-cron-or-dispatcher activation)

This packet file: `docs/BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md`

This completes the RoofLeadHQ Brand Positioning and Public Messaging System Packet.
