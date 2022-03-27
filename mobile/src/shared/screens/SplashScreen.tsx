import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useNavigationOptions } from '~/shared/navigation';
import * as Auth from '~/auth/utils';
import { AccountsScreen } from '~/accounts/screens';
import { LoginScreen } from '~/auth/screens';

export const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useNavigationOptions({
    headerShown: false,
  });

  useEffect(() => {
    (async () => {
      const route: string = (await Auth.getToken())
        ? AccountsScreen.route
        : LoginScreen.route;
      navigation.replace(route);
    })();
  }, [navigation]);

  return <View />;
};

SplashScreen.route = 'Splash';
