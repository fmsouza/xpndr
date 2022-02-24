import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button, Container, IconButton, Text } from '~/shared/components';
import { makeStyles, Theme } from '~/shared/theme';
import { useNavigationOptions } from '~/shared/navigation';

import { SecondScreen } from './SecondScreen';
import { useText } from '~/home/intl';

const useStyles = makeStyles((_: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}));

export const HomeScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {getText} = useText();
  const [count, setCount] = useState(0);

  useNavigationOptions({
    title: getText('homePage.title'),
    headerRight: () => (
      <IconButton name="plus" color="white" onPress={handleButtonTap} />
    ),
  });

  const handleButtonTap = () => {
    setCount(c => c + 1);
  };

  const handleNextPagePress = () => {
    navigation.navigate(SecondScreen.route as any);
  };

  return (
    <Container style={styles.container}>
      <Text>{getText('actions.count')}: {count}</Text>
      <Button title={getText('actions.next')} onPress={handleNextPagePress} fullWidth />
    </Container>
  );
};

HomeScreen.route = 'Home';
