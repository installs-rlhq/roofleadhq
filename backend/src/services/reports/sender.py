def send_welcome_email(self, roofer_id: str, client_config: dict):
    """Send a welcome onboarding email."""
    from src.services.reports.generators import ReportGenerator

    generator = ReportGenerator()
    html = generator.render_welcome_email(roofer_id, client_config)

    self.resend.send_email(
        to=client_config["email"],
        subject=f"Welcome to RoofLeadHQ – {client_config.get('company_name', 'Your Company')}",
        html=html,
    )
