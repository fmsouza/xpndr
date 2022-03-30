import { useNavigation } from '@react-navigation/native';
import { ComponentType, useLayoutEffect } from 'react';

import { useTheme } from './theme';

export type ScreenType = ComponentType<any> & { route: string; options?: any };

export type ScreenRoute<T> = { params: T };

export const useNavigationOptions = (options: Partial<{}>) => {
  const navigation = useNavigation();
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        color: theme.colors.text,
      },
      ...options,
    });
  }, [navigation, options, theme]);
};
