-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "accountTypeId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "accounts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "accounts_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "account_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "account_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "transactions_account" (
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
    CONSTRAINT "transactions_account_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "transactions_credit_card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "transactions_credit_card_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "categories_transactions_account" (
    "transactionId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    PRIMARY KEY ("transactionId", "categoryId"),
    CONSTRAINT "categories_transactions_account_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions_account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "categories_transactions_account_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categories_transactions_credit_card" (
    "transactionId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    PRIMARY KEY ("transactionId", "categoryId"),
    CONSTRAINT "categories_transactions_credit_card_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions_credit_card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "categories_transactions_credit_card_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_password_idx" ON "users"("email", "password");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_password_key" ON "users"("email", "password");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");
