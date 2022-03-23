/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `transactions_credit_card` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `transactions_account` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `transactions_account` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `transactions_account` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `transactions_account` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `transactions_account` table. All the data in the column will be lost.
  - Added the required column `movement` to the `transactions_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `transactions_account` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions_credit_card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "installments" INTEGER,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isForeign" BOOLEAN NOT NULL,
    "online" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "transactions_credit_card_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transactions_credit_card" ("accountId", "amount", "category", "createdAt", "externalId", "id", "installments", "isForeign", "online", "title") SELECT "accountId", "amount", "category", "createdAt", "externalId", "id", "installments", "isForeign", "online", "title" FROM "transactions_credit_card";
DROP TABLE "transactions_credit_card";
ALTER TABLE "new_transactions_credit_card" RENAME TO "transactions_credit_card";
CREATE INDEX "transactions_credit_card_externalId_idx" ON "transactions_credit_card"("externalId");
CREATE UNIQUE INDEX "transactions_credit_card_externalId_key" ON "transactions_credit_card"("externalId");
CREATE TABLE "new_transactions_account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "movement" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "transactions_account_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transactions_account" ("accountId", "amount", "createdAt", "externalId", "id", "title") SELECT "accountId", "amount", "createdAt", "externalId", "id", "title" FROM "transactions_account";
DROP TABLE "transactions_account";
ALTER TABLE "new_transactions_account" RENAME TO "transactions_account";
CREATE INDEX "transactions_account_externalId_idx" ON "transactions_account"("externalId");
CREATE UNIQUE INDEX "transactions_account_externalId_key" ON "transactions_account"("externalId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
