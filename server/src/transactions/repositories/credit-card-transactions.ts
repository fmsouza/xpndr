import { CreditCardTransaction, PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";

import { PRISMA_TOKEN } from "~/tokens";

@Service()
export class CreditCardTransactionsRepository {

  public constructor(@Inject(PRISMA_TOKEN) private readonly prisma: PrismaClient) { }

  public createCreditCardTransaction(transaction: Omit<CreditCardTransaction, 'id' | 'account'>): Promise<CreditCardTransaction> {
    return this.prisma.creditCardTransaction.create({ data: transaction });
  }

  public async bulkCreateCreditCardTransactions(transactions: Array<Omit<CreditCardTransaction, 'id' | 'account'>>): Promise<void> {
    await Promise.all(
      transactions.map(trx => this.prisma.creditCardTransaction.upsert({
        where: { externalId: trx.externalId },
        update: trx,
        create: trx,
      }))
    );
  }

  public getTransactionsByAccountId(accountId: number): Promise<CreditCardTransaction[]> {
    return this.prisma.creditCardTransaction.findMany({
      where: {
        accountId
      }
    });
  }
}