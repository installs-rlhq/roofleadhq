#!/usr/bin/env node

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const { runVapiCalendarSyncDryRun } = require('../dist/services/vapi-calendar-sync.service');

(async () => {
  try {
    const result = await runVapiCalendarSyncDryRun();

    console.log('=== Vapi Calendar Sync (Dry Run) ===');
    console.log(`Eligible bookings found: ${result.eligibleCount}`);
    console.log(`Reason: ${result.reason}`);
    console.log('No Calendar events created.');
    console.log('No SMS sent.');
  } catch (error) {
    console.error('Vapi Calendar Sync dry run failed:', error.message);
    process.exit(1);
  }
})();
