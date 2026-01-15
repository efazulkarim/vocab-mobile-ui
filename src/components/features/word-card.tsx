import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

type Props = {
  word: string;
  partOfSpeech?: string;
  id: string;
};

export const WordCard = ({ word, partOfSpeech, id }: Props) => {
  return (
    <Link href={`/word/${id}`} asChild>
      <View className="mr-3 w-32 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <Text className="mb-1 text-lg font-bold text-neutral-900 dark:text-white">
          {word}
        </Text>
        {partOfSpeech && (
          <Text className="text-sm text-neutral-500 dark:text-neutral-400">
            {partOfSpeech}
          </Text>
        )}
      </View>
    </Link>
  );
};
