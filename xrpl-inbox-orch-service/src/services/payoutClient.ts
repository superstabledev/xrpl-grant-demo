import axios from 'axios';

export const triggerPayoutRequest = async (wallet: string, amount: string, currency: string) => {
    try {
        // Step 1: Get a quote from Service B
        const quoteRes = await axios.post('http://localhost:4000/payout/quote', {
            receiver: wallet,
            amount,
            currency
        });

        const quote_id = quoteRes.data.quote_id;

        // Step 2: Trigger payout using quote_id
        const payoutRes = await axios.post('http://localhost:4000/payout/transfers', {
            quote_id,
            receiver_wallet: wallet,
            amount
        });

        return payoutRes.data;
    } catch (err: any) {
        console.error('[Service A] Error calling Service B:', err.message);
        return null;
    }
};
