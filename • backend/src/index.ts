import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('RoofLeadHQ Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
