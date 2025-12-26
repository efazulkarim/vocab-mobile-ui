import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

export const SRSActionBar = () => {
  return (
    <View className="flex-row justify-between border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-900">
      <TouchableOpacity className="flex-1 rounded-xl bg-red-100 py-3 dark:bg-red-900/30">
        <Text className="text-center font-bold text-red-600 dark:text-red-400">
          Again
        </Text>
        <Text className="text-center text-xs text-red-500 dark:text-red-300">
          1m
        </Text>
      </TouchableOpacity>

      <View className="w-4" />

      <TouchableOpacity className="flex-1 rounded-xl bg-blue-100 py-3 dark:bg-blue-900/30">
        <Text className="text-center font-bold text-blue-600 dark:text-blue-400">
          Good
        </Text>
        <Text className="text-center text-xs text-blue-500 dark:text-blue-300">
          10m
        </Text>
      </TouchableOpacity>

      <View className="w-4" />

      <TouchableOpacity className="flex-1 rounded-xl bg-green-100 py-3 dark:bg-green-900/30">
        <Text className="text-center font-bold text-green-600 dark:text-green-400">
          Easy
        </Text>
        <Text className="text-center text-xs text-green-500 dark:text-green-300">
          4d
        </Text>
      </TouchableOpacity>
    </View>
  );
};
