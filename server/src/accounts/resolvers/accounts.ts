import {
  Resolver,
  Query,
  Ctx,
  Authorized,
  InputType,
  Field,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from 'type-graphql'
import { Service } from 'typedi'

import { Context } from '../../context'
import { AccountsService } from '../services'
import { Account, AccountType } from '../types'
import { AccountTypesService } from '../services'
import { User } from '../../users/types'
import { UsersService } from '../../users/services'

@InputType()
export class AccountCreateInput {
  @Field() title: string;
  @Field() accountTypeId: number;
}

@Service()
@Resolver(Account)
export class AccountsResolvers {
  public constructor(
    private readonly accountTypesService: AccountTypesService,
    private readonly accountsService: AccountsService,
    private readonly usersService: UsersService
  ) { }

  @Authorized()
  @Query(() => [Account])
  async accounts(@Ctx() context: Context) {
    const { user } = context;
    return this.accountsService.getAccountsByUserId(user.id);
  }

  @Authorized()
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

  @Authorized()
  @FieldResolver(() => [AccountType])
  public async accountType(@Root() account: Account) {
    return this.accountTypesService.getAccountTypeById(account.accountTypeId)
  }

  @Authorized()
  @FieldResolver(() => [User])
  public async owner(@Root() account: Account) {
    return this.usersService.getUserById(account.ownerId);
  }
}
