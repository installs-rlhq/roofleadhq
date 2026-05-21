import express from 'express';
import config from './config/config';
import leadsRouter from './routes/leads';
import callsRouter from './routes/calls';
import webhooksRouter from './routes/webhooks';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = config.port;

app.use(express.json());

// Routes
app.use('/api/leads', leadsRouter);
app.use('/api/calls', callsRouter);
app.use('/webhooks', webhooksRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'RoofLeadHQ backend is running',
    environment: config.nodeEnv,
  });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 RoofLeadHQ backend running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
