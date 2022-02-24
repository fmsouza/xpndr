import React from 'react';
import { Alert, ScrollView } from 'react-native';

import { Container } from '~/shared/components';
import { useNavigationOptions } from '~/shared/navigation';
import { useText } from '~/settings/intl';
import { SettingsItem, VersionItem } from '../components';

export const SettingsScreen = () => {
  const { getText } = useText();

  useNavigationOptions({
    title: getText('settings.title'),
  });

  const onHandleNotImplemented = () => {
    Alert.alert('Not implemented', 'This action was not implemented yet.');
  };

  return (
    <Container>
      <ScrollView>
        <SettingsItem
          mdIcon
          icon="language"
          title={getText('settings.items.language.title')}
          subtitle={getText('settings.items.language.subtitle')}
          onPress={onHandleNotImplemented}
        />
        <SettingsItem
          icon="theme-light-dark"
          title={getText('settings.items.darkMode.title')}
          subtitle={getText('settings.items.darkMode.subtitle')}
          actionType="switch"
          value={false}
          onChange={onHandleNotImplemented}
        />
        <VersionItem />
      </ScrollView>
    </Container>
  );
};

SettingsScreen.route = 'Settings';