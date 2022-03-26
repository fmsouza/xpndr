-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "connectionDetails" TEXT,
    "accountType" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions_account" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "movement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "transactions_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions_credit_card" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "installments" INTEGER,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isForeign" BOOLEAN NOT NULL,
    "online" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "transactions_credit_card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_password_idx" ON "users"("email", "password");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_password_key" ON "users"("email", "password");

-- CreateIndex
CREATE INDEX "transactions_account_externalId_idx" ON "transactions_account"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_account_externalId_key" ON "transactions_account"("externalId");

-- CreateIndex
CREATE INDEX "transactions_credit_card_externalId_idx" ON "transactions_credit_card"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_credit_card_externalId_key" ON "transactions_credit_card"("externalId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions_account" ADD CONSTRAINT "transactions_account_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions_credit_card" ADD CONSTRAINT "transactions_credit_card_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
