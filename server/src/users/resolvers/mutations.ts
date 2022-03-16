import {
  Resolver,
  Mutation,
  Arg,
} from 'type-graphql'
import { Service } from 'typedi'

import { AuthResponse, User } from '../types'
import { AuthService, UsersService } from '../services'

import { UserCreateInput, UserLoginInput } from './inputs'

@Service()
@Resolver(User)
export class MutationsResolver {
  public constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Mutation((returns) => User)
  public async signup(
    @Arg('input') input: UserCreateInput,
  ): Promise<User> {
    return this.usersService.createUser(input);
  }

  @Mutation((returns) => AuthResponse)
  public async login(
    @Arg('input') input: UserLoginInput,
  ): Promise<AuthResponse> {
    const accessToken = await this.authService.login(input);
    return { accessToken };
  }
}
