import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { Container, IconButton } from '~/shared/components';
import { makeStyles, Theme } from '~/shared/theme';
import { useNavigationOptions } from '~/shared/navigation';
import { useText } from '~/accounts/intl';

import { AccountCard, EmptyAccountsList } from '../components';
import { NewAccountTypeScreen } from './NewAccountTypeScreen';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: theme.dimensions.padding * 2,
    paddingHorizontal: theme.dimensions.padding,
  },
  cardBox: {
    flex: 1,
    width: '100%',
    marginBottom: theme.dimensions.margin
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
}));

export const AccountsScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {getText} = useText();
  const [accounts, _] = useState([]);

  useNavigationOptions({
    title: getText('accounts.title'),
    headerRight: () => (
      <IconButton name="plus" color="black" onPress={handlePressNewAccount} />
    ),
  });

  const handlePressNewAccount = useCallback(() => {
    navigation.navigate(NewAccountTypeScreen.route as any);
  }, [navigation.navigate]);

  return (
    <Container scrollable style={StyleSheet.flatten([styles.container, accounts.length === 0 && styles.emptyContainer])}>
      {accounts.map((account: any, index: number) => (
        <View key={index} style={styles.cardBox}>
          <AccountCard account={account} />
        </View>
      ))}
      {accounts.length === 0 && <EmptyAccountsList onPressNewAccount={handlePressNewAccount} />}
    </Container>
  );
};

AccountsScreen.route = 'Accounts';