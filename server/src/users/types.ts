import { ObjectType, Field, ID } from 'type-graphql'
import { IsEmail } from 'class-validator'
import { ApolloError } from 'apollo-server'

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  @IsEmail()
  email: string

  @Field((type) => String)
  name: string

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date
}

@ObjectType()
export class AuthResponse {
  @Field((type) => String)
  accessToken: string
}

export class AuthenticationFailedError extends ApolloError {
  public constructor(message: string) {
    super(message, 'AUTHENTICATION_FAILED');
    Object.defineProperty(this, 'name', { value: 'AuthenticationFailedError' });
  }
}