# Public Site Pricing / Offer / Feature Update — Build 224

Public-website source-of-truth update. **Website + docs + verifier changes only.**
No backend/src changes, no schema changes, no lead-path changes, no live actions,
no provider calls, no credential access, no production data, no homeowner/roofer contact.

```
status_machine_readable:
  build: 224
  scope: public_site_pricing_offer_feature_alignment
  backend_src_changed: false
  schema_changed: false
  lead_paths_changed: false
  live_actions: false
  pricing_model: volume_only_same_features_all_tiers
  trial_language_removed: true
  founder_led_setup: approved_public_differentiator
  competitor_comparison: deferred
  demo_page_hand_edited: false
```

## What changed

### Pricing (new public source of truth)
| Tier | Setup | Monthly | Lead volume |
| --- | --- | --- | --- |
| Starter | $199 | $199/mo for the first 3 months, then $299/mo | 25 leads/mo |
| Growth | $199 | $399/mo for the first 3 months, then $599/mo | 75 leads/mo |
| Elite | $199 | $899/mo (flat) | 150 leads/mo |

- Same features on every plan. Volume-only differentiation. No feature gating.
- Cancel anytime. No contracts. No hidden fees.
- No priced "Custom" tier — overflow line only: "Need more than 150 leads/mo? We'll review volume and routing needs with you."

### Offer / positioning
- Hero subheadline + meta/OG/JSON-LD: "RoofLeadHQ is a done-for-you lead response system for roofing contractors. We answer calls, capture form leads, follow up automatically, and help get qualified homeowners onto your calendar."
- Trust line: "$199 setup. Cancel anytime."
- Primary CTA: **"Book a Founder-Led Setup Call"** (replaces "Start Your RoofLeadHQ Setup").
- **Customized, founder-led setup** is now an approved public differentiator (the prior "Guided Setup / no public founder-led language" direction is reversed).

### Feature framing (honesty split)
- **Included today:** AI phone answering, SMS follow-up sequences, lead dashboard, weekly/monthly reports, customized founder-led setup.
- **Rolling out next (NOT claimed live):** email-forward intake, human takeover, CSV export, bot protection, generic webhook destinations.

### Removed from public surfaces
14-day trial, free trial, 7-day pilot, "5 qualified appointments in 7 days", First-Month
Confidence Promise, refund / credit next month / waive first payment, $299 setup, old
$399/$699/$999 + $499/$799 pricing, 100/300/500 lead caps, "fully automated AI".

### FAQ
Added/updated: "What does customized, founder-led setup include?", "Is there a free trial?"
(no — intro pricing instead), "Can I cancel anytime?", "What if I go over my lead cap?"
(Fillout overage language), "Do you integrate with my CRM?" (CSV/webhook roadmap; native
JobNimbus/AccuLynx/ServiceTitan not built), "How do Angi/Thumbtack leads work?" (email-forward
intake roadmap; official Angi/Thumbtack/Yelp API integrations not built).

## Feature build-status (verified against `backend/src`)

| Public claim | Code status |
| --- | --- |
| AI phone answering (Vapi) | **Built** — `vapi-webhook.service.ts`, `vapi-calendar-sync.service.ts`, `routes/vapi-webhooks.ts` |
| SMS follow-up @ 2h/12h/24h + quiet hours 9PM–8AM | **Built** — `sms-safety.service.ts` (`followup_2h/12h/24h`, quiet hours `hour>=21 || hour<8`) |
| Website form capture / manual text (Path A / Path C) | **Built** — `leads.ts`, `manual-outreach.service.ts` |
| Lead dashboard | **Built** — `routes/dashboard.ts` + dashboard pages |
| Weekly/monthly reports | **Built** — `reports/generators.py`, `reports/sender.py` |
| Email-forward intake | **Not built** — roadmap |
| Human takeover | **Not built** — roadmap |
| CSV export | **Not built** — roadmap |
| Bot protection | **Not built** — roadmap |
| Webhook destinations / native CRM (JobNimbus/AccuLynx/ServiceTitan) | **Not built** — roadmap / out of scope |

Lead Paths A/B/C and `roofer-alert-binding` were not modified and contain no pricing/trial strings.

## Verifier changes
- **New authoritative gate:** `backend/scripts/verify-website-build-224-source-of-truth-readonly.js`
  + wrapper `scripts/run-website-build-224-source-of-truth-dry-run.sh`. Enforces new pricing present;
  old pricing/caps/trial/refund/competitor absent; founder-led present; roadmap features not claimed live;
  v3 layout invariants preserved.
- **Superseded → passthroughs** (delegate to the new gate; preserved for aggregate/wrapper/doc references):
  `verify-website-pricing-volume-guardrail-readonly.js`, `verify-website-trial-direction-regression-readonly.js`,
  `verify-website-copy-layout-polish-readonly.js`, `verify-website-founder-led-launch-copy-readonly.js`,
  `verify-website-founder-led-conversion-polish-readonly.js`, `verify-website-positioning-recovery-readonly.js`,
  `verify-website-lead-to-inspection-positioning-update-readonly.js`.
- `verify-website-demo-screenshot-assets-readonly.js` and `verify-website-homepage-screenshot-placement-readonly.js`
  still pass unchanged (screenshot sections untouched).

## Preserved / not changed (decision #6, #7)
- `website/demo/sales-demo.html` (Build 221 generated demo) **not hand-edited**; its Build 221/223 verifiers
  still pass against the unchanged demo HTML.
- Historical build-numbered artifacts (Build 201/216/220/221/223 fixtures, docs, verifiers) left intact.
- Competitor comparison (LeadTruffle/Goodcall) **deferred** — not added.

## Roadmap (future build order, unchanged)
1. Human Takeover / Escalation
2. Email-Forward Lead Intake Parser
3. Bot / False Lead Detection
4. CSV Export for CRM Import
5. Generic Outbound Webhook Destination

Do not build yet: native JobNimbus/AccuLynx/ServiceTitan integrations, official
Angi/Thumbtack/Yelp API integrations, dashboard scraping.
