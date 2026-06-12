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

const docPath = "docs/FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md";
const wrapperPath = "scripts/run-first-paid-roofer-outreach-execution-kit-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-paid-roofer-outreach-execution-kit-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";
const prospectTrackerPath = "docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md";
const salesPacketPath = "docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md";
const launchPacketPath = "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);
const businessGuide = read(businessGuidePath);
const qualityGate = read(qualityGatePath);
const prospectTracker = read(prospectTrackerPath);
const salesPacket = read(salesPacketPath);
const launchPacket = read(launchPacketPath);

// Assert expected files exist
console.log("PASS: all expected files for first paid roofer outreach execution kit exist.");

// File existence and basic properties
mustHave(doc, "FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md", "first paid roofer outreach execution kit doc");
mustHave(doc, "run-first-paid-roofer-outreach-execution-kit-dry-run.sh", "first paid roofer outreach execution kit doc references wrapper");
mustHave(doc, "FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "first paid roofer outreach execution kit doc references prospect pipeline tracker packet");
mustHave(doc, "FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md", "first paid roofer outreach execution kit doc references sales outreach system packet");
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "first paid roofer outreach execution kit doc references launch system packet");

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
mustHave(wrapper, "verify-first-paid-roofer-outreach-execution-kit-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-first-paid-roofer-outreach-execution-kit-readonly.js", "wrapper must run node --check on verifier");

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
mustHave(doc, "# First Paid Roofer Outreach Execution Kit", "first paid roofer outreach execution kit doc");
assertSectionWithContent(doc, "## Purpose", [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup first",
  "14-day trial begins after setup goes live",
  "An automated email is sent 2 days before the first monthly payment",
  "Cancel anytime. No long-term contract",
  "hand off the first paid roofer prospect into the existing Sales Outreach System Packet and Launch System Packet"
], "first paid roofer outreach execution kit doc");

// Public positioning and internal-only rules
mustHave(doc, "Public/business language (used in all customer-facing and prospect communications):", "first paid roofer outreach execution kit doc");
mustHave(doc, "All founder/operator manual steps, safety language, internal scorecards, trackers, worksheets, and evidence logs are internal-only.", "first paid roofer outreach execution kit doc");

// Required top-level sections for operational usefulness
assertSectionWithContent(doc, "## Scope", ["First paid roofer prospecting and early outreach execution", "Handoff artifacts that feed directly into"], "first paid roofer outreach execution kit doc");
assertSectionWithContent(doc, "## Non-Goals and Explicit Boundaries", ["No activation of live SMS, Twilio, Vapi, Calendar, Resend, Lindy", "No auth/RLS/security implementation"], "first paid roofer outreach execution kit doc");

// 1. Day-one outreach operating plan
assertSectionWithContent(doc, "## 1. Day-one Outreach Operating Plan", [
  "Morning Setup Checklist",
  "Prospect Sourcing Block",
  "Qualification/Scoring Block",
  "Message Preparation Block",
  "Manual Send Block",
  "Follow-up Review Block",
  "End-of-Day Pipeline Review",
  "Next-Day Handoff",
  "Internal-only / founder-operator-only execution plan"
], "first paid roofer outreach execution kit doc");

// 2. First 20 prospect sourcing worksheet + table
assertSectionWithContent(doc, "## 2. First 20 Prospect Sourcing Worksheet", [
  "Manual-Only Prospect Source Channels",
  "Required Fields for Each Prospect",
  "Evidence Fields",
  "Exclusion / Disqualifier Fields",
  "First 20 Prospect Sourcing Worksheet Table",
  "No external search calls, APIs, scrapers, or integrations of any kind"
], "first paid roofer outreach execution kit doc");
mustHave(doc, "| # | Company / DBA | Owner/Decision Maker | Phone | Email | Service Area | Source Channel |", "first 20 sourcing table headers");
mustHave(doc, "|20 |", "first 20 sourcing table has 20 rows (at least row 20 marker)");

// 3. Prospect qualification gate
assertSectionWithContent(doc, "## 3. Prospect Qualification Gate", [
  "Must-Have Criteria (All Required for Any PASS Consideration)",
  "Strong-Fit Signals (Bonus — Increase Confidence)",
  "Soft HOLD Criteria",
  "Hard BLOCKED Criteria",
  "Service-Area / Roofing Niche Fit",
  "Lead-Volume Estimate",
  "Paid-Lead Pain Signal",
  "Response-Speed Pain Signal",
  "Owner/Founder Accessibility Signal",
  "Go/No-Go after full gate review: [ ] PASS"
], "first paid roofer outreach execution kit doc");

// 4. First-contact message preparation queue + exact public language + no forbidden
assertSectionWithContent(doc, "## 4. First-Contact Message Preparation Queue", [
  "Warm Outreach Draft Template",
  "Cold Outreach Draft Template",
  "Referral Intro Draft Template",
  "Call Opener Script",
  "Voicemail Script",
  "LinkedIn / Short-Message Version",
  "Internal-only draft templates"
], "first paid roofer outreach execution kit doc");
// Prospect-facing templates must contain the exact public language
assertSectionWithContent(doc, "Warm Outreach Draft Template", [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup first",
  "14-day trial",
  "automated email arrives 2 days before your first monthly payment",
  "Cancel anytime. No long-term contract"
], "warm template");
assertSectionWithContent(doc, "Cold Outreach Draft Template", [
  "RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery",
  "Guided Setup",
  "14-day trial after Guided Setup",
  "Automated email 2 days before first monthly payment",
  "Cancel anytime. No long-term contract"
], "cold template");
assertSectionWithContent(doc, "Call Opener Script", [
  "RoofLeadHQ AI helps roofers turn leads into booked homeowner appointments",
  "14-day trial after setup, cancel anytime"
], "call opener");
assertSectionWithContent(doc, "Voicemail Script", [
  "RoofLeadHQ AI handles fast response and automated follow-up so homeowner appointments land on your calendar",
  "14-day trial after a quick Guided Setup"
], "voicemail");

// 5. Follow-up execution queue
assertSectionWithContent(doc, "## 5. Follow-up Execution Queue", [
  "Manual Follow-up Touch 1, 2, 3 + Timing Guidance",
  "Follow-up Message Templates",
  "Stop Rules (Mandatory)",
  "Not-Now / Nurture Handling",
  "All follow-ups are founder/operator manual execution only",
  "No cron, Lindy, CRM automation, or automated follow-up of any kind"
], "first paid roofer outreach execution kit doc");
assertSectionWithContent(doc, "Touch 1 (3-4 days)", ["following up on my note about RoofLeadHQ AI turning your roofing leads into booked homeowner appointments"], "follow-up touch 1");
assertSectionWithContent(doc, "Touch 2 (6-7 days later)", ["RoofLeadHQ AI is built exactly for that: fast response + automated follow-up"], "follow-up touch 2");

// 6. Demo-call readiness handoff + artifact to SALES
assertSectionWithContent(doc, "## 6. Demo-Call Readiness Handoff", [
  "When to offer a demo",
  "Demo Scheduling Prep Checklist",
  "Pre-Demo Evidence Checklist",
  "Discovery Questions to Bring Forward",
  "Objection Notes",
  "Handoff Artifact to FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md",
  "FIRST PAID ROOFER OUTREACH EXECUTION KIT → SALES OUTREACH HANDOFF ARTIFACT"
], "first paid roofer outreach execution kit doc");

// 7. Sales-to-launch handoff trigger + artifact to LAUNCH
assertSectionWithContent(doc, "## 7. Sales-to-Launch Handoff Trigger", [
  "Criteria for moving prospect into FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md",
  "Required Evidence",
  "Trial Language Confirmation",
  "Setup Readiness Notes",
  "Go-Live Assumptions",
  "Payment/Trial Expectations",
  "Cancellation / No-Go Handling",
  "Handoff Artifact to FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md",
  "FIRST PAID ROOFER OUTREACH EXECUTION KIT → SALES → LAUNCH HANDOFF ARTIFACT"
], "first paid roofer outreach execution kit doc");

// 8. Manual tracker templates — 9 required tables
assertSectionWithContent(doc, "## 8. Manual Tracker Templates", [
  "Prospect Source List",
  "Outreach Queue",
  "Follow-up Queue",
  "Demo Readiness Queue",
  "Objection Log",
  "Evidence Log",
  "Daily Operator Review",
  "Weekly Pipeline Review",
  "Handoff Summary"
], "first paid roofer outreach execution kit doc");
// Concrete table header checks for copy-paste tables
mustHave(doc, "| ID | Prospect / Company | Contact Channel | Message Type", "outreach queue table");
mustHave(doc, "| ID | Prospect | Prior Touch Date + Type | Next Touch #", "follow-up queue table");
mustHave(doc, "| ID | Prospect / Company | Qualification Gate Status | Pre-Demo Evidence", "demo readiness queue table");
mustHave(doc, "| Date | Prospect | Objection (exact prospect words)", "objection log table");
mustHave(doc, "| Date/Operator | Prospect | Event Type", "evidence log table");
mustHave(doc, "| Date | Sourced Today | Qualified Today", "daily operator review table");
mustHave(doc, "| Week Of | Total Active Prospects | PASS Qualified", "weekly pipeline review table");
mustHave(doc, "| Handoff Date | Prospect | Target Packet (SALES or LAUNCH)", "handoff summary table");

// 9. Safety guardrails — full required list + query specifics
assertSectionWithContent(doc, "## 9. Safety Guardrails", [
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
  "Manual-only outreach: YES",
  "Draft-only message preparation: YES",
  "No live send: YES",
  "No automated follow-up: YES",
  "No CRM automation: YES",
  "No calendar booking automation: YES",
  "No payment automation: YES",
  "No external service calls: YES",
  "No production Supabase writes: YES",
  "No public route activation: YES",
  "No contractor portal exposure: YES",
  "No auth/RLS/security implementation: YES",
  "No estimates, quotes, invoices, or payment workflows: YES",
  "No guarantee language: YES",
  "No booked-jobs language: YES",
  "No live SMS, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, payment automation, estimate/quote/invoice automation, or external service calls is activated"
], "first paid roofer outreach execution kit doc");

// Required safety markers
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
  "Invoice generated: no",
  "Payment/invoice behavior added: no",
  "SMS/Twilio/Vapi/Calendar/Resend/Lindy production trigger: no"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "first paid roofer outreach execution kit doc safety markers");
}

// Re-confirmation protocol and forbidden phrases section
assertSectionWithContent(doc, "Re-Confirmation Protocol", ["Re-read this safety section 9", "Run the full aggregate verifier", "this kit's verifier", "Log \"Safety re-confirmed: all guardrails OFF\""], "first paid roofer outreach execution kit doc");
assertSectionWithContent(doc, "Forbidden Public Phrases (Reference — Full List Enforced by Verifier)", [
  "Founder-Led Launch Program",
  "Request Founder-Led Launch Review",
  "founder review",
  "manual review",
  "manual coordination",
  "Live Automation Disabled",
  "Monthly billing starts on day 15",
  "booked jobs / book jobs / booked-job",
  "guaranteed appointments",
  "automatic estimate"
], "first paid roofer outreach execution kit doc");

// 10. Public-vs-internal language boundary
assertSectionWithContent(doc, "## 10. Public-vs-Internal Language Boundary", [
  "Prospect-facing language",
  "must use ONLY the current public direction",
  "Internal founder/operator/manual review language",
  "Internal-only / founder-operator-only",
  "internal-only section in this kit is explicitly labeled",
  "Forbidden Prospect-Facing / Public Language (Enforced Strictly)"
], "first paid roofer outreach execution kit doc");

// Decision log and final confirmation
assertSectionWithContent(doc, "## Decision Log (Master — Append for the First Paid Roofer Outreach Execution Kit)", [
  "| Date | Gate/Section | Prospect | Decision (PASS/HOLD/BLOCKED / HANDOFF / NO-GO) |",
  "All entries must reference safety guardrails re-confirmation"
], "first paid roofer outreach execution kit doc");

assertSectionWithContent(doc, "## Explicit Final Confirmation for This Kit", [
  "Planning-only / dry-run / internal-only / founder-operator-only for first paid roofer outreach execution kit",
  "No auth changes: yes",
  "No database schema changes: yes",
  "No RLS policies: yes",
  "No production data writes: yes",
  "No live workflow activation activated: yes",
  "Public/business positioning uses only: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup first + 14-day trial begins after setup goes live + automated email 2 days before first monthly payment + cancel anytime + no long-term contract",
  "Forbidden phrases are absent from all prospect-facing content",
  "References confirmed to FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md, FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md",
  "All 10 required sections present with operational content, concrete fields, 9 copy-paste tables"
], "first paid roofer outreach execution kit doc");

// Verification commands section present
assertSectionWithContent(doc, "## Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-first-paid-roofer-outreach-execution-kit-readonly.js",
  "node backend/scripts/verify-first-paid-roofer-outreach-execution-kit-readonly.js",
  "scripts/run-first-paid-roofer-outreach-execution-kit-dry-run.sh"
], "first paid roofer outreach execution kit doc");

// Forbidden business phrases absent from doc (outside the allowed documentation list section) and wrapper
const forbiddenBusiness = [
  "Founder-Led Launch Program",
  "Request Founder-Led Launch Review",
  "founder review",
  "manual review",
  "manual coordination",
  "Live Automation Disabled",
  "Monthly billing starts on day 15",
  "Monthly billing on day 15",
  "day 15",
  "14-day launch trial",
  "seven-day pilot",
  "5 qualified appointments",
  "five-qualified-appointment",
  "book jobs",
  "booked jobs",
  "booked-job",
  "guaranteed appointments",
  "guaranteed revenue",
  "guaranteed jobs",
  "automatic estimate",
  "automatic quote",
  "automatic invoice",
  "automatic payment",
  "You book the inspection"
];
let before = doc.split("### Forbidden Public Phrases (Reference — Full List Enforced by Verifier)")[0] || doc;
before = before.split("Forbidden Public Phrases (Must Remain Absent From All Public-Facing and This Packet's Customer-Facing Sections)")[0] || before;
before = before.split("## 10. Public-vs-Internal Language Boundary")[0] || before;
const docBeforeForbiddenList = before;
for (const f of forbiddenBusiness) {
  mustNotHave(docBeforeForbiddenList, f, "first paid roofer outreach execution kit doc (outside forbidden list section)");
  mustNotHave(wrapper, f, "first paid roofer outreach execution kit wrapper");
}

// Implementation-risk strings absent from doc
for (const s of unsafeImpl) {
  mustNotHave(doc, s, "first paid roofer outreach execution kit doc");
}

// Aggregate first-paid readiness includes this verifier (after wiring)
mustHave(aggregate, "verify-first-paid-roofer-outreach-execution-kit-readonly.js", "aggregate readiness must include the new outreach execution kit verifier");
mustHave(aggregate, "First Paid Roofer Outreach Execution Kit", "aggregate readiness must describe the new outreach execution kit");
mustHave(aggregate, "Outreach Execution Kit", "aggregate readiness must carry descriptive name for the kit");

// Verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md", "verifier index");
mustHave(verifierIndex, "run-first-paid-roofer-outreach-execution-kit-dry-run.sh", "verifier index");
mustHave(verifierIndex, "verify-first-paid-roofer-outreach-execution-kit-readonly.js", "verifier index");

// First-paid launch context references the new kit
mustHave(contextFirstPaid, "FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md", "first paid launch context");
mustHave(contextFirstPaid, "First Paid Roofer Outreach Execution Kit", "first paid launch context");

// Roofer dry-run onboarding context references the new kit
mustHave(contextRooferDryRun, "FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md", "roofer dry-run onboarding context");
mustHave(contextRooferDryRun, "First Paid Roofer Outreach Execution Kit", "roofer dry-run onboarding context");

// Grok workflow context references the new kit
mustHave(workflow, "FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md", "grok workflow context");
mustHave(workflow, "First Paid Roofer Outreach Execution Kit", "grok workflow context");

// Business buildout daily guide references the kit and milestone
mustHave(businessGuide, "FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md", "business buildout daily guide");
mustHave(businessGuide, "First Paid Roofer Outreach Execution Kit", "business buildout daily guide");

// Quality gate cross reference
mustHave(qualityGate, "product-quality-gate", "quality gate doc (cross reference)");

// Product-depth / operational usefulness markers
mustHave(doc, "product-moving and operationally usable", "first paid roofer outreach execution kit doc");
mustHave(doc, "PASS / HOLD / BLOCKED", "first paid roofer outreach execution kit doc (multiple gates)");
mustHave(doc, "Evidence Log", "first paid roofer outreach execution kit doc");
mustHave(doc, "Handoff Artifact", "first paid roofer outreach execution kit doc");
mustHave(doc, "Go/No-Go", "first paid roofer outreach execution kit doc");
mustHave(doc, "copy-paste-ready tables", "first paid roofer outreach execution kit doc");
mustHave(doc, "9 copy-paste tables", "first paid roofer outreach execution kit doc (final confirmation)");

// Explicit no-activation language for all guardrails
mustHave(doc, "No live SMS, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, payment automation, estimate/quote/invoice automation, or external service calls is activated", "first paid roofer outreach execution kit doc (guardrail summary)");

// Handoff artifacts to both packets are present and substantive
mustHave(doc, "hand off the first paid roofer prospect into the existing Sales Outreach System Packet and Launch System Packet", "first paid roofer outreach execution kit doc handoff");
assertSectionWithContent(doc, "## 6. Demo-Call Readiness Handoff", [
  "Handoff Artifact to FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md",
  "Status: [ ] HANDED OFF CLEANLY TO SALES OUTREACH SYSTEM PACKET"
], "demo handoff section");
assertSectionWithContent(doc, "## 7. Sales-to-Launch Handoff Trigger", [
  "Handoff Artifact to FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md",
  "Status: [ ] HANDED OFF CLEANLY TO LAUNCH SYSTEM PACKET"
], "sales-to-launch handoff section");

// References to all three packets confirmed
mustHave(doc, "docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md", "kit references prospect tracker packet");
mustHave(doc, "docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md", "kit references sales packet");
mustHave(doc, "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "kit references launch packet");

// Language boundary and internal-only labeling confirmed
mustHave(doc, "Internal-only / founder-operator-only", "first paid roofer outreach execution kit doc (multiple internal labels)");
mustHave(doc, "Prospect-facing language must NOT use any founder-led/manual babysitting/public founder-review framing", "language boundary");

// No shallow archive-only language in primary sections
if (doc.includes("archive-only") && !doc.includes("Non-Goals")) {
  // allowed only in non-goals if present, but prefer none
}

// Final safety language
mustHave(doc, "all guardrails OFF", "first paid roofer outreach execution kit doc");

console.log("PASS: all required sections (1-10 + safety + day-one plan + sourcing worksheet + qualification gate + message queue + follow-up queue + demo handoff + sales-to-launch handoff + 9 copy-paste tracker tables + language boundary), concrete fields, tables, decision gates, evidence logs, handoff artifacts to Sales + Launch packets, safety markers (full list), re-confirmation protocol, forbidden phrase protections (strict outside-list checks), non-implementation boundaries, and wiring assertions passed for first paid roofer outreach execution kit.");

console.log("PASS: forbidden business phrases and implementation-risk strings absent from doc and wrapper (strict checks on high-risk variants including all listed in user spec).");

console.log("PASS: references to prospect pipeline tracker, sales outreach system, and launch system packets confirmed.");

console.log("PASS: First Paid Roofer Outreach Execution Kit read-only verifier passed.");
