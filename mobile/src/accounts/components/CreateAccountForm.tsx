import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, TextInput } from '~/shared/components';
import { makeStyles, Theme } from '~/shared/theme';
import { useText } from '~/accounts/intl';

const createAccountSchema = yup.object().shape({
  title: yup.string().required(),
});

const DEFAULT_VALUES = {
  title: '',
};

const useCreateAccountForm = () =>
  useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(createAccountSchema),
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

type CreateAccountFormProps = {
  loading: boolean;
  onSubmit: (form: { [key: string]: any }) => void;
};

export const CreateAccountForm = ({
  loading,
  onSubmit,
}: CreateAccountFormProps) => {
  const styles = useStyles();
  const { getText } = useText();
  const { handleSubmit, control } = useCreateAccountForm();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        control={control}
        name="title"
        label={getText('createAccountForm.title')}
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
