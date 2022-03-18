/*
  Warnings:

  - You are about to drop the `categories_transactions_account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories_transactions_credit_card` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `transactions_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `transactions_credit_card` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "categories_transactions_account";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "categories_transactions_credit_card";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions_account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "origin" TEXT,
    "destination" TEXT,
    "createdAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "accountId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "transactions_account_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transactions_account_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transactions_account" ("accountId", "amount", "createdAt", "deletedAt", "destination", "details", "externalId", "id", "origin", "title") SELECT "accountId", "amount", "createdAt", "deletedAt", "destination", "details", "externalId", "id", "origin", "title" FROM "transactions_account";
DROP TABLE "transactions_account";
ALTER TABLE "new_transactions_account" RENAME TO "transactions_account";
CREATE TABLE "new_transactions_credit_card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "accountId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "transactions_credit_card_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transactions_credit_card_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transactions_credit_card" ("accountId", "amount", "createdAt", "deletedAt", "details", "externalId", "id", "title") SELECT "accountId", "amount", "createdAt", "deletedAt", "details", "externalId", "id", "title" FROM "transactions_credit_card";
DROP TABLE "transactions_credit_card";
ALTER TABLE "new_transactions_credit_card" RENAME TO "transactions_credit_card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
