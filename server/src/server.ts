import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';

import { Globals } from './shared/types';
import { scalars } from './shared/scalars';
import { GLOBALS_TOKEN } from './tokens';
import authChecker from './auth-checker';
import context from './context';

export async function createServer(): Promise<ApolloServer> {
  const schema = await buildSchema({
    resolvers: [
      __dirname + "/**/resolvers.ts",
      __dirname + "/**/resolvers/*.ts"
    ],
    scalarsMap: scalars,
    container: Container,
    authChecker
  });

  const globals: Globals = Container.get(GLOBALS_TOKEN);

  return new ApolloServer({
    schema,
    context,
    nodeEnv: globals.NODE_ENV,
    debug: globals.NODE_ENV !== 'production',
    introspection: globals.NODE_ENV !== 'production',
  });
}
