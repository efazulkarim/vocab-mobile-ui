import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

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

  // Handle case where id is array
  const wordId = Array.isArray(id) ? id[0] : id;
  const data = useMemo(() => getMockData(wordId || 'Serendipity'), [wordId]);

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        {/* Header */}
        <View className="px-4 py-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100 dark:active:bg-neutral-800"
          >
            <ArrowLeft size={24} color="#525252" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="flex-1 pt-2">
          <WordHero
            word={data.word}
            phonetic={data.phonetic}
            mnemonic={data.mnemonic}
          />

          <WordDefinition
            definition={data.definition}
            translation={data.translation}
            examples={data.examples}
          />
        </View>

        {/* SRS Action Bar (Fixed at bottom) */}
        <SRSActionBar />
      </SafeAreaView>
    </View>
  );
}
