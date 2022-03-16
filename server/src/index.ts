import 'reflect-metadata'
import { registerEnumType, buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { Container } from 'typedi'

import { SortOrder } from './shared/types'
import { scalars } from './shared/scalars'
import { resolvers as usersResolvers } from './users';
import './setup';

(async () => {
  registerEnumType(SortOrder, {
    name: 'SortOrder',
  })

  const resolvers = [
    ...usersResolvers
  ] as any;

  const schema = await buildSchema({
    resolvers,
    scalarsMap: scalars,
    container: Container
  })

  new ApolloServer({ schema }).listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at: http://localhost:4000`))
})();
