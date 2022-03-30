import * as React from 'react';
import { View } from 'react-native';

type DashboardNavigationBarProps = {
  startDate: Date;
  endDate: Date;
  hasPreviousPeriod: boolean;
  hasNextPeriod: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export const DashboardNavigationBar = ({
  startDate,
  endDate,
  hasNextPeriod,
  hasPreviousPeriod,
  onNext,
  onPrevious,
}: DashboardNavigationBarProps) => {
  return <View />;
};
