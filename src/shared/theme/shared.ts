import { Dimensions } from 'react-native';

import { Theme } from './types';

const { width: maxWidth, height: maxHeight } = Dimensions.get('window');

export const SharedBaseTheme: Partial<Theme> = {
  viewport: {
    width: maxWidth,
    height: maxHeight
  },
  dimensions: {
    padding: 8,
    margin: 8,
    radius: 4,
    border: 2,
  },
  text: {
    baseSize: 14
  }
};
