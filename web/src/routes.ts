import { useRoutes } from 'react-router-dom';

import {Routes as AuthRoutes} from './modules/auth/routes';
import {Routes as AccountRoutes} from './modules/account/routes';

export const Routes = () => {
  return useRoutes([
    AuthRoutes,
    AccountRoutes,
  ]);
};
