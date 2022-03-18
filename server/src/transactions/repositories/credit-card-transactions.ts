import { CreditCardTransaction, PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";

import { PRISMA_TOKEN } from "~/tokens";

@Service()
export class CreditCardTransactionsRepository {

  public constructor(@Inject(PRISMA_TOKEN) private readonly prisma: PrismaClient) { }

  public createCreditCardTransaction(transaction: Omit<CreditCardTransaction, 'id' | 'deletedAt' | 'account' | 'category'>): Promise<CreditCardTransaction> {
    return this.prisma.creditCardTransaction.create({ data: transaction });
  }
}