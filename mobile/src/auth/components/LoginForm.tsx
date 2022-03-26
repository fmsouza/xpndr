import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, TextInput } from '~/shared/components';
import { makeStyles, Theme } from '~/shared/theme';
import { useText } from '~/auth/intl';

const loginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

const DEFAULT_VALUES = {
  email: '',
  password: '',
};

const useLoginForm = () =>
  useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(loginSchema),
  });

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
  },
  input: {
    paddingBottom: theme.dimensions.padding * 2,
  },
  button: {
    marginTop: theme.dimensions.padding * 2,
  },
}));

type LoginFormProps = {
  onSubmit: (form: { [key: string]: any }) => void;
};

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const styles = useStyles();
  const { getText } = useText();
  const { handleSubmit, control } = useLoginForm();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        control={control}
        name="email"
        label={getText('loginForm.email')}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        control={control}
        name="password"
        label={getText('loginForm.password')}
        secureTextEntry
      />
      <Button
        style={styles.button}
        title={getText('actions.submit')}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
