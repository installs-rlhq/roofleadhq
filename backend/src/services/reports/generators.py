from datetime import datetime, timedelta
from jinja2 import Environment, FileSystemLoader
from typing import List, Dict, Any
import json
from pathlib import Path

class ReportGenerator:
    """Generates weekly/monthly report data and renders HTML using Jinja2."""
    
    def __init__(self, supabase_client=None):
        self.supabase_client = supabase_client
        self.template_env = Environment(
            loader=FileSystemLoader("templates/emails"),
            autoescape=True
        )

    def load_client_config(self, roofer_id: str) -> Dict:
        """Load per-client config from config/clients/*.json (Supabase is still source of truth)."""
        config_path = Path("config/clients") / f"{roofer_id}.json"
        if config_path.exists():
            with open(config_path) as f:
                return json.load(f)
        # Fallback
        return {"roofer_id": roofer_id}

    def generate_weekly_report_data(self, roofer_id: str, client_config: Dict) -> Dict[str, Any]:
        """Query Supabase (if available) and prepare data for weekly report."""
        # TODO: Replace with real Supabase queries when ready
        # if self.supabase_client:
        #     metrics = self.supabase_client.get_weekly_metrics(roofer_id)
        #     leads = self.supabase_client.get_leads_needing_attention(roofer_id, days=7)
        
        today = datetime.now()
        start_date = (today - timedelta(days=7)).strftime("%B %d")
        end_date = today.strftime("%B %d")
        
        # Example leads - replace with real data from Supabase later
        leads_needing_attention = [
            {"name": "Sarah M.", "phone": "+17205551234", "source": "Website", "status": "Hot", "last_activity": "2h ago"},
            # Add more rows from Supabase here
        ]
        
        data = {
            "logo_url": client_config.get("logo_url", "https://yourdomain.com/website/roofleadhq-logo-small-icon.png"),
            "date_range": f"{start_date} – {end_date}",
            "company_name": client_config.get("company_name", "Your Roofing Company"),
            "first_name": client_config.get("first_name", "John"),
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
            "leads_needing_attention": leads_needing_attention,   # raw list passed to Jinja2
            "recommended_actions": "Focus follow-up on the hot leads and stale leads this week.<br>Consider tightening the 24-hour response window.",
            "generated_date": datetime.now().strftime("%B %d, %Y"),
            "unsubscribe_url": f"https://roofleadhq.com/unsubscribe?roofer_id={roofer_id}",
        }
        return data

    def render_weekly_report(self, roofer_id: str, client_config: Dict) -> str:
        """Render the weekly HTML template with data."""
        data = self.generate_weekly_report_data(roofer_id, client_config)
        template = self.template_env.get_template("weekly-report.html")
        return template.render(**data)
