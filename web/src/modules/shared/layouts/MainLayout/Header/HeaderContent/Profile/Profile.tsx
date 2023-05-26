import { useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';

import { useAuth, useMe } from '../../../../../../auth/hooks';
import {Card} from '../../../../../components';

import {ProfileTab} from './ProfileTab';
import {SettingsTab} from './SettingsTab';

// import avatar1 from 'assets/images/users/avatar-1.png';
const avatar1 = '#';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
  [x: string]: any;
};

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

export const Profile = () => {
  const theme = useTheme();
  const {logout: handleLogout} = useAuth();
  const {me} = useMe();

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  const iconBackColorOpen = 'grey.300';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt={me?.name} src={avatar1} sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1">{me?.name}</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {open && (
          <Paper
            sx={{
              boxShadow: theme.customShadows.z1,
              width: 290,
              minWidth: 240,
              maxWidth: 290,
              [theme.breakpoints.down('md')]: {
                maxWidth: 250
              }
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Card elevation={0} border={false} content={false}>
                <CardContent sx={{ px: 2.5, pt: 3 }}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Avatar alt={me?.name} src={avatar1} sx={{ width: 32, height: 32 }} />
                        <Stack>
                          <Typography variant="h6">{me?.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {me?.email}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <IconButton size="large" color="secondary" onClick={handleLogout}>
                        <LogoutOutlined />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
                {open && (
                  <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                        <Tab
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textTransform: 'capitalize'
                          }}
                          icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                          label="Profile"
                          {...a11yProps(0)}
                        />
                        <Tab
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textTransform: 'capitalize'
                          }}
                          icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                          label="Setting"
                          {...a11yProps(1)}
                        />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      <ProfileTab handleLogout={handleLogout} />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                      <SettingsTab />
                    </TabPanel>
                  </>
                )}
              </Card>
            </ClickAwayListener>
          </Paper>
        )}
      </Popper>
    </Box>
  );
};
