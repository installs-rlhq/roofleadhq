#!/usr/bin/env python3
"""
RoofLeadHQ - Send Test Email Reports

Sends professional HTML Weekly or Monthly reports via email.

Usage:
    python scripts/send_test_email.py --type weekly --to lohse1@mac.com
    python scripts/send_test_email.py --type monthly --to lohse1@mac.com

Requires SMTP settings in .env:
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your@email.com
    SMTP_PASS=your_app_password
"""

import os
import sys
import argparse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from datetime import datetime

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

def send_email(to_email: str, subject: str, html_content: str):
    """Send HTML email using SMTP settings from environment."""
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")

    if not all([smtp_host, smtp_user, smtp_pass]):
        print("❌ Missing SMTP settings in .env")
        print("   Required: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS")
        print("   Example for Gmail:")
        print("   SMTP_HOST=smtp.gmail.com")
        print("   SMTP_PORT=587")
        print("   SMTP_USER=your@gmail.com")
        print("   SMTP_PASS=your_app_password")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = smtp_user
        msg["To"] = to_email

        # Attach HTML content
        html_part = MIMEText(html_content, "html")
        msg.attach(html_part)

        # Connect and send
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, to_email, msg.as_string())

        print(f"✅ Email sent successfully to {to_email}")
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
        # Fallback simple template
        return f"""
        <html>
        <body style="font-family: system-ui, sans-serif; padding: 40px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a365d;">RoofLeadHQ {report_type.title()} Report</h1>
            <p>This is a test report generated on {datetime.now().strftime('%B %d, %Y')}.</p>
            <p style="color: #64748b; font-size: 14px;">RoofLeadHQ • Professional Lead Management</p>
        </body>
        </html>
        """


def main():
    parser = argparse.ArgumentParser(description="Send RoofLeadHQ Test Report Emails")
    parser.add_argument("--type", choices=["weekly", "monthly"], required=True, help="Report type")
    parser.add_argument("--to", required=True, help="Recipient email address")
    args = parser.parse_args()

    subject = f"RoofLeadHQ {args.type.title()} Report - {datetime.now().strftime('%B %Y')}"
    html_content = load_report_template(args.type)

    print(f"📧 Sending {args.type} report to {args.to}...")
    send_email(args.to, subject, html_content)


if __name__ == "__main__":
    main()