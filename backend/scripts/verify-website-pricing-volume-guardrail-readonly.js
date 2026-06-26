#!/usr/bin/env node
/*
 * SUPERSEDED BY BUILD 224 — Website Pricing Volume Guardrail verifier.
 * Formerly enforced the old $399/$699/$999 monthly + $499/$799 setup pricing,
 * the 100/300/500 lead caps, the priced "Custom" tier, and the 14-day trial copy.
 *
 * Build 224 changed the public website source of truth to Starter/Growth/Elite
 * volume-only pricing ($199 setup; $199->$299 / $399->$599 / $899; 25/75/150
 * leads/mo), "Book a Founder-Led Setup Call" + customized founder-led setup as an
 * APPROVED differentiator, and removal of all 14-day/free-trial language.
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
