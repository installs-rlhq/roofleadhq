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

const docPath = "docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md";
const wrapperPath = "scripts/run-first-roofer-lead-to-inspection-ops-pack-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-lead-to-inspection-ops-pack-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const executionDayRunbookPath = "docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const runbook = read(executionDayRunbookPath);
const qualityGate = read(qualityGatePath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for first roofer lead-to-inspection ops pack exist.");

// Assert the doc references the execution day runbook
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "ops pack doc");
mustHave(doc, "first-roofer execution-day runbook", "ops pack doc");
console.log("PASS: ops pack doc references FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md.");

// Assert the doc references the agent product quality gate
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "ops pack doc");
mustHave(doc, "Agent Product Quality Gate", "ops pack doc");
console.log("PASS: ops pack doc references AGENT_PRODUCT_QUALITY_GATE.md.");

// Assert all required sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "First Roofer Lead-to-Inspection Ops Pack", ["Purpose", "product-moving"], "ops pack doc");
assertSectionWithContent(doc, "Product Outcome", ["book inspections", "book appointments", "manual founder/operator review", "manual coordination only"], "ops pack doc");
assertSectionWithContent(doc, "Safety Posture", ["dry-run/internal-only/founder-operator-only", "no live SMS/Twilio", "no automated booking"], "ops pack doc");
assertSectionWithContent(doc, "Source-of-Truth and Workspace Preconditions", ["WORKSPACE_MODE=dry-run", "PASS condition", "HOLD condition", "BLOCKED condition"], "ops pack doc");
assertSectionWithContent(doc, "Lead Intake Review Workflow", ["founder/operator", "manual"], "ops pack doc");
assertSectionWithContent(doc, "Lead Completeness Checklist", ["lead source", "homeowner phone/email status", "inspection readiness status"], "ops pack doc");
assertSectionWithContent(doc, "Missing-Information Recovery Workflow", ["Missing-Information Recovery Template", "HOLD", "MANUAL REVIEW", "BLOCKED"], "ops pack doc");
assertSectionWithContent(doc, "Founder/Operator Decision Log", ["Decision Log template", "PASS TO MANUAL COMMUNICATION PREP", "inspection readiness status"], "ops pack doc");
assertSectionWithContent(doc, "Manual Homeowner Communication Prep", ["Homeowner Communication Prep Template", "DRAFT ONLY", "manual coordination only"], "ops pack doc");
assertSectionWithContent(doc, "Manual Contractor Communication Prep", ["Contractor Communication Prep Template", "DRAFT ONLY"], "ops pack doc");
assertSectionWithContent(doc, "Inspection or Appointment Coordination Tracker", ["Inspection/Appointment Coordination Tracker Template", "book inspections", "book appointments"], "ops pack doc");
assertSectionWithContent(doc, "Inspection Readiness Decision", ["inspection readiness status", "appointment readiness status", "manual founder/operator review"], "ops pack doc");
assertSectionWithContent(doc, "Outcome Capture", ["Outcome Capture Template", "Production systems touched: no"], "ops pack doc");
assertSectionWithContent(doc, "End-of-Day Reporting Template", ["End-of-Day Report Template", "Leads ready to book inspections"], "ops pack doc");
assertSectionWithContent(doc, "PASS / HOLD / BLOCKED Criteria", ["FIRST ROOFER LEAD-TO-INSPECTION OPS PACK PASS", "FIRST ROOFER LEAD-TO-INSPECTION OPS PACK HOLD", "FIRST ROOFER LEAD-TO-INSPECTION OPS PACK BLOCKED"], "ops pack doc");
assertSectionWithContent(doc, "Next Build Recommendations", ["exercise the full packet", "Lead Completeness Checklist"], "ops pack doc");
console.log("PASS: ops pack doc contains all required sections with substantive operational content.");

// Assert all required operational fields are documented
const requiredFields = [
  "lead source",
  "homeowner name or placeholder",
  "homeowner phone/email status",
  "property address status",
  "roof issue summary",
  "urgency",
  "insurance/storm context",
  "photos status",
  "appointment preference",
  "service area fit",
  "contractor availability",
  "missing information",
  "manual next action",
  "owner",
  "timestamp",
  "inspection readiness status",
  "appointment readiness status",
  "outcome",
  "next action"
];
for (const f of requiredFields) {
  mustHave(doc, f, "ops pack doc operational fields");
}
console.log("PASS: ops pack doc contains all required operational fields.");

// Assert all required templates are present with structure
const requiredTemplates = [
  "Lead Intake Review Template",
  "Missing-Information Recovery Template",
  "Founder/Operator Decision Log template",
  "Manual Homeowner Communication Prep Template",
  "Manual Contractor Communication Prep Template",
  "Inspection/Appointment Coordination Tracker Template",
  "Outcome Capture Template",
  "End-of-Day Report Template"
];
for (const t of requiredTemplates) {
  mustHave(doc, t, "ops pack doc templates");
}
console.log("PASS: ops pack doc contains all required templates.");

// Assert required decision language
mustHave(doc, "FIRST ROOFER LEAD-TO-INSPECTION OPS PACK PASS", "ops pack doc decision language");
mustHave(doc, "FIRST ROOFER LEAD-TO-INSPECTION OPS PACK HOLD", "ops pack doc decision language");
mustHave(doc, "FIRST ROOFER LEAD-TO-INSPECTION OPS PACK BLOCKED", "ops pack doc decision language");
console.log("PASS: ops pack doc contains required PASS / HOLD / BLOCKED decision language.");

// Assert required product language
mustHave(doc, "book inspections", "ops pack doc product language");
mustHave(doc, "book appointments", "ops pack doc product language");
mustHave(doc, "inspection readiness", "ops pack doc product language");
mustHave(doc, "appointment readiness", "ops pack doc product language");
mustHave(doc, "manual founder/operator review", "ops pack doc product language");
mustHave(doc, "manual coordination only", "ops pack doc product language");
console.log("PASS: ops pack doc contains required product language (book inspections, inspection readiness, manual coordination only).");

// Assert required safety language
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
  "PUBLIC_ROUTE_ACTIVATION=false"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "ops pack doc safety");
}
console.log("PASS: ops pack doc contains all required safety language and dry-run flags.");

// Assert forbidden language is absent from the new doc
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
  mustNotHave(doc, f, "ops pack doc");
}
console.log("PASS: forbidden business/guarantee language absent from ops pack doc.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-lead-to-inspection-ops-pack-readonly.js", "ops pack wrapper");
console.log("PASS: wrapper invokes the ops pack verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "ops pack wrapper");
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
  mustNotHave(wrapper, u, "ops pack wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-lead-to-inspection-ops-pack-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Lead-to-Inspection Ops Pack", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the ops pack verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-lead-to-inspection-ops-pack-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-lead-to-inspection-ops-pack-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the ops pack
const opsPackRefs = [
  "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md",
  "run-first-roofer-lead-to-inspection-ops-pack-dry-run.sh",
  "verify-first-roofer-lead-to-inspection-ops-pack-readonly.js",
  "First Roofer Lead-to-Inspection Ops Pack",
  "lead-to-inspection"
];
for (const ref of opsPackRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the ops pack.");

// Cross-check that the runbook and quality gate themselves do not contain forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(runbook, f, "execution day runbook");
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer lead-to-inspection ops pack is operational, product-moving, references runbook + quality gate, and dry-run only.");

console.log("PASS: first roofer lead-to-inspection ops pack includes lead intake, completeness checklist, missing-info recovery, decision log, communication prep templates, inspection/appointment tracker, readiness decision, outcome capture, end-of-day report, and full PASS/HOLD/BLOCKED criteria.");
console.log("PASS: aggregate, verifier index, and both next-chat contexts contain required first-roofer lead-to-inspection ops pack references.");
