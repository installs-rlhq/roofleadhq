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
const docPath = "docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_ACCEPTANCE.md";
const wrapperPath = "scripts/accept-first-roofer-manual-setup-operator-dry-run.sh";
const runbookWrapperPath = "scripts/run-first-roofer-manual-setup-operator-runbook-dry-run.sh";
const rehearsalWrapperPath = "scripts/rehearse-first-roofer-manual-setup-dry-run.sh";
const qaWrapperPath = "scripts/qa-first-roofer-manual-setup-planning.sh";
const runbookDocPath = "docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_RUNBOOK.md";
const rehearsalDocPath = "docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_REHEARSAL.md";
const qaDocPath = "docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_QA.md";
const runbookVerifierPath = "backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-runbook-readonly.js";
const rehearsalVerifierPath = "backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-rehearsal-readonly.js";
const qaVerifierPath = "backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-qa-readonly.js";
const doc = read(docPath);
const wrapper = read(wrapperPath);
for (const file of [wrapperPath, runbookWrapperPath, rehearsalWrapperPath, qaWrapperPath, docPath, runbookDocPath, rehearsalDocPath, qaDocPath, runbookVerifierPath, rehearsalVerifierPath, qaVerifierPath]) {
  read(file);
  mustHave(doc, file, "operator acceptance doc");
}
for (const phrase of [
  "operator-acceptance-only and dry-run only",
  "does not activate production",
  "does not activate production, create production records, mutate Supabase",
  "Run the manual setup operator runbook wrapper",
  "Confirm production gate checks remain passing",
  "Confirm aggregate safe readiness remains passing",
  "Acceptance checklist"
]) mustHave(doc, phrase, "operator acceptance doc");
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
]) mustHave(doc, flag, "operator acceptance doc");
for (const phrase of [
  "MANUAL SETUP OPERATOR ACCEPTANCE PASS",
  "MANUAL SETUP OPERATOR ACCEPTANCE HOLD",
  "MANUAL SETUP OPERATOR ACCEPTANCE BLOCKED"
]) mustHave(doc, phrase, "operator acceptance doc");
for (const phrase of [
  "scripts/verify-source-of-truth.sh",
  "backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js",
  "scripts/run-first-roofer-manual-setup-operator-runbook-dry-run.sh",
  "scripts/check-production-gates.sh",
  "scripts/verify-safe-readiness.sh",
  "No production activation, no external sends, no data mutation."
]) mustHave(wrapper, phrase, "operator acceptance wrapper");
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
]) mustNotHave(wrapper, unsafe, "operator acceptance wrapper");
console.log("PASS: first roofer manual setup operator acceptance is present and dry-run only.");
