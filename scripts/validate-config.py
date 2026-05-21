#!/usr/bin/env python3
"""
RoofLeadHQ Config Validator
Validates master-config.json structure and referenced pipelines.
"""

import json
import os
import sys

def validate_config(config_path="master-config.json"):
    errors = []
    warnings = []

    if not os.path.exists(config_path):
        errors.append(f"Config file not found: {config_path}")
        return False, errors, warnings

    with open(config_path) as f:
        try:
            config = json.load(f)
        except json.JSONDecodeError as e:
            errors.append(f"Invalid JSON: {e}")
            return False, errors, warnings

    # Required top-level keys
    required_keys = ["system", "defaults", "pipelines", "clients"]
    for key in required_keys:
        if key not in config:
            errors.append(f"Missing required top-level key: '{key}'")

    # Validate pipelines exist
    if "pipelines" in config:
        for name, path in config["pipelines"].items():
            if not os.path.exists(path):
                errors.append(f"Pipeline file missing: {path} (referenced as '{name}')")

    # Check for placeholder values
    placeholders = ["CHANGE_ME", "TODO", "FIXME"]
    config_str = json.dumps(config)
    for ph in placeholders:
        if ph in config_str:
            warnings.append(f"Found placeholder '{ph}' in config - replace before production use")

    # Basic defaults validation
    if "defaults" in config:
        if "sla" not in config["defaults"]:
            warnings.append("Missing 'sla' section under defaults")

    success = len(errors) == 0
    return success, errors, warnings


if __name__ == "__main__":
    success, errors, warnings = validate_config()

    for w in warnings:
        print(f"⚠️  WARNING: {w}")
    for e in errors:
        print(f"❌ ERROR: {e}")

    if success:
        print("✅ Config validation passed")
        sys.exit(0)
    else:
        print("❌ Config validation failed")
        sys.exit(1)