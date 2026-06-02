# Per-Roofer Dashboard Access Plan

## Goal

Replace the current shared dashboard token and hardcoded test roofer ID with a safer per-roofer dashboard access model.

Current dashboard state:

- Public dashboard URL: `/dashboard`
- APIs are protected by `DASHBOARD_ACCESS_TOKEN`
- Frontend still uses hardcoded test roofer ID:
  `be7efc94-bd68-43af-81b2-dc7b869b42df`

This is safe for testing but not ready for real clients.

## Current Problem

The dashboard currently depends on:

1. One shared dashboard access token
2. A visible `roofer_id` query parameter or frontend constant
3. Manual token entry in the browser

Before onboarding real roofers, each roofer needs their own dashboard access path.

## Desired Future State

Each roofer should have:

- A unique dashboard access token
- A token-to-roofer lookup on the backend
- Dashboard data loaded based on token, not exposed `roofer_id`
- No hardcoded test roofer ID in frontend production flow
- Easy onboarding script support

## Recommended URL Options

### Option A — Shared Dashboard URL With Token

Example:

```text
https://www.roofleadhq.com/dashboard
