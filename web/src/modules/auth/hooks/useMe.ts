import { gql, useQuery } from '@apollo/client';
import { Maybe } from 'yup';

type Me = {
  id: string;
  name: string;
  email: string;
};

export const ME_QUERY = gql`
  query GetMe {
    me {
      id
      name
      email
    }
}
`;

export const useMe = () => {
  const { data, loading, error } = useQuery(ME_QUERY);

  return {
    loading,
    error,
    me: data?.me as Maybe<Me>,
  };
};
