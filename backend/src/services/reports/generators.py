from datetime import datetime, timedelta
from jinja2 import Environment, FileSystemLoader
from typing import Dict, Any
import json
from pathlib import Path


class ReportGenerator:
    """Generates weekly/monthly report data and renders HTML using Jinja2."""

    def __init__(self, supabase_client=None):
        self.supabase_client = supabase_client
        # Robust absolute path (works regardless of working directory)
        template_dir = Path(__file__).resolve().parents[4] / "prompts" / "email"
        self.template_env = Environment(
            loader=FileSystemLoader(template_dir),
            autoescape=True
        )

    def load_client_config(self, roofer_id: str) -> Dict:
        """Load per-client config from config/clients/*.json"""
        config_path = Path("config/clients") / f"{roofer_id}.json"
        if config_path.exists():
            with open(config_path) as f:
                return json.load(f)
        return {"roofer_id": roofer_id}

    # ==================== WEEKLY ====================
    def generate_weekly_report_data(self, roofer_id: str, client_config: Dict) -> Dict[str, Any]:
        today = datetime.now()
        start_date = (today - timedelta(days=7)).strftime("%B %d")
        end_date = today.strftime("%B %d")

        leads_needing_attention = [
            {"name": "Sarah M.", "phone": "+17205551234", "source": "Website", "status": "Hot", "last_activity": "2h ago"},
        ]

        data = {
            "logo_url": client_config.get("logo_url", "https://yourdomain.com/website/roofleadhq-logo-small-icon.png"),
            "date_range": f"{start_date} – {end_date}",
            "company_name": client_config.get("company_name", "Your Roofing Company"),
            "first_name": client_config.get("first_name", "John"),
            "email": client_config.get("email") or client_config.get("roofer_email"),
            "total_leads": 34,
            "hot_leads": 5,
            "appointments": 8,
            "close_rate": 57,
            "leads_trend": "↑3",
            "leads_trend_color": "#10b981",
            "hot_trend": "↑2",
            "hot_trend_color": "#10b981",
            "appt_trend": "↓1",
            "appt_trend_color": "#ef4444",
            "close_trend": "↑12%",
            "close_trend_color": "#10b981",
            "leads_needing_attention": leads_needing_attention,
            "recommended_actions": "Focus follow-up on the hot leads and stale leads this week.<br>Consider tightening the 24-hour response window.",
            "generated_date": datetime.now().strftime("%B %d, %Y"),
            "unsubscribe_url": f"https://roofleadhq.com/unsubscribe?roofer_id={roofer_id}",
        }
        return data

    def render_weekly_report(self, roofer_id: str, client_config: Dict) -> str:
        data = self.generate_weekly_report_data(roofer_id, client_config)
        template = self.template_env.get_template("weekly_report.html")
        return template.render(**data)

    # ==================== MONTHLY ====================
    def generate_monthly_report_data(self, roofer_id: str, client_config: Dict) -> Dict[str, Any]:
        today = datetime.now()
        month_year = today.strftime("%B %Y")

        leads_needing_attention = [
            {"name": "Sarah M.", "phone": "+17205551234", "source": "Website", "status": "Hot", "last_activity": "2h ago"},
        ]

        data = {
            "logo_url": client_config.get("logo_url", "https://yourdomain.com/website/roofleadhq-logo-small-icon.png"),
            "month_year": month_year,
            "company_name": client_config.get("company_name", "Your Roofing Company"),
            "first_name": client_config.get("first_name", "John"),
            "email": client_config.get("email") or client_config.get("roofer_email"),
            "total_leads_month": 142,
            "hot_leads_month": 19,
            "appointments_month": 31,
            "close_rate_month": 61,
            "leads_trend": "↑12",
            "leads_trend_color": "#10b981",
            "hot_trend": "↑4",
            "hot_trend_color": "#10b981",
            "appt_trend": "↑7",
            "appt_trend_color": "#10b981",
            "close_trend": "↑5%",
            "close_trend_color": "#10b981",
            "leads_needing_attention": leads_needing_attention,
            "recommended_actions": "Focus on the 4 hot leads and 2 stale leads this month.<br>Consider tightening the 24-hour response window.",
            "generated_date": datetime.now().strftime("%B %d, %Y"),
            "unsubscribe_url": f"https://roofleadhq.com/unsubscribe?roofer_id={roofer_id}",
        }
        return data

    def render_monthly_report(self, roofer_id: str, client_config: Dict) -> str:
        data = self.generate_monthly_report_data(roofer_id, client_config)
        template = self.template_env.get_template("monthly_report.html")
        return template.render(**data)

    # ==================== DASHBOARD ====================
    def render_dashboard_email(self, roofer_id: str, client_config: Dict) -> str:
        data = {
            "logo_url": client_config.get("logo_url", "https://yourdomain.com/website/roofleadhq-logo-small-icon.png"),
            "date": datetime.now().strftime("%B %d, %Y"),
            "company_name": client_config.get("company_name", "Your Roofing Company"),
            "first_name": client_config.get("first_name", "there"),
            "email": client_config.get("email") or client_config.get("roofer_email"),
            "total_leads": 34,
            "hot_leads": 5,
            "appointments": 8,
            "close_rate": 57,
            "generated_date": datetime.now().strftime("%B %d, %Y"),
            "unsubscribe_url": f"https://roofleadhq.com/unsubscribe?roofer_id={roofer_id}",
        }
        template = self.template_env.get_template("dashboard_email.html")
        return template.render(**data)

    # ==================== ONBOARDING ====================
    def render_welcome_email(self, roofer_id: str, client_config: Dict) -> str:
        data = {
            "logo_url": client_config.get("logo_url", "https://yourdomain.com/website/roofleadhq-logo-small-icon.png"),
            "company_name": client_config.get("company_name", "Your Roofing Company"),
            "first_name": client_config.get("first_name", "there"),
            "email": client_config.get("email") or client_config.get("roofer_email"),
        }
        template = self.template_env.get_template("onboarding/welcome.html")
        return template.render(**data)
