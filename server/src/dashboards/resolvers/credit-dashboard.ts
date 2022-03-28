import {
  Authorized,
  FieldResolver,
  Resolver,
  Root,
} from 'type-graphql';
import { Service } from 'typedi';

import { Account } from '~/accounts/types';
import { CreditCardTransactionsService } from '~/transactions/services';

import { AccountDashboardFiltersInput, CreditDashboard } from '../types';

@Service()
@Resolver(CreditDashboard)
export class CreditDashboardResolvers {
  public constructor(private readonly creditCardTransactionsService: CreditCardTransactionsService) {}

  @Authorized()
  @FieldResolver((_returns) => [Account])
  public async expensesByCategory(@Root() filters: AccountDashboardFiltersInput) {
    return this.creditCardTransactionsService.aggregateByCategory(filters);
  }
}
