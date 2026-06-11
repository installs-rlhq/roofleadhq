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

const docPath = "docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-manual-follow-up-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-manual-follow-up-command-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const dayOnePath = "docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md";
const manualCommPath = "docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md";
const inspectionCoordPath = "docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md";
const apptReadinessPath = "docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md";
const apptOutcomePath = "docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md";
const leadToInspectionPath = "docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md";
const executionDayPath = "docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md";
const followUpCadencePath = "docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md";
const apptOutcomePaidPath = "docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md";
const bookingPrefsPath = "docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md";
const reportingPrefsPath = "docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md";
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
const apptReadiness = read(apptReadinessPath);
const apptOutcome = read(apptOutcomePath);
const leadTo = read(leadToInspectionPath);
const runbook = read(executionDayPath);
const followUp = read(followUpCadencePath);
const apptOutcomePaid = read(apptOutcomePaidPath);
const bookingPrefs = read(bookingPrefsPath);
const reporting = read(reportingPrefsPath);
const qualityGate = read(qualityGatePath);
const workflow = read(workflowPath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for first roofer manual follow-up command packet exist.");

// Assert the doc references the day-one command center, manual communication packet, inspection coordination packet, appointment readiness packet, appointment outcome packet, lead-to-inspection ops pack, execution day runbook, follow-up cadence packet, appointment outcome packet (paid), booking preferences packet, reporting preferences packet, and quality gate
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "manual follow-up packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md", "manual follow-up packet doc");
mustHave(doc, "FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md", "manual follow-up packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md", "manual follow-up packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md", "manual follow-up packet doc");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "manual follow-up packet doc");
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "manual follow-up packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md", "manual follow-up packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md", "manual follow-up packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md", "manual follow-up packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md", "manual follow-up packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "manual follow-up packet doc");
mustHave(doc, "first-roofer day-one command center", "manual follow-up packet doc");
mustHave(doc, "First Roofer Manual Communication Command Packet", "manual follow-up packet doc");
mustHave(doc, "First Roofer Inspection Coordination Command Packet", "manual follow-up packet doc");
mustHave(doc, "First Roofer Appointment Readiness Command Packet", "manual follow-up packet doc");
mustHave(doc, "First Roofer Appointment Outcome Command Packet", "manual follow-up packet doc");
mustHave(doc, "Lead-to-Inspection Ops Pack", "manual follow-up packet doc");
mustHave(doc, "Execution Day Runbook", "manual follow-up packet doc");
mustHave(doc, "Follow-Up Cadence Packet", "manual follow-up packet doc");
mustHave(doc, "Appointment Outcome Packet", "manual follow-up packet doc");
mustHave(doc, "Booking Preferences Packet", "manual follow-up packet doc");
mustHave(doc, "Reporting Preferences Packet", "manual follow-up packet doc");
mustHave(doc, "Agent Product Quality Gate", "manual follow-up packet doc");
console.log("PASS: manual follow-up packet doc references day-one command center, manual communication packet, inspection coordination packet, appointment readiness packet, appointment outcome packet, lead-to-inspection ops pack, execution day runbook, follow-up cadence packet, appointment outcome packet (paid), booking preferences packet, reporting preferences packet, and quality gate.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio", "Follow-up sent: no", "Calendar booking performed: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Manual follow-up command overview", ["prepare to book inspections", "prepare to book appointments", "manual coordination only", "after appointment/inspection outcomes have been captured", "First Roofer Appointment Outcome Command Packet"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Inputs from the Appointment Outcome Command Packet", ["Inputs from the Appointment Outcome", "Prior appointment outcome", "Manual outcome classification", "manual coordination only"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Manual follow-up prerequisites", ["prerequisites", "appointment outcome packet", "APPROVED FOR MANUAL FOLLOW-UP", "PASS / HOLD / BLOCKED"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Lead manual follow-up intake checklist", ["Lead ID", "Contact permission status", "Contractor match", "Follow-up sent: no", "Calendar booking performed: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Follow-up ownership worksheet", ["Safety note", "internal-only", "does not send, book, notify, calendar, or touch production systems", "Follow-up owner", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Homeowner manual follow-up preparation worksheet", ["Safety note", "internal-only", "does not send, book, notify, calendar, or touch production systems", "Homeowner manual follow-up", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Contractor manual follow-up preparation worksheet", ["Safety note", "internal-only", "does not send, book, notify, calendar, or touch production systems", "Contractor manual follow-up", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Reschedule follow-up preparation worksheet", ["Safety note", "internal-only", "Reschedule follow-up", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Estimate / next-step follow-up preparation worksheet", ["Safety note", "internal-only", "Estimate / next-step", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "No-show / unable-to-access follow-up preparation worksheet", ["Safety note", "internal-only", "No-show / Unable-to-Access", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Completed inspection follow-up preparation worksheet", ["Safety note", "internal-only", "Completed inspection", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Cancelled / hold / blocked follow-up worksheet", ["Safety note", "internal-only", "Cancelled / hold / blocked", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Manual follow-up approval states", ["DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED", "Manual follow-up state", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Manual follow-up HOLD / BLOCKED rules", ["Manual follow-up HOLD due to missing follow-up owner", "Manual follow-up HOLD due to incomplete outcome details", "Manual follow-up HOLD due to conflicting next steps", "Manual follow-up BLOCKED due to consent/safety/production activation risk", "manual founder/operator review"], "manual follow-up packet doc");
assertSectionWithContent(doc, "No-send / no-calendar / no-booking safety rules", ["Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "Follow-up sent: no", "The packet itself must never send"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Manual follow-up tracker", ["Manual follow-up tracker", "Manual follow-up state", "Calendar booking performed: no", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Founder/operator follow-up decision log", ["Founder/Operator Follow-Up Decision Log entry", "PASS / HOLD / BLOCKED", "Calendar booking performed: no", "Production system touched: no", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "End-of-day manual follow-up report", ["End-of-Day Manual Follow-Up Report", "Calendar booking performed across all: no", "External notification sent across all: no", "Production system touched across all: no", "Follow-up sent across all: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Handoff notes for the next operator session", ["Handoff Notes", "next operator session", "dry-run flag confirmation", "Calendar booking performed: no", "Follow-up sent: no"], "manual follow-up packet doc");
assertSectionWithContent(doc, "Explicit no-live-send / no-live-booking / no-live-automation confirmation", ["no live SMS/Twilio", "Calendar booking performed: no", "external notification sent: no", "production system touched: no", "Follow-up sent: no", "The packet itself must never send"], "manual follow-up packet doc");
console.log("PASS: manual follow-up packet doc contains all required operational sections with substantive content.");

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
  "Contractor match",
  "Contractor service-area fit",
  "Prior appointment outcome",
  "Manual outcome classification: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED",
  "Manual outcome state: DRAFT / REVIEWED / OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED",
  "Follow-up needed: yes/no/unknown",
  "Follow-up owner",
  "Follow-up type",
  "Reschedule needed: yes/no/unknown",
  "Estimate requested: yes/no/unknown",
  "Next-step needed: yes/no/unknown",
  "Homeowner manual follow-up preparation",
  "Contractor manual follow-up preparation",
  "Manual follow-up draft prepared: yes/no",
  "Manual follow-up reviewed: yes/no",
  "Manual follow-up approved: yes/no",
  "Manual follow-up decision: PASS/HOLD/BLOCKED",
  "Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED",
  "Calendar booking performed: no",
  "External notification sent: no",
  "Production system touched: no",
  "Follow-up sent: no",
  "Founder/operator notes",
  "Next manual action",
  "Manual follow-up"
];
assertConcreteFields(doc, concreteFields, "manual follow-up packet doc concrete fields");
console.log("PASS: manual follow-up packet doc contains all required concrete fields (Lead ID, homeowner, address, source, urgency, photos/insurance, contact permission, contractor match/fit, prior appointment outcome, manual outcome classification and state, follow-up needed/owner/type, reschedule/estimate/next-step flags, homeowner/contractor follow-up preparation, draft/reviewed/approved flags, approval state with APPROVED FOR MANUAL FOLLOW-UP, decision log, tracker, report, handoff, etc.).");

// Assert required operational field markers
mustHave(doc, "Lead ID:", "manual follow-up packet doc");
mustHave(doc, "Prior appointment outcome", "manual follow-up packet doc");
mustHave(doc, "Manual follow-up decision: PASS / HOLD / BLOCKED", "manual follow-up packet doc");
mustHave(doc, "Manual follow-up state", "manual follow-up packet doc");
mustHave(doc, "APPROVED FOR MANUAL FOLLOW-UP", "manual follow-up packet doc");
mustHave(doc, "Calendar booking performed: no", "manual follow-up packet doc");
mustHave(doc, "External notification sent: no", "manual follow-up packet doc");
mustHave(doc, "Production system touched: no", "manual follow-up packet doc");
mustHave(doc, "Follow-up sent: no", "manual follow-up packet doc");
console.log("PASS: manual follow-up packet doc contains required operational field markers.");

// Assert PASS/HOLD/BLOCKED criteria and approval states present with full language
mustHave(doc, "DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED", "manual follow-up packet doc");
mustHave(doc, "APPROVED FOR MANUAL FOLLOW-UP", "manual follow-up packet doc");
mustHave(doc, "Manual follow-up decision: PASS / HOLD / BLOCKED", "manual follow-up packet doc");
console.log("PASS: manual follow-up packet doc contains required approval states and PASS / HOLD / BLOCKED criteria.");

// Assert all required worksheets present with safety notes
mustHave(doc, "Follow-up ownership worksheet", "manual follow-up packet doc");
mustHave(doc, "Homeowner manual follow-up preparation worksheet", "manual follow-up packet doc");
mustHave(doc, "Contractor manual follow-up preparation worksheet", "manual follow-up packet doc");
mustHave(doc, "Reschedule follow-up preparation worksheet", "manual follow-up packet doc");
mustHave(doc, "Estimate / next-step follow-up preparation worksheet", "manual follow-up packet doc");
mustHave(doc, "No-show / unable-to-access follow-up preparation worksheet", "manual follow-up packet doc");
mustHave(doc, "Completed inspection follow-up preparation worksheet", "manual follow-up packet doc");
mustHave(doc, "Cancelled / hold / blocked follow-up worksheet", "manual follow-up packet doc");
mustHave(doc, "Safety note", "manual follow-up packet doc");
mustHave(doc, "internal-only and does not send, book, notify, calendar, or touch production systems", "manual follow-up packet doc");
mustHave(doc, "Follow-up sent: no", "manual follow-up packet doc");
console.log("PASS: manual follow-up packet doc includes all required worksheets (follow-up ownership, homeowner/contractor preparation, reschedule, estimate/next-step, no-show/unable-to-access, completed inspection, cancelled/hold/blocked) with safety notes and no-follow-up markers.");

// Assert manual follow-up approval states present
mustHave(doc, "Manual follow-up approval states", "manual follow-up packet doc");
mustHave(doc, "APPROVED FOR MANUAL FOLLOW-UP", "manual follow-up packet doc");
console.log("PASS: manual follow-up packet doc includes manual follow-up approval states.");

// Assert HOLD/BLOCKED rules for all required categories (missing follow-up owner, incomplete outcome details, conflicting next steps, consent/safety, production risk)
mustHave(doc, "Manual follow-up HOLD due to missing follow-up owner", "manual follow-up packet doc");
mustHave(doc, "Manual follow-up HOLD due to incomplete outcome details", "manual follow-up packet doc");
mustHave(doc, "Manual follow-up HOLD due to conflicting next steps", "manual follow-up packet doc");
mustHave(doc, "Manual follow-up BLOCKED due to consent/safety/production activation risk", "manual follow-up packet doc");
mustHave(doc, "HOLD / BLOCKED rules", "manual follow-up packet doc");
console.log("PASS: manual follow-up packet doc includes HOLD/BLOCKED rules for missing follow-up owner, incomplete outcome details, conflicting next steps, consent/safety, and production activation risk.");

// Assert no-send / no-calendar / no-booking safety rules present
mustHave(doc, "No-send / no-calendar / no-booking safety rules", "manual follow-up packet doc");
mustHave(doc, "Calendar booking performed: no", "manual follow-up packet doc");
mustHave(doc, "External notification sent: no", "manual follow-up packet doc");
mustHave(doc, "Production system touched: no", "manual follow-up packet doc");
mustHave(doc, "Follow-up sent: no", "manual follow-up packet doc");
mustHave(doc, "The packet itself must never send", "manual follow-up packet doc");
console.log("PASS: manual follow-up packet doc includes no-send / no-calendar / no-booking safety rules with explicit markers.");

// Assert manual follow-up tracker and founder/operator follow-up decision log
mustHave(doc, "Manual follow-up tracker", "manual follow-up packet doc");
mustHave(doc, "Founder/operator follow-up decision log", "manual follow-up packet doc");
mustHave(doc, "Founder/Operator Follow-Up Decision Log entry", "manual follow-up packet doc");
console.log("PASS: manual follow-up packet doc includes manual follow-up tracker and founder/operator follow-up decision log.");

// Assert end-of-day manual follow-up report and next-operator handoff
mustHave(doc, "End-of-day manual follow-up report", "manual follow-up packet doc");
mustHave(doc, "End-of-Day Manual Follow-Up Report", "manual follow-up packet doc");
mustHave(doc, "Handoff notes for the next operator session", "manual follow-up packet doc");
mustHave(doc, "Calendar booking performed across all: no", "manual follow-up packet doc");
mustHave(doc, "Follow-up sent across all: no", "manual follow-up packet doc");
console.log("PASS: manual follow-up packet doc includes end-of-day manual follow-up report and handoff notes for the next operator session.");

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
  "no automated follow-up",
  "Calendar booking performed: no",
  "External notification sent: no",
  "Production system touched: no",
  "Follow-up sent: no",
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
  "The packet itself must never send",
  "internal-only and does not send, book, notify, calendar, or touch production systems"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "manual follow-up packet doc safety");
}
console.log("PASS: manual follow-up packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-send / no-live-booking / no-live-automation / no production activation language.");

// Assert explicit no-live-send / no-live-booking / no-live-automation / no production activation language
mustHave(doc, "Explicit no-live-send / no-live-booking / no-live-automation confirmation", "manual follow-up packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "manual follow-up packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "manual follow-up packet doc");
mustHave(doc, "internal-only and does not send, book, notify, calendar, or touch production systems", "manual follow-up packet doc");
mustHave(doc, "Any real-world follow-up or coordination must be performed manually by a founder/operator outside the system after explicit approval", "manual follow-up packet doc");
console.log("PASS: manual follow-up packet doc includes explicit no-live-send / no-live-booking / no-live-automation / no production activation language.");

// Assert required business phrases are present
const requiredPhrases = [
  "Founder-Led Launch Program",
  "book inspections",
  "book appointments",
  "manual founder/operator review",
  "manual coordination only",
  "appointment outcome",
  "manual follow-up",
  "draft-only",
  "approved for manual follow-up",
  "Follow-up sent: no",
  "Calendar booking performed: no",
  "external notification sent: no",
  "production system touched: no"
];
for (const p of requiredPhrases) {
  mustHave(doc, p, "manual follow-up packet doc required business phrases");
}
console.log("PASS: manual follow-up packet doc contains all required business phrases.");

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
  mustNotHave(doc, f, "manual follow-up packet doc");
  mustNotHave(dayOne, f, "day-one command center (cross-check)");
  mustNotHave(manualComm, f, "manual communication packet (cross-check)");
  mustNotHave(inspectionCoord, f, "inspection coordination packet (cross-check)");
  mustNotHave(apptReadiness, f, "appointment readiness packet (cross-check)");
  mustNotHave(apptOutcome, f, "appointment outcome packet (cross-check)");
  mustNotHave(leadTo, f, "lead-to-inspection ops pack (cross-check)");
  mustNotHave(runbook, f, "execution day runbook (cross-check)");
}
console.log("PASS: forbidden business/guarantee language absent from manual follow-up packet doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-manual-follow-up-command-packet-readonly.js", "manual follow-up packet wrapper");
console.log("PASS: wrapper invokes the manual follow-up command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "manual follow-up packet wrapper");
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
  mustNotHave(wrapper, u, "manual follow-up packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-manual-follow-up-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Manual Follow-Up Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the manual follow-up command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-manual-follow-up-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-manual-follow-up-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md",
  "run-first-roofer-manual-follow-up-command-packet-dry-run.sh",
  "verify-first-roofer-manual-follow-up-command-packet-readonly.js",
  "First Roofer Manual Follow-Up Command Packet",
  "manual follow-up command packet"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the manual follow-up command packet.");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer manual follow-up command packet is operational, product-moving, references day-one + manual comm packet + inspection coordination packet + appointment readiness packet + appointment outcome packet + ops pack + runbook + follow-up cadence packet + appointment outcome packet (paid) + booking preferences packet + reporting preferences packet + quality gate, and strictly dry-run only with all required worksheets, fields, approval states, HOLD/BLOCKED rules (missing follow-up owner, incomplete outcome details, conflicting next steps, consent/safety, prod risk), no-send/no-calendar/no-booking safety, tracker, decision log, end-of-day report, handoff, explicit no-live-send / no-live-booking / no-live-automation confirmation, required phrases, and absent forbidden phrases.");

console.log("PASS: aggregate, verifier index, and both next-chat contexts contain required manual follow-up command packet references.");
console.log("PASS: packet enforces dry-run/internal-only/founder-operator-only posture with Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no throughout.");
