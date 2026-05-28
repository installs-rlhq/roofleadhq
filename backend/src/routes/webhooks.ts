import { Router, Request, Response } from 'express';
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import config from '../config/config';
import leadService from '../services/leadService';
import { createManualOutreach } from '../services/manual-outreach.service';

const router = Router();

// Facebook / Google / Website form submissions
router.post('/forms', async (req: Request, res: Response) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json({ message: 'Lead created from form', lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process form submission' });
  }
});

// Dry-run Twilio Manual Outreach webhook
router.post(
  '/twilio/manual-outreach',
  express.urlencoded({ extended: false }),
  async (req: Request, res: Response) => {
    const { To, From, Body, MessageSid } = req.body;

    if (!To || !From || !Body) {
      return res.status(400).send('Missing required Twilio fields');
    }

    // Service role client for roofer lookup
    if (!config.supabaseServiceRoleKey) {
      console.error('Required server configuration is missing for Twilio manual outreach webhook');
      return res.status(500).send('Server configuration error');
    }

    const supabaseService = createClient(
      config.supabaseUrl,
      config.supabaseServiceRoleKey
    );

    try {
      // 1. Find roofer by twilio_number
      const { data: roofer, error: rooferError } = await supabaseService
        .from('roofers')
        .select('id')
        .eq('twilio_number', To)
        .single();

      if (rooferError || !roofer) {
        return res.status(404).send('Roofer not found for this Twilio number');
      }

      // 2. Parse Body for phone and source
      const body = Body.trim();
      const phoneMatch = body.match(/(\+[1-9]\d{1,14})/);
      const homeownerPhone = phoneMatch ? phoneMatch[1] : null;

      if (!homeownerPhone) {
        return res.status(400).send('No valid E.164 phone number found in Body');
      }

      const lowerBody = body.toLowerCase();
      let sourceDetail = 'unknown';
      if (lowerBody.includes('angi')) sourceDetail = 'angi';
      else if (lowerBody.includes('thumbtack')) sourceDetail = 'thumbtack';
      else if (lowerBody.includes('referral')) sourceDetail = 'referral';
      else if (lowerBody.includes('homeadvisor')) sourceDetail = 'homeadvisor';
      else if (lowerBody.includes('other')) sourceDetail = 'other';

      // 3. Call service with Twilio context
      await createManualOutreach({
        roofer_id: roofer.id,
        homeowner_phone: homeownerPhone,
        source_detail: sourceDetail,
        source_context: {
          twilio_from: From,
          twilio_to: To,
          message_sid: MessageSid,
          inbound_body: Body,
          webhook_source: 'twilio_manual_outreach'
        }
      });

      // 4. Return empty TwiML (dry-run)
      res.set('Content-Type', 'text/xml');
      return res.send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');

    } catch (err: any) {
      console.error('Twilio manual outreach error:', err.message);
      return res.status(500).send('Internal error');
    }
  }
);

export default router;
