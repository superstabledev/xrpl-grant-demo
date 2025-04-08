-- CreateTable
CREATE TABLE "SuperStableWallet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "seed" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "receiver" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "payoutId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'success',
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperStableWallet_address_key" ON "SuperStableWallet"("address");
