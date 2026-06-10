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

const docPath = "docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md";
const wrapperPath = "scripts/run-first-roofer-manual-communication-command-packet-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-manual-communication-command-packet-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";
const dayOnePath = "docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md";
const leadToInspectionPath = "docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md";
const executionDayPath = "docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md";
const qualityGatePath = "docs/AGENT_PRODUCT_QUALITY_GATE.md";
const workflowPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const dayOne = read(dayOnePath);
const leadTo = read(leadToInspectionPath);
const runbook = read(executionDayPath);
const qualityGate = read(qualityGatePath);
const workflow = read(workflowPath);

// Assert expected files exist (already exercised by read above)
console.log("PASS: all expected files for first roofer manual communication command packet exist.");

// Assert the doc references the day-one command center, lead-to-inspection ops pack, execution day runbook, and quality gate
mustHave(doc, "FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md", "manual communication packet doc");
mustHave(doc, "FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md", "manual communication packet doc");
mustHave(doc, "FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md", "manual communication packet doc");
mustHave(doc, "AGENT_PRODUCT_QUALITY_GATE.md", "manual communication packet doc");
mustHave(doc, "first-roofer day-one command center", "manual communication packet doc");
mustHave(doc, "Agent Product Quality Gate", "manual communication packet doc");
console.log("PASS: manual communication packet doc references day-one command center, lead-to-inspection ops pack, execution day runbook, and quality gate.");

// Assert all required operational sections exist with substantive content (not heading-only)
assertSectionWithContent(doc, "Purpose and safety posture", ["Founder-Led Launch Program", "dry-run/internal-only/founder-operator-only", "manual founder/operator review", "manual coordination only", "no live SMS/Twilio"], "manual communication packet doc");
assertSectionWithContent(doc, "Manual communication command overview", ["prepare, review, approve, and track", "book inspections", "book appointments", "manual coordination only"], "manual communication packet doc");
assertSectionWithContent(doc, "Communication approval states", ["DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED", "Manual approval state", "External send performed: no", "Production system touched: no"], "manual communication packet doc");
assertSectionWithContent(doc, "Homeowner communication intake checklist", ["Contact permission status", "Homeowner message draft status", "External send performed: no"], "manual communication packet doc");
assertSectionWithContent(doc, "Homeowner missing-information request template", ["Safety note", "draft-only", "External send performed: no", "Production system touched: no"], "manual communication packet doc");
assertSectionWithContent(doc, "Homeowner inspection readiness confirmation template", ["Safety note", "draft-only", "book inspections", "External send performed: no"], "manual communication packet doc");
assertSectionWithContent(doc, "Homeowner appointment readiness confirmation template", ["Safety note", "draft-only", "book appointments", "External send performed: no"], "manual communication packet doc");
assertSectionWithContent(doc, "Homeowner no-contact / consent HOLD rules", ["contact permission status", "do-not-contact", "HOLD", "BLOCKED"], "manual communication packet doc");
assertSectionWithContent(doc, "Contractor briefing checklist", ["Contractor service-area fit", "Contractor availability status", "External send performed: no"], "manual communication packet doc");
assertSectionWithContent(doc, "Contractor inspection coordination template", ["Safety note", "draft-only", "External send performed: no", "inspection readiness decision"], "manual communication packet doc");
assertSectionWithContent(doc, "Contractor appointment coordination template", ["Safety note", "draft-only", "External send performed: no", "appointment readiness decision"], "manual communication packet doc");
assertSectionWithContent(doc, "Contractor capacity / service-area HOLD rules", ["service-area fit", "capacity", "HOLD", "BLOCKED"], "manual communication packet doc");
assertSectionWithContent(doc, "Founder/operator approval log", ["Approval Log entry", "APPROVED FOR MANUAL USE", "External send performed: no", "Production system touched: no"], "manual communication packet doc");
assertSectionWithContent(doc, "Manual communication tracker", ["Manual communication tracker", "Homeowner message draft status", "Contractor message draft status", "External send performed: no"], "manual communication packet doc");
assertSectionWithContent(doc, "Escalation and HOLD/BLOCKED rules", ["escalation", "HOLD", "BLOCKED", "manual founder/operator review"], "manual communication packet doc");
assertSectionWithContent(doc, "Outcome capture", ["Communication Outcome", "External send performed: no", "Production system touched: no", "inspection readiness decision"], "manual communication packet doc");
assertSectionWithContent(doc, "End-of-day communication report", ["End-of-Day Communication Report", "External send performed across all: no", "Production system touched across all: no"], "manual communication packet doc");
assertSectionWithContent(doc, "Handoff notes for the next operator session", ["Handoff Notes", "next operator session", "dry-run flag confirmation", "External send performed: no"], "manual communication packet doc");
assertSectionWithContent(doc, "Explicit no-live-send / no-live-automation confirmation", ["no live SMS/Twilio", "draft-only", "external send performed: no", "production system touched: no", "The packet itself must never send"], "manual communication packet doc");
console.log("PASS: manual communication packet doc contains all required operational sections with substantive content.");

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
  "Homeowner message type",
  "Homeowner message draft status",
  "Contractor match",
  "Contractor service-area fit",
  "Contractor availability status",
  "Contractor message type",
  "Contractor message draft status",
  "Manual approval state: DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED",
  "Manual sender: founder/operator",
  "External send performed: no",
  "Production system touched: no",
  "Inspection readiness decision: PASS / HOLD / BLOCKED",
  "Appointment readiness decision: PASS / HOLD / BLOCKED",
  "Communication outcome",
  "Founder/operator notes",
  "Next manual action"
];
assertConcreteFields(doc, concreteFields, "manual communication packet doc concrete fields");
console.log("PASS: manual communication packet doc contains all required concrete fields (Lead ID, homeowner, address, contact permission, draft statuses, approval states, decisions, external send performed: no, etc.).");

// Assert required operational field markers
mustHave(doc, "Lead ID:", "manual communication packet doc");
mustHave(doc, "inspection readiness decision", "manual communication packet doc");
mustHave(doc, "appointment readiness decision", "manual communication packet doc");
mustHave(doc, "External send performed: no", "manual communication packet doc");
mustHave(doc, "Production system touched: no", "manual communication packet doc");
mustHave(doc, "Manual approval state", "manual communication packet doc");
console.log("PASS: manual communication packet doc contains required operational field markers.");

// Assert PASS/HOLD/BLOCKED criteria and approval states present with full language
mustHave(doc, "DRAFT / REVIEWED / APPROVED FOR MANUAL USE / HOLD / BLOCKED", "manual communication packet doc");
mustHave(doc, "APPROVED FOR MANUAL USE", "manual communication packet doc");
mustHave(doc, "inspection readiness decision: PASS / HOLD / BLOCKED", "manual communication packet doc");
mustHave(doc, "appointment readiness decision: PASS / HOLD / BLOCKED", "manual communication packet doc");
console.log("PASS: manual communication packet doc contains required approval states and PASS / HOLD / BLOCKED criteria.");

// Assert homeowner templates are present with safety notes
mustHave(doc, "Homeowner missing-information request template", "manual communication packet doc");
mustHave(doc, "Homeowner inspection readiness confirmation template", "manual communication packet doc");
mustHave(doc, "Homeowner appointment readiness confirmation template", "manual communication packet doc");
mustHave(doc, "Homeowner no-contact / consent HOLD rules", "manual communication packet doc");
mustHave(doc, "This is a draft-only template", "manual communication packet doc");
mustHave(doc, "The packet itself must never send", "manual communication packet doc");
console.log("PASS: manual communication packet doc includes all homeowner templates with safety notes and draft-only language.");

// Assert contractor templates are present with safety notes
mustHave(doc, "Contractor briefing checklist", "manual communication packet doc");
mustHave(doc, "Contractor inspection coordination template", "manual communication packet doc");
mustHave(doc, "Contractor appointment coordination template", "manual communication packet doc");
mustHave(doc, "Contractor capacity / service-area HOLD rules", "manual communication packet doc");
mustHave(doc, "This is a draft-only template", "manual communication packet doc");
console.log("PASS: manual communication packet doc includes all contractor templates with safety notes and draft-only language.");

// Assert approval log, manual tracker, escalation, outcome, end-of-day report, handoff present
mustHave(doc, "Founder/operator approval log", "manual communication packet doc");
mustHave(doc, "Manual communication tracker", "manual communication packet doc");
mustHave(doc, "Escalation and HOLD/BLOCKED rules", "manual communication packet doc");
mustHave(doc, "Outcome capture", "manual communication packet doc");
mustHave(doc, "End-of-day communication report", "manual communication packet doc");
mustHave(doc, "Handoff notes for the next operator session", "manual communication packet doc");
console.log("PASS: manual communication packet doc includes approval log, tracker, escalation, outcome capture, end-of-day report, and handoff.");

// Assert inspection readiness and appointment readiness language
mustHave(doc, "inspection readiness", "manual communication packet doc");
mustHave(doc, "appointment readiness", "manual communication packet doc");
mustHave(doc, "book inspections", "manual communication packet doc");
mustHave(doc, "book appointments", "manual communication packet doc");
console.log("PASS: manual communication packet doc includes inspection readiness and appointment readiness language.");

// Assert end-of-day communication reporting
mustHave(doc, "End-of-Day Communication Report", "manual communication packet doc");
mustHave(doc, "External send performed across all: no", "manual communication packet doc");
mustHave(doc, "Production system touched across all: no", "manual communication packet doc");
console.log("PASS: manual communication packet doc includes end-of-day communication reporting with no-send / no-touch markers.");

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
  "external send performed: no",
  "production system touched: no",
  "The packet itself must never send"
];
for (const m of safetyMarkers) {
  mustHave(doc, m, "manual communication packet doc safety");
}
console.log("PASS: manual communication packet doc confirms dry-run/internal-only/founder-operator-only posture with all required flags and explicit no-live-send language.");

// Assert explicit no-live-send / no-live-automation / no production activation language
mustHave(doc, "Explicit no-live-send / no-live-automation confirmation", "manual communication packet doc");
mustHave(doc, "This is strictly dry-run/internal-only/founder-operator-only", "manual communication packet doc");
mustHave(doc, "All work is manual founder/operator review and manual coordination only", "manual communication packet doc");
mustHave(doc, "draft-only until a founder/operator manually approves and sends it outside the system", "manual communication packet doc");
console.log("PASS: manual communication packet doc includes explicit no-live-send / no-live-automation / no production activation language.");

// Assert required business phrases are present
const requiredPhrases = [
  "Founder-Led Launch Program",
  "book inspections",
  "book appointments",
  "manual founder/operator review",
  "manual coordination only",
  "inspection readiness",
  "appointment readiness",
  "draft-only",
  "approved for manual use",
  "external send performed: no",
  "production system touched: no"
];
for (const p of requiredPhrases) {
  mustHave(doc, p, "manual communication packet doc required business phrases");
}
console.log("PASS: manual communication packet doc contains all required business phrases.");

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
  mustNotHave(doc, f, "manual communication packet doc");
  mustNotHave(dayOne, f, "day-one command center (cross-check)");
  mustNotHave(leadTo, f, "lead-to-inspection ops pack (cross-check)");
  mustNotHave(runbook, f, "execution day runbook (cross-check)");
}
console.log("PASS: forbidden business/guarantee language absent from manual communication packet doc and cross-checked prior first-roofer artifacts.");

// Assert wrapper calls the verifier (by filename reference)
mustHave(wrapper, "verify-first-roofer-manual-communication-command-packet-readonly.js", "manual communication packet wrapper");
console.log("PASS: wrapper invokes the manual communication command packet verifier.");

// Assert wrapper calls scripts/check-agent-product-quality-gate.sh
mustHave(wrapper, "scripts/check-agent-product-quality-gate.sh", "manual communication packet wrapper");
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
  mustNotHave(wrapper, u, "manual communication packet wrapper");
}
console.log("PASS: no unsafe implementation strings (twilio, supabase, resend, calendar, vapi, retell, curl/fetch https) in the wrapper.");

// Assert aggregate readiness includes the new verifier
mustHave(aggregate, "verify-first-roofer-manual-communication-command-packet-readonly.js", "aggregate first-paid pilot readiness");
mustHave(aggregate, "First Roofer Manual Communication Command Packet", "aggregate first-paid pilot readiness");
console.log("PASS: aggregate readiness includes the manual communication command packet verifier.");

// Assert verifier index references the doc, wrapper, and verifier
mustHave(verifierIndex, "docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md", "verifier index");
mustHave(verifierIndex, "scripts/run-first-roofer-manual-communication-command-packet-dry-run.sh", "verifier index");
mustHave(verifierIndex, "backend/scripts/verify-first-roofer-manual-communication-command-packet-readonly.js", "verifier index");
console.log("PASS: verifier index references doc, wrapper, and verifier.");

// Assert both next-chat context packages reference the new packet
const packetRefs = [
  "FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md",
  "run-first-roofer-manual-communication-command-packet-dry-run.sh",
  "verify-first-roofer-manual-communication-command-packet-readonly.js",
  "First Roofer Manual Communication Command Packet",
  "manual communication command packet"
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}
console.log("PASS: both next-chat context packages reference the manual communication command packet.");

// Assert the Grok workflow context package includes the two required lessons (pre-push failure-class distinction + finalize-script unresolved friction)
mustHave(workflow, "two distinct failure classes", "agent grok build workflow context");
mustHave(workflow, "Product/build failures must be fixed before push", "agent grok build workflow context");
mustHave(workflow, "Expected pre-push source-of-truth failures", "agent grok build workflow context");
mustHave(workflow, "HEAD does not match origin/main", "agent grok build workflow context");
mustHave(workflow, "product-specific verifier/wrapper, product-quality gate, production/safe readiness, backend build, and clean status before push", "agent grok build workflow context");
mustHave(workflow, "scripts/agent-finalize-branch.sh remains unresolved friction", "agent grok build workflow context");
mustHave(workflow, "HEAD before, staged diff summary, Creating commit, HEAD after, clean git status --short, and the new commit in git log", "agent grok build workflow context");
mustHave(workflow, "If proof is missing, immediately run git log --oneline -3, git status --short, and git rev-parse HEAD", "agent grok build workflow context");
mustHave(workflow, "Manually commit only after gates and diff proof already passed", "agent grok build workflow context");
console.log("PASS: agent grok build workflow context includes the two required lessons (pre-push failure-class distinction and finalize-script unresolved friction).");

// Cross-check quality gate and prior first-roofer artifacts for forbidden language (defensive)
for (const f of forbidden) {
  mustNotHave(qualityGate, f, "agent product quality gate");
}
console.log("PASS: first roofer manual communication command packet is operational, product-moving, references day-one + ops pack + runbook + quality gate, and strictly dry-run only with all required templates, fields, approval states, HOLD rules, tracker, log, readiness language, end-of-day reporting, no-live-send confirmation, required phrases, and absent forbidden phrases.");

console.log("PASS: aggregate, verifier index, and both next-chat contexts contain required manual communication command packet references.");
console.log("PASS: workflow context preserves the two pre-push failure-class and finalize-script lessons from the 8e174db build.");
