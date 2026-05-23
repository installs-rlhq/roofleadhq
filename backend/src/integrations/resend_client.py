import os
from dotenv import load_dotenv
import resend
from typing import Any, Dict

load_dotenv()

class ResendClient:
    """Simple wrapper for Resend Python SDK."""
    
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
        """
        Send a single email via Resend.
        Returns the response from Resend (contains email ID, etc.).
        """
        params: resend.Emails.SendParams = {
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
