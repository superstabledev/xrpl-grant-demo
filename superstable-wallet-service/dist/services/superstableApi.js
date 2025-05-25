import { PrismaClient } from '@prisma/client';
import { getSuperStableAsscWallet } from './walletManager.js';
import { logTransaction } from '../utils/logger.js';
const prisma = new PrismaClient();
export const handleQuoteRequest = async (req, res) => {
    const { amount, currency, receiver } = req.body;
    const quoteId = `quote_${Date.now()}`;
    // Dummy call example to SuperStable /quote endpoint
    await fetch("https://superstablecontainerapp.politecoast-3c06f7f1.eastus.azurecontainerapps.io/partner/api/quote", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": "YOUR_SUPERSTABLE_API_KEY",
            "Authorization": `Bearer <partner_access_token>`
        },
        body: JSON.stringify({
            sender_id: "your-xrpl-sender-id",
            receiver_id: receiver,
            currency,
            amount
        })
    }).catch(() => null); // ignore failure
    await prisma.quote.create({
        data: { quoteId, amount, currency, receiver }
    });
    logTransaction(`[MockAPI] 💱 Created quote for ₹${amount} to ${receiver} → ID: ${quoteId}`);
    res.json({ quote_id: quoteId, expires_in: 300 });
};
export const handleTransferRequest = async (req, res) => {
    const { quote_id, receiver_wallet, amount } = req.body;
    const payoutId = `ss_txn_${Date.now()}`;
    const superstableWallet = await getSuperStableAsscWallet();
    // Dummy call example to SuperStable /transfers endpoint
    await fetch("https://superstablecontainerapp.politecoast-3c06f7f1.eastus.azurecontainerapps.io/partner/api/transfers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": "YOUR_SUPERSTABLE_API_KEY",
            "Authorization": `Bearer <partner_access_token>`
        },
        body: JSON.stringify({
            quote_id,
            sender_id: "your-xrpl-sender-id",
            receiver_id: receiver_wallet
        })
    }).catch(() => null);
    await prisma.payout.create({
        data: {
            receiver: receiver_wallet,
            amount,
            quoteId: quote_id,
            payoutId,
            status: 'success'
        }
    });
    logTransaction(`[MockAPI] ✅ Payout processed. Receiver: ${receiver_wallet}, Quote: ${quote_id}`);
    res.json({
        success: true,
        payout_id: payoutId,
        superstable_wallet: superstableWallet.address,
        superstable_wallet_seed: superstableWallet.seed
    });
};
export const getPayoutStatus = async (req, res) => {
    const { reference } = req.params;
    const payout = await prisma.payout.findFirst({ where: { payoutId: reference } });
    if (!payout)
        return res.status(404).json({ error: 'Payout not found' });
    const wallet = await getSuperStableAsscWallet();
    res.json({
        payout_id: payout.payoutId,
        receiver: payout.receiver,
        amount: payout.amount,
        status: payout.status,
        settled_to: wallet.address
    });
};
