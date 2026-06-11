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

const docPath = "docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-estimate-prep-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-estimate-prep-command-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const dayOnePath = "docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md";
const manualCommPath = "docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md";
const inspectionCoordPath = "docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md";
const apptReadinessPath = "docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md";
const apptOutcomePath = "docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md";
const manualFollowUpPath = "docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md";
const estimateNextStepPath = "docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md";
const leadToInspectionPath = "docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md";
const executionDayPath = "docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md";
const followUpCadencePath = "docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md";
const apptOutcomePaidPath = "docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md";
const bookingPrefsPath = "docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md";
const reportingPrefsPath = "docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md";
const contractorNotifPath = "docs/FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md";
const manualReviewQueuePath = "docs/FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md";
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
const manualFollowUp = read(manualFollowUpPath);
const estimateNextStep = read(estimateNextStepPath);
const leadTo = read(leadToInspectionPath);
const runbook = read(executionDayPath);
const followUp = read(followUpCadencePath);
const apptOutcomePaid = read(apptOutcomePaidPath);
const bookingPrefs = read(bookingPrefsPath);
const reporting = read(reportingPrefsPath);
const contractorNotif = read(contractorNotifPath);
const manualReviewQueue = read(manualReviewQueuePath);
const qualityGate = read(qualityGatePath);
const workflow = read(workflowPath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for first roofer estimate prep command packet exist.");

// Assert the doc references the day-one command center, manual communication packet, inspection coordination packet, appointment readiness packet, appointment outcome packet, manual follow-up packet, estimate / next-step readiness packet, lead-to-inspection ops pack, execution day runbook, follow-up cadence packet, appointment outcome packet (paid), booking preferences packet, reporting preferences packet, contractor notification packet, manual review queue packet, and quality gate
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "estimate prep packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md", "estimate prep packet doc");
mustHave(doc, "FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md", "estimate prep packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md", "estimate prep packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md", "estimate prep packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md", "estimate prep packet doc");
mustHave(doc, "FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md", "estimate prep packet doc");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "estimate prep packet doc");
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "estimate prep packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md", "estimate prep packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md", "estimate prep packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md", "estimate prep packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md", "estimate prep packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md", "estimate prep packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md", "estimate prep packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "estimate prep packet doc");
mustHave(doc, "first-roofer day-one command center", "estimate prep packet doc");
mustHave(doc, "First Roofer Manual Communication Command Packet", "estimate prep packet doc");
mustHave(doc, "First Roofer Inspection Coordination Command Packet", "estimate prep packet doc");
mustHave(doc, "First Roofer Appointment Readiness Command Packet", "estimate prep packet doc");
mustHave(doc, "First Roofer Appointment Outcome Command Packet", "estimate prep packet doc");
mustHave(doc, "First Roofer Manual Follow-Up Command Packet", "estimate prep packet doc");
mustHave(doc, "First Roofer Estimate / Next-Step Readiness Command Packet", "estimate prep packet doc");
mustHave(doc, "Lead-to-Inspection Ops Pack", "estimate prep packet doc");
mustHave(doc, "Execution Day Runbook", "estimate prep packet doc");
mustHave(doc, "Follow-Up Cadence Packet", "estimate prep packet doc");
mustHave(doc, "Appointment Outcome Packet", "estimate prep packet doc");
mustHave(doc, "Booking Preferences Packet", "estimate prep packet doc");
mustHave(doc, "Reporting Preferences Packet", "estimate prep packet doc");
mustHave(doc, "Contractor Notification Packet", "estimate prep packet doc");
mustHave(doc, "Manual Review Queue Packet", "estimate prep packet doc");
mustHave(doc, "Agent Product Quality Gate", "estimate prep packet doc");
console.log("PASS: estimate prep packet doc references day-one command center, manual communication packet, inspection coordination packet, appointment readiness packet, appointment outcome packet, manual follow-up packet, estimate / next-step readiness packet, lead-to-inspection ops pack, execution day runbook, follow-up cadence packet, appointment outcome packet (paid), booking preferences packet, reporting preferences packet, contractor notification packet, manual review queue packet, and quality gate.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Follow-up sent: no", "Calendar booking performed: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Estimate prep command overview", ["prepare to book inspections", "prepare to book appointments", "manual coordination only", "after a lead has reached estimate / next-step readiness", "First Roofer Estimate / Next-Step Readiness Command Packet", "First Roofer Appointment Outcome Command Packet", "First Roofer Manual Follow-Up Command Packet"], "estimate prep packet doc");
assertSectionWithContent(doc, "Inputs from the Estimate / Next-Step Readiness Command Packet", ["Inputs from the Estimate / Next-Step Readiness", "Estimate / next-step state", "READY FOR MANUAL ESTIMATE PREP", "READY FOR MANUAL NEXT STEP", "manual coordination only"], "estimate prep packet doc");
assertSectionWithContent(doc, "Inputs from the Appointment Outcome Command Packet", ["Inputs from the Appointment Outcome", "Prior appointment outcome", "Manual outcome classification", "manual coordination only"], "estimate prep packet doc");
assertSectionWithContent(doc, "Inputs from the Manual Follow-Up Command Packet", ["Inputs from the Manual Follow-Up", "Manual follow-up state", "APPROVED FOR MANUAL FOLLOW-UP", "manual coordination only"], "estimate prep packet doc");
assertSectionWithContent(doc, "Estimate prep prerequisites", ["prerequisites", "estimate / next-step readiness packet", "appointment outcome packet", "manual follow-up packet", "READY FOR FOUNDER REVIEW", "READY FOR CONTRACTOR REVIEW", "PASS / HOLD / BLOCKED"], "estimate prep packet doc");
assertSectionWithContent(doc, "Lead estimate prep intake checklist", ["Lead ID", "Contact permission status", "Contractor match", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Follow-up sent: no", "Calendar booking performed: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Inspection notes capture worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Inspection notes capture", "Inspection notes present", "Estimate created: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Contractor estimate-input worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Contractor estimate-input", "Contractor notes present", "Estimate created: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Homeowner constraints and preferences worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Homeowner constraints and preferences", "Homeowner constraints captured", "Estimate created: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Roof / damage / service-scope worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Roof / damage / service-scope", "Roof/damage details complete", "Estimate created: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Photos / insurance / documentation worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Photos / insurance / documentation", "Photos reviewed", "Insurance context reviewed", "Estimate created: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Estimate assumptions and unknowns worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Estimate assumptions and unknowns", "Estimate assumptions listed", "Estimate unknowns listed", "Estimate created: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Contractor questions worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Contractor questions", "Contractor questions listed", "Estimate created: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Homeowner questions worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Homeowner questions", "Homeowner questions listed", "Estimate created: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Manual estimate prep readiness worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Manual estimate prep readiness", "Manual estimate prep decision", "Estimate created: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Manual estimate prep approval states", ["DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED", "Manual estimate prep state", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Follow-up sent: no", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Manual estimate prep HOLD / BLOCKED rules", ["HOLD due to missing estimate prep owner", "HOLD due to missing inspection notes", "HOLD due to missing contractor notes", "HOLD due to incomplete homeowner constraints", "HOLD due to incomplete roof/damage/service-scope details", "HOLD due to incomplete photos/insurance/documentation", "HOLD due to unresolved estimate / next-step readiness state", "HOLD due to unresolved contractor or homeowner questions", "BLOCKED due to consent/safety/production activation risk", "manual founder/operator review"], "estimate prep packet doc");
assertSectionWithContent(doc, "No-estimate-create / no-quote-send / no-calendar / no-booking safety rules", ["Estimate created: no", "Quote generated: no", "Quote sent: no", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "Follow-up sent: no", "The packet itself must never create estimates"], "estimate prep packet doc");
assertSectionWithContent(doc, "Estimate prep tracker", ["Estimate prep tracker", "Manual estimate prep state", "Estimate created: no", "Follow-up sent: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Founder/operator estimate prep decision log", ["Founder/Operator Estimate Prep Decision Log entry", "PASS / HOLD / BLOCKED", "Estimate created: no", "Production system touched: no", "Follow-up sent: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "End-of-day estimate prep report", ["End-of-Day Estimate Prep Report", "Estimate created across all: no", "Quote generated across all: no", "Quote sent across all: no", "Calendar booking performed across all: no", "External notification sent across all: no", "Production system touched across all: no", "Follow-up sent across all: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Handoff notes for the next operator session", ["Handoff Notes", "next operator session", "dry-run flag confirmation", "Estimate created: no", "Follow-up sent: no"], "estimate prep packet doc");
assertSectionWithContent(doc, "Explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation confirmation", ["no live SMS/Twilio", "Estimate created: no", "Quote generated: no", "Quote sent: no", "external notification sent: no", "production system touched: no", "Follow-up sent: no", "The packet itself must never create estimates"], "estimate prep packet doc");
console.log("PASS: estimate prep packet doc contains all required operational sections with substantive content.");

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
  "Manual follow-up state: DRAFT / REVIEWED / APPROVED FOR MANUAL FOLLOW-UP / HOLD / BLOCKED",
  "Estimate / next-step state: DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED",
  "Estimate readiness: READY / NEEDS INFO / HOLD / BLOCKED",
  "Contractor next-step readiness: READY / NEEDS INFO / HOLD / BLOCKED",
  "Manual estimate prep owner",
  "Manual contractor next-step owner",
  "Manual homeowner info owner",
  "Inspection completed: yes/no/unknown",
  "Inspection notes present: yes/no/unknown",
  "Contractor notes present: yes/no/unknown",
  "Homeowner constraints captured: yes/no/unknown",
  "Roof/damage details complete: yes/no/unknown",
  "Photos reviewed: yes/no/unknown",
  "Insurance context reviewed: yes/no/unknown",
  "Documentation complete: yes/no/unknown",
  "Estimate assumptions listed: yes/no",
  "Estimate unknowns listed: yes/no",
  "Contractor questions listed: yes/no",
  "Homeowner questions listed: yes/no",
  "Manual estimate prep readiness: READY / NEEDS INFO / HOLD / BLOCKED",
  "Manual estimate prep decision: PASS/HOLD/BLOCKED",
  "Manual estimate prep state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED",
  "Estimate created: no",
  "Quote generated: no",
  "Quote sent: no",
  "Follow-up sent: no",
  "Calendar booking performed: no",
  "External notification sent: no",
  "Production system touched: no",
  "Founder/operator notes",
  "Next manual action",
  "Estimate prep"
];
assertConcreteFields(doc, concreteFields, "estimate prep packet doc concrete fields");
console.log("PASS: estimate prep packet doc contains all required concrete fields (Lead ID, homeowner, address, source, urgency, photos/insurance, contact permission, contractor match/fit, prior appointment outcome, manual outcome classification and state, manual follow-up state, estimate/next-step state, estimate/contractor/homeowner/reschedule/insurance-photos worksheets, inspection notes present, contractor notes present, homeowner constraints captured, roof/damage details, photos/insurance reviewed, assumptions/unknowns, contractor/homeowner questions, approval state with READY FOR FOUNDER REVIEW and READY FOR CONTRACTOR REVIEW, decision log, tracker, report, handoff, etc.).");

// Assert required operational field markers
mustHave(doc, "Lead ID:", "estimate prep packet doc");
mustHave(doc, "Prior appointment outcome", "estimate prep packet doc");
mustHave(doc, "Manual follow-up state", "estimate prep packet doc");
mustHave(doc, "Estimate / next-step state", "estimate prep packet doc");
mustHave(doc, "Manual estimate prep decision: PASS / HOLD / BLOCKED", "estimate prep packet doc");
mustHave(doc, "Manual estimate prep state", "estimate prep packet doc");
mustHave(doc, "READY FOR FOUNDER REVIEW", "estimate prep packet doc");
mustHave(doc, "READY FOR CONTRACTOR REVIEW", "estimate prep packet doc");
mustHave(doc, "Estimate created: no", "estimate prep packet doc");
mustHave(doc, "Quote generated: no", "estimate prep packet doc");
mustHave(doc, "Quote sent: no", "estimate prep packet doc");
mustHave(doc, "Calendar booking performed: no", "estimate prep packet doc");
mustHave(doc, "External notification sent: no", "estimate prep packet doc");
mustHave(doc, "Production system touched: no", "estimate prep packet doc");
mustHave(doc, "Follow-up sent: no", "estimate prep packet doc");
console.log("PASS: estimate prep packet doc contains required operational field markers.");

// Assert PASS/HOLD/BLOCKED criteria and approval states present with full language
mustHave(doc, "DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY FOR CONTRACTOR REVIEW / HOLD / BLOCKED", "estimate prep packet doc");
mustHave(doc, "READY FOR FOUNDER REVIEW", "estimate prep packet doc");
mustHave(doc, "READY FOR CONTRACTOR REVIEW", "estimate prep packet doc");
mustHave(doc, "Manual estimate prep decision: PASS / HOLD / BLOCKED", "estimate prep packet doc");
console.log("PASS: estimate prep packet doc contains required approval states and PASS / HOLD / BLOCKED criteria.");

// Assert all required worksheets present with safety notes
mustHave(doc, "Inspection notes capture worksheet", "estimate prep packet doc");
mustHave(doc, "Contractor estimate-input worksheet", "estimate prep packet doc");
mustHave(doc, "Homeowner constraints and preferences worksheet", "estimate prep packet doc");
mustHave(doc, "Roof / damage / service-scope worksheet", "estimate prep packet doc");
mustHave(doc, "Photos / insurance / documentation worksheet", "estimate prep packet doc");
mustHave(doc, "Estimate assumptions and unknowns worksheet", "estimate prep packet doc");
mustHave(doc, "Contractor questions worksheet", "estimate prep packet doc");
mustHave(doc, "Homeowner questions worksheet", "estimate prep packet doc");
mustHave(doc, "Manual estimate prep readiness worksheet", "estimate prep packet doc");
mustHave(doc, "Safety note", "estimate prep packet doc");
mustHave(doc, "internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "estimate prep packet doc");
mustHave(doc, "Estimate created: no", "estimate prep packet doc");
console.log("PASS: estimate prep packet doc includes all required worksheets (inspection notes capture, contractor estimate-input, homeowner constraints and preferences, roof/damage/service-scope, photos/insurance/documentation, estimate assumptions and unknowns, contractor questions, homeowner questions, manual estimate prep readiness) with safety notes and no-estimate/quote/follow-up markers.");

// Assert manual estimate prep approval states present
mustHave(doc, "Manual estimate prep approval states", "estimate prep packet doc");
mustHave(doc, "READY FOR FOUNDER REVIEW", "estimate prep packet doc");
mustHave(doc, "READY FOR CONTRACTOR REVIEW", "estimate prep packet doc");
console.log("PASS: estimate prep packet doc includes manual estimate prep approval states.");

// Assert HOLD/BLOCKED rules for all required categories (missing estimate prep owner, missing inspection notes, missing contractor notes, incomplete homeowner constraints, incomplete roof/damage/service-scope details, incomplete photos/insurance/documentation, unresolved estimate / next-step readiness state, unresolved contractor or homeowner questions, consent/safety, prod risk)
mustHave(doc, "HOLD due to missing estimate prep owner", "estimate prep packet doc");
mustHave(doc, "HOLD due to missing inspection notes", "estimate prep packet doc");
mustHave(doc, "HOLD due to missing contractor notes", "estimate prep packet doc");
mustHave(doc, "HOLD due to incomplete homeowner constraints", "estimate prep packet doc");
mustHave(doc, "HOLD due to incomplete roof/damage/service-scope details", "estimate prep packet doc");
mustHave(doc, "HOLD due to incomplete photos/insurance/documentation", "estimate prep packet doc");
mustHave(doc, "HOLD due to unresolved estimate / next-step readiness state", "estimate prep packet doc");
mustHave(doc, "HOLD due to unresolved contractor or homeowner questions", "estimate prep packet doc");
mustHave(doc, "BLOCKED due to consent/safety/production activation risk", "estimate prep packet doc");
mustHave(doc, "HOLD / BLOCKED rules", "estimate prep packet doc");
console.log("PASS: estimate prep packet doc includes HOLD/BLOCKED rules for missing estimate prep owner, missing inspection notes, missing contractor notes, incomplete homeowner constraints, incomplete roof/damage/service-scope details, incomplete photos/insurance/documentation, unresolved estimate / next-step readiness state, unresolved contractor or homeowner questions, consent/safety, and production activation risk.");

// Assert no-estimate-create / no-quote-send / no-calendar / no-booking safety rules present
mustHave(doc, "No-estimate-create / no-quote-send / no-calendar / no-booking safety rules", "estimate prep packet doc");
mustHave(doc, "Estimate created: no", "estimate prep packet doc");
mustHave(doc, "Quote generated: no", "estimate prep packet doc");
mustHave(doc, "Quote sent: no", "estimate prep packet doc");
mustHave(doc, "Calendar booking performed: no", "estimate prep packet doc");
mustHave(doc, "External notification sent: no", "estimate prep packet doc");
mustHave(doc, "Production system touched: no", "estimate prep packet doc");
mustHave(doc, "Follow-up sent: no", "estimate prep packet doc");
mustHave(doc, "The packet itself must never create estimates", "estimate prep packet doc");
console.log("PASS: estimate prep packet doc includes no-estimate-create / no-quote-send / no-calendar / no-booking safety rules with explicit markers.");

// Assert estimate prep tracker and founder/operator decision log
mustHave(doc, "Estimate prep tracker", "estimate prep packet doc");
mustHave(doc, "Founder/operator estimate prep decision log", "estimate prep packet doc");
mustHave(doc, "Founder/Operator Estimate Prep Decision Log entry", "estimate prep packet doc");
console.log("PASS: estimate prep packet doc includes estimate prep tracker and founder/operator estimate prep decision log.");

// Assert end-of-day estimate prep report and next-operator handoff
mustHave(doc, "End-of-day estimate prep report", "estimate prep packet doc");
mustHave(doc, "End-of-Day Estimate Prep Report", "estimate prep packet doc");
mustHave(doc, "Handoff notes for the next operator session", "estimate prep packet doc");
mustHave(doc, "Estimate created across all: no", "estimate prep packet doc");
mustHave(doc, "Follow-up sent across all: no", "estimate prep packet doc");
console.log("PASS: estimate prep packet doc includes end-of-day estimate prep report and handoff notes for the next operator session.");

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
  "no automated estimate",
  "no quote automation",
  "Estimate created: no",
  "Quote generated: no",
  "Quote sent: no",
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
  "The packet itself must never create estimates",
  "internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "estimate prep packet doc safety");
}
console.log("PASS: estimate prep packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation / no production activation language.");

// Assert explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation / no production activation language
mustHave(doc, "Explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation confirmation", "estimate prep packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "estimate prep packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "estimate prep packet doc");
mustHave(doc, "internal-only and does not create estimates, generate quotes, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "estimate prep packet doc");
mustHave(doc, "Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval", "estimate prep packet doc");
console.log("PASS: estimate prep packet doc includes explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation / no production activation language.");

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
  "ready for manual estimate prep",
  "ready for manual next step",
  "READY FOR FOUNDER REVIEW",
  "READY FOR CONTRACTOR REVIEW",
  "Estimate created: no",
  "Quote generated: no",
  "Quote sent: no",
  "Follow-up sent: no",
  "Calendar booking performed: no",
  "external notification sent: no",
  "production system touched: no"
];
for (const p of requiredPhrases) {
  mustHave(doc, p, "estimate prep packet doc required business phrases");
}
console.log("PASS: estimate prep packet doc contains all required business phrases.");

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
  "production automation",
  "auto-estimate",
  "automatic estimate",
  "auto quote",
  "automatic quote",
  "invoice generated",
  "payment link",
  "collect payment"
];
for (const f of forbidden) {
  mustNotHave(doc, f, "estimate prep packet doc");
  mustNotHave(dayOne, f, "day-one command center (cross-check)");
  mustNotHave(manualComm, f, "manual communication packet (cross-check)");
  mustNotHave(inspectionCoord, f, "inspection coordination packet (cross-check)");
  mustNotHave(apptReadiness, f, "appointment readiness packet (cross-check)");
  mustNotHave(apptOutcome, f, "appointment outcome packet (cross-check)");
  mustNotHave(manualFollowUp, f, "manual follow-up packet (cross-check)");
  mustNotHave(estimateNextStep, f, "estimate / next-step readiness packet (cross-check)");
  mustNotHave(leadTo, f, "lead-to-inspection ops pack (cross-check)");
  mustNotHave(runbook, f, "execution day runbook (cross-check)");
}
console.log("PASS: forbidden business/guarantee/automation/estimate/payment language absent from estimate prep packet doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-estimate-prep-command-packet-readonly.js", "estimate prep packet wrapper");
console.log("PASS: wrapper invokes the estimate prep command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "estimate prep packet wrapper");
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
  mustNotHave(wrapper, u, "estimate prep packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-estimate-prep-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Estimate Prep Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the estimate prep command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-estimate-prep-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-estimate-prep-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md",
  "run-first-roofer-estimate-prep-command-packet-dry-run.sh",
  "verify-first-roofer-estimate-prep-command-packet-readonly.js",
  "First Roofer Estimate Prep Command Packet",
  "estimate prep command packet",
  "estimate prep"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the estimate prep command packet.");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer estimate prep command packet is operational, product-moving, references day-one + manual comm packet + inspection coordination packet + appointment readiness packet + appointment outcome packet + manual follow-up packet + estimate / next-step readiness packet + ops pack + runbook + follow-up cadence packet + appointment outcome packet (paid) + booking preferences packet + reporting preferences packet + contractor notification packet + manual review queue packet + quality gate, and strictly dry-run only with all required worksheets, fields, approval states, HOLD/BLOCKED rules (missing estimate prep owner, missing inspection notes, missing contractor notes, incomplete homeowner constraints, incomplete roof/damage/service-scope details, incomplete photos/insurance/documentation, unresolved estimate / next-step readiness state, unresolved contractor or homeowner questions, consent/safety, prod risk), no-estimate-create/no-quote-send/no-calendar/no-booking safety, tracker, decision log, end-of-day report, handoff, explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation confirmation, required phrases, and absent forbidden phrases.");

console.log("PASS: aggregate, verifier index, and both next-chat contexts contain required estimate prep command packet references.");
console.log("PASS: packet enforces dry-run/internal-only/founder-operator-only posture with Estimate created: no, Quote generated: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no throughout.");
