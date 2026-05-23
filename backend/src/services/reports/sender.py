from src.integrations.resend_client import ResendClient
from src.reports.generators import ReportGenerator

class ReportSender:
    """Handles rendering + sending of reports via Resend."""
    
    def __init__(self, supabase_client=None):
        self.resend = ResendClient()
        self.generator = ReportGenerator(supabase_client=supabase_client)

    def send_weekly_report(self, roofer_id: str, client_config: Dict):
        """Generate and send weekly report to one roofer."""
        html = self.generator.render_weekly_report(roofer_id, client_config)
        
        subject = f"Weekly Performance Report – {client_config.get('company_name', 'Roofing Company')}"
        
        self.resend.send_email(
            to=client_config["email"],
            subject=subject,
            html=html,
        )
