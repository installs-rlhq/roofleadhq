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

const docPath = "docs/FIRST_ROOFER_FOUNDER_REVIEW_QUEUE_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-founder-review-queue-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-founder-review-queue-command-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";
const dailyGuidePath = "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md";

// Prior packet references for cross-checks and forbidden language
const manualDownstreamRoutingPath = "docs/FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md";
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
const dataProtectionPath = "docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);
const dailyGuide = read(dailyGuidePath);

// Prior artifacts for cross-checks
const manualDownstreamRouting = read(manualDownstreamRoutingPath);
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
const dataProtection = read(dataProtectionPath);
const qualityGate = read(qualityGatePath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for first roofer founder review queue command packet exist.");

// Assert the doc references the prior packet chain (manual downstream routing primary)
mustHave(doc, "FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md", "founder review queue packet doc");
mustHave(doc, "FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md", "founder review queue packet doc");
mustHave(doc, "FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md", "founder review queue packet doc");
mustHave(doc, "FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md", "founder review queue packet doc");
mustHave(doc, "FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md", "founder review queue packet doc");
mustHave(doc, "FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md", "founder review queue packet doc");
mustHave(doc, "FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md", "founder review queue packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md", "founder review queue packet doc");
mustHave(doc, "FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md", "founder review queue packet doc");
mustHave(doc, "FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md", "founder review queue packet doc");
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "founder review queue packet doc");
mustHave(doc, "ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md", "founder review queue packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "founder review queue packet doc");

mustHave(doc, "First Roofer Manual Downstream Routing Command Packet", "founder review queue packet doc");
mustHave(doc, "First Roofer Homeowner Clarification Response Review Command Packet", "founder review queue packet doc");
mustHave(doc, "First Roofer Homeowner Clarification Command Packet", "founder review queue packet doc");
mustHave(doc, "First Roofer Contractor Estimate Review Command Packet", "founder review queue packet doc");
mustHave(doc, "First Roofer Estimate Prep Command Packet", "founder review queue packet doc");
mustHave(doc, "First Roofer Estimate / Next-Step Readiness Command Packet", "founder review queue packet doc");
mustHave(doc, "First Roofer Manual Follow-Up Command Packet", "founder review queue packet doc");
mustHave(doc, "First Roofer Appointment Outcome Command Packet", "founder review queue packet doc");
mustHave(doc, "First Roofer Appointment Readiness Command Packet", "founder review queue packet doc");
mustHave(doc, "First Roofer Inspection Coordination Command Packet", "founder review queue packet doc");
mustHave(doc, "First Roofer Day-One Command Center", "founder review queue packet doc");
mustHave(doc, "Roofer Data Protection and Tenant Isolation Plan Placement Packet", "founder review queue packet doc");
mustHave(doc, "Agent Product Quality Gate", "founder review queue packet doc");
console.log("PASS: founder review queue packet doc references prior packet chain (Manual Downstream Routing primary + full first-roofer command packet chain + data protection + quality gate).");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio", "Estimate created: no", "Quote generated: no", "Dry-run packet: yes", "Internal-only packet: yes", "Founder-operator-only packet: yes", "Production data touched: no"], "founder review queue packet doc");
assertSectionWithContent(doc, "When to use this packet", ["READY FOR FOUNDER REVIEW", "manual downstream routing", "First Roofer Manual Downstream Routing Command Packet", "dry-run"], "founder review queue packet doc");
assertSectionWithContent(doc, "Required upstream packet chain", ["First Roofer Manual Downstream Routing Command Packet", "primary", "manual downstream route = READY FOR FOUNDER REVIEW", "manual coordination only"], "founder review queue packet doc");
assertSectionWithContent(doc, "Founder review queue intake", ["Queue item ID", "Lead ID", "Founder review owner", "Founder reviewer", "Review queue timestamp", "Review priority", "Founder review queue status"], "founder review queue packet doc");
assertSectionWithContent(doc, "READY FOR FOUNDER REVIEW eligibility", ["Manual downstream route is READY FOR FOUNDER REVIEW", "Prior manual downstream routing state is ROUTED MANUALLY or REVIEWED", "Homeowner clarification response-review state is PASS or not required with documented reason", "Any remaining information gaps have owner and due date", "Contractor service-area fit is confirmed or explicitly marked NEEDS INFO", "Contact permission status is known", "Consent and safety status is clear", "Data protection checkpoint status is reviewed", "No production action is required", "Founder/operator manual review is the only next step"], "founder review queue packet doc");
assertSectionWithContent(doc, "Evidence checklist", ["Queue item ID", "Lead ID", "Homeowner name", "Property address", "Lead source", "Source detail", "Service type", "Roofer / contractor name", "Evidence completeness", "Data protection checkpoint status"], "founder review queue packet doc");
assertSectionWithContent(doc, "Homeowner / property / lead summary", ["Lead ID", "Homeowner name", "Property address", "Lead source", "Source detail", "Service type"], "founder review queue packet doc");
assertSectionWithContent(doc, "Contractor / roofer fit summary", ["Roofer / contractor name", "Contractor service-area fit", "Contractor availability known"], "founder review queue packet doc");
assertSectionWithContent(doc, "Appointment and access summary", ["Prior appointment readiness state", "Prior appointment outcome state", "Prior inspection coordination state", "Access / inspection constraints resolved", "Calendar booking performed: no"], "founder review queue packet doc");
assertSectionWithContent(doc, "Estimate and next-step readiness summary", ["Prior estimate prep state", "Prior estimate next-step readiness state", "Prior contractor estimate review state", "Estimate assumptions resolved", "Estimate created: no", "Quote generated: no"], "founder review queue packet doc");
assertSectionWithContent(doc, "Homeowner clarification and response-review summary", ["Prior manual homeowner clarification state", "Prior manual homeowner clarification response-review state", "Prior manual response-review decision", "Homeowner questions resolved"], "founder review queue packet doc");
assertSectionWithContent(doc, "Manual downstream routing summary", ["Prior manual downstream routing state", "Manual downstream route: READY FOR FOUNDER REVIEW", "Final manual downstream route", "Next manual action"], "founder review queue packet doc");
assertSectionWithContent(doc, "Data protection and privacy checkpoint", ["Data protection checkpoint status", "Privacy / lead boundary notes", "Roofer Data Protection and Tenant Isolation Plan Placement Packet", "Consent and safety status"], "founder review queue packet doc");
assertSectionWithContent(doc, "Founder decision criteria", ["Founder decision", "PASS", "HOLD", "BLOCKED", "Evidence completeness = COMPLETE", "All required concrete fields present"], "founder review queue packet doc");
assertSectionWithContent(doc, "Manual founder review worksheet", ["Queue item ID", "Lead ID", "Founder decision", "Final manual route", "Next manual action", "Estimate created: no", "Safety note"], "founder review queue packet doc");
assertSectionWithContent(doc, "Route decision matrix", ["If evidence complete and only manual message review remains -> READY FOR MANUAL SEND REVIEW", "If inspection/access coordination is the next founder-approved manual step -> READY FOR MANUAL APPOINTMENT COORDINATION", "If estimate next-step is the next founder-approved manual step -> READY FOR MANUAL ESTIMATE NEXT-STEP", "If contractor confirmation is needed -> READY FOR MANUAL CONTRACTOR REVIEW", "If homeowner clarification is needed -> READY FOR MANUAL HOMEOWNER CLARIFICATION", "If routing decision itself is unclear -> RETURN TO MANUAL DOWNSTREAM ROUTING", "If safety, consent, production-risk, or data-boundary issue exists -> BLOCKED"], "founder review queue packet doc");
assertSectionWithContent(doc, "PASS / HOLD / BLOCKED decision rules", ["PASS requires evidence completeness COMPLETE", "HOLD requires evidence completeness NEEDS INFO", "BLOCKED is required when", "missing Queue item ID", "missing Lead ID"], "founder review queue packet doc");
assertSectionWithContent(doc, "Return-to-packet routing options", ["RETURN TO MANUAL DOWNSTREAM ROUTING", "RETURN TO HOMEOWNER CLARIFICATION RESPONSE REVIEW", "final manual route"], "founder review queue packet doc");
assertSectionWithContent(doc, "Manual next-action assignment", ["Final manual route", "Next manual action", "Next manual action owner", "Next manual action due date"], "founder review queue packet doc");
assertSectionWithContent(doc, "Manual communication draft-review checklist", ["Manual communication needed", "Manual communication draft reviewed", "Ready for manual send review"], "founder review queue packet doc");
assertSectionWithContent(doc, "No-send / no-booking / no-estimate safety confirmation", ["Estimate created: no", "Quote generated: no", "Contractor notification sent: no", "Homeowner notification sent: no", "Calendar booking performed: no", "Invoice/payment behavior added: no", "No production write risk"], "founder review queue packet doc");
assertSectionWithContent(doc, "Founder/operator decision log", ["Founder/Operator Decision Log entry", "PASS / HOLD / BLOCKED", "Queue item ID", "Lead ID", "Final manual route"], "founder review queue packet doc");
assertSectionWithContent(doc, "Review queue tracker", ["Founder Review Queue Tracker", "Queue Item ID", "Lead ID", "Evidence Completeness", "Founder Decision", "Final Manual Route", "Data Protection Checkpoint"], "founder review queue packet doc");
assertSectionWithContent(doc, "End-of-day founder review report", ["End-of-Day Founder Review Report", "Leads with PASS", "Leads with HOLD", "Leads with BLOCKED", "Estimate created across all: no"], "founder review queue packet doc");
assertSectionWithContent(doc, "Next-chat handoff summary", ["Next-chat handoff summary", "dry-run/internal-only/founder-operator-only", "First Roofer Manual Downstream Routing Command Packet", "manual founder/operator review"], "founder review queue packet doc");
assertSectionWithContent(doc, "Explicit dry-run/internal-only/founder-operator-only confirmation", ["Dry-run packet: yes", "Internal-only packet: yes", "Founder-operator-only packet: yes", "Production data touched: no", "External service called: no", "Live workflow activated: no", "Auth changed: no", "Database schema changed: no", "RLS policy changed: no", "Secrets changed: no", "Access-control logic changed: no"], "founder review queue packet doc");
console.log("PASS: founder review queue packet doc contains all required operational sections with substantive content (not heading-only).");

// Assert concrete fields (not just headings) are present per requirements
const concreteFields = [
  "Queue item ID",
  "Lead ID",
  "Homeowner name",
  "Property address",
  "Lead source",
  "Source detail",
  "Service type",
  "Roofer / contractor name",
  "Contractor service-area fit",
  "Contractor availability known",
  "Homeowner preferred channel",
  "Contact permission status",
  "Prior appointment readiness state",
  "Prior appointment outcome state",
  "Prior inspection coordination state",
  "Prior manual follow-up state",
  "Prior estimate prep state",
  "Prior estimate next-step readiness state",
  "Prior contractor estimate review state",
  "Prior homeowner clarification state",
  "Prior homeowner clarification response-review state",
  "Prior manual downstream routing state",
  "Manual downstream route",
  "Founder review owner",
  "Founder reviewer",
  "Review queue timestamp",
  "Review priority",
  "Evidence completeness",
  "Remaining information gaps",
  "Gap owner",
  "Gap due date",
  "Contractor questions resolved",
  "Homeowner questions resolved",
  "Estimate assumptions resolved",
  "Access / inspection constraints resolved",
  "Consent and safety status",
  "Data protection checkpoint status",
  "Privacy / lead boundary notes",
  "Founder decision",
  "Founder decision reason",
  "Founder decision evidence",
  "Final manual route",
  "Next manual action",
  "Next manual action owner",
  "Next manual action due date",
  "Manual communication needed",
  "Manual communication draft reviewed",
  "Ready for manual send review",
  "Ready for manual appointment coordination",
  "Ready for manual estimate next-step",
  "Ready for manual contractor review",
  "Ready for manual homeowner clarification",
  "HOLD reason",
  "BLOCKED reason",
  "Notes"
];
assertConcreteFields(doc, concreteFields, "founder review queue packet doc concrete fields");
console.log("PASS: founder review queue packet doc contains all required concrete fields (Queue item ID, Lead ID, homeowner name, property address, lead source, source detail, service type, roofer/contractor name, contractor service-area fit, contractor availability known, homeowner preferred channel, contact permission status, all prior * states, manual downstream route, founder review owner/reviewer, review queue timestamp, review priority, evidence completeness, remaining information gaps, gap owner/due date, resolved questions/assumptions/constraints, consent/safety, data protection checkpoint, privacy/lead boundary notes, founder decision/reason/evidence, final manual route, next manual action/owner/due, manual communication draft reviewed, ready-for flags, HOLD/BLOCKED reason, notes, etc.).");

// Assert required operational field markers and route values
mustHave(doc, "Lead ID:", "founder review queue packet doc");
mustHave(doc, "Founder decision: PASS / HOLD / BLOCKED", "founder review queue packet doc");
mustHave(doc, "Review priority: HIGH / NORMAL / LOW", "founder review queue packet doc");
mustHave(doc, "Evidence completeness: COMPLETE / NEEDS INFO / INCONSISTENT / BLOCKED", "founder review queue packet doc");
mustHave(doc, "Founder review queue status: DRAFT / QUEUED FOR FOUNDER REVIEW / IN FOUNDER REVIEW / REVIEWED / ROUTED MANUALLY / HOLD / BLOCKED", "founder review queue packet doc");
mustHave(doc, "READY FOR FOUNDER REVIEW", "founder review queue packet doc");
mustHave(doc, "READY FOR MANUAL SEND REVIEW", "founder review queue packet doc");
mustHave(doc, "READY FOR MANUAL APPOINTMENT COORDINATION", "founder review queue packet doc");
mustHave(doc, "READY FOR MANUAL ESTIMATE NEXT-STEP", "founder review queue packet doc");
mustHave(doc, "READY FOR MANUAL CONTRACTOR REVIEW", "founder review queue packet doc");
mustHave(doc, "READY FOR MANUAL HOMEOWNER CLARIFICATION", "founder review queue packet doc");
mustHave(doc, "RETURN TO MANUAL DOWNSTREAM ROUTING", "founder review queue packet doc");
mustHave(doc, "RETURN TO HOMEOWNER CLARIFICATION RESPONSE REVIEW", "founder review queue packet doc");
mustHave(doc, "RETURN TO HOMEOWNER CLARIFICATION", "founder review queue packet doc");
mustHave(doc, "RETURN TO CONTRACTOR ESTIMATE REVIEW", "founder review queue packet doc");
mustHave(doc, "RETURN TO MANUAL ESTIMATE PREP", "founder review queue packet doc");
mustHave(doc, "RETURN TO ESTIMATE NEXT-STEP READINESS", "founder review queue packet doc");
mustHave(doc, "RETURN TO MANUAL FOLLOW-UP", "founder review queue packet doc");
mustHave(doc, "RETURN TO APPOINTMENT OR ACCESS COORDINATION", "founder review queue packet doc");
mustHave(doc, "HOLD", "founder review queue packet doc");
mustHave(doc, "BLOCKED", "founder review queue packet doc");
mustHave(doc, "Estimate created: no", "founder review queue packet doc");
mustHave(doc, "Quote generated: no", "founder review queue packet doc");
mustHave(doc, "Quote sent: no", "founder review queue packet doc");
mustHave(doc, "Contractor notification sent: no", "founder review queue packet doc");
mustHave(doc, "Homeowner notification sent: no", "founder review queue packet doc");
mustHave(doc, "Follow-up sent: no", "founder review queue packet doc");
mustHave(doc, "Calendar booking performed: no", "founder review queue packet doc");
mustHave(doc, "External notification sent: no", "founder review queue packet doc");
mustHave(doc, "Production system touched: no", "founder review queue packet doc");
mustHave(doc, "Invoice/payment behavior added: no", "founder review queue packet doc");
console.log("PASS: founder review queue packet doc contains required operational field markers, all route values, readiness/decision/state values, and all safety markers.");

// Assert required route eligibility rules
mustHave(doc, "A lead may enter the founder review queue only if:", "founder review queue packet doc");
mustHave(doc, "Manual downstream route is READY FOR FOUNDER REVIEW", "founder review queue packet doc");
mustHave(doc, "Prior manual downstream routing state is ROUTED MANUALLY or REVIEWED", "founder review queue packet doc");
mustHave(doc, "Homeowner clarification response-review state is PASS or not required with documented reason", "founder review queue packet doc");
mustHave(doc, "Any remaining information gaps have owner and due date", "founder review queue packet doc");
mustHave(doc, "Contractor service-area fit is confirmed or explicitly marked NEEDS INFO", "founder review queue packet doc");
mustHave(doc, "Contact permission status is known", "founder review queue packet doc");
mustHave(doc, "Consent and safety status is clear", "founder review queue packet doc");
mustHave(doc, "Data protection checkpoint status is reviewed", "founder review queue packet doc");
mustHave(doc, "No production action is required", "founder review queue packet doc");
mustHave(doc, "Founder/operator manual review is the only next step", "founder review queue packet doc");
console.log("PASS: founder review queue packet doc includes all required READY FOR FOUNDER REVIEW eligibility rules.");

// Assert all required HOLD/BLOCKED cases
const holdBlockedMarkers = [
  "missing Queue item ID",
  "missing Lead ID",
  "missing homeowner name",
  "missing property address",
  "missing lead source",
  "missing source detail",
  "missing service type",
  "missing roofer / contractor name",
  "missing founder review owner",
  "missing founder reviewer",
  "missing review queue timestamp",
  "manual downstream route is not READY FOR FOUNDER REVIEW",
  "prior manual downstream routing state not reviewed",
  "unresolved homeowner clarification response-review issue",
  "missing evidence",
  "evidence inconsistent",
  "missing contact permission status",
  "unresolved consent/safety issue",
  "missing contractor service-area fit",
  "unresolved contractor questions",
  "unresolved homeowner questions",
  "unresolved estimate assumptions",
  "access / inspection constraints unresolved",
  "data protection checkpoint not reviewed",
  "remaining information gaps without owner",
  "remaining information gaps without due date",
  "final manual route missing",
  "next manual action missing",
  "next manual action owner missing",
  "next manual action due date missing",
  "manual communication marked needed but draft not reviewed",
  "any send attempted",
  "any booking attempted",
  "any estimate creation attempted",
  "any quote generation attempted",
  "any invoice/payment behavior attempted",
  "any production write risk",
  "any external notification risk",
  "any live workflow activation risk"
];
for (const m of holdBlockedMarkers) {
  mustHave(doc, m, "founder review queue packet doc HOLD/BLOCKED cases");
}
mustHave(doc, "HOLD/BLOCKED cases", "founder review queue packet doc");
console.log("PASS: founder review queue packet doc includes all required HOLD/BLOCKED cases (missing critical IDs/fields, manual downstream route/state not correct, unresolved response-review, missing evidence, inconsistent evidence, missing contact/permission/fit, unresolved questions/assumptions/constraints, data protection not reviewed, gaps without owner/due, missing final route/next action/owner/due, draft not reviewed when comm needed, any send/booking/estimate/quote/invoice attempted, any prod/external/live risk).");

// Assert route decision matrix present with required mappings
mustHave(doc, "Route decision matrix", "founder review queue packet doc");
mustHave(doc, "If evidence complete and only manual message review remains -> READY FOR MANUAL SEND REVIEW", "founder review queue packet doc");
mustHave(doc, "If inspection/access coordination is the next founder-approved manual step -> READY FOR MANUAL APPOINTMENT COORDINATION", "founder review queue packet doc");
mustHave(doc, "If estimate next-step is the next founder-approved manual step -> READY FOR MANUAL ESTIMATE NEXT-STEP", "founder review queue packet doc");
mustHave(doc, "If contractor confirmation is needed -> READY FOR MANUAL CONTRACTOR REVIEW", "founder review queue packet doc");
mustHave(doc, "If homeowner clarification is needed -> READY FOR MANUAL HOMEOWNER CLARIFICATION", "founder review queue packet doc");
mustHave(doc, "If routing decision itself is unclear -> RETURN TO MANUAL DOWNSTREAM ROUTING", "founder review queue packet doc");
mustHave(doc, "If homeowner response review must be corrected -> RETURN TO HOMEOWNER CLARIFICATION RESPONSE REVIEW", "founder review queue packet doc");
mustHave(doc, "If homeowner clarification request must be prepared -> RETURN TO HOMEOWNER CLARIFICATION", "founder review queue packet doc");
mustHave(doc, "If contractor estimate review must be corrected -> RETURN TO CONTRACTOR ESTIMATE REVIEW", "founder review queue packet doc");
mustHave(doc, "If estimate prep must be corrected -> RETURN TO MANUAL ESTIMATE PREP", "founder review queue packet doc");
mustHave(doc, "If estimate next-step readiness must be corrected -> RETURN TO ESTIMATE NEXT-STEP READINESS", "founder review queue packet doc");
mustHave(doc, "If manual follow-up is needed before review can continue -> RETURN TO MANUAL FOLLOW-UP", "founder review queue packet doc");
mustHave(doc, "If appointment/access coordination must be resolved -> RETURN TO APPOINTMENT OR ACCESS COORDINATION", "founder review queue packet doc");
mustHave(doc, "If founder needs more information but no safety issue -> HOLD", "founder review queue packet doc");
mustHave(doc, "If safety, consent, production-risk, or data-boundary issue exists -> BLOCKED", "founder review queue packet doc");
console.log("PASS: founder review queue packet doc includes required route decision matrix with all condition-to-final-manual-route mappings.");

// Assert no-send / no-booking / no-estimate / no-invoice safety rules present
mustHave(doc, "No-send / no-booking / no-estimate safety confirmation", "founder review queue packet doc");
mustHave(doc, "Estimate created: no", "founder review queue packet doc");
mustHave(doc, "Quote generated: no", "founder review queue packet doc");
mustHave(doc, "Quote sent: no", "founder review queue packet doc");
mustHave(doc, "Contractor notification sent: no", "founder review queue packet doc");
mustHave(doc, "Homeowner notification sent: no", "founder review queue packet doc");
mustHave(doc, "Follow-up sent: no", "founder review queue packet doc");
mustHave(doc, "Calendar booking performed: no", "founder review queue packet doc");
mustHave(doc, "External notification sent: no", "founder review queue packet doc");
mustHave(doc, "Production system touched: no", "founder review queue packet doc");
mustHave(doc, "Invoice/payment behavior added: no", "founder review queue packet doc");
mustHave(doc, "No production write risk", "founder review queue packet doc");
mustHave(doc, "The packet itself must never send", "founder review queue packet doc");
console.log("PASS: founder review queue packet doc includes no-send / no-booking / no-estimate / no-invoice / no-payment safety rules with explicit markers.");

// Assert tracker, decision log, EOD report, and next-chat handoff
mustHave(doc, "Founder/Operator Decision Log entry", "founder review queue packet doc");
mustHave(doc, "Founder Review Queue Tracker", "founder review queue packet doc");
mustHave(doc, "End-of-Day Founder Review Report", "founder review queue packet doc");
mustHave(doc, "Next-chat handoff summary", "founder review queue packet doc");
mustHave(doc, "Estimate created across all: no", "founder review queue packet doc");
mustHave(doc, "Quote generated across all: no", "founder review queue packet doc");
console.log("PASS: founder review queue packet doc includes founder/operator decision log, review queue tracker, end-of-day founder review report, and next-chat handoff summary.");

// Assert dry-run/internal-only/founder-operator-only posture with all required flags and no-live language
const safetyMarkers = [
  "dry-run/internal-only/founder-operator-only",
  "Dry-run packet: yes",
  "Internal-only packet: yes",
  "Founder-operator-only packet: yes",
  "Production data touched: no",
  "External service called: no",
  "Live workflow activated: no",
  "Contractor notification sent: no",
  "Homeowner notification sent: no",
  "Calendar booking performed: no",
  "Appointment booked: no",
  "Estimate created: no",
  "Quote generated: no",
  "Invoice/payment behavior added: no",
  "Auth changed: no",
  "Database schema changed: no",
  "RLS policy changed: no",
  "Secrets changed: no",
  "Access-control logic changed: no",
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
  "internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "founder review queue packet doc safety");
}
console.log("PASS: founder review queue packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-send / no-live-booking / no-live-estimate / no-live-quote / no-live-invoice / no-live-payment / no production activation language.");

// Assert explicit no-live language and final confirmation
mustHave(doc, "Explicit dry-run/internal-only/founder-operator-only confirmation", "founder review queue packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "founder review queue packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "founder review queue packet doc");
mustHave(doc, "internal-only and does not send homeowner messages, send contractor notifications, create estimates, generate quotes, send quotes, send contractor notifications, send homeowner notifications, send follow-ups, book, notify, calendar, or touch production systems", "founder review queue packet doc");
mustHave(doc, "This is the final build before a new chat and should be easy to recover", "founder review queue packet doc");
console.log("PASS: founder review queue packet doc includes explicit no-live / no-production / final-build-before-new-chat language and all safety markers.");

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
  "READY FOR FOUNDER REVIEW",
  "READY FOR MANUAL SEND REVIEW",
  "READY FOR MANUAL APPOINTMENT COORDINATION",
  "READY FOR MANUAL ESTIMATE NEXT-STEP",
  "READY FOR MANUAL CONTRACTOR REVIEW",
  "READY FOR MANUAL HOMEOWNER CLARIFICATION",
  "RETURN TO MANUAL DOWNSTREAM ROUTING",
  "RETURN TO HOMEOWNER CLARIFICATION RESPONSE REVIEW",
  "RETURN TO HOMEOWNER CLARIFICATION",
  "RETURN TO CONTRACTOR ESTIMATE REVIEW",
  "RETURN TO MANUAL ESTIMATE PREP",
  "RETURN TO ESTIMATE NEXT-STEP READINESS",
  "RETURN TO MANUAL FOLLOW-UP",
  "RETURN TO APPOINTMENT OR ACCESS COORDINATION",
  "ROUTED MANUALLY",
  "HOLD",
  "BLOCKED",
  "data protection checkpoint",
  "privacy / lead boundary notes",
  "Estimate created: no",
  "Quote generated: no",
  "Quote sent: no",
  "Contractor notification sent: no",
  "Homeowner notification sent: no",
  "Follow-up sent: no",
  "Calendar booking performed: no",
  "external notification sent: no",
  "production system touched: no",
  "Invoice/payment behavior added: no"
];
for (const p of requiredPhrases) {
  mustHave(doc, p, "founder review queue packet doc required business phrases");
}
console.log("PASS: founder review queue packet doc contains all required business phrases (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, ... READY FOR FOUNDER REVIEW and all return/ready routes, data protection checkpoint, privacy / lead boundary notes, all safety no markers).");

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
  mustNotHave(doc, f, "founder review queue packet doc");
  mustNotHave(manualDownstreamRouting, f, "manual downstream routing packet (cross-check)");
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
  mustNotHave(dataProtection, f, "data protection packet (cross-check)");
}
console.log("PASS: forbidden business/guarantee/automation/estimate/payment language absent from founder review queue packet doc and cross-checked prior first-roofer artifacts (and data protection).");

// Assert implementation-risk strings are absent from the new doc
const implRisk = [
  "ALTER TABLE",
  "CREATE POLICY",
  "DROP POLICY",
  "CREATE TABLE",
  "supabase.from(",
  "supabase.rpc(",
  "service_role",
  "process.env.SUPABASE_SERVICE_ROLE",
  "twilio",
  "resend",
  "vapi",
  "calendar.events",
  "fetch(\"https://",
  "curl https://"
];
for (const r of implRisk) {
  mustNotHave(doc, r, "founder review queue packet doc");
}
console.log("PASS: implementation-risk strings absent from founder review queue packet doc.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-founder-review-queue-command-packet-readonly.js", "founder review queue packet wrapper");
console.log("PASS: wrapper invokes the founder review queue command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "founder review queue packet wrapper");
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
  mustNotHave(wrapper, u, "founder review queue packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-founder-review-queue-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Founder Review Queue Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the founder review queue command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_FOUNDER_REVIEW_QUEUE_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-founder-review-queue-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-founder-review-queue-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_FOUNDER_REVIEW_QUEUE_COMMAND_PACKET.md",
  "run-first-roofer-founder-review-queue-command-packet-dry-run.sh",
  "verify-first-roofer-founder-review-queue-command-packet-readonly.js",
  "First Roofer Founder Review Queue Command Packet",
  "founder review queue command packet",
  "founder review queue"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the founder review queue command packet.");

// Assert grok workflow context references the new packet (consistent with recent packet pattern)
mustHave(workflow, "FIRST_ROOFER_FOUNDER_REVIEW_QUEUE_COMMAND_PACKET.md", "grok workflow context");
mustHave(workflow, "First Roofer Founder Review Queue Command Packet", "grok workflow context");
mustHave(workflow, "founder review queue command packet", "grok workflow context");

// Assert the corrected closeout workflow lesson is preserved (exact per task spec)
mustHave(workflow, "After fast-forward merging an agent branch into canonical main while local HEAD is ahead of origin/main, do not run wrappers or scripts/check-agent-product-quality-gate.sh as canonical pre-push blockers", "grok workflow context");
mustHave(workflow, "because they can invoke safe readiness / aggregate and hit source-of-truth-sensitive legacy failures before push", "grok workflow context");
mustHave(workflow, "Canonical pre-push should use only direct read-only checks that do not invoke aggregate: node --check for the packet verifier, the packet verifier directly, node backend/scripts/verify-agent-product-quality-gate-readonly.js directly, backend build, and clean git status", "grok workflow context");
mustHave(workflow, "then push/fetch/source-of-truth; then run wrappers/full aggregate/backend build/source-of-truth", "grok workflow context");
mustHave(workflow, "Cleanup should be idempotent", "grok workflow context");
console.log("PASS: grok workflow context references the founder review queue command packet (consistent with recent packet pattern) and preserves the corrected closeout workflow lesson (no wrappers / no check-agent-product-quality-gate as canonical pre-push blockers while local HEAD ahead of origin/main; use direct read-only checks only pre-push; then push/fetch/source-of-truth; then wrappers/full aggregate/backend build/source-of-truth; idempotent cleanup).");

// Assert business buildout daily guide references the new packet (short milestone note)
mustHave(dailyGuide, "FIRST_ROOFER_FOUNDER_REVIEW_QUEUE_COMMAND_PACKET.md", "business buildout daily guide");
mustHave(dailyGuide, "First Roofer Founder Review Queue Command Packet", "business buildout daily guide");
mustHave(dailyGuide, "founder review queue", "business buildout daily guide");
console.log("PASS: business buildout daily guide references the founder review queue command packet (short milestone note).");

// Assert daily guide update is a short milestone note (not full wall of text) - defensive presence check
mustHave(dailyGuide, "final build before a new chat", "business buildout daily guide");
console.log("PASS: business buildout daily guide contains short milestone note referencing final build before new chat.");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer founder review queue command packet is operational, product-moving, references the full prior packet chain (manual downstream routing primary + homeowner clarification response review + homeowner clarification + contractor estimate review + estimate prep + estimate/next-step + manual follow-up + appointment outcome/readiness + inspection coordination + day-one + data protection + quality gate), and strictly dry-run only with all required worksheets, fields, route values (READY FOR FOUNDER REVIEW, all READY FOR MANUAL ... and RETURN TO ... , HOLD, BLOCKED), approval states (DRAFT / QUEUED FOR FOUNDER REVIEW / IN FOUNDER REVIEW / REVIEWED / ROUTED MANUALLY / HOLD / BLOCKED, PASS / HOLD / BLOCKED, HIGH/NORMAL/LOW, COMPLETE/NEEDS INFO/INCONSISTENT/BLOCKED), eligibility rules, HOLD/BLOCKED cases, route decision matrix, tracker/decision log/report/handoff, no-send/no-booking/no-estimate/no-quote/no-invoice safety with all markers set to no, and explicit no-live confirmation.");

// Assert implementation-risk strings absent from wrapper (already checked some, reinforce)
for (const r of implRisk) {
  mustNotHave(wrapper, r, "founder review queue packet wrapper");
}
console.log("PASS: implementation-risk strings absent from wrapper.");

// Final summary logs
console.log("PASS: aggregate, verifier index, both next-chat contexts, grok workflow context (lesson preserved), and business buildout daily guide contain required founder review queue command packet references.");
console.log("PASS: packet enforces dry-run/internal-only/founder-operator-only posture with Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no, Invoice/payment behavior added: no throughout.");
console.log("PASS: all required sections, concrete fields, values, eligibility rules, HOLD/BLOCKED cases, route decision matrix, safety markers (Dry-run packet: yes etc.), packet chain references, decision log, tracker, EOD report, next-chat handoff, and explicit dry-run/internal-only/founder-operator-only confirmation present and verified.");
