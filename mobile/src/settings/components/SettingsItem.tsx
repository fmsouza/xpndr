import React from 'react';
import { GestureResponderEvent, Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Icon, ListItem } from '~/shared/components';

type BaseSettingsItemProps = {
  icon: string,
  mdIcon?: boolean,
  title: string,
  subtitle?: string
};

type SettingsItemWithPressProps = BaseSettingsItemProps & {
  actionType?: never;
  onPress: (event: GestureResponderEvent) => void;
  value?: never;
  onChange?: never;
};

type SettingsItemWithSwitchProps = BaseSettingsItemProps & {
  actionType: 'switch';
  onPress?: never;
  onChange?: (value: boolean) => void;
  value?: boolean;
};

type SettingsItemProps = SettingsItemWithPressProps | SettingsItemWithSwitchProps;

export const SettingsItem = ({ icon, mdIcon, title, subtitle, onPress, onChange, actionType, value }: SettingsItemProps) => {
  const theme = useTheme();

  let trailing;
  if (actionType === 'switch') {
    trailing = <Switch value={value} onValueChange={onChange} />;
  }

  return (
    <ListItem
      leading={<Icon name={icon} mdIcon={mdIcon} size={32} color={theme.colors.text} />}
      title={title}
      subtitle={subtitle}
      onPress={onPress}
      trailing={trailing}
    />
  );
};