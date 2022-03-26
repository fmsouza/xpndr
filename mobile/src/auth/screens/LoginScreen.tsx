import React, { useCallback, useEffect } from 'react';

import { Container, Error, Text } from '~/shared/components';
import { useNavigationOptions } from '~/shared/navigation';
import { makeStyles, Theme } from '~/shared/theme';
import { LoginForm } from '~/auth/components';
import { useText } from '~/auth/intl';
import { useLogin } from '~/auth/hooks';
import * as Auth from '~/auth/utils';
import { useNavigation } from '@react-navigation/native';
import { AccountsScreen } from '~/accounts/screens';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: theme.text.jumbo,
    fontWeight: 'bold',
  },
}));

export const LoginScreen = () => {
  const styles = useStyles();
  const { getText } = useText();
  const navigation = useNavigation();
  const { login, accessToken, loading, error } = useLogin();

  useNavigationOptions({
    headerShown: false,
  });

  const handleFormSubmit = useCallback(({ email, password }) => {
    login({ email, password });
  }, []);

  useEffect(() => {
    if (accessToken) {
      Auth.setToken(accessToken);
      navigation.navigate({ key: AccountsScreen.route });
    }
  }, [accessToken, navigation]);

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>{getText('loginPage.title')}</Text>
      <LoginForm onSubmit={handleFormSubmit} loading={loading} />
      {error && <Error error={error} />}
    </Container>
  );
};

LoginScreen.route = 'Login';
