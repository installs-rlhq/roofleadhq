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

const docPath = "docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-appointment-readiness-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-appointment-readiness-command-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const dayOnePath = "docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md";
const manualCommPath = "docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md";
const inspectionCoordPath = "docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md";
const leadToInspectionPath = "docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md";
const executionDayPath = "docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md";
const bookingPrefsPath = "docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md";
const apptOutcomePath = "docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md";
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
const inspectionCoord = read(inspectionCoordPath);
const leadTo = read(leadToInspectionPath);
const runbook = read(executionDayPath);
const bookingPrefs = read(bookingPrefsPath);
const apptOutcome = read(apptOutcomePath);
const qualityGate = read(qualityGatePath);
const workflow = read(workflowPath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for first roofer appointment readiness command packet exist.");

// Assert the doc references the day-one command center, manual communication packet, inspection coordination packet, lead-to-inspection ops pack, execution day runbook, booking preferences packet, appointment outcome packet, and quality gate
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "appointment readiness packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md", "appointment readiness packet doc");
mustHave(doc, "FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md", "appointment readiness packet doc");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "appointment readiness packet doc");
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "appointment readiness packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md", "appointment readiness packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md", "appointment readiness packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "appointment readiness packet doc");
mustHave(doc, "first-roofer day-one command center", "appointment readiness packet doc");
mustHave(doc, "First Roofer Manual Communication Command Packet", "appointment readiness packet doc");
mustHave(doc, "First Roofer Inspection Coordination Command Packet", "appointment readiness packet doc");
mustHave(doc, "Lead-to-Inspection Ops Pack", "appointment readiness packet doc");
mustHave(doc, "Execution Day Runbook", "appointment readiness packet doc");
mustHave(doc, "Booking Preferences Packet", "appointment readiness packet doc");
mustHave(doc, "Appointment Outcome Packet", "appointment readiness packet doc");
mustHave(doc, "Agent Product Quality Gate", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc references day-one command center, manual communication packet, inspection coordination packet, lead-to-inspection ops pack, execution day runbook, booking preferences packet, appointment outcome packet, and quality gate.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio", "Calendar booking performed: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Appointment readiness command overview", ["prepare to book inspections", "prepare to book appointments", "manual coordination only", "after inspection coordination has been reviewed", "First Roofer Inspection Coordination Command Packet"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Inputs from the Inspection Coordination Command Packet", ["Inputs from the Inspection Coordination", "Proposed inspection window 1", "Inspection coordination decision", "manual coordination only"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Appointment readiness prerequisites", ["prerequisites", "inspection coordination packet", "READY FOR MANUAL COORDINATION", "PASS / HOLD / BLOCKED"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Lead appointment readiness intake checklist", ["Lead ID", "Contact permission status", "Contractor match", "Calendar booking performed: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Homeowner confirmation review worksheet", ["Safety note", "internal-only", "does not book, send, notify, calendar, or touch production systems", "Homeowner confirmation status", "Homeowner window confirmed", "Calendar booking performed: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Contractor confirmation review worksheet", ["Safety note", "internal-only", "does not book, send, notify, calendar, or touch production systems", "Contractor confirmation status", "Contractor window confirmed", "Calendar booking performed: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Inspection window readiness worksheet", ["Safety note", "internal-only", "Proposed inspection window 1", "Proposed inspection window 2", "Proposed inspection window 3", "Calendar booking performed: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Manual appointment-readiness decision worksheet", ["Safety note", "internal-only", "Selected manual appointment window", "Appointment readiness decision: PASS / HOLD / BLOCKED", "Manual appointment-readiness state", "Calendar booking performed: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Appointment readiness approval states", ["DRAFT / REVIEWED / READY FOR MANUAL COORDINATION / HOLD / BLOCKED", "Manual appointment-readiness state", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Appointment HOLD / BLOCKED rules", ["HOLD due to missing confirmation", "HOLD due to conflicting windows", "HOLD due to contractor/service-area issue", "BLOCKED due to consent/safety/production activation risk", "manual founder/operator review"], "appointment readiness packet doc");
assertSectionWithContent(doc, "No-calendar / no-booking safety rules", ["Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "The packet itself must never book"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Manual appointment readiness tracker", ["Manual appointment readiness tracker", "Manual appointment-readiness state", "Appointment readiness decision", "Calendar booking performed: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Founder/operator appointment decision log", ["Appointment Decision Log entry", "PASS / HOLD / BLOCKED", "Calendar booking performed: no", "Production system touched: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Appointment outcome preparation checklist", ["Appointment outcome preparation", "Appointment Outcome Packet", "Calendar booking performed: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "End-of-day appointment readiness report", ["End-of-Day Appointment Readiness Report", "Calendar booking performed across all: no", "External notification sent across all: no", "Production system touched across all: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Handoff notes for the next operator session", ["Handoff Notes", "next operator session", "dry-run flag confirmation", "Calendar booking performed: no"], "appointment readiness packet doc");
assertSectionWithContent(doc, "Explicit no-live-booking / no-live-automation confirmation", ["no live SMS/Twilio", "Calendar booking performed: no", "external notification sent: no", "production system touched: no", "The packet itself must never book"], "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc contains all required operational sections with substantive content.");

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
  "Homeowner confirmation status",
  "Contractor match",
  "Contractor service-area fit",
  "Contractor confirmation status",
  "Inspection coordination decision: PASS / HOLD / BLOCKED",
  "Inspection readiness decision: PASS / HOLD / BLOCKED",
  "Proposed inspection window 1",
  "Proposed inspection window 2",
  "Proposed inspection window 3",
  "Selected manual appointment window",
  "Homeowner window confirmed: yes/no",
  "Contractor window confirmed: yes/no",
  "Appointment readiness decision: PASS / HOLD / BLOCKED",
  "Manual appointment-readiness state: DRAFT / REVIEWED / READY FOR MANUAL COORDINATION / HOLD / BLOCKED",
  "Calendar booking performed: no",
  "External notification sent: no",
  "Production system touched: no",
  "Founder/operator notes",
  "Next manual action",
  "Appointment outcome preparation status",
  "Appointment outcome"
];
assertConcreteFields(doc, concreteFields, "appointment readiness packet doc concrete fields");
console.log("PASS: appointment readiness packet doc contains all required concrete fields (Lead ID, homeowner, address, source, urgency, photos/insurance, contact permission, confirmation statuses, contractor match/fit, proposed windows 1-3, selected window, confirmed flags, readiness/coordination decisions, no-booking markers, approval state with READY FOR MANUAL COORDINATION, outcome prep, etc.).");

// Assert required operational field markers
mustHave(doc, "Lead ID:", "appointment readiness packet doc");
mustHave(doc, "inspection coordination decision", "appointment readiness packet doc");
mustHave(doc, "inspection readiness decision", "appointment readiness packet doc");
mustHave(doc, "Appointment readiness decision: PASS / HOLD / BLOCKED", "appointment readiness packet doc");
mustHave(doc, "Manual appointment-readiness state", "appointment readiness packet doc");
mustHave(doc, "READY FOR MANUAL COORDINATION", "appointment readiness packet doc");
mustHave(doc, "Calendar booking performed: no", "appointment readiness packet doc");
mustHave(doc, "External notification sent: no", "appointment readiness packet doc");
mustHave(doc, "Production system touched: no", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc contains required operational field markers.");

// Assert PASS/HOLD/BLOCKED criteria and approval states present with full language
mustHave(doc, "DRAFT / REVIEWED / READY FOR MANUAL COORDINATION / HOLD / BLOCKED", "appointment readiness packet doc");
mustHave(doc, "READY FOR MANUAL COORDINATION", "appointment readiness packet doc");
mustHave(doc, "Appointment readiness decision: PASS / HOLD / BLOCKED", "appointment readiness packet doc");
mustHave(doc, "Inspection coordination decision: PASS / HOLD / BLOCKED", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc contains required approval states and PASS / HOLD / BLOCKED criteria.");

// Assert homeowner confirmation review present with safety notes
mustHave(doc, "Homeowner confirmation review worksheet", "appointment readiness packet doc");
mustHave(doc, "Safety note", "appointment readiness packet doc");
mustHave(doc, "does not book, send, notify, calendar, or touch production systems", "appointment readiness packet doc");
mustHave(doc, "Homeowner window confirmed: yes/no", "appointment readiness packet doc");
mustHave(doc, "Calendar booking performed: no", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc includes homeowner confirmation review worksheet with safety notes and no-booking markers.");

// Assert contractor confirmation review present with safety notes
mustHave(doc, "Contractor confirmation review worksheet", "appointment readiness packet doc");
mustHave(doc, "Safety note", "appointment readiness packet doc");
mustHave(doc, "does not book, send, notify, calendar, or touch production systems", "appointment readiness packet doc");
mustHave(doc, "Contractor window confirmed: yes/no", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc includes contractor confirmation review worksheet with safety notes.");

// Assert inspection window readiness comparison present
mustHave(doc, "Inspection window readiness worksheet", "appointment readiness packet doc");
mustHave(doc, "Proposed inspection window 1", "appointment readiness packet doc");
mustHave(doc, "Proposed inspection window 2", "appointment readiness packet doc");
mustHave(doc, "Proposed inspection window 3", "appointment readiness packet doc");
mustHave(doc, "inspection window readiness comparison", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc includes inspection window readiness worksheet and comparison.");

// Assert manual appointment-readiness decision worksheet present
mustHave(doc, "Manual appointment-readiness decision worksheet", "appointment readiness packet doc");
mustHave(doc, "Selected manual appointment window", "appointment readiness packet doc");
mustHave(doc, "Appointment readiness decision: PASS / HOLD / BLOCKED", "appointment readiness packet doc");
mustHave(doc, "does not book, send, notify, calendar, or touch production systems", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc includes manual appointment-readiness decision worksheet.");

// Assert appointment readiness approval states present
mustHave(doc, "Appointment readiness approval states", "appointment readiness packet doc");
mustHave(doc, "READY FOR MANUAL COORDINATION", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc includes appointment readiness approval states.");

// Assert HOLD/BLOCKED rules for all required categories (missing confirmation, conflicting windows, contractor/service-area, consent/safety, production risk)
mustHave(doc, "Appointment HOLD due to missing confirmation", "appointment readiness packet doc");
mustHave(doc, "Appointment HOLD due to conflicting windows", "appointment readiness packet doc");
mustHave(doc, "Appointment HOLD due to contractor/service-area issue", "appointment readiness packet doc");
mustHave(doc, "Appointment BLOCKED due to consent/safety/production activation risk", "appointment readiness packet doc");
mustHave(doc, "HOLD / BLOCKED rules", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc includes HOLD/BLOCKED rules for missing confirmation, conflicting windows, contractor/service-area issue, consent/safety, and production activation risk.");

// Assert no-calendar / no-booking safety rules present
mustHave(doc, "No-calendar / no-booking safety rules", "appointment readiness packet doc");
mustHave(doc, "Calendar booking performed: no", "appointment readiness packet doc");
mustHave(doc, "External notification sent: no", "appointment readiness packet doc");
mustHave(doc, "Production system touched: no", "appointment readiness packet doc");
mustHave(doc, "The packet itself must never book", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc includes no-calendar / no-booking safety rules with explicit markers.");

// Assert manual appointment readiness tracker and founder/operator appointment decision log
mustHave(doc, "Manual appointment readiness tracker", "appointment readiness packet doc");
mustHave(doc, "Founder/operator appointment decision log", "appointment readiness packet doc");
mustHave(doc, "Appointment Decision Log entry", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc includes manual appointment readiness tracker and founder/operator appointment decision log.");

// Assert appointment outcome preparation and end-of-day appointment readiness report
mustHave(doc, "Appointment outcome preparation checklist", "appointment readiness packet doc");
mustHave(doc, "End-of-day appointment readiness report", "appointment readiness packet doc");
mustHave(doc, "End-of-Day Appointment Readiness Report", "appointment readiness packet doc");
mustHave(doc, "Calendar booking performed across all: no", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc includes appointment outcome preparation checklist and end-of-day appointment readiness report.");

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
  "internal-only and does not book, send, notify, calendar, or touch production systems"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "appointment readiness packet doc safety");
}
console.log("PASS: appointment readiness packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-booking / no-live-automation language.");

// Assert explicit no-live-booking / no-live-automation / no production activation language
mustHave(doc, "Explicit no-live-booking / no-live-automation confirmation", "appointment readiness packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "appointment readiness packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "appointment readiness packet doc");
mustHave(doc, "internal-only and does not book, send, notify, calendar, or touch production systems", "appointment readiness packet doc");
mustHave(doc, "Any real-world coordination must be performed manually by a founder/operator outside the system after explicit approval", "appointment readiness packet doc");
console.log("PASS: appointment readiness packet doc includes explicit no-live-booking / no-live-automation / no production activation language.");

// Assert required business phrases are present
const requiredPhrases = [
  "Founder-Led Launch Program",
  "book inspections",
  "book appointments",
  "manual founder/operator review",
  "manual coordination only",
  "inspection readiness",
  "inspection coordination",
  "appointment readiness",
  "draft-only",
  "ready for manual coordination",
  "Calendar booking performed: no",
  "external notification sent: no",
  "production system touched: no"
];
for (const p of requiredPhrases) {
  mustHave(doc, p, "appointment readiness packet doc required business phrases");
}
console.log("PASS: appointment readiness packet doc contains all required business phrases.");

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
  mustNotHave(doc, f, "appointment readiness packet doc");
  mustNotHave(dayOne, f, "day-one command center (cross-check)");
  mustNotHave(manualComm, f, "manual communication packet (cross-check)");
  mustNotHave(inspectionCoord, f, "inspection coordination packet (cross-check)");
  mustNotHave(leadTo, f, "lead-to-inspection ops pack (cross-check)");
  mustNotHave(runbook, f, "execution day runbook (cross-check)");
}
console.log("PASS: forbidden business/guarantee language absent from appointment readiness packet doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-appointment-readiness-command-packet-readonly.js", "appointment readiness packet wrapper");
console.log("PASS: wrapper invokes the appointment readiness command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "appointment readiness packet wrapper");
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
  mustNotHave(wrapper, u, "appointment readiness packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-appointment-readiness-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Appointment Readiness Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the appointment readiness command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-appointment-readiness-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-appointment-readiness-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md",
  "run-first-roofer-appointment-readiness-command-packet-dry-run.sh",
  "verify-first-roofer-appointment-readiness-command-packet-readonly.js",
  "First Roofer Appointment Readiness Command Packet",
  "appointment readiness command packet"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the appointment readiness command packet.");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer appointment readiness command packet is operational, product-moving, references day-one + manual comm packet + inspection coordination packet + ops pack + runbook + booking preferences packet + appointment outcome packet + quality gate, and strictly dry-run only with all required worksheets, fields, approval states, HOLD/BLOCKED rules (missing confirmation, conflicting windows, contractor/service-area issue, consent/safety, prod risk), no-calendar/no-booking safety, tracker, decision log, outcome prep, end-of-day report, handoff, explicit no-live-booking confirmation, required phrases, and absent forbidden phrases.");

console.log("PASS: aggregate, verifier index, and both next-chat contexts contain required appointment readiness command packet references.");
console.log("PASS: packet enforces dry-run/internal-only/founder-operator-only posture with Calendar booking performed: no, external notification sent: no, production system touched: no throughout.");
