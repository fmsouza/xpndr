import { useRoutes } from 'react-router-dom';

import {Routes as AuthRoutes} from './modules/auth/routes';
import {Routes as DashboardRoutes} from './modules/dashboard/routes';

export const Routes = () => {
  return useRoutes([
    AuthRoutes,
    DashboardRoutes,
  ]);
};
