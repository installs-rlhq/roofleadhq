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
const docPath = "docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_QA.md";
const wrapperPath = "scripts/qa-first-roofer-manual-setup-planning.sh";
const doc = read(docPath);
const wrapper = read(wrapperPath);
const requiredFiles = [
  "docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md",
  "docs/ROOFER_DRY_RUN_FIRST_ROOFER_READINESS_PACKET_QA.md",
  "docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_FOLLOW_UP_PACKET.md",
  "docs/ROOFER_DRY_RUN_FIRST_ROOFER_INTERNAL_HANDOFF_SUMMARY_PACKET.md",
  "docs/ROOFER_DRY_RUN_FIRST_ROOFER_FOUNDER_REVIEW_DECISION_PACKET.md",
  "docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_PACKET.md",
  "scripts/qa-first-roofer-manual-setup-planning.sh",
];
for (const file of requiredFiles) {
  read(file);
  mustHave(doc, file, "QA doc");
}
const requiredVerifiers = [
  "backend/scripts/verify-roofer-dry-run-first-roofer-setup-packet-readonly.js",
  "backend/scripts/verify-roofer-dry-run-first-roofer-readiness-packet-qa-readonly.js",
  "backend/scripts/verify-roofer-dry-run-first-roofer-manual-follow-up-packet-readonly.js",
  "backend/scripts/verify-roofer-dry-run-first-roofer-internal-handoff-summary-packet-readonly.js",
  "backend/scripts/verify-roofer-dry-run-first-roofer-founder-review-decision-packet-readonly.js",
  "backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-packet-readonly.js",
];
for (const file of requiredVerifiers) {
  read(file);
  mustHave(doc, file, "QA doc");
  mustHave(wrapper, file, "QA wrapper");
}
const flags = [
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
];
for (const flag of flags) mustHave(doc, flag, "QA doc");
for (const phrase of ["MANUAL SETUP QA PASS", "MANUAL SETUP QA HOLD", "MANUAL SETUP QA BLOCKED"]) {
  mustHave(doc, phrase, "QA doc");
}
for (const phrase of ["scripts/verify-source-of-truth.sh", "scripts/check-production-gates.sh", "scripts/verify-safe-readiness.sh"]) {
  mustHave(wrapper, phrase, "QA wrapper");
}
for (const unsafe of ["twilio.messages.create", "supabase.from(", "resend.emails.send", "calendar.events.insert", "vapi.calls.create", "retell.call", "curl -X POST https://"]) {
  mustNotHave(wrapper, unsafe, "QA wrapper");
}
console.log("PASS: first roofer manual setup planning QA verifier is dry-run only.");
