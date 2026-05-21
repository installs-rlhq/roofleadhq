# RoofLeadHQ

Done-for-you lead qualification system for roofing contractors.

## Structure

- `website/` — Marketing site (deployed on Vercel)
- `backend/` — Automation backend (deployed on Railway)

## Getting Started (Backend)

1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your keys
4. `npm run dev`

## API Routes

- `GET /health`
- `GET /api/leads`
- `POST /api/leads`
- `GET /api/calls`
- `POST /api/calls/webhook`

## Tech Stack

- Node.js + TypeScript
- Express
- Supabase
- Vapi / Retell
