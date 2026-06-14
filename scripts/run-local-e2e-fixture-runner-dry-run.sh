#!/usr/bin/env bash
set -euo pipefail

echo "=== RoofLeadHQ Local E2E Fixture Runner Dry Run ==="
echo "DRY RUN ONLY"
echo "No live SMS"
echo "No external sends"
echo "No production writes"
echo "No production Supabase writes"
echo "No calendar booking automation"
echo "No payment automation"

node --check backend/scripts/run-local-e2e-fixture-runner.js
node --check backend/scripts/verify-local-e2e-fixture-runner-readonly.js
node backend/scripts/verify-local-e2e-fixture-runner-readonly.js
node backend/scripts/verify-agent-product-quality-gate-readonly.js
node backend/scripts/run-local-e2e-fixture-runner.js

echo "PASS: local E2E fixture runner dry-run completed safely"
