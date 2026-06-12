# WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET

Date: 2026 (worktree agent/website-trial-direction-regression)
This revision: test(website): add website trial direction regression packet (read-only audit + guard)

## Goal
Audit and protect the revised public direction:
- RoofLeadHQ AI turns roofing leads into booked inspections / booked homeowner appointments.
- Guided Setup happens first.
- The 14-day trial begins after RoofLeadHQ AI setup goes live.
- The user receives an automated email 2 days before the first monthly payment.
- First monthly payment happens after the trial.
- Cancel anytime.
- No long-term contract.
- Public website should not position this as Founder-Led Launch Program or ongoing founder/manual babysitting.

Keep all work website/docs/verifier-only and read-only safe. Do not activate live sends, CRM, SMS, Vapi, Calendar, Resend, Lindy, cron, production Supabase writes, routes, payment automation, auth/RLS/security, contractor portal, or production workflows.

## Revised Public Direction (Source of Truth for Public Website / Sales-Facing Copy)
Public website (website/index.html), meta/og/structured data, FAQ, pricing, hero, CTAs, demo assets surfaced on public site (website/demo/*.html used in screenshots), and any sales/prospect/customer-facing copy must use only:
- RoofLeadHQ AI (or equivalent) turns roofing leads into booked inspections / booked homeowner appointments.
- Guided Setup (onboarding and configuration by specialist; config only).
- 14-day trial begins after RoofLeadHQ AI setup goes live.
- Automated email sent 2 days before the first monthly payment.
- First monthly payment after the trial.
- Cancel anytime. No long-term contract.
- Simple monthly plans after trial. No setup fee phrasing that implies day-15 billing without the trial framing.
- No guarantees on appointments, jobs, revenue.
- No "automatic estimate / quote / invoice / payment".
- No "book jobs", "booked jobs", "guaranteed appointments/revenue/jobs".
- No "seven-day pilot", "5 qualified appointments in 7 days", "14-day launch trial".
- No "Monthly billing starts on day 15", "Monthly billing on day 15".
- No public "Founder-Led Launch Program", "Request Founder-Led Launch Review", "founder review", "manual review", "manual coordination", "Live Automation Disabled", or any implication of ongoing founder/manual babysitting or manual review queue as the public offer.

## Public vs Internal Boundary (Clarified)
- public website/sales-facing copy from internal safety docs: Public website/sales-facing copy, public demo screenshots on the site, prospect/customer communications, marketing: MUST use ONLY the revised AI + Guided Setup first + 14-day trial + automated 2-day pre-billing email + cancel anytime + no long-term contract positioning. This is the customer promise and what the public site advertises.
- Internal founder/operator/manual language (Founder-Led Launch Program references, manual review, founder review, review queue, manual coordination, Live Automation Disabled notes, internal rehearsal fixtures, command packets, dry-run workspaces, operator runbooks, session notes, approval checklists, etc.): STRICTLY INTERNAL-ONLY. These may (and must) remain in dry-run safety artifacts, internal docs, context packages, verifier index, daily guide, templates/fixtures for rehearsal, but EVERY such doc must explicitly state it is internal-only / dry-run / founder-operator-only and NOT for public positioning, sales copy, or customer materials.
- Context docs (NEXT_CHAT_*, ROOFLEADHQ_BUSINESS_*, FIRST_PAID_LAUNCH_VERIFIER_INDEX.md, this packet, etc.) must clearly restate the boundary so future agents do not regress public copy by copying internal language into website/index.html or sales packets.
- Historical packets (WEBSITE_FOUNDER_LED_*, etc.) are kept as record of prior safety steps; their "Founder-Led" language is historical/internal framing only and was removed from public before the revised direction stabilized.
- Verifier (this packet's) distinguishes: it asserts required revised trial/AI language present on website/index.html; asserts all listed forbidden phrases ABSENT from public-facing website files (index.html + demo/*.html); does not police internal-only docs for founder/manual language (those stay internal).
- The verifier and packet explicitly distinguish public website/sales-facing copy from internal safety docs (public surfaces locked to revised direction; internal founder/manual language permitted only inside labeled dry-run safety artifacts).

## Current Public Website Audit (website/index.html + demo assets)
- website/index.html: contains required revised direction (RoofLeadHQ AI + booked inspections / booked homeowner appointments, Guided Setup first, 14-day trial begins after setup goes live, automated email 2 days before first monthly payment, first payment after trial, "Cancel anytime", "No long-term contract"). No forbidden phrases present.
- website/demo/dashboard-sample.html, weekly-report-sample.html, monthly-report-sample.html: SAMPLE/DEMO labeled, no exact forbidden public phrases from the regression list (use of "coordination", "review", "Needs Attention" inside demo UI labels is acceptable as they describe sample dashboard state, not the offer positioning; demo content is explicitly marked illustrative/sample for marketing screenshots only).
- No patches required to public-facing files for this regression packet (current state already aligned after prior positioning recovery + copy/layout polish). This packet adds the dedicated regression guard to prevent future drift.
- demo.css: no visual label cleanup needed (SAMPLE banners, badges, and labels already present and sufficient).

## FIRST_PAID_* Packet Audit (Outward-Facing / Sales Copy)
- FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md, FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md: already contain the revised public language at the top ("Public/business language" sections use exactly RoofLeadHQ AI turns... booked homeowner appointments + Guided Setup (config only) + 14-day trial after go-live + automated email 2 days before first monthly payment + Cancel anytime + No long-term contract). Forbidden phrases appear only inside "Never say" / "Forbidden Public Phrases" lists and safety guardrails (internal notes). No outward-facing stale offer language (no day-15 billing as current, no guarantees as promise, no founder-led as public positioning). No patch required.
- Internal language in these packets (manual review capacity notes, founder review queue references, etc.) is explicitly scoped as internal-only/founder-operator-only for ops/safety.

## Verifier Requirements (Enforced)
The dedicated read-only verifier (backend/scripts/verify-website-trial-direction-regression-readonly.js) must:
- Pass only if website/index.html contains the revised 14-day trial direction (exact phrases for "14-day trial begins after ... setup goes live", "automated email 2 days before ... first monthly payment", "Cancel anytime", "No long-term contract", Guided Setup first + AI booking language).
- Pass only if website/index.html contains RoofLeadHQ AI and booked inspection / homeowner appointment positioning.
- Pass only if website/index.html contains automated email 2 days before first monthly payment.
- Fail if public-facing website files (website/index.html and the three website/demo/*.html) contain any of: Founder-Led Launch Program, Request Founder-Led Launch Review, founder review, manual review, manual coordination, Live Automation Disabled, Monthly billing starts on day 15, Monthly billing on day 15, 14-day launch trial, seven-day pilot, 5 qualified appointments in 7 days, book jobs, booked jobs, booked-job, guaranteed appointments, guaranteed revenue, guaranteed jobs, automatic estimate, automatic quote, automatic invoice, automatic payment.
- Distinguish public website/sales-facing copy from internal safety docs (enforce only on public-facing files for forbidden; require revised direction only on index.html).
- Internal founder/operator/manual language may remain in dry-run safety artifacts (no fail on internal docs for those phrases).
- internal founder/operator/manual language may remain in dry-run safety artifacts (verifier needle)
- Fail if wrapper (scripts/run-website-trial-direction-regression-dry-run.sh) is missing or not executable.
- Fail if wiring is missing (aggregate pilot readiness, verifier index, the three NEXT_CHAT_CONTEXT_PACKAGE_*.md, ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md, and boundary clarifications present).
- Be read-only: local file reads + git status/diff only; no Supabase, no external calls, no live services, no writes, no activation.

## Safety Posture
- Website/docs/verifier-only changes.
- No backend/src routes, controllers, services, or any production code paths modified.
- No migration/schema/auth/secrets/env changes.
- No PNG image content changes. dashboard-sample.png / weekly-report-sample.png / monthly-report-sample.png references preserved exactly.
- No external service call strings (fetch(, XMLHttpRequest, axios, supabase, twilio, resend, vapi, lindy).
- No live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher activation.
- No production Supabase reads/writes or data mutation.
- No auth/RLS/security, contractor portal, or payment automation.
- Demo-ready with live automation disabled posture preserved.
- Public copy uses only the revised safe direction; internal safety artifacts retain necessary founder/operator/manual framing with explicit internal-only labels.
- No production behavior or activation of any kind.

## Files Added/Changed (website/docs/verifier only)
- docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md (this packet)
- backend/scripts/verify-website-trial-direction-regression-readonly.js (new read-only verifier)
- scripts/run-website-trial-direction-regression-dry-run.sh (new executable wrapper)
- backend/scripts/verify-first-paid-pilot-readiness-readonly.js (wired: new command entry + description)
- docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md (new section + boundary clarification)
- docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md (entry + boundary clarification)
- docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md (entry + boundary clarification)
- docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md (entry + boundary clarification)
- docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md (milestone entry + boundary clarification)
- (No changes to website/index.html, website/demo/*, demo.css, or FIRST_PAID_ROOFER_* packets — no regressions found; current public state already compliant.)

## Verification Commands (Run in Order, Inside Worktree)
```bash
node --check backend/scripts/verify-website-trial-direction-regression-readonly.js
node backend/scripts/verify-website-trial-direction-regression-readonly.js
scripts/run-website-trial-direction-regression-dry-run.sh
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
```

Full aggregate (includes this + all prior):
```bash
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
```

## Wrapper Behavior
The dry-run wrapper must:
- Run node --check on the verifier.
- Run the dedicated verifier.
- Run prior website verifiers for combined baseline (positioning-recovery, homepage-screenshot-placement, demo-screenshot-assets, founder-led-launch-copy, founder-led-conversion-polish, copy-layout-polish).
- Run agent product quality gate verifier + check script.
- Print clear PASS summary.
- Remain executable (chmod +x).

## Wiring (per established repo pattern)
The new trial direction regression packet/verifier/wrapper is wired into:
- backend/scripts/verify-first-paid-pilot-readiness-readonly.js (new command entry describing the regression guard)
- docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md (new dedicated section + reference in website list)
- docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md
- docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md
- The wrapper references the new verifier + quality gate + prior website verifiers.
- The new verifier itself reads the aggregate, verifier index, all three next-chat contexts, daily guide, and asserts required strings + boundary clarifications are present.

Existing website verifiers remain in chain for defense-in-depth (regression guard builds on prior positioning/copy safety).

## Prior Website Safety Baseline (Chained)
This regression packet augments (does not replace):
- WEBSITE_POSITIONING_RECOVERY_PACKET
- WEBSITE_COPY_LAYOUT_POLISH_PACKET
- Prior founder-led cleanup/conversion (historical)
- Demo assets + screenshot placement (sample labeling preserved)

All continue to enforce absence of guarantees, auto-*, booked-jobs claims, old trial billing phrasing, etc. on public files. The new verifier adds explicit revised 14-day trial direction presence checks + stricter regression list matching the task goal.

## No Production Behavior Changes
- Website/static copy/docs/read-only verifier changes only (no public file patches needed in this step).
- Growth Tier screenshots preserved exactly.
- No backend/src routes
- No migration/schema/auth/secrets
- No external calls or production activation.
- Internal safety posture (demo-ready with live automation disabled) unchanged.
- Public direction protected from regression: AI + booked appointments on calendar after Guided Setup + clean 14-day trial + automated 2-day email + cancel/no-contract.
Website/copy/docs/verifier-only
website/docs/verifier-only
no production behavior changes
Growth Tier screenshots preserved exactly
no backend/src routes
no migration/schema/auth/secrets
no live activation/no production behavior/no writes/no integrations/no auth/schema/security implementation

All constraints observed. The public website direction is now explicitly guarded by a dedicated regression packet + verifier so future work cannot accidentally re-introduce founder-led babysitting, day-15 billing, guarantees, or booked-jobs claims into customer-facing surfaces.
