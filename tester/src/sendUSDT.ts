import 'dotenv/config';
import { Client, Wallet, Payment } from 'xrpl';
import { setTrustline } from './setupTrustline.js';

const client = new Client('wss://s.altnet.rippletest.net:51233', { connectionTimeout: 10000 });
// await setTrustline();
const CURRENCY = process.env.CURRENCY!;
const RECEIVER = process.env.RECEIVER_ADDRESS!;
const ISSUER_WALLET = Wallet.fromSeed(process.env.ISSUER_SEED!);

async function sendUSDT() {
    await client.connect();
    console.log('[Tester] Connected to XRPL Testnet');

    const amount = {
        currency: CURRENCY,
        issuer: ISSUER_WALLET.classicAddress,
        value: '100'
    };

    const tx: Payment = {
        TransactionType: 'Payment',
        Account: ISSUER_WALLET.classicAddress,
        Destination: RECEIVER,
        Amount: amount
    };

    const prepared = await client.autofill(tx);
    const signed = ISSUER_WALLET.sign(prepared);
    const result: any = await client.submitAndWait(signed.tx_blob);

    const txResult = result.result.meta?.TransactionResult ?? 'UNKNOWN';
    console.log(`[Tester] ✅ Sent ${amount.value} ${CURRENCY} to ${RECEIVER}`);
    console.log('TX Result:', txResult);

    await client.disconnect();
}

sendUSDT().catch(console.error);
