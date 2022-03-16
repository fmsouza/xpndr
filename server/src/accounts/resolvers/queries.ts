import {
  Resolver,
  Query,
  Ctx,
  Authorized,
} from 'type-graphql'
import { Service } from 'typedi'
import { Context } from '../../context'
import { AccountsService } from '../services'
import { Account } from '../types'

@Service()
@Resolver(Account)
export class QueriesResolver {
  public constructor(private readonly accountsService: AccountsService) { }

  @Authorized()
  @Query(() => [Account])
  async accounts(@Ctx() context: Context) {
    const { user } = context;
    return this.accountsService.getAccountsByUserId(user.id);
  }
}
