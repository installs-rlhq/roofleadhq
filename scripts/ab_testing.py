#!/usr/bin/env python3
"""
RoofLeadHQ A/B Testing for Follow-up Cadences

Allows testing different SMS follow-up timings and messages per client or globally.

Usage:
  from scripts.ab_testing import get_follow_up_variant

  variant = get_follow_up_variant(lead_id, "5min", client_id="summit-roofing")
  # Returns 'A' or 'B' based on deterministic assignment
"""

import hashlib
from typing import Literal


def get_follow_up_variant(lead_id: str, step: str, client_id: str = "default", 
                          num_variants: int = 2) -> Literal["A", "B", "C"]:
    """
    Deterministically assign a lead to an A/B test variant.
    
    Uses lead_id + step + client_id to ensure consistent assignment
    across multiple follow-up steps for the same lead.
    """
    seed = f"{lead_id}:{step}:{client_id}"
    hash_val = int(hashlib.md5(seed.encode()).hexdigest(), 16)
    variant_index = hash_val % num_variants
    
    variants = ["A", "B", "C"][:num_variants]
    return variants[variant_index]


def get_follow_up_timing(client_id: str, base_minutes: int, variant: str) -> int:
    """
    Return adjusted timing based on A/B variant.
    
    Variant A = control (base timing)
    Variant B = +30% delay (more spaced out)
    Variant C = -20% delay (more aggressive)
    """
    if variant == "A":
        return base_minutes
    elif variant == "B":
        return int(base_minutes * 1.3)
    elif variant == "C":
        return max(1, int(base_minutes * 0.8))
    return base_minutes


def get_sms_template_variant(base_template: str, variant: str) -> str:
    """
    Return template name with variant suffix if it exists.
    
    Example: "follow_up_5min" → "follow_up_5min_B"
    """
    if variant == "A":
        return base_template
    return f"{base_template}_{variant}"


if __name__ == "__main__":
    # Demo
    print("A/B Testing Demo\n")
    
    for lead in ["lead_001", "lead_002", "lead_003"]:
        for step in ["5min", "30min", "2hr"]:
            v = get_follow_up_variant(lead, step, "summit-roofing")
            timing = get_follow_up_timing("summit-roofing", 5 if step == "5min" else 30, v)
            print(f"{lead} | {step:5s} → Variant {v} | Timing: {timing} min")
    
    print("\n✅ A/B testing module ready.")