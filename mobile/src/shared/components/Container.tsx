import React, { ReactNode } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';

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
  scrollable?: boolean;
  children: ReactNode;
};

export const Container = ({
  children,
  style,
  scrollable,
  ...props
}: ContainerProps) => {
  const styles = useStyles();
  const BaseView = scrollable ? ScrollView : View;
  const containerProps = {
    ...props,
    contentContainerStyle: scrollable ? style : {},
    style: !scrollable
      ? StyleSheet.flatten([styles.container, style])
      : styles.container,
  };
  return (
    <SafeAreaView style={styles.safeWrapper}>
      <BaseView {...containerProps}>{children}</BaseView>
    </SafeAreaView>
  );
};
