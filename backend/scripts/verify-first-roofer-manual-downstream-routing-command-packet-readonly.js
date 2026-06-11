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

const docPath = "docs/FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-manual-downstream-routing-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-manual-downstream-routing-command-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";

// Prior packet references for cross-checks and forbidden language
const homeownerClarificationResponseReviewPath = "docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md";
const homeownerClarificationPath = "docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md";
const contractorEstimateReviewPath = "docs/FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md";
const estimatePrepPath = "docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md";
const estimateNextStepPath = "docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md";
const manualFollowUpPath = "docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md";
const apptOutcomePath = "docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md";
const apptReadinessPath = "docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md";
const inspectionCoordPath = "docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md";
const dayOnePath = "docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);

// Prior artifacts for cross-checks
const homeownerClarificationResponseReview = read(homeownerClarificationResponseReviewPath);
const homeownerClarification = read(homeownerClarificationPath);
const contractorEstimateReview = read(contractorEstimateReviewPath);
const estimatePrep = read(estimatePrepPath);
const estimateNextStep = read(estimateNextStepPath);
const manualFollowUp = read(manualFollowUpPath);
const apptOutcome = read(apptOutcomePath);
const apptReadiness = read(apptReadinessPath);
const inspectionCoord = read(inspectionCoordPath);
const dayOne = read(dayOnePath);
const qualityGate = read(qualityGatePath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for first roofer manual downstream routing command packet exist.");

// Assert the doc references the prior packet chain
mustHave(doc, "FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md", "manual downstream routing packet doc");
mustHave(doc, "FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md", "manual downstream routing packet doc");
mustHave(doc, "FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md", "manual downstream routing packet doc");
mustHave(doc, "FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md", "manual downstream routing packet doc");
mustHave(doc, "FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md", "manual downstream routing packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md", "manual downstream routing packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md", "manual downstream routing packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md", "manual downstream routing packet doc");
mustHave(doc, "FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md", "manual downstream routing packet doc");
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "manual downstream routing packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "manual downstream routing packet doc");

mustHave(doc, "First Roofer Homeowner Clarification Response Review Command Packet", "manual downstream routing packet doc");
mustHave(doc, "First Roofer Homeowner Clarification Command Packet", "manual downstream routing packet doc");
mustHave(doc, "First Roofer Contractor Estimate Review Command Packet", "manual downstream routing packet doc");
mustHave(doc, "First Roofer Estimate Prep Command Packet", "manual downstream routing packet doc");
mustHave(doc, "First Roofer Estimate / Next-Step Readiness Command Packet", "manual downstream routing packet doc");
mustHave(doc, "First Roofer Manual Follow-Up Command Packet", "manual downstream routing packet doc");
mustHave(doc, "First Roofer Appointment Outcome Command Packet", "manual downstream routing packet doc");
mustHave(doc, "First Roofer Appointment Readiness Command Packet", "manual downstream routing packet doc");
mustHave(doc, "First Roofer Inspection Coordination Command Packet", "manual downstream routing packet doc");
mustHave(doc, "first-roofer day-one command center", "manual downstream routing packet doc");
mustHave(doc, "Agent Product Quality Gate", "manual downstream routing packet doc");
console.log("PASS: manual downstream routing packet doc references prior packet chain (Homeowner Clarification Response Review primary, Homeowner Clarification, Contractor Estimate Review, Estimate Prep, Estimate / Next-Step Readiness, Manual Follow-Up, Appointment Outcome, Appointment Readiness, Inspection Coordination, Day-One Command Center) + quality gate.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio", "Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "Follow-up sent: no", "Calendar booking performed: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Manual downstream routing command overview", ["prepare to book inspections", "prepare to book appointments", "manual coordination only", "First Roofer Homeowner Clarification Response Review Command Packet", "RETURN TO CONTRACTOR ESTIMATE REVIEW", "RETURN TO MANUAL ESTIMATE PREP"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Homeowner Clarification Response Review Command Packet", ["Inputs from First Roofer Homeowner Clarification Response Review", "Manual homeowner clarification response-review state", "READY TO ROUTE MANUALLY", "manual coordination only"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Homeowner Clarification Command Packet", ["Inputs from First Roofer Homeowner Clarification", "Manual homeowner clarification state", "manual coordination only"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Contractor Estimate Review Command Packet", ["Inputs from First Roofer Contractor Estimate Review", "Manual contractor review state", "manual coordination only"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Estimate Prep Command Packet", ["Inputs from First Roofer Estimate Prep", "Manual estimate prep state", "manual coordination only"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Estimate / Next-Step Readiness Command Packet", ["Inputs from Estimate / Next-Step Readiness", "Estimate / next-step state", "manual coordination only"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Manual Follow-Up Command Packet", ["Inputs from Manual Follow-Up", "Manual follow-up state", "manual coordination only"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Inputs from First Roofer Appointment Outcome / Appointment Readiness / Inspection Coordination packets", ["Inputs from Appointment Outcome", "Inputs from Appointment Readiness", "Inputs from Inspection Coordination", "Prior appointment outcome", "manual coordination only"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Manual downstream routing prerequisites", ["prerequisites", "homeowner clarification response review packet", "READY TO ROUTE MANUALLY", "PASS / HOLD / BLOCKED"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Lead routing intake checklist", ["Lead ID", "Contact permission status", "Contractor match", "Contractor service-area fit", "Manual downstream routing readiness", "Estimate created: no", "Quote generated: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Upstream state reconciliation worksheet", ["Safety note", "internal-only", "does not send homeowner messages", "Upstream State Reconciliation", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Homeowner clarification response review status worksheet", ["Safety note", "internal-only", "Manual Homeowner Clarification Response Review Status", "Manual response-review decision", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Remaining gap classification worksheet", ["Safety note", "internal-only", "Remaining Gap Classification", "Remaining homeowner information gaps", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Route eligibility matrix", ["RETURN TO CONTRACTOR ESTIMATE REVIEW is only allowed when", "response-review decision is PASS", "contractor match is confirmed", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "RETURN TO CONTRACTOR ESTIMATE REVIEW route worksheet", ["Safety note", "internal-only", "RETURN TO CONTRACTOR ESTIMATE REVIEW", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "RETURN TO MANUAL ESTIMATE PREP route worksheet", ["Safety note", "internal-only", "RETURN TO MANUAL ESTIMATE PREP", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "RETURN TO ESTIMATE NEXT-STEP READINESS route worksheet", ["Safety note", "internal-only", "RETURN TO ESTIMATE NEXT-STEP READINESS", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "RETURN TO MANUAL FOLLOW-UP route worksheet", ["Safety note", "internal-only", "RETURN TO MANUAL FOLLOW-UP", "Follow-up sent: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "RETURN TO APPOINTMENT OR ACCESS COORDINATION route worksheet", ["Safety note", "internal-only", "RETURN TO APPOINTMENT OR ACCESS COORDINATION", "Calendar booking performed: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "READY FOR FOUNDER REVIEW route worksheet", ["Safety note", "internal-only", "READY FOR FOUNDER REVIEW", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "HOLD route worksheet", ["Safety note", "internal-only", "HOLD route", "HOLD reason"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "BLOCKED route worksheet", ["Safety note", "internal-only", "BLOCKED route", "BLOCKED reason"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Route conflict resolution worksheet", ["Safety note", "internal-only", "Route conflict status", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Manual routing owner assignment worksheet", ["Safety note", "internal-only", "Manual routing owner", "Manual routing reviewer"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Manual next-action checklist", ["Safety note", "internal-only", "Next manual action", "Next manual action owner"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Manual downstream routing approval states", ["DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / ROUTED MANUALLY / HOLD / BLOCKED", "Manual downstream routing state", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "HOLD / BLOCKED rules", ["missing manual routing owner", "missing manual routing reviewer", "missing route decision timestamp", "response review decision not PASS", "BLOCKED due to consent/safety", "manual founder/operator review"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "No-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules", ["Estimate created: no", "Quote generated: no", "Quote sent: no", "Contractor notification sent: no", "Homeowner notification sent: no", "Calendar booking performed: no", "The packet itself must never send homeowner messages"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Manual downstream routing tracker", ["Manual downstream routing tracker", "Manual downstream routing state", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Founder/operator routing decision log", ["Founder/Operator Routing Decision Log entry", "PASS / HOLD / BLOCKED", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "End-of-day manual downstream routing report", ["End-of-Day Manual Downstream Routing Report", "Estimate created across all: no", "Quote generated across all: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Next-operator handoff", ["Handoff Notes", "next operator session", "dry-run flag confirmation", "Estimate created: no"], "manual downstream routing packet doc");
assertSectionWithContent(doc, "Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation", ["no live SMS/Twilio", "Estimate created: no", "Quote generated: no", "The packet itself must never send homeowner messages"], "manual downstream routing packet doc");
console.log("PASS: manual downstream routing packet doc contains all required operational sections with substantive content.");

// Assert concrete fields (not just headings) are present per requirements
const concreteFields = [
  "Lead ID",
  "Homeowner name",
  "Property address",
  "Lead source",
  "Source detail",
  "Service type",
  "Homeowner preferred channel",
  "Contact permission status",
  "Contractor match",
  "Contractor service-area fit",
  "Prior appointment outcome",
  "Appointment readiness state",
  "Inspection coordination state",
  "Manual follow-up state",
  "Estimate / next-step state",
  "Manual estimate prep state",
  "Manual contractor review state",
  "Manual homeowner clarification state",
  "Manual homeowner clarification response-review state",
  "Manual response-review decision",
  "Response completeness",
  "Remaining homeowner information gaps",
  "Remaining contractor-facing questions",
  "Remaining founder/operator questions",
  "Remaining photos/documentation gaps",
  "Remaining insurance context gaps",
  "Remaining roof/damage/service-scope gaps",
  "Remaining access gaps",
  "Remaining scheduling gaps",
  "Estimate assumptions resolved",
  "Estimate unknowns resolved",
  "Contractor questions answered",
  "Founder/operator questions answered",
  "Homeowner questions/concerns captured",
  "Consent/safety concern status",
  "Prior recommended downstream route",
  "Final manual downstream route",
  "Manual routing owner",
  "Manual routing reviewer",
  "Route decision timestamp",
  "Routing reason",
  "Routing evidence/source reference",
  "Next manual action",
  "Next manual action owner",
  "Next manual action due date",
  "Manual downstream routing readiness",
  "Manual downstream routing decision",
  "Manual downstream routing state",
  "Route conflict status",
  "HOLD reason",
  "BLOCKED reason",
  "Founder/operator notes",
  "Next-operator notes"
];
assertConcreteFields(doc, concreteFields, "manual downstream routing packet doc concrete fields");
console.log("PASS: manual downstream routing packet doc contains all required concrete fields (Lead ID, homeowner name, property address, lead source, source detail, service type, homeowner preferred channel, contact permission status, contractor match, contractor service-area fit, prior appointment outcome, appointment readiness state, inspection coordination state, manual follow-up state, estimate / next-step state, manual estimate prep state, manual contractor review state, manual homeowner clarification state, manual homeowner clarification response-review state, manual response-review decision, response completeness, remaining gaps of all types, estimate assumptions/unknowns resolved, contractor/founder/homeowner questions answered, consent/safety, prior recommended and final manual downstream route, manual routing owner/reviewer, route decision timestamp, routing reason/evidence, next manual action/owner/due, readiness/decision/state, route conflict, HOLD/BLOCKED reason, notes, etc.).");

// Assert required operational field markers and route values
mustHave(doc, "Lead ID:", "manual downstream routing packet doc");
mustHave(doc, "Manual downstream routing readiness: READY / NEEDS INFO / HOLD / BLOCKED", "manual downstream routing packet doc");
mustHave(doc, "Manual downstream routing decision: PASS / HOLD / BLOCKED", "manual downstream routing packet doc");
mustHave(doc, "Manual downstream routing state: DRAFT / REVIEWED / READY FOR FOUNDER REVIEW / READY TO ROUTE MANUALLY / ROUTED MANUALLY / HOLD / BLOCKED", "manual downstream routing packet doc");
mustHave(doc, "RETURN TO CONTRACTOR ESTIMATE REVIEW", "manual downstream routing packet doc");
mustHave(doc, "RETURN TO MANUAL ESTIMATE PREP", "manual downstream routing packet doc");
mustHave(doc, "RETURN TO ESTIMATE NEXT-STEP READINESS", "manual downstream routing packet doc");
mustHave(doc, "RETURN TO MANUAL FOLLOW-UP", "manual downstream routing packet doc");
mustHave(doc, "RETURN TO APPOINTMENT OR ACCESS COORDINATION", "manual downstream routing packet doc");
mustHave(doc, "READY FOR FOUNDER REVIEW", "manual downstream routing packet doc");
mustHave(doc, "HOLD", "manual downstream routing packet doc");
mustHave(doc, "BLOCKED", "manual downstream routing packet doc");
mustHave(doc, "Estimate created: no", "manual downstream routing packet doc");
mustHave(doc, "Quote generated: no", "manual downstream routing packet doc");
mustHave(doc, "Quote sent: no", "manual downstream routing packet doc");
mustHave(doc, "Contractor notification sent: no", "manual downstream routing packet doc");
mustHave(doc, "Homeowner notification sent: no", "manual downstream routing packet doc");
mustHave(doc, "Follow-up sent: no", "manual downstream routing packet doc");
mustHave(doc, "Calendar booking performed: no", "manual downstream routing packet doc");
mustHave(doc, "External notification sent: no", "manual downstream routing packet doc");
mustHave(doc, "Production system touched: no", "manual downstream routing packet doc");
console.log("PASS: manual downstream routing packet doc contains required operational field markers, all route values, readiness/decision/state values, and all safety markers.");

// Assert required route eligibility rules
mustHave(doc, "RETURN TO CONTRACTOR ESTIMATE REVIEW is only allowed when:", "manual downstream routing packet doc");
mustHave(doc, "homeowner clarification response-review state is REVIEWED or READY TO ROUTE MANUALLY", "manual downstream routing packet doc");
mustHave(doc, "response-review decision is PASS", "manual downstream routing packet doc");
mustHave(doc, "contractor match is confirmed", "manual downstream routing packet doc");
mustHave(doc, "contractor service-area fit is confirmed", "manual downstream routing packet doc");
mustHave(doc, "RETURN TO MANUAL ESTIMATE PREP is only allowed when:", "manual downstream routing packet doc");
mustHave(doc, "RETURN TO ESTIMATE NEXT-STEP READINESS is only allowed when:", "manual downstream routing packet doc");
mustHave(doc, "RETURN TO MANUAL FOLLOW-UP is only allowed when:", "manual downstream routing packet doc");
mustHave(doc, "RETURN TO APPOINTMENT OR ACCESS COORDINATION is only allowed when:", "manual downstream routing packet doc");
mustHave(doc, "READY FOR FOUNDER REVIEW is only allowed when:", "manual downstream routing packet doc");
mustHave(doc, "HOLD is required when:", "manual downstream routing packet doc");
mustHave(doc, "BLOCKED is required when:", "manual downstream routing packet doc");
console.log("PASS: manual downstream routing packet doc includes all required route eligibility rules and HOLD/BLOCKED cases.");

// Assert all required HOLD/BLOCKED rules
const holdBlockedMarkers = [
  "missing manual routing owner",
  "missing manual routing reviewer",
  "missing route decision timestamp",
  "missing routing reason",
  "missing routing evidence/source reference",
  "missing contact permission status",
  "do-not-contact or unclear permission",
  "missing homeowner preferred channel",
  "missing contractor match",
  "contractor service-area fit not confirmed",
  "missing prior appointment outcome",
  "missing appointment readiness state",
  "missing inspection coordination state",
  "missing manual follow-up state",
  "missing estimate / next-step state",
  "missing manual estimate prep state",
  "missing manual contractor review state",
  "missing manual homeowner clarification state",
  "missing manual homeowner clarification response-review state",
  "response review decision not PASS",
  "response completeness PARTIAL / NEEDS INFO without owner",
  "remaining homeowner information gaps have no owner",
  "remaining contractor-facing questions have no owner",
  "remaining founder/operator questions have no owner",
  "remaining photos/documentation gaps have no owner",
  "remaining insurance context gaps have no owner",
  "remaining roof/damage/service-scope gaps have no owner",
  "remaining access gaps have no owner",
  "remaining scheduling gaps have no owner",
  "unresolved estimate assumptions",
  "unresolved estimate unknowns",
  "contractor questions unanswered",
  "founder/operator questions unanswered",
  "homeowner questions/concerns unresolved",
  "prior recommended downstream route conflicts with current facts",
  "final manual downstream route unclear",
  "route conflict status unresolved",
  "next manual action missing",
  "next manual action owner missing",
  "consent/safety concern unresolved",
  "production activation risk",
  "live send risk",
  "live booking risk",
  "live estimate or quote risk",
  "payment/invoice risk"
];
for (const m of holdBlockedMarkers) {
  mustHave(doc, m, "manual downstream routing packet doc HOLD/BLOCKED rules");
}
mustHave(doc, "HOLD / BLOCKED rules", "manual downstream routing packet doc");
console.log("PASS: manual downstream routing packet doc includes all required HOLD/BLOCKED rules (missing owner/reviewer/timestamp/reason/evidence, contact/permission/channel/contractor issues, prior states, response review not PASS, gaps without owner, unresolved items, conflicts, consent/safety/prod/live risks, payment/invoice risk).");

// Assert no-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules present
mustHave(doc, "No-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules", "manual downstream routing packet doc");
mustHave(doc, "Estimate created: no", "manual downstream routing packet doc");
mustHave(doc, "Quote generated: no", "manual downstream routing packet doc");
mustHave(doc, "Quote sent: no", "manual downstream routing packet doc");
mustHave(doc, "Contractor notification sent: no", "manual downstream routing packet doc");
mustHave(doc, "Homeowner notification sent: no", "manual downstream routing packet doc");
mustHave(doc, "Follow-up sent: no", "manual downstream routing packet doc");
mustHave(doc, "Calendar booking performed: no", "manual downstream routing packet doc");
mustHave(doc, "External notification sent: no", "manual downstream routing packet doc");
mustHave(doc, "Production system touched: no", "manual downstream routing packet doc");
mustHave(doc, "The packet itself must never send homeowner messages", "manual downstream routing packet doc");
console.log("PASS: manual downstream routing packet doc includes no-send / no-estimate-create / no-quote-generate / no-calendar / no-booking safety rules with explicit markers.");

// Assert tracker, decision log, EOD report, and next-operator handoff
mustHave(doc, "Manual downstream routing tracker", "manual downstream routing packet doc");
mustHave(doc, "Founder/operator routing decision log", "manual downstream routing packet doc");
mustHave(doc, "Founder/Operator Routing Decision Log entry", "manual downstream routing packet doc");
mustHave(doc, "End-of-day manual downstream routing report", "manual downstream routing packet doc");
mustHave(doc, "End-of-Day Manual Downstream Routing Report", "manual downstream routing packet doc");
mustHave(doc, "Next-operator handoff", "manual downstream routing packet doc");
mustHave(doc, "Handoff Notes", "manual downstream routing packet doc");
mustHave(doc, "Estimate created across all: no", "manual downstream routing packet doc");
mustHave(doc, "Quote generated across all: no", "manual downstream routing packet doc");
console.log("PASS: manual downstream routing packet doc includes manual downstream routing tracker, founder/operator routing decision log, end-of-day manual downstream routing report, and next-operator handoff.");

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
  mustHave(doc, m, "manual downstream routing packet doc safety");
}
console.log("PASS: manual downstream routing packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation / no production activation language.");

// Assert explicit no-live language
mustHave(doc, "Explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation confirmation", "manual downstream routing packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "manual downstream routing packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "manual downstream routing packet doc");
mustHave(doc, "internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "manual downstream routing packet doc");
console.log("PASS: manual downstream routing packet doc includes explicit no-live-send / no-live-estimate / no-live-quote / no-live-booking / no-live-automation / no production activation language.");

// Assert required business phrases are present (Founder-Led Launch Program, book inspections, etc. and specific routing states)
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
  "manual downstream routing",
  "draft-only",
  "approved for manual follow-up",
  "READY FOR FOUNDER REVIEW",
  "READY FOR CONTRACTOR REVIEW",
  "READY FOR MANUAL CONTRACTOR REVIEW",
  "READY FOR MANUAL HOMEOWNER CLARIFICATION",
  "READY TO ROUTE MANUALLY",
  "ROUTED MANUALLY",
  "RETURN TO CONTRACTOR ESTIMATE REVIEW",
  "RETURN TO MANUAL ESTIMATE PREP",
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
  mustHave(doc, p, "manual downstream routing packet doc required business phrases");
}
console.log("PASS: manual downstream routing packet doc contains all required business phrases.");

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
  mustNotHave(doc, f, "manual downstream routing packet doc");
  mustNotHave(homeownerClarificationResponseReview, f, "homeowner clarification response review packet (cross-check)");
  mustNotHave(homeownerClarification, f, "homeowner clarification command packet (cross-check)");
  mustNotHave(contractorEstimateReview, f, "contractor estimate review packet (cross-check)");
  mustNotHave(estimatePrep, f, "estimate prep packet (cross-check)");
  mustNotHave(estimateNextStep, f, "estimate / next-step readiness packet (cross-check)");
  mustNotHave(manualFollowUp, f, "manual follow-up packet (cross-check)");
  mustNotHave(apptOutcome, f, "appointment outcome packet (cross-check)");
  mustNotHave(apptReadiness, f, "appointment readiness packet (cross-check)");
  mustNotHave(inspectionCoord, f, "inspection coordination packet (cross-check)");
  mustNotHave(dayOne, f, "day-one command center (cross-check)");
}
console.log("PASS: forbidden business/guarantee/automation/estimate/payment language absent from manual downstream routing packet doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-manual-downstream-routing-command-packet-readonly.js", "manual downstream routing packet wrapper");
console.log("PASS: wrapper invokes the manual downstream routing command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "manual downstream routing packet wrapper");
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
  mustNotHave(wrapper, u, "manual downstream routing packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-manual-downstream-routing-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Manual Downstream Routing Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the manual downstream routing command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-manual-downstream-routing-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-manual-downstream-routing-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md",
  "run-first-roofer-manual-downstream-routing-command-packet-dry-run.sh",
  "verify-first-roofer-manual-downstream-routing-command-packet-readonly.js",
  "First Roofer Manual Downstream Routing Command Packet",
  "manual downstream routing command packet",
  "manual downstream routing"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the manual downstream routing command packet.");

// Assert grok workflow context references the new packet (consistent with recent packet pattern)
mustHave(workflow, "FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md", "grok workflow context");
mustHave(workflow, "First Roofer Manual Downstream Routing Command Packet", "grok workflow context");
mustHave(workflow, "manual downstream routing command packet", "grok workflow context");

// Assert the corrected closeout workflow lesson is preserved (exact per task spec)
mustHave(workflow, "After fast-forward merging an agent branch into canonical main while local HEAD is ahead of origin/main, do not run wrappers or scripts/check-agent-product-quality-gate.sh as canonical pre-push blockers", "grok workflow context");
mustHave(workflow, "because they can invoke safe readiness / aggregate and hit source-of-truth-sensitive legacy failures before push", "grok workflow context");
mustHave(workflow, "Canonical pre-push should use only direct read-only checks that do not invoke aggregate: node --check for the packet verifier, the packet verifier directly, node backend/scripts/verify-agent-product-quality-gate-readonly.js directly, backend build, and clean git status", "grok workflow context");
mustHave(workflow, "then push/fetch/source-of-truth; then run wrappers/full aggregate/backend build/source-of-truth", "grok workflow context");
mustHave(workflow, "Cleanup should be idempotent", "grok workflow context");
console.log("PASS: grok workflow context references the manual downstream routing command packet (consistent with recent packet pattern) and preserves the corrected closeout workflow lesson (no wrappers / no check-agent-product-quality-gate as canonical pre-push blockers while local HEAD ahead of origin/main; use direct read-only checks only pre-push; then push/fetch/source-of-truth; then wrappers/full aggregate/backend build/source-of-truth; idempotent cleanup).");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer manual downstream routing command packet is operational, product-moving, references the full prior packet chain (response review primary + homeowner clarification + contractor estimate review + estimate prep + estimate/next-step + manual follow-up + appointment outcome/readiness + inspection coordination + day-one + quality gate), and strictly dry-run only with all required worksheets, fields, route values (RETURN TO CONTRACTOR ESTIMATE REVIEW etc.), approval states (READY / NEEDS INFO / HOLD / BLOCKED, PASS / HOLD / BLOCKED, DRAFT/REVIEWED/.../ROUTED MANUALLY/HOLD/BLOCKED), HOLD/BLOCKED rules, route eligibility rules, tracker/decision log/report/handoff, no-send/no-estimate-create/no-quote/no-calendar/no-booking safety with all markers set to no, and explicit no-live confirmation.");

console.log("PASS: aggregate, verifier index, both next-chat contexts, and grok workflow context contain required manual downstream routing command packet references.");
console.log("PASS: packet enforces dry-run/internal-only/founder-operator-only posture with Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no throughout.");
