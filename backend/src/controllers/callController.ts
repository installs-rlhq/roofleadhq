import { Request, Response } from 'express';
import callService from '../services/callService';

export const logCall = async (req: Request, res: Response) => {
  try {
    const call = await callService.logCall(req.body);
    res.status(201).json(call);
  } catch (error) {
    res.status(500).json({ error: 'Failed to log call' });
  }
};

export const getCalls = async (req: Request, res: Response) => {
  try {
    const calls = await callService.getCalls();
    res.json(calls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch calls' });
  }
};
