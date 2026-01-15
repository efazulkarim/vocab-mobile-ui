import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { useDueReviews } from '@/api/reviews';
import { Text } from '@/components/ui';

export const ReviewQueueCard = () => {
  const router = useRouter();
  const { data: dueReviews, isLoading } = useDueReviews();

  const wordsDue = dueReviews?.total ?? 0;
  const estimatedMinutes = Math.max(1, Math.ceil(wordsDue * 0.2)); // ~12 seconds per word

  const handlePress = () => {
    // Navigate to review screen when implemented
    router.push('/(app)/review' as any);
  };

  if (isLoading) {
    return (
      <View className="mx-4 mb-6">
        <View className="w-full flex-row items-center justify-center rounded-2xl bg-indigo-600 px-6 py-5 shadow-lg">
          <ActivityIndicator size="small" color="#ffffff" />
        </View>
      </View>
    );
  }

  if (wordsDue === 0) {
    return (
      <View className="mx-4 mb-6">
        <View className="w-full flex-row items-center justify-between rounded-2xl bg-green-600 px-6 py-5 shadow-lg">
          <View>
            <Text className="text-xl font-bold text-white">
              All Caught Up! 🎉
            </Text>
            <Text className="mt-1 text-green-100">No words due for review</Text>
          </View>
          <View className="items-center justify-center rounded-xl bg-white/20 px-4 py-2">
            <Text className="text-2xl font-bold text-white">✓</Text>
            <Text className="text-xs font-medium text-green-100">Done</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="mx-4 mb-6">
      <TouchableOpacity
        onPress={handlePress}
        className="w-full flex-row items-center justify-between rounded-2xl bg-indigo-600 px-6 py-5 shadow-lg active:opacity-90"
      >
        <View>
          <Text className="text-xl font-bold text-white">Review Queue</Text>
          <Text className="mt-1 text-indigo-100">
            {estimatedMinutes === 1
              ? 'About 1 minute'
              : `About ${estimatedMinutes} minutes`}
          </Text>
        </View>
        <View className="items-center justify-center rounded-xl bg-white/20 px-4 py-2">
          <Text className="text-2xl font-bold text-white">{wordsDue}</Text>
          <Text className="text-xs font-medium text-indigo-100">
            {wordsDue === 1 ? 'Word' : 'Words'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
