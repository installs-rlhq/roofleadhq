# Second Paid Roofer Repeatable Launch Kit

Date: 2026-06-17

## Purpose

This is the practical manual system Jason (founder/operator) can use to repeat the first paid roofer launch process for a second paid roofer, using the completed first paid roofer operating sequence (post proof/referral/expansion) as the template. The kit helps qualify the second roofer, reuse safe setup patterns from the first paid sequence, confirm offer and public language, prepare Guided Setup, prepare go-live/trial/first-month/monthly retention handoffs, and prevent ad-hoc scaling before production security and tenant isolation are approved.

Canonical source of truth before this worktree must be verified at 90ca45f test(pilot): add first paid roofer proof referral expansion kit.

Public/business language (used in all customer-facing and prospect communications):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

All founder/operator manual steps, safety language, internal worksheets, decision logs, blocker registers, risk registers, qualification notes, reuse evidence logs, and handoff artifacts are internal-only / dry-run / founder-operator-only. This is a manual repeatable launch system, not automation and not production multi-roofer scaling. No public founder-led/manual babysitting positioning is used for customers or prospects. No live systems or external calls of any kind are activated by this kit. Dry-run / internal-only / founder-operator-only.

This kit is product-moving and operationally usable: it contains the concrete second roofer qualification checklist, referral/source intake review, offer and public language confirmation, Guided Setup reuse checklist (from the Guided Setup Execution Kit), go-live readiness reuse checklist (from the Go-Live Readiness Execution Kit), trial day-one reuse checklist (from the Trial Day-One Operating Kit), trial reporting and success review reuse checklist (from the Trial Reporting + Success Review Kit), trial conversion and payment handoff reuse checklist (from the Trial Conversion / Payment Handoff Kit), first-month operating reuse checklist (from the First-Month Operating Kit), monthly retention reuse checklist (from the Monthly Success / Retention Kit), proof/referral/expansion reuse checklist (from the Proof / Referral / Expansion Kit), multi-roofer safety and tenant-isolation boundary (cross-referencing the Data Protection / Tenant Isolation packet), second roofer blocker and readiness register, repeatable launch handoff artifact, PASS/HOLD/BLOCKED second-roofer launch gate, 9 copy-paste-ready manual tracker tables, and exhaustive safety guardrails. It is designed so a founder or trained operator can execute manual qualification and reuse of the first paid roofer's completed operating sequence for a second paid roofer using only this document + the referenced FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md (primary input: post-proof/referral/expansion PASS + handoff artifact + proof evidence + consent status + referral status + value narrative) + FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md + FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md + FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md + FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md + FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md + FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md + FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (primary container and handoff target) + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + the aggregate verifier. All gates use explicit PASS / HOLD / BLOCKED language.

This kit is the post-first-paid-proof manual repeatable launch overlay for preparing a second paid roofer. It receives the handoff from the Proof / Referral / Expansion Kit (post-success-review + proof capture + consent + referral status) and produces a second-roofer qualification record, reuse evidence snapshots, language confirmation, safety boundary confirmation, blocker register, handoff artifact, and gate decision for potential handoff into the Launch System Packet (or hold). It focuses on manual qualification, pattern reuse confirmation (no re-invention), language enforcement, multi-roofer safety boundary (single-tenant manual controls only), and prevention of ad-hoc scaling. Jason (founder/operator) uses this kit after the first paid roofer has a complete proof/referral/expansion record to run the manual repeatable qualification and prep for a second paid roofer, log all reuse steps, confirm boundaries, and gate only on explicit PASS.

This kit file: `docs/SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md`
Wrapper: `scripts/run-second-paid-roofer-repeatable-launch-kit-dry-run.sh`
Verifier: `backend/scripts/verify-second-paid-roofer-repeatable-launch-kit-readonly.js`

## Scope

- Second paid roofer qualification and repeatable launch prep (using the completed first paid roofer sequence after its proof/referral/expansion gate as the manual template). The first paid roofer must have completed first-month + monthly success review + proof/referral/expansion PASS + handoff before this kit is used for a second.
- All manual operations during this repeatable launch window: second roofer qualification checklist, referral/source intake review, offer/public language confirmation (approved strings only), Guided Setup reuse (intake/worksheet/preferences/blockers), go-live readiness reuse, trial day-one reuse, trial reporting/success review reuse, trial conversion/payment handoff reuse, first-month operating reuse, monthly retention reuse, proof/referral/expansion reuse, multi-roofer safety and tenant-isolation boundary confirmation (no implication of prod scale), second roofer blocker and readiness register, repeatable launch handoff artifact production, PASS/HOLD/BLOCKED second-roofer launch gate.
- Internal founder/operator worksheets, decision trees, logs, blocker/risk/trust-risk registers, qualification notes, reuse evidence snapshots (local only), consent boundary notes, and 9 copy-paste-ready tracker templates (copy-paste into local spreadsheet or notes only).
- Explicit, machine-enforceable safety guardrails (section 19) that must be re-confirmed before every qualification review, reuse checklist execution, language confirmation, gate, or handoff.
- Handoff artifacts that feed directly into `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` (ongoing customer success / monthly operations / retention / proof / referral / expansion sections for the second roofer once qualified and launched). References upstream Proof / Referral / Expansion Kit (primary input source), Monthly Success / Retention Kit, First-Month Operating Kit, Trial Conversion / Payment Handoff, Trial Reporting + Success Review, Trial Day-One Operating Kit, Go-Live Readiness, Guided Setup, Launch System, Website Trial Direction Regression, and Data Protection/Tenant Isolation packets for context, language enforcement, reuse patterns, and checkpoint only.
- No second roofer is onboarded or launched without explicit PASS at the second-roofer launch gate + logged evidence that all reuse checklists passed and safety boundary confirmed.
- Repeatable launch is manual, single-roofer-at-a-time only. Does not imply or authorize production multi-tenant scale, production data writes, contractor portal access, auth/RLS/security implementation, or live automation. All remains founder-operator manual dry-run until production security and tenant isolation approved separately.

## Non-Goals and Explicit Boundaries

- No public claims of legacy pilot or quota language (see Forbidden Public Phrases section below and in sections 19/20 for the exact list of banned phrases).
- No activation of live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, or external service calls.
- All work remains read-only verification, dry-run, internal founder/operator planning, note-taking, worksheet filling, decision logging, reuse evidence snapshotting (local), blocker logging, handoff documentation, and gate execution only. No live sends, no automation activated in this kit.
- This kit does not implement or activate any part of live ongoing automation, ongoing billing, multi-roofer production behavior, or tenant isolation. Those remain covered (or blocked) in the Launch System Packet and separate security work. This is manual qualification + pattern reuse + safety boundary confirmation + handoff prep only.
- No customer-facing or public copy may use internal-only language (see section 20). Internal founder/operator/manual/dry-run language is allowed only inside explicitly labeled internal-only dry-run execution instructions.
- This kit does not duplicate full content from any prior kit (Guided Setup, Go-Live, Trial Day One, Trial Reporting, Trial Conversion, First-Month, Monthly Retention, Proof/Referral/Expansion, Launch System). It is the focused manual repeatable launch reuse + qualification + gate overlay after the first paid has completed its full sequence through proof/referral/expansion.
- No changes to backend or src directories, Migration files, schema, auth/RLS/security, env, secrets, production routes, or any activation of live systems.
- Repeatable launch does not authorize ad-hoc scaling. Second roofer prep may only advance on explicit PASS at the second-roofer launch gate after all reuse checklists, language confirmation, and multi-roofer safety boundary are confirmed. No production multi-tenant scale, no contractor portal, no data writes, no live automation.
- No second roofer proof, testimonial, or case-study is published or shared externally without following the full prior-kit consent process (reused via the proof/referral/expansion reuse checklist).

### Forbidden Public Phrases (Reference — Full List Enforced by Verifier)
The following phrases must remain absent from all public-facing, customer-facing, handoff artifacts shared with the roofer (or second roofer prospect), value narrative excerpts, reuse checklist notes shared externally, consent notes shared externally, and any customer communication sections of this kit (and all related artifacts). They are listed here for documentation and verifier enforcement only. The full re-statement and internal-only allowance rules appear in sections 19 and 20.

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

Reference: See AGENT_PRODUCT_QUALITY_GATE.md for the product-depth rule this kit satisfies (operational usefulness, concrete fields, decision logs, templates, wiring, safety). References FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md (primary input source / handoff), FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md, FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md, FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md, FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md, FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md, FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md, FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (primary container and handoff target), WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md (language enforcement), and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md (tenant isolation + multi-roofer safety boundary checkpoint). Cross-references Proof / Referral / Expansion Kit (primary), Monthly Success / Retention Kit, First-Month Operating Kit, Trial Conversion, Trial Reporting + Success Review, Trial Day-One Operating Kit, Go-Live Readiness, Guided Setup, Launch System, Trial Direction Regression, and Data Protection/Tenant Isolation packets.

## Verification Commands (Run in Order)

```bash
node --check backend/scripts/verify-second-paid-roofer-repeatable-launch-kit-readonly.js
node backend/scripts/verify-second-paid-roofer-repeatable-launch-kit-readonly.js
scripts/run-second-paid-roofer-repeatable-launch-kit-dry-run.sh
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

## Cross References

- Proof / Referral / Expansion Kit (primary input source / handoff): `docs/FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md` + its wrapper and verifier (provides post-proof/referral/expansion PASS + handoff artifact + proof summaries + consent status + referral status + value narrative + ongoing monthly expectations + safety + verifier evidence at gate)
- Monthly Success / Retention Kit: `docs/FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md` + its wrapper and verifier (provides monthly PASS pattern + retention review pattern)
- First-Month Operating Kit: `docs/FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md` + its wrapper and verifier (provides first-month patterns, handoff baseline)
- Trial Conversion / Payment Handoff Kit (prior conversion patterns): `docs/FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md` + its wrapper and verifier
- Trial Reporting + Success Review Kit (prior reporting patterns / baseline): `docs/FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md` + its wrapper and verifier (provides reporting rhythm, trackers, success review patterns)
- Trial Day-One Operating Kit: `docs/FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md` + its wrapper and verifier
- Go-Live Readiness Execution Kit: `docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md` + its wrapper and verifier
- Guided Setup Execution Kit: `docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md` + its wrapper and verifier
- Launch system (primary container + handoff target for second-roofer qualification record, reuse snapshots, language confirmation, safety boundary confirmation, blocker register, handoff artifact, and gate outcome): `docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md` + its wrapper and verifier (receives second-roofer launch gate outcome + handoff artifact + updated prospect/customer status; contains the ongoing customer success / monthly operations / retention / proof / referral / expansion sections that this kit feeds for the second roofer)
- Website trial direction regression (language enforcement): `docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md` + its wrapper and verifier
- Data protection / tenant isolation (checkpoint reference + multi-roofer safety boundary): `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md` + its wrapper and verifier
- Aggregate readiness: `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Verifier index: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`
- Next-chat contexts and daily guide (updated by this kit)
- Related: FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md (ongoing), and the full suite of first-roofer manual command packets for reuse pattern details.
- This kit's wrapper: `scripts/run-second-paid-roofer-repeatable-launch-kit-dry-run.sh`
- This kit's verifier: `backend/scripts/verify-second-paid-roofer-repeatable-launch-kit-readonly.js`

---

## 1. Internal-only dry-run scope

**Internal-only / founder-operator-only. This entire kit is manual repeatable launch qualification and pattern-reuse system only.** Internal only: founder-operator manual steps only.

- All steps are founder/operator manual post-first-paid-proof/referral/expansion qualification: second roofer qualification checklist (business fit, volume signals, Guided Setup willingness, no production pressure), referral/source intake review, offer and public language confirmation (approved strings only), Guided Setup reuse checklist, go-live readiness reuse checklist, trial day-one reuse checklist, trial reporting and success review reuse checklist, trial conversion and payment handoff reuse checklist, first-month operating reuse checklist, monthly retention reuse checklist, proof/referral/expansion reuse checklist, multi-roofer safety and tenant-isolation boundary (explicit: Repeatable launch is manual, single-roofer-at-a-time only. Does not imply or authorize production multi-tenant scale, production data writes, contractor portal access, auth/RLS/security implementation, or live automation), second roofer blocker and readiness register, repeatable launch handoff artifact, PASS/HOLD/BLOCKED second-roofer launch gate.
- No live systems, no external calls, no production data access, no automation activation of any kind, no multi-tenant, no portal, no auth/RLS. This kit does not activate or implement live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, external service calls, credentials, secrets, env changes, migration files, or backend-or-src changes. All qualification notes, reuse evidence snapshots, blocker logs, handoff artifacts remain local/internal; nothing is sent or activated from this kit.
- Use only after the first paid roofer has completed its full sequence through the Proof / Referral / Expansion Kit PASS + handoff artifact (monthly PASS + first-month + trial conversion + reporting + day-one + go-live + guided setup + proof/referral/expansion all green).
- Copy-paste trackers locally; do not store in production systems. All second-roofer qualification and reuse data handled as sanitized notes or local copies only.
- Re-confirm every safety item in section 19 before starting qualification, before any reuse checklist execution, before language confirmation, before blocker logging, before handoff artifact, and before the gate decision.
- This kit receives handoff from Proof / Referral / Expansion Kit and feeds the Launch System Packet (if/when a second paid roofer advances to launch). It does not duplicate full Launch System operating content.
- Data protection / tenant isolation checkpoint re-confirmed at every gate (single-tenant manual controls only; refs logged). Multi-roofer safety boundary explicitly prevents ad-hoc scaling.
- No second roofer is moved to active launch without explicit PASS at the second-roofer launch gate + full evidence that all reuse checklists passed using the first paid sequence as template.

## 2. Second paid roofer repeatable launch purpose

**Internal-only / founder-operator-only.**

After the first paid roofer has completed the first month, monthly success review, and the Proof / Referral / Expansion Kit has produced its PASS + handoff artifact + proof evidence + consent status + referral status + value narrative (post first monthly payment and ongoing monthly health confirmation + proof/referral/expansion readiness), execute the manual repeatable launch system that qualifies a second roofer, reuses the exact safe setup/operating patterns from the first paid roofer operating sequence as the template (via explicit reuse checklists), confirms offer and public language using only approved strings, prepares Guided Setup / go-live / trial / first-month / monthly / proof-referral handoffs by reference, maintains a multi-roofer safety and tenant-isolation boundary (manual, single-roofer-at-a-time, no prod scale implication), logs blockers, produces a repeatable launch handoff artifact, and executes a PASS/HOLD/BLOCKED second-roofer launch gate. This step activates only on post-proof/referral/expansion PASS path from the Proof / Referral / Expansion Kit for the first paid roofer.

- Confirm second roofer qualification (section 4): business legitimacy, realistic lead volume, fit with RoofLeadHQ value (fast response + automated follow-up + missed-lead recovery), willingness to follow Guided Setup first, no expectation of production guarantees or manual babysitting.
- Review referral/source intake (section 5): document how the second roofer was sourced (referral from first paid, self-sourced, other), intake notes, no pressure.
- Confirm offer and public language (section 6): every customer-facing statement must match the approved list exactly; run the Offer Language Confirmation Tracker.
- Execute Guided Setup reuse checklist (section 7): reuse the exact intake worksheet, lead source setup, response/follow-up preferences, booking/calendar preferences, reporting expectations, and go-live blocker identification from the Guided Setup Execution Kit; log differences/safe adaptations only (no new automation).
- Execute go-live readiness reuse checklist (section 8): reuse the exact go-live checklist and preconditions from the Go-Live Readiness Execution Kit; confirm all first-paid patterns apply safely.
- Execute trial day-one reuse checklist (section 9): reuse the day-one command center, first lead handling, response/follow-up monitoring, missed-lead recovery review, blocker handling, and end-of-day handoff from the Trial Day-One Operating Kit.
- Execute trial reporting and success review reuse checklist (section 10): reuse the daily/weekly reporting rhythm, lead/appointment outcome tracking, missed-lead recovery review, booked homeowner appointment tracking, trial health scorecard, pre-payment email readiness, success review call agenda/script from the Trial Reporting + Success Review Kit.
- Execute trial conversion and payment handoff reuse checklist (section 11): reuse the trial closeout evidence checklist, proceed/cancel decision capture, roofer approval evidence log, pre-payment email confirmation, first monthly payment readiness, payment handoff readiness artifact, first-month operating expectations from the Trial Conversion / Payment Handoff Kit.
- Execute first-month operating reuse checklist (section 12): reuse the kickoff checklist, paid customer status confirmation, lead intake/response/missed-lead/appointment rhythms, weekly value report preparation, roofer feedback/support review, cancellation-risk/blocker review, first-month issue escalation register, monthly success review agenda/script, ongoing monthly operations handoff from the First-Month Operating Kit.
- Execute monthly retention reuse checklist (section 13): reuse the monthly customer status confirmation, lead/appointment trend review, response/follow-up + missed-lead recovery performance review, monthly value report preparation, roofer feedback/satisfaction review, retention-risk + cancellation-risk review, support boundary review, blocker/issue escalation register, next-month operating plan, monthly success review agenda/script, ongoing customer success handoff, Monthly PASS gate pattern from the Monthly Success / Retention Kit.
- Execute proof/referral/expansion reuse checklist (section 14): reuse the customer proof evidence review, lead and booked homeowner appointment outcome summary, missed-lead recovery proof summary, value narrative preparation (no guarantees), roofer approval and consent checklist, testimonial readiness checklist (customer-approved only), case-study readiness checklist (customer-approved only), referral request readiness checklist, referral ask script and follow-up tracker (non-pressured), expansion/plan-fit review (non-pushy), cancellation-risk/trust-risk guardrails, proof asset handoff, ongoing monthly operations handoff, PASS/HOLD/BLOCKED proof/referral/expansion gate pattern from the Proof / Referral / Expansion Kit.
- Execute multi-roofer safety and tenant-isolation boundary confirmation (section 15): re-confirm single-tenant manual controls only; explicitly log that repeatable launch does not imply or authorize production multi-tenant scale, production data writes, contractor portal access, auth/RLS/security implementation, or live automation; reference the Data Protection / Tenant Isolation packet at every gate.
- Maintain second roofer blocker and readiness register (section 16): any item that would require prod writes, live automation, portal, auth/RLS, or multi-tenant is automatically BLOCKED.
- Produce repeatable launch handoff artifact (section 17): qualification status, all reuse checklist PASS evidence snapshots (local), language confirmation log, safety boundary confirmation, blocker register snapshot, handoff to Launch System Packet (or hold).
- Execute PASS/HOLD/BLOCKED second-roofer launch gate (section 18) with full evidence and handoff to Launch System (only on full PASS; HOLD for more evidence; BLOCKED on any safety boundary violation or missing reuse PASS).
- All steps are manual compilation, logging, review, rehearsal, and reuse evidence snapshotting only. No live automation, no production writes, no multi-roofer activation. does not imply production multi-tenant scale. Uses only the approved public language in any customer-facing notes. The 14-day trial begins after RoofLeadHQ AI setup goes live. Cancel anytime. No long-term contract.

The repeatable launch window begins after the first paid roofer's proof/referral/expansion handoff (or agreed timing from that gate). This kit activates only on post-proof/referral/expansion PASS path for the first paid. It produces the second-roofer qualification record, reuse evidence, language confirmation, safety boundary confirmation, blocker snapshot, handoff artifact, and gate so that (on PASS) a clean manual launch prep for the second paid roofer can be handed into the Launch System Packet without ad-hoc decisions or regression of first-paid safety patterns.

## 3. Inputs from first paid roofer proof/referral/expansion kit

**Internal-only / founder-operator-only. Required before this kit can be used for second paid roofer repeatable launch qualification and reuse.**

From `docs/FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md` outputs (plus Launch System Packet):

- Proof / Referral / Expansion Kit post-monthly-success-review PASS decision from section 18 (or explicit proof/referral/expansion gate + handoff logged).
- Handoff artifact: proof evidence summary, lead and booked homeowner appointment outcome summary (sanitized), missed-lead recovery proof summary, value narrative (approved language, no guarantees), roofer consent approval status (testimonials/case-studies/referrals), referral request status and tracker snapshot, expansion/plan-fit notes (if any), cancellation-risk/trust-risk status, ongoing monthly operations handoff snapshot.
- All 9 trackers snapshot from Proof / Referral / Expansion Kit (Proof Evidence Tracker, Lead Appointment Outcome Summary Tracker, Missed-Lead Recovery Proof Tracker, Value Narrative Tracker, Roofer Consent Approval Tracker, Testimonial Readiness Tracker, Case Study Readiness Tracker, Referral Request Tracker, Expansion Plan-Fit Review Tracker) with final PASS status.
- Monthly Success / Retention Kit handoff (primary upstream): monthly PASS + success review outcome + trackers snapshot + retention status + value evidence.
- First-Month Operating Kit handoff (via chain): first-month PASS + paid customer status + rhythms established.
- Trial Conversion / Payment Handoff Kit handoff (via chain): conversion evidence + first monthly payment confirmation + first-month expectations.
- Trial Reporting + Success Review Kit handoff (via chain): trial health + success review outcome.
- Trial Day-One Operating Kit handoff (via chain): day-one monitoring patterns.
- Go-Live Readiness Execution Kit handoff (via chain): go-live preconditions cleared.
- Guided Setup Execution Kit handoff (via chain): intake worksheets, preferences, lead sources, blockers.
- Launch System Packet current state for the first paid roofer (ongoing sections).
- WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md language baseline (approved strings only).
- ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md tenant isolation checkpoint (re-confirmed for multi-roofer safety boundary).
- Aggregate verifier evidence that all prior first-paid gates passed without activating live systems.

These inputs must be reviewed and referenced in the Second Roofer Qualification Tracker and Second Roofer Launch Gate Tracker before any second-roofer qualification work begins.

## 4. Second roofer qualification checklist

**Internal-only / founder-operator-only.**

Second Roofer Qualification Checklist. Use this checklist to qualify a candidate second roofer before investing reuse effort. All items must reach PASS (or documented HOLD with owner/due) before advancing to offer language confirmation and reuse checklists. Log in the Second Roofer Qualification Tracker.

1. Business legitimacy confirmed (real roofing company, active operations, contactable owner/operator).
2. lead volume evidence reviewed (sanitized summary only; realistic for RoofLeadHQ AI value: fast response + automated follow-up + missed-lead recovery turning leads into booked homeowner appointments).
3. Fit with RoofLeadHQ value proposition confirmed (understands Guided Setup happens first; willingness to use Guided Setup first; the 14-day trial begins after RoofLeadHQ AI setup goes live; An automated email is sent 2 days before the first monthly payment; Cancel anytime. No long-term contract.).
4. No expectation of production guarantees, revenue guarantees, booked-job guarantees, or automatic estimate/quote/invoice/payment (forbidden language scan passed on all prior conversations).
5. Willingness to follow the full first-paid sequence (Guided Setup first, go-live, 14-day trial monitoring, reporting, success review, conversion handoff, first-month operating, monthly retention, proof/referral/expansion) documented.
6. No production pressure or timeline that would require live SMS/Twilio/Vapi/Calendar/Resend/Lindy/CRM automation, Supabase writes, or auth/RLS changes.
7. Referral/source clarity (see section 5): documented how this second roofer was introduced.
8. Data protection / tenant isolation boundary acknowledged (single-tenant manual controls only for any dry-run; no expectation of shared production data or contractor portal).
9. Offer language acceptance: second roofer (or prospect) has received and acknowledged the exact approved public language (section 6) in writing or recorded call note.
10. Internal founder/operator risk review: any cancellation-risk, trust-risk, or fit-risk from first paid patterns applied to this candidate noted and mitigated or BLOCKED.

Any item that cannot be evidenced locally is HOLD or BLOCKED. Qualification does not imply launch; the full gate (section 18) is still required after all reuse checklists.

## 5. Referral/source intake review

**Internal-only / founder-operator-only.**

Referral / Source Intake Review. Document the source of the second roofer candidate. Reuse patterns from the Proof / Referral / Expansion Kit (non-pressured referral ask) and the Launch System Packet prospect intake.

- If referred by the first paid roofer: confirm explicit non-pressured context (no quota, no "guaranteed appointments", no "you book the inspection" language used in the referral conversation). Log consent from first paid if any testimonial/referral context shared.
- If self-sourced or other channel: document source details (website, outreach, inbound, other) using only approved language.
- Intake notes must include: business name (sanitized if needed for local log), contact role, stated lead pain, stated goals (must align with RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery), timeline expectations (must align with Guided Setup first + 14-day trial).
- Any language deviation from approved public strings is logged as a blocker and must be corrected before offer confirmation.
- Log in the Referral Source Intake Tracker.

No pressure, no founder-led promises, no manual coordination framing in any intake notes shared with the candidate.

## 6. Offer and public language confirmation

**Internal-only / founder-operator-only. This section is the enforcement point for customer-facing language.**

Offer and Public Language Confirmation. Before any Guided Setup reuse or deeper engagement, run the Offer Language Confirmation Tracker and confirm every customer-facing statement (emails, calls, notes, handoff artifacts) uses only the approved strings. approved customer-facing language only. Forbidden phrases must be absent.

Approved customer-facing / public language (must be present and exact where used):

- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

Any discussion of "the 14-day trial" must tie it explicitly to "after RoofLeadHQ AI setup goes live." No "14-day launch trial", no "day 15", no "Monthly billing starts on day 15".

Internal-only founder/operator/manual language (Founder-Led Launch Program framing, manual review notes, dry-run rehearsal notes, blocker registers, internal trackers) is confined to clearly labeled internal sections of this kit and local notes. It must never appear in customer-facing artifacts or shared handoff notes.

Run the full forbidden scan (section 19/20) before marking Offer Language Confirmation Tracker PASS.

## 7. Guided Setup reuse checklist

**Internal-only / founder-operator-only.**

Guided Setup Reuse Checklist. Reuse the exact patterns and worksheets from `docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md` (and its trackers) for the second roofer. Do not invent new intake steps.

- Confirm business profile worksheet fields captured (same as first paid).
- Confirm lead source confirmation (same fields; log any source-specific notes sanitized).
- Confirm response/follow-up preferences (same structure).
- Confirm booking/calendar preferences (same structure).
- Confirm reporting expectations (same structure).
- Re-run the setup risk and blocker register using the same format; any item requiring prod writes, live automation, or tenant changes is automatically BLOCKED.
- Reuse the Guided Setup call agenda and script (approved language only).
- Produce go-live readiness checklist snapshot (see section 8) as output of this reuse.
- Log differences from first-paid execution (safe adaptations only) in the Guided Setup Reuse Tracker.
- Handoff artifact must reference the first-paid Guided Setup patterns as the template from FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md.

All steps manual. No activation of any setup automation. Re-confirm section 19 safety before starting.

## 8. Go-live readiness reuse checklist

**Internal-only / founder-operator-only.**

Go-Live Readiness Reuse Checklist. Reuse the exact go-live readiness checklist and preconditions from `docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md`.

- Re-confirm all go-live preconditions using the first-paid template (preferences locked, lead sources confirmed, response/follow-up configured in dry-run notes, reporting expectations captured, blockers cleared or HOLD/BLOCKED, preferences confirmed).
- Re-confirm that no live SMS, Vapi, Calendar, Resend, Lindy, or external call is required or activated.
- Re-confirm data protection / tenant isolation boundary for this second roofer (manual single-tenant controls only).
- Produce go-live readiness evidence snapshot for the Trial Day-One Reuse Tracker input.
- Log in the Go-Live Readiness Reuse Tracker with owner/status/evidence/next-action.
- Any item that would require production route, auth change, or multi-tenant data model is BLOCKED here. from FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md

Only after this reuse checklist reaches PASS (plus language confirmation) may trial day-one reuse begin.

## 9. Trial day-one reuse checklist

**Internal-only / founder-operator-only.**

Trial Day-One Reuse Checklist. reuse the day-one command center and monitoring rhythm, first lead handling, response/follow-up review, booked homeowner appointment readiness, missed-lead recovery review, contractor/roofer communication readiness, homeowner communication draft-review checklist, day-one blocker and escalation register, and end-of-day handoff from FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md.

- Copy the first-paid day-one command center structure into local notes for the second roofer.
- Simulate (dry-run notes only) first lead intake review using the same fields.
- Apply the same response and follow-up monitoring, missed-lead recovery review, booked homeowner appointment readiness review.
- Rehearse (internal only) homeowner communication drafts using approved language only.
- Maintain a day-one blocker register (any prod/live item = BLOCKED).
- Produce end-of-day handoff snapshot for trial reporting reuse.
- Log all in the Trial Operations Reuse Tracker (or dedicated day-one sub-section).

All manual. No live lead handling, no real SMS, no real booking.

## 10. Trial reporting and success review reuse checklist

**Internal-only / founder-operator-only.**

Trial Reporting and Success Review Reuse Checklist. Reuse the daily trial reporting rhythm, lead source performance review, response and follow-up outcome review, missed-lead recovery outcome review, booked homeowner appointment tracking, roofer communication and feedback review, trial health scorecard, blocker and risk review, pre-payment email readiness checklist, cancellation/no-go handling, first monthly payment handoff readiness, success review call agenda and script, and end-of-trial PASS/HOLD/BLOCKED decision gate pattern from `docs/FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md`.

- Apply the same reporting cadence and fields to the second roofer (local sanitized notes).
- Rehearse the success review call agenda/script using approved language only.
- Confirm pre-payment email readiness (2 days before first monthly) using the exact approved phrasing.
- Log trial health and any blockers.
- Log in the Trial Operations Reuse Tracker.

The success review must use only approved public language. No internal founder review framing shared with the roofer.

## 11. Trial conversion and payment handoff reuse checklist

**Internal-only / founder-operator-only.**

Trial Conversion and Payment Handoff Reuse Checklist. Reuse the trial closeout evidence checklist, proceed/cancel decision capture, roofer approval evidence log, pre-payment email confirmation review, first monthly payment readiness checklist, payment handoff readiness artifact, cancellation/no-go handling, first-month operating expectations, post-trial customer status tracker, and payment and billing blocker register. reuse the conversion from `docs/FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md`.

- Capture proceed/cancel decision using the same evidence standard as the first paid.
- Confirm first monthly payment readiness (automated email 2 days before, cancel anytime, no long-term contract).
- Produce payment handoff readiness artifact (local) referencing the first-paid pattern.
- Log first-month operating expectations (reuse from First-Month Operating Kit).
- Log in the Trial Operations Reuse Tracker and First-Month Monthly Handoff Tracker.

No actual payment processing or live billing activation.

## 12. First-month operating reuse checklist

**Internal-only / founder-operator-only.**

First-Month Operating Reuse Checklist. Reuse the first-month kickoff checklist, paid customer status confirmation, lead intake operating rhythm, response and follow-up monitoring rhythm, missed-lead recovery review rhythm, booked homeowner appointment tracking, weekly value report preparation, roofer feedback and support review, cancellation-risk and blocker review, first-month issue escalation register, monthly success review agenda and script, ongoing monthly operations handoff, and First-Month PASS/HOLD/BLOCKED decision gate from `docs/FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md`.

- Kick off using the first-paid template (local notes).
- Run the same weekly rhythms (lead/appointment, response, missed-lead, appointments, value report).
- Rehearse the monthly success review agenda/script (approved language only).
- Produce ongoing monthly operations handoff snapshot.
- Log in the First-Month Monthly Handoff Tracker.

## 13. Monthly retention reuse checklist

**Internal-only / founder-operator-only.**

Monthly Retention Reuse Checklist. Reuse the monthly customer status confirmation, monthly lead and appointment trend review, response and follow-up performance review, missed-lead recovery performance review, monthly value report preparation, reuse the monthly value reporting, roofer feedback and satisfaction review, retention-risk review, retention-risk and cancellation-risk review, support boundary and scope review, blocker and issue escalation register, next-month operating plan, monthly success review agenda and script, ongoing customer success handoff, and Monthly PASS/HOLD/BLOCKED retention gate from `docs/FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md`.

- Apply the same monthly cadence and fields.
- Re-confirm support boundaries (no manual babysitting promises).
- Produce next-month operating plan (local).
- Log in the First-Month Monthly Handoff Tracker (or dedicated monthly sub-tracker).

## 14. Proof/referral/expansion reuse checklist

**Internal-only / founder-operator-only.**

Proof / Referral / Expansion Reuse Checklist. Reuse the customer proof evidence review, reuse the proof evidence review, lead and booked homeowner appointment outcome summary, missed-lead recovery proof summary, value narrative preparation (no guarantees, approved language only), roofer approval and consent checklist, testimonial readiness checklist (customer-approved only), case-study readiness checklist (customer-approved only), referral request readiness checklist, referral ask script and follow-up tracker (non-pressured), expansion / plan-fit review (non-pushy), cancellation-risk and trust-risk guardrails, proof asset handoff, ongoing monthly operations handoff, and PASS/HOLD/BLOCKED proof/referral/expansion gate from `docs/FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md`.

- Apply the same proof capture, consent gating, non-pressured referral, and non-pushy expansion patterns to the second roofer once it reaches that stage.
- Log consent requirements explicitly.
- Log in the Multi-Roofer Safety Boundary Tracker and Second Roofer Launch Gate Tracker as evidence of pattern reuse.

## 15. Multi-roofer safety and tenant-isolation boundary

**Internal-only / founder-operator-only. This is a hard gate on all paths.**

Multi-Roofer Safety and Tenant-Isolation Boundary. Repeatable launch for a second paid roofer is manual, single-roofer-at-a-time only. It does not imply or authorize production multi-tenant scale, production data writes, contractor portal access, auth/RLS/security implementation, or live automation.

- Re-confirm at every reuse checklist and gate: all controls remain manual founder/operator dry-run for one roofer at a time.
- Reference `docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md` for the current tenant isolation checkpoint. Log the reference + date + status in the Multi-Roofer Safety Boundary Tracker.
- Any requirement or expectation that would need shared production data, contractor portal, RLS policies, multi-tenant schema, live SMS/Vapi/Calendar/Resend/Lindy, cron/scheduler/dispatcher, or external service activation is automatically BLOCKED.
- Second-roofer qualification or handoff may not proceed if the multi-roofer safety boundary cannot be confirmed PASS.
- Ad-hoc scaling before production security and tenant isolation are approved is forbidden. This kit's PASS gate explicitly prevents it.
- Log confirmation in the Multi-Roofer Safety Boundary Tracker and Second Roofer Launch Gate Tracker.

## 16. Second roofer blocker and readiness register

**Internal-only / founder-operator-only.**

Maintain a living register (copy into Second Roofer Qualification Tracker + Multi-Roofer Safety Boundary Tracker + Second Roofer Launch Gate Tracker as needed). Format:

- Blocker ID / Item
- Category (Qualification / Language / Guided Setup / Go-Live / Trial Ops / Conversion / First-Month / Monthly / Proof-Referral / Safety Boundary / Other)
- Description (sanitized)
- First-Paid Pattern Reference (which kit + section)
- Evidence / Workaround (local only)
- Owner
- Status (OPEN / IN PROGRESS / RESOLVED / HOLD / BLOCKED)
- Due Date
- Next Action
- Impact on Gate (must be RESOLVED or documented HOLD before PASS)
- BLOCKED items must be resolved before gate
- explicit owner + due date

Any blocker that requires backend-or-src change, migration, auth/RLS, production write, live send, portal, or multi-tenant is permanently BLOCKED for this kit and routes to separate production readiness work.

Re-review the full register before every gate.

## 17. Repeatable launch handoff artifact

**Internal-only / founder-operator-only.**

On completion of all reuse checklists (or on gate decision), produce a local handoff artifact (notes doc or spreadsheet export) containing:

- Second roofer identification (sanitized) + qualification status (PASS/HOLD/BLOCKED)
- Referral/source intake summary
- Offer language confirmation log (all approved strings confirmed present; forbidden absent)
- Guided Setup Reuse Tracker snapshot + evidence
- Go-Live Readiness Reuse Tracker snapshot + evidence
- Trial Operations Reuse Tracker snapshot + evidence (day-one + reporting + conversion)
- First-Month Monthly Handoff Tracker snapshot + evidence
- Proof/Referral/Expansion Reuse evidence snapshot
- Multi-Roofer Safety Boundary Tracker snapshot + explicit confirmation statement ("Repeatable launch is manual, single-roofer-at-a-time only. Does not imply or authorize production multi-tenant scale, production data writes, contractor portal access, auth/RLS/security implementation, or live automation.")
- Second Roofer Blocker and Readiness Register snapshot (all BLOCKED items listed)
- Second Roofer Launch Gate Tracker final row (decision + justification)
- References to all 11 source packets + 90ca45f canonical commit
- Recommended next action (hand to Launch System Packet on PASS; more evidence on HOLD; separate security work on BLOCKED)

This artifact is the input to the Launch System Packet (if PASS) or to the next monthly/proof cycle for the first paid. It is never published externally.

## 18. PASS/HOLD/BLOCKED second-roofer launch gate

**Internal-only / founder-operator-only. This is the final decision point.**

The gate decision must be logged in the Second Roofer Launch Gate Tracker with owner, date, evidence links (local), and justification.

Only PASS advances. PASS criteria (all must be true):
- Second Roofer Qualification Tracker: all items PASS (or documented safe HOLDs that do not affect safety).
- Referral Source Intake Tracker: PASS.
- Offer Language Confirmation Tracker: PASS (all approved strings confirmed; forbidden absent in any customer-facing notes).
- All 7 reuse trackers (Guided Setup Reuse, Go-Live Readiness Reuse, Trial Operations Reuse, First-Month Monthly Handoff, and the three others as applicable): PASS with evidence snapshots referencing the first-paid source kits.
- Multi-Roofer Safety Boundary Tracker: PASS (explicit confirmation of manual single-roofer only; no prod scale implication; Data Protection packet referenced).
- Second Roofer Blocker and Readiness Register: no open BLOCKED items that violate safety; any remaining HOLDs have clear owner/due and do not block gate.
- Repeatable Launch Handoff Artifact: complete and references all required source packets + canonical 90ca45f.
- All prior first-paid gates remain green (aggregate pilot readiness would still pass).
- Re-confirmation of section 19 safety guardrails signed off in the gate row.
- all 9 trackers confirmed.
- no ad-hoc scaling before production security and tenant isolation are approved.
- No implication of live automation, prod writes, portal, auth/RLS, or multi-tenant.

Only on full PASS may the handoff artifact be used to begin manual launch prep for the second paid roofer inside the Launch System Packet.

HOLD: more evidence or time needed on any checklist or blocker. Route back to the relevant reuse section. Do not advance.

BLOCKED: safety boundary violation, forbidden language found, qualification failure, or any requirement for production changes / live activation. Do not advance. Escalate to separate production security/tenant isolation work. Log in gate tracker and do not reuse this path until the root cause is resolved outside this kit.

The gate uses explicit PASS / HOLD / BLOCKED language only. The decision is recorded locally and referenced in the Launch System Packet (on PASS) or in ongoing first-paid monthly operations (on HOLD/BLOCKED).

## 19. Safety guardrails

**Confirmed Disabled (No Activation in Any Form). Re-confirm before every qualification step, reuse checklist, language confirmation, blocker update, handoff artifact, and gate decision.**

- Live homeowner SMS / Twilio sending: DISABLED
- Live Calendar booking / event creation for homeowners or contractors: DISABLED
- Live Vapi / phone automation: DISABLED
- Live Resend / Lindy / email automation beyond the documented automated pre-payment email language: DISABLED
- Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED
- Auth / RLS / security policy implementation or changes: NONE
- Contractor portal exposure or access: NONE
- Migration changes: none, schema changes: none, auth/RLS/security: none, env/secrets: none, production routes: none
- External service calls (Twilio, Vapi, Calendar, Resend, Stripe, etc.): none activated
- Scheduler / cron / dispatcher activation: none
- CRM automation or production data mutation: none
- No customer proof publication without roofer approval/consent
- No customer proof publication, testimonial, or case-study without explicit roofer approval/consent (reuse the consent process from the Proof / Referral / Expansion Kit)
- No pressure-based referral language (reuse non-pressured scripts only)
- No guarantee language of any kind (appointments, revenue, jobs, estimates, quotes, invoices, payments, inspections)
- No "book jobs", "booked jobs", "guaranteed appointments", "automatic estimate/quote/invoice/payment", "You book the inspection" in any customer-facing or shared material
- Repeatable launch is manual, single-roofer-at-a-time only. Does not imply or authorize production multi-tenant scale, production data writes, contractor portal access, auth/RLS/security implementation, or live automation.
- No ad-hoc scaling before production security and tenant isolation are approved.
- References WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md (language) and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md (tenant isolation checkpoint) at every gate.
- References WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md and ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md
- No live automation, no production multi-tenant, no contractor portal, no auth/RLS changes
- second-roofer repeatability does not imply production multi-tenant scale, production data writes, contractor portal access, auth/RLS/security implementation, or live automation
- All second-roofer work uses only the approved public language in customer-facing sections: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract.

Internal founder/operator/manual/dry-run language (including "founder review", "manual review", "manual coordination", "Live Automation Disabled" notes, rehearsal notes) is permitted only inside explicitly labeled internal-only dry-run execution instructions, blocker registers, and trackers. It must never appear in customer-facing artifacts or shared handoff notes.

## 20. Public-vs-internal language boundary

**Customer-facing / public language must use only the approved strings listed in section 6 and the purpose. Customer-facing language must not use founder-led/manual babysitting/public founder-review framing.**

Allowed customer-facing / public strings (exact match required where used):
- RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- An automated email is sent 2 days before the first monthly payment.
- Cancel anytime. No long-term contract.

Internal founder/operator/manual review language ("Founder-Led Launch Program", "founder review", "manual review", "manual coordination", "Live Automation Disabled", dry-run rehearsal details, internal blocker rationale, operator session notes) is permitted only inside explicitly labeled internal-only sections of this kit and in local founder/operator notes. Every artifact containing such language must state it is internal-only / dry-run / founder-operator-only and NOT public positioning, NOT for sales copy, NOT for customer materials, and NOT to be copied into website/index.html or outward-facing scripts.

Explicitly Labeled Internal-Only Sections in This Kit:
- All of sections 1, 2, 3, 4, 5 (partial), 7-18, 19, 20 internal notes.
- All 9 trackers and the blocker register.
- The repeatable launch handoff artifact (local only).
- Any rehearsal scripts or internal decision logs.
- internal-only / dry-run / founder-operator-only language is permitted only inside clearly labeled internal sections

The Website Trial Direction Regression packet and its verifier enforce the boundary on public-facing files while permitting (and not policing) internal-only language inside safety artifacts like this kit (provided the boundary is stated).

Any regression of public language into customer-facing notes or shared artifacts fails the Offer Language Confirmation Tracker and the second-roofer launch gate.

## 9 Copy-Paste-Ready Manual Tracker Tables

Copy the tables below into a local spreadsheet, notes doc, or whiteboard. Do not store production data. All fields: Owner (founder/Jason or specific operator), Status (PASS/HOLD/BLOCKED/OPEN/IN PROGRESS/RESOLVED/CONFIRMED/READY/ROOFER-APPROVED/NOT-CONSENTED/QUALIFIED/etc.), Evidence (local ref, quote, date, link to screenshot/note, first-paid kit section ref), Next Action (concrete step + due date).

### Second Roofer Qualification Tracker

| Qualification Item | Description / First-Paid Pattern Ref | Second Roofer Evidence (sanitized) | Owner | Status | Evidence | Next Action |
|--------------------|--------------------------------------|------------------------------------|-------|--------|----------|-------------|
| Business legitimacy | Real roofing ops, contactable | | | | | |
| Lead volume / pipeline fit | Realistic for fast response + automated follow-up + missed-lead recovery | | | | | |
| Value prop alignment | Accepts Guided Setup first + 14-day trial after setup live + automated email 2d before payment + cancel anytime + no long-term contract | | | | | |
| No guarantee / forbidden language expectation | No "guaranteed appointments", "book jobs", "automatic quote", etc. | | | | | |
| Willingness to follow full sequence | Guided Setup → Go-Live → Trial Day One → Reporting → Conversion → First-Month → Monthly → Proof/Referral | | | | | |
| No production pressure | Timeline does not require live SMS / Vapi / writes / portal / auth changes | | | | | |
| Referral / source clarity | Documented non-pressured source | | | | | |
| Data protection / tenant boundary ack | Single-tenant manual only; no multi-tenant expectation | | | | | |
| Offer language acceptance | Candidate received/acked exact approved public strings | | | | | |
| Internal risk review | Fit / cancellation / trust risks from first-paid patterns | | | | | |

### Referral Source Intake Tracker

| Date | Source Type (First-Paid Referral / Self / Other) | Business / Contact (sanitized) | Stated Pain + Goals (approved language only) | Intake Notes / Forbidden Scan | Owner | Status | Evidence | Next Action |
|------|--------------------------------------------------|--------------------------------|----------------------------------------------|-------------------------------|-------|--------|----------|-------------|
| | | | | | | | | |
| | | | | | | | | |

### Offer Language Confirmation Tracker

| Item | Approved String (must match exactly) | Location / Artifact (local) | Forbidden Scan Passed? | Owner | Status | Evidence | Next Action |
|------|--------------------------------------|-----------------------------|------------------------|-------|--------|----------|-------------|
| Core value | RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery | | | | | | |
| Guided Setup | Guided Setup happens first | | | | | | |
| Trial start | The 14-day trial begins after RoofLeadHQ AI setup goes live | | | | | | |
| Pre-payment email | An automated email is sent 2 days before the first monthly payment | | | | | | |
| Cancel / contract | Cancel anytime. No long-term contract | | | | | | |
| Full scan | All customer-facing notes / calls / handoffs use only approved; no forbidden phrases | | | | | | |

### Guided Setup Reuse Tracker

| Step | First-Paid Pattern Ref (Guided Setup Execution Kit section) | Second Roofer Execution Evidence | Differences / Safe Adaptations | Owner | Status | Evidence | Next Action |
|------|-------------------------------------------------------------|----------------------------------|-------------------------------|-------|--------|----------|-------------|
| Business profile worksheet | | | | | | | |
| Lead source setup | | | | | | | |
| Response/follow-up preferences | | | | | | | |
| Booking/calendar preferences | | | | | | | |
| Reporting preferences | | | | | | | |
| Setup risk/blocker register | | | | | | | |
| Go-live readiness snapshot produced | | | | | | | |
| Full Guided Setup reuse PASS | | | | | | | |

### Go-Live Readiness Reuse Tracker

| Precondition | First-Paid Pattern Ref (Go-Live Readiness Execution Kit) | Second Roofer Evidence | Owner | Status | Evidence | Next Action |
|--------------|----------------------------------------------------------|------------------------|-------|--------|----------|-------------|
| Preferences locked (dry-run) | | | | | | |
| Lead sources confirmed | | | | | | |
| Response/follow-up configured (notes) | | | | | | |
| Reporting expectations captured | | | | | | |
| Blockers cleared or HOLD/BLOCKED | | | | | | |
| Tenant isolation boundary re-confirmed | | | | | | |
| Full go-live reuse PASS | | | | | | |

### Trial Operations Reuse Tracker

| Phase | First-Paid Pattern Ref | Second Roofer Execution / Snapshot | Owner | Status | Evidence | Next Action |
|-------|------------------------|------------------------------------|-------|--------|----------|-------------|
| Trial Day One (command center, first lead, monitoring, missed-lead, blocker register, handoff) | FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md | | | | | |
| Trial Reporting + Success Review (rhythm, scorecard, pre-payment email, success review script, gate) | FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md | | | | | |
| Trial Conversion / Payment Handoff (closeout, approval log, payment readiness, first-month expectations, handoff) | FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md | | | | | |
| Full trial operations reuse PASS | Combined | | | | | |

### First-Month Monthly Handoff Tracker

| Phase | First-Paid Pattern Ref | Second Roofer Execution / Snapshot | Owner | Status | Evidence | Next Action |
|-------|------------------------|------------------------------------|-------|--------|----------|-------------|
| First-Month Operating (kickoff, rhythms, value reports, feedback, risk review, escalation, success review, handoff, gate) | FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md | | | | | |
| Monthly Retention (status, trends, performance, value report, feedback, retention-risk, support boundary, next-month plan, success review, handoff, gate) | FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md | | | | | |
| Full first-month + monthly reuse PASS | Combined | | | | | |

### Multi-Roofer Safety Boundary Tracker

| Boundary Item | Confirmation Statement | Data Protection / Tenant Isolation Packet Ref + Date | First-Paid Pattern Cross-Ref | Owner | Status | Evidence | Next Action |
|---------------|------------------------|--------------------------------------------------------|------------------------------|-------|--------|----------|-------------|
| Manual single-roofer-at-a-time only | Repeatable launch is manual, single-roofer-at-a-time only | | Proof / Referral / Expansion + Launch System | | | | |
| No production multi-tenant scale | Does not imply or authorize production multi-tenant scale | | All reuse kits + Data Protection packet | | | | |
| No production data writes | Does not imply or authorize production data writes | | | | | | |
| No contractor portal access | Does not imply or authorize contractor portal access | | | | | | |
| No auth/RLS/security implementation | Does not imply or authorize auth/RLS/security implementation | | | | | | |
| No live automation | Does not imply or authorize live automation | | | | | | |
| No ad-hoc scaling | Prevent ad-hoc scaling before production security and tenant isolation approved | | | | | | |
| Full multi-roofer safety boundary PASS | All items confirmed; no violations | | | | | | |

### Second Roofer Launch Gate Tracker

| Gate Date | Qualification Status | All Reuse Checklists Status | Language Confirmation Status | Safety Boundary Status | Blocker Register Status | Handoff Artifact Complete? | Decision (PASS / HOLD / BLOCKED) | Justification + Evidence Refs | Owner | Next Action |
|-----------|----------------------|-----------------------------|------------------------------|------------------------|-------------------------|----------------------------|----------------------------------|-------------------------------|-------|-------------|
| | | | | | | | | | | |
| | | | | | | | | | | |

---

**End of SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md**

All content above is concrete, operational, product-moving, and confined to dry-run/internal-only/founder-operator-only use. No production activation. No live SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public routes, auth/RLS/security implementation, contractor portal, payment automation, estimate/quote/invoice automation, external service calls, credentials, secrets, env changes, migration files, or backend-or-src changes. Repeatable launch for a second paid roofer is manual, single-roofer-at-a-time only and does not imply or authorize production multi-tenant scale, data writes, portal, auth/RLS/security, or live automation. Prevent ad-hoc scaling before production security and tenant isolation are approved. All customer-facing uses approved language only: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract. Verifier will enforce all requirements. Canonical source of truth before this worktree verified at 90ca45f test(pilot): add first paid roofer proof referral expansion kit.
