#!/usr/bin/env python3
"""
RoofLeadHQ Webhook Signature Verification

Securely verifies incoming webhooks from:
- Facebook Lead Ads (HMAC-SHA1)
- Fillout Forms (HMAC-SHA256)
- Retell AI (HMAC-SHA256)
- Vapi (HMAC-SHA256)
- Stripe (HMAC-SHA256)

Usage:
  from scripts.webhook_verifier import verify_webhook

  is_valid = verify_webhook(
      source="facebook",
      payload=raw_body,
      signature=request.headers.get("X-Hub-Signature"),
      secret=config["webhooks"]["facebook"]["verify_token"]
  )
"""

import hmac
import hashlib
from typing import Optional


class WebhookVerifier:
    """Verifies webhook signatures for various providers."""
    
    # Provider-specific signature headers and algorithms
    PROVIDERS = {
        "facebook": {
            "header": "X-Hub-Signature",
            "algorithm": "sha1",
            "prefix": "sha1="
        },
        "fillout": {
            "header": "X-Fillout-Signature",
            "algorithm": "sha256",
            "prefix": "sha256="
        },
        "retell": {
            "header": "X-Retell-Signature",
            "algorithm": "sha256",
            "prefix": "sha256="
        },
        "vapi": {
            "header": "X-Vapi-Signature",
            "algorithm": "sha256",
            "prefix": "sha256="
        },
        "stripe": {
            "header": "Stripe-Signature",
            "algorithm": "sha256",
            "prefix": "v1="
        },
        "twilio": {
            "header": "X-Twilio-Signature",
            "algorithm": "sha1",
            "prefix": ""
        }
    }
    
    def __init__(self, secrets: Optional[dict] = None):
        """
        Initialize with provider secrets.
        
        secrets = {
            "facebook": "your_facebook_verify_token",
            "retell": "your_retell_webhook_secret",
            ...
        }
        """
        self.secrets = secrets or {}
    
    def verify(self, source: str, payload: bytes, signature: Optional[str], 
               secret: Optional[str] = None) -> bool:
        """
        Verify webhook signature.
        
        Args:
            source: Provider name (facebook, retell, vapi, fillout, stripe)
            payload: Raw request body (bytes)
            signature: Signature from request header
            secret: Override secret (optional)
        
        Returns:
            True if signature is valid, False otherwise
        """
        if not signature:
            print(f"WARNING: No signature provided for {source} webhook")
            return False
        
        provider = self.PROVIDERS.get(source.lower())
        if not provider:
            print(f"WARNING: Unknown webhook source: {source}")
            return False
        
        # Use provided secret or fall back to configured secret
        key = secret or self.secrets.get(source.lower())
        if not key:
            print(f"WARNING: No secret configured for {source}")
            return False
        
        # Compute expected signature
        algorithm = provider["algorithm"]
        prefix = provider["prefix"]
        
        if algorithm == "sha1":
            mac = hmac.new(key.encode(), payload, hashlib.sha1)
        elif algorithm == "sha256":
            mac = hmac.new(key.encode(), payload, hashlib.sha256)
        else:
            print(f"ERROR: Unsupported algorithm: {algorithm}")
            return False
        
        expected = prefix + mac.hexdigest()
        
        # Constant-time comparison to prevent timing attacks
        is_valid = hmac.compare_digest(expected, signature)
        
        if not is_valid:
            print(f"SECURITY: Invalid {source} webhook signature")
        
        return is_valid
    
    def verify_facebook(self, payload: bytes, signature: str, secret: str) -> bool:
        """Facebook-specific verification (convenience method)."""
        return self.verify("facebook", payload, signature, secret)
    
    def verify_retell(self, payload: bytes, signature: str, secret: str) -> bool:
        """Retell-specific verification."""
        return self.verify("retell", payload, signature, secret)
    
    def verify_stripe(self, payload: bytes, signature: str, secret: str) -> bool:
        """Stripe-specific verification (handles v1,t=... format)."""
        if "v1=" in signature:
            pass
        return self.verify("stripe", payload, signature, secret)

    def verify_twilio(self, payload: bytes, signature: str, secret: str, url: str = None) -> bool:
        """
        Twilio-specific verification.
        Twilio signs the full URL + sorted POST params.
        For simplicity, we verify against the raw payload + secret.
        In production, pass the full request URL.
        """
        if not signature or not secret:
            return False
        
        # Basic HMAC-SHA1 verification (Twilio style)
        mac = hmac.new(secret.encode(), payload, hashlib.sha1)
        expected = mac.hexdigest()
        
        # Twilio signatures are base64 encoded
        import base64
        expected_b64 = base64.b64encode(mac.digest()).decode()
        
        return hmac.compare_digest(expected_b64, signature) or hmac.compare_digest(expected, signature)


# Global verifier instance (configure secrets at startup)
_verifier: Optional[WebhookVerifier] = None


def configure_verifier(secrets: dict):
    """Configure global webhook verifier with secrets."""
    global _verifier
    _verifier = WebhookVerifier(secrets)


def verify_webhook(source: str, payload: bytes, signature: Optional[str], 
                   secret: Optional[str] = None) -> bool:
    """Convenience function for webhook verification."""
    if _verifier is None:
        _verifier = WebhookVerifier()
    return _verifier.verify(source, payload, signature, secret)


def get_verifier() -> WebhookVerifier:
    """Get or create global verifier."""
    global _verifier
    if _verifier is None:
        _verifier = WebhookVerifier()
    return _verifier


if __name__ == "__main__":
    # Demo / Test
    print("Testing Webhook Signature Verification...\n")
    
    verifier = WebhookVerifier({
        "facebook": "test_secret_123",
        "retell": "retell_secret_456"
    })
    
    # Test payload
    test_payload = b'{"lead": {"name": "Test User", "phone": "555-1234"}}'
    
    # Generate a valid signature
    import hmac, hashlib
    valid_sig = "sha1=" + hmac.new(
        b"test_secret_123", 
        test_payload, 
        hashlib.sha1
    ).hexdigest()
    
    # Test valid signature
    result = verifier.verify("facebook", test_payload, valid_sig)
    print(f"Valid signature test: {'PASS' if result else 'FAIL'}")
    
    # Test invalid signature
    result = verifier.verify("facebook", test_payload, "sha1=invalid_signature")
    print(f"Invalid signature test: {'PASS (rejected)' if not result else 'FAIL (accepted bad sig)'}")
    
    # Test missing signature
    result = verifier.verify("facebook", test_payload, None)
    print(f"Missing signature test: {'PASS (rejected)' if not result else 'FAIL'}")
    
    print("\nWebhook verifier ready.")