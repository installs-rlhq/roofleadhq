# Alerting Setup for RoofLeadHQ

RoofLeadHQ supports alerting via Slack and generic webhooks.

## Environment Variables

Add these to your `.env` file (or Vercel environment variables):

```bash
# Slack (recommended for team notifications)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXX/YYYYY/ZZZZZ

# Generic webhook (for Zapier, n8n, custom dashboards, etc.)
ALERT_WEBHOOK_URL=https://your-webhook-endpoint.com/alerts
```

## How It Works

- When `monitor_alerts.py` detects issues (failed pipelines, high error rates, etc.), it automatically sends alerts.
- Alerts are sent **only if** the corresponding environment variable is set.
- If no webhook URLs are configured, the system falls back to logging only (graceful).

## Setting Up Slack

1. Go to your Slack workspace → **Apps** → **Incoming Webhooks**
2. Click **Add to Slack**
3. Choose the channel you want alerts posted to
4. Copy the **Webhook URL**
5. Add it to your environment as `SLACK_WEBHOOK_URL`

## Alert Format (Slack)

Alerts appear as clean, readable messages with:
- Severity emoji (🔴 / 🟠 / 🟡)
- Alert type
- Message
- Timestamp

Example:
```
🚨 RoofLeadHQ Alert

🔴 failed_pipeline — Pipeline 'lead-intake' failed for summit-roofing
_2026-05-22T04:12:33Z_
```

## Testing

```bash
source scripts/activate_env.sh
python scripts/monitor_alerts.py --check all
```

## Security Note

Never commit webhook URLs to git. Always use environment variables.