import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

import { makeStyles } from '~/shared/theme';
import { Theme } from '~/shared/theme';
import { categoriesToPieSlices } from '../utils';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pieChart: {
    width: theme.viewport.width * 0.4,
    height: theme.viewport.width * 0.4,
  },
  items: {
    marginLeft: theme.dimensions.margin * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  categoryItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: theme.dimensions.margin / 2,
  },
  categoryColorIndicator: {
    width: 16,
    height: 16,
    marginRight: theme.dimensions.margin,
  },
  categoryTitle: {
    color: theme.colors.text,
    fontSize: 16,
  },
}));

type PieViewProps = {
  items: Array<{ category: string, amount: number }>,
  total: number,
};

export const PieView = React.memo(({ items, total }: PieViewProps) => {
  const styles = useStyles();

  const pieSlices = categoriesToPieSlices(items);

  return (
    <View style={styles.container}>
      <PieChart
        style={styles.pieChart}
        data={pieSlices}
        innerRadius={0}
        padAngle={0}
      />
      <View style={styles.items}>
        {pieSlices.map(slice => (
          <View key={slice.title} style={styles.categoryItem}>
            <View
              style={StyleSheet.flatten([styles.categoryColorIndicator, {
                backgroundColor: slice.svg.fill,
              }])}
            />
            <Text style={styles.categoryTitle}>
              {slice.title} ({((slice.value / total) * 100).toFixed(0)}
              %)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
});
