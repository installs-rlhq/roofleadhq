# Stripe Webhook Integration for RoofLeadHQ

## Overview
RoofLeadHQ receives Stripe webhooks to handle billing events for pilot clients and subscriptions.

## Supported Events

| Event                              | Purpose                              | Current Handling |
|------------------------------------|--------------------------------------|------------------|
| `checkout.session.completed`       | New pilot/subscription started       | Logged + metadata extraction |
| `invoice.payment_succeeded`        | Successful payment                   | Logged + amount tracking |
| `customer.subscription.updated`    | Plan changes, cancellations          | Logged + status tracking |

## Endpoint

**URL:** `https://your-domain.com/api/webhook/stripe`

**Method:** `POST`

**Header:** `Stripe-Signature` (required for verification)

## Environment Variables Required

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxx
```

## Setup Instructions

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://your-domain.com/api/webhook/stripe`
3. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.updated`
4. Copy the **Signing secret** and add it as `STRIPE_WEBHOOK_SECRET` in your environment / Vercel

## Webhook Handler Logic

The handler is located in `api/webhook.py`.

Key behaviors:
- Verifies signature using Stripe's official library
- Logs all received events with structured logging
- Extracts `client_id` from metadata when available
- Graceful fallback if Stripe library is not installed

## Future Enhancements

- [ ] Trigger onboarding workflow on `checkout.session.completed`
- [ ] Update Supabase billing status on payment success
- [ ] Handle subscription cancellations and downgrades
- [ ] Send notification emails to ops team on important events

## Testing

Use Stripe CLI to test locally:

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
stripe trigger checkout.session.completed
```