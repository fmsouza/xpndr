import React from 'react';

import { Card } from '~/shared/components';

type AccountCardProps = {
  account: { title: string };
};

export const AccountCard = ({ account }: AccountCardProps) => {
  return <Card title={account.title} subtitle="Account details" />;
};
