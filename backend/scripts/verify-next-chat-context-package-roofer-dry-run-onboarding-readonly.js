#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../..");
const contextPath = path.join(repoRoot, "docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md");

if (!fs.existsSync(contextPath)) {
  throw new Error("Missing roofer dry-run onboarding context package");
}

const context = fs.readFileSync(contextPath, "utf8");

[
  "dc6d319 test(pilot): record roofer onboarding runbook readiness milestone",
  "6a01421 test(pilot): wire roofer onboarding runbook into readiness",
  "c1a75ba test(pilot): record roofer dry-run onboarding runbook milestone",
  "346aecd docs(pilot): add roofer dry-run onboarding operator runbook",
  "46b683b test(pilot): record roofer dry-run context package milestone",
  "65af4bf docs(pilot): add roofer dry-run onboarding context package",
  "933e4f7 test(pilot): add roofer dry-run workspace comparison",
  "scripts/onboard-roofer.sh",
  "docs/ROOFER_DRY_RUN_ONBOARDING_OPERATOR_RUNBOOK.md",
  "fixtures/roofer-dry-run-workspace/sample-roofer/",
  "verify-first-paid-launch-roofer-dry-run-workspace-comparison-readonly.js",
  "verify-roofer-dry-run-onboarding-operator-runbook-readonly.js",
  "verify-first-paid-pilot-readiness-readonly.js",
  "scripts/verify-source-of-truth.sh",
  "scripts/check-production-gates.sh",
  "scripts/verify-safe-readiness.sh",
  "npm --prefix backend run build",
  "Do not activate production",
  "Do not send live SMS",
  "Do not mutate Supabase",
  "Do not notify contractors or homeowners",
  "one-command dry-run onboarding QA wrapper",
].forEach((expected) => {
  if (!context.includes(expected)) {
    throw new Error(`Missing expected context text: ${expected}`);
  }
});

[
  "7-day pilot",
  "5 qualified appointments in 7 days",
  "book jobs",
  "booked jobs",
  "guaranteed jobs",
  "guaranteed revenue",
].forEach((forbidden) => {
  if (context.includes(forbidden)) {
    throw new Error(`Forbidden phrase found: ${forbidden}`);
  }
});

console.log("Next chat roofer dry-run onboarding context package verifier passed.");
