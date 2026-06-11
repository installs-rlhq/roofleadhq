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

const docPath = "docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-appointment-outcome-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-appointment-outcome-command-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const dayOnePath = "docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md";
const manualCommPath = "docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md";
const inspectionCoordPath = "docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md";
const apptReadinessPath = "docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md";
const leadToInspectionPath = "docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md";
const executionDayPath = "docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md";
const bookingPrefsPath = "docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md";
const apptOutcomePaidPath = "docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md";
const followUpCadencePath = "docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md";
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
const leadTo = read(leadToInspectionPath);
const runbook = read(executionDayPath);
const bookingPrefs = read(bookingPrefsPath);
const apptOutcomePaid = read(apptOutcomePaidPath);
const followUp = read(followUpCadencePath);
const reporting = read(reportingPrefsPath);
const qualityGate = read(qualityGatePath);
const workflow = read(workflowPath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for first roofer appointment outcome command packet exist.");

// Assert the doc references the day-one command center, manual communication packet, inspection coordination packet, appointment readiness packet, lead-to-inspection ops pack, execution day runbook, booking preferences packet, appointment outcome packet, follow-up cadence packet, reporting preferences packet, and quality gate
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "appointment outcome packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md", "appointment outcome packet doc");
mustHave(doc, "FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md", "appointment outcome packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md", "appointment outcome packet doc");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "appointment outcome packet doc");
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "appointment outcome packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md", "appointment outcome packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md", "appointment outcome packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md", "appointment outcome packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md", "appointment outcome packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "appointment outcome packet doc");
mustHave(doc, "first-roofer day-one command center", "appointment outcome packet doc");
mustHave(doc, "First Roofer Manual Communication Command Packet", "appointment outcome packet doc");
mustHave(doc, "First Roofer Inspection Coordination Command Packet", "appointment outcome packet doc");
mustHave(doc, "First Roofer Appointment Readiness Command Packet", "appointment outcome packet doc");
mustHave(doc, "Lead-to-Inspection Ops Pack", "appointment outcome packet doc");
mustHave(doc, "Execution Day Runbook", "appointment outcome packet doc");
mustHave(doc, "Booking Preferences Packet", "appointment outcome packet doc");
mustHave(doc, "Appointment Outcome Packet", "appointment outcome packet doc");
mustHave(doc, "Follow-Up Cadence Packet", "appointment outcome packet doc");
mustHave(doc, "Reporting Preferences Packet", "appointment outcome packet doc");
mustHave(doc, "Agent Product Quality Gate", "appointment outcome packet doc");
console.log("PASS: appointment outcome packet doc references day-one command center, manual communication packet, inspection coordination packet, appointment readiness packet, lead-to-inspection ops pack, execution day runbook, booking preferences packet, appointment outcome packet, follow-up cadence packet, reporting preferences packet, and quality gate.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio", "Calendar booking performed: no", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Appointment outcome command overview", ["prepare to book inspections", "prepare to book appointments", "manual coordination only", "after an appointment-ready lead has been manually coordinated", "First Roofer Appointment Readiness Command Packet"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Inputs from the Appointment Readiness Command Packet", ["Inputs from the Appointment Readiness", "Selected manual appointment window", "Appointment readiness decision", "manual coordination only"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Appointment outcome prerequisites", ["prerequisites", "appointment readiness packet", "OUTCOME READY FOR MANUAL FOLLOW-UP", "PASS / HOLD / BLOCKED"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Lead appointment outcome intake checklist", ["Lead ID", "Contact permission status", "Contractor match", "Calendar booking performed: no", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Manual appointment/inspection outcome categories", ["COMPLETED", "RESCHEDULE NEEDED", "NO-SHOW", "UNABLE TO ACCESS", "CANCELLED", "HOLD", "BLOCKED"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Homeowner follow-up status worksheet", ["Safety note", "internal-only", "does not send, book, notify, calendar, or touch production systems", "Homeowner follow-up status", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Contractor follow-up status worksheet", ["Safety note", "internal-only", "does not send, book, notify, calendar, or touch production systems", "Contractor follow-up status", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Inspection completed outcome worksheet", ["Safety note", "internal-only", "Inspection completed: yes", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Inspection not completed outcome worksheet", ["Safety note", "internal-only", "Inspection completed: no", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Reschedule-needed outcome worksheet", ["Safety note", "internal-only", "Reschedule needed", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "No-show / unable-to-access outcome worksheet", ["Safety note", "internal-only", "NO-SHOW", "UNABLE TO ACCESS", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Estimate / next-step preparation worksheet", ["Safety note", "internal-only", "Estimate requested", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Manual outcome classification decision worksheet", ["Safety note", "internal-only", "Manual outcome classification: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED", "Manual outcome state", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Appointment outcome approval states", ["DRAFT / REVIEWED / OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED", "Manual outcome state", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Appointment outcome HOLD / BLOCKED rules", ["Appointment outcome HOLD due to missing outcome information", "Appointment outcome HOLD due to unclear follow-up ownership", "Appointment outcome HOLD due to reschedule conflict", "Appointment outcome BLOCKED due to consent/safety/production activation risk", "manual founder/operator review"], "appointment outcome packet doc");
assertSectionWithContent(doc, "No-send / no-calendar / no-booking safety rules", ["Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "Follow-up sent: no", "The packet itself must never send"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Manual appointment outcome tracker", ["Manual appointment outcome tracker", "Manual outcome classification", "Manual outcome state", "Calendar booking performed: no", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Founder/operator outcome decision log", ["Founder/Operator Outcome Decision Log entry", "COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED", "Calendar booking performed: no", "Production system touched: no", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "End-of-day appointment outcome report", ["End-of-Day Appointment Outcome Report", "Calendar booking performed across all: no", "External notification sent across all: no", "Production system touched across all: no", "Follow-up sent across all: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Handoff notes for the next operator session", ["Handoff Notes", "next operator session", "dry-run flag confirmation", "Calendar booking performed: no", "Follow-up sent: no"], "appointment outcome packet doc");
assertSectionWithContent(doc, "Explicit no-live-send / no-live-booking / no-live-automation confirmation", ["no live SMS/Twilio", "Calendar booking performed: no", "external notification sent: no", "production system touched: no", "Follow-up sent: no", "The packet itself must never send"], "appointment outcome packet doc");
console.log("PASS: appointment outcome packet doc contains all required operational sections with substantive content.");

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
  "Prior appointment readiness decision: PASS/HOLD/BLOCKED",
  "Selected manual appointment window",
  "Homeowner window confirmed: yes/no",
  "Contractor window confirmed: yes/no",
  "Appointment/inspection outcome category",
  "Inspection completed: yes/no/unknown",
  "Homeowner present: yes/no/unknown",
  "Contractor present: yes/no/unknown",
  "Access issue: yes/no/unknown",
  "Reschedule needed: yes/no/unknown",
  "Estimate requested: yes/no/unknown",
  "Follow-up needed: yes/no/unknown",
  "Homeowner follow-up status",
  "Contractor follow-up status",
  "Manual outcome classification: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED",
  "Manual outcome state: DRAFT / REVIEWED / OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED",
  "Calendar booking performed: no",
  "External notification sent: no",
  "Production system touched: no",
  "Follow-up sent: no",
  "Founder/operator notes",
  "Next manual action",
  "Appointment outcome"
];
assertConcreteFields(doc, concreteFields, "appointment outcome packet doc concrete fields");
console.log("PASS: appointment outcome packet doc contains all required concrete fields (Lead ID, homeowner, address, source, urgency, photos/insurance, contact permission, contractor match/fit, readiness decision, selected window, confirmed flags, outcome categories, inspection completed/present/access/reschedule/estimate/follow-up flags, homeowner/contractor follow-up status, manual outcome classification and state, no-send/no-calendar/no-booking markers, approval state with OUTCOME READY FOR MANUAL FOLLOW-UP, decision log, tracker, report, handoff, etc.).");

// Assert required operational field markers
mustHave(doc, "Lead ID:", "appointment outcome packet doc");
mustHave(doc, "appointment readiness decision", "appointment outcome packet doc");
mustHave(doc, "Manual outcome classification: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED", "appointment outcome packet doc");
mustHave(doc, "Manual outcome state", "appointment outcome packet doc");
mustHave(doc, "OUTCOME READY FOR MANUAL FOLLOW-UP", "appointment outcome packet doc");
mustHave(doc, "Calendar booking performed: no", "appointment outcome packet doc");
mustHave(doc, "External notification sent: no", "appointment outcome packet doc");
mustHave(doc, "Production system touched: no", "appointment outcome packet doc");
mustHave(doc, "Follow-up sent: no", "appointment outcome packet doc");
console.log("PASS: appointment outcome packet doc contains required operational field markers.");

// Assert PASS/HOLD/BLOCKED criteria and approval states present with full language
mustHave(doc, "DRAFT / REVIEWED / OUTCOME READY FOR MANUAL FOLLOW-UP / HOLD / BLOCKED", "appointment outcome packet doc");
mustHave(doc, "OUTCOME READY FOR MANUAL FOLLOW-UP", "appointment outcome packet doc");
mustHave(doc, "Manual outcome classification: COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED", "appointment outcome packet doc");
console.log("PASS: appointment outcome packet doc contains required approval states and COMPLETED / RESCHEDULE NEEDED / NO-SHOW / UNABLE TO ACCESS / CANCELLED / HOLD / BLOCKED criteria.");

// Assert all required worksheets present with safety notes
mustHave(doc, "Homeowner follow-up status worksheet", "appointment outcome packet doc");
mustHave(doc, "Contractor follow-up status worksheet", "appointment outcome packet doc");
mustHave(doc, "Inspection completed outcome worksheet", "appointment outcome packet doc");
mustHave(doc, "Inspection not completed outcome worksheet", "appointment outcome packet doc");
mustHave(doc, "Reschedule-needed outcome worksheet", "appointment outcome packet doc");
mustHave(doc, "No-show / unable-to-access outcome worksheet", "appointment outcome packet doc");
mustHave(doc, "Estimate / next-step preparation worksheet", "appointment outcome packet doc");
mustHave(doc, "Manual outcome classification decision worksheet", "appointment outcome packet doc");
mustHave(doc, "Safety note", "appointment outcome packet doc");
mustHave(doc, "internal-only and does not send, book, notify, calendar, or touch production systems", "appointment outcome packet doc");
mustHave(doc, "Follow-up sent: no", "appointment outcome packet doc");
console.log("PASS: appointment outcome packet doc includes all required worksheets (homeowner/contractor follow-up status, inspection completed/not completed, reschedule-needed, no-show/unable-to-access, estimate/next-step, manual outcome classification decision) with safety notes and no-follow-up markers.");

// Assert appointment outcome approval states present
mustHave(doc, "Appointment outcome approval states", "appointment outcome packet doc");
mustHave(doc, "OUTCOME READY FOR MANUAL FOLLOW-UP", "appointment outcome packet doc");
console.log("PASS: appointment outcome packet doc includes appointment outcome approval states.");

// Assert HOLD/BLOCKED rules for all required categories (missing outcome info, unclear follow-up ownership, reschedule conflict, consent/safety, production risk)
mustHave(doc, "Appointment outcome HOLD due to missing outcome information", "appointment outcome packet doc");
mustHave(doc, "Appointment outcome HOLD due to unclear follow-up ownership", "appointment outcome packet doc");
mustHave(doc, "Appointment outcome HOLD due to reschedule conflict", "appointment outcome packet doc");
mustHave(doc, "Appointment outcome BLOCKED due to consent/safety/production activation risk", "appointment outcome packet doc");
mustHave(doc, "HOLD / BLOCKED rules", "appointment outcome packet doc");
console.log("PASS: appointment outcome packet doc includes HOLD/BLOCKED rules for missing outcome information, unclear follow-up ownership, reschedule conflict, consent/safety, and production activation risk.");

// Assert no-send / no-calendar / no-booking safety rules present
mustHave(doc, "No-send / no-calendar / no-booking safety rules", "appointment outcome packet doc");
mustHave(doc, "Calendar booking performed: no", "appointment outcome packet doc");
mustHave(doc, "External notification sent: no", "appointment outcome packet doc");
mustHave(doc, "Production system touched: no", "appointment outcome packet doc");
mustHave(doc, "Follow-up sent: no", "appointment outcome packet doc");
mustHave(doc, "The packet itself must never send", "appointment outcome packet doc");
console.log("PASS: appointment outcome packet doc includes no-send / no-calendar / no-booking safety rules with explicit markers.");

// Assert manual appointment outcome tracker and founder/operator outcome decision log
mustHave(doc, "Manual appointment outcome tracker", "appointment outcome packet doc");
mustHave(doc, "Founder/operator outcome decision log", "appointment outcome packet doc");
mustHave(doc, "Founder/Operator Outcome Decision Log entry", "appointment outcome packet doc");
console.log("PASS: appointment outcome packet doc includes manual appointment outcome tracker and founder/operator outcome decision log.");

// Assert end-of-day appointment outcome report and next-operator handoff
mustHave(doc, "End-of-day appointment outcome report", "appointment outcome packet doc");
mustHave(doc, "End-of-Day Appointment Outcome Report", "appointment outcome packet doc");
mustHave(doc, "Handoff notes for the next operator session", "appointment outcome packet doc");
mustHave(doc, "Calendar booking performed across all: no", "appointment outcome packet doc");
mustHave(doc, "Follow-up sent across all: no", "appointment outcome packet doc");
console.log("PASS: appointment outcome packet doc includes end-of-day appointment outcome report and handoff notes for the next operator session.");

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
  mustHave(doc, m, "appointment outcome packet doc safety");
}
console.log("PASS: appointment outcome packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-send / no-live-booking / no-live-automation / no production activation language.");

// Assert explicit no-live-send / no-live-booking / no-live-automation / no production activation language
mustHave(doc, "Explicit no-live-send / no-live-booking / no-live-automation confirmation", "appointment outcome packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "appointment outcome packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "appointment outcome packet doc");
mustHave(doc, "internal-only and does not send, book, notify, calendar, or touch production systems", "appointment outcome packet doc");
mustHave(doc, "Any real-world follow-up or coordination must be performed manually by a founder/operator outside the system after explicit approval", "appointment outcome packet doc");
console.log("PASS: appointment outcome packet doc includes explicit no-live-send / no-live-booking / no-live-automation / no production activation language.");

// Assert required business phrases are present
const requiredPhrases = [
  "Founder-Led Launch Program",
  "book inspections",
  "book appointments",
  "manual founder/operator review",
  "manual coordination only",
  "appointment readiness",
  "appointment outcome",
  "manual follow-up",
  "draft-only",
  "outcome ready for manual follow-up",
  "Calendar booking performed: no",
  "external notification sent: no",
  "production system touched: no",
  "Follow-up sent: no"
];
for (const p of requiredPhrases) {
  mustHave(doc, p, "appointment outcome packet doc required business phrases");
}
console.log("PASS: appointment outcome packet doc contains all required business phrases.");

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
  mustNotHave(doc, f, "appointment outcome packet doc");
  mustNotHave(dayOne, f, "day-one command center (cross-check)");
  mustNotHave(manualComm, f, "manual communication packet (cross-check)");
  mustNotHave(inspectionCoord, f, "inspection coordination packet (cross-check)");
  mustNotHave(apptReadiness, f, "appointment readiness packet (cross-check)");
  mustNotHave(leadTo, f, "lead-to-inspection ops pack (cross-check)");
  mustNotHave(runbook, f, "execution day runbook (cross-check)");
}
console.log("PASS: forbidden business/guarantee language absent from appointment outcome packet doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-appointment-outcome-command-packet-readonly.js", "appointment outcome packet wrapper");
console.log("PASS: wrapper invokes the appointment outcome command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "appointment outcome packet wrapper");
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
  mustNotHave(wrapper, u, "appointment outcome packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-appointment-outcome-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Appointment Outcome Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the appointment outcome command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-appointment-outcome-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-appointment-outcome-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md",
  "run-first-roofer-appointment-outcome-command-packet-dry-run.sh",
  "verify-first-roofer-appointment-outcome-command-packet-readonly.js",
  "First Roofer Appointment Outcome Command Packet",
  "appointment outcome command packet"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the appointment outcome command packet.");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer appointment outcome command packet is operational, product-moving, references day-one + manual comm packet + inspection coordination packet + appointment readiness packet + ops pack + runbook + booking preferences packet + appointment outcome packet + follow-up cadence packet + reporting preferences packet + quality gate, and strictly dry-run only with all required worksheets, fields, approval states, HOLD/BLOCKED rules (missing outcome info, unclear follow-up ownership, reschedule conflict, consent/safety, prod risk), no-send/no-calendar/no-booking safety, tracker, decision log, end-of-day report, handoff, explicit no-live-send / no-live-booking / no-live-automation confirmation, required phrases, and absent forbidden phrases.");

console.log("PASS: aggregate, verifier index, and both next-chat contexts contain required appointment outcome command packet references.");
console.log("PASS: packet enforces dry-run/internal-only/founder-operator-only posture with Calendar booking performed: no, external notification sent: no, production system touched: no, Follow-up sent: no throughout.");
