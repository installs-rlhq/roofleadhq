import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'RoofLeadHQ backend is running' });
});

// Placeholder for future routes
// app.use('/api/leads', leadRoutes);
// app.use('/api/calls', callRoutes);

app.listen(PORT, () => {
  console.log(`🚀 RoofLeadHQ backend running on port ${PORT}`);
});
