import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { Button } from '../Button';
import { Icon } from './Icon';

type IconButtonProps = {
  name: string;
  size?: number;
  color?: string;
  type?: string;
  onPress: (event: GestureResponderEvent) => void;
};

export const IconButton = ({
  name,
  type = '',
  size = 24,
  color = 'black',
  onPress,
}: IconButtonProps) => (
  <Button onPress={onPress} rippleRadius={size * 0.75}>
    <Icon name={name} size={size} color={color} type={type} />
  </Button>
);
