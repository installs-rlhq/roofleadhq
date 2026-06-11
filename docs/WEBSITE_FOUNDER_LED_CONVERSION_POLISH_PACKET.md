# WEBSITE_FOUNDER_LED_CONVERSION_POLISH_PACKET

Date: 2026-06 (worktree agent/website-founder-led-conversion-polish)
Canonical source-of-truth commit: a10c0d4 test(website): add founder-led launch copy cleanup

## Purpose
Polish the public RoofLeadHQ homepage copy after the founder-led launch safety cleanup. Make the site sound more natural, credible, and conversion-oriented for first paid roofer outreach while preserving all safety/verifier protections and founder-led/manual-review-backed/manual-coordination positioning. No live behaviors or production implications added.

This is a website/copy/docs/read-only verifier change only.

## Safety Posture (Hard Constraints — No Violations)
- Website/copy/docs/read-only verifier changes only.
- Primary file: website/index.html.
- No addition or activation of live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher behavior.
- No public route activation, production Supabase writes, production credentials, auth changes, database policy changes, migrations, secrets handling changes, access-control implementation.
- No customer/contractor/homeowner notifications, automated booking, estimate creation, quote generation, invoice/payment behavior, or external service calls.
- Do not imply live production workflows are active.
- Do not imply fully automated operations are active.
- Positioning remains founder-led, manual-review-backed, and manually coordinated at all times during launch.

**Explicit markers (must be present in website/index.html):**
- Founder-Led Launch Program
- book inspections
- book appointments
- manual founder/operator review
- manual coordination
- Request Founder-Led Launch Review
- See if RoofLeadHQ is a fit

## What Changed — Public Website Positioning Polish (website/index.html)
- Kept all required safe phrases present.
- Replaced awkward/repetitive phrasing:
  - “fast response support” → “faster first response” (and “Faster First Response” card header).
  - Reduced excessive adjacent repetition of “manual founder/operator review” (kept phrase present for safety in key locations: meta, JSON-LD, steps, phone record, etc.).
  - “prepared under manual coordination” replaced where unnatural with lighter “prepared for ... review”, “prepared with founder/operator review”, “prepared via coordination”.
  - “more serious homeowners moved toward booked inspections” → “More serious homeowners moved toward inspection-ready conversations.”
  - “Turn Outside Leads Into Follow-Up Sequences” → “Keep Outside Leads From Going Cold.”
  - “Calls Answered When You Cannot Pick Up” → “Phone Leads Captured for Review.”
  - “Why Roofers Trust RoofLeadHQ” → “Built for Roofing Lead Response.”
  - “First-Month Confidence Commitment” → “First-Month Launch Review.”
  - Popup aria-label “Book a Founder-Led Setup Call form” → “Request Founder-Led Launch Review form.”
  - Footer “Appointment Booking” → “Inspection Coordination.”
- Hero improved for clarity: plainly states RoofLeadHQ helps roofers respond faster, organize inbound homeowner leads, qualify next steps, and coordinate inspection opportunities through founder-led manual review during the Founder-Led Launch Program. Primary CTA remains “Request Founder-Led Launch Review.”
- FAQ clarified launch state naturally (founder-led/manual-review-backed, live activation only after explicit approval/readiness) without sounding defensive and with reduced “manual” repetition in adjacent items.
- Minor supporting text smoothed in phone leads, manual outreach, how-it-works intro, founder-led program section, first-month box, why-trust box, screenshots, pricing lists, and comparison for natural flow.
- All changes keep “Founder-Led Launch Program” prominent and preserve absence of risky phrases previously enforced.

## Safe Phrases Preserved / Required
All required safe phrases remain present in website/index.html (verified by new polish verifier + existing launch copy verifier).

## Polish-Specific Phrases Now Absent (Enforced by New Verifier)
The following are absent from website/index.html:
- Book a Founder-Led Setup Call form
- Appointment Booking
- Calls Answered When You Cannot Pick Up
- Turn Outside Leads Into Follow-Up Sequences
- Why Roofers Trust RoofLeadHQ
- First-Month Confidence Commitment
- fast response support
- prepared under manual coordination

(Plus the prior forbidden list from launch cleanup verifier continues to be respected.)

## No Live Activation / No Production Behavior / No Writes / No Integrations / No Auth/Schema/Security Implementation
- This packet + new dedicated polish verifier + wrapper are read-only website/copy safety artifacts.
- no live activation/no production behavior/no writes/no integrations/no auth/schema/security implementation
- no backend/src routes, controllers, or services were modified.
- no migration/schema/auth/secrets or .env files were modified.
- No Supabase writes, external service calls, or live automation activation.
- The website itself remains a static marketing site. No production behavior change.

## Verification Commands (Run Inside Worktree Before Commit)
```bash
node --check backend/scripts/verify-website-founder-led-launch-copy-readonly.js
node backend/scripts/verify-website-founder-led-launch-copy-readonly.js
node --check backend/scripts/verify-website-founder-led-conversion-polish-readonly.js
node backend/scripts/verify-website-founder-led-conversion-polish-readonly.js
scripts/run-website-founder-led-launch-copy-dry-run.sh
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
scripts/show-diff-proof.sh
```

Full aggregate (includes prior + this):
```bash
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
```

## Files Added / Changed in This Packet
- website/index.html (public copy polish only)
- docs/WEBSITE_FOUNDER_LED_CONVERSION_POLISH_PACKET.md (this file)
- backend/scripts/verify-website-founder-led-conversion-polish-readonly.js (new read-only verifier)
- scripts/run-website-founder-led-conversion-polish-dry-run.sh (new dry-run wrapper)
- backend/scripts/verify-first-paid-pilot-readiness-readonly.js (wired)
- docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md (updated)
- docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md
- docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md

## Commit
test(website): polish founder-led launch conversion copy

Do not push.

All changes are website/copy/docs/read-only verifier only. Public site now sounds more natural and conversion-oriented while remaining strictly founder-led, manual-review-backed, and manually coordinated for first paid roofer outreach.
