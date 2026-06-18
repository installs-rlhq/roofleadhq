# Native Workflow Fixture Sandbox/Test-Mode Evidence Requirements

## Purpose

This document defines the evidence Jason must require before and after any future sandbox/test-mode activation attempt. Evidence capture does **not** equal live approval.

| Field | Value |
| --- | --- |
| source_of_truth_commit | 04e0de6 |
| request_status | draft_only |
| approval_status | not_granted |
| sandbox_test_mode_approval_status | not_granted |

**Explicit note:** Evidence capture does **not** equal live approval. Collecting evidence does not grant sandbox/test-mode or live activation approval.

---

## Pre-Run Evidence Requirements

| # | Evidence Item | Required |
| --- | --- | --- |
| 1 | pre-run source-of-truth verification | yes |
| 2 | pre-run clean git status | yes |
| 3 | pre-run pilot readiness | yes |
| 4 | pre-run safe readiness fast lane | yes |
| 5 | pre-run backend build | yes |

---

## Run Evidence Requirements

| # | Evidence Item | Required |
| --- | --- | --- |
| 6 | exact command echo | yes |
| 7 | run timestamp | yes |
| 8 | log path | yes |
| 9 | service status before/after | yes |
| 10 | external call evidence | yes |
| 11 | credential access evidence | yes |
| 12 | production data evidence | yes |
| 13 | schema/auth/RLS/security evidence | yes |
| 14 | public route/webhook/scheduler/cron/dispatcher evidence | yes |
| 15 | billing/payment/quote/estimate/invoice evidence | yes |
| 16 | stop-condition evidence | yes |
| 17 | rollback evidence | yes |

---

## Post-Run Evidence Requirements

| # | Evidence Item | Required |
| --- | --- | --- |
| 18 | post-run pilot readiness | yes |
| 19 | post-run safe readiness | yes |
| 20 | post-run backend build | yes |
| 21 | post-run source-of-truth verification | yes |
| 22 | final clean status | yes |
| 23 | final Jason review decision | yes |

---

## Evidence Capture Placeholders (not yet collected)

| Field | Placeholder |
| --- | --- |
| pre-run source-of-truth verification | `[EVIDENCE_NOT_YET_COLLECTED]` |
| pre-run clean git status | `[EVIDENCE_NOT_YET_COLLECTED]` |
| pre-run pilot readiness | `[EVIDENCE_NOT_YET_COLLECTED]` |
| pre-run safe readiness fast lane | `[EVIDENCE_NOT_YET_COLLECTED]` |
| pre-run backend build | `[EVIDENCE_NOT_YET_COLLECTED]` |
| exact command echo | `[EVIDENCE_NOT_YET_COLLECTED]` |
| run timestamp | `[EVIDENCE_NOT_YET_COLLECTED]` |
| log path | `[EVIDENCE_NOT_YET_COLLECTED]` |
| service status before/after | `[EVIDENCE_NOT_YET_COLLECTED]` |
| external call evidence | `[EVIDENCE_NOT_YET_COLLECTED]` |
| credential access evidence | `[EVIDENCE_NOT_YET_COLLECTED]` |
| production data evidence | `[EVIDENCE_NOT_YET_COLLECTED]` |
| schema/auth/RLS/security evidence | `[EVIDENCE_NOT_YET_COLLECTED]` |
| public route/webhook/scheduler/cron/dispatcher evidence | `[EVIDENCE_NOT_YET_COLLECTED]` |
| billing/payment/quote/estimate/invoice evidence | `[EVIDENCE_NOT_YET_COLLECTED]` |
| stop-condition evidence | `[EVIDENCE_NOT_YET_COLLECTED]` |
| rollback evidence | `[EVIDENCE_NOT_YET_COLLECTED]` |
| post-run pilot readiness | `[EVIDENCE_NOT_YET_COLLECTED]` |
| post-run safe readiness | `[EVIDENCE_NOT_YET_COLLECTED]` |
| post-run backend build | `[EVIDENCE_NOT_YET_COLLECTED]` |
| post-run source-of-truth verification | `[EVIDENCE_NOT_YET_COLLECTED]` |
| final clean status | `[EVIDENCE_NOT_YET_COLLECTED]` |
| final Jason review decision | `[EVIDENCE_NOT_YET_COLLECTED]` |

---

## Packet Safety Posture (unchanged by this document)

| Field | Value |
| --- | --- |
| approved_for_activation_now | false |
| sandbox_test_mode_activation_allowed | false |
| live_activation_allowed | false |
| safety_status | demo_ready_with_live_automation_disabled |

**Explicit note:** Evidence capture does **not** equal live approval.