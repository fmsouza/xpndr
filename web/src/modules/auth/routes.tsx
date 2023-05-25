import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import {Loadable} from '../shared/components';
import {MinimalLayout} from '../shared/layouts';

export const Routes: RouteObject = {
  path: '/',
  element: <MinimalLayout />,
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
