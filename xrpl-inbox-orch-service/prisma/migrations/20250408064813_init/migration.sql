-- CreateTable
CREATE TABLE "IncomingPayment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wallet" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payoutId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending'
);
