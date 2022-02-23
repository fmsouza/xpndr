import React, { ReactNode } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import { makeStyles, Theme } from '~/shared/theme';

const useStyles = makeStyles((theme: Theme) => ({
  safeWrapper: {
    flex: 1,
    paddingHorizontal: theme.dimensions.padding,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

type ContainerProps = {
  style?: any;
  children: ReactNode;
};

export const Container = ({ children, style }: ContainerProps) => {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.safeWrapper}>
      <View style={StyleSheet.flatten([styles.container, style])}>
        {children}
      </View>
    </SafeAreaView>
  );
};
