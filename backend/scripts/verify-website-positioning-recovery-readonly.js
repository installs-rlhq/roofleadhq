#!/usr/bin/env node
/*
 * SUPERSEDED BY BUILD 224 — Website Positioning Recovery verifier.
 * Formerly enforced REMOVAL of public founder-led/"babysitting" language plus the
 * prior guarantee/trial copy direction.
 *
 * Build 224 reversed the founder-led portion: founder-led setup is now an APPROVED
 * public differentiator, and all 14-day/free-trial language is removed in favor of
 * volume-only Starter/Growth/Elite pricing. Guarantee/booked-jobs claims remain
 * forbidden (now enforced by the Build 224 gate).
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
