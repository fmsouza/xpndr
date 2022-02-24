import React from 'react';
import { useTheme } from '@react-navigation/native';

import { Icon, ListItem } from '~/shared/components';

import metadata from '../../../package.json';

export const VersionItem = () => {
  const theme = useTheme();

  return (
    <ListItem
      leading={<Icon name="info" mdIcon={true} size={32} color={theme.colors.text} />}
      title={metadata.name}
      subtitle={`Version: v${metadata.version}`}
      noBorder
    />
  );
};