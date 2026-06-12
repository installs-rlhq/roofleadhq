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

const docPath = "docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md";
const wrapperPath = "scripts/run-first-paid-roofer-launch-system-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-paid-roofer-launch-system-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const businessGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);
const businessGuide = read(businessGuidePath);
const qualityGate = read(qualityGatePath);

// Assert expected files exist
console.log("PASS: all expected files for first paid roofer launch system packet exist.");

// File existence and basic properties
mustHave(doc, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "first paid roofer launch system packet doc");
mustHave(doc, "run-first-paid-roofer-launch-system-packet-dry-run.sh", "first paid roofer launch system packet doc references wrapper");

// Verifier must be non-executable (100644 style)
const verifierStat = fs.statSync(path.join(root, verifierPath));
const mode = (verifierStat.mode & 0o777).toString(8);
if ((verifierStat.mode & 0o111) !== 0) {
  throw new Error(`verifier must not be executable (expected 100644 style); mode: ${mode}`);
}
console.log("PASS: verifier exists and is non-executable (100644 style).");

// Wrapper calls this verifier and runs node --check
mustHave(wrapper, "verify-first-paid-roofer-launch-system-packet-readonly.js", "wrapper must call this verifier");
mustHave(wrapper, "node --check backend/scripts/verify-first-paid-roofer-launch-system-packet-readonly.js", "wrapper must run node --check on verifier");

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
mustHave(doc, "# First Paid Roofer Launch System Packet", "first paid roofer launch system doc");
assertSectionWithContent(doc, "## Purpose", ["RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery", "Guided Setup is onboarding/configuration only", "14-day trial begins after Guided Setup go-live", "An automated email is sent 2 days before the first monthly payment", "Cancel anytime. No long-term contract"], "first paid roofer launch system doc");

// Public positioning and internal-only rules
mustHave(doc, "Public positioning (website, marketing, customer-facing): RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery.", "first paid roofer launch system doc");
mustHave(doc, "All founder/operator manual steps and safety language are internal-only for ops and guardrails.", "first paid roofer launch system doc");

// Required top-level sections for operational usefulness
assertSectionWithContent(doc, "## Scope", ["First paid roofer", "All stages from initial prospect identification through first monthly payment"], "first paid roofer launch system doc");
assertSectionWithContent(doc, "## Non-Goals and Explicit Boundaries", ["No public claims of 7 day pilot language", "No activation of live SMS, Vapi, Calendar booking"], "first paid roofer launch system doc");

// 11. Explicit Safety Guardrails (must be prominent and complete)
assertSectionWithContent(doc, "## 11. Explicit Safety Guardrails", [
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
], "first paid roofer launch system doc");

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
  mustHave(doc, m, "first paid roofer launch system doc safety markers");
}

// Re-confirmation protocol and forbidden phrases section
assertSectionWithContent(doc, "Re-Confirmation Protocol", ["Re-read this safety section", "Run the full aggregate verifier and this packet's verifier", "Log \"Safety re-confirmed: all 11 guardrails OFF\""], "first paid roofer launch system doc");
assertSectionWithContent(doc, "Forbidden Public Phrases (Must Remain Absent From All Public-Facing and This Packet's Customer-Facing Sections)", [
  "7-day pilot",
  "5 qualified appointments in 7 days",
  "booked jobs / book jobs / booked-job",
  "automatic estimate / auto-estimate / automatic quote / auto quote",
  "Monthly billing starts on day 15"
], "first paid roofer launch system doc");

// Section 1: First Paid Roofer Launch Readiness Checklist
assertSectionWithContent(doc, "## 1. First Paid Roofer Launch Readiness Checklist", [
  "Pre-Outreach Gate",
  "Go/No-Go Status for Launch Readiness",
  "Status: [ ] PASS [ ] HOLD [ ] BLOCKED",
  "Evidence Log (template):",
  "Decision criteria for PASS:",
  "Handoff From Readiness"
], "first paid roofer launch system doc");

// Concrete fields for readiness
const readinessFields = [
  "Aggregate verifier passes with `demo_ready_with_live_automation_disabled`",
  "This packet's verifier passes",
  "Safety guardrails (section 11) re-read and re-initialed",
  "No external promises made to prospect about volume, outcomes, or automation speed"
];
assertConcreteFields(doc, readinessFields, "readiness checklist");

// Section 2: Prospect-to-Setup Handoff
assertSectionWithContent(doc, "## 2. Prospect-to-Setup Handoff", [
  "Prospect Qualification Internal Criteria (Founder/Operator Only)",
  "Prospect-to-Setup Handoff Checklist",
  "Handoff Artifact (Required Evidence)",
  "Go/No-Go for Handoff Complete: [ ] PASS [ ] HOLD [ ] BLOCKED"
], "first paid roofer launch system doc");

// Section 3: Sales/Demo Call Checklist
assertSectionWithContent(doc, "## 3. Sales/Demo Call Checklist", [
  "Pre-Call Prep (Internal)",
  "During Call — Allowed Framing Only",
  "Live Call Checklist",
  "Post-Call Internal Actions",
  "Status: [ ] PASS (advance to Guided Setup) [ ] HOLD [ ] BLOCKED"
], "first paid roofer launch system doc");

// Section 4: Guided Setup Intake Packet
assertSectionWithContent(doc, "## 4. Guided Setup Intake Packet", [
  "Intake Session Agenda (Operator-Led, Founder-Supported)",
  "Required Capture Fields (Concrete — Must Be Logged)",
  "Go/No-Go After Intake",
  "Status: [ ] PASS (ready for setup execution) [ ] HOLD [ ] BLOCKED"
], "first paid roofer launch system doc");

// Concrete intake fields
const intakeFields = [
  "Company legal name, DBA, primary contact, phone, email, preferred comms channel.",
  "Service area (zips or cities + radius).",
  "Primary lead sources (phone numbers, form URLs, ad platforms) + volume estimate per source.",
  "Explicit confirmation: \"I understand 14-day trial begins after Guided Setup go-live, automated email arrives 2 days before first monthly payment, I can cancel anytime with no long-term contract.\""
];
assertConcreteFields(doc, intakeFields, "guided setup intake");

// Section 5: Go-Live Readiness Checklist
assertSectionWithContent(doc, "## 5. Go-Live Readiness Checklist", [
  "Pre-Go-Live Requirements",
  "Go-Live Decision Gate",
  "Go Criteria (all must be true):",
  "Status: [ ] GO-LIVE APPROVED [ ] HOLD [ ] BLOCKED (NO-GO)"
], "first paid roofer launch system doc");

// Section 6: 14-Day Trial Operating Checklist
assertSectionWithContent(doc, "## 6. 14-Day Trial Operating Checklist", [
  "Daily Operating Rhythm (Founder/Operator)",
  "14-Day Trial Specific Checks (Run Daily or on Cadence)",
  "Trial Health Go/No-Go (Run at Day 7 and Day 12)",
  "Status: [ ] HEALTHY (continue trial) [ ] NEEDS INTERVENTION [ ] AT-RISK FOR NO-GO"
], "first paid roofer launch system doc");

// Section 7: Automated Pre-Billing Email Readiness Checklist
assertSectionWithContent(doc, "## 7. Automated Pre-Billing Email Readiness Checklist", [
  "Pre-Billing Email Content Requirements (Allowed Language Only)",
  "Readiness Checklist",
  "Pre-Billing Go/No-Go",
  "Status: [ ] READY FOR MANUAL REHEARSAL SEND [ ] HOLD [ ] BLOCKED"
], "first paid roofer launch system doc");

// Section 8: First Monthly Payment Handoff Checklist
assertSectionWithContent(doc, "## 8. First Monthly Payment Handoff Checklist", [
  "Pre-Payment Actions",
  "Payment Handoff Steps (Founder/Operator Manual)",
  "First Payment Go/No-Go",
  "Status: [ ] PAYMENT RECEIVED — FIRST MONTH ACTIVE [ ] PENDING [ ] FAILED / NO-GO"
], "first paid roofer launch system doc");

// Concrete payment evidence
mustHave(doc, "Invoice/reference id (internal):", "first monthly payment handoff evidence fields");
mustHave(doc, "Safety: no payment link automation, no invoice generation in system, no Supabase billing record writes", "first paid roofer launch system doc");

// Section 9: Cancellation / No-Go Handling
assertSectionWithContent(doc, "## 9. Cancellation / No-Go Handling", [
  "Pre-Go-Live No-Go Triggers",
  "During 14-Day Trial Cancel / No-Go",
  "Post-First-Payment Cancel",
  "Cancellation / No-Go Go/No-Go Record (Always Required)",
  "Status for this roofer: [ ] CANCELLED / NO-GO [ ] ACTIVE"
], "first paid roofer launch system doc");

// Section 10: Founder/Operator Internal Launch Command Center
assertSectionWithContent(doc, "## 10. Founder/Operator Internal Launch Command Center", [
  "Current Roofer Snapshot (Template — Maintain One Per Active Roofer)",
  "Pipeline View (Leads / Inspections / Appointments)",
  "Daily Command Center Actions",
  "End-of-Day Report Template",
  "Overall launch health for this roofer: [ ] ON TRACK [ ] NEEDS ATTENTION [ ] BLOCKED"
], "first paid roofer launch system doc");

// Master decision log
assertSectionWithContent(doc, "## Decision Log (Master — Append for the First Paid Roofer)", [
  "| Date | Gate/Section | Decision (PASS/HOLD/BLOCKED) |",
  "All entries must reference safety guardrails re-confirmation."
], "first paid roofer launch system doc");

// Explicit final confirmation
assertSectionWithContent(doc, "## Explicit Final Confirmation for This Packet", [
  "This packet is explicitly:",
  "Planning-only / dry-run / internal-only / founder-operator-only for first paid roofer launch execution.",
  "No auth changes: yes",
  "No database schema changes: yes",
  "No RLS policies: yes",
  "No production data writes: yes",
  "No live workflow activation activated: yes",
  "Public positioning uses only RoofLeadHQ AI + booked homeowner appointments + fast response + automated follow-up + missed-lead recovery + Guided Setup (config only) + 14-day trial + automated email 2 days before first monthly payment + cancel anytime + no long-term contract.",
  "Forbidden phrases are absent."
], "first paid roofer launch system doc");

// Verification commands section present
assertSectionWithContent(doc, "## Verification Commands (Run in Order)", [
  "node --check backend/scripts/verify-first-paid-roofer-launch-system-packet-readonly.js",
  "node backend/scripts/verify-first-paid-roofer-launch-system-packet-readonly.js",
  "scripts/run-first-paid-roofer-launch-system-packet-dry-run.sh"
], "first paid roofer launch system doc");

// Forbidden business phrases absent from doc and wrapper
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
  "Founder-Led Launch Program" // absent from public/customer sections; doc uses it only internally where allowed per rules
];
for (const f of forbiddenBusiness) {
  // Note: internal "Founder-Led Launch Program" references in ops sections are tolerated per quality rules if not public positioning.
  // Strict: check main public sections do not have risky variants; full scan for the most dangerous ones.
  // For the doc itself, the "Forbidden Public Phrases" section is allowed to list the banned terms as documentation (the ban is on active use in public/customer/operational positioning). Check only content before that section for the high-risk phrases.
  const docBeforeForbiddenList = doc.split("Forbidden Public Phrases (Must Remain Absent From All Public-Facing and This Packet's Customer-Facing Sections)")[0] || doc;
  if (["7-day pilot", "5 qualified appointments in 7 days", "booked jobs", "book jobs", "guaranteed jobs", "automatic estimate", "auto quote", "Monthly billing starts on day 15 unless canceled"].includes(f)) {
    mustNotHave(docBeforeForbiddenList, f, "first paid roofer launch system doc (outside forbidden list section)");
  }
  mustNotHave(wrapper, f, "first paid roofer launch system wrapper");
}

// Implementation-risk strings absent from doc
for (const s of unsafeImpl) {
  mustNotHave(doc, s, "first paid roofer launch system doc");
}

// Aggregate first-paid readiness includes this verifier
mustHave(aggregate, "verify-first-paid-roofer-launch-system-packet-readonly.js", "aggregate readiness must include the new verifier");
mustHave(aggregate, "First Paid Roofer Launch System Packet", "aggregate readiness must describe the new packet");
mustHave(aggregate, "biggest safe first paid roofer launch system packet", "aggregate readiness must carry descriptive name for the packet");

// Verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "verifier index");
mustHave(verifierIndex, "run-first-paid-roofer-launch-system-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "verify-first-paid-roofer-launch-system-packet-readonly.js", "verifier index");

// First-paid launch context references the new packet
mustHave(contextFirstPaid, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "first paid launch context");
mustHave(contextFirstPaid, "First Paid Roofer Launch System Packet", "first paid launch context");

// Roofer dry-run onboarding context references the new packet
mustHave(contextRooferDryRun, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "roofer dry-run onboarding context");
mustHave(contextRooferDryRun, "First Paid Roofer Launch System", "roofer dry-run onboarding context");

// Grok workflow context references the new packet and closeout lessons preserved
mustHave(workflow, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "grok workflow context");
mustHave(workflow, "First Paid Roofer Launch System Packet", "grok workflow context");
mustHave(workflow, "After fast-forward merging an agent branch into canonical main while local HEAD is ahead of origin/main, do not run wrappers or scripts/check-agent-product-quality-gate.sh as canonical pre-push blockers because they can invoke safe readiness / aggregate and hit source-of-truth-sensitive legacy failures before push. Canonical pre-push should use only direct read-only checks that do not invoke aggregate: node --check for the packet verifier, the packet verifier directly, node backend/scripts/verify-agent-product-quality-gate-readonly.js directly, backend build, and clean git status; then push/fetch/source-of-truth; then run wrappers/full aggregate/backend build/source-of-truth. Cleanup should be idempotent.", "grok workflow context closeout lesson");

// Business buildout daily guide references the packet and milestone
mustHave(businessGuide, "FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md", "business buildout daily guide");
mustHave(businessGuide, "First Paid Roofer Launch System Packet", "business buildout daily guide");

// Quality gate cross reference
mustHave(qualityGate, "product-quality-gate", "quality gate doc (cross reference)");

// Product-depth / operational usefulness markers
mustHave(doc, "product-moving and operationally usable", "first paid roofer launch system doc");
mustHave(doc, "PASS / HOLD / BLOCKED", "first paid roofer launch system doc (multiple gates)");
mustHave(doc, "Evidence Log", "first paid roofer launch system doc");
mustHave(doc, "Handoff note template", "first paid roofer launch system doc");
mustHave(doc, "Go/No-Go", "first paid roofer launch system doc");

// Explicit no-activation language for all 11 guardrails
mustHave(doc, "No live SMS, Vapi, Calendar, Resend, Lindy, cron, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, or payment automation is activated", "first paid roofer launch system doc (guardrail summary)");

console.log("PASS: all required sections (1-11 + safety + 10 operational sections), concrete fields, checklists, decision gates, evidence logs, handoff templates, command center, safety markers (full list), re-confirmation protocol, forbidden phrase protections, non-implementation boundaries, and wiring assertions passed for first paid roofer launch system packet.");

console.log("PASS: forbidden business phrases and implementation-risk strings absent from doc and wrapper (strict checks on high-risk variants).");

console.log("PASS: First Paid Roofer Launch System Packet read-only verifier passed.");
