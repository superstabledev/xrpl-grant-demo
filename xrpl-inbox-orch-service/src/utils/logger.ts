export const logTransaction = (msg: string) => {
    console.log(`[${new Date().toISOString()}] ${msg}`);
};
