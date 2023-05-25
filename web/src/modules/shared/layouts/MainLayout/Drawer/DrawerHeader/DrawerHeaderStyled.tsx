// material-ui
import { Theme, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

type DrawerHeaderStyledProps = {
  open: boolean;
  theme: Theme;
};

export const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: DrawerHeaderStyledProps) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  paddingLeft: theme.spacing(open ? 3 : 0)
}));
