import { ObjectType, Field, ID } from 'type-graphql'

import { User } from '../users/types'

@ObjectType()
export class Account {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => Date)
  deleted?: Date;

  @Field((type) => User)
  owner?: User;
}
