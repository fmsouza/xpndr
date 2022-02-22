import { DefaultTheme } from '@react-navigation/native';
import { StatusBarStyle } from 'react-native';
import color from 'color';
import merge from 'lodash/merge';

import { Theme } from './styles';

const primary = '#074F57';
const accent = '#D4C2FC';

export const theme: Theme = merge(DefaultTheme, {
  colors: {
    primary,
    accent,
  },
  statusBar: {
    barStyle: 'light-content' as StatusBarStyle,
    backgroundColor: color(primary).darken(0.4).hex().toString()
  },
});
