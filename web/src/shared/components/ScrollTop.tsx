import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type ScrollTopProps = {
  children?: React.ReactNode;
};

export const ScrollTop = ({ children }: ScrollTopProps) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return (children ?? null) as React.ReactElement;
};
