import React, { useCallback } from 'react';

import { Container, Text } from '~/shared/components';
import { useNavigationOptions } from '~/shared/navigation';
import { makeStyles, Theme } from '~/shared/theme';
import { LoginForm } from '~/auth/components';
import { useText } from '~/auth/intl';

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

  useNavigationOptions({
    headerShown: false,
  });

  const handleFormSubmit = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>{getText('loginPage.title')}</Text>
      <LoginForm onSubmit={handleFormSubmit} />
    </Container>
  );
};

LoginScreen.route = 'Login';
