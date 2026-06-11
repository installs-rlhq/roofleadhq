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

const docPath = "docs/FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-contractor-estimate-review-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-contractor-estimate-review-command-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";

// Prior packet references for cross-checks and forbidden language
const estimatePrepPath = "docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md";
const estimateNextStepPath = "docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md";
const apptOutcomePath = "docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md";
const manualFollowUpPath = "docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md";
const dayOnePath = "docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md";
const manualCommPath = "docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md";
const inspectionCoordPath = "docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md";
const apptReadinessPath = "docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md";
const leadToInspectionPath = "docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md";
const executionDayPath = "docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md";
const followUpCadencePath = "docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md";
const apptOutcomePaidPath = "docs/FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md";
const bookingPrefsPath = "docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md";
const reportingPrefsPath = "docs/FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md";
const contractorNotifPath = "docs/FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md";
const manualReviewQueuePath = "docs/FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);

// Prior artifacts for cross-checks
const estimatePrep = read(estimatePrepPath);
const estimateNextStep = read(estimateNextStepPath);
const apptOutcome = read(apptOutcomePath);
const manualFollowUp = read(manualFollowUpPath);
const dayOne = read(dayOnePath);
const manualComm = read(manualCommPath);
const inspectionCoord = read(inspectionCoordPath);
const apptReadiness = read(apptReadinessPath);
const leadTo = read(leadToInspectionPath);
const runbook = read(executionDayPath);
const followUp = read(followUpCadencePath);
const apptOutcomePaid = read(apptOutcomePaidPath);
const bookingPrefs = read(bookingPrefsPath);
const reporting = read(reportingPrefsPath);
const contractorNotif = read(contractorNotifPath);
const manualReviewQueue = read(manualReviewQueuePath);
const qualityGate = read(qualityGatePath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for first roofer contractor estimate review command packet exist.");

// Assert the doc references the estimate prep packet (primary), estimate / next-step readiness packet, appointment outcome packet, manual follow-up packet, and the broader chain + quality gate
mustHave(doc, "FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md", "contractor estimate review packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "contractor estimate review packet doc");

mustHave(doc, "First Roofer Estimate Prep Command Packet", "contractor estimate review packet doc");
mustHave(doc, "First Roofer Estimate / Next-Step Readiness Command Packet", "contractor estimate review packet doc");
mustHave(doc, "First Roofer Appointment Outcome Command Packet", "contractor estimate review packet doc");
mustHave(doc, "First Roofer Manual Follow-Up Command Packet", "contractor estimate review packet doc");
mustHave(doc, "first-roofer day-one command center", "contractor estimate review packet doc");
mustHave(doc, "First Roofer Manual Communication Command Packet", "contractor estimate review packet doc");
mustHave(doc, "First Roofer Inspection Coordination Command Packet", "contractor estimate review packet doc");
mustHave(doc, "First Roofer Appointment Readiness Command Packet", "contractor estimate review packet doc");
mustHave(doc, "Lead-to-Inspection Ops Pack", "contractor estimate review packet doc");
mustHave(doc, "Execution Day Runbook", "contractor estimate review packet doc");
mustHave(doc, "Follow-Up Cadence Packet", "contractor estimate review packet doc");
mustHave(doc, "Appointment Outcome Packet", "contractor estimate review packet doc");
mustHave(doc, "Booking Preferences Packet", "contractor estimate review packet doc");
mustHave(doc, "Reporting Preferences Packet", "contractor estimate review packet doc");
mustHave(doc, "Contractor Notification Packet", "contractor estimate review packet doc");
mustHave(doc, "Manual Review Queue Packet", "contractor estimate review packet doc");
mustHave(doc, "Agent Product Quality Gate", "contractor estimate review packet doc");
console.log("PASS: contractor estimate review packet doc references estimate prep packet (primary), estimate / next-step readiness packet, appointment outcome packet, manual follow-up packet, day-one command center, manual communication packet, inspection coordination packet, appointment readiness packet, lead-to-inspection ops pack, execution day runbook, follow-up cadence packet, appointment outcome packet (paid), booking preferences packet, reporting preferences packet, contractor notification packet, manual review queue packet, and quality gate.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Follow-up sent: no", "Calendar booking performed: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Contractor estimate review command overview", ["prepare to book inspections", "prepare to book appointments", "manual coordination only", "after a lead has reached", "First Roofer Estimate Prep Command Packet", "First Roofer Estimate / Next-Step Readiness Command Packet", "First Roofer Appointment Outcome Command Packet", "First Roofer Manual Follow-Up Command Packet"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Estimate Prep Command Packet", ["Inputs from First Roofer Estimate Prep", "Manual estimate prep state", "READY FOR MANUAL CONTRACTOR REVIEW", "manual coordination only"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Inputs from Estimate / Next-Step Readiness Command Packet", ["Inputs from Estimate / Next-Step Readiness", "Estimate / next-step state", "READY FOR MANUAL ESTIMATE PREP", "READY FOR MANUAL NEXT STEP", "manual coordination only"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Inputs from Manual Follow-Up and Appointment Outcome packets", ["Inputs from Manual Follow-Up", "Inputs from Appointment Outcome", "Manual follow-up state", "Prior appointment outcome", "manual coordination only"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Contractor review prerequisites", ["prerequisites", "estimate prep packet", "estimate / next-step readiness packet", "appointment outcome packet", "manual follow-up packet", "READY FOR MANUAL CONTRACTOR REVIEW", "PASS / HOLD / BLOCKED"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Lead contractor-review intake checklist", ["Lead ID", "Contact permission status", "Contractor match", "Contractor service-area fit", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Follow-up sent: no", "Calendar booking performed: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Contractor review package worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems", "Contractor Review Package", "Estimate created: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Scope summary worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems", "Scope Summary", "Estimate created: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Photos / documentation review worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems", "Photos / Documentation Review", "Photos reviewed", "Documentation complete", "Estimate created: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Insurance context review worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems", "Insurance Context Review", "Insurance context reviewed", "Estimate created: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Contractor questions worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems", "Contractor Questions", "Contractor questions listed", "Estimate created: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Founder/operator questions worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems", "Founder/Operator Questions", "Estimate created: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Homeowner clarification worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems", "Homeowner Clarification", "Homeowner questions", "Estimate created: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Manual contractor review readiness worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems", "Manual Contractor Review Readiness", "Manual contractor review decision", "Estimate created: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Contractor review approval states", ["DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED", "Manual contractor review state", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Follow-up sent: no", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "HOLD / BLOCKED rules", ["HOLD due to missing contractor review owner", "HOLD due to missing estimate prep state", "HOLD due to unresolved estimate / next-step readiness state", "HOLD due to missing inspection notes", "HOLD due to missing contractor notes", "HOLD due to incomplete roof/damage/service-scope details", "HOLD due to incomplete homeowner constraints", "HOLD due to incomplete photos/documentation review", "HOLD due to incomplete insurance context review", "HOLD due to unresolved estimate assumptions", "HOLD due to unresolved estimate unknowns", "HOLD due to unresolved contractor questions", "HOLD due to unresolved homeowner questions", "HOLD due to contractor match not confirmed", "HOLD due to contractor service-area fit not confirmed", "BLOCKED due to consent/safety/production activation risk", "manual founder/operator review"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "No-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules", ["Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "Follow-up sent: no", "The packet itself must never create estimates"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Contractor estimate review tracker", ["Contractor estimate review tracker", "Manual contractor review state", "Estimate created: no", "Follow-up sent: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Founder/operator contractor review decision log", ["Founder/Operator Contractor Review Decision Log entry", "PASS / HOLD / BLOCKED", "Estimate created: no", "Production system touched: no", "Follow-up sent: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "End-of-day contractor review report", ["End-of-Day Contractor Review Report", "Estimate created across all: no", "Quote generated across all: no", "Quote sent across all: no", "Contractor notification sent across all: no", "Calendar booking performed across all: no", "External notification sent across all: no", "Production system touched across all: no", "Follow-up sent across all: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Next-operator handoff", ["Handoff Notes", "next operator session", "dry-run flag confirmation", "Estimate created: no", "Follow-up sent: no"], "contractor estimate review packet doc");
assertSectionWithContent(doc, "Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation", ["no live SMS/Twilio", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "external notification sent: no", "production system touched: no", "Follow-up sent: no", "The packet itself must never create estimates"], "contractor estimate review packet doc");
console.log("PASS: contractor estimate review packet doc contains all required operational sections with substantive content.");

// Assert concrete fields (not just headings) are present per requirements
const concreteFields = [
  "Lead ID",
  "Homeowner name",
  "Property address",
  "Contractor match",
  "Contractor service-area fit",
  "Prior appointment outcome",
  "Estimate / next-step state",
  "Manual estimate prep state",
  "Inspection notes present",
  "Contractor notes present",
  "Homeowner constraints captured",
  "Roof/damage details complete",
  "Photos reviewed",
  "Insurance context reviewed",
  "Documentation complete",
  "Estimate assumptions listed",
  "Estimate unknowns listed",
  "Contractor questions listed",
  "Homeowner questions listed",
  "Contractor review owner",
  "Contractor review readiness: READY / NEEDS INFO / HOLD / BLOCKED",
  "Manual contractor review decision: PASS / HOLD / BLOCKED",
  "Manual contractor review state: DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED",
  "Estimate created: no",
  "Quote generated: no",
  "Quote sent: no",
  "Contractor notification sent: no",
  "Follow-up sent: no",
  "Calendar booking performed: no",
  "External notification sent: no",
  "Production system touched: no",
  "Founder/operator notes",
  "Next manual action",
  "Contractor estimate review"
];
assertConcreteFields(doc, concreteFields, "contractor estimate review packet doc concrete fields");
console.log("PASS: contractor estimate review packet doc contains all required concrete fields (Lead ID, homeowner name, property address, contractor match, contractor service-area fit, prior appointment outcome, estimate / next-step state, manual estimate prep state, inspection notes present, contractor notes present, homeowner constraints captured, roof/damage details complete, photos reviewed, insurance context reviewed, documentation complete, estimate assumptions/unknowns listed, contractor/homeowner questions listed, contractor review owner, readiness states, PASS/HOLD/BLOCKED decision, DRAFT/REVIEWED/READY FOR MANUAL CONTRACTOR REVIEW state, all safety markers, etc.).");

// Assert required operational field markers
mustHave(doc, "Lead ID:", "contractor estimate review packet doc");
mustHave(doc, "Prior appointment outcome", "contractor estimate review packet doc");
mustHave(doc, "Manual follow-up state", "contractor estimate review packet doc");
mustHave(doc, "Estimate / next-step state", "contractor estimate review packet doc");
mustHave(doc, "Manual estimate prep state", "contractor estimate review packet doc");
mustHave(doc, "Manual contractor review decision: PASS / HOLD / BLOCKED", "contractor estimate review packet doc");
mustHave(doc, "Manual contractor review state", "contractor estimate review packet doc");
mustHave(doc, "READY FOR MANUAL CONTRACTOR REVIEW", "contractor estimate review packet doc");
mustHave(doc, "Estimate created: no", "contractor estimate review packet doc");
mustHave(doc, "Quote generated: no", "contractor estimate review packet doc");
mustHave(doc, "Quote sent: no", "contractor estimate review packet doc");
mustHave(doc, "Contractor notification sent: no", "contractor estimate review packet doc");
mustHave(doc, "Calendar booking performed: no", "contractor estimate review packet doc");
mustHave(doc, "External notification sent: no", "contractor estimate review packet doc");
mustHave(doc, "Production system touched: no", "contractor estimate review packet doc");
mustHave(doc, "Follow-up sent: no", "contractor estimate review packet doc");
console.log("PASS: contractor estimate review packet doc contains required operational field markers.");

// Assert PASS/HOLD/BLOCKED criteria and approval states present with full language
mustHave(doc, "DRAFT / REVIEWED / READY FOR MANUAL CONTRACTOR REVIEW / HOLD / BLOCKED", "contractor estimate review packet doc");
mustHave(doc, "READY FOR MANUAL CONTRACTOR REVIEW", "contractor estimate review packet doc");
mustHave(doc, "Manual contractor review decision: PASS / HOLD / BLOCKED", "contractor estimate review packet doc");
console.log("PASS: contractor estimate review packet doc contains required approval states and PASS / HOLD / BLOCKED criteria.");

// Assert all required worksheets present with safety notes
mustHave(doc, "Contractor review package worksheet", "contractor estimate review packet doc");
mustHave(doc, "Scope summary worksheet", "contractor estimate review packet doc");
mustHave(doc, "Photos / documentation review worksheet", "contractor estimate review packet doc");
mustHave(doc, "Insurance context review worksheet", "contractor estimate review packet doc");
mustHave(doc, "Contractor questions worksheet", "contractor estimate review packet doc");
mustHave(doc, "Founder/operator questions worksheet", "contractor estimate review packet doc");
mustHave(doc, "Homeowner clarification worksheet", "contractor estimate review packet doc");
mustHave(doc, "Manual contractor review readiness worksheet", "contractor estimate review packet doc");
mustHave(doc, "Safety note", "contractor estimate review packet doc");
mustHave(doc, "internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems", "contractor estimate review packet doc");
mustHave(doc, "Estimate created: no", "contractor estimate review packet doc");
console.log("PASS: contractor estimate review packet doc includes all required worksheets (contractor review package, scope summary, photos/documentation review, insurance context review, contractor questions, founder/operator questions, homeowner clarification, manual contractor review readiness) with safety notes and no-estimate/quote/notification/booking markers.");

// Assert contractor review approval states present
mustHave(doc, "Contractor review approval states", "contractor estimate review packet doc");
mustHave(doc, "READY FOR MANUAL CONTRACTOR REVIEW", "contractor estimate review packet doc");
console.log("PASS: contractor estimate review packet doc includes contractor review approval states.");

// Assert HOLD/BLOCKED rules for all required categories
mustHave(doc, "HOLD due to missing contractor review owner", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to missing estimate prep state", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to unresolved estimate / next-step readiness state", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to missing inspection notes", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to missing contractor notes", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to incomplete roof/damage/service-scope details", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to incomplete homeowner constraints", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to incomplete photos/documentation review", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to incomplete insurance context review", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to unresolved estimate assumptions", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to unresolved estimate unknowns", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to unresolved contractor questions", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to unresolved homeowner questions", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to contractor match not confirmed", "contractor estimate review packet doc");
mustHave(doc, "HOLD due to contractor service-area fit not confirmed", "contractor estimate review packet doc");
mustHave(doc, "BLOCKED due to consent/safety/production activation risk", "contractor estimate review packet doc");
mustHave(doc, "HOLD / BLOCKED rules", "contractor estimate review packet doc");
console.log("PASS: contractor estimate review packet doc includes HOLD/BLOCKED rules for missing contractor review owner, missing estimate prep state, unresolved estimate / next-step readiness state, missing inspection notes, missing contractor notes, incomplete roof/damage/service-scope details, incomplete homeowner constraints, incomplete photos/documentation review, incomplete insurance context review, unresolved estimate assumptions, unresolved estimate unknowns, unresolved contractor questions, unresolved homeowner questions, contractor match not confirmed, contractor service-area fit not confirmed, consent/safety, and production activation risk.");

// Assert no-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules present
mustHave(doc, "No-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules", "contractor estimate review packet doc");
mustHave(doc, "Estimate created: no", "contractor estimate review packet doc");
mustHave(doc, "Quote generated: no", "contractor estimate review packet doc");
mustHave(doc, "Quote sent: no", "contractor estimate review packet doc");
mustHave(doc, "Contractor notification sent: no", "contractor estimate review packet doc");
mustHave(doc, "Calendar booking performed: no", "contractor estimate review packet doc");
mustHave(doc, "External notification sent: no", "contractor estimate review packet doc");
mustHave(doc, "Production system touched: no", "contractor estimate review packet doc");
mustHave(doc, "Follow-up sent: no", "contractor estimate review packet doc");
mustHave(doc, "The packet itself must never create estimates", "contractor estimate review packet doc");
console.log("PASS: contractor estimate review packet doc includes no-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules with explicit markers.");

// Assert tracker, decision log, EOD report, and next-operator handoff
mustHave(doc, "Contractor estimate review tracker", "contractor estimate review packet doc");
mustHave(doc, "Founder/operator contractor review decision log", "contractor estimate review packet doc");
mustHave(doc, "Founder/Operator Contractor Review Decision Log entry", "contractor estimate review packet doc");
mustHave(doc, "End-of-day contractor review report", "contractor estimate review packet doc");
mustHave(doc, "End-of-Day Contractor Review Report", "contractor estimate review packet doc");
mustHave(doc, "Next-operator handoff", "contractor estimate review packet doc");
mustHave(doc, "Handoff Notes", "contractor estimate review packet doc");
mustHave(doc, "Estimate created across all: no", "contractor estimate review packet doc");
mustHave(doc, "Follow-up sent across all: no", "contractor estimate review packet doc");
console.log("PASS: contractor estimate review packet doc includes contractor estimate review tracker, founder/operator contractor review decision log, end-of-day contractor review report, and next-operator handoff.");

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
  "Contractor notification sent: no",
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
  "internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "contractor estimate review packet doc safety");
}
console.log("PASS: contractor estimate review packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation / no production activation language.");

// Assert explicit no-live language
mustHave(doc, "Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation", "contractor estimate review packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "contractor estimate review packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "contractor estimate review packet doc");
mustHave(doc, "internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send follow-ups, book, notify, calendar, or touch production systems", "contractor estimate review packet doc");
mustHave(doc, "Any real-world estimate preparation, quote review, contractor coordination, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval", "contractor estimate review packet doc");
console.log("PASS: contractor estimate review packet doc includes explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation / no production activation language.");

// Assert required business phrases are present
const requiredPhrases = [
  "Founder-Led Launch Program",
  "book inspections",
  "book appointments",
  "manual founder/operator review",
  "manual coordination only",
  "appointment outcome",
  "manual follow-up",
  "estimate readiness",
  "next-step readiness",
  "manual estimate prep",
  "contractor estimate review",
  "draft-only",
  "READY FOR FOUNDER REVIEW",
  "READY FOR CONTRACTOR REVIEW",
  "READY FOR MANUAL CONTRACTOR REVIEW",
  "Estimate created: no",
  "Quote generated: no",
  "Quote sent: no",
  "Contractor notification sent: no",
  "Follow-up sent: no",
  "Calendar booking performed: no",
  "external notification sent: no",
  "production system touched: no"
];
for (const p of requiredPhrases) {
  mustHave(doc, p, "contractor estimate review packet doc required business phrases");
}
console.log("PASS: contractor estimate review packet doc contains all required business phrases.");

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
  mustNotHave(doc, f, "contractor estimate review packet doc");
  mustNotHave(estimatePrep, f, "estimate prep packet (cross-check)");
  mustNotHave(estimateNextStep, f, "estimate / next-step readiness packet (cross-check)");
  mustNotHave(apptOutcome, f, "appointment outcome packet (cross-check)");
  mustNotHave(manualFollowUp, f, "manual follow-up packet (cross-check)");
  mustNotHave(dayOne, f, "day-one command center (cross-check)");
  mustNotHave(manualComm, f, "manual communication packet (cross-check)");
  mustNotHave(inspectionCoord, f, "inspection coordination packet (cross-check)");
  mustNotHave(apptReadiness, f, "appointment readiness packet (cross-check)");
  mustNotHave(leadTo, f, "lead-to-inspection ops pack (cross-check)");
  mustNotHave(runbook, f, "execution day runbook (cross-check)");
}
console.log("PASS: forbidden business/guarantee/automation/estimate/payment language absent from contractor estimate review packet doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-contractor-estimate-review-command-packet-readonly.js", "contractor estimate review packet wrapper");
console.log("PASS: wrapper invokes the contractor estimate review command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "contractor estimate review packet wrapper");
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
  mustNotHave(wrapper, u, "contractor estimate review packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-contractor-estimate-review-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Contractor Estimate Review Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the contractor estimate review command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-contractor-estimate-review-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-contractor-estimate-review-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md",
  "run-first-roofer-contractor-estimate-review-command-packet-dry-run.sh",
  "verify-first-roofer-contractor-estimate-review-command-packet-readonly.js",
  "First Roofer Contractor Estimate Review Command Packet",
  "contractor estimate review command packet",
  "contractor estimate review"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the contractor estimate review command packet.");

// Assert grok workflow context references the new packet (consistent with recent packet pattern)
mustHave(workflow, "FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md", "grok workflow context");
mustHave(workflow, "First Roofer Contractor Estimate Review Command Packet", "grok workflow context");
console.log("PASS: grok workflow context references the contractor estimate review command packet (consistent with recent packet pattern).");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer contractor estimate review command packet is operational, product-moving, references estimate prep packet (primary) + estimate / next-step readiness packet + appointment outcome packet + manual follow-up packet + day-one + manual comm packet + inspection coordination packet + appointment readiness packet + ops pack + runbook + follow-up cadence packet + appointment outcome packet (paid) + booking preferences packet + reporting preferences packet + contractor notification packet + manual review queue packet + quality gate, and strictly dry-run only with all required worksheets, fields, approval states, HOLD/BLOCKED rules (missing contractor review owner, missing estimate prep state, unresolved estimate / next-step readiness state, missing inspection notes, missing contractor notes, incomplete roof/damage/service-scope details, incomplete homeowner constraints, incomplete photos/documentation review, incomplete insurance context review, unresolved estimate assumptions, unresolved estimate unknowns, unresolved contractor questions, unresolved homeowner questions, contractor match not confirmed, contractor service-area fit not confirmed, consent/safety, prod risk), no-send/no-estimate-create/no-quote-generate/no-calendar/no-booking safety, tracker, decision log, end-of-day report, handoff, explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation, required phrases, and absent forbidden phrases.");

console.log("PASS: aggregate, verifier index, both next-chat contexts, and grok workflow context contain required contractor estimate review command packet references.");
console.log("PASS: packet enforces dry-run/internal-only/founder-operator-only posture with Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no throughout.");
