#!/usr/bin/env python3
"""
ReportSender – handles sending all report and onboarding emails via Resend.
"""

import os
from dotenv import load_dotenv
import resend
from typing import Any, Dict

load_dotenv()


class ReportSender:
    """Simple wrapper for Resend Python SDK + report sending methods."""

    def __init__(self):
        resend.api_key = os.getenv("RESEND_API_KEY")
        if not resend.api_key:
            raise ValueError("RESEND_API_KEY not found in environment variables")

    def send_email(
        self,
        to: str,
        subject: str,
        html: str,
        from_email: str = "reports@roofleadhq.com",
        **kwargs: Any,
    ) -> Dict:
        """Send a single email via Resend."""
        params: Dict = {
            "from": from_email,
            "to": to,
            "subject": subject,
            "html": html,
            **kwargs,
        }

        try:
            response = resend.Emails.send(params)
            print(f"✅ Email sent successfully to {to} | ID: {response.get('id')}")
            return response
        except Exception as e:
            print(f"❌ Failed to send email to {to}: {e}")
            raise

    # ==================== REPORT METHODS ====================

    def send_weekly_report(self, roofer_id: str, client_config: dict):
        from src.services.reports.generators import ReportGenerator

        generator = ReportGenerator()
        html = generator.render_weekly_report(roofer_id, client_config)

        self.send_email(
            to=client_config["email"],
            subject=f"Weekly Performance Report – {client_config.get('company_name', 'Your Company')}",
            html=html,
        )

    def send_monthly_report(self, roofer_id: str, client_config: dict):
        from src.services.reports.generators import ReportGenerator

        generator = ReportGenerator()
        html = generator.render_monthly_report(roofer_id, client_config)

        self.send_email(
            to=client_config["email"],
            subject=f"Monthly Performance Report – {client_config.get('company_name', 'Your Company')}",
            html=html,
        )

    def send_dashboard_email(self, roofer_id: str, client_config: dict):
        from src.services.reports.generators import ReportGenerator

        generator = ReportGenerator()
        html = generator.render_dashboard_email(roofer_id, client_config)

        self.send_email(
            to=client_config["email"],
            subject=f"Dashboard Overview – {client_config.get('company_name', 'Your Company')}",
            html=html,
        )

    # ==================== ONBOARDING METHODS ====================

    def send_welcome_email(self, roofer_id: str, client_config: dict):
        from src.services.reports.generators import ReportGenerator

        generator = ReportGenerator()
        html = generator.render_welcome_email(roofer_id, client_config)

        self.send_email(
            to=client_config["email"],
            subject=f"Welcome to RoofLeadHQ – {client_config.get('company_name', 'Your Company')}",
            html=html,
        )
