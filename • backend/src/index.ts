import express from 'express';
import config from './config/config';

const app = express();
const PORT = config.port;

app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'RoofLeadHQ backend is running',
    environment: config.nodeEnv 
  });
});

// Placeholder routes (we'll build these next)
// app.use('/api/leads', leadRoutes);

app.listen(PORT, () => {
  console.log(`🚀 RoofLeadHQ backend running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
