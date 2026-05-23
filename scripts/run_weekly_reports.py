cat > scripts/run_weekly_reports.py << 'EOF'
#!/usr/bin/env python3
"""
Production-ready weekly report runner.
- Automatically processes all clients in config/clients/
- Proper logging and error handling
"""

import sys
import logging
from pathlib import Path

sys.path.append("backend")

from src.services.reports.sender import ReportSender

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


def load_client_config(client_id: str) -> dict:
    """Load client configuration with robust email handling."""
    config_path = Path("config/clients") / f"{client_id}.json"
    
    if not config_path.exists():
        raise FileNotFoundError(f"Client config not found: {client_id}")

    import json
    with open(config_path) as f:
        config = json.load(f)

    email = config.get("email") or config.get("roofer_email")
    if not email:
        raise ValueError(f"No valid email configured for {client_id}")

    config["email"] = email
    return config


def get_all_clients() -> list:
    """Return list of all client IDs from config/clients/."""
    clients_dir = Path("config/clients")
    if not clients_dir.exists():
        return []
    return [f.stem for f in clients_dir.glob("*.json") if f.stem != "Placeholder"]


def main():
    sender = ReportSender()
    client_ids = get_all_clients()

    if not client_ids:
        logger.warning("No client configs found in config/clients/")
        return

    logger.info(f"Starting weekly report run for {len(client_ids)} client(s)")

    success_count = 0
    for client_id in client_ids:
        try:
            client_config = load_client_config(client_id)
            sender.send_weekly_report(
                roofer_id=client_id,
                client_config=client_config
            )
            logger.info(f"✅ Sent report for {client_id}")
            success_count += 1
        except Exception as e:
            logger.error(f"❌ Failed for {client_id}: {e}")

    logger.info(f"Completed: {success_count}/{len(client_ids)} reports sent successfully")


if __name__ == "__main__":
    main()
EOF
