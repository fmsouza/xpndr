import React from 'react';

import { Container, Text } from '~/shared/components';
import { makeStyles, Theme } from '~/shared/theme';
import { useNavigationOptions } from '~/shared/navigation';
import { useText } from '~/accounts/intl';

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

export const NewAccountTypeScreen = () => {
  const styles = useStyles();
  const { getText } = useText();

  useNavigationOptions({
    title: getText('newAccountType.title'),
  });

  return (
    <Container scrollable style={styles.container}>
      <Text>New Account</Text>
    </Container>
  );
};

NewAccountTypeScreen.route = 'NewAccountType';
