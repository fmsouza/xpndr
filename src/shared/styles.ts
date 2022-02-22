import { StyleSheet } from 'react-native';
import { useTheme, Theme as RNTheme } from '@react-navigation/native';

export type Theme = RNTheme;

export const makeStyles = (fn: (theme: Theme) => any) => () => {
  const theme = useTheme();
  return StyleSheet.create(fn(theme));
};
