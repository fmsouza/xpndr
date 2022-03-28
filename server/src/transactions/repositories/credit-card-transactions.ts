import { CreditCardTransaction, PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";

import { PRISMA_TOKEN } from "~/tokens";

import { Category, ExpenseCategory } from "../types";

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

  public async hasTransactionsBefore(filters: { accountId: number, date: Date}): Promise<boolean> {
    const { accountId, date } = filters;
    const count = await this.prisma.creditCardTransaction.count({
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
    const count = await this.prisma.creditCardTransaction.count({
      where: {
        accountId,
        createdAt: {
          gt: date
        }
      }
    });
    return count > 0;
  }

  public async aggregateByCategory(filters: { accountId: number, startDate: Date, endDate: Date}): Promise<ExpenseCategory[]> {
    const { accountId, startDate, endDate } = filters;
    return (await this.prisma.creditCardTransaction.groupBy({
      by: ['category'],
      where: {
        accountId,
        createdAt: {
          gte: startDate,
          lt: endDate
        }
      },
      _sum: {
        amount: true
      },
      orderBy: {
        category: 'asc'
      }
    })).map(item => ({
      category: item.category as Category,
      amount: item._sum.amount ?? 0
    }));
  }
}