import React from 'react';
import { View } from 'react-native';

import { makeStyles, Theme } from '~/shared/theme';
import { Text } from '~/shared/components';

type ErrorProps = {
  error: Error;
};

const useStyles = makeStyles((_theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: 'red',
  },
}));

export const Error = ({ error }: ErrorProps) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{error.message}</Text>
    </View>
  );
};
