# RoofLeadHQ

Production-grade autonomous lead automation system for roofing contractors.

Built from scratch on native Lobster pipelines. Fully config-driven via `master-config.json`.

## Architecture

- **master-config.json**: Single source of truth for all clients, defaults, integrations, and pipeline references.
- **pipelines/**: All `.lobster` workflow definitions.
- Modular, per-client onboarding with zero code changes.
- Designed for easy expansion to plumbing, HVAC, real estate, etc.

## Current Status

- [x] Project structure initialized
- [x] master-config.json foundation created
- [ ] Roofer Onboarding pipeline
- [ ] Lead Intake pipeline
- [ ] Qualification & Routing pipeline
- [ ] Follow-up sequences
- [ ] Booking integration
- [ ] Stale lead detection
- [ ] Reporting & observability

## Getting Started

1. Edit `master-config.json` to add a new roofing client under `clients`.
2. Run the onboarding pipeline.
3. All behavior (prompts, cadences, SLAs) is driven from config.

## Tech Stack

- Lobster pipelines (.lobster YAML)
- Stripe, Twilio, Supabase, Retell/Vapi, Composio
- GitHub Actions for CI/CD (future)

## Contributing

This is an autonomous system. All changes should be made via pipeline updates or config edits, then committed with clear messages.