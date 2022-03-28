import {
  Arg,
  Authorized,
  FieldResolver,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Service } from 'typedi';

import { AccountsService } from '~/accounts/services';
import { Account } from '~/accounts/types';
import { AccountTransactionsService, CreditCardTransactionsService } from '~/transactions/services';

import { AccountDashboard, AccountDashboardFiltersInput, AccountDashboardInput, CreditDashboard } from '../types';

@Service()
@Resolver(AccountDashboard)
export class AccountDashboardResolvers {
  public constructor(
    private readonly accountsService: AccountsService,
    private readonly creditCardTransactionsService: CreditCardTransactionsService,
    private readonly accountTransactionsService: AccountTransactionsService,
  ) {}

  @Authorized()
  @Query((_returns) => AccountDashboard)
  public async accountDashboard(
    @Arg('input') input: AccountDashboardInput,
  ) {
    return input.filters;
  }

  @Authorized()
  @FieldResolver((_returns) => Account)
  public async account(@Root() filters: AccountDashboardFiltersInput) {
    return this.accountsService.getAccountById(filters.accountId);
  }

  @Authorized()
  @FieldResolver((_returns) => CreditDashboard)
  public async credit(@Root() filters: AccountDashboardFiltersInput) {
    return filters;
  }

  @Authorized()
  @FieldResolver((_returns) => Boolean)
  public async hasPreviousPeriod(@Root() filters: AccountDashboardFiltersInput) {
    const { accountId, startDate } = filters;
    const [hasCreditTransactions, hasDebitTransactions] = await Promise.all([
      this.creditCardTransactionsService.hasTransactionsBefore({ accountId, date: startDate }),
      this.accountTransactionsService.hasTransactionsBefore({ accountId, date: startDate }),
    ]);

    return hasCreditTransactions || hasDebitTransactions;
  }

  @Authorized()
  @FieldResolver((_returns) => Boolean)
  public async hasNextPeriod(@Root() filters: AccountDashboardFiltersInput) {
    const { accountId, endDate } = filters;
    const [hasCreditTransactions, hasDebitTransactions] = await Promise.all([
      this.creditCardTransactionsService.hasTransactionsAfter({ accountId, date: endDate }),
      this.accountTransactionsService.hasTransactionsAfter({ accountId, date: endDate }),
    ]);

    return hasCreditTransactions || hasDebitTransactions;
  }
}
