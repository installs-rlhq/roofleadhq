#!/usr/bin/env python3
"""
Structured Logging + Observability for RoofLeadHQ

Provides JSON logging, pipeline run tracking, and metrics collection.
Integrates with Supabase pipeline_runs table for centralized observability.
"""

import json
import sys
from datetime import datetime
from typing import Any, Dict, Optional
from contextlib import contextmanager


class StructuredLogger:
    """
    Structured logger that outputs JSON and optionally writes to Supabase.
    """
    
    def __init__(self, service_name: str = "roofleadhq", 
                 supabase_client=None, log_to_stdout: bool = True):
        self.service_name = service_name
        self.supabase = supabase_client
        self.log_to_stdout = log_to_stdout
        self.context = {}

    def set_context(self, **kwargs):
        """Set persistent context for all log messages."""
        self.context.update(kwargs)

    def clear_context(self):
        """Clear persistent context."""
        self.context = {}

    def _log(self, level: str, message: str, **extra):
        """Core logging method."""
        log_entry = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "service": self.service_name,
            "level": level,
            "message": message,
            **self.context,
            **extra
        }
        
        if self.log_to_stdout:
            print(json.dumps(log_entry, default=str))
            sys.stdout.flush()
        
        return log_entry

    def info(self, message: str, **extra):
        """Log info level message."""
        return self._log("INFO", message, **extra)

    def warning(self, message: str, **extra):
        """Log warning level message."""
        return self._log("WARN", message, **extra)

    def error(self, message: str, **extra):
        """Log error level message."""
        return self._log("ERROR", message, **extra)

    def debug(self, message: str, **extra):
        """Log debug level message."""
        return self._log("DEBUG", message, **extra)

    def log_pipeline_start(self, pipeline_name: str, client_id: Optional[str] = None,
                           lead_id: Optional[str] = None, input_data: Optional[Dict] = None) -> str:
        """Log pipeline start and return a run_id for tracking."""
        run_id = f"{pipeline_name}-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{hash(str(input_data)) % 10000}"
        
        log_entry = self.info(
            f"Pipeline started: {pipeline_name}",
            event_type="pipeline_start",
            pipeline_name=pipeline_name,
            client_id=client_id,
            lead_id=lead_id,
            run_id=run_id,
            input=input_data
        )
        
        # Write to Supabase if available
        if self.supabase:
            try:
                self.supabase.table("pipeline_runs").insert({
                    "pipeline_name": pipeline_name,
                    "client_id": client_id,
                    "lead_id": lead_id,
                    "status": "running",
                    "input": input_data or {},
                    "started_at": datetime.utcnow().isoformat()
                }).execute()
            except Exception as e:
                self.warning(f"Failed to write pipeline run to Supabase: {e}")
        
        return run_id

    def log_pipeline_end(self, run_id: str, pipeline_name: str, status: str,
                         output: Optional[Dict] = None, error: Optional[str] = None):
        """Log pipeline completion."""
        self.info(
            f"Pipeline {status}: {pipeline_name}",
            event_type="pipeline_end",
            pipeline_name=pipeline_name,
            run_id=run_id,
            status=status,
            output=output,
            error=error
        )
        
        # Update Supabase record
        if self.supabase:
            try:
                self.supabase.table("pipeline_runs").update({
                    "status": status,
                    "output": output or {},
                    "error": error,
                    "completed_at": datetime.utcnow().isoformat()
                }).eq("id", run_id).execute()
            except Exception as e:
                self.warning(f"Failed to update pipeline run in Supabase: {e}")

    @contextmanager
    def pipeline_context(self, pipeline_name: str, client_id: Optional[str] = None,
                         lead_id: Optional[str] = None, input_data: Optional[Dict] = None):
        """Context manager for automatic pipeline start/end logging."""
        run_id = self.log_pipeline_start(pipeline_name, client_id, lead_id, input_data)
        try:
            yield run_id
            self.log_pipeline_end(run_id, pipeline_name, "success")
        except Exception as e:
            self.log_pipeline_end(run_id, pipeline_name, "failed", error=str(e))
            raise


# Global logger instance
_logger: Optional[StructuredLogger] = None


def get_logger() -> StructuredLogger:
    """Get or create the global logger instance."""
    global _logger
    if _logger is None:
        _logger = StructuredLogger()
    return _logger


def configure_logger(service_name: str = "roofleadhq", supabase_client=None):
    """Configure the global logger."""
    global _logger
    _logger = StructuredLogger(service_name=service_name, supabase_client=supabase_client)


# Convenience functions
def log_info(message: str, **extra):
    return get_logger().info(message, **extra)


def log_error(message: str, **extra):
    return get_logger().error(message, **extra)


def log_warning(message: str, **extra):
    return get_logger().warning(message, **extra)


if __name__ == "__main__":
    # Demo
    logger = StructuredLogger("roofleadhq-demo")
    logger.set_context(environment="development", version="0.1.0")
    
    logger.info("System initialized")
    logger.warning("Config value missing, using default", key="twilio.account_sid")
    
    with logger.pipeline_context("lead-intake", client_id="acme-roofing", 
                                  input_data={"source": "facebook"}) as run_id:
        logger.info("Processing lead", lead_phone="+18135551234")
        logger.info("Lead enriched", score=85, tags=["high_intent"])
        # Simulate work
        import time
        time.sleep(0.5)
    
    logger.error("External API failed", service="retell", error_code="timeout")
    
    print("\n--- Logger demo complete ---")