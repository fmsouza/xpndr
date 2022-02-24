import {
  DefaultTheme,
} from '@react-navigation/native';
import { StatusBarStyle } from 'react-native';
import color from 'color';
import merge from 'lodash/merge';

import { Theme } from './types';
import { SharedBaseTheme } from './shared';

const COLORS = merge(DefaultTheme.colors, {
  primary: '#004FFF',
  secondary: '#FF007F',
  background: '#FCFCFC',
  text: '#050505',
  invertedText: '#FCFCFC',
  border: '#DDDDDD',
});

const STATUS_BAR = {
  barStyle: 'light-content' as StatusBarStyle,
  backgroundColor: color(COLORS.primary).darken(0.4).hex().toString(),
};

export const LightTheme = <Theme>merge(SharedBaseTheme, DefaultTheme, {
  colors: COLORS,
  statusBar: STATUS_BAR,
  navbar: {
    headerStyle: {
      backgroundColor: COLORS.primary,
    }
  }
});