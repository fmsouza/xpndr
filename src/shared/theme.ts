import { DefaultTheme } from '@react-navigation/native';
import color from 'color';

const primary = '#074F57';
const accent = '#D4C2FC';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary,
    accent,
    darkPrimary: color(primary).darken(0.4).hex().toString(),
  },
  statusBar: {
    barStyle: 'light-content',
  },
};
