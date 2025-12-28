import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { useGenerateWord } from '@/api/words';
import { FadeInView, SlideUpCard } from '@/components/animations';
import { SRSActionBar } from '@/components/features/srs-action-bar';
import { WordDefinition } from '@/components/features/word-definition';
import { WordHero } from '@/components/features/word-hero';
import { SafeAreaView, Text, View } from '@/components/ui';

export default function WordDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colorScheme } = useColorScheme();

  // Handle case where id is array
  const wordId = Array.isArray(id) ? id[0] : id;

  const { mutate, data, isPending, isError } = useGenerateWord();

  useEffect(() => {
    if (wordId) {
      mutate({ word: wordId });
    }
  }, [wordId, mutate]);

  const iconColor = colorScheme === 'dark' ? '#d4d4d4' : '#525252';

  // Loading state
  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color="#6366f1" />
        <Text className="mt-4 text-neutral-500">
          Generating word details...
        </Text>
      </View>
    );
  }

  // Error state
  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Text className="text-lg text-red-500">Failed to load word</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 rounded-xl bg-neutral-100 px-6 py-3 dark:bg-neutral-800"
        >
          <Text className="text-neutral-900 dark:text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        {/* Header */}
        <FadeInView delay={0} className="px-4 py-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100 dark:active:bg-neutral-800"
          >
            <ArrowLeft size={24} color={iconColor} />
          </TouchableOpacity>
        </FadeInView>

        {/* Content */}
        <View className="flex-1 pt-2">
          <SlideUpCard delay={100}>
            <WordHero
              word={data.word}
              phonetic={data.audio_url ? '🔊' : ''}
              mnemonic={data.mnemonic}
            />
          </SlideUpCard>

          <FadeInView delay={200} className="flex-1">
            <WordDefinition
              definition={data.definition}
              translation={data.synonyms.join(', ') || 'No synonyms available'}
              examples={data.sentence ? [data.sentence] : []}
            />
          </FadeInView>
        </View>

        {/* SRS Action Bar (Fixed at bottom) */}
        <SlideUpCard delay={300}>
          <SRSActionBar />
        </SlideUpCard>
      </SafeAreaView>
    </View>
  );
}
