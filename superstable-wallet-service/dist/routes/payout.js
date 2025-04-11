import express from 'express';
import { processPayoutRequest } from '../services/payoutProcessor.js';
const router = express.Router();
router.post('/', async (req, res) => {
    const { receiver_wallet, amount, currency, reference } = req.body;
    if (!receiver_wallet || !amount || !currency) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const result = await processPayoutRequest({ receiver_wallet, amount, currency, reference });
        res.json(result);
    }
    catch (err) {
        console.error('[Service B] Payout error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export default router;
