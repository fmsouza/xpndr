import * as React from 'react';
import { View } from 'react-native';

type DashboardMainViewProps = {
  accountDashboard: {};
};

export const DashboardMainView = ({
  accountDashboard,
}: DashboardMainViewProps) => {
  console.log(accountDashboard);

  return <View />;
};
