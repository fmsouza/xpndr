import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '~/shared/components';

import {AccountsScreen} from '../AccountsScreen';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useTheme: jest.fn(() => ({
    dimensions: {},
    colors: {},
    text: {}
  })),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    setOptions: jest.fn()
  })),
}));

it('renders correctly', () => {
  const testRenderer = renderer.create(<AccountsScreen />);
  const instance = testRenderer.root;
  expect(instance.findAllByType(Button).length).toBe(2);
});
