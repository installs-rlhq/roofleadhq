# WEBSITE_HOMEPAGE_SCREENSHOT_PLACEMENT_PACKET

Date: 2026-06 (worktree agent/website-homepage-screenshot-placement)
Canonical source-of-truth commit: 3fec17f Add files via upload
This revision: test(website): place homepage growth tier screenshots

## Purpose
Place the final Growth Tier screenshot assets into the public homepage so the website’s dashboard/reporting section (Inside RoofLeadHQ screenshots area) shows the actual final screenshots instead of placeholders or older demo references.

- `website/dashboard-sample.png`
- `website/weekly-report-sample.png`
- `website/monthly-report-sample.png`

These are used directly (no rename/move) in website/index.html for the three reporting/dashboard cards in both desktop grid and mobile carousel. Headings aligned to "Dashboard", "Weekly Reports", "Monthly Reports" (or close equivalents already present). Alt text uses the exact required: "Sample Growth Tier dashboard preview", "Sample Growth Tier weekly report preview", "Sample Growth Tier monthly report preview".

Existing Founder-Led Launch Program public copy, CTAs, safety framing, and conversion polish preserved. Layout kept visually clean; no bulky new text blocks added.

This is a website/copy/static-asset/reference + docs/read-only verifier change only.
Static website-only changes. Website-only public homepage screenshot placement.

## Safety Posture (Hard Constraints — No Violations)
- Website/copy/static-asset/reference changes only.
- Use the uploaded screenshots exactly as they already exist in website/ (dashboard-sample.png, weekly-report-sample.png, monthly-report-sample.png).
- No live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher behavior.
- No production Supabase reads/writes.
- No auth changes, database policy changes, migrations, schema changes, secrets handling changes, or access-control implementation.
- No backend/src routes/controllers/services changes.
- No external service calls.
- No production behavior activation.
- Do not modify the PNG image contents.
- Preserve the existing Founder-Led Launch Program public copy and conversion improvements.
- Keep layout visually clean; no bulky new text blocks.

## Files Updated
- `website/index.html` — replaced relevant placeholder/prior demo image references (demo-weekly-report.webp, screenshot-homeowner-confirmation.png, screenshot-roofer-alert.png instances in the dashboard/reporting cards) in the INSIDE ROOFLEADHQ SCREENSHOTS section (desktop 3-col grid + mobile horizontal scroll) with the three final PNGs; updated headings to align with Dashboard / Weekly Reports / Monthly Reports; set required alt texts; no other sections or copy altered.
- `docs/WEBSITE_HOMEPAGE_SCREENSHOT_PLACEMENT_PACKET.md` (this file)
- `backend/scripts/verify-website-homepage-screenshot-placement-readonly.js` (new read-only verifier enforcing the 7 confirms + wiring checks + no-forbidden-changes + PASS summary)
- `scripts/run-website-homepage-screenshot-placement-dry-run.sh` (new wrapper)
- Updated for wiring (per established repo pattern for website packets): `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`, `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md`, `docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md`, `docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md`

## No Backend / Schema / Auth / Secrets / External / Production Changes
- Verifier asserts no backend/src routes, controllers, or services were modified.
- Verifier asserts no migration/schema/auth/secrets/env files were modified.
- Verifier asserts no external service call strings were added in this build.
- All changes confined to website/ (static assets + index.html), docs/, backend/scripts/ (read-only verifier), scripts/ (wrapper).
- No customer/contractor/homeowner notifications, no automated anything, no live services, no production activation.

## Verification Commands (Run Inside Worktree)
```bash
node --check backend/scripts/verify-website-homepage-screenshot-placement-readonly.js
node backend/scripts/verify-website-homepage-screenshot-placement-readonly.js
scripts/run-website-homepage-screenshot-placement-dry-run.sh
node backend/scripts/verify-website-demo-screenshot-assets-readonly.js
node backend/scripts/verify-website-founder-led-launch-copy-readonly.js
node backend/scripts/verify-website-founder-led-conversion-polish-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
scripts/show-diff-proof.sh
```

Full aggregate (includes this and prior):
```bash
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
```

## Wiring (Consistent with Prior Website Packets)
The new homepage screenshot placement packet/verifier/wrapper is wired into the aggregate first-paid pilot readiness verifier, the FIRST_PAID_LAUNCH_VERIFIER_INDEX.md, the three NEXT_CHAT_CONTEXT_PACKAGE_*.md files, the AGENT_GROK_BUILD_WORKFLOW.md, and the BUSINESS_BUILDOUT_DAILY_GUIDE.md exactly as the prior website demo assets, launch copy, and conversion polish packets were wired.

Pre-commit also runs the prior website verifiers + quality gate for combined baseline.

All worktree-only. Do not push.

## Summary
Final homepage now displays the actual uploaded Growth Tier screenshots for Dashboard, Weekly Reports, and Monthly Reports in the public product showcase section with clean labels and required alt text. All hard constraints observed. Ready for review via the listed verifications and diff proof.
website/copy/static-asset/reference changes only. No backend/src or schema/auth/secrets changes.
