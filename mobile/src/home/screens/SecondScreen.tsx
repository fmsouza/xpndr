import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { makeStyles, Theme } from '~/shared/theme';
import { Button, Container, Text } from '~/shared/components';
import { useText } from '~/home/intl';
import { useNavigationOptions } from '~/shared/navigation';

const useStyles = makeStyles((_: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const SecondScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { getText } = useText();

  useNavigationOptions({
    title: getText('secondPage.title'),
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <Container style={styles.container}>
      <Text>{getText('secondPage.congratulations')}</Text>
      <Button
        title={getText('actions.back')}
        leadingIcon="chevron-left"
        onPress={handleBackPress}
      />
    </Container>
  );
};

SecondScreen.route = 'Second';

SecondScreen.options = {
  title: 'Second page',
};
