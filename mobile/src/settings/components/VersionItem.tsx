import React from 'react';
import { useTheme } from '@react-navigation/native';

import { Icon, ListItem } from '~/shared/components';
import { useAppDetails } from '~/shared/utils';

export const VersionItem = () => {
  const theme = useTheme();
  const app = useAppDetails();

  return (
    <ListItem
      leading={<Icon name="info" mdIcon={true} size={32} color={theme.colors.text} />}
      title={app.name}
      subtitle={`Version: v${app.version}`}
      noBorder
    />
  );
};