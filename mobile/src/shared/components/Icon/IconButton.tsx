import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { Button } from '../Button';
import { Icon, IconProps } from './Icon';

type IconButtonProps = IconProps & {
  onPress: (event: GestureResponderEvent) => void;
};

export const IconButton = ({
  name,
  mdIcon,
  size = 24,
  color,
  onPress,
}: IconButtonProps) => (
  <Button type="ripple-only" onPress={onPress} rippleRadius={size * 0.75}>
    <Icon name={name} size={size} color={color} mdIcon={mdIcon} />
  </Button>
);
