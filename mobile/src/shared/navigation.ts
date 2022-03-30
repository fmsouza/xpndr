import { useNavigation } from '@react-navigation/native';
import { ComponentType, useLayoutEffect } from 'react';

export type ScreenType = ComponentType<any> & { route: string; options?: any };

export type ScreenRoute<T> = { params: T };

export const useNavigationOptions = (options: Partial<{}>) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);
};
