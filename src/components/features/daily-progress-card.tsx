import React from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import { Text } from '@/components/ui';

export const DailyProgressCard = () => {
  const pieData = [
    { value: 70, color: '#3b82f6', focused: true }, // Blue-500
    { value: 30, color: '#e5e7eb' }, // Gray-200
  ];

  return (
    <View className="mx-4 my-4 flex-row items-center justify-between rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-900">
      <View>
        <Text className="text-left text-lg font-semibold text-neutral-900 dark:text-white">
          Daily Goal
        </Text>
        <Text className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          24 / 30 words
        </Text>
        <View className="mt-4 flex-row items-center">
          <View className="mr-2 h-2 w-2 rounded-full bg-orange-500" />
          <Text className="text-sm font-medium text-orange-500">
            12 Day Streak! 🔥
          </Text>
        </View>
      </View>

      <View className="items-center justify-center">
        <PieChart
          donut
          radius={45}
          innerRadius={35}
          data={pieData}
          centerLabelComponent={() => {
            return (
              <Text className="text-xs font-bold text-neutral-800 dark:text-white">
                80%
              </Text>
            );
          }}
        />
      </View>
    </View>
  );
};
