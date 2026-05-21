#!/usr/bin/env python3
"""
Retry Logic + Circuit Breaker for RoofLeadHQ

Provides robust retry handling and circuit breaker patterns for external API calls
(Twilio, Retell, Supabase, etc.).
"""

import time
import random
from datetime import datetime, timedelta
from functools import wraps
from typing import Callable, Optional, Any, Dict


class CircuitBreaker:
    """
    Circuit breaker pattern to prevent cascading failures.
    
    States:
    - CLOSED: Normal operation, requests pass through
    - OPEN: Failing fast, requests rejected
    - HALF_OPEN: Testing if service recovered
    """
    
    def __init__(self, name: str, failure_threshold: int = 5, 
                 recovery_timeout: int = 60, half_open_requests: int = 3):
        self.name = name
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.half_open_requests = half_open_requests
        
        self.failure_count = 0
        self.last_failure_time: Optional[datetime] = None
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN
        self.half_open_successes = 0

    def can_execute(self) -> bool:
        """Check if request can be executed."""
        if self.state == "CLOSED":
            return True
        elif self.state == "OPEN":
            if self._should_attempt_reset():
                self.state = "HALF_OPEN"
                self.half_open_successes = 0
                return True
            return False
        elif self.state == "HALF_OPEN":
            return self.half_open_successes < self.half_open_requests
        return False

    def _should_attempt_reset(self) -> bool:
        """Check if enough time has passed to try resetting."""
        if self.last_failure_time is None:
            return True
        return datetime.utcnow() - self.last_failure_time > timedelta(seconds=self.recovery_timeout)

    def record_success(self):
        """Record a successful call."""
        if self.state == "HALF_OPEN":
            self.half_open_successes += 1
            if self.half_open_successes >= self.half_open_requests:
                self._reset()
        elif self.state == "CLOSED":
            self.failure_count = max(0, self.failure_count - 1)

    def record_failure(self):
        """Record a failed call."""
        self.failure_count += 1
        self.last_failure_time = datetime.utcnow()
        
        if self.state == "HALF_OPEN":
            self.state = "OPEN"
        elif self.failure_count >= self.failure_threshold:
            self.state = "OPEN"

    def _reset(self):
        """Reset circuit breaker to closed state."""
        self.failure_count = 0
        self.state = "CLOSED"
        self.half_open_successes = 0
        self.last_failure_time = None

    def get_status(self) -> Dict[str, Any]:
        """Get current circuit breaker status."""
        return {
            "name": self.name,
            "state": self.state,
            "failure_count": self.failure_count,
            "last_failure": self.last_failure_time.isoformat() if self.last_failure_time else None
        }


# Global circuit breakers for common services
CIRCUIT_BREAKERS = {
    "twilio": CircuitBreaker("twilio", failure_threshold=5, recovery_timeout=60),
    "retell": CircuitBreaker("retell", failure_threshold=5, recovery_timeout=60),
    "supabase": CircuitBreaker("supabase", failure_threshold=3, recovery_timeout=30),
    "stripe": CircuitBreaker("stripe", failure_threshold=3, recovery_timeout=30),
}


def with_retry(max_retries: int = 3, backoff_base: float = 1.0, 
               jitter: bool = True, circuit_breaker: Optional[str] = None):
    """
    Decorator for adding retry logic with exponential backoff and circuit breaker.
    
    Args:
        max_retries: Maximum number of retry attempts
        backoff_base: Base for exponential backoff (seconds)
        jitter: Add random jitter to prevent thundering herd
        circuit_breaker: Name of circuit breaker to use (twilio, retell, supabase, etc.)
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            cb = CIRCUIT_BREAKERS.get(circuit_breaker) if circuit_breaker else None
            
            last_exception = None
            
            for attempt in range(max_retries + 1):
                # Check circuit breaker
                if cb and not cb.can_execute():
                    print(f"[CircuitBreaker:{circuit_breaker}] OPEN - failing fast")
                    raise Exception(f"Circuit breaker {circuit_breaker} is OPEN")
                
                try:
                    result = func(*args, **kwargs)
                    
                    # Record success
                    if cb:
                        cb.record_success()
                    
                    return result
                    
                except Exception as e:
                    last_exception = e
                    
                    # Record failure in circuit breaker
                    if cb:
                        cb.record_failure()
                    
                    if attempt < max_retries:
                        # Calculate backoff with optional jitter
                        delay = backoff_base * (2 ** attempt)
                        if jitter:
                            delay = delay * (0.5 + random.random())
                        
                        print(f"[Retry] {func.__name__} attempt {attempt + 1}/{max_retries + 1} failed: {e}")
                        print(f"[Retry] Waiting {delay:.2f}s before retry...")
                        time.sleep(delay)
                    else:
                        print(f"[Retry] {func.__name__} failed after {max_retries + 1} attempts: {e}")
            
            raise last_exception
        
        return wrapper
    return decorator


def get_circuit_breaker_status() -> Dict[str, Any]:
    """Get status of all circuit breakers."""
    return {name: cb.get_status() for name, cb in CIRCUIT_BREAKERS.items()}


if __name__ == "__main__":
    # Quick test
    print("Testing circuit breaker...")
    
    cb = CircuitBreaker("test", failure_threshold=2, recovery_timeout=2)
    
    # Simulate failures
    cb.record_failure()
    cb.record_failure()
    print(f"After 2 failures: {cb.get_status()}")
    print(f"Can execute: {cb.can_execute()}")
    
    # Wait for recovery
    time.sleep(2.1)
    print(f"After recovery timeout: {cb.get_status()}")
    print(f"Can execute: {cb.can_execute()}")
    
    print("\nRetry decorator test:")
    
    @with_retry(max_retries=2, backoff_base=0.1, circuit_breaker="twilio")
    def flaky_api_call():
        import random
        if random.random() < 0.7:
            raise Exception("API timeout")
        return "Success!"
    
    try:
        result = flaky_api_call()
        print(f"Result: {result}")
    except Exception as e:
        print(f"Final error: {e}")
    
    print(f"\nCircuit breaker status: {get_circuit_breaker_status()}")