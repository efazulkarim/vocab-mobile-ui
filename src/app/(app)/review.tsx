import { useRouter } from 'expo-router';
import { ArrowLeft, Volume2 } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { queryClient } from '@/api/common';
import { useDueReviews } from '@/api/reviews';
import { useSubmitReview } from '@/api/reviews/use-submit-review';
import type { DueReviewItem, QualityRating } from '@/api/types';
import { FadeInView, SlideUpCard } from '@/components/animations';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';

export default function ReviewScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#d4d4d4' : '#525252';

  const { data: dueReviews, isLoading, refetch } = useDueReviews();
  const submitReviewMutation = useSubmitReview();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const reviews = dueReviews?.items ?? [];
  const totalCount = reviews.length;
  const currentWord: DueReviewItem | undefined = reviews[currentIndex];

  const handleRevealAnswer = () => {
    setShowAnswer(true);
  };

  const handleSubmitReview = useCallback(
    async (quality: QualityRating) => {
      if (!currentWord) return;

      try {
        await submitReviewMutation.mutateAsync({
          word_id: currentWord.id,
          quality,
        });

        setCompletedCount((prev) => prev + 1);
        setShowAnswer(false);

        // Move to next word or finish
        if (currentIndex < totalCount - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // All reviews complete - invalidate queries and go back
          await queryClient.invalidateQueries({ queryKey: ['reviews'] });
          await queryClient.invalidateQueries({ queryKey: ['analytics'] });
          router.back();
        }
      } catch (error) {
        console.error('Failed to submit review:', error);
      }
    },
    [currentWord, currentIndex, totalCount, submitReviewMutation, router]
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <FocusAwareStatusBar />
        <ActivityIndicator size="large" color="#6366f1" />
        <Text className="mt-4 text-neutral-500">Loading reviews...</Text>
      </View>
    );
  }

  if (totalCount === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-black">
        <FocusAwareStatusBar />
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-6xl">🎉</Text>
          <Text className="mt-4 text-center text-2xl font-bold text-neutral-900 dark:text-white">
            All Caught Up!
          </Text>
          <Text className="mt-2 text-center text-neutral-500 dark:text-neutral-400">
            No words due for review right now. Great job!
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-8 rounded-xl bg-indigo-600 px-8 py-4"
          >
            <Text className="font-semibold text-white">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-black">
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <ArrowLeft size={24} color={iconColor} />
          </TouchableOpacity>

          <View className="items-center">
            <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Review Session
            </Text>
            <Text className="text-lg font-bold text-neutral-900 dark:text-white">
              {currentIndex + 1} / {totalCount}
            </Text>
          </View>

          <View className="h-10 w-10" />
        </View>

        {/* Progress Bar */}
        <View className="mx-4 mt-4 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800">
          <View
            className="h-2 rounded-full bg-indigo-600"
            style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
          />
        </View>

        {/* Flashcard Content */}
        <View className="flex-1 justify-center px-6">
          <FadeInView key={currentWord?.id} delay={0}>
            <View className="rounded-3xl bg-white p-8 shadow-lg dark:bg-neutral-900">
              {/* Word */}
              <View className="items-center">
                <Text className="text-4xl font-bold capitalize text-neutral-900 dark:text-white">
                  {currentWord?.word}
                </Text>

                {currentWord?.audio_url && (
                  <TouchableOpacity className="mt-3 rounded-full bg-neutral-100 p-2 dark:bg-neutral-800">
                    <Volume2 size={20} color={iconColor} />
                  </TouchableOpacity>
                )}
              </View>

              {/* Divider */}
              <View className="my-6 h-px bg-neutral-200 dark:bg-neutral-700" />

              {/* Answer (hidden by default) */}
              {showAnswer ? (
                <SlideUpCard delay={0}>
                  <View>
                    {/* Definition */}
                    <Text className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {currentWord?.definition}
                    </Text>

                    {/* Mnemonic */}
                    {currentWord?.mnemonic && (
                      <View className="mt-4 rounded-xl bg-amber-50 p-4 dark:bg-amber-950/30">
                        <Text className="text-sm font-medium text-amber-800 dark:text-amber-200">
                          💡 Mnemonic
                        </Text>
                        <Text className="mt-1 text-amber-700 dark:text-amber-300">
                          {currentWord.mnemonic}
                        </Text>
                      </View>
                    )}

                    {/* Synonyms */}
                    {currentWord?.synonyms &&
                      currentWord.synonyms.length > 0 && (
                        <View className="mt-4">
                          <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            Synonyms:
                          </Text>
                          <Text className="mt-1 text-neutral-700 dark:text-neutral-300">
                            {currentWord.synonyms.join(', ')}
                          </Text>
                        </View>
                      )}
                  </View>
                </SlideUpCard>
              ) : (
                <TouchableOpacity
                  onPress={handleRevealAnswer}
                  className="items-center rounded-xl bg-indigo-50 py-4 dark:bg-indigo-950/30"
                >
                  <Text className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Tap to reveal answer
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </FadeInView>
        </View>

        {/* Review Buttons (only shown when answer is revealed) */}
        {showAnswer && (
          <SlideUpCard delay={100}>
            <View className="border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-900">
              <View className="flex-row">
                {/* Again */}
                <TouchableOpacity
                  onPress={() => handleSubmitReview(1)}
                  disabled={submitReviewMutation.isPending}
                  className="flex-1 rounded-xl bg-red-100 py-3 dark:bg-red-900/30"
                >
                  <Text className="text-center font-bold text-red-600 dark:text-red-400">
                    Again
                  </Text>
                  <Text className="text-center text-xs text-red-500 dark:text-red-300">
                    1m
                  </Text>
                </TouchableOpacity>

                <View className="w-3" />

                {/* Hard */}
                <TouchableOpacity
                  onPress={() => handleSubmitReview(2)}
                  disabled={submitReviewMutation.isPending}
                  className="flex-1 rounded-xl bg-orange-100 py-3 dark:bg-orange-900/30"
                >
                  <Text className="text-center font-bold text-orange-600 dark:text-orange-400">
                    Hard
                  </Text>
                  <Text className="text-center text-xs text-orange-500 dark:text-orange-300">
                    6m
                  </Text>
                </TouchableOpacity>

                <View className="w-3" />

                {/* Good */}
                <TouchableOpacity
                  onPress={() => handleSubmitReview(3)}
                  disabled={submitReviewMutation.isPending}
                  className="flex-1 rounded-xl bg-blue-100 py-3 dark:bg-blue-900/30"
                >
                  <Text className="text-center font-bold text-blue-600 dark:text-blue-400">
                    Good
                  </Text>
                  <Text className="text-center text-xs text-blue-500 dark:text-blue-300">
                    10m
                  </Text>
                </TouchableOpacity>

                <View className="w-3" />

                {/* Easy */}
                <TouchableOpacity
                  onPress={() => handleSubmitReview(5)}
                  disabled={submitReviewMutation.isPending}
                  className="flex-1 rounded-xl bg-green-100 py-3 dark:bg-green-900/30"
                >
                  <Text className="text-center font-bold text-green-600 dark:text-green-400">
                    Easy
                  </Text>
                  <Text className="text-center text-xs text-green-500 dark:text-green-300">
                    4d
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SlideUpCard>
        )}
      </SafeAreaView>
    </View>
  );
}
