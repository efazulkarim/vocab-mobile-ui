import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, BookmarkPlus, Crown, Plus } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useAddToBank, usePackDetail, useSubscribe } from '@/api/packs';
import type { PackWord } from '@/api/types';
import { FadeInView } from '@/components/animations';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';

function WordItem({ word, onPress }: { word: PackWord; onPress: () => void }) {
  const { colorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-4 mb-3 rounded-xl bg-white p-4 dark:bg-neutral-900"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-lg font-semibold capitalize text-neutral-900 dark:text-white">
            {word.word}
          </Text>
          <Text
            className="mt-1 text-sm text-neutral-500 dark:text-neutral-400"
            numberOfLines={2}
          >
            {word.definition}
          </Text>
        </View>
        <View className="ml-4 h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
          <Plus
            size={16}
            color={colorScheme === 'dark' ? '#a1a1aa' : '#71717a'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function PackDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#d4d4d4' : '#525252';

  const packId = Array.isArray(id) ? id[0] : id;

  const {
    data: pack,
    isLoading,
    isError,
  } = usePackDetail({
    variables: { packId: packId ?? '' },
    enabled: !!packId,
  });

  const subscribeMutation = useSubscribe();
  const addToBankMutation = useAddToBank();

  const handleSubscribe = async () => {
    if (!packId) return;
    try {
      await subscribeMutation.mutateAsync({ pack_id: packId });
      Alert.alert('Subscribed! 🎉', 'You are now tracking this pack.');
    } catch (error) {
      Alert.alert('Error', 'Failed to subscribe. Please try again.');
    }
  };

  const handleAddAllToBank = async () => {
    if (!packId) return;
    try {
      const result = await addToBankMutation.mutateAsync({
        pack_id: packId,
        limit: 10, // Add first 10 words
      });
      Alert.alert(
        'Words Added! 📚',
        `Added ${result.added_count} words to your word bank.${result.skipped_count > 0 ? ` (${result.skipped_count} already in bank)` : ''}`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add words. Please try again.');
    }
  };

  const handleWordPress = (word: PackWord) => {
    router.push(`/word/${encodeURIComponent(word.word)}`);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <FocusAwareStatusBar />
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (isError || !pack) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-black">
        <FocusAwareStatusBar />
        <Text className="text-lg text-red-500">Failed to load pack</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 rounded-xl bg-neutral-100 px-6 py-3 dark:bg-neutral-800"
        >
          <Text className="text-neutral-900 dark:text-white">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-black">
      <FocusAwareStatusBar />

      <SafeAreaView edges={['top']} className="bg-white dark:bg-neutral-900">
        {/* Header */}
        <View className="flex-row items-center px-4 py-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <ArrowLeft size={24} color={iconColor} />
          </TouchableOpacity>
          <View className="ml-4 flex-1">
            <View className="flex-row items-center">
              <Text className="text-xl font-bold text-neutral-900 dark:text-white">
                {pack.name}
              </Text>
              {pack.is_premium && (
                <View className="ml-2 rounded-full bg-amber-100 p-1 dark:bg-amber-900/30">
                  <Crown size={14} color="#f59e0b" />
                </View>
              )}
            </View>
            <Text className="text-sm text-neutral-500 dark:text-neutral-400">
              {pack.word_count} words • {pack.difficulty}
            </Text>
          </View>
        </View>

        {/* Description */}
        {pack.description && (
          <View className="px-4 pb-4">
            <Text className="text-neutral-600 dark:text-neutral-400">
              {pack.description}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="flex-row gap-3 px-4 pb-4">
          <TouchableOpacity
            onPress={handleSubscribe}
            disabled={subscribeMutation.isPending}
            className="flex-1 flex-row items-center justify-center rounded-xl bg-indigo-600 py-3"
          >
            {subscribeMutation.isPending ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <>
                <BookmarkPlus size={18} color="#ffffff" />
                <Text className="ml-2 font-semibold text-white">Subscribe</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAddAllToBank}
            disabled={addToBankMutation.isPending}
            className="flex-1 flex-row items-center justify-center rounded-xl bg-neutral-100 py-3 dark:bg-neutral-800"
          >
            {addToBankMutation.isPending ? (
              <ActivityIndicator size="small" color="#6366f1" />
            ) : (
              <>
                <Plus
                  size={18}
                  color={colorScheme === 'dark' ? '#a1a1aa' : '#71717a'}
                />
                <Text className="ml-2 font-semibold text-neutral-700 dark:text-neutral-300">
                  Add Words
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Words List */}
      <FlatList
        data={pack.words}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <FadeInView delay={index * 30}>
            <WordItem word={item} onPress={() => handleWordPress(item)} />
          </FadeInView>
        )}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
        ListEmptyComponent={
          <View className="items-center py-8">
            <Text className="text-neutral-500">No words in this pack</Text>
          </View>
        }
      />
    </View>
  );
}
