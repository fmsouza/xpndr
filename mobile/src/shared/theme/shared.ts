import { Dimensions } from 'react-native';

import { Theme } from './types';

const { width: maxWidth, height: maxHeight } = Dimensions.get('window');

const viewport = {
  width: maxWidth,
  height: maxHeight
};

const dimensions = {
  padding: 8,
  margin: 8,
  radius: 4,
  border: 2,
};

const text = {
  baseSize: 14,
  header: 16,
};

const navbar = {
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: text.header
  }
};

export const SharedBaseTheme: Partial<Theme> = {
  viewport,
  dimensions,
  text,
  navbar
};
