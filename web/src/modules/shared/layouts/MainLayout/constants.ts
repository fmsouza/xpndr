import * as Icons from '@ant-design/icons';

import { NavSection } from "./types";

export const MENU_ITEMS: NavSection[] = [
  {
    id: 'group-account',
    title: 'Account',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Account Dashboard',
        type: 'item',
        url: '/account/dashboard',
        icon: Icons.DashboardOutlined,
        breadcrumbs: false
      }
    ]
  }
];
