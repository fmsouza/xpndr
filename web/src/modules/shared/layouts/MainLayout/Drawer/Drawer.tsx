import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Drawer as MUIDrawer, useMediaQuery } from '@mui/material';

import {DrawerHeader} from './DrawerHeader';
import {DrawerContent} from './DrawerContent';
import {MiniDrawerStyled} from './MiniDrawerStyled';
import { DRAWER_WIDTH } from './constants';

type DrawerProps = {
  open: boolean;
  handleDrawerToggle: () => void;
  window?: any;
};

export const Drawer = ({ open, handleDrawerToggle, window }: DrawerProps) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniDrawerStyled variant="permanent" open={open}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <MUIDrawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit'
            }
          }}
        >
          {open && drawerHeader}
          {open && drawerContent}
        </MUIDrawer>
      )}
    </Box>
  );
};
