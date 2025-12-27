import { Search } from 'lucide-react-native';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { FadeInView, SlideUpCard } from '@/components/animations';
import { DailyProgressCard } from '@/components/features/daily-progress-card';
import { ReviewQueueCard } from '@/components/features/review-queue-card';
import { WordCard } from '@/components/features/word-card';
import { FocusAwareStatusBar, Input, Text, View } from '@/components/ui';

const recentWords = [
  { id: '1', word: 'Serendipity', partOfSpeech: 'noun' },
  { id: '2', word: 'Ephemeral', partOfSpeech: 'adj' },
  { id: '3', word: 'Luminous', partOfSpeech: 'adj' },
  { id: '4', word: 'Solitude', partOfSpeech: 'noun' },
  { id: '5', word: 'Aurora', partOfSpeech: 'noun' },
];

export default function Home() {
  return (
    <View className="flex-1 bg-neutral-50 dark:bg-black">
      <FocusAwareStatusBar />

      {/* Sticky Search Header */}
      <View className="border-b border-neutral-200 bg-white px-4 pb-4 pt-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <View className="relative">
          <Input
            placeholder="Search for new words..."
            className="h-12 rounded-full border-none bg-neutral-100 pl-10 dark:bg-neutral-800"
          />
          <View className="absolute left-3 top-3">
            <Search size={20} color="#9ca3af" />
          </View>
        </View>
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
              Recent
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                View all
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-4 px-4"
          >
            {recentWords.map((item, index) => (
              <FadeInView key={item.id} delay={400 + index * 100}>
                <WordCard
                  word={item.word}
                  partOfSpeech={item.partOfSpeech}
                  id={item.word}
                />
              </FadeInView>
            ))}
          </ScrollView>
        </FadeInView>
      </ScrollView>
    </View>
  );
}
