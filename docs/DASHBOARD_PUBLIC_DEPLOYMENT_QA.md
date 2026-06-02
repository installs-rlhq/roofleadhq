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
