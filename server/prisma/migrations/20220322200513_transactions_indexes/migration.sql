/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `transactions_account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `transactions_credit_card` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "transactions_account_externalId_idx" ON "transactions_account"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_account_externalId_key" ON "transactions_account"("externalId");

-- CreateIndex
CREATE INDEX "transactions_credit_card_externalId_idx" ON "transactions_credit_card"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_credit_card_externalId_key" ON "transactions_credit_card"("externalId");
