import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
  Authorized,
  Query,
} from 'type-graphql'
import { Service } from 'typedi'

import { Context } from '~/context';

import { AuthResponse, User } from './types'
import { AuthService, UsersService } from './services'

@InputType()
export class UserCreateInput {
  @Field() email: string;
  @Field() name: string;
  @Field() password: string;
}

@InputType()
export class UserLoginInput {
  @Field() email: string;
  @Field() password: string;
}

@Service()
@Resolver(User)
export class UsersResolvers {
  public constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Authorized()
  @Query(() => User)
  public async me(@Ctx() context: Context) {
    const { user } = context;
    return this.usersService.getUserById(user.id);
  }

  @Mutation((_returns) => User)
  public async signup(
    @Arg('input') input: UserCreateInput,
  ): Promise<User> {
    return this.usersService.createUser(input);
  }

  @Mutation((_returns) => AuthResponse)
  public async login(
    @Arg('input') input: UserLoginInput,
  ): Promise<AuthResponse> {
    const accessToken = await this.authService.login(input);
    return { accessToken };
  }
}
