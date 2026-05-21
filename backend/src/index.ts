import express from 'express';
import config from './config/config';
import leadsRouter from './routes/leads';
import callsRouter from './routes/calls';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = config.port;

app.use(express.json());

// Routes
app.use('/api/leads', leadsRouter);
app.use('/api/calls', callsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'RoofLeadHQ backend is running',
    environment: config.nodeEnv,
  });
});

// Error handling (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 RoofLeadHQ backend running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
