import { Wallet } from 'xrpl';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSuperStableAsscWallet = async (): Promise<{ address: string; seed: string }> => {
    const existing = await prisma.superStableWallet.findFirst();

    if (existing) {
        console.log(existing.seed)
        return { address: existing.address, seed: existing.seed };
    }

    const wallet = Wallet.generate();
    await prisma.superStableWallet.create({
        data: {
            address: wallet.classicAddress,
            seed: wallet.seed!
        }
    });

    return { address: wallet.classicAddress, seed: wallet.seed! };
};
