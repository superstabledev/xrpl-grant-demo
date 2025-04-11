import axios from 'axios';
export const triggerPayoutRequest = async (wallet, amount, currency) => {
    try {
        const res = await axios.post('http://localhost:4000/payout', {
            receiver_wallet: wallet,
            amount,
            currency,
            reference: `txn_${Date.now()}`
        });
        return res.data;
    }
    catch (err) {
        console.error('[Service A] Error calling Service B:', err.message);
        return null;
    }
};
