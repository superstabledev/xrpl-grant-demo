import { callSuperStableAPI } from './superstableApi';
import { getSuperStableAsscWallet } from './walletManager';
import { logTransaction } from '../utils/logger';

interface PayoutReq {
    receiver_wallet: string;
    amount: string;
    currency: string;
    reference?: string;
}

export const processPayoutRequest = async ({ receiver_wallet, amount, currency, reference }: PayoutReq) => {
    logTransaction(`[Service B] Initiating payout for ${amount} ${currency} to ${receiver_wallet}`);

    const payoutConfirmed = await callSuperStableAPI(receiver_wallet, amount);

    if (!payoutConfirmed) {
        return { success: false, message: 'Payout failed' };
    }

    const superstableWallet = await getSuperStableAsscWallet();

    logTransaction(`[Service B] Payout successful. Return wallet to settle: ${superstableWallet.address}`);

    return {
        success: true,
        payout_id: `ss_txn_${Date.now()}`,
        superstable_wallet: superstableWallet.address
    };
};
