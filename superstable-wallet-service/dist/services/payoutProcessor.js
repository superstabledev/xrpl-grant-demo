import { callSuperStableAPI } from './superstableApi.js';
import { getSuperStableAsscWallet } from './walletManager.js';
import { logTransaction } from '../utils/logger.js';
export const processPayoutRequest = async ({ receiver_wallet, amount, currency, reference }) => {
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
