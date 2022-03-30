import { gql, useQuery } from '@apollo/client';
import { useAuthError } from '~/auth/hooks';

export const GET_ACCOUNT_TYPES_QUERY = gql`
  query GetAccountTypes {
    accountTypes {
      accountType
      label
    }
  }
`;

export const useAccountTypes = () => {
  const { loading, data, error, refetch } = useQuery(GET_ACCOUNT_TYPES_QUERY);
  useAuthError(error);

  return {
    accountTypes: data?.accountTypes ?? [],
    loading,
    error,
    refetch,
  };
};
