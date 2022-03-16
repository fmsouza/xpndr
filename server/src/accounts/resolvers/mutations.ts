import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
} from 'type-graphql'
import { Service } from 'typedi'
import { Context } from '../../context';

import { AccountsService } from '../services'
import { Account } from '../types';

import { AccountCreateInput } from './inputs'

@Service()
@Resolver(Account)
export class MutationsResolver {
  public constructor(
    private readonly accountsService: AccountsService,
  ) { }

  @Mutation((returns) => Account)
  public async createAccount(
    @Ctx() { user }: Context,
    @Arg('input') input: AccountCreateInput,
  ): Promise<Account> {
    return this.accountsService.createAccount({
      ...input,
      user
    });
  }
}
