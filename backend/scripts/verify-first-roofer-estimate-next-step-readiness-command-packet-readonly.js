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

const docPath = "docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-estimate-next-step-readiness-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-estimate-next-step-readiness-command-packet-readonly.js";
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
console.log("PASS: all expected files for first roofer estimate / next-step readiness command packet exist.");

// Assert the doc references the day-one command center, manual communication packet, inspection coordination packet, appointment readiness packet, appointment outcome packet, manual follow-up packet, lead-to-inspection ops pack, execution day runbook, follow-up cadence packet, appointment outcome packet (paid), booking preferences packet, reporting preferences packet, contractor notification packet, manual review queue packet, and quality gate
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md", "estimate next-step packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md", "estimate next-step packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "estimate next-step packet doc");
mustHave(doc, "first-roofer day-one command center", "estimate next-step packet doc");
mustHave(doc, "First Roofer Manual Communication Command Packet", "estimate next-step packet doc");
mustHave(doc, "First Roofer Inspection Coordination Command Packet", "estimate next-step packet doc");
mustHave(doc, "First Roofer Appointment Readiness Command Packet", "estimate next-step packet doc");
mustHave(doc, "First Roofer Appointment Outcome Command Packet", "estimate next-step packet doc");
mustHave(doc, "First Roofer Manual Follow-Up Command Packet", "estimate next-step packet doc");
mustHave(doc, "Lead-to-Inspection Ops Pack", "estimate next-step packet doc");
mustHave(doc, "Execution Day Runbook", "estimate next-step packet doc");
mustHave(doc, "Follow-Up Cadence Packet", "estimate next-step packet doc");
mustHave(doc, "Appointment Outcome Packet", "estimate next-step packet doc");
mustHave(doc, "Booking Preferences Packet", "estimate next-step packet doc");
mustHave(doc, "Reporting Preferences Packet", "estimate next-step packet doc");
mustHave(doc, "Contractor Notification Packet", "estimate next-step packet doc");
mustHave(doc, "Manual Review Queue Packet", "estimate next-step packet doc");
mustHave(doc, "Agent Product Quality Gate", "estimate next-step packet doc");
console.log("PASS: estimate / next-step readiness packet doc references day-one command center, manual communication packet, inspection coordination packet, appointment readiness packet, appointment outcome packet, manual follow-up packet, lead-to-inspection ops pack, execution day runbook, follow-up cadence packet, appointment outcome packet (paid), booking preferences packet, reporting preferences packet, contractor notification packet, manual review queue packet, and quality gate.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio", "Estimate created: no", "Quote sent: no", "Follow-up sent: no", "Calendar booking performed: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Estimate / next-step readiness command overview", ["prepare to book inspections", "prepare to book appointments", "manual coordination only", "after appointment outcomes and manual follow-up preparation have been captured", "First Roofer Appointment Outcome Command Packet", "First Roofer Manual Follow-Up Command Packet"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Inputs from the Appointment Outcome Command Packet", ["Inputs from the Appointment Outcome", "Prior appointment outcome", "Manual outcome classification", "manual coordination only"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Inputs from the Manual Follow-Up Command Packet", ["Inputs from the Manual Follow-Up", "Manual follow-up state", "APPROVED FOR MANUAL FOLLOW-UP", "manual coordination only"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Estimate / next-step readiness prerequisites", ["prerequisites", "appointment outcome packet", "manual follow-up packet", "READY FOR MANUAL ESTIMATE PREP", "READY FOR MANUAL NEXT STEP", "PASS / HOLD / BLOCKED"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Lead estimate / next-step intake checklist", ["Lead ID", "Contact permission status", "Contractor match", "Estimate created: no", "Quote sent: no", "Follow-up sent: no", "Calendar booking performed: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Estimate readiness worksheet", ["Safety note", "internal-only", "does not create estimates, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Estimate readiness", "Estimate created: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Contractor next-step coordination readiness worksheet", ["Safety note", "internal-only", "does not create estimates, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Contractor next-step readiness", "Estimate created: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Homeowner additional-information readiness worksheet", ["Safety note", "internal-only", "does not create estimates, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "Homeowner additional-information", "Estimate created: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Reschedule readiness worksheet", ["Safety note", "internal-only", "Reschedule readiness", "Estimate created: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Insurance / photos / damage-detail readiness worksheet", ["Safety note", "internal-only", "Insurance / photos / damage-detail", "Estimate created: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Completed inspection next-step readiness worksheet", ["Safety note", "internal-only", "Completed inspection next-step", "Estimate created: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "No-show / unable-to-access next-step readiness worksheet", ["Safety note", "internal-only", "No-show / Unable-to-Access", "Estimate created: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Cancelled / hold / blocked next-step worksheet", ["Safety note", "internal-only", "Cancelled / hold / blocked", "Estimate created: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Estimate / next-step readiness approval states", ["DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED", "Estimate / next-step state", "Estimate created: no", "Quote sent: no", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "Follow-up sent: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Estimate / next-step HOLD / BLOCKED rules", ["Estimate / next-step HOLD due to missing estimate prep owner", "Estimate / next-step HOLD due to missing contractor next-step owner", "Estimate / next-step HOLD due to incomplete homeowner information", "Estimate / next-step HOLD due to incomplete photos/insurance/damage details", "Estimate / next-step HOLD due to unresolved appointment or manual follow-up state", "Estimate / next-step HOLD due to conflicting next steps", "Estimate / next-step BLOCKED due to consent/safety/production activation risk", "manual founder/operator review"], "estimate next-step packet doc");
assertSectionWithContent(doc, "No-estimate-send / no-quote-send / no-calendar / no-booking safety rules", ["Estimate created: no", "Quote sent: no", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "Follow-up sent: no", "The packet itself must never create estimates"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Estimate / next-step readiness tracker", ["Estimate / next-step readiness tracker", "Estimate / next-step state", "Estimate created: no", "Follow-up sent: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Founder/operator estimate / next-step decision log", ["Founder/Operator Estimate / Next-Step Decision Log entry", "PASS / HOLD / BLOCKED", "Estimate created: no", "Production system touched: no", "Follow-up sent: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "End-of-day estimate / next-step readiness report", ["End-of-Day Estimate / Next-Step Readiness Report", "Estimate created across all: no", "Quote sent across all: no", "Calendar booking performed across all: no", "External notification sent across all: no", "Production system touched across all: no", "Follow-up sent across all: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Handoff notes for the next operator session", ["Handoff Notes", "next operator session", "dry-run flag confirmation", "Estimate created: no", "Follow-up sent: no"], "estimate next-step packet doc");
assertSectionWithContent(doc, "Explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation confirmation", ["no live SMS/Twilio", "Estimate created: no", "Quote sent: no", "external notification sent: no", "production system touched: no", "Follow-up sent: no", "The packet itself must never create estimates"], "estimate next-step packet doc");
console.log("PASS: estimate / next-step readiness packet doc contains all required operational sections with substantive content.");

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
  "Follow-up needed: yes/no/unknown",
  "Reschedule needed: yes/no/unknown",
  "Estimate requested: yes/no/unknown",
  "Next-step needed: yes/no/unknown",
  "Estimate readiness: READY / NEEDS INFO / HOLD / BLOCKED",
  "Contractor next-step readiness: READY / NEEDS INFO / HOLD / BLOCKED",
  "Homeowner additional-information needed: yes/no/unknown",
  "Insurance/photos/damage details complete: yes/no/unknown",
  "Manual estimate prep owner",
  "Manual contractor next-step owner",
  "Manual homeowner info owner",
  "Estimate / next-step decision: PASS/HOLD/BLOCKED",
  "Estimate / next-step state: DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED",
  "Estimate created: no",
  "Quote sent: no",
  "Follow-up sent: no",
  "Calendar booking performed: no",
  "External notification sent: no",
  "Production system touched: no",
  "Founder/operator notes",
  "Next manual action",
  "Estimate / next-step"
];
assertConcreteFields(doc, concreteFields, "estimate next-step packet doc concrete fields");
console.log("PASS: estimate / next-step readiness packet doc contains all required concrete fields (Lead ID, homeowner, address, source, urgency, photos/insurance, contact permission, contractor match/fit, prior appointment outcome, manual outcome classification and state, manual follow-up state, follow-up/reschedule/estimate/next-step flags, estimate/contractor/homeowner/reschedule/insurance-photos/completed/no-show/cancelled worksheets, estimate prep owner / contractor next-step owner / homeowner info owner, approval state with READY FOR MANUAL ESTIMATE PREP and READY FOR MANUAL NEXT STEP, decision log, tracker, report, handoff, etc.).");

// Assert required operational field markers
mustHave(doc, "Lead ID:", "estimate next-step packet doc");
mustHave(doc, "Prior appointment outcome", "estimate next-step packet doc");
mustHave(doc, "Manual follow-up state", "estimate next-step packet doc");
mustHave(doc, "Estimate / next-step decision: PASS / HOLD / BLOCKED", "estimate next-step packet doc");
mustHave(doc, "Estimate / next-step state", "estimate next-step packet doc");
mustHave(doc, "READY FOR MANUAL ESTIMATE PREP", "estimate next-step packet doc");
mustHave(doc, "READY FOR MANUAL NEXT STEP", "estimate next-step packet doc");
mustHave(doc, "Estimate created: no", "estimate next-step packet doc");
mustHave(doc, "Quote sent: no", "estimate next-step packet doc");
mustHave(doc, "Calendar booking performed: no", "estimate next-step packet doc");
mustHave(doc, "External notification sent: no", "estimate next-step packet doc");
mustHave(doc, "Production system touched: no", "estimate next-step packet doc");
mustHave(doc, "Follow-up sent: no", "estimate next-step packet doc");
console.log("PASS: estimate / next-step readiness packet doc contains required operational field markers.");

// Assert PASS/HOLD/BLOCKED criteria and approval states present with full language
mustHave(doc, "DRAFT / REVIEWED / READY FOR MANUAL ESTIMATE PREP / READY FOR MANUAL NEXT STEP / HOLD / BLOCKED", "estimate next-step packet doc");
mustHave(doc, "READY FOR MANUAL ESTIMATE PREP", "estimate next-step packet doc");
mustHave(doc, "READY FOR MANUAL NEXT STEP", "estimate next-step packet doc");
mustHave(doc, "Estimate / next-step decision: PASS / HOLD / BLOCKED", "estimate next-step packet doc");
console.log("PASS: estimate / next-step readiness packet doc contains required approval states and PASS / HOLD / BLOCKED criteria.");

// Assert all required worksheets present with safety notes
mustHave(doc, "Estimate readiness worksheet", "estimate next-step packet doc");
mustHave(doc, "Contractor next-step coordination readiness worksheet", "estimate next-step packet doc");
mustHave(doc, "Homeowner additional-information readiness worksheet", "estimate next-step packet doc");
mustHave(doc, "Reschedule readiness worksheet", "estimate next-step packet doc");
mustHave(doc, "Insurance / photos / damage-detail readiness worksheet", "estimate next-step packet doc");
mustHave(doc, "Completed inspection next-step readiness worksheet", "estimate next-step packet doc");
mustHave(doc, "No-show / unable-to-access next-step readiness worksheet", "estimate next-step packet doc");
mustHave(doc, "Cancelled / hold / blocked next-step worksheet", "estimate next-step packet doc");
mustHave(doc, "Safety note", "estimate next-step packet doc");
mustHave(doc, "internal-only and does not create estimates, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "estimate next-step packet doc");
mustHave(doc, "Estimate created: no", "estimate next-step packet doc");
console.log("PASS: estimate / next-step readiness packet doc includes all required worksheets (estimate readiness, contractor next-step coordination, homeowner additional-information, reschedule, insurance/photos/damage-detail, completed inspection next-step, no-show/unable-to-access, cancelled/hold/blocked) with safety notes and no-estimate/quote/follow-up markers.");

// Assert estimate / next-step readiness approval states present
mustHave(doc, "Estimate / next-step readiness approval states", "estimate next-step packet doc");
mustHave(doc, "READY FOR MANUAL ESTIMATE PREP", "estimate next-step packet doc");
mustHave(doc, "READY FOR MANUAL NEXT STEP", "estimate next-step packet doc");
console.log("PASS: estimate / next-step readiness packet doc includes estimate / next-step readiness approval states.");

// Assert HOLD/BLOCKED rules for all required categories (missing estimate prep owner, missing contractor next-step owner, incomplete homeowner info, incomplete photos/insurance/damage, unresolved prior state, conflicting next steps, consent/safety, prod risk)
mustHave(doc, "Estimate / next-step HOLD due to missing estimate prep owner", "estimate next-step packet doc");
mustHave(doc, "Estimate / next-step HOLD due to missing contractor next-step owner", "estimate next-step packet doc");
mustHave(doc, "Estimate / next-step HOLD due to incomplete homeowner information", "estimate next-step packet doc");
mustHave(doc, "Estimate / next-step HOLD due to incomplete photos/insurance/damage details", "estimate next-step packet doc");
mustHave(doc, "Estimate / next-step HOLD due to unresolved appointment or manual follow-up state", "estimate next-step packet doc");
mustHave(doc, "Estimate / next-step HOLD due to conflicting next steps", "estimate next-step packet doc");
mustHave(doc, "Estimate / next-step BLOCKED due to consent/safety/production activation risk", "estimate next-step packet doc");
mustHave(doc, "HOLD / BLOCKED rules", "estimate next-step packet doc");
console.log("PASS: estimate / next-step readiness packet doc includes HOLD/BLOCKED rules for missing estimate prep owner, missing contractor next-step owner, incomplete homeowner information, incomplete photos/insurance/damage details, unresolved appointment or manual follow-up state, conflicting next steps, consent/safety, and production activation risk.");

// Assert no-estimate-send / no-quote-send / no-calendar / no-booking safety rules present
mustHave(doc, "No-estimate-send / no-quote-send / no-calendar / no-booking safety rules", "estimate next-step packet doc");
mustHave(doc, "Estimate created: no", "estimate next-step packet doc");
mustHave(doc, "Quote sent: no", "estimate next-step packet doc");
mustHave(doc, "Calendar booking performed: no", "estimate next-step packet doc");
mustHave(doc, "External notification sent: no", "estimate next-step packet doc");
mustHave(doc, "Production system touched: no", "estimate next-step packet doc");
mustHave(doc, "Follow-up sent: no", "estimate next-step packet doc");
mustHave(doc, "The packet itself must never create estimates", "estimate next-step packet doc");
console.log("PASS: estimate / next-step readiness packet doc includes no-estimate-send / no-quote-send / no-calendar / no-booking safety rules with explicit markers.");

// Assert estimate / next-step readiness tracker and founder/operator decision log
mustHave(doc, "Estimate / next-step readiness tracker", "estimate next-step packet doc");
mustHave(doc, "Founder/operator estimate / next-step decision log", "estimate next-step packet doc");
mustHave(doc, "Founder/Operator Estimate / Next-Step Decision Log entry", "estimate next-step packet doc");
console.log("PASS: estimate / next-step readiness packet doc includes estimate / next-step readiness tracker and founder/operator estimate / next-step decision log.");

// Assert end-of-day estimate / next-step readiness report and next-operator handoff
mustHave(doc, "End-of-day estimate / next-step readiness report", "estimate next-step packet doc");
mustHave(doc, "End-of-Day Estimate / Next-Step Readiness Report", "estimate next-step packet doc");
mustHave(doc, "Handoff notes for the next operator session", "estimate next-step packet doc");
mustHave(doc, "Estimate created across all: no", "estimate next-step packet doc");
mustHave(doc, "Follow-up sent across all: no", "estimate next-step packet doc");
console.log("PASS: estimate / next-step readiness packet doc includes end-of-day estimate / next-step readiness report and handoff notes for the next operator session.");

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
  "internal-only and does not create estimates, send quotes, send follow-ups, book, notify, calendar, or touch production systems"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "estimate next-step packet doc safety");
}
console.log("PASS: estimate / next-step readiness packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation / no production activation language.");

// Assert explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation / no production activation language
mustHave(doc, "Explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation confirmation", "estimate next-step packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "estimate next-step packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "estimate next-step packet doc");
mustHave(doc, "internal-only and does not create estimates, send quotes, send follow-ups, book, notify, calendar, or touch production systems", "estimate next-step packet doc");
mustHave(doc, "Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval", "estimate next-step packet doc");
console.log("PASS: estimate / next-step readiness packet doc includes explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation / no production activation language.");

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
  "Estimate created: no",
  "Quote sent: no",
  "Follow-up sent: no",
  "Calendar booking performed: no",
  "external notification sent: no",
  "production system touched: no"
];
for (const p of requiredPhrases) {
  mustHave(doc, p, "estimate next-step packet doc required business phrases");
}
console.log("PASS: estimate / next-step readiness packet doc contains all required business phrases.");

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
  "automatic quote"
];
for (const f of forbidden) {
  mustNotHave(doc, f, "estimate next-step packet doc");
  mustNotHave(dayOne, f, "day-one command center (cross-check)");
  mustNotHave(manualComm, f, "manual communication packet (cross-check)");
  mustNotHave(inspectionCoord, f, "inspection coordination packet (cross-check)");
  mustNotHave(apptReadiness, f, "appointment readiness packet (cross-check)");
  mustNotHave(apptOutcome, f, "appointment outcome packet (cross-check)");
  mustNotHave(manualFollowUp, f, "manual follow-up packet (cross-check)");
  mustNotHave(leadTo, f, "lead-to-inspection ops pack (cross-check)");
  mustNotHave(runbook, f, "execution day runbook (cross-check)");
}
console.log("PASS: forbidden business/guarantee/automation/estimate language absent from estimate / next-step readiness packet doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-estimate-next-step-readiness-command-packet-readonly.js", "estimate next-step packet wrapper");
console.log("PASS: wrapper invokes the estimate / next-step readiness command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "estimate next-step packet wrapper");
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
  mustNotHave(wrapper, u, "estimate next-step packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-estimate-next-step-readiness-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Estimate / Next-Step Readiness Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the estimate / next-step readiness command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-estimate-next-step-readiness-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-estimate-next-step-readiness-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md",
  "run-first-roofer-estimate-next-step-readiness-command-packet-dry-run.sh",
  "verify-first-roofer-estimate-next-step-readiness-command-packet-readonly.js",
  "First Roofer Estimate / Next-Step Readiness Command Packet",
  "estimate / next-step readiness command packet",
  "estimate next-step readiness"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the estimate / next-step readiness command packet.");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer estimate / next-step readiness command packet is operational, product-moving, references day-one + manual comm packet + inspection coordination packet + appointment readiness packet + appointment outcome packet + manual follow-up packet + ops pack + runbook + follow-up cadence packet + appointment outcome packet (paid) + booking preferences packet + reporting preferences packet + contractor notification packet + manual review queue packet + quality gate, and strictly dry-run only with all required worksheets, fields, approval states, HOLD/BLOCKED rules (missing estimate prep owner, missing contractor next-step owner, incomplete homeowner info, incomplete photos/insurance/damage, unresolved prior state, conflicting next steps, consent/safety, prod risk), no-estimate-send/no-quote-send/no-calendar/no-booking safety, tracker, decision log, end-of-day report, handoff, explicit no-live-estimate / no-live-quote / no-live-send / no-live-booking / no-live-automation confirmation, required phrases, and absent forbidden phrases.");

console.log("PASS: aggregate, verifier index, and both next-chat contexts contain required estimate / next-step readiness command packet references.");
console.log("PASS: packet enforces dry-run/internal-only/founder-operator-only posture with Estimate created: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no throughout.");
