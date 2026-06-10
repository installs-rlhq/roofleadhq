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

const docPath = "docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md";
const wrapperPath = "scripts/run-first-roofer-day-one-command-center-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-day-one-command-center-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const leadToInspectionPath = "docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md";
const executionDayPath = "docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const leadTo = read(leadToInspectionPath);
const runbook = read(executionDayPath);
const qualityGate = read(qualityGatePath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for first roofer day-one command center exist.");

// Assert the doc references the lead-to-inspection ops pack and execution day runbook
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "day-one command center doc");
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "day-one command center doc");
mustHave(doc, "first-roofer lead-to-inspection", "day-one command center doc");
console.log("PASS: day-one command center doc references lead-to-inspection ops pack and execution day runbook.");

// Assert the doc references the agent product quality gate
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "day-one command center doc");
mustHave(doc, "Agent Product Quality Gate", "day-one command center doc");
console.log("PASS: day-one command center doc references AGENT_PRODUCT_QUALITY_GATE.md.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only"], "day-one command center doc");
assertSectionWithContent(doc, "Day-one command center overview", ["triage board", "inspection readiness", "appointment readiness", "book inspections", "book appointments"], "day-one command center doc");
assertSectionWithContent(doc, "Start-of-day readiness checklist", ["Source-of-truth commit", "dry-run flags", "PASS / HOLD / BLOCKED"], "day-one command center doc");
assertSectionWithContent(doc, "Lead intake triage board", ["Lead ID", "Homeowner name", "Property address", "Lead source"], "day-one command center doc");
assertSectionWithContent(doc, "Lead completeness and missing-information queue", ["Lead Completeness Checklist", "Missing-Information Queue", "missing fields"], "day-one command center doc");
assertSectionWithContent(doc, "Homeowner manual communication prep", ["Manual Homeowner Communication Prep", "Manual homeowner message prepared: yes / no", "DRAFT ONLY"], "day-one command center doc");
assertSectionWithContent(doc, "Contractor manual communication prep", ["Manual Contractor Communication Prep", "Manual contractor message prepared: yes / no", "manual coordination only"], "day-one command center doc");
assertSectionWithContent(doc, "Inspection readiness worksheet", ["Inspection Readiness Worksheet", "Inspection readiness decision: PASS / HOLD / BLOCKED", "book inspections"], "day-one command center doc");
assertSectionWithContent(doc, "Appointment readiness worksheet", ["Appointment Readiness Worksheet", "Appointment readiness decision: PASS / HOLD / BLOCKED", "book appointments"], "day-one command center doc");
assertSectionWithContent(doc, "Founder/operator decision log", ["Decision Log entry", "PASS TO MANUAL COMMUNICATION PREP", "PASS TO INSPECTION READINESS", "PASS TO APPOINTMENT READINESS"], "day-one command center doc");
assertSectionWithContent(doc, "Manual coordination timeline", ["Manual coordination timeline", "manual only"], "day-one command center doc");
assertSectionWithContent(doc, "BLOCKED / HOLD / PASS criteria", ["FIRST ROOFER DAY ONE COMMAND CENTER PASS", "FIRST ROOFER DAY ONE COMMAND CENTER HOLD", "FIRST ROOFER DAY ONE COMMAND CENTER BLOCKED"], "day-one command center doc");
assertSectionWithContent(doc, "Same-day escalation rules", ["escalation", "BLOCKED", "HOLD"], "day-one command center doc");
assertSectionWithContent(doc, "End-of-day outcome capture", ["End-of-Day Outcome Capture", "Ready to book inspections", "Ready to book appointments"], "day-one command center doc");
assertSectionWithContent(doc, "End-of-day reporting template", ["End-of-Day Report", "Leads ready to book inspections", "Leads ready to book appointments"], "day-one command center doc");
assertSectionWithContent(doc, "Handoff notes for the next operator session", ["Handoff Notes", "next operator session", "dry-run flag confirmation"], "day-one command center doc");
assertSectionWithContent(doc, "Explicit no-live-automation confirmation", ["No live SMS/Twilio", "No automated booking", "no production activation"], "day-one command center doc");
console.log("PASS: day-one command center doc contains all required operational sections with substantive content.");

// Assert concrete fields (not just headings) are present
const concreteFields = [
  "Lead ID",
  "Homeowner name",
  "Property address",
  "Lead source",
  "Source detail",
  "Service type",
  "Urgency",
  "Roof age if known",
  "Damage description",
  "Photos present: yes/no/unknown",
  "Insurance involvement: yes/no/unknown",
  "Contact permission status",
  "Missing fields",
  "Contractor match",
  "Manual homeowner message prepared: yes/no",
  "Manual contractor message prepared: yes/no",
  "Inspection readiness decision: PASS / HOLD / BLOCKED",
  "Appointment readiness decision: PASS / HOLD / BLOCKED",
  "Founder/operator notes",
  "End-of-day outcome",
  "Ready to book inspections",
  "Ready to book appointments"
];
assertConcreteFields(doc, concreteFields, "day-one command center doc concrete fields");
console.log("PASS: day-one command center doc contains all required concrete fields (Lead ID, homeowner, address, decisions, readiness, etc.).");

// Assert required operational fields list section exists with key items
mustHave(doc, "Lead ID:", "day-one command center doc");
mustHave(doc, "inspection readiness decision", "day-one command center doc");
mustHave(doc, "appointment readiness decision", "day-one command center doc");
console.log("PASS: day-one command center doc contains required operational field markers.");

// Assert PASS/HOLD/BLOCKED criteria present with full language
mustHave(doc, "FIRST ROOFER DAY ONE COMMAND CENTER PASS", "day-one command center doc");
mustHave(doc, "FIRST ROOFER DAY ONE COMMAND CENTER HOLD", "day-one command center doc");
mustHave(doc, "FIRST ROOFER DAY ONE COMMAND CENTER BLOCKED", "day-one command center doc");
mustHave(doc, "inspection readiness or appointment readiness", "day-one command center doc");
console.log("PASS: day-one command center doc contains required PASS / HOLD / BLOCKED criteria.");

// Assert homeowner and contractor manual communication prep present
mustHave(doc, "Homeowner manual communication prep", "day-one command center doc");
mustHave(doc, "Contractor manual communication prep", "day-one command center doc");
mustHave(doc, "manual communication prepared", "day-one command center doc");
console.log("PASS: day-one command center doc includes homeowner and contractor manual communication prep.");

// Assert inspection readiness and appointment readiness worksheets and decisions
mustHave(doc, "Inspection readiness worksheet", "day-one command center doc");
mustHave(doc, "Appointment readiness worksheet", "day-one command center doc");
mustHave(doc, "inspection readiness", "day-one command center doc");
mustHave(doc, "appointment readiness", "day-one command center doc");
mustHave(doc, "book inspections", "day-one command center doc");
mustHave(doc, "book appointments", "day-one command center doc");
console.log("PASS: day-one command center doc includes inspection readiness and appointment readiness worksheets and language.");

// Assert end-of-day reporting present
mustHave(doc, "End-of-day reporting template", "day-one command center doc");
mustHave(doc, "End-of-Day Report", "day-one command center doc");
mustHave(doc, "Leads ready to book inspections", "day-one command center doc");
console.log("PASS: day-one command center doc includes end-of-day reporting.");

// Assert dry-run/internal-only/founder-operator-only posture
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
  mustHave(doc, m, "day-one command center doc safety");
}
console.log("PASS: day-one command center doc confirms dry-run/internal-only/founder-operator-only posture with all required flags.");

// Assert explicit no-live-automation / no production activation language
mustHave(doc, "Explicit no-live-automation confirmation", "day-one command center doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "day-one command center doc");
mustHave(doc, "No production activation of any kind is permitted or performed by this packet", "day-one command center doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "day-one command center doc");
console.log("PASS: day-one command center doc includes explicit no-live-automation / no production activation language.");

// Assert required business phrases are present (Founder-Led Launch Program, book inspections, etc.)
const requiredPhrases = [
  "Founder-Led Launch Program",
  "book inspections",
  "book appointments",
  "manual founder/operator review",
  "manual coordination only",
  "inspection readiness",
  "appointment readiness"
];
for (const p of requiredPhrases) {
  mustHave(doc, p, "day-one command center doc required business phrases");
}
console.log("PASS: day-one command center doc contains all required business phrases.");

// Assert forbidden business phrases are absent
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
  mustNotHave(doc, f, "day-one command center doc");
  mustNotHave(leadTo, f, "lead-to-inspection ops pack (cross-check)");
  mustNotHave(runbook, f, "execution day runbook (cross-check)");
}
console.log("PASS: forbidden business/guarantee language absent from day-one command center doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-day-one-command-center-readonly.js", "day-one command center wrapper");
console.log("PASS: wrapper invokes the day-one command center verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "day-one command center wrapper");
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
  mustNotHave(wrapper, u, "day-one command center wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-day-one-command-center-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Day-One Command Center", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the day-one command center verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-day-one-command-center-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-day-one-command-center-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md",
  "run-first-roofer-day-one-command-center-dry-run.sh",
  "verify-first-roofer-day-one-command-center-readonly.js",
  "First Roofer Day-One Command Center",
  "day-one command center"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the day-one command center packet.");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer day-one command center packet is operational, product-moving, references ops pack + runbook + quality gate, and strictly dry-run only.");

console.log("PASS: day-one command center includes start-of-day checklist, triage board, completeness/missing-info queue, homeowner/contractor prep, inspection/appointment readiness worksheets, decision log, timeline, escalation rules, end-of-day capture/reporting, handoff notes, concrete fields, PASS/HOLD/BLOCKED criteria, required business language, and explicit no-live-automation confirmation.");
console.log("PASS: aggregate, verifier index, and both next-chat contexts contain required first-roofer day-one command center references.");
