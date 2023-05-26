import { Navigate, useRoutes } from 'react-router-dom';

import {Routes as AuthRoutes} from './modules/auth/routes';
import {Routes as AccountRoutes} from './modules/account/routes';
import { ProtectedRoute } from './modules/auth/components';

export const Routes = () => {
  return useRoutes([
    { path: '/', Component: ProtectedRoute(() => <Navigate to="/account/dashboard" replace />)},
    AuthRoutes,
    AccountRoutes,
  ]);
};
