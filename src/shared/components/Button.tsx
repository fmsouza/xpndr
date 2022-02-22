import { PlatformPressable } from '@react-navigation/elements';
import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleSheet, Text } from 'react-native';
import { makeStyles, Theme } from '~/shared/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: theme.dimensions.padding * 2,
    paddingVertical: theme.dimensions.padding,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.dimensions.radius,
  },
  fullWidth: {
    width: '100%',
  },
}));

type ButtonBaseProps = {
  onPress: (event: GestureResponderEvent) => void;
  rippleRadius?: number;
  fullWidth?: boolean;
};

type ButtonWithTitle = ButtonBaseProps & {
  children?: never;
  title: string;
  leadingIcon?: string;
  trailingIcon?: string;
};

type ButtonWithChildren = ButtonBaseProps & {
  title?: never;
  children: ReactNode;
};

export const Button = ({
  onPress,
  children,
  title,
  rippleRadius,
  fullWidth,
}: ButtonWithChildren | ButtonWithTitle) => {
  const styles = useStyles();

  return (
    <PlatformPressable
      pressColor="white"
      style={StyleSheet.flatten([
        styles.container,
        fullWidth && styles.fullWidth,
      ])}
      onPress={onPress}
      android_ripple={{ radius: rippleRadius }}
    >
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </PlatformPressable>
  );
};
