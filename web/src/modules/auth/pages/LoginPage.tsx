import { Link } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';

import {AuthLayout} from '../layouts';
import { LoginForm } from '../forms';


export default function LoginPage() {
  return (
    <AuthLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <LoginForm />
        </Grid>
      </Grid>
    </AuthLayout>
  );
}