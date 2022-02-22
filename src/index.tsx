import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DarkTheme, LightTheme } from '~/shared/theme';
import { ScreenType } from '~/shared/navigation';
import * as Home from '~/home/screens';

export const initialScreen = Home.HomeScreen.route;

const screens: ScreenType[] = [...Object.values(Home)];

const Stack = createNativeStackNavigator();

const SCREEN_OPTIONS = {
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#074F57',
  },
};

export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? LightTheme : DarkTheme;
  return (
    <NavigationContainer theme={theme}>
      <StatusBar {...theme.statusBar} />
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={SCREEN_OPTIONS}
      >
        {screens.map(screen => (
          <Stack.Screen
            key={screen.route}
            name={screen.route}
            component={screen}
            options={{ ...screen.options }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
