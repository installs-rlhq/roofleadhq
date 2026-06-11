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

const docPath = "docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-inspection-coordination-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-inspection-coordination-command-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const dayOnePath = "docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md";
const manualCommPath = "docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md";
const leadToInspectionPath = "docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md";
const executionDayPath = "docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const dayOne = read(dayOnePath);
const manualComm = read(manualCommPath);
const leadTo = read(leadToInspectionPath);
const runbook = read(executionDayPath);
const qualityGate = read(qualityGatePath);
const workflow = read(workflowPath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for first roofer inspection coordination command packet exist.");

// Assert the doc references the day-one command center, manual communication packet, lead-to-inspection ops pack, execution day runbook, and quality gate
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "inspection coordination packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md", "inspection coordination packet doc");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "inspection coordination packet doc");
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "inspection coordination packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "inspection coordination packet doc");
mustHave(doc, "first-roofer day-one command center", "inspection coordination packet doc");
mustHave(doc, "First Roofer Manual Communication Command Packet", "inspection coordination packet doc");
mustHave(doc, "Lead-to-Inspection Ops Pack", "inspection coordination packet doc");
mustHave(doc, "Execution Day Runbook", "inspection coordination packet doc");
mustHave(doc, "Agent Product Quality Gate", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc references day-one command center, manual communication packet, lead-to-inspection ops pack, execution day runbook, and quality gate.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio", "Calendar booking performed: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Inspection coordination command overview", ["prepare to book inspections", "manual coordination only", "after communication drafts are prepared and approved", "First Roofer Manual Communication Command Packet"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Inspection coordination readiness prerequisites", ["prerequisites", "manual communication packet", "APPROVED FOR MANUAL USE", "PASS / HOLD / BLOCKED"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Lead inspection coordination intake checklist", ["Lead ID", "Contact permission status", "Contractor match", "Calendar booking performed: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Homeowner availability capture worksheet", ["Safety note", "internal-only", "does not book, send, notify, or touch production systems", "Homeowner availability windows", "Calendar booking performed: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Contractor availability capture worksheet", ["Safety note", "internal-only", "does not book, send, notify, or touch production systems", "Contractor availability windows", "Calendar booking performed: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Service-area and route-fit worksheet", ["Safety note", "internal-only", "service-area fit", "route", "Calendar booking performed: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Inspection window options worksheet", ["Safety note", "internal-only", "Proposed inspection window 1", "Proposed inspection window 2", "Proposed inspection window 3", "Calendar booking performed: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Manual inspection confirmation checklist", ["Safety note", "internal-only", "Manual Homeowner Inspection Confirmation", "Manual Contractor Inspection Confirmation", "APPROVED FOR MANUAL COORDINATION", "Calendar booking performed: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Inspection coordination approval states", ["DRAFT / REVIEWED / APPROVED FOR MANUAL COORDINATION / HOLD / BLOCKED", "Manual approval state", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Inspection HOLD / BLOCKED rules", ["HOLD due to missing information", "HOLD due to availability conflict", "HOLD due to service-area/route fit", "BLOCKED due to consent/safety/production activation risk", "manual founder/operator review"], "inspection coordination packet doc");
assertSectionWithContent(doc, "No-calendar / no-booking safety rules", ["Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "The packet itself must never book"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Manual inspection coordination tracker", ["Manual inspection coordination tracker", "Approval State", "Inspection readiness decision", "Calendar booking performed: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Founder/operator inspection decision log", ["Inspection Decision Log entry", "PASS / HOLD / BLOCKED", "Calendar booking performed: no", "Production system touched: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Inspection outcome capture", ["Inspection Outcome Capture", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "End-of-day inspection coordination report", ["End-of-Day Inspection Coordination Report", "Calendar booking performed across all: no", "External notification sent across all: no", "Production system touched across all: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Handoff notes for the next operator session", ["Handoff Notes", "next operator session", "dry-run flag confirmation", "Calendar booking performed: no"], "inspection coordination packet doc");
assertSectionWithContent(doc, "Explicit no-live-booking / no-live-automation confirmation", ["no live SMS/Twilio", "Calendar booking performed: no", "external notification sent: no", "production system touched: no", "The packet itself must never book"], "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc contains all required operational sections with substantive content.");

// Assert concrete fields (not just headings) are present
const concreteFields = [
  "Lead ID",
  "Homeowner name",
  "Property address",
  "Lead source",
  "Source detail",
  "Service type",
  "Urgency",
  "Damage description",
  "Photos present: yes/no/unknown",
  "Insurance involvement: yes/no/unknown",
  "Contact permission status",
  "Homeowner preferred channel",
  "Homeowner availability windows",
  "Contractor match",
  "Contractor service-area fit",
  "Contractor availability windows",
  "Route/service-area notes",
  "Proposed inspection window 1",
  "Proposed inspection window 2",
  "Proposed inspection window 3",
  "Manual homeowner confirmation prepared: yes/no",
  "Manual contractor confirmation prepared: yes/no",
  "Inspection readiness decision: PASS / HOLD / BLOCKED",
  "Inspection coordination decision: PASS / HOLD / BLOCKED",
  "Calendar booking performed: no",
  "External notification sent: no",
  "Production system touched: no",
  "Manual approval state: DRAFT / REVIEWED / APPROVED FOR MANUAL COORDINATION / HOLD / BLOCKED",
  "Founder/operator notes",
  "Next manual action",
  "Inspection outcome"
];
assertConcreteFields(doc, concreteFields, "inspection coordination packet doc concrete fields");
console.log("PASS: inspection coordination packet doc contains all required concrete fields (Lead ID, homeowner, address, availability windows, contractor match, service-area/route fit, proposed windows, confirmation prepared flags, readiness/coordination decisions, no-booking markers, approval states, outcome, etc.).");

// Assert required operational field markers
mustHave(doc, "Lead ID:", "inspection coordination packet doc");
mustHave(doc, "inspection readiness decision", "inspection coordination packet doc");
mustHave(doc, "inspection coordination decision", "inspection coordination packet doc");
mustHave(doc, "Calendar booking performed: no", "inspection coordination packet doc");
mustHave(doc, "External notification sent: no", "inspection coordination packet doc");
mustHave(doc, "Production system touched: no", "inspection coordination packet doc");
mustHave(doc, "Manual approval state", "inspection coordination packet doc");
mustHave(doc, "APPROVED FOR MANUAL COORDINATION", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc contains required operational field markers.");

// Assert PASS/HOLD/BLOCKED criteria and approval states present with full language
mustHave(doc, "DRAFT / REVIEWED / APPROVED FOR MANUAL COORDINATION / HOLD / BLOCKED", "inspection coordination packet doc");
mustHave(doc, "APPROVED FOR MANUAL COORDINATION", "inspection coordination packet doc");
mustHave(doc, "Inspection readiness decision: PASS / HOLD / BLOCKED", "inspection coordination packet doc");
mustHave(doc, "Inspection coordination decision: PASS / HOLD / BLOCKED", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc contains required approval states and PASS / HOLD / BLOCKED criteria.");

// Assert homeowner availability capture present with safety notes
mustHave(doc, "Homeowner availability capture worksheet", "inspection coordination packet doc");
mustHave(doc, "Safety note", "inspection coordination packet doc");
mustHave(doc, "does not book, send, notify, or touch production systems", "inspection coordination packet doc");
mustHave(doc, "Calendar booking performed: no", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc includes homeowner availability capture worksheet with safety notes and no-booking markers.");

// Assert contractor availability capture present with safety notes
mustHave(doc, "Contractor availability capture worksheet", "inspection coordination packet doc");
mustHave(doc, "Safety note", "inspection coordination packet doc");
mustHave(doc, "does not book, send, notify, or touch production systems", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc includes contractor availability capture worksheet with safety notes.");

// Assert service-area and route-fit worksheet present
mustHave(doc, "Service-area and route-fit worksheet", "inspection coordination packet doc");
mustHave(doc, "service-area fit", "inspection coordination packet doc");
mustHave(doc, "route", "inspection coordination packet doc");
mustHave(doc, "Calendar booking performed: no", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc includes service-area and route-fit worksheet.");

// Assert inspection window options / comparison present
mustHave(doc, "Inspection window options worksheet", "inspection coordination packet doc");
mustHave(doc, "Proposed inspection window 1", "inspection coordination packet doc");
mustHave(doc, "Proposed inspection window 2", "inspection coordination packet doc");
mustHave(doc, "Proposed inspection window 3", "inspection coordination packet doc");
mustHave(doc, "inspection window comparison", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc includes inspection window options worksheet and comparison.");

// Assert manual homeowner and contractor inspection confirmation checklists present
mustHave(doc, "Manual Homeowner Inspection Confirmation", "inspection coordination packet doc");
mustHave(doc, "Manual Contractor Inspection Confirmation", "inspection coordination packet doc");
mustHave(doc, "Manual inspection confirmation checklist", "inspection coordination packet doc");
mustHave(doc, "APPROVED FOR MANUAL COORDINATION", "inspection coordination packet doc");
mustHave(doc, "does not book, send, notify, or touch production systems", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc includes manual homeowner and contractor inspection confirmation checklists with safety notes.");

// Assert inspection coordination approval states present
mustHave(doc, "Inspection coordination approval states", "inspection coordination packet doc");
mustHave(doc, "APPROVED FOR MANUAL COORDINATION", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc includes inspection coordination approval states.");

// Assert HOLD/BLOCKED rules for all required categories
mustHave(doc, "Inspection HOLD due to missing information", "inspection coordination packet doc");
mustHave(doc, "Inspection HOLD due to availability conflict", "inspection coordination packet doc");
mustHave(doc, "Inspection HOLD due to service-area/route fit", "inspection coordination packet doc");
mustHave(doc, "Inspection BLOCKED due to consent/safety/production activation risk", "inspection coordination packet doc");
mustHave(doc, "HOLD / BLOCKED rules", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc includes HOLD/BLOCKED rules for missing information, availability conflict, service-area/route fit, consent/safety, and production activation risk.");

// Assert no-calendar / no-booking safety rules present
mustHave(doc, "No-calendar / no-booking safety rules", "inspection coordination packet doc");
mustHave(doc, "Calendar booking performed: no", "inspection coordination packet doc");
mustHave(doc, "External notification sent: no", "inspection coordination packet doc");
mustHave(doc, "Production system touched: no", "inspection coordination packet doc");
mustHave(doc, "The packet itself must never book", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc includes no-calendar / no-booking safety rules with explicit markers.");

// Assert manual inspection coordination tracker and founder/operator inspection decision log
mustHave(doc, "Manual inspection coordination tracker", "inspection coordination packet doc");
mustHave(doc, "Founder/operator inspection decision log", "inspection coordination packet doc");
mustHave(doc, "Inspection Decision Log entry", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc includes manual inspection coordination tracker and founder/operator inspection decision log.");

// Assert inspection outcome capture and end-of-day inspection coordination report
mustHave(doc, "Inspection outcome capture", "inspection coordination packet doc");
mustHave(doc, "End-of-day inspection coordination report", "inspection coordination packet doc");
mustHave(doc, "End-of-Day Inspection Coordination Report", "inspection coordination packet doc");
mustHave(doc, "Calendar booking performed across all: no", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc includes inspection outcome capture and end-of-day inspection coordination report.");

// Assert dry-run/internal-only/founder-operator-only posture with all required flags and no-live language
const safetyMarkers = [
  "dry-run/internal-only/founder-operator-only",
  "no live SMS/Twilio",
  "no live Vapi calls",
  "no Calendar activation",
  "no Resend production sends",
  "no Lindy external sends",
  "no cron/scheduler/dispatcher activation",
  "no public route activation",
  "no production Supabase writes",
  "no external notifications",
  "no production credentials",
  "no automated booking",
  "no production route activation",
  "Calendar booking performed: no",
  "External notification sent: no",
  "Production system touched: no",
  "WORKSPACE_MODE=dry-run",
  "SMS_ACTIVATION=false",
  "CALENDAR_ACTIVATION=false",
  "VAPI_ACTIVATION=false",
  "SUPABASE_WRITES=false",
  "CONTRACTOR_NOTIFICATION=false",
  "HOMEOWNER_NOTIFICATION=false",
  "CRON_ACTIVATION=false",
  "SCHEDULER_ACTIVATION=false",
  "DISPATCHER_ACTIVATION=false",
  "PUBLIC_ROUTE_ACTIVATION=false",
  "The packet itself must never book",
  "internal-only and does not book, send, notify, or touch production systems"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "inspection coordination packet doc safety");
}
console.log("PASS: inspection coordination packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-booking / no-live-automation language.");

// Assert explicit no-live-booking / no-live-automation / no production activation language
mustHave(doc, "Explicit no-live-booking / no-live-automation confirmation", "inspection coordination packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "inspection coordination packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "inspection coordination packet doc");
mustHave(doc, "internal-only and does not book, send, notify, or touch production systems", "inspection coordination packet doc");
mustHave(doc, "Any real-world coordination must be performed manually by a founder/operator outside the system after explicit approval", "inspection coordination packet doc");
console.log("PASS: inspection coordination packet doc includes explicit no-live-booking / no-live-automation / no production activation language.");

// Assert required business phrases are present
const requiredPhrases = [
  "Founder-Led Launch Program",
  "book inspections",
  "manual founder/operator review",
  "manual coordination only",
  "inspection readiness",
  "inspection coordination",
  "draft-only",
  "approved for manual coordination",
  "Calendar booking performed: no",
  "external notification sent: no",
  "production system touched: no"
];
for (const p of requiredPhrases) {
  mustHave(doc, p, "inspection coordination packet doc required business phrases");
}
console.log("PASS: inspection coordination packet doc contains all required business phrases.");

// Assert forbidden business phrases are absent (in doc and cross-check prior first-roofer artifacts)
const forbidden = [
  "7-day pilot",
  "5 qualified appointments in 7 days",
  "book jobs",
  "booked jobs",
  "guaranteed jobs",
  "guaranteed revenue",
  "guarantee jobs",
  "guarantee revenue",
  "live dispatch",
  "production automation"
];
for (const f of forbidden) {
  mustNotHave(doc, f, "inspection coordination packet doc");
  mustNotHave(dayOne, f, "day-one command center (cross-check)");
  mustNotHave(manualComm, f, "manual communication packet (cross-check)");
  mustNotHave(leadTo, f, "lead-to-inspection ops pack (cross-check)");
  mustNotHave(runbook, f, "execution day runbook (cross-check)");
}
console.log("PASS: forbidden business/guarantee language absent from inspection coordination packet doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-inspection-coordination-command-packet-readonly.js", "inspection coordination packet wrapper");
console.log("PASS: wrapper invokes the inspection coordination command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "inspection coordination packet wrapper");
console.log("PASS: wrapper calls scripts/check-agent-product-quality-gate.sh.");

// Assert no unsafe implementation strings in the wrapper
const unsafe = [
  "twilio.messages.create",
  "supabase.from(",
  "resend.emails.send",
  "calendar.events.insert",
  "vapi.calls.create",
  "retell.call",
  "curl -X POST https://",
  "fetch(\"https://",
  "fetch('https://"
];
for (const u of unsafe) {
  mustNotHave(wrapper, u, "inspection coordination packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-inspection-coordination-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Inspection Coordination Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the inspection coordination command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-inspection-coordination-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-inspection-coordination-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md",
  "run-first-roofer-inspection-coordination-command-packet-dry-run.sh",
  "verify-first-roofer-inspection-coordination-command-packet-readonly.js",
  "First Roofer Inspection Coordination Command Packet",
  "inspection coordination command packet"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the inspection coordination command packet.");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer inspection coordination command packet is operational, product-moving, references day-one + manual comm packet + ops pack + runbook + quality gate, and strictly dry-run only with all required worksheets, fields, approval states, HOLD/BLOCKED rules (missing info, avail conflict, route fit, consent/safety, prod risk), no-calendar/no-booking safety, tracker, decision log, outcome, end-of-day report, handoff, explicit no-live-booking confirmation, required phrases, and absent forbidden phrases.");

console.log("PASS: aggregate, verifier index, and both next-chat contexts contain required inspection coordination command packet references.");
console.log("PASS: packet enforces dry-run/internal-only/founder-operator-only posture with Calendar booking performed: no, external notification sent: no, production system touched: no throughout.");
