import { ScreenType } from '~/shared/navigation';
import * as Accounts from '~/accounts/screens';
import * as Home from '~/home/screens';
import * as Settings from '~/settings/screens';

export const initialScreen = Accounts.AccountsScreen.route;

export const screens: ScreenType[] = [
  ...Object.values(Accounts),
  ...Object.values(Home),
  ...Object.values(Settings),
];
