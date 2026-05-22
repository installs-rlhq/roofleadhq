#!/usr/bin/env python3
"""
RoofLeadHQ - Send Test Email Reports using Resend

Sends professional HTML Weekly or Monthly reports via Resend.

Usage:
    python scripts/send_test_email.py --type weekly --to lohse1@mac.com
    python scripts/send_test_email.py --type monthly --to lohse1@mac.com

Requires in .env:
    RESEND_API_KEY=re_xxxxxxxx
    FROM_EMAIL=reports@roofleadhq.com
    FROM_NAME=RoofLeadHQ
"""

import os
import sys
import argparse
from pathlib import Path
from datetime import datetime

from dotenv import load_dotenv
load_dotenv()

try:
    import resend
except ImportError:
    print("❌ Resend package not installed. Run: pip install resend")
    sys.exit(1)


def send_email(to_email: str, subject: str, html_content: str):
    """Send HTML email using Resend."""
    api_key = os.getenv("RESEND_API_KEY")
    from_email = os.getenv("FROM_EMAIL", "reports@roofleadhq.com")
    from_name = os.getenv("FROM_NAME", "RoofLeadHQ")

    if not api_key:
        print("❌ RESEND_API_KEY is missing in .env")
        return False

    resend.api_key = api_key

    try:
        params = {
            "from": f"{from_name} <{from_email}>",
            "to": [to_email],
            "subject": subject,
            "html": html_content,
        }

        email = resend.Emails.send(params)
        print(f"✅ Email sent successfully! ID: {email.get('id')}")
        return True

    except Exception as e:
        print(f"❌ Failed to send email: {e}")
        return False


def load_report_template(report_type: str) -> str:
    """Load the professional HTML report template."""
    base_path = Path(__file__).parent.parent / "prompts" / "email"

    if report_type == "weekly":
        template_path = base_path / "weekly_report.html"
    elif report_type == "monthly":
        template_path = base_path / "monthly_report.html"
    else:
        template_path = base_path / "weekly_report.html"

    if template_path.exists():
        return template_path.read_text(encoding="utf-8")
    else:
        # Fallback template
        return f"""
        <html>
        <body style="font-family: system-ui, sans-serif; padding: 40px; max-width: 620px; margin: 0 auto;">
            <h1 style="color: #1a365d;">RoofLeadHQ {report_type.title()} Report</h1>
            <p>This is a test report generated on {datetime.now().strftime('%B %d, %Y')}.</p>
            <p style="color: #64748b; font-size: 14px;">RoofLeadHQ • Professional Lead Management</p>
        </body>
        </html>
        """


def main():
    parser = argparse.ArgumentParser(description="Send RoofLeadHQ Test Report Emails via Resend")
    parser.add_argument("--type", choices=["weekly", "monthly"], required=True, help="Report type")
    parser.add_argument("--to", required=True, help="Recipient email address")
    args = parser.parse_args()

    subject = f"RoofLeadHQ {args.type.title()} Report - {datetime.now().strftime('%B %Y')}"
    html_content = load_report_template(args.type)

    print(f"📧 Sending {args.type} report to {args.to} via Resend...")
    send_email(args.to, subject, html_content)


if __name__ == "__main__":
    main()