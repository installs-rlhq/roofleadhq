# Vapi Integration Guide for RoofLeadHQ

## Overview
RoofLeadHQ uses **"Appointment Receptionist"** as the default/base template for all Vapi assistants.

This ensures consistent behavior, voice settings, and structure across all clients while still allowing per-client customization of prompts and first messages.

## Default Template

- **Template Name:** Appointment Receptionist
- **Template Assistant ID:** `d6da9bf9-04df-4fb2-af2c-022d2a510732`
- Stored in `master-config.json` under `defaults.vapi.template_assistant_id`

## How Assistant Creation Works

When `vapi_assistant_setup.py` runs for a client:

1. If the client has no `assistant_id` yet, the script clones settings from the "Appointment Receptionist" template.
2. Client-specific values (`first_message`, `prompt`, `phone_number_id`) override the template.
3. The new assistant is created with the client's name and configuration.
4. The `assistant_id` is saved back into `master-config.json`.

## Configuration Example

```json
"vapi": {
  "phone_number_id": "26d018ad-72a9-4fc7-8333-ff58d656fbd4",
  "assistant_id": "8456b00d-1463-4655-9dc5-30a52c5577d7",
  "template_assistant_id": "d6da9bf9-04df-4fb2-af2c-022d2a510732",
  "first_message": "...",
  "prompt": "# Identity & Personality\n..."
}
```

## Scripts

| Script                        | Purpose                                      |
|-------------------------------|----------------------------------------------|
| `vapi_assistant_setup.py`     | Create/update assistants (clones from template) |
| `vapi_sync.py`                | Push client-specific prompts to Vapi         |
| `vapi_test_call.py`           | Make outbound test calls                     |

## Recommended Workflow

1. Add new client to `master-config.json`
2. Run `python scripts/vapi_assistant_setup.py --client <id>`
3. Run `python scripts/vapi_sync.py --client <id>`
4. Test with `python scripts/vapi_test_call.py --client <id>`

## Notes
- Always keep the "Appointment Receptionist" template as the base for consistency.
- Prompts are version-controlled in `master-config.json`.
- Phone numbers must be provisioned in Vapi and referenced via `phone_number_id`.