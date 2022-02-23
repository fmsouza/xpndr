import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useBaseTheme } from '~/shared/theme';
import { ScreenType } from '~/shared/navigation';
import * as Home from '~/home/screens';

export const initialScreen = Home.HomeScreen.route;

const screens: ScreenType[] = [...Object.values(Home)];

const Stack = createNativeStackNavigator();

export const App = () => {
  const theme = useBaseTheme();
  return (
    <NavigationContainer theme={theme}>
      <StatusBar {...theme.statusBar} />
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{...theme.navbar}}
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
