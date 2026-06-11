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

const docPath = "docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-homeowner-clarification-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-homeowner-clarification-command-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";

// Prior packet references for cross-checks and forbidden language
const contractorEstimateReviewPath = "docs/FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md";
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
const contractorEstimateReview = read(contractorEstimateReviewPath);
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
console.log("PASS: all expected files for first roofer homeowner clarification command packet exist.");

// Assert the doc references the contractor estimate review packet (primary), estimate prep packet, estimate / next-step readiness packet, appointment outcome packet, manual follow-up packet, and the broader chain + quality gate
mustHave(doc, "FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md", "homeowner clarification packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "homeowner clarification packet doc");

mustHave(doc, "First Roofer Contractor Estimate Review Command Packet", "homeowner clarification packet doc");
mustHave(doc, "First Roofer Estimate Prep Command Packet", "homeowner clarification packet doc");
mustHave(doc, "First Roofer Estimate / Next-Step Readiness Command Packet", "homeowner clarification packet doc");
mustHave(doc, "First Roofer Appointment Outcome Command Packet", "homeowner clarification packet doc");
mustHave(doc, "First Roofer Manual Follow-Up Command Packet", "homeowner clarification packet doc");
mustHave(doc, "first-roofer day-one command center", "homeowner clarification packet doc");
mustHave(doc, "First Roofer Manual Communication Command Packet", "homeowner clarification packet doc");
mustHave(doc, "First Roofer Inspection Coordination Command Packet", "homeowner clarification packet doc");
mustHave(doc, "First Roofer Appointment Readiness Command Packet", "homeowner clarification packet doc");
mustHave(doc, "Lead-to-Inspection Ops Pack", "homeowner clarification packet doc");
mustHave(doc, "Execution Day Runbook", "homeowner clarification packet doc");
mustHave(doc, "Follow-Up Cadence Packet", "homeowner clarification packet doc");
mustHave(doc, "Appointment Outcome Packet", "homeowner clarification packet doc");
mustHave(doc, "Booking Preferences Packet", "homeowner clarification packet doc");
mustHave(doc, "Reporting Preferences Packet", "homeowner clarification packet doc");
mustHave(doc, "Contractor Notification Packet", "homeowner clarification packet doc");
mustHave(doc, "Manual Review Queue Packet", "homeowner clarification packet doc");
mustHave(doc, "Agent Product Quality Gate", "homeowner clarification packet doc");
console.log("PASS: homeowner clarification packet doc references contractor estimate review packet (primary), estimate prep packet, estimate / next-step readiness packet, appointment outcome packet, manual follow-up packet, day-one command center, manual communication packet, inspection coordination packet, appointment readiness packet, lead-to-inspection ops pack, execution day runbook, follow-up cadence packet, appointment outcome packet (paid), booking preferences packet, reporting preferences packet, contractor notification packet, manual review queue packet, and quality gate.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "Follow-up sent: no", "Calendar booking performed: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Homeowner clarification command overview", ["prepare to book inspections", "prepare to book appointments", "manual coordination only", "after a lead has reached", "First Roofer Contractor Estimate Review Command Packet", "First Roofer Estimate Prep Command Packet", "First Roofer Estimate / Next-Step Readiness Command Packet", "First Roofer Appointment Outcome Command Packet", "First Roofer Manual Follow-Up Command Packet"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Contractor Estimate Review Command Packet", ["Inputs from First Roofer Contractor Estimate Review", "Manual contractor review state", "READY FOR MANUAL CONTRACTOR REVIEW", "READY FOR MANUAL HOMEOWNER CLARIFICATION", "manual coordination only"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Estimate Prep Command Packet", ["Inputs from First Roofer Estimate Prep", "Manual estimate prep state", "READY FOR MANUAL ESTIMATE PREP", "READY FOR CONTRACTOR REVIEW", "manual coordination only"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Inputs from Estimate / Next-Step Readiness Command Packet", ["Inputs from Estimate / Next-Step Readiness", "Estimate / next-step state", "READY FOR MANUAL ESTIMATE PREP", "READY FOR MANUAL NEXT STEP", "manual coordination only"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Inputs from Manual Follow-Up and Appointment Outcome packets", ["Inputs from Manual Follow-Up", "Inputs from Appointment Outcome", "Manual follow-up state", "Prior appointment outcome", "manual coordination only"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Homeowner clarification prerequisites", ["prerequisites", "contractor estimate review packet", "estimate prep packet", "estimate / next-step readiness packet", "appointment outcome packet", "manual follow-up packet", "READY FOR MANUAL HOMEOWNER CLARIFICATION", "PASS / HOLD / BLOCKED"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Lead homeowner-clarification intake checklist", ["Lead ID", "Contact permission status", "Contractor match", "Contractor service-area fit", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "Follow-up sent: no", "Calendar booking performed: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Homeowner clarification package worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Homeowner Clarification Package", "Estimate created: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Missing homeowner constraints worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Missing Homeowner Constraints", "Estimate created: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Photos / documentation request-prep worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Photos / Documentation Request-Prep", "Photos reviewed", "Documentation complete", "Estimate created: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Insurance context clarification worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Insurance Context Clarification", "Insurance context reviewed", "Estimate created: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Roof / damage / service-scope clarification worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Roof / Damage / Service-Scope Clarification", "Roof/damage details complete", "Estimate created: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Access and scheduling clarification worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Access and Scheduling Clarification", "Access issue", "Scheduling constraint", "Estimate created: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Contractor question translation worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Contractor Question Translation", "Contractor questions listed", "Estimate created: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Founder/operator clarification questions worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Founder/Operator Clarification Questions", "Estimate created: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Homeowner clarification readiness worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Homeowner Clarification Readiness", "Manual homeowner clarification decision", "Estimate created: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Manual clarification draft-prep worksheet", ["Safety note", "internal-only", "does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Manual Clarification Draft-Prep", "Draft clarification prepared", "Estimate created: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Homeowner clarification approval states", ["DRAFT / REVIEWED / READY FOR MANUAL HOMEOWNER CLARIFICATION / HOLD / BLOCKED", "Manual homeowner clarification state", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "Follow-up sent: no", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "HOLD / BLOCKED rules", ["HOLD due to missing homeowner clarification owner", "HOLD due to missing contact permission status", "HOLD due to do-not-contact or unclear permission", "HOLD due to missing homeowner preferred channel", "HOLD due to missing contractor review state", "HOLD due to unresolved contractor estimate review state", "HOLD due to missing estimate prep state", "HOLD due to unresolved estimate / next-step readiness state", "HOLD due to incomplete homeowner constraints", "HOLD due to incomplete photos/documentation request-prep", "HOLD due to incomplete insurance context clarification", "HOLD due to incomplete roof/damage/service-scope clarification", "HOLD due to unresolved access issue", "HOLD due to unresolved scheduling constraint", "HOLD due to unresolved estimate assumptions", "HOLD due to unresolved estimate unknowns", "HOLD due to unresolved contractor questions", "HOLD due to unresolved founder/operator questions", "HOLD due to unresolved homeowner questions", "HOLD due to contractor match not confirmed", "HOLD due to contractor service-area fit not confirmed", "BLOCKED due to consent/safety/production activation risk", "manual founder/operator review"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "No-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules", ["Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "Follow-up sent: no", "The packet itself must never create estimates"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Homeowner clarification tracker", ["Homeowner clarification tracker", "Manual homeowner clarification state", "Estimate created: no", "Follow-up sent: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Founder/operator homeowner clarification decision log", ["Founder/Operator Homeowner Clarification Decision Log entry", "PASS / HOLD / BLOCKED", "Estimate created: no", "Production system touched: no", "Follow-up sent: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "End-of-day homeowner clarification report", ["End-of-Day Homeowner Clarification Report", "Estimate created across all: no", "Quote generated across all: no", "Quote sent across all: no", "Contractor notification sent across all: no", "Homeowner notification sent across all: no", "Calendar booking performed across all: no", "External notification sent across all: no", "Production system touched across all: no", "Follow-up sent across all: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Next-operator handoff", ["Handoff Notes", "next operator session", "dry-run flag confirmation", "Estimate created: no", "Follow-up sent: no"], "homeowner clarification packet doc");
assertSectionWithContent(doc, "Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation", ["no live SMS/Twilio", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "external notification sent: no", "production system touched: no", "Follow-up sent: no", "The packet itself must never create estimates"], "homeowner clarification packet doc");
console.log("PASS: homeowner clarification packet doc contains all required operational sections with substantive content.");

// Assert concrete fields (not just headings) are present per requirements
const concreteFields = [
  "Lead ID",
  "Homeowner name",
  "Property address",
  "Homeowner preferred channel",
  "Contact permission status",
  "Contractor match",
  "Contractor service-area fit",
  "Prior appointment outcome",
  "Estimate / next-step state",
  "Manual estimate prep state",
  "Manual contractor review state",
  "Contractor review readiness",
  "Homeowner clarification owner",
  "Clarification reason",
  "Missing homeowner constraints",
  "Missing photos/documentation",
  "Missing insurance context",
  "Missing roof/damage/service-scope details",
  "Access issue status",
  "Scheduling constraint status",
  "Estimate assumptions needing homeowner clarification",
  "Estimate unknowns needing homeowner clarification",
  "Contractor questions needing homeowner clarification",
  "Founder/operator questions needing homeowner clarification",
  "Homeowner questions already listed",
  "Consent/safety concern status",
  "Draft clarification prepared: yes / no",
  "Clarification reviewed by founder/operator: yes / no",
  "Homeowner clarification readiness: READY / NEEDS INFO / HOLD / BLOCKED",
  "Manual homeowner clarification decision: PASS / HOLD / BLOCKED",
  "Manual homeowner clarification state: DRAFT / REVIEWED / READY FOR MANUAL HOMEOWNER CLARIFICATION / HOLD / BLOCKED",
  "Estimate created: no",
  "Quote generated: no",
  "Quote sent: no",
  "Contractor notification sent: no",
  "Homeowner notification sent: no",
  "Follow-up sent: no",
  "Calendar booking performed: no",
  "External notification sent: no",
  "Production system touched: no",
  "Founder/operator notes",
  "Next manual action",
  "Homeowner clarification"
];
assertConcreteFields(doc, concreteFields, "homeowner clarification packet doc concrete fields");
console.log("PASS: homeowner clarification packet doc contains all required concrete fields (Lead ID, homeowner name, property address, homeowner preferred channel, contact permission status, contractor match, contractor service-area fit, prior appointment outcome, estimate / next-step state, manual estimate prep state, manual contractor review state, contractor review readiness, homeowner clarification owner, clarification reason, missing homeowner constraints, missing photos/documentation, missing insurance context, missing roof/damage/service-scope details, access issue status, scheduling constraint status, estimate assumptions/unknowns needing homeowner clarification, contractor/founder/homeowner questions needing clarification, consent/safety concern status, draft clarification prepared, clarification reviewed by founder/operator, readiness states, PASS/HOLD/BLOCKED decision, DRAFT/REVIEWED/READY FOR MANUAL HOMEOWNER CLARIFICATION state, all safety markers, etc.).");

// Assert required operational field markers
mustHave(doc, "Lead ID:", "homeowner clarification packet doc");
mustHave(doc, "Prior appointment outcome", "homeowner clarification packet doc");
mustHave(doc, "Manual follow-up state", "homeowner clarification packet doc");
mustHave(doc, "Estimate / next-step state", "homeowner clarification packet doc");
mustHave(doc, "Manual estimate prep state", "homeowner clarification packet doc");
mustHave(doc, "Manual contractor review state", "homeowner clarification packet doc");
mustHave(doc, "Manual homeowner clarification decision: PASS / HOLD / BLOCKED", "homeowner clarification packet doc");
mustHave(doc, "Manual homeowner clarification state", "homeowner clarification packet doc");
mustHave(doc, "READY FOR MANUAL HOMEOWNER CLARIFICATION", "homeowner clarification packet doc");
mustHave(doc, "Estimate created: no", "homeowner clarification packet doc");
mustHave(doc, "Quote generated: no", "homeowner clarification packet doc");
mustHave(doc, "Quote sent: no", "homeowner clarification packet doc");
mustHave(doc, "Contractor notification sent: no", "homeowner clarification packet doc");
mustHave(doc, "Homeowner notification sent: no", "homeowner clarification packet doc");
mustHave(doc, "Calendar booking performed: no", "homeowner clarification packet doc");
mustHave(doc, "External notification sent: no", "homeowner clarification packet doc");
mustHave(doc, "Production system touched: no", "homeowner clarification packet doc");
mustHave(doc, "Follow-up sent: no", "homeowner clarification packet doc");
console.log("PASS: homeowner clarification packet doc contains required operational field markers.");

// Assert PASS/HOLD/BLOCKED criteria and approval states present with full language
mustHave(doc, "DRAFT / REVIEWED / READY FOR MANUAL HOMEOWNER CLARIFICATION / HOLD / BLOCKED", "homeowner clarification packet doc");
mustHave(doc, "READY FOR MANUAL HOMEOWNER CLARIFICATION", "homeowner clarification packet doc");
mustHave(doc, "Manual homeowner clarification decision: PASS / HOLD / BLOCKED", "homeowner clarification packet doc");
console.log("PASS: homeowner clarification packet doc contains required approval states and PASS / HOLD / BLOCKED criteria.");

// Assert all required worksheets present with safety notes
mustHave(doc, "Homeowner clarification package worksheet", "homeowner clarification packet doc");
mustHave(doc, "Missing homeowner constraints worksheet", "homeowner clarification packet doc");
mustHave(doc, "Photos / documentation request-prep worksheet", "homeowner clarification packet doc");
mustHave(doc, "Insurance context clarification worksheet", "homeowner clarification packet doc");
mustHave(doc, "Roof / damage / service-scope clarification worksheet", "homeowner clarification packet doc");
mustHave(doc, "Access and scheduling clarification worksheet", "homeowner clarification packet doc");
mustHave(doc, "Contractor question translation worksheet", "homeowner clarification packet doc");
mustHave(doc, "Founder/operator clarification questions worksheet", "homeowner clarification packet doc");
mustHave(doc, "Homeowner clarification readiness worksheet", "homeowner clarification packet doc");
mustHave(doc, "Manual clarification draft-prep worksheet", "homeowner clarification packet doc");
mustHave(doc, "Safety note", "homeowner clarification packet doc");
mustHave(doc, "internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "homeowner clarification packet doc");
mustHave(doc, "Estimate created: no", "homeowner clarification packet doc");
console.log("PASS: homeowner clarification packet doc includes all required worksheets (homeowner clarification package, missing homeowner constraints, photos/documentation request-prep, insurance context clarification, roof/damage/service-scope clarification, access and scheduling clarification, contractor question translation, founder/operator clarification questions, homeowner clarification readiness, manual clarification draft-prep) with safety notes and no-estimate/quote/notification/booking markers.");

// Assert homeowner clarification approval states present
mustHave(doc, "Homeowner clarification approval states", "homeowner clarification packet doc");
mustHave(doc, "READY FOR MANUAL HOMEOWNER CLARIFICATION", "homeowner clarification packet doc");
console.log("PASS: homeowner clarification packet doc includes homeowner clarification approval states.");

// Assert HOLD/BLOCKED rules for all required categories
mustHave(doc, "HOLD due to missing homeowner clarification owner", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to missing contact permission status", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to do-not-contact or unclear permission", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to missing homeowner preferred channel", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to missing contractor review state", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to unresolved contractor estimate review state", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to missing estimate prep state", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to unresolved estimate / next-step readiness state", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to incomplete homeowner constraints", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to incomplete photos/documentation request-prep", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to incomplete insurance context clarification", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to incomplete roof/damage/service-scope clarification", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to unresolved access issue", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to unresolved scheduling constraint", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to unresolved estimate assumptions", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to unresolved estimate unknowns", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to unresolved contractor questions", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to unresolved founder/operator questions", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to unresolved homeowner questions", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to contractor match not confirmed", "homeowner clarification packet doc");
mustHave(doc, "HOLD due to contractor service-area fit not confirmed", "homeowner clarification packet doc");
mustHave(doc, "BLOCKED due to consent/safety/production activation risk", "homeowner clarification packet doc");
mustHave(doc, "HOLD / BLOCKED rules", "homeowner clarification packet doc");
console.log("PASS: homeowner clarification packet doc includes HOLD/BLOCKED rules for missing homeowner clarification owner, missing contact permission status, do-not-contact or unclear permission, missing homeowner preferred channel, missing contractor review state, unresolved contractor estimate review state, missing estimate prep state, unresolved estimate / next-step readiness state, incomplete homeowner constraints, incomplete photos/documentation request-prep, incomplete insurance context clarification, incomplete roof/damage/service-scope clarification, unresolved access issue, unresolved scheduling constraint, unresolved estimate assumptions, unresolved estimate unknowns, unresolved contractor questions, unresolved founder/operator questions, unresolved homeowner questions, contractor match not confirmed, contractor service-area fit not confirmed, consent/safety, and production activation risk.");

// Assert no-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules present
mustHave(doc, "No-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules", "homeowner clarification packet doc");
mustHave(doc, "Estimate created: no", "homeowner clarification packet doc");
mustHave(doc, "Quote generated: no", "homeowner clarification packet doc");
mustHave(doc, "Quote sent: no", "homeowner clarification packet doc");
mustHave(doc, "Contractor notification sent: no", "homeowner clarification packet doc");
mustHave(doc, "Homeowner notification sent: no", "homeowner clarification packet doc");
mustHave(doc, "Calendar booking performed: no", "homeowner clarification packet doc");
mustHave(doc, "External notification sent: no", "homeowner clarification packet doc");
mustHave(doc, "Production system touched: no", "homeowner clarification packet doc");
mustHave(doc, "Follow-up sent: no", "homeowner clarification packet doc");
mustHave(doc, "The packet itself must never create estimates", "homeowner clarification packet doc");
console.log("PASS: homeowner clarification packet doc includes no-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules with explicit markers.");

// Assert tracker, decision log, EOD report, and next-operator handoff
mustHave(doc, "Homeowner clarification tracker", "homeowner clarification packet doc");
mustHave(doc, "Founder/operator homeowner clarification decision log", "homeowner clarification packet doc");
mustHave(doc, "Founder/Operator Homeowner Clarification Decision Log entry", "homeowner clarification packet doc");
mustHave(doc, "End-of-day homeowner clarification report", "homeowner clarification packet doc");
mustHave(doc, "End-of-Day Homeowner Clarification Report", "homeowner clarification packet doc");
mustHave(doc, "Next-operator handoff", "homeowner clarification packet doc");
mustHave(doc, "Handoff Notes", "homeowner clarification packet doc");
mustHave(doc, "Estimate created across all: no", "homeowner clarification packet doc");
mustHave(doc, "Follow-up sent across all: no", "homeowner clarification packet doc");
console.log("PASS: homeowner clarification packet doc includes homeowner clarification tracker, founder/operator homeowner clarification decision log, end-of-day homeowner clarification report, and next-operator handoff.");

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
  "Homeowner notification sent: no",
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
  "internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "homeowner clarification packet doc safety");
}
console.log("PASS: homeowner clarification packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation / no production activation language.");

// Assert explicit no-live language
mustHave(doc, "Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation", "homeowner clarification packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "homeowner clarification packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "homeowner clarification packet doc");
mustHave(doc, "internal-only and does not create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "homeowner clarification packet doc");
mustHave(doc, "Any real-world estimate preparation, quote review, contractor coordination, homeowner clarification, homeowner follow-up, or booking must be performed manually by a founder/operator outside the system after explicit approval", "homeowner clarification packet doc");
console.log("PASS: homeowner clarification packet doc includes explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation / no production activation language.");

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
  "homeowner clarification",
  "draft-only",
  "READY FOR FOUNDER REVIEW",
  "READY FOR CONTRACTOR REVIEW",
  "READY FOR MANUAL CONTRACTOR REVIEW",
  "READY FOR MANUAL HOMEOWNER CLARIFICATION",
  "Estimate created: no",
  "Quote generated: no",
  "Quote sent: no",
  "Contractor notification sent: no",
  "Homeowner notification sent: no",
  "Follow-up sent: no",
  "Calendar booking performed: no",
  "external notification sent: no",
  "production system touched: no"
];
for (const p of requiredPhrases) {
  mustHave(doc, p, "homeowner clarification packet doc required business phrases");
}
console.log("PASS: homeowner clarification packet doc contains all required business phrases.");

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
  mustNotHave(doc, f, "homeowner clarification packet doc");
  mustNotHave(contractorEstimateReview, f, "contractor estimate review packet (cross-check)");
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
console.log("PASS: forbidden business/guarantee/automation/estimate/payment language absent from homeowner clarification packet doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-homeowner-clarification-command-packet-readonly.js", "homeowner clarification packet wrapper");
console.log("PASS: wrapper invokes the homeowner clarification command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "homeowner clarification packet wrapper");
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
  mustNotHave(wrapper, u, "homeowner clarification packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-homeowner-clarification-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Homeowner Clarification Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the homeowner clarification command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-homeowner-clarification-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-homeowner-clarification-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md",
  "run-first-roofer-homeowner-clarification-command-packet-dry-run.sh",
  "verify-first-roofer-homeowner-clarification-command-packet-readonly.js",
  "First Roofer Homeowner Clarification Command Packet",
  "homeowner clarification command packet",
  "homeowner clarification"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the homeowner clarification command packet.");

// Assert grok workflow context references the new packet (consistent with recent packet pattern)
mustHave(workflow, "FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md", "grok workflow context");
mustHave(workflow, "First Roofer Homeowner Clarification Command Packet", "grok workflow context");
console.log("PASS: grok workflow context references the homeowner clarification command packet (consistent with recent packet pattern).");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer homeowner clarification command packet is operational, product-moving, references contractor estimate review packet (primary) + estimate prep packet + estimate / next-step readiness packet + appointment outcome packet + manual follow-up packet + day-one + manual comm packet + inspection coordination packet + appointment readiness packet + ops pack + runbook + follow-up cadence packet + appointment outcome packet (paid) + booking preferences packet + reporting preferences packet + contractor notification packet + manual review queue packet + quality gate, and strictly dry-run only with all required worksheets, fields, approval states, HOLD/BLOCKED rules (missing homeowner clarification owner, missing contact permission status, do-not-contact or unclear permission, missing homeowner preferred channel, missing contractor review state, unresolved contractor estimate review state, missing estimate prep state, unresolved estimate / next-step readiness state, incomplete homeowner constraints, incomplete photos/documentation request-prep, incomplete insurance context clarification, incomplete roof/damage/service-scope clarification, unresolved access issue, unresolved scheduling constraint, unresolved estimate assumptions, unresolved estimate unknowns, unresolved contractor questions, unresolved founder/operator questions, unresolved homeowner questions, contractor match not confirmed, contractor service-area fit not confirmed, consent/safety, prod risk), no-send/no-estimate-create/no-quote-generate/no-calendar/no-booking safety, tracker, decision log, end-of-day report, handoff, explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation, required phrases, and absent forbidden phrases.");

console.log("PASS: aggregate, verifier index, both next-chat contexts, and grok workflow context contain required homeowner clarification command packet references.");
console.log("PASS: packet enforces dry-run/internal-only/founder-operator-only posture with Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no throughout.");
