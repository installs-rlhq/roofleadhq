# WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET

Date: 2026-06 (worktree agent/website-demo-growth-tier-screenshot-revision)
Canonical source-of-truth commit: d545f9d test(website): add demo screenshot assets
This revision: test(website): revise demo screenshots for growth tier example

## Purpose
Revise the static demo screenshot pages (Dashboard, Weekly Report, Monthly Report) to be roofer-facing marketing examples for the Growth Tier instead of internal-safety-looking examples. These remain completely static/sample-only demo assets for marketing screenshots. They illustrate what a roofer prospect sees when RoofLeadHQ is handling routine lead response and coordination for a realistic ~275 leads/month business.

Growth Tier definition for this demo: 101–300 leads/month; sample roofer averaging ~275 leads/month.

- The product looks like RoofLeadHQ handles repetitive lead-response and coordination work.
- The roofer mainly sees status, results, and exceptions (Roofer Input Needed only when genuinely necessary).
- No implication of founder review or heavy manual operator involvement in visible screenshot content.
- Internal safety language ("Live Automation Disabled", "Manual coordination only", "Ready for Founder Review", etc.) is removed from visible demo page content and kept only in docs and verifiers.

This is a website/demo/docs/read-only verifier change only. Website/demo/docs/read-only verifier changes only.

## Safety Posture (Hard Constraints — No Violations)
- Static website/demo screenshot assets only.
- No live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher behavior.
- No public route activation beyond static files under website/demo or website/screenshots.
- No production Supabase reads/writes.
- No production credentials, auth changes, database policy changes, migrations, schema changes, secrets handling changes, or access-control implementation.
- No customer/contractor/homeowner notifications.
- No automated booking, estimate creation, quote generation, invoice/payment behavior, or external service calls.
- No backend/src routes/controllers/services changes.
- Clearly label all demo content as sample/demo data with light Growth Tier framing.
- Avoid forbidden business language, guarantees, jobs-booked language, automatic booking language, estimate/quote/invoice/payment language, or production activation implications.
- Roofer-facing language only in visible content: RoofLeadHQ Handling Status, Leads Needing Attention, Follow-Up In Progress, Inspection Requested, Inspection Confirmed, Roofer Input Needed, Response Status, etc.

**Explicit light markers (visible but not dominating):**
- SAMPLE DATA / DEMO PREVIEW (visible badge or banner)
- Growth Tier Example
- 275 Leads/Month Example
- Front Range Roofing Co.
- Sample-only footer

Internal safety language and "Founder-Led Launch Program" framing remain in the packet, verifiers, and supporting docs only — not as prominent user-facing screenshot language in the HTML.

## Files Updated (Revision)
- `website/demo/dashboard-sample.html` — Growth Tier metrics (New Leads This Week: 64, Inspection Opportunities: 18, Follow-Ups In Progress: 21, Leads Needing Attention: 6), lead source summary (Google 22 / Website 16 / Angi 11 / Referrals 8 / Facebook 7), roofer-facing statuses (Responded, Follow-Up In Progress, Inspection Requested, Inspection Confirmed, Awaiting Homeowner Reply, Needs Attention), "RoofLeadHQ Handling Status", "Recent Leads — Handled by RoofLeadHQ", "Leads Needing Attention", "Recommended Next Actions", light sample note only.
- `website/demo/weekly-report-sample.html` — 7-day summary at 275/mo pace (Leads Captured: 64, Qualified: 29, Inspection Opportunities Created: 18, Inspections Confirmed: 11, Follow-Ups In Progress: 21, Roofer Input Needed: 5), source performance, leads needing attention, recommended actions, roofer-facing summary language.
- `website/demo/monthly-report-sample.html` — Clear Growth Tier MTD (Total Leads: 275, Qualified: 121, Inspection Opportunities Created: 74, Inspections Confirmed: 46, Follow-Ups Completed: 98, Follow-Ups In Progress: 37, Roofer Input Needed: 14), source mix summing to 275 (Google Business Profile 92, Website 61, Angi 48, Referrals 39, Facebook 35), response outcomes, recommended next-month adjustments.
- `website/demo/demo.css` — Unchanged (existing styles support the revised light labeling and pills; no heavy manual-banner content emitted).
- `docs/WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET.md` (this file — updated for Growth Tier revision)
- `backend/scripts/verify-website-demo-screenshot-assets-readonly.js` (updated read-only verifier enforcing new Growth Tier / roofer-facing / removed-internal-phrases checks)
- `scripts/run-website-demo-screenshot-assets-dry-run.sh` — Unchanged (commands and structure preserved)

## Sample Data Rules Enforced
- Fake names only (first name + last initial): Sarah M., David R., Emily T., Chris B., etc.
- Fake city/area locations only (e.g., "Boulder area", "Denver metro", "Longmont area"). No real full addresses.
- Fake phone numbers using 555 format where shown.
- No real customer data of any kind.
- No promising outcomes, no "guarantee" language, no forbidden outcome language.
- Uses roofer-facing language: "RoofLeadHQ Handling Status", "Leads Needing Attention", "Follow-Up In Progress", "Inspection Requested", "Inspection Confirmed", "Roofer Input Needed", "Handled by RoofLeadHQ", "Response Status", "Inspection Status", "Recommended Next Actions".
- Light sample labels only: "Sample Data", "Demo Preview", "Growth Tier Example", "275 Leads/Month Example". Do not dominate.

## Growth Tier / 275-Lead Numerical Direction (Enforced by Verifier)
- Dashboard: New Leads This Week ~64, Inspection Opportunities ~18, Follow-Ups In Progress ~21, Leads Needing Attention ~6. Lead sources this week sum to 64 (Google Business Profile 22, Website 16, Angi 11, Referrals 8, Facebook 7).
- Weekly: Leads Captured 64, Qualified Homeowners 29, Inspection Opportunities Created 18, Inspections Confirmed 11, Follow-Ups In Progress 21, Roofer Input Needed 5. Includes source performance, leads needing attention, recommended actions.
- Monthly: Total Leads 275, Qualified Homeowners 121, Inspection Opportunities Created 74, Inspections Confirmed 46, Follow-Ups Completed 98, Follow-Ups In Progress 37, Roofer Input Needed 14. Source mix sums to 275 (Google Business Profile 92, Website 61, Angi 48, Referrals 39, Facebook 35). Includes MTD summary, source mix, response outcomes, recommended next-month adjustments.

## Forbidden Phrases Confirmed Absent from Demo Pages (Enforced by Verifier)
Visible content must not contain:
- Live Automation Disabled, Manual coordination only, All next steps require founder or operator review, Ready for Founder Review, Manual Review Queue Status, Confirm Manually, Pending Confirm, manual founder/operator review (etc.).
- guarantee, guaranteed
- automatically
- invoice, payment, quote, estimate
- book jobs, booked jobs, jobs booked
- production automation active, live automation active
- instant SMS, calendar appointment booking
- Any fetch(, XMLHttpRequest, axios, supabase, twilio, resend, vapi, lindy strings

Internal safety language is retained in the packet doc, this verifier, and supporting docs only.

## No Backend / Schema / Auth / Secrets / External Changes
- Verifier asserts no backend/src routes, controllers, or services were modified.
- Verifier asserts no migration/schema/auth/secrets/env files were modified.
- All changes confined to website/demo/* (static), docs/, backend/scripts/ (read-only verifier only), scripts/ (wrapper only if needed).
- No customer/contractor/homeowner notifications, no automated booking/estimates/quotes/invoices/payments, no external service calls.

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
- Dry-run wrapper includes node --check, the screenshot verifier, prior website verifiers, agent quality gate, and references show-diff-proof.

## Recommended Screenshot Capture Process
1. Open each HTML file directly in a desktop browser (or serve locally via a simple static server).
2. Use consistent browser window size (e.g., 1440px wide) and light theme.
3. Capture full scrollable area or key sections (metrics grids, lead tables, source mix, reports).
4. Crop or annotate externally if needed; keep the light SAMPLE DATA / DEMO PREVIEW + Growth Tier / 275 Leads/Month Example framing visible in final assets.
5. Do not imply these pages are live or connected when using in marketing. Present as illustrative Growth Tier example of RoofLeadHQ handling lead coordination for a roofer.

## Commit
test(website): revise demo screenshots for growth tier example

Do not push.

All changes are static demo assets + supporting read-only verifier + documentation updates. No production behavior, no live services, no data mutation, no external calls, no backend/src or schema/auth/secrets changes. The visible demo content is now roofer-facing marketing material for the Growth Tier (275 leads/month example) while all internal safety posture is preserved in docs and verifiers only. Ready for marketing screenshots.
