import { logTransaction } from '../utils/logger';

export const callSuperStableAPI = async (receiver: string, amount: string): Promise<boolean> => {
    try {
        logTransaction(`[MockAPI] POST /transfers → Initiating INR payout for ${receiver} of ₹${amount}`);

        // Simulate network delay
        await new Promise((res) => setTimeout(res, 1000));

        // Simulate success
        logTransaction(`[MockAPI] ✅ SuperStable payout processed successfully`);
        return true;
    } catch (error) {
        console.error(`[MockAPI] ❌ Error calling SuperStable API:`, error);
        return false;
    }
};
