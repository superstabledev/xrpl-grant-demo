import 'dotenv/config';
import { Client, Wallet, TrustSet } from 'xrpl';

const client = new Client('wss://s.altnet.rippletest.net:51233');

const RECEIVER_SEED = process.env.RECEIVER_SEED!;
const ISSUER_ADDRESS = process.env.ISSUER_ADDRESS!;
const CURRENCY = process.env.CURRENCY!;
const receiverWallet = Wallet.fromSeed(RECEIVER_SEED);

export async function setTrustline() {
    await client.connect();
    console.log('[Trustline] Connected to XRPL Testnet');

    const tx: TrustSet = {
        TransactionType: 'TrustSet',
        Account: receiverWallet.classicAddress,
        LimitAmount: {
            currency: CURRENCY,
            issuer: ISSUER_ADDRESS,
            value: '1000000000'
        }
    };

    const prepared = await client.autofill(tx);
    const signed = receiverWallet.sign(prepared);
    const result: any = await client.submitAndWait(signed.tx_blob);

    const status = result.result.meta?.TransactionResult ?? 'UNKNOWN';
    console.log(`[Trustline] ✅ Trustline created. Result: ${status}`);

    await client.disconnect();
}

setTrustline().catch(console.error);
