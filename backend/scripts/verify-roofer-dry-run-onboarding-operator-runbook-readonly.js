#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../..");
const runbookPath = path.join(repoRoot, "docs/ROOFER_DRY_RUN_ONBOARDING_OPERATOR_RUNBOOK.md");

if (!fs.existsSync(runbookPath)) {
  throw new Error("Missing docs/ROOFER_DRY_RUN_ONBOARDING_OPERATOR_RUNBOOK.md");
}

const runbook = fs.readFileSync(runbookPath, "utf8");

[
  "Roofer Dry-Run Onboarding Operator Runbook",
  "46b683b test(pilot): record roofer dry-run context package milestone",
  "scripts/verify-source-of-truth.sh",
  "scripts/onboard-roofer.sh sample-roofer",
  ".roofleadhq/onboarding/sample-roofer/README.md",
  ".roofleadhq/onboarding/sample-roofer/intake.md",
  ".roofleadhq/onboarding/sample-roofer/safety-flags.env",
  ".roofleadhq/onboarding/sample-roofer/activation-flags.env",
  ".roofleadhq/onboarding/sample-roofer/workspace-metadata.env",
  ".roofleadhq/onboarding/sample-roofer/onboarding-checklist.md",
  "WORKSPACE_MODE=dry-run",
  "SMS_ACTIVATION=false",
  "SUPABASE_WRITES=false",
  "PUBLIC_ROUTE_ACTIVATION=false",
  "fixtures/roofer-dry-run-workspace/sample-roofer/",
  "verify-first-paid-launch-roofer-dry-run-workspace-comparison-readonly.js",
  "scripts/check-production-gates.sh",
  "scripts/verify-safe-readiness.sh",
  "npm --prefix backend run build",
  "scripts/show-diff-proof.sh",
  "Production activation requires explicit approval and Terminal 1 verification",
].forEach((expected) => {
  if (!runbook.includes(expected)) {
    throw new Error(`Missing expected runbook text: ${expected}`);
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
  if (runbook.includes(forbidden)) {
    throw new Error(`Forbidden phrase found in runbook: ${forbidden}`);
  }
});

console.log("Roofer dry-run onboarding operator runbook verifier passed.");
