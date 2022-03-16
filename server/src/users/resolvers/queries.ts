import { PrismaClient } from '@prisma/client'
import {
  Resolver,
  Query,
} from 'type-graphql'
import { Inject, Service } from 'typedi'

import { User } from '../types'

@Service()
@Resolver(User)
export class QueriesResolver {
  public constructor(@Inject('PRISMA') private readonly prisma: PrismaClient) { }

  @Query(() => [User])
  async users() {
    return this.prisma.user.findMany()
  }
}
