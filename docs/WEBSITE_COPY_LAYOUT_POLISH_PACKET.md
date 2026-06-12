# WEBSITE_COPY_LAYOUT_POLISH_PACKET

Date: 2026 (worktree agent/website-copy-layout-polish)
Canonical source-of-truth commit: 1df71a1 test(website): recover rooflead ai positioning
This revision: test(website): polish public copy and layout

## Founder review corrections applied
founder review corrections applied
This is a website-only copy and layout polish pass on the public RoofLeadHQ site. It preserves the recovered RoofLeadHQ AI positioning (AI turns leads into booked homeowner appointments on the roofer’s calendar; Guided Setup is onboarding/configuration only; 14-day trial is simple and clear) while applying the latest founder review corrections:

- Stronger booking language: RoofLeadHQ AI "books homeowner appointments on your calendar" (not merely "helps get ... onto your calendar").
- Inspection Coordination card updated to "Qualified leads booked on your calendar" and "RoofLeadHQ AI handles response, follow-up, and appointment booking so serious homeowners land on your schedule."
- All public "Monthly billing starts on day 15 unless you cancel." (and close variants) removed. Replaced with clear 14-day trial language: "14-day trial after Guided Setup before your first monthly payment." and "You’ll receive an automated email 2 days before your first monthly payment."
- "You do not always need more leads..." section balanced/centered in its text box with improved line breaks for visual balance.
- Roofing Lead Reality section: three title boxes/headings centered.
- Reduced repetition of "Inspection Calendar" throughout; varied with your calendar, your schedule, booked appointments, homeowner appointments, inspection-ready conversations, appointments on your calendar, serious homeowners on your schedule.
- Inside RoofLeadHQ: Dashboard / Weekly Reports / Monthly Reports photo cards centered in their own row; images vertically justified (object-top) so top of each screenshot is visible (bottom crop acceptable).
- All KPI card / text box titles centered.
- Comparison section title revised to "Fast Response Turns More Roofing Leads Into Inspection-Ready Conversations" (expresses quick response moving serious homeowners toward inspection-ready conversations).
- Comparison table: vertical divider lines between columns (matching horizontal weight via borders); small green check-circle icon next to the "RoofLeadHQ" column title.
- Automated Pre-Billing Check-In kept conceptually but made much shorter: "A typical custom setup process can be completed within 48 hours." + "After your 14-day trial, you’ll receive an automated email 2 days before your first monthly payment." + supportive note that RoofLeadHQ will support going live ASAP and faster setup depends on roofer providing needed business details.
- Outside leads (Manual Outreach) section made visually attractive: improved card spacing/emphasis/icons/badges/background contrast/ring effects; restructured paragraph (kept question, visual break, then the two explanatory sentences); four KPI boxes centered with icons and better treatment.
- Phone Leads section made less visually bland (icons, rings, centers); last sentence moved up under the "When a homeowner calls..." sentence with visual spacing.
- Pricing: intro two concise sentences; green pill changed to "Choose the monthly plan that’s right for your current business needs. Cancel anytime."; removed repeating sentence above cards; removed Starter grey "Up to 100 leads/mo" pill; centered green checks + text in all three cards; centered "View Everything Included"; added left-side caret/chevron (▼) indicator; made "View Everything Included" smaller/confined (inline pill, own smaller content bg, no competing with primary CTAs); added visible outline/border (border-2) around all three pricing cards; tier titles (Starter/Growth/Elite) made larger (text-base) but still smaller than price; price font reduced (~text-5xl); Growth blue outline made bolder (ring-4); removed the full "One-time Guided Setup fee: $499. Your 14-day trial... Monthly billing starts on day 15 unless canceled." line.
- My Story / Why Trust: replaced cheesy sentence with grounded version; changed left box title to "RoofLeadHQ is customized to fit your business needs."; revised customization paragraph to speak only to what is configured (no repeat of full operating promise, removed second sentence); removed the "14-day trial after Guided Setup. Monthly billing... No ongoing founder babysitting required." sentence entirely; rewrote My Story for genuine, grammatical, non-awkward tone while preserving origin story (friend missing opps on roofs/driving/after hours), homeowner quick comms, biz owner time/waste/focus, and the build purpose (fast response, auto follow-up, missed lead recovery, book qualified homeowners onto calendar without admin day). Signed Jason.
- FAQ: updated answers to align with RoofLeadHQ AI, booked homeowner appointments, Guided Setup (config only), simple 14-day trial, automated email 2 days before first monthly payment; removed all "Monthly billing starts on day 15", founder babysitting, guarantee, and "book jobs" language.
- Contact / final CTA: replaced with clean version: "Start Your RoofLeadHQ Setup." / "Guided Setup configures RoofLeadHQ AI around your roofing business." / "Your 14-day trial begins after setup goes live." / "You’ll receive an automated email 2 days before your first monthly payment." / "No long-term contract." Removed all old day-15 / founder-led / manual review language.
- All other public surfaces (meta, og, structured data, hero, footer disclaimer, mobile sticky, popups) cleaned of forbidden phrases.

## Copy improvements
- Consistent, stronger "books homeowner appointments on your calendar" spine.
- Removed all public founder/operator/manual babysitting/review queue language.
- Clear, simple 14-day trial + automated pre-billing email 2 days before first payment.
- Grounded, genuine My Story and customization description.
- Reduced repetition; varied calendar/schedule language.
- FAQ and final CTA now match the polished positioning exactly.

## Layout improvements
- Balanced/centered "You do not always need more leads" text block.
- Centered titles across reality cards, inside screenshots (incl. reports), outside leads KPIs, phone leads KPIs, pricing checks, view-included.
- Inside RoofLeadHQ: three report cards centered with top-justified images (top visible, bottom crop ok).
- Comparison: stronger title, vertical dividers in table, green check indicator on RoofLeadHQ column.
- Outside leads: visually attractive cards (icons, rings, hover, centers, emphasis).
- Phone leads: less bland, sentence moved with spacing.
- Pricing: visible borders on cards, bolder popular outline, smaller confined view-all with caret, reduced price font, larger-but-subordinate tier titles, centered elements, no competing elements.

## Pricing section improvements
- All 13+ specific founder review points implemented (pill removal, sentence removal, centering, borders, sizes, caret, green pill text, etc.).
- Pricing stands out as important section without visual competition from secondary elements.

## FAQ / contact alignment
- FAQ and final CTA now use only allowed public concepts and required new phrasing (no day-15 billing, no founder babysitting, no guarantees, clear 14-day + automated 2-day email, "books homeowner appointments", Guided Setup as config).
- No production claims.

## No production behavior changes
- Website/static copy/CSS/docs/read-only verifier changes only.
Website/copy/docs/read-only verifier changes only
no backend/src routes
no migration/schema/auth/secrets
- No PNG image contents modified.
- dashboard-sample.png, weekly-report-sample.png, monthly-report-sample.png references and files preserved exactly (no removal, no content edit).
- No live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher behavior.
- No production Supabase reads/writes.
- No backend/src routes/controllers/services changes.
- No auth, database policy, migration, schema, secrets, or access-control changes.
- No external service calls.
- No production activation.
- Internal safety posture preserved: demo-ready / live automation disabled unless explicitly approved.
- Public copy uses only allowed concepts (RoofLeadHQ AI, automated follow-up, fast response, missed lead recovery, booked homeowner appointments / booked inspections, 14-day trial, automated email 2 days before first monthly payment, cancel anytime, no long-term contract, Guided Setup, onboarding specialist, etc.).
- Public copy does not claim guaranteed appointment counts/jobs/revenue or production behavior beyond marketing copy.
no production behavior changes
Growth Tier screenshots preserved exactly
no backend/src routes
no migration/schema/auth/secrets

## Verification commands (run inside worktree)
```bash
node --check backend/scripts/verify-website-copy-layout-polish-readonly.js
node backend/scripts/verify-website-copy-layout-polish-readonly.js
scripts/run-website-copy-layout-polish-dry-run.sh
node backend/scripts/verify-website-positioning-recovery-readonly.js
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
The new copy/layout polish packet/verifier/wrapper is wired into:
- backend/scripts/verify-first-paid-pilot-readiness-readonly.js (new command entry)
- docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md
- docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md
- docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md

Existing website verifiers were updated only as necessary (e.g. positioning-recovery required phrase list and logs) so they no longer require removed "Monthly billing starts on day 15" language; all safety checks against guarantees, job/revenue claims, live automation, founder/operator public language, etc. remain in force or strengthened.

## Files changed (website-only + supporting docs/verifiers)
- website/index.html
- website/styles.css
- docs/WEBSITE_COPY_LAYOUT_POLISH_PACKET.md
- backend/scripts/verify-website-copy-layout-polish-readonly.js
- scripts/run-website-copy-layout-polish-dry-run.sh
- (minimal updates to positioning-recovery verifier + supporting docs for alignment / wiring / no-longer-required old language)
- (no changes to backend/src, no schema/migrations/auth/secrets, no PNG binaries, no external calls, no prod activation)

All constraints observed. Public site is clearer, less repetitive, more polished, aligned with founder vision for RoofLeadHQ AI as the system that books homeowner appointments on the roofer’s calendar after simple Guided Setup + 14-day trial.
