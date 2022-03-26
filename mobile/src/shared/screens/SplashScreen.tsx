import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useNavigationOptions } from '~/shared/navigation';
import * as Auth from '~/auth/utils';
import { useNavigation } from '@react-navigation/native';
import { AccountsScreen } from '~/accounts/screens';
import { LoginScreen } from '~/auth/screens';

export const SplashScreen = () => {
  const navigation = useNavigation();

  useNavigationOptions({
    headerShown: false
  });

  useEffect(() => {
    (async () => {
      const route: string = await Auth.getToken() ? AccountsScreen.route : LoginScreen.route;
      navigation.navigate(route as any);
    })();
  }, []);

  return (
    <View />
  );
};

SplashScreen.route = 'Splash';
