import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { makeStyles, Theme, useTheme } from '~/shared/theme';

const useStyles = makeStyles((_theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
}));

export const Loading = () => {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};
