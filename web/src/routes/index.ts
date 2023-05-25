import { useRoutes } from 'react-router-dom';

import {LoginRoutes} from './LoginRoutes';
import {MainRoutes} from './MainRoutes';

export const Routes = () => {
  return useRoutes([MainRoutes, LoginRoutes]);
};
