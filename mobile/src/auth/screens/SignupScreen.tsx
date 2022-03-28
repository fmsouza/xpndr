import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { Container, Error, Spacing, Text } from '~/shared/components';
import { useNavigationOptions } from '~/shared/navigation';
import { makeStyles, Theme } from '~/shared/theme';
import { SignupForm } from '~/auth/components';
import { useText } from '~/auth/intl';

import { useSignup } from '../hooks';
import { LoginScreen } from './LoginScreen';

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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}));

export const SignupScreen = () => {
  const styles = useStyles();
  const { getText } = useText();
  const navigation = useNavigation<any>();
  const { signup, success, loading, error } = useSignup();

  useNavigationOptions({
    headerShown: false,
  });

  const handleFormSubmit = useCallback(
    ({ email, name, password }) => {
      signup({ email, name, password });
    },
    [signup],
  );

  useEffect(() => {
    if (success) {
      navigation.replace(LoginScreen.route);
    }
  }, [success, navigation]);

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>{getText('signupPage.title')}</Text>
      <View style={styles.formContainer}>
        <SignupForm onSubmit={handleFormSubmit} loading={loading} />
        <Spacing height={16} />
        {error && <Error error={error} />}
      </View>
    </Container>
  );
};

SignupScreen.route = 'Signup';
