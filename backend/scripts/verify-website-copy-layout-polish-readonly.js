#!/usr/bin/env node
/*
 * SUPERSEDED BY BUILD 224 — Website Copy/Layout Polish verifier.
 * Formerly required 14-day trial copy ("14-day trial", "first monthly payment",
 * "automated email", 48-hour setup) and related polish phrases on public surfaces.
 *
 * Build 224 removed all 14-day/free-trial language and re-based the public site on
 * volume-only Starter/Growth/Elite pricing + customized, founder-led setup.
 *
 * Read-only passthrough: enforcement now lives in
 * verify-website-build-224-source-of-truth-readonly.js. This file is preserved
 * (referenced by the aggregate readiness registry, dry-run wrappers, and docs) and
 * delegates to the Build 224 gate so the new source of truth is enforced wherever
 * this verifier was wired in. No external/provider calls, no writes.
 */
const path = require('path');
const { execSync } = require('child_process');

console.log('=== SUPERSEDED BY BUILD 224 — delegating to verify-website-build-224-source-of-truth-readonly.js ===');
execSync('node ' + path.join(__dirname, 'verify-website-build-224-source-of-truth-readonly.js'), { stdio: 'inherit' });
console.log('PASS: superseded by Build 224 — public website source of truth verified via the Build 224 gate.');
