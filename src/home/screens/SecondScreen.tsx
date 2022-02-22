import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { makeStyles, Theme } from '~/shared/styles';
import { Button, Container } from '~/shared/components';

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

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <Container style={styles.container}>
      <Text>Congratulations! You navigated to the second screen!</Text>
      <Button
        title="Go back"
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
