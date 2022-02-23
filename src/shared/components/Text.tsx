import React, { ReactNode } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';

import { makeStyles, Theme } from '~/shared/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.colors.text,
    fontSize: theme.text.baseSize
  },
}));

type TextProps = {
  style?: Partial<{}>;
  children: ReactNode;
};

export const Text = ({ style, children }: TextProps) => {
  const styles = useStyles();
  return (
    <RNText style={StyleSheet.flatten([styles.root, style])}>{children}</RNText>
  );
};
