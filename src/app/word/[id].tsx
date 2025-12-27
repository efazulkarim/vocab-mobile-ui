import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import { FadeInView, SlideUpCard } from '@/components/animations';
import { SRSActionBar } from '@/components/features/srs-action-bar';
import { WordDefinition } from '@/components/features/word-definition';
import { WordHero } from '@/components/features/word-hero';
import { SafeAreaView, View } from '@/components/ui';

// Mock data generator based on ID
const getMockData = (id: string) => {
  const isSerendipity = id.toLowerCase() === 'serendipity';

  if (isSerendipity) {
    return {
      word: 'Serendipity',
      phonetic: '/ˌserənˈdipədē/',
      mnemonic:
        'Think of "Seren" (serene) + "Dipity" (pity). Finding something serene and good is a happy accident!',
      definition:
        'The occurrence and development of events by chance in a happy or beneficial way.',
      translation: 'Isad (Arabic) / Serendipia (Spanish)',
      examples: [
        'The discovery of penicillin was a stroke of serendipity.',
        'We met by pure serendipity at the coffee shop.',
      ],
    };
  }

  return {
    word: id,
    phonetic: '/.../',
    mnemonic: `AI is generating a mnemonic for ${id}...`,
    definition: `Definition for ${id}`,
    translation: `Translation for ${id}`,
    examples: [`Example sentence for ${id}.`],
  };
};

export default function WordDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colorScheme } = useColorScheme();

  // Handle case where id is array
  const wordId = Array.isArray(id) ? id[0] : id;
  const data = useMemo(() => getMockData(wordId || 'Serendipity'), [wordId]);

  const iconColor = colorScheme === 'dark' ? '#d4d4d4' : '#525252';

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
              phonetic={data.phonetic}
              mnemonic={data.mnemonic}
            />
          </SlideUpCard>

          <FadeInView delay={200} className="flex-1">
            <WordDefinition
              definition={data.definition}
              translation={data.translation}
              examples={data.examples}
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
