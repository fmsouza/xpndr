import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import {Loadable} from '../shared/components';

export const Routes: RouteObject = {
  path: '/auth',
  element: <Outlet />,
  children: [
    {
      path: 'login',
      Component: Loadable(lazy(() => import('./pages/LoginPage'))),
    },
    {
      path: 'register',
      Component: Loadable(lazy(() => import('./pages/RegisterPage'))),
    }
  ]
};
