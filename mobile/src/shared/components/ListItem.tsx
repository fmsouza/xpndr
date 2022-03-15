import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import color from 'color';

import { makeStyles, Theme } from '~/shared/theme';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.dimensions.padding,
    width: theme.viewport.width,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rightColumn: {
    paddingRight: theme.dimensions.padding * 2,
  },
  leadingContainer: {
    marginRight: theme.dimensions.margin,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.text.baseSize,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.text.baseSize - 2,
    color: color(theme.colors.text)
      .lighten(0.9)
      .hex()
      .toString(),
  },
}));

type ListItemProps = {
  title: string,
  subtitle?: string,
  onPress?: (event: GestureResponderEvent) => void,
  leading?: ReactNode,
  trailing?: ReactNode,
  noBorder?: boolean,
};

export const ListItem = ({ leading, title, subtitle, onPress, trailing, noBorder }: ListItemProps) => {
  const styles = useStyles();

  return (
    <PlatformPressable
      onPress={onPress}
      pressColor="white"
      style={StyleSheet.flatten([
        styles.container,
        !noBorder && styles.border
      ])}
    >
      <View style={styles.leftColumn}>
        {leading && <View style={styles.leadingContainer}>{leading}</View>}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {trailing && <View style={styles.rightColumn}>{trailing}</View>}
    </PlatformPressable>
  );
};