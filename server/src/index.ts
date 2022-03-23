import 'reflect-metadata';
import { buildSchema, registerEnumType } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';

import { SortOrder } from './shared/types';
import { scalars } from './shared/scalars';
import authChecker from './auth-checker';
import context from './context';
import './setup';

(async () => {
  registerEnumType(SortOrder, {
    name: 'SortOrder',
  });

  const schema = await buildSchema({
    resolvers: [
      __dirname + "/**/resolvers.ts",
      __dirname + "/**/resolvers/*.ts"
    ],
    scalarsMap: scalars,
    container: Container,
    authChecker
  });

  new ApolloServer({ schema, context }).listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at: http://localhost:4000`));
})();
