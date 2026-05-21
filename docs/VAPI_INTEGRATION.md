# Vapi Integration Guide for RoofLeadHQ

## Overview
RoofLeadHQ supports dynamic Vapi assistants per client using custom prompts stored in `master-config.json`.

## Configuration

Each client can have a `vapi` block:

```json
"vapi": {
  "phone_number_id": "vapi_phone_xxx",
  "assistant_id": "vapi_assistant_xxx",
  "first_message": "...",
  "prompt": "# Identity & Personality\n..."
}
```

## Scripts

- `scripts/vapi_sync.py` — Push prompts from config to Vapi
- `scripts/vapi_assistant_setup.py` — Create/update assistants
- `scripts/vapi_test_call.py` — Make test outbound calls

## Workflow

1. Add client to `master-config.json` with Vapi config
2. Run `python scripts/vapi_sync.py --client <id>`
3. Test with `python scripts/vapi_test_call.py --client <id> --phone +1...`

## Notes
- Prompts are stored in config for version control
- Use `existing_twilio_number: true` when bringing your own number
- Always keep the prompt under the character limit for Vapi