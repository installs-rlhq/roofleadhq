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

const docPath = "docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-homeowner-clarification-response-review-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-homeowner-clarification-response-review-command-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";

// Prior packet references for cross-checks and forbidden language
const homeownerClarificationPath = "docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md";
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
const homeownerClarification = read(homeownerClarificationPath);
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
console.log("PASS: all expected files for first roofer homeowner clarification response review command packet exist.");

// Assert the doc references the homeowner clarification packet (primary), contractor estimate review packet, estimate prep packet, estimate / next-step readiness packet, and the broader chain + quality gate
mustHave(doc, "FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md", "homeowner clarification response review packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "homeowner clarification response review packet doc");

mustHave(doc, "First Roofer Homeowner Clarification Command Packet", "homeowner clarification response review packet doc");
mustHave(doc, "First Roofer Contractor Estimate Review Command Packet", "homeowner clarification response review packet doc");
mustHave(doc, "First Roofer Estimate Prep Command Packet", "homeowner clarification response review packet doc");
mustHave(doc, "First Roofer Estimate / Next-Step Readiness Command Packet", "homeowner clarification response review packet doc");
mustHave(doc, "First Roofer Appointment Outcome Command Packet", "homeowner clarification response review packet doc");
mustHave(doc, "First Roofer Manual Follow-Up Command Packet", "homeowner clarification response review packet doc");
mustHave(doc, "first-roofer day-one command center", "homeowner clarification response review packet doc");
mustHave(doc, "First Roofer Manual Communication Command Packet", "homeowner clarification response review packet doc");
mustHave(doc, "First Roofer Inspection Coordination Command Packet", "homeowner clarification response review packet doc");
mustHave(doc, "First Roofer Appointment Readiness Command Packet", "homeowner clarification response review packet doc");
mustHave(doc, "Lead-to-Inspection Ops Pack", "homeowner clarification response review packet doc");
mustHave(doc, "Execution Day Runbook", "homeowner clarification response review packet doc");
mustHave(doc, "Follow-Up Cadence Packet", "homeowner clarification response review packet doc");
mustHave(doc, "Appointment Outcome Packet", "homeowner clarification response review packet doc");
mustHave(doc, "Booking Preferences Packet", "homeowner clarification response review packet doc");
mustHave(doc, "Reporting Preferences Packet", "homeowner clarification response review packet doc");
mustHave(doc, "Contractor Notification Packet", "homeowner clarification response review packet doc");
mustHave(doc, "Manual Review Queue Packet", "homeowner clarification response review packet doc");
mustHave(doc, "Agent Product Quality Gate", "homeowner clarification response review packet doc");
console.log("PASS: homeowner clarification response review packet doc references homeowner clarification command packet (primary), contractor estimate review packet, estimate prep packet, estimate / next-step readiness packet, appointment outcome packet, manual follow-up packet, day-one command center, manual communication packet, inspection coordination packet, appointment readiness packet, lead-to-inspection ops pack, execution day runbook, follow-up cadence packet, appointment outcome packet (paid), booking preferences packet, reporting preferences packet, contractor notification packet, manual review queue packet, and quality gate.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "Follow-up sent: no", "Calendar booking performed: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Homeowner clarification response review command overview", ["prepare to book inspections", "prepare to book appointments", "manual coordination only", "after the First Roofer Homeowner Clarification Command Packet", "First Roofer Contractor Estimate Review Command Packet", "First Roofer Estimate Prep Command Packet", "First Roofer Estimate / Next-Step Readiness Command Packet", "First Roofer Appointment Outcome Command Packet", "First Roofer Manual Follow-Up Command Packet"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Homeowner Clarification Command Packet", ["Inputs from First Roofer Homeowner Clarification", "Manual homeowner clarification state", "READY FOR MANUAL HOMEOWNER CLARIFICATION", "READY TO ROUTE MANUALLY", "manual coordination only"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Contractor Estimate Review Command Packet", ["Inputs from First Roofer Contractor Estimate Review", "Manual contractor review state", "READY FOR MANUAL CONTRACTOR REVIEW", "manual coordination only"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Estimate Prep Command Packet", ["Inputs from First Roofer Estimate Prep", "Manual estimate prep state", "READY FOR MANUAL ESTIMATE PREP", "READY FOR CONTRACTOR REVIEW", "manual coordination only"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Inputs from Estimate / Next-Step Readiness Command Packet", ["Inputs from Estimate / Next-Step Readiness", "Estimate / next-step state", "READY FOR MANUAL ESTIMATE PREP", "READY FOR MANUAL NEXT STEP", "manual coordination only"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Inputs from Manual Follow-Up and Appointment Outcome packets", ["Inputs from Manual Follow-Up", "Inputs from Appointment Outcome", "Manual follow-up state", "Prior appointment outcome", "manual coordination only"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Homeowner clarification response review prerequisites", ["prerequisites", "homeowner clarification command packet", "contractor estimate review packet", "estimate prep packet", "estimate / next-step readiness packet", "appointment outcome packet", "manual follow-up packet", "READY TO ROUTE MANUALLY", "PASS / HOLD / BLOCKED"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Lead clarification response intake checklist", ["Lead ID", "Contact permission status", "Contractor match", "Contractor service-area fit", "Clarification response captured outside system", "Response captured by", "Response captured timestamp", "Response source / channel", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "Follow-up sent: no", "Calendar booking performed: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Homeowner response capture summary worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Homeowner Response Capture Summary", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Response completeness review worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Response Completeness Review", "Response completeness: COMPLETE / PARTIAL / NEEDS INFO / HOLD / BLOCKED", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Missing homeowner constraints resolution worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Missing Homeowner Constraints Resolution", "Missing homeowner constraints resolved", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Photos / documentation received review worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Photos / Documentation Received Review", "Photos/documentation received", "Photos/documentation reviewed", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Insurance context response review worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Insurance Context Response Review", "Insurance context clarified", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Roof / damage / service-scope response review worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Roof / Damage / Service-Scope Response Review", "Roof/damage/service-scope details clarified", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Access and scheduling response review worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Access and Scheduling Response Review", "Access issue resolved", "Scheduling constraint resolved", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Contractor questions answered review worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Contractor Questions Answered Review", "Contractor questions answered", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Founder/operator questions answered review worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Founder/Operator Questions Answered Review", "Founder/operator questions answered", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Homeowner questions and concerns review worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Homeowner Questions and Concerns Review", "Homeowner questions/concerns captured", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Estimate assumptions resolution worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Estimate Assumptions Resolution", "Estimate assumptions resolved", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Estimate unknowns resolution worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Estimate Unknowns Resolution", "Estimate unknowns resolved", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Downstream readiness routing worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Downstream Readiness Routing", "Recommended downstream route", "RETURN TO CONTRACTOR ESTIMATE REVIEW", "RETURN TO MANUAL ESTIMATE PREP", "RETURN TO ESTIMATE NEXT-STEP READINESS", "RETURN TO MANUAL FOLLOW-UP", "RETURN TO APPOINTMENT OR ACCESS COORDINATION", "READY FOR FOUNDER REVIEW", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Manual response-review decision worksheet", ["Safety note", "internal-only", "does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "Manual Response-Review Decision", "Manual response-review decision", "Estimate created: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Homeowner clarification response review approval states", ["DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / HOLD / BLOCKED", "Manual homeowner clarification response-review state", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "Follow-up sent: no", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "HOLD / BLOCKED rules", ["HOLD due to missing response-review owner", "HOLD due to response not captured outside system", "HOLD due to missing response captured by", "HOLD due to missing response captured timestamp", "HOLD due to missing response source / channel", "HOLD due to missing contact permission status", "HOLD due to do-not-contact or unclear permission", "HOLD due to missing homeowner preferred channel", "HOLD due to missing First Roofer Homeowner Clarification Command Packet reference", "HOLD due to missing prior manual homeowner clarification state", "HOLD due to unresolved prior homeowner clarification decision", "HOLD due to missing contractor review state", "HOLD due to unresolved contractor estimate review state", "HOLD due to missing estimate prep state", "HOLD due to unresolved estimate / next-step readiness state", "HOLD due to response completeness is PARTIAL / NEEDS INFO without owner", "HOLD due to homeowner constraints still incomplete", "HOLD due to photos/documentation still incomplete", "HOLD due to insurance context still incomplete", "HOLD due to roof/damage/service-scope details still incomplete", "HOLD due to access issue unresolved", "HOLD due to scheduling constraint unresolved", "HOLD due to estimate assumptions unresolved", "HOLD due to estimate unknowns unresolved", "HOLD due to contractor questions unanswered", "HOLD due to founder/operator questions unanswered", "HOLD due to homeowner questions/concerns unresolved", "HOLD due to contractor match not confirmed", "HOLD due to contractor service-area fit not confirmed", "HOLD due to recommended downstream route unclear", "BLOCKED due to consent/safety/production activation risk", "manual founder/operator review"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "No-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules", ["Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "Calendar booking performed: no", "External notification sent: no", "Production system touched: no", "Follow-up sent: no", "The packet itself must never send homeowner messages"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Homeowner clarification response tracker", ["Homeowner clarification response tracker", "Manual homeowner clarification response-review state", "Estimate created: no", "Follow-up sent: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Founder/operator response-review decision log", ["Founder/Operator Response-Review Decision Log entry", "PASS / HOLD / BLOCKED", "Estimate created: no", "Production system touched: no", "Follow-up sent: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "End-of-day homeowner clarification response review report", ["End-of-Day Homeowner Clarification Response Review Report", "Estimate created across all: no", "Quote generated across all: no", "Quote sent across all: no", "Contractor notification sent across all: no", "Homeowner notification sent across all: no", "Calendar booking performed across all: no", "External notification sent across all: no", "Production system touched across all: no", "Follow-up sent across all: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Next-operator handoff", ["Handoff Notes", "next operator session", "dry-run flag confirmation", "Estimate created: no", "Follow-up sent: no"], "homeowner clarification response review packet doc");
assertSectionWithContent(doc, "Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation", ["no live SMS/Twilio", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "external notification sent: no", "production system touched: no", "Follow-up sent: no", "The packet itself must never send homeowner messages"], "homeowner clarification response review packet doc");
console.log("PASS: homeowner clarification response review packet doc contains all required operational sections with substantive content.");

// Assert concrete fields (not just headings) are present per requirements
const concreteFields = [
  "Lead ID",
  "Homeowner name",
  "Property address",
  "Homeowner preferred channel",
  "Contact permission status",
  "Clarification response captured outside system: yes / no",
  "Response captured by",
  "Response captured timestamp",
  "Response source / channel",
  "First Roofer Homeowner Clarification Command Packet reference",
  "Original homeowner clarification owner",
  "Clarification reason",
  "Manual homeowner clarification state from prior packet",
  "Manual homeowner clarification decision from prior packet",
  "Contractor match",
  "Contractor service-area fit",
  "Prior appointment outcome",
  "Estimate / next-step state",
  "Manual estimate prep state",
  "Manual contractor review state",
  "Contractor review readiness",
  "Response completeness: COMPLETE / PARTIAL / NEEDS INFO / HOLD / BLOCKED",
  "Missing homeowner constraints resolved: yes / no / partial",
  "Photos/documentation received: yes / no / partial",
  "Photos/documentation reviewed: yes / no / partial",
  "Insurance context clarified: yes / no / partial",
  "Roof/damage/service-scope details clarified: yes / no / partial",
  "Access issue resolved: yes / no / partial",
  "Scheduling constraint resolved: yes / no / partial",
  "Estimate assumptions resolved: yes / no / partial",
  "Estimate unknowns resolved: yes / no / partial",
  "Contractor questions answered: yes / no / partial",
  "Founder/operator questions answered: yes / no / partial",
  "Homeowner questions/concerns captured: yes / no / partial",
  "Remaining homeowner information gaps",
  "Remaining contractor-facing questions",
  "Remaining founder/operator questions",
  "Consent/safety concern status",
  "Recommended downstream route: RETURN TO CONTRACTOR ESTIMATE REVIEW / RETURN TO MANUAL ESTIMATE PREP / RETURN TO ESTIMATE NEXT-STEP READINESS / RETURN TO MANUAL FOLLOW-UP / RETURN TO APPOINTMENT OR ACCESS COORDINATION / READY FOR FOUNDER REVIEW / HOLD / BLOCKED",
  "Manual response-review readiness: READY / NEEDS INFO / HOLD / BLOCKED",
  "Manual response-review decision: PASS / HOLD / BLOCKED",
  "Manual homeowner clarification response-review state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / HOLD / BLOCKED",
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
  "Homeowner clarification response review"
];
assertConcreteFields(doc, concreteFields, "homeowner clarification response review packet doc concrete fields");
console.log("PASS: homeowner clarification response review packet doc contains all required concrete fields (Lead ID, homeowner name, property address, homeowner preferred channel, contact permission status, clarification response captured outside system, response captured by, response captured timestamp, response source / channel, First Roofer Homeowner Clarification Command Packet reference, original homeowner clarification owner, clarification reason, prior manual homeowner clarification state/decision, contractor match, contractor service-area fit, prior appointment outcome, estimate / next-step state, manual estimate prep state, manual contractor review state, contractor review readiness, response completeness, missing homeowner constraints resolved, photos/documentation received/reviewed, insurance context clarified, roof/damage/service-scope details clarified, access issue resolved, scheduling constraint resolved, estimate assumptions/unknowns resolved, contractor/founder/homeowner questions answered, remaining gaps, consent/safety, recommended downstream route, manual response-review readiness/decision/state, all safety markers, etc.).");

// Assert required operational field markers
mustHave(doc, "Lead ID:", "homeowner clarification response review packet doc");
mustHave(doc, "Prior appointment outcome", "homeowner clarification response review packet doc");
mustHave(doc, "Manual follow-up state", "homeowner clarification response review packet doc");
mustHave(doc, "Estimate / next-step state", "homeowner clarification response review packet doc");
mustHave(doc, "Manual estimate prep state", "homeowner clarification response review packet doc");
mustHave(doc, "Manual contractor review state", "homeowner clarification response review packet doc");
mustHave(doc, "Manual response-review decision: PASS / HOLD / BLOCKED", "homeowner clarification response review packet doc");
mustHave(doc, "Manual homeowner clarification response-review state", "homeowner clarification response review packet doc");
mustHave(doc, "READY TO ROUTE MANUALLY", "homeowner clarification response review packet doc");
mustHave(doc, "Estimate created: no", "homeowner clarification response review packet doc");
mustHave(doc, "Quote generated: no", "homeowner clarification response review packet doc");
mustHave(doc, "Quote sent: no", "homeowner clarification response review packet doc");
mustHave(doc, "Contractor notification sent: no", "homeowner clarification response review packet doc");
mustHave(doc, "Homeowner notification sent: no", "homeowner clarification response review packet doc");
mustHave(doc, "Calendar booking performed: no", "homeowner clarification response review packet doc");
mustHave(doc, "External notification sent: no", "homeowner clarification response review packet doc");
mustHave(doc, "Production system touched: no", "homeowner clarification response review packet doc");
mustHave(doc, "Follow-up sent: no", "homeowner clarification response review packet doc");
mustHave(doc, "Clarification response captured outside system: yes / no", "homeowner clarification response review packet doc");
console.log("PASS: homeowner clarification response review packet doc contains required operational field markers.");

// Assert PASS/HOLD/BLOCKED criteria and approval states present with full language
mustHave(doc, "DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / HOLD / BLOCKED", "homeowner clarification response review packet doc");
mustHave(doc, "READY TO ROUTE MANUALLY", "homeowner clarification response review packet doc");
mustHave(doc, "READY FOR FOUNDER REVIEW", "homeowner clarification response review packet doc");
mustHave(doc, "Manual response-review decision: PASS / HOLD / BLOCKED", "homeowner clarification response review packet doc");
console.log("PASS: homeowner clarification response review packet doc contains required approval states and PASS / HOLD / BLOCKED criteria.");

// Assert all required worksheets present with safety notes
mustHave(doc, "Homeowner response capture summary worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Response completeness review worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Missing homeowner constraints resolution worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Photos / documentation received review worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Insurance context response review worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Roof / damage / service-scope response review worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Access and scheduling response review worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Contractor questions answered review worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Founder/operator questions answered review worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Homeowner questions and concerns review worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Estimate assumptions resolution worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Estimate unknowns resolution worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Downstream readiness routing worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Manual response-review decision worksheet", "homeowner clarification response review packet doc");
mustHave(doc, "Safety note", "homeowner clarification response review packet doc");
mustHave(doc, "internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "homeowner clarification response review packet doc");
mustHave(doc, "Estimate created: no", "homeowner clarification response review packet doc");
console.log("PASS: homeowner clarification response review packet doc includes all required worksheets (homeowner response capture summary, response completeness review, missing homeowner constraints resolution, photos/documentation received review, insurance context response review, roof/damage/service-scope response review, access and scheduling response review, contractor questions answered review, founder/operator questions answered review, homeowner questions and concerns review, estimate assumptions resolution, estimate unknowns resolution, downstream readiness routing, manual response-review decision) with safety notes and no-estimate/quote/notification/booking markers.");

// Assert homeowner clarification response review approval states present
mustHave(doc, "Homeowner clarification response review approval states", "homeowner clarification response review packet doc");
mustHave(doc, "READY TO ROUTE MANUALLY", "homeowner clarification response review packet doc");
mustHave(doc, "READY FOR FOUNDER REVIEW", "homeowner clarification response review packet doc");
console.log("PASS: homeowner clarification response review packet doc includes homeowner clarification response review approval states.");

// Assert HOLD/BLOCKED rules for all required categories
mustHave(doc, "HOLD due to missing response-review owner", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to response not captured outside system", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to missing response captured by", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to missing response captured timestamp", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to missing response source / channel", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to missing contact permission status", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to do-not-contact or unclear permission", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to missing homeowner preferred channel", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to missing First Roofer Homeowner Clarification Command Packet reference", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to missing prior manual homeowner clarification state", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to unresolved prior homeowner clarification decision", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to missing contractor review state", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to unresolved contractor estimate review state", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to missing estimate prep state", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to unresolved estimate / next-step readiness state", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to response completeness is PARTIAL / NEEDS INFO without owner", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to homeowner constraints still incomplete", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to photos/documentation still incomplete", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to insurance context still incomplete", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to roof/damage/service-scope details still incomplete", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to access issue unresolved", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to scheduling constraint unresolved", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to estimate assumptions unresolved", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to estimate unknowns unresolved", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to contractor questions unanswered", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to founder/operator questions unanswered", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to homeowner questions/concerns unresolved", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to contractor match not confirmed", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to contractor service-area fit not confirmed", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD due to recommended downstream route unclear", "homeowner clarification response review packet doc");
mustHave(doc, "BLOCKED due to consent/safety/production activation risk", "homeowner clarification response review packet doc");
mustHave(doc, "HOLD / BLOCKED rules", "homeowner clarification response review packet doc");
console.log("PASS: homeowner clarification response review packet doc includes HOLD/BLOCKED rules for missing response-review owner, response not captured outside system, missing response captured by, missing response captured timestamp, missing response source / channel, missing contact permission status, do-not-contact or unclear permission, missing homeowner preferred channel, missing First Roofer Homeowner Clarification Command Packet reference, missing prior manual homeowner clarification state, unresolved prior homeowner clarification decision, missing contractor review state, unresolved contractor estimate review state, missing estimate prep state, unresolved estimate / next-step readiness state, response completeness PARTIAL/NEEDS INFO without owner, homeowner constraints still incomplete, photos/documentation still incomplete, insurance context still incomplete, roof/damage/service-scope details still incomplete, access issue unresolved, scheduling constraint unresolved, estimate assumptions unresolved, estimate unknowns unresolved, contractor questions unanswered, founder/operator questions unanswered, homeowner questions/concerns unresolved, contractor match not confirmed, contractor service-area fit not confirmed, recommended downstream route unclear, consent/safety, and production activation risk.");

// Assert no-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules present
mustHave(doc, "No-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules", "homeowner clarification response review packet doc");
mustHave(doc, "Estimate created: no", "homeowner clarification response review packet doc");
mustHave(doc, "Quote generated: no", "homeowner clarification response review packet doc");
mustHave(doc, "Quote sent: no", "homeowner clarification response review packet doc");
mustHave(doc, "Contractor notification sent: no", "homeowner clarification response review packet doc");
mustHave(doc, "Homeowner notification sent: no", "homeowner clarification response review packet doc");
mustHave(doc, "Calendar booking performed: no", "homeowner clarification response review packet doc");
mustHave(doc, "External notification sent: no", "homeowner clarification response review packet doc");
mustHave(doc, "Production system touched: no", "homeowner clarification response review packet doc");
mustHave(doc, "Follow-up sent: no", "homeowner clarification response review packet doc");
mustHave(doc, "The packet itself must never send homeowner messages", "homeowner clarification response review packet doc");
console.log("PASS: homeowner clarification response review packet doc includes no-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules with explicit markers.");

// Assert tracker, decision log, EOD report, and next-operator handoff
mustHave(doc, "Homeowner clarification response tracker", "homeowner clarification response review packet doc");
mustHave(doc, "Founder/operator response-review decision log", "homeowner clarification response review packet doc");
mustHave(doc, "Founder/Operator Response-Review Decision Log entry", "homeowner clarification response review packet doc");
mustHave(doc, "End-of-day homeowner clarification response review report", "homeowner clarification response review packet doc");
mustHave(doc, "End-of-Day Homeowner Clarification Response Review Report", "homeowner clarification response review packet doc");
mustHave(doc, "Next-operator handoff", "homeowner clarification response review packet doc");
mustHave(doc, "Handoff Notes", "homeowner clarification response review packet doc");
mustHave(doc, "Estimate created across all: no", "homeowner clarification response review packet doc");
mustHave(doc, "Follow-up sent across all: no", "homeowner clarification response review packet doc");
console.log("PASS: homeowner clarification response review packet doc includes homeowner clarification response tracker, founder/operator response-review decision log, end-of-day homeowner clarification response review report, and next-operator handoff.");

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
  "The packet itself must never send homeowner messages",
  "internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "homeowner clarification response review packet doc safety");
}
console.log("PASS: homeowner clarification response review packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation / no production activation language.");

// Assert explicit no-live language
mustHave(doc, "Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation", "homeowner clarification response review packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "homeowner clarification response review packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "homeowner clarification response review packet doc");
mustHave(doc, "internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "homeowner clarification response review packet doc");
mustHave(doc, "Any real-world routing, contractor estimate review, manual estimate prep, estimate / next-step readiness work, manual follow-up, appointment/access coordination, or booking must be performed manually by a founder/operator outside the system after explicit approval", "homeowner clarification response review packet doc");
console.log("PASS: homeowner clarification response review packet doc includes explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation / no production activation language.");

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
  "homeowner clarification response review",
  "draft-only",
  "approved for manual follow-up",
  "READY FOR FOUNDER REVIEW",
  "READY FOR CONTRACTOR REVIEW",
  "READY FOR MANUAL CONTRACTOR REVIEW",
  "READY FOR MANUAL HOMEOWNER CLARIFICATION",
  "READY TO ROUTE MANUALLY",
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
  mustHave(doc, p, "homeowner clarification response review packet doc required business phrases");
}
console.log("PASS: homeowner clarification response review packet doc contains all required business phrases.");

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
  mustNotHave(doc, f, "homeowner clarification response review packet doc");
  mustNotHave(homeownerClarification, f, "homeowner clarification command packet (cross-check)");
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
console.log("PASS: forbidden business/guarantee/automation/estimate/payment language absent from homeowner clarification response review packet doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-homeowner-clarification-response-review-command-packet-readonly.js", "homeowner clarification response review packet wrapper");
console.log("PASS: wrapper invokes the homeowner clarification response review command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "homeowner clarification response review packet wrapper");
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
  mustNotHave(wrapper, u, "homeowner clarification response review packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-homeowner-clarification-response-review-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Homeowner Clarification Response Review Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the homeowner clarification response review command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-homeowner-clarification-response-review-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-homeowner-clarification-response-review-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md",
  "run-first-roofer-homeowner-clarification-response-review-command-packet-dry-run.sh",
  "verify-first-roofer-homeowner-clarification-response-review-command-packet-readonly.js",
  "First Roofer Homeowner Clarification Response Review Command Packet",
  "homeowner clarification response review command packet",
  "homeowner clarification response review"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the homeowner clarification response review command packet.");

// Assert grok workflow context references the new packet (consistent with recent packet pattern)
mustHave(workflow, "FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md", "grok workflow context");
mustHave(workflow, "First Roofer Homeowner Clarification Response Review Command Packet", "grok workflow context");
// Assert the specified workflow lesson is preserved (post fast-forward merge pre-push targeted gates + idempotent cleanup)
mustHave(workflow, "After fast-forward merging an agent branch into canonical main while local HEAD is ahead of origin/main, do not run wrappers or scripts/check-agent-product-quality-gate.sh as canonical pre-push blockers", "grok workflow context");
mustHave(workflow, "Canonical pre-push should use only direct read-only checks that do not invoke aggregate", "grok workflow context");
mustHave(workflow, "then push/fetch/source-of-truth; then run wrappers/full aggregate/backend build/source-of-truth", "grok workflow context");
mustHave(workflow, "Cleanup should be idempotent", "grok workflow context");
console.log("PASS: grok workflow context references the homeowner clarification response review command packet (consistent with recent packet pattern) and preserves the specified post-ff-merge targeted pre-push gates + idempotent cleanup lesson.");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer homeowner clarification response review command packet is operational, product-moving, references homeowner clarification command packet (primary) + contractor estimate review packet + estimate prep packet + estimate / next-step readiness packet + appointment outcome packet + manual follow-up packet + day-one + manual comm packet + inspection coordination packet + appointment readiness packet + ops pack + runbook + follow-up cadence packet + appointment outcome packet (paid) + booking preferences packet + reporting preferences packet + contractor notification packet + manual review queue packet + quality gate, and strictly dry-run only with all required worksheets, fields, approval states, HOLD/BLOCKED rules (missing response-review owner, response not captured outside system, missing response captured by, missing response captured timestamp, missing response source / channel, missing contact permission status, do-not-contact or unclear permission, missing homeowner preferred channel, missing First Roofer Homeowner Clarification Command Packet reference, missing prior manual homeowner clarification state, unresolved prior homeowner clarification decision, missing contractor review state, unresolved contractor estimate review state, missing estimate prep state, unresolved estimate / next-step readiness state, response completeness PARTIAL/NEEDS INFO without owner, homeowner constraints still incomplete, photos/documentation still incomplete, insurance context still incomplete, roof/damage/service-scope details still incomplete, access issue unresolved, scheduling constraint unresolved, estimate assumptions unresolved, estimate unknowns unresolved, contractor questions unanswered, founder/operator questions unanswered, homeowner questions/concerns unresolved, contractor match not confirmed, contractor service-area fit not confirmed, recommended downstream route unclear, consent/safety, prod risk), no-send/no-estimate-create/no-quote-generate/no-calendar/no-booking safety, tracker, decision log, end-of-day report, handoff, explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation, required phrases, and absent forbidden phrases.");

console.log("PASS: aggregate, verifier index, both next-chat contexts, and grok workflow context contain required homeowner clarification response review command packet references.");
console.log("PASS: packet enforces dry-run/internal-only/founder-operator-only posture with Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no throughout.");
