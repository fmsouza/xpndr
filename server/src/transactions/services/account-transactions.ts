import { Service } from "typedi";

import { AccountTransactionsRepository } from "../repositories";

@Service()
export class AccountTransactionsService {

  public constructor(
    private readonly accountTransactionsRepository: AccountTransactionsRepository
  ) { }
}