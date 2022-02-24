import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { Button } from '../Button';
import { Icon } from './Icon';

type IconButtonProps = {
  name: string;
  size?: number;
  color?: string;
  mdIcon?: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

export const IconButton = ({
  name,
  mdIcon,
  size = 24,
  color = 'black',
  onPress,
}: IconButtonProps) => (
  <Button type='ripple-only' onPress={onPress} rippleRadius={size * 0.75}>
    <Icon name={name} size={size} color={color} mdIcon={mdIcon} />
  </Button>
);
