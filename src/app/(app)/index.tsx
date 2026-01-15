import React from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

import { useSearchWords } from '@/api/words';
import { FadeInView, SlideUpCard } from '@/components/animations';
import { DailyProgressCard } from '@/components/features/daily-progress-card';
import { ReviewQueueCard } from '@/components/features/review-queue-card';
import { SearchBarWithAutocomplete } from '@/components/features/search-bar-autocomplete';
import { WordCard } from '@/components/features/word-card';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';

export default function Home() {
  // Fetch recent words from the API
  const { data: recentWordsData, isLoading: isLoadingWords } = useSearchWords({
    variables: { page_size: 10 },
    enabled: true,
  });

  const recentWords = recentWordsData?.items ?? [];

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-black">
      <FocusAwareStatusBar />

      {/* Sticky Search Header */}
      <View className="z-50 border-b border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <SafeAreaView edges={['top']}>
          <View className="px-4 pb-4 pt-2">
            <SearchBarWithAutocomplete />
          </View>
        </SafeAreaView>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <FadeInView delay={100}>
          <DailyProgressCard />
        </FadeInView>

        <SlideUpCard delay={200}>
          <ReviewQueueCard />
        </SlideUpCard>

        <FadeInView delay={300} className="px-4 pb-8">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-neutral-900 dark:text-white">
              Your Words
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                View all
              </Text>
            </TouchableOpacity>
          </View>

          {isLoadingWords ? (
            <View className="items-center py-8">
              <ActivityIndicator size="small" color="#6366f1" />
              <Text className="mt-2 text-sm text-neutral-500">
                Loading words...
              </Text>
            </View>
          ) : recentWords.length === 0 ? (
            <View className="items-center rounded-2xl bg-white p-6 dark:bg-neutral-900">
              <Text className="text-lg font-medium text-neutral-900 dark:text-white">
                No words yet! 📚
              </Text>
              <Text className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
                Search for a word above to start building your vocabulary
              </Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-4 px-4"
            >
              {recentWords.map((item, index) => (
                <FadeInView key={item.id} delay={400 + index * 100}>
                  <WordCard word={item.word} id={item.id} />
                </FadeInView>
              ))}
            </ScrollView>
          )}
        </FadeInView>
      </ScrollView>
    </View>
  );
}
