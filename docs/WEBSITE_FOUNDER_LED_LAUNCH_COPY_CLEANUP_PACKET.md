# WEBSITE_FOUNDER_LED_LAUNCH_COPY_CLEANUP_PACKET

Date: 2026-06 (worktree agent/website-founder-led-launch-cleanup)
Canonical source-of-truth commit: b53472f test(pilot): add first roofer founder review queue command packet

## Purpose
Clean up the public RoofLeadHQ website copy, positioning, flow, and conversion path around the Founder-Led Launch Program so it is safer and ready to support first paid roofer outreach without overclaiming or implying production automation.

This is a website/copy/docs/read-only verifier change only.

## Safety Posture (Hard Constraints — No Violations)
- Website/copy/docs/read-only verifier changes only.
- No addition or activation of live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher behavior.
- No public route activation, production Supabase writes, production credentials, auth changes, database policy changes, migrations, secrets handling changes, access-control implementation.
- No customer notifications, contractor notifications, homeowner notifications, automated booking, estimate creation, pricing-proposal generation, billing or remittance behavior, or external service calls.
- Do not imply live production workflows are active.
- Do not imply fully automated operations are active.
- Positioning remains founder-led, manual-review-backed, and manually coordinated at all times during launch.

**Explicit markers (must be present in related docs and enforced by verifier):**
- Founder-Led Launch Program
- book inspections
- book appointments
- manual founder/operator review
- manual coordination
- Live workflow activation only after explicit approval/readiness
- No automated booking during launch
- Estimate created: no
- Pricing-proposal generation: no
- Billing or remittance behavior: no
- Production system touched: no
- Auth changed: no
- Database schema changed: no
- RLS policy changed: no
- Secrets changed: no
- No live SMS/Twilio/Vapi/Calendar/Resend/Lindy
- No public route activation
- No production Supabase writes
- No external service calls
- Dry-run / internal-only / founder-operator-only for any related rehearsal

## What Changed — Public Website Positioning (website/index.html)
- Repositioned RoofLeadHQ as a founder-led lead response and inspection coordination workflow for roofers.
- All primary framing uses “Founder-Led Launch Program.”
- Language emphasizes: faster response, cleaner lead intake, qualification support, review queue, careful handoff, inspection/appointment coordination, manual founder/operator review, manual coordination.
- CTA language made lower-friction and safer:
  - “Request Founder-Led Launch Review”
  - “See if RoofLeadHQ is a fit”
  - “Talk with the founder”
  - “Start with a manual setup review”
- Nav, hero, buttons, pricing cards, final CTA, mobile sticky, and floating elements updated to safer CTAs.
- Meta description, OG tags, JSON-LD schema, and FAQ structured data updated for accurate founder-led/manual positioning.
- Removed or replaced:
  - Automated “we answer calls/texts/forms/emails” claims unless clearly framed as planned or manual-review-backed.
  - Auto follow-up phrasing and auto- claims.
  - Auto book-inbound leads phrasing and system-after-setup phrasing.
  - Outcome-assurance / credit / waive-remittance promise language (replaced with manual coordination review discussion language).
  - Quota-style production-readiness implications.
  - Booked-lead notification claims, direct appointment booking claims, direct calendar booking claims, qualified-appointment direct-schedule claims, instant notification claims, calendar auto-booking claims.
  - Billing / remittance / pricing-proposal / estimate creation language entirely avoided in public copy.
  - Broad “trusted by roofers across the U.S.” replaced with launch-stage manual review framing.
  - “go-live” qualified as future explicit approval/readiness stage only.
- Refined FAQ to explain what is available now (manual review, coordination, founder-led setup) versus what is planned later (potential live activation after approval).
- Added/reinforced safety/trust copy: Founder-Led Launch Program is manually reviewed during launch; live workflow activation only happens after explicit approval/readiness.

## Safe CTA Changes
Primary CTAs across the site now use the safer set:
- Request Founder-Led Launch Review
- See if RoofLeadHQ is a fit
- Talk with the founder / Start with a manual setup review

## Manual Review / Manual Coordination Framing
- “How It Works” reframed as manual review queue + manual coordination steps.
- Founder-Led Launch Program section emphasizes manual review queue, manual coordination support, founder/operator review when attention needed.
- Screenshots, comparison, pricing details, FAQ, and final CTA all use manual/founder-operator language.
- No claims that the system books, follows up, or activates in an auto-acting manner during launch.

## Forbidden Business Language Avoidance (Enforced)
The following are absent from website/index.html and any public positioning docs changed in this build:
- auto follow-up phrasing
- auto-acting claims (in automation-promise contexts)
- outcome-assurance style promises (removed from promises; protective wording also adjusted)
- credit-next-month / waive-first-remittance language
- system-after-setup phrasing
- direct real-appointment booking claims / books-the-appointment-for-you claims
- appointment-lands-on-calendar claims
- qualified-appointments-placed-directly-on-schedule claims
- instant notification claims
- calendar auto-booking claims
- billing / remittance language
- remittance language
- pricing-proposal language
- (Additional context: no “go-live” without qualification, no broad unproven “trusted across the U.S.” claims)

## No Live Activation / No Production Behavior / No Writes / No Integrations / No Auth/Schema/Security Implementation
- This packet + associated verifier + wrapper are read-only website/copy safety artifacts.
- no live activation/no production behavior/no writes/no integrations/no auth/schema/security implementation
- no backend/src routes, controllers, or services were modified.
- no migration/schema/auth/secrets or .env files were modified.
- No Supabase writes, external service calls, or live automation activation.
- The website itself remains a static marketing site (Vercel). No production behavior change.

## Verification Commands (Run Inside Worktree Before Commit)
```bash
node --check backend/scripts/verify-website-founder-led-launch-copy-readonly.js
node backend/scripts/verify-website-founder-led-launch-copy-readonly.js
scripts/run-website-founder-led-launch-copy-dry-run.sh
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
scripts/show-diff-proof.sh
```

Full aggregate (includes this verifier after wiring):
```bash
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
```

## Files Added / Changed in This Packet
- website/index.html (public copy cleanup only)
- docs/WEBSITE_FOUNDER_LED_LAUNCH_COPY_CLEANUP_PACKET.md (this file)
- backend/scripts/verify-website-founder-led-launch-copy-readonly.js (new read-only verifier)
- scripts/run-website-founder-led-launch-copy-dry-run.sh (new dry-run wrapper)
- backend/scripts/verify-first-paid-pilot-readiness-readonly.js (wired, consistent with pattern)
- docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md (updated for coverage)
- docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md
- docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md
- (Optional per pattern: README.md, prompts/email/onboarding/welcome.html — reviewed; no unsafe launch wording requiring removal was present)

## Commit
test(website): add founder-led launch copy cleanup

Do not push.

All changes are website/copy/docs/read-only verifier only. Ready for first paid roofer outreach under strict manual founder-led constraints.
