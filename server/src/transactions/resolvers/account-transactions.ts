import {
  Resolver,
} from 'type-graphql'
import { Service } from 'typedi'

import { AccountTransactionsService } from '../services'
import { AccountTransaction } from '../types'

@Service()
@Resolver(AccountTransaction)
export class AccountTransactionsResolvers {
  public constructor(private readonly accountTransactionsService: AccountTransactionsService) {}
}
