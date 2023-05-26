import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import {
  Box,
  Button,
  FormControl,
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

import { useSignupForm } from './useSignupForm';

export const SignupForm = () => {
  const {form, passwordLevel, handleChangePassword} = useSignupForm();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form noValidate onSubmit={form.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
              <OutlinedInput
                id="firstname-login"
                type="firstname"
                value={form.values.firstname}
                name="firstname"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                placeholder="John"
                fullWidth
                error={Boolean(form.touched.firstname && form.errors.firstname)}
              />
              {form.touched.firstname && form.errors.firstname && (
                <FormHelperText error id="helper-text-firstname-signup">
                  {form.errors.firstname}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(form.touched.lastname && form.errors.lastname)}
                id="lastname-signup"
                type="lastname"
                value={form.values.lastname}
                name="lastname"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                placeholder="Doe"
                inputProps={{}}
              />
              {form.touched.lastname && form.errors.lastname && (
                <FormHelperText error id="helper-text-lastname-signup">
                  {form.errors.lastname}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(form.touched.email && form.errors.email)}
                id="email-login"
                type="email"
                value={form.values.email}
                name="email"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                placeholder="demo@company.com"
                inputProps={{}}
              />
              {form.touched.email && form.errors.email && (
                <FormHelperText error id="helper-text-email-signup">
                  {form.errors.email}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-signup">Password</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(form.touched.password && form.errors.password)}
                id="password-signup"
                type={showPassword ? 'text' : 'password'}
                value={form.values.password}
                name="password"
                onBlur={form.handleBlur}
                onChange={(e) => {
                  form.handleChange(e);
                  handleChangePassword(e.target.value);
                }}
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
                placeholder="******"
                inputProps={{}}
              />
              {form.touched.password && form.errors.password && (
                <FormHelperText error id="helper-text-password-signup">
                  {form.errors.password}
                </FormHelperText>
              )}
            </Stack>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box sx={{ bgcolor: passwordLevel?.color, width: 85, height: 8, borderRadius: '7px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {passwordLevel?.label}
                  </Typography>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              By Signing up, you agree to our &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="#">
                Terms of Service
              </Link>
              &nbsp; and &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="#">
                Privacy Policy
              </Link>
            </Typography>
          </Grid>
          {form.errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{form.errors.submit}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button disableElevation disabled={form.isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
              Create Account
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
