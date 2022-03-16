import {
  Resolver,
  Mutation,
  Arg,
} from 'type-graphql'
import { Service } from 'typedi'

import { User } from '../types'
import { UsersService } from '../services'

import { UserCreateInput } from './inputs'

@Service()
@Resolver(User)
export class MutationsResolver {
  public constructor(private readonly usersService: UsersService) { }

  @Mutation((returns) => User)
  public async signup(
    @Arg('input') input: UserCreateInput,
  ): Promise<User> {
    return this.usersService.createUser(input);
  }
}
