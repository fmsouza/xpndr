import {
  DarkTheme as RNDarkTheme,
} from '@react-navigation/native';
import { StatusBarStyle } from 'react-native';
import color from 'color';
import merge from 'lodash/merge';

import { Theme } from './types';
import { SharedBaseTheme } from './shared';

const COLORS = merge(RNDarkTheme.colors, {
  primary: '#000000',
  secondary: '#FFFFFF',
  background: '#000000',
  text: '#FFFFFF',
  invertedText: '#000000',
  border: '#FFFFFF',
});

const STATUS_BAR = {
  barStyle: 'light-content' as StatusBarStyle,
  backgroundColor: color(COLORS.primary).darken(0.4).hex().toString(),
};

export const DarkTheme = <Theme>merge(SharedBaseTheme, RNDarkTheme, {
  colors: COLORS,
  statusBar: STATUS_BAR,
  navbar: {
    headerStyle: {
      backgroundColor: COLORS.background,
    },
  }
});
