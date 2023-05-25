import {SimpleBar} from '../../../../components';

import {Navigation} from './Navigation';

export const DrawerContent = () => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation />
  </SimpleBar>
);
