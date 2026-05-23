#!/usr/bin/env python3
"""
Minimal standalone script to test Resend in complete isolation.
Run this FIRST before testing the full weekly report.
"""
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.integrations.resend_client import ResendClient

def test_resend():
    """Quick isolated test — send one email without full report flow."""
    client = ResendClient()
    html = "<h1>RoofLeadHQ Resend Test</h1><p>This is a test email from your report system. If you see this, Resend is working correctly.</p>"
    
    client.send_email(
        to="installs@roofleadhq.com",   # ← CHANGE THIS TO YOUR TEST EMAIL
        subject="RoofLeadHQ Resend Test - Success",
        html=html
    )
    print("✅ Test email sent via Resend!")

if __name__ == "__main__":
    test_resend()
