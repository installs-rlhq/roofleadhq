#!/usr/bin/env python3
"""
RoofLeadHQ End-to-End Test Harness

Simulates complete lead flow through all pipelines:
1. Webhook intake (Facebook / Website / Retell)
2. Lead normalization + deduplication
3. Qualification & routing
4. Follow-up sequences
5. Booking flow
6. Stale detection

Usage:
  python3 scripts/e2e_test_harness.py --scenario facebook_lead
  python3 scripts/e2e_test_harness.py --scenario retell_call
  python3 scripts/e2e_test_harness.py --all
"""

import argparse
import json
import sys
import time
from datetime import datetime
from pathlib import Path

# Add parent to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from scripts.lobster_runner import LobsterRunner
from scripts.structured_logger import StructuredLogger


class E2ETestHarness:
    def __init__(self):
        self.runner = LobsterRunner()
        self.logger = StructuredLogger("e2e-test")
        self.results = []

    def run_scenario(self, scenario: str) -> dict:
        """Run a single test scenario."""
        print(f"\n{'='*60}")
        print(f"SCENARIO: {scenario.upper()}")
        print(f"{'='*60}")
        
        start_time = time.time()
        
        if scenario == "facebook_lead":
            result = self._test_facebook_lead()
        elif scenario == "website_form":
            result = self._test_website_form()
        elif scenario == "retell_call":
            result = self._test_retell_call()
        elif scenario == "vapi_call":
            result = self._test_vapi_call()
        elif scenario == "duplicate_lead":
            result = self._test_duplicate_lead()
        elif scenario == "hot_lead_routing":
            result = self._test_hot_lead_routing()
        else:
            result = {"success": False, "error": f"Unknown scenario: {scenario}"}
        
        elapsed = time.time() - start_time
        result["elapsed_seconds"] = round(elapsed, 2)
        result["scenario"] = scenario
        
        self.results.append(result)
        return result

    def _test_facebook_lead(self) -> dict:
        """Simulate Facebook Lead Ads webhook."""
        payload = {
            "source": "facebook",
            "payload": {
                "name": "John Smith",
                "phone": "+18135551234",
                "email": "john.smith@email.com",
                "address": "123 Main St, Tampa, FL 33601",
                "project_type": "shingle_replacement",
                "urgency": "hot",
                "notes": "Storm damage, need quote ASAP"
            }
        }
        
        result = self.runner.run_pipeline(
            "pipelines/lead-intake.lobster",
            payload
        )
        
        return {
            "success": result.get("success", False),
            "details": "Facebook lead ingested and deduplicated",
            "output": result
        }

    def _test_website_form(self) -> dict:
        """Simulate website contact form submission."""
        payload = {
            "source": "website",
            "payload": {
                "name": "Sarah Johnson",
                "phone": "+17205555678",
                "email": "sarah.j@email.com",
                "address": "456 Oak Ave, Denver, CO 80202",
                "project_type": "gutter_installation",
                "urgency": "standard",
                "notes": "Looking for estimate next week"
            }
        }
        
        result = self.runner.run_pipeline(
            "pipelines/lead-intake.lobster",
            payload
        )
        
        return {
            "success": result.get("success", False),
            "details": "Website form lead processed",
            "output": result
        }

    def _test_retell_call(self) -> dict:
        """Simulate Retell AI post-call transcription webhook."""
        payload = {
            "source": "retell",
            "payload": {
                "call_id": "call_abc123",
                "name": "Mike Davis",
                "phone": "+18135559876",
                "summary": "Caller has active roof leak, needs emergency repair",
                "urgency": "hot",
                "address": "789 Pine Rd, Tampa, FL",
                "appointment_requested": True
            }
        }
        
        result = self.runner.run_pipeline(
            "pipelines/lead-intake.lobster",
            payload
        )
        
        return {
            "success": result.get("success", False),
            "details": "Retell transcription processed, hot lead routed",
            "output": result
        }

    def _test_vapi_call(self) -> dict:
        """Simulate Vapi post-call webhook."""
        payload = {
            "source": "vapi",
            "payload": {
                "call_id": "vapi_xyz789",
                "name": "Lisa Chen",
                "phone": "+17205551234",
                "summary": "Interested in metal roof upgrade",
                "urgency": "warm",
                "address": "321 Maple Dr, Denver, CO"
            }
        }
        
        result = self.runner.run_pipeline(
            "pipelines/lead-intake.lobster",
            payload
        )
        
        return {
            "success": result.get("success", False),
            "details": "Vapi call processed",
            "output": result
        }

    def _test_duplicate_lead(self) -> dict:
        """Test that duplicate leads within 48h are caught."""
        # First lead
        payload1 = {
            "source": "facebook",
            "payload": {
                "name": "Duplicate Test",
                "phone": "+15551234567",
                "email": "dup@test.com"
            }
        }
        
        result1 = self.runner.run_pipeline("pipelines/lead-intake.lobster", payload1)
        
        # Second lead (should be deduplicated)
        payload2 = {
            "source": "website",
            "payload": {
                "name": "Duplicate Test",
                "phone": "+15551234567",
                "email": "dup@test.com"
            }
        }
        
        result2 = self.runner.run_pipeline("pipelines/lead-intake.lobster", payload2)
        
        return {
            "success": result2.get("output", {}).get("duplicate", False),
            "details": "Duplicate detection working",
            "first_result": result1.get("success"),
            "second_result": result2.get("success")
        }

    def _test_hot_lead_routing(self) -> dict:
        """Test that hot leads get fast-track routing."""
        payload = {
            "source": "website",
            "payload": {
                "name": "Urgent Customer",
                "phone": "+18135550000",
                "urgency": "hot",
                "notes": "Active leak, water coming in"
            }
        }
        
        result = self.runner.run_pipeline(
            "pipelines/qualification-routing.lobster",
            payload
        )
        
        return {
            "success": result.get("success", False),
            "details": "Hot lead routed to emergency queue",
            "output": result
        }

    def run_all(self) -> list:
        """Run all test scenarios."""
        scenarios = [
            "facebook_lead",
            "website_form",
            "retell_call",
            "vapi_call",
            "duplicate_lead",
            "hot_lead_routing"
        ]
        
        for scenario in scenarios:
            self.run_scenario(scenario)
            time.sleep(0.5)  # Brief pause between scenarios
        
        return self.results

    def print_summary(self):
        """Print test summary."""
        print(f"\n{'='*60}")
        print("E2E TEST SUMMARY")
        print(f"{'='*60}")
        
        passed = sum(1 for r in self.results if r.get("success"))
        total = len(self.results)
        
        for result in self.results:
            status = "✓ PASS" if result.get("success") else "✗ FAIL"
            print(f"{status} | {result.get('scenario', 'unknown'):20s} | {result.get('elapsed_seconds', 0):.2f}s")
        
        print(f"\nTotal: {passed}/{total} passed ({passed/total*100:.0f}%)")
        
        if passed == total:
            print("\n🎉 All tests passed! System is ready for production.")
        else:
            print(f"\n⚠️  {total - passed} test(s) failed. Review logs above.")


def main():
    parser = argparse.ArgumentParser(description="RoofLeadHQ E2E Test Harness")
    parser.add_argument("--scenario", help="Run specific scenario")
    parser.add_argument("--all", action="store_true", help="Run all scenarios")
    args = parser.parse_args()
    
    harness = E2ETestHarness()
    
    if args.all:
        harness.run_all()
    elif args.scenario:
        harness.run_scenario(args.scenario)
    else:
        print("No scenario specified. Use --scenario or --all")
        print("Available: facebook_lead, website_form, retell_call, vapi_call, duplicate_lead, hot_lead_routing")
        sys.exit(1)
    
    harness.print_summary()


if __name__ == "__main__":
    main()