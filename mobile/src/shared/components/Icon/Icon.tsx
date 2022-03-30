import React, { ComponentType } from 'react';
import { GestureResponderEvent } from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import MDCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '~/shared/theme';

export type IconProps = {
  name: string;
  size?: number;
  color?: string;
  mdIcon?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

export const Icon = ({
  mdIcon,
  size = 24,
  color,
  ...props
}: IconProps) => {
  const theme = useTheme();
  const IconComponent: ComponentType<any> = mdIcon ? MDIcon : MDCIcon;

  return (
    <IconComponent
      {...props}
      type={mdIcon ? 'md' : ''}
      size={size}
      color={color ?? theme.colors.text}
    />
  );
};
