import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $name: String!, $password: String!) {
    signup(input: { email: $email, name: $name, password: $password }) {
      id
    }
  }
`;

export const useSignup = () => {
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const signupCallback = useCallback(
    (variables: { email: string; name: string; password: string }) => {
      signup({ variables }).catch(() => null);
    },
    [signup],
  );

  return {
    signup: signupCallback,
    loading,
    error,
    success: Boolean(data?.signup?.id),
  };
};
