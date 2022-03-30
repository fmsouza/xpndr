import { CreditCardTransaction } from "@prisma/client";
import { Service } from "typedi";

import { CreditCardTransactionsRepository } from "../repositories";
import { ExpenseCategory } from "../types";

@Service()
export class CreditCardTransactionsService {

  public constructor(
    private readonly creditCardTransactionsRepository: CreditCardTransactionsRepository
  ) { }

  public createCreditCardTransaction(transaction: Omit<CreditCardTransaction, 'id' | 'account'>): Promise<CreditCardTransaction> {
    return this.creditCardTransactionsRepository.createCreditCardTransaction(transaction);
  }

  public async bulkCreateCreditCardTransactions(transactions: Array<Omit<CreditCardTransaction, 'id' | 'account'>>): Promise<void> {
    return this.creditCardTransactionsRepository.bulkCreateCreditCardTransactions(transactions);
  }

  public getTransactionsByAccountId(accountId: number): Promise<CreditCardTransaction[]> {
    return this.creditCardTransactionsRepository.getTransactionsByAccountId(accountId);
  }

  public hasTransactionsBefore(filters: { accountId: number, date: Date}): Promise<boolean> {
    return this.creditCardTransactionsRepository.hasTransactionsBefore(filters);
  }

  public hasTransactionsAfter(filters: { accountId: number, date: Date}): Promise<boolean> {
    return this.creditCardTransactionsRepository.hasTransactionsAfter(filters);
  }

  public aggregateByCategory(filters: { accountId: number, startDate: Date, endDate: Date}): Promise<ExpenseCategory[]> {
    return this.creditCardTransactionsRepository.aggregateByCategory(filters);
  }

  public totalExpenses(filters: { accountId: number, startDate: Date, endDate: Date}): Promise<number> {
    return this.creditCardTransactionsRepository.totalExpenses(filters);
  }
}