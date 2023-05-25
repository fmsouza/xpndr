import { Box, Typography } from '@mui/material';

import { MENU_ITEMS } from '../../../constants';

import {NavGroup} from './NavGroup';

export const Navigation = () => {
  const navGroups = MENU_ITEMS.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};
