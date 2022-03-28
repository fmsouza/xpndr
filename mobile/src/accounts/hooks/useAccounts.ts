import { gql, useQuery } from '@apollo/client';
import { useAuthError } from '~/auth/hooks';

export const GET_ACCOUNTS_QUERY = gql`
  query GetAccounts {
    accounts {
      id
      title
      accountType
    }
  }
`;

export const useAccounts = () => {
  const { loading, data, error, refetch } = useQuery(GET_ACCOUNTS_QUERY);
  useAuthError(error);

  return {
    accounts: data?.accounts ?? [],
    loading,
    error,
    refetch,
  };
};
