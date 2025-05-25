import { Client, Wallet } from 'xrpl';
import dotenv from 'dotenv';
dotenv.config();
const RECEIVER_SECRET = process.env.RECEIVER_SEED;
const ISSUER_ADDRESS = process.env.ISSUER_WALLET;
const RECEIVER_ADDRESS = process.env.RECEIVER_WALLET;
const CURRENCY = "USD";
export const transferToSuperStable = async (amount, destination_wallet) => {
    const client = new Client('wss://testnet.xrpl-labs.com', {
        connectionTimeout: 15000,
    });
    const wallet = Wallet.fromSeed(RECEIVER_SECRET);
    await client.connect();
    const tx = {
        TransactionType: 'Payment',
        Account: wallet.classicAddress,
        Destination: destination_wallet,
        Amount: {
            currency: CURRENCY,
            issuer: RECEIVER_ADDRESS,
            value: amount
        }
    };
    const prepared = await client.autofill(tx);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
    const status = result.result.meta?.TransactionResult ?? 'UNKNOWN';
    console.log(`[Settle] ✅ Transferred ${amount} ${CURRENCY} to SuperStable Associated Wallet : ${destination_wallet} | TX Status: ${status}`);
    await client.disconnect();
};
