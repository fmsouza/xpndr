/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `categoryId` on the `transactions_account` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `transactions_credit_card` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `transactions_credit_card` table. All the data in the column will be lost.
  - Added the required column `category` to the `transactions_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `transactions_credit_card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isForeign` to the `transactions_credit_card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `online` to the `transactions_credit_card` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_title_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions_account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "details" TEXT,
    "origin" TEXT,
    "destination" TEXT,
    "createdAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "transactions_account_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transactions_account" ("accountId", "amount", "createdAt", "deletedAt", "destination", "details", "externalId", "id", "origin", "title") SELECT "accountId", "amount", "createdAt", "deletedAt", "destination", "details", "externalId", "id", "origin", "title" FROM "transactions_account";
DROP TABLE "transactions_account";
ALTER TABLE "new_transactions_account" RENAME TO "transactions_account";
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
    "deletedAt" DATETIME,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "transactions_credit_card_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transactions_credit_card" ("accountId", "amount", "createdAt", "deletedAt", "externalId", "id", "title") SELECT "accountId", "amount", "createdAt", "deletedAt", "externalId", "id", "title" FROM "transactions_credit_card";
DROP TABLE "transactions_credit_card";
ALTER TABLE "new_transactions_credit_card" RENAME TO "transactions_credit_card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
