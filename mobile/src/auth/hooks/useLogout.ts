import { useNavigation } from '@react-navigation/native';

import * as Auth from '~/auth/utils';

import { LoginScreen } from '../screens';

export const useLogout = () => {
  const navigation = useNavigation<any>();
  
  return async () => {
    await Auth.logout();
    navigation.replace(LoginScreen.route);
  };
};
