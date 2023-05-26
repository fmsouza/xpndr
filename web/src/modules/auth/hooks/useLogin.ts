import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

import { useAuth } from '../providers';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      accessToken
    }
  }
`;

export const useLogin = () => {
  const {updateToken} = useAuth();
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = useCallback(
    async (variables: { email: string; password: string, keepMeSignedIn: boolean }) => {
      const response = await login({ variables });
      updateToken({
        token: response.data?.login?.accessToken,
        persist: variables.keepMeSignedIn,
      });
      return response;
    },
    [login],
  );

  return {
    login: handleLogin,
    loading,
    error,
    success: Boolean(data?.login?.accessToken),
  };
};
