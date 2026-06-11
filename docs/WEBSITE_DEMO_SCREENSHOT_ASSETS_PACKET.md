# WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET

Date: 2026-06 (worktree agent/website-demo-screenshot-assets)
Canonical source-of-truth commit: e7e4690 test(website): polish founder-led launch conversion copy

## Purpose
Create static, screenshot-ready demo pages for the website’s Dashboard, Weekly Report, and Monthly Report sections using dummy/sample data only. These pages are marketing screenshot assets to visually demonstrate the style and structure of founder/operator-facing views during the Founder-Led Launch Program. They must remain completely static with no connection to live APIs, tokens, external services, or production behavior.

This is a website/demo/docs/read-only verifier change only. Website/demo/docs/read-only verifier changes only.

## Safety Posture (Hard Constraints — No Violations)
- Static website/demo screenshot assets only.
- No live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher behavior.
- No public route activation beyond static files under website/demo or website/screenshots.
- No production Supabase reads/writes.
- No production credentials, auth changes, database policy changes, migrations, schema changes, secrets handling changes, or access-control implementation.
- No customer/contractor/homeowner notifications.
- No automated booking, estimate creation, quote generation, invoice/payment behavior, or external service calls.
- Use Founder-Led Launch Program language.
- Use "book inspections / book appointments" only where appropriate.
- Use manual founder/operator review and manual coordination framing exclusively.
- Clearly label all demo content as sample/demo data.
- Avoid forbidden business language, guarantees, jobs-booked language, automatic booking language, estimate/quote/invoice/payment language, or production activation implications.

**Explicit markers (must be present in all three demo pages):**
- SAMPLE DATA / DEMO PREVIEW (visible badge or banner)
- Front Range Roofing Co.
- Founder-Led Launch Program
- Manual founder/operator review
- Manual coordination
- READY FOR FOUNDER REVIEW
- Inspection coordination / appointment coordination
- Live automation disabled / Manual coordination only
- Sample-only footer

## Files Created
- `website/demo/dashboard-sample.html` — Lead response overview, leads needing founder/operator review, upcoming inspection coordination, lead source summary, recommended manual next actions, manual review queue status, prominent live-automation-disabled note.
- `website/demo/weekly-report-sample.html` — Weekly summary header, sample lead volume / review queue / inspections coordinated metrics, source performance table, leads needing attention, recommended founder/operator actions, manual coordination note, sample-only footer.
- `website/demo/monthly-report-sample.html` — Monthly summary header, sample month-to-date metrics, inspection coordination trend (static visual), lead source mix, manual review outcomes (PASS/HOLD/BLOCKED style counts), recommended next-month adjustments, sample-only footer.
- `website/demo/demo.css` — Shared static styling for demo banners, cards, tables, pills, and safety notes (keeps HTML clean and consistent).
- `docs/WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET.md` (this file)
- `backend/scripts/verify-website-demo-screenshot-assets-readonly.js` (new read-only verifier)
- `scripts/run-website-demo-screenshot-assets-dry-run.sh` (new dry-run wrapper)

## Sample Data Rules Enforced
- Fake names only (first name + last initial).
- Fake addresses or city-level locations only (e.g., "Boulder, CO area", "Denver metro"). No real full addresses.
- Fake phone numbers using 555 format where shown.
- No real customer data of any kind.
- No promising outcomes, no "guarantee" language, no "forbidden outcome language" / "forbidden outcome language" phrasing.
- Uses only approved language: "inspection coordination," "appointment coordination," "manual review," "manual next action," "READY FOR FOUNDER REVIEW," "manual coordination," "Founder-Led Launch Program."

## Forbidden Phrases Confirmed Absent (Enforced by Verifier)
From demo pages and supporting scripts:
- guarantee, guaranteed
- automatically
- invoice, payment, quote, estimate
- forbidden outcome language, forbidden outcome language, forbidden outcome language
- production automation active, live automation active
- instant SMS, calendar appointment booking
- Any fetch(, XMLHttpRequest, axios, supabase, twilio, resend, vapi, lindy strings

## No Backend / Schema / Auth / Secrets / External Changes
- Verifier asserts no backend/src routes, controllers, or services were modified.
- Verifier asserts no migration/schema/auth/secrets/env files were modified.
- All changes are confined to website/demo/* (static files), docs/, backend/scripts/ (new read-only verifier only), and scripts/ (new wrapper only).

## Verification Commands (Run Inside Worktree)
```bash
node --check backend/scripts/verify-website-demo-screenshot-assets-readonly.js
node backend/scripts/verify-website-demo-screenshot-assets-readonly.js
scripts/run-website-demo-screenshot-assets-dry-run.sh
node backend/scripts/verify-website-founder-led-launch-copy-readonly.js
node backend/scripts/verify-website-founder-led-conversion-polish-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
npm --prefix backend run build
scripts/show-diff-proof.sh
```

Full aggregate (includes this and prior website work):
```bash
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
```

## Wiring (Consistent with Prior Website Copy Packets)
- Wired into aggregate first-paid pilot readiness verifier.
- Wired into FIRST_PAID_LAUNCH_VERIFIER_INDEX.md.
- Wired into NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md, NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md, NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md.
- Wired into ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md.
- Dry-run wrapper includes node --check, the new verifier, prior website verifiers, agent quality gate, and references show-diff-proof.

## Recommended Screenshot Capture Process
1. Open each HTML file directly in a desktop browser (or serve locally via a simple static server).
2. Use consistent browser window size (e.g., 1440px wide) and light theme.
3. Capture full scrollable area or key sections (overview metrics, review queue table, reports tables).
4. Crop or annotate externally if needed; keep the SAMPLE DATA / DEMO PREVIEW banner and Founder-Led Launch Program framing visible in final assets.
5. Do not imply these pages are live or connected when using in marketing.

## Commit
test(website): add demo screenshot assets

Do not push.

All changes are static demo assets + supporting read-only verifier + wrapper + documentation updates. No production behavior, no live services, no data mutation, no external calls. Ready for internal marketing screenshot use under the Founder-Led Launch Program framing.
