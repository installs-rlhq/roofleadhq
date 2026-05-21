# RoofLeadHQ

Production-grade autonomous lead automation system for roofing contractors.

Built from scratch on native Lobster pipelines. Fully config-driven via `master-config.json`.

## Architecture

- **master-config.json**: Single source of truth for all clients, defaults, integrations, and pipeline references.
- **pipelines/**: All `.lobster` workflow definitions.
- Modular, per-client onboarding with zero code changes.
- Designed for easy expansion to plumbing, HVAC, real estate, etc.

## Current Status (Phase 1 Complete)

- [x] Project structure initialized
- [x] master-config.json foundation created
- [x] Roofer Onboarding pipeline
- [x] Lead Intake pipeline (Facebook + website + transcription)
- [x] Qualification & Routing pipeline
- [x] Follow-up sequences (SMS + voice)
- [x] Booking integration
- [x] Stale lead detection & re-engagement
- [ ] Reporting & observability
- [ ] GitHub Actions CI/CD

## Setup Instructions

### 1. Initial Setup
```bash
gh repo clone <your-org>/roofleadhq
cd roofleadhq
```

### 2. Configure Integrations
Edit `master-config.json` and replace all `CHANGE_ME` values:
- `webhooks.facebook.verify_token`
- `webhooks.retell.webhook_secret`
- `integrations.twilio.account_sid`
- `integrations.supabase.url` + `anon_key`

### 3. Add a New Roofer Client
Add an entry under `clients` in `master-config.json`:
```json
"clients": {
  "acme-roofing": {
    "business_name": "Acme Roofing",
    "email": "owner@acme.com",
    "area_code": "813",
    "services": ["shingle", "metal", "flat"],
    "tone": "professional_friendly"
  }
}
```

### 4. Onboard the Client
Run the onboarding pipeline (manual trigger or via config watcher).

### 5. Lead Flow
1. Lead arrives → `lead-intake.lobster`
2. Qualification → `qualification-routing.lobster`
3. Follow-up → `follow-up.lobster`
4. Booking → `booking.lobster`
5. Stale detection → `stale-detection.lobster`

All behavior is 100% driven by `master-config.json`. No code changes needed for new clients.

## Tech Stack

- Lobster pipelines (.lobster YAML)
- Stripe, Twilio, Supabase, Retell/Vapi, Composio
- GitHub Actions for CI/CD (future)

## Contributing

This is an autonomous system. All changes should be made via pipeline updates or config edits, then committed with clear messages using `gh`.