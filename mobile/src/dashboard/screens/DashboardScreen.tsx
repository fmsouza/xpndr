import React, { useCallback, useState } from 'react';

import { Container, Error, Loading } from '~/shared/components';
import { makeStyles, Theme } from '~/shared/theme';
import { ScreenRoute, useNavigationOptions } from '~/shared/navigation';
import { useText } from '~/dashboard/intl';
import { useAccountDashboard } from '~/dashboard/hooks';
import { endOfMonth, startOfMonth } from '~/dashboard/utils';
import { DashboardMainView, DashboardNavigationBar } from '../components';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: theme.dimensions.padding * 2,
    paddingHorizontal: theme.dimensions.padding,
  },
  cardBox: {
    flex: 1,
    width: '100%',
    marginBottom: theme.dimensions.margin,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

type DashboardScreenProps = {
  route: ScreenRoute<{ accountId: string }>;
};

export const DashboardScreen = ({ route }: DashboardScreenProps) => {
  const styles = useStyles();
  const { getText } = useText();
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState<Date>(endOfMonth(new Date()));
  const { accountDashboard, error, loading } = useAccountDashboard({
    filters: {
      accountId: Number(route.params.accountId),
      startDate,
      endDate,
    },
  });

  useNavigationOptions({
    title: accountDashboard?.account?.title ?? getText('dashboard.title'),
  });

  const handleNavigateToPreviousPeriod = useCallback(() => {
    const newMonth = new Date(startDate);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setStartDate(startOfMonth(newMonth));
    setEndDate(endOfMonth(newMonth));
  }, [startDate, setStartDate, setEndDate]);

  const handleNavigateToNextPeriod = useCallback(() => {
    const newMonth = new Date(startDate);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setStartDate(startOfMonth(newMonth));
    setEndDate(endOfMonth(newMonth));
  }, [startDate, setStartDate, setEndDate]);

  return (
    <Container scrollable style={styles.container}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {accountDashboard && (
        <>
          <DashboardNavigationBar
            startDate={startDate}
            endDate={endDate}
            hasNextPeriod={accountDashboard.hasNextPeriod}
            hasPreviousPeriod={accountDashboard.hasPreviousPeriod}
            onPrevious={handleNavigateToPreviousPeriod}
            onNext={handleNavigateToNextPeriod}
          />
          <DashboardMainView accountDashboard={accountDashboard} />
        </>
      )}
    </Container>
  );
};

DashboardScreen.route = 'Dashboard';
