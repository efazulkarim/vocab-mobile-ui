import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable } from 'react-native';

import { SafeAreaView, ScrollView, Text, View } from '@/components/ui';

type WordData = {
  word: string;
  definition: string;
  mnemonic: string;
  sentence: string;
  synonyms: string[];
};

const mockData: Record<string, WordData> = {
  luminous: {
    word: 'Luminous',
    definition: 'Emitting or reflecting light; shining.',
    mnemonic: 'Think of the moon—luminous at night.',
    sentence: 'The luminous screen lit up the dark room.',
    synonyms: ['bright', 'radiant', 'shining', 'glowing'],
  },
  concise: {
    word: 'Concise',
    definition: 'Giving a lot of information clearly in a few words.',
    mnemonic: 'Con-cise like con-dense—short and clear.',
    sentence: 'Her report was concise and easy to follow.',
    synonyms: ['brief', 'succinct', 'compact'],
  },
};

export default function WordDetail() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const wordId = Array.isArray(params.id) ? params.id[0] : params.id;

  const word = useMemo<WordData>(() => {
    if (!wordId) {
      return mockData.luminous;
    }
    const key = wordId.toLowerCase();
    return (
      mockData[key] ?? {
        word: wordId,
        definition: 'Definition not found yet.',
        mnemonic: 'Create your own memory hook!',
        sentence: `Use "${wordId}" in a sentence to remember it.`,
        synonyms: ['to add'],
      }
    );
  }, [wordId]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-10"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={router.back}
          className="mb-4 mt-2 w-10 items-center justify-center rounded-full bg-gray-100 p-2"
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </Pressable>

        <View className="items-center space-y-4">
          <Text className="text-3xl font-bold text-gray-900">{word.word}</Text>

          <View className="w-full rounded-2xl border border-amber-200 bg-amber-100 p-4">
            <View className="mb-2 flex-row items-center gap-2">
              <Ionicons name="bulb-outline" size={20} color="#92400e" />
              <Text className="text-base font-semibold text-amber-900">
                Mnemonic
              </Text>
            </View>
            <Text className="text-base text-amber-900">{word.mnemonic}</Text>
          </View>

          <View className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <Text className="text-base font-semibold text-gray-900">
              Definition
            </Text>
            <Text className="mt-1 text-base text-gray-700">
              {word.definition}
            </Text>
          </View>

          <View className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <Text className="text-base font-semibold text-gray-900">
              Context
            </Text>
            <Text className="mt-1 text-base italic text-gray-700">
              “{word.sentence}”
            </Text>
          </View>

          <View className="w-full space-y-2">
            <Text className="text-base font-semibold text-gray-900">
              Synonyms
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {word.synonyms.map((synonym) => (
                <View
                  key={synonym}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1"
                >
                  <Text className="text-sm text-blue-700">{synonym}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
