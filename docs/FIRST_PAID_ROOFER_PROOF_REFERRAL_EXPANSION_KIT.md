# First Paid Roofer Proof / Referral / Expansion Kit

Date: 2026-06-16

## Purpose

This is the practical manual system Jason (founder/operator) can use after a first paid roofer has completed the first month and the monthly success review from the Monthly Success / Retention Kit, and has enough evidence to support retention, referral, testimonial, case-study, and safe expansion conversations. The kit guides manual success proof capture, referral request readiness (without pressure), testimonial/case-study readiness (customer-approved only), value narrative preparation (no guarantees), expansion/plan-fit review (only when appropriate and non-pushy), and clean handoff back to ongoing monthly operations.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal worksheets, decision logs, blocker registers, risk registers, proof capture notes, consent logs, testimonial/case-study drafts (pre-approval), referral follow-up trackers, expansion review notes, and evidence logs are internal-only / dry-run / founder-operator-only. This is manual success proof capture, referral request readiness, testimonial/case-study readiness, and safe expansion/plan-fit review only, not automation and not publication without explicit roofer approval/consent. No public founder-led/manual babysitting positioning is used for customers or prospects. No live systems or external calls of any kind are activated by this kit. Dry-run / internal-only / founder-operator-only.

This kit is product-moving and operationally usable: it contains the concrete proof evidence review, lead and booked homeowner appointment outcome summary, missed-lead recovery proof summary, value narrative preparation (sanitized, no guarantees), roofer approval and consent checklist, testimonial readiness checklist, case-study readiness checklist, referral request readiness checklist, referral ask script and follow-up tracker (non-pressured), expansion / plan-fit review (non-pushy boundary), cancellation-risk and trust-risk guardrails, proof asset handoff, ongoing monthly operations handoff, PASS/HOLD/BLOCKED proof/referral/expansion gate, 9 copy-paste-ready manual tracker tables, and exhaustive safety guardrails. It is designed so a founder or trained operator can execute manual proof capture, referral readiness, testimonial/case-study prep, and expansion review for the first paid roofer (and subsequent) using only this document + the referenced FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md (primary input) + FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md + FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md + FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + the aggregate verifier. All gates use explicit PASS / HOLD / BLOCKED language.

This kit is the post-monthly-success-review manual proof / referral / expansion layer for the first paid roofer (and pattern for ongoing). It receives the handoff from the Monthly Success / Retention Kit (monthly PASS + success review outcome + handoff artifact + trackers snapshot + retention status + value evidence), operates alongside the Launch System Packet ongoing customer sections, and produces proof assets (internal only until approved), customer-approved testimonial/case-study drafts, referral request readiness artifacts, expansion review notes (if appropriate), and handoff artifacts for continued steady-state monthly operations. It focuses on manual evidence capture, consent-gated readiness, non-pressured referral asks, non-pushy expansion boundaries, risk guardrails, and clean handoff only. Jason (founder/operator) uses this kit after the monthly success review to run the manual proof/referral/expansion readiness step, capture proof without guarantees, request referrals without pressure, prepare customer-approved drafts, review plan fit or expansion only when appropriate, and gate handoff back to ongoing monthly operations.

This kit file: `docs/FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md`
Wrapper: `scripts/run-first-paid-roofer-proof-referral-expansion-kit-dry-run.sh`
Verifier: `backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js`

## Scope

- First paid roofer (and subsequent paying customers) after the first month and after the Monthly Success / Retention Kit has completed its PASS + monthly success review + handoff (the first real contractor who has completed first month post-payment and at least one monthly success review).
- All manual operations during this proof/referral/expansion window: customer proof evidence review, lead and booked homeowner appointment outcome summary, missed-lead recovery proof summary, value narrative preparation (no guarantees), roofer approval and consent checklist, testimonial readiness checklist (with explicit roofer approval/consent before any draft use or publication), case-study readiness checklist (with explicit roofer approval/consent), referral request readiness checklist, referral ask script and follow-up tracker (non-pressured language only), expansion / plan-fit review (only when evidence supports and non-pushy boundary enforced), cancellation-risk and trust-risk guardrails, proof asset handoff (internal), ongoing monthly operations handoff, PASS/HOLD/BLOCKED proof/referral/expansion gate.
- Internal founder/operator worksheets, decision trees, logs, blocker/risk/trust-risk registers, proof capture notes, consent logs, draft testimonial/case-study (pre-approval), referral scripts/trackers, expansion review notes, and 9 copy-paste-ready tracker templates (copy-paste into local spreadsheet or notes only).
- Explicit, machine-enforceable safety guardrails (section 19) that must be re-confirmed before every proof review, consent ask, draft prep, referral ask, expansion review, gate, or handoff.
- Handoff artifacts that feed directly into `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` (ongoing customer success / monthly operations / retention / proof / referral / expansion sections) and prospect tracker / customer status. References upstream Monthly Success / Retention Kit (primary input source), First-Month Operating Kit, Trial Conversion / Payment Handoff, Trial Reporting + Success Review, Launch System, Website Trial Direction Regression, and Data Protection/Tenant Isolation packets for context, language enforcement, and checkpoint only.
- No customer proof publication, testimonial, or case-study goes live without explicit roofer approval/consent logged in Roofer Consent Approval Tracker + evidence.
- No referral asks use pressure, guarantees, or quota language.

## Non-Goals and Explicit Boundaries

- No public claims of legacy pilot or quota language (see Forbidden Public Phrases section below and in sections 19/20 for the exact list of banned phrases).
- No activation of live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, or external service calls.
- All work remains read-only verification, dry-run, internal founder/operator planning, note-taking, worksheet filling, decision logging, draft preparation (never sent without consent), proof capture (sanitized), consent logging, referral script rehearsal (not executed from kit), expansion review notes (internal), and handoff documentation only. No live sends, no automation activated in this kit.
- This kit does not implement or activate any part of live ongoing automation, ongoing billing, or production behavior. Those remain covered in the Launch System Packet. This is manual success proof capture, referral request readiness, testimonial/case-study readiness (approval-gated), safe expansion/plan-fit review, and handoff only.
- No customer-facing or public copy may use internal-only language (see section 20). Internal founder/operator/manual/dry-run language is allowed only inside explicitly labeled internal-only dry-run execution instructions.
- This kit does not duplicate Monthly Success / Retention Kit content (it receives the post-success-review handoff from it), full first-month operating, full trial reporting (prior kits), or full launch/setup content. It is the focused manual proof/referral/expansion readiness overlay after monthly success review.
- No changes to backend or src directories, Migration files, schema, auth/RLS/security, env, secrets, production routes, or any activation of live systems.
- No testimonial, case-study, or proof asset is published or shared externally without logged roofer consent/approval.
- No referral requests use pressure, quota, "guaranteed", book-jobs phrasing, or urgency language.

### Forbidden Public Phrases (Reference — Full List Enforced by Verifier)
The following phrases must remain absent from all public-facing, customer-facing, handoff artifacts shared with the roofer, value narrative excerpts, testimonial/case-study drafts (pre-approval), referral scripts spoken/written to roofer, consent notes shared externally, expansion review notes shared externally, and any customer communication sections of this kit (and all related artifacts). They are listed here for documentation and verifier enforcement only. The full re-statement and internal-only allowance rules appear in sections 19 and 20.

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
- seven-day pilot (or any 7-day pilot variant)
- five-qualified-appointment short-window claim (or 5 qualified appointments)
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

Reference: See AGENT_PRODUCT_QUALITY_GATE.md for the product-depth rule this kit satisfies (operational usefulness, concrete fields, decision logs, templates, wiring, safety). References FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md (primary input: monthly PASS + success review outcome + handoff artifact + trackers snapshot + retention status + value evidence + safety), FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md, FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md, FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (primary container and handoff target), WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md for trial direction language enforcement, and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md for the tenant isolation checkpoint. Cross-references Monthly Success / Retention Kit (primary), First-Month Operating Kit, Trial Conversion, Trial Reporting + Success Review, Launch System, Trial Direction Regression, and Data Protection/Tenant Isolation packets.

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js
node backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js
scripts/run-first-paid-roofer-proof-referral-expansion-kit-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Monthly Success / Retention Kit (primary input source / handoff): `docs/FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md` + its wrapper and verifier (provides monthly PASS decision + success review outcome + handoff artifact + 9 monthly trackers snapshot + retention status + value evidence + open items + cancellation-risk status + ongoing expectations + safety + verifier evidence at gate)
- First-Month Operating Kit: `docs/FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md` + its wrapper and verifier (provides first-month patterns, handoff baseline)
- Trial Conversion / Payment Handoff Kit (prior conversion patterns): `docs/FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md` + its wrapper and verifier
- Trial Reporting + Success Review Kit (prior reporting patterns / baseline): `docs/FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md` + its wrapper and verifier (provides reporting rhythm, trackers, success review patterns)
- Launch system (primary container + handoff target for proof/referral/expansion outcomes, assets, consent logs, referral status, expansion notes, ongoing monthly): `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier (receives proof/referral/expansion gate outcome + handoff artifact + updated customer status + proof summaries + consent evidence + referral tracker snapshot; contains the ongoing customer success / monthly operations / retention / proof / referral / expansion sections that this kit feeds)
- Website trial direction regression (language enforcement): `docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md` + its wrapper and verifier
- Data protection / tenant isolation (checkpoint reference): `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md` + its wrapper and verifier
- Aggregate readiness: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Verifier index: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Next-chat contexts and daily guide (updated by this kit)
- Related: FIRST_PAID_LAUNCH_CONTROL_CENTER.md, FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md, FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md, and the full suite of first-roofer manual command packets for any execution detail during proof/referral/expansion reviews.
- This kit's wrapper: `scripts/run-first-paid-roofer-proof-referral-expansion-kit-dry-run.sh`
- This kit's verifier: `backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js`

---

## 1. Internal-only dry-run scope

**Internal-only / founder-operator-only. This entire kit is manual success proof capture, referral request readiness, testimonial/case-study readiness, and safe expansion/plan-fit review only.** Internal only: founder-operator manual steps only.

- All steps are founder/operator manual post-monthly-success-review readiness: customer proof evidence review, lead and booked homeowner appointment outcome summary, missed-lead recovery proof summary, value narrative preparation (sanitized, approved language, no guarantees), roofer approval and consent checklist, testimonial readiness checklist (explicit approval required before draft publication or external use), case-study readiness checklist (explicit approval required), referral request readiness checklist, referral ask script and follow-up tracker (non-pressured), expansion / plan-fit review (only when evidence supports, non-pushy boundary), cancellation-risk and trust-risk guardrails, proof asset handoff (internal), ongoing monthly operations handoff, PASS/HOLD/BLOCKED proof/referral/expansion gate.
- No live systems, no external calls, no production data access, no automation activation of any kind. All evidence, trackers, drafts, consent logs, referral notes, expansion notes, proof summaries remain local/internal; nothing is sent or published from this kit without explicit logged consent.
- Use only after Monthly Success / Retention Kit has produced a monthly PASS + handoff artifact + success review outcome and all prior gates (Day One + Go-Live + Reporting + Conversion + First-Month + Monthly Retention) are green.
- Copy-paste trackers locally; do not store in production systems. All proof/referral/expansion data handled as sanitized notes or local copies only.
- Re-confirm every safety item in section 19 before starting proof review, before consent ask, before draft prep, before referral script use, before expansion review, before handoff, and before decision gate.
- This kit receives handoff from Monthly Success / Retention Kit and feeds the Launch System Packet ongoing monthly / customer success / retention / proof / referral / expansion sections. It does not duplicate full Launch System operating content.
- Data protection / tenant isolation checkpoint re-confirmed at every gate (single-tenant manual controls only; refs logged).
- No customer proof, testimonial, or case-study is published or shared without explicit roofer consent logged in Roofer Consent Approval Tracker + Evidence.

## 2. Proof / referral / expansion purpose

**Internal-only / founder-operator-only.**

After the first paid roofer completes the first month and the Monthly Success / Retention Kit has produced its PASS + handoff + success review outcome (post first monthly payment and ongoing monthly health confirmation), execute the manual proof / referral / expansion readiness system that captures success evidence for retention support, prepares non-pressured referral requests, readies customer-approved testimonial and case-study drafts only with explicit consent, reviews plan fit or expansion only when appropriate with non-pushy boundaries, maintains cancellation-risk and trust-risk guardrails, and produces clean handoff artifacts for continued steady-state operations. This step activates only on post-monthly-success-review PASS path from the Monthly Success / Retention Kit.

- Review customer proof evidence (section 4): leads, booked homeowner appointments via the flow, missed-lead recovery outcomes, value trends from monthly success review (sanitized).
- Summarize lead and booked homeowner appointment outcomes (section 5): concrete but no-guarantee narrative using only approved public language.
- Summarize missed-lead recovery proof (section 6): evidence of recovery impact (sanitized).
- Prepare value narrative (section 7): sanitized highlights using approved language only; no guarantees, no revenue promises, no "book jobs".
- Execute roofer approval and consent checklist (section 8): explicit consent before any testimonial/case-study draft external use or publication.
- Run testimonial readiness checklist (section 9): prepare draft only after consent; customer-approved only.
- Run case-study readiness checklist (section 10): prepare draft only after consent; customer-approved only.
- Run referral request readiness checklist (section 11): confirm evidence supports a low-pressure ask; no pressure tactics.
- Use referral ask script and follow-up tracker (section 12): non-pressured language only; track asks without quota or guarantee framing.
- Execute expansion / plan-fit review (section 13): only when evidence supports and roofer signals interest; enforce non-pushy upgrade boundary (section 14).
- Maintain cancellation-risk and trust-risk guardrails (section 15): any risk pauses proof/referral/expansion and routes to retention path.
- Produce proof asset handoff (section 16): internal assets, consent logs, draft status (pre-publication).
- Produce ongoing monthly operations handoff (section 17): artifact with trackers snapshot, proof summary, consent status, referral status, expansion notes (if any), risk status for steady-state continuation in Launch System.
- Execute PASS/HOLD/BLOCKED proof/referral/expansion gate (section 18) with full evidence and handoff to Launch System (or hold for more evidence / risk / cancel path).
- All steps are manual compilation, logging, review, rehearsal, and draft prep only. No live automation, no production writes, no publication without consent. Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract.

The proof/referral/expansion window begins after the monthly success review handoff (or agreed timing from monthly handoff). This kit activates only on post-monthly-success-review PASS path. It produces the proof/referral/expansion readiness record, consent snapshot, referral status, (optional) expansion notes, and handoff so steady-state support continues inside the Launch System Packet with clean monthly rhythm.

## 3. Inputs from Monthly Success / Retention Kit

**Internal-only / founder-operator-only. Required before this kit can be used for proof / referral / expansion readiness.**

From `docs/FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md` outputs (plus Launch System Packet):

- Monthly PASS decision from Monthly Success / Retention Kit section 16 (or explicit monthly success review + handoff logged).
- Monthly success review outcome + roofer decision quote (sanitized).
- ongoing monthly operations handoff artifact from monthly kit (section 15/17) + snapshot of all 9 monthly trackers + monthly value report summaries + open items / blockers / retention-risk / cancellation-risk status.
- Monthly metrics summary (leads, booked homeowner appointments via flow, recovery rate, feedback themes, trends) from the just-completed month.
- Ongoing cadence expectations from monthly handoff: weekly value report rhythm (manual), monthly health check, escalation path, support boundaries.
- Payment / billing status note (manual; next automated email reminder timing noted; "An automated email is sent 2 days before the first monthly payment").
- "Cancel anytime. No long-term contract." re-stated and logged.
- Roofer contact prefs, reporting expectations carried forward from Guided Setup + first-month + monthly.
- Launch System Packet ongoing customer status + prospect tracker entry currently at "Paying — Ongoing Monthly" or equivalent post-monthly-success-review.
- Data protection / tenant isolation checkpoint confirmation from monthly gate.
- Verifier run outputs (monthly kit + first-month + conversion + reporting + day-one + go-live + launch + pilot + quality gate) at monthly gate.
- Safety guardrails re-confirmation logged at monthly gate.
- Explicit confirmation: manual proof/referral/expansion window secured; decision maker available; no live automation.
- Value evidence snapshot (sanitized leads, appointments, recovery, trends) that can support proof capture without guarantees.

If any critical input is missing or monthly gate was not PASS (or handoff artifact incomplete), mark this kit HOLD immediately and route back to Monthly Success / Retention Kit owner + Launch System Packet owner with owner/date.

Cross-reference: Monthly Success / Retention Kit section 15/16/17, Launch System Packet sections 8/9/ongoing, First-Month Operating Kit for baseline patterns, Trial Conversion / Payment Handoff for payment baseline, Trial Reporting + Success Review for reporting patterns.

## 4. Customer proof evidence review

**Internal-only / founder-operator-only. Manual review of sanitized evidence from the completed month(s) to support retention, referral readiness, and (with consent) testimonial/case-study drafts. No guarantees; evidence only.**

Rhythm (start after monthly handoff inputs confirmed):

- Pull sanitized lead, appointment, and recovery summary for the review window (local notes only; no prod access).
- Confirm: leads captured via the flow, booked homeowner appointments (proposed/confirmed/completed via fast response + automated follow-up + missed-lead recovery), source signals, completeness.
- Review trends vs. first-month and prior monthly baseline (up/flat/down; qualitative signals only).
- Note concrete but non-guarantee examples: "X leads led to Y booked homeowner appointments via the flow in the period; missed-lead recovery contributed Z recovered opportunities."
- Flag any data gaps or quality issues (do not publish gaps as proof).
- Log outcomes in Proof Evidence Tracker.
- Prepare sanitized summary for value narrative (section 7) and handoff.
- Re-confirm no live intake automation or external calls; all evidence is historical manual summary only.
- Re-confirm data protection / tenant isolation boundary (no PII in shared artifacts).

Update Proof Evidence Tracker with owner/status/evidence/next-action.

HOLD if evidence volume is insufficient for meaningful retention support or referral ask. BLOCKED if data protection boundary crossed or forbidden language appears in any notes.

## 5. Lead and booked homeowner appointment outcome summary

**Internal-only / founder-operator-only. Concrete but guarantee-free summary of lead-to-booked-homeowner-appointment outcomes for the review window. Uses only approved public language.**

Rhythm:

- Compile: total leads (sanitized), booked homeowner appointments proposed/confirmed/completed via the defined flow (fast response, automated follow-up, missed-lead recovery).
- Trend vs. prior period (first-month + last monthly).
- Qualitative notes only (e.g., high-intent leads converting after recovery step).
- Prepare outcome summary using exactly: "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery."
- No "book jobs", no "guaranteed appointments", no revenue claims.
- Log in Lead Appointment Outcome Summary Tracker.
- Use summary in value narrative (section 7) and (with consent) testimonial/case-study drafts.

Update Lead Appointment Outcome Summary Tracker. Only summaries using approved language advance.

## 6. Missed-lead recovery proof summary

**Internal-only / founder-operator-only. Sanitized summary of missed-lead recovery evidence and impact for the review window. Supports value narrative and (with consent) drafts.**

Rhythm:

- Identify missed-lead candidates from the period (sanitized counts).
- manual recovery actions taken (internal notes).
- Outcomes: recovered / open / lost (sanitized).
- Recovery rate and trend vs. prior.
- Concrete example language (no guarantees): "Missed-lead recovery identified X opportunities; Y were recovered into booked homeowner appointments via follow-up."
- Log in Missed-Lead Recovery Proof Tracker.
- Prepare for value narrative and consent-gated drafts.
- Re-confirm: recovery is via the defined automated follow-up flow + manual support in this dry-run; no live promise language.

Update Missed-Lead Recovery Proof Tracker. Evidence must be concrete and non-guarantee.

## 7. Value narrative preparation

**Internal-only / founder-operator-only. Prepare a sanitized, approved-language-only value narrative for use in retention conversations, referral asks (non-pressured), and (after consent) testimonial/case-study drafts. No guarantees, no pressure, no revenue claims.**

Rhythm:

- Start from Proof Evidence Tracker + Lead Appointment Outcome Summary Tracker + Missed-Lead Recovery Proof Tracker + monthly value report snapshot.
- Draft narrative using only allowed strings:
  - "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery."
  - "Guided Setup happens first."
  - "The 14-day trial begins after RoofLeadHQ AI setup goes live."
  - "An automated email is sent 2 days before the first monthly payment."
  - "Cancel anytime. No long-term contract."
- Include: leads summary, booked homeowner appointments via the flow, missed-lead recovery contribution, trend notes, qualitative signals.
- Explicitly avoid: guarantees, "book jobs", "guaranteed revenue", "automatic estimate/quote/invoice", "you book the inspection", day-15 language, founder-led framing.
- Prepare two versions if needed: internal full (with numbers for operator), customer-facing excerpt (sanitized, approved language only).
- Log draft location/version in Value Narrative Tracker.
- Re-confirm customer-facing excerpts pass forbidden-phrase scan before any roofer sharing.
- Value narrative feeds referral readiness, testimonial/case-study drafts (post-consent), and handoff.

Update Value Narrative Tracker. Narrative must be approved-language clean before any external use.

## 8. Roofer approval and consent checklist

**Internal-only / founder-operator-only. Explicit, logged roofer approval and consent is required before any testimonial draft, case-study draft, or proof asset is used externally or published. Consent is per-use / per-asset; blanket consent not assumed.**

Checklist (complete and log before any draft sharing or publication):

- Review window evidence confirmed and sanitized.
- Value narrative (customer-facing excerpt) reviewed with roofer or prepared for review.
- Roofer understands: drafts are for their review/approval only; nothing published without their explicit sign-off.
- Roofer consent captured for: [ ] testimonial draft preparation [ ] case-study draft preparation [ ] proof summary use in retention materials (internal) [ ] referral context use of high-level outcomes (non-identifying).
- Consent method/date/quote logged (email, call note, signed note — sanitized).
- Explicit "I approve use of the following draft for [purpose] after my review" or equivalent recorded.
- Any conditions or restrictions from roofer noted (e.g., "use only anonymized numbers", "no competitor names").
- Data protection / tenant isolation boundary re-confirmed for any shared draft.
- Consent logged in Roofer Consent Approval Tracker + Evidence Log.
- No draft moves to testimonial/case-study readiness (sections 9/10) or external without this gate PASS.

Update Roofer Consent Approval Tracker. Missing or incomplete consent = HOLD for any draft-related items. Any consent revocation = immediate BLOCKED for publication paths.

## 9. Testimonial readiness checklist

**Internal-only / founder-operator-only. Prepare a customer-approved testimonial draft only after explicit consent (section 8). Draft is internal until roofer final approval and any required edits. No publication without consent.**

Rhythm (only after consent logged):

- Draft testimonial using value narrative (approved language only) + concrete sanitized outcomes from trackers.
- Structure example (customer-facing only approved language):
  - "[Roofer name / company] has used RoofLeadHQ AI. RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract."
  - Specific (sanitized, consented): "In our first month after setup, we saw [X leads leading to Y booked homeowner appointments via the flow]. Missed-lead recovery helped surface [Z] additional opportunities."
  - Attribution: roofer-approved quote + name/company (or anonymized per consent).
- Review draft internally for forbidden phrases.
- Share draft with roofer for approval/edits (manual only).
- Capture roofer final approval quote/date/evidence in Roofer Consent Approval Tracker + Testimonial Readiness Tracker.
- Only after final roofer sign-off does the testimonial move to "READY FOR PUBLICATION" status (still not published from this kit; handoff to Launch System / marketing only on explicit release).
- Log all versions, approvals, restrictions.

Update Testimonial Readiness Tracker with owner/status/evidence/next-action.

HOLD until roofer final approval. BLOCKED if consent withdrawn or forbidden language appears.

## 10. Case-study readiness checklist

**Internal-only / founder-operator-only. Prepare a customer-approved case-study draft only after explicit consent (section 8). Draft is internal until roofer final approval and any required edits. No publication without consent.**

Rhythm (only after consent logged):

- Draft case-study using value narrative + lead/appointment/recovery summaries + (if consented) before/after or trend notes.
- Structure example (customer-facing only approved language):
  - Header + context (Guided Setup first, 14-day trial after live setup, automated email 2 days before first monthly payment, cancel anytime, no long-term contract).
  - Challenge: (sanitized, from roofer input).
  - Approach: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
  - Results (sanitized, consented, no guarantees): "During the review period, [X leads] produced [Y booked homeowner appointments via the flow]. Missed-lead recovery contributed [Z recovered opportunities]."
  - Roofer quote (approved).
  - Next steps / ongoing (if continuing).
- Internal forbidden-phrase scan.
- Share draft with roofer for approval/edits (manual only).
- Capture final roofer approval in Roofer Consent Approval Tracker + Case Study Readiness Tracker.
- Only after final sign-off does case-study move to "READY FOR PUBLICATION" (handoff only; not published from this kit).
- Log versions, approvals, restrictions.

Update Case Study Readiness Tracker.

HOLD until roofer final approval. BLOCKED on consent issues or unsafe language.

## 11. Referral request readiness checklist

**Internal-only / founder-operator-only. Confirm the roofer and evidence support a low-pressure referral request. No pressure, no quotas, no guarantees, no "book jobs". Ask only when relationship and evidence are healthy.**

Checklist (complete before any referral ask script is used):

- Monthly success review + current retention status is healthy (no active HIGH cancellation-risk).
- Proof evidence (section 4) and value narrative (section 7) are concrete and non-guarantee.
- Roofer has expressed positive signals (from feedback/satisfaction trackers or direct).
- Roofer has capacity and willingness indicators (not in heavy workload complaint period).
- No trust-risk signals (section 15).
- Referral context is retention-supportive, not "we need more customers" framing.
- High-level outcome summary (not detailed lead lists) is ready and language-approved.
- Roofer consent for using high-level outcomes in referral conversation logged (section 8).
- Internal rehearsal of non-pressured script complete.
- Follow-up tracker prepared (section 12).
- Any prior referral asks noted; avoid repeated asks without new evidence.
- Re-confirm: ask is optional for roofer; "no" or "not now" is fully acceptable with no consequence to support.

Update Referral Request Tracker (readiness row). If any item fails, HOLD referral ask path.

## 12. Referral ask script and follow-up tracker

**Internal-only / founder-operator-only. Non-pressured referral ask script and tracker. Use only after readiness checklist PASS. Follow-up is light-touch and respectful; no urgency or quota language.**

### Non-Pressured Referral Ask Script (use verbatim where customer-facing; approved language only)

- "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract."
- "If you know another roofer who might benefit from the same lead-to-booked-homeowner-appointment flow, we'd appreciate an introduction — only if it feels right for them and for you. No pressure at all."
- "We track high-level outcomes like leads and booked homeowner appointments via the flow; if you'd like to share a brief note or intro, happy to follow up lightly. If now isn't a good time, that's completely fine — our focus stays on your results and support."
- "Cancel anytime, no long-term contract. Your ongoing monthly operations and support continue regardless."

### Follow-up Principles (internal)

- Light: one follow-up note after 7-10 days if no response, then stop unless roofer re-opens.
- No quota, no "we need X referrals", no "help us grow".
- Record every ask and outcome (introduced / considering / declined / no response) without judgment.
- If roofer says no or not now: thank them, close the topic for this window, log in tracker, continue support unchanged.
- Any pressure signal from operator side = immediate self-HOLD and safety re-confirm.

Update Referral Request Tracker after each ask or status change. Multiple rows per roofer as needed.

## 13. Expansion / plan-fit review

**Internal-only / founder-operator-only. Review current plan fit and (only when evidence + roofer signals support it) discuss non-pushy expansion options. Never push upgrades. Expansion discussion happens only after proof evidence is strong, consent is clear, and retention is stable.**

Rhythm (only after sections 4-8 are green and no active risks):

- Re-confirm current plan/tier from monthly status + Launch System.
- Review usage signals from trackers: lead volume, appointment conversion, recovery value, roofer feedback/satisfaction.
- Assess plan fit: is current tier matching volume and results? Any under/over utilization notes (sanitized).
- If roofer has expressed interest in more capacity or features (from feedback or direct), and evidence supports, prepare neutral plan-fit notes:
  - "Current results: [sanitized from trackers]."
  - "If volume grows, Growth Tier provides [high-level, no guarantee]."
  - "No pressure — we can discuss timing that works for your business."
- Use only approved language; no "you should upgrade", no revenue math, no "guaranteed more".
- Log discussion notes, roofer signals, and any expressed interest in Expansion Plan-Fit Review Tracker.
- If no roofer interest or evidence is thin: skip or note "not appropriate this cycle"; do not initiate.
- Any expansion note is internal planning only until roofer explicitly asks for options.

Update Expansion Plan-Fit Review Tracker. Expansion path advances only on roofer-initiated interest + evidence + non-pushy execution.

## 14. Non-pushy upgrade boundary

**Internal-only / founder-operator-only. Hard boundary: no pressure, no sales framing, no "now is the time", no quota-based or results-based upgrade pitches. Expansion/upgrade conversations are roofer-led or evidence-triggered neutral information only.**

Rules (re-confirm before any expansion discussion):

- Never initiate upgrade talk during a retention-risk or cancellation-risk period.
- Never frame as "you are leaving money on the table" or "more leads = more jobs booked".
- Never use "guaranteed", "automatic", or day-15 language.
- Present high-level tier differences only if roofer asks or clear signals exist (e.g., "volume is X and you mentioned wanting more").
- Always include: "Cancel anytime. No long-term contract." and current satisfaction check.
- If roofer declines or shows hesitation: drop topic immediately, log neutrally, continue support.
- Operator language in notes: "roofer-initiated interest only", "evidence-supported neutral info", "no pressure applied".
- If boundary feels at risk: HOLD expansion path and escalate to monthly retention owner.

Any violation of non-pushy boundary = BLOCKED for expansion items + safety incident log.

## 15. Cancellation-risk and trust-risk guardrails

**Internal-only / founder-operator-only. Any active cancellation-risk or trust-risk pauses or blocks proof capture, referral asks, testimonial/case-study prep, and expansion review. Route back to retention support first.**

Guardrails:

- Before starting any proof review, consent ask, draft, referral, or expansion: re-scan Retention Risk Review Tracker + Monthly Issue Escalation Tracker from monthly handoff + any new signals.
- HIGH cancellation-risk or explicit complaint = immediate HOLD for this kit; focus on retention support per Monthly Success / Retention Kit.
- Trust-risk signals (e.g., roofer questions data accuracy, feels over-promised, billing confusion, support expectation mismatch) = HOLD + escalate; do not ask for referrals or testimonials while trust is repairing.
- Payment issues (past-due, dispute) = HOLD all proof/referral/expansion; route to manual billing status notes only.
- If roofer expresses "this isn't working for us" or similar: stop, log, route to cancellation path support; do not push proof or referrals.
- Any sign that roofer feels "manual founder review" or "babysitting" is the value prop (leaked internal language) = HOLD + correct language boundary + re-train.
- Re-confirm at every gate: support is ongoing monthly operations per Launch System; this kit is optional readiness overlay only.

Log any risk scan in relevant trackers. Risk present = no advancement of referral/testimonial/expansion paths.

## 16. Proof asset handoff

**Internal-only / founder-operator-only. Produce internal proof assets, consent logs, draft status, and referral/expansion notes for handoff to Launch System Packet and ongoing monthly operations. Nothing published externally from this kit.**

Handoff contents (after gate or on HOLD/BLOCKED close):

- Proof Evidence Tracker snapshot + sanitized summaries.
- Lead Appointment Outcome Summary Tracker + Missed-Lead Recovery Proof Tracker snapshots.
- Value Narrative Tracker + final customer-facing excerpt version (language clean).
- Roofer Consent Approval Tracker (full log of what was consented, what is pending, restrictions).
- Testimonial Readiness Tracker + Case Study Readiness Tracker (status: DRAFT / IN REVIEW / ROOFER APPROVED / READY FOR PUBLICATION / NOT CONSENTED).
- Referral Request Tracker (asks made, outcomes, follow-up status; no pressure notes).
- Expansion Plan-Fit Review Tracker (plan fit notes, roofer signals, any neutral info shared).
- Risk guardrail scan results (current cancellation/trust status).
- Verifier run outputs + safety re-confirmation at this gate.
- Next manual action: (continue steady-state monthly / re-run proof window after more evidence / pause for retention support / cancel path).

Insert summary into Launch System Packet ongoing sections + prospect tracker + retention log. All assets remain internal until separate marketing release process (outside this kit) with fresh consent confirmation.

## 17. Ongoing monthly operations handoff

**Internal-only / founder-operator-only. Produce clean handoff artifact after proof/referral/expansion gate (PASS or HOLD/BLOCKED close) so steady-state monthly operations continue in Launch System Packet with updated proof/referral/expansion context.**

Handoff artifact includes:

- Link to Monthly Success / Retention Kit handoff + this kit's gate outcome.
- Updated customer status (Paying — Ongoing Monthly + proof/referral status note).
- 9 trackers snapshot (this kit's + prior monthly).
- Proof evidence summary (sanitized).
- Consent status (what approved, what pending, restrictions).
- Referral status (readiness, asks/outcomes, follow-up).
- Expansion notes (if any; non-pushy).
- Open items / blockers carried forward.
- Risk status (cancellation/trust).
- Next-month (or next-cycle) operating expectations (from monthly + any adjustments).
- Data protection checkpoint.
- Verifier evidence at gate.
- Explicit owner + due for next monthly cycle or proof window re-run.

Handoff feeds Launch System Packet ongoing customer success / monthly operations / retention / proof / referral / expansion sections. Only after handoff does the cycle close for this window.

## 18. PASS/HOLD/BLOCKED proof/referral/expansion gate

**Internal-only / founder-operator-only. Final gate after all checklists, trackers, and risk scans. Evidence log required. Only clean evidence + consent + no-risk + approved language advances proof/referral/expansion items. final gate**

### Decision

Status: [ ] PASS (evidence concrete and non-guarantee; consent logged where needed; referral readiness confirmed with no pressure; testimonial/case-study drafts roofer-approved or clearly not consented; expansion review appropriate and non-pushy; no active HIGH cancellation/trust risk; handoff artifact ready; proceed to ongoing monthly in Launch System Packet) [ ] HOLD (gaps in evidence/consent/readiness with owners/dates; moderate risk signals; more data or roofer signals needed; re-review after clear) [ ] BLOCKED (insufficient evidence, consent refused/revoked, HIGH cancellation/trust risk, pressure language or boundary violation, forbidden phrases in customer sections, data protection issue, or roofer elects to stop; escalate per retention/cancellation path immediately)

Evidence Log entry required (paste into Proof Evidence Tracker + Roofer Consent Approval Tracker + Referral Request Tracker + Ongoing Monthly Operations Handoff + Launch System Packet + prospect tracker + retention/proof log):

- Timestamp + context (post monthly success review / proof/referral/expansion window)
- Operator/founder
- Verifier run outputs (this kit + monthly success retention + first-month + conversion + reporting + day-one + go-live + launch + pilot + quality gate)
- Safety guardrails re-confirmation quote
- Full risk scan snapshot (cancellation/trust)
- Roofer consent quotes/evidence (sanitized) for each consented item
- 9 trackers + value narrative + proof summaries + referral status
- Handoff artifact version + location
- Next manual action: (steady-state monthly continuation / schedule next proof window / retention support escalation / cancel archive) + owner + due

Only PASS advances proof/referral/expansion artifacts and status into the Launch System Packet. HOLD requires documented re-review plan + roofer communication within 48h. BLOCKED routes to retention/cancellation handling (adapt from Monthly Success / Retention Kit + Launch System cancellation section) + archive.

Update paid customer status / proof/referral/expansion log and insert summary into Launch System Packet ongoing sections + prospect tracker.

## 19. Safety guardrails

**This section must be reviewed and re-initialed (in Evidence Log) at every major gate: before proof evidence review, before consent checklist, before draft preparation, before referral readiness, before referral ask, before expansion review, before proof asset handoff, before ongoing handoff, before proof/referral/expansion gate, and before any handoff to Launch System. All items below are confirmed OFF / NOT ACTIVATED for this proof/referral/expansion window unless a separate, explicit, written founder approval is captured in the Evidence Log of the relevant gate.**

### Confirmed Disabled (No Activation in Any Form)

- Manual-only success proof capture, referral request readiness, testimonial/case-study readiness (consent-gated), and safe expansion/plan-fit review: YES (this kit produces checklists, trackers, evidence logs, decision logs, value narrative drafts, consent logs, referral scripts/trackers, expansion notes, proof summaries, handoff artifacts, and status updates only)
- Draft-only readiness notes, value narratives, testimonial/case-study drafts, and artifact prep: YES (all reviews captured as internal drafts for manual coordination planning; publication only after roofer consent and separate release process)
- No live send: YES (no Twilio, Resend, or any production message dispatch)
- No automated follow-up: YES
- No CRM automation: YES
- No calendar booking automation: YES (explicit manual handling only)
- No payment automation: YES (manual status tracking and reminder notes only; no billing engine)
- No external service calls: YES (no Twilio, Vapi, Resend, Lindy, Stripe, Google Calendar API writes, or any live integrations)
- No production Supabase writes: YES
- No public route activation: YES
- No contractor portal exposure: YES
- No auth/RLS/security implementation: YES (zero schema, zero policies, zero secrets, zero auth code)
- No estimates, quotes, invoices, or payment workflows: YES (this kit never touches or claims any of these; manual status notes only)
- No guarantee language: YES (all customer-facing text and internal decisions enforce this; no revenue, no job, no appointment guarantees)
- No booked-jobs language: YES (customer-facing uses only "booked homeowner appointments" via the defined flow; never "book jobs" or "you book the inspection")
- No pressure-based referral language: YES (scripts and trackers use non-pressured, optional, "only if it feels right" framing; no quotas, no urgency, no "we need")
- No customer proof publication without roofer approval/consent: YES (Roofer Consent Approval Tracker + explicit logged approval required before any draft moves to READY or external)
- no customer proof publication without roofer approval/consent (explicit logged consent required)
- Live homeowner SMS / Twilio sending: DISABLED
- Live roofer reply SMS: DISABLED
- Live Vapi outbound or inbound voice automation: DISABLED (test-only dry-run payloads and ingestion scripts only)
- Live Calendar booking / event creation for homeowners or contractors: DISABLED
- Live Resend production email sends (beyond any pre-approved internal test templates): DISABLED
- Live Lindy or external agent triggers: DISABLED
- Cron / scheduler / dispatcher production runs: DISABLED
- Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED
- Production data mutation of any roofer, lead, or customer records: DISABLED
- Public route activation (webhooks, APIs, status pages exposed beyond internal dashboard): DISABLED
- Contractor portal or dashboard exposure to real paying customers (read-only internal demo dashboards only): DISABLED
- Auth / RLS / security policy implementation or changes: NONE (this kit contains zero schema, zero policies, zero secrets handling code)
- Payment automation (billing engine, invoice generation, or ongoing payment collection automation): NONE (manual status tracking only)
- Any public marketing or customer contract language claiming automatic booking, guaranteed results, or "monthly billing day-15 phrasing" without the required 14-day trial + automated pre-billing email framing: FORBIDDEN (enforced by verifiers on all public assets and this kit's customer-facing sections)
- Estimate/quote/invoice automation: NONE (this kit never claims or touches these)
- No estimates, quotes, invoices, or payment workflows
- No guarantee language
- No booked-jobs language
- No pressure referral or quota language in customer sections

### Required Safety Markers (Must Appear in This Kit and All Related Artifacts)

- Planning-only / dry-run / internal-only / founder-operator-only: yes
- Auth changed: no
- Database schema changed: no
- Migration added: no
- RLS policy changed: no
- Production access logic changed: no
- Contractor portal permission changed: no
- Secrets changed: no
- Production data touched: no
- External service called (live): no
- Live workflow activation activated: no
- Contractor notification sent (production): no
- Live SMS / Twilio / Vapi / Calendar / Resend / Lindy / cron / scheduler / dispatcher: no
- References WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md at every gate
- References FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md at every gate (primary input)
- Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none.

Re-initial safety markers in Evidence Log before each proof/referral/expansion gate.

## 20. Public-vs-internal language boundary

**Customer-facing communications during proof/referral/expansion window (value narrative excerpts shared with the roofer, referral ask script portions spoken/written to the roofer, testimonial/case-study drafts shared for approval, consent discussions, expansion discussion notes shared with roofer, handoff notes shared with roofer, and any status updates shared externally) must use ONLY the approved public/business language. Internal founder/operator/manual/dry-run language is confined to explicitly labeled sections and never appears in customer-facing content.** Customer-facing language must not use founder-led/manual babysitting/public founder-review framing, pressure, guarantees, or day-15 language.

### Allowed customer-facing / public strings (exact match required in all customer-facing sections, scripts, drafts, and handoff excerpts)

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All value narratives, referral scripts, testimonial/case-study drafts (pre-approval), and roofer-shared notes must restate the core framing above and avoid any implication of founder babysitting, manual review as a selling point, guarantees, auto-booking, day-15 billing, pressure, or quota.

### Internal founder/operator/manual review language (allowed ONLY inside explicitly labeled internal-only sections)

Examples of permitted internal-only phrasing (confined to sections 1-19, trackers internal notes, evidence logs, consent logs, risk registers, referral trackers, expansion notes): "founder/operator manual review", "dry-run internal planning", "manual coordination for this proof/referral/expansion window", "Live Automation Disabled (internal posture only)", "internal founder review queue notes", "manual success proof capture and referral request readiness", "non-pushy expansion boundary". These must never be copied into customer communications, value narratives delivered to roofer, referral scripts, testimonial/case-study drafts, Launch System customer-facing sections, website, or any public/prospect material.

### Explicitly Labeled Internal-Only Sections in This Kit

- All sections 1-19 (except approved strings embedded in customer-facing examples)
- All 9 tracker tables (owner/status/evidence/next-action fields are internal execution tools)
- Evidence Log entries, blocker/risk/trust-risk registers, consent logs, referral follow-up notes, expansion review notes
- Safety guardrails (section 19)
- Any "Internal-only / founder-operator-only" callouts
- Cross-reference notes to other internal packets

Customer-facing value narratives, referral scripts, testimonial/case-study drafts shared for approval, consent discussions, expansion notes shared with roofer, and ongoing handoff notes shared with the roofer must be scanned for forbidden phrases before use. The verifier enforces the boundary on this kit's customer-facing content. Internal language stays in dry-run safety artifacts only.

If any customer-facing excerpt accidentally includes forbidden phrasing, mark BLOCKED, correct using only the approved list above, re-log, and re-run verifiers before any manual delivery or draft share.

---

## 9 Copy-Paste-Ready Manual Tracker Tables

Copy the tables below into a local spreadsheet, notes doc, or whiteboard. Do not store production data. All fields: Owner (founder/Jason or specific operator), Status (PASS/HOLD/BLOCKED/OPEN/IN PROGRESS/RESOLVED/CONFIRMED/READY/ROOFER-APPROVED/NOT-CONSENTED/etc.), Evidence (local ref, quote, date, link to screenshot/note), Next Action (concrete step + due date).

### Proof Evidence Tracker

| Review Window | Leads (sanitized) | Booked Homeowner Appointments (Proposed / Confirmed / Completed via Flow) | Missed-Lead Recovery Impact (sanitized) | Trend vs Prior | Owner | Status | Evidence | Next Action |
|---------------|-------------------|---------------------------------------------------------------------------|-----------------------------------------|----------------|-------|--------|----------|-------------|
| | | | | | | | | |
| | | | | | | | | |

### Lead Appointment Outcome Summary Tracker

| Review Window | Leads Summary (sanitized) | Booked Homeowner Appointments via Flow Summary | Trend Notes (no guarantees) | Approved Language Confirmed | Owner | Status | Evidence | Next Action |
|---------------|---------------------------|------------------------------------------------|-----------------------------|-----------------------------|-------|--------|----------|-------------|
| | | | | | | | | |
| | | | | | | | | |

### Missed-Lead Recovery Proof Tracker

| Review Window | Missed-Lead Candidates (sanitized) | Recovered into Booked Homeowner Appointments | Recovery Rate / Trend | Owner | Status | Evidence | Next Action |
|---------------|------------------------------------|----------------------------------------------|-----------------------|-------|--------|----------|-------------|
| | | | | | | | |
| | | | | | | | |

### Value Narrative Tracker

| Review Window | Narrative Version / Draft Location | Key Sanitized Highlights (approved language only) | Customer-Facing Excerpt Ready? | Forbidden Scan Passed? | Owner | Status | Evidence | Next Action |
|---------------|------------------------------------|---------------------------------------------------|--------------------------------|------------------------|-------|--------|----------|-------------|
| | | | | | | | | |
| | | | | | | | | |

### Roofer Consent Approval Tracker

| Date | Item (Testimonial / Case-Study / Proof Summary / Referral Context) | Consent Quote / Method / Date (sanitized) | Restrictions / Conditions | Revoked? | Owner | Status | Evidence | Next Action |
|------|--------------------------------------------------------------------|-------------------------------------------|---------------------------|----------|-------|--------|----------|-------------|
| | | | | | | | | |
| | | | | | | | | |

### Testimonial Readiness Tracker

| Review Window | Draft Version / Location | Roofer Approval Status (DRAFT / IN REVIEW / ROOFER-APPROVED / NOT-CONSENTED) | Final Approval Quote / Date | Ready for Publication? | Owner | Status | Evidence | Next Action |
|---------------|--------------------------|--------------------------------------------------------------------------------|-----------------------------|------------------------|-------|--------|----------|-------------|
| | | | | | | | | |
| | | | | | | | | |

### Case Study Readiness Tracker

| Review Window | Draft Version / Location | Roofer Approval Status (DRAFT / IN REVIEW / ROOFER-APPROVED / NOT-CONSENTED) | Final Approval Quote / Date | Ready for Publication? | Owner | Status | Evidence | Next Action |
|---------------|--------------------------|--------------------------------------------------------------------------------|-----------------------------|------------------------|-------|--------|----------|-------------|
| | | | | | | | | |
| | | | | | | | | |

### Referral Request Tracker

| Date | Roofer | Readiness Checklist PASS? | Ask Script Used (non-pressured version) | Roofer Response / Outcome | Follow-Up Status / Date | Pressure Check Passed? | Owner | Status | Evidence | Next Action |
|------|--------|---------------------------|-----------------------------------------|---------------------------|-------------------------|------------------------|-------|--------|----------|-------------|
| | | | | | | | | | | |
| | | | | | | | | | | |

### Expansion Plan-Fit Review Tracker

| Review Window | Current Plan/Tier | Usage Signals (sanitized from trackers) | Plan Fit Notes | Roofer Interest Signals | Non-Pushy Boundary Confirmed? | Expansion Info Shared? (neutral only) | Owner | Status | Evidence | Next Action |
|---------------|-------------------|-----------------------------------------|----------------|-------------------------|-------------------------------|---------------------------------------|-------|--------|----------|-------------|
| | | | | | | | | | | |
| | | | | | | | | | | |

---

**End of FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md**

All content above is concrete, operational, product-moving, and confined to dry-run/internal-only/founder-operator-only use. No production activation. No customer proof, testimonial, or case-study publication without explicit roofer consent. No pressure referral language. Verifier will enforce all requirements. The 14-day trial begins after RoofLeadHQ AI setup goes live. Cancel anytime. No long-term contract.
