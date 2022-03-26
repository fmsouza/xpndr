import React, { ComponentType } from 'react';
import { GestureResponderEvent } from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import MDCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  mdIcon?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

export const Icon = ({
  mdIcon,
  size = 24,
  color = 'black',
  ...props
}: IconProps) => {
  const IconComponent: ComponentType<any> = mdIcon ? MDIcon : MDCIcon;
  return (
    <IconComponent
      {...props}
      type={mdIcon ? 'md' : ''}
      size={size}
      color={color}
    />
  );
};
