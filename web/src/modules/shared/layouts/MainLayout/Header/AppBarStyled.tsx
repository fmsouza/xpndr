import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';

import { DRAWER_WIDTH } from '../Drawer/constants';

export const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: any) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));
