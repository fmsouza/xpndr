import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

import { useLoginForm } from './useLoginForm';

export const LoginForm = () => {
  const {form} = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form noValidate onSubmit={form.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <OutlinedInput
                id="email-login"
                type="email"
                value={form.values.email}
                name="email"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                placeholder="Enter email address"
                fullWidth
                error={Boolean(form.touched.email && form.errors.email)}
              />
              {form.touched.email && form.errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {form.errors.email}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(form.touched.password && form.errors.password)}
                id="-password-login"
                type={showPassword ? 'text' : 'password'}
                value={form.values.password}
                name="password"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Enter password"
              />
              {form.touched.password && form.errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {form.errors.password}
                </FormHelperText>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} sx={{ mt: -1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.values.keepMeSignedIn}
                    onChange={form.handleChange}
                    name="keepMeSignedIn"
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="h6">Keep me sign in</Typography>}
              />
              <Link variant="h6" component={RouterLink} to="" color="text.primary">
                Forgot Password?
              </Link>
            </Stack>
          </Grid>
          {form.errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{form.errors.submit}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button disableElevation disabled={form.isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
