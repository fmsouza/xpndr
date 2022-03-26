import { ScreenType } from '~/shared/navigation';

import * as Accounts from '~/accounts/screens';
import * as Auth from '~/auth/screens';
import * as Home from '~/home/screens';
import * as Settings from '~/settings/screens';

export const initialScreen = Auth.LoginScreen.route;

export const screens: ScreenType[] = [
  ...Object.values(Accounts),
  ...Object.values(Auth),
  ...Object.values(Home),
  ...Object.values(Settings),
];
