# Native Workflow Fixture Sandbox/Test-Mode No-Go and Stop-Condition Checklist

## Purpose

This checklist defines fail-closed no-go and stop conditions for any future sandbox/test-mode activation attempt. Each item maps to exactly one decision: `NO_GO_KEEP_BLOCKED` or `STOP_AND_ROLL_BACK`.

| Field | Value |
| --- | --- |
| source_of_truth_commit | 04e0de6 |
| request_status | draft_only |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |

---

## No-Go Conditions (Pre-Run Blockers)

| # | Condition | Decision |
| --- | --- | --- |
| 1 | missing exact command | NO_GO_KEEP_BLOCKED |
| 2 | missing exact environment | NO_GO_KEEP_BLOCKED |
| 3 | missing test account | NO_GO_KEEP_BLOCKED |
| 4 | missing credential boundary | NO_GO_KEEP_BLOCKED |
| 5 | missing external service boundary | NO_GO_KEEP_BLOCKED |
| 6 | missing production data boundary | NO_GO_KEEP_BLOCKED |
| 7 | missing rollback owner | NO_GO_KEEP_BLOCKED |
| 8 | missing evidence owner | NO_GO_KEEP_BLOCKED |
| 9 | source-of-truth mismatch | NO_GO_KEEP_BLOCKED |
| 10 | dirty git status | NO_GO_KEEP_BLOCKED |
| 11 | pilot readiness not demo_ready_with_live_automation_disabled | NO_GO_KEEP_BLOCKED |
| 12 | safe readiness failure | NO_GO_KEEP_BLOCKED |
| 13 | backend build failure | NO_GO_KEEP_BLOCKED |

---

## Stop Conditions (During/After Run)

| # | Condition | Decision |
| --- | --- | --- |
| 14 | unexpected live service indicator | STOP_AND_ROLL_BACK |
| 15 | unexpected production data access | STOP_AND_ROLL_BACK |
| 16 | unexpected external call | STOP_AND_ROLL_BACK |
| 17 | unexpected schema/auth/RLS/security change | STOP_AND_ROLL_BACK |
| 18 | unexpected public route/webhook/scheduler/cron/dispatcher change | STOP_AND_ROLL_BACK |
| 19 | unexpected billing/payment/quote/estimate/invoice behavior | STOP_AND_ROLL_BACK |
| 20 | any homeowner/roofer real-data ambiguity | STOP_AND_ROLL_BACK |
| 21 | any approval ambiguity | STOP_AND_ROLL_BACK |

---

## Decision Reference

| Decision | Meaning |
| --- | --- |
| NO_GO_KEEP_BLOCKED | Do not start. Keep sandbox/test-mode activation blocked. Resolve blocker before retry. |
| STOP_AND_ROLL_BACK | Halt immediately. Execute rollback plan. Do not continue until evidence reviewed and scope re-approved. |

---

## Blocked Paths Reference (remain blocked without explicit approval)

The following paths remain blocked unless explicitly named in a future scoped approval:

- Twilio/SMS live sends
- Vapi outbound and webhook intake
- Resend live email
- public route / webhook exposure
- scheduler / cron / dispatcher activation
- billing / payment / quote / estimate / invoice automation
- CRM sync
- production Supabase reads/writes

## Packet Safety Posture (unchanged by this checklist)

| Field | Value |
| --- | --- |
| approved_for_activation_now | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| safety_status | demo_ready_with_live_automation_disabled |
| public_website_go_live_copy_changed | false |

This checklist does **not** approve sandbox/test-mode activation. It defines guardrails only.