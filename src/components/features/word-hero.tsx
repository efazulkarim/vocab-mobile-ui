import { Lightbulb, Volume2 } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

type Props = {
  word: string;
  phonetic: string;
  mnemonic: string;
};

export const WordHero = ({ word, phonetic, mnemonic }: Props) => {
  return (
    <View className="mb-6 px-4">
      <View className="mb-6 flex-row items-center justify-between">
        <View>
          <Text className="text-4xl font-bold text-neutral-900 dark:text-white">
            {word}
          </Text>
          <Text className="text-lg text-neutral-500 dark:text-neutral-400">
            {phonetic}
          </Text>
        </View>
        <TouchableOpacity className="items-center justify-center rounded-full bg-neutral-100 p-3 dark:bg-neutral-800">
          <Volume2 size={24} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <View className="relative overflow-hidden rounded-2xl bg-amber-50 p-6 dark:bg-amber-950/30">
        <View className="mb-2 flex-row items-center">
          <Lightbulb size={20} color="#f59e0b" />
          <Text className="ml-2 font-bold text-amber-700 dark:text-amber-500">
            AI Mnemonic
          </Text>
        </View>
        <Text className="text-lg leading-relaxed text-amber-900 dark:text-amber-100">
          {mnemonic}
        </Text>
      </View>
    </View>
  );
};
