cat > scripts/run_weekly_reports.py << 'EOF'
#!/usr/bin/env python3
"""
Production-ready weekly report runner with retry logic and Slack alerts.
"""

import sys
import logging
import time
from pathlib import Path

sys.path.append("backend")

from src.services.reports.sender import ReportSender

# === CONFIG ===
SLACK_WEBHOOK_URL = os.getenv("SLACK_WEBHOOK_URL")
MAX_RETRIES = 2
RETRY_DELAY = 5  # seconds

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


def load_client_config(client_id: str) -> dict:
    config_path = Path("config/clients") / f"{client_id}.json"
    if not config_path.exists():
        raise FileNotFoundError(f"Client config not found: {client_id}")

    import json
    with open(config_path) as f:
        config = json.load(f)

    email = config.get("email") or config.get("roofer_email")
    if not email:
        raise ValueError(f"No valid email for {client_id}")
    config["email"] = email
    return config


def get_all_clients() -> list:
    clients_dir = Path("config/clients")
    if not clients_dir.exists():
        return []
    return [f.stem for f in clients_dir.glob("*.json") if f.stem != "Placeholder"]


def send_slack_alert(message: str):
    if not SLACK_WEBHOOK_URL:
        return
    import requests
    try:
        requests.post(SLACK_WEBHOOK_URL, json={"text": message}, timeout=10)
    except Exception as e:
        logger.warning(f"Failed to send Slack alert: {e}")


def main():
    sender = ReportSender()
    client_ids = get_all_clients()

    if not client_ids:
        logger.warning("No clients found")
        return

    logger.info(f"Processing {len(client_ids)} client(s)")

    for client_id in client_ids:
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                client_config = load_client_config(client_id)
                sender.send_weekly_report(roofer_id=client_id, client_config=client_config)
                logger.info(f"✅ Sent report for {client_id}")
                break
            except Exception as e:
                logger.error(f"❌ Attempt {attempt} failed for {client_id}: {e}")
                if attempt == MAX_RETRIES:
                    send_slack_alert(f"🚨 Weekly report failed for {client_id}: {e}")
                else:
                    time.sleep(RETRY_DELAY)


if __name__ == "__main__":
    main()
EOF
