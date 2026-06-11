# WEBSITE_POSITIONING_RECOVERY_PACKET

Date: 2026 (worktree agent/website-positioning-recovery)
Canonical source-of-truth commit: 029ed81 test(website): place homepage growth tier screenshots
This revision: test(website): recover rooflead ai positioning

## Why the public positioning was corrected
The public website had drifted into heavy "Founder-Led Launch Program" language that implied ongoing founder/operator babysitting, manual lead monitoring, manual coordination, founder review, operator review, and review queues as the normal operating model. This did not match the intended clear RoofLeadHQ positioning:

- RoofLeadHQ AI helps roofers turn more inbound roofing leads into booked inspections.
- The niche is lead-to-calendar conversion: fast response, automated follow-up, missed-lead recovery, qualification, and getting qualified homeowners onto the roofer’s inspection calendar.
- The offer must feel simple, clear, and scalable: Start setup, complete Guided Setup (onboarding/configuration only), go live, 14-day trial starts, automated pre-billing check-in email, monthly billing begins on day 15 unless canceled.
- Public copy must not imply ongoing manual founder/operator work as the core value.

Hard constraints observed: Website/copy/docs/read-only verifier changes only. No PNG modification. Growth Tier screenshots (dashboard-sample.png, weekly-report-sample.png, monthly-report-sample.png) preserved exactly.
Growth Tier screenshots preserved exactly No backend/src routes, no migrations/schema/auth/secrets, no external service calls, no production activation, no live SMS/Twilio/Vapi/etc. Safety posture preserved internally (demo-ready/live automation disabled).

## New public sales spine
- H1: “Turn More Roofing Leads Into Booked Inspections.”
- Supporting: RoofLeadHQ AI as the mechanism for fast response + automated follow-up + missed lead recovery + qualification + moving qualified homeowners to the inspection calendar, without adding admin work.
- Core insight (prominent): “You do not always need more leads. You need to stop losing the ones you already paid for.”
- CTAs: Primary “Start Your RoofLeadHQ Setup”; alternatives “Start Guided Setup”, “See If RoofLeadHQ Fits”.
- “Guided Setup” = onboarding/configuration by an onboarding specialist (lead sources, service area, qualification questions, follow-up preferences, calendar workflow, reporting). Not ongoing monitoring.
- Post go-live: “RoofLeadHQ AI handles the repetitive response and follow-up workflow. Your team focuses on inspections, estimates, and closing.”
- Roofer input mentioned only for exceptions/judgment/sales decisions.

## 14-day trial model
- “14-day trial” (not “14-day launch trial”).
- “Your 14-day trial begins after your RoofLeadHQ AI setup goes live. Monthly billing starts on day 15 unless you cancel before then.”
- Automated pre-billing check-in: “Before billing begins, RoofLeadHQ sends an automated check-in email so you can review how the system is working.”
- No 30-day money-back, no “first month guaranteed free” claims, no refundable setup fee claims in this build.
- Pricing sections updated to describe Guided Setup + AI handling, with clear trial language.

## Guided Setup meaning
Guided Setup is the onboarding/configuration step only. An onboarding specialist configures RoofLeadHQ AI for the roofer’s specific lead sources, service area, qualification questions, follow-up preferences, calendar workflow, and reporting. After go-live the system operates with RoofLeadHQ AI handling repetitive lead-response work. No public language of ongoing founder/operator babysitting, manual lead monitoring, or review queues as the delivered service.

## No ongoing founder/operator lead babysitting
All public copy using “Founder-Led Launch Program”, “Request Founder-Led Launch Review”, “manual coordination”, “manual founder review”, “manual operator review”, “founder review”, “operator review”, “manual review queue”, or “Live Automation Disabled” was removed from the public homepage. Internal docs, demo assets, and verifiers retain appropriate safety markers. Public copy now emphasizes the AI system doing the work after a clean Guided Setup + 14-day trial.

## No production behavior changes
no production behavior changes
No production behavior changes
no production behavior changes
- No backend/src routes/controllers/services touched.
- no backend/src routes
- No migrations, schema, auth, secrets, env, or access-control changes.
- no migration/schema/auth/secrets
- no live activation/no production behavior/no writes/no integrations/no auth/schema/security implementation
- No external service call strings added.
- No SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher activation.
- No Supabase reads/writes in production path.
- Live automation remains disabled unless explicitly approved (existing internal safety posture unchanged).
- Public copy may reference RoofLeadHQ AI, automated follow-up, fast response, qualified homeowners onto calendar, and 14-day trial — but must not claim guaranteed appointment counts, guaranteed jobs, guaranteed revenue, or fully activated live production behavior.

## Verification commands (run inside worktree)
```bash
node --check backend/scripts/verify-website-positioning-recovery-readonly.js
node backend/scripts/verify-website-positioning-recovery-readonly.js
scripts/run-website-positioning-recovery-dry-run.sh
node backend/scripts/verify-website-homepage-screenshot-placement-readonly.js
node backend/scripts/verify-website-demo-screenshot-assets-readonly.js
node backend/scripts/verify-website-founder-led-launch-copy-readonly.js
node backend/scripts/verify-website-founder-led-conversion-polish-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
scripts/show-diff-proof.sh
```

Full aggregate:
```bash
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
```

## Wiring (per established repo pattern)
The new positioning recovery packet/verifier/wrapper is wired into:
- backend/scripts/verify-first-paid-pilot-readiness-readonly.js (new command entry)
- docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md
- docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md

Existing website verifiers (launch-copy, conversion-polish, homepage-screenshot-placement) were updated only as necessary to accept the new public positioning (Guided Setup / RoofLeadHQ AI / 14-day trial) instead of requiring old founder-led phrases, while preserving all safety checks against guarantees, jobs/revenue claims, live automation language, production behavior, and forbidden manual/founder/operator public language.

## Files changed/added for this build
- website/index.html (public copy overhaul to new positioning; 3 Growth Tier PNG references and alt text preserved exactly; all forbidden public phrases removed)
- docs/WEBSITE_POSITIONING_RECOVERY_PACKET.md (this file)
- backend/scripts/verify-website-positioning-recovery-readonly.js (new read-only verifier)
- scripts/run-website-positioning-recovery-dry-run.sh (new wrapper)
- Updated per pattern: the two prior website copy verifiers, screenshot placement verifier, aggregate readiness, verifier index, next-chat packages, business buildout daily guide, and workflow context.

## Summary
Public positioning recovered to the clear, concise, benefit-focused, roofer-facing RoofLeadHQ AI model: fast automated response and follow-up on the leads they already paid for, Guided Setup (onboarding/config only), 14-day trial with automated check-in, monthly billing day 15 unless canceled. Growth Tier screenshots preserved. All hard constraints and safety posture observed. Website/static copy + docs + read-only verifiers only. All verification gates and diff proof required before commit. Worktree-only. Do not push.
