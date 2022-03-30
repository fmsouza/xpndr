import React, { useCallback, useEffect } from 'react';

import { Container, Error } from '~/shared/components';
import { makeStyles, Theme } from '~/shared/theme';
import { ScreenRoute, useNavigationOptions } from '~/shared/navigation';
import { useText } from '~/accounts/intl';

import { useCreateAccount } from '../hooks';
import { CreateAccountForm } from '../components';
import { AccountsScreen } from './AccountsScreen';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: theme.dimensions.padding * 2,
    paddingHorizontal: theme.dimensions.padding,
  },
}));

type NewAccountScreenProps = {
  navigation: any;
  route: ScreenRoute<{ accountType: string }>;
};

export const NewAccountScreen = ({
  route,
  navigation,
}: NewAccountScreenProps) => {
  const styles = useStyles();
  const { getText } = useText();
  const { createAccount, account, loading, error } = useCreateAccount();
  const { accountType } = route.params;

  useNavigationOptions({
    title: getText('newAccount.title'),
  });

  useEffect(() => {
    if (account) {
      navigation.replace(AccountsScreen.route);
    }
  }, [account, navigation]);

  const handleFormSubmit = useCallback(
    ({ title }) => {
      createAccount({ title, accountType });
    },
    [accountType, createAccount],
  );

  return (
    <Container scrollable style={styles.container}>
      {error && <Error error={error} />}
      <CreateAccountForm onSubmit={handleFormSubmit} loading={loading} />
    </Container>
  );
};

NewAccountScreen.route = 'NewAccount';
