import dotenv from 'dotenv';
import { monitorIncomingPayments } from './services/xrplMonitor.js';
import { triggerPayoutRequest } from './services/payoutClient.js';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

const RECEIVER = process.env.RECEIVER_WALLET!;
const ISSUER = process.env.ISSUER_WALLET!;
const CURRENCY = 'USD';

monitorIncomingPayments(RECEIVER, CURRENCY, async (amount) => {
    console.log(`[Webhook] Detected incoming ${amount} ${CURRENCY}`);

    const payout = await triggerPayoutRequest(RECEIVER, amount, CURRENCY);

    await prisma.incomingPayment.create({
        data: {
            wallet: RECEIVER,
            amount,
            currency: CURRENCY,
            payoutId: payout?.payout_id || '',
            status: payout?.success ? 'completed' : 'failed'
        }
    });

    if (payout?.success) {
        console.log(`[Webhook] ✅ Payout confirmed. Simulate USDT transfer to ${payout.superstable_wallet}`);
    } else {
        console.error(`[Webhook] ❌ Payout failed. USDT not transferred.`);
    }
});
