#!/usr/bin/env python3
"""
RoofLeadHQ Prompt Template Manager

Loads, renders, and manages per-client prompt templates for Retell, Vapi, and SMS.

Usage:
  from scripts.prompt_manager import PromptManager

  pm = PromptManager()
  prompt = pm.render("retell", "professional_friendly", {
      "business_name": "Summit Roofing",
      "tone": "professional_friendly",
      "services": "shingle, metal, flat",
      "area_code": "720"
  })
"""

import os
from pathlib import Path
from typing import Dict, Optional
from string import Template


class PromptManager:
    def __init__(self, prompts_dir: str = "prompts"):
        self.prompts_dir = Path(prompts_dir)
        self.cache = {}  # Simple in-memory cache

    def _get_prompt_path(self, channel: str, template_name: str) -> Path:
        """Get full path to a prompt template."""
        return self.prompts_dir / channel / f"{template_name}.txt"

    def load(self, channel: str, template_name: str) -> str:
        """Load a raw prompt template."""
        cache_key = f"{channel}:{template_name}"
        
        if cache_key in self.cache:
            return self.cache[cache_key]
        
        path = self._get_prompt_path(channel, template_name)
        
        if not path.exists():
            # Fallback to default
            fallback = self._get_prompt_path(channel, "default")
            if fallback.exists():
                print(f"WARNING: Template '{template_name}' not found for {channel}, using default")
                path = fallback
            else:
                raise FileNotFoundError(f"No template found: {path} or {fallback}")
        
        with open(path, "r") as f:
            content = f.read()
        
        self.cache[cache_key] = content
        return content

    def render(self, channel: str, template_name: str, variables: Dict[str, str]) -> str:
        """
        Render a prompt template with variables.
        
        Supports both {{ var }} and $var syntax.
        """
        template_str = self.load(channel, template_name)
        
        # Provide defaults for missing variables
        defaults = {
            "business_name": "RoofLeadHQ Client",
            "tone": "professional_friendly",
            "services": "shingle, metal, flat, gutter",
            "area_code": "000"
        }
        
        merged = {**defaults, **variables}
        
        # Support {{ var }} syntax (convert to $var for Template)
        import re
        # Replace {{ var }} with $var
        template_str = re.sub(r'\{\{\s*(\w+)\s*\}\}', r'$\1', template_str)
        
        template = Template(template_str)
        
        try:
            result = template.safe_substitute(merged)
            # Also do direct {{ var }} replacement for any remaining
            for key, value in merged.items():
                result = result.replace(f"{{{{ {key} }}}}", str(value))
                result = result.replace(f"{{{{{key}}}}}", str(value))
            return result
        except Exception as e:
            print(f"ERROR rendering template: {e}")
            return template_str  # Return raw template if rendering fails

    def list_templates(self, channel: str) -> list:
        """List all available templates for a channel."""
        channel_dir = self.prompts_dir / channel
        if not channel_dir.exists():
            return []
        
        return [p.stem for p in channel_dir.glob("*.txt")]

    def get_client_prompt(self, client_id: str, channel: str = "retell") -> str:
        """
        Get the best prompt for a specific client.
        
        Looks up client config in master-config.json and selects
        the appropriate template based on their 'tone' setting.
        """
        # Try to load client-specific tone from config
        try:
            import json
            with open("master-config.json") as f:
                config = json.load(f)
            
            client = config.get("clients", {}).get(client_id, {})
            tone = client.get("tone", "default")
            
            # Check if tone-specific template exists
            if self._get_prompt_path(channel, tone).exists():
                template_name = tone
            else:
                template_name = "default"
        except Exception:
            template_name = "default"
        
        # Load client config for variables
        try:
            import json
            with open("master-config.json") as f:
                config = json.load(f)
            client = config.get("clients", {}).get(client_id, {})
        except Exception:
            client = {}
        
        variables = {
            "business_name": client.get("business_name", client_id),
            "tone": client.get("tone", "professional_friendly"),
            "services": ", ".join(client.get("services", ["shingle", "metal", "flat"])),
            "area_code": client.get("area_code", "000")
        }
        
        return self.render(channel, template_name, variables)


# Convenience function
def get_prompt(channel: str, template_name: str, variables: Dict[str, str]) -> str:
    """Quick access to prompt rendering."""
    pm = PromptManager()
    return pm.render(channel, template_name, variables)


if __name__ == "__main__":
    # Demo
    pm = PromptManager()
    
    print("Available Retell templates:", pm.list_templates("retell"))
    
    prompt = pm.render("retell", "professional_friendly", {
        "business_name": "Summit Roofing Pros",
        "services": "shingle, metal, tile, gutter",
        "area_code": "720"
    })
    
    print("\n--- Rendered Prompt (first 300 chars) ---")
    print(prompt[:300] + "...")
    
    print("\n--- Client-specific prompt ---")
    client_prompt = pm.get_client_prompt("summit-roofing", "retell")
    print(client_prompt[:300] + "...")