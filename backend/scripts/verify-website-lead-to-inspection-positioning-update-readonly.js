#!/usr/bin/env node
/*
 * SUPERSEDED BY BUILD 224 — Website Lead-to-Inspection Positioning Update verifier.
 * Formerly enforced prior hero/positioning copy (e.g. "Never Miss Another Roofing
 * Lead" variants) alongside the 14-day trial direction.
 *
 * Build 224 updated the public hero/offer to a done-for-you lead response system
 * with customized, founder-led setup and volume-only pricing, and removed all
 * 14-day/free-trial language. The stacked hero headline and video sections from the
 * v3 cleanup are preserved and re-asserted by the Build 224 gate.
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
