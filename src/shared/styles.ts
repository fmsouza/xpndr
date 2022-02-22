import { StatusBarProps, StyleSheet } from 'react-native';
import { useTheme, Theme as RNTheme } from '@react-navigation/native';

export type Theme = RNTheme & {
  colors: {
    accent: string
  },
  statusBar: StatusBarProps
}

export const makeStyles = (fn: (theme: Theme) => any) => () => {
  const theme = useTheme() as Theme;
  return StyleSheet.create(fn(theme));
};
