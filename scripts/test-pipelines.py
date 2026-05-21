#!/usr/bin/env python3
"""
Basic pipeline structure validation for RoofLeadHQ.
Checks that all .lobster files have required fields and valid YAML-like structure.
"""

import os
import re
import sys
from pathlib import Path

PIPELINES_DIR = Path("pipelines")

REQUIRED_FIELDS = ["name", "description", "version", "steps"]

def validate_pipeline(file_path: Path):
    errors = []
    content = file_path.read_text()

    # Check required top-level fields
    for field in REQUIRED_FIELDS:
        if not re.search(rf"^{field}:", content, re.MULTILINE):
            errors.append(f"Missing required field: {field}")

    # Check for at least one step
    if "steps:" not in content:
        errors.append("No steps defined")

    # Check for basic step structure
    step_count = len(re.findall(r"^\s+- name:", content, re.MULTILINE))
    if step_count == 0:
        errors.append("No steps with 'name:' found")

    return errors


def main():
    if not PIPELINES_DIR.exists():
        print("❌ pipelines/ directory not found")
        sys.exit(1)

    all_errors = {}
    pipeline_files = list(PIPELINES_DIR.glob("*.lobster"))

    if not pipeline_files:
        print("❌ No .lobster files found")
        sys.exit(1)

    for pf in sorted(pipeline_files):
        errs = validate_pipeline(pf)
        if errs:
            all_errors[pf.name] = errs

    if all_errors:
        for fname, errs in all_errors.items():
            print(f"❌ {fname}:")
            for e in errs:
                print(f"   - {e}")
        print(f"\n{len(all_errors)} pipeline(s) have issues")
        sys.exit(1)
    else:
        print(f"✅ All {len(pipeline_files)} pipelines passed basic structure validation")
        sys.exit(0)


if __name__ == "__main__":
    main()