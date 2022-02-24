import React from 'react';
import { View } from 'react-native';
import { makeStyles, Theme } from '~/shared/theme';

const useStyles = makeStyles((theme: Theme) => ({
  container: {}
}));

type EmptyAccountsListProps = {
  onPressNewAccount: () => void
};

export const EmptyAccountsList = ({ onPressNewAccount }: EmptyAccountsListProps) => {]
  const styles = useStyles();
  return (
    <View style={styles.container}>

    </View>
  )
};
