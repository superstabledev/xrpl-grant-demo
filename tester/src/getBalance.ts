import 'dotenv/config';
import { Client } from 'xrpl';

const client = new Client('wss://testnet.xrpl-labs.com', {
    connectionTimeout: 15000,
});
const ADDRESS = process.env.SUPERSTABLE_WALLET!;
const CURRENCY = process.env.CURRENCY!;
const ISSUER_ADDRESS = process.env.RECEIVER_ADDRESS!;

async function checkBalance() {
    await client.connect();
    console.log(`[Balance] Connected to XRPL`);

    const response = await client.request({
        command: 'account_lines',
        account: ADDRESS
    });

    const balanceLine = response.result.lines.find(
        (line: any) => line.currency === CURRENCY && line.account === ISSUER_ADDRESS
    );

    if (balanceLine) {
        console.log(`[Balance] 💰 ${ADDRESS} holds ${balanceLine.balance} ${CURRENCY} (issued by ${ISSUER_ADDRESS})`);
    } else {
        console.log(`[Balance] No ${CURRENCY} balance or trustline from ${ISSUER_ADDRESS}`);
    }

    await client.disconnect();
}

checkBalance().catch(console.error);
