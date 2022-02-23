import { StatusBarProps } from 'react-native';
import { Theme as RNTheme } from '@react-navigation/native';

export type Theme = RNTheme & {
  statusBar: StatusBarProps;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    invertedText: string;
    border: string;
    notification: string;
  };
  dimensions: {
    padding: number;
    margin: number;
    radius: number;
    border: number;
  };
  text: {
    baseSize: number;
  };
  navbar: Partial<{
    headerStyle: Partial<{}>;
    headerTintColor?: string;
    headerTitleStyle: Partial<{}>;
  }>
};