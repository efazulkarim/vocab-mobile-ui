import { Link } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

export const ReviewQueueCard = () => {
  return (
    <View className="mx-4 mb-6">
      <Link href="/(tabs)/review" asChild>
        <TouchableOpacity className="w-full flex-row items-center justify-between rounded-2xl bg-indigo-600 px-6 py-5 shadow-lg active:opacity-90">
          <View>
            <Text className="text-xl font-bold text-white">Review Queue</Text>
            <Text className="mt-1 text-indigo-100">
              Only 5 minutes left today
            </Text>
          </View>
          <View className="items-center justify-center rounded-xl bg-white/20 px-4 py-2">
            <Text className="text-2xl font-bold text-white">24</Text>
            <Text className="text-xs font-medium text-indigo-100">Words</Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};
