import { ObjectType, Field, ID } from 'type-graphql'
import { IsEmail } from 'class-validator'

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
