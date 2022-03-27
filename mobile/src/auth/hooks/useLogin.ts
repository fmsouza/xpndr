import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      accessToken
    }
  }
`;

export const useLogin = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const loginCallback = useCallback(
    (variables: { email: string; password: string }) => {
      login({ variables }).catch(() => null);
    },
    [login],
  );

  return {
    login: loginCallback,
    loading,
    error,
    accessToken: data?.login?.accessToken,
  };
};
