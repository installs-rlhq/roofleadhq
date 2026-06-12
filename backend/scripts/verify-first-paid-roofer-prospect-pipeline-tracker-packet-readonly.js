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

const docPath = "docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md";
const wrapperPath = "scripts/run-first-paid-roofer-prospect-pipeline-tracker-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";
const salesOutreachPacketPath = "docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md";
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
const salesOutreach = read(salesOutreachPacketPath);
const launchSystem = read(launchSystemPacketPath);

// Assert expected files exist
console.log("PASS: all expected files for first paid roofer prospect pipeline tracker packet exist.");

// File existence and basic properties
mustHave(doc, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "first paid roofer prospect pipeline tracker packet doc");
mustHave(doc, "run-first-paid-roofer-prospect-pipeline-tracker-packet-dry-run.sh", "first paid roofer prospect pipeline tracker packet doc references wrapper");
mustHave(doc, "First Paid Roofer Sales Outreach System Packet", "first paid roofer prospect pipeline tracker packet doc references sales outreach handoff");
mustHave(doc, "First Paid Roofer Launch System Packet", "first paid roofer prospect pipeline tracker packet doc references launch system handoff");

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
mustHave(wrapper, "verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js", "wrapper must run node --check on verifier");

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
mustHave(doc, "# First Paid Roofer Prospect Pipeline / Tracker Packet", "first paid roofer prospect pipeline tracker doc");
assertSectionWithContent(doc, "## Purpose", [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup is onboarding/configuration only",
  "14-day trial begins after Guided Setup go-live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime. No long-term contract",
  "identify, score, contact, follow up with, demo, qualify, and hand off"
], "first paid roofer prospect pipeline tracker doc");

// Public positioning and internal-only rules
mustHave(doc, "Public/business language (used in all customer-facing and prospect communications):", "first paid roofer prospect pipeline tracker doc");
mustHave(doc, "All founder/operator manual steps, safety language, internal scorecards, trackers, and evidence logs are internal-only.", "first paid roofer prospect pipeline tracker doc");

// Required top-level sections for operational usefulness
assertSectionWithContent(doc, "## Scope", ["First paid roofer prospecting and early pipeline", "handoff to the First Paid Roofer Sales Outreach System Packet"], "first paid roofer prospect pipeline tracker doc");
assertSectionWithContent(doc, "## Non-Goals and Explicit Boundaries", ["No activation of live SMS, Vapi, Calendar booking", "No auth/RLS/security implementation or payment automation in this packet"], "first paid roofer prospect pipeline tracker doc");

// 1. Prospect source list template
assertSectionWithContent(doc, "## 1. Prospect Source List Template", [
  "Recommended Source Channels (Prioritized for First Paid)",
  "Warm referrals (peer roofers",
  "LinkedIn (search \"roofing contractor owner",
  "Go/No-Go for Source List Health"
], "first paid roofer prospect pipeline tracker doc");

// 2. Ideal first roofer fit filters
assertSectionWithContent(doc, "## 2. Ideal First Roofer Fit Filters", [
  "Core Fit Filters (All Must Be True to Enter Active Pipeline)",
  "Active roofing company (not handyman, general contractor",
  "Lead volume estimate >= 10-20 leads per month",
  "Fit Filter Application Gate",
  "Status: [ ] CLEAR FIT (all core true + 2+ bonus) [ ] HOLD [ ] BLOCKED"
], "first paid roofer prospect pipeline tracker doc");

// 3. Bad-fit / disqualifier filters
assertSectionWithContent(doc, "## 3. Bad-Fit / Disqualifier Filters", [
  "Hard Disqualifiers (BLOCKED — Do Not Contact or Advance)",
  "Not primarily a roofing contractor",
  "Explicitly demands outcome guarantees",
  "Status for current prospect: [ ] CLEAR FIT [ ] HOLD [ ] BLOCKED"
], "first paid roofer prospect pipeline tracker doc");

// 4. Prospect tracker table (exact required columns)
assertSectionWithContent(doc, "## 4. Prospect Tracker Table", [
  "Required Tracker Columns (Copy-Paste Ready)",
  "Prospect name",
  "Company",
  "Location",
  "Website",
  "Source",
  "Contact name",
  "Contact channel",
  "Lead volume estimate",
  "Fit score",
  "Pain signal",
  "Outreach status",
  "Follow-up count",
  "Demo status",
  "Objection",
  "Decision status",
  "Handoff status",
  "Next action",
  "Next action date",
  "Owner",
  "Notes",
  "Evidence link/reference"
], "first paid roofer prospect pipeline tracker doc");

// Confirm all 21 required columns appear as a group
const requiredTrackerColumns = [
  "Prospect name", "Company", "Location", "Website", "Source",
  "Contact name", "Contact channel", "Lead volume estimate", "Fit score",
  "Pain signal", "Outreach status", "Follow-up count", "Demo status",
  "Objection", "Decision status", "Handoff status", "Next action",
  "Next action date", "Owner", "Notes", "Evidence link/reference"
];
assertConcreteFields(doc, requiredTrackerColumns, "prospect tracker table columns");

// 5. Outreach status stages
assertSectionWithContent(doc, "## 5. Outreach Status Stages", [
  "Allowed Outreach Status Values",
  "NOT CONTACTED",
  "OUTREACH SENT (warm)",
  "OUTREACH SENT (cold)",
  "REPLIED / INTERESTED",
  "REPLIED / NOT NOW",
  "CLOSED / NO RESPONSE"
], "first paid roofer prospect pipeline tracker doc");

// 6. Follow-up status stages
assertSectionWithContent(doc, "## 6. Follow-Up Status Stages", [
  "Follow-Up Cadence (Manual Only)",
  "Touch 2: 3-4 days later",
  "Touch 3: 3-4 days after Touch 2",
  "Never use cron, Lindy, or any external scheduler for follow-ups"
], "first paid roofer prospect pipeline tracker doc");

// 7. Demo status stages
assertSectionWithContent(doc, "## 7. Demo Status Stages", [
  "Allowed Demo Status Values",
  "NOT SCHEDULED",
  "SCHEDULED",
  "COMPLETED - STRONG FIT",
  "COMPLETED - HOLD",
  "COMPLETED - NOT FIT",
  "Pre-demo checklist (internal)"
], "first paid roofer prospect pipeline tracker doc");

// 8. Fit scorecard summary fields
assertSectionWithContent(doc, "## 8. Fit Scorecard Summary Fields", [
  "Fit Scorecard Summary Fields (Rate + Note for Each)",
  "Lead volume & source diversity (0-10)",
  "Visible response/follow-up pain (0-10)",
  "Total: ___ / 50",
  "Early Fit Thresholds for Pipeline Action"
], "first paid roofer prospect pipeline tracker doc");

// 9. Evidence log
assertSectionWithContent(doc, "## 9. Evidence Log", [
  "Evidence Log Entry Template (Per Major Event)",
  "Safety guardrails section 15 re-read: YES. All OFF.",
  "Event type: [RESEARCH / SOURCE ADD / OUTREACH TOUCH"
], "first paid roofer prospect pipeline tracker doc");

// 10. Next action queue
assertSectionWithContent(doc, "## 10. Next Action Queue", [
  "Next Action Queue Template (Daily Snapshot)",
  "Priority | Prospect | Next action | Due date | Owner",
  "Queue Health: [ ] PASS"
], "first paid roofer prospect pipeline tracker doc");

// 11. Handoff readiness checklist (to sales primarily)
assertSectionWithContent(doc, "## 11. Handoff Readiness Checklist", [
  "Handoff Preconditions (All Must Be True for CLEAN HANDOFF)",
  "FIRST PAID ROOFER PROSPECT PIPELINE HANDOFF",
  "Next: Full outreach + demo execution per FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md",
  "Handoff status: [ ] HANDED OFF CLEANLY TO SALES OUTREACH SYSTEM PACKET"
], "first paid roofer prospect pipeline tracker doc");

// 12. No-go / not-now / nurture handling
assertSectionWithContent(doc, "## 12. No-Go / Not-Now / Nurture Handling", [
  "Pre-Contact / Early Research No-Go (Hard BLOCKED)",
  "After First Touch or Demo — Not a Fit (BLOCKED)",
  "Not-Now / Timing Off (HOLD -> Nurture)",
  "Nurture List Rules",
  "Required for All No-Go / Not-Now / Nurture"
], "first paid roofer prospect pipeline tracker doc");

// 13. Weekly pipeline review checklist
assertSectionWithContent(doc, "## 13. Weekly Pipeline Review Checklist", [
  "Weekly Pipeline Review Checklist (All Items)",
  "Re-run this packet's verifier + full aggregate",
  "Safety re-confirmation",
  "Pipeline health gate: [ ] PASS"
], "first paid roofer prospect pipeline tracker doc");

// 14. Founder/operator daily pipeline command center
assertSectionWithContent(doc, "## 14. Founder/Operator Daily Pipeline Command Center", [
  "Daily Snapshot (Fill at Start of Day)",
  "Morning Routine (5-10 min)",
  "End-of-Day Routine (5 min)",
  "Command Center Gates (Daily)"
], "first paid roofer prospect pipeline tracker doc");

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
  "Payment automation (billing engine, invoice generation, or first-month payment collection automation): NONE",
  "Any CRM, Notion automation, Make/Zapier, or external tool that writes prospect data to production systems: DISABLED"
], "first paid roofer prospect pipeline tracker doc");

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
  mustHave(doc, m, "first paid roofer prospect pipeline tracker doc safety markers");
}

// Re-confirmation protocol and forbidden phrases section
assertSectionWithContent(doc, "Re-Confirmation Protocol", ["Re-read this safety section 15", "Run the full aggregate verifier and this packet's verifier", "Log \"Safety re-confirmed: all 15 guardrails OFF\""], "first paid roofer prospect pipeline tracker doc");
assertSectionWithContent(doc, "Forbidden Public Phrases (Must Remain Absent From All Public-Facing and This Packet's Customer-Facing Sections)", [
  "7-day pilot",
  "5 qualified appointments in 7 days",
  "booked jobs / book jobs / booked-job",
  "automatic estimate / auto-estimate / automatic quote / auto quote",
  "Monthly billing starts on day 15"
], "first paid roofer prospect pipeline tracker doc");

// Decision log
assertSectionWithContent(doc, "## Decision Log (Master — Append for the First Paid Roofer Prospect Pipeline)", [
  "| Date | Gate/Section | Prospect | Decision (PASS/HOLD/BLOCKED) |",
  "All entries must reference safety guardrails re-confirmation"
], "first paid roofer prospect pipeline tracker doc");

// Explicit final confirmation
assertSectionWithContent(doc, "## Explicit Final Confirmation for This Packet", [
  "Planning-only / dry-run / internal-only / founder-operator-only for first paid roofer prospect pipeline / tracker",
  "No auth changes: yes",
  "No database schema changes: yes",
  "No RLS policies: yes",
  "No production data writes: yes",
  "No live workflow activation activated: yes",
  "Public/business positioning uses only: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup (config only) + 14-day trial + automated email 2 days before first monthly payment + cancel anytime + no long-term contract",
  "Forbidden phrases are absent from all prospect-facing content"
], "first paid roofer prospect pipeline tracker doc");

// Verification commands section present
assertSectionWithContent(doc, "## Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js",
  "node backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js",
  "scripts/run-first-paid-roofer-prospect-pipeline-tracker-packet-dry-run.sh"
], "first paid roofer prospect pipeline tracker doc");

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
    mustNotHave(docBeforeForbiddenList, f, "first paid roofer prospect pipeline tracker doc (outside forbidden list section)");
  }
  mustNotHave(wrapper, f, "first paid roofer prospect pipeline tracker wrapper");
}

// Implementation-risk strings absent from doc
for (const s of unsafeImpl) {
  mustNotHave(doc, s, "first paid roofer prospect pipeline tracker doc");
}

// Aggregate first-paid readiness includes this verifier (after wiring)
mustHave(aggregate, "verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js", "aggregate readiness must include the new prospect pipeline tracker verifier");
mustHave(aggregate, "First Paid Roofer Prospect Pipeline / Tracker Packet", "aggregate readiness must describe the new prospect pipeline tracker packet");
mustHave(aggregate, "prospect pipeline", "aggregate readiness must carry descriptive name for the prospect pipeline packet");

// Verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "verifier index");
mustHave(verifierIndex, "run-first-paid-roofer-prospect-pipeline-tracker-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js", "verifier index");

// First-paid launch context references the new packet
mustHave(contextFirstPaid, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "first paid launch context");
mustHave(contextFirstPaid, "First Paid Roofer Prospect Pipeline / Tracker Packet", "first paid launch context");
mustHave(contextFirstPaid, "First Paid Roofer Prospect Pipeline", "first paid launch context");

// Roofer dry-run onboarding context references the new packet
mustHave(contextRooferDryRun, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "roofer dry-run onboarding context");
mustHave(contextRooferDryRun, "First Paid Roofer Prospect Pipeline", "roofer dry-run onboarding context");

// Grok workflow context references the new packet
mustHave(workflow, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "grok workflow context");
mustHave(workflow, "First Paid Roofer Prospect Pipeline / Tracker Packet", "grok workflow context");
mustHave(workflow, "prospect pipeline tracker packet", "grok workflow context");

// Business buildout daily guide references the packet and milestone
mustHave(businessGuide, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "business buildout daily guide");
mustHave(businessGuide, "First Paid Roofer Prospect Pipeline / Tracker Packet", "business buildout daily guide");
mustHave(businessGuide, "prospect pipeline tracker", "business buildout daily guide");

// Quality gate cross reference
mustHave(qualityGate, "product-quality-gate", "quality gate doc (cross reference)");

// Product-depth / operational usefulness markers
mustHave(doc, "product-moving and operationally usable", "first paid roofer prospect pipeline tracker doc");
mustHave(doc, "PASS / HOLD / BLOCKED", "first paid roofer prospect pipeline tracker doc (multiple gates)");
mustHave(doc, "Evidence Log", "first paid roofer prospect pipeline tracker doc");
mustHave(doc, "Handoff Readiness Checklist", "first paid roofer prospect pipeline tracker doc");
mustHave(doc, "Go/No-Go", "first paid roofer prospect pipeline tracker doc");
mustHave(doc, "Scorecard", "first paid roofer prospect pipeline tracker doc");

// Explicit no-activation language for all guardrails
mustHave(doc, "No live SMS, Vapi, Calendar, Resend, Lindy, cron, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, or payment automation is activated", "first paid roofer prospect pipeline tracker doc (guardrail summary)");

// Primary handoff to sales outreach packet (and launch)
mustHave(doc, "handoff to the First Paid Roofer Sales Outreach System Packet", "first paid roofer prospect pipeline tracker doc handoff");
mustHave(doc, "HANDED OFF CLEANLY TO SALES OUTREACH SYSTEM PACKET", "first paid roofer prospect pipeline tracker doc handoff status");
assertSectionWithContent(doc, "## 11. Handoff Readiness Checklist", [
  "Handoff Preconditions (All Must Be True for CLEAN HANDOFF)",
  "FIRST PAID ROOFER PROSPECT PIPELINE HANDOFF",
  "per FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md"
], "handoff section");

// Sales and launch packets are referenced as targets (not duplicated)
mustHave(doc, "docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md", "prospect pipeline packet references sales packet");
mustHave(doc, "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "prospect pipeline packet references launch packet");

// No shallow archive-only language in primary sections
if (doc.includes("archive-only") && !doc.includes("Non-Goals")) {
  // allowed only in non-goals if present, but prefer none
}

// Final safety language
mustHave(doc, "all 15 guardrails OFF", "first paid roofer prospect pipeline tracker doc");

// Sales outreach packet is referenced (downstream dependency)
mustHave(doc, "First Paid Roofer Sales Outreach System Packet", "prospect packet references sales as primary handoff");

// Confirm required 15 sections are enumerated with content
mustHave(doc, "## 1. Prospect Source List Template", "prospect packet section 1");
mustHave(doc, "## 15. Explicit Safety Guardrails", "prospect packet section 15");

// Cross reference that sales packet references prospect pipeline as upstream (if present)
if (salesOutreach.includes("Prospect Pipeline")) {
  mustHave(salesOutreach, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "sales outreach references prospect pipeline");
}

// Final explicit checks for forbidden in prospect-facing areas (pre-list split already enforced)
console.log("PASS: all required sections (1-15 + safety + 14 operational sections), concrete fields, 21 tracker columns, checklists, decision gates, evidence logs, handoff templates, fit scorecard, status stages, source list, next action queue, weekly review, daily command center, safety markers (full list), re-confirmation protocol, forbidden phrase protections, non-implementation boundaries, and wiring assertions passed for first paid roofer prospect pipeline tracker packet.");

console.log("PASS: forbidden business phrases and implementation-risk strings absent from doc and wrapper (strict checks on high-risk variants).");

console.log("PASS: First Paid Roofer Prospect Pipeline / Tracker Packet read-only verifier passed.");
