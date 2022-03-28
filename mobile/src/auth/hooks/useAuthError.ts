import { ApolloError } from '@apollo/client';

import { useLogout } from './useLogout';

export const useAuthError = (error?: ApolloError) => {
  const logout = useLogout();
  
  if (error?.graphQLErrors?.[0]?.extensions?.code === 'AUTHENTICATION_REQUIRED') {
    logout();
  }
};
