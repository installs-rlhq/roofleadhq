# RoofLeadHQ

**Production-grade autonomous lead qualification & booking system for roofing contractors.**

Built on native Lobster pipelines with full per-client customization, security, observability, and automation.

---

## Current State (May 2026)

**Core system is complete and production-ready.**

- 7 Lobster pipelines with retries, circuit breakers, and structured logging
- Per-client prompt templates (Retell, Vapi, SMS, Email)
- Webhook signature verification (Facebook, Retell, Vapi, Fillout, Stripe)
- E2E test harness + monitoring & alerts
- Daily/weekly reporting + A/B testing skeleton
- Client onboarding CLI + Vercel deployment support

---

## Architecture

| Component              | Description                                      |
|------------------------|--------------------------------------------------|
| `master-config.json`   | Single source of truth for clients, integrations, and pipelines |
| `pipelines/`           | All `.lobster` workflow definitions              |
| `scripts/`             | Runtime, testing, reporting, monitoring, onboarding |
| `prompts/`             | Per-channel, per-client prompt templates         |
| `api/`                 | Vercel serverless functions (status + webhook)   |

---

## Key Features

- **Lead Intake** — Facebook, website forms, Retell/Vapi transcriptions, Twilio
- **Qualification & Routing** — Hot/warm/cold scoring with emergency keywords
- **Automated Follow-up** — 5min, 30min, 2hr, 24hr SMS + voice sequences
- **Booking** — Calendar integration with confirmation
- **Stale Detection** — 48-hour re-engagement for unresponsive leads
- **Security** — Full webhook signature verification
- **Observability** — Structured JSON logging + monitoring alerts
- **Reporting** — Daily and weekly performance emails
- **A/B Testing** — Deterministic follow-up cadence experiments

---

## Quick Start

```bash
# Clone
gh repo clone installs-rlhq/roofleadhq
cd roofleadhq

# Onboard a new client
python3 scripts/onboard_client.py \
  --id "summit-roofing" \
  --name "Summit Roofing Pros" \
  --email "owner@summitroofing.com" \
  --area-code "720"

# Run E2E tests
python3 scripts/e2e_test_harness.py --all

# Generate a daily report
python3 scripts/report_generator.py --type daily --client summit-roofing
```

---

## Scripts Overview

| Script                        | Purpose                                      |
|-------------------------------|----------------------------------------------|
| `lobster_runner.py`           | Execute .lobster pipelines                   |
| `e2e_test_harness.py`         | Full lead flow testing (6 scenarios)         |
| `onboard_client.py`           | One-command client onboarding                |
| `prompt_manager.py`           | Dynamic per-client prompt rendering          |
| `webhook_verifier.py`         | HMAC signature verification                  |
| `report_generator.py`         | Daily/weekly email reports                   |
| `monitor_alerts.py`           | Failed pipelines, SLA breaches, error rates  |
| `ab_testing.py`               | Follow-up cadence A/B testing                |

---

## Tech Stack

- **Pipelines**: Lobster (.lobster YAML)
- **Runtime**: Python 3.12 + custom adapter
- **Database**: Supabase (RLS + RLS policies included)
- **Voice/SMS**: Retell AI, Vapi, Twilio
- **Integrations**: Stripe, Composio, Google Calendar
- **Deployment**: Vercel serverless + GitHub Actions CI

---

## Next Steps (Phase 2)

- Real Supabase runtime integration
- Lead performance dashboard
- Auto-deploy GitHub Actions
- Expansion to plumbing / HVAC

---

## Contributing

This is an autonomous system. All changes should be made via:

1. Pipeline edits (`.lobster` files)
2. Config updates (`master-config.json`)
3. New scripts / prompt templates

Then commit with clear messages and push via `gh`.

**System is stable and ready for pilot clients.**