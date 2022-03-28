import { AccountTransaction } from "@prisma/client";
import { Service } from "typedi";

import { AccountTransactionsRepository } from "../repositories";

@Service()
export class AccountTransactionsService {

  public constructor(
    private readonly accountTransactionsRepository: AccountTransactionsRepository
  ) { }

  public createAccountTransaction(transaction: Omit<AccountTransaction, 'id' | 'account'>): Promise<AccountTransaction> {
    return this.accountTransactionsRepository.createAccountTransaction(transaction);
  }

  public async bulkCreateAccountTransactions(transactions: Array<Omit<AccountTransaction, 'id' | 'account'>>): Promise<void> {
    return this.accountTransactionsRepository.bulkCreateAccountTransactions(transactions);
  }

  public getTransactionsByAccountId(accountId: number): Promise<AccountTransaction[]> {
    return this.accountTransactionsRepository.getTransactionsByAccountId(accountId);
  }

  public hasTransactionsBefore(filters: { accountId: number, date: Date}): Promise<boolean> {
    return this.accountTransactionsRepository.hasTransactionsBefore(filters);
  }

  public hasTransactionsAfter(filters: { accountId: number, date: Date}): Promise<boolean> {
    return this.accountTransactionsRepository.hasTransactionsAfter(filters);
  }
}