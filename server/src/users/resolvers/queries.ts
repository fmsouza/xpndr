import {
  Resolver,
  Query,
  Ctx,
  Authorized,
} from 'type-graphql'
import { Service } from 'typedi'
import { Context } from '../../context'
import { UsersService } from '../services'

import { User } from '../types'

@Service()
@Resolver(User)
export class QueriesResolver {
  public constructor(private readonly usersService: UsersService) { }

  @Authorized()
  @Query(() => User)
  async me(@Ctx() context: Context) {
    const { user } = context;
    return this.usersService.getUserById(user.id);
  }
}
