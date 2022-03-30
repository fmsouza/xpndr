import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { GET_ACCOUNTS_QUERY } from './useAccounts';

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($title: String!, $accountType: AccountType!) {
    createAccount(input: { title: $title, accountType: $accountType }) {
      id
      title
      accountType
    }
  }
`;

export const useCreateAccount = () => {
  const [createAccount, { data, loading, error }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      update(cache, response) {
        const newAccount = response?.data?.createAccount;
        if (!newAccount) return;

        const cached: any = cache.readQuery({ query: GET_ACCOUNTS_QUERY });
        console.log('cached:', cached);
        const accounts = cached.accounts ?? [];
        accounts.push(newAccount);

        cache.writeQuery({
          query: GET_ACCOUNTS_QUERY,
          data: { accounts },
        });
      },
    },
  );

  const createAccountCallback = useCallback(
    (variables: { title: string; accountType: string }) => {
      createAccount({ variables }).catch(() => null);
    },
    [createAccount],
  );

  return {
    createAccount: createAccountCallback,
    loading,
    error,
    account: data?.createAccount,
  };
};
