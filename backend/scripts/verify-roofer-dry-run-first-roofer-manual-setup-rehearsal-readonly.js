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
const docPath = "docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_REHEARSAL.md";
const wrapperPath = "scripts/rehearse-first-roofer-manual-setup-dry-run.sh";
const qaWrapperPath = "scripts/qa-first-roofer-manual-setup-planning.sh";
const qaDocPath = "docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_QA.md";
const qaVerifierPath = "backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-qa-readonly.js";
const doc = read(docPath);
const wrapper = read(wrapperPath);
read(qaWrapperPath);
read(qaDocPath);
read(qaVerifierPath);
for (const file of [wrapperPath, qaWrapperPath, docPath, qaDocPath, qaVerifierPath]) {
  mustHave(doc, file, "rehearsal doc");
}
for (const phrase of [
  "rehearsal-only and dry-run only",
  "does not activate production",
  "does not activate production, create production records, mutate Supabase",
  "Run the manual setup planning QA wrapper",
  "Run production gate checks",
  "Run aggregate safe readiness"
]) mustHave(doc, phrase, "rehearsal doc");
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
]) mustHave(doc, flag, "rehearsal doc");
for (const phrase of [
  "MANUAL SETUP REHEARSAL PASS",
  "MANUAL SETUP REHEARSAL HOLD",
  "MANUAL SETUP REHEARSAL BLOCKED"
]) mustHave(doc, phrase, "rehearsal doc");
for (const phrase of [
  "scripts/verify-source-of-truth.sh",
  "backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-rehearsal-readonly.js",
  "scripts/qa-first-roofer-manual-setup-planning.sh",
  "scripts/check-production-gates.sh",
  "scripts/verify-safe-readiness.sh",
  "No production activation, no external sends, no data mutation."
]) mustHave(wrapper, phrase, "rehearsal wrapper");
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
]) mustNotHave(wrapper, unsafe, "rehearsal wrapper");
console.log("PASS: first roofer manual setup rehearsal is present and dry-run only.");
