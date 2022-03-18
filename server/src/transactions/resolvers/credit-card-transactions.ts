import {
  Resolver,
} from 'type-graphql'
import { Service } from 'typedi'

import { CreditCardTransactionsService } from '../services'
import { CreditCardTransaction } from '../types'

@Service()
@Resolver(CreditCardTransaction)
export class CreditCardTransactionsResolvers {
  public constructor(private readonly creditCardTransactionsService: CreditCardTransactionsService) {}
}
