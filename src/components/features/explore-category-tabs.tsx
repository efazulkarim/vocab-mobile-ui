import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import type { PackCategory } from '@/api/types';
import { Text } from '@/components/ui';

const CATEGORIES: { label: string; value: PackCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Exam Prep', value: 'exam_prep' },
  { label: 'Career', value: 'career' },
  { label: 'Academic', value: 'academic' },
  { label: 'Casual', value: 'casual' },
];

interface ExploreCategoryTabsProps {
  selectedCategory: PackCategory | 'all';
  onSelectCategory: (category: PackCategory | 'all') => void;
}

export function ExploreCategoryTabs({
  selectedCategory,
  onSelectCategory,
}: ExploreCategoryTabsProps) {
  return (
    <FlatList
      horizontal
      data={CATEGORIES}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12 }}
      keyExtractor={(item) => item.value}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelectCategory(item.value)}
          className={`mr-2 rounded-full px-4 py-2 ${
            selectedCategory === item.value
              ? 'bg-indigo-600'
              : 'bg-neutral-100 dark:bg-neutral-800'
          }`}
        >
          <Text
            className={`text-sm font-medium ${
              selectedCategory === item.value
                ? 'text-white'
                : 'text-neutral-700 dark:text-neutral-300'
            }`}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
