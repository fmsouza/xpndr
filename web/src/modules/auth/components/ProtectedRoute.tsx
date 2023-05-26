import React from 'react';
import {Navigate} from 'react-router-dom';

import { useAuth } from '../hooks';

type AccessProtectionProps = {
  children: React.ReactNode;
};

const AccessProtection = ({children}: AccessProtectionProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export const ProtectedRoute = (Component: React.ComponentType<any>) => (props: React.PropsWithChildren) => (
  <AccessProtection>
    <Component {...props} />
  </AccessProtection>
);