import React, { useCallback } from 'react';

import { Container, Error, Icon, ListItem, Loading } from '~/shared/components';
import { makeStyles, Theme } from '~/shared/theme';
import { useNavigationOptions } from '~/shared/navigation';
import { useText } from '~/accounts/intl';

import { useAccountTypes } from '../hooks';
import { useNavigation } from '@react-navigation/native';
import { NewAccountScreen } from './NewAccountScreen';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: theme.dimensions.padding * 2,
    paddingHorizontal: theme.dimensions.padding,
  },
}));

export const SelectAccountTypeScreen = () => {
  const styles = useStyles();
  const { getText } = useText();
  const navigation = useNavigation<any>();
  const { accountTypes, loading, error } = useAccountTypes();

  useNavigationOptions({
    title: getText('selectAccountType.title'),
  });

  const handlePressItem = useCallback(
    (item: { accountType: string }) => {
      navigation.navigate(NewAccountScreen.route, {
        accountType: item.accountType,
      });
    },
    [navigation],
  );

  return (
    <Container scrollable style={styles.container}>
      {error && <Error error={error} />}
      {loading ? (
        <Loading />
      ) : (
        <>
          {accountTypes.map((item: { accountType: string; label: string }) => (
            <ListItem
              key={item.accountType}
              title={item.label}
              onPress={() => handlePressItem(item)}
              trailing={<Icon name="chevron-right" />}
            />
          ))}
        </>
      )}
    </Container>
  );
};

SelectAccountTypeScreen.route = 'SelectAccountType';
