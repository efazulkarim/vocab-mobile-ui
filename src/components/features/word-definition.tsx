import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

type Props = {
  definition: string;
  translation: string;
  examples: string[];
};

export const WordDefinition = ({
  definition,
  translation,
  examples,
}: Props) => {
  const [activeTab, setActiveTab] = useState<
    'definition' | 'translation' | 'examples'
  >('definition');

  return (
    <View className="mt-4 flex-1 px-4">
      <View className="mb-4 flex-row border-b border-neutral-200 dark:border-neutral-800">
        {(['definition', 'translation', 'examples'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`mr-6 pb-2 ${
              activeTab === tab ? 'border-b-2 border-indigo-600' : 'border-b-0'
            }`}
          >
            <Text
              className={`text-lg font-medium capitalize ${
                activeTab === tab
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {activeTab === 'definition' && (
          <View>
            <Text className="text-xl leading-relaxed text-neutral-800 dark:text-neutral-100">
              {definition}
            </Text>
          </View>
        )}

        {activeTab === 'translation' && (
          <View>
            <Text className="text-xl leading-relaxed text-neutral-800 dark:text-neutral-100">
              {translation}
            </Text>
          </View>
        )}

        {activeTab === 'examples' && (
          <View>
            {examples.map((example, index) => (
              <View
                key={index}
                className="mb-4 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-800"
              >
                <Text className="text-base italic text-neutral-700 dark:text-neutral-300">
                  &quot;{example}&quot;
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
