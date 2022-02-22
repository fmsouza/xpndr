import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';

import { makeStyles, Theme } from '~/shared/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.colors.text
  }
}));

type TextProps = {
  style: Partial<{}>,
  children: string
};

export const Text = ({style, children}: TextProps) => {
  const styles = useStyles();
  return (
    <RNText style={StyleSheet.flatten([styles.root, style])}>{children}</RNText>
  )
};
