import { Client } from 'xrpl';
export const monitorIncomingPayments = async (wallet, currency, callback) => {
    const client = new Client('wss://testnet.xrpl-labs.com', {
        connectionTimeout: 15000, // 15 seconds
    });
    await client.connect();
    client.on('transaction', (event) => {
        const tx = event.transaction;
        if (tx.TransactionType === 'Payment' &&
            tx.Destination === wallet &&
            typeof tx.Amount === 'object' &&
            tx.Amount.currency === currency) {
            const amt = tx.Amount.value;
            console.log(`[Monitor] Incoming Payment: ${amt} ${currency}`);
            callback(amt);
        }
    });
    await client.request({ command: 'subscribe', accounts: [wallet] });
    console.log(`[Monitor] Subscribed to XRPL for ${wallet}`);
};
