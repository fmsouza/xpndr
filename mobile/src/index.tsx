import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useBaseTheme } from '~/shared/theme';
import { IntlProvider } from '~/shared/intl';
import { initialScreen, screens } from './screens';

const Stack = createNativeStackNavigator();

export const App = () => {
  const theme = useBaseTheme();
  return (
    <IntlProvider>
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
    </IntlProvider>
  );
};
