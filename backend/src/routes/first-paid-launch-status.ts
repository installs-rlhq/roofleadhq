import { getFirstPaidLaunchStatusContract } from '../services/first-paid-launch-status-contract.service';
// first-paid-launch-status-contract.service.ts

// Test-safe read-only status contract module.
// This module is NOT registered in any production router.
// It exists only for local smoke verification and future controlled internal use.

export function getFirstPaidLaunchStatus() {
  return getFirstPaidLaunchStatusContract();
}
