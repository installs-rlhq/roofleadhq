#!/usr/bin/env python3
"""
Composio + GitHub Re-authentication Helper

This script helps re-authenticate Composio with GitHub after token revocation.

Run this when you see authentication errors in autonomous commits.

Usage:
    python scripts/setup_composio.py
"""

import os
import subprocess
import sys

def check_gh_auth():
    try:
        result = subprocess.run(
            ["gh", "auth", "status"],
            capture_output=True,
            text=True
        )
        if "Logged in" in result.stdout:
            print("✅ GitHub CLI is authenticated")
            return True
        else:
            print("❌ GitHub CLI not authenticated")
            return False
    except Exception as e:
        print(f"Error checking gh auth: {e}")
        return False


def main():
    print("=== RoofLeadHQ Composio + GitHub Setup ===\n")

    if check_gh_auth():
        print("\n✅ GitHub authentication looks good.")
        print("If Composio is still failing, run:")
        print("   composio login")
        print("   composio add github")
    else:
        print("\nPlease run the following commands manually:")
        print("1. gh auth login")
        print("2. composio login")
        print("3. composio add github")

    print("\nAfter re-authentication, autonomous commits should work again.")


if __name__ == "__main__":
    main()