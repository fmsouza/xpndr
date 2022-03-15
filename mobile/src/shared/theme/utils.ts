import { StyleSheet, useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Theme } from './types';
import { LightTheme } from './light';
import { DarkTheme } from './dark';

export const makeStyles = (fn: (theme: Theme) => any) => () => {
  const theme = useTheme() as Theme;
  return StyleSheet.create(fn(theme));
};

export const useBaseTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'light' ? LightTheme : DarkTheme;
};
