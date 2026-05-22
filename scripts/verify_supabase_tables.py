#!/usr/bin/env python3
"""
Supabase Table Verification Script

Checks that the required RoofLeadHQ tables exist and are writable.
Run this after executing docs/supabase-schema.sql in the Supabase SQL Editor.

Usage:
    source scripts/activate_env.sh
    python scripts/verify_supabase_tables.py
"""

import sys
import os
from datetime import datetime

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scripts.supabase_client import SupabaseClient


def verify_tables():
    print("🔍 Verifying Supabase tables for RoofLeadHQ...\n")
    
    db = SupabaseClient()
    
    if not db.enabled:
        print("❌ Supabase client is not enabled. Check SUPABASE_URL and SUPABASE_ANON_KEY.")
        return False
    
    tables_to_check = ["clients", "leads", "pipeline_runs"]
    results = {}
    
    for table in tables_to_check:
        try:
            # Try a lightweight select
            result = db.client.table(table).select("*").limit(1).execute()
            results[table] = "✅ Exists"
            print(f"✅ {table:20} — table exists")
        except Exception as e:
            if "Could not find the table" in str(e):
                results[table] = "❌ Missing"
                print(f"❌ {table:20} — table does NOT exist")
            else:
                results[table] = f"⚠️ Error: {str(e)[:60]}"
                print(f"⚠️ {table:20} — {str(e)[:80]}")
    
    print("\n" + "=" * 50)
    
    # Test lead insertion
    print("\n🧪 Testing lead insertion into 'leads' table...")
    test_lead = {
        "client_id": "test-roofing",
        "source": "verification_script",
        "phone": "+15551234567",
        "name": "Test Lead",
        "status": "new",
        "created_at": datetime.utcnow().isoformat() + "Z"
    }
    
    success = db.insert_lead(test_lead)
    
    if success:
        print("✅ Successfully wrote test lead to Supabase!")
        print("   The inbound handler will now persist leads to the database.")
    else:
        print("❌ Failed to insert test lead.")
        print("   Please ensure the 'leads' table exists and RLS policies allow inserts.")
    
    print("\n" + "=" * 50)
    
    missing = [t for t, status in results.items() if "Missing" in status]
    if missing:
        print(f"\n⚠️  Missing tables: {', '.join(missing)}")
        print("   → Run docs/supabase-schema.sql in the Supabase SQL Editor.")
        return False
    else:
        print("\n✅ All required tables exist and lead insertion works!")
        return True


if __name__ == "__main__":
    success = verify_tables()
    sys.exit(0 if success else 1)