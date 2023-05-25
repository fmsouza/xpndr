import { createTheme } from '@mui/material';
import { presetPalettes } from '@ant-design/colors';

import {BaseTheme} from './BaseTheme';

export type ColorPalette = ReturnType<typeof BaseTheme> & {
  mode: 'dark' | 'light',
  common: {
    black: string,
    white: string
  },
  text: {
    primary: string,
    secondary: string,
    disabled: string,
  },
  action: {
    disabled: string,
  },
  divider: string,
  background: {
    paper: string,
    default: string,
  }
};

export const Palette = (mode: 'dark' | 'light') => {
  const colors = presetPalettes;

  const greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000'
  ];
  const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  const greyConstant = ['#fafafb', '#e6ebf1'];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = BaseTheme(colors);

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: paletteColor.grey[700],
        secondary: paletteColor.grey[500],
        disabled: paletteColor.grey[400]
      },
      action: {
        disabled: paletteColor.grey[300]
      },
      divider: paletteColor.grey[200],
      background: {
        paper: paletteColor.grey[0],
        default: paletteColor.grey.A50
      }
    }
  } as any);
};
