import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import {Loadable} from '../shared/components';
import {MinimalLayout} from '../layouts';

export const LoginRoutes: RouteObject = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      Component: Loadable(lazy(() => import('../modules/auth/pages/LoginPage'))),
    },
    {
      path: 'register',
      Component: Loadable(lazy(() => import('../modules/auth/pages/RegisterPage'))),
    }
  ]
};
