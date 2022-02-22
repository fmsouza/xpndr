import {
  DefaultTheme,
  DarkTheme as RNDarkTheme,
} from '@react-navigation/native';
import { StatusBarStyle } from 'react-native';
import color from 'color';
import merge from 'lodash/merge';

import { Theme } from './styles';

const SharedBaseTheme = {
  dimensions: {
    padding: 8,
    margin: 8,
    radius: 4,
  },
};

const lightColors = merge(DefaultTheme.colors, {
  primary: '#074F57',
  accent: '#D4C2FC',
});

const lightStatusBar = {
  barStyle: 'light-content' as StatusBarStyle,
  backgroundColor: color(lightColors.primary).darken(0.4).hex().toString(),
};

export const LightTheme = merge(SharedBaseTheme, DefaultTheme, {
  colors: lightColors,
  statusBar: lightStatusBar,
});

const darkColors = merge(DefaultTheme.colors, {
  primary: '#f8b0a8',
  accent: '#2b3d03',
});

const darkStatusBar = {
  barStyle: 'dark-content' as StatusBarStyle,
  backgroundColor: color(lightColors.primary).lighten(0.4).hex().toString(),
};

export const DarkTheme: Theme = merge(SharedBaseTheme, RNDarkTheme, {
  colors: darkColors,
  statusBar: darkStatusBar,
});
