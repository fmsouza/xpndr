import { AccountTransaction, PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";

import { PRISMA_TOKEN } from "~/tokens";

@Service()
export class AccountTransactionsRepository {

  public constructor(@Inject(PRISMA_TOKEN) private readonly prisma: PrismaClient) { }

  public createAccountTransaction(transaction: Omit<AccountTransaction, 'id' | 'account'>): Promise<AccountTransaction> {
    return this.prisma.accountTransaction.create({ data: transaction });
  }

  public async bulkCreateAccountTransactions(transactions: Array<Omit<AccountTransaction, 'id' | 'account'>>): Promise<void> {
    await Promise.all(
      transactions.map(trx => this.prisma.accountTransaction.upsert({
        where: { externalId: trx.externalId },
        update: trx,
        create: trx,
      }))
    );
  }

  public getTransactionsByAccountId(accountId: number): Promise<AccountTransaction[]> {
    return this.prisma.accountTransaction.findMany({
      where: {
        accountId
      }
    });
  }

  public async hasTransactionsBefore(filters: { accountId: number, date: Date}): Promise<boolean> {
    const { accountId, date } = filters;
    const count = await this.prisma.accountTransaction.count({
      where: {
        accountId,
        createdAt: {
          lt: date
        }
      }
    });
    return count > 0;
  }

  public async hasTransactionsAfter(filters: { accountId: number, date: Date}): Promise<boolean> {
    const { accountId, date } = filters;
    const count = await this.prisma.accountTransaction.count({
      where: {
        accountId,
        createdAt: {
          gt: date
        }
      }
    });
    return count > 0;
  }
}