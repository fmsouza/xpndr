import { Box, Theme, useMediaQuery } from '@mui/material';

import {Search} from './Search';
import {Profile} from './Profile';
import {Notification} from './Notification';
import {MobileSection} from './MobileSection';

export const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};
