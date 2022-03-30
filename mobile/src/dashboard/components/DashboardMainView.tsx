import * as React from 'react';
import { View } from 'react-native';
import { PieView } from './PieView';

type DashboardMainViewProps = {
  accountDashboard: {
    credit: {
      total: number;
      expensesByCategory: Array<{ category: string, amount: number }>;
    }
  };
};

export const DashboardMainView = ({
  accountDashboard,
}: DashboardMainViewProps) => {
  return (
    <View>
      <PieView items={accountDashboard.credit.expensesByCategory} total={accountDashboard.credit.total} />
    </View>
  );
};
