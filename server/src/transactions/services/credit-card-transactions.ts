import { CreditCardTransaction } from "@prisma/client";
import { Service } from "typedi";

import { CreditCardTransactionsRepository } from "../repositories";

@Service()
export class CreditCardTransactionsService {

  public constructor(
    private readonly creditCardTransactionsRepository: CreditCardTransactionsRepository
  ) { }

  public createCreditCardTransaction(transaction: Omit<CreditCardTransaction, 'id' | 'deletedAt' | 'account' | 'category'>): Promise<CreditCardTransaction> {
    return this.creditCardTransactionsRepository.createCreditCardTransaction(transaction);
  }
}