import express from 'express';
import dotenv from 'dotenv';
import payoutRoutes from './routes/payout.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/payout', payoutRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`[Service B] SuperStable wallet manager running on port ${PORT}`);
});
