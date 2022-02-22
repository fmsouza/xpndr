import React, { ReactNode } from 'react';
import { GestureResponderEvent, Pressable, Text } from 'react-native';
import { makeStyles, Theme } from '~/shared/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  rightHeaderContainer: {
    marginRight: 10,
  },
}));

type ButtonBaseProps = {
  onPress: (event: GestureResponderEvent) => void;
  rippleRadius?: number;
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
  rippleRadius = 40,
}: ButtonWithChildren | ButtonWithTitle) => {
  const styles = useStyles();

  const rippleConfig = {
    color: 'white',
    borderless: true,
    radius: rippleRadius,
  };

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      android_ripple={rippleConfig}
    >
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </Pressable>
  );
};
