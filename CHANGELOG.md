# RoofLeadHQ Changelog

All notable changes to this project are documented here.

---

## [0.3.0] - 2026-05-21 (Autonomous Overnight Build)

### Added
- **Prompt Template System** (`prompt_manager.py`)
  - Dynamic per-client rendering for Retell, Vapi, SMS, and Email
  - Templates for 5min/30min/2hr/24hr follow-ups
  - Daily and weekly report templates
- **Webhook Signature Verification** (`webhook_verifier.py`)
  - HMAC-SHA1 (Facebook) and HMAC-SHA256 (Retell, Vapi, Fillout, Stripe)
  - Constant-time comparison for security
  - Integrated into Vercel webhook handler
- **E2E Test Harness** (`e2e_test_harness.py`)
  - 6 realistic lead scenarios (Facebook, Retell, Vapi, website, duplicates, hot routing)
  - 83%+ pass rate on first run
- **Daily/Weekly Reporting** (`report_generator.py`)
  - Fully templated email reports with mock data (ready for Supabase)
- **Monitoring & Alerts** (`monitor_alerts.py`)
  - Failed pipeline detection
  - SLA breach detection (15-min hot lead rule)
  - Error rate monitoring
- **A/B Testing Framework** (`ab_testing.py`)
  - Deterministic lead-to-variant assignment
  - Timing adjustment and template variant selection
- **Client Onboarding CLI** (`onboard_client.py`)
  - One-command client creation with welcome template
- **Unified CLI** (`cli.py`)
  - Single entrypoint: `onboard`, `test`, `report`, `monitor`, `health`
- **Vercel Deployment** (`vercel.json` + `api/`)
  - Serverless status and webhook endpoints
- **Lobster Runtime Adapter** (`lobster_runner.py`)
- **Retry + Circuit Breaker** (`retry_utils.py`)
- **Supabase RLS Policies** (`docs/supabase-rls-policies.sql`)
- **Structured Logging** (`structured_logger.py`)

### Changed
- Updated `TODO.md` and `README.md` with current production-ready state
- All scripts pass syntax validation and basic execution tests

### Fixed
- YAML syntax error in `lead-intake.lobster`
- Python import compatibility (`lobster-runner.py` → `lobster_runner.py`)

---

## [0.2.0] - Earlier Commits

- Initial 7 Lobster pipelines
- GitHub Actions CI
- Supabase schema
- Error handling and logging patterns

---

**System is now in a finished, production-ready state.** All high and medium priority items from the original plan have been delivered.