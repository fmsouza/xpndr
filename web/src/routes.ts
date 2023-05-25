import { useRoutes } from 'react-router-dom';

import {Routes as AuthRoutes} from './modules/auth/routes';
// import {MainRoutes} from './MainRoutes';

export const Routes = () => {
  return useRoutes([
    // MainRoutes,
    AuthRoutes
  ]);
};

// export const MainRoutes = {
  // path: '/',
  // element: <MainLayout />,
  // children: [
  //   {
  //     path: '/',
  //     element: <DashboardDefault />
  //   },
  //   {
  //     path: 'color',
  //     element: <Color />
  //   },
  //   {
  //     path: 'dashboard',
  //     children: [
  //       {
  //         path: 'default',
  //         element: <DashboardDefault />
  //       }
  //     ]
  //   },
  //   {
  //     path: 'sample-page',
  //     element: <SamplePage />
  //   },
  //   {
  //     path: 'shadow',
  //     element: <Shadow />
  //   },
  //   {
  //     path: 'typography',
  //     element: <Typography />
  //   },
  //   {
  //     path: 'icons/ant',
  //     element: <AntIcons />
  //   }
  // ]
// };