#!/usr/bin/env python3
"""
RoofLeadHQ CLI

Unified command-line interface for common operations.

Usage:
  python3 scripts/cli.py onboard --id summit --name "Summit Roofing" --email owner@summit.com --area-code 720
  python3 scripts/cli.py test --all
  python3 scripts/cli.py report daily summit-roofing
  python3 scripts/cli.py monitor
  python3 scripts/cli.py health
"""

import argparse
import sys
from pathlib import Path

# Ensure we can import local modules
sys.path.insert(0, str(Path(__file__).parent))


def cmd_onboard(args):
    from onboard_client import ClientOnboarder
    onboarder = ClientOnboarder()
    result = onboarder.onboard(
        client_id=args.id,
        business_name=args.name,
        email=args.email,
        area_code=args.area_code,
        services=args.services.split(",") if args.services else None
    )
    print(f"\n✅ Client '{result['client_id']}' onboarded successfully!")


def cmd_test(args):
    from e2e_test_harness import E2ETestHarness
    harness = E2ETestHarness()
    if args.all:
        harness.run_all()
    elif args.scenario:
        harness.run_scenario(args.scenario)
    else:
        print("Use --all or --scenario <name>")
        sys.exit(1)
    harness.print_summary()


def cmd_report(args):
    from report_generator import ReportGenerator
    gen = ReportGenerator()
    if args.type == "daily":
        print(gen.generate_daily_report(args.client))
    else:
        print(gen.generate_weekly_report(args.client))


def cmd_monitor(args):
    from monitor_alerts import Monitor
    monitor = Monitor()
    monitor.run_all_checks()
    monitor.print_alerts()


def cmd_health(args):
    print("🏥 RoofLeadHQ Health Check\n")
    checks = [
        ("Lobster Runner", "scripts/lobster_runner.py"),
        ("E2E Test Harness", "scripts/e2e_test_harness.py"),
        ("Prompt Manager", "scripts/prompt_manager.py"),
        ("Webhook Verifier", "scripts/webhook_verifier.py"),
        ("Report Generator", "scripts/report_generator.py"),
        ("Monitor Alerts", "scripts/monitor_alerts.py"),
        ("A/B Testing", "scripts/ab_testing.py"),
        ("Onboarding CLI", "scripts/onboard_client.py"),
    ]
    
    all_ok = True
    for name, path in checks:
        exists = Path(path).exists()
        status = "✅" if exists else "❌"
        print(f"{status} {name:20s} {path}")
        if not exists:
            all_ok = False
    
    print("\n" + ("✅ All systems healthy" if all_ok else "⚠️ Some components missing"))


def main():
    parser = argparse.ArgumentParser(description="RoofLeadHQ CLI")
    subparsers = parser.add_subparsers(dest="command")
    
    # Onboard
    p = subparsers.add_parser("onboard", help="Onboard a new client")
    p.add_argument("--id", required=True)
    p.add_argument("--name", required=True)
    p.add_argument("--email", required=True)
    p.add_argument("--area-code", required=True)
    p.add_argument("--services", default="shingle,metal,flat")
    p.set_defaults(func=cmd_onboard)
    
    # Test
    p = subparsers.add_parser("test", help="Run E2E tests")
    p.add_argument("--all", action="store_true")
    p.add_argument("--scenario")
    p.set_defaults(func=cmd_test)
    
    # Report
    p = subparsers.add_parser("report", help="Generate reports")
    p.add_argument("type", choices=["daily", "weekly"])
    p.add_argument("client")
    p.set_defaults(func=cmd_report)
    
    # Monitor
    p = subparsers.add_parser("monitor", help="Check system health & alerts")
    p.set_defaults(func=cmd_monitor)
    
    # Health
    p = subparsers.add_parser("health", help="Quick health check of all scripts")
    p.set_defaults(func=cmd_health)
    
    args = parser.parse_args()
    if hasattr(args, "func"):
        args.func(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()