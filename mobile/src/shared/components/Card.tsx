import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { makeStyles, Theme } from '../theme';
import { Text } from './Text';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    padding: theme.dimensions.padding,
    backgroundColor: theme.colors.background,
    borderRadius: 1,
    borderColor: 'black',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  elevation: {
    elevation: 2,
    shadowColor: '#000000',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: theme.text.baseSize,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: theme.text.baseSize - 2,
    color: '#666B6A',
  },
}));

type CardProps = {
  style?: Partial<{}>;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

export const Card = ({ title, subtitle, style, children }: CardProps) => {
  const styles = useStyles();

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        styles.shadow,
        styles.elevation,
      ])}
    >
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      <View style={StyleSheet.flatten([styles.content, style])}>
        {children}
      </View>
    </View>
  );
};
