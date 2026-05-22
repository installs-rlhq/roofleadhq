# RoofLeadHQ Production Readiness Guide

## Overview
This document outlines how to run RoofLeadHQ reliably in a production environment.

## 1. Environment Setup

Always use the activation script:

```bash
source scripts/activate_env.sh
```

This ensures:
- Virtual environment is activated
- `.env` variables are loaded
- Critical secrets are validated

## 2. Key Environment Variables

Required:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `TWILIO_AUTH_TOKEN`
- `VAPI_PRIVATE_KEY`

Optional but recommended:
- `SLACK_WEBHOOK_URL` (for alerts)
- `ALERT_WEBHOOK_URL`

## 3. Running the System

### Manual / Development
```bash
source scripts/activate_env.sh
python scripts/cli.py health
python scripts/monitor_alerts.py --check all
```

### Recommended: Using tmux (persistent sessions)
```bash
tmux new -s roofleadhq
source scripts/activate_env.sh
python scripts/monitor_alerts.py --check all   # or your main loop
# Detach with Ctrl+B then D
```

### Process Management (Production)
- Use `systemd` or `supervisord` for long-running services
- Recommended: Run `monitor_alerts.py` on a cron or loop every 5–15 minutes

## 4. Error Handling & Resilience

- Retry logic + circuit breakers available in `scripts/retry_utils.py`
- Used in inbound handling, outreach, and external API calls
- Failures are logged with context (`client_id`, `phone`, `pipeline`)

## 5. Monitoring & Alerting

- Run `python scripts/monitor_alerts.py --check all` regularly
- Configure `SLACK_WEBHOOK_URL` for real-time alerts
- All critical failures (failed pipelines, high error rates) trigger alerts

## 6. Logging

- All major components use structured logging via `structured_logger.py`
- Logs include: `client_id`, `lead_id`, `pipeline`, `action`, `error`, etc.
- Review logs in `/var/log/` or redirect output when running as a service

## 7. Security Best Practices

- Never commit `.env` or API keys
- Use `SUPABASE_SERVICE_ROLE_KEY` only on the server
- Rotate keys regularly
- Review webhook signature verification in `webhook_verifier.py`

## 8. Health Checks

Basic health check:
```bash
python scripts/cli.py health
```

Or run:
```bash
python scripts/verify_supabase_tables.py
```

## 9. Deployment Checklist

- [ ] `source scripts/activate_env.sh` works cleanly
- [ ] All required env vars are set
- [ ] Supabase tables exist (`leads`, `clients`, `pipeline_runs`)
- [ ] Slack/webhook alerting configured (optional but recommended)
- [ ] Monitoring script runs without errors
- [ ] Logs are being captured

## 10. Common Commands

```bash
# Activate env + run monitoring
source scripts/activate_env.sh && python scripts/monitor_alerts.py --check all

# Test manual outreach
python scripts/manual_outreach.py --message "contact +15551234567" --from +17205551234 --client test-roofing

# Verify Supabase
python scripts/verify_supabase_tables.py
```

---

**Last Updated:** 2026-05-22
**Status:** Production-ready for pilot clients with proper environment setup.