import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from '~/shared/components';
import { makeStyles, Theme } from '~/shared/theme';
import { useText } from '~/accounts/intl';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginVertical: theme.dimensions.margin * 4
  }
}));

type EmptyAccountsListProps = {
  onPressNewAccount: () => void
};

export const EmptyAccountsList = ({ onPressNewAccount }: EmptyAccountsListProps) => {
  const styles = useStyles();
  const {getText} = useText();
  return (
    <View style={styles.container}>
      <Icon name='close-outline' size={64} />
      <Text style={styles.label}>{getText('accounts.noAccounts')}</Text>
      <Button type='outline' onPress={onPressNewAccount} title={getText('accounts.actions.create')} />
    </View>
  )
};
