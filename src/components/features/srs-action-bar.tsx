import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';

import { useSubmitReview } from '@/api/reviews';
import type { QualityRating } from '@/api/types';
import { Text } from '@/components/ui';

type Props = {
  wordId?: string;
  onReviewComplete?: () => void;
};

export const SRSActionBar = ({ wordId, onReviewComplete }: Props) => {
  const router = useRouter();
  const submitReviewMutation = useSubmitReview();

  const handleReview = async (quality: QualityRating) => {
    if (!wordId) {
      // If no wordId, this is just for display (like word generation preview)
      Alert.alert(
        'Save First',
        'Add this word to your word bank before reviewing!'
      );
      return;
    }

    try {
      const result = await submitReviewMutation.mutateAsync({
        word_id: wordId,
        quality,
      });

      // Show feedback
      const message = `Next review: ${formatNextReview(result.next_review_date)}`;
      Alert.alert('Review Submitted! 🎉', message);

      // Call completion callback or navigate back
      if (onReviewComplete) {
        onReviewComplete();
      } else {
        router.back();
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    }
  };

  const formatNextReview = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} minutes`;
    if (diffHours < 24) return `${diffHours} hours`;
    if (diffDays === 1) return 'tomorrow';
    return `${diffDays} days`;
  };

  const isSubmitting = submitReviewMutation.isPending;

  return (
    <View className="flex-row justify-between border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-900">
      {/* Again - Quality 0-1 (Complete blackout / Incorrect) */}
      <TouchableOpacity
        onPress={() => handleReview(1)}
        disabled={isSubmitting}
        className={`flex-1 rounded-xl bg-red-100 py-3 dark:bg-red-900/30 ${isSubmitting ? 'opacity-50' : ''}`}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#dc2626" />
        ) : (
          <>
            <Text className="text-center font-bold text-red-600 dark:text-red-400">
              Again
            </Text>
            <Text className="text-center text-xs text-red-500 dark:text-red-300">
              1m
            </Text>
          </>
        )}
      </TouchableOpacity>

      <View className="w-4" />

      {/* Good - Quality 3-4 (Correct with difficulty/hesitation) */}
      <TouchableOpacity
        onPress={() => handleReview(3)}
        disabled={isSubmitting}
        className={`flex-1 rounded-xl bg-blue-100 py-3 dark:bg-blue-900/30 ${isSubmitting ? 'opacity-50' : ''}`}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#2563eb" />
        ) : (
          <>
            <Text className="text-center font-bold text-blue-600 dark:text-blue-400">
              Good
            </Text>
            <Text className="text-center text-xs text-blue-500 dark:text-blue-300">
              10m
            </Text>
          </>
        )}
      </TouchableOpacity>

      <View className="w-4" />

      {/* Easy - Quality 5 (Perfect recall) */}
      <TouchableOpacity
        onPress={() => handleReview(5)}
        disabled={isSubmitting}
        className={`flex-1 rounded-xl bg-green-100 py-3 dark:bg-green-900/30 ${isSubmitting ? 'opacity-50' : ''}`}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#16a34a" />
        ) : (
          <>
            <Text className="text-center font-bold text-green-600 dark:text-green-400">
              Easy
            </Text>
            <Text className="text-center text-xs text-green-500 dark:text-green-300">
              4d
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};
