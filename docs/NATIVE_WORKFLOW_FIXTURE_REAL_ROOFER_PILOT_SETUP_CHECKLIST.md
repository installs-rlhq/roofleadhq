# Native Workflow Fixture Real Roofer Pilot Setup Checklist

## 1. Purpose and Scope

This document defines the **controlled real roofer pilot setup checklist** for the Roofer Pilot Essentials Planning Batch. It specifies recommended default setup steps for onboarding one real roofer into a controlled pilot — **without** granting live activation, executing setup commands, or connecting to external services.

### What this checklist is

- controlled real roofer setup planning only
- recommended default setup steps for one real roofer pilot
- explicit checklist items for Jason review
- child document of `docs/NATIVE_WORKFLOW_FIXTURE_ROOFER_PILOT_ESSENTIALS_PLANNING_BATCH.md`
- all step counts marked **RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED**

### What this checklist is not

- This is **not** live roofer onboarding execution.
- This is **not** approval to activate channels or connect to production.
- This does **not** access credentials, env, API, or webhooks.
- This does **not** touch production data.
- Recommended setup steps are **not** approval and are **not** approved live values.

**Explicit note:** Recommended setup steps are **not** approval. Live activation remains **not granted**.

## 2. Preconditions (must be met before any future real roofer setup)

| Gate | Required Status |
| --- | --- |
| local_demo_e2e_evidence_chain_status | passed |
| sandbox_test_mode_validation_evidence | captured and reviewed (future — not yet) |
| sandbox_test_mode_approval_status | not_granted (requires separate Jason approval) |
| live_activation_approval_status | not_granted |
| default_sandbox_test_mode_decision | HOLD |

## 3. Recommended Default Setup Step Count

| Category | Recommended Default Count | Status |
| --- | --- | --- |
| controlled_real_roofer_setup_steps | 12 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |

## 4. Controlled Real Roofer Setup Steps (12 recommended defaults)

| Step | Step ID | Description | Owner | Evidence Required |
| --- | --- | --- | --- | --- |
| 1 | CRS-01 | Confirm roofer fit (service area, lead volume, decision-maker) | Jason | Fit worksheet signed |
| 2 | CRS-02 | Capture roofer business profile (name, phone, service area, hours) | Jason | Profile record draft |
| 3 | CRS-03 | Define pilot scope limits (max leads/day, channels enabled, duration) | Jason | Scope document |
| 4 | CRS-04 | Confirm messaging compliance posture (opt-in, STOP handling, quiet hours) | Jason | Compliance checklist |
| 5 | CRS-05 | Configure sandbox/test-mode channel credentials (after approval only) | Jason | Credential checklist (no values logged) |
| 6 | CRS-06 | Set up roofer tenant/account stub (no production schema changes) | Jason | Tenant config draft |
| 7 | CRS-07 | Configure lead intake routing for pilot roofer | Jason | Routing rules document |
| 8 | CRS-08 | Configure manual review queue ownership for pilot | Jason | Queue assignment record |
| 9 | CRS-09 | Configure calendar/appointment preferences for pilot | Jason | Calendar prefs draft |
| 10 | CRS-10 | Configure reporting visibility for pilot roofer | Jason | Report access checklist |
| 11 | CRS-11 | Run pilot kickoff walkthrough with roofer (no live sends) | Jason | Walkthrough notes |
| 12 | CRS-12 | Confirm stop/rollback contacts and escalation path | Jason | Escalation card |

## 5. Setup Gate Rules

| Gate | Status | Decision |
| --- | --- | --- |
| sandbox/test-mode validation evidence complete | required before setup | HOLD until met |
| all 12 setup steps documented | required before limited validation | HOLD until met |
| pilot scope limits defined | required | HOLD until met |
| stop/rollback path confirmed | required | HOLD until met |
| live activation approval | not granted | HOLD_KEEP_BLOCKED |
| billing/payment automation | not enabled | HOLD_KEEP_BLOCKED |

## 6. Pilot Scope Limits (recommended defaults — not approved)

| Limit | Recommended Default | Status |
| --- | --- | --- |
| max_leads_per_day | 3 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| pilot_duration_days | 14 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| enabled_channels | SMS + Vapi (sandbox/test-mode only) | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| max_concurrent_active_leads | 10 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |
| manual_review_required_for_all_leads | true | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |

## 7. Safety Boundaries

| Field | Value |
| --- | --- |
| live_activation_allowed | false |
| sandbox_test_mode_activation_allowed | false |
| external_calls_allowed | false |
| credentials_access_allowed | false |
| production_data_access_allowed | false |
| schema_auth_rls_security_changes_allowed | false |
| billing_payment_automation_allowed | false |
| recommended_scenario_counts_are_not_approval | true |
| default_sandbox_test_mode_decision | HOLD |

Delivery posture: local-only, fake-data-only, read-only, dry-run-only, review-only, planning-only.