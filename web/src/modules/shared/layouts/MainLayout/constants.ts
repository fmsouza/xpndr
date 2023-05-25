import * as Icons from '@ant-design/icons';

import { NavSection } from "./types";

export const MENU_ITEMS: NavSection[] = [
  {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/default',
        icon: Icons.DashboardOutlined,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    children: [
      {
        id: 'login1',
        title: 'Login',
        type: 'item',
        url: '/login',
        icon: Icons.LoginOutlined,
        target: true
      },
      {
        id: 'register1',
        title: 'Register',
        type: 'item',
        url: '/register',
        icon: Icons.ProfileOutlined,
        target: true
      }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    type: 'group',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        icon: Icons.ChromeOutlined
      },
      {
        id: 'documentation',
        title: 'Documentation',
        type: 'item',
        url: 'https://codedthemes.gitbook.io/mantis/',
        icon: Icons.QuestionOutlined,
        external: true,
        target: true
      }
    ]
  },
  {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
      {
        id: 'util-typography',
        title: 'Typography',
        type: 'item',
        url: '/typography',
        icon: Icons.FontSizeOutlined
      },
      {
        id: 'util-color',
        title: 'Color',
        type: 'item',
        url: '/color',
        icon: Icons.BgColorsOutlined
      },
      {
        id: 'util-shadow',
        title: 'Shadow',
        type: 'item',
        url: '/shadow',
        icon: Icons.BarcodeOutlined
      },
      {
        id: 'ant-icons',
        title: 'Ant Icons',
        type: 'item',
        url: '/icons/ant',
        icon: Icons.AntDesignOutlined,
        breadcrumbs: false
      }
    ]
  }
];
