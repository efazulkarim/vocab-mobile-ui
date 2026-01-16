import { useRouter } from 'expo-router';
import { BookOpen, Crown, Star, Users } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import { usePacks } from '@/api/packs';
import type {
  PackCategory,
  PackDifficulty,
  WordPackSummary,
} from '@/api/types';
import { FadeInView } from '@/components/animations';
import { ExploreCategoryTabs } from '@/components/features/explore-category-tabs';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';

const DIFFICULTY_COLORS: Record<PackDifficulty, { bg: string; text: string }> =
  {
    beginner: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
    },
    intermediate: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-600 dark:text-yellow-400',
    },
    advanced: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-600 dark:text-red-400',
    },
  };

function PackCard({ pack }: { pack: WordPackSummary }) {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';

  const difficultyStyle =
    DIFFICULTY_COLORS[pack.difficulty as PackDifficulty] ??
    DIFFICULTY_COLORS.beginner;

  const handlePress = () => {
    router.push(`/pack/${pack.id}` as any);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="mx-4 mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-900"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="text-lg font-bold text-neutral-900 dark:text-white">
              {pack.name}
            </Text>
            {pack.is_premium && (
              <View className="ml-2 rounded-full bg-amber-100 p-1 dark:bg-amber-900/30">
                <Crown size={12} color="#f59e0b" />
              </View>
            )}
          </View>

          {pack.description && (
            <Text
              className="mt-1 text-sm text-neutral-500 dark:text-neutral-400"
              numberOfLines={2}
            >
              {pack.description}
            </Text>
          )}

          {/* Tags */}
          <View className="mt-3 flex-row flex-wrap gap-2">
            <View className={`rounded-full px-2 py-1 ${difficultyStyle.bg}`}>
              <Text
                className={`text-xs font-medium capitalize ${difficultyStyle.text}`}
              >
                {pack.difficulty}
              </Text>
            </View>
            <View className="rounded-full bg-neutral-100 px-2 py-1 dark:bg-neutral-800">
              <Text className="text-xs text-neutral-600 dark:text-neutral-400">
                {pack.category.replace('_', ' ')}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="ml-4 items-end">
          <View className="flex-row items-center">
            <BookOpen size={14} color={iconColor} />
            <Text className="ml-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {pack.word_count}
            </Text>
          </View>
          {pack.subscriber_count > 0 && (
            <View className="mt-1 flex-row items-center">
              <Users size={14} color={iconColor} />
              <Text className="ml-1 text-xs text-neutral-500 dark:text-neutral-400">
                {pack.subscriber_count}
              </Text>
            </View>
          )}
          {pack.average_rating > 0 && (
            <View className="mt-1 flex-row items-center">
              <Star size={14} color="#f59e0b" fill="#f59e0b" />
              <Text className="ml-1 text-xs text-neutral-500 dark:text-neutral-400">
                {pack.average_rating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState<
    PackCategory | 'all'
  >('all');

  const { data, isLoading, isRefetching, refetch } = usePacks({
    variables: {
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      page_size: 20,
    },
  });

  const packs = data?.items ?? [];

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-black">
      <FocusAwareStatusBar />

      {/* Header */}
      <SafeAreaView edges={['top']} className="bg-white dark:bg-neutral-900">
        <View className="px-4 pb-4 pt-2">
          <Text className="text-2xl font-bold text-neutral-900 dark:text-white">
            Explore Packs
          </Text>
          <Text className="mt-1 text-neutral-500 dark:text-neutral-400">
            Curated vocabulary collections for every goal
          </Text>
        </View>

        {/* Category Tabs */}

        <ExploreCategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </SafeAreaView>

      {/* Content */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#6366f1" />
          <Text className="mt-4 text-neutral-500">Loading packs...</Text>
        </View>
      ) : packs.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-5xl">📚</Text>
          <Text className="mt-4 text-center text-lg font-medium text-neutral-900 dark:text-white">
            No packs available
          </Text>
          <Text className="mt-2 text-center text-neutral-500 dark:text-neutral-400">
            Check back later for new vocabulary packs
          </Text>
        </View>
      ) : (
        <FlatList
          data={packs}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <FadeInView delay={index * 50}>
              <PackCard pack={item} />
            </FadeInView>
          )}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor="#6366f1"
            />
          }
        />
      )}
    </View>
  );
}
