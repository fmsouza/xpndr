import { Service } from "typedi";

import { CreditCardTransactionsRepository } from "../repositories";

@Service()
export class CreditCardTransactionsService {

  public constructor(
    private readonly creditCardTransactionsRepository: CreditCardTransactionsRepository
  ) { }
}