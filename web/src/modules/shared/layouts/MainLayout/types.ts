import { ChipProps } from "@mui/material";

export type NavItem = {
  id: string;
  title: string;
  type: string;
  url?: string;
  icon?: any;
  target?: boolean;
  external?: boolean;
  breadcrumbs?: boolean;
  disabled?: boolean;
  chip?: ChipProps;
};

export type NavSection = NavItem & {
  children: NavItem[];
};
