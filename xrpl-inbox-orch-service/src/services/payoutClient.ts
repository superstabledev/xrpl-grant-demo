import axios from 'axios';

export const triggerPayoutRequest = async (wallet: string, amount: string, currency: string) => {
    try {
        const res = await axios.post('http://localhost:4000/payout', {
            receiver_wallet: wallet,
            amount,
            currency,
            reference: `txn_${Date.now()}`
        });
        return res.data;
    } catch (err: any) {
        console.error('[Service A] Error calling Service B:', err.message);
        return null;
    }
};
