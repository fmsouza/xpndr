import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import { makeStyles, Theme } from '~/shared/theme';

import { Text } from './Text';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  label: {
    fontSize: theme.text.baseSize * 0.9,
    color: theme.colors.text,
    marginBottom: 4,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: theme.dimensions.radius,
    color: theme.colors.text,
  },
  errorMessage: {
    marginTop: 4,
    color: 'red',
  },
}));

export type TextInputProps = RNTextInputProps & {
  style?: any;
  label: string;
  name: string;
  control: Control<any, any>;
  required?: boolean;
  error?: Error;
};

export const TextInput = ({
  control,
  error,
  label,
  name,
  required,
  style,
  ...fieldProps
}: TextInputProps) => {
  const styles = useStyles();

  const errorMessage =
    control.getFieldState(name).error?.message ?? error?.message ?? null;

  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <Text style={styles.label}>{label}</Text>
      {control ? (
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field: { onChange, ...controlledFieldProps } }) => (
            <RNTextInput
              {...fieldProps}
              {...controlledFieldProps}
              style={styles.input}
              onChangeText={onChange}
            />
          )}
        />
      ) : (
        <RNTextInput {...fieldProps} style={styles.input} />
      )}
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};
