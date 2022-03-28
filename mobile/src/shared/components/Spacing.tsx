import React from 'react';
import { View } from 'react-native';

type SpacingProps = {
  height?: number;
};

export const Spacing = ({ height = 8 }: SpacingProps) => (
  <View style={{ height }} />
);
