
import { gql, useQuery } from '@apollo/client';

export const GET_ACCOUNTS_QUERY = gql`
  query GetAccounts {
    accounts {
    }
  }
`;

export const useAccounts = () => {
  const { loading, data, error, refetch } = useQuery(GET_ACCOUNTS_QUERY);

  return {
    accounts: data?.accounts ?? [],
    loading,
    error,
    refetch,
  };
};