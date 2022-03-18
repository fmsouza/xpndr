import { ObjectType, Field, ID } from 'type-graphql'
import { IsEmail } from 'class-validator'
import { ApolloError } from 'apollo-server'

@ObjectType()
export class User {
  @Field((_type) => ID)
  id: number

  @Field()
  @IsEmail()
  email: string

  @Field((_type) => String)
  name: string

  @Field((_type) => Date)
  createdAt: Date

  @Field((_type) => Date)
  updatedAt: Date
}

@ObjectType()
export class AuthResponse {
  @Field((_type) => String)
  accessToken: string
}

export class AuthenticationFailedError extends ApolloError {
  public constructor(message: string) {
    super(message, 'AUTHENTICATION_FAILED');
    Object.defineProperty(this, 'name', { value: 'AuthenticationFailedError' });
  }
}