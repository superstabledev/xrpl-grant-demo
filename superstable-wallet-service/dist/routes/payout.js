import express from 'express';
import { handleQuoteRequest, handleTransferRequest, getPayoutStatus } from '../services/superstableApi.js';
const router = express.Router();
router.post('/quote', handleQuoteRequest);
router.post('/transfers', handleTransferRequest);
router.get('/:reference', getPayoutStatus);
export default router;
