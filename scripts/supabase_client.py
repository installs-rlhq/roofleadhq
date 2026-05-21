#!/usr/bin/env python3
"""
RoofLeadHQ Supabase Client Wrapper

Provides a clean, resilient interface to Supabase for:
- Clients table
- Leads table
- Pipeline runs (for monitoring/reporting)

Falls back gracefully if Supabase is not configured.

Usage:
  from scripts.supabase_client import SupabaseClient

  db = SupabaseClient()
  db.insert_lead({...})
  db.get_client("summit-roofing")
"""

import os
import json
from typing import Dict, Any, List, Optional
from datetime import datetime

try:
    from supabase import create_client, Client
    SUPABASE_AVAILABLE = True
except ImportError:
    SUPABASE_AVAILABLE = False


class SupabaseClient:
    def __init__(self, url: str = None, key: str = None):
        self.url = url or os.getenv("SUPABASE_URL")
        self.key = key or os.getenv("SUPABASE_ANON_KEY")
        self.client: Optional[Client] = None
        self.enabled = False
        
        if SUPABASE_AVAILABLE and self.url and self.key:
            try:
                self.client = create_client(self.url, self.key)
                self.enabled = True
                print("✅ Supabase client initialized")
            except Exception as e:
                print(f"⚠️ Supabase init failed: {e}")
        else:
            print("ℹ️ Supabase not configured — running in mock mode")
    
    def _is_enabled(self) -> bool:
        return self.enabled and self.client is not None
    
    # === CLIENTS ===
    def get_client(self, client_id: str) -> Optional[Dict[str, Any]]:
        if not self._is_enabled():
            return {"id": client_id, "business_name": client_id, "status": "mock"}
        try:
            result = self.client.table("clients").select("*").eq("id", client_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Supabase error (get_client): {e}")
            return None
    
    def upsert_client(self, client_data: Dict[str, Any]) -> bool:
        if not self._is_enabled():
            print(f"[MOCK] Upserted client: {client_data.get('id')}")
            return True
        try:
            self.client.table("clients").upsert(client_data).execute()
            return True
        except Exception as e:
            print(f"Supabase error (upsert_client): {e}")
            return False
    
    # === LEADS ===
    def insert_lead(self, lead: Dict[str, Any]) -> Optional[str]:
        if not self._is_enabled():
            lead_id = f"mock_lead_{datetime.utcnow().strftime('%H%M%S')}"
            print(f"[MOCK] Inserted lead: {lead_id}")
            return lead_id
        try:
            result = self.client.table("leads").insert(lead).execute()
            return result.data[0]["id"] if result.data else None
        except Exception as e:
            print(f"Supabase error (insert_lead): {e}")
            return None
    
    def get_leads(self, client_id: str = None, limit: int = 50) -> List[Dict[str, Any]]:
        if not self._is_enabled():
            return []
        try:
            query = self.client.table("leads").select("*").limit(limit)
            if client_id:
                query = query.eq("client_id", client_id)
            result = query.execute()
            return result.data or []
        except Exception as e:
            print(f"Supabase error (get_leads): {e}")
            return []
    
    def update_lead(self, lead_id: str, updates: Dict[str, Any]) -> bool:
        if not self._is_enabled():
            print(f"[MOCK] Updated lead {lead_id}")
            return True
        try:
            self.client.table("leads").update(updates).eq("id", lead_id).execute()
            return True
        except Exception as e:
            print(f"Supabase error (update_lead): {e}")
            return False
    
    # === PIPELINE RUNS ===
    def log_pipeline_run(self, run: Dict[str, Any]) -> bool:
        if not self._is_enabled():
            print(f"[MOCK] Logged pipeline run: {run.get('pipeline')}")
            return True
        try:
            self.client.table("pipeline_runs").insert(run).execute()
            return True
        except Exception as e:
            print(f"Supabase error (log_pipeline_run): {e}")
            return False
    
    def get_recent_pipeline_runs(self, hours: int = 24) -> List[Dict[str, Any]]:
        if not self._is_enabled():
            return []
        try:
            since = (datetime.utcnow() - timedelta(hours=hours)).isoformat()
            result = self.client.table("pipeline_runs").select("*").gte("started_at", since).execute()
            return result.data or []
        except Exception as e:
            print(f"Supabase error (get_recent_pipeline_runs): {e}")
            return []


# Global instance
_db: Optional[SupabaseClient] = None

def get_supabase() -> SupabaseClient:
    global _db
    if _db is None:
        _db = SupabaseClient()
    return _db


if __name__ == "__main__":
    db = get_supabase()
    print(f"Supabase enabled: {db.enabled}")
    print("Supabase client ready.")