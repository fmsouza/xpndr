import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, TextInput } from '~/shared/components';
import { makeStyles, Theme } from '~/shared/theme';
import { useText } from '~/auth/intl';

const signupSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .mixed()
    .test('match', 'Passwords do not match', function () {
      return this.parent.password === this.parent.confirmPassword;
    }),
});

const DEFAULT_VALUES = {
  email: '',
  name: '',
  password: '',
  passwordConfirm: '',
};

const useSignupForm = () =>
  useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(signupSchema),
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

type SignupFormProps = {
  loading: boolean;
  onSubmit: (form: { [key: string]: any }) => void;
};

export const SignupForm = ({ loading, onSubmit }: SignupFormProps) => {
  const styles = useStyles();
  const { getText } = useText();
  const { handleSubmit, control } = useSignupForm();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        control={control}
        name="name"
        label={getText('signupForm.name')}
      />
      <TextInput
        style={styles.input}
        control={control}
        name="email"
        label={getText('signupForm.email')}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        control={control}
        name="password"
        label={getText('signupForm.password')}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        control={control}
        name="confirmPassword"
        label={getText('signupForm.confirmPassword')}
        secureTextEntry
      />
      <Button
        style={styles.button}
        title={getText('actions.submit')}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        fullWidth
      />
    </View>
  );
};
