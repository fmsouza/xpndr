import 'reflect-metadata'
import { registerEnumType, buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { GraphQLScalarType } from 'graphql'
import { Container } from 'typedi'
import { PrismaClient } from '@prisma/client'
import { DateTimeResolver } from 'graphql-scalars'

import { SortOrder } from './shared/types'

Container.set({ id: 'PRISMA', factory: () => new PrismaClient() });

(async () => {
  registerEnumType(SortOrder, {
    name: 'SortOrder',
  })

  const resolvers = [] as any;

  const schema = await buildSchema({
    resolvers,
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
    container: Container
  })

  new ApolloServer({ schema }).listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at: http://localhost:4000`))
})();
