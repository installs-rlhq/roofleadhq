import { Router, Request, Response } from 'express';
import express from 'express';
import twilio from 'twilio';
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
  express.urlencoded({
    extended: false,
    verify: (req, res, buf) => {
      (req as any).rawBody = buf.toString('utf8');
    }
  }),
  async (req: Request, res: Response) => {
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioSignature = req.header('X-Twilio-Signature');

    if (!authToken) {
      console.error('TWILIO_AUTH_TOKEN is not configured');
      res.set('Content-Type', 'text/xml');
      return res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
    }

    if (!twilioSignature) {
      res.set('Content-Type', 'text/xml');
      return res.status(403).send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
    }

    const protocol = req.get('x-forwarded-proto') || req.protocol;
    const url = `${protocol}://${req.get('host')}${req.originalUrl}`;
    const isValid = twilio.validateRequest(authToken, twilioSignature, url, req.body);

    if (!isValid) {
      res.set('Content-Type', 'text/xml');
      return res.status(403).send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
    }

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

      // 2. Duplicate MessageSid check after roofer is known
      if (MessageSid) {
        const { data: existingEvent, error: duplicateError } = await supabaseService
          .from('workflow_events')
          .select('id')
          .eq('roofer_id', roofer.id)
          .eq('event_type', 'manual_outreach_received')
          .eq('metadata->>message_sid', MessageSid)
          .maybeSingle();

        if (duplicateError) {
          console.error('Duplicate MessageSid check failed');
          res.set('Content-Type', 'text/xml');
          return res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
        }

        if (existingEvent) {
          res.set('Content-Type', 'text/xml');
          return res.status(200).send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
        }
      }

      // 3. Parse Body for phone and source
      const body = Body.trim();
      const phoneMatch = body.match(/(\+[1-9]\d{1,14})/);
      const homeownerPhone = phoneMatch ? phoneMatch[1] : null;

      if (!homeownerPhone) {
        res.set('Content-Type', 'text/xml');
        return res.status(200).send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
      }

      const lowerBody = body.toLowerCase();
      let sourceDetail = 'unknown';
      let command: 'start' | 'pause' | 'stop' | undefined;

      if (lowerBody.startsWith('start ')) {
        command = 'start';
      } else if (lowerBody.startsWith('pause ')) {
        command = 'pause';
      } else if (lowerBody.startsWith('stop ')) {
        command = 'stop';
      }

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
        command,
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
