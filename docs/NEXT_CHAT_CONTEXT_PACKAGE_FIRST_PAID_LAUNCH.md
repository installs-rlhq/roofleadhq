# Next Chat Context Package — First Paid Launch

Current source-of-truth commit: `1674458 test(pilot): add launch ready recap verifier`

Repo path: `/root/roofleadhq`

## Terminal 1 Source-of-Truth Rule

Always continue from the verified source-of-truth commit listed at the top of this package. Never use an older commit.

## Current Safety Posture

- All production automations disabled
- No Supabase/SMS/Twilio/Vapi/Calendar/Resend/Lindy production calls
- All verifiers are local read-only filesystem inspection only
- No live service activation allowed without explicit approval

## Aggregate Verifier Command

```bash
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
```

## Backend Build Command

```bash
npm --prefix backend run build
```

## First Paid Launch Docs List

- `docs/FIRST_PAID_LAUNCH_DAY_CHECKLIST.md`
- `docs/FIRST_PAID_LAUNCH_OPERATOR_HANDOFF_NOTE.md`
- `docs/FIRST_PAID_LAUNCH_READY_RECAP.md`
- `docs/FIRST_PAID_PILOT_LAUNCH_PACKET.md`
- `docs/FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md`
- `docs/FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md`
- `docs/FIRST_PAID_CONTRACTOR_KICKOFF_EMAIL_DRAFT.md`
- `docs/FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md`
- `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

## First Paid Launch Verifier Scripts List

- `backend/scripts/verify-first-paid-launch-day-checklist-readonly.js`
- `backend/scripts/verify-first-paid-launch-operator-handoff-readonly.js`
- `backend/scripts/verify-first-paid-launch-ready-recap-readonly.js`
- `backend/scripts/verify-first-paid-pilot-readiness-readonly.js`

## Business Language Rules

Use:
- Founder-Led Launch Program
- book inspections / book appointments

## Forbidden Language Rules

Avoid old pilot language, quota-based appointment promises, job-booking language, and job/revenue guarantee wording.

## Live Automation Approval Rules

- Do not enable any production automation without explicit approval
- Before any live automation is turned on, confirm the approval, the launch scope, and the operator follow-up plan in writing
- No Supabase/SMS/Twilio/Vapi/Calendar/Resend/Lindy production calls

## Recommended Next Build Direction

Continue building the first paid launch operator tooling and documentation package using the established pattern of adding a new doc + its read-only verifier + updating the aggregate verifier and readiness checklist. Keep all work local, read-only, and docs-first.