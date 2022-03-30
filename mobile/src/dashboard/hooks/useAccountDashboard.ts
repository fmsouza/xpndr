import { gql, useQuery } from '@apollo/client';

import { useAuthError } from '~/auth/hooks';

export const GET_DASHBOARD_QUERY = gql`
  query AccountDashboard($input: AccountDashboardInput!) {
    accountDashboard(input: $input) {
      account {
        title
      }
      credit {
        expensesByCategory {
          category
          amount
        }
      }
      hasPreviousPeriod
      hasNextPeriod
    }
  }
`;

type AccountDashboardInput = {
  filters: {
    accountId: number;
    startDate: Date;
    endDate: Date;
  };
};

export const useAccountDashboard = (input: AccountDashboardInput) => {
  const { loading, data, error, refetch } = useQuery(GET_DASHBOARD_QUERY, {
    variables: { input },
  });
  useAuthError(error);

  return {
    accountDashboard: data?.accountDashboard,
    loading,
    error,
    refetch,
  };
};
