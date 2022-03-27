import {ApolloClient, InMemoryCache, from} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

import * as Auth from '~/auth/utils';

const httpLink = new BatchHttpLink({
  uri: process.env.API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await Auth.getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache();

export const createApolloClient = () => new ApolloClient({
  link: from([authLink, httpLink]),
  cache,
});