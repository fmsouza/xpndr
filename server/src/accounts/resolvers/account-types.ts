import {
  Resolver,
  Query,
  Authorized,
} from 'type-graphql';
import { Service } from 'typedi';

import { AccountTypesService } from '../services';
import { AccountType } from '../types';

@Service()
@Resolver(AccountType)
export class AccountTypesResolvers {
  public constructor(
    private readonly accountTypesService: AccountTypesService,
  ) { }

  @Authorized()
  @Query(() => [AccountType])
  async accountTypes() {
    return this.accountTypesService.getAccountTypes();
  }
}
