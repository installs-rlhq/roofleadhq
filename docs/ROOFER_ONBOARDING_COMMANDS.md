# RoofLeadHQ Roofer Onboarding Commands

## Purpose

This document gives the exact Terminal 1 commands for safely onboarding a roofer.

Use Terminal 1 in:

/root/roofleadhq

## Source of Truth Check

Always run this first:

```bash
cd /root/roofleadhq
pwd
git rev-parse --show-toplevel
git fetch origin main
git status --short
git log --oneline -5
