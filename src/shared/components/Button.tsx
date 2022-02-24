import { PlatformPressable } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleSheet, Text } from 'react-native';
import { makeStyles, Theme } from '~/shared/theme';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: theme.dimensions.padding * 2,
    paddingVertical: theme.dimensions.padding,
    borderRadius: theme.dimensions.radius,
  },
  fullWidth: {
    width: '100%',
  },
  title: {
    fontSize: theme.text.baseSize + 2
  },
  'button-contained': {
    backgroundColor: theme.colors.secondary,
  },
  'button-contained-text': {
    color: theme.colors.invertedText,
  },
  'button-text': {
    backgroundColor: 'none',
  },
  'button-text-text': {
    color: theme.colors.text,
  },
  'button-outline': {
    backgroundColor: theme.colors.background,
    borderWidth: theme.dimensions.border,
    borderColor: theme.colors.secondary
  },
  'button-outline-text': {
    color: theme.colors.secondary,
  }
}));

type ButtonBaseProps = {
  onPress: (event: GestureResponderEvent) => void;
  rippleRadius?: number;
  fullWidth?: boolean;
  type?: 'text' | 'contained' | 'outline' | 'ripple-only';
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
  type = 'contained'
}: ButtonWithChildren | ButtonWithTitle) => {
  const styles = useStyles();
  const theme = useTheme() as Theme;

  return (
    <PlatformPressable
      pressColor={theme.colors.ripple}
      style={StyleSheet.flatten([
        styles.container,
        fullWidth && styles.fullWidth,
        styles[`button-${type}`]
      ])}
      onPress={onPress}
      android_ripple={{ radius: rippleRadius }}
    >
      {title && <Text style={StyleSheet.create([styles.title, styles[`button-${type}-text`]])}>{title}</Text>}
      {children}
    </PlatformPressable>
  );
};
