import { AccountTransaction, PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";

import { PRISMA_TOKEN } from "~/tokens";

@Service()
export class AccountTransactionsRepository {

  public constructor(@Inject(PRISMA_TOKEN) private readonly prisma: PrismaClient) { }

  public createAccountTransaction(transaction: Omit<AccountTransaction, 'id' | 'deletedAt' | 'account' | 'category'>): Promise<AccountTransaction> {
    return this.prisma.accountTransaction.create({ data: transaction });
  }
}