import { Router, Request, Response } from 'express';

const router = Router();

function normalizePhone(phone: unknown): string | null {
  if (!phone) return null;

  const cleaned = String(phone).replace(/[^0-9+]/g, '').trim();

  if (cleaned.startsWith('+') && cleaned.length >= 8) {
    return cleaned;
  }

  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }

  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }

  return null;
}

router.post('/call-completed', (req: Request, res: Response) => {
  const payload = req.body;

  const providerCallId = payload?.call?.id || payload?.provider_call_id;
  const callerPhone = normalizePhone(payload?.call?.customer?.phone || payload?.caller_phone);
  const destinationNumber = normalizePhone(payload?.call?.to || payload?.roofer_destination_number);

  if (!providerCallId || !callerPhone || !destinationNumber) {
    return res.status(400).json({
      ok: false,
      error: 'missing_required_field'
    });
  }

  return res.status(200).json({
    ok: true,
    dry_run: true,
    message: 'Vapi webhook route received payload. Supabase writes are not enabled in this scaffold.',
    normalized: {
      provider_call_id: providerCallId,
      caller_phone: callerPhone,
      roofer_destination_number: destinationNumber,
      appointment_booked: payload?.call?.structured_data?.appointment_booked === true,
      appointment_requested: payload?.call?.structured_data?.appointment_requested === true,
      appointment_time: payload?.call?.structured_data?.appointment_time || null
    }
  });
});

export default router;
