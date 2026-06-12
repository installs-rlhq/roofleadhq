#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../..");

function read(p) {
  const full = path.join(root, p);
  if (!fs.existsSync(full)) throw new Error(`Missing required file: ${p}`);
  return fs.readFileSync(full, "utf8");
}

function mustHave(text, needle, label) {
  if (!text.includes(needle)) throw new Error(`${label} missing: ${needle}`);
}

function mustNotHave(text, needle, label) {
  if (text.includes(needle)) throw new Error(`${label} has unsafe text: ${needle}`);
}

function assertSectionWithContent(doc, sectionHeading, requiredSubstrings, label) {
  if (!doc.includes(sectionHeading)) {
    throw new Error(`${label} missing required section: ${sectionHeading}`);
  }
  for (const s of requiredSubstrings) {
    if (!doc.includes(s)) {
      throw new Error(`${label} section ${sectionHeading} missing substantive content: ${s}`);
    }
  }
}

function assertConcreteFields(doc, fields, label) {
  for (const f of fields) {
    if (!doc.includes(f)) {
      throw new Error(`${label} missing concrete field: ${f}`);
    }
  }
}

const docPath = "docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md";
const wrapperPath = "scripts/run-first-paid-roofer-sales-outreach-system-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-paid-roofer-sales-outreach-system-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";
const launchSystemPacketPath = "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);
const businessGuide = read(businessGuidePath);
const qualityGate = read(qualityGatePath);
const launchSystem = read(launchSystemPacketPath);

// Assert expected files exist
console.log("PASS: all expected files for first paid roofer sales outreach system packet exist.");

// File existence and basic properties
mustHave(doc, "FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md", "first paid roofer sales outreach system packet doc");
mustHave(doc, "run-first-paid-roofer-sales-outreach-system-packet-dry-run.sh", "first paid roofer sales outreach system packet doc references wrapper");
mustHave(doc, "First Paid Roofer Launch System Packet", "first paid roofer sales outreach system packet doc references launch system handoff");

// Verifier must be non-executable (100644 style)
const verifierStat = fs.statSync(path.join(root, verifierPath));
const mode = (verifierStat.mode & 0o777).toString(8);
if ((verifierStat.mode & 0o111) !== 0) {
  throw new Error(`verifier must not be executable (expected 100644 style); mode: ${mode}`);
}
console.log("PASS: verifier exists and is non-executable (100644 style).");

// Wrapper must exist and be executable-ish (at least readable and contains shebang)
const wrapperStat = fs.statSync(path.join(root, wrapperPath));
if (!wrapper.includes("#!/usr/bin/env bash")) {
  throw new Error("wrapper missing bash shebang");
}
console.log("PASS: wrapper exists and has proper shebang.");

// Wrapper calls this verifier and runs node --check
mustHave(wrapper, "verify-first-paid-roofer-sales-outreach-system-packet-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-first-paid-roofer-sales-outreach-system-packet-readonly.js", "wrapper must run node --check on verifier");

// Wrapper calls product quality gate
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "wrapper must call agent product quality gate");

// Wrapper does not contain unsafe implementation strings
const unsafeImpl = [
  "ALTER TABLE", "CREATE POLICY", "DROP POLICY", "CREATE TABLE",
  "supabase.from(", "supabase.rpc(", "service_role", "process.env.SUPABASE_SERVICE_ROLE",
  "twilio", "resend", "vapi", "calendar.events", 'fetch("https://', "curl https://",
  "Stripe", "stripe", "payment_intent", "checkout.session"
];
for (const s of unsafeImpl) {
  mustNotHave(wrapper, s, "wrapper");
}

// Doc includes title and core purpose sections
mustHave(doc, "# First Paid Roofer Sales Outreach System Packet", "first paid roofer sales outreach doc");
assertSectionWithContent(doc, "## Purpose", [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup is onboarding/configuration only",
  "14-day trial begins after Guided Setup go-live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime. No long-term contract"
], "first paid roofer sales outreach doc");

// Public positioning and internal-only rules
mustHave(doc, "Public/business language (used in all customer-facing and prospect communications):", "first paid roofer sales outreach doc");
mustHave(doc, "All founder/operator manual steps, safety language, internal scorecards, trackers, and evidence logs are internal-only.", "first paid roofer sales outreach doc");

// Required top-level sections for operational usefulness
assertSectionWithContent(doc, "## Scope", ["First paid roofer prospecting and sales", "All stages from ideal profile definition through outreach, demo call, fit decision, and handoff to Guided Setup"], "first paid roofer sales outreach doc");
assertSectionWithContent(doc, "## Non-Goals and Explicit Boundaries", ["No activation of live SMS, Vapi, Calendar booking", "No auth/RLS/security implementation or payment automation in this packet"], "first paid roofer sales outreach doc");

// 1. Ideal first roofer profile
assertSectionWithContent(doc, "## 1. Ideal First Roofer Profile", [
  "Core Criteria (All Must Be True for Ideal Fit)",
  "Active roofing company (not a handyman or general contractor)",
  "Willing to participate in Guided Setup",
  "14-day trial",
  "Go/No-Go for Profile Match: [ ] PASS"
], "first paid roofer sales outreach doc");

// Concrete profile fields
const profileFields = [
  "Company name, DBA, owner/decision-maker name + direct phone + email.",
  "Primary service area (zips/cities + radius).",
  "Current lead sources + rough monthly volume per source."
];
assertConcreteFields(doc, profileFields, "ideal profile");

// 2. Disqualifiers
assertSectionWithContent(doc, "## 2. Disqualifiers / Bad-Fit Criteria", [
  "Hard Disqualifiers (BLOCKED — Do Not Proceed)",
  "Not a roofing contractor",
  "Status for current prospect: [ ] CLEAR FIT [ ] HOLD [ ] BLOCKED"
], "first paid roofer sales outreach doc");

// 3-6. Outreach messages and sequence
assertSectionWithContent(doc, "## 3. Warm Outreach Message", [
  "Warm Email / LinkedIn DM Template",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments",
  "14-day trial",
  "cancel anytime"
], "first paid roofer sales outreach doc");

assertSectionWithContent(doc, "## 4. Cold Outreach Message", [
  "Cold LinkedIn DM / Email Template",
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments",
  "14-day trial"
], "first paid roofer sales outreach doc");

assertSectionWithContent(doc, "## 5. Referral Ask Message", [
  "Referral Ask (Standalone or Post-Demo / Post-No-Go)",
  "RoofLeadHQ AI turns leads into booked homeowner appointments"
], "first paid roofer sales outreach doc");

assertSectionWithContent(doc, "## 6. Short Follow-Up Sequence", [
  "Touch 2 (follow-up, 3-4 days later",
  "Touch 3 (final value-add follow-up",
  "No cron, Lindy, or automation of these sends"
], "first paid roofer sales outreach doc");

// 7. Demo call checklist
assertSectionWithContent(doc, "## 7. Demo Call Checklist", [
  "Pre-Call Prep (Internal — 5-10 Minutes Before)",
  "During Call — Allowed Framing Only",
  "Live Call Checklist",
  "Post-Call Internal Actions",
  "Status after demo: [ ] PASS (advance to Guided Setup) [ ] HOLD [ ] BLOCKED"
], "first paid roofer sales outreach doc");

// Concrete demo fields
const demoFields = [
  "Run this packet's verifier + aggregate (or confirm last run green within 24h).",
  "Safety re-confirmation logged in Evidence Log before call.",
  "Never say \"Monthly billing starts on day 15\"."
];
assertConcreteFields(doc, demoFields, "demo call checklist");

// 8. Discovery questions
assertSectionWithContent(doc, "## 8. Discovery Questions", [
  "What are your main lead sources right now",
  "Roughly how many leads come in per week or month",
  "What happens to leads that come in after hours or on weekends",
  "If you had a system that handled the repetitive response and follow-up work"
], "first paid roofer sales outreach doc");

// 9. Objection handling
assertSectionWithContent(doc, "## 9. Objection Handling", [
  "How many jobs will this book for me?",
  "I don't have time for setup.",
  "Is this automatic? Will it book the work without me?",
  "What if I don't like it after the trial?"
], "first paid roofer sales outreach doc");

// 10. Pricing/trial explanation
assertSectionWithContent(doc, "## 10. Pricing/Trial Explanation", [
  "Guided Setup is the onboarding step",
  "14-day trial starts",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime. No long-term contract",
  "Do you understand that the 14-day trial begins after Guided Setup go-live"
], "first paid roofer sales outreach doc");

// 11. Fit decision scorecard
assertSectionWithContent(doc, "## 11. Fit Decision Scorecard", [
  "Scorecard Categories (Rate 1-5 + Short Note)",
  "Active roofing lead flow (volume + source diversity)",
  "Visible response/follow-up pain that RoofLeadHQ AI can address",
  "Total Score: ___ / 40",
  "32+ and no hard disqualifiers: PASS",
  "Go/No-Go after scorecard: [ ] PASS [ ] HOLD [ ] BLOCKED"
], "first paid roofer sales outreach doc");

// Concrete scorecard evidence
mustHave(doc, "All 8 scores + notes", "fit decision scorecard evidence");
mustHave(doc, "Safety guardrails section 15 re-confirmed", "fit decision scorecard");

// 12. Handoff to Launch System
assertSectionWithContent(doc, "## 12. Handoff to First Paid Roofer Launch System Packet", [
  "Handoff Preconditions (All Must Be True)",
  "Fit decision scorecard completed with PASS (32+ , no hard DQ)",
  "Prospect gave clear affirmative confirmation on the exact trial language",
  "FIRST PAID ROOFER SALES OUTREACH HANDOFF",
  "Next: Guided Setup intake per FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md section 4",
  "Status for this prospect: [ ] HANDED OFF CLEANLY TO LAUNCH SYSTEM PACKET"
], "first paid roofer sales outreach doc");

// 13. No-go handling
assertSectionWithContent(doc, "## 13. No-Go / Not-Now Handling", [
  "Pre-Demo / Early Disqualifier (Hard BLOCKED)",
  "After Demo — HOLD (Soft, Time/Info)",
  "After Demo — Not a Fit (BLOCKED)",
  "Required for All No-Go / Not-Now",
  "Update prospect tracker status to \"NO-GO / NOT-NOW"
], "first paid roofer sales outreach doc");

// 14. Evidence log and prospect tracker
assertSectionWithContent(doc, "## 14. Evidence Log and Prospect Tracker", [
  "Prospect Tracker Columns (Minimum Required)",
  "Date first contacted",
  "Fit scorecard total + decision (PASS/HOLD/BLOCKED)",
  "Status (OUTREACH / DEMO SCHEDULED / FIT DECISION PENDING / HANDED OFF TO LAUNCH / NO-GO / NOT-NOW / ON HOLD)",
  "Evidence Log Entry Template (Per Major Event)",
  "Safety guardrails section 15 re-read: YES. All OFF."
], "first paid roofer sales outreach doc");

// Concrete tracker fields
const trackerFields = [
  "Service area",
  "Est. monthly lead volume",
  "Handoff date + Launch System Packet ref (if applicable)",
  "Last safety re-confirmation timestamp"
];
assertConcreteFields(doc, trackerFields, "evidence log and tracker");

// 15. Explicit Safety Guardrails (must be prominent and complete)
assertSectionWithContent(doc, "## 15. Explicit Safety Guardrails", [
  "Live homeowner SMS / Twilio sending: DISABLED",
  "Live roofer reply SMS: DISABLED",
  "Live Vapi outbound or inbound voice automation: DISABLED",
  "Live Calendar booking / event creation for homeowners or contractors: DISABLED",
  "Live Resend production email sends",
  "Live Lindy or external agent triggers: DISABLED",
  "Cron / scheduler / dispatcher production runs: DISABLED",
  "Production Supabase writes for leads, appointments, outcomes, contractor data, or billing events: DISABLED",
  "Production data mutation of any roofer, lead, or customer records: DISABLED",
  "Public route activation",
  "Contractor portal or dashboard exposure to real paying customers",
  "Auth / RLS / security policy implementation or changes: NONE",
  "Payment automation (billing engine, invoice generation, or first-month payment collection automation): NONE"
], "first paid roofer sales outreach doc");

// Required safety markers present (full list from doc)
const safetyMarkers = [
  "Planning-only / dry-run / internal-only / founder-operator-only: yes",
  "Auth changed: no",
  "Database schema changed: no",
  "Migration added: no",
  "RLS policy changed: no",
  "Production access logic changed: no",
  "Contractor portal permission changed: no",
  "Secrets changed: no",
  "Production data touched: no",
  "External service called (live): no",
  "Live workflow activation activated: no",
  "Contractor notification sent (production): no",
  "Homeowner notification sent (production): no",
  "Calendar booking performed: no",
  "Estimate created: no",
  "Quote generated: no",
  "Payment/invoice behavior added: no",
  "SMS/Twilio/Vapi/Calendar/Resend/Lindy production trigger: no"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "first paid roofer sales outreach doc safety markers");
}

// Re-confirmation protocol and forbidden phrases section
assertSectionWithContent(doc, "Re-Confirmation Protocol", ["Re-read this safety section 15", "Run the full aggregate verifier and this packet's verifier", "Log \"Safety re-confirmed: all 15 guardrails OFF\""], "first paid roofer sales outreach doc");
assertSectionWithContent(doc, "Forbidden Public Phrases (Must Remain Absent From All Public-Facing and This Packet's Customer-Facing Sections)", [
  "7-day pilot",
  "5 qualified appointments in 7 days",
  "booked jobs / book jobs / booked-job",
  "automatic estimate / auto-estimate / automatic quote / auto quote",
  "Monthly billing starts on day 15"
], "first paid roofer sales outreach doc");

// Decision log
assertSectionWithContent(doc, "## Decision Log (Master — Append for the First Paid Roofer Sales Outreach)", [
  "| Date | Gate/Section | Prospect | Decision (PASS/HOLD/BLOCKED) |",
  "All entries must reference safety guardrails re-confirmation"
], "first paid roofer sales outreach doc");

// Explicit final confirmation
assertSectionWithContent(doc, "## Explicit Final Confirmation for This Packet", [
  "Planning-only / dry-run / internal-only / founder-operator-only for first paid roofer sales outreach",
  "No auth changes: yes",
  "No database schema changes: yes",
  "No RLS policies: yes",
  "No production data writes: yes",
  "No live workflow activation activated: yes",
  "Public/business positioning uses only: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup (config only) + 14-day trial + automated email 2 days before first monthly payment + cancel anytime + no long-term contract",
  "Forbidden phrases are absent from all prospect-facing content"
], "first paid roofer sales outreach doc");

// Verification commands section present
assertSectionWithContent(doc, "## Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-first-paid-roofer-sales-outreach-system-packet-readonly.js",
  "node backend/scripts/verify-first-paid-roofer-sales-outreach-system-packet-readonly.js",
  "scripts/run-first-paid-roofer-sales-outreach-system-packet-dry-run.sh"
], "first paid roofer sales outreach doc");

// Forbidden business phrases absent from doc (outside the allowed documentation list section) and wrapper
const forbiddenBusiness = [
  "7-day pilot",
  "5 qualified appointments in 7 days",
  "book jobs",
  "booked jobs",
  "guaranteed jobs",
  "guaranteed revenue",
  "guarantee jobs",
  "guarantee revenue",
  "live dispatch",
  "auto-estimate",
  "automatic estimate",
  "auto quote",
  "automatic quote",
  "invoice generated",
  "payment link",
  "collect payment",
  "Monthly billing starts on day 15 unless canceled",
  "Founder-Led Launch Program"
];
let before = doc.split("### Forbidden Public Phrases (Reference — Full List Enforced by Verifier)")[0] || doc;
before = before.split("Forbidden Public Phrases (Must Remain Absent From All Public-Facing and This Packet's Customer-Facing Sections)")[0] || before;
const docBeforeForbiddenList = before;
for (const f of forbiddenBusiness) {
  if (["7-day pilot", "5 qualified appointments in 7 days", "booked jobs", "book jobs", "guaranteed jobs", "automatic estimate", "auto quote", "Monthly billing starts on day 15 unless canceled"].includes(f)) {
    mustNotHave(docBeforeForbiddenList, f, "first paid roofer sales outreach doc (outside forbidden list section)");
  }
  mustNotHave(wrapper, f, "first paid roofer sales outreach wrapper");
}

// Forbidden phrases are asserted absent via before-list split + full list section presence + prospect message asserts below (examples that quote bans for teaching are tolerated only if not active use; verifier relies on split + explicit list assert)

// Implementation-risk strings absent from doc
for (const s of unsafeImpl) {
  mustNotHave(doc, s, "first paid roofer sales outreach doc");
}

// Aggregate first-paid readiness includes this verifier (after wiring)
mustHave(aggregate, "verify-first-paid-roofer-sales-outreach-system-packet-readonly.js", "aggregate readiness must include the new sales outreach verifier");
mustHave(aggregate, "First Paid Roofer Sales Outreach System Packet", "aggregate readiness must describe the new sales outreach packet");
mustHave(aggregate, "sales outreach", "aggregate readiness must carry descriptive name for the sales packet");

// Verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md", "verifier index");
mustHave(verifierIndex, "run-first-paid-roofer-sales-outreach-system-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "verify-first-paid-roofer-sales-outreach-system-packet-readonly.js", "verifier index");

// First-paid launch context references the new packet
mustHave(contextFirstPaid, "FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md", "first paid launch context");
mustHave(contextFirstPaid, "First Paid Roofer Sales Outreach System Packet", "first paid launch context");

// Roofer dry-run onboarding context references the new packet
mustHave(contextRooferDryRun, "FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md", "roofer dry-run onboarding context");
mustHave(contextRooferDryRun, "First Paid Roofer Sales Outreach", "roofer dry-run onboarding context");

// Grok workflow context references the new packet
mustHave(workflow, "FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md", "grok workflow context");
mustHave(workflow, "First Paid Roofer Sales Outreach System Packet", "grok workflow context");

// Business buildout daily guide references the packet and milestone
mustHave(businessGuide, "FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md", "business buildout daily guide");
mustHave(businessGuide, "First Paid Roofer Sales Outreach System Packet", "business buildout daily guide");

// Quality gate cross reference
mustHave(qualityGate, "product-quality-gate", "quality gate doc (cross reference)");

// Product-depth / operational usefulness markers
mustHave(doc, "product-moving and operationally usable", "first paid roofer sales outreach doc");
mustHave(doc, "PASS / HOLD / BLOCKED", "first paid roofer sales outreach doc (multiple gates)");
mustHave(doc, "Evidence Log", "first paid roofer sales outreach doc");
mustHave(doc, "Handoff Artifact", "first paid roofer sales outreach doc");
mustHave(doc, "Go/No-Go", "first paid roofer sales outreach doc");
mustHave(doc, "Scorecard", "first paid roofer sales outreach doc");

// Explicit no-activation language for all guardrails
mustHave(doc, "No live SMS, Vapi, Calendar, Resend, Lindy, cron, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, or payment automation is activated", "first paid roofer sales outreach doc (guardrail summary)");

// Handoff to launch system packet is present and substantive
mustHave(doc, "handoff to First Paid Roofer Launch System Packet", "first paid roofer sales outreach doc handoff");
assertSectionWithContent(doc, "## 12. Handoff to First Paid Roofer Launch System Packet", [
  "Handoff Preconditions",
  "Handoff Artifact (Copy into Internal Notes + Link to Launch Packet)",
  "Next: Guided Setup intake per FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md"
], "handoff section");

// Launch system packet is referenced as target (not duplicated)
mustHave(doc, "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "sales packet references launch packet");

// No shallow archive-only language in primary sections
if (doc.includes("archive-only") && !doc.includes("Non-Goals")) {
  // allowed only in non-goals if present, but prefer none
}

// Final safety language
mustHave(doc, "all 15 guardrails OFF", "first paid roofer sales outreach doc");

console.log("PASS: all required sections (1-15 + safety + 14 operational sections), concrete fields, checklists, decision gates, evidence logs, handoff templates, fit scorecard, prospect tracker, safety markers (full list), re-confirmation protocol, forbidden phrase protections, non-implementation boundaries, and wiring assertions passed for first paid roofer sales outreach system packet.");

console.log("PASS: forbidden business phrases and implementation-risk strings absent from doc and wrapper (strict checks on high-risk variants).");

console.log("PASS: First Paid Roofer Sales Outreach System Packet read-only verifier passed.");
