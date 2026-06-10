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

const docPath = "docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md";
const wrapperPath = "scripts/run-first-roofer-execution-day-dry-run.sh";
const verifierPath = "backend/scripts/verify-first-roofer-execution-day-runbook-readonly.js";
const aggregateReadinessPath = "backend/scripts/verify-first-paid-pilot-readiness-readonly.js";
const verifierIndexPath = "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md";
const contextFirstPaidPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md";
const contextRooferDryRunPath = "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md";

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);

for (const phrase of [
  "# First Roofer Execution Day Runbook",
  "dry-run/internal-only/founder-operator-only",
  "Pre-Day Source-of-Truth Check",
  "Workspace and Readiness Confirmation",
  "First Lead Intake Review",
  "Missing-Information Handling",
  "Founder/Operator Manual Decision",
  "Manual Communication Preparation",
  "Appointment or Inspection Tracking",
  "Outcome Capture",
  "End-of-Day Recap and Next Actions",
  "book inspections",
  "book appointments",
  "FIRST ROOFER EXECUTION DAY RUNBOOK PASS",
  "FIRST ROOFER EXECUTION DAY RUNBOOK HOLD",
  "FIRST ROOFER EXECUTION DAY RUNBOOK BLOCKED"
]) {
  mustHave(doc, phrase, "execution day runbook doc");
}

for (const phrase of [
  "no live SMS/Twilio",
  "no live Vapi calls",
  "no Calendar activation",
  "no Resend production sends",
  "no Lindy external sends",
  "no cron/scheduler/dispatcher activation",
  "no public route activation",
  "no production Supabase writes",
  "no external notifications",
  "No production activation, no external sends, no data mutation."
]) {
  mustHave(doc, phrase, "execution day runbook doc");
}

for (const flag of [
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
]) {
  mustHave(doc, flag, "execution day runbook doc");
}

for (const unsafe of [
  "book jobs",
  "booked jobs",
  "7-day pilot",
  "5 qualified appointments in 7 days",
  "guaranteed jobs",
  "guaranteed revenue",
  "production automation",
  "live dispatch"
]) {
  mustNotHave(doc, unsafe, "execution day runbook doc");
}

for (const phrase of [
  "scripts/verify-source-of-truth.sh",
  verifierPath,
  "scripts/check-production-gates.sh",
  "scripts/verify-safe-readiness.sh",
  "No production activation, no external sends, no data mutation."
]) {
  mustHave(wrapper, phrase, "execution day runbook wrapper");
}

for (const unsafe of [
  "twilio.messages.create",
  "supabase.from(",
  "resend.emails.send",
  "calendar.events.insert",
  "vapi.calls.create",
  "retell.call",
  "curl -X POST https://",
  "fetch(\"https://",
  "fetch('https://"
]) {
  mustNotHave(wrapper, unsafe, "execution day runbook wrapper");
}

const requiredRunbookReferences = [
  docPath,
  wrapperPath,
  verifierPath,
  "First Roofer Execution Day Runbook",
  "first-roofer execution-day runbook"
];

for (const ref of requiredRunbookReferences) {
  mustHave(aggregate, ref, "aggregate first-paid pilot readiness");
  mustHave(verifierIndex, ref, "verifier index");
  mustHave(contextFirstPaid, ref, "next chat first paid launch context");
  mustHave(contextRooferDryRun, ref, "next chat roofer dry run onboarding context");
}

console.log("PASS: first roofer execution day runbook is operational, product-moving, and dry-run only.");
console.log("PASS: first roofer execution day runbook includes lead intake, missing-info handling, manual decision, communication prep, inspection/appointment tracking, outcome capture, and end-of-day recap.");
console.log("PASS: aggregate, verifier index, and both next-chat contexts contain required first-roofer execution-day runbook references.");
