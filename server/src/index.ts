import 'reflect-metadata'
import { registerEnumType, buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { Container } from 'typedi'

import { SortOrder } from './shared/types'
import { scalars } from './shared/scalars'
import { resolvers as usersResolvers } from './users';
import { authChecker } from './users/auth-checker';
import context from './context';
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
    container: Container,
    authChecker
  })

  new ApolloServer({ schema, context }).listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at: http://localhost:4000`))
})();
