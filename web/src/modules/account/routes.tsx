import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ProtectedRoute } from '../auth/components';
import {Loadable} from '../shared/components';
import { MainLayout } from '../shared/layouts';

export const Routes: RouteObject = {
  path: '/account',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      index: true,
      Component: ProtectedRoute(
        Loadable(
          lazy(() => import('./pages/AccountDashboardPage'))
        )
      ),
    }
  ]
};
