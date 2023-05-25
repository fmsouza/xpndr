import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import {Loadable} from '../shared/components';
import { MainLayout } from '../shared/layouts';

export const Routes: RouteObject = {
  path: '/account',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      index: true,
      Component: Loadable(lazy(() => import('./pages/AccountDashboardPage'))),
    }
  ]
};
