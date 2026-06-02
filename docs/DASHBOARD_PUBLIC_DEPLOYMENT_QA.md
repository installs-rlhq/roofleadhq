# Dashboard Public Deployment QA

Date: 2026-06-01

## Verified Public Routes

Frontend:

- `https://www.roofleadhq.com/dashboard`
- `https://www.roofleadhq.com/dashboard/internal-errors.html`

Public API through Vercel proxy:

- `GET /api/dashboard/overview`
- `GET /api/dashboard/manual-outreach`

Protected internal API:

- `GET /api/internal/admin-errors`

## Verified Results

- Dashboard Overview page loads publicly.
- Dashboard Overview API returns live JSON through Vercel.
- Manual Outreach API returns live JSON through Vercel.
- Internal Admin Errors page loads publicly.
- Internal Admin Errors API returns `401 Unauthorized` without token.
- Internal Admin Errors frontend prompts for `INTERNAL_ADMIN_TOKEN`.
- Backend health endpoint returns status `ok`.
- Backend remains managed by `roofleadhq-backend.service`.
- Vercel API proxy routes `/api/*` to the VPS backend.

## Safety Notes

- Internal Admin Errors is read-only.
- No SMS triggers were added.
- No Calendar triggers were added.
- No Vapi triggers were added.
- No Resend or Lindy triggers were added.
- API values continue to be rendered safely on the frontend.

## Latest Verified Commits

- `214fd8e fix(admin): protect internal errors endpoint with token`
- `9d32671 fix(vercel): proxy api requests to backend`
- `fb7fb84 fix(vercel): allow internal errors dashboard page`

## Security Update

Additional verification completed after public API proxy was added:

- `GET /api/dashboard/overview` now requires `DASHBOARD_ACCESS_TOKEN`.
- `GET /api/dashboard/manual-outreach` now requires `DASHBOARD_ACCESS_TOKEN`.
- Public dashboard frontend prompts for dashboard access token.
- Public dashboard frontend sends token with `x-dashboard-access-token`.
- Public dashboard APIs return `401 Unauthorized` without token.
- `GET /api/internal/admin-errors` remains protected by `INTERNAL_ADMIN_TOKEN`.

## Browser Verification

Additional browser verification completed:

- Public dashboard prompts for `DASHBOARD_ACCESS_TOKEN`.
- Correct dashboard token loads KPI data successfully.
- Placeholder "View all" labels were replaced with "Summary".
- Placeholder "Full Dashboard View" was replaced with "Reset Dashboard Token".
- Reset Dashboard Token clears the saved browser token and reloads the page.
