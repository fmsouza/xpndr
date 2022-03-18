import { AccountTransaction } from "@prisma/client";
import { Service } from "typedi";

import { AccountTransactionsRepository } from "../repositories";

@Service()
export class AccountTransactionsService {

  public constructor(
    private readonly accountTransactionsRepository: AccountTransactionsRepository
  ) { }

  public createAccountTransaction(transaction: Omit<AccountTransaction, 'id' | 'deletedAt' | 'account' | 'category'>): Promise<AccountTransaction> {
    return this.accountTransactionsRepository.createAccountTransaction(transaction);
  }
}