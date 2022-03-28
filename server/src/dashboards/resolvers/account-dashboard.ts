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

import { AccountDashboard, AccountDashboardFiltersInput, AccountDashboardInput, CreditDashboard } from '../types';

@Service()
@Resolver(AccountDashboard)
export class AccountDashboardResolvers {
  public constructor(
    private readonly accountsService: AccountsService,
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
}
