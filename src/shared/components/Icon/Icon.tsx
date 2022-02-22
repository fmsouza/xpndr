import React, { ComponentType } from 'react';
import { GestureResponderEvent } from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import MDCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  type?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export const Icon = ({
  type = '',
  size = 24,
  color = 'black',
  ...props
}: IconProps) => {
  const IconComponent: ComponentType<any> = type === 'md' ? MDIcon : MDCIcon;
  return <IconComponent {...props} type={type} size={size} color={color} />;
};
