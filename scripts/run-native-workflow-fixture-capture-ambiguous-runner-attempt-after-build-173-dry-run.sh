#!/usr/bin/env bash
set -euo pipefail
cd /root/roofleadhq
node backend/scripts/verify-native-workflow-fixture-capture-ambiguous-runner-attempt-after-build-173-readonly.js
