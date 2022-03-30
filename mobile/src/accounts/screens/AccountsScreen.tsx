import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';

import { Container, Error, IconButton, Loading } from '~/shared/components';
import { makeStyles, Theme } from '~/shared/theme';
import { useNavigationOptions } from '~/shared/navigation';
import { useText } from '~/accounts/intl';
import { DashboardScreen } from '~/dashboard/screens';
import { useAccounts } from '~/accounts/hooks';
import { AccountCard, EmptyAccountsList } from '~/accounts/components';

import { SelectAccountTypeScreen } from './SelectAccountTypeScreen';

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
    marginBottom: theme.dimensions.margin,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

export const AccountsScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation<any>();
  const { getText } = useText();
  const { accounts, loading, error } = useAccounts();

  useNavigationOptions({
    title: getText('accounts.title'),
    headerRight: () => (
      <IconButton name="plus" onPress={handlePressNewAccount} />
    ),
  });

  const handlePressNewAccount = useCallback(() => {
    navigation.navigate(SelectAccountTypeScreen.route);
  }, [navigation]);

  const handlePressSelectAccount = useCallback(
    (account: { id: number }) => {
      navigation.navigate(DashboardScreen.route, { accountId: account.id });
    },
    [navigation],
  );

  return (
    <Container
      scrollable
      style={StyleSheet.flatten([
        styles.container,
        accounts.length === 0 && styles.emptyContainer,
      ])}
    >
      {error && <Error error={error} />}
      {loading ? (
        <Loading />
      ) : accounts.length === 0 ? (
        <EmptyAccountsList onPressNewAccount={handlePressNewAccount} />
      ) : (
        <>
          {accounts.map((account: any, index: number) => (
            <View key={index} style={styles.cardBox}>
              <PlatformPressable
                onPress={() => handlePressSelectAccount(account)}
              >
                <AccountCard account={account} />
              </PlatformPressable>
            </View>
          ))}
        </>
      )}
    </Container>
  );
};

AccountsScreen.route = 'Accounts';
