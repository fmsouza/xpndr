import { ScreenType } from '~/shared/navigation';

import * as Accounts from '~/accounts/screens';
import * as Auth from '~/auth/screens';
import * as Dashboard from '~/dashboard/screens';
import * as Home from '~/home/screens';
import * as Settings from '~/settings/screens';
import * as Shared from '~/shared/screens';

export const initialScreen = Shared.SplashScreen.route;

export const screens: ScreenType[] = [
  ...Object.values(Accounts),
  ...Object.values(Auth),
  ...Object.values(Dashboard),
  ...Object.values(Home),
  ...Object.values(Settings),
  ...Object.values(Shared),
];
