import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import { useAnalytics } from '@/api/analytics';
import { Text } from '@/components/ui';

export const DailyProgressCard = () => {
  const { data: analytics, isLoading, isError } = useAnalytics();

  // Fallback values when no data
  const totalWords = analytics?.overall.total_words ?? 0;
  const wordsReviewedToday = analytics?.words_due_today ?? 0;
  const streakDays = analytics?.streak_days ?? 0;

  // Calculate progress (assuming daily goal of 30 words)
  const dailyGoal = 30;
  const wordsLearned = analytics?.overall.words_mastered ?? 0;
  const progressPercent = Math.min(
    100,
    Math.round((wordsLearned / Math.max(dailyGoal, 1)) * 100)
  );

  const pieData = [
    { value: progressPercent, color: '#6366f1', focused: true }, // Indigo-500
    { value: 100 - progressPercent, color: '#e5e7eb' }, // Gray-200
  ];

  if (isLoading) {
    return (
      <View className="mx-4 my-4 flex-row items-center justify-center rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-900">
        <ActivityIndicator size="small" color="#6366f1" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="mx-4 my-4 flex-row items-center justify-between rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-900">
        <View>
          <Text className="text-left text-lg font-semibold text-neutral-900 dark:text-white">
            Daily Goal
          </Text>
          <Text className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Unable to load progress
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="mx-4 my-4 flex-row items-center justify-between rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-900">
      <View>
        <Text className="text-left text-lg font-semibold text-neutral-900 dark:text-white">
          Daily Goal
        </Text>
        <Text className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {wordsLearned} / {dailyGoal} words mastered
        </Text>
        {streakDays > 0 && (
          <View className="mt-4 flex-row items-center">
            <View className="mr-2 h-2 w-2 rounded-full bg-orange-500" />
            <Text className="text-sm font-medium text-orange-500">
              {streakDays} Day Streak! 🔥
            </Text>
          </View>
        )}
        {wordsReviewedToday > 0 && (
          <Text className="mt-2 text-xs text-indigo-600 dark:text-indigo-400">
            {wordsReviewedToday} words due today
          </Text>
        )}
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
                {progressPercent}%
              </Text>
            );
          }}
        />
      </View>
    </View>
  );
};
