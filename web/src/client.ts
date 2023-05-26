import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

import { Maybe } from './modules/shared/types';

const httpLink = new BatchHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = (accessToken: Maybe<string>) => setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const cache = new InMemoryCache();

export const createApolloClient = (accessToken: Maybe<string>) =>
  new ApolloClient({
    link: from([authLink(accessToken), httpLink]),
    cache,
  });
