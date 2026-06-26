#!/usr/bin/env node
/*
 * SUPERSEDED BY BUILD 224 — Website Founder-Led Launch Conversion Polish verifier.
 * Formerly required 14-day trial "safe phrases" and FORBADE public founder-led
 * language (including the literal "Book a Founder-Led Setup Call form").
 *
 * Build 224 reversed that: founder-led setup is now an APPROVED public differentiator
 * ("Book a Founder-Led Setup Call" / customized, founder-led setup), and all
 * 14-day/free-trial language is removed in favor of volume-only pricing.
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
